<template>
  <div>
    <h2>创建任务</h2>
    <div style="margin-top:10px">
      <div style="width:350px;float:left">
        任务名称<Input v-model="task.task_name" placeholder="输入任务名称" style="width: 250px;margin-left:10px" />
        <p style="margin:10px"></p>
        所需空间<Input v-model="task.capacity" placeholder="空间" style="width: 250px;margin-left:10px" />
        <p style="margin:10px"></p>
        优先级<Input v-model="task.priority" placeholder="优先级" style="width: 250px;margin-left:22px" />
        <p style="margin:10px"></p>
        cron策略<Input v-model="task.cron" placeholder="按照cron格式输入，若不设置则不填写" style="width: 250px;margin-left:10px" />
        <p style="margin:10px"></p>
        <Button type="success" style="margin-left:200px;margin-top:10px" @click="handlerCreate()" >提交</Button>
      </div>

      <div style="margin-top:10px">
        执行内容<Input v-model="task.script" type="textarea" placeholder="可能是一串shell脚本..." rows="4" style="width: 300px;margin-left:10px" />
        <p style="margin:10px"></p>
        备注信息<Input v-model="task.detail" type="textarea" placeholder="备注信息..." rows="3" style="width: 300px;margin-left:10px" />
      <p style="margin:10px"></p>
      </div>
    </div>

  </div>
</template>
<script>
import { createTask } from '@/api/user'
export default {
  name: 'task_create',
  data () {
    return {
      task: {
        task_name: '',
        script: '',
        cron: '',
        detail: '',
        capacity: 0,
        priority: 0
      }
    }
  },
  methods: {
    handlerCreate () {
      createTask(this.task).then(res => {
        if (res.data.code === 666) {
          this.$Message.success('任务创建成功！')
        } else {
          this.$Message.error('任务创建失败!')
        }
      })
    }
  }
}
</script>
