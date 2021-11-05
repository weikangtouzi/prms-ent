import type {PropsWithChildren} from "react";
import ProLayout from '@ant-design/pro-layout';
import Footer from '@/components/Footer';
import RightContent from '@/components/RightContent';
import route from '../../config/routes'

const Layouts = (props: PropsWithChildren<any>)=>{
  if (props.location.pathname === '/user/login') {
    return <>{ props.children }</>
  }
  return <ProLayout
    // location='/'
    route={route[0]}
    waterMarkProps={{
      content: '',
    }}
    layout={"side"}
    primaryColor={'#00DA8A'}
    siderWidth={208}
    navTheme={'light'}
    fixedHeader={true}
    fixSiderbar={true}
    colorWeak={false}
    title={'趁早找-企业端'}
    rightContentRender={()=><RightContent/>}
    footerRender={()=><Footer />}
    disableContentMargin={false}
    onMenuHeaderClick={(e) => console.log(e)}
  >
    {props.children}
  </ProLayout>
}

export default Layouts;
