<template>
  <div>
    <Card>
      <p slot="title">分类标签</p>
      <div>
        <Button type="default" shape="circle" icon="md-sync" @click="seachQ"></Button>
        <Divider type="vertical" />
        <Select v-model="form.status" clearable style="width:200px" placeholder="是否显示">
          <Option v-for="item in statusList" :value="item.id" :key="item.id">{{ item.value }}</Option>
        </Select>
        <Divider type="vertical" />
        <Input v-model="form.class_name" placeholder="标签名称" style="width: 200px; margin-right: 10px;" />
        <Button type='primary' @click="seach" style="margin-right: 10px;">搜索</Button>
        <Button v-if="Auth.top[0]" :type='Auth.top[0].menu_type' style="margin-right: 10px;" @click="addTag">{{Auth.top[0].menu_title}}</Button>
      </div>
      <Divider />
      <Table size="small" :columns="columns" :data="data"></Table>

      <!-- 添加 or 修改 -->
      <Modal v-model="modal" draggable :title="title" :width="640" :footer-hide="true">
        <div>
          <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
            <FormItem label="标签名称" prop="class_name">
              <Input v-model="formValidate.class_name" placeholder="标签名称"></Input>
              <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：关键而有意义的词语</p>
            </FormItem>
            <FormItem label="是否显示" prop="status">
              <Select v-model="formValidate.status">
                <Option v-for="item in statusList" :value="item.id" :key="item.id">{{ item.value }}</Option>
              </Select>
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
import { userPageRuleList } from '@/api/Answer'
import { labelList, addLabel, putLabel, deleteLabel } from '@/api/tags'
export default {
  data () {
    return {
      data: [],
      Auth: {
        right: [],
        top: []
      },
      statusList: [
        {
          id: '1',
          value: '显示'
        },
        {
          id: '2',
          value: '不显示'
        }
      ],
      columns: [
        {
          title: 'ID',
          key: 'id',
          minWidth: 80
        },
        {
          title: '标签名称',
          key: 'class_name',
          minWidth: 200
        },
        {
          title: '是否显示',
          key: 'status',
          minWidth: 100,
          render: (h, params) => {
            let text = ''
            let color = ''
            if (params.row.status == '1') {
              text = '显示'
              color = '#019beb'
            } else {
              text = '不显示'
              color = 'red'
            }
            return h('div', [
              h('span', {
                style: {
                  color: color
                }
              }, text)
            ])
          }
        },
        {
          title: '操作人',
          key: 'truename',
          minWidth: 150
        },
        {
          title: '添加时间',
          key: 'create_time',
          minWidth: 150
        },
        {
          title: '操作',
          key: 'action',
          minWidth: 150,
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
            //   }, '修改'),
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
      modal: false,
      title: '',
      type: 1,
      formValidate: {
        id: '',
        class_name: '',
        status: ''
      },
      ruleValidate: {
        class_name: [
          { required: true, message: '请输入标签名称', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '请选择是否显示', trigger: 'change' }
        ]
      },
      form: {
        status: '',
        class_name: ''
      }

    }
  },
  components: {

  },
  watch: {

  },
  methods: {
    seachQ () {
      this.form.status = ''
      this.form.class_name = ''
      this.getData(this.form)
    },
    seach () {
      this.getData(this.form)
    },
    addTag () {
      this.type = 1
      this.title = '添加分类标签'
      this.handleReset('formValidate')
      this.modal = true
    },
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          if (this.type == 1) {
            addLabel(this.formValidate).then(res => {
              if (res.data.code === 200) {
                this.$Message.success('添加成功!')
                this.handleReset(name)
                this.modal = false
                this.getData(this.form)
              }
            })
          } else {
            putLabel(this.formValidate).then(res => {
              if (res.data.code === 200) {
                this.$Message.success('修改成功!')
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

    getAuth (name) {
      userPageRuleList({ menu_name: name }).then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.Auth = rep.data
        }
      })
    },
    publicFun (key, row) {
      if (key === 'ctags_put') {
        this.type = 2
        this.title = '修改检索标签'
        this.handleReset('formValidate')
        this.formValidate.id = row.id
        this.formValidate.class_name = row.class_name
        this.formValidate.status = typeof (row.status) === 'number' ? row.status.toString() : row.status
        this.modal = true
      } else {
        this.$Modal.confirm({
          title: '温馨提示',
          content: '是否确认删除此标签吗？',
          onOk: () => {
            deleteLabel(row.id).then(res => {
              if (res.data.code === 200) {
                this.$Message.success('删除成功!')
                this.getData(this.form)
              }
            })
          }
        })
      }
    },
    getData (obj) {
      labelList(obj).then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.data = rep.data
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

<style lang="less">

</style>
