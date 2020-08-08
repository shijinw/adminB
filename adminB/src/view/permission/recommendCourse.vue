<template>
  <div>
    <Card>
      <p slot="title">各页面《推荐课程》模块管理</p>
      <div style="text-align: right;padding-bottom: 15px;">
        <Button type='primary' @click="addCourse">添加推荐课程</Button>
      </div>
      <Table size="small" :columns="columns" :data="data"></Table>
      <div style="padding: 20px 0; text-align: right;">
        <Page :total="total" @on-change="onChange" @on-page-size-change="onPageSizeChange" :current="form.page" :page-size="form.limit" size="small" show-total show-elevator show-sizer />
      </div>

      <!-- 添加账号 -->
      <Modal v-model="modal" draggable :title="title" :width="640" :footer-hide="true">
        <div>
          <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
            <FormItem label="选择课程" prop="package_id">
              <Select v-model="package_id" placeholder="请选择课程">
                <Option v-for="(val, index) in packList" :key="index" :value="val.id">{{ val.name }}</Option>
              </Select>
              <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：选择您要推荐的课程</p>
            </FormItem>
              <FormItem label="名　　称" prop="title">
              <Input v-model="formValidate.title" placeholder="名称"></Input>
              <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：可以随便填写一个名称，检索或区分用</p>
            </FormItem>
            <FormItem label="描　　述" prop="desc">
              <Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 3,maxRows: 10}" placeholder="描述..."></Input>
              <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：可以填写描述或者备注</p>
            </FormItem>
            <FormItem label="推荐位置" prop="position_id">
              <Select v-model="position_id" placeholder="请选择推荐的位置">
                <Option v-for="(val, index) in posList" :key="index" :value="val.id">{{ val.position_name }}</Option>
              </Select>
              <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：选择此课程显示的位置</p>
            </FormItem>

            <FormItem>
              <div style="text-align: right;">
                <Button @click="handleReset('formValidate')">重置</Button>
                <Button type="primary" @click="handleSubmit('formValidate')" style="margin-left: 8px">提 交</Button>
              </div>
            </FormItem>
          </Form>
        </div>
      </Modal>
    </Card>
  </div>
</template>

<script>
import { courseRecommendList, addCourseRecommend, putCourseRecommend, delCourseRecommend, poscommendonList, coursePackageList } from '@/api/control'
export default {
  data () {
    return {
      title: '',
      modal: false,
      packList: [],
      posList: [],
      data: [],
      total: 0,
      form: {
        page: 1,
        limit: 10
      },
      columns: [
        {
          title: 'ID',
          key: 'id',
          minWidth: 80
        },
        {
          title: '名称',
          key: 'title',
          minWidth: 150
        },
        {
          title: '推荐课程套餐',
          key: 'package_name',
          minWidth: 200
        },

        {
          title: '推荐页面',
          key: 'position_name',
          minWidth: 200
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
                on: {
                  click: () => {
                    this.remove(params.row)
                  }
                }
              }, '删除')
            ])
          }
        }
      ],
      package_id: '',
      position_id: '',
      formValidate: {
        id: '',
        title: '',
        package_id: '',
        desc: '',
        position_id: ''
      },
      ruleValidate: {
        title: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        package_id: [
          { required: true, message: '请选择课程名', trigger: 'blur' }
        ],
        position_id: [
          { required: true, message: '请输入推荐位置', trigger: 'blur' }
        ],
        desc: [
          { required: true, message: '请输入描述文字', trigger: 'blur' }
        ]
      },
      type: 1
    }
  },
  components: {

  },
  watch: {
    package_id (newValue, oldValue) {
      if (!newValue) return
      if (typeof newValue === 'string') this.formValidate.package_id = newValue
      else this.formValidate.package_id = newValue.toString()
    },
    position_id (newValue, oldValue) {
      if (!newValue) return
      if (typeof newValue === 'string') this.formValidate.position_id = newValue
      else this.formValidate.position_id = newValue.toString()
    }
  },
  methods: {
    put (row) {
      this.type = 2
      this.title = '修改推荐课程'
      this.formValidate.id = row.id
      this.package_id = row.package_id
      this.position_id = row.position_id
      this.formValidate.title = row.title
      this.formValidate.desc = row.desc
      this.modal = true
    },
    remove (row) {
      this.$Modal.confirm({
        title: '温馨提示',
        content: '是否确认删除此推荐吗？',
        onOk: () => {
          delCourseRecommend(row.id).then(res => {
            if (res.data.code === 200) {
              this.$Message.success('删除成功!')
              this.getData(this.form)
            }
          })
        }
      })
    },
    addCourse () {
      this.type = 1
      this.title = '添加推荐课程'
      this.handleReset('formValidate')
      this.package_id = ''
      this.position_id = ''
      this.modal = true
    },
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          if (this.formValidate.package_id == '' || this.formValidate.position_id == '') {
            this.$Message.error('请选择课程或者位置!')
            return
          }
          if (this.type === 1) {
            addCourseRecommend(this.formValidate).then(res => {
              if (res.data.code === 200) {
                this.$Message.success('添加成功!')
                this.package_id = ''
                this.position_id = ''
                this.handleReset(name)
                this.modal = false
                this.getData(this.form)
              }
            })
          } else if (this.type === 2) {
            putCourseRecommend(this.formValidate).then(res => {
              if (res.data.code === 200) {
                this.$Message.success('修改成功!')
                this.package_id = ''
                this.position_id = ''
                this.handleReset(name)
                this.modal = false
                this.getData(this.form)
              }
            })
          }
        } else {
          this.$Message.error('请认真填写后再提交!')
        }
      })
    },
    handleReset (name) {
      this.$refs[name].resetFields()
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
    getData (obj) {
      courseRecommendList(obj).then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.total = rep.data.total
          this.data = rep.data.data
        }
      })
    },
    getposList () {
      poscommendonList().then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.posList = rep.data.data
        }
      })
    },
    getpackList () {
      coursePackageList().then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.packList = rep.data.data
        }
      })
    }
  },
  mounted () {
    this.getposList()
    this.getpackList()
    this.getData(this.form)
  }
}
</script>

<style lang="less">

</style>
