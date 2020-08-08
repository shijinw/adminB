<template>
  <div>
    <Card>
      <p slot="title">学员接收管理 - 班主任专属</p>
      <div>
        <Button type="default" shape="circle" icon="md-sync" @click="seach"></Button>
        <Divider type="vertical" />
        <Select v-model="form.teacher_id" clearable style="width:200px; margin-right: 10px;" v-if="is_teacher == 2">
          <Option v-for="item in teacherList" :value="item.id" :key="item.id">{{ item.truename }}</Option>
        </Select>
        <Input v-model="form.username" placeholder="请输入" style="width: 200px; margin-right: 10px;" />
        <Button type='primary' @click="seach" style="margin-right: 10px;">搜索</Button>
        <Button type='primary' @click="allReceive" style="margin-right: 10px;">接收</Button>
      </div>
      <Divider />
      <Table ref="table" size="small" :columns="columns" :data="data" @on-selection-change="selectionStu" @on-select-cancel="selectionCancel"></Table>
      <div style="padding: 20px 0; text-align: right;">
        <Page :total="total" @on-change="onChange" @on-page-size-change="onPageSizeChange" :current="form.page" :page-size="form.limit" size="small" show-total show-elevator show-sizer />
      </div>
    </Card>
  </div>
</template>

<script>
import { receptionList, reception, stuTeacherList } from '@/api/student'
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      data: [],
      total: 0,
      teacherList: [],
      form: {
        page: 1,
        limit: 10,
        username: '',
        teacher_id: ''
      },
      columns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: 'ID',
          key: 'id',
          minWidth: 80
        },
        {
          title: '用户名称',
          key: 'username',
          minWidth: 120
        },
        {
          title: '手机号码',
          key: 'mobile',
          minWidth: 120
        },
        {
          title: '报名课程',
          key: 'package_name',
          minWidth: 150,
          tooltip: true
        },
        {
          title: '申请时间',
          key: 'create_time',
          minWidth: 150
        },
        {
          title: '是否注册',
          key: 'is_reg',
          minWidth: 100,
          render: (h, params) => {
            let text = ''
            if (params.row.is_reg == 1) text = '已注册'
            else text = '未注册'
            return h('div', [
              h('span', {
                props: {}
              }, text)
            ])
          }
        },
        {
          title: '销售人员',
          key: 'sales_name',
          minWidth: 150
        },
        {
          title: '操作',
          key: 'action',
          minWidth: 100,
          align: 'center',
          render: (h, params) => {
            let text = ''
            let is_reception = false
            if (params.row.is_reception == 1) {
              text = '已接收'
              is_reception = true
            } else {
              text = '接受'
              is_reception = false
            }
            return h('div', [
              h('Button', {
                props: {
                  type: 'info',
                  size: 'small',
                  disabled: is_reception
                },
                on: {
                  click: () => {
                    this.receive(params.row)
                  }
                }
              }, text)
            ])
          }
        }
      ],
      id: [],
      is_teacher: ''
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
    // select (val) {
    //   this.form.page = 1
    //   this.form.teacher_id = val
    //   this.getData(this.form)
    // },
    selectionCancel (arr, row) {
      this.id.splice(this.id.findIndex(v => v == row.id), 1)
    },
    selectionStu (arr) {
      let list = arr.map(item => item.id)
      if (list.length > 0) {
        list.forEach(v => {
          this.id.push(v)
        })
      }
      this.id = Array.from(new Set(this.id))
    },
    allReceive () {
      if (this.id.length === 0) {
        this.$Message.error('请选择接收成员!')
        return
      }
      let len = this.id.length
      this.$Modal.confirm({
        title: '温馨提示',
        content: `本次是否接收<strong style="color: red;">${len}</strong>位学员？`,
        onOk: () => {
          reception(this.id.join(',')).then(res => {
            if (res.data.code === 200) {
              this.$Message.success('接收成功，等待审核中...')
              this.id = []
              this.getData(this.form)
            }
          })
        }
      })
    },
    seach () {
      this.form.page = 1
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
    receive (row) {
      this.$Modal.confirm({
        title: '温馨提示',
        content: '是否确认接收此学员吗？',
        onOk: () => {
          reception(row.id).then(res => {
            if (res.data.code === 200) {
              this.$Message.success('接收成功，等待审核中...')
              this.id = []
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
      receptionList(obj).then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.total = rep.data.total
          this.is_teacher = rep.data.is_teacher
          let arr = rep.data.data
          arr.forEach(val => {
            if (val.is_reception == 1) {
              val._disabled = true
            }
            if (this.id.length > 0) {
              this.id.forEach(key => {
                if (key == val.id) {
                  val._checked = true
                }
              })
            }
          })
          this.data = arr
        }
      })
    },
    getList () {
      stuTeacherList().then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.teacherList = rep.data
        }
      })
    }
  },
  mounted () {
    this.getData(this.form)
    this.getList()
  }
}
</script>

<style lang="less">

</style>
