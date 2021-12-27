import { Card} from "antd";
import ProForm, {ProFormText} from "@ant-design/pro-form";
// import {useState} from "react";
// import {ExclamationCircleOutlined} from "@ant-design/icons";
//
// const {confirm} = Modal;
const formItemLayout = {
  labelCol: {span: 4},
  wrapperCol: {span: 9},
}
const Title = () => {
  // const [isEditor, setIsEditor] = useState(false)
  //
  // const showPromiseConfirm = () => {
  //   confirm({
  //     title: '确认要离开企业吗?',
  //     icon: <ExclamationCircleOutlined/>,
  //     content: '离开后不再拥有该企业身份',
  //     onOk() {
  //       return new Promise((resolve, reject) => {
  //         setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
  //       }).catch(() => console.log('Oops errors!'));
  //     },
  //     onCancel() {
  //     },
  //   });
  // }
  return <Card>
    <ProForm<{
      name: string;
      company?: string;
    }>
      {...formItemLayout}
      layout={'horizontal'}
      onFinish={async () => {
      }}
      params={{}}
      submitter={false}
    >
      <div>
        <ProFormText
          width="md"
          name="name"
          label="任职公司"
          // addonAfter={isEditor
          //   ? <Space>
          //     <Button type={"primary"}>保存</Button><Button onClick={() => {
          //     setIsEditor(false)
          //   }}>取消</Button>
          //   </Space>
          //   : <Space>
          //     <a onClick={() => setIsEditor(true)}>更换公司</a>
          //     <a onClick={showPromiseConfirm}>离开企业</a>
          //   </Space>
          // }
          // readonly={!isEditor}
          readonly={true}
        />
      </div>
    </ProForm>
  </Card>
}

export default Title
