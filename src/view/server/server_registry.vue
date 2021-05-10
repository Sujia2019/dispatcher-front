<template>
  <div>
    <h2>服务器注册</h2>
    <div style="margin-top:10px">
    服务器 密钥<Input v-model="server.server_key" placeholder="输入机器序列号，例如 xxx-xxx-xxx-xxx" style="width: 250px;margin-left:10px" />
    <p style="margin:10px"></p>
    服务器 地址<Input v-model="server.server_add" placeholder="例如 192.168.56.111:8888..." style="width: 250px;margin-left:10px" />
    <p style="margin:10px"></p>
    服务器 名称<Input v-model="server.server_name" placeholder="Enter something..." style="width: 250px;margin-left:10px" />
    <p style="margin:10px"></p>
    服务器 用户名<Input v-model="server.server_user" placeholder="Enter something..." style="width: 238px;margin-left:10px" />
    <p style="margin:10px"></p>
    服务器 密码<Input v-model="server.server_pwd" type="password" placeholder="Enter something..." style="width: 250px;margin-left:10px" />
    <p style="margin:10px"></p>
    服务器 备注<Input v-model="server.server_detail" placeholder="Enter something..." style="width: 250px;margin-left:10px" />
    <p style="margin:10px"></p>
    服务器 状态<Select v-model="server.server_status" style="width:250px;margin-left:10px">
        <Option v-for="item in statusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
    </Select>
    <p style="margin:10px"></p>
    服务器 内存<Input v-model="server.server_memory" type="number" placeholder="Enter something..." style="width: 250px;margin-left:10px" />
    <p style="margin:10px"></p>
    服务器 硬盘<Input v-model="server.server_hard" type="number" placeholder="Enter something..." style="width: 250px;margin-left:10px" />
    <p style="margin:10px"></p>
    <Button type="success" style="margin-left:200px;margin-top:10px" @click="handleSubmit()" >提交</Button>
    </div>

  </div>
</template>
<script>
import { registServer } from '@/api/user'
export default {
  name: 'server_registry',
  data () {
    return {
      server: {
        server_key: '',
        server_add: '',
        server_name: '',
        server_user: '',
        server_pwd: '',
        server_status: '',
        server_memory: 0,
        server_hard: 0,
        server_detail: ''
      },
      statusList: [
        {
          value: 'true',
          label: '可用'
        },
        {
          value: 'false',
          label: '不可用'
        }
      ]
    }
  },
  methods: {
    handleSubmit () {
      registServer(this.server).then(res => {
        if (res.data.code === 666) {
          this.$Message.success('服务器注册成功！')
        } else {
          this.$Message.error('服务器注册失败!')
        }
      })
    }
  }
}

</script>
