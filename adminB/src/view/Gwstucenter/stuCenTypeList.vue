<template>
  <div>
    <Card>
      <p slot="title">官网学员中心分类列表</p>
      <div>
        <Divider type="vertical" />
        <Button v-if="Auth.top[0]" :type='Auth.top[0].menu_type' style="margin-right: 10px;" @click="addTag">{{Auth.top[0].menu_title}}</Button>
      </div>
      <Divider />
      <Table size="small" :columns="columns" :data="data"></Table>

      <!-- 添加 or 修改 -->
      <Modal v-model="modal" draggable :title="title" :width="640" :footer-hide="true">
        <div>
          <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
            <FormItem label="分类名称" prop="type_name">
              <Input v-model="formValidate.type_name" placeholder="分类名称"></Input>
              <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：官网学员中心分类名称</p>
            </FormItem>
            <FormItem label="是否展示" prop="status">
              <Select v-model="formValidate.status">
                <Option v-for="item in statusList" :value="item.id" :key="item.id">{{ item.value }}</Option>
              </Select>
               <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：官网学员中心分类是否展示</p>
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
import { stuCenTypeList,addstuCenType,putstuCenType } from '@/api/Consult'
import { userPageRuleList } from '@/api/Answer'
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
          value: '展示'
        },
        {
          id: '2',
          value: '不展示'
        }
      ],
      columns: [
        {
          title: 'ID',
          key: 'id',
          minWidth: 80,
          align:'center'
        },
        {
          title: '分类名称',
          key: 'type_name',
          minWidth: 150,
          align:'center'
        },
        {
          title: '是否显示',
          key: 'status',
          minWidth: 100,
             align:'center',
          render: (h, params) => {
            let text = ''
            let color = ''
            if (params.row.status == '1') {
              text = '展示'
              color = '#019beb'
            } else {
              text = '不展示'
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
          title: '添加时间',
          key: 'create_time',
          minWidth: 150,
             align:'center'
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
        type_name: '',
        status: ''
      },
      ruleValidate: {
        type_name: [
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
            addstuCenType(this.formValidate).then(res => {
              if (res.data.code === 200) {
                this.$Message.success('添加成功!')
                this.handleReset(name)
                this.modal = false
                this.getData(this.form)
              }
            })
          } else {
            putstuCenType(this.formValidate).then(res => {
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
      if (key === 'B') {
        this.type = 2
        this.title = '修改检索标签'
        this.handleReset('formValidate')
        this.formValidate.id = row.id
        this.formValidate.type_name = row.type_name
        this.formValidate.status = typeof (row.status) === 'number' ? row.status.toString() : row.status
        this.modal = true
      }
    },
    getData () {
      stuCenTypeList().then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.data = rep.data
        }
      })
    }
  },
  mounted () {
    this.getData()
    this.getAuth(this.$route.name)
  }
}
</script>

<style lang="less">

</style>
