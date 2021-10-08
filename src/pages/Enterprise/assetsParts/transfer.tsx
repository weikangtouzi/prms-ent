import {Avatar, Col, Form, Modal, Row, Select} from "antd";
import React from "react";
import styles from '../index.less'
import {DeliveredProcedureOutlined} from "@ant-design/icons";

const Transfer: React.FC<{
  isModalVisible: boolean;
  handleOk: () => void;
  handleCancel: () => void;
}> = ({isModalVisible, handleOk, handleCancel}) => {
  return <Modal
    bodyStyle={{padding: 0}}
    title=""
    visible={isModalVisible}
    onOk={handleOk}
    onCancel={handleCancel}>
    <div className={styles.header}>
      <div className={styles.left}><Avatar icon={<DeliveredProcedureOutlined/>}/></div>
      <div className={styles.right}>
        <div className={styles.title}>转移资产</div>
        <div className={styles.desc}>转移该成员资产给选择的新成员。</div>
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
      <Row gutter={0} className={styles.formBottom}>
        <Col span={6}>7888</Col>
        <Col span={6}>7888</Col>
        <Col span={6}>7888</Col>
        <Col span={6}>7888</Col>
      </Row>
      <Form
        name="basic"
        initialValues={{  }}
        autoComplete="off"
        layout={'vertical'}
      >
        <Form.Item
          label="选择新成员"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Select>
            <Select.Option value="demo">Demo</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </div>
  </Modal>
}

export default Transfer
