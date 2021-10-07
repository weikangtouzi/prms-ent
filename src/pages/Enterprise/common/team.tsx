import { Button, Form, Input, Tabs, Upload } from 'antd';

import { useState } from 'react';
import { formItemLayout, tailFormItemLayout } from '@/common/js/config';
import { PlusOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;

const initialPanes = [
  { title: '成员1', key: '1' },
  { title: '成员2', key: '2' },
  {
    title: '成员3',
    key: '3',
  },
];
let newTabIndex = 0;

const Bonus = () => {
  const [panes, setPanes] = useState(initialPanes);
  const [activeKey, setActiveKey] = useState(initialPanes[0].key);
  const [fileList, setFileList] = useState([]);
  const [form] = Form.useForm();

  const onChange = (ak: string) => {
    setActiveKey(ak);
  };

  const add = () => {
    const ak = `newTab${newTabIndex++}`;
    const newPanes = [...panes];
    newPanes.push({ title: 'New Tab', key: ak });
    setPanes(newPanes);
    setActiveKey(ak);
  };

  const remove = (targetKey: string) => {
    let newActiveKey = activeKey;
    let lastIndex = -2;
    panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const newPanes = panes.filter((pane) => pane.key !== targetKey);
    if (newPanes.length && newActiveKey === targetKey) {
      if (lastIndex >= 0) {
        newActiveKey = newPanes[lastIndex].key;
      } else {
        newActiveKey = newPanes[0].key;
      }
    }
    setPanes(newPanes);
    setActiveKey(newActiveKey);
  };
  const onEdit = (targetKey: any, action: 'add' | 'remove') => {
    switch (action) {
      case 'add':
        add();
        break;
      case 'remove':
        remove(targetKey);
    }
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>点击上传</div>
    </div>
  );
  const normFile = (e: any) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };

  const handleChange = (e: any) => {
    setFileList(e.fileList);
  };
  return (
    <div className="mx560">
      <Tabs type="editable-card" onChange={onChange} activeKey={activeKey} onEdit={onEdit}>
        {panes.map((pane, idx) => (
          <TabPane tab={`成员${idx + 1}`} key={pane.key}></TabPane>
        ))}
      </Tabs>
      <Form
        {...formItemLayout}
        form={form}
        name="base"
        onFinish={onFinish}
        initialValues={{}}
        scrollToFirstError
      >
        <Form.Item name="fullName" label="姓名">
          <Input />
        </Form.Item>
        <Form.Item name="title" label="职位">
          <Input />
        </Form.Item>
        <Form.Item name="title" label="职位">
          <Input />
        </Form.Item>
        <Form.Item
          name="logo"
          label="logo"
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
          name="industry"
          label="成员介绍"
          rules={[{ required: true, message: '请输入成员介绍!' }]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Bonus;
