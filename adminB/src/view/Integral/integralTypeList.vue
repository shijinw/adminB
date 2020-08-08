<template>
  <div>
    <Card>
        <p slot="title">积分规则列表</p>
        <div>
              <Button type='primary' @click="addlist" style="margin: 10px;">添加积分规则</Button>
              <Divider type="vertical" />
          <Table stripe size="small" :columns="columns" :data="data" ></Table>
        </div>
    </Card>
      <Modal v-model="modal0" draggable :title="title" :width="640" :footer-hide="true">
        <div>
          <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
           <FormItem label="规则名称" prop="name">
              <Input v-model="formValidate.name" placeholder="规则名称"></Input>
              <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：输入积分规则名称</p>
            </FormItem>
            <FormItem label="规则积分" prop="score">
              <Input v-model="formValidate.score" placeholder="规则积分"></Input>
              <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：输入积分规则名称</p>
            </FormItem>
              <FormItem label="规则次数" prop="count">
              <Input v-model="formValidate.count" placeholder="规则次数"></Input>
              <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：输入积分次数</p>
            </FormItem>
            <FormItem label="规则状态" prop="status">
              <Select v-model="formValidate.status" clearable placeholder="规则状态">
                <Option v-for="item in tagsList" :value="item.id" :key="item.id">{{ item.name }}</Option>
              </Select>
              <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：选择规则状态</p>
            </FormItem>
            <FormItem label="任务类型" prop="is_type">
              <Select v-model="formValidate.is_type" clearable placeholder="任务类型">
                <Option v-for="item in tensList" :value="item.id" :key="item.id">{{ item.name }}</Option>
              </Select>
              <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：选择任务类型</p>
            </FormItem>
               <FormItem label="规则介绍" prop="introduce">
              <Input v-model="formValidate.introduce" placeholder="规则介绍"></Input>
              <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：输入规则介绍</p>
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
  </div>
</template>
<script>
import { integralTypeList, addIntegralType, putIntegralType } from '@/api/info'
import Fomat from '@/libs/fomat'

export default {
  data () {
    return {
      title: '',
      formValidate: {
        name: '',
        score: '',
        count: '',
        status: '',
        introduce: '',
        is_type: ''
      },
      ruleValidate: {
        name: [
          { required: true, validator: Fomat.Rules.Verifiy().Required }
        ],
        score: [
          { required: true, validator: Fomat.Rules.Verifiy().Bnum }
        ],
        count: [
          { required: true, validator: Fomat.Rules.Verifiy().Bnum }
        ],
        status: [
          { required: true, validator: Fomat.Rules.Verifiy().Required }
        ],
        introduce: [
          { required: true, validator: Fomat.Rules.Verifiy().Required }
        ],
        is_type: [
          { required: true, validator: Fomat.Rules.Verifiy().Required }
        ]
      },

      tagsList: [{ id: 1, name: '开启' }, { id: 2, name: '关闭' }],
      tensList: [{ id: 1, name: '日常任务' }, { id: 2, name: '新手任务' }],
      modal0: false,
      data: [],
      columns: [

        {
          title: 'ID',
          key: 'id',
          minWidth: 70,
          tooltip: true
        },
        {
          title: '规则名称',
          key: 'name',
          minWidth: 150,
          tooltip: true,
          align: 'center'
        },
        {
          title: '规则分数',
          key: 'score',
          minWidth: 100,
          tooltip: true,
          align: 'center'
        },
        {
          title: '规则次数',
          key: 'count',
          minWidth: 100,
          tooltip: true,
          align: 'center'
        },
        {
          title: '是否开启',
          key: 'status',
          minWidth: 90,
          tooltip: true,
          render: (h, params) => {
            let text = ''
            let color = ''
            if (params.row.status === 1) {
              text = '开启'
              color = '#019beb'
            } else {
              text = '关闭'
              color = 'red'
            }
            return h('div', [
              h(
                'span',
                {
                  style: {
                    color: color
                  }
                },
                text
              )
            ])
          }
        },
        {
          title: '任务类型',
          key: 'is_type',
          minWidth: 90,
          tooltip: true,
          render: (h, params) => {
            let text = ''
            let color = ''
            if (params.row.is_type === 1) {
              text = '日常任务'
              color = '#019beb'
            } else {
              text = '新手任务'
              color = 'red'
            }
            return h('div', [
              h(
                'span',
                {
                  style: {
                    color: color
                  }
                },
                text
              )
            ])
          }
        },
        {
          title: '创建时间',
          key: 'create_time',
          minWidth: 100,
          tooltip: true,
          align: 'center'
        },
        {
          title: '介绍',
          key: 'introduce',
          minWidth: 100,
          tooltip: true,
          align: 'center'
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
              }, '修改')

            ])
          }
        }
      ]
    }
  },
  methods: {
    addlist () {
      this.modal0 = true
      this.title = '添加积分规则'
    },
    put (row) {
      this.modal0 = true
      this.title = '修改积分规则'
      this.formValidate = row
    },

    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          if (this.title === '添加积分规则') {
            addIntegralType(this.formValidate).then(res => {
              if (res.data.code === 200) {
                this.$Message.success('添加成功!')
                this.handleReset(name)
                this.modal0 = false
                this.getData(this.formValidate)
              }
            })
          } else {
            putIntegralType(this.formValidate).then(res => {
              if (res.data.code === 200) {
                this.$Message.success('修改成功!')
                this.handleReset(name)
                this.handleReset(name)
                this.modal0 = false
                this.getData(this.formValidate)
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
    getData () {
      integralTypeList().then(res => {
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
