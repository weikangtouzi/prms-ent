import {Button, Card, Form, message} from 'antd';
import {formItemLayout, tailFormItemLayout} from '@/common/js/config';
import MultipleUpload from "@/components/Upload/multiUpload"
import HTAuthManager from '@/common/auth/common/model/HTAuthManager'

const Ip = (props: {extraData: string|undefined}) => {
  const {extraData='{}'} = props
  const [form] = Form.useForm()
  let initData = {}
  try{
    initData= JSON.parse(extraData)
  }finally {}

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
    HTAPI.ENTEditEnterpriseExtraData({
    	info:JSON.stringify(values)
    }).then(()=>{
      message.success('保存成功').then()
    }).catch(e=>{
      
    })
  };

  return (
    <Card>
      <div className="mx560">
        <Form
          {...formItemLayout}
          form={form}
          name="ProIntro"
          onFinish={onFinish}
          initialValues={initData}
          scrollToFirstError
          disabled={HTAuthManager?.keyValueList?.enterpriseRole?.toLowerCase() != 'admin'}
        >
          <Form.Item
            name="videos"
            label="企业视频"
            extra="只支持.mp4格式(总后台审核,最多5个)"
          >
            <MultipleUpload max={5} accept='video/*'/>
          </Form.Item>
          <Form.Item
            name="pictures"
            label="企业美图"
            extra="只支持.jpg/.png格式(最多10张)"
          >
            <MultipleUpload max={10} accept={'image/*'}/>
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

export default Ip;
