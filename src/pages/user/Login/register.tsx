import {
  ProFormCheckbox,
  ProFormInstance,
  StepsForm
} from "@ant-design/pro-form";
import styles from './index.less'
import ProForm, { ProFormSelect, ProFormText} from "@ant-design/pro-form";
import {Card, Form, Input, Upload} from "antd";
import {useRef, useState} from "react";
import {PlusOutlined} from "@ant-design/icons";


const Register = ()=>{
  const [fileList, setFileList] = useState([]);
  const formRef = useRef<
    ProFormInstance<{
      name: string;
      company?: string;
      useMode?: string;
    }>
    >();
  const handleChange = (e: any) => {
    setFileList(e.fileList);
  };
  const normFile = (e: any) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>点击上传</div>
    </div>
  );
  return <Card className={styles.register} title={'欢迎注册趁早找'} style={{width:'475px',margin:'0 auto'}}>
    <StepsForm<{
      name: string;
    }>
      formRef={formRef}
      containerStyle={{width:'100%',minWidth:'420px'}}
      stepsRender={()=>null}
      onFinish={async () => {
        // message.success('提交成功');
      }}
      formProps={{
        validateMessages: {
          required: '此项为必填项',
        },
      }}
    >
      <StepsForm.StepForm<{
        name: string;
      }>
        name="base"
        title="创建实验"
        stepProps={{
          description: '这里填入的都是基本信息',
        }}
        onFinish={async () => {
          console.log(formRef.current?.getFieldsValue());
          return true;
        }}
      >
        <ProForm.Group title="设置密码">
          <ProFormText.Password
            name="name"
            label="设置密码"
            placeholder="请输入密码"
            rules={[{ required: true }]}
          />
          <ProFormText.Password
            name="name"
            label="确认密码"
            placeholder="请输入密码"
            rules={[{ required: true }]}
          />
        </ProForm.Group>
        <ProForm.Group title="基本信息"/>
        <Form.Item
            name="logo"
            label="头像:"
            className='form-item-inline'
            labelCol={{ span: 3 }}
            wrapperCol={{ span: 20 }}
            valuePropName="fileList"
            getValueFromEvent={normFile}
            extra="只支持.jpg/.png格式(单张)"
          >
            <Upload
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              listType="picture-card"
              fileList={fileList}
              onChange={handleChange}
            >
              {fileList.length >= 1 ? null : uploadButton}
            </Upload>
          </Form.Item>
        <Form.Item
          className='form-item-inline'
          labelCol={{ span: 3 }}
          wrapperCol={{ span: 21 }}
          name="nickname"
          label="昵称:"
          rules={[{ required: true, message: '请输入昵称!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          className='form-item-inline'
          labelCol={{ span: 3 }}
          wrapperCol={{ span: 21 }}
          name="email"
          label="邮箱:"
          rules={[{ required: true, message: '请输入邮箱!' }]}
        >
          <Input />
        </Form.Item>
      </StepsForm.StepForm>
      <StepsForm.StepForm<{
        checkbox: string;
      }>
        name="checkbox"
        title="enterprise"
        onFinish={async () => {
          console.log(formRef.current?.getFieldsValue());
          return true;
        }}
      >
        <ProForm.Group title="企业认证">
          <ProFormText
            name="enterpriseName"
            label="企业名称"
            placeholder="请输入企业名称"
            rules={[{ required: true }]}
          />
          <ProFormText
            name="name"
            label="企业地区"
            placeholder="请选择企业地区"
            rules={[{ required: true }]}
          />
          <ProFormText
            name="type"
            label="企业类型"
            placeholder="请输入企业类型"
            rules={[{ required: true }]}
          />
          <ProFormText
            name="title"
            label="您的职务"
            placeholder="请输入您的职务"
            rules={[{ required: true }]}
          />
        </ProForm.Group>
      </StepsForm.StepForm>
      <StepsForm.StepForm
        name="time"
        title="enterpriseCheck"
      >
        <ProForm.Group title="企业认证补充"/>
        <Form.Item
          name="logo"
          label="营业执照:"
          className='form-item-inline'
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          valuePropName="fileList"
          getValueFromEvent={normFile}
          extra="只支持.jpg/.png格式(单张)"
        >
          <Upload
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            listType="picture-card"
            fileList={fileList}
            onChange={handleChange}
          >
            {fileList.length >= 1 ? null : uploadButton}
          </Upload>
        </Form.Item>
      </StepsForm.StepForm>
    </StepsForm>
  </Card>
}

export default Register;
