import {Tabs} from "antd";
import {useState} from "react";
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
const {TabPane} = Tabs;
const Recruitment = ()=>{
  const [tabKey, setTabKey] = useState('offline');
  return   <Tabs onChange={(t)=>setTabKey(t)}>
    {
      messageType.map(tab=>{
        return  <TabPane tab={tab.tab} key={tab.key}>
          {tabKey === 'offline' && <Communicate />}
          {tabKey === 'video' && <Communicate />}
        </TabPane>})
    }
  </Tabs>
}

export default Recruitment
