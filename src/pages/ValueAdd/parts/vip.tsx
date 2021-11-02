import {Button, Card, Col, Row, Typography} from "antd";
import styles from '../index.less';

const { Title } = Typography;
const VipCenter = ()=>{
  return <Card>
    <Title level={2} style={{textAlign:'center'}}>趁早找·VIP</Title>
    <Row className={styles.header}>
      <Col span={4}/>
      <Col span={4}>
        <Title level={5}>认证企业</Title>
        <p className={styles.money}>¥ 0</p>
      </Col>
      <Col span={4}>
        <Title level={5}>铜牌企业</Title>
        <p className={styles.money}>¥ 500/年</p>
        <Button type={"primary"} size={"small"}>购买</Button>
      </Col>
      <Col span={4}>
        <Title level={5}>银牌企业</Title>
        <p className={styles.money}>¥ 600/年</p>
        <Button type={"primary"} size={"small"}>购买</Button>
      </Col>
      <Col span={4}>
        <Title level={5}>金牌企业</Title>
        <p className={styles.money}>¥ 700/年</p>
        <Button type={"primary"} size={"small"}>购买</Button>
      </Col>
      <Col span={4}>
        <Title level={5}>皇冠企业</Title>
        <p className={styles.money}>¥ 800/年</p>
        <Button type={"primary"} size={"small"}>购买</Button>
      </Col>
    </Row>
    <Row className={styles.table}>
      <Col span={4}>职位刷新数</Col>
      <Col span={4}>10</Col>
      <Col span={4}>100</Col>
      <Col span={4}>300</Col>
      <Col span={4}>600</Col>
      <Col span={4}>1000</Col>
    </Row>
    <Row className={styles.table}>
      <Col span={4}>人才沟通数</Col>
      <Col span={4}>10</Col>
      <Col span={4}>100</Col>
      <Col span={4}>300</Col>
      <Col span={4}>600</Col>
      <Col span={4}>1000</Col>
    </Row>

    <Row className={styles.table}>
      <Col span={4}>查看简历数</Col>
      <Col span={4}>10</Col>
      <Col span={4}>100</Col>
      <Col span={4}>300</Col>
      <Col span={4}>600</Col>
      <Col span={4}>1000</Col>
    </Row>
    <Row className={styles.table}>
      <Col span={4}>视频面试数</Col>
      <Col span={4}>-</Col>
      <Col span={4}>100</Col>
      <Col span={4}>300</Col>
      <Col span={4}>600</Col>
      <Col span={4}>1000</Col>
    </Row>
    <Row className={styles.table}>
      <Col span={4}>发布职位数</Col>
      <Col span={4}>3</Col>
      <Col span={4}>100</Col>
      <Col span={4}>300</Col>
      <Col span={4}>600</Col>
      <Col span={4}>1000</Col>
    </Row>
    <Row className={styles.table}>
      <Col span={4}>成员管理数</Col>
      <Col span={4}>3</Col>
      <Col span={4}>100</Col>
      <Col span={4}>300</Col>
      <Col span={4}>600</Col>
      <Col span={4}>1000</Col>
    </Row>
    <Row className={styles.table}>
      <Col span={4}>职位管理数</Col>
      <Col span={4}>3</Col>
      <Col span={4}>100</Col>
      <Col span={4}>300</Col>
      <Col span={4}>600</Col>
      <Col span={4}>1000</Col>
    </Row>
  </Card>
}

export default VipCenter;
