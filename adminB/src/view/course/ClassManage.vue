<template>
  <div>
    <Card>
      <p slot="title">知识点管理</p>
      <div>
        <Button type="default" shape="circle" icon="md-sync" @click="seachQ"></Button>
        <Divider type="vertical" />
        <Cascader :data="ListA" v-model="valueListSeach" change-on-select style="width:300px; display: inline-block;" placeholder="项目/专业"></Cascader>
        <Divider type="vertical" />
                <Input v-model="fromdata.course_id" placeholder="课程ID" style="width: 200px; margin-right: 10px;" />

        <Divider type="vertical" />
        <Input v-model="fromdata.course_name" placeholder="课程名称" style="width: 200px; margin-right: 10px;" />
        <Button type='primary' @click="seach" style="margin-right: 10px;">搜索</Button>

      </div>
        <Divider type="vertical" />

      <Table stripe size="small" :columns="columns" :data="orgList"  style="margin-top: 20px;"></Table>
 <div style="padding: 20px 0; text-align: right;">
        <Page :total="total1" @on-change="onChange" @on-page-size-change="onPageSizeChange" :current="fromdata.page" :page-size="fromdata.limit" size="small" show-total show-elevator show-sizer />
      </div>
    </Card>
     <!-- 添加  -->
    <Modal v-model="modal" draggable  scrollable :title="title" :width="640" :footer-hide="true">
        <div>
          <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
            <FormItem label="章节名称" prop="section_name" >
              <Input v-model="formValidate.section_name" placeholder="知识点章名"></Input>
              <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：添加知识点章名称</p>
            </FormItem>
            <FormItem>
              <div style="text-align: right;">
                <Button @click="handleReset('formValidate')">重置</Button>
                <Button type="primary" @click="handleSubmit1" style="margin-left: 8px">提 交</Button>
              </div>
            </FormItem>
          </Form>
        </div>
      </Modal>
        <!--  修改 -->
    <Modal v-model="modal2" draggable  scrollable :title="title" :width="640" :footer-hide="true">
        <div>
          <Form ref="formValidate" :model="formCalidate" :rules="ruleVal" :label-width="100">
           <FormItem label="章节" prop="section_id" :label-width="80">
              <Select v-model="formCalidate.section_id" clearable placeholder="章节名">
                <Option v-for="item in tagsList" :value="item.section_id" :key="item.section_id">{{ item.section_name }}</Option>
              </Select>
              <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：选择章节</p>
            </FormItem>
            <FormItem label="名称" prop="section_name" :label-width="80">
              <Input v-model="formCalidate.section_name" placeholder="标签名称"></Input>
              <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：章节名称</p>
            </FormItem>

            <FormItem>
              <div style="text-align: right;">
                <Button @click="handleReset">重置</Button>
                <Button type="primary" @click="handleSubmit" style="margin-left: 8px">提 交</Button>
              </div>
            </FormItem>
          </Form>
        </div>
      </Modal>
       <Modal v-model="modal3"  :styles="{top: '20px'}" title="修改节点" :width="700" :footer-hide="true">
        <div>
          <Form ref="formNalidate" :model="formNalidate" :rules="ruleVal" :label-width="80">
            <FormItem label="章/节点" prop="project_id" >
              <Cascader :data="list" v-model="valueList"  @on-change="format1" placeholder="章/节点" style="width:350px"></Cascader>
              <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：选择章节 and 节点</p>
            </FormItem>
                    <FormItem label="修改节点" prop="project_id">
          <Input v-model="formNalidate.knob_name" placeholder="节点名称" style="width:350px"></Input>
              <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：修改节点</p>

            </FormItem>

          </Form>
<div>
       <!--    <Cascader
              :data="ListA"
              v-model="valueListA"
              placeholder="项目/专业"
              style="display: inline-block; width: 300px;"
              @on-change="KseachKnow"

            ></Cascader>

          <Transfer
            :data="data4"
            :target-keys="targetKeys4"
            :list-style="listStyle"
            :render-format="render3"
            :operations="['取消关联','设置关联']"
            @on-change="handleChange4"
            style="margin-top:10px"
          ></Transfer>-->
       </div>
          <div style="text-align: center;margin-top:15px">
                <Button @click="handleReset">重置</Button>
                <Button type="primary" @click="subMint" style="margin-left: 8px">提 交</Button>
              </div>
          </Form>
        </div>
      </Modal>
       <Modal v-model="modal4"   :styles="{top: '20px'}"  title="添加节点" :width="700" :footer-hide="true">
        <div>
            <Form ref="formWalidate" :model="formWalidate" :rules="ruleVal" :label-width="80">
             <FormItem label="章节列表" >
              <Select v-model="formWalidate.section_id" clearable placeholder="章节名" style="width:200px">
                <Option v-for="item in tagsList" :value="item.section_id" :key="item.section_id" >{{ item.section_name }}</Option>
              </Select>
              <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：选择章节</p>
            </FormItem>
             <FormItem label="节点" prop="project_id">
          <Input v-model="formWalidate.knob_name" placeholder="标签名称" style="width:200px"></Input>
              <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：修改节点</p>

            </FormItem>

          </Form>
<div>

          </div>
          <div style="text-align: center;margin-top:15px">
                <Button @click="handleReset">重置</Button>
                <Button type="primary" @click="submint" style="margin-left: 8px">提 交</Button>
              </div>
        </div>
      </Modal>
            <!--  列表 -->
    <Modal v-model="modal5"  title="课程章节总列表" mask   :footer-hide="true" :width="1100" >
        <div>
         <vue2-org-tree name="test"
         horizontal
          :data="Datas"
          :render-content="renderContent"
          />
        </div>
      </Modal>
      <Modal v-model="modal6"   :styles="{top: '20px'}"  title="知识点组建" :width="400" :footer-hide="true">
         <div>
              <Cascader :data="list" v-model="valueListKnow"  @on-change="format2" placeholder="章/节点" style="width:350px"></Cascader>
              <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：选择章节 and 节点</p>
              <Input v-model="formkonw.know_name" placeholder="标签名称" style="width:350px"></Input>
              <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：输入知识点名称</p>
      <div style="text-align: center;margin-top:15px">
                <Button type="primary" @click="submient" style="margin-left: 8px">提 交</Button>
              </div>
         </div>
      </Modal>
       <Modal v-model="modal7"   :styles="{top: '20px'}"  title="知识点组建" :width="400" :footer-hide="true">
         <div>
              <Cascader :data="buildList" v-model="buildListKnow"  @on-change="format3" placeholder="章/节点/知识点" style="width:350px"></Cascader>
              <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：选择章节 / 节点/ 知识点</p>
              <Input v-model="buildkonw.know_name" placeholder="标签名称" style="width:350px"></Input>
              <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：输入知识点名称</p>
      <div style="text-align: center;margin-top:15px">
                <Button type="primary" @click="subMient" style="margin-left: 8px">提 交</Button>
              </div>
         </div>
      </Modal>
  </div>
</template>

<script>
import { majorCourseList, addSection, putKnow, getSection, putSection, knowNoList, addKnob, putKnob, knobKnowList, secKnobList, addKnow } from '@/api/course'
import { proMjor2tree, knob2Tree, knobKnow3Tree } from '@/api/Linkmenu'

import Fomat from '@/libs/fomat'
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      valueListKnow: [],
      orgList: [],
      modal: false,
      modal2: false,
      buildList: [],
      modal3: false,
      modal4: false,
      modal6: false,
      modal7: false,
      clone: {},
      data3: [],
      data4: [],
      buildListKnow: [],
      Datas: {
        key: '',
        label: '',
        children: []
      },
      cooble: {
        key: '',
        label: '',
        children: []
      },
      horizontal: true,
      collapsable: true,
      modal5: false,
      Rows: '',
      know_name: '',
      title: '',

      listStyle: {
        width: '250px',
        height: '300px'
      },
      valueList: [],
      valueListSeach: [],
      list: [],
      ListA: [],
      form: {
        project_id: '',
        major_id: '',
        type_id: ''

      },
      fromdata: {
        limit: 10,
        page: 1,
        project_id: '',
        major_id: '',
        course_name: '',
        course_id: ''
      },
      formkonw: {
        project_id: '',
        course_id: '',
        major_id: '',
        section_id: '',
        knob_id: '',
        know_name: ''
      },
      buildkonw: {
        project_id: '',
        course_id: '',
        major_id: '',
        section_id: '',
        knob_id: '',
        know_name: ''
      },
      formDown: {
        project_id: '',
        course_id: '',
        major_id: '',
        type_id: '',
        section_id: '',
        knob_id: ''
      },
      total1: 1,
      targetKeys3: [],
      targetKeys4: [],
      valueListA: [],
      valueListB: [],
      tagsList: [],
      section_id: [],
      formValidate: {
        course_id: '',
        section_name: ''
      },
      formCalidate: {
        section_id: '',
        section_name: ''

      },
      formWalidate: {
        course_id: '',
        knob_name: '',
        section_id: ''

      },
      formNalidate: {
        course_id: '',
        knob_name: '',
        section_id: '',
        know_id: '',
        knob_id: '',
        project_id: '',
        major_id: ''
      },
      ruleValidate: {
        section_name: [
          { required: true, validator: Fomat.Rules.Verifiy().Required, trigger: 'blur' }
        ],

        section_id: [
          { required: true, validator: Fomat.Rules.Verifiy().Required, trigger: 'blur' }
        ],
        Section_name: [
          { required: true, validator: Fomat.Rules.Verifiy().Required, trigger: 'blur' }
        ],
        Section_id: [
          { required: true, validator: Fomat.Rules.Verifiy().Required, trigger: 'blur' }
        ]
      },
      ruleVal: {
        section_name: [
          { required: true, validator: Fomat.Rules.Verifiy().Required, trigger: 'blur' }
        ],

        section_id: [
          { required: true, validator: Fomat.Rules.Verifiy().Required, trigger: 'blur' }
        ]

      },
      ruleVal1: {
        section_name: [
          { required: true, validator: Fomat.Rules.Verifiy().Required, trigger: 'blur' }
        ],

        section_id: [
          { required: true, validator: Fomat.Rules.Verifiy().Required, trigger: 'blur' }
        ]

      },
      ruleVal2: {
        section_name: [
          { required: true, validator: Fomat.Rules.Verifiy().Required, trigger: 'blur' }
        ],

        section_id: [
          { required: true, validator: Fomat.Rules.Verifiy().Required, trigger: 'blur' }
        ]

      },

      columns: [
        {
          title: '课程ID',
          key: 'id',
          minWidth: 80
        },
        {
          title: '项目名称',
          key: 'project_name',
          minWidth: 110,
          tooltip: true
        },
        {
          title: '专业名称',
          key: 'major_name',
          minWidth: 150,
          tooltip: true
        },
        {
          title: '课程名称',
          key: 'course_name',
          minWidth: 150,
          tooltip: true
        },

        {
          title: '知识点章操作',
          key: 'action',
          minWidth: 170,
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
              }, '知识点章管理')
              // h('Button', {
              //   props: {
              //     type: 'warning',
              //     size: 'small'
              //   },
              //   on: {
              //     click: () => {
              //       this.remove(params.row)
              //     }
              //   }
              // }, '修改')
            ])
          }
        },
        // {
        //   title: '知识点分类操作',
        //   key: 'action',
        //   minWidth: 180,
        //   align: 'center',
        //   render: (h, params) => {
        //     return h('div', [
        //       h('Button', {
        //         props: {
        //           type: 'info',
        //           size: 'small'
        //         },
        //         style: {
        //           marginRight: '5px'
        //         },
        //         on: {
        //           click: () => {
        //             this.Zput(params.row)
        //           }
        //         }
        //       }, '添加'),
        //       h('Button', {
        //         props: {
        //           type: 'warning',
        //           size: 'small'
        //         },
        //         on: {
        //           click: () => {
        //             this.Zremove(params.row)
        //           }
        //         }
        //       }, '修改')
        //     ])
        //   }
        // },
        // {
        //   title: '知识点操作',
        //   key: 'action',
        //   minWidth: 180,
        //   align: 'center',
        //   render: (h, params) => {
        //     return h('div', [
        //       h('Button', {
        //         props: {
        //           type: 'info',
        //           size: 'small'
        //         },
        //         style: {
        //           marginRight: '5px'
        //         },
        //         on: {
        //           click: () => {
        //             this.Zbuild(params.row)
        //           }
        //         }
        //       }, '添加'),
        //       h('Button', {
        //         props: {
        //           type: 'warning',
        //           size: 'small'
        //         },
        //         style: {
        //           marginRight: '5px'
        //         },
        //         on: {
        //           click: () => {
        //             this.putbuild(params.row)
        //           }
        //         }
        //       }, '修改')

        //     ])
        //   }
        // },
        {
          title: '操作',
          key: 'action',
          minWidth: 190,
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
              }, '查看结构')
              // h('Button', {
              //   props: {
              //     type: 'info',
              //     size: 'small'
              //   },
              //   style: {
              //     marginRight: '5px'
              //   },
              //   on: {
              //     click: () => {
              //       this.chpater(params.row)
              //     }
              //   }
              // }, '查看章节')
            ])
          }
        }
      ]
    }
  },
  watch: {
    'formCalidate.section_id' (newValue, oldValue) {
      if (newValue) {
        this.tagsList.forEach(item => {
          if (item.section_id === newValue) {
            this.formCalidate.section_name = item.section_name
          }
        })
      }
    },
    valueListKnow (newValue, oldValue) {
      if (newValue.length === 0) {
        this.formkonw.section_id = ''
        this.formkonw.knob_id = ''
      } else if (newValue.length === 1) {
        this.formkonw.section_id = newValue[0]
        this.formkonw.knob_id = ''
      } else {
        this.formkonw.section_id = newValue[0]
        this.formkonw.knob_id = newValue[1]
      }
    },
    valueListSeach (newValue, oldValue) {
      if (newValue.length === 0) {
        this.fromdata.project_id = ''
        this.fromdata.major_id = ''
      } else if (newValue.length === 1) {
        this.fromdata.project_id = newValue[0]
        this.fromdata.major_id = ''
      } else {
        this.fromdata.project_id = newValue[0]
        this.fromdata.major_id = newValue[1]
      }
    },
    buildListKnow (newValue, oldValue) {
      if (newValue.length === 0) {
        this.buildkonw.section_id = ''
        this.buildkonw.knob_id = ''
        this.buildkonw.id = ''
      } else if (newValue.length === 1) {
        this.buildkonw.section_id = newValue[0]
        this.buildkonw.knob_id = newValue[1]
        this.buildkonw.id = ''
      } else {
        this.buildkonw.section_id = newValue[0]
        this.buildkonw.knob_id = newValue[1]
        this.buildkonw.id = newValue[2]
      }
    },
    valueList (newValue, oldValue) {
      if (newValue.length === 0) {
        this.formNalidate.section_id = ''
        this.formNalidate.knob_id = ''
      } else if (newValue.length === 1) {
        this.formNalidate.section_id = newValue[0]
        this.formNalidate.knob_id = ''
      } else {
        this.formNalidate.section_id = newValue[0]
        this.formNalidate.knob_id = newValue[1]
        this.formDown.section_id = newValue[0]
        this.formDown.knob_id = newValue[1]
      }
    }

  },
  methods: {
    ...mapMutations(['addTag', 'setformData']),
    handleReset () {
      this.formValidate.section_name = ''
      this.formCalidate.section_name = ''
    },
    renderContent (h, data) {
      let colors = ['orange', 'blue', 'gold', 'lightpink', 'gray', 'chocolate', 'tomato']
      let text = ''
      if (data.queston_count) {
        text = `(该知识点存在${data.queston_count}题)`
      } else {
        text = ''
      }
      return h('div',
        { style: { margin: '-10px -15px',
          padding: '10px 15px',
          color: 'white',
          backgroundColor: colors[data.pid] }
        },
        `${data.label} ${text}`)
    },
    handleSubmit1 () {
      addSection(this.formValidate).then(res => {
        if (res.data.code === 200) {
          this.$Message.success('添加成功!')

          this.modal = false
        }
      })
    },
    handleSubmit () {
      putSection(this.formCalidate).then(res => {
        if (res.data.code === 200) {
          this.$Message.success('修改成功!')

          this.modal2 = false
        } else if (res.data.code === 405) {
          this.$Message.success('修改失败 !未填写完成')
        }
      })
    },
    render3 (item) {
      return item.key + ' - ' + item.label
    },

    getTargetKeys () {

    },
    handleChange4 (newTargetKeys, direction, moveKeys) {
      this.targetKeys4 = newTargetKeys
      this.formNalidate.know_id = newTargetKeys.join(',')
    },
    handleChange3 (newTargetKeys, direction, moveKeys) {
      this.targetKeys3 = newTargetKeys
      this.formWalidate.know_id = newTargetKeys.join(',')
    },
    put (row) {
      this.setformData(row)
      const route = {
        name: 'Know_list',
        meta: {
          title: `${row.id}-知识点章列表`
        },
        query: {
          id: row.id
        }
      }
      this.addTag({
        route: route,
        type: 'push'
      })
      this.$router.push(route)
      // this.formValidate.course_id = row.id
      // this.formValidate.section_name = ''
      // this.title = '添加章节'
      // this.modal = true
    },
    remove (row) {
      this.formCalidate.course_id = row.id

      this.title = '修改章节'
      this.getList(row.id)

      this.modal2 = true
    },
    Zput (row) {
      this.formWalidate.course_id = row.id
      this.getList(row.id)
      this.modal4 = true
    },
    submient () {
      if (this.formkonw.knob_id) {
        addKnow(this.formkonw).then(res => {
          if (res.data.code === 200) {
            this.$Message.success('添加成功，请注意查看')
            this.modal6 = false
          } else {
            this.$Message.error('添加失败，请注意检查填写格式')
          }
        })
      } else {
        this.$Message.error('添加失败，请注意节点是否存在')
      }
    },
    subMient () {
      if (this.buildkonw.id) {
        putKnow(this.buildkonw).then(res => {
          if (res.data.code === 200) {
            this.$Message.success('添加成功，请注意查看')
            this.modal7 = false
          } else {
            this.$Message.error('添加失败，请注意检查填写格式')
          }
        })
      } else {
        this.$Message.error('添加失败，请注意知识点是否存在')
      }
    },
    Zremove (row) {
      this.formDown.course_id = row.id
      this.formNalidate.course_id = row.id
      this.valueListA = []
      this.getDList(row.id)
      this.modal3 = true
    },
    putbuild (row) {
      this.buildkonw.project_id = row.project_id
      this.buildkonw.major_id = row.major_id
      this.buildkonw.course_id = row.id
      this.getbuildList(row.id)
      this.modal7 = true
    },
    Zbuild (row) {
      this.formkonw.project_id = row.project_id
      this.formkonw.major_id = row.major_id
      this.formkonw.course_id = row.id
      this.getDList(row.id)
      this.modal6 = true
    },
    change (row) {
      this.Datas.key = row.id
      this.Datas.label = row.course_name
      secKnobList({ course_id: row.id }).then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.Datas.children = rep.data
          let num = 0
          this.Datas = this.deepCopy(this.Datas, num)
          this.Datas.pid = 0
        }
      })

      this.modal5 = true
    },

    getOrgList (obj) {
      majorCourseList(obj).then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.orgList = rep.data.data
          this.total1 = rep.data.total
        }
      })
    },
    submint () {
      addKnob(this.formWalidate).then(res => {
        if (res.data.code === 200) {
          this.$Message.success('添加成功，请注意查看')
          this.modal4 = false
        } else {
          this.$Message.error('添加失败，请注意检查填写格式')
        }
      })
    },
    deepCopy (obj, i) {
      if (!Array.isArray(obj)) {
        i++
      }
      var result = Array.isArray(obj) ? [] : {}
      for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
          if (typeof obj[key] === 'object' && obj[key] !== null) {
            if (!Array.isArray(obj[key])) {
              obj[key].pid = i
            }
            result[key] = this.deepCopy(obj[key], i) // 递归复制
          } else {
            result[key] = obj[key]
          }
        }
      }
      return result
    },
    subMint () {
      if (this.formNalidate.knob_id) {
        putKnob(this.formNalidate).then(res => {
          if (res.data.code === 200) {
            this.$Message.success('修改成功，请注意查看')
            this.modal3 = false
          } else {
            this.$Message.error('修改失败，请注意检查填写格式')
          }
        })
      } else {
        this.$Message.error('修改失败，请注意节点是否存在')
      }
    },
    onChange (val) {
      this.fromdata.page = val
      this.getOrgList(this.fromdata)
    },
    onPageSizeChange (val) {
      this.fromdata.limit = val
      this.getOrgList(this.fromdata)
    },

    seach () {
      this.getOrgList(this.fromdata)
    },
    seachQ () {
      this.fromdata.project_id = ''
      this.fromdata.project_id = ''
      this.fromdata.limit = 10
      this.fromdata.page = 1
      this.fromdata.course_name = ''
      this.fromdata.course_id = ''
      this.valueListSeach = []
      this.getOrgList(this.fromdata)
    },
    seachKnow (row) {
      this.form.project_id = row[0]
      this.form.major_id = row[1]
      this.getDatas(this.form)
    },
    KseachKnow (row) {
      this.formDown.project_id = row[0]
      this.formDown.major_id = row[1]

      this.getDataE(this.formDown)
    },
    getDatas (obj) {
      knowNoList(obj).then(res => {
        if (res.data.code === 200) {
          this.data3 = res.data.data
        }
      })
    },
    getDataE (obj) {
      knowNoList(obj).then(res => {
        if (res.data.code === 200) {
          this.data4 = res.data.data
        }
      })
    },
    chpater (row) {
      const route = {
        name: 'Schapter',
        meta: {
          title: `${row.id} -查看章节`
        },
        query: {
          id: row.id
        }
      }
      this.addTag({
        route: route,
        type: 'push'
      })
      this.$router.push(route)
    },
    getProMajListA () {
      proMjor2tree().then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.ListA = rep.data
        }
      })
    },
    format1 (labels, selectedData) {
      if (selectedData.length == 1) {
        this.formNalidate.knob_name = ''
      } else {
        this.formNalidate.knob_name = selectedData[1].label
      }
    },
    format2 (labels, selectedData) {
      if (selectedData.length == 1) {
        this.formkonw.knob_name = ''
      } else {
        this.formkonw.knob_name = selectedData[1].label
      }
    },
    format3 (labels, selectedData) {
      if (selectedData.length > 2) {
        this.buildkonw.know_name = selectedData[2].label
      } else {
        this.buildkonw.know_name = ''
      }
    },
    getList (id) {
      getSection({ course_id: id }).then(res => {
        let rep = res.data
        if (rep.code === 200) {
          if (!rep.data) {
            this.$Message.success('章节未添加，请核对信息')
          }
          this.tagsList = rep.data
          let arr = []
          rep.data.forEach((item) => {
            arr.push(item.section_id)
          })
          this.formCalidate.section_name = rep.data[0].section_name
          this.formCalidate.section_id = arr[0]
          this.formWalidate.section_id = rep.data[0].section_id
        }
      })
    },
    getbuildList (id) {
      knobKnow3Tree({ course_id: id }).then(res => {
        let rep = res.data
        this.buildList = rep.data
      })
    },
    getDList (id) {
      this.valueList = []
      this.valueListKnow = []
      knob2Tree({ course_id: id }).then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.list = rep.data
          this.formNalidate.section_id = rep.data[0].value
          this.formkonw.section_id = rep.data[0].value
          if (rep.data[0].children.length) {
            this.formNalidate.knob_id = rep.data[0].children[0].value
            this.formNalidate.knob_name = rep.data[0].children[0].label
            this.formkonw.knob_id = rep.data[0].children[0].value
            this.formkonw.knob_name = rep.data[0].children[0].label
          } else {
            this.formNalidate.knob_id = ''
            this.formNalidate.knob_name = ''
            this.formkonw.knob_id = ''
            this.formkonw.knob_name = ''
          }
          this.valueList = [ this.formNalidate.section_id, this.formNalidate.knob_id ]
          this.valueListKnow = [ this.formkonw.section_id, this.formkonw.knob_id ]
          this.formDown.knob_id = this.formNalidate.knob_id
          this.formDown.section_id = this.formNalidate.section_id
        }
      })
    }

  },
  mounted () {
    this.getProMajListA()
    this.getOrgList(this.fromdata)
    this.getDataE(this.formDown)
    console.log(knob2Tree)
  }
}
</script>

<style lang="less" socped>

.bg-white {
  background-color:#99999940;
}

</style>
