
<template>
  <div>
    <Card>
      <p slot="title">0元体验列表</p>
      <div>
        <div style="float:left">
     <Button v-if="Auth.top[0]" :type='Auth.top[0].menu_type' style="margin-left: 10px;" @click="addKnow">{{Auth.top[0].menu_title}}</Button>
          <span>当前共有0元体验题 {{total}}  条</span>
          </div>

      </div>
      <Divider />
      <Table stripe size="small" :columns="columns" :data="data" ></Table>

    </Card>

  <!-- 添加试题 -->
      <Modal v-model="modal2"  scrollable title="添加试题" :width="1000" :footer-hide="true" @on-visible-change="changevalue">
<div>
     <Button type="default" shape="circle" icon="md-sync" @click="seachQ"></Button>
        <Divider type="vertical" />
               <Cascader :data="Slist" v-model="valueList2" change-on-select style="width:250px; display: inline-block;" placeholder="项目/专业/知识点分类"></Cascader>
        <Divider type="vertical" />
           <Cascader :data="knoblist" v-model="knobvalueList" change-on-select style="width:200px; display: inline-block;" placeholder="知识点章/知识点节"></Cascader>
        <Divider type="vertical" />

                <Input v-model="Manage.remark" placeholder="备注名" style="width: 90px; margin-right: 10px;" />
        <Divider type="vertical" />
        <Input v-model="Manage.question_keyword" placeholder="题干关键字" style="width: 140px; margin-right: 10px;" />
         <Divider type="vertical" />
                <Input v-model="Manage.question_id" placeholder="题目ID" style="width: 70px; margin-right: 10px;" />

        <Button type='primary' @click="seachW" style="margin-right: 10px;">搜索</Button>

   <Table ref="table" size="small" :columns="columns1" :data="data1" @on-selection-change="selectionStu" @on-select-cancel="selectionCancel" @on-select-all-cancel="CselectionAll" @on-select-all="selectionAll" style="margin-top:15px"></Table>
   <div style="padding: 20px 0; text-align: right;">
        <Page :total="total1" @on-change="onChange" @on-page-size-change="onPageSizeChange" :current="Manage.page" :page-size="Manage.limit" size="small" show-total show-elevator show-sizer />
      </div>
       <Button type='primary' @click="ADDsles" style="margin-right: 10px;">确认选择</Button>
         <Divider type="vertical" />  选择{{paperNum.seles}}条 共{{paperNum.selesall}}条

</div>
      </Modal>
  </div>
</template>

<script>
import { knob2Tree, zkProMjorCou3tree } from '@/api/Linkmenu'
import { experQuesList, experContList, addQuestionExper, delExper, getPlate, statusPaper } from '@/api/question'
import Fomat from '@/libs/fomat'
import { labelList } from '@/api/tags'
import { userPageRuleList } from '@/api/Answer'
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      data: [],
      list: [],
      rows: '',
      Slist: [],
      modal0: false,
      starttime: '',
      endtime: '',
      data1: [],
      data0: [],
      total1: 0,
      Sele_id: [],
      knobvalueList: [],
      tagsList: [],
      valueList: [],
      knoblist: [],
      Auth: {
        right: [],
        top: []
      },
      valueList2: [],
      valueList3: [],
      paperNum: {
        seles: 0,
        selesall: ''
      },
      PaperNum: {
        seles: 0,
        selesall: ''
      },
      formatkeat: [{
        id: 1,
        name: '有效'
      }, {
        id: 2,
        name: '无效'
      }],
      formatFile: [{
        id: 1,
        name: '单选 '
      }, {
        id: 2,
        name: '论述题'
      }],
      formatlate: [],
      formatpink: [{
        id: 1,
        name: 'A'
      }, {
        id: 2,
        name: 'B'
      }, {
        id: 3,
        name: 'C'
      }],
      total: 0,
      columns: [

        {
          title: '体验ID',
          key: 'id',
          minWidth: 60,
          align: 'center'
        },

        {
          title: '专业分类',
          key: 'major_name',
          minWidth: 100,
          tooltip: true
        },
        {
          title: '知识点名',
          key: 'know_name',
          minWidth: 110,
          tooltip: true
        },

        {
          title: '题干关键字',
          key: 'question_keyword',
          minWidth: 100,
          tooltip: true
        },
        {
          title: '备注',
          key: 'remark',
          minWidth: 100,
          tooltip: true
        },

        {
          title: '操作',
          key: 'is_addkonw',
          minWidth: 100,
          align: 'center',
          render: (h, params) => {
            let btns = []
            if (this.Auth.right.length > 0) {
              let listBtn = this.Auth.right
              listBtn.forEach(e => {
                let obj = h('Button', {
                  props: {
                    type: e.menu_type,
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.publicFun(e.key, params.row)
                    }
                  }
                }, e.menu_title)
                if (params.row.status == 2) {
                  if (e.key != 'e')btns.push(obj)
                } else {
                  if (e.key != 'f')btns.push(obj)
                }
              })
            }
            return h('div', [...btns])
            // return h('div', [

            //   h('Button', {
            //     props: {
            //       type: 'warning',
            //       size: 'small'

            //     },
            //     style: {
            //       marginRight: '10px'
            //     },
            //     on: {
            //       click: () => {
            //         this.delzero(params.row)
            //       }
            //     }
            //   }, '删除')

            // ])
          }
        }

      ],

      columns1: [
        {
          type: 'selection',
          width: 50,
          align: 'center'
        },
        {
          title: '试题ID',
          key: 'id',
          minWidth: 60,
          align: 'center'
        },

        {
          title: '课程名称',
          key: 'course_name',
          minWidth: 100,
          tooltip: true
        },
        {
          title: '题干',
          key: 'question_keyword',
          minWidth: 180,
          tooltip: true,
          align: 'center'
        },
        {
          title: '知识点名称',
          key: 'know_name',
          minWidth: 120,
          tooltip: true
        },

        {
          title: '备注',
          key: 'remark',
          minWidth: 120,
          tooltip: true
        }

      ],

      modal: false,
      modal2: false,
      modal3: false,
      title: '',
      type: 1,
      formValidate: {
        page: 1,
        limit: 10,
        project_id: '',
        major_id: '',
        paper_type: '',
        id: '',
        paper_name: '',
        status: '',
        plate_id: '',
        difficulty: ''
      },
      Manage: {
        page: 1,
        limit: 10,
        project_id: '',
        major_id: '',
        course_id: '',
        know_id: '',
        section_id: '',
        knob_id: '',
        remark: '',
        question_id: '',
        question_keyword: ''

      },
      ruleValidate: {
        paper_type: [
          { required: true, validator: Fomat.Rules.Verifiy().Required, trigger: 'blur' }
        ],
        project_id: [
          { required: true, validator: Fomat.Rules.Verifiy().Required, trigger: 'change' }
        ],
        status: [
          { required: true, validator: Fomat.Rules.Verifiy().Required, trigger: 'change' }
        ],
        difficulty: [
          { required: true, validator: Fomat.Rules.Verifiy().Required, trigger: 'blur' }
        ],
        plate_id: [
          { requireplate_idd: true, validator: Fomat.Rules.Verifiy().Required, trigger: 'blur' }
        ],
        paper_name: [
          { required: true, validator: Fomat.Rules.Verifiy().Required, trigger: 'blur' }
        ],
        id: [
          { required: true, validator: Fomat.Rules.Verifiy().Required, trigger: 'blur' }
        ]
      },
      form: {
        page: 1,
        limit: 4,
        project_id: '',
        major_id: '',
        know_id: '',
        question_type: '',
        status: '',
        id: '',
        question_stem: ''
      },
      row: null,
      knowLsit: []

    }
  },
  components: {

  },
  watch: {
    valueList (newValue, oldValue) {
      if (newValue.length === 0) {
        this.formValidate.project_id = ''
        this.formValidate.major_id = ''
        this.formValidate.know_id = ''
      } else if (newValue.length === 1) {
        this.formValidate.project_id = newValue[0]
        this.formValidate.major_id = newValue[1]
        this.formValidate.know_id = ''
      } else {
        this.formValidate.project_id = newValue[0]
        this.formValidate.major_id = newValue[1]
        this.formValidate.know_id = newValue[2]
      }
    },
    valueList2 (newValue, oldValue) {
      if (newValue.length === 0) {
        this.Manage.project_id = newValue[0]
        this.Manage.major_id = ''
        this.Manage.course_id = ''
      } else if (newValue.length === 1) {
        this.Manage.project_id = newValue[0]
        this.Manage.major_id = newValue[1]
        this.Manage.course_id = ''
      } else if (newValue.length === 2) {
        this.Manage.project_id = newValue[0]
        this.Manage.major_id = newValue[1]
        this.Manage.course_id = ''
      } else {
        this.Manage.project_id = newValue[0]
        this.Manage.major_id = newValue[1]
        this.Manage.course_id = newValue[2]
        this.Manage.knob_id = ''
        this.knobvalueList = []
        this.getknob(newValue[2])
      }
    },
    knobvalueList (newValue, oldValue) {
      if (newValue.length === 0) {
        this.Manage.section_id = ''
        this.Manage.knob_id = ''
      } else if (newValue.length === 1) {
        this.Manage.section_id = newValue[0]
        this.Manage.knob_id = ''
      } else {
        this.Manage.section_id = newValue[0]
        this.Manage.knob_id = newValue[1]
      }
    }
  },

  methods: {
    ...mapMutations(['addTag']),

    remove (row) {
      statusPaper({ id: row.id, status: row.status === 1 ? '2' : '1' }).then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.$Message.success(res.data.msg)
          this.getData(this.form)
        } else if (res.data.code === 405) {
          this.$Message.warning(res.data.msg)
        }
      })
    },
    seachW () {
      this.getData2(this.Manage)
    },
    seachQ () {
      this.Manage.page = 1
      this.Manage.limit = 10
      this.Manage.project_id = ''
      this.Manage.major_id = ''
      this.Manage.know_id = ''
      this.Manage.question_id = ''
      this.Manage.question_keyword = ''

      this.valueList2 = []
      this.getData2(this.Manage)
    },
    delPaperQue (row) {
      delPaperQue({ id: row.id }).then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.$Message.success(res.data.msg)
          this.getData1(this.rows)
        } else if (res.data.code === 405) {
          this.$Message.warning(res.data.msg)
        }
      })
    },
    getknob (id) {
      knob2Tree({ course_id: id }).then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.knoblist = rep.data
        }
      })
    },
    addKnow () {
      this.getData2(this.Manage)
      this.modal2 = true
    },
    seach () {
      this.formValidate.page = 1
      this.formValidate.limit = 10
      this.formValidate.project_id = ''
      this.formValidate.major_id = ''
      this.formValidate.know_id = ''
      this.formValidate.question_type = ''
      this.formValidate.status = ''
      this.formValidate.id = ''
      this.formValidate.question_stem = ''
      this.valueList = []
      this.getData(this.formValidate)
    },

    onChange (val) {
      this.Manage.page = val
      this.getData2(this.Manage)
    },
    onPageSizeChange (val) {
      this.Manage.limit = val
      this.getData2(this.Manage)
    },

    handleReset (name) {
      this.$refs[name].resetFields()
      this.valueList2 = []
    },

    getList (obj) {
      labelList(obj).then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.tagsList = rep.data
        }
      })
    },

    getData () {
      experContList().then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.data = rep.data.data
          this.total = rep.data.total * 1
        }
      })
    },
    getData1 (row) {
      paperQueList({ paper_id: row.id }).then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.data0 = rep.data.data
          this.paperNum.selesall = rep.data.total
          this.paperNum.seles = rep.data.total
        }
      })
    },
    ADDsles () {
      let arr = this.Sele_id.join(',')
      addQuestionExper({ question_id: arr }).then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.getData()
          this.modal2 = false

          this.Manage.page = 1
          this.Manage.limit = 2
          this.Manage.project_id = ''
          this.Manage.major_id = ''
          this.Manage.know_id = ''
          this.Manage.question_id = ''
          this.Manage.question_keyword = ''

          this.valueList2 = []
          this.$Message.success(res.data.msg)
        }
      })
    },
    getData2 (obj) {
      this.Manage.paper_id = this.rows.id
      experQuesList(obj).then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.paperNum.selesall = rep.data.total
          this.total1 = rep.data.total * 1
          let arr = rep.data.data
          arr.forEach(val => {
            if (this.Sele_id.length > 0) {
              this.Sele_id.forEach(key => {
                if (key == val.id) {
                  val._checked = true
                }
              })
            }
          })
          this.data1 = arr
        }
      })
    },
    publicFun  (key, row) {
      if (key === 'b') {
        delExper({ exper_id: row.id }).then(res => {
          let rep = res.data
          if (rep.code === 200) {
            this.getData()
            this.$Message.success(rep.msg)
          }
        })
      }
    },
    changevalue () {
      experQuesList(this.Manage).then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.paperNum.selesall = rep.data.total
          this.paperNum.seles = 0
          this.Sele_id = []
          let arr = rep.data.data
          this.data1 = arr
        }
      })
    },
    getplate () {
      getPlate().then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.formatlate = rep.data
        }
      })
    },
    // 选中
    selectionStu (arr) {
      let list = arr.map(item => item.id)
      if (list.length > 0) {
        list.forEach(v => {
          this.Sele_id.push(v)
        })
      }
      this.Sele_id = Array.from(new Set(this.Sele_id))
      this.paperNum.seles = this.Sele_id.length
    },
    selectionCancel (arr, row) {
      this.Sele_id.splice(this.Sele_id.findIndex(v => v == row.id), 1)
      this.paperNum.seles = this.Sele_id.length
    },
    CselectionAll (arr, row) {
      let Arr = []
      this.data1.forEach(val => {
        Arr.push(val.id)
      })
      this.Sele_id = this.Sele_id.filter(item => !Arr.includes(item))
    },
    selectionAll (arr, row) {
      let Arr = []
      this.data1.forEach(val => {
        Arr.push(val.id)
      })
      let list = arr.map(item => item.id)
      if (list.length > 0) {
        list.forEach(v => {
          this.Sele_id.push(v)
        })
      }
      this.Sele_id = Array.from(new Set(this.Sele_id))
    },
    getAuth (name) {
      userPageRuleList({ menu_name: name }).then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.Auth = rep.data
        }
      })
    },
    getProMajType () {
      zkProMjorCou3tree().then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.Slist = rep.data
        }
      })
    }

  },
  mounted () {
    this.getData()
    this.getProMajType()
    this.getplate()
    this.getAuth(this.$route.name)
  }
}
</script>

<style lang="less">

</style>
