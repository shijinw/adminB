<template>
  <div>
    <Card>
 <p slot="title">题库答疑列表</p>
      <div>
        <Button type="default" shape="circle" icon="md-sync" @click="reasts('cursefrom')"></Button>
<Divider type="vertical" />
     <Input v-model="cursefrom.mobile" placeholder="手机号" style="width: 50px" />
        <Divider type="vertical" />
         <Input v-model="cursefrom.answer_id" placeholder="ID" style="width: 50px" />
        <Divider type="vertical" />
          <Select v-model="cursefrom.course_id" clearable style="width:150px" placeholder="正课类型">
          <Option v-for="item in formatFile" :value="item.menu_title" :key="item.id">{{ item.menu_title }}</Option>
        </Select>
        <Divider type="vertical" />

             <Select v-model="cursefrom.reply_status" clearable placeholder="回复状态" style="width:90px">
                <Option v-for="item in formatkeat" :value="item.id" :key="item.id">{{ item.name }}</Option>
              </Select>

        <Divider type="vertical" />

          <DatePicker type="date" @on-change="getStime" format="yyyy-MM-dd" placeholder="开始时间" style="width: 100px"></DatePicker>
  <Divider type="vertical" />
      <DatePicker type="date" @on-change="getEtime" format="yyyy-MM-dd" placeholder="结束时间" style="width: 100px"></DatePicker>
  <Divider type="vertical" />
             <Select v-model="cursefrom.quiz_source" clearable placeholder="提问来源" style="width:100px">
                <Option v-for="item in formatcard" :value="item.id" :key="item.id">{{ item.name }}</Option>
              </Select>
        <div style="float:right">
         <Button type='primary' @click="seachKnow" style="margin-right: 5px;">筛选</Button>
         <Button type='primary' v-if="Daolist" @click="daolist" style="margin-right: 5px;">导出Exel</Button>
         <Button type='warning' v-if="Zenyi" @click="Zhuanyi" style="margin-right: 5px;">一键转移</Button>
       </div>

      </div>
      <Divider />
           <Table stripe size="small" :columns="columns" :data="data" ></Table>

      <div style="padding: 20px 0; text-align: right;">
        <Page :total="total" @on-change="onChange" @on-page-size-change="onPageSizeChange" :current="cursefrom.page" :page-size="cursefrom.limit" size="small" show-total show-elevator show-sizer />
      </div>
    </Card>
<!-- 导出弹层 -->
    <Modal v-model="modal0" draggable scrollable title="答疑导出" ok-text="导出" @on-ok="exportStu" >
      <div>
        <p style="padding-bottom: 10px;">请选择时间段：</p>
        <Row>
          <Col :span="11">
            <DatePicker v-model="starttime" type="datetime" placeholder="提问时间" style="width: 100%"></DatePicker>
          </Col>
          <Col :span="2" style="text-align: center; line-height: 32px;">
            -
          </Col>
          <Col :span="11">
            <DatePicker v-model="endtime" type="datetime" placeholder="结束时间" style="width: 100%"></DatePicker>
          </Col>
        </Row>
    <Row style="margin-top:15px">
      <Select v-model="Comfrom.reply_status" clearable placeholder="回复状态" style="width:100px">
                <Option v-for="item in formatkeat" :value="item.id" :key="item.id">{{ item.name }}</Option>
         </Select>
    </Row>
      </div>
    </Modal>
    <!-- 导出弹层 -->
    <Modal  v-model="modal1" mask title="查看答疑内容" :width="1200"  >
    <div style="margin:0 auto;width:70rem">
        <div class="tuer">
       <div class="content"><strong class="example">手机号码 :</strong>  <span style="color:cornflowerblue;font-size:15px" v-text="fromData.mobile"></span></div>
       <div class="content"><strong class="example">课程名称 :</strong>  <span style="color:cornflowerblue;font-size:15px" v-text="fromData.course_name"></span></div>
       <div class="content"><strong class="example">创建时间 :</strong>  <span style="color:cornflowerblue;font-size:15px" v-text="fromData.create_time"></span></div>
       <div class="content"><strong class="example">回复状态 :</strong>  <span style="color:cornflowerblue;font-size:15px" >{{fromData.reply_status===1?"已回复":"未回复"}}</span></div>
       <div class="content"><strong class="example">提问端 :</strong>  <span style="color:cornflowerblue;font-size:15px">{{fromData.quiz_source===1?"手机":"pc端"}}</span></div>
       <div class="content"><strong class="example">答疑老师姓名 :</strong>  <span style="color:cornflowerblue;font-size:15px" v-text="fromData.reply_user_name"></span></div>
       <div class="content"><strong class="example">回复时间 :</strong>  <span style="color:cornflowerblue;font-size:15px" v-text="fromData.reply_time"></span></div>
       <div class="content" style="width:92%"><strong class="example">知识点名称 :</strong>  <span style="color:cornflowerblue;font-size:15px" v-text="fromData.know_name"></span></div>
      </div>
       <div style="width:92%;border:1px solid #9999;margin:10px auto;border-radius: 20px;">
        <div class="content" style="width:92%"><strong class="example">题目内容 :</strong>
           <component :is="item.component" :text="item.text" v-for="(item,inde) in items" :key="inde"></component>
       </div>
           <div class="content" style="width:92%" v-if="fromData.question_info.question_type===1?true:false"><strong class="example">选项答案 </strong>
           <p :style="fromData.question_info.true_options==='A'?isactive:isActive"><strong class="example">A :</strong>{{fromData.question_info.option_a}}</p>

           <p :style="fromData.question_info.true_options==='B'?isactive:isActive"><strong class="example">B :</strong>{{fromData.question_info.option_b}}</p>

           <p :style="fromData.question_info.true_options==='C'?isactive:isActive"><strong class="example">C :</strong>{{fromData.question_info.option_c}}</p>

           <p :style="fromData.question_info.true_options==='D'?isactive:isActive"><strong class="example">D :</strong>{{fromData.question_info.option_d}}</p>
       </div>
      <div class="content" style="width:92%" v-if="fromData.question_info.question_type===1?true:false"><strong class="example">正确选项 ：{{fromData.question_info.true_options}}</strong></div>
      <div class="content" style="width:92%"><strong class="example">题目难度 ：{{fromData.difficulty}}</strong></div>
      <div class="content" style="width:92%;"><strong class="example"> 题目解析 ：</strong>
       <p style="overflow: hidden;white-space: pre-wrap;">{{fromData.question_info.analysis}}</p>
       <img v-if="fromData.question_info.analysis_img" style="width:100px;height:120px" :src="fromData.question_info.analysis_img"></img>
      </div>

       <div class="content" style="width:92%;">
          <p style="overflow: hidden;white-space: pre-wrap;">{{fromData.question_info.analysis_one}}</p>
       <img v-if="fromData.question_info.analysis_img_one" style="width:100px;height:120px" :src="fromData.question_info.analysis_img"></img>
      </div>
   </div>
     <div style="width:92%;border:1px solid #9999;margin:10px auto;border-radius: 20px;">
     <div class="content" style="width:92%"><strong class="example">提问内容 :</strong>  <span style="color:cornflowerblue;font-size:15px;word-wrap: break-word;" v-text="fromData.quiz"></span></div>
       <div class="Icontent" style="width:92%"  v-if="fromData.quiz_image">图片扩展 ：
          <div class="demo" v-for="(item,key) in fromData.quiz_image" :key="key" @click="handleView(item)">
            <img class="imgs" :src="item" >
            <div class="demo-upload" > </div>
         </div>
        </div>
      </div>
      <div style="width:92%;display:flex;border:1px solid #9999;justify-content: center;flex-wrap: wrap;margin:10px auto;border-radius: 20px;">
        <div class="content" style="width:92%" v-if="fromData.reply_quiz"><strong class="example">回复内容 :</strong>  <span style="color:cornflowerblue;font-size:15px;word-wrap: break-word;" v-text="fromData.reply_quiz"></span></div>
         <div class="Icontent" style="width:92%"  v-if="fromData.reply_image">图片扩展 ：
          <div class="demo" v-for="(item,key) in fromData.reply_image" :key="key" @click="handleView(item)">
            <img class="imgs" :src="item" >
            <div class="demo-upload" > </div>
         </div>
        </div>
       </div>
          <div style="border:1px solid #8888;margin:10px auto;width:92%;border-radius: 15px;" v-if="fromData.z_quiz">
          <div style="margin:10px 20px"><strong class="example">追问内容 :</strong>  <span style="color:cornflowerblue;font-size:15px;word-wrap: break-word;" v-text="fromData.z_quiz"></span></div>
        <div class="Icontent" style="width:100%"  v-if="fromData.z_quiz_image">图片扩展 ：
          <div class="demo" v-for="(item,key) in fromData.z_quiz_image" :key="key" @click="handleView(item)">
            <img class="imgs" :src="item" >
            <div class="demo-upload" > </div>
         </div>
        </div>
        </div>
       <div style="border:1px solid #8888;margin:10px auto;width:92%;border-radius: 15px;" v-if="fromData.z_reply_quiz">
        <div style="margin:10px 20px" v-if="fromData.z_reply_quiz"><strong class="example">回复内容 :</strong>  <span style="color:cornflowerblue;font-size:15px;word-wrap: break-word;" v-html="fromData.z_reply_quiz"></span>
         <div class="Icontent" style="width:100%"  v-if="fromData.z_reply_image">图片扩展 ：
          <div class="demo" v-for="(item,key) in fromData.z_reply_image" :key="key" @click="handleView(item)">
            <img class="imgs" :src="item" >
            <div class="demo-upload" > </div>
         </div>
        </div>
        </div>
       </div>
   </div>
   <div slot="footer"></div>
    </Modal>
    <Modal class="modal" title="查看图片" v-model="visible"  >
      <img :src="imageUrl" v-if="visible" style="width: 100%">
  </Modal>
  </div>

</template>

<script>
import { queAnswerListA, userPageRuleList, queAnswerExport, lookQueAnswer, delQueAnswer } from '@/api/Answer'
import { mapMutations } from 'vuex'
import moment from 'moment'
import excel from '@/libs/excel'
import Imagen from '../components/creates/Imagen.vue'
import texts from '../components/creates/texts.vue'
export default {

  data () {
    return {
      data: [],
      total: 1,
      modal0: false,
      modal1: false,
      starttime: '',
      endtime: '',
      visible: false,
      Daolist: false,
      Zenyi: false,
      difficulty: '',
      Auth: {
        top: [],
        right: []
      },
      valueList: [],
      list: [],
      isactive: {
        marginLeft: '20px',
        color: 'green'
      },
      isActive: {
        marginLeft: '20px'
      },
      fromData: {
        mobile: '',
        course_name: '',
        know_name: '',
        create_time: '',
        reply_status: '',
        quiz_source: '',
        reply_user_name: '',
        reply_time: '',
        quiz: '',
        question_info: {},
        quiz_image: '',
        reply_quiz: '',
        difficulty: '',
        reply_image: ''
      },
      formatFile: [],
      formatcard: [{
        id: 1,
        name: '手机'
      },
      {
        id: 2,
        name: 'pc端'
      }],
      formatkeat: [{
        id: 1,
        name: '回复'
      },
      {
        id: 2,
        name: '未回复'
      }],
      cursefrom: {
        limit: 10,
        page: 1,
        answer_id: '',
        course_id: '',
        reply_status: '',
        quiz_source: '',
        mobile: '',
        start_time: '',
        end_time: ''
      },
      items: [],
      Comfrom: {
        course_id: '',
        quiz_source: '',
        reply_status: '',
        mobile: '',
        start_time: '',
        end_time: ''
      },
      columns: [
        {
          title: 'ID',
          key: 'id',
          minWidth: 60
        },

        {
          title: '手机号',
          key: 'mobile',
          minWidth: 100,
          tooltip: true
        },
        {
          title: '提问问题',
          key: 'quiz',
          minWidth: 100,
          tooltip: true,
          align: 'center'
        },
        // {
        //   title: '课程名称',
        //   key: 'course_name',
        //   minWidth: 100,
        //   tooltip: true,
        //   align: 'center'
        // },
        // {
        //   title: '关键字',
        //   key: 'question_keyword',
        //   minWidth: 100,
        //   tooltip: true,
        //   align: 'center'
        // },
        {
          title: '提问时间',
          key: 'create_time',
          minWidth: 100,
          tooltip: true,
          align: 'center'
        },
        {
          title: '回复状态',
          key: 'reply_status',
          minWidth: 90,
          tooltip: true,
          render: (h, params) => {
            let text = ''
            let color = ''
            if (params.row.reply_status === 1) {
              text = '已回复'
              color = '#019beb'
            } else {
              text = '未回复'
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
          title: '答疑状态',
          key: 'lock_que',
          minWidth: 90,
          tooltip: true,
          render: (h, params) => {
            let text = ''
            let color = ''
            if (params.row.reply_status === 2) {
              if (params.row.lock_que === 1) {
                text = '正在答疑'
                color = '#019beb'
              } else {
                text = '无人答疑'
                color = 'red'
              }
            } else if (params.row.z_reply_status === 2) {
              if (params.row.lock_que === 1) {
                text = '正在答疑'
                color = '#019beb'
              } else {
                text = '无人答疑'
                color = 'red'
              }
            } else {
              text = '答疑完成'
              color = '#000'
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
          title: '回复人',
          key: 'reply_user_name',
          minWidth: 80,
          tooltip: true,
          align: 'center'
        },
        {
          title: '回复时间',
          key: 'reply_time',
          minWidth: 100,
          tooltip: true,
          align: 'center'
        },
        {
          title: '提问端',
          key: 'quiz_source',
          minWidth: 80,
          tooltip: true,
          render: (h, params) => {
            let text = ''
            let color = ''
            if (params.row.quiz_source === 1) {
              text = '手机'
              color = '#019beb'
            } else {
              text = 'PC端'
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
          title: '操作',
          key: 'is_addkonw',
          minWidth: 200,
          align: 'center',
          render: (h, params) => {
            let disable = true
            let disabled = true
            let pths = []
            if (params.row.reply_status === 2) {
              disable = false
            } else if (params.row.z_reply_status === 2) {
              disable = false
            } else {
              disable = true
            }
            if (params.row.is_shift === 1) {
              disabled = true
            } else if (params.row.reply_user_name) {
              disabled = true
            } else {
              disabled = false
            }
            let look = h('Button', {
              props: {
                type: 'success',
                size: 'small'

              },
              style: {
                marginRight: '5px'
              },
              on: {
                click: () => {
                  this.publicFun('A', params.row)
                }
              }
            }, '查看')
            let Zen = h('Button', {
              props: {
                type: 'info',
                size: 'small',
                disabled: disabled
              },
              style: {
                marginRight: '5px'
              },
              on: {
                click: () => {
                  this.publicFun('Zen', params.row)
                }
              }
            }, '转移')
            let add = h('Button', {
              props: {
                type: 'primary',
                size: 'small',
                disabled: disable
              },
              style: {
                marginRight: '5px'
              },
              on: {
                click: () => {
                  this.publicFun('B', params.row)
                }
              }
            }, '回复')
            let put =
              h('Button', {
                props: {
                  type: 'warning',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.publicFun('C', params.row)
                  }
                }
              }, '修改')
            let remove =
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.publicFun('D', params.row)
                  }
                }
              }, '删除')
            if (this.Auth.top.length > 0) {
              let listBtn = this.Auth.top
              listBtn.forEach(e => {
                if (e.key === 'A') {
                  pths.push(look)
                } else if (e.key === 'Zen') {
                  pths.push(Zen)
                } else if (e.key === 'B') {
                  pths.push(add)
                } else if (e.key === 'C') {
                  pths.push(put)
                } else if (e.key === 'D') {
                  pths.push(remove)
                }
              })
            }
            return h('div', pths)
          }

        }]
    }
  },
  watch: {
    difficulty (newValue, oldValue) {
      if (newValue === 'A') {
        this.fromData.difficulty = '困难'
      } else if (newValue === 'B') {
        this.fromData.difficulty = '普通'
      } else if (newValue === 'C') {
        this.fromData.difficulty = '简单'
      }
    }
  },
  methods: {
    ...mapMutations(['addTag']),
    reasts (name) {
      this.$refs[name].resetFields()
    },
    seachKnow () {
      this.getQdata(this.cursefrom)
    },
    addKnow (row) {
      const route = {
        name: 'QuestionReply',
        meta: {
          title: `${row.id} - 题库答疑回复`
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
    putKnow (row) {
      const route = {
        name: 'putQuanter',
        meta: {
          title: `${row.id} - 题库答疑回复`
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
    daolist () {
      this.modal0 = true
    },
    onChange (val) {
      this.cursefrom.page = val

      this.getQdata(this.cursefrom)
    },
    onPageSizeChange (val) {
      this.form.limit = val

      this.getQdata(this.cursefrom)
    },
    getQdata (obj) {
      queAnswerListA(obj).then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.data = rep.data.data
          this.total = rep.data.total
        }
      })
    },
    publicFun (key, row) {
      switch (key) {
        case 'A':
          this.lookKnow(row)
          break
        case 'B':
          this.addKnow(row)
          break
        case 'C':
          this.putKnow(row)
          break
        case 'D':
          this.removeCQ(row)
          break
        case 'Zen':
          answerPond({ answer_id: row.id, answer_type: 2 }).then(res => {
            let rep = res.data
            if (rep.code === 200) {
              this.$Message.success('本条答疑转移成功！请注意查看')
              this.getQdata(this.cursefrom)
            }
          })
          break
      }
    },
    lookKnow (row) {
      lookQueAnswer({ id: row.id }).then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.fromData = rep.data
          this.fromData.mobile = rep.data.mobile
          this.fromData.course_name = rep.data.course_name
          this.fromData.know_name = rep.data.know_name
          this.fromData.create_time = rep.data.create_time
          this.fromData.reply_status = rep.data.reply_status
          this.fromData.quiz_source = rep.data.quiz_source
          this.fromData.reply_user_name = rep.data.reply_user_name
          this.fromData.reply_time = rep.data.reply_time
          this.fromData.quiz = rep.data.quiz
          this.fromData.quiz_image = rep.data.quiz_image ? rep.data.quiz_image.split(',') : ''
          this.fromData.reply_quiz = rep.data.reply_quiz
          this.fromData.reply_image = rep.data.reply_image ? rep.data.reply_image.split(',') : ''
          this.fromData.z_quiz = rep.data.z_quiz
          this.fromData.z_quiz_image = rep.data.z_quiz_image ? rep.data.z_quiz_image.split(',') : ''
          this.fromData.z_reply_quiz = rep.data.z_reply_quiz
          this.fromData.z_reply_image = rep.data.z_reply_image ? rep.data.z_reply_image.split(',') : ''
          this.fromData.question_info = rep.data.question_info
          this.difficulty = rep.data.question_info.difficulty
          let Arr = []
          rep.data.question_stem.forEach((item, index) => {
            let reg = /http/
            if (reg.test(rep.data.question_stem[index])) {
              Arr.push({
                component: Imagen,
                text: item
              })
            } else {
              Arr.push({
                component: texts,
                text: item.replace(/\n/g, '<br>')
              })
            }
            this.items = Arr
          })
        }
      })

      this.modal1 = true
    },
    removeCQ (row) {
      delQueAnswer({ id: row.id }).then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.$Message.error('本条答疑删除成功')
          this.getQdata(this.cursefrom)
        }
      })
    },
    Zhuanyi () {
      allAnswerPond({ answer_type: 2 }).then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.$Message.success(`课程答疑此次共有${rep.data.num}条数据`)
          this.getQdata(this.cursefrom)
        }
      })
    },
    handleView (name) {
      this.visible = true
      this.imageUrl = name
    },
    getStime (startime) {
      this.cursefrom.start_time = startime
    },
    getEtime (startime) {
      this.cursefrom.end_time = startime
    },
    exportStu () {
      if (this.starttime == '' || this.endtime == '') {
        this.$Message.error('时间不能为空！')
        return
      }

      this.Comfrom.start_time = moment(this.starttime).format('YYYY-MM-DD HH:mm:ss')
      this.Comfrom.end_time = moment(this.endtime).format('YYYY-MM-DD HH:mm:ss')

      this.Comfrom.mobile = this.cursefrom.mobile
      queAnswerExport(this.Comfrom).then(res => {
        if (res.data.code === 200) {
          if (res.data.data instanceof Array) {
            const params = {
              title: ['ID', '手机号码', '提问内容', '课程名称', '创建时间', '回复人姓名', '回复时间', '回复内容'],
              key: ['id', 'mobile', 'quiz', 'course_name', 'create_time', 'reply_user_name', 'reply_time', 'reply_quiz'],
              data: res.data.data,
              autoWidth: true,
              filename: '题库答疑EXCEL表'
            }
            excel.export_array_to_excel(params)
            this.starttime = ''
            this.endtime = ''
            this.modal1 = false
          } else {
            this.$Message.error(res.data.data)
          }
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
    },
    getdata () {
      userPageRuleList({ menu_name: this.$route.name }).then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.formatFile = rep.data.right.filter(item => item.menu_title !== '导出')
          this.cursefrom.course_id = rep.data.right[0].menu_title
          rep.data.right.forEach(item => {
            if (item.menu_title === '导出') {
              this.Daolist = true
            }
            if (item.menu_title === '一键转移') {
              this.Zenyi = true
            }
          })
          this.getQdata(this.cursefrom)
        }
      })
    }
  },
  components: {
    Imagen, texts
  },
  mounted () {
    this.getdata()
    this.getAuth(this.$route.name)
    this.getQdata(this.cursefrom)
  }
}
</script>

<style lang="less" scoped>
.example{
font-family:"Microsoft YaHei";
font-size:15px;
font-weight:600;
}

.tuer{
  display:flex;
  justify-content:left;
  flex-wrap: wrap;
}
.Icontent{
 width: 700px;
 display: flex;
 margin-top:20px;
 margin-right: 100px;
 margin-left: 50px;
justify-content: left;
color:red
}

.demo{
        display: inline-block;
        width: 60px;
        height: 60px;
        text-align: center;
        line-height: 60px;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        position: relative;
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
        margin: 15px;
}
.demo-upload{
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,.6);
}
.demo:hover .demo-upload{
        display: block;
    }
.imgs{
width:60px;
height: 60px;
}
.content{
 width: 30rem;
 margin:10px 50px 10px 20px;

}
</style>
