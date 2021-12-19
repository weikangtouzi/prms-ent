import { Tabs} from 'antd';
import { useState } from 'react';
import Base from '@/pages/user/Info/base';
import Safe from '@/pages/user/Info/safe';
import Title from '@/pages/user/Info/title';
import {useQuery} from "@apollo/client";
import {GET_USERINFO} from "@/services/gqls/user/info";

const userInfoTab = [
  {
    tab: '基本信息',
    key: 'base',
  },
  {
    tab: '账户安全',
    key: 'safe',
  },
  {
    tab: '任职信息',
    key: 'title',
  },

];

const {TabPane} = Tabs;
const UserInfo = () => {
  const [tabKey, setTabKey] = useState('base');
  const {data,loading} =  useQuery<ResultDataType<'UserGetBasicInfo', User.UserInfo>>(GET_USERINFO)
  return (
  <Tabs onChange={(t)=>setTabKey(t)}>
    {
      !loading && userInfoTab.map(tab=>{
        return  <TabPane tab={tab.tab} key={tab.key}>
          {tabKey === 'base' && <Base {...data?.UserGetBasicInfo}/>}
           {tabKey === 'safe' && <Safe />}
         {tabKey === 'title' && <Title />}
        </TabPane>})
    }
  </Tabs>
  );
};

export default UserInfo;
