<template>
  <div>
    <h2>负载均衡</h2>
    <Table border :columns="columns1" :data="data1">
      <template slot-scope="{ row }" slot="name">
        <strong>{{ row.name }}</strong>
      </template>
      <template slot-scope="{ row, index }" slot="action">
        <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">查看详情</Button>
      </template>
    </Table>
  </div>
</template>
<script>
import { getDispatchers } from '@/api/user'
export default {
  name: 'loadBalance',
  data () {
    return {
      columns1: [
        {
          title: 'id',
          key: 'id',
          width: 100
        },
        {
          title: '自定义名称',
          key: 'custom_name',
          width: 200
        },
        {
          title: '中文名',
          key: 'router_ZN'
        },
        {
          title: '英文名',
          key: 'router_EN'
        },
        {
          title: '是否可用',
          key: 'available',
          width: 100
        },
        {
          title: 'Action',
          slot: 'action',
          width: 100,
          align: 'center'
        }
      ],
      data1: []
    }
  },
  methods: {
    show (index) {
      this.$Modal.info({
        title: '负载均衡详情',
        content: `id：${this.data1[index].id}<br>自定义名称：${this.data1[index].custom_name}<br>中文名：${this.data1[index].router_ZN}<br>英文名：${this.data1[index].router_EN}<br>地址范围：${this.data1[index].address}<br>是否可用：${this.data1[index].available}<br>属性：${this.data1[index].properties}`
      })
    },
    getAll () {
      getDispatchers().then(res => {
        var resArray = res.data.obj
        for (var i = 0; i < resArray.length; i++) {
          var model = {
            id: 0,
            custom_name: '',
            router_ZN: '',
            router_EN: '',
            address: '',
            properties: '',
            available: ''
          }
          if (resArray[i].type === 'LOAD_BALANCE') {
            model.id = resArray[i].id
            model.custom_name = resArray[i].custom_name
            model.router_ZN = resArray[i].router_ZN
            model.router_EN = resArray[i].router_EN
            if (resArray[i].address === null) {
              model.address = '(--没有配置地址，默认全部已注册的服务器--)'
            } else {
              model.address = resArray[i].address
            }
            if (resArray[i].properties === null) {
              model.properties = '(--没有配置其他属性--)'
            } else {
              model.properties = resArray[i].properties
            }
            if (resArray[i].available === true) {
              model.available = '可用'
            } else {
              model.available = '不可用'
            }
            this.data1.push(model)
          }
        }
      })
    }
  },
  mounted: function () {
    this.getAll()
  }
}
</script>
