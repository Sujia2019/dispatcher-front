<template>
  <div>
      <h2>服务器列表</h2>
      <Button type="success" size="large" style="margin-bottom: 15px;margin-top: 10px" @click="monitor()">全局监控</Button>
      <Table border :columns="columns1" :data="data1">
        <template slot-scope="{ row }" slot="name">
            <strong>{{ row.name }}</strong>
        </template>
        <template slot-scope="{ row, index }" slot="action">
            <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">查看详情</Button>
            <Button type="success" size="small" style="margin-left: 10px" @click="turnToMonitor(index)">监控</Button>
        </template>
    </Table>
  </div>
</template>
<script>
import { getServers } from '@/api/user'
export default {
  name: 'server_list',
  data () {
    return {
      columns1: [
        {
          title: 'id',
          key: 'server_id',
          width: 60
        },
        {
          title: '名称',
          key: 'server_name',
          width: 100
        },
        {
          title: '序列号',
          key: 'server_key',
          width: 170
        },
        {
          title: '服务器地址',
          key: 'server_add'
        },
        {
          title: '内存',
          key: 'server_memory',
          width: 100
        },
        {
          title: '硬盘大小',
          key: 'server_disk',
          width: 100
        },
        {
          title: '机器状态',
          key: 'server_status',
          width: 100
        },
        {
          title: 'Action',
          slot: 'action',
          width: 180,
          align: 'center'
        }
      ],
      data1: []
    }
  },
  methods: {
    show (index) {
      this.$Modal.info({
        title: '服务器详情',
        content: `id：${this.data1[index].server_id}<br>序列号：${this.data1[index].server_key}<br>服务器地址：${this.data1[index].server_add}<br>服务器名称：${this.data1[index].server_name}<br>用户名：${this.data1[index].server_user}<br>密码：${this.data1[index].server_pwd}<br>内存大小：${this.data1[index].server_memory}<br>硬盘空间：${this.data1[index].server_disk}<br>状态：${this.data1[index].server_status}<br>备注：${this.data1[index].server_detail}<br>创建者：${this.data1[index].creator}<br>创建时间：${this.data1[index].create_time}<br>最后修改时间:${this.data1[index].last_modify}`
      })
    },
    getAll () {
      getServers().then((res) => {
        console.log(res.data.obj)
        this.data1 = res.data.obj
      })
    },
    turnToMonitor (index) {
      var address = this.data1[index].server_add.split(':')[0]
      var url = 'http://' + address + ':9090/targets'
      // console.log(url);
      window.open(url)
    },
    monitor () {
      window.open('http://localhost:9090/targets')
    }
  },
  mounted: function () {
    this.getAll()
  }
}

</script>
