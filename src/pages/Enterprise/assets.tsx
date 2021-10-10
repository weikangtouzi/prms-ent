import {Tabs} from 'antd';
import Capital from './assetsParts/capital'
import Detail from './assetsParts/detail'
import Balance from './assetsParts/balance'

const {TabPane} = Tabs;
const Assets = () => {
  return <Tabs defaultActiveKey="balance">
    <TabPane tab="资产分布" key="capital">
      <Capital/>
    </TabPane>
    <TabPane tab="收支明细" key="income-out">
      <Detail/>
    </TabPane>
    <TabPane tab="结算信息" key="balance">
      <Balance/>
    </TabPane>
  </Tabs>
}

export default Assets
