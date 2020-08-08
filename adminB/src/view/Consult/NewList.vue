<template>
  <div>
    <Card style="width: 100%;">
 <p slot="title">资讯列表</p>
      <div>
        <Button type="default" shape="circle" icon="md-sync" @click="seach('cursefrom')"></Button>
<Divider type="vertical" />
              <Cascader :data="list" v-model="valueList"  placeholder="新闻一级分类/二级分类" change-on-select style="width:200px; display: inline-block;" ></Cascader>
<Divider type="vertical" />
        <Input v-model="cursefrom.news_id" placeholder="ID" style="width: 100px; margin-right: 10px;" />
<Divider type="vertical" />
        <Input v-model="cursefrom.title" placeholder="标题名" style="width: 100px; margin-right: 10px;" />
<Divider type="vertical" />
        <Input v-model="cursefrom.keyword" placeholder="关键字" style="width: 100px; margin-right: 10px;" />
<Divider type="vertical" />
        <Input v-model="cursefrom.source" placeholder="来源" style="width: 80px; margin-right: 10px;" />

        <div style="float:right">
        <Button type='primary' @click="seachKnow" style="margin-right: 10px;">筛选</Button>
        <Button type='primary' @click="AddKnow" style="margin-right: 10px;">添加资讯</Button>
          </div>

      </div>
      <Divider />
           <Table stripe size="small" :columns="columns" :data="data" ></Table>

      <div style="padding: 20px 0; text-align: right;">
        <Page :total="total" @on-change="onChange" @on-page-size-change="onPageSizeChange" :current="cursefrom.page" :page-size="cursefrom.limit" size="small" show-total show-elevator show-sizer />
      </div>
    </Card>

  </div>

</template>

<script>
import { newsList, headNews, hotNews, deleteNews, NewsTypeLevel } from '@/api/Consult'
import { mapMutations } from 'vuex'

export default {

  data () {
    return {
      data: [],
      total: 1,

      valueList: [],
      list: [],
      fromData: {
        mobile: '',
        course_name: '',
        section_name: '',
        create_time: '',
        reply_status: '',
        quiz_source: '',
        reply_user_name: '',
        reply_time: '',
        quiz: '',
        quiz_image: '',
        reply_quiz: '',
        reply_image: ''
      },
      formatFile: [],
      formatcard: [],
      formatkeat: [{
        id: 1,
        name: '回复'
      },
      {
        id: 2,
        name: '未回复'
      }],
      cursefrom: {
        limit: 10,
        page: 1,
        parent_id: '',
        type_id: '',
        news_id: '',
        title: '',
        keyword: '',
        source: ''
      },
      Comfrom: {
        course_id: '',
        quiz_source: '',
        reply_status: '',
        mobile: '',
        start_time: '',
        end_time: ''
      },
      columns: [
        {
          title: 'ID',
          key: 'id',
          minWidth: 60,
          tooltip: true
        },
        {
          title: '一级分类',
          key: 'parent_name',
          minWidth: 99,
          tooltip: true,
          align: 'center'
        },
        {
          title: '二级分类',
          key: 'type_name',
          minWidth: 90,
          tooltip: true,
          align: 'center'
        },
        {
          title: '标题',
          key: 'title',
          minWidth: 110,
          tooltip: true
        },

        {
          title: '来源',
          key: 'source',
          minWidth: 100,
          tooltip: true
        },

        {
          title: '作者',
          key: 'author',
          minWidth: 100,
          tooltip: true,
          align: 'center'
        },

        {
          title: '点击量',
          key: 'browse',
          minWidth: 80,
          tooltip: true,
          align: 'center'
        },

        {
          title: '是否热点',
          key: 'is_hot',
          minWidth: 90,
          tooltip: true,
          render: (h, params) => {
            let texts = ''
            let color = ''
            if (params.row.is_hot == 1) {
              texts = '是'
              color = '#019beb'
            } else if (params.row.is_hot == 2) {
              texts = '不是'
              color = 'red'
            }
            return h('div', {
              style: {
                color: color
              }
            }, texts)
          }
        },
        {
          title: '是否头条',
          key: 'is_head',
          minWidth: 90,
          tooltip: true,
          render: (h, params) => {
            let texts = ''
            let color = ''
            if (params.row.is_head == 1) {
              texts = '是'
              color = '#019beb'
            } else if (params.row.is_head == 2) {
              texts = '不是'
              color = 'red'
            }
            return h('div', {
              style: {
                color: color
              }
            }, texts)
          }
        },
        {
          title: '操作',
          key: 'action',
          minWidth: 280,
          align: 'center',
          render: (h, params) => {
            let texts = ''
            let text2 = ''

            if (params.row.is_head == 2) {
              texts = '设为头条'
            } else if (params.row.is_head == 1) {
              texts = '取消头条'
            }
            if (params.row.is_hot == 2) {
              text2 = '设为热点'
            } else if (params.row.is_hot == 1) {
              text2 = '取消热点'
            }
            return h('div', [
              h('Button', {
                props: {
                  type: 'success',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.headNews(params.row)
                  }
                }
              }, texts),
              h('Button', {
                props: {
                  type: 'warning',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.hotNews(params.row)
                  }
                }
              }, text2),
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
  watch: {

    valueList (newValue, oldValue) {
      if (newValue.length === 0) {
        this.cursefrom.parent_id = ''
        this.cursefrom.type_id = ''
      } else if (newValue.length === 1) {
        this.cursefrom.parent_id = newValue[0]
        this.cursefrom.type_id = ''
      } else {
        this.cursefrom.parent_id = newValue[0]
        this.cursefrom.type_id = newValue[1]
      }
    }
  },
  methods: {
    ...mapMutations(['addTag']),
    seach (name) {
      this.$refs[name].resetFields()
    },
    seachKnow () {
      this.getQdata(this.cursefrom)
    },
    getProMajList () {
      NewsTypeLevel().then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.list = rep.data
        }
      })
    },
    AddKnow () {
      const route = {
        name: 'Add_Consult',
        meta: {
          title: `添加资讯`
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
        name: 'Put_Consult',
        meta: {
          title: `${row.id} - 修改课程`
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
    remove (row) {
      deleteNews({ id: row.id }).then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.getQdata(this.cursefrom)
          this.$Message.success('操作成功，请注意查看')
        }
      })
    },
    headNews (row) {
      headNews({ news_id: row.id, is_head: row.is_head === 1 ? '2' : '1' }).then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.getQdata(this.cursefrom)
          this.$Message.success('操作成功，请注意查看')
        }
      })
    },
    hotNews (row) {
      hotNews({ news_id: row.id, is_hot: row.is_hot === 1 ? '2' : '1' }).then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.getQdata(this.cursefrom)
          this.$Message.success('操作成功，请注意查看')
        }
      })
    },
    onChange (val) {
      this.cursefrom.page = val

      this.getQdata(this.cursefrom)
    },
    onPageSizeChange (val) {
      this.form.limit = valcursefrom

      this.getQdata(this.cursefrom)
    },
    getQdata (obj) {
      newsList(obj).then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.data = rep.data.data
          this.total = rep.data.total
        }
      })
    }

  },

  mounted () {
    this.getProMajList()
    this.getQdata(this.cursefrom)
  }
}
</script>

<style lang="less" scoped>

</style>
