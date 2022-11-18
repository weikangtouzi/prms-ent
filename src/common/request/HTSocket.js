import React from 'react'
import NetInfo from '@react-native-community/netinfo'
import { Platform } from 'react-native'
import HTAppStateManager from '~/common/appstate/HTAppStateManager'


export default class Socket {

	webSocket = null

	listenerList = []

	notSendTaskList = []

	timer = null

	appStateUnsubscribe = null

	netInfoUnsubscribe = null

	lastNetworkConnected = true

	url = ''

	procotolList = []

	isDealloc = false

	constructor(url, procotolList) {
		this.url = url
		this.procotolList = procotolList
	}

	onmessage = (message) => {
		let data = message?.data
		console.log(`${Platform.OS} socket 收到消息`, data)
		data = JSON.parse(data)
		this.listenerList.map((listener) => {
			listener(data)
		})
	}

	isConnected = () => {
		let isConnected = (this?.webSocket?.readyState ?? 0) == 1
		return isConnected
	}

	close = () => {
		console.log(`${Platform.OS} socket 主动 close 释放资源`)
		clearInterval(this.timer)
		this.timer = null
		this?.appStateUnsubscribe?.remove()
		this.netInfoUnsubscribe && this.netInfoUnsubscribe()
		if (this?.webSocket) {
			this.webSocket.close()
			this.webSocket = null
		}
	}

	dealloc = () => {
		this.close()
		this.isDealloc = true
	}

	loop = (complete) => {
		this.close()
		this.timer = setInterval(() => {
			if (!this.isConnected()) {
				this.connect(complete)
			}
		}, 10 * 1000)
		this.appStateUnsubscribe = HTAppStateManager.addListener((isActive) => {
			if (isActive) {
				this.connect(complete)
			}
		})
		this.netInfoUnsubscribe = NetInfo.addEventListener(state => {
			if (state?.isConnected == this.lastNetworkConnected) {
				return
			}
			this.lastNetworkConnected = state?.isConnected
			if (this.lastNetworkConnected) {
				this.connect(complete)
			}
		})
	}

	connect = (complete) => {
		if (this.isDealloc) {
			return
		}
		console.log(`${Platform.OS} socket 连接`)
		this.loop(complete)
		this.webSocket = new WebSocket(this.url, this.procotolList)
		this.webSocket.onopen = () => {
			this.notSendTaskList.map((task) => {
				task()
			})
			this.notSendTaskList = []
			complete && complete()
		}
		this.webSocket.onclose = (error) => {
			console.log(`${Platform.OS} socket 被动 close`, error)
			let message = (error?.message ?? error?.reason) ?? ''
			if (
				[
					'Expected HTTP 101 response but was',
					'未能完成该操作。连接被拒绝',
					'未能完成该操作。网络已关闭',
					'Stream end encountered',
					'Failed to connect to '
				].find(item => message.indexOf(item) != -1) == null
			) {
				this.connect(complete)
			}
		}
		this.webSocket.onmessage = (message) => {
			this.onmessage(message)
		}
	}

	send = (message) => {
		let data = JSON.stringify(message)
		let complete = () => {
			try {
				this.webSocket.send(data)
			} catch(e) {
				this.notSendTaskList.push(() => this.send(message))
			}
		}
		if (this.isConnected()) {
			complete()
		} else {
			this.notSendTaskList.push(complete)
		}
	}

	addListener = (listener) => {
		this.listenerList.push(listener)
	}

}