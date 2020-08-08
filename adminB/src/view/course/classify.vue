<template>
  <div>
    <Card>
      <p slot="title">分类标签</p>
      <div>
        <Button type="default" shape="circle" icon="md-sync" @click="seachQ"></Button>
        <Divider type="vertical" />
         <Cascader :data="list" v-model="valueList2" change-on-select style="width:300px; display: inline-block;" placeholder="项目/专业"></Cascader>
  <Divider type="vertical" />
        <Select v-model="form.status" clearable style="width:200px" placeholder="是否显示">
          <Option v-for="item in statusList" :value="item.id" :key="item.id">{{ item.value }}</Option>
        </Select>
        <Divider type="vertical" />
        <Input v-model="form.type_name" placeholder="分类名称" style="width: 200px; margin-right: 10px;" />
        <Button type='primary' @click="seach" style="margin-right: 10px;">搜索</Button>
        <Button type='primary' @click="addTag">添加分类标签</Button>
      </div>
      <Divider />
      <Table size="small" :columns="columns" :data="data"></Table>

      <!-- 添加 or 修改 -->
      <Modal v-model="modal" draggable :title="title" :width="640" :footer-hide="true">
        <div>
          <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
          <FormItem label="项目/专业" prop="project_id">
              <Cascader :data="list" v-model="valueList" change-on-select placeholder="项目/专业"></Cascader>
              <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;"
              >提示：选择项目/专业</p>
            </FormItem>
            <FormItem label="分类名称" prop="type_name">
              <Input v-model="formValidate.type_name" placeholder="分类"></Input>
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
import { knowTypeList, addKnowType, putKnowType, deleteKnowType } from '@/api/tags'
import { getProjectMajor } from '@/api/course'
import Fomat from '@/libs/fomat'
export default {
  data () {
    return {
      data: [],
      list: [],
      valueList: [],
      valueList2: [],
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
          minWidth: 50
        },

        // {
        //   title: '项目',
        //   key: 'project_name',
        //   minWidth: 110
        // },
        {
          title: '专业',
          key: 'major_name',
          minWidth: 110
        },
        {
          title: '知识点分类',
          key: 'type_name',
          minWidth: 110
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
        type_name: '',
        status: '',
        project_id: '',
        major_id: ''
      },
      ruleValidate: {
        type_name: [
          { required: true, validator: Fomat.Rules.Verifiy().Required, trigger: 'change' }
        ],
        status: [
          { required: true, validator: Fomat.Rules.Verifiy().Required, trigger: 'change' }
        ],
        project_id: [
          { required: true, validator: Fomat.Rules.Verifiy().Required, trigger: 'change' }
        ]
      },
      form: {
        status: '',
        type_name: '',
        project_id: '',
        major_id: ''
      }

    }
  },
  components: {

  },
  watch: {
    valueList (newValue, oldValue) {
      if (newValue.length === 0) {
        this.formValidate.project_id = ''
        this.formValidate.major_id = ''
      } else if (newValue.length === 1) {
        this.formValidate.project_id = newValue[0]
        this.formValidate.major_id = ''
      } else {
        this.formValidate.project_id = newValue[0]
        this.formValidate.major_id = newValue[1]
      }
    },
    valueList2 (newValue, oldValue) {
      if (newValue.length === 0) {
        this.form.project_id = ''
        this.form.major_id = ''
      } else if (newValue.length === 1) {
        this.form.project_id = newValue[0]
        this.form.major_id = ''
      } else {
        this.form.project_id = newValue[0]
        this.form.major_id = newValue[1]
      }
    }
  },
  methods: {
    seach () {
      this.getData(this.form)
    },
    seachQ () {
      this.form.status = ''
      this.form.type_name = ''
      this.form.project_id = ''
      this.form.major_id = ''

      this.valueList = []
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
            addKnowType(this.formValidate).then(res => {
              if (res.data.code === 200) {
                this.$Message.success('添加成功!')
                this.handleReset(name)
                this.modal = false
                this.getData()
              }
            })
          } else {
            putKnowType(this.formValidate).then(res => {
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
    remove (row) {
      this.$Modal.confirm({
        title: '温馨提示',
        content: '是否确认删除此标签吗？',
        onOk: () => {
          deleteKnowType({ id: row.id }).then(res => {
            if (res.data.code === 200) {
              this.$Message.success('删除成功!')
              this.getData(this.form)
            }
          })
        }
      })
    },
    getProMajListA () {
      getProjectMajor().then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.list = rep.data
        }
      })
    },
    put (row) {
      this.type = 2
      this.title = '修改检索标签'
      this.handleReset('formValidate')
      this.formValidate.id = row.id
      this.formValidate.type_name = row.type_name
      this.formValidate.status = typeof (row.status) === 'number' ? row.status.toString() : row.status
      this.formValidate.project_id = row.project_id
      this.formValidate.major_id = row.major_id
      this.valueList = [this.formValidate.project_id, this.formValidate.major_id]
      this.modal = true
    },
    getData (obj) {
      knowTypeList(obj).then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.data = rep.data
        }
      })
    }
  },

  mounted () {
    this.getData(this.form)
    this.getProMajListA()
  }
}
</script>

<style lang="less">

</style>
