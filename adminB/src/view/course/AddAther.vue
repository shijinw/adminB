<template>
  <div>
    <Card>
      <p slot="title">添加课程包</p>
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <Row>
          <Col :span="12">
            <FormItem label="课程名" prop="name">
              <Input v-model="formValidate.name" type="text" placeholder="课程标题名"></Input>
              <p
                style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;"
              >提示：课程标题名</p>
            </FormItem>
          </Col>
          <Col :span="12">
            <FormItem label="项目专业" prop="project_id">
              <Cascader :data="list" v-model="valueList" change-on-select placeholder="项目/专业"></Cascader>
              <p
                style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;"
              >提示：选择项目 and 专业</p>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col :span="12">
            <FormItem label="分类标签" prop="class_id">
              <Select v-model="formValidate.class_id" clearable placeholder="标签">
                <Option
                  v-for="item in TagsList"
                  :value="item.id"
                  :key="item.id"
                >{{ item.class_name }}</Option>
              </Select>
              <p
                style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;"
              >提示：选择分类标签</p>
            </FormItem>
          </Col>
          <Col :span="12">
            <FormItem label="选择机构" prop="org_id">
              <Select v-model="formValidate.org_id" clearable placeholder="所属机构">
                <Option v-for="item in orgList" :value="item.id" :key="item.id">{{ item.org_name }}</Option>
              </Select>
              <p
                style="padding-top: 8px; font-size: 12px; color: #999; line-height: nvbormal;"
              >提示：选择所属机构</p>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col :span="12">
            <FormItem label="关课方式" prop="view_class">
              <Select v-model="formValidate.view_class" clearable placeholder="关课方式">
                <Option v-for="item in tagsList" :value="item.id" :key="item.id">{{ item.name }}</Option>
              </Select>
              <p
                style="padding-top: 8px; font-size: 12px; color: #999; line-height: nvbormal;"
              >提示：选择关闭课程的方式</p>
            </FormItem>
          </Col>
          <Col :span="12">
            <FormItem label="学习天数" prop="study_days">
              <Input
                type="number"
                v-model="formValidate.study_days"
                placeholder="学习天数"
                clearable
                style="width: 300px"
                v-if="moddle.courseTwo"
              />
              <DatePicker
                type="date"
                v-model="formValidate.study_days"
                placeholder="关课日期"
                style="width: 300px"
                @on-change="courseDate"
                v-if="moddle.courseOne"
              ></DatePicker>
              <p
                style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;"
                v-if="moddle.courseTwo"
              >提示：调整课程的学习天数</p>
              <p
                style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;"
                v-if="moddle.courseOne"
              >提示：调整课程的关课日期</p>
            </FormItem>
          </Col>
        </Row>

        <Row>
          <Col :span="12">
            <FormItem label="选择讲师" prop="teacher_name">
              <Input
                placeholder="选择讲师"
                v-model="formValidate.teacher_name"
                readonly
                style="width: 230px"
              />
              <Button type="info" @click="thers">选择</Button>
              <p
                style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;"
              >提示：选择主讲老师</p>
            </FormItem>
          </Col>
          <Col :span="12">
            <FormItem label="参与人数" prop="join_num">
              <Input v-model="formValidate.join_num" type="number" placeholder="参与人数"></Input>
              <p
                style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;"
              >提示：输入参与人数</p>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col :span="12">
            <FormItem label="播放次数" prop="play_num">
              <Input v-model="formValidate.play_num" type="number" placeholder="播放次数"></Input>
              <p
                style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;"
              >提示：输入播放次数</p>
            </FormItem>
          </Col>
          <Col :span="12">
            <FormItem label="课程价格" prop="price">
              <Input
                type="number"
                v-model="formValidate.price"
                placeholder="输入课程价格"
                clearable
                style="width: 300px"
              />
              <p
                style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;"
              >提示：调整该课程的价格</p>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col :span="12">
            <FormItem label="列表排序" prop="sort">
              <Input
                type="number"
                v-model="formValidate.sort"
                placeholder="输入排序位置"
                clearable
                style="width: 300px"
              />
              <p
                style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;"
              >提示：可调整改课程包的位置</p>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col :span="12">
            <FormItem label="是否正课" prop="is_zheng">
              <RadioGroup v-model="formValidate.is_zheng" style="margin-left:30px">
                <Radio :label="1">正课</Radio>
                <Radio :label="2">非正课</Radio>
              </RadioGroup>
              <p
                style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;"
              >提示：课程包是否正课</p>
            </FormItem>
          </Col>
          <Col :span="12">
            <FormItem label="计费方式" prop="billing_status">
              <RadioGroup v-model="formValidate.billing_status" style="margin-left:10px">
                <Radio :label="1">免费</Radio>
                <Radio :label="2">收费</Radio>
                <Radio :label="3">按积分越换</Radio>
                <Radio :label="4">按等级进入</Radio>
              </RadioGroup>
              <p
                style="padding-top: 8px; font-size: 12px; color: #999; line-height: nvbormal;"
              >提示：选择该课程是否为收费课程</p>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col :span="12">
            <FormItem label="是否报名" prop="is_sign">
              <RadioGroup v-model="formValidate.is_sign" style="margin-left:30px">
                <Radio :label="1">允许</Radio>
                <Radio :label="2">不允许</Radio>
              </RadioGroup>
              <p
                style="padding-top: 8px; font-size:
               12px; color: #999; line-height: nvbormal;"
              >提示：选择该课程是否可报名</p>
            </FormItem>
          </Col>
          <Col :span="12">
            <FormItem label="VIP题库" prop="vip_bank">
              <RadioGroup v-model="formValidate.vip_bank">
                <Radio :label="1">是</Radio>
                <Radio :label="2">不是</Radio>
              </RadioGroup>
              <p
                style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;"
              >提示：选择该课程是否有VIP题库</p>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col :span="12">
            <FormItem label="在线答疑" prop="line_answer">
              <RadioGroup v-model="formValidate.line_answer">
                <Radio :label="1">是</Radio>
                <Radio :label="2">不是</Radio>
              </RadioGroup>
              <p
                style="padding-top: 8px; font-size: 12px; color: #999; line-height: nvbormal;"
              >提示：选择该课程是否有在线答疑</p>
            </FormItem>
          </Col>
          <Col :span="12">
            <FormItem label="翻转课堂" prop="is_overclass">
              <RadioGroup v-model="formValidate.is_overclass">
                <Radio :label="1">是</Radio>
                <Radio :label="2">不是</Radio>
              </RadioGroup>
              <p
                style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;"
              >提示：选择该课程是否是翻转课堂</p>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col :span="12">
            <FormItem label="VIP视频" prop="vip_video">
              <RadioGroup v-model="formValidate.vip_video">
                <Radio :label="1">是</Radio>
                <Radio :label="2">不是</Radio>
              </RadioGroup>
              <p
                style="padding-top: 8px; font-size: 12px; color: #999; line-height: nvbormal;"
              >提示：选择该课程是否为VIP课程</p>
            </FormItem>
          </Col>
          <Col :span="12">
            <FormItem label="课程支付类型" prop="package_type" :label-width="100">
              <RadioGroup v-model="formValidate.package_type">
                <Radio :label="1">正常课程</Radio>
                <Radio :label="2">京东支付课程</Radio>
              </RadioGroup>
              <p
                style="padding-top: 8px; font-size: 12px; color: #999; line-height: nvbormal;"
              >提示：选择该课程包类型是否京东支付</p>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <FormItem label="课程描述" prop="description">
            <Input
              v-model="formValidate.description"
              type="textarea"
              :autosize="{minRows: 3,maxRows: 10}"
              placeholder="简介..."
            ></Input>
            <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：课程描述</p>
          </FormItem>
        </Row>
        <Row>
          <Col :span="12">
            <FormItem label="PC封面" prop="pc_img">
              <MyImages :loadList.sync="formValidate.pc_img"></MyImages>
              <p
                style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;"
              >提示：图片比例暂未定义</p>
            </FormItem>
          </Col>
          <Col :span="12">
            <FormItem label="APP封面" prop="app_img">
              <MyImages :loadList.sync="formValidate.app_img"></MyImages>
            </FormItem>
          </Col>
        </Row>

        <Row>
          <Col :span="12">
            <FormItem label="微信封面" prop="wx_img">
              <MyImages :loadList.sync="formValidate.wx_img"></MyImages>
            </FormItem>
          </Col>
          <Col :span="12">
            <FormItem label="手机封面" prop="mobile_img">
              <MyImages :loadList.sync="formValidate.mobile_img"></MyImages>
            </FormItem>
          </Col>
        </Row>
        <FormItem label="课程简介" prop="brief_img">
          <MyImages :loadList.sync="formValidate.brief_img" :isActive="true"></MyImages>
        </FormItem>
        <FormItem>
          <div style="text-align: right;">
            <Button @click="handleReset('formValidate')">重置</Button>
            <Button
              type="primary"
              @click="handleSubmit('formValidate')"
              style="margin-left: 8px"
            >添 加 课 程</Button>
          </div>
        </FormItem>
      </Form>
    </Card>
    <Modal v-model="modal" draggable scrollable title="课程排序" :width="800" :footer-hide="true">
      <div>
        <Table
          stripe
          size="small"
          :columns="columns1"
          :data="teacherList"
          @on-selection-change="selecs"
        ></Table>
      </div>
      <Button type="primary" @click="OK">确定选择</Button>
    </Modal>
  </div>
</template>

<script>
import {
  addPackage,
  getPackage,
  orgList,
  addCourse,
  putPackage,
  getCourse
} from "@/api/course";
import { proMjor2tree } from "@/api/Linkmenu";
import { mapMutations } from "vuex";
import { labelList } from "@/api/tags";
import { teacherList } from "@/api/teacher";
import Fomat from "@/libs/fomat";
import config from "@/config";
import MyImages from "../components/Images/MastImage";

export default {
  data() {
    return {
      uplodapath: "/upload/Index/uploadImage",
      visible: false,
      modal: false,
      parmsid: [],
      show: true,
      count: "添加课程",
      timer: null,
      ther: [],
      Ather: [],
      Audios: [],
      uploadList: [],
      uploadList2: [],
      uploadList3: [],
      uploadList4: [],
      uploadList5: [],
      TagsList: "",
      moddle: {
        courseOne: false,
        courseTwo: true
      },
      imgUrl: "",
      tagsList: [
        {
          id: 1,
          name: "固定日期关课"
        },
        {
          id: 2,
          name: "按照学习天数关课"
        }
      ],

      list: [],
      valueList: [],
      orgList: [],
      teacherList: [],
      formValidate: {
        teacher_name: "",
        view_class: 2,
        id: "",
        name: "",
        play_num: "",
        project_id: "",
        major_id: "",
        org_id: "",
        teacher_id: "",
        description: "",
        status: "",
        study_days: "",
        brief_img: "",
        study_date: "",
        pc_img: "",
        app_img: "",
        wx_img: "",
        mobile_img: "",
        billing_status: "",
        sort: "",
        join_num: "",
        price: "",
        is_sign: "",
        is_zheng: "",
        vip_video: "",
        vip_bank: "",
        line_answer: "",
        is_overclass: "",
        package_type: ""
      },
      columns1: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "ID",
          key: "id"
        },
        {
          title: "姓名",
          key: "name"
        },
        {
          title: "专业",
          key: "title"
        }
      ],
      ruleValidate: {
        name: [
          {
            required: true,
            validator: Fomat.Rules.Verifiy().elegan
          }
        ],
        project_id: [
          {
            required: true,
            validator: Fomat.Rules.Verifiy().Required,
            trigger: "change"
          }
        ],
        view_class: [
          {
            required: true,
            validator: Fomat.Rules.Verifiy().Required
          }
        ],
        org_id: [
          {
            required: true,
            validator: Fomat.Rules.Verifiy().Required,
            trigger: "change"
          }
        ],
        line_answer: [
          {
            required: true,
            validator: Fomat.Rules.Verifiy().Required,
            trigger: "change"
          }
        ],
        is_overclass: [
          {
            required: true,
            validator: Fomat.Rules.Verifiy().Required,
            trigger: "change"
          }
        ],
        teacher_name: [
          {
            required: true,
            validator: Fomat.Rules.Verifiy().Required,
            trigger: "change"
          }
        ],
        package_type: [
          {
            required: true,
            validator: Fomat.Rules.Verifiy().Required,
            trigger: "change"
          }
        ],
        description: [
          {
            required: true,
            validator: Fomat.Rules.Verifiy().Required,
            trigger: "blur"
          }
        ],

        status: [
          {
            required: true,
            validator: Fomat.Rules.Verifiy().Required,
            trigger: "change"
          }
        ],
        class_id: [{ required: true, message: "请选择标签内容" }],
        brief_img: [
          { required: true, validator: Fomat.Rules.Verifiy().Required }
        ],
        join_num: [
          {
            required: true,
            validator: Fomat.Rules.Verifiy().Required,
            trigger: "change"
          }
        ],
        vip_video: [
          {
            required: true,
            validator: Fomat.Rules.Verifiy().Required,
            trigger: "change"
          }
        ],
        vip_bank: [
          {
            required: true,
            validator: Fomat.Rules.Verifiy().Required,
            trigger: "change"
          }
        ],
        play_num: [
          { required: true, validator: Fomat.Rules.Verifiy().Required }
        ],
        app_img: [
          { required: true, validator: Fomat.Rules.Verifiy().Required }
        ],
        pc_img: [{ required: true, message: "请选择上传图片" }],
        wx_img: [{ required: true, validator: Fomat.Rules.Verifiy().Required }],
        mobile_img: [
          { required: true, validator: Fomat.Rules.Verifiy().Required }
        ],
        study_days: [
          {
            required: true,
            validator: Fomat.Rules.Verifiy().Required
          }
        ],

        billing_status: [
          {
            required: true,
            validator: Fomat.Rules.Verifiy().Required,
            trigger: "change"
          }
        ],
        price: [
          {
            required: true,
            validator: Fomat.Rules.Verifiy().Required,
            trigger: "blur"
          }
        ],
        is_sign: [
          {
            required: true,
            validator: Fomat.Rules.Verifiy().Required,
            trigger: "change"
          }
        ],
        sort: [
          {
            required: true,
            validator: Fomat.Rules.Verifiy().Required,
            trigger: "blur"
          }
        ],

        is_zheng: [
          {
            required: true,
            validator: Fomat.Rules.Verifiy().Required,
            trigger: "change"
          }
        ]
      }
    };
  },
  components: {
    // 引入组件
    MyImages
  },
  watch: {
    valueList(newValue, oldValue) {
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
    "formValidate.view_class"(newValue, oldValue) {
      if (newValue === 1) {
        this.moddle.courseOne = true;
        this.moddle.courseTwo = false;
      } else if (newValue === 2) {
        this.moddle.courseOne = false;
        this.moddle.courseTwo = true;
      }
    }
  },
  methods: {
    ...mapMutations(["addTag", "closeTag"]),
    getProMajList() {
      proMjor2tree().then(res => {
        let rep = res.data;
        if (rep.code === 200) {
          this.list = rep.data;
        }
      });
    },
    courseDate(val) {
      this.formValidate.study_date = val;
    },

    handleBeforeUpload() {
      console.log("准备上传");
    },
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          addPackage(this.formValidate).then(res => {
            if (res.data.code === 200) {
              this.getCode();
              this.$Message.success("添加成功!");
              this.$router.push({ name: "courses" });
            }
          });
        } else {
          this.$Message.error("请认真填写信息!");
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    },
    getCode() {
      const TIME_COUNT = 30;
      if (!this.timer) {
        this.count = TIME_COUNT;
        this.show = false;
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--;
          } else {
            this.show = true;
            clearInterval(this.timer);
            this.timer = null;
          }
        }, 1000);
      }
    },
    getOrgList() {
      orgList().then(res => {
        let rep = res.data;
        if (rep.code === 200) {
          this.orgList = rep.data;
        }
      });
    },

    thers() {
      this.modal = true;
    },
    selecs(e) {
      this.Audios = e;
    },
    OK() {
      this.modal = false;
      if (this.Audios.length !== 0) {
        let arr = [];
        let str = [];
        this.Audios.forEach(item => {
          arr.push(item.id);
          str.push(item.name);
        });
        this.formValidate.teacher_id = arr.join(",");
        this.formValidate.teacher_name = str.join(",");
      }
      // let { objData } = this.$refs.tables
      // let arr = []
      // let str = []
      // for (let item in objData) {
      //   console.log(objData[item])
      //   if (objData[item]._isChecked === true) {
      //     arr.push(objData[item].id)
      //     str.push(objData[item].name)
      //   }

      //   this.formValidate.teacher_id = arr.join(',')
      //   this.formValidate.teacher_name = str.join(',')
      // }
    },
    // 获取关课方式
    getList(obj) {
      labelList(obj).then(res => {
        let rep = res.data;
        if (rep.code === 200) {
          this.TagsList = rep.data;
        }
      });
    },
    // 获取教师
    getTeacherList(obj) {
      teacherList(obj).then(res => {
        let rep = res.data;
        if (rep.code === 200) {
          this.teacherList = rep.data.data;
          rep.data.data.forEach(item => {
            let obj = {};
            obj.id = item.id;
            obj.name = item.name;
            obj.cheack = false;
            this.Ather.push(obj);
          });
        }
      });
    }
  },
  mounted() {
    if (process.env.NODE_ENV === "production") {
      switch (document.domain) {
        case "dests.youcaiwx.cn":
          this.uplodapath = `${config.baseUrl.test}/upload/Index/uploadImage`;
          break;
        case "ycdb.youcaiwx.cn":
          this.uplodapath = `${config.baseUrl.pro}/upload/Index/uploadImage`;
          break;
        default:
          this.uplodapath = "/upload/Index/uploadImage";
          break;
      }
    } else {
      this.uplodapath = "/upload/Index/uploadImage";
    }
    this.getList({ status: "", class_name: "" });
    this.getProMajList();
    this.getOrgList();
    this.getTeacherList({
      page: 1,
      limit: 10000,
      name: "",
      teacher_title_id: ""
    });
  }
};
</script>

<style lang="less">
.jianjie .demo-upload-list {
  width: 520px !important;
  height: 360px !important;
  line-height: 360px !important;
}
.course_img .demo-upload-list {
  display: inline-block;
  width: 180px;
  height: 100px;
  text-align: center;
  line-height: 100px;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  margin-right: 4px;
}
.course_img .demo-upload-list img {
  width: 100%;
}
.course_img .demo-upload-list-cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}
.course_img .demo-upload-list:hover .demo-upload-list-cover {
  display: block;
}
.course_img .demo-upload-list-cover i {
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  margin: 0 2px;
}
</style>
