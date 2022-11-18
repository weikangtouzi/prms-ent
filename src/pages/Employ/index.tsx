import {Avatar, Button, Modal, Select, Space, Tooltip, message} from "antd";
import type {ActionType, ProColumns} from "@ant-design/pro-table";
import ProTable from "@ant-design/pro-table";
import {ExclamationCircleOutlined, PlusOutlined} from "@ant-design/icons";
import {useRef, useState, useEffect} from "react";
import {history} from "umi";
import moment from "moment";

import HTAuthManager from '@/common/auth/common/model/HTAuthManager'

const {confirm} = Modal;

const Employ = () => {
  const actionRef = useRef<ActionType>();

  const [workerList, setWorkerList] = useState([])
  // useEffect(() => {
  // 	HTAPI.UserGetEnterpriseDetail_WorkerList().then(response => {
  // 		setWorkerList(response)
  // 	})
  // }, [])
  const [modalShow, setModalShow] = useState(false)
  const showConfirm = (record) => {
    confirm({
      title: '确认要下线这个职位吗?',
      icon: <ExclamationCircleOutlined/>,
      content: '下线后职位不能被浏览和投简历',
      onOk() {
        HTAPI.HRHideJob({
        	jobId: record.id
        }).then(response => {
        	message.success('下线成功')
        	actionRef.current.reload()
        })
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }
  const columns: ProColumns<Employ.JobDetail>[] = [
    {
      dataIndex: 'id',
      title: 'id',
      hideInSearch: true
    },
    {
      title: '职位名称',
      dataIndex: 'title',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项为必填项',
          },
        ],
      },
    },
    {
      title: '类型',
      dataIndex: 'category',
      ellipsis: true,
      hideInSearch: true,
      render:(_,r)=>{
        return r.category?r.category[r.category.length-1]:'-'
      }
    },
    {
      title: '地区',
      dataIndex: 'address_description',
      width:200,
      ellipsis: {
        showTitle:false
      },
      hideInSearch: true,
      render: (_,r)=>{
        const desc = r.address || []
        if(desc.length>3){
          const add =  desc.slice(3,6).join('-')
          return <Tooltip placement="topLeft" title={add}>
            {add}
          </Tooltip>
        }
        else{
          return  '--'
        }
      },
    },
    {
      title: '学历要求',
      dataIndex: 'education',
      valueType: 'select',
      hideInSearch: true,
      valueEnum: {
      	Null: {
      		text: '高中以下'
      	},
        High: {
          text: '高中',
        },
        JuniorCollege: {
          text: '大专',
        },
        RegularCollege: {
          text: '本科',
        },
        Postgraduate: {
          text: '硕士',
        },
        Doctor: {
          text: '博士',
        },
      },
    },
    {
      title: '经验要求',
      dataIndex: 'experience',
      hideInSearch: true,
      render: (_, r) => r.experience + '年以上'
    },
    {
      title: '薪资待遇',
      hideInSearch: true,
      dataIndex: 'salary',
      render: (_, r) => {
      	if (r?.salary?.[0] == 0 && r?.salary?.[1] == 0) {
      		return `面议`
      	}
        return `${r?.salary?.[0] / 1000}k-${r?.salary?.[1] / 1000}k`
      }
    },
    {
      title: '浏览数',
      dataIndex: 'views',
      hideInSearch: true,
    },
    {
      title: '简历数',
      dataIndex: 'resumeCount',
      hideInSearch: true,
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueEnum: {
        '': { text: '全部', status: 'Default' },
        NotPublishedYet: {
        	text: '未发布',
        },
        OffLine: {
          text: '已下线',
          status: 'Error',
        },
        InRecruitment: {
          text: '招聘中',
          status: 'Processing',
        },
      },
    },
    {
      title: '发布人',
      dataIndex: 'hrname',
      hideInSearch: true,
      hideInTable: HTAuthManager?.keyValueList?.enterpriseRole?.toLowerCase() != 'admin',
      render: (_, r) => {
        return <Space>
          <Avatar src={r.logo} size={"small"}/>{r.hrname}
        </Space>
      },
      renderFormItem: (_, { type, defaultRender, formItemProps, fieldProps, ...rest }, form) => {
        if (type === 'form') {
          return null;
        }
        return (
          // value 和 onchange 会通过 form 自动注入。
          <Select
            // 组件的配置
            {...fieldProps}
            options={workerList.map(d=>{
                return {
                  value:d.id,
                  label:d.name
                }
              })
            }
            // 自定义配置
            placeholder="请选择"
          />
        );
      }
    },
    {
      title: '最后更新时间',
      dataIndex: 'updatedAt',
      hideInSearch: true,
      render:(_,r)=>moment(Number(r?.updatedAt ?? r?.createdAt)).format("YYYY-MM-DD HH:mm:ss")
    },

    {
      title: '操作',
      valueType: 'option',
      render: (text, record,) =>
        <Space>
          <Button type={"link"}
                  key="editable"
                  className='padding-0'
                  onClick={() => {
                    history.push(`/employ/position/edit?id=${record.job_id}`)
                  }}
          >
            修改
          </Button>
          {record.status == 'InRecruitment'
          && <Button type={"link"} key="editable"
                     className='padding-0'
                     onClick={() => showConfirm(record)}>
            下线
          </Button>}
        </Space>
    },
  ];
  return <ProTable<Employ.JobDetail>
    columns={columns}
    actionRef={actionRef}
    request={async (
      params,
    ) => {
      const res = await HTAPI.UserGetJobListByEntId({
        page: params.current === undefined ? 0 : params.current - 1,
        pageSize: params.pageSize,
        status:params.status,
        title:params.title,
        workerId:params.hr_name
      });
      const list = res?.data
      return {
        data: list,
        success: true,
        total: res.count
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
    headerTitle={<Button style={{ marginTop: 15 }} key="button" icon={<PlusOutlined/>} type="primary" onClick={() => {
      history.push('/employ/position/edit')
    }}>
      发布职位
    </Button>}
    options={false}
  />
}

export default Employ;
