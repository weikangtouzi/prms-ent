import {Row, Col, Card, Button, Statistic, Divider} from 'antd';
import {createFromIconfontCN} from '@ant-design/icons';
import MyInterview from './myInterview'
import styles from './index.less'
import { history } from 'umi'
import { useState, useEffect } from 'react'


const MyIcon = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2919626_sgku75qiwh.js', // 在 iconfont.cn 上生成
});


const Index = () => {
	const [talentCount, setTalentCount] = useState(0)
	const [jobCount, setJobCount] = useState(0)
	useEffect(() => {
		Promise.all([
			HTAPI.UserGetJobListByEntId(),
			HTAPI.ENTSearchCandidates({ filter: { } }),
		]).then(([jobResponse, talentResponse]) => {
			setTalentCount(talentResponse?.count)
			setJobCount(jobResponse?.count)
		})
	}, [])

  return <Row gutter={16} className={styles.index}>
    <Col className={styles.gutterRow} span={16}>
      <div className={styles.leftTop}>
        <div className={styles.leftTop1}>
          <Card title={
            <span>
               <MyIcon type='icon-icon_rencai1'/>
               <span className='card_title'>人才</span>
            </span>
          }
                bordered={false}
                bodyStyle={{padding:'36px 36px 36px 48px'}}
                style={{width: '100%', height: '100%'}}>
            <Statistic title="待筛选人才" value={talentCount} valueStyle={{marginTop:'30px'}}/>
          </Card>
        </div>
        <div className={styles.leftTop2}>
          <Card title={<span><MyIcon type='icon-icon_wodezhiwei'/><span className='card_title'>我的职位</span></span>}
                bordered={false}
                extra={<Button type={"primary"} onClick={() => {
                	history.push('/employ/position/edit')
                }}>发布职位</Button>}
                bodyStyle={{padding:'36px 36px 36px 48px'}}
                style={{width: '100%', height: '100%'}}>
            <Row gutter={16}>
              <Col span={12}>
                <Statistic title="在线职位" value={jobCount} valueStyle={{marginTop:'30px'}}/>
              </Col>
              <Col span={12}>
                <Statistic title="7天内即将下线" value={0} valueStyle={{marginTop:'30px'}}/>
              </Col>
            </Row>
          </Card>
        </div>
      </div>
      <div className={styles.leftBottom}>
        <Card title={<span><MyIcon type='icon-icon_wodemianshi1'/><span className='card_title'>我的面试</span></span>}
              bordered={false} style={{width: '100%', height: '100%'}}>
         <MyInterview/>
        </Card>
      </div>
    </Col>
    <Col className={styles.gutterRow} span={8}>
      <div className={styles.rightTop}>
        <Card
          title={<span><MyIcon type='icon-icon_wodezichan'/><span className='card_title'>我的资产</span></span>}
          bordered={false}
          bodyStyle={{padding:'24px 36px 36px 48px'}}
          extra={<Button disabled type={"link"}>更多  {`>`}</Button>}
          style={{width: '100%', height: '100%'}}>
          <Row align="bottom">
            <Col span={18}>
              <Statistic title="在线职位" value={0} valueStyle={{marginTop:'35px'}}/>
            </Col>
            <Col span={6}><Button disabled type={"primary"} style={{marginBottom:'3px'}}>充值</Button></Col>
          </Row>
          <Divider />
          <Row align="bottom">
            <Col span={18}>
              <Statistic title="课程售卖收入" value={0} valueStyle={{marginTop:'35px'}}/>
            </Col>
            <Col span={6}><Button disabled style={{marginBottom:'3px'}}>提现</Button></Col>
          </Row>
        </Card>
      </div>
      <div className={styles.rightBottom}>
        <Card title={<span><MyIcon type='icon-icon_wodequanyi'/><span className='card_title'>我的权益</span></span>}
              bordered={false}
              bodyStyle={{padding:'28px 36px 20px 48px'}}
              extra={<Button disabled type={"link"}>详情  {`>`}</Button>}
              style={{width: '100%', height: '100%'}}>
          <Row gutter={16}>
            <Col span={12}>
              <Statistic title="剩余发布职位数" value={0} valueStyle={{marginTop:'18px'}}/>
            </Col>
            <Col span={12}>
              <Statistic title="剩余职位刷新数" value={0} valueStyle={{marginTop:'18px'}}/>
            </Col>
          </Row>
          <Divider />
          <Row gutter={16}>
            <Col span={12}>
              <Statistic title="剩余查看简历数" value={0} valueStyle={{marginTop:'20px'}}/>
            </Col>
            <Col span={12}>
              <Statistic title="剩余人才沟通数" value={0} valueStyle={{marginTop:'20px'}}/>
            </Col>
          </Row>
          <Divider />
          <Row gutter={16}>
            <Col span={12}>
              <Statistic title="剩余职位制定数" value={0} valueStyle={{marginTop:'20px'}}/>
            </Col>
          </Row>
        </Card>
      </div>
    </Col>
  </Row>
}

export default Index
