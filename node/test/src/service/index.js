import request from './network/index'
/**
 * 获取title
 */
export const getTitle = (data) => request('/parse/login', data, 'post', { 'X-Parse-Application-Id': 'parseserver' })

export const getPodiumList = (data) => request('leap-crm/test', data, 'post')

export const loginFunc = (data) => request('/leap-crm/mtest', data, 'post')
