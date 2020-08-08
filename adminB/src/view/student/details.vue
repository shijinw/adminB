<template>
  <div>
    <Card style="width: 800px;">
      <p slot="title">学员详情（学员ID：{{ formValidate2.id }}）</p>
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
                <div>
                  <strong
                    style="color: red;"
                  >{{ formValidate2.package_name ? formValidate2.package_name : '暂无购课' }}</strong>
                </div>
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
              <div>
                <strong style="color: red;">{{ formValidate2.move_num }}</strong>
                次转移（{{ formValidate2.move_name }}）
              </div>
            </FormItem>
          </Row>
          <Row>
            <FormItem label="课程详情：">
              <div>
                <strong
                  style="color: red;"
                >{{ formValidate2.course_details ? formValidate2.course_details : '暂无详情' }}</strong>
              </div>
            </FormItem>
          </Row>
          <Row>
            <FormItem label="拒绝理由：">
              <div>{{ formValidate2.reason ? formValidate2.reason : '没有拒绝' }}</div>
            </FormItem>
          </Row>
        </Form>

        <div style="margin-top: 20px;">
          <Button type="primary" @click="publicFun('chongzhi')" style="margin-right: 10px;">重置密码</Button>
          <Button type="primary" @click="publicFun('jifen')" style="margin-right: 10px;">赠送积分</Button>
          <Button type="primary" @click="publicFun('kaitong')" style="margin-right: 10px;">再次开课申请</Button>
          <Button type="primary" @click="publicFun('biye')" style="margin-right: 10px;">是否毕业</Button>
          <Button
            type="primary"
            @click="publicFun('dongjie')"
            style="margin-right: 10px;"
          >{{ formValidate2.user_status == 0 ? '冻结' : '解冻'}}</Button>
          <Button type="primary" @click="publicFun('guanbi')" style="margin-right: 10px;">关闭课程</Button>
          <Button type="primary" @click="publicFun('jiechu')" style="margin-right: 10px;">解除绑定</Button>
        </div>
        <div style="margin-top: 10px;">
          <Button type="primary" @click="publicFun('neibu')" style="margin-right: 10px;">设为内部员工</Button>
          <Button
            type="primary"
            @click="publicFun('xunlianying')"
            style="margin-right: 10px;"
          >设为P1训练营</Button>
          <Button
            type="primary"
            @click="publicFun('xunlianying2')"
            style="margin-right: 10px;"
          >设为P2训练营</Button>
        </div>
      </div>

      <!-- 重置密码 -->
      <Modal v-model="modal2" draggable scrollable title="重置密码" :footer-hide="true">
        <div>
          <Form ref="pasForm" :model="pasForm" :rules="rulePas" :label-width="80">
            <FormItem label="新 密 码" prop="pass">
              <Input v-model="pasForm.pass" type="password" placeholder="请输入密码"></Input>
            </FormItem>
            <FormItem label="确认密码" prop="password">
              <Input v-model="pasForm.password" type="password" placeholder="请再次输入密码"></Input>
            </FormItem>
            <FormItem>
              <div style="text-align: right;">
                <Button @click="handleReset('pasForm')" style="margin-right: 8px">重 置</Button>
                <Button type="primary" @click="handleSubmit('pasForm')">提 交</Button>
              </div>
            </FormItem>
          </Form>
        </div>
      </Modal>
      <!-- 赠送积分 -->
      <Modal v-model="modal3" draggable scrollable title="赠送积分" :footer-hide="true">
        <div>
          <Form ref="jifenForm" :model="jifenForm" :rules="ruleJifen" :label-width="80">
            <FormItem label="积 分 数" prop="integral">
              <Input v-model="jifenForm.integral" placeholder="请输入积分数"></Input>
            </FormItem>
            <FormItem>
              <div style="text-align: right;">
                <Button @click="handleReset3('jifenForm')" style="margin-right: 8px">重 置</Button>
                <Button type="primary" @click="handleSubmit3('jifenForm')">提 交</Button>
              </div>
            </FormItem>
          </Form>
        </div>
      </Modal>
      <!-- 冻结学员 -->
      <Modal v-model="modal4" draggable scrollable title="冻结学员" :footer-hide="true">
        <div>
          <Form ref="freezeForm" :model="freezeForm" :rules="ruleFreeze" :label-width="80">
            <FormItem label="冻结天数" prop="days">
              <Input v-model="freezeForm.days" placeholder="请输入天数"></Input>
            </FormItem>
            <FormItem>
              <div style="text-align: right;">
                <Button @click="handleReset4('freezeForm')" style="margin-right: 8px">重 置</Button>
                <Button type="primary" @click="handleSubmit4('freezeForm')">提 交</Button>
              </div>
            </FormItem>
          </Form>
        </div>
      </Modal>
      <!-- 开通课程 -->
      <Modal v-model="modal5" mask scrollable title="开通课程" :footer-hide="true" :width="1100" >
        <div>
          <div>
            <Button type="primary" @click="openCourse" style="margin-right: 10px;">开通课程</Button>
          </div>
          <Divider/>
          <Table
            size="small"
            ref="selection"
            :columns="columns5"
            :data="data5"
            @on-selection-change="selectionCourse"
          ></Table>
        </div>
      </Modal>
      <!-- 关闭课程 -->
      <Modal v-model="modal6" mask scrollable title="关闭课程" :footer-hide="true" :width="1100" >
        <div>
          <div>
            <Button type="primary" @click="closeCourse" style="margin-right: 10px;">关闭课程</Button>
          </div>
          <Divider/>
          <Table
            size="small"
            ref="selection6"
            :columns="columns6"
            :data="data6"
            @on-selection-change="selectionCourse6"
          ></Table>
        </div>
      </Modal>
    </Card>
  </div>
</template>

<script>
import {
  getStudentDetails,
  changePassword,
  giveIntegral,
  openCourse,
  closeCourse,
  openCourseList,
  deleteDev,
  closeCourseList,
  studenFinish,
  setEmployee,
  studenFreeze,
  studenUnfreeze,
  teacherOpenCourse,
  addPointsUser
} from '@/api/student'
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
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
      modal2: false,
      modal3: false,
      modal4: false,
      modal5: false,
      modal6: false,
      data5: [],
      data6: [],
      pasForm: {
        id: '',
        pass: '',
        password: ''
      },
      rulePas: {
        pass: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        password: [
          { required: true, message: '请再次输入密码', trigger: 'blur' }
        ]
      },
      jifenForm: {
        id: '',
        integral: ''
      },
      ruleJifen: {
        integral: [{ required: true, message: '请输入积分数', trigger: 'blur' }]
      },
      columns5: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: 'ID',
          key: 'id',
          width: 80
        },
        {
          title: '课程名称',
          key: 'name',
          minWidth: 240
        },
        {
          title: '价格',
          key: 'price',
          minWidth: 100
        },
        {
          title: '状态',
          key: 'status',
          minWidth: 100,
          render: (h, params) => {
            let texts = ''
            if (params.row.status == 2) {
              texts = '下架'
            } else if (params.row.status == 1) {
              texts = '上架'
            }
            return h('div', [
              h(
                'span',
                {
                  props: {}
                },
                texts
              )
            ])
          }
        },
        {
          title: '销售量',
          key: 'sales_volume',
          minWidth: 100
        },
        {
          title: '浏览量',
          key: 'browse',
          minWidth: 100
        },
        {
          title: '是否有课',
          key: 'is_content',
          minWidth: 150,
          render: (h, params) => {
            let texts = ''
            if (params.row.is_content == 2) {
              texts = '套餐下无课程不可选择'
            } else if (params.row.is_content == 1) {
              texts = '套餐下有课程'
            }
            return h('div', [
              h(
                'span',
                {
                  props: {}
                },
                texts
              )
            ])
          }
        }
      ],
      columns6: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: 'ID',
          key: 'id',
          width: 80
        },
        {
          title: '课程ID',
          key: 'course_id',
          width: 100
        },
        {
          title: '课程名称',
          key: 'course_name',
          minWidth: 300
        }
      ],
      course_id: '',
      freezeForm: {
        id: '',
        days: ''
      },
      ruleFreeze: {
        days: [{ required: true, message: '请输入冻结天数', trigger: 'blur' }]
      }
    }
  },
  components: {},
  watch: {},
  methods: {
    ...mapMutations(['addTag']),
    openCourse () {
      if (this.course_id === '') {
        this.$Message.error('请选择您要开通的课程!')
        return
      }
      teacherOpenCourse({
        id: this.formValidate2.id,
        package_id: this.course_id
      }).then(res => {
        if (res.data.code === 200) {
          this.$Message.success('申请开课成功，请等待审核')
          this.modal5 = false
          this.getData()
        }
      })
    },
    closeCourse () {
      if (this.course_id === '') {
        this.$Message.error('请选择您要关闭的课程!')
        return
      }
      closeCourse({
        id: this.formValidate2.id,
        course_id: this.course_id
      }).then(res => {
        if (res.data.code === 200) {
          this.$Message.success('课程关闭成功!')
          this.modal6 = false
          this.getData()
        }
      })
    },
    selectionCourse (arr) {
      let arrId = arr.map(item => item.id)
      this.course_id = arrId.join(',')
    },
    selectionCourse6 (arr) {
      let arrId = arr.map(item => item.course_id)
      this.course_id = arrId.join(',')
    },
    getData () {
      getStudentDetails(this.$route.query.id).then(res => {
        if (res.data.code === 200) {
          this.formValidate2 = res.data.data
        }
      })
    },
    handleSubmit (name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          if (this.pasForm.pass != this.pasForm.password) {
            this.$Message.error('两次密码不一致，请重新输入!')
            this.pasForm.pass = ''
            this.pasForm.password = ''
            return
          }
          this.pasForm.id = this.formValidate2.id(this.pasForm).then(res => {
            if (res.data.code === 200) {
              this.$Message.success('重置密码成功!')
              this.handleReset(name)
              this.modal2 = false
            }
          })
        } else {
          this.$Message.error('请输入后再提交!')
        }
      })
    },
    handleReset (name) {
      this.$refs[name].resetFields()
    },
    handleSubmit3 (name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          if (this.jifenForm.integral * 1 < 0) {
            this.$Message.error('积分必须为正整数，请重新输入!')
            this.jifenForm.integral = ''
            return
          }
          this.jifenForm.id = this.formValidate2.id
          giveIntegral(this.jifenForm).then(res => {
            if (res.data.code === 200) {
              this.$Message.success('积分赠送成功!')
              this.handleReset3(name)
              this.modal3 = false
            }
          })
        } else {
          this.$Message.error('请输入后再提交!')
        }
      })
    },
    handleReset3 (name) {
      this.$refs[name].resetFields()
    },
    handleSubmit4 (name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.freezeForm.id = this.formValidate2.id
          studenFreeze(this.freezeForm).then(res => {
            if (res.data.code === 200) {
              this.$Message.success('冻结成功!')
              this.handleReset4(name)
              this.modal4 = false
              this.getData()
            }
          })
        } else {
          this.$Message.error('请输入后再提交!')
        }
      })
    },
    handleReset4 (name) {
      this.$refs[name].resetFields()
    },

    publicFun (name) {
      if (name == 'chongzhi') {
        this.modal2 = true
      } else if (name == 'biye') {
        this.$Modal.confirm({
          title: '温馨提示',
          content: '是否将该学员设为毕业学员？',
          onOk: () => {
            studenFinish(this.formValidate2.id).then(res => {
              if (res.data.code === 200) {
                this.$Message.success('设置成功!')
              }
            })
          }
        })
      } else if (name == 'kaitong') {
        openCourseList().then(res => {
          if (res.data.code === 200) {
            let arr = res.data.data.data
            arr.forEach(val => {
              if (val.is_content == 2) {
                val._disabled = true
              }
            })
            this.data5 = arr
            this.course_id = ''
            this.modal5 = true
          } else {
            this.$Message.error('课程列表拉取失败，请重试!')
          }
        })
      } else if (name == 'dongjie') {
        if (this.formValidate2.user_status == 0) {
          this.modal4 = true
        } else if (this.formValidate2.user_status == 1) {
          this.$Modal.confirm({
            title: '温馨提示',
            content: '是否为该学员解除冻结？',
            onOk: () => {
              studenUnfreeze(this.formValidate2.id).then(res => {
                if (res.data.code === 200) {
                  this.$Message.success('解冻成功!')
                  this.getData()
                }
              })
            }
          })
        }
      } else if (name == 'guanbi') {
        closeCourseList(this.formValidate2.id).then(res => {
          if (res.data.code === 200) {
            this.data6 = res.data.data.data
            this.course_id = ''
            this.modal6 = true
          } else {
            this.$Message.error('课程列表拉取失败，请重试!')
          }
        })
      } else if (name == 'jiechu') {
        this.$Modal.confirm({
          title: '温馨提示',
          content: '是否为该学员解除设备绑定？',
          onOk: () => {
            deleteDev(this.formValidate2.id).then(res => {
              if (res.data.code === 200) {
                this.$Message.success('解除成功!')
              }
            })
          }
        })
      } else if (name == 'neibu') {
        this.$Modal.confirm({
          title: '温馨提示',
          content: '是否将该学员设为内部员工？',
          onOk: () => {
            setEmployee(this.formValidate2.id).then(res => {
              if (res.data.code === 200) {
                this.$Message.success('设置成功!')
                this.getData()
              }
            })
          }
        })
      } else if (name == 'xunlianying') {
        this.$Modal.confirm({
          title: '温馨提示',
          content: '是否将该学员设为P1训练营？',
          onOk: () => {
            addPointsUser({ id: this.formValidate2.id, fraction: '1' }).then(
              res => {
                if (res.data.code === 200) {
                  this.$Message.success('设置成功!')
                  this.getData()
                }
              }
            )
          }
        })
      } else if (name == 'jifen') {
        this.modal3 = true
      } else if (name == 'xunlianying2') {
        this.$Modal.confirm({
          title: '温馨提示',
          content: '是否将该学员设为P2训练营？',
          onOk: () => {
            addPointsUser({ id: this.formValidate2.id, fraction: '2' }).then(
              res => {
                if (res.data.code === 200) {
                  this.$Message.success('设置成功!')
                  this.getData()
                }
              }
            )
          }
        })
      }
    }
  },
  mounted () {
    this.getData()
  }
}
</script>

<style lang="less">
</style>
