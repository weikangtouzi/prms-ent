import {useRef} from 'react';
import { message } from 'antd';
import type { ProFormInstance } from '@ant-design/pro-form';
import {ModalForm, ProFormSelect, ProFormText, ProFormUploadButton} from '@ant-design/pro-form';


const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
}

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

const OptionalModal = (prop: { modalShow: any,setModalVisible: any })=>{
  const  {modalShow,setModalVisible} = prop
  const formRef = useRef<ProFormInstance>();

  return <ModalForm
    title="成员详情"
    formRef={formRef}
    width={640}
    visible={modalShow}
    onVisibleChange={setModalVisible}
    {...formItemLayout}
    layout={'horizontal'}
    submitter={{
      render: (props, defaultDoms) => {
        return [
          ...defaultDoms
        ];
      },
    }}
    onFinish={async (values) => {
      await waitTime(2000);
      console.log(values);
      message.success('提交成功');
      return true;
    }}
  >
    <ProFormText
    width="md"
    name="name"
    label="姓名"
    readonly
    placeholder="请输入名称"
  />
    <ProFormText width="md" name="company" label="职位" placeholder="请输入名称" readonly/>
    <ProFormSelect
      options={[
        {
          value: 'chapter',
          label: '盖章后生效',
        },
      ]}
      name="useMode"
      label="用户角色"
    />
    <ProFormUploadButton
      label="头像"
      listType="picture-card"
      name="file"
      title="上传文件"
      max={1}
    >
    </ProFormUploadButton>
    <ProFormText width="md" name="company" label="入驻时间" placeholder="请输入名称" readonly/>
    <ProFormSelect
      options={[
        {
          value: 'chapter',
          label: '盖章后生效',
        },
      ]}
      name="useMode"
      label="状态"
      readonly
    />
  </ModalForm>
}

export default OptionalModal;
