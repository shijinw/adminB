<template>
  <div>
    <Card>
      <p slot="title">角色列表</p>
      <div style="text-align: right;padding-bottom: 15px;">
        <Button type='primary' size="small" @click="addRole">添加角色</Button>
      </div>
      <Table size="small" :columns="columns" :data="data"></Table>

      <!-- 添加角色 -->
      <Modal v-model="modal" draggable :title="title" :width="640" :footer-hide="true">
        <div>
          <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
            <FormItem label="角色名称" prop="title">
              <Input v-model="formValidate.title" placeholder="角色名称"></Input>
              <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：请详细输入角色名称，如：市场部门资讯编辑</p>
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

      <!-- 赋予权限 -->
      <Modal v-model="modal2" mask title="修改/赋予角色权限" :width="640" ok-text="赋予权限" @on-ok="submitRule">
        <div>
          <p>角色ID：{{ form.id }}</p>
          <p style="padding-bottom: 10px;">角色名称：{{ form.title }}</p>
          <div>
            <el-tree
              ref="tree"
              :data="conData"
              show-checkbox
              node-key="id"
              :default-expand-all="false"
              :check-strictly="true"
              :default-checked-keys="form.arr"
              :props="defaultProps"
              accordion
              :check-on-click-node="true"
              :expand-on-click-node="false"
              :render-after-expand="false"
              @check="checkTree">
            </el-tree>
          </div>
        </div>
      </Modal>
    </Card>
  </div>
</template>

<script>
import { userRuleList, groupList, addGroup, putGroup, deleteGroup, addGroupRule } from '@/api/control'
export default {
  data () {
    return {
      data: [],
      conData: [],
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
          title: '角色名称',
          key: 'title',
          minWidth: 200
        },
        {
          title: '操作',
          key: 'action',
          minWidth: 200,
          align: 'center',
          render: (h, params) => {
            let is_disabled = ''
            let action = ''
            if (params.row.id == 1) {
              is_disabled = true
            } else if (params.row.id == 2) {
              is_disabled = true
              action = false
            } else {
              is_disabled = false
            }
            return h('div', [
              h('Button', {
                props: {
                  type: 'info',
                  size: 'small',
                  disabled: is_disabled
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.put(params.row)
                  }
                }
              }, '修改角色名'),
              h('Button', {
                props: {
                  type: 'warning',
                  size: 'small',
                  disabled: is_disabled && action
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.putRole(params.row)
                  }
                }
              }, '赋予/修改权限'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small',
                  disabled: is_disabled
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
      modal2: false,
      form: {
        id: '',
        title: '',
        arr: []
      },
      title: '',
      type: 1,
      formValidate: {
        id: '',
        title: ''
      },
      ruleValidate: {
        title: [
          { required: true, message: '请输入角色名称', trigger: 'blur' }
        ]
      },
      rules: [],
      page_rules: []
    }
  },
  components: {

  },
  methods: {
    submitRule () {
      if (this.form.arr.length === 0) {
        this.$Message.error('请先选择权限!')
        return
      }
      let obj = {}
      obj.id = this.form.id
      let arr = this.form.arr
      let rules = []
      let page_rules = []
      arr.forEach(val => {
        if (val / 1) {
          rules.push(val)
        } else {
          page_rules.push(val)
        }
      })
      obj.rules = rules.length != 0 ? rules.join(',') : []
      obj.page_rules = page_rules.length != 0 ? page_rules.join(',') : []
      addGroupRule(obj).then(res => {
        if (res.data.code === 200) {
          this.$Message.success('权限开通成功!')
          this.modal2 = false
          this.getData()
        }
      })
    },
    checkTree (node, data) {
      this.form.arr = data.checkedKeys
      let nodes = data.checkedNodes
    },
    addRole () {
      this.type = 1
      this.title = '添加角色名称'
      this.handleReset('formValidate')
      this.modal = true
    },
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          if (this.type === 1) {
            addGroup(this.formValidate).then(res => {
              if (res.data.code === 200) {
                this.$Message.success('添加成功!')
                this.handleReset(name)
                this.modal = false
                this.getData()
              }
            })
          } else if (this.type === 2) {
            putGroup(this.formValidate).then(res => {
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
        content: '是否确认删除此角色吗？',
        onOk: () => {
          deleteGroup(row.id).then(res => {
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
      this.formValidate.id = row.id
      this.formValidate.title = row.title
      this.title = '修改角色名称'
      this.modal = true
    },
    putRole (row) {
      this.form.id = row.id
      this.form.title = row.title
      if (row.page_rules != '' && row.rules != '') {
        let role = row.rules.split(',')
        let page_role = row.page_rules.split(',')
        this.form.arr = role.concat(page_role)
      } else if (row.page_rules == '' && row.rules != '') {
        this.form.arr = row.rules.split(',')
      } else if (row.page_rules != '' && row.rules == '') {
        this.form.arr = row.page_rules.split(',')
      } else if (row.page_rules == '' && row.rules == '') {
        this.form.arr = []
      }
      console.log(row)
      this.$refs.tree.setCheckedKeys([])
      this.modal2 = true
    },
    getData () {
      groupList().then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.data = rep.data
        }
      })
    },
    getList () {
      userRuleList(1).then(res => {
        let rep = res.data
        if (rep.code === 200) {
          let treeData = rep.data
          if (treeData.length > 0) {
            this.conData = []
            // 一级目录树渲染
            treeData.forEach(treeRes => {
              let tree = {}
              tree.label = treeRes.menu_title
              tree.id = treeRes.id
              if (treeRes.children.length > 0) {
                treeRes.children.forEach(c2 => {
                  let treeC2 = {}
                  treeC2.label = c2.menu_title
                  treeC2.id = c2.id
                  tree.children = tree.children || []
                  tree.children.push(treeC2)
                  if (c2.children.length > 0) {
                    c2.children.forEach(c3 => {
                      let treeC3 = {}
                      treeC3.label = c3.menu_title
                      treeC3.id = c3.b_id
                      treeC3.is_btn = true
                      treeC2.children = treeC2.children || []
                      treeC2.children.push(treeC3)
                    })
                  } else {
                    treeC2.children = []
                  }
                })
              } else {
                tree.children = []
              }
              this.conData.push(tree)
            })
          }
        }
      })
    }
  },
  mounted () {
    this.getData()
    this.getList()
  }
}
</script>

<style>

</style>
