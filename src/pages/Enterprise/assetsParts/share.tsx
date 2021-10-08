import {Avatar, Col, Form, Input, Modal, Row} from "antd";
import React from "react";
import styles from '../index.less'
import {DeliveredProcedureOutlined} from "@ant-design/icons";

const Share: React.FC<{
  isModalVisible: boolean;
  handleOk: () => void;
  handleCancel: () => void;
}> = ({isModalVisible, handleOk, handleCancel}) => {
  return <Modal
    bodyStyle={{padding: 0}}
    width={640}
    title=""
    visible={isModalVisible}
    onOk={handleOk}
    onCancel={handleCancel}>
    <div className={styles.header}>
      <div className={styles.left}><Avatar icon={<DeliveredProcedureOutlined/>}/></div>
      <div className={styles.right}>
        <div className={styles.title}>分配资产</div>
        <div className={styles.desc}>输入分配数额，为成员增加对应资产</div>
      </div>
    </div>
    <div className={styles.info}>
      <Avatar
        className={styles.avatar}
        size="large"
        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>
      <p className={styles.name}>付建平 | 1308889875</p>
    </div>
    <div className={styles.form}>
      <Row gutter={0} className={styles.formTitle}>
        <Col span={6}></Col>
        <Col span={6}>刷新币</Col>
        <Col span={6}>沟通币</Col>
        <Col span={6}>置顶币</Col>
      </Row>
      <Row gutter={0} className={styles.formBody}>
        <Col span={6}>7888</Col>
        <Col span={6}>7888</Col>
        <Col span={6}>7888</Col>
        <Col span={6}>7888</Col>
      </Row>
      <Form
        name="basic"
        initialValues={{  }}
        autoComplete="off"
      >
      <Row gutter={0} className={styles.formBottom}>

        <Col span={6}>分配</Col>
        <Col span={6}>
          <Form.Item
            label=""
            name="refresh"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input placeholder={'输入分配数额'}/>
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            label=""
            name="con"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input placeholder={'输入分配数额'}/>
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            label=""
            name="top"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input placeholder={'输入分配数额'}/>
          </Form.Item>
        </Col>
      </Row>
      </Form>
    </div>
  </Modal>
}

export default Share
