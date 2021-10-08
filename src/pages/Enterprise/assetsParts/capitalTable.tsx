import {useRef, useState} from 'react';
import {Avatar} from 'antd';
import type {ProColumns, ActionType} from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import Share from './share'
import Transfer from './transfer'
import request from 'umi-request';

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


export default () => {
  const actionRef = useRef<ActionType>();

  const [shareModalShow,setShareModalShow] = useState(false)
  const [transferModalShow,setTransferModalShow] = useState(true)

  const columns: ProColumns<GithubIssueItem>[] = [
    {
      dataIndex: 'avatar',
      width: 60,
      render: (_, item) => <Avatar src={item.avatar}/>
    },
    {
      title: '成员姓名',
      dataIndex: 'user',
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
      title: '描述',
      dataIndex: 'title',
      hideInSearch:true,
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
      title: '操作',
      valueType: 'option',
      render: (text, record,) => [
        <a
          key="editable"
          onClick={() => {
          }}
        >
          分配
        </a>,
        <a href={record.url} target="_blank" rel="noopener noreferrer" key="view">
          转移
        </a>
      ],
    },
  ];

  return (
    <div>
      <ProTable<GithubIssueItem>
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
        toolBarRender={false}
      />
      <Share
        handleCancel={()=>{setShareModalShow(false)}}
        handleOk={()=>{setShareModalShow(false)}}
        isModalVisible={shareModalShow}
      />
      <Transfer
        handleCancel={()=>{setTransferModalShow(false)}}
        handleOk={()=>{setTransferModalShow(false)}}
        isModalVisible={transferModalShow}
      />
    </div>
  );
};
