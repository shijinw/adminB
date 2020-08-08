<template>
  <div>
    <Card>
      <p slot="title">项目名称</p>
      <div>
        <Button type="default" shape="circle" icon="md-sync" @click="seachQ"></Button>
        <Divider type="vertical" />
        <Select v-model="form.status" clearable style="width:200px" placeholder="是否有效">
          <Option v-for="item in statusList" :value="item.id" :key="item.id">{{ item.value }}</Option>
        </Select>
        <Divider type="vertical" />
        <Input v-model="form.project_name" placeholder="项目名称" style="width: 200px; margin-right: 10px;" />
        <Button type='primary' @click="seach" style="margin-right: 10px;">搜索</Button>
        <Button v-if="Auth.top[0]" :type='Auth.top[0].menu_type' style="margin-right: 10px;" @click="addp">{{Auth.top[0].menu_title}}</Button>
      </div>
      <Divider />
      <Table stripe size="small" :columns="columns" :data="data"></Table>
    </Card>

    <!-- 添加项目 -->
    <Modal v-model="modal" draggable scrollable title="添加项目" :footer-hide="true">
      <div>
        <Form ref="projectForm" :model="projectForm" :rules="ruleProject" :label-width="80">
          <FormItem label="项目名称" prop="project_name">
            <Input v-model="projectForm.project_name" placeholder="请输入项目名称"></Input>
          </FormItem>
          <FormItem label="项目简称" prop="brief">
            <Input v-model="projectForm.brief" placeholder="请输入项目简称"></Input>
          </FormItem>

          <FormItem label="是否有效" prop="status">
            <Select v-model="projectForm.status">
              <Option v-for="item in statusList" :value="item.id" :key="item.id">{{ item.value }}</Option>
            </Select>
          </FormItem>
          <FormItem label="所属网站" prop="belong">
            <Input v-model="projectForm.belong" placeholder="预留字段，可以不填"></Input>
          </FormItem>
          <FormItem>
            <div style="text-align: right;">
              <Button @click="handleReset('projectForm')" style="margin-right: 8px">重 置</Button>
              <Button type="primary" @click="handleSubmit('projectForm')">提 交</Button>
            </div>
          </FormItem>
        </Form>
      </div>
    </Modal>

    <!-- 修改项目 -->
    <Modal v-model="modal2" draggable scrollable title="修改项目" :footer-hide="true">
      <div>
        <Form ref="projectForm2" :model="projectForm2" :rules="ruleProject" :label-width="80">
          <FormItem label="项目名称" prop="project_name">
            <Input v-model="projectForm2.project_name" placeholder="请输入项目名称"></Input>
          </FormItem>
          <FormItem label="项目简称" prop="brief">
            <Input v-model="projectForm2.brief" placeholder="请输入项目简称"></Input>
          </FormItem>

          <FormItem label="是否有效" prop="status">
            <Select v-model="projectForm2.status">
              <Option v-for="item in statusList" :value="item.id" :key="item.id">{{ item.value }}</Option>
            </Select>
          </FormItem>
          <FormItem label="所属网站" prop="belong">
            <Input v-model="projectForm2.belong" placeholder="预留字段，可以不填"></Input>
          </FormItem>
          <FormItem>
            <div style="text-align: right;">
              <Button @click="handleReset2('projectForm2')" style="margin-right: 8px">重 置</Button>
              <Button type="primary" @click="handleSubmit2('projectForm2')">提 交</Button>
            </div>
          </FormItem>
        </Form>
      </div>
    </Modal>
  </div>
</template>

<script>
import { userPageRuleList } from '@/api/Answer'
import { projectList, projectMove, deleteProject, addProject, putProject } from '@/api/course'
import { mapMutations } from 'vuex'
import Fomat from '@/libs/fomat'
import { isNumber } from 'util'
export default {
  data () {
    return {
      data: [],
      Auth: {
        right: [],
        top: []
      },
      projectForm: {
        project_name: '',
        brief: '',
        belong: '',
        sort: '',
        status: ''
      },
      projectForm2: {
        id: '',
        project_name: '',
        brief: '',
        belong: '',
        sort: '',
        status: ''
      },
      ruleProject: {
        project_name: [
          { required: true, message: '请输入项目名称', trigger: 'blur' }
        ],
        brief: [
          { required: true, validator: Fomat.Rules.Verifiy().elegan }
        ],
        sort: [
          { required: true, message: '请输入项目排序', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '请选择是否有效', trigger: 'change' }
        ]
      },
      modal: false,
      modal2: false,
      statusList: [
        {
          id: '1',
          value: '有效'
        },
        {
          id: '2',
          value: '无效'
        }
      ],
      form: {
        project_name: '',
        status: ''
      },

      columns: [
        {
          title: '项目ID',
          key: 'id',
          minWidth: 80,
          align: 'center'
        },
        {
          title: '项目名称',
          key: 'project_name',
          minWidth: 120
        },
        {
          title: '项目简称',
          key: 'brief',
          minWidth: 120,
          tooltip: true,
          align: 'center'
        },
        {
          title: '所属网站',
          key: 'belong',
          minWidth: 120,
          tooltip: true,
          align: 'center'
        },
        {
          title: '状态',
          key: 'status',
          minWidth: 100,
          render: (h, params) => {
            let text = ''
            let color = ''
            if (params.row.status == '1') {
              text = '有效'
              color = '#019beb'
            } else {
              text = '无效'
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
          title: '专业数量',
          key: 'major_count',
          minWidth: 100
        },
        {
          title: '课程包数量',
          key: 'package_count',
          minWidth: 100
        },

        {
          title: '排序',
          key: 'sort',
          minWidth: 150,
          render: (h, params) => {
            return h('div', [
              h('span', {
                style: {
                  marginRight: '10px'
                }
              }, params.row.sort),
              h('Button', {
                props: {
                  type: 'dashed',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.up(params.row)
                  }
                }
              }, '上移'),
              h('Button', {
                props: {
                  type: 'dashed',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.down(params.row)
                  }
                }
              }, '下移')
            ])
          }
        },
        {
          title: '操作',
          key: 'action',
          minWidth: 210,
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
      ]
    }
  },
  components: {

  },
  watch: {

  },
  methods: {
    ...mapMutations([
      'addTag'
    ]),
    addp () {
      this.modal = true
    },
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          addProject(this.projectForm).then(res => {
            if (res.data.code === 200) {
              this.$Message.success('添加项目成功!')
              this.getData(this.form)
              this.handleReset(name)
              this.modal = false
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
    handleSubmit2 (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          putProject(this.projectForm2).then(res => {
            if (res.data.code === 200) {
              this.$Message.success('修改项目成功!')
              this.getData(this.form)
              this.handleReset2(name)
              this.modal2 = false
            }
          })
        } else {
          this.$Message.error('请输入后再提交!')
        }
      })
    },
    handleReset2 (name) {
      this.$refs[name].resetFields()
    },
    seach () {
      this.getData(this.form)
    },
    seachQ () {
      this.form.project_name = ''
      this.form.status = ''
      this.getData(this.form)
    },
    up (row) {
      projectMove({ id: row.id, move_status: 1 }).then(res => {
        if (res.data.code === 200) {
          this.$Message.success('上移成功!')
          this.getData(this.form)
        } else if (res.data.code === 405) {
          this.$Message.success('无法移动，已经第一了!')
        }
      })
    },
    publicFun (key, row) {
      if (key === 'project_put') {
        this.projectForm2.project_name = row.project_name
        this.projectForm2.brief = row.brief
        this.projectForm2.belong = row.belong
        this.projectForm2.sort = typeof (row.sort) === 'number' ? row.sort.toString() : row.sort
        this.projectForm2.id = row.id
        this.projectForm2.status = typeof (row.status) === 'number' ? row.status.toString() : row.status
        this.modal2 = true
      } else {
        this.$Modal.confirm({
          title: '温馨提示',
          content: '是否确认删除此项目？',
          onOk: () => {
            deleteProject({ id: row.id }).then(res => {
              if (res.data.code === 200) {
                this.$Message.success('删除成功!')
                this.getData(this.form)
              }
            })
          }
        })
      }
    },
    down (row) {
      projectMove({ id: row.id, move_status: 2 }).then(res => {
        if (res.data.code === 200) {
          this.$Message.success('下移成功!')
          this.getData(this.form)
        } else if (res.data.code === 405) {
          this.$Message.success('无法移动，已经最后了!')
        }
      })
    },

    getData (obj) {
      projectList(obj).then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.data = rep.data
        }
      })
    },
    getAuth (name) {
      userPageRuleList({ menu_name: name }).then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.Auth = rep.data
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
