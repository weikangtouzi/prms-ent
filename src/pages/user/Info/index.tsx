import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card } from 'antd';
import { useState } from 'react';
import Base from '@/pages/user/Info/base';
import Safe from '@/pages/user/Info/safe';
import Title from '@/pages/user/Info/title';

const hasAuthTab = [
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


const Enterprise = () => {
  const [tabKey, setTabKey] = useState('safe');
  return (
    <PageHeaderWrapper
      tabList={hasAuthTab}
      tabActiveKey={tabKey}
      onTabChange={(key) => {
        setTabKey(key);
      }}
    >
      <Card>
        {tabKey === 'base' && <Base />}
        {tabKey === 'safe' && <Safe />}
        {tabKey === 'title' && <Title />}
      </Card>
    </PageHeaderWrapper>
  );
};

export default Enterprise;
