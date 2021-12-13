import {Spin, Tabs} from 'antd';
import Base from '@/pages/Enterprise/common/base';
import Intro from '@/pages/Enterprise/common/intro';
import Bonus from '@/pages/Enterprise/common/bonus';
import Team from '@/pages/Enterprise/common/team';
import Experience from '@/pages/Enterprise/common/experience';
import ProIntro from '@/pages/Enterprise/common/proIntro';
import Ip from '@/pages/Enterprise/common/ip';
import {useQuery} from "@apollo/client";
import {Check_Enterprise_Identification} from "@/services/gqls/enterprise";
import {useState} from "react";
import Auth from '@/pages/Enterprise/common/auth';

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

const Enterprise = () => {
  const [tabKey, setTabKey] = useState('base');
  const {loading, data} = useQuery<ResultDataType<'ENTCheckEnterpriseIdentification',Enterprise.Check_Identification >>(Check_Enterprise_Identification);
  return (
    <>
      {loading?<Spin />: <Tabs onChange={(t)=>setTabKey(t)}>

          <>
            {
              data?.ENTCheckEnterpriseIdentification?.status==='Passed' && hasAuthTab.map(tab=>{
                return  <TabPane tab={tab.tab} key={tab.key}>
                  {tabKey === 'base' && <Base />}
                  {tabKey === 'introduction' && <Intro />}
                  {tabKey === 'bonus' && <Bonus />}
                  {tabKey === 'team' && <Team />}
                  {tabKey === 'experience' && <Experience />}
                  {tabKey === 'production-introduction' && <ProIntro />}
                  {tabKey === 'ip' && <Ip />}
                  {tabKey === 'auth' && <Auth />}
                </TabPane>
              })
            }
            {
              data?.ENTCheckEnterpriseIdentification?.status==='None' && <TabPane tab='企业认证' key='auth'>
                <Auth/>
              </TabPane>
            }
          </>
      </Tabs>
      }
    </>
  );
};

export default Enterprise;
