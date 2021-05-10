<template>
  <div>
    <Card>
      <div class="drag-box-card">
        <!-- 切记设置list1和list2属性时，一定要添加.sync修饰符 -->
        <drag-list
          :list1.sync="list1"
          :list2.sync="list2"
          :dropConClass="dropConClass"
          @on-change="handleChange"
        >
          <h3 slot="left-title">任务列表</h3>
          <Card class="drag-item" slot="left" slot-scope="left">{{ left.itemLeft.task_name }}</Card>
          <h3 slot="right-title">待处理任务</h3>
          <Card class="drag-item" slot="right" slot-scope="right">{{ right.itemRight.task_name }}</Card>
        </drag-list>
      </div>
      <div style="float:right">
        <h3 slot="right-title" style="margin-top:15px">调度设置</h3>
        <Col style="width:300px;margin-top:10px">
          <Select v-model="loadBalance" filterable placeholder="请选择负载均衡策略">
            <Option
              v-for="item in loadBalances"
              :value="item.custom_name"
              :key="item.custom_name"
            >{{ item.router_ZN }}({{ item.router_EN }})</Option>
          </Select>
        </Col>
        <Button type="success" long style="margin-top:20px" @click="execLoadBalance()">按负载均衡算法执行任务</Button>
        <Col style="width:300px;margin-top:80px">
          <Select v-model="name" filterable placeholder="请选择资源调度策略" @on-change="setScheduler()" >
            <Option
              v-for="item in schedulers"
              :value="item.custom_name"
              :key="item.custom_name"
            >{{ item.router_ZN }}({{ item.router_EN }})</Option>
          </Select>
        </Col>
        <Button type="success" long style="margin-top:20px" @click="execScheduler()">按资源调度策略执行任务</Button>
      </div>
    </Card>
  </div>
</template>
<script>
import DragList from '_c/drag-list'
import {
  getTasks,
  getDispatchers,
  execLoadBalance,
  execScheduler,
  addTask,
  setDispatcher
} from '@/api/user'
export default {
  name: 'task_exec',
  components: {
    DragList
  },
  data () {
    return {
      list1: [],
      list2: [],
      dropConClass: {
        left: ['drop-box', 'left-drop-box'],
        right: ['drop-box', 'right-drop-box']
      },
      handleList: [],
      loadBalances: [],
      schedulers: [],
      loadBalance: '',
      name: ''
    }
  },
  methods: {
    handleChange ({ src, target, oldIndex, newIndex }) {
      this.handleList.push(`${src} => ${target}, ${oldIndex} => ${newIndex}`)
    },
    execLoadBalance () {
      if (this.list2.length === 0) {
        this.$Message.error('未指定任务!')
      } else if (this.loadBalance.length === 0) {
        this.$Message.error('未指定负载均衡!')
      } else {
        for (var i = 0; i < this.list2.length; i++) {
          execLoadBalance(this.list2[i].task_name, this.loadBalance).then(
            res => {
              if (res.data.code === 666) {
              } else {
                this.$Message.error(
                  '任务[' + this.list2[i].task_name + ']执行失败!'
                )
              }
            }
          )
        }
        this.$Message.success('任务执行成功！')
      }
    },
    setScheduler () {
      console.log(this.name)
      setDispatcher(this.name)
    },
    execScheduler () {
      if (this.name.length === 0) {
        this.$Message.error('未指定资源调度!')
      } else {
        var testNames = []
        for (var i = 0; i < this.list2.length; i++) {
          testNames.push(this.list2[i].task_name)
        }
        addTask(testNames).then(res => {
          if (res.data.code === 666) {
            execScheduler().then(res => {
              if (res.data.code === 666) {
                this.$Message.success('任务执行成功！')
              } else {
                this.$Message.error('任务执行失败!')
              }
            })
          }
        })
      }
    }
  },
  mounted () {
    getTasks().then(res => {
      this.list1 = res.data.obj
    })
    getDispatchers().then(res => {
      var resArray = res.data.obj
      for (var i = 0; i < resArray.length; i++) {
        if (resArray[i].type === 'DISPATCHER') {
          this.schedulers.push(resArray[i])
        } else {
          this.loadBalances.push(resArray[i])
        }
      }
      console.log(schedulers)
    })
  }
}
</script>
<style lang="less">
.drag-box-card {
  display: inline-block;
  width: 600px;
  height: 560px;
  .drag-item {
    margin: 10px;
  }
  h3 {
    padding: 10px 15px;
  }
  .drop-box {
    border: 1px solid #eeeeee;
    height: 455px;
    border-radius: 5px;
  }
  .left-drop-box {
    margin-right: 15px;
  }
  .right-drop-box {
    //
  }
}
.handle-log-box {
  display: inline-block;
  margin-left: 20px;
  border: 1px solid #eeeeee;
  vertical-align: top;
  width: 200px;
  height: 500px;
  h3 {
    padding: 10px 14px;
  }
  .handle-inner-box {
    height: ~"calc(100% - 44px)";
    overflow: auto;
    p {
      padding: 14px 0;
      margin: 0 14px;
      border-bottom: 1px dashed #eeeeee;
    }
  }
}
.res-show-box {
  display: inline-block;
  margin-left: 20px;
  border: 1px solid #eeeeee;
  vertical-align: top;
  width: 350px;
  height: 570px;
}
</style>
