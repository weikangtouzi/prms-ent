import type {PropsWithChildren} from 'react';
import ProLayout from '@ant-design/pro-layout';
import type {MenuDataItem} from '@ant-design/pro-layout';
import RightContent from '@/components/RightContent';
import route from '../../config/routes';
import {history} from 'umi';
// import {SolutionOutlined,AuditOutlined,MessageOutlined,AlertOutlined,TranslationOutlined} from "@ant-design/icons";
import {useState} from 'react';
import {Button, Space} from "antd";
import {createFromIconfontCN} from "@ant-design/icons";

const MyIcon = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2919626_sgku75qiwh.js', // 在 iconfont.cn 上生成
});

// const IconMap = {
//   audit: <AuditOutlined />,
//   solution: <SolutionOutlined />,
//   message: <MessageOutlined />,
//   alert: <AlertOutlined />,
//   transaction: <TranslationOutlined />,
// };

// const loopMenuItem = (menus: MenuDataItem[]): MenuDataItem[] =>
//   menus.map(({ icon, children, ...item }) => ({
//     ...item,
//     icon: icon && IconMap[icon as string],
//     children: children && loopMenuItem(children),
//   }));
const Header = () => {
  return <Space>
    <Button type="text" className='layout-h-t'>首页</Button>
    <Button type="text" className='layout-h-t'>找工作</Button>
    <Button type="text" className='layout-h-t'>招聘会</Button>
    <Button type="text" className='layout-h-t'>找企业</Button>
  </Space>
}
const Layouts = (props: PropsWithChildren<any>) => {
  const [pathname, setPathname] = useState(history.location.pathname);
  if (props.location.pathname === '/user/login') {
    return <>{props.children}</>;
  }
  if (props.location.pathname === '/user/register') {
    return <ProLayout
      menuRender={false}
      iconfontUrl={'//at.alicdn.com/t/font_2919626_sgku75qiwh.js'}
      layout={'side'}
      logo={'/images/login/logo.png'}
      primaryColor={'#00DA8A'}
      navTheme={'light'}
      fixedHeader={true}
      fixSiderbar={true}
      colorWeak={false}
      title={''}
      rightContentRender={() => <RightContent/>}
      disableContentMargin={false}
    >
      {props.children}
    </ProLayout>;
  }
  return (
    <ProLayout
      location={{pathname}}
      // menu={{ request: async () => loopMenuItem((route[0]?.routes as MenuDataItem[]).filter(r=>!r.redirect)) }}
      menu={{
        request: async () => (route[0]?.routes as MenuDataItem[]).filter((r) => !r.redirect),
      }}
      waterMarkProps={{
        content: '',
      }}
      iconfontUrl={'//at.alicdn.com/t/font_2919626_sgku75qiwh.js'}
      layout={'side'}
      logo={'/images/login/logo.png'}
      primaryColor={'#00DA8A'}
      siderWidth={208}
      navTheme={'light'}
      fixedHeader={true}
      fixSiderbar={true}
      colorWeak={false}
      // headerContentRender={() => <Header/>}
      title={''}
      rightContentRender={() => <RightContent/>}
      // footerRender={() => <Footer />}
      disableContentMargin={false}
      menuItemRender={(item, dom) => {
        return <a
            onClick={() => {
              setPathname(item.path || '/enterprise/info');
              history.push(item.path as string);
            }}
          >
            {/*<div className='menu_custom_item_way'>*/}
          {
            item.path === '/index' ? dom : <div className={item.replace?'activeMenuItem menu_custom_item_way':'menu_custom_item_way'}>
              <span>
                <MyIcon type={item.aIcon} className={'activeIcon'}/>
                <MyIcon type={item.icon as any} className={'noActiveIcon'}/>
              </span>
              {dom}
            </div>
          }
          </a>

      }}
      subMenuItemRender={(_, dom) => <div>{dom}</div>}
      onMenuHeaderClick={(e) => console.log(e)}
    >
      {props.children}
    </ProLayout>
  );
};

export default Layouts;
