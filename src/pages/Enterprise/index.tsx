import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card } from 'antd';
import { useState } from 'react';
import Base from '@/pages/Enterprise/base';
import Intro from '@/pages/Enterprise/intro';
import Bonus from '@/pages/Enterprise/bonus';

const Enterprise = () => {
  const [tabKey, setTabKey] = useState('bonus');
  return (
    <PageHeaderWrapper
      tabList={[
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
      ]}
      tabActiveKey={tabKey}
      onTabChange={(key) => {
        setTabKey(key);
      }}
    >
      <Card>
        {tabKey === 'base' && <Base />}
        {tabKey === 'introduction' && <Intro />}
        {tabKey === 'bonus' && <Bonus />}
      </Card>
    </PageHeaderWrapper>
  );
};

export default Enterprise;
