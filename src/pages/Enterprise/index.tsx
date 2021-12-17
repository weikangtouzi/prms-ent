import {Spin} from 'antd';
import {useQuery} from "@apollo/client";
import {Check_Enterprise_Identification} from "@/services/gqls/enterprise";
import BaseEntry from "@/pages/Enterprise/common/baseEntry";
// import Auth from '@/pages/Enterprise/common/auth';

const Enterprise = () => {
  const {loading, data} = useQuery<ResultDataType<'ENTCheckEnterpriseIdentification',Enterprise.Check_Identification >>(Check_Enterprise_Identification,{
    fetchPolicy:'network-only'
  });
  return (
    <>
      {loading?<Spin />:<>
        {/*已通过认证*/}
        {
          data?.ENTCheckEnterpriseIdentification?.status!=='Passed' && <BaseEntry/>
        }
        {/*未通过认证*/}
        {/*{*/}
        {/*  ['None','Waiting','Failed'].includes(data?.ENTCheckEnterpriseIdentification?.status||'')&& <Auth status={data?.ENTCheckEnterpriseIdentification?.status}/>*/}
        {/*}*/}
      </>
      }
    </>
  );
};

export default Enterprise;
