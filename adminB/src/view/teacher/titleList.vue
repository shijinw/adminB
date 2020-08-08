<template>
  <div>
    <Card>
      <p slot="title">讲师头衔列表</p>
      <div style="text-align: right;padding-bottom: 15px;">
        <Button type='primary' size="small" @click="addTitle">添加头衔</Button>
      </div>
      <Table size="small" :columns="columns" :data="data"></Table>

      <!-- 添加头衔 -->
      <Modal v-model="modal" draggable :title="title" :width="640" :footer-hide="true">
        <div>
          <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
            <FormItem label="讲师头衔" prop="title">
              <Input v-model="formValidate.title" placeholder="讲师头衔"></Input>
              <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：用于添加讲师的时候选择</p>
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
import { teacherTitleList, addTeacherTitle, putTeacherTitle, deleteTeacherTitle } from '@/api/teacher'
import Fomat from '@/libs/fomat'
export default {
  data () {
    return {
      data: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      columns: [
        {
          title: 'ID',
          key: 'id',
          minWidth: 80
        },
        {
          title: '讲师头衔名称',
          key: 'title',
          minWidth: 250
        },
        {
          title: '创建时间',
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
        title: ''
      },
      ruleValidate: {
        title: [
          { required: true, validator: Fomat.Rules.Verifiy().Required }
        ]
      }
    }
  },
  components: {

  },
  watch: {

  },
  methods: {
    addTitle () {
      this.title = '添加头衔'
      this.type = 1
      this.handleReset('formValidate')
      this.modal = true
    },
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          if (this.type == 1) {
            addTeacherTitle(this.formValidate).then(res => {
              if (res.data.code === 200) {
                this.$Message.success('添加成功!')
                this.handleReset(name)
                this.modal = false
                this.getData()
              }
            })
          } else {
            putTeacherTitle(this.formValidate).then(res => {
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
        content: '是否确认删除此头衔吗？',
        onOk: () => {
          deleteTeacherTitle(row.id).then(res => {
            if (res.data.code === 200) {
              this.$Message.success('删除成功!')
              this.getData()
            }
          })
        }
      })
    },
    put (row) {
      this.title = '修改头衔'
      this.type = 2
      this.formValidate.id = row.id
      this.formValidate.title = row.title
      this.modal = true
    },
    getData () {
      teacherTitleList().then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.data = rep.data
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
