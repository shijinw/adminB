<template>
  <div>
    <Card>
      <p slot="title">专业划分</p>
      <div>
        <Button type="default" shape="circle" icon="md-sync" @click="seachQ"></Button>
        <Divider type="vertical" />
        <Select v-model="form.project_id" clearable style="width:200px; margin-right: 10px;" placeholder="专业名称">
          <Option v-for="item in projectList" :value="item.id" :key="item.id">{{ item.project_name }}</Option>
        </Select>
        <Select v-model="form.status" clearable style="width:200px" placeholder="是否有效">
          <Option v-for="item in statusList" :value="item.id" :key="item.id">{{ item.value }}</Option>
        </Select>
        <Divider type="vertical" />
        <Input v-model="form.major_name" placeholder="项目名称" style="width: 200px; margin-right: 10px;" />
        <Button type='primary' @click="seach" style="margin-right: 10px;">搜索</Button>
        <Button v-if="Auth.top[0]" :type='Auth.top[0].menu_type' style="margin-right: 10px;" @click="addm">{{Auth.top[0].menu_title}}</Button>
      </div>
      <Divider />
      <Table stripe size="small" :columns="columns" :data="data"></Table>
    </Card>

    <!-- 添加专业 -->
    <Modal v-model="modal" draggable scrollable title="添加专业" :footer-hide="true">
      <div>
        <Form ref="majorForm" :model="majorForm" :rules="ruleMajor" :label-width="80">
          <FormItem label="选择项目" prop="project_id">
            <Select v-model="majorForm.project_id">
              <Option v-for="item in projectList" :value="item.id" :key="item.id">{{ item.project_name }}</Option>
            </Select>
          </FormItem>
          <FormItem label="专业名称" prop="major_name">
            <Input v-model="majorForm.major_name" placeholder="请输入专业名称"></Input>
          </FormItem>
          <FormItem label="专业简称" prop="brief">
            <Input v-model="majorForm.brief" placeholder="请输入专业简称"></Input>
          </FormItem>

          <FormItem label="是否有效" prop="status">
            <Select v-model="majorForm.status">
              <Option v-for="item in statusList" :value="item.id" :key="item.id">{{ item.value }}</Option>
            </Select>
          </FormItem>
          <FormItem>
            <div style="text-align: right;">
              <Button @click="handleReset('majorForm')" style="margin-right: 8px">重 置</Button>
              <Button type="primary" @click="handleSubmit('majorForm')">提 交</Button>
            </div>
          </FormItem>
        </Form>
      </div>
    </Modal>

    <!-- 修改专业 -->
    <Modal v-model="modal2" draggable scrollable title="修改专业" :footer-hide="true">
      <div>
        <Form ref="majorForm2" :model="majorForm2" :rules="ruleMajor" :label-width="80">
          <FormItem label="选择项目" prop="project_id">
            <Select v-model="majorForm2.project_id">
              <Option v-for="item in projectList" :value="item.id" :key="item.id">{{ item.project_name }}</Option>
            </Select>
          </FormItem>
          <FormItem label="专业名称" prop="major_name">
            <Input v-model="majorForm2.major_name" placeholder="请输入专业名称"></Input>
          </FormItem>
          <FormItem label="专业简称" prop="brief">
            <Input v-model="majorForm2.brief" placeholder="请输入专业简称"></Input>
          </FormItem>

          <FormItem label="是否有效" prop="status">
            <Select v-model="majorForm2.status">
              <Option v-for="item in statusList" :value="item.id" :key="item.id">{{ item.value }}</Option>
            </Select>
          </FormItem>
          <FormItem>
            <div style="text-align: right;">
              <Button @click="handleReset2('majorForm2')" style="margin-right: 8px">重 置</Button>
              <Button type="primary" @click="handleSubmit2('majorForm2')">提 交</Button>
            </div>
          </FormItem>
        </Form>
      </div>
    </Modal>
  </div>
</template>

<script>
import { userPageRuleList } from '@/api/Answer'
import { projectList, majorList, majorMove, addMajor, putMajor, deleteMajor } from '@/api/course'
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      data: [],
      Auth: {
        right: [],
        top: []
      },
      projectList: [],
      modal: false,
      modal2: false,
      majorForm: {
        project_id: '',
        major_name: '',
        brief: '',
        sort: '',
        status: ''
      },
      majorForm2: {
        id: '',
        project_id: '',
        major_name: '',
        brief: '',
        sort: '',
        status: ''
      },
      ruleMajor: {
        project_id: [
          { required: true, message: '请选择项目', trigger: 'change' }
        ],
        major_name: [
          { required: true, message: '请输入专业名称', trigger: 'blur' }
        ],
        brief: [
          { required: true, message: '请输入专业简称', trigger: 'blur' }
        ],
        sort: [
          { required: true, message: '请输入专业排序', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '请选择是否有效', trigger: 'change' }
        ]
      },
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
        major_name: '',
        status: '',
        project_id: ''
      },

      columns: [
        {
          title: '专业ID',
          key: 'id',
          minWidth: 80
        },
        {
          title: '专业名称',
          key: 'major_name',
          minWidth: 150
        },
        {
          title: '专业简称',
          key: 'brief',
          minWidth: 120
        },
        {
          title: '所属项目',
          key: 'project_name',
          minWidth: 150
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
          minWidth: 190,
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
    addm () {
      this.modal = true
    },
    seach () {
      this.getData(this.form)
    },
    seachQ () {
      this.form.major_name = ''
      this.form.status = ''
      this.form.project_id = ''
      this.getData(this.form)
    },
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          addMajor(this.majorForm).then(res => {
            if (res.data.code === 200) {
              this.$Message.success('添加专业成功!')
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
          putMajor(this.majorForm2).then(res => {
            if (res.data.code === 200) {
              this.$Message.success('修改专业成功!')
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
    up (row) {
      majorMove({ id: row.id, move_status: 1 }).then(res => {
        if (res.data.code === 200) {
          this.$Message.success('上移成功!')
          this.getData(this.form)
        } else if (res.data.code === 405) {
          this.$Message.success('无法移动，已经第一了!')
        }
      })
    },
    down (row) {
      majorMove({ id: row.id, move_status: 2 }).then(res => {
        if (res.data.code === 200) {
          this.$Message.success('下移成功!')
          this.getData(this.form)
        } else if (res.data.code === 405) {
          this.$Message.success('无法移动，已经最后了!')
        }
      })
    },
    publicFun (key, row) {
      if (key === 'profession_put') {
        this.majorForm2.id = row.id
        this.majorForm2.project_id = typeof (row.project_id) === 'number' ? row.project_id.toString() : row.project_id
        this.majorForm2.major_name = row.major_name
        this.majorForm2.brief = row.brief
        this.majorForm2.sort = typeof (row.sort) === 'number' ? row.sort.toString() : row.sort
        this.majorForm2.status = typeof (row.status) === 'number' ? row.status.toString() : row.status
        this.modal2 = true
      } else {
        this.$Modal.confirm({
          title: '温馨提示',
          content: '是否确认删除此专业？',
          onOk: () => {
            deleteMajor({ id: row.id }).then(res => {
              if (res.data.code === 200) {
                this.$Message.success('删除成功!')
                this.getData(this.form)
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
    getList (obj) {
      projectList(obj).then(res => {
        let rep = res.data
        if (rep.code === 200) {
          rep.data.forEach(item => {
            item.id = item.id.toString()
          })
          this.projectList = rep.data
        }
      })
    },
    getData (obj) {
      majorList(obj).then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.data = rep.data
        }
      })
    }
  },
  mounted () {
    this.getList({ project_name: '', status: '' })
    this.getData(this.form)
    this.getAuth(this.$route.name)
  }
}
</script>

<style lang="less">

</style>
