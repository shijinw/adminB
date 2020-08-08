<template>
  <div>
    <Card>
      <p slot="title">文档列表</p>
      <div>

        <Button type='primary' @click="addTags" style="margin-right: 10px;">添加主菜单</Button>
        <Button type='primary' @click="lookdirection">查看说明书</Button>

      </div>
      <Divider />
      <Table stripe size="small" :columns="columns" :data="data"></Table>

      <!-- 添加主菜单-->
      <Modal v-model="modal" draggable title="添加模块" :width="640" :footer-hide="true">
        <div>
          <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
            <FormItem label="主菜单" prop="title">
              <Input v-model="formValidate.title" placeholder="主菜单模块名称"></Input>
              <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：主菜单模块名称</p>
            </FormItem>
              <FormItem label="来源位置" prop="title">
                <Select v-model="formValidate.type" clearable placeholder="选择文档来源">
                <Option v-for="item in formatFile" :value="item.id" :key="item.id">{{ item.name }}</Option>
              </Select>
              <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：主菜单来源位置</p>
            </FormItem>
            <FormItem>
              <div style="text-align: center;">
                <Button type="primary" @click="handleSubmit('formValidate')" style="margin-left: 8px">提 交</Button>
              </div>
            </FormItem>
          </Form>
        </div>
      </Modal>
 <!-- 添加二级菜单-->
      <Modal v-model="modal2" draggable title="添加二级菜单板块" :width="640" :footer-hide="true">
        <div>
          <Form ref="formCalidate" :model="formCalidate" :rules="ruleCalidate" :label-width="80">
            <FormItem label="二级菜单" prop="title">
              <Input v-model="formCalidate.title" placeholder="二级菜单名称"></Input>
              <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：二级菜单板块名称</p>
            </FormItem>
            <FormItem>
              <div style="text-align: center;">
                <Button type="primary" @click="handleSubmit2('formCalidate')" style="margin-left: 8px">提 交</Button>
              </div>
            </FormItem>
          </Form>
        </div>
      </Modal>
      <!-- 三级菜单-->
      <Modal v-model="modal3" mask title="二级菜单列表" :footer-hide="true" :width="1100" >
        <div>
          <Table stripe size="small" :columns="columns2" :data="data2" style="margin-top:30px"></Table>
        </div>
      </Modal>
        <!-- 三级菜单-->
      <Modal v-model="modal4" mask title="添加功能点说明" :width="940" :footer-hide="true">
        <div>
         <Form ref="formTalidate" :model="formTalidate" :rules="ruleTalidate" :label-width="80">
            <FormItem label="二级菜单" prop="title">
              <Input v-model="formTalidate.title" placeholder="二级菜单名称"></Input>
              <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：二级菜单板块名称</p>
            </FormItem>
               <FormItem label="详细内容" prop="content" >

            </FormItem>
              <div style="text-align: center;">
                <Button type="primary" @click="handleSubmit3('formTalidate')" style="margin-left: 8px">提 交</Button>
              </div>

          </Form>
        </div>
      </Modal>
          <!-- 三级菜单-->
      <Modal v-model="modal5" mask title="修改功能点说明" :width="940"  :footer-hide="true">
        <div>
           <Form ref="formPalidate" :model="formPalidate" :rules="ruleTalidate" :label-width="80">
            <FormItem label="二级菜单" prop="title">
              <Input v-model="formPalidate.title" placeholder="二级菜单名称"></Input>
              <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：二级菜单板块名称</p>
            </FormItem>
              <FormItem label="详细内容" prop="content">

            </FormItem>

              <div style="text-align: center;">
                <Button type="warning" @click="handleSubmit4('formPalidate')" style="margin-left: 8px">修 改</Button>
              </div>

          </Form>
        </div>
      </Modal>
    </Card>
  </div>
</template>

<script>
import { docTypeList, addType, addDocType, towTypeList } from '@/api/tags'
import Fomat from '@/libs/fomat'
import { mapMutations } from 'vuex'
export default {

  data () {
    return {
      data: [],
      data2: [],
      list: [],
      modal3: false,
      modal4: false,
      modal5: false,
      edior: false,
      total: 0,
      formatFile: [{
        id: 1,
        name: '移动端 '
      },
      {
        id: 2,
        name: 'pc端'
      },
      {
        id: 3,
        name: '后台'
      } ],
      columns: [
        {
          title: '主菜单ID',
          key: 'id',
          minWidth: 100,
          align: 'center'
        },
        {
          title: '名称',
          key: 'title',
          minWidth: 150,
          tooltip: true
        },
        {
          title: '来源',
          key: 'type',
          minWidth: 100,
          tooltip: true,
          render: (h, params) => {
            let texts = ''
            let color = ''
            if (params.row.type == 1) {
              texts = '移动端'
              color = '#019beb'
            } else if (params.row.type == 2) {
              texts = 'pc端'
              color = 'red'
            } else if (params.row.type == 3) {
              texts = '后台'
              color = 'bule'
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
          minWidth: 150,
          tooltip: true
        },
        {
          title: '二级菜单',
          minWidth: 230,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'

                },
                style: {
                  marginRight: '10px'
                },
                on: {
                  click: () => {
                    this.twoList(params.row)
                  }
                }
              }, '添加二级菜单')

            ])
          }
        },
        {
          title: '操作',
          minWidth: 230,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'success',
                  size: 'small'

                },
                style: {
                  marginRight: '10px'
                },
                on: {
                  click: () => {
                    this.treeList(params.row)
                  }
                }
              }, '查看二级菜单')

            ])
          }
        }
      ],
      columns2: [
        {
          title: '二级菜单ID',
          key: 'id',
          minWidth: 100,
          align: 'center'
        },
        {
          title: '名称',
          key: 'title',
          minWidth: 150,
          tooltip: true
        },
        {
          title: '父类id',
          key: 'parent_id',
          minWidth: 150,
          tooltip: true
        },
        {
          title: '创建时间',
          key: 'create_time',
          minWidth: 150,
          tooltip: true
        },
        {
          title: '操作',
          minWidth: 230,
          align: 'center',
          render: (h, params) => {
            if (params.row.is_exist === 0) {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'success',
                    size: 'small'

                  },
                  style: {
                    marginRight: '10px'
                  },
                  on: {
                    click: () => {
                      this.Addtype(params.row)
                    }
                  }
                }, '添加')])
            } else {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'warning',
                    size: 'small'

                  },
                  style: {
                    marginRight: '10px'
                  },
                  on: {
                    click: () => {
                      this.Puttype(params.row)
                    }
                  }
                }, '修改')

              ])
            }
          }
        }

      ],
      modal: false,
      modal2: false,
      formValidate: {
        title: '',
        type: ''
      },
      formCalidate: {
        title: '',
        document_id: ''
      },
      formTalidate: {
        title: '',
        document_id: '',
        parent_id: '',
        content: ''
      },
      formPalidate: {
        title: '',
        document_id: '',
        parent_id: '',
        content: ''
      },
      ruleValidate: {
        title: [
          { required: true, validator: Fomat.Rules.Verifiy().Required, trigger: 'blur' }
        ]
      },
      ruleTalidate: {
        title: [
          { required: true, validator: Fomat.Rules.Verifiy().Required }
        ],
        content: [
          { required: true, validator: Fomat.Rules.Verifiy().Required }
        ]
      },
      ruleCalidate: {
        title: [
          { required: true, validator: Fomat.Rules.Verifiy().Required, trigger: 'blur' }
        ]
      }

    }
  },

  watch: {

  },
  methods: {
    ...mapMutations(['addTag']),
    addTags () {
      this.modal = true
      this.handleReset('formValidate')
    },
    lookdirection () {
      window.open('http://dests.youcaiwx.cn/explans/index.html')
    },
    treeList (row) {
      this.formTalidate.document_id = row.id
      this.getTwoData(row.id)
      this.modal3 = true
    },
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          addType(this.formValidate).then(res => {
            let rep = res.data
            if (rep.code === 200) {
              this.$Message.success('添加成功，请注意查看!')
              this.modal = false
              this.getData()
            }
          })
        }
      })
    },
    Addtype (row) {
      const route = {
        name: 'AddEidor',
        meta: {
          title: `${row.id} -添加详情`
        },
        query: {
          id: row.id,
          parent_id: row.parent_id,
          status: '1'
        }
      }
      this.addTag({
        route: route,
        type: 'push'
      })
      this.$router.push(route)
      // this.formTalidate.parent_id = row.id
      // this.handleReset('formTalidate')
      // // this.$refs.editor.content = ''
      // this.modal4 = true
    },
    Puttype (row) {
      const route = {
        name: 'AddEidor',
        meta: {
          title: `${row.id} - 修改详情`
        },
        query: {
          id: row.id,
          parent_id: row.parent_id,
          status: '2'
        }
      }
      this.addTag({
        route: route,
        type: 'push'
      })
      this.$router.push(route)
      // this.modal5 = true
      // this.edior = true
      // getDoc({ parent_id: row.id }).then(res => {
      //   let rep = res.data
      //   if (rep.code === 200) {
      //     this.formPalidate.title = rep.data.title
      //     this.formPalidate.document_id = rep.data.document_id
      //     this.formPalidate.parent_id = rep.data.parent_id
      //     this.$refs.editor.editorText = rep.data.content
      //   }
      // })
    },
    handleSubmit2 (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          addDocType(this.formCalidate).then(res => {
            let rep = res.data
            if (rep.code === 200) {
              this.$Message.success('添加成功，请注意查看!')
              this.modal2 = false
              this.getData()
            }
          })
        }
      })
    },
    handleSubmit3 (name) {
      // this.formTalidate.content = this.$refs.editor.editorText
      // addDoc(this.formTalidate).then(res => {
      //   let rep = res.data
      //   if (rep.code === 200) {
      //     this.$Message.success('添加成功，请注意查看!')
      //     this.modal4 = false
      //     this.getTwoData(this.formTalidate.document_id)
      //   }
      // })
    },
    handleSubmit4 () {
      // console.log(this.$refs.editors)
      // this.formPalidate.content = this.$refs.editors.editorText
      // putDoc(this.formPalidate).then(res => {
      //   let rep = res.data
      //   if (rep.code === 200) {
      //     this.$Message.success('修改成功，请注意查看!')
      //     this.modal5 = false
      //     this.getTwoData(this.formPalidate.document_id)
      //   }
      // })
    },
    handleReset (name) {
      this.$refs[name].resetFields()
    },
    twoList (row) {
      this.formCalidate.document_id = row.id
      this.modal2 = true
    },
    getData () {
      docTypeList().then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.data = rep.data
        }
      })
    },
    getTwoData (id) {
      towTypeList({ parent_id: id }).then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.data2 = rep.data
        }
      })
    }
  },
  mounted () {
    this.getData(this.form)
  }
}
</script>

<style lang="less">
// .quill-editor {
// width: 100%;
// height: 120px;
// }
</style>
