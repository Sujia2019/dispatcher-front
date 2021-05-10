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

export const registServer = (server) => {
  const data = {
    'server_name': server.server_name,
    'server_add': server.server_add,
    'server_user': server.server_user,
    'server_pwd': server.server_pwd,
    'server_memory': server.server_memory,
    'server_hard': server.server_hard,
    'server_key': server.server_key,
    'server_detail': server.server_detail,
    'server_status': server.server_status,
    'creator': 'admin'
  }
  return axios.request({
    url: 'server/create',
    data,
    method: 'post'
  })
}

export const createTask = (task) => {
  const data = {
    'task_name': task.task_name,
    'script': task.script,
    'cron': task.cron,
    'detail': task.detail,
    'capacity': task.capacity,
    'priority': task.priority,
    'creator': 'admin'
  }
  return axios.request({
    url: 'task/create',
    data,
    method: 'post'
  })
}

export const getServers = () => {
  return axios.request({
    url: 'server/getAll',
    method: 'get'
  })
}

export const getAvailableServers = () => {
  return axios.request({
    url: 'server/getAvailableServers',
    method: 'get'
  })
}

export const getDispatchers = () => {
  return axios.request({
    url: 'dispatcher/getAll',
    method: 'get'
  })
}

export const getTasks = () => {
  return axios.request({
    url: 'task/getAll',
    method: 'get'
  })
}

export const testTask = (taskName, serverName) => {
  const data = {
    'taskName': taskName,
    'serverName': serverName
  }
  return axios.request({
    url: 'task/exec',
    data,
    method: 'post'
  })
}

export const execLoadBalance = (taskName, loadBalance) => {
  const data = {
    'taskName': taskName,
    'loadBalance': loadBalance
  }
  return axios.request({
    url: 'task/execLoadBalance',
    data,
    method: 'post'
  })
}

export const setDispatcher = (name) => {
  const data = {
    'name': name
  }
  return axios.request({
    url: 'dispatcher/setDispatcher',
    data,
    method: 'post'
  })
}

export const addTask = (tasks) => {
  const data = tasks
  return axios.request({
    url: 'task/addTask',
    data,
    method: 'post'
  })
}

export const execScheduler = () => {
  return axios.request({
    url: 'task/execScheduler',
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
