<template>
  <div>
    <Card>
      <p slot="title">课程列表</p>
      <div>
        <Button type="default" shape="circle" icon="md-sync" @click="seachQ"></Button>
        <Divider type="vertical" />
        <Cascader :data="list" v-model="valueList" change-on-select style="width:300px; display: inline-block;" placeholder="项目/专业"></Cascader>
        <Divider type="vertical" />
        <Select v-model="form.class_id" clearable style="width:200px" placeholder="标签">
          <Option v-for="item in tagsList" :value="item.id" :key="item.id">{{ item.class_name }}</Option>
        </Select>
        <Divider type="vertical" />
        <Input v-model="form.name" placeholder="课程名称" style="width: 200px; margin-right: 10px;" />
        <Button type='primary' @click="seach" style="margin-right: 10px;">搜索</Button>
              <Button v-if="Auth.top[0]" :type='Auth.top[0].menu_type' style="margin-right: 10px;" @click="addCourse">{{Auth.top[0].menu_title}}</Button>
      </div>
      <Divider />
      <Table stripe size="small" :columns="columns" :data="data"></Table>

      <div style="padding: 20px 0; text-align: right;">
        <Page :total="total" @on-change="onChange" @on-page-size-change="onPageSizeChange" :current="form.page" :page-size="form.limit" size="small" show-total show-elevator show-sizer />
      </div>
    </Card>
  </div>
</template>

<script>
import { userPageRuleList } from '@/api/Answer'
import { statusCourse, courseList, deleteCourse } from '@/api/course'
import { labelList } from '@/api/tags'
import { proMjor2tree } from '@/api/Linkmenu'
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      data: [],
      list: [],
      Auth: {
        right: [],
        top: []
      },
      tagsList: [],
      valueList: [],
      total: 0,
      columns: [
        {
          title: '课程ID',
          key: 'id',
          minWidth: 80
        },
        // {
        //   title: '项目名称',
        //   key: 'project_name',
        //   minWidth: 150,
        //   tooltip: true
        // },
        {
          title: '课程名称',
          key: 'name',
          minWidth: 220,
          tooltip: true
        },
        {
          title: '专业名称',
          key: 'major_name',
          minWidth: 180,
          tooltip: true
        },
        {
          title: '标签名称',
          key: 'class_name',
          minWidth: 150,
          tooltip: true
        },

        {
          title: '课程状态',
          key: 'status',
          minWidth: 100,
          tooltip: true,
          render: (h, params) => {
            let texts = ''
            let color = ''
            if (params.row.status == 1) {
              texts = '上架'
              color = '#019beb'
            } else if (params.row.status == 2) {
              texts = '下架'
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
          minWidth: 320,
          align: 'center',
          render: (h, params) => {
            let btns = []
            if (this.Auth.right.length > 0) {
              let listBtn = this.Auth.right
              listBtn.forEach(v => {
                let obj = h('Button', {
                  props: {
                    type: v.menu_type,
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.publicFun(v.key, params.row)
                    }
                  }
                }, v.menu_title)
                if (params.row.status === 2) {
                  if (v.key != 'c')btns.push(obj)
                } else {
                  if (v.key != 'b')btns.push(obj)
                }
              })
            }
            return h('div', [...btns])
            // let texts = ''
            // if (params.row.status == 2) {
            //   texts = '上架'
            // } else if (params.row.status == 1) {
            //   texts = '下架'
            // }
            // return h('div', [
            //   h('Button', {
            //     props: {
            //       type: 'primary',
            //       size: 'small'
            //     },
            //     style: {
            //       marginRight: '5px'
            //     },
            //     on: {
            //       click: () => {
            //         this.putaway(params.row)
            //       }
            //     }
            //   }, texts),
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
            //   }, '修改'),

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
            //         this.toSection(params.row)
            //       }
            //     }
            //   }, '章节管理'),
            //   h('Button', {
            //     props: {
            //       type: 'error',
            //       size: 'small'
            //     },
            //     on: {
            //       click: () => {
            //         this.remove(params.row)
            //       }
            //     }
            //   }, '删除')
            // ])
          }
        }
      ],
      form: {
        page: 1,
        limit: 10,
        project_id: '',
        major_id: '',
        class_id: '',
        name: ''
      }
    }
  },
  components: {

  },
  watch: {
    valueList (newValue, oldValue) {
      if (newValue.length === 0) {
        this.form.project_id = ''
        this.form.major_id = ''
      } else if (newValue.length === 1) {
        this.form.project_id = newValue[0]
        this.form.major_id = ''
      } else {
        this.form.project_id = newValue[0]
        this.form.major_id = newValue[1]
      }
    }
  },
  methods: {
    ...mapMutations([
      'addTag'
    ]),
    seach () {
      this.getData(this.form)
    },
    seachQ () {
      this.form.page = 1
      this.form.limit = 10
      this.form.project_id = ''
      this.form.major_id = ''
      this.form.class_id = ''
      this.form.name = ''
      this.getData(this.form)
    },
    addCourse () {
      const route = {
        name: 'add_course',
        meta: {
          title: `添加课程`
        }
      }
      this.addTag({
        route: route,
        type: 'push'
      })
      this.$router.push(route)
    },
    onChange (val) {
      this.form.page = val
      this.getData(this.form)
    },
    onPageSizeChange (val) {
      this.form.limit = val
      this.getData(this.form)
    },
    publicFun (key, row) {
      switch (key) {
        case 'b':
          statusCourse({ id: row.id, status: row.status === 1 ? '2' : '1' }).then(res => {
            if (res.data.code === 200) {
              this.$Message.success(res.data.msg)
              this.getData(this.form)
            } else if (res.data.code === 405) {
              this.$Message.warning(res.data.msg)
            }
          })
          break
        case 'c':
          statusCourse({ id: row.id, status: row.status === 1 ? '2' : '1' }).then(res => {
            if (res.data.code === 200) {
              this.$Message.success(res.data.msg)
              this.getData(this.form)
            } else if (res.data.code === 405) {
              this.$Message.warning(res.data.msg)
            }
          })
          break
        case 'd':
          const route = {
            name: 'put_course',
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
          break
        case 'e':
          const routes = {
            name: 'section_list',
            meta: {
              title: `${row.id} - 章节列表`
            },
            query: {
              id: row.id
            }
          }
          this.addTag({
            route: routes,
            type: 'push'
          })
          this.$router.push(routes)
          break
        case 'f':
          this.$Modal.confirm({
            title: '温馨提示',
            content: '确认删除此课程吗？',
            onOk: () => {
              deleteCourse({ id: row.id }).then(res => {
                if (res.data.code === 200) {
                  this.$Message.success('删除成功!')
                  this.getData(this.form)
                }
              })
            }
          })
          break
      }
    },

    getData (obj) {
      courseList(obj).then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.data = rep.data.data
          this.total = rep.data.total * 1
        }
      })
    },
    getList (obj) {
      labelList(obj).then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.tagsList = rep.data
        }
      })
    },
    getAuth (name) {
      userPageRuleList({ menu_name: name }).then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.Auth = rep.data
        }
      })
    },

    getProMajList () {
      proMjor2tree().then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.list = rep.data
        }
      })
    }
  },
  mounted () {
    this.getList({ status: '', class_name: '' })
    this.getProMajList()
    this.getData(this.form)
    this.getAuth(this.$route.name)
  }
}
</script>

<style lang="less">

</style>
