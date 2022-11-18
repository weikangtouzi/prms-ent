import { Tabs} from 'antd';
import { useState, useEffect } from 'react';
import Base from '@/pages/user/Info/base';
import Safe from '@/pages/user/Info/safe';
import Title from '@/pages/user/Info/title';

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
    disabled: true
  },

];

const {TabPane} = Tabs;
const UserInfo = () => {
  const [tabKey, setTabKey] = useState('base');
  const [userInfo, setUserInfo] = useState()
  const [loading, setLoading] = useState(false)
  useEffect(() => {
  	setLoading(true)
  	Promise.all([
  		HTAPI.UserGetBasicInfo(),
	  	HTAPI.ENTGetAccountInfo()
  	]).then(([userInfo, { pos }]) => {
  		userInfo.pos = pos
  		setUserInfo(userInfo)
  	}).finally(() => {
  		setLoading(false)
  	})
  }, [])
  return (
  <Tabs onChange={(t)=>setTabKey(t)}>
    {
      !loading && userInfoTab.map(tab=>{
        return  <TabPane tab={tab.tab} key={tab.key} disabled={tab.disabled}>
          {tabKey === 'base' && <Base userInfo={userInfo} />}
           {tabKey === 'safe' && <Safe userInfo={userInfo} />}
         {tabKey === 'title' && <Title />}
        </TabPane>})
    }
  </Tabs>
  );
};

export default UserInfo;
