import {Button, Card, Form, Input, InputNumber, message, Select, Space} from "antd";
import {formItemLayout, tailFormItemLayout} from "@/common/js/config";

import FormSingleTree from "@/components/FormSingleTree";
import styles from './index.less';
import FormCascade from "@/components/formCascade";
import FormCoordinate from "@/components/FormCoordinate";
import {ProFormDateRangePicker, ProFormSwitch} from "@ant-design/pro-form";
import {useMutation} from "@apollo/client";
import {EDIT_JOB} from "@/services/gqls/employ";
import { useLocation } from 'umi';

const Edit = () => {
  const [form] = Form.useForm();
  const location = useLocation();
  // @ts-ignore
  const {id} = location.query
  const [editJob]=  useMutation<void,{info: Employ.jobDetailForUpdate}>(EDIT_JOB)

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
    const times =  values.times && values.times.length===2 ? [values.times[0].toISOString(),values.times[1].toISOString()]: undefined
    editJob({
      variables:{
        info:{
          id:id,
          jobTitle:values.jobTitle,
          category:values.category,
          isFullTime:values.isFullTime,
          requiredNum:values.requiredNum,
          description:values.description,
          education:values.education,
          coordinates:values.coordinates,
          experience:values.experience,
          publishNow:values.publishNow,
          tags:[],
          salary:[Number(values.min),Number(values.max)],
          workingAddress:[...values.enterprise_loc_detail,values.detail_address],
          onLineTimes:times,
        }
      }
    }).then(()=>{
      message.success('发布职位成功').then()
      history.back()
      // form.resetFields()
    }).catch(e=>{
      message.error(e.graphQLErrors?.[0].message).then()
    })
  };


  return <Card title='职位详情' extra={<Button onClick={()=>{history.back()}}>返回</Button>}>
    <div className={[styles.publish,'mx560'].join(' ')}>
      <Form
        {...formItemLayout}
        form={form}
        name="base"
        onFinish={onFinish}
        initialValues={{
          publishNow:true
        }}
        scrollToFirstError
      >
        <Form.Item name="category" label="类型" rules={[
          {required:true,message:'请选择职位类型'}
        ]}>
          <FormSingleTree url={'/job.json'}/>
        </Form.Item>
        <Form.Item
          name="jobTitle"
          label="职位名称"
          rules={[
            {required:true,message:'请输入职位名称'}
          ]}
        >
          <Input/>
        </Form.Item>
        <Form.Item name="isFullTime" label="职位属性"
                   rules={[
                     {required:true,message:'请选择职位属性'}
                   ]}
        >
          <Select options={[
            {value:'Full',label:'全职'},
            {value:'Part',label:'兼职'},
            {value:'InternShip',label:'实习'},
          ]}/>
        </Form.Item>
        <Form.Item
          name="requiredNum"
          label="招聘人数"
          rules={[
            {required:true,message:'请输入招聘人数'}
          ]}
        >
          <InputNumber/>
        </Form.Item>
        <Form.Item name="education" label="学历要求"  rules={[
          {required:true,message:'请选择学历要求'}
        ]}>
          <Select options={[
            {value:'Null',label:'高中以下'},
            {value:'High',label:'高中'},
            {value:'JuniorCollege',label:'大专'},
            {value:'RegularCollege',label:'本科'},
            {value:'Postgraduate',label:'硕士'},
            {value:'Doctor',label:'博士'},
          ]}/>
        </Form.Item>
        <Form.Item name="experience" label="经验要求"
                   rules={[
                     {required:true,message:'请输入要求工作年限'}
                   ]}
        >
          <InputNumber addonAfter="年以上" style={{width:'100%'}}/>
        </Form.Item>

        <Form.Item label="薪资待遇" style={{ marginBottom: 0 }}>
          <Form.Item
            name="min"
            rules={[{required: true,message:'请输入最低薪资'}]}
            style={{display: 'inline-block', width: 'calc(50% - 12px)',marginRight:'8px'}}
          >
            <Input placeholder="最低薪资"/>
          </Form.Item>
          -
          <Form.Item
            name="max"
            rules={[{required: true,message:'请输入最高薪资'}]}
            style={{display: 'inline-block', width: 'calc(50% - 12px)',marginLeft:'8px'}}
          >
            <Input placeholder="最高薪资"/>
          </Form.Item>
        </Form.Item>
        <Form.Item name="description" label="职位详情">
          <Input.TextArea/>
        </Form.Item>

        <Form.Item label="上班地址" style={{marginBottom: '0'}}>
          <Form.Item name="enterprise_loc_detail"
                     rules={[
                       {required:true,message:'请选择上班地址'}
                     ]}
          >
            <FormCascade/>
          </Form.Item>
          <Form.Item name="detail_address" >
            <Input placeholder="请输入详细地址"/>
          </Form.Item>
        </Form.Item>

        <Form.Item label="地址定位" name='coordinates'
                   rules={[
                     {required:true,message:'请选择定位'}
                   ]}
        >
          <FormCoordinate/>
        </Form.Item>
        <ProFormDateRangePicker name='times' label='招聘时段' width='lg'/>
        <ProFormSwitch label='是否立即上线' name='publishNow'/>
        <Form.Item {...tailFormItemLayout}>
          <Space>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
            <Button danger>
              下线
            </Button>
            <Button>
              返回
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  </Card>
}

export default Edit;
