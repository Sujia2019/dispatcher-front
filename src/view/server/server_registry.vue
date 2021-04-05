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
export default {
  name: 'server_registry',
  data () {
    return {
      server: {
        server_key: '123-123-123-123',
        server_add: '192.168.56.118',
        server_name: 'default',
        server_user: 'root',
        server_pwd: '19990315',
        server_status: 'true',
        server_memory: 1024,
        server_hard: 10240,
        server_detail: '备注'
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
      console.log('xxx')
      console.log(this.server)

      this.$data.registServer(this.server)
    }
  }
}

</script>
