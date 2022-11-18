import { useState, useEffect } from 'react'
import { Tabs} from 'antd';
import Base from "@/pages/Enterprise/common/base";
import Bonus from "@/pages/Enterprise/common/bonus";
import Ip from "@/pages/Enterprise/common/ip";


const {TabPane} = Tabs;
const BaseEntry = ()=>{
  const [enterpriseInfo, setEnterpriseInfo] = useState()
  const [loading, setLoading] = useState(false)
  useEffect(() => {
  	setLoading(true)
  	HTAPI.UserGetEnterpriseDetail_EntInfo().then(response => {
  		setEnterpriseInfo(response)
  	}).finally(() => {
  		setLoading(false)
  	})
  }, [])

  const {rest_rule,overtime_work_degree,enterprise_welfare,work_time} = enterpriseInfo || {}

  return <Tabs>
    {
      !loading &&  <TabPane tab="基本信息" key="base">
        <Base {...enterpriseInfo}/>
      </TabPane>
    }
    {
      !loading &&  <TabPane tab="公司制度" key="bonus">
        <Bonus
          overtime_work_degree={overtime_work_degree}
          rest_rule={rest_rule}
          tags={enterprise_welfare}
          work_time={work_time}
          
        />
      </TabPane>
    }
    {
      !loading &&  <TabPane tab="公司形象" key="ip">
        <Ip extraData={enterpriseInfo?.extra_attribute}/>
      </TabPane>
    }
  </Tabs>
}

export default BaseEntry;
