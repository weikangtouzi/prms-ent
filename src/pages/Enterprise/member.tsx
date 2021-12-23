import {useRef, useState} from 'react';
import {PlusOutlined} from '@ant-design/icons';
import {Button, Image, message, Popconfirm} from 'antd';
import type {ProColumns, ActionType} from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import OptionModal from './memberParts/optionalModal'
import InviteModal from "@/pages/Enterprise/memberParts/inviteModal";
import {useQuery, useMutation} from "@apollo/client";
import {get_enterprise_member, invite_member, del_member,setMemberDisable} from "@/services/gqls/enterprise";
import {defaultImage} from "@/common/js/const";
import Moment from "moment";

export default () => {
  const actionRef = useRef<ActionType>();
  const [modalShow, setModalShow] = useState(false)
  const [visible, setVisible] = useState<boolean>(false);
  const [invite_enterprise_member] = useMutation<void, Enterprise.invite_data>(invite_member)
  const [del_enterprise_member] = useMutation<void, Enterprise.del_member_param>(del_member)
  const [disable_member] = useMutation<void, {workerId: number}>(setMemberDisable)
  const {refetch} = useQuery<ResultDataType<'UserGetEnterpriseDetail_WorkerList', Enterprise.member_info[]>>(get_enterprise_member, {skip: true})

  const inviteMember = () => {
    setVisible(true)
  }

  const inviteSubmit = (values: Enterprise.invite_data) => {
    invite_enterprise_member({
      variables: {
        phoneNumber: values.phoneNumber,
        role: values.role
      }
    }).then(() => {
      message.success('邀请成功').then()
      setVisible(false)
    }).catch(e => {
      message.error(e.graphQLErrors?.[0].message).then()
    })
  }

  const columns: ProColumns<Enterprise.member_info>[] = [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: '头像',
      dataIndex: 'logo',
      hideInSearch: true,
      render: (_, r) => {
        return <Image
          width={35}
          src={r.logo}
          fallback={defaultImage}
        />
      }
    },
    {
      title: '成员姓名',
      dataIndex: 'name',
    },
    {
      title: '职位',
      dataIndex: 'pos',
      hideInSearch: true
    },
    {
      title: '角色',
      dataIndex: 'role',
      hideInSearch: true
    },
    {
      title: '状态',
      dataIndex: 'disabled',
      valueType: 'select',
      fieldProps: {
        options: [
          {
            label: '全部',
            value: 'all',
            status: 'error'
          },
          {
            label: '已禁用',
            value: true,
          },
          {
            label: '生效中',
            value: false,
            status: 'error'
          },
        ],
      },
    },
    {
      title: '入驻时间',
      dataIndex: 'createdAt',
      hideInSearch: true,
      render: (_, r) => {
        return Moment(Number(r.createdAt)).format('YYYY-MM-DD HH:mm:ss')
      }
    },
    {
      title: '操作',
      valueType: 'option',
      render: (text, record,) => [
        <Popconfirm
          key='action'
          onConfirm={() => {
            if(!record.disabled){
              disable_member({
                variables:{
                  workerId:record.id
                }
              }).then(()=>{
                message.success('已禁用该用户').then()
                actionRef.current?.reload()
              }).catch(e=>{
                message.error(e.graphQLErrors?.[0].message).then()
              })
            }
          }}
          onCancel={() => {

          }}
          title={`确认要${record.disabled ? '解封' : '禁用'}这个用户吗`}
        >
          {record.disabled ? (
            <a type={'link'} key='recover'>解封</a>
          ) : (
            <a type={'link'} style={{color: 'red'}} key={'ban'}>
              禁用
            </a>
          )}
        </Popconfirm>,
        <Popconfirm
          key='del'
          onConfirm={() => {
            del_enterprise_member({
              variables:{
                workerId:record.id,
                role:record.role
              }
            }).then(()=>{
              message.success('删除该用户成功').then()
              actionRef.current?.reload()
            }).catch(e => {
              message.error(e.graphQLErrors?.[0].message).then()
            })
          }}
          onCancel={() => {
          }}
          title='确定要删除这个用户吗'
        >
          <a type={'link'} style={{color: 'red'}} key={'del'}>
            删除
          </a>
        </Popconfirm>
      ],
    },
  ];

  return (
    <div>
      <ProTable<Enterprise.member_info>
        columns={columns}
        actionRef={actionRef}
        request={async (
          params,
        ) => {
          const res = await refetch();
          const list = res.data.UserGetEnterpriseDetail_WorkerList
          const filterList = list.filter(item => {
            const name = params?.name?.trim() || ''
            const disabled = params?.disabled || 'all'
            return (item.name.indexOf(name) > -1 || !name) && (item.disabled === disabled || disabled === 'all')
          })
          return {
            data: filterList,
            success: true,
            total: filterList.length,
          };
        }}
        rowKey="id"
        search={{
          labelWidth: 'auto',
        }}
        pagination={{
          pageSize: 10,
        }}
        dateFormatter="string"
        headerTitle={  <Button key="button" icon={<PlusOutlined/>} type="primary" onClick={() => {
          inviteMember()
        }}>
          邀请成员
        </Button>}
        options={false}
        toolBarRender={() => []}
      />
      <OptionModal modalShow={modalShow} setModalVisible={(flag: boolean) => setModalShow(flag)}/>
      <InviteModal onCancel={() => {
        setVisible(false)
      }} onSubmit={inviteSubmit} visible={visible}/>
    </div>
  );
};
