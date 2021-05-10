<template>
  <div>
    <h2>任务列表</h2>
    <Col style="width:300px">
      <Select v-model="server" filterable placeholder="请选择测试执行的服务器">
        <Option v-for="item in servers" :value="item.server_name" :key="item.server_name">{{ item.server_name }}({{ item.server_add }})</Option>
      </Select>
    </Col>
    <Table border :columns="columns1" :data="data1" style="margin-top:10px">
      <template slot-scope="{ row }" slot="name">
        <strong>{{ row.name }}</strong>
      </template>
      <template slot-scope="{ row, index }" slot="action">
        <Button type="primary" size="small" @click="show(index)">查看详情</Button>
        <Button type="success" size="small" style="margin-left: 15px" @click="exec(index)">测试</Button>
      </template>
    </Table>
  </div>
</template>
<script>
import { getAvailableServers, getTasks, testTask } from '@/api/user'
export default {
  name: 'task_list',
  data () {
    return {
      columns1: [
        {
          title: 'id',
          key: 'id',
          width: 120
        },
        {
          title: '任务名称',
          key: 'task_name',
          width: 200
        },
        {
          title: '所需空间',
          key: 'capacity'
        },
        {
          title: '优先级',
          key: 'priority'
        },
        {
          title: '创建者',
          key: 'creator',
          width: 120
        },
        {
          title: 'Action',
          slot: 'action',
          width: 0,
          align: 'center'
        }
      ],
      data1: [],
      servers: [],
      server: ''
    }
  },
  methods: {
    show (index) {
      this.$Modal.info({
        title: '任务详情',
        content: `id：${this.data1[index].id}<br>任务名称：${this.data1[index].task_name}<br>所需空间：${this.data1[index].capacity}<br>优先级：${this.data1[index].priority}<br>cron策略：${this.data1[index].cron}<br>创建者：${this.data1[index].creator}<br>创建时间：${this.data1[index].create_time}<br>最后修改时间：${this.data1[index].last_modify}<br>任务内容：${this.data1[index].script}<br>任务描述：${this.data1[index].detail}`
      })
    },
    getAll () {
      getTasks().then(res => {
        var resArray = res.data.obj
        for (var i = 0; i < resArray.length; i++) {
          var model = {
            id: 0,
            task_name: '',
            capacity: 0,
            priority: 0,
            cron: '',
            script: '',
            creator: '',
            last_modify: '',
            create_time: '',
            detail: ''
          }
          model.id = resArray[i].id
          model.task_name = resArray[i].task_name
          model.capacity = resArray[i].capacity
          model.priority = resArray[i].priority
          model.script = resArray[i].script
          model.creator = resArray[i].creator
          model.last_modify = resArray[i].last_modify
          model.create_time = resArray[i].create_time
          if (resArray[i].cron === null) {
            model.cron = '(--暂无--)'
          } else {
            model.cron = resArray[i].cron
          }
          if (resArray[i].detail === null) {
            model.detail = '(--暂无--)'
          } else {
            model.detail = resArray[i].detail
          }
          this.data1.push(model)
        }
      })
    },
    getServers () {
      getAvailableServers().then(res => {
        this.servers = res.data.obj
      })
    },
    exec (index) {
      if (this.server.length === 0) {
        this.$Message.error('未指定服务器!')
      } else {
        testTask(this.data1[index].task_name, this.server).then(res => {
          if (res.data.code === 666) {
            this.$Message.success('任务执行成功！')
          } else {
            this.$Message.error('任务执行失败!')
          }
        })
      }
    }
  },
  mounted: function () {
    this.getAll()
    this.getServers()
  }
}
</script>
