import {Tabs} from 'antd';
import Capital from './assetsParts/capital'

const {TabPane} = Tabs;
const Assets = () => {
  return <Tabs defaultActiveKey="capital">
    <TabPane tab="资产分布" key="capital">
      <Capital/>
    </TabPane>
    <TabPane tab="收支明细" key="income-out">
      Content of Tab Pane 2
    </TabPane>
    <TabPane tab="结算信息" key="balance">
      Content of Tab Pane 2
    </TabPane>
  </Tabs>
}

export default Assets
