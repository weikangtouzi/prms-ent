import type { Settings as LayoutSettings } from '@ant-design/pro-layout';
import { PageLoading } from '@ant-design/pro-layout';
import { history } from 'umi';
import { currentUser as queryCurrentUser } from './services/ant-design-pro/api';
import { ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { setContext } from '@apollo/client/link/context';
// @ts-ignore
import { createUploadLink } from 'apollo-upload-client'


import React from 'react';
import HTGlobalTool from '@/common/global/HTGlobalTool'
HTGlobalTool
import HTAuthManager from '@/common/auth/common/model/HTAuthManager'

const loginPath = '/user/login';

import {Button, Space} from "antd";
import RightContent from '@/components/RightContent'
import {createFromIconfontCN} from "@ant-design/icons"
const MyIcon = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2919626_sgku75qiwh.js', // 在 iconfont.cn 上生成
})

/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: <PageLoading />,
};

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: API.CurrentUser;
  fetchUserInfo?: () => Promise<API.CurrentUser | undefined>;
}> {
  const fetchUserInfo = async () => {
    try {
      const msg = await queryCurrentUser();
      msg.data.access = HTAuthManager?.keyValueList?.enterpriseRole?.toLowerCase()
      return msg.data;
    } catch (error) {
      history.push(loginPath);
    }
    return undefined;
  };
  // 如果是登录页面，不执行
  if (history.location.pathname !== loginPath) {
    const currentUser = await fetchUserInfo();
    return {
      fetchUserInfo,
      currentUser,
      settings: {},
    };
  }
  return {
    fetchUserInfo,
    settings: {},
  };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout = ({ initialState, setInitialState }) => {
  return {
    waterMarkProps: {
      content: '',
    },
    iconfontUrl: '//at.alicdn.com/t/font_2919626_sgku75qiwh.js',
    layout: 'side',
    logo: '/images/login/logo.png',
    primaryColor: '#00DA8A',
    siderWidth: 208,
    navTheme: 'light',
    fixedHeader: true,
    fixSiderbar: true,
    colorWeak: false,
    // headerContentRender={() => <Header/>}
    title: '',
    rightContentRender: () => <RightContent/>,
    // footerRender={() => <Footer />}
    disableContentMargin: false,
    menuItemRender: (item, dom) => {
      return <a
      		disabled={item.unaccessible}
          onClick={() => {
          	if (item.unaccessible) {
          		return
          	}
            // setPathname(item.path || '/enterprise/info');
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
    },
    subMenuItemRender: (_, dom) => <div>{dom}</div>,
    onMenuHeaderClick: (e) => console.log(e)
  }
};

const initSocket = () => {
	let socket
	let callback = () => {
		socket && socket.close()
		socket = null

		const token = HTAuthManager.syncReadKeyValueList()?.enterpriseToken
		if ((token?.length ?? 0) <= 0) {
			return
		}
		socket = new WebSocket('wss://be.chenzaozhao.com/ws', ['graphql-ws', 'graphql-transport-ws'])
		socket.onopen = () => {
			const value = JSON.stringify({ 'type': 'connection_init', 'payload': {'Authorization': token } })
			socket.send(value)
		}
	}
	HTAuthManager.userTokenDidChangeListener.push(callback)
	callback()
}
initSocket()

// const httpLink = new HttpLink({ uri: 'https://be.chenzaozhao.com/graphql' });
const uploadLink = createUploadLink({ uri: 'http://be.chenzaozhao.com:4000/graphql',credentials:'' });

const logoutLink = onError((err) => {
  // 错误处理
  console.error('发生错误了(定位app:75):',err)
  // token 过期
  if(err?.graphQLErrors?.[0].message==='token expired'){
    history.push('/user/login')
  }
})
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  // const token = localStorage.getItem('token');
  const token = HTAuthManager?.syncReadKeyValueList()?.enterpriseToken
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      Authorization: token ? token : "",
    }
  }
});
const client = new ApolloClient({
  link: authLink.concat(logoutLink.concat(uploadLink)),
  cache: new InMemoryCache(),
});
export function rootContainer(
  container: React.ReactChild | React.ReactFragment | React.ReactPortal,
) {
  return React.createElement(ApolloProvider, { client } as any, container);
}
