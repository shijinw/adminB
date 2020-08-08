<template>
  <div>
    <Card>
      <p slot="title">讲师列表</p>
      <div>
        <Button type="default" shape="circle" icon="md-sync" @click="seachQ"></Button>
        <Divider type="vertical" />
        <Select v-model="form.teacher_title_id" clearable style="width:200px">
          <Option v-for="item in titleList" :value="item.id" :key="item.id">{{ item.title }}</Option>
        </Select>
        <Divider type="vertical" />
        <Input v-model="form.name" placeholder="讲师名称" style="width: 200px; margin-right: 10px;" />
        <Button type='primary' @click="seach" style="margin-right: 10px;">搜索</Button>
        <Button type='primary' @click="addTeacher" style="margin-right: 10px;">添加讲师</Button>
      </div>
      <Divider />
      <Table size="small" :columns="columns" :data="data"></Table>
      <div style="padding: 20px 0; text-align: right;">
        <Page :total="total" @on-change="onChange" @on-page-size-change="onPageSizeChange" :current="form.page" :page-size="form.limit" size="small" show-total show-elevator show-sizer />
      </div>
    </Card>
     <Modal  title="查看图片" v-model="visible"  >
      <img :src="imageUrl" v-if="visible" style="width: 100%">
  </Modal>
  </div>
</template>

<script>
import { teacherList, teacherTitleList, deleteTeacher, teacherMove } from '@/api/teacher'
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      data: [],
      total: 0,
      titleList: [],
      visible: false,
      imageUrl: '',
      form: {
        page: 1,
        limit: 10,
        name: '',
        teacher_title_id: ''
      },
      columns: [
        {
          title: 'ID',
          key: 'id',
          minWidth: 70,
          align: 'center'
        },
        {
          title: '讲师名',
          key: 'name',
          minWidth: 90,
          align: 'center'
        },
        {
          title: '讲师头衔',
          key: 'title',
          minWidth: 130,
          align: 'center'
        },
        {
          title: '讲师英文名',
          key: 'en_name',
          minWidth: 100,
          align: 'center'
        },
        {
          title: '资历',
          key: 'longevity',
          minWidth: 150,
          tooltip: true,
          align: 'center'
        },
        {
          title: '简介',
          key: 'introduce',
          minWidth: 150,
          tooltip: true,
          align: 'center'
        },
        {
          title: '讲师头像',
          key: 'pictrue',
          minWidth: 120,
          tooltip: true,
          render: (h, params) => {
            return h('div', [
              h(
                'img',
                {
                  attrs: {
                    src: params.row.pictrue, style: 'width: 40px;height: 30px;border-radius: 2px;'
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
          title: '操作',
          key: 'action',
          minWidth: 220,
          align: 'center',
          render: (h, params) => {
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
                    this.Up(params.row)
                  }
                }
              }, '上移'),
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
                    this.Down(params.row)
                  }
                }
              }, '下移'),
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
  components: {

  },
  watch: {

  },
  methods: {
    ...mapMutations([
      'addTag'
    ]),
    seachQ () {
      this.form.name = ''
      this.form.teacher_title_id = ''
      this.getData(this.form)
    },
    seach () {
      this.getData(this.form)
    },
    onChange (val) {
      var self = this
      self.form.page = val
      self.getData(self.form)
    },
    onPageSizeChange (val) {
      var self = this
      self.form.limit = val
      self.getData(self.form)
    },
    addTeacher () {
      const route = {
        name: 'add_teacher',
        meta: {
          title: `添加讲师`
        }
      }
      this.addTag({
        route: route,
        type: 'push'
      })
      this.$router.push(route)
    },
    Up (row) {
      teacherMove({ id: row.id, move_status: 1 }).then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.$Message.success('上移成功!请查看列表~~')
          this.getData(this.form)
        } else if (rep.code === 405) {
          this.$Message.error('无法移动，已经第一了!')
        }
      })
    },
    lookdown (row) {
      this.imageUrl = row.pictrue
      this.visible = true
    },
    Down (row) {
      teacherMove({ id: row.id, move_status: 2 }).then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.$Message.success('下移成功!请查看列表~~')
          this.getData(this.form)
        } else if (rep.code === 405) {
          this.$Message.error('无法移动，已经最后了!')
        }
      })
    },
    remove (row) {
      this.$Modal.confirm({
        title: '温馨提示',
        content: '是否确认删除此讲师吗？',
        onOk: () => {
          deleteTeacher(row.id).then(res => {
            if (res.data.code === 200) {
              this.$Message.success('删除成功!')
              this.getData(this.form)
            }
          })
        }
      })
    },
    put (row) {
      const route = {
        name: 'put_teacher',
        query: {
          id: row.id
        },
        meta: {
          title: `修改讲师 - ${row.id}`
        }
      }
      this.addTag({
        route: route,
        type: 'push'
      })
      this.$router.push(route)
    },
    getData (obj) {
      teacherList(obj).then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.total = rep.data.total
          this.data = rep.data.data
        }
      })
    },
    getTitle () {
      teacherTitleList().then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.titleList = rep.data
        }
      })
    }
  },
  mounted () {
    this.getData(this.form)
    this.getTitle()
  }
}
</script>

<style lang="less">

</style>
