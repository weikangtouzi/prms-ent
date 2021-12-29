import {Avatar, Button, Modal, Select, Space, Tooltip} from "antd";
import type {ActionType, ProColumns} from "@ant-design/pro-table";
import ProTable from "@ant-design/pro-table";
import {ExclamationCircleOutlined, PlusOutlined} from "@ant-design/icons";
import {useRef, useState} from "react";
import {history} from "umi";
import {useQuery} from "@apollo/client";
import {GET_JOB_LIST} from "@/services/gqls/employ";
import {get_enterprise_member} from "@/services/gqls/enterprise";
import moment from "moment";


const {confirm} = Modal;

const Employ = () => {
  const actionRef = useRef<ActionType>();
  const {data={UserGetEnterpriseDetail_WorkerList:[]}} = useQuery<ResultDataType<'UserGetEnterpriseDetail_WorkerList', Enterprise.member_info[]>>(get_enterprise_member)
  console.log(data)
  const {refetch} = useQuery<ResultDataType<'UserGetJobListByEntId', Employ.JobList>,
    {
      page?: number,
      pageSize?: number,
      title?: string,
      status?: string,
      workerId: number
    }>(GET_JOB_LIST)
  const [modalShow, setModalShow] = useState(false)
  const showConfirm = () => {
    confirm({
      title: '确认要下线这个职位吗?',
      icon: <ExclamationCircleOutlined/>,
      content: '下线后职位不能被浏览和投简历',
      onOk() {
        console.log('OK');
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }
  const columns: ProColumns<Employ.JobDetail>[] = [
    // {
    //   dataIndex: 'index',
    //   valueType: 'indexBorder',
    //   width: 48,
    // },
    {
      title: '职位名称',
      dataIndex: 'title',
      ellipsis: true,
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
        const desc = r.address_description || []
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
      dataIndex: 'min_education',
      valueType: 'select',
      hideInSearch: true,
      valueEnum: {
        LessThanPrime: {
          text: '小学以下',
        },
        Primary: {
          text: '小学',
        },
        Junior: {
          text: '初中',
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
      dataIndex: 'min_experience',
      hideInSearch: true,
      render: (_, r) => r.min_experience + '年以上'
    },
    {
      title: '薪资待遇',
      hideInSearch: true,
      dataIndex: 'salary',
      render: (_, r) => {
        return `${r.min_salary / 1000}k-${r.max_salary / 1000}k`
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
        NotPublished: {
          text: '未发布',
        },
        OffLine: {
          text: '已下线',
          status: 'Error',
          disabled: true,
        },
        InRecruitment: {
          text: '招聘中',
          status: 'Processing',
        },
      },
    },
    {
      title: '发布人',
      dataIndex: 'hr_name',
      render: (_, r) => {
        return <Space>
          <Avatar src={r.logo} size={"small"}/>{r.hr_name}
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
            options={data?.UserGetEnterpriseDetail_WorkerList.map(d=>{
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
      title: '上线时间',
      dataIndex: 'createdAt',
      hideInSearch: true,
      render:(_,r)=>moment(r.createdAt).format("YYYY-MM-DD HH:mm:ss")
    },

    {
      title: '操作',
      valueType: 'option',
      width: 200,
      render: (text, record,) =>
        <Space>
          <Button type={"link"}
                  key="editable"
                  className='padding-0'
                  onClick={() => {
                    history.push(`/employ/position/edit?id=${record.id}`)
                  }}
          >
            修改
          </Button>
          {record.hr_name === 'open'
          && <Button type={"link"} key="editable"
                     className='padding-0'
                     onClick={() => {
                     }}>
            刷新
          </Button>}
          {record.hr_name === 'open'
          && <Button type={"link"} key="editable"
                     className='padding-0'
                     onClick={() => {
                     }}>
            置顶
          </Button>}
          {record.hr_name !== 'open'
          && <Button type={"link"} key="editable"
                     className='padding-0'
                     onClick={() => {
                     }}>
            取消置顶
          </Button>}
          {record.hr_name === 'open'
          && <Button type={"link"} key="editable"
                     className='padding-0'
                     onClick={() => {
                       setModalShow(true)
                     }}>
            分享合作
          </Button>}
          {record.hr_name === 'open'
          && <Button type={"link"} key="editable"
                     className='padding-0'
                     onClick={showConfirm}>
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
      const res = await refetch({
        page: params.current === undefined ? 0 : params.current - 1,
        pageSize: params.pageSize,
        status:params.status,
        title:params.title,
        workerId:params.hr_name
      });
      const list = res.data.UserGetJobListByEntId?.data
      return {
        data: list,
        success: true,
        total: res.data.UserGetJobListByEntId?.count
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
    headerTitle={<Button key="button" icon={<PlusOutlined/>} type="primary" onClick={() => {
      history.push('/employ/position/publish')
    }}>
      发布职位
    </Button>}
    options={false}
  />
}

export default Employ;
