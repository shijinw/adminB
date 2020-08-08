<template>
  <div>
    <Card>
      <p slot="title">知识点库</p>
      <div>
        <Button type="default" shape="circle" icon="md-sync" @click="seachA"></Button>
        <Divider type="vertical" />
        <Cascader :data="list" v-model="valueList" change-on-select style="width:330px; display: inline-block;" placeholder="项目/专业/课程"></Cascader>

        <Divider type="vertical" />
           <Cascader :data="Klist" v-model="KvalueList" change-on-select style="width:330px; display: inline-block;" placeholder="知识点章/知识点节"></Cascader>
                <Divider type="vertical" />
                 <Input v-model="form.know_name" placeholder="知识点名称" style="width:80px"></Input>
               <Divider type="vertical" />
        <Button type='primary' @click="seach" style="margin-right: 10px;">搜索</Button>
        <Button v-if="Auth.top[0]" :type='Auth.top[0].menu_type' style="margin-right: 10px;" @click="addTag">{{Auth.top[0].menu_title}}</Button>
      </div>
      <Divider />
      <Table stripe size="small" :columns="columns" :data="data"></Table>

      <div style="padding: 20px 0; text-align: right;">
        <Page :total="total" @on-change="onChange" @on-page-size-change="onPageSizeChange" :current="form.page" :page-size="form.limit" size="small" show-total show-elevator show-sizer />
      </div>

      <!-- 添加 or 修改 -->
      <Modal v-model="addmodal" draggable title="添加知识点" :width="640" :footer-hide="true">
        <div>
          <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
            <FormItem label="项目/专业/课程" prop="project_id" :label-width="120">
              <Cascader :data="list" v-model="valueList2" placeholder="项目/专业/课程"></Cascader>
              <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：选择项目&专业&课程</p>
            </FormItem>
           <FormItem label="章/节" prop="knob_id" :label-width="120">
              <Cascader :data="addlist" v-model="addvalueList2" placeholder="章/节"></Cascader>
              <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：选择章 / 节</p>
            </FormItem>
            <FormItem label="知识点名" prop="know_name"  :label-width="120">
              <Input v-model="formValidate.know_name" placeholder="知识点名称"></Input>
              <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：知识点名称</p>
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
  <!-- 添加 or 修改 -->
      <Modal v-model="putmodal" draggable title="修改知识点" :width="640" :footer-hide="true">
        <div>
          <Form ref="formPalidate" :model="formPalidate" :rules="rulePalidate" :label-width="80">
            <FormItem label="项目/专业/课程" prop="project_id" :label-width="120">
              <Cascader :data="list" v-model="putvalueList2" placeholder="项目/专业/课程" disabled></Cascader>
              <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：选择项目&专业&课程</p>
            </FormItem>
           <FormItem label="章/节" prop="knob_id" :label-width="120">
              <Cascader :data="AddList" v-model="PutvalueList2" placeholder="知识点章/知识点节"></Cascader>
              <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：选择知识点知识点章 / 知识点节   </p>
            </FormItem>
            <FormItem label="知识点名" prop="know_name"  :label-width="120">
              <Input v-model="formPalidate.know_name" placeholder="知识点名称"></Input>
              <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：知识点名称</p>
            </FormItem>
            <FormItem>
              <div style="text-align: right;">
                <Button @click="handleReset('formPalidate')">重置</Button>
                <Button type="primary" @click="handleSubmit2" style="margin-left: 8px">提 交</Button>
              </div>
            </FormItem>
          </Form>
        </div>
      </Modal>
    </Card>
  </div>
</template>

<script>
import { userPageRuleList } from '@/api/Answer'
import { knowList, addKnow, putKnow, deleteKnow, getKnow } from '@/api/course'
import { proMjorCou3tree, knob2Tree } from '@/api/Linkmenu'
import Fomat from '@/libs/fomat'
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      data: [],
      list: [],
      Auth: {
        right: [],
        top: []
      },
      tagsList: [],
      valueList: [],
      valueList2: [],
      addlist: [],
      KvalueList: [],
      addvalueList2: [],
      putvalueList2: [],
      PutvalueList2: [],
      Klist: [],
      total: 0,
      AddList: [],
      columns: [
        {
          title: '知识点ID',
          key: 'id',
          minWidth: 80,
          align: 'center'
        },
        {
          title: '知识点章名',
          key: 'know_section_name',
          minWidth: 150,
          tooltip: true
        },
        {
          title: '知识点节名',
          key: 'knob_name',
          minWidth: 150,
          tooltip: true
        },
        {
          title: '知识点名称',
          key: 'know_name',
          minWidth: 200,
          tooltip: true
        },
        {
          title: '添加时间',
          key: 'create_time',
          minWidth: 150
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
      ],
      addmodal: false,
      putmodal: false,
      title: '',
      type: 1,
      formValidate: {
        know_name: '',
        project_id: '',
        major_id: '',
        course_id: '',
        section_id: '',
        knob_id: ''
      },
      formPalidate: {
        id: '',
        know_name: '',
        project_id: '',
        major_id: '',
        course_id: '',
        section_id: '',
        knob_id: ''
      },
      ruleValidate: {
        know_name: [
          { required: true, message: '请输入知识点名', trigger: 'blur' }
        ],
        project_id: [
          { required: true, message: '请选择项目/专业/课程' }
        ],
        knob_id: [
          { required: true, message: '请选择知识点章/知识点节' }
        ]
      },
      rulePalidate: {
        know_name: [
          { required: true, message: '请输入知识点名', trigger: 'blur' }
        ],
        project_id: [
          { required: true, message: '请选择项目/专业/课程' }
        ],
        knob_id: [
          { required: true, message: '请选择知识点章/知识点节' }
        ]
      },
      form: {
        page: 1,
        limit: 10,
        know_name: '',
        project_id: '',
        major_id: '',
        course_id: '',
        section_id: '',
        knob_id: ''
      },
      formQ: {
        page: 1,
        limit: 10,
        project_id: '',
        major_id: '',
        course_id: '',
        knob_id: '',
        know_name: '',
        section_id: ''
      }
    }
  },
  components: {

  },
  watch: {
    valueList (newValue, oldValue) {
      if (newValue.length === 0) {
        this.form.project_id = ''
        this.form.major_id = ''
        this.form.course_id = ''
      } else if (newValue.length === 1) {
        this.form.project_id = newValue[0]
        this.form.major_id = ''
        this.form.course_id = ''
      } else if (newValue.length === 2) {
        this.form.project_id = newValue[0]
        this.form.major_id = newValue[1]
        this.form.course_id = ''
      } else if (newValue.length === 3) {
        this.form.project_id = newValue[0]
        this.form.major_id = newValue[1]
        this.form.course_id = newValue[2]
        this.getknow(newValue[2])
      }
    },
    addvalueList2 (newValue, oldValue) {
      if (newValue.length === 0) {
        this.formValidate.section_id = ''
        this.formValidate.knob_id = ''
      } else if (newValue.length === 1) {
        this.formValidate.section_id = newValue[0]
        this.formValidate.knob_id = ''
      } else {
        this.formValidate.section_id = newValue[0]
        this.formValidate.knob_id = newValue[1]
      }
    },
    valueList2 (newValue, oldValue) {
      this.addvalueList2 = []
      this.addlist = []
      if (newValue.length === 1) {
        this.formValidate.project_id = ''
        this.formValidate.major_id = ''
        this.formValidate.course_id = ''
      } else if (newValue.length === 2) {
        this.formValidate.project_id = newValue[0]
        this.formValidate.major_id = newValue[1]
        this.formValidate.course_id = ''
      } else if (newValue.length === 3) {
        this.formValidate.project_id = newValue[0]
        this.formValidate.major_id = newValue[1]
        this.formValidate.course_id = newValue[2]
        this.gettree(newValue[2])
      }
    },
    KvalueList (newValue, oldValue) {
      if (newValue.length === 0) {
        this.form.section_id = ''
        this.form.knob_id = ''
      } else if (newValue.length === 1) {
        this.form.section_id = newValue[0]
        this.form.knob_id = ''
      } else {
        this.form.section_id = newValue[0]
        this.form.knob_id = newValue[1]
      }
    },
    putvalueList2 (newValue, oldValue) {
      if (newValue.length === 1) {
        this.formPalidate.project_id = ''
        this.formPalidate.major_id = ''
        this.formPalidate.course_id = ''
      } else if (newValue.length === 2) {
        this.formPalidate.project_id = newValue[0]
        this.formPalidate.major_id = newValue[1]
        this.formPalidate.course_id = ''
      } else if (newValue.length === 3) {
        this.formPalidate.project_id = newValue[0]
        this.formPalidate.major_id = newValue[1]
        this.formPalidate.course_id = newValue[2]
        this.gettree(newValue[2])
      }
    },
    PutvalueList2 (newValue, oldValue) {
      if (newValue.length === 1) {
        this.formPalidate.section_id = ''
        this.formPalidate.knob_id = ''
      } else if (newValue.length === 2) {
        this.formPalidate.section_id = newValue[0]
        this.formPalidate.knob_id = newValue[1]
      } else if (newValue.length === 3) {
        this.formPalidate.section_id = newValue[0]
        this.formPalidate.knob_id = newValue[1]
      }
    }
  },
  methods: {
    ...mapMutations(['setcourse']),
    seachA () {
      this.form.know_name = ''
      this.form.project_id = ''
      this.form.major_id = ''
      this.form.course_id = ''
      this.form.section_id = ''
      this.form.knob_id = ''
      this.valueList = []
      this.KvalueList = []
      this.getData(this.formQ)
    },
    seach () {
      this.getData(this.form)
    },
    addTag () {
      this.handleReset('formValidate')
      this.addmodal = true
    },
    onChange (val) {
      this.form.page = val
      this.getData(this.form)
    },
    onPageSizeChange (val) {
      this.form.limit = val
      this.getData(this.form)
    },
    handleSubmit () {
      this.$refs.formValidate.validate((valid) => {
        if (valid) {
          addKnow(this.formValidate).then(res => {
            if (res.data.code === 200) {
              this.$Message.success('添加成功!')
              this.valueList2 = []
              this.addvalueList2 = []
              this.handleReset('formValidate')
              this.addmodal = false
              this.getData(this.form)
            }
          })
        } else {
          this.$Message.error('知识点节未获取,请认真填写后再提交!')
        }
      })
    },
    handleSubmit2 () {
      if (this.formPalidate.knob_id) {
        putKnow(this.formPalidate).then(res => {
          if (res.data.code === 200) {
            this.$Message.success('修改成功!')
            this.putvalueList2 = []
            this.PutvalueList2 = []
            this.handleReset('formPalidate')
            this.putmodal = false
            this.getData(this.form)
          }
        })
      } else {
        this.$Message.error('知识点节未获取,请认真填写后再提交!')
      }
    },
    handleReset (name) {
      this.$refs[name].resetFields()
      this.valueList2 = []
    },
    gettree (id) {
      knob2Tree({ course_id: id }).then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.addlist = rep.data
        }
      })
    },
    publicFun (key, row) {
      if (key === 'know_put') {
        this.handleReset('formPalidate')
        getKnow({ id: row.id }).then(res => {
          let rep = res.data
          if (rep.code === 200) {
            this.formPalidate.project_id = rep.data.project_id
            this.formPalidate.major_id = rep.data.major_id
            this.formPalidate.course_id = rep.data.course_id
            this.getsention(rep.data.course_id)
            this.formPalidate.section_id = rep.data.section_id
            this.formPalidate.knob_id = rep.data.knob_id
            this.formPalidate.id = rep.data.id
            this.PutvalueList2 = [rep.data.section_id, rep.data.knob_id]
            this.formPalidate.know_name = rep.data.know_name
            this.putvalueList2 = [rep.data.project_id, rep.data.major_id, rep.data.course_id]
          }
        })
        this.putmodal = true
      } else {
        this.$Modal.confirm({
          title: '温馨提示',
          content: '确认删除此知识点吗？',
          onOk: () => {
            deleteKnow({ id: row.id }).then(res => {
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
    getsention (id) {
      knob2Tree({ course_id: id }).then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.AddList = rep.data
        }
      })
    },
    put (row) {
      this.handleReset('formPalidate')
      getKnow({ id: row.id }).then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.formPalidate.project_id = rep.data.project_id
          this.formPalidate.major_id = rep.data.major_id
          this.formPalidate.course_id = rep.data.course_id
          this.getsention(rep.data.course_id)
          this.formPalidate.section_id = rep.data.section_id
          this.formPalidate.knob_id = rep.data.knob_id
          this.formPalidate.id = rep.data.id
          this.PutvalueList2 = [rep.data.section_id, rep.data.knob_id]
          this.formPalidate.know_name = rep.data.know_name
          this.putvalueList2 = [rep.data.project_id, rep.data.major_id, rep.data.course_id]
        }
      })
      this.putmodal = true
    },
    getknow (id) {
      knob2Tree({ course_id: id }).then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.Klist = rep.data
        }
      })
    },
    getData (obj) {
      knowList(obj).then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.data = rep.data.data
          this.total = rep.data.total * 1
        }
      })
    },

    getProMajList () {
      proMjorCou3tree().then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.list = rep.data
        }
      })
    }
  },
  mounted () {
    this.form = this.$store.state.keepalive.knowlibs
    this.valueList = [this.$store.state.keepalive.knowlibs.project_id, this.$store.state.keepalive.knowlibs.major_id, this.$store.state.keepalive.knowlibs.type_id]
    this.getProMajList()
    this.getData(this.form)
    this.getAuth(this.$route.name)
  }

}
</script>

<style lang="less">

</style>
