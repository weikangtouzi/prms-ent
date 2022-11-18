import type {ActionType, ProColumns} from "@ant-design/pro-table";
import ProTable from "@ant-design/pro-table";
import {useRef} from "react"
import { message } from 'antd'
import MinMax from "@/components/FormSalary"
import {ModalForm} from "@ant-design/pro-form"

const Communicate = ()=>{
  const actionRef = useRef<ActionType>()

  const columns: ProColumns<Employ.jobHunter>[] = [
    {
    	title: 'id',
      dataIndex: 'id',
      hideInSearch: true,
    },
    {
      title: '人才',
      dataIndex: 'name',
      hideInSearch:true
    },
    {
      title: '头像',
      dataIndex: 'logo',
      hideInSearch:true,
      valueType: 'avatar'
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
    // {
    //   title: '学历',
    //   dataIndex: 'education',
    //   valueType:'select',
    //   valueEnum: {
    //     LessThanPrime: {
    //       text: '小学以下',
    //     },
    //     Primary: {
    //       text: '小学',
    //     },
    //     Junior: {
    //       text: '初中',
    //     },
    //     High: {
    //       text: '高中',
    //     },
    //     JuniorCollege: {
    //       text: '大专',
    //     },
    //     RegularCollege: {
    //       text: '本科',
    //     },
    //     Postgraduate: {
    //       text: '硕士',
    //     },
    //     Doctor: {
    //       text: '博士',
    //     },
    //   },
    // },
    {
      title: '经验',
      dataIndex: 'exp',
      hideInSearch:true,
      render: (_,r)=>{
        return r.exp?r.exp+'年':'-'
      }
    },
    {
      title: '期待岗位',
      dataIndex: ['job','title'],
      hideInSearch:true
    },
    {
      title: '期望城市',
      dataIndex: 'city_expectation',
      hideInSearch:true
    },
    {
      title: '期望薪资',
      dataIndex: 'salary',
      render:(_,r)=>{
         const salaryInfo = r?.salary_expectations
         if(salaryInfo){
           return salaryInfo[0]+ '~' + salaryInfo[1]
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
    // {
    //   title: '最近活跃时间',
    //   dataIndex: 'last_log_out_time',
    //   hideInSearch:true
    // },
    {
      title: '操作',
      valueType: 'option',
      render: (text, record, ) => [
        <a
          key="invite"
          onClick={() => {
          	HTAPI.HRInviteInterview({
          		userId: record?.id,
          		jobId: record?.job?.id,
          		time: [new Date().toISOString(), new Date().toISOString()]
          	}).then(response => {
          		message.success('邀请成功')
          	})
          }}
        >
          邀面试
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
  return <>
  <ProTable<Employ.jobHunter>
    columns={columns}
    actionRef={actionRef}
    request={async (
      params,
    ) => {
      const res = await HTAPI.UserGetContractList({
        // page: params.current === undefined ? 0 : params.current - 1,
        // pageSize: params.pageSize,
        // salary:params.salary,
        // education:params.education,
      });
      const list = res
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
    search={false}
    pagination={{
      pageSize: 10,
    }}
    dateFormatter="string"
    options={false}
  />
	{/*<ModalForm
	  title={`新${newNameTypeValue?.title}`}
	  width={480}
	  visible={(newNameType?.length ?? 0) > 0}
	  modalProps={{
	    destroyOnClose: false,
	    onCancel: () => {
	    	setNewNameType('')
	    }
	  }}
	  onFinish={async () => {
	  	newNameTypeValue?.onSubmit()
	  }}
	>
	</ModalForm>*/}
  </>
}

export default Communicate
