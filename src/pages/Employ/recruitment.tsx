import {Card} from "antd";
import {useState} from "react";
import {PageHeaderWrapper} from "@ant-design/pro-layout";
import Communicate from './parts/Communicate';

const messageType = [
  {
    tab: '线下招聘会',
    key: 'offline',
  },
  {
    tab: '视频招聘会',
    key: 'video',
  }
];
const Recruitment = ()=>{
  const [tabKey, setTabKey] = useState('offline');
  return <PageHeaderWrapper
    tabList={messageType}
    tabActiveKey={tabKey}
    onTabChange={(key) => {
      setTabKey(key);
    }}
  >
    <Card>
      {tabKey === 'offline' && <Communicate />}
      {tabKey === 'video' && <Communicate />}
    </Card>
  </PageHeaderWrapper>
}

export default Recruitment
