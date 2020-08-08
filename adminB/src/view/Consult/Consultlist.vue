<template>
  <div>
    <Card>
      <p slot="title">新闻分类列表</p>

        <Divider type="vertical" />
        <Button type='success' @click="addTags">添加一级分类</Button>
      <Table stripe size="small" :columns="columns" :data="orgList"  style="margin-top: 20px;"></Table>

    </Card>
    <!-- 添加-->
    <Modal v-model="modal" draggable  scrollable :title="title" :width="640" :footer-hide="true">
        <div style="margin-top:20px">
          <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
            <FormItem label="一级分类" prop="type_name">
              <Input v-model="formValidate.type_name" placeholder="分类名称"></Input>
              <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：一级分类名称</p>
            </FormItem>
             <FormItem label="排序" prop="sort">
              <Input v-model="formValidate.sort" placeholder="排序序号"></Input>
              <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：排序序号为数字</p>
            </FormItem>
              <FormItem label="是否展示" prop="status">
             <Select v-model="formValidate.status" clearable label-in-value style="width:100%;" placeholder="二级分类名称">
                <Option v-for="item in status" :value="item.id" :key="item.id">{{ item.name }}</Option>
            </Select>
              <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：选择是否展示</p>
            </FormItem>
            <FormItem>
              <div style="text-align: right;">
                <Button @click="handleReset('formValidate')">重置</Button>
                <Button type="primary" @click="handleSubmit1('formValidate')" style="margin-left: 8px">提 交</Button>
              </div>
            </FormItem>
          </Form>
        </div>
      </Modal>

    <Modal v-model="modals" draggable  scrollable title="添加二级分类" :width="640" :footer-hide="true">
        <div style="margin-top:20px">
          <Form ref="formCalidate" :model="formCalidate" :rules="ruleValidate2" :label-width="80">
            <FormItem label="二级分类" prop="type_name">
              <Input v-model="formCalidate.type_name" placeholder="分类名称"></Input>
              <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：二级分类名称</p>
            </FormItem>
             <FormItem label="排序" prop="sort">
              <Input v-model="formCalidate.sort" placeholder="排序序号"></Input>
              <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：排序序号为数字</p>
            </FormItem>
               <FormItem label="是否展示" prop="status">
             <Select v-model="formCalidate.status" clearable label-in-value  style="width:100%;" placeholder="二级分类名称">
                <Option v-for="item in status" :value="item.id" :key="item.id">{{ item.name }}</Option>
            </Select>
              <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：选择是否展示</p>
            </FormItem>
            <FormItem>
              <div style="text-align: right;">
                <Button @click="handleReset2('formCalidate')">重置</Button>
                <Button type="primary" @click="handleSubmit2('formCalidate')" style="margin-left: 8px">提 交</Button>
              </div>
            </FormItem>
          </Form>
        </div>
      </Modal>

     <Modal v-model="modal2" draggable  scrollable title="修改二级分类" :width="640" :footer-hide="true">
        <div>
          <Form ref="formTalidate" :model="formTalidate" :rules="ruleVal" :label-width="80">
           <FormItem label="二级列表" >
        <Select v-model="formTalidate.id" clearable label-in-value @on-change="Fchange" style="width:100px;" placeholder="二级分类名称">
          <Option v-for="item in orgList1" :value="item.id" :key="item.id">{{ item.type_name }}</Option>
        </Select>
              <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：选择二级分类名称</p>
            </FormItem>
            <FormItem label="分类名称" prop="type_name">
              <Input v-model="formTalidate.type_name" placeholder="分类名称"></Input>
              <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：输入二级分类名称</p>
            </FormItem>

            <FormItem label="排序" prop="sort">
              <Input v-model="formTalidate.sort" placeholder="排序数字"></Input>
              <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：排序序号为数字</p>
            </FormItem>
              <FormItem label="是否展示" prop="status">
             <Select v-model="formTalidate.status" clearable label-in-value  style="width:100%;" placeholder="二级分类名称">
                <Option v-for="item in status" :value="item.id" :key="item.id">{{ item.name }}</Option>
            </Select>
              <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：选择是否展示</p>
            </FormItem>
            <FormItem>
              <div style="text-align: right;">
                <Button @click="handleReset3('formTalidate')">重置</Button>
                <Button type="primary" @click="handleSubmit3('formTalidate')" style="margin-left: 8px">提 交</Button>
              </div>
            </FormItem>
          </Form>
        </div>
      </Modal>
  <Modal v-model="modal4" draggable  scrollable title="二级分类列表" :width="640" :footer-hide="true">
               <Table stripe size="small" :columns="columns1" :data="orgList1"  style="margin-top: 20px;"></Table>
      </Modal>
  </div>
</template>

<script>
import { NewsTypeList, addNewsType, putNewsType, addTowDocType, putTowDocType, NewsTypeLevel, NewsTowTypeList } from '@/api/Consult'
import Fomat from '@/libs/fomat'

export default {
  data () {
    return {
      modal: false,
      modal2: false,
      modals: false,
      modal4: false,
      title: '',
      title2: '',
      valueList: [],
      tagsList: [],
      orgList: [],
      orgList1: [],
      formValidate: {
        id: '',
        type_name: '',
        sort: '',
        status: ''
      },
      status: [
        {
          id: 1, name: '展示'
        },
        {
          id: 2, name: '不展示'
        }
      ],
      formCalidate: {
        parent_id: '',
        type_name: '',
        sort: '',
        status: ''
      },
      formTalidate: {
        id: '',
        parent_id: '',
        type_name: '',
        sort: '',
        status: ''
      },
      ruleValidate: {
        type_name: [
          { required: true, validator: Fomat.Rules.Verifiy().Required }
        ],

        sort: [
          { required: true, validator: Fomat.Rules.Verifiy().Num }
        ],
        status: [
          { required: true, validator: Fomat.Rules.Verifiy().Required }
        ]
      },
      ruleValidate2: {
        type_name: [
          { required: true, validator: Fomat.Rules.Verifiy().Required }
        ],

        sort: [
          { required: true, validator: Fomat.Rules.Verifiy().Num }
        ],
        status: [
          { required: true, validator: Fomat.Rules.Verifiy().Required }
        ]
      },
      ruleVal: {
        port: [
          { required: true, validator: Fomat.Rules.Verifiy().Num }
        ],
        type_name: [
          { required: true, validator: Fomat.Rules.Verifiy().Required }
        ],

        sort: [
          { required: true, validator: Fomat.Rules.Verifiy().Num }
        ],
        status: [
          { required: true, validator: Fomat.Rules.Verifiy().Required }
        ]
      },
      columns1: [
        {
          title: 'ID',
          key: 'id',
          minWidth: 80
        },

        {
          title: '分类名称',
          key: 'type_name',
          minWidth: 100,
          tooltip: true
        },
        {
          title: '是否展示',
          minWidth: 100,
          tooltip: true,
          render: (h, params) => {
            let texts = ''
            let color = ''
            if (params.row.status == 1) {
              texts = '展示'
              color = '#019beb'
            } else {
              texts = '不展示'
              color = 'red'
            }
            return h('div', {
              style: {
                color: color
              }
            }, texts)
          }
        },
        {
          title: '创建时间',
          key: 'create_time',
          minWidth: 100,
          tooltip: true
        }

      ],
      columns: [
        {
          title: 'ID',
          key: 'id',
          minWidth: 80
        },

        {
          title: '分类名称',
          key: 'type_name',
          minWidth: 100,
          tooltip: true
        },
        {
          title: '是否展示',
          minWidth: 100,
          tooltip: true,
          render: (h, params) => {
            let texts = ''
            let color = ''
            if (params.row.status == 1) {
              texts = '展示'
              color = '#019beb'
            } else {
              texts = '不展示'
              color = 'red'
            }
            return h('div', {
              style: {
                color: color
              }
            }, texts)
          }
        },
        {
          title: '创建时间',
          key: 'create_time',
          minWidth: 100,
          tooltip: true
        },
        {
          title: '一级分类操作',
          key: 'action',
          minWidth: 100,
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
              }, '修改一级分类')

            ])
          }
        },

        {
          title: '二级分类操作',
          key: 'action',
          minWidth: 220,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'success',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.change(params.row)
                  }
                }
              }, '添加二级分类'),
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
                    this.chpater(params.row)
                  }
                }
              }, '修改二级分类')
            ])
          }
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
                  type: 'success',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.lookcon(params.row)
                  }
                }
              }, '查看二级列表')

            ])
          }
        }
      ]
    }
  },
  watch: {

    'formTalidate.type_name' (newValue, oldValue) {
      this.formTalidate.type_name = newValue
    }
  },
  methods: {
    addTags () {
      this.tltle = '添加一级分类'
      this.formValidate.type_name = ''
      this.formValidate.sort = ''
      this.modal = true
    },
    put (row) {
      this.tltle = '修改一级分类'
      this.formValidate.type_name = row.type_name
      this.formValidate.status = row.status
      this.formValidate.sort = row.sort
      this.formValidate.id = row.id
      this.modal = true
    },
    change (row) {
      this.formCalidate.parent_id = row.id
      this.modals = true
    },
    Fchange (val, key) {
      this.formTalidate.type_name = val.label
    },
    handleReset (name) {
      this.$refs[name].resetFields()
    },
    handleReset2 (name) {
      this.$refs[name].resetFields()
    },
    handleReset3 (name) {
      this.$refs[name].resetFields()
    },
    handleSubmit3 (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          putTowDocType(this.formTalidate).then(res => {
            let rep = res.data
            if (rep.code === 200) {
              this.$Message.success('修改成功!注意查看')
              this.getData()
              this.modal2 = false
            } else if (rep.code === 405) {
              this.$Message.error('修改失败!注意填写格式')
            }
          })
        }
      })
    },
    handleSubmit2 (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          addTowDocType(this.formCalidate).then(res => {
            let rep = res.data
            if (rep.code === 200) {
              this.$Message.success('添加成功!注意查看')
              this.formCalidate.type_name = ''
              this.formCalidate.sort = ''
              this.getData()
              this.modals = false
            } else if (rep.code === 405) {
              this.$Message.error('添加失败!注意填写格式')
            }
          })
        }
      })
    },
    lookcon (row) {
      NewsTowTypeList({ parent_id: row.id }).then(res => {
        let rep = res.data
        if (rep.code === 200) {
          if (rep.data) {
            this.orgList1 = rep.data
            this.formTalidate.id = rep.data[0].id
            this.formTalidate.type_name = rep.data[0].type_name
            this.formTalidate.sort = rep.data[0].sort
          } else {
            this.$Message.success('查看失败，无数据')
          }
        }
      })
      this.modal4 = true
    },
    chpater (row) {
      NewsTowTypeList({ parent_id: row.id }).then(res => {
        let rep = res.data
        if (rep.code === 200) {
          if (rep.data) {
            this.orgList1 = rep.data
            this.formTalidate.id = rep.data[0].id
            this.formTalidate.type_name = rep.data[0].type_name
            this.formTalidate.sort = rep.data[0].sort
            this.formTalidate.status = rep.data[0].status
          } else {
            this.$Message.success('查看失败，无数据')
          }
        }
      })
      this.modal2 = true
    },
    handleSubmit1 (name) {
      if (this.tltle === '添加一级分类') {
        this.$refs[name].validate((valid) => {
          if (valid) {
            addNewsType(this.formValidate).then(res => {
              let rep = res.data
              if (rep.code === 200) {
                this.$Message.success('添加成功!注意查看')
                this.getData()
                this.modal = false
              } else if (rep.code === 405) {
                this.$Message.error('添加失败!注意填写格式')
              }
            })
          }
        })
      } else {
        this.$refs[name].validate((valid) => {
          if (valid) {
            putNewsType(this.formValidate).then(res => {
              let rep = res.data
              if (rep.code === 200) {
                this.$Message.success('修改成功!注意查看')
                this.getData()
                this.modal = false
              } else if (rep.code === 405) {
                this.$Message.error('修改失败!注意填写格式')
              }
            })
          }
        })
      }
    },
    getlist () {
      NewsTypeLevel().then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.tagsList = rep.data
        }
      })
    },

    getData () {
      NewsTypeList().then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.orgList = rep.data
        }
      })
    }
  },
  mounted () {
    this.getData()
    this.getlist()
  }
}
</script>

<style lang="less" socped>

.bg-white {
  background-color:#99999940;
}

</style>
