import {Card} from "antd";
import {useState} from "react";
import {PageHeaderWrapper} from "@ant-design/pro-layout";
import AllMessage from './parts/allMessage';
import Study from './parts/study';
import Employee from './parts/employee';
import System from './parts/system';

const messageType = [
  {
    tab: '全部',
    key: 'all',
  },
  {
    tab: '招聘通知',
    key: 'employee',
  },
  {
    tab: '学习通知',
    key: 'study',
  },
  {
    tab: '系统通知',
    key: 'system',
  },
];
const Index = ()=>{
  const [tabKey, setTabKey] = useState('all');
  return <PageHeaderWrapper
    tabList={messageType}
    tabActiveKey={tabKey}
    onTabChange={(key) => {
      setTabKey(key);
    }}
  >
    <Card>
      {tabKey === 'all' && <AllMessage />}
      {tabKey === 'employee' && <Employee />}
      {tabKey === 'system' && <System />}
      {tabKey === 'study' && <Study />}
    </Card>
  </PageHeaderWrapper>
}

export default Index
