import { Space, Tag} from "antd";
import ProTable, {ActionType, ProColumns} from "@ant-design/pro-table";
import request from "umi-request";
import {useRef, useState} from "react";

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
const Search = ()=>{
  const actionRef = useRef<ActionType>();
  const  [modalShow,setModalShow] = useState(false)


  const columns: ProColumns<GithubIssueItem>[] = [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: '成员姓名',
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
      title: '标签',
      dataIndex: 'labels',
      search: false,
      renderFormItem: (_, {defaultRender}) => {
        return defaultRender(_);
      },
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
      render: (text, record, ) => [
        <a
          key="editable"
          onClick={() => {
            setModalShow(true)
          }}
        >
          打招呼
        </a>,
        <a href={record.url} target="_blank" rel="noopener noreferrer" key="view">
          求简历
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
      />

}

export default Search
