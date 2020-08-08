<template>
  <div>
    <Card style="width: 100%;">
      <p slot="title">{{ $route.query.title }}</p>
      <Form
        ref="Formlate"
        :model="Formlate"
        :rules="ruleValidate"
        :label-width="80"
      >
        <Row>
          <Col :span="12">
            <FormItem label="预售课程名" :label-width="90" prop="name">
              <Input
                v-model="Formlate.name"
                style="width:210px"
                placeholder="请输入预售课程名"
              ></Input>
              <p
                style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;"
              >
                提示：请输入预售课程名
              </p>
            </FormItem>
          </Col>
          <Col :span="12">
            <FormItem label="CPE积分" :label-width="90" prop="cpe">
              <Input
                v-model="Formlate.cpe"
                type="number"
                style="width:210px"
                placeholder="请输入CPE积分"
              ></Input>
              <p
                style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;"
              >
                提示：请输入CPE积分
              </p>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col :span="12">
            <FormItem
              label="	活动地址"
              :label-width="90"
              prop="activity_address"
            >
              <Input
                v-model="Formlate.activity_address"
                style="width:210px"
                placeholder="请输入活动地址"
              ></Input>
              <p
                style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;"
              >
                提示：请输入活动地址
              </p>
            </FormItem>
          </Col>
          <Col :span="12">
            <FormItem label="报名人数" :label-width="90" prop="people_num">
              <Input
                v-model="Formlate.people_num"
                style="width:210px"
                type="number"
                placeholder="请输入报名人数"
              ></Input>
              <p
                style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;"
              >
                提示：请输入报名人数
              </p>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col :span="12">
            <FormItem label="开始时间" :label-width="90" prop="start_time">
              <DatePicker
                v-model="Formlate.start_time"
                type="datetime"
                placeholder="请输入预售课程开始时间"
                @on-change="starttime"
              ></DatePicker>
              <p
                style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;"
              >
                提示：请输入预售课程开始时间
              </p>
            </FormItem>
          </Col>
          <Col :span="12">
            <FormItem label="结束时间" :label-width="90" prop="end_time">
              <DatePicker
                v-model="Formlate.end_time"
                type="datetime"
                placeholder="请输入预售课程开始时间"
                @on-change="end_time"
              ></DatePicker>
              <p
                style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;"
              >
                提示：请输入预售课程开始时间
              </p>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col :span="12">
            <FormItem label="是否跳转" prop="href_type" :label-width="100">
              <RadioGroup v-model="Formlate.href_type" style="margin-left:10px">
                <Radio :label="1">不跳转</Radio>
                <Radio :label="2">跳转</Radio>
              </RadioGroup>
              <p
                style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;"
              >
                提示：选择是否跳转链接
              </p>
            </FormItem>
          </Col>
          <Col :span="12" v-if="Formlate.href_type === 2 ? true : false">
            <FormItem label="跳转链接" :label-width="90" prop="jump">
              <Input
                v-model="Formlate.jump"
                style="width:210px"
                placeholder="请输入跳转链接"
              ></Input>
              <p
                style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;"
              >
                提示：请输入跳转链接
              </p>
            </FormItem>
          </Col>
        </Row>
        <FormItem label="选择讲师" :label-width="90" prop="teacher_name">
          <Input
            placeholder="选择讲师"
            v-model="Formlate.teacher_name"
            readonly
            style="width: 230px"
          />
          <Button type="info" @click="thers">选择</Button>
          <p
            style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;"
          >
            提示：选择主讲老师
          </p>
        </FormItem>

        <Images ref="content" :titles="'活动内容图'"></Images>

        <Images ref="PCimage" :titles="'pc封面图'"></Images>

        <Images ref="APPimage" :titles="'app封面图'"></Images>
      </Form>
      <div style="text-align: center;">
        <Button @click="handleReset('Formlate')">重置</Button>
        <Button
          type="primary"
          @click="handleSubmit('Formlate')"
          style="margin-left: 8px"
          >提 交</Button
        >
      </div>
    </Card>
    <Modal
      v-model="modal"
      draggable
      scrollable
      title="讲师列表"
      :width="800"
      :footer-hide="true"
    >
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
import { putPreview, addPreview, getPreview } from "@/api/Educode";
import { NewsTypeLevel } from "@/api/Consult";
import Images from "@/view/components/video/image.vue";
import Fomat from "@/libs/fomat";
import { teacherList } from "@/api/teacher";

export default {
  components: {
    Images
  },
  data() {
    return {
      data3: [],
      Ather: "",
      modal: false,
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
      teacherList: [],
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
      grade: [
        {
          id: 1,
          name: "A"
        },
        {
          id: 2,
          name: "B"
        },
        {
          id: 3,
          name: "C"
        }
      ],

      Tagslists: [],

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
      formdata: [],
      valueList: [],

      Formlate: {
        id: "",
        name: "",
        pc_img: "",
        app_img: "",
        jump: "",
        start_time: "",
        href_type: 1,
        end_time: "",
        cpe: "",
        activity_address: "",
        people_num: "",
        content: "",
        teacher_name: "",
        teacher_id: ""
      },

      ruleValidate: {
        name: [{ required: true, validator: Fomat.Rules.Verifiy().Required }],
        jump: [{ required: true, validator: Fomat.Rules.Verifiy().Required }],
        start_time: [
          { required: true, validator: Fomat.Rules.Verifiy().Required }
        ],
        activity_address: [
          { required: true, validator: Fomat.Rules.Verifiy().Required }
        ],
        people_num: [{ required: true, validator: Fomat.Rules.Verifiy().Bnum }],
        content: [
          { required: true, validator: Fomat.Rules.Verifiy().Required }
        ],
        cpe: [{ required: true, validator: Fomat.Rules.Verifiy().Bnum }],
        end_time: [
          { required: true, validator: Fomat.Rules.Verifiy().Required }
        ],
        teacher_name: [
          { required: true, validator: Fomat.Rules.Verifiy().Required }
        ],
        href_type: [
          { required: true, validator: Fomat.Rules.Verifiy().Required }
        ]
      }
    };
  },

  watch: {
    valueList(newValue, oldValue) {
      if (newValue.length === 0) {
        this.formValidate.parent_id = "";
        this.formValidate.type_id = "";
      } else if (newValue.length === 1) {
        this.formValidate.parent_id = newValue[0];
        this.formValidate.type_id = "";
      } else {
        this.formValidate.parent_id = newValue[0];
        this.formValidate.type_id = newValue[1];
      }
    }
  },
  methods: {
    getProMajList() {
      NewsTypeLevel().then(res => {
        let rep = res.data;
        if (rep.code === 200) {
          this.list = rep.data;
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    },
    starttime(val) {
      this.Formlate.start_time = val;
    },
    end_time(val) {
      this.Formlate.end_time = val;
    },
    getData() {
      getPreview({ id: this.$route.query.id }).then(res => {
        let rep = res.data;
        if (rep.code === 200) {
          this.Formlate.id = rep.data.id;
          this.Formlate.name = rep.data.name;
          this.Formlate.pc_img = rep.data.pc_img;
          this.Formlate.app_img = rep.data.app_img;
          this.$refs.PCimage.uploadList3[0].url = rep.data.pc_img;
          this.$refs.APPimage.uploadList3[0].url = rep.data.app_img;
          this.$refs.content.uploadList3[0].url = rep.data.content;
          this.Formlate.jump = rep.data.jump;
          this.Formlate.start_time = rep.data.start_time;
          this.Formlate.people_num = rep.data.people_num;
          this.Formlate.teacher_name = rep.data.teacher_name;
          this.Formlate.teacher_id = rep.data.teacher_id;
          this.Ather = rep.data.teacher_id;
          this.Formlate.content = rep.data.content;
          this.Formlate.activity_address = rep.data.activity_address;
          this.Formlate.cpe = rep.data.cpe;
          this.Formlate.end_time = rep.data.end_time;
          this.Formlate.href_type = rep.data.href_type;
        }
      });
    },
    thers() {
      this.modal = true;
    },
    selecs(e) {
      this.Audios = e;
    },
    // 获取教师
    getTeacherList(obj) {
      teacherList(obj).then(res => {
        let rep = res.data;
        if (rep.code === 200) {
          let arr = this.Ather && this.Ather.split(",");
          rep.data.data.forEach(val => {
            if (arr.length > 0) {
              arr.forEach(key => {
                if (key == val.id) {
                  val._checked = true;
                }
              });
            }
          });
          this.teacherList = rep.data.data;
        }
      });
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
        this.Formlate.teacher_id = arr.join(",");
        this.Formlate.teacher_name = str.join(",");
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
      //   this.Formlate.teacher_name = str.join(',')
      // }
    },
    handleSubmit(name) {
      this.Formlate.app_img = this.$refs.APPimage.uploadList3[0].url;
      this.Formlate.pc_img = this.$refs.PCimage.uploadList3[0].url;
      this.Formlate.content = this.$refs.content.uploadList3[0].url;
      this.$refs[name].validate(valid => {
        if (valid) {
          if (this.$route.query.title === "添加预售课程") {
            addPreview(this.Formlate).then(res => {
              if (res.data.code === 200) {
                this.$Message.success("添加成功!");
                this.$router.push("previewList");
              }
            });
          } else {
            putPreview(this.Formlate).then(res => {
              if (res.data.code === 200) {
                this.$Message.success("修改成功!");
                this.$router.push("previewList");
              }
            });
          }
        } else {
          this.$Message.error("请认真填写后再提交!");
        }
      });
    },
    resets(name) {
      this.valueList = [];
      this.$refs[name].resetFields();
    }
  },
  mounted() {
    this.getTeacherList({
      page: 1,
      limit: 10000,
      name: "",
      teacher_title_id: ""
    });
    this.getProMajList();
    if (this.$route.query.title === "修改预售课程") {
      this.getData();
    }
  }
};
</script>

<style lang="less" scoped></style>
