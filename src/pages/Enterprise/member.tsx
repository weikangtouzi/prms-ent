import {useRef, useState} from 'react';
import {PlusOutlined} from '@ant-design/icons';
import {Button, Image, message, Popconfirm} from 'antd';
import type {ProColumns, ActionType} from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import OptionModal from './memberParts/optionalModal'
import InviteModal from "@/pages/Enterprise/memberParts/inviteModal";
import {defaultImage} from "@/common/js/const";
import Moment from "moment";

export default () => {
  const actionRef = useRef<ActionType>();
  const [modalShow, setModalShow] = useState(false)
  const [visible, setVisible] = useState<boolean>(false);

  const inviteMember = () => {
    setVisible(true)
  }

  const inviteSubmit = (values: Enterprise.invite_data) => {
  	// HTAPI.ENTPrecheckForInviteWorkMate({
  	// 	phoneNumber: values.phoneNumber
  	// }).then(() => {
  		HTAPI.ENTInviteWorkMate({
	  		phoneNumber: values.phoneNumber,
	      role: values.role
	  	}).then(() => {
	      message.success('邀请成功')
	      setVisible(false)
	    })
  	// })
  }

  const columns: ProColumns<Enterprise.member_info>[] = [
    {
      dataIndex: 'id',
      title: 'id',
      hideInSearch: true,
    },
    {
      title: '成员姓名',
      dataIndex: 'name',
      hideInSearch: true
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
      title: '职位',
      dataIndex: 'pos',
      hideInSearch: true
    },
    {
      title: '角色',
      dataIndex: 'role',
      hideInTable: true,
      valueEnum: {
      	'None': {
      		text: '全部'
      	},
      	'HR': {
      		text: 'HR'
      	},    
      	'Teacher': {
      		text: 'Teacher'
      	},    
      	'Admin': {
      		text: 'Admin',
      	},
      }
    },
    // {
    //   title: '状态',
    //   dataIndex: 'disabled',
    //   valueType: 'select',
    //   fieldProps: {
    //     options: [
    //       {
    //         label: '全部',
    //         value: 'all',
    //         status: 'error'
    //       },
    //       {
    //         label: '已禁用',
    //         value: true,
    //       },
    //       {
    //         label: '生效中',
    //         value: false,
    //         status: 'error'
    //       },
    //     ],
    //   },
    // },
    // {
    //   title: '入驻时间',
    //   dataIndex: 'createdAt',
    //   hideInSearch: true,
    //   render: (_, r) => {
    //     return Moment(Number(r.createdAt)).format('YYYY-MM-DD HH:mm:ss')
    //   }
    // },
    {
      title: '操作',
      valueType: 'option',
      render: (text, record,) => [
        <Popconfirm
          key='action'
          onConfirm={() => {
            if(!record.disabled){
              HTAPI.ENTSetDisabled({
              	workerId:record.id
              }).then(()=>{
                message.success('已禁用该用户').then()
                actionRef.current?.reload()
              })
            }else{
            	HTAPI.ENTSetEnabled({
            		id:record.id
            	}).then(()=>{
                message.success('已解封该用户').then()
                actionRef.current?.reload()
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
        // <Popconfirm
        //   key='del'
        //   onConfirm={() => {
        //   	HTAPI.ENTRemoveWorker({
        //   		workerId:record.id,
        //       role:record?.role ?? 'HR'
        //   	}).then(()=>{
        //       message.success('删除该用户成功').then()
        //       actionRef.current?.reload()
        //     })
        //   }}
        //   onCancel={() => {
        //   }}
        //   title='确定要删除这个用户吗'
        // >
        //   <a type={'link'} style={{color: 'red'}} key={'del'}>
        //     删除
        //   </a>
        // </Popconfirm>
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
          const res = await HTAPI.UserGetEnterpriseDetail_WorkerList({ role: params?.role })
          const list = res
          return {
            data: list,
            success: true,
            total: list,
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
        headerTitle={  <Button style={{ marginTop: 15 }} key="button" icon={<PlusOutlined/>} type="primary" onClick={() => {
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
