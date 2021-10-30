import {Card} from "antd";
import {useState} from "react";
import {PageHeaderWrapper} from "@ant-design/pro-layout";
import Communicate from './parts/Communicate';

const messageType = [
  {
    tab: '沟通中',
    key: 'communicate',
  },
  {
    tab: '待面试',
    key: 'wait-interview',
  },
  {
    tab: '已面试',
    key: 'interviewed',
  },
  {
    tab: '不合适',
    key: 'no-suit',
  },
  {
    tab: '查看过该岗位',
    key: 'saw',
  },
  {
    tab: '收藏过该岗位',
    key: 'favorite',
  },
];
const Index = ()=>{
  const [tabKey, setTabKey] = useState('communicate');
  return <PageHeaderWrapper
    tabList={messageType}
    tabActiveKey={tabKey}
    onTabChange={(key) => {
      setTabKey(key);
    }}
  >
    <Card>
      {tabKey === 'communicate' && <Communicate />}
      {tabKey === 'wait-interview' && <Communicate />}
      {tabKey === 'interviewed' && <Communicate />}
      {tabKey === 'no-suit' && <Communicate />}
      {tabKey === 'saw' && <Communicate />}
      {tabKey === 'favorite' && <Communicate />}
    </Card>
  </PageHeaderWrapper>
}

export default Index
