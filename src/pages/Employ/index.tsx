import {Button, Modal, Space, Tag} from "antd";
import type {ActionType, ProColumns} from "@ant-design/pro-table";
import ProTable from "@ant-design/pro-table";
import {ExclamationCircleOutlined, PlusOutlined} from "@ant-design/icons";
import {useRef, useState} from "react";
import {history} from "umi";
import {useQuery} from "@apollo/client";
import {GET_JOB_LIST} from "@/services/gqls/employ";

type GithubIssueItem = {
  url: string;
  id: number;
  number: number;
  title: string;
  labels: {
    name: string;
    color: string;
  }[];
  state: string;
  comments: number;
  created_at: string;
  updated_at: string;
  closed_at?: string;
};
const {confirm} = Modal;

const Employ = () => {
  const actionRef = useRef<ActionType>();
  const {refetch} = useQuery(GET_JOB_LIST)
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
  const columns: ProColumns<GithubIssueItem>[] = [
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
      title: '类型',
      dataIndex: 'title',
      ellipsis: true,
      hideInSearch: true
    },
    {
      title: '地区',
      dataIndex: 'title',
      ellipsis: true,
      hideInSearch: true
    },
    {
      title: '状态',
      dataIndex: 'state',
      valueType: 'select',
      valueEnum: {
        all: {text: '全部', status: 'Default'},
        open: {
          text: '未解决',
          status: 'Error',
        },
        closed: {
          text: '已解决',
          status: 'Success',
          disabled: true,
        },
        processing: {
          text: '解决中',
          status: 'Processing',
        },
      },
    },
    {
      title: '发布来源',
      dataIndex: 'labels',
      render: (_, record) => (
        <Space>
          {record.labels.map(({name, color}) => (
            <Tag color={color} key={name}>
              {name}
            </Tag>
          ))}
        </Space>
      ),
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
  return<ProTable<GithubIssueItem>
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
      pageSize: 5,
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
