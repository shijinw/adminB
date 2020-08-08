<template>
  <div>
    <Card>
      <p slot="title">课程检索标签</p>
      <div style="text-align: right;padding-bottom: 15px;">
        <Button type='primary' size="small" @click="addTag">添加检索标签</Button>
      </div>
      <Table size="small" :columns="columns" :data="data"></Table>

      <!-- 添加 or 修改 -->
      <Modal v-model="modal" draggable :title="title" :width="640" :footer-hide="true">
        <div>
          <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
            <FormItem label="标签名称" prop="class_name">
              <Input v-model="formValidate.class_name" placeholder="标签名称"></Input>
              <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：关键而有意义的词语</p>
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
import { labelList, addLabel, putLabel, deleteLabel } from '@/api/tags'
export default {
  data () {
    return {
      data: [],
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
      modal: false,
      title: '',
      type: 1,
      formValidate: {
        id: '',
        class_name: ''
      },
      ruleValidate: {
        class_name: [
          { required: true, message: '请输入标签名称', trigger: 'blur' }
        ]
      }
    }
  },
  components: {

  },
  watch: {

  },
  methods: {
    addTag () {
      this.type = 1
      this.title = '添加检索标签'
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
                this.getData()
              }
            })
          } else {
            putLabel(this.formValidate).then(res => {
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
    remove (row) {
      this.$Modal.confirm({
        title: '温馨提示',
        content: '是否确认删除此标签吗？',
        onOk: () => {
          deleteLabel(row.id).then(res => {
            if (res.data.code === 200) {
              this.$Message.success('删除成功!')
              this.getData()
            }
          })
        }
      })
    },
    put (row) {
      this.type = 2
      this.title = '修改检索标签'
      this.handleReset('formValidate')
      this.formValidate.id = row.id
      this.formValidate.class_name = row.class_name
      this.modal = true
    },
    getData () {
      labelList().then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.data = rep.data.data
        }
      })
    }
  },
  mounted () {
    this.getData()
  }
}
</script>

<style lang="less">

</style>
