<template>
  <div>
    <Card>
      <p slot="title">答疑投诉列表</p>
      <Button type="default"
              shape="circle"
              icon="md-sync"
              @click="seachQ"></Button>
      <Divider type="vertical" />
      <Select v-model="cursefrom.answer_type"
              clearable
              style="width:150px"
              placeholder="选择答疑类型">
        <Option v-for="item in Typeid"
                :value="item.id"
                :key="item.id">{{ item.value }}</Option>
      </Select>

      <Divider type="vertical" />
      <Select v-model="cursefrom.complain_id"
              clearable
              style="width:150px"
              placeholder="选择投诉类型">
        <Option v-for="item in complain"
                :value="item.id"
                :key="item.id">{{ item.complain_name }}</Option>
      </Select>

      <Divider type="vertical" />
      <DatePicker type="date"
                  placeholder="开始时间"
                  style="width: 200px"
                  @on-change="start_time"
                  v-model="cursefrom.start_time"></DatePicker>
      <Divider type="vertical" />
      <DatePicker type="date"
                  placeholder="结束时间"
                  style="width: 200px"
                  :value="cursefrom.end_time"
                  @on-change="end_time"></DatePicker>

      <Button type='primary'
              @click="seach"
              style="margin-left: 10px;">搜索</Button>
      <Table stripe
             size="small"
             :columns="columns"
             :data="data"
             style="margin:15px 0"></Table>
      <div style="padding: 20px 0; text-align: right;">
        <Page :total="total"
              @on-change="onChange"
              @on-page-size-change="onPageSizeChange"
              :current="cursefrom.page"
              :page-size="cursefrom.limit"
              size="small"
              show-total
              show-elevator
              show-sizer />
      </div>
    </Card>
    <!-- 导出弹层 -->
    <Modal v-model="modal1"
           mask
           title="查看答疑内容"
           :width="1100">
      <Form :model="FromCata"
            :label-width="80">
        <div class="tuer">
          <div class="content"><strong class="example">手机号码 :</strong> <span style="color:cornflowerblue;font-size:15px"
                  v-text="FromCata.mobile"></span></div>
          <div class="content"><strong class="example">课程名称 :</strong> <span style="color:cornflowerblue;font-size:15px"
                  v-text="FromCata.course_name"></span></div>
          <div class="content"><strong class="example">章节名称 :</strong> <span style="color:cornflowerblue;font-size:15px"
                  v-text="FromCata.section_name"></span></div>
          <div class="content"><strong class="example">创建时间 :</strong> <span style="color:cornflowerblue;font-size:15px"
                  v-text="FromCata.create_time"></span></div>
          <div class="content"><strong class="example">回复状态 :</strong> <span style="color:cornflowerblue;font-size:15px">{{FromCata.reply_status===1?"已回复":"未回复"}}</span></div>
          <div class="content"><strong class="example">提问端 :</strong> <span style="color:cornflowerblue;font-size:15px">{{FromCata.quiz_source===1?"手机":"pc端"}}</span></div>
          <div class="content"><strong class="example">回复人姓名 :</strong> <span style="color:cornflowerblue;font-size:15px"
                  v-text="FromCata.reply_user_name"></span></div>
          <div class="content"><strong class="example">回复时间 :</strong> <span style="color:cornflowerblue;font-size:15px"
                  v-text="FromCata.reply_time"></span></div>
          <div style="1000px">
            <Button type='primary'
                    @click="lookVideo"
                    style="margin-right: 10px;">查看视频</Button>
          </div>
          <div style="border:1px solid #8888;margin:10px auto;width:96%;border-radius: 15px;"
               v-if="FromCata.quiz">
            <div style="margin:10px 20px"><strong class="example">提问内容 :</strong> <span style="color:cornflowerblue;font-size:15px;word-wrap: break-word;"
                    v-text="FromCata.quiz"></span></div>
            <div class="Icontent"
                 style="width:100%"
                 v-if="FromCata.quiz_image">图片扩展 ：
              <div class="demo"
                   v-for="(item,key) in FromCata.quiz_image"
                   :key="key"
                   @click="handleView(item)">
                <img class="imgs"
                     :src="item">
                <div class="demo-upload"> </div>
              </div>
            </div>
          </div>
          <div style="border:1px solid #8888;margin:10px auto;width:96%;border-radius: 15px;"
               v-if="FromCata.reply_quiz">
            <div style="margin:10px 20px"
                 v-if="FromCata.reply_quiz"><strong class="example">回复内容 :</strong> <span style="color:cornflowerblue;font-size:15px;word-wrap: break-word;"
                    v-html="FromCata.reply_quiz"></span>
              <div class="Icontent"
                   style="width:100%"
                   v-if="FromCata.reply_image">图片扩展 ：
                <div class="demo"
                     v-for="(item,key) in FromCata.reply_image"
                     :key="key"
                     @click="handleView(item)">
                  <img class="imgs"
                       :src="item">
                  <div class="demo-upload"> </div>
                </div>
              </div>
            </div>
          </div>
          <div style="border:1px solid #8888;margin:10px auto;width:96%;border-radius: 15px;"
               v-if="FromCata.z_quiz">
            <div style="margin:10px 20px"><strong class="example">追问内容 :</strong> <span style="color:cornflowerblue;font-size:15px;word-wrap: break-word;"
                    v-text="FromCata.z_quiz"></span></div>
            <div class="Icontent"
                 style="width:100%"
                 v-if="FromCata.z_quiz_image">图片扩展 ：
              <div class="demo"
                   v-for="(item,key) in FromCata.z_quiz_image"
                   :key="key"
                   @click="handleView(item)">
                <img class="imgs"
                     :src="item">
                <div class="demo-upload"> </div>
              </div>
            </div>
          </div>
          <div style="border:1px solid #8888;margin:10px auto;width:96%;border-radius: 15px;"
               v-if="FromCata.z_reply_quiz">
            <div style="margin:10px 20px"
                 v-if="FromCata.z_reply_quiz"><strong class="example">回复内容 :</strong> <span style="color:cornflowerblue;font-size:15px;word-wrap: break-word;"
                    v-html="FromCata.z_reply_quiz"></span>
              <div class="Icontent"
                   style="width:100%"
                   v-if="FromCata.z_reply_image">图片扩展 ：
                <div class="demo"
                     v-for="(item,key) in FromCata.z_reply_image"
                     :key="key"
                     @click="handleView(item)">
                  <img class="imgs"
                       :src="item">
                  <div class="demo-upload"> </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Modal class="modal"
               title="查看图片"
               v-model="visible">
          <img :src="imageUrl"
               v-if="visible"
               style="width: 100%">
        </Modal>
        <Modal title="视频预览"
               v-model="visible1"
               @on-visible-change="modas">
          <Viedo ref="mychild"
                 :url="FromCata.CoverURL"
                 :VideoT="FromCata.VideoT" />
        </Modal>
      </Form>
    </Modal>
    <!-- 导出弹层 -->
    <Modal v-model="modalS"
           mask
           title="查看答疑内容"
           :width="1200">
      <div style="margin:0 auto;width:70rem">
        <div class="tuer">
          <div class="content"><strong class="example">手机号码 :</strong> <span style="color:cornflowerblue;font-size:15px"
                  v-text="fromData.mobile"></span></div>
          <div class="content"><strong class="example">课程名称 :</strong> <span style="color:cornflowerblue;font-size:15px"
                  v-text="fromData.course_name"></span></div>
          <div class="content"><strong class="example">创建时间 :</strong> <span style="color:cornflowerblue;font-size:15px"
                  v-text="fromData.create_time"></span></div>
          <div class="content"><strong class="example">回复状态 :</strong> <span style="color:cornflowerblue;font-size:15px">{{fromData.reply_status===1?"已回复":"未回复"}}</span></div>
          <div class="content"><strong class="example">提问端 :</strong> <span style="color:cornflowerblue;font-size:15px">{{fromData.quiz_source===1?"手机":"pc端"}}</span></div>
          <div class="content"><strong class="example">答疑老师姓名 :</strong> <span style="color:cornflowerblue;font-size:15px"
                  v-text="fromData.reply_user_name"></span></div>
          <div class="content"><strong class="example">回复时间 :</strong> <span style="color:cornflowerblue;font-size:15px"
                  v-text="fromData.reply_time"></span></div>
          <div class="content"
               style="width:92%"><strong class="example">知识点名称 :</strong> <span style="color:cornflowerblue;font-size:15px"
                  v-text="fromData.know_name"></span></div>
        </div>
        <div style="width:92%;border:1px solid #9999;margin:10px auto;border-radius: 20px;">
          <div class="content"
               style="width:92%"><strong class="example">题目内容 :</strong>
            <component :is="item.component"
                       :text="item.text"
                       v-for="(item,inde) in items"
                       :key="inde"></component>
          </div>
          <div class="content"
               style="width:92%"><strong class="example">选项答案 </strong>
            <p :style="fromData.question_info.true_options==='A'?isactive:isActive"><strong class="example">A :</strong>{{fromData.question_info.option_a}}</p>

            <p :style="fromData.question_info.true_options==='B'?isactive:isActive"><strong class="example">B :</strong>{{fromData.question_info.option_b}}</p>

            <p :style="fromData.question_info.true_options==='C'?isactive:isActive"><strong class="example">C :</strong>{{fromData.question_info.option_c}}</p>

            <p :style="fromData.question_info.true_options==='D'?isactive:isActive"><strong class="example">D :</strong>{{fromData.question_info.option_d}}</p>
          </div>
          <div class="content"
               style="width:92%"><strong class="example">正确选项 ：{{fromData.question_info.true_options}}</strong></div>
          <div class="content"
               style="width:92%"><strong class="example">题目难度 ：{{fromData.difficulty}}</strong></div>
          <div class="content"
               style="width:92%;"><strong class="example"> 题目解析 ：</strong>
            <p>{{fromData.question_info.analysis}}</p>
            <img v-if="fromData.question_info.analysis_img"
                 style="width:100px;height:120px"
                 :src="fromData.question_info.analysis_img"></img>
          </div>

          <div class="content"
               style="width:92%;">
            <p>{{fromData.question_info.analysis_one}}</p>
            <img v-if="fromData.question_info.analysis_img_one"
                 style="width:100px;height:120px"
                 :src="fromData.question_info.analysis_img"></img>
          </div>
        </div>
        <div style="width:92%;border:1px solid #9999;margin:10px auto;border-radius: 20px;">
          <div class="content"
               style="width:92%"><strong class="example">提问内容 :</strong> <span style="color:cornflowerblue;font-size:15px;word-wrap: break-word;"
                  v-text="fromData.quiz"></span></div>
          <div class="Icontent"
               style="width:92%"
               v-if="fromData.quiz_image">图片扩展 ：
            <div class="demo"
                 v-for="(item,key) in fromData.quiz_image"
                 :key="key"
                 @click="handleView(item)">
              <img class="imgs"
                   :src="item">
              <div class="demo-upload"> </div>
            </div>
          </div>
        </div>
        <div style="width:92%;display:flex;border:1px solid #9999;justify-content: center;flex-wrap: wrap;margin:10px auto;border-radius: 20px;">
          <div class="content"
               style="width:92%"
               v-if="fromData.reply_quiz"><strong class="example">回复内容 :</strong> <span style="color:cornflowerblue;font-size:15px;word-wrap: break-word;"
                  v-text="fromData.reply_quiz"></span></div>
          <div class="Icontent"
               style="width:92%"
               v-if="fromData.reply_image">图片扩展 ：
            <div class="demo"
                 v-for="(item,key) in fromData.reply_image"
                 :key="key"
                 @click="handleView(item)">
              <img class="imgs"
                   :src="item">
              <div class="demo-upload"> </div>
            </div>
          </div>
        </div>
        <div style="border:1px solid #8888;margin:10px auto;width:92%;border-radius: 15px;"
             v-if="fromData.z_quiz">
          <div style="margin:10px 20px"><strong class="example">追问内容 :</strong> <span style="color:cornflowerblue;font-size:15px;word-wrap: break-word;"
                  v-text="fromData.z_quiz"></span></div>
          <div class="Icontent"
               style="width:100%"
               v-if="fromData.z_quiz_image">图片扩展 ：
            <div class="demo"
                 v-for="(item,key) in fromData.z_quiz_image"
                 :key="key"
                 @click="handleView(item)">
              <img class="imgs"
                   :src="item">
              <div class="demo-upload"> </div>
            </div>
          </div>
        </div>
        <div style="border:1px solid #8888;margin:10px auto;width:92%;border-radius: 15px;"
             v-if="fromData.z_reply_quiz">
          <div style="margin:10px 20px"
               v-if="fromData.z_reply_quiz"><strong class="example">回复内容 :</strong> <span style="color:cornflowerblue;font-size:15px;word-wrap: break-word;"
                  v-html="fromData.z_reply_quiz"></span>
            <div class="Icontent"
                 style="width:100%"
                 v-if="fromData.z_reply_image">图片扩展 ：
              <div class="demo"
                   v-for="(item,key) in fromData.z_reply_image"
                   :key="key"
                   @click="handleView(item)">
                <img class="imgs"
                     :src="item">
                <div class="demo-upload"> </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div slot="footer"></div>
    </Modal>
  </div>
</template>
<script>
import {
  teacherComplain,
  complainDetails,
  complainTypeList,
  getAnswerUser,
  lookCouAnswer,
  lookQueAnswer
} from '@/api/Answer';
import Viedo from '../components/video/Video.vue';
import Imagen from '../components/creates/Imagen.vue';
import texts from '../components/creates/texts.vue';
export default {
  components: {
    Viedo,
    Imagen,
    texts
  },
  data() {
    return {
      modal0: false,
      Typeid: [{ id: 1, value: '课程' }, { id: 2, value: '题库' }],
      status: [{ id: 1, value: '查阅' }, { id: 2, value: '未查阅' }],
      teacherID: [],
      complain: [],
      Details: [],
      modal1: false,
      visible: false,
      visible1: false,
      isactive: {
        marginLeft: '20px',
        color: 'green'
      },
      isActive: {
        marginLeft: '20px'
      },

      items: [],
      difficulty: '',
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
      modalS: false,
      title: '添加追问时间',
      columns: [
        {
          title: 'ID',
          key: 'id',
          minWidth: 50,
          tooltip: true
        },
        {
          title: '答疑类型',
          key: 'answer_type',
          minWidth: 90,
          tooltip: true,
          align: 'center',
          render: (h, params) => {
            let text = '';
            let color = '';
            if (params.row.answer_type === 1) {
              text = '课程';
              color = '#019beb';
            } else {
              text = '题库';
              color = 'red';
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
          title: '投诉名称',
          key: 'complain_name',
          minWidth: 120,
          tooltip: true,
          align: 'center'
        },
        {
          title: '投诉内容',
          key: 'content',
          minWidth: 250,
          tooltip: true,
          align: 'center'
        },

        {
          title: '操作',
          minWidth: 300,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h(
                'Button',
                {
                  props: {
                    type: 'info',
                    size: 'small'
                  },
                  style: {
                    marginRight: '10px'
                  },
                  on: {
                    click: () => {
                      this.lookKnow(params.row)
                    }
                  }
                },
                '详情'
              )
            ])
          }
        }
      ],
      data: [],
      Auth: [],
      FromCata: {
        id: '',
        mobile: '',
        course_name: '',
        section_name: '',
        create_time: '',
        reply_status: '',
        quiz_source: '',
        reply_user_name: '',
        reply_time: '',
        quiz: '',
        quiz_image: '',
        reply_quiz: '',
        reply_image: '',
        z_quiz: '',
        z_quiz_image: '',
        z_reply_quiz: '',
        z_reply_image: '',
        video_info: {}
      },
      total: 1,
      cursefrom: {
        page: 1,
        limit: 10,
        answer_type: '',
        answer_teacher_id: '',
        status: '',
        complain_id: '',
        end_time: '',
        start_time: ''
      }
    }
  },
  watch: {
    difficulty(newValue, oldValue) {
      if (newValue === 'A') {
        this.fromData.difficulty = '困难';
      } else if (newValue === 'B') {
        this.fromData.difficulty = '普通';
      } else if (newValue === 'C') {
        this.fromData.difficulty = '简单';
      }
    }
  },
  methods: {
    onChange(val) {
      this.cursefrom.page = val
      this.getData()
    },
    onPageSizeChange(val) {
      this.cursefrom.limit = val
      this.getData()
    },
    lookVideo() {
      this.visible1 = true
      this.$refs.mychild.cuureVideo(this.FromCata.puttime)
    },
    modas(val) {
      if (!val) {
        this.$refs.mychild.lookVideo()
      }
    },
    lookKnow(row) {
      if (row.answer_type === 1) {
        this.modal1 = true
        lookCouAnswer({ id: row.answer_id }).then(res => {
          let rep = res.data
          if (rep.code === 200) {
            this.FromCata.mobile = rep.data.mobile
            this.FromCata.course_name = rep.data.course_name
            this.FromCata.section_name = rep.data.section_name
            this.FromCata.create_time = rep.data.create_time
            this.FromCata.reply_status = rep.data.reply_status
            this.FromCata.quiz_source = rep.data.quiz_source
            this.FromCata.reply_user_name = rep.data.reply_user_name
            this.FromCata.reply_time = rep.data.reply_time
            this.FromCata.quiz = rep.data.quiz

            this.FromCata.CoverURL = rep.data.video_info.PlayURL
            this.FromCata.VideoT = rep.data.video_info.Title
            this.FromCata.puttime = rep.data.video_time
            this.FromCata.quiz_image = rep.data.quiz_image
              ? rep.data.quiz_image.split(',')
              : '';
            this.FromCata.reply_quiz = rep.data.reply_quiz
            this.FromCata.reply_image = rep.data.reply_image
              ? rep.data.reply_image.split(',')
              : '';
            this.FromCata.z_quiz = rep.data.z_quiz
            this.FromCata.z_quiz_image = rep.data.z_quiz_image
              ? rep.data.z_quiz_image.split(',')
              : '';
            this.FromCata.z_reply_quiz = rep.data.z_reply_quiz
            this.FromCata.z_reply_image = rep.data.z_reply_image
              ? rep.data.z_reply_image.split(',')
              : '';
          }
        })
      } else {
        this.modalS = true
        lookQueAnswer({ id: row.answer_id }).then(res => {
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
            this.fromData.quiz_image = rep.data.quiz_image
              ? rep.data.quiz_image.split(',')
              : '';
            this.fromData.reply_quiz = rep.data.reply_quiz
            this.fromData.reply_image = rep.data.reply_image
              ? rep.data.reply_image.split(',')
              : '';
            this.fromData.z_quiz_image = rep.data.z_quiz_image
              ? rep.data.z_quiz_image.split(',')
              : '';
            this.fromData.z_reply_image = rep.data.z_reply_image
              ? rep.data.z_reply_image.split(',')
              : '';
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
      }
    },
    getData(obj) {
      teacherComplain(obj).then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.data = rep.data.data
          this.total = rep.data.total
        }
      })
    },
    getcomplain() {
      complainTypeList().then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.complain = rep.data
        }
      })
    },
    start_time(val) {
      this.cursefrom.start_time = val
    },
    end_time(val) {
      this.cursefrom.end_time = val
    },
    getAnswerUser() {
      getAnswerUser().then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.teacherID = rep.data
        }
      })
    },
    getComplains(id) {
      complainDetails({ id: id }).then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.Details = rep.data
        }
      })
    },
    lookmove(row) {
      this.getComplains(row.id)
      this.modal0 = true
    },
    seach() {
      this.getData(this.cursefrom)
    },
    seachQ() {
      this.cursefrom.page = 1
      this.cursefrom.limit = 10
      this.cursefrom.answer_type = '';
      this.cursefrom.answer_teacher_id = '';
      this.cursefrom.status = '';
      this.cursefrom.complain_id = '';
      this.getData(this.cursefrom)
    }
  },
  mounted() {
    this.getData(this.cursefrom)
    this.getcomplain()
    this.getAnswerUser()
  }
}
</script>

<style lang="less" scoped>
.example {
  font-family: "Microsoft YaHei";
  font-size: 15px;
  font-weight: 600;
}

.tuer {
  display: flex;
  justify-content: left;
  flex-wrap: wrap;
}
.Icontent {
  width: 700px;
  display: flex;
  margin-top: 20px;
  margin-right: 100px;
  margin-left: 20px;
  justify-content: left;
  color: red;
}

.demo {
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
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  margin: 15px;
}
.demo-upload {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}
.demo:hover .demo-upload {
  display: block;
}
.imgs {
  width: 60px;
  height: 60px;
}
.content {
  width: 400px;
  margin: 10px 50px 0 20px;
}
</style>
