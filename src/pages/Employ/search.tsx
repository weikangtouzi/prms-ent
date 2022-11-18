import type {ActionType, ProColumns} from "@ant-design/pro-table";
import ProTable from "@ant-design/pro-table";
import {useRef, useState} from "react";
import MinMax from "@/components/FormSalary";

const Search = ()=>{
  const actionRef = useRef<ActionType>();
  const  [modalShow,setModalShow] = useState(false)


  const columns: ProColumns<Employ.jobHunter>[] = [
    {
      dataIndex: 'id',
      title: 'id',
      hideInSearch: true
    },
    {
    	dataIndex: 'keyword',
    	title: '关键词',
    	hideInTable: true,
    },
    {
    	title: '头像',
    	dataIndex: 'logo',
    	valueType: 'avatar',
    	hideInSearch: true,
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
      title: '工作经验',
      dataIndex: 'experience',
      hideInSearch:true,
      render: (_,r)=>{
         return r.experience?r.experience+'年':'-'
      }
    },
    // {
    //   title: '期待岗位',
    //   dataIndex: 'job_expectation',
    //   hideInSearch:true
    // },
    {
    	title: '当前城市',
    	hideInSearch: true,
    	dataIndex: 'current_city'
    },
    {
      title: '期望薪资',
      dataIndex: 'salary',
      hideInSearch: true,
      render:(_,r)=>{
      	  const salaryInfo = r?.job_expectation?.[0]
         if(salaryInfo){
           return salaryInfo.min_salary_expectation+ '~' + salaryInfo.max_salary_expectation
         }
      },
      renderFormItem:()=>{
        return <MinMax/>
      }
    },
    // {
    //   title: '状态',
    //   dataIndex: 'interview_status',
    //   valueType: 'select',
    //   hideInSearch:true,
    //   valueEnum: {
    //     all: {text: '全部', status: 'Default'},
    //     NoJobButNoJob: {
    //       text: '不想找工作的无业游民',
    //     },
    //     NoJobButWantJob: {
    //       text: '离职状态的求职者',
    //     },
    //     OnTheJob: {
    //       text: '有工作，但无求职意向',
    //     },
    //     OnTheJobButLookingForAJob: {
    //       text: '准备跳槽下家的在职者',
    //     },
    //     GraduatingStudent: {
    //       text: '应届生',
    //     },
    //   },
    // },
    // {
    //   title: '最近活跃时间',
    //   dataIndex: 'last_log_out_time',
    //   hideInSearch:true
    // },
    {
      title: '操作',
      valueType: 'option',
      render: (text, record, ) => [
        // <a
        //   key="editable"
        //   onClick={() => {
        //     setModalShow(true)
        //   }}
        // >
        //   打招呼
        // </a>,
        // <a href={record.url} target="_blank" rel="noopener noreferrer" key="view">
        //   求简历
        // </a>
        <a
          key="resume"
          onClick={() => {
          	
          }}
        >
          查看简历
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
        	console.log(params)
          const res = await HTAPI.ENTSearchCandidates({
            page: params.current === undefined ? 0 : params.current - 1,
            pageSize: params.pageSize,
            filter: {
            	salary:params.salary,
            	education:params.education,
            	keyword: params.keyword
            }
          });
          const list = res?.data
          return {
            data: list,
            success: true,
            total: res?.count
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

export default Search
