import {Button, Modal, Space} from "antd";
import type {ActionType, ProColumns} from "@ant-design/pro-table";
import ProTable from "@ant-design/pro-table";
import {ExclamationCircleOutlined, PlusOutlined} from "@ant-design/icons";
import {useRef, useState} from "react";
import {history} from "umi";
import {useQuery} from "@apollo/client";
import {GET_JOB_LIST} from "@/services/gqls/employ";
import moment from "moment";


const {confirm} = Modal;

const Employ = () => {
  const actionRef = useRef<ActionType>();
  const {refetch} = useQuery<ResultDataType<'UserGetJobListByEntId', Employ.JobList>,{page: number,pageSize: number}>(GET_JOB_LIST)
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
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
    },
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
      title: '地区',
      dataIndex: 'loc',
      ellipsis: true,
      hideInSearch: true
    },
    {
      title: '学历要求',
      dataIndex: 'education',
      valueType: 'select',
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
      title: '薪资待遇',
      dataIndex: 'salary',
      render:(_,r)=>{
        return `${r.salary[0]/1000}k-${r.salary[1]/1000}k`
      }
    },
    {
      title: '上线时间',
      dataIndex: 'createdAt',
      render:(_,r)=>{
        return moment(Number(r.createdAt)).format('YYYY-MM-DD hh:mm:ss')
      }
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
                    history.push(`/employ/position/edit?id=${record.id}`)
                  }}
          >
            修改
          </Button>
          {record.state === 'open'
          && <Button type={"link"} key="editable"
                     className='padding-0'
                     onClick={() => {
                     }}>
            刷新
          </Button>}
          {record.state === 'open'
          && <Button type={"link"} key="editable"
                     className='padding-0'
                     onClick={() => {
                     }}>
            置顶
          </Button>}
          {record.state !== 'open'
          && <Button type={"link"} key="editable"
                     className='padding-0'
                     onClick={() => {
                     }}>
            取消置顶
          </Button>}
          {record.state === 'open'
          && <Button type={"link"} key="editable"
                     className='padding-0'
                     onClick={() => {
                       setModalShow(true)
                     }}>
            分享合作
          </Button>}
          {record.state === 'open'
          && <Button type={"link"} key="editable"
                     className='padding-0'
                     onClick={showConfirm}>
            下线
          </Button>}
        </Space>
    },
  ];
  return<ProTable<Employ.JobDetail>
    columns={columns}
    actionRef={actionRef}
    request={async (
      params,
    ) => {
      const res = await refetch({
        page:params.current===undefined?0:params.current-1,
        pageSize:params.pageSize
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
    headerTitle="职位管理"
    options={false}
    toolBarRender={() => [
      <Button key="button" icon={<PlusOutlined/>} type="primary" onClick={() => {
        history.push('/employ/position/publish')
      }}>
        发布职位
      </Button>
    ]}
  />
}

export default Employ;
