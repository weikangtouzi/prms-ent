import { useEffect, useState } from 'react'
import {Spin} from 'antd';
import BaseEntry from "@/pages/Enterprise/common/baseEntry";
// import Auth from '@/pages/Enterprise/common/auth';

const Enterprise = () => {
	const [loading, setLoading] = useState(false)
	useEffect(() => {
		setLoading(true)
		HTAPI.ENTCheckEnterpriseIdentification().then(response => {

	  }).finally(() => {
	  	setLoading(false)
	  })
	}, [])
  return (
    <>
      {loading?<Spin />:<>
        {/*已通过认证*/}
        {
          <BaseEntry/>
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
