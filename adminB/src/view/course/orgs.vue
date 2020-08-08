<template>
  <div>
    <Card>
      <p slot="title">机构列表</p>
      <div>
        <Button type="default" shape="circle" icon="md-sync" @click="seach"></Button>
        <Divider type="vertical" />
        <Button v-if="Auth.top[0]" :type='Auth.top[0].menu_type' style="margin-right: 10px;" @click="addorg">{{Auth.top[0].menu_title}}</Button>
      </div>
      <Divider />
      <Table size="small" :columns="columns" :data="data"></Table>

      <!-- 添加 or 修改 -->
      <Modal v-model="modal" draggable :title="title" :width="640" :footer-hide="true">
        <div>
          <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
            <FormItem label="机构名称" prop="org_name">
              <Input v-model="formValidate.org_name" placeholder="标签名称"></Input>
              <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：机构名称</p>
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
import { orgList, addOrg, putOrg, deleteOrg } from '@/api/course'
export default {
  data () {
    return {
      data: [],
      Auth: {
        right: [],
        top: []
      },
      columns: [
        {
          title: '机构ID',
          key: 'id',
          minWidth: 80
        },
        {
          title: '机构名称',
          key: 'org_name',
          minWidth: 200
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
        org_name: ''
      },
      ruleValidate: {
        org_name: [
          { required: true, message: '请输入机构名称', trigger: 'blur' }
        ]
      }
    }
  },
  components: {

  },
  watch: {

  },
  methods: {
    seach () {
      this.getData()
    },
    addorg () {
      this.type = 1
      this.title = '添加机构'
      this.handleReset('formValidate')
      this.modal = true
    },
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          if (this.type == 1) {
            addOrg(this.formValidate).then(res => {
              if (res.data.code === 200) {
                this.$Message.success('添加成功!')
                this.handleReset(name)
                this.modal = false
                this.getData()
              }
            })
          } else {
            putOrg(this.formValidate).then(res => {
              if (res.data.code === 200) {
                this.$Message.success('修改成功!')
                this.handleReset(name)
                this.modal = false
                this.getData()
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

    publicFun (key, row) {
      if (key === 'orgs_put') {
        this.type = 2
        this.title = '修改机构'
        this.handleReset('formValidate')
        this.formValidate.id = row.id
        this.formValidate.org_name = row.org_name
        this.modal = true
      } else {
        this.$Modal.confirm({
          title: '温馨提示',
          content: '确认删除此机构吗？',
          onOk: () => {
            deleteOrg({ id: row.id }).then(res => {
              if (res.data.code === 200) {
                this.$Message.success('删除成功!')
                this.getData()
              }
            })
          }
        })
      }
    },
    getAuth (name) {
      userPageRuleList({ menu_name: name }).then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.Auth = rep.data
        }
      })
    },
    getData () {
      orgList().then(res => {
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
