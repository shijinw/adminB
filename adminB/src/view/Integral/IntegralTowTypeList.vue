<template>
  <div>
    <Card>
        <p slot="title">积分商品列表</p>
        <div>
             <Input v-model="from.name" placeholder="商品名称" style="width: 200px; margin-right: 10px;" />
          <Divider type="vertical" />
          <Select v-model="from.status" clearable placeholder="状态" style="width: 200px; margin-right: 10px;" >
                <Option v-for="item in tatlist" :value="item.id" :key="item.id">{{ item.name }}</Option>
              </Select>
              <Divider type="vertical" />
                <Button type='primary'  @click="search">筛选</Button>
           <Divider type="vertical" />
              <Button type='primary' @click="addlist" style="margin: 10px;">添加积分商品</Button>
              <Divider type="vertical" />
          <Table stripe size="small" :columns="columns" :data="data" ></Table>
      <div style="padding: 20px 0; text-align: right;">
        <Page  :total="total"    @on-change="onChange"  @on-page-size-change="onPageSizeChange"    :current="from.page"  :page-size="from.limit"     size="small"   show-total  show-elevator show-sizer />
      </div>
        </div>
    </Card>

    <Modal  title="查看图片" v-model="visible"  >
      <img :src="imageUrl" v-if="visible" style="width: 100%">
  </Modal>
  </div>
</template>
<script>
import { goodsList, delGoods } from '@/api/info'
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      visible: false,
      imageUrl: '',
      title: '',
      from: {
        limit: 10,
        page: 1,
        name: '',
        status: ''
      },

      tagsList: [{ id: 1, name: '开启' }, { id: 2, name: '关闭' }],
      tatlist: [{ id: 1, name: '上架' }, { id: 2, name: '下架' }],
      tensList: [{ id: 1, name: '日常任务' }, { id: 2, name: '新手任务' }],
      modal0: false,
      data: [],
      total: 1,
      columns: [

        {
          title: 'ID',
          key: 'id',
          minWidth: 70,
          tooltip: true
        },
        {
          title: '商品名称',
          key: 'name',
          minWidth: 150,
          tooltip: true,
          align: 'center'
        },
        {
          title: '商品数量',
          key: 'number',
          minWidth: 100,
          tooltip: true,
          align: 'center'
        },
        {
          title: '商品类型',
          key: 'type',
          minWidth: 90,
          tooltip: true,
          render: (h, params) => {
            let text = ''
            let color = ''
            if (params.row.type === 1) {
              text = '实体'
              color = '#019beb'
            } else if (params.row.type === 2) {
              text = '课程'
              color = 'red'
            } else {
              text = '优惠卷'
              color = 'green'
            }
            return h('div', [
              h(
                'span',
                {
                  style: {
                    color: color
                  }
                },
                text
              )
            ])
          }
        },
        {
          title: '图片地址',
          key: 'image',
          minWidth: 140,
          tooltip: true,
          render: (h, params) => {
            return h('div', [
              h(
                'img',
                {
                  attrs: {
                    src: params.row.image, style: 'width: 40px;height: 30px;border-radius: 2px;'
                  },
                  on: {
                    click: () => {
                      this.lookdown(params.row)
                    }
                  }
                }

              )
            ])
          }
        },

        {
          title: '状态',
          key: 'status',
          minWidth: 90,
          tooltip: true,
          render: (h, params) => {
            let text = ''
            let color = ''
            if (params.row.status === 1) {
              text = '上架'
              color = '#019beb'
            } else {
              text = '下架'
              color = 'red'
            }
            return h('div', [
              h(
                'span',
                {
                  style: {
                    color: color
                  }
                },
                text
              )
            ])
          }
        },

        {
          title: '创建时间',
          key: 'create_time',
          minWidth: 100,
          tooltip: true,
          align: 'center'
        },
        {
          title: '介绍',
          key: 'introduce',
          minWidth: 100,
          tooltip: true,
          align: 'center'
        },
        {
          title: '操作',
          key: 'action',
          minWidth: 150,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'info',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.put(params.row)
                  }
                }
              }, '修改'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.remove(params.row)
                  }
                }
              }, '删除')

            ])
          }
        }
      ]
    }
  },
  methods: {
    ...mapMutations(['addTag']),

    addlist () {
      const route = {
        name: 'addGoods',
        meta: {
          title: `添加积分商品`
        }
      }
      this.addTag({
        route: route,
        type: 'push'
      })
      this.$router.push(route)
    },
    put (row) {
      const route = {
        name: 'putGoods',
        meta: {
          title: `修改积分商品_${row.id}`
        },
        query: {
          id: row.id
        }
      }
      this.addTag({
        route: route,
        type: 'push'
      })
      this.$router.push(route)
    },
    search () {
      this.getData(this.from)
    },
    remove (row) {
      delGoods({ id: row.id }).then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.$Message.error('删除成功!')
          this.getData(this.from)
        }
      })
    },
    lookdown (row) {
      this.visible = true
      this.imageUrl = row.image
    },

    onPageSizeChange (val) {
      this.form.limit = val
      this.getData(this.form)
    },
    onChange (val) {
      this.form.page = val
      this.getData(this.form)
    },

    getData (obj) {
      goodsList(obj).then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.data = rep.data.data
          this.total = rep.data.total
        }
      })
    }
  },
  mounted () {
    this.getData(this.from)
  }
}
</script>
