import styles from '../index.less';
import banner from './banner.png'
import logo from './logo.png'
import { Card, Col, Row, Statistic} from "antd";

const { Meta } = Card;
const RestMoney = ()=>{
  return <div>
    <div className={styles.banner}>
      <p>趁早找提供招聘增值服务</p>
      <img src={banner} alt='banner' className={styles.img}/>
      <img src={logo} alt='logo' className={styles.word}/>
    </div>
    <Row gutter={12} className={styles.content}>
      <Col flex={1}>
        <Card bordered={false}>
          <div className={styles.icon}><img src={'/images/valueAdd/search.png'}/></div>
          <Meta
            title="查看简历"
            description="筛选查看中意的人才简历"
          />
          <Statistic title="试用" value='余93' suffix="/ 100次" />
          <Statistic title="购买" value='余93' suffix="/ 100次" />
        </Card>
      </Col>
      <Col flex={1}>
        <Card bordered={false}>
          <div className={styles.icon}><img src={'/images/valueAdd/chat.png'}/></div>
          <Meta
            title="发起沟通"
            description="对中意的人才继续发起沟通"
          />
          <Statistic title="试用" value='余93' suffix="/ 100次" />
          <Statistic title="购买" value='余93' suffix="/ 100次" />
        </Card>
      </Col>
      <Col flex={1}>
        <Card bordered={false}>
          <div className={styles.icon}><img src={'/images/valueAdd/video.png'}/></div>
          <Meta
            title="视频面试"
            description="对中意的人才发起视频面试"
          />
          <Statistic title="试用" value='余93' suffix="/ 100次" />
          <Statistic title="购买" value='余93' suffix="/ 100次" />

        </Card>
      </Col>
      <Col flex={1}>
        <Card bordered={false}>
          <div className={styles.icon}><img src={'/images/valueAdd/refresh.png'}/></div>
          <Meta
            title="职位刷新"
            description="更新职位状态为“刚刚活跃”"
          />
          <Statistic title="试用" value='余93' suffix="/ 100次" />
          <Statistic title="购买" value='余93' suffix="/ 100次" />
        </Card>
      </Col>
      <Col flex={1}>
        <Card bordered={false}>
          <div className={styles.icon}><img src={'/images/valueAdd/top.png'}/></div>
          <Meta
            title="职位置顶"
            description="登顶同类职位榜首，并带有“急聘”标记"
          />
          <Statistic title="试用" value='余93' suffix="/ 100次" />
          <Statistic title="购买" value='余93' suffix="/ 100次" />
        </Card>
      </Col>
    </Row>
  </div>
}

export default RestMoney;
