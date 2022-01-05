import type {ActionType, ProColumns} from "@ant-design/pro-table";
import ProTable from "@ant-design/pro-table";
import {useRef} from "react";
import {useQuery} from "@apollo/client";
import {GET_COMMUNICATE_LIST} from "@/services/gqls/employ";
import MinMax from "@/components/FormSalary";

const Communicate = ()=>{
  const actionRef = useRef<ActionType>();
  const {refetch} = useQuery<ResultDataType<'UserGetContractList', Employ.communicate_list[]>>(GET_COMMUNICATE_LIST)


  const columns: ProColumns<Employ.jobHunter>[] = [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: '人才',
      dataIndex: 'name',
      hideInSearch:true
    },
    {
      title: '性别',
      hideInSearch:true,
      dataIndex: 'gender',
      render: (_,r)=>{
        return r.gender?'男':'女'
      }
    },
    {
      title: '年龄',
      dataIndex: 'age',
      hideInSearch:true
    },
    {
      title: '学历',
      dataIndex: 'education',
      valueType:'select',
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
      title: '经验',
      dataIndex: 'experience',
      hideInSearch:true,
      render: (_,r)=>{
        return r.experience?r.experience+'年':'-'
      }
    },
    {
      title: '期待岗位',
      dataIndex: 'job_expectation',
      hideInSearch:true
    },
    {
      title: '期望城市',
      dataIndex: 'aimed_city',
      hideInSearch:true
    },
    {
      title: '期望薪资',
      dataIndex: 'salary',
      render:(_,r)=>{
        if(r.salary && r.salary.length>1){
          return (r.salary[0]/1000).toFixed(0)+ 'k~' + (r.salary[1]/1000).toFixed(0)+'k'
        }else{
          return (r.salary[0]/1000).toFixed(0) + 'k'
        }
      },
      renderFormItem:()=>{
        return <MinMax/>
      }
    },
    {
      title: '状态',
      dataIndex: 'job_status',
      valueType: 'select',
      hideInSearch:true,
      valueEnum: {
        all: {text: '全部', status: 'Default'},
        NoJobButNoJob: {
          text: '不想找工作的无业游民',
        },
        NoJobButWantJob: {
          text: '离职状态的求职者',
        },
        OnTheJob: {
          text: '有工作，但无求职意向',
        },
        OnTheJobButLookingForAJob: {
          text: '准备跳槽下家的在职者',
        },
        GraduatingStudent: {
          text: '应届生',
        },
      },
    },
    {
      title: '最近活跃时间',
      dataIndex: 'last_log_out_time',
      hideInSearch:true
    },
    {
      title: '操作',
      valueType: 'option',
      render: (text, record, ) => [
        <a
          key="editable"
          onClick={() => {
          }}
        >
          打招呼
        </a>,<a href={record?.education} target="_blank" rel="noopener noreferrer" key="view">
          求简历
        </a>

      ],
    },
  ];
  return <ProTable<Employ.jobHunter>
    columns={columns}
    actionRef={actionRef}
    request={async (
      params,
    ) => {
      const res = await refetch({
        page: params.current === undefined ? 0 : params.current - 1,
        pageSize: params.pageSize,
        salary:params.salary,
        education:params.education,
      });
      const list = res.data.ENTSearchCandidates?.data
      return {
        data: list,
        success: true,
        total: res.data.ENTSearchCandidates?.count
      };
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
      pageSize: 10,
    }}
    dateFormatter="string"
    options={false}
  />

}

export default Communicate
