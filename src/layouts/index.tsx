import type { PropsWithChildren } from 'react';
import ProLayout from '@ant-design/pro-layout';
import type { MenuDataItem } from '@ant-design/pro-layout';
import RightContent from '@/components/RightContent';
import route from '../../config/routes';
import { history } from 'umi';
// import {SolutionOutlined,AuditOutlined,MessageOutlined,AlertOutlined,TranslationOutlined} from "@ant-design/icons";
import { useState } from 'react';

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
const Layouts = (props: PropsWithChildren<any>) => {
  const [pathname, setPathname] = useState(history.location.pathname);
  if (props.location.pathname === '/user/login') {
    return <>{props.children}</>;
  }
  return (
    <ProLayout
      location={{ pathname }}
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
      title={''}
      rightContentRender={() => <RightContent />}
      // footerRender={() => <Footer />}
      disableContentMargin={false}
      menuItemRender={(item, dom) => (
        <a
          onClick={() => {
            setPathname(item.path || '/enterprise/info');
            history.push(item.path as string);
          }}
        >
          {dom}
        </a>
      )}
      onMenuHeaderClick={(e) => console.log(e)}
    >
      {props.children}
    </ProLayout>
  );
};

export default Layouts;
