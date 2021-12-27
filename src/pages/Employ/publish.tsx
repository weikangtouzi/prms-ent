import {Button, Card, Cascader, Col, Form, Input, InputNumber, Row, Select, Space} from "antd";
import {formItemLayout, tailFormItemLayout} from "@/common/js/config";
import FormSingleTree from "@/components/FormSingleTree";
import styles from './index.less';
import FormCascade from "@/components/formCascade";
import FormCoordinate from "@/components/FormCoordinate";
import {ProFormSwitch} from "@ant-design/pro-form";

const Publish = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };


  return <Card title='发布职位' extra={<Button onClick={()=>{history.back()}}>返回</Button>}>
      <div className={[styles.publish,'mx560'].join(' ')}>
        <Form
          {...formItemLayout}
          form={form}
          name="base"
          onFinish={onFinish}
          initialValues={{
          }}
          scrollToFirstError
        >
          <Form.Item name="type" label="类型">
           <FormSingleTree url={'/job.json'}/>
          </Form.Item>
          <Form.Item
            name="JobTitle"
            label="职位名称">
            <Input/>
          </Form.Item>
          <Form.Item name="isFullTime" label="职位属性">
            <Select options={[
              {value:'Full',label:'全职'},
              {value:'Part',label:'兼职'},
              {value:'InternShip',label:'实习'},
            ]}/>
          </Form.Item>
          <Form.Item
            name="requiredNum"
            label="招聘人数">
            <InputNumber/>
          </Form.Item>
          <Form.Item name="education" label="学历要求">
            <Select options={[
              {value:'none',label:'不限'},
              {value:'junior',label:'初中'},
              {value:'high',label:'高中'},
              {value:'undergraduate',label:'本科'},
              {value:'postgraduate',label:'研究生'},
            ]}/>
          </Form.Item>
          <Form.Item name="experience" label="经验要求">
            <InputNumber addonAfter="年" style={{width:'100%'}}/>
          </Form.Item>

          <Form.Item label="薪资待遇" style={{ marginBottom: 0 }}>
            <Form.Item
              name="min"
              rules={[{required: true}]}
              style={{display: 'inline-block', width: 'calc(50% - 12px)',marginRight:'8px'}}
            >
              <Input placeholder="最低薪资"/>
            </Form.Item>
            -
            <Form.Item
              name="max"
              rules={[{required: true}]}
              style={{display: 'inline-block', width: 'calc(50% - 12px)',marginLeft:'8px'}}
            >
              <Input placeholder="最高薪资"/>
            </Form.Item>
          </Form.Item>
          <Form.Item name="detail" label="职位详情">
            <Input.TextArea/>
          </Form.Item>

          <Form.Item label="上班地址" style={{marginBottom: '0'}}>
            <Form.Item name="enterprise_loc_detail"  >
              <FormCascade/>
            </Form.Item>
            <Form.Item name="detail_address" >
              <Input placeholder="请输入详细地址"/>
            </Form.Item>
          </Form.Item>

          <Form.Item label="地址定位" name='enterprise_coordinat'>
            <FormCoordinate/>
          </Form.Item>
          <Form.Item label="招聘时段" style={{ marginBottom: 0 }}>
            <Form.Item
              name="start"
              rules={[{required: true}]}
              style={{display: 'inline-block', width: 'calc(50% - 12px)',marginRight:'8px'}}
            >
              <Input placeholder="选择上线时间"/>
            </Form.Item>
            -
            <Form.Item
              name="end"
              rules={[{required: true}]}
              style={{display: 'inline-block', width: 'calc(50% - 12px)',marginLeft:'8px'}}
            >
              <Input placeholder="选择下线时间"/>
            </Form.Item>
          </Form.Item>
          <ProFormSwitch label='是否立即上线' name='publishNow'/>


          <Form.Item {...tailFormItemLayout}>
            <Space>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </Card>
}

export default Publish;
