import {Tabs} from "antd";
import {useState} from "react";
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
const {TabPane} = Tabs;
const Index = ()=>{
  const [tabKey, setTabKey] = useState('all');
  return   <Tabs onChange={(t)=>setTabKey(t)}>
    {
       messageType.map(tab=>{
        return  <TabPane tab={tab.tab} key={tab.key}>
               {tabKey === 'all' && <AllMessage />}
               {tabKey === 'employee' && <Employee />}
              {tabKey === 'system' && <System />}
              {tabKey === 'study' && <Study />}
        </TabPane>})
    }
  </Tabs>
}

export default Index
