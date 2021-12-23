import { Tabs} from 'antd';
import Base from "@/pages/Enterprise/common/base";
import Bonus from "@/pages/Enterprise/common/bonus";
import Ip from "@/pages/Enterprise/common/ip";
import {useQuery} from "@apollo/client";
import {GET_ENTERPRISE_FULL_INFO} from "@/services/gqls/enterprise";


const {TabPane} = Tabs;
const BaseEntry = ()=>{
  const {loading,data}= useQuery<ResultDataType<'UserGetEnterpriseDetail_EntInfo', Enterprise.BaseInfo>>(GET_ENTERPRISE_FULL_INFO,{
    fetchPolicy:'network-only'
  })

  const {rest_rule,overtime_work_degree,tags,work_time} = data?.UserGetEnterpriseDetail_EntInfo||{}

  return <Tabs>
    {
      !loading &&  <TabPane tab="基本信息" key="base">
        <Base {...data?.UserGetEnterpriseDetail_EntInfo}/>
      </TabPane>
    }
    {
      !loading &&  <TabPane tab="公司制度" key="bonus">
        <Bonus
          overtime_work_degree={overtime_work_degree}
          rest_rule={rest_rule}
          tags={tags}
          work_time={work_time}
        />
      </TabPane>
    }
    {
      !loading &&  <TabPane tab="公司形象" key="ip">
        <Ip extraData={data?.UserGetEnterpriseDetail_EntInfo.extra_attribute}/>
      </TabPane>
    }
  </Tabs>
}

export default BaseEntry;
