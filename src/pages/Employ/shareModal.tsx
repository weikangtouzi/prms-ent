import {useRef} from 'react';
import {Avatar, Card, message} from 'antd';
import type { ProFormInstance } from '@ant-design/pro-form';
import {ModalForm, ProFormSelect} from '@ant-design/pro-form';



const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

const ShareModal = (prop: { modalShow: any,setModalVisible: any })=>{
  const  {modalShow,setModalVisible} = prop
  const formRef = useRef<ProFormInstance>();

  return <ModalForm
    formRef={formRef}
    width={500}
    visible={modalShow}
    onVisibleChange={setModalVisible}
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
    <Card style={{ marginTop: 16 }} bordered={false}>
      <Card.Meta
        avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
        title="分享协作"
        description="分享该职位给其他企业成员"
        style={{marginBottom:'20px'}}
      />
      <ProFormSelect
        options={[
          {
            value: 'chapter',
            label: '新成员1',
          },
        ]}
        name="useMode"
        label="选择新成员"
      />
    </Card>

  </ModalForm>
}

export default ShareModal;
