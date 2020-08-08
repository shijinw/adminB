<template>
  <div>
    <Card>

        <Button type='primary' @click="Addbooks" style="margin-bottom: 10px;">添加图书</Button>

        <p slot="title">试卷列表</p>
        <Table stripe size="small" :columns="columns" :data="data" ></Table>

    </Card>
  </div>
</template>
<script>
import { BooksList, statusBooks } from '@/api/Books'
import { mapMutations } from 'vuex'

export default {
  data () {
    return {
      data: [],
      columns: [
        {
          title: '图书ID',
          key: 'id',
          minWidth: 80,
          tooltip: true,
          align: 'center'
        },
        {
          title: '图书名称',
          key: 'name',
          minWidth: 110,
          tooltip: true,
          align: 'center'
        },
        {
          title: 'pc封面图',
          key: 'pc_img',
          minWidth: 110,
          tooltip: true,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h(
                'img',
                {
                  attrs: {
                    src: params.row.pc_img, style: 'width: 40px;height: 30px;border-radius: 2px;'
                  }

                }

              )
            ])
          }
        },

        {
          title: '价格',
          key: 'price',
          minWidth: 90,
          tooltip: true,
          align: 'center'
        },
        {
          title: '实际价格',
          key: 'pay_price',
          minWidth: 90,
          tooltip: true,
          align: 'center'
        },

        {
          title: '是否上架',
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
          title: '作者',
          key: 'author',
          minWidth: 90,
          tooltip: true,
          align: 'center'
        },

        {
          title: '是否预售',
          key: 'is_presell',
          minWidth: 90,
          tooltip: true,
          align: 'center',
          render: (h, params) => {
            let text = ''
            let color = ''
            if (params.row.is_presell === 1) {
              text = '正常'
              color = '#019beb'
            } else {
              text = '预售'
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
          title: '出版社',
          key: 'pub_company',
          minWidth: 90,
          tooltip: true,
          align: 'center'
        },
        {
          title: '操作',
          key: 'is_addkonw',
          minWidth: 200,
          align: 'center',
          render: (h, params) => {
            let texts = ''
            let color = ''
            if (params.row.status === 1) {
              texts = '下架'
              color = 'error'
            } else if (params.row.status === 2) {
              texts = '上架'
              color = 'success'
            }
            return h('div', [

              h('Button', {
                props: {
                  type: 'warning',
                  size: 'small'

                },
                style: {
                  marginRight: '10px'
                },
                on: {
                  click: () => {
                    this.putKnow(params.row)
                  }
                }
              }, '修改'),

              h('Button', {
                props: {
                  type: color,
                  size: 'small'

                },
                on: {
                  click: () => {
                    this.remove(params.row)
                  }
                }
              }, texts)
            ])
          }
        }
      ]
    }
  },
  methods: {
    ...mapMutations(['addTag']),
    getData () {
      BooksList().then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.data = rep.data
        }
      })
    },
    remove (row) {
      statusBooks({ id: row.id, status: row.status === 1 ? 2 : 1 }).then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.$Message.success('状态修改成功!请核实')
          this.getData()
        }
      })
    },
    Addbooks () {
      const route = {
        name: 'AddBooks',
        meta: {
          title: `添加图书`
        }

      }
      this.addTag({
        route: route,
        type: 'push'
      })
      this.$router.push(route)
    },
    putKnow (row) {
      const route = {
        name: 'PutBooks',
        meta: {
          title: `${row.id}-修改图书`
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
    }
  },

  mounted () {
    this.getData()
  }
}
</script>
