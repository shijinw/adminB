<template>
  <div>
    <Card>
          <p slot="title">试题纠错列表</p>
       <Table ref="table" size="small" :columns="columns" :data="data" style="margin-top:25px"></Table>
      <div style="padding: 20px 0; text-align: right;">
        <Page :total="total" @on-change="onChange" @on-page-size-change="onPageSizeChange" :current="form.page" :page-size="form.limit" size="small" show-total show-elevator show-sizer />
      </div>
   </Card>
  </div>
</template>
<script>
import { statusCorrection, correctionList } from '@/api/question'
import { mapMutations } from 'vuex'
import { userPageRuleList } from '@/api/Answer'
export default {
  data () {
    return {
      data: [],
      Auth: {
        right: [],
        top: []
      },
      columns: [
        {
          title: '纠错ID',
          key: 'id',
          minWidth: 80,
          align: 'center'
        },
        {
          title: '错误内容',
          key: 'error_content',
          minWidth: 120
        },

        {
          title: '试题id',
          key: 'question_id',
          minWidth: 150,
          align: 'center'
        },
        {
          title: '题干',
          key: 'question_keyword',
          minWidth: 150,
          tooltip: true
        },
        // {
        //   title: '纠错用户',
        //   key: 'user_name',
        //   minWidth: 150,
        //   tooltip: true
        // },
        {
          title: '修正状态',
          key: 'status',
          minWidth: 80,
          tooltip: true,
          render: (h, params) => {
            let text = ''
            let color = ''
            if (params.row.status === 1) {
              text = '已修正'
              color = '#019beb'
            } else {
              text = '未修正'
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
          title: '操作',
          key: 'action',
          minWidth: 200,
          align: 'center',
          render: (h, params) => {
            let is_disabled = true
            if (params.row.status === 1) {
              is_disabled = true
            } else {
              is_disabled = false
            }
            let btns = [
              h('Button', {
                props: {
                  type: 'success',
                  size: 'small',
                  disabled: is_disabled
                },
                on: {
                  click: () => {
                    this.remove(params.row)
                  }
                }
              }, '修正')
            ]
            if (this.Auth.right.length > 0) {
              let listBtn = this.Auth.right
              listBtn.forEach(e => {
                let obj = h('Button', {
                  props: {
                    type: e.menu_type,
                    size: 'small'
                  },
                  style: {
                    marginLeft: '6px'
                  },
                  on: {
                    click: () => {
                      this.publicFun(params.row)
                    }
                  }
                }, e.menu_title)
                btns.push(obj)
              })
            }
            return h('div', [...btns])
            // return h('div', [
            //   h('Button', {
            //     props: {
            //       type: 'info',
            //       size: 'small'
            //     },
            //     style: {
            //       marginRight: '5px'
            //     },
            //     on: {
            //       click: () => {
            //         this.put(params.row)
            //       }
            //     }
            //   }, '修改试题'),

            // ])
          }
        }
      ],
      total: 1,
      form: {
        page: 1,
        limit: 10
      }
    }
  },
  methods: {
    ...mapMutations([
      'addTag'
    ]),
    onChange (val) {
      this.form.page = val
      this.getData(this.form)
    },
    onPageSizeChange (val) {
      this.form.limit = val
      this.getData(this.form)
    },

    remove (row) {
      statusCorrection({ id: row.id, status: 1 }).then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.$Message.success('修正成功!请查阅')
          this.getData(this.form)
        }
      })
    },
    publicFun (row) {
      const route = {
        name: 'Put_Question',
        meta: {
          title: `${row.question_id} -修改题库`
        },
        query: {
          id: row.question_id
        }
      }
      this.addTag({
        route: route,
        type: 'push'
      })
      this.$router.push(route)
    },
    getAuth (name) {
      userPageRuleList({ menu_name: name }).then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.Auth = rep.data
        }
      })
    },
    getData (obj) {
      correctionList(obj).then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.data = rep.data.data
          this.total = rep.data.total
        }
      })
    }

  },
  mounted () {
    this.getData(this.form)
    this.getAuth(this.$route.name)
  }
}
</script>
