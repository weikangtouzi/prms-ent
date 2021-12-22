import {useRef} from 'react';
import type {ProColumns, ActionType} from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import request from 'umi-request';
import {Button} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {history} from "@@/core/history";

type GithubIssueItem = {
  url: string;
  id: number;
  number: number;
  avatar: string;
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


const Communicate =  () => {
  const actionRef = useRef<ActionType>();

  const columns: ProColumns<GithubIssueItem>[] = [
    {
      title: '分类',
      dataIndex: 'user',
      hideInTable:true,
      valueType: 'select',
      valueEnum: {
        all: {text: '全部', status: 'Default'},
        income: {
          text: '收入',
          status: '',
        },
        out: {
          text: '支出',
          status: '',
        }
      },
    },
    {
      title: '类型',
      dataIndex: 'user',
      valueEnum: {
        all: {text: '全部', status: 'Default'},
        course: {
          text: '课程售卖',
          status: '',
        },
        refresh: {
          text: '刷新',
          status: '',
        },
        communicate: {
          text: '沟通',
          status: '',
        },
        top: {
          text: '置顶',
          status: '',
        },
        ad: {
          text: '广告位',
          status: '',
        },
        withdraw: {
          text: '提现',
          status: '',
        }
      },
    },
    {
      title: '详情',
      dataIndex: 'title',
      hideInSearch:true,
      ellipsis: true,
    },
    {
      title: '金额',
      dataIndex: 'number',
      hideInSearch:true,
      ellipsis: true,
    },
    {
      title: '状态',
      dataIndex: 'state',
      hideInSearch:true,
      ellipsis: true,
    },
    {
      title: '交易号',
      dataIndex: 'state',
      hideInSearch:true,
      ellipsis: true,
    },
    {
      title: '交易时间',
      dataIndex: 'created_at',
      hideInSearch:true,
      ellipsis: true,
    },
    {
      title: '操作',
      valueType: 'option',
      render: (text, record,) => [
        <a
          key="editable"
          onClick={() => {
          }}
        >
          查看
        </a>
      ],
    },
  ];

  return <ProTable<GithubIssueItem>
        columns={columns}
        actionRef={actionRef}
        request={async (params = {}, sort, filter) => {
          console.log(sort, filter);
          return request<{
            data: GithubIssueItem[];
          }>('https://proapi.azurewebsites.net/github/issues', {
            params,
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
        options={false}
      />;
};
export default Communicate;
