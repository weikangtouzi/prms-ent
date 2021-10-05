import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card } from 'antd';
import { useState } from 'react';
import Base from '@/pages/Enterprise/base';
import Intro from '@/pages/Enterprise/intro';
import Bonus from '@/pages/Enterprise/bonus';
import Team from '@/pages/Enterprise/team';
import Experience from '@/pages/Enterprise/experience';
import ProIntro from '@/pages/Enterprise/proIntro';
import Ip from '@/pages/Enterprise/ip';
import Auth from '@/pages/Enterprise/auth';

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

const noAuth = [
  {
    tab: '企业认证',
    key: 'auth',
  },
];

const Enterprise = () => {
  const [tabKey, setTabKey] = useState('auth');
  const [authed] = useState(false);
  return (
    <PageHeaderWrapper
      tabList={authed ? hasAuthTab : noAuth}
      tabActiveKey={tabKey}
      onTabChange={(key) => {
        setTabKey(key);
      }}
    >
      <Card>
        {tabKey === 'base' && <Base />}
        {tabKey === 'introduction' && <Intro />}
        {tabKey === 'bonus' && <Bonus />}
        {tabKey === 'team' && <Team />}
        {tabKey === 'experience' && <Experience />}
        {tabKey === 'production-introduction' && <ProIntro />}
        {tabKey === 'ip' && <Ip />}
        {tabKey === 'auth' && <Auth />}
      </Card>
    </PageHeaderWrapper>
  );
};

export default Enterprise;
