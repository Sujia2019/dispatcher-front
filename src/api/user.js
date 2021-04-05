import axios from '@/libs/api.request'

export const login = ({ user_account, user_pwd }) => {
  const data = {
    'user_account': user_account,
    'user_pwd': user_pwd
  }
  return axios.request({
    url: 'user/login',
    data,
    method: 'post'
  })
}

export const getUserInfo = (user_account) => {
  return axios.request({
    url: 'user/getInfo',
    params: {
      user_account
    },
    method: 'get'
  })
}

export const logout = (token) => {
  return axios.request({
    url: 'logout',
    method: 'post'
  })
}

export const getUnreadCount = () => {
  return axios.request({
    url: 'message/count',
    method: 'get'
  })
}

export const getMessage = () => {
  return axios.request({
    url: 'message/init',
    method: 'get'
  })
}

export const getContentByMsgId = msg_id => {
  return axios.request({
    url: 'message/content',
    method: 'get',
    params: {
      msg_id
    }
  })
}

export const hasRead = msg_id => {
  return axios.request({
    url: 'message/has_read',
    method: 'post',
    data: {
      msg_id
    }
  })
}

export const removeReaded = msg_id => {
  return axios.request({
    url: 'message/remove_readed',
    method: 'post',
    data: {
      msg_id
    }
  })
}

export const restoreTrash = msg_id => {
  return axios.request({
    url: 'message/restore',
    method: 'post',
    data: {
      msg_id
    }
  })
}

export const registServer = (server) => {
  return axios.request({
    url: 'server/create',
    method: 'post',
    data: {
      server
    }
  })
}
