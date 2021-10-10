import {Button, Card, Space} from "antd";
import {PageHeaderWrapper} from "@ant-design/pro-layout";
import ProForm, {ProFormText} from "@ant-design/pro-form";
import {useState} from "react";

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 9},
}
const Account = ()=>{
  const [isEditor,setIsEditor] = useState(false)
  return  <PageHeaderWrapper>
    <Card>
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
            label="账户邮箱"
            addonAfter={isEditor
              ? <Space><Button type={"primary"}>保存</Button><Button onClick={()=>{setIsEditor(false)}}>取消</Button></Space>
              : <a onClick={()=>setIsEditor(true)}>修改</a>}
            readonly={!isEditor}
          />
        </div>
      </ProForm>
    </Card>
  </PageHeaderWrapper>
}

export default Account
