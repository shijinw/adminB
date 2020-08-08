<template>
  <div>
    <Card>
      <p slot="title">试题列表</p>
      <div style="display: flex;flex-wrap: wrap; align-items: center;">
        <Button type="default" shape="circle" icon="md-sync" @click="seachNow('formValidate')"></Button>
        <Divider type="vertical" />
        <Cascader
          :data="list"
          v-model="valueList"
          style="width:330px; display: inline-block;"
          placeholder="项目/专业/课程"
        ></Cascader>
        <Divider type="vertical" />
        <Cascader
          :data="listKnob"
          v-model="valueListKnob"
          change-on-select
          style="width:230px; display: inline-block;"
          placeholder="知识点章/知识点节"
        ></Cascader>
        <Divider type="vertical" />
        <Select
          v-model="formValidate.question_type"
          clearable
          style="width:90px"
          placeholder="题目类型"
        >
          <Option v-for="item in formatFile" :value="item.id" :key="item.id">
            {{
            item.name
            }}
          </Option>
        </Select>
        <Divider type="vertical" />
        <Input v-model="formValidate.id" placeholder="题目ID" style="width:70px" />
        <Divider type="vertical" />
        <Input v-model="formValidate.remark" placeholder="备注" style="width: 60px" />
        <Divider type="vertical" />
        <Input v-model="formValidate.question_keyword" placeholder="题干内容" style="width: 75px" />
        </div>
        <div>
        <Select
          v-model="formValidate.admin_id"
          clearable
          style="width:90px;margin-top:15px;margin-left:50px"
          placeholder="教研老师"
        >
          <Option v-for="item in teaching" :value="item.id" :key="item.id">
            {{
            item.truename
            }}
          </Option>
        </Select>
        <Divider type="vertical" />
        <Select
          v-model="formValidate.plate_id"
          clearable
          style="width:90px;margin-top:15px"
          placeholder="板块名"
        >
          <Option v-for="item in Plate" :value="item.id" :key="item.id">
            {{
            item.plate_name
            }}
          </Option>
        </Select>
        <Divider type="vertical" />
      
      
        <Button type="primary" @click="seach('formValidate')" style="margin-left: 50px;margin-top:15px">搜索</Button>
  </div>
      
      <Divider />
      <Table stripe size="small" :columns="columns" :data="data" ref="scrall"></Table>

      <div style="padding: 20px 0; text-align: right;">
        <Page
          :total="total"
          @on-change="onChange"
          @on-page-size-change="onPageSizeChange"
          :current="formValidate.page"
          :page-size="formValidate.limit"
          size="small"
          show-total
          show-elevator
          show-sizer
        />
      </div>
    </Card>
     <!-- 题库答疑列表 -->
    <Modal v-model="Answerlsit" mask title="查看题库答疑列表" :width="1300" footer-hide>
      <div style="display: flex;flex-wrap: wrap;width: 100%;align-items: center;">
        <Button type="default" shape="circle" icon="md-sync" @click="seachNow('cursefrom')"></Button>
        <Divider type="vertical" />
        <Input v-model="cursefrom.question_id" placeholder="题库ID" style="width: 3.2rem" />
        <Divider type="vertical" />
        <Input v-model="cursefrom.answer_id" placeholder="答疑ID" style="width:3.2rem" />
        <Divider type="vertical" />
        <DatePicker
          type="date"
          @on-change="getStime"
          format="yyyy-MM-dd"
          placeholder="开始时间"
          style="width: 5.5rem"
        ></DatePicker>
        <Divider type="vertical" />
        <DatePicker
          type="date"
          @on-change="getEtime"
          format="yyyy-MM-dd"
          placeholder="结束时间"
          style="width: 5.5rem"
        ></DatePicker>
        <Divider type="vertical" />
        <Input v-model="cursefrom.reply_quiz" placeholder="回复内容" style="width: 10.5rem" />
        <Divider type="vertical" />
        <Input v-model="cursefrom.quiz" placeholder="提问内容" style="width: 10.5rem" />
        <Divider type="vertical" />
        <Select v-model="cursefrom.reply_user_id" clearable placeholder="回复老师" style="width:5.2rem">
          <Option v-for="item in teacherList" :value="item.id" :key="item.id">
            {{
            item.truename
            }}
          </Option>
        </Select>
        <Divider type="vertical" />
        <Select v-model="cursefrom.is_elite" clearable placeholder="是否精华" style="width:5.5rem">
          <Option v-for="item in Stick" :value="item.id" :key="item.id">
            {{
            item.name
            }}
          </Option>
        </Select>
        <Divider type="vertical" />
        <Select v-model="cursefrom.is_stick" clearable placeholder="是否置顶" style="width:5.2rem">
          <Option v-for="item in Elite" :value="item.id" :key="item.id">
            {{
            item.name
            }}
          </Option>
        </Select>
        <Divider type="vertical" />
        <Button type="primary" @click="seach('cursefrom')" style="margin-right: 5px;">筛选</Button>
      </div>
      <Divider />
      <Table stripe size="small" :columns="Answercolumns" :data="AnswerData"></Table>

      <div style="padding: 20px 0; text-align: right;">
        <Page
          :total="Answertotal"
          @on-change="AnsweronChange"
          @on-page-size-change="AnsweronPageSizeChange"
          :current="cursefrom.page"
          :page-size="cursefrom.limit"
          size="small"
          show-total
          show-elevator
          show-sizer
        />
      </div>
    </Modal>

    <!-- 查看答疑 -->
    <Modal v-model="modal1"
           mask
           title="查看答疑内容"
           :width="600" footer-hide @on-visible-change="changeTag">
      <div >
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
               v-if="fromData.question_info.question_type===1?true:false"
               style="width:92%"><strong class="example">选项答案 </strong>
            <p :style="fromData.question_info.true_options==='A'?isactive:isActive"><strong class="example">A :</strong>{{fromData.question_info.option_a}}</p>

            <p :style="fromData.question_info.true_options==='B'?isactive:isActive"><strong class="example">B :</strong>{{fromData.question_info.option_b}}</p>

            <p :style="fromData.question_info.true_options==='C'?isactive:isActive"><strong class="example">C :</strong>{{fromData.question_info.option_c}}</p>

            <p :style="fromData.question_info.true_options==='D'?isactive:isActive"><strong class="example">D :</strong>{{fromData.question_info.option_d}}</p>
          </div>
          <div class="content"
               v-if="fromData.question_info.question_type===1?true:false"
               style="width:92%"><strong class="example">正确选项 ：{{fromData.question_info.true_options}}</strong></div>
          <div class="content"
               style="width:92%"><strong class="example">题目难度 ：{{fromData.difficulty}}</strong></div>
          <div class="content"
               style="width:92%;"><strong class="example"> 题目解析 ：</strong>
            <p style="overflow: hidden;white-space: pre-wrap;">{{fromData.question_info.analysis}}</p>
            <img v-if="fromData.question_info.analysis_img"
                 style="width:100px;height:120px"
                 :src="fromData.question_info.analysis_img"></img>
          </div>

          <div class="content"
               style="width:92%;">
            <p style="overflow: hidden;white-space: pre-wrap;">{{fromData.question_info.analysis_one}}</p>
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
           <div style="text-align: center;;">
            <Checkbox
              label="置顶"
              border
              style="background: #3ddef3"
              v-model="AnswerElitefrom.is_stick"
            >置顶</Checkbox>
            <Checkbox
              label="推荐"
              border
              style="margin-left:10px;background: #3ddef3"
              v-model="AnswerElitefrom.is_elite"
            >精华</Checkbox>
          </div>
      </div>
      
    </Modal>
    <Modal class="modal"
           title="查看图片"
           v-model="visible">
      <img :src="imageUrl"
           v-if="visible"
           style="width: 100%">
    </Modal>
  </div>
</template>

<script>
import {  teaching, getPlate } from "@/api/question";
import Fomat from "@/libs/fomat";
import { getAnswerUser, queAnswerList,lookQueAnswer,putAnswerJhZd,delQueAnswer,answerQueList } from "@/api/Answer";
import { zkProMjorCou3tree, knob2Tree, knobKnow3Tree } from "@/api/Linkmenu";
import { labelList } from "@/api/tags";
import { mapMutations } from "vuex";
import Imagen from "../components/creates/Imagen.vue";
import texts from "../components/creates/texts.vue";
export default {
  data() {
    return {
      data: [],
      listKnob: [],
      valueListKnob: [],
      list: [],
      teaching: [],
      Acolor: "",
      modal0: false,
      Answerlsit: false,
      starttime: "",
      endtime: "",
      tagsList: [],
        AnswerElitefrom: {
        answer_type: "",
        answer_id: "",
        is_elite: false,
        is_stick: false
      },
        isactive: {
        marginLeft: '20px',
        color: 'green'
      },
      isActive: {
        marginLeft: '20px'
      },
      visible:false,
      modalA: false,
      Auth: {
        right: [],
        top: []
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
      Elite: [
        { id: 1, name: "置顶" },
        { id: 2, name: "不置顶" }
      ],
      Stick: [
        { id: 1, name: "精华" },
        { id: 2, name: "非精华" }
      ],
      Answertotal: 0,
      teacherList: [],
      Answercolumns: [
        {
          title: "ID",
          key: "id",
          minWidth: 60
        },
 {
          title: "是否精华",
          key: "is_elite",
          minWidth: 90,
          tooltip: true,
          render: (h, params) => {
            let text = "";
            let color = "";
            if (params.row.is_elite === 1) {
              text = "精华";
              color = "green";
            } else  {
              text = "非精华";
              color = "red";
            } 
            return h("div", [
              h(
                "span",
                {
                  style: {
                    color: color
                  }
                },
                text
              )
            ]);
          }
        },
            {
          title: "是否置顶",
          key: "is_stick",
          minWidth: 90,
          tooltip: true,
          render: (h, params) => {
            let text = "";
            let color = "";
            if (params.row.is_stick === 1) {
              text = "置顶";
              color = "green";
            } else  {
              text = "非置顶";
              color = "red";
            } 
            return h("div", [
              h(
                "span",
                {
                  style: {
                    color: color
                  }
                },
                text
              )
            ]);
          }
        },
        {
          title: "手机号",
          key: "mobile",
          minWidth: 100,
          tooltip: true
        },
        {
          title: "提问问题",
          key: "quiz",
          minWidth: 100,
          tooltip: true,
          align: "center"
        },

        {
          title: "答疑状态",
          key: "lock_que",
          minWidth: 90,
          tooltip: true,
          render: (h, params) => {
            let text = "";
            let color = "";
            if (params.row.reply_status === 2) {
              if (params.row.lock_que === 1) {
                text = "正在答疑";
                color = "#019beb";
              } else {
                text = "无人答疑";
                color = "red";
              }
            } else if (params.row.z_reply_status === 2) {
              if (params.row.lock_que === 1) {
                text = "正在答疑";
                color = "#019beb";
              } else {
                text = "无人答疑";
                color = "red";
              }
            } else {
              text = "答疑完成";
              color = "#000";
            }
            return h("div", [
              h(
                "span",
                {
                  style: {
                    color: color
                  }
                },
                text
              )
            ]);
          }
        },
        {
          title: "回复人",
          key: "reply_user_name",
          minWidth: 80,
          tooltip: true,
          align: "center"
        },
        {
          title: "回复时间",
          key: "reply_time",
          minWidth: 100,
          tooltip: true,
          align: "center"
        },
        

        {
          title: "操作",
          key: "is_addkonw",
          minWidth: 310,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "info",
                    size: "small"
                  },
                  style: {
                    marginRight: "10px"
                  },
                  on: {
                    click: () => {
                      this.lookKnow(params.row);
                    }
                  }
                },
                "查看答疑"
              ),
                h(
                "Button",
                {
                  props: {
                    type: "warning",
                    size: "small"
                  },
                  style: {
                    marginRight: "10px"
                  },
                  on: {
                    click: () => {
                      this.PutAnswer(params.row);
                    }
                  }
                },
                "修改"
              ),
                h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  style: {
                    marginRight: "10px"
                  },
                  on: {
                    click: () => {
                      this.RemoveAnswer(params.row);
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      AnswerData: [],
      cursefrom: {
        limit: 10,
        page: 1,
        answer_id: "",
        reply_quiz: "",
        quiz: "",
        reply_user_id: "",
        start_time: "",
        end_time: "",
        question_id: "",
        is_elite: "",
        is_stick: "",
        reply_status: 1
      },
      Status: [
        { id: 1, name: "有效" },
        { id: 2, name: "无效" }
      ],
      valueList: [],
      knoblist: [],
      valueList2: [],
      valueList3: [],
      formatkeat: [
        {
          id: 1,
          name: "有效"
        },
        {
          id: 2,
          name: "无效"
        }
      ],
      formatFile: [
        {
          id: 1,
          name: "单选 "
        },
        {
          id: 2,
          name: "论述题"
        }
      ],
      total: 0,
      columns: [
        {
          title: "试题ID",
          key: "id",
          minWidth: 60
        },

        {
          title: "课程名称",
          key: "course_name",
          minWidth: 100,
          tooltip: true
        },
        {
          title: "题干关键字",
          key: "question_keyword",
          minWidth: 110,
          tooltip: true
        },
        {
          title: "知识点",
          key: "know_name",
          minWidth: 80,
          tooltip: true
        },
        {
          title: "试题类型",
          key: "question_type",
          minWidth: 90,
          tooltip: true,
          align:'center',
          render: (h, params) => {
            let text = "";
            let color = "";
            if (params.row.question_type === 1) {
              text = "单选";
              color = "#019beb";
            } else {
              text = "论述题";
              color = "red";
            }
            return h("div", [
              h(
                "span",
                {
                  style: {
                    color: color
                  }
                },
                text
              )
            ]);
          }
        },
       {
          title: "答疑数量",
          key: "answer_num",
          minWidth: 90,
          align:'center'
        },
        {
          title: "备注",
          key: "remark",
          minWidth: 110
        },
        {
          title: "操作",
          key: "is_addkonw",
          minWidth: 160,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "info",
                    size: "small"
                  },
                  style: {
                    marginRight: "10px"
                  },
                  on: {
                    click: () => {
                      this.analysis(params.row);
                    }
                  }
                },
                "查看全部答疑列表"
              )
            ]);
          }
        }
      ],
      modal: false,
      modal1: false,
      items: [],
      title: "",
      Plate: [],
      type: 1,
      daolist: {
        project_id: "",
        course_id: "",
        know_id: "",
        major_id: "",
        section_id: "",
        knob_id: "",
        admin_id: "",
        DvalueList: [],
        Dvalue: [],
        question_type: "",
        plate_id: ""
      },
      formValidate: {
        page: 1,
        limit: 10,
        id: "",
        project_id: "",
        course_id: "",
        know_id: "",
        section_id: "",
        knob_id: "",
        admin_id: "",
        class_id: "",
        question_type: "",
        status: "",
        question_stem: "",
        question_keyword: "",
        remark: ""
      },
      Analysis: {
        Option: [],
        know_id: "",
        class_id: "",
        question_type: "",
        status: "",
        question_stem: "",
        question_keyword: "",
        true_options: "",
        analysis: "",
        analysis_img: "",
        analysis_one: "",
        analysis_img_one: ""
      },
      ruenDao: {
        DvalueList: [
          { required: true, validator: Fomat.Rules.Verifiy().Build }
        ],

        Dvalue: [
          {
            required: true,
            validator: Fomat.Rules.Verifiy().Required,
            trigger: "change"
          }
        ],

        question_type: [
          {
            required: true,
            validator: Fomat.Rules.Verifiy().Required,
            trigger: "blur"
          }
        ],
        admin_id: [
          {
            required: true,
            validator: Fomat.Rules.Verifiy().Required,
            trigger: "blur"
          }
        ]
      },
      ruleValidate: {
        video_name: [
          {
            required: true,
            validator: Fomat.Rules.Verifiy().Required,
            trigger: "blur"
          }
        ],
        project_id: [
          {
            required: true,
            validator: Fomat.Rules.Verifiy().Required,
            trigger: "change"
          }
        ],
        class_id: [
          {
            required: true,
            validator: Fomat.Rules.Verifiy().Required,
            trigger: "change"
          }
        ],
        VideoId: [
          {
            required: true,
            validator: Fomat.Rules.Verifiy().Required,
            trigger: "blur"
          }
        ],
        video_time: [
          {
            required: true,
            validator: Fomat.Rules.Verifiy().Required,
            trigger: "blur"
          }
        ]
      },
      form: {
        page: 1,
        limit: 10,
        project_id: "",
        major_id: "",
        know_id: "",
        question_type: "",
        status: 1,
        id: "",
        question_stem: ""
      },
      row: null,
      knowLsit: [],
      targetKeys: [],
      listStyle: {
        width: "300px",
        height: "500px"
      }
    };
  },
  components: {
    Imagen,
    texts
  },
  watch: {
    valueList(newValue, oldValue) {
      if (newValue.length === 1) {
        this.formValidate.project_id = newValue[0];
        this.formValidate.major_id = "";
        this.formValidate.course_id = "";
      } else if (newValue.length === 2) {
        this.formValidate.project_id = newValue[0];
        this.formValidate.major_id = newValue[1];
        this.formValidate.course_id = "";
      } else if (newValue.length === 3) {
        this.formValidate.project_id = newValue[0];
        this.formValidate.major_id = newValue[1];
        this.formValidate.course_id = newValue[2];
        this.formValidate.section_id = "";
        this.formValidate.knob_id = "";
        this.valueListKnob = [];
        this.getProMajLists(newValue[2]);
      }
    },
    "daolist.DvalueList"(newValue, oldValue) {
      if (newValue.length === 1) {
        this.daolist.project_id = newValue[0];
        this.daolist.major_id = "";
        this.daolist.course_id = "";
      } else if (newValue.length === 2) {
        this.daolist.project_id = newValue[0];
        this.daolist.major_id = newValue[1];
        this.daolist.course_id = "";
      } else if (newValue.length === 3) {
        this.daolist.project_id = newValue[0];
        this.daolist.major_id = newValue[1];
        this.daolist.course_id = newValue[2];
        this.daolist.section_id = "";
        this.daolist.knob_id = "";
        this.daolist.know_id = "";
        this.daolist.Dvalue = [];
        this.getProMajLists(newValue[2]);
      }
    },
    "daolist.Dvalue"(newValue, oldValue) {
      if (newValue.length === 0) {
        this.daolist.section_id = "";
        this.daolist.knob_id = "";
      } else if (newValue.length === 1) {
        this.daolist.section_id = newValue[0];
        this.daolist.knob_id = "";
      } else if (newValue.length === 2) {
        this.daolist.section_id = newValue[0];
        this.daolist.knob_id = newValue[1];
      }
    },
    valueList2(newValue, oldValue) {
      if (newValue.length === 0) {
        this.formValidate.project_id = "";
        this.formValidate.major_id = "";
      } else if (newValue.length === 1) {
        this.formValidate.project_id = newValue[0];
        this.formValidate.major_id = "";
      } else {
        this.formValidate.project_id = newValue[0];
        this.formValidate.major_id = newValue[1];
      }
    },
    valueListKnob(newValue, oldValue) {
      if (newValue.length === 0) {
        this.formValidate.section_id = "";
        this.formValidate.knob_id = "";
      } else if (newValue.length === 1) {
        this.formValidate.section_id = newValue[0];
        this.formValidate.knob_id = "";
      } else {
        this.formValidate.section_id = newValue[0];
        this.formValidate.knob_id = newValue[1];
      }
    },
    valueList3(newValue, oldValue) {
      if (newValue.length === 0) {
        this.knowForm.project_id = "";
        this.knowForm.major_id = "";
      } else if (newValue.length === 1) {
        this.knowForm.project_id = newValue[0];
        this.knowForm.major_id = "";
      } else {
        this.knowForm.project_id = newValue[0];
        this.knowForm.major_id = newValue[1];
      }
    }
  },
  methods: {
    ...mapMutations(["addTag", "setquestion"]),
    getProMajList() {
      zkProMjorCou3tree().then(res => {
        let rep = res.data;
        if (rep.code === 200) {
          this.list = rep.data;
        }
      });
    },
    getStime(startime) {
      this.cursefrom.start_time = startime;
    },
    getEtime(startime) {
      this.cursefrom.end_time = startime;
    },
    AnsweronChange(val) {
        this.cursefrom.page = val;
    this.getQdata(this.cursefrom);
    },
    AnsweronPageSizeChange(val) {
            this.cursefrom.limit = val;
     this.getQdata(this.cursefrom);
    },
    PutAnswer(row) {
      const route = {
        name: "putQuanter",
        meta: {
          title: `${row.id} - 题库答疑修改`
        },
        query: {
          id: row.id
        }
      };
      this.addTag({
        route: route,
        type: "push"
      });
      this.$router.push(route);
    },
    //删除答疑
    RemoveAnswer(row) {
      delQueAnswer({ id: row.id }).then(res => {
        let rep = res.data;
        if (rep.code === 200) {
          this.$Message.error("本条答疑删除成功！");
          this.getQdata(this.cursefrom);
        }
      });
    },
    seach(name) {
      if(name==='formValidate'){
              this.getData(this.formValidate);
      }else if(name==='cursefrom'){
         this.getQdata(this.cursefrom);
      }
    },
    Export() {
      this.$refs.daolist.resetFields();
      this.daolist.DvalueList = [];
      this.daolist.Dvalue = [];
      this.modal0 = true;
    },
    addKnow() {
      const route = {
        name: "Add_Question",
        meta: {
          title: "添加题库"
        }
      };
      this.addTag({
        route: route,
        type: "push"
      });
      this.$router.push(route);
    },
    handleView(name) {
      this.visible = true
      this.imageUrl = name
    },
    analysis(row) {
      this.Answerlsit = true;
      this.cursefrom.question_id=row.id
      this.getQdata(this.cursefrom);
    },
    seachNow(name) {
     if(name==='formValidate'){
      this.formValidate.page = 1;
      this.formValidate.limit = 10;
      this.formValidate.project_id = "";
      this.formValidate.major_id = "";
      this.formValidate.course_id = "";
      this.formValidate.know_id = "";
      this.formValidate.question_type = "";
      this.formValidate.status = "";
      this.formValidate.id = "";
      this.formValidate.question_stem = "";
      this.valueList = [];
      this.valueListKnob = [];
      this.getData(this.formValidate);
      this.getProMajLists();
     }else if(name==='cursefrom'){
       this.cursefrom.page = 1;
        this.cursefrom.limit = 10;
        this.cursefrom.answer_id = "";
        this.cursefrom.reply_quiz = "";
        this.cursefrom.quiz = "";
        this.cursefrom.reply_user_id = "";
        this.cursefrom.question_id = "";
        this.cursefrom.start_time = "";
        this.cursefrom.end_time = "";
        this.cursefrom.is_elite = "";
        this.cursefrom.is_stick = "";
       this.getQdata(this.cursefrom);
     }
    },
    changeTag(val){
  if (val == false) {
          putAnswerJhZd({
            answer_type: 2,
            answer_id: this.AnswerElitefrom.answer_id,
            is_elite: this.AnswerElitefrom.is_elite ? 1 : 2,
            is_stick: this.AnswerElitefrom.is_stick ? 1 : 2
          }).then(res => {
            let rep = res.data;
            if (rep.code === 200) {
              this.$Message.success("你已修改推荐信息，请注意查看");
              this.getQdata(this.cursefrom);
            }
          });
        
      }
    },
    lookKnow(row) {
      lookQueAnswer({ id: row.id }).then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.fromData = rep.data

          this.AnswerElitefrom.answer_id = rep.data.id;
          this.AnswerElitefrom.is_elite = rep.data.is_elite == 1 ? true : false;
          this.AnswerElitefrom.is_stick = rep.data.is_stick == 1 ? true : false;

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

      this.modal1 = true
    },
    onChange(val) {
      this.formValidate.page = val;
      this.getData(this.formValidate);
    },
    onPageSizeChange(val) {
      this.formValidate.limit = val;
      this.getData(this.formValidate);
    },

    handleReset(name) {
      this.$refs[name].resetFields();
      this.valueList2 = [];
    },
    getProMajLists(id) {
      knob2Tree({ course_id: id || "" }).then(res => {
        let rep = res.data;
        if (rep.code === 200) {
          this.listKnob = rep.data;
        } else if (rep.code === 404) {
          this.listKnob = [];
        }
      });
    },
    getthers() {
      teaching().then(res => {
        let rep = res.data;
        if (rep.code === 200) {
          this.teaching = rep.data;
        }
      });
    },

    getList(obj) {
      labelList(obj).then(res => {
        let rep = res.data;
        if (rep.code === 200) {
          this.tagsList = rep.data;
        }
      });
    },

    getplate() {
      getPlate().then(res => {
        let rep = res.data;
        if (rep.code === 200) {
          this.Plate = rep.data;
        }
      });
    },
    Qchecked(id) {
      knobKnow3Tree({ course_id: id }).then(res => {
        let rep = res.data;
        if (rep.code === 200) {
          this.knoblist = rep.data;
        }
      });
    },

    getData(obj) {
      answerQueList(obj).then(res => {
        let rep = res.data;
        if (rep.code === 200) {
          this.data = rep.data.data;
          this.total = rep.data.total * 1;
        }
      });
    },
    getQdata(obj) {
      queAnswerList(obj).then(res => {
        let rep = res.data;
        if (rep.code === 200) {
          this.AnswerData = rep.data.data;
          this.Answertotal = rep.data.total;
        }
      });
    },
    getThear() {
      getAnswerUser().then(res => {
        let rep = res.data;
        if (rep.code === 200) {
          this.teacherList = rep.data;
        }
      });
    }
  },

  mounted() {
    this.getData(this.formValidate);
    this.getProMajList();
    this.getthers();
    this.getList({ status: "", class_name: "" });
    this.getplate();
    this.getThear();
  }
};
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
  margin-left: 50px;
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
  width: 30rem;
  margin: 10px 50px 10px 20px;
}
</style>
