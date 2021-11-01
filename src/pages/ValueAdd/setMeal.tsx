import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { useState } from 'react';
import RestMoney from '@/pages/ValueAdd/parts/RestMoney';
import BuyDetail from '@/pages/ValueAdd/parts/buyDetail';

const hasAuthTab = [
  {
    tab: '套餐余额',
    key: 'restMoney',
  },
  {
    tab: '会员中心',
    key: 'vipCenter',
  },
  {
    tab: '购买明细',
    key: 'buyDetail',
  },

];


const SetMeal = () => {
  const [tabKey, setTabKey] = useState('restMoney');
  return (
    <PageHeaderWrapper
      tabList={hasAuthTab}
      tabActiveKey={tabKey}
      onTabChange={(key) => {
        setTabKey(key);
      }}
    >
        {tabKey === 'restMoney' && <RestMoney />}
        {tabKey === 'buyDetail' && <BuyDetail />}
    </PageHeaderWrapper>
  );
};

export default SetMeal;
