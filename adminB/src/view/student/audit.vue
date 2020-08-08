<template>
  <div>
    <Card>
      <p slot="title">审批学员 - 班主任管理员专属</p>
      <div>
        <Button type="default" shape="circle" icon="md-sync" @click="seach"></Button>
        <Divider type="vertical" />
        <Select v-model="form.examine_status" clearable style="width:200px; margin-right: 10px;">
          <Option v-for="item in typeList" :value="item.id" :key="item.id">{{ item.value }}</Option>
        </Select>
        <Input v-model="form.username" placeholder="手机号或者姓名" style="width: 200px; margin-right: 10px;" />
        <Button type='primary' @click="seach" style="margin-right: 10px;">搜索</Button>
        <Button type='primary' @click="allAudit" style="margin-right: 10px;">同意</Button>
      </div>
      <Divider />
      <Table ref="table" size="small" :columns="columns" :data="data" @on-selection-change="selectionStu" @on-select-cancel="selectionCancel"></Table>
      <div style="padding: 20px 0; text-align: right;">
        <Page :total="total" @on-change="onChange" @on-page-size-change="onPageSizeChange" :current="form.page" :page-size="form.limit" size="small" show-total show-elevator show-sizer />
      </div>
    </Card>

    <!-- 拒绝学员 -->
    <Modal v-model="modal" draggable scrollable title="拒绝学员" :footer-hide="true">
      <div>
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
          <FormItem label="拒绝理由" prop="reason">
            <Input v-model="formValidate.reason" type="textarea" :autosize="{minRows: 3, maxRows: 10}" placeholder="拒绝理由..."></Input>
            <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：请填写您拒绝该学员的理由</p>
          </FormItem>
          <FormItem>
            <div style="text-align: right;">
              <Button @click="handleReset('formValidate')" style="margin-right: 8px">重 置</Button>
              <Button type="primary" @click="handleSubmit('formValidate')">提 交</Button>
            </div>
          </FormItem>
        </Form>
      </div>
    </Modal>

    <!-- 查看信息 -->
      <Modal v-model="modal2" draggable title="查看信息" :width="800" :footer-hide="true">
        <div>
          <Form ref="formValidate2" :model="formValidate2" :label-width="80">
            <Row>
              <Col :span="8">
                <FormItem label="学员名称：">
                  <div>{{ formValidate2.username }}</div>
                </FormItem>
              </Col>
              <Col :span="8">
                <FormItem label="学员电话：">
                  <div>{{ formValidate2.mobile }}</div>
                </FormItem>
              </Col>
              <Col :span="8">
                <FormItem label="在校状态：">
                  <div v-if="formValidate2.school == 3">正常</div>
                  <div v-if="formValidate2.school == 1">毕业</div>
                  <div v-if="formValidate2.school == 2">休学</div>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col :span="8">
                <FormItem label="用户状态：">
                  <div v-if="formValidate2.status == 1">正式学员</div>
                  <div v-if="formValidate2.status == 3">毕业学员</div>
                  <div v-if="formValidate2.status == 4">注册学员</div>
                  <div v-if="formValidate2.status == 5">内购学员</div>
                  <div v-if="formValidate2.status == 6">优财员工</div>
                </FormItem>
              </Col>
              <Col :span="8">
                <FormItem label="学员类型：">
                  <div>{{ formValidate2.type == 1 ? '网络学员' : formValidate2.type == 2 ? '面授学员' : '暂无分配面授或网络'}}</div>
                </FormItem>
              </Col>
              <Col :span="8">
                <FormItem label="邮　　箱：">
                  <div>{{ formValidate2.email ? formValidate2.email : '暂无' }}</div>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col :span="8">
                <FormItem label="是否冻结：">
                  <div v-if="formValidate2.user_status == 1">冻结</div>
                  <div v-if="formValidate2.user_status == 0">正常</div>
                </FormItem>
              </Col>
              <Col :span="8">
                <FormItem label="来　　源：">
                  <div v-if="formValidate2.from == 1">PC注册</div>
                  <div v-if="formValidate2.from == 2">APP注册</div>
                </FormItem>
              </Col>
              <Col :span="8">
                <FormItem label="注册时间：">
                  <div>{{ formValidate2.created ? formValidate2.created : '暂无' }}</div>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col :span="8">
                <FormItem label="购课时间：">
                  <div>{{ formValidate2.entrance_time ? formValidate2.entrance_time : '暂无购课' }}</div>
                </FormItem>
              </Col>
              <Col :span="8">
                <FormItem label="毕业时间：">
                  <div>{{ formValidate2.finishtime ? formValidate2.finishtime : '没有毕业' }}</div>
                </FormItem>
              </Col>
              <Col :span="8">
                <FormItem label="班 主 任：">
                  <div>{{ formValidate2.teacher_name ? formValidate2.teacher_name : '暂无班主任' }}</div>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col :span="8">
                <FormItem label="销售人员：">
                  <div>{{ formValidate2.sales_name ? formValidate2.sales_name : '暂无销售' }}</div>
                </FormItem>
              </Col>
              <Col :span="8">
                <FormItem label="购课名称：">
                  <div><strong style="color: red;">{{ formValidate2.package_name ? formValidate2.package_name : '暂无购课' }}</strong></div>
                </FormItem>
              </Col>
              <Col :span="8">
                <FormItem label="最后登录：">
                  <div>{{ formValidate2.last_login ? formValidate2.last_login : '暂无时间' }}</div>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <FormItem label="学员转移：">
                <div><strong style="color: red;">{{ formValidate2.move_num }} </strong> 次转移（{{ formValidate2.move_name }}）</div>
              </FormItem>
            </Row>
            <Row>
              <FormItem label="课程详情：">
                <div><strong style="color: red;">{{ formValidate2.course_details ? formValidate2.course_details : '暂无详情' }}</strong></div>
              </FormItem>
            </Row>
            <Row>
              <FormItem label="拒绝理由：">
                <div>{{ formValidate2.reason ? formValidate2.reason : '没有拒绝' }}</div>
              </FormItem>
            </Row>
          </Form>
        </div>
      </Modal>
  </div>
</template>

<script>
import { examineList, passExamine, turnExamine, getStudentDetails } from '@/api/student'
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      data: [],
      total: 0,
      modal: false,
      modal2: false,
      formValidate2: {
        id: '',
        user_id: '',
        username: '',
        mobile: '',
        status: '',
        school: '',
        type: '',
        email: '',
        last_login: '',
        user_status: '',
        from: '',
        entrance_time: '',
        finishtime: '',
        created: '',
        teacher_name: '',
        move_num: '',
        move_name: '',
        package_name: '',
        course_details: '',
        reason: ''
      },
      formValidate: {
        id: '',
        reason: ''
      },
      ruleValidate: {
        reason: [
          { required: true, message: '请输入拒绝理由', trigger: 'blur' }
        ]
      },
      typeList: [
        {
          id: 1,
          value: '未审批'
        },
        {
          id: 2,
          value: '已审批'
        },
        {
          id: 3,
          value: '已拒绝'
        }
      ],
      form: {
        page: 1,
        limit: 10,
        username: '',
        examine_status: ''
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
          title: '开通课程',
          key: 'package_name',
          minWidth: 150,
          tooltip: true
        },
        {
          title: '接收时间',
          key: 'reception_time',
          minWidth: 150
        },
        {
          title: '班主任',
          key: 'truename',
          minWidth: 120
        },
        {
          title: '审批状态',
          key: 'examine_status',
          minWidth: 100,
          render: (h, params) => {
            let text = ''
            if (params.row.examine_status == 1) text = '未审批'
            else if (params.row.examine_status == 2) text = '已申批'
            else text = '已拒绝'
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
          minWidth: 120
        },
        {
          title: '操作',
          key: 'action',
          minWidth: 200,
          align: 'center',
          render: (h, params) => {
            let is_reception = false
            if (params.row.examine_status == 1) {
              is_reception = false
            } else {
              is_reception = true
            }
            return h('div', [
              h('Button', {
                props: {
                  type: 'info',
                  size: 'small'
                },
                style: {
                  marginRight: '10px'
                },
                on: {
                  click: () => {
                    this.look(params.row)
                  }
                }
              }, '查看'),
              h('Button', {
                props: {
                  type: 'info',
                  size: 'small',
                  disabled: is_reception
                },
                style: {
                  marginRight: '10px'
                },
                on: {
                  click: () => {
                    this.agree(params.row)
                  }
                }
              }, '同意'),
              h('Button', {
                props: {
                  type: 'info',
                  size: 'small',
                  disabled: is_reception
                },
                on: {
                  click: () => {
                    this.refuse(params.row)
                  }
                }
              }, '拒绝')
            ])
          }
        }
      ],
      id: []
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
    allAudit () {
      if (this.id.length === 0) {
        this.$Message.error('请选择审批成员!')
        return
      }
      let len = this.id.length
      this.$Modal.confirm({
        title: '温馨提示',
        content: `本次是否同意<strong style="color: red;">${len}</strong>位学员？`,
        onOk: () => {
          passExamine(this.id.join(',')).then(res => {
            if (res.data.code === 200) {
              this.$Message.success('审批成功，将为他们开通对应课程...')
              this.id = []
              this.getData(this.form)
            }
          })
        }
      })
    },
    refuse (row) {
      this.formValidate.id = row.id
      this.modal = true
    },
    look (row) {
      getStudentDetails(row.id).then(res => {
        if (res.data.code === 200) {
          this.formValidate2 = res.data.data
          this.modal2 = true
        }
      })
    },
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          turnExamine(this.formValidate).then(res => {
            if (res.data.code === 200) {
              this.$Message.success('拒绝成功，如有变动，请联系管理员!')
              this.handleReset(name)
              this.getData(this.form)
              this.modal = false
            }
          })
        } else {
          this.$Message.error('请认真填写信息!')
        }
      })
    },
    handleReset (name) {
      this.$refs[name].resetFields()
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
    agree (row) {
      this.$Modal.confirm({
        title: '温馨提示',
        content: '是否确认同意此学员？',
        onOk: () => {
          passExamine(row.id).then(res => {
            if (res.data.code === 200) {
              this.$Message.success('接收成功，审批成功，将为他开通对应课程...')
              this.id = []
              this.getData(this.form)
            }
          })
        }
      })
    },
    getData (obj) {
      examineList(obj).then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.total = rep.data.total
          let arr = rep.data.data
          arr.forEach(val => {
            if (val.examine_status == 2 || val.examine_status == 3) {
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
    }
  },
  mounted () {
    this.getData(this.form)
  }
}
</script>

<style lang="less">

</style>
