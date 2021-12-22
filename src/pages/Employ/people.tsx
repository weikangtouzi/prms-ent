import {Tabs} from "antd";
import {useState} from "react";
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
const {TabPane} = Tabs;
const Index = ()=>{
  const [tabKey, setTabKey] = useState('communicate');
  return <Tabs onChange={(t)=>setTabKey(t)}>
    {
      messageType.map(tab=>{
        return  <TabPane tab={tab.tab} key={tab.key}>
          {tabKey === 'communicate' && <Communicate />}
          {tabKey === 'wait-interview' && <Communicate />}
          {tabKey === 'interviewed' && <Communicate />}
          {tabKey === 'no-suit' && <Communicate />}
          {tabKey === 'saw' && <Communicate />}
          {tabKey === 'favorite' && <Communicate />}
        </TabPane>})
    }
  </Tabs>

}

export default Index
