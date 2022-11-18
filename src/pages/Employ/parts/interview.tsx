import type {ActionType, ProColumns} from "@ant-design/pro-table";
import ProTable from "@ant-design/pro-table";
import {useRef} from "react"
import MinMax from "@/components/FormSalary";
import FormSingleTree from "@/components/FormSingleTree";

const Interview = ({ status })=>{
  const actionRef = useRef<ActionType>()


  const columns: ProColumns<Employ.jobHunter>[] = [
    {
    	title: 'id',
      dataIndex: 'id',
      hideInSearch: true
    },
    {
      title: '人才',
      dataIndex: 'name',
      hideInSearch:true
    },
    {
    	title: '头像',
    	dataIndex: 'logo',
    	valueType: 'avatar',
    	hideInSearch: true
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
      hideInSearch: true,
      render: (_,r)=>{
      	return (
      		<label>
      			{r.job_expectation.map(item => `${item.job_category}_${item.aimed_city}_${item.min_salary_expectation}-${item.max_salary_expectation}`).map(item => (<div>{item}</div>))}
      		</label>
      	)
      },
      renderFormItem:(r)=>{
        return <FormSingleTree url={'https://be.chenzaozhao.com/preludeDatas/job_category.json'}/>
      }
    },
    {
      title: '所在城市',
      dataIndex: 'current_city',
      hideInSearch:true
    },
    {
    	title: '技能',
      dataIndex: 'resume_data',
      render: (_, r) => {
      	return r?.resume_data?.skills
      },
      hideInSearch:true
    },
    // {
    //   title: '期望薪资',
    //   dataIndex: 'salary',
    //   render:(_,r)=>{
    //   	return null
    //     if(r.salary && r.salary.length>1){
    //       return (r.min_salary_expectation/1000).toFixed(0)+ 'k~' + (r.max_salary_expectation/1000).toFixed(0)+'k'
    //     }else{
    //       return (r.salary[0]/1000).toFixed(0) + 'k'
    //     }
    //   },
    //   renderFormItem:()=>{
    //     return <MinMax/>
    //   }
    // },
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
          disabled
          onClick={() => {
          }}
        >
          打招呼
        </a>,
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
      const res = await HTAPI.ENTSearchCandidates({
        page: params.current === undefined ? 0 : params.current - 1,
        pageSize: params.pageSize,
        filter: {
        	salary:params.salary,
	        education:params.education,
	        // expectation: params.job_expectation && params.job_expectation.length>0?params.job_expectation[params.job_expectation.length-1]:null,
	        interview_status: status
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

export default Interview
