import HTAuthManager from '@/common/auth/common/model/HTAuthManager'
import { Alert, message, Tabs } from 'antd'
import { history } from 'umi'
// import FormData from 'formdata-node'
// import HTSocket from './HTSocket'
// import { DeviceEventEmitter } from 'react-native'

export default class HTRequest {

	static _fetch = (url, method, headers, body, resolve, reject, finallyAll) => {
		Promise.race([
			fetch(url, {
				method,
				headers,
				body
			}),
			new Promise((_, reject) => {
				setTimeout(() => reject('timeout'), 5000)
			})
		])
		.then(async response => {
			let data = await response?.text()
			if (response.headers.get('Content-Type').indexOf('application/json') != -1) {
				return JSON.parse(data)
			}
			return data
		})
		.then(resolve)
		.catch(reject)
		.finally(finallyAll)
	}

	static request = (url = '', method = 'GET', paramList = {}, optionList = {}, headerList = {}) => {
		return new Promise((resolve, reject) => {
			let reloadUrl = url.indexOf('http') == -1 ? `https://be.chenzaozhao.com${url}` : url
			let isFormData = false
			if (process.browser) {
				isFormData = paramList instanceof FormData
			}
			let body = paramList
			switch(method.toUpperCase()) {
				case 'GET': {
					let keyValueList = []
					Object.keys(paramList).map(key => keyValueList.push(`${encodeURIComponent(key)}=${encodeURIComponent(paramList[key])}`))
					if ((keyValueList.length ?? 0) > 0) {
						reloadUrl = `${reloadUrl}?${keyValueList.join('&')}`
					}
					body = null
					break
				}
				default: {
					if (!isFormData) {
						body = JSON.stringify(paramList)
					}
					break
				}
			}
			let showLoading = optionList?.showLoading ?? method.toUpperCase() != 'GET'
			let showError = optionList?.showError ?? true
			showLoading && global?.Hud && global.Hud.show()

			const hiddenLoading = () => {
				showLoading && global?.Hud && global.Hud.hidden()
			}

			let reloadReject = (error) => {
				hiddenLoading()
				// error && showError && global?.Toast && global?.Toast.show(error + '')
				error && showError && message.error(error + '')
				reject(error)
			}
			let reloadResolve = (response) => {
				hiddenLoading()
				this.handlerResponse(response, fetchRequest, (response) => {
					let value = response?.data && paramList?.operationName
					value = value ? response?.data[paramList?.operationName] : null
					value = value ?? response
					resolve(value)
				}, reloadReject)
			}

			let fetchRequest = () => {
				this._fetch(reloadUrl, method, {
					...(!isFormData ? { 'Content-Type': 'application/json' } : {}),
					...((optionList?.needToken ?? true) ? { 'Authorization': HTAuthManager?.syncReadKeyValueList()?.enterpriseToken ?? '' } : {}),
					...headerList,
				}, body, reloadResolve, reloadReject)
			}
			fetchRequest()
		})
	}

	static handlerResponse = (response, repeat, resolve, reject) => {
		let error = response['errors']
		if ((error?.length ?? 0) > 0) {
			let errorList = error[0]?.extensions?.exception?.errors
			error = error[0]?.extensions?.exception?.stacktrace
			if ((error?.length ?? 0) > 0) {
				error = error[0]
			}
			if ((errorList?.length ?? 0) > 0) {
				error = ((errorList[0]?.message?.length ?? 0) > 0) ? errorList[0]?.message : error
			}
		}
		if (typeof(error) == 'string' && (error?.length ?? 0) > 0) {
			if (error.indexOf('token expired') != -1) {
				HTAPI.UserRefreshToken().then(response => {
					// Toast.show('刷新 token 成功1')
					HTAuthManager.updateKeyValueList({ enterpriseToken: response })
					HTAuthManager.sendUserRoleDidChangeNotice()
					repeat()
					// Toast.show('刷新 token 成功2')
				}).catch(() => {
					// Toast.show('刷新 token 失败1')
					HTAuthManager.clearLoginInfo()
					// 如果 UserRefreshToken 请求成功，repeat 会处理页面传进来的 then 和 catch
					// 如果 UserRefreshToken 请求出错了，就没人处理页面传进来的 then 和 catch
					reject()
					// Toast.show('刷新 token 失败2')
				})
				return
			} else if (error.indexOf('missing authorization') != -1) {
				HTAuthManager.clearLoginInfo()
				history.push('/user/login')
			} else if (error.indexOf('need job expectation for this operation') != -1) {
				resolve()
				return
			} else if (error.indexOf('Cannot return null for non-nullable field') != -1) {
				resolve()
				return
			}
			if (error == 'Validation len on username failed') {
				error = '需要输入更长的用户名'
			}
			reject(error)
			return
		}
		resolve(response)
	}

	static gqlRequest = (item, operationName, paramList = {}, optionList = {}, headerList = {}) => {
		return this.request('/graphql', 'POST', {
			'operationName': operationName,
			'variables': paramList,
			'query': item
		}, optionList, headerList)
	}

	static gqlUpload = (config) => {
		let formData = new FormData()
		formData.append('operations', JSON.stringify({
			'operationName': 'CommonSingleUpload',
			'variables': { 'file': null },
			'query': `
				mutation CommonSingleUpload($file: Upload!, $extraAttributes: UploadExtraAttributes) {
					CommonSingleUpload(file: $file, extraAttributes: $extraAttributes)
				}
			`
		}))
		formData.append('map', JSON.stringify({ "1": ['variables.file'] }))
		formData.append('1', config)
		return this.request('/graphql', 'POST', formData)
	}


	static initSocket = () => {
		this?.userRolelistener?.remove()
		this?.userTokenlistener?.remove()
		this.userRolelistener = DeviceEventEmitter.addListener(HTAuthManager.kHTUserRoleDidChangeNotice, () => {
			this.initSocket()
		})
		this.userTokenlistener = DeviceEventEmitter.addListener(HTAuthManager.kHTUserTokenDidChangeNotice, () => {
			// this.initSocket()
		})
		let token = HTAuthManager?.keyValueList?.enterpriseToken ?? ''
		let role = HTAuthManager?.keyValueList?.userRole ?? ''
		if (this.socket) {
			this.socket.listenerList = []
			this.socket.dealloc()
		}
		if (token.length <= 0 || role.length <= 0) {
			return
		}
		let url = HTServerManager.currentServer.detail
		let protocolList = ['graphql-ws', 'graphql-transport-ws']
		this.socket = new HTSocket(url, protocolList)
		this.socket.addListener((data) => {
			if (data?.type != 'data') {
				return
			}
			this.handlerResponse(data?.payload, this.initSocket, (value) => {
				let content = value?.data
				if (content?.newMessage) {
					DeviceEventEmitter.emit(HTAuthManager.kHTSocketMessageDidReceiveNotice, content?.newMessage)
				} else if (content?.newContract) {
					DeviceEventEmitter.emit(HTAuthManager.kHTSocketContractDidReceiveNotice, content?.newContract)
				}
			}, (error) => {
				this.initSocket()
			})
		})
		this.socket.connect(() => {
			this.socket.send({ 'type': 'connection_init', 'payload': {'Authorization': token } })
			this.socket.send({ id: '1', 'type': 'start', 'payload': {
				'query': `
					subscription newMessage {
						newMessage {
							from messageType messageContent to uuid createdAt
						}
					}
				 `
			} })
			// this.socket.send({ id: '2', 'type': 'start', 'payload': {
			// 	'query': `
			// 		subscription newContract {
			// 			newContract {
			// 				id logo name pos ent last_msg last_msg_time job
			// 			}
			// 		}
			// 	 `
			// } })
		})
	}

}