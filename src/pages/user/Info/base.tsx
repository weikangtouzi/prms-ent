import {Form, Input, Button, Card, message} from 'antd';
import {tailFormItemLayout, formItemLayout} from '@/common/js/config';
import UpButton from "@/components/Upload";
import {ProFormText} from "@ant-design/pro-form";

const Base = (props: Partial<User.UserInfo>) => {
  const userInfo = props?.userInfo
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
  	const { pos, ...infoList } = values
  	infoList.logo = infoList.image_url
  	infoList.image_url = undefined
  	Promise.all([
  		HTAPI.UserEditBasicInfo({ info: infoList }),
  		HTAPI.ENTEditAccountInfo({ pos })
  	]).then(()=>{
  		window.location.reload()
      message.success('更新成功')
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
          initialValues={userInfo}
          scrollToFirstError
        >
          {/*<ProFormText name="username" label="姓名" rules={[{required: true, message: '请输入姓名!'}]}/>*/}
          <Form.Item name="pos" label="职务">
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
            name="username"
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
