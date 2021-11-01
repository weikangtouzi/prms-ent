import {Card, Col, Row, Typography} from "antd";

const { Title } = Typography;
const VipCenter = ()=>{
  return <Card>
    <Title level={2}>趁早找·VIP</Title>
    <Row>
      <Col span={4}></Col>
      <Col span={4}>col-12</Col>
      <Col span={4}>col-12</Col>
      <Col span={4}>col-12</Col>
      <Col span={4}>col-12</Col>
      <Col span={4}>col-12</Col>
    </Row>
  </Card>
}

export default VipCenter;
