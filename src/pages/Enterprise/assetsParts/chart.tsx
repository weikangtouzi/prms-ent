import {Card, Col, Row} from "antd";
import  numeral from "numeral";
import styles from '../index.less'

const bodyStyle={ padding: '24px 16px 0',minWidth: 0,overflow:'hidden' }

const topColResponsiveProps = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 12,
  xl: 4,
  style: { marginBottom: 24 },
};

const sideColResponsiveProps = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 12,
  xl: 6,
  style: { marginBottom: 24 },
};

const yuan = (val: number | string) => `¥ ${numeral(val).format('0,0')}`;

const Chart= ()=>{
  return <Row justify="space-between">
    <Col {...topColResponsiveProps}>
      <Card bodyStyle={bodyStyle} className={styles.chartSum}>
        <div className={styles.chartTitle}>总币</div>
        <div className={styles.chartTotal}>{yuan(126560)}</div>
      </Card>
    </Col>
    <Col {...topColResponsiveProps}>
      <Card bodyStyle={bodyStyle}>
        <div className={styles.chartTitle}>刷新币</div>
        <div className={styles.chartTotal}>{yuan(126560)}</div>
      </Card>
    </Col>
    <Col {...topColResponsiveProps}>
      <Card bodyStyle={bodyStyle}>
        <div className={styles.chartTitle}>置顶币</div>
        <div className={styles.chartTotal}>{yuan(126560)}</div>
      </Card>
    </Col>
    <Col {...topColResponsiveProps}>
      <Card bodyStyle={bodyStyle} >
        <div className={styles.chartTitle}>沟通币</div>
        <div className={styles.chartTotal}>{yuan(126560)}</div>
      </Card>
    </Col>
    <Col {...sideColResponsiveProps}>
      <Card bodyStyle={bodyStyle} className={styles.chartIncome}>
        <div className={styles.chartTitle}>
          <span>课程售卖收入</span>
          <span className={styles.withdraw}>提现</span>
        </div>
        <div className={styles.chartTotal}>123650</div>
      </Card>
    </Col>
  </Row>
}

export default Chart;
