import {PageHeaderWrapper} from "@ant-design/pro-layout";
import {Button, Modal, Space} from "antd";
import type {ActionType, ProColumns} from "@ant-design/pro-table";
import ProTable from "@ant-design/pro-table";
import request from "umi-request";
import {ExclamationCircleOutlined, PlusOutlined} from "@ant-design/icons";
import {useRef, useState} from "react";
import {history} from "umi";
import ShareModal from "@/pages/Employ/shareModal";
import CascaderFC from './cascader'
import Salary from "@/pages/Employ/Salary";

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
const { confirm } = Modal;

const People = () => {
  const actionRef = useRef<ActionType>();
  const [modalShow, setModalShow] = useState(false)

  const columns: ProColumns<GithubIssueItem>[] = [
    {
      title: '求职意向',
      dataIndex: 'title',
      ellipsis: true,
    },
    {
      title: '经验要求',
      dataIndex: 'state',
      valueType: 'select',
      valueEnum: {
        all: {text: '不限', status: 'Default'},
        open: {
          text: '1~3年',
        },
        closed: {
          text: '3~5年',
        },
        processing: {
          text: '5~10年',
        },
        end: {
          text: '10年以上',
        },
      },
    },
    {
      title: '学历要求',
      dataIndex: 'state',
      valueType: 'select',
      valueEnum: {
        all: {text: '不限', status: 'Default'},
        open: {
          text: '初中',
        },
        closed: {
          text: '高中',
        },
        processing: {
          text: '本科',
        },
      },
    },
    {
      title: '期望城市',
      dataIndex: 'labels',
      renderFormItem:()=> <CascaderFC/>,
    },
    {
      title: '期望薪资',
      dataIndex: 'price',
      renderFormItem:()=> <Salary/>,
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
                  }}
          >
            打招呼
          </Button>
          <Button type={"link"}
                  key="editable"
                  className='padding-0'
                  onClick={() => {
                  }}
          >
            求简历
          </Button>
        </Space>
    },
  ];
  return <PageHeaderWrapper>
    <ProTable<GithubIssueItem>
      columns={columns}
      actionRef={actionRef}
      request={async (params = {}, sort, filter) => {
        console.log(params, filter);
        return request<{
          data: GithubIssueItem[];
        }>('https://proapi.azurewebsites.net/github/issues', {
          params:{...params,labels:null,city:params?.labels?.[0]}
        });
      }}
      columnsState={{
        persistenceKey: 'pro-table-singe-demos',
        persistenceType: 'localStorage',
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
        <Button key="button" icon={<PlusOutlined/>} type="primary" onClick={()=>{history.push('/employ/position/publish')}}>
          发布职位
        </Button>
      ]}
    />
    <ShareModal modalShow={modalShow} setModalVisible={(flag: boolean)=>setModalShow(flag)} />
  </PageHeaderWrapper>
}

export default People;
