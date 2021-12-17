import { Tabs} from 'antd';
import Base from "@/pages/Enterprise/common/base";
import Intro from "@/pages/Enterprise/common/intro";
import Bonus from "@/pages/Enterprise/common/bonus";
import Team from "@/pages/Enterprise/common/team";
import Experience from "@/pages/Enterprise/common/experience";
import ProIntro from "@/pages/Enterprise/common/proIntro";
import Ip from "@/pages/Enterprise/common/ip";
import {useState} from "react";
import {useQuery} from "@apollo/client";
import {GET_ENTERPRISE_FULL_INFO} from "@/services/gqls/enterprise";

const hasAuthTab = [
  {
    tab: '基本信息',
    key: 'base',
  },
  {
    tab: '公司介绍',
    key: 'introduction',
  },
  {
    tab: '公司福利',
    key: 'bonus',
  },
  {
    tab: '公司形象',
    key: 'ip',
  },
  {
    tab: '产品介绍',
    key: 'production-introduction',
  },
  {
    tab: '团队成员',
    key: 'team',
  },
  {
    tab: '工作体验',
    key: 'experience',
  },
];
const {TabPane} = Tabs;
const BaseEntry = ()=>{
  const [tabKey, setTabKey] = useState('base');
  const {loading,data}= useQuery<ResultDataType<'UserGetEnterpriseDetail_EntInfo', Enterprise.BaseInfo>>(GET_ENTERPRISE_FULL_INFO,{
    fetchPolicy:'network-only'
  })

  return <Tabs onChange={(t)=>setTabKey(t)}>
    {
      hasAuthTab.map(tab=>{
        return  <TabPane tab={tab.tab} key={tab.key}>
          {tabKey === 'base' && <Base />}
          {tabKey === 'introduction' && <Intro />}
          {tabKey === 'bonus' && <Bonus />}
          {tabKey === 'team' && <Team />}
          {tabKey === 'experience' && <Experience />}
          {tabKey === 'production-introduction' && <ProIntro />}
          {tabKey === 'ip' && <Ip />}
        </TabPane>})
    }
  </Tabs>
}

export default BaseEntry;
