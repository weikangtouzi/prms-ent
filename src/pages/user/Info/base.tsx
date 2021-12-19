import {Form, Input, Button, Card, message} from 'antd';
import {tailFormItemLayout, formItemLayout} from '@/common/js/config';
import UpButton from "@/components/Upload";
import {ProFormText} from "@ant-design/pro-form";
import {useMutation} from "@apollo/client";
import {UPDATE_USERINFO} from "@/services/gqls/user/info";

const Base = (props: Partial<User.UserInfo>) => {
  const {username} = props
  const [form] = Form.useForm();

  const [update_userInfo] =  useMutation<void,{info: Partial<User.UserInfo_Update>}>(UPDATE_USERINFO,{
    fetchPolicy:"network-only"
  })

  const onFinish = (values: any) => {
    update_userInfo({
      variables:{
        info:{
          username:values.username
        }
      }
    }).then(()=>{
      message.success('更新成功').then()
    }).catch(r=>{
      message.error(r.graphQLErrors?.[0].message).then()
    })
  };

  return (
    <Card>
      <div className="mx560">
        <Form
          {...formItemLayout}
          form={form}
          name="base"
          onFinish={onFinish}
          initialValues={{
            username:username,
          }}
          scrollToFirstError
        >
          <ProFormText name="username" label="姓名" rules={[{required: true, message: '请输入姓名!'}]}/>
          <Form.Item name="title" label="职务">
            <Input/>
          </Form.Item>
          <Form.Item
            name="image_url"
            label="头像"
            extra="只支持.jpg/.png格式(单张)"
          >
          <UpButton/>
          </Form.Item>


          <Form.Item
            name="nickname"
            label="昵称"

          >
            <Input/>
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Card>
  );
};

export default Base;
