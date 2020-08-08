<template>
  <div>
    <Card>
      <p slot="title">学员列表 - 班主任管理员专属</p>
      <div>
        <Button type="default" shape="circle" icon="md-sync" @click="seach"></Button>
        <Divider type="vertical" />
        <Select v-model="form.teacher_id" clearable style="width:200px; margin-right: 10px;" placeholder="班主任" v-if="is_teacher == 2">
          <Option v-for="item in teacherList" :value="item.id" :key="item.id">{{ item.truename }}</Option>
        </Select>
        <Select v-model="form.status" clearable style="width:200px; margin-right: 10px;" placeholder="学员类型">
          <Option v-for="item in list" :value="item.id" :key="item.id">{{ item.value }}</Option>
        </Select>
        <Input v-model="form.username" placeholder="手机号或者姓名" style="width: 200px; margin-right: 10px;" />
        <Button type='primary' @click="seach" style="margin-right: 10px;">搜索</Button>
      </div>
      <Divider />
      <Table ref="table" size="small" :columns="columns" :data="data"></Table>
      <div style="padding: 20px 0; text-align: right;">
        <Page :total="total" @on-change="onChange" @on-page-size-change="onPageSizeChange" :current="form.page" :page-size="form.limit" size="small" show-total show-elevator show-sizer />
      </div>
    </Card>
  </div>
</template>

<script>
import { teaSutList, reception, stuTeacherList } from '@/api/student'
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
        teacher_id: '',
        status: ''
      },
      columns: [
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
          title: '学员类型',
          key: 'status',
          minWidth: 100,
          render: (h, params) => {
            let text = ''
            if (params.row.status == 1) {
              text = '正式学员'
            } else if (params.row.status == 3) {
              text = '毕业学员'
            } else if (params.row.status == 3) {
              text = '注册学员'
            } else if (params.row.status == 5) {
              text = '内购学员'
            } else if (params.row.status == 6) {
              text = '优财员工'
            }
            return h('div', [
              h('span',{
                props: {}
              }, text)
            ]);
          }
        },
        {
          title: '注册时间',
          key: 'create_time',
          minWidth: 150
        },
        {
          title: '来源',
          key: 'from',
          minWidth: 100,
          render: (h, params) => {
            let text = ''
            if (params.row.from == 1) {
              text = 'pc注册'
            } else if (params.row.from == 2) {
              text = 'app注册'
            }
            return h('div', [
              h('span',{
                props: {}
              }, text)
            ]);
          }
        },
        {
          title: '班主任',
          key: 'teacher_name',
          minWidth: 120
        },
        {
          title: '报名课程',
          key: 'package_name',
          minWidth: 150,
          tooltip: true
        },
        {
          title: '冻结到',
          key: 'stop_time',
          minWidth: 150,
          render: (h, params) => {
            let text = ''
            if (params.row.stop_time) {
              text = params.row.stop_time
            } else {
              text = '/'
            }
            return h('div', [
              h('span',{
                props: {}
              }, text)
            ]);
          }
        },
        {
          title: '操作',
          key: 'action',
          minWidth: 100,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                  props: {
                    type: 'info',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.details(params.row)
                    }
                  }
              }, '学员详情')
            ]);
          }
        }
      ],
      id: [],
      is_teacher: '',
      list: [
        {
          id: 1,
          value: '正式学员'
        },
        {
          id: 3,
          value: '毕业学员'
        },
        {
          id: 4,
          value: '注册学员'
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
    // select (val) {
    //   this.form.page = 1
    //   this.form.teacher_id = val
    //   this.getData(this.form)
    // },
    seach() {
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
    details (row) {
      const route = {
        name: 'details',
        query: {
          id: row.id
        },
        meta: {
          title: `学员详情 - ${row.id}`
        }
      }
      this.addTag({
        route: route,
        type: 'push'
      })
      this.$router.push(route)
    },
    getData (obj) {
      teaSutList(obj).then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.total = rep.data.total
          this.is_teacher = rep.data.is_teacher
          this.data = rep.data.data
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
