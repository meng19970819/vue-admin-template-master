import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/project02/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/project02/add',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/project02/logout',
    method: 'post'
  })
}
