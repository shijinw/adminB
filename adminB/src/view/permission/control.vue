<template>
  <div>
    <Card style="width: 1000px;">
      <p slot="title">权限控制</p>
      <div style="text-align: right;padding-bottom: 20px;">
        <Button type='primary' size="small" @click="addMenu">添加菜单</Button>
      </div>
      <Tree :data="data"></Tree>
      <!-- 添加菜单 -->
      <Modal v-model="modal" draggable :title="title" :width="640" :footer-hide="true">
        <div>
          <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
            <FormItem label="菜单名字" prop="menu_title">
              <Input v-model="formValidate.menu_title" placeholder="菜单名字"></Input>
              <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：2 ~ 4字菜单名字</p>
            </FormItem>
            <FormItem label="路由Name" prop="menu_name">
              <Input v-model="formValidate.menu_name" placeholder="路由Name"></Input>
              <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：纯英文字母路由Name</p>
            </FormItem>
            <FormItem label="组件名称" prop="menu_component">
              <Input v-model="formValidate.menu_component" placeholder="组件名称"></Input>
              <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：页面组件，则在routersMap里面配置的名称，一级菜单为空</p>
            </FormItem>
            <Row>
              <Col :span="12">
                <FormItem label="父级ID" prop="parent_id">
                  <Input v-model="formValidate.parent_id" placeholder="父级ID"></Input>
                  <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：一级菜单为“0”，二级自动获取</p>
                </FormItem>
              </Col>
              <Col :span="12">
                <FormItem label="菜单类型" prop="menu_type">
                  <Input v-model="formValidate.menu_type" placeholder="菜单类型"></Input>
                  <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：类型为“3”</p>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col :span="12">
                <FormItem label="是否缓存" prop="menu_cache">
                  <Input v-model="formValidate.menu_cache" placeholder="是否缓存"></Input>
                  <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：“0”为缓存，“1”为不缓存</p>
                </FormItem>
              </Col>
              <Col :span="12">
                <FormItem label="是否隐藏" prop="menu_hide">
                  <Input v-model="formValidate.menu_hide" placeholder="是否隐藏"></Input>
                  <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：“0”为不隐藏，“1”为隐藏</p>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col :span="12">
                <FormItem label="菜单图标" prop="menu_icon">
                  <Input v-model="formValidate.menu_icon" placeholder="菜单图标"></Input>
                  <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：字符串，图标Class</p>
                </FormItem>
              </Col>
              <Col :span="12">
                <FormItem label="菜单排序" prop="sort">
                  <Input v-model="formValidate.sort" placeholder="菜单排序"></Input>
                  <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：数字，“0”为不排序</p>
                </FormItem>
              </Col>
            </Row>
            <FormItem label="菜单Href" prop="menu_href">
              <Input v-model="formValidate.menu_href" placeholder="菜单href"></Input>
              <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：网址，点击菜单会跳出系统，打开新连接，可为空</p>
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
      <!-- 添加功能 -->
      <Modal v-model="modal2" draggable :title="title2" :width="640" :footer-hide="true">
        <div>
          <Form ref="formValidate2" :model="formValidate2" :rules="ruleValidate2" :label-width="80">
            <FormItem label="按钮名字" prop="menu_title">
              <Input v-model="formValidate2.menu_title" placeholder="菜单名字"></Input>
              <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：2 ~ 4字按钮名字</p>
            </FormItem>
            <FormItem label="按钮key" prop="key">
              <Input v-model="formValidate2.key" placeholder="按钮key"></Input>
              <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：每个按钮对应一个唯一的key，用于区分按钮功能</p>
            </FormItem>
            <Row>
              <Col :span="12">
                <FormItem label="父级ID" prop="parent_id">
                  <Input v-model="formValidate2.parent_id" placeholder="父级ID"></Input>
                  <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：自动获取</p>
                </FormItem>
              </Col>
              <Col :span="12">
                <FormItem label="页面名字" prop="menu_name">
                  <Input v-model="formValidate2.menu_name" placeholder="页面名字"></Input>
                  <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：自动获取</p>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col :span="12">
                <FormItem label="按钮类型" prop="rule_type">
                  <Input v-model="formValidate2.rule_type" placeholder="按钮类型"></Input>
                  <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：“0”为顶部公共按钮，“1”为列表私有按钮</p>
                </FormItem>
              </Col>
              <Col :span="12">
                <FormItem label="颜色类型" prop="menu_type">
                  <Input v-model="formValidate2.menu_type" placeholder="颜色类型"></Input>
                  <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：primary、dashed、text、info、success、warning、error</p>
                </FormItem>
              </Col>
            </Row>
            <FormItem>
              <div style="text-align: right;">
                <Button @click="handleReset2('formValidate2')">重置</Button>
                <Button type="primary" @click="handleSubmit2('formValidate2')" style="margin-left: 8px">提 交</Button>
              </div>
            </FormItem>
          </Form>
        </div>
      </Modal>
    </Card>
  </div>
</template>

<script>
import { userRuleList, addMenuRule, putMenuRule, deleteMenuRule, addPageRule, putPageRule, deletePageRule } from '@/api/control'
export default {
  data () {
    return {
      data: [],
      buttonProps: {
        type: 'default',
        size: 'small'
      },
      modal: false,
      title: '',
      modal2: false,
      title2: '',
      type: 1,
      formValidate: {
        id: '',
        menu_title: '',
        menu_name: '',
        menu_component: '',
        parent_id: '',
        menu_type: '',
        menu_cache: '',
        menu_hide: '',
        menu_icon: '',
        sort: '',
        menu_href: ''
      },
      formValidate2: {
        id: '',
        menu_title: '',
        menu_name: '',
        parent_id: '',
        menu_type: '',
        rule_type: '',
        key: ''
      },
      ruleValidate: {
        menu_title: [
          { required: true, message: '请输入菜单名称', trigger: 'blur' }
        ],
        menu_name: [
          { required: true, message: '请输入路由Name', trigger: 'blur' }
        ],
        parent_id: [
          { required: true, message: '请输入父级ID', trigger: 'blur' }
        ],
        menu_type: [
          { required: true, message: '请输入菜单类型', trigger: 'blur' }
        ],
        menu_cache: [
          { required: true, message: '请输入是否缓存', trigger: 'blur' }
        ],
        menu_hide: [
          { required: true, message: '请输入是否隐藏', trigger: 'blur' }
        ],
        menu_icon: [
          { required: true, message: '请输入菜单图标', trigger: 'blur' }
        ],
        sort: [
          { required: true, message: '请输入菜单排序', trigger: 'blur' }
        ]
      },
      ruleValidate2: {
        menu_title: [
          { required: true, message: '请输入按钮名称', trigger: 'blur' }
        ],
        menu_name: [
          { required: true, message: '请输入页面名称', trigger: 'blur' }
        ],
        parent_id: [
          { required: true, message: '请输入父级ID', trigger: 'blur' }
        ],
        rule_type: [
          { required: true, message: '请输入按钮类型', trigger: 'blur' }
        ],
        key: [
          { required: true, message: '请输入按钮方法', trigger: 'blur' }
        ]
      }
    }
  },
  components: {

  },
  methods: {
    addMenu () {
      this.type = 1
      this.title = '添加一级菜单'
      this.handleReset('formValidate')
      this.modal = true
    },
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          if (this.type === 1) {
            addMenuRule(this.formValidate).then(res => {
              if (res.data.code === 200) {
                this.$Message.success('添加成功!')
                this.handleReset(name)
                this.modal = false
                this.getData()
              }
            })
          } else if (this.type === 2) {
            putMenuRule(this.formValidate).then(res => {
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
    handleSubmit2 (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          if (this.type === 3) {
            addPageRule(this.formValidate2).then(res => {
              if (res.data.code === 200) {
                this.$Message.success('添加成功!')
                this.handleReset2(name)
                this.modal2 = false
                this.getData()
              }
            })
          } else if (this.type === 4) {
            putPageRule(this.formValidate2).then(res => {
              if (res.data.code === 200) {
                this.$Message.success('修改成功!')
                this.handleReset2(name)
                this.modal2 = false
                this.getData()
              }
            })
          }
        } else {
          this.$Message.error('请认真填写后再提交!')
        }
      })
    },
    handleReset2 (name) {
      this.$refs[name].resetFields()
    },
    append (data) {
      this.type = 1
      this.title = '添加二级菜单'
      this.handleReset('formValidate')
      this.formValidate.parent_id = data.row.id.toString()
      this.modal = true
    },
    append2 (data) {
      this.type = 3
      this.title2 = '添加页面功能'
      this.handleReset2('formValidate2')
      this.formValidate2.parent_id = data.row.id.toString()
      this.formValidate2.menu_name = data.row.menu_name
      this.modal2 = true
    },
    remove (root, node, data) {
      this.$Modal.confirm({
        title: '温馨提示',
        content: '是否确认删除此菜单吗？',
        onOk: () => {
          deleteMenuRule(data.row.id).then(res => {
            if (res.data.code === 200) {
              this.$Message.success('删除成功!')
              this.getData()
            } else if (res.data.code === 405) {
              this.$Message.error('此菜单下还有二级菜单，不可删除')
            }
          })
        }
      })
    },
    remove3 (root, node, data) {
      this.$Modal.confirm({
        title: '温馨提示',
        content: '是否确认删除此功能吗？',
        onOk: () => {
          deletePageRule(data.row.id).then(res => {
            if (res.data.code === 200) {
              this.$Message.success('删除成功!')
              this.getData()
            }
          })
        }
      })
    },
    put (root, node, data) {
      this.type = 2
      this.formValidate.id = data.row.id
      this.formValidate.menu_title = data.row.menu_title
      this.formValidate.menu_name = data.row.menu_name
      this.formValidate.menu_icon = data.row.menu_icon
      this.formValidate.menu_cache = data.row.menu_cache.toString()
      this.formValidate.sort = data.row.sort.toString()
      this.formValidate.menu_type = data.row.menu_type.toString()
      this.formValidate.parent_id = data.row.parent_id
      this.formValidate.menu_hide = data.row.menu_hide.toString()
      this.formValidate.menu_href = data.row.menu_href
      this.formValidate.menu_component = data.row.menu_component
      this.title = '修改一级菜单'
      this.modal = true
    },
    put2 (root, node, data) {
      this.type = 2
      this.formValidate.id = data.row.id
      this.formValidate.menu_title = data.row.menu_title
      this.formValidate.menu_name = data.row.menu_name
      this.formValidate.menu_icon = data.row.menu_icon
      this.formValidate.menu_cache = data.row.menu_cache.toString()
      this.formValidate.sort = data.row.sort.toString()
      this.formValidate.menu_type = data.row.menu_type.toString()
      this.formValidate.parent_id = data.row.parent_id
      this.formValidate.menu_hide = data.row.menu_hide.toString()
      this.formValidate.menu_href = data.row.menu_href
      this.formValidate.menu_component = data.row.menu_component
      this.title = '修改二级菜单'
      this.modal = true
    },
    put3 (root, node, data) {
      this.type = 4
      this.formValidate2.id = data.row.id
      this.formValidate2.menu_title = data.row.menu_title
      this.formValidate2.menu_name = data.row.parent_menu_name
      this.formValidate2.menu_type = data.row.menu_type
      this.formValidate2.rule_type = data.row.rule_type.toString()
      this.formValidate2.parent_id = data.row.parent_id
      this.formValidate2.key = data.row.key
      this.title2 = '修改页面功能'
      this.modal2 = true
    },
    getData () {
      userRuleList(1).then(res => {
        let rep = res.data
        if (rep.code === 200) {
          let treeData = rep.data
          if (treeData.length > 0) {
            this.data = []
            // 一级目录树渲染
            treeData.forEach(treeRes => {
              let tree = {}
              tree.title = treeRes.menu_title
              tree.row = treeRes
              tree.expand = false
              tree.render = (h, { root, node, data }) => {
                return h('span', {
                  style: {
                    display: 'inline-block',
                    width: '100%',
                    border: '1px soild #8888'
                  }
                }, [
                  h('span', [
                    h('Icon', {
                      props: {
                        type: 'ios-folder-open-outline'
                      },
                      style: {
                        marginRight: '15px',
                        border: '1px soild #8888'
                      }
                    }),
                    h('span', data.title)
                  ]),
                  h('span', {
                    style: {
                      display: 'inline-block',
                      float: 'right',
                      marginRight: '32px',
                      border: '1px soild #8888'
                    }
                  }, [
                    h('Button', {
                      props: Object.assign({}, this.buttonProps, {
                        icon: 'ios-add'
                      }),
                      style: {
                        marginRight: '8px'
                      },
                      on: {
                        click: () => { this.append(data) }
                      }
                    }),
                    h('Button', {
                      props: Object.assign({}, this.buttonProps, {
                        icon: 'ios-brush-outline'
                      }),
                      style: {
                        marginRight: '8px'
                      },
                      on: {
                        click: () => { this.put(root, node, data) }
                      }
                    }),
                    h('Button', {
                      props: Object.assign({}, this.buttonProps, {
                        icon: 'ios-trash-outline'
                      }),
                      on: {
                        click: () => { this.remove(root, node, data) }
                      }
                    })
                  ])
                ])
              }
              if (treeRes.children.length > 0) {
                treeRes.children.forEach(c2 => {
                  let treeC2 = {}
                  treeC2.title = c2.menu_title
                  treeC2.row = c2
                  treeC2.expand = false
                  treeC2.render = (h, { root, node, data }) => {
                    return h('span', {
                      style: {
                        display: 'inline-block',
                        width: '100%',
                        border: '1px soild #8888'
                      }
                    }, [
                      h('span', [
                        h('Icon', {
                          props: {
                            type: 'ios-paper-outline'
                          },
                          style: {
                            marginRight: '8px',
                            border: '1px soild #8888'

                          }
                        }),
                        h('span', data.title)
                      ]),
                      h('span', {
                        style: {
                          display: 'inline-block',
                          float: 'right',
                          marginRight: '32px'
                        }
                      }, [
                        h('Button', {
                          props: Object.assign({}, this.buttonProps, {
                            icon: 'ios-add'
                          }),
                          style: {
                            marginRight: '8px'
                          },
                          on: {
                            click: () => { this.append2(data) }
                          }
                        }),
                        h('Button', {
                          props: Object.assign({}, this.buttonProps, {
                            icon: 'ios-brush-outline'
                          }),
                          style: {
                            marginRight: '8px'
                          },
                          on: {
                            click: () => { this.put2(root, node, data) }
                          }
                        }),
                        h('Button', {
                          props: Object.assign({}, this.buttonProps, {
                            icon: 'ios-trash-outline'
                          }),
                          on: {
                            click: () => { this.remove(root, node, data) }
                          }
                        })
                      ])
                    ])
                  }
                  tree.children = tree.children || []
                  tree.children.push(treeC2)
                  if (c2.children.length > 0) {
                    c2.children.forEach(c3 => {
                      let treeC3 = {}
                      treeC3.title = c3.menu_title
                      treeC3.row = c3
                      treeC3.expand = false
                      treeC3.render = (h, { root, node, data }) => {
                        return h('span', {
                          style: {
                            display: 'inline-block',
                            width: '100%'
                          }
                        }, [
                          h('span', [
                            h('Icon', {
                              props: {
                                type: 'ios-star-outline'
                              },
                              style: {
                                marginRight: '8px'
                              }
                            }),
                            h('span', data.title)
                          ]),
                          h('span', {
                            style: {
                              display: 'inline-block',
                              float: 'right',
                              marginRight: '32px'
                            }
                          }, [
                            h('Button', {
                              props: Object.assign({}, this.buttonProps, {
                                icon: 'ios-brush-outline'
                              }),
                              style: {
                                marginRight: '8px'
                              },
                              on: {
                                click: () => { this.put3(root, node, data) }
                              }
                            }),
                            h('Button', {
                              props: Object.assign({}, this.buttonProps, {
                                icon: 'ios-trash-outline'
                              }),
                              on: {
                                click: () => { this.remove3(root, node, data) }
                              }
                            })
                          ])
                        ])
                      }
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
              this.data.push(tree)
            })
          }
        }
      })
    }
  },
  mounted () {
    this.getData()
  }
}
</script>

<style>

</style>
