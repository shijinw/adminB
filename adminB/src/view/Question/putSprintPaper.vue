<template>
  <div>
    <Card style="width: 1000px;">
      <p slot="title">修改题库</p>
      <Form ref="formValidate"
            :model="formValidate"
            :rules="ruleValidate"
            :label-width="80">
        <Row>
          <Col :span="12">
          <FormItem label="绑定课程"
                    prop="valueList"
                    style="margin-left:10px">
            <Cascader :data="list"
                      v-model="formValidate.valueList"
                      change-on-select
                      placeholder="项目/专业/课程"></Cascader>
            <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：选择项目/专业 /课程</p>
          </FormItem>
          </Col>
          <Col :span="12">
          <FormItem label="类型"
                    prop="paper_type">
            <Select v-model="formValidate.paper_type"
                    clearable
                    placeholder="类型">
              <Option v-for="item in formatFile"
                      :value="item.id"
                      :key="item.id">{{ item.name }}</Option>
            </Select>
            <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：选择专业</p>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col :span="12">
          <FormItem label="难易度"
                    prop="difficulty">
            <Select v-model="formValidate.difficulty"
                    clearable
                    placeholder="难易度">
              <Option v-for="item in grade"
                      :value="item.name"
                      :key="item.id">{{ item.name }}</Option>
            </Select>
            <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：选择题库的难易度</p>
          </FormItem>
          </Col>
          <Col :span="12">
          <FormItem label="试卷名称"
                    prop="paper_name"
                    style="margin-left:20px">
            <Input v-model="formValidate.paper_name"
                   placeholder="输入试卷名称"
                   style="width: 100%" />

            <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：选择试卷名称</p>
          </FormItem>

          </Col>
        </Row>

        <Row>
          <Col :span="12">
          <FormItem label="答题时间"
                    prop="answer_time"
                    style="margin-left:10px">
            <Input type="number"
                   v-model="formValidate.answer_time"
                   placeholder="输入限制答题时间"
                   style="width: 100%"
                   number />

            <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：限制答题时间1-240分钟</p>
          </FormItem>
          </Col>
          <Col :span="12">
          <FormItem label="试卷总分"
                    prop="paper_score"
                    style="margin-left:20px">
            <Input type="number"
                   v-model="formValidate.paper_score"
                   placeholder="输入试卷总分"
                   style="width: 100%"
                   number />

            <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：限制总分为1-500</p>
          </FormItem>

          </Col>
        </Row>

        <Row>
          <Col :span="12">
          <FormItem label="单选题数"
                    prop="question_num"
                    style="margin-left:10px">
            <Input type="number"
                   v-model="formValidate.question_num"
                   placeholder="输入单选题数量"
                   style="width: 100%"
                   number />

            <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：限制单选题数为1-100</p>
          </FormItem>
          </Col>
          <Col :span="12">
          <FormItem label="每题分值"
                    prop="question_score"
                    style="margin-left:20px">
            <Input type="number"
                   v-model="formValidate.question_score"
                   placeholder="输入每题分值"
                   style="width: 100%"
                   number />

            <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：限制分值为1-100</p>
          </FormItem>

          </Col>
        </Row>
        <Row>
          <Col :span="12">
          <FormItem label="开始时间"
                    prop="start_time"
                    style="margin-left:10px">
            <DatePicker type="date"
                        placeholder="选择开始时间"
                        style="width: 100%"
                        v-model="formValidate.start_time"
                        @on-change="start_time"></DatePicker>
            <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：选择开始时间</p>
          </FormItem>
          </Col>
          <Col :span="12">
          <FormItem label="结束时间"
                    prop="end_time"
                    style="margin-left:20px">
            <DatePicker type="date"
                        placeholder="选择结束时间"
                        style="width: 100%"
                        v-model="formValidate.end_time"
                        @on-change="end_time"></DatePicker>
            <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：选择结束时间</p>
          </FormItem>

          </Col>
        </Row>
        <Row>
          <FormItem label="试卷描述"
                    prop="description"
                    style="margin-left:10px">

            <Input v-model="formValidate.description"
                   :rows="6"
                   type="textarea"
                   placeholder="输入详细的试卷描述"
                   style="width: 100%" />

          </FormItem>
        </Row>

        <FormItem>
          <div style="text-align: center;">
            <Button @click="resets('formValidate')"
                    style="margin-left: 8px;width:110px;height:40px">重置</Button>
            <Button type="primary"
                    @click="handleSubmit"
                    style="margin-left: 8px;width:110px;height:40px">提 交</Button>
          </div>
        </FormItem>
      </Form>
    </Card>

  </div>

</template>

<script>
import { zkProMjorCou3tree } from "@/api/Linkmenu";
import { mapMutations } from "vuex";

import { getPlate, getSprintPaper, putSprintPaper } from "@/api/question";
import Fomat from "@/libs/fomat";
export default {
  data() {
    return {
      data3: [],

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

      formValidate: {
        id: "",
        project_id: "",
        major_id: "",
        paper_type: "",
        difficulty: "",
        paper_name: "",
        answer_time: "",
        paper_score: "",
        plate_id: "7",
        valueList: [],
        question_score: "",
        question_num: "",
        description: "",
        course_id: "",
        start_time: "",
        end_time: ""
      },

      ruleValidate: {
        name: [
          {
            required: true,
            validator: Fomat.Rules.Verifiy().Required,
            trigger: "blur"
          }
        ],
        paper_type: [
          {
            required: true,
            validator: Fomat.Rules.Verifiy().Required,
            trigger: "change"
          }
        ],
        valueList: [
          {
            required: true,
            validator: Fomat.Rules.Verifiy().Build
          }
        ],
        difficulty: [
          {
            required: true,
            validator: Fomat.Rules.Verifiy().Required,
            trigger: "change"
          }
        ],
        start_time: [
          {
            required: true,
            validator: Fomat.Rules.Verifiy().Required,
            trigger: "change"
          }
        ],
        end_time: [
          {
            required: true,
            validator: Fomat.Rules.Verifiy().Required,
            trigger: "change"
          }
        ],
        paper_name: [
          {
            required: true,
            validator: Fomat.Rules.Verifiy().Required,
            trigger: "change"
          }
        ],
        answer_time: [{ required: true, validator: Fomat.Rules.Verifiy().num }],
        paper_score: [{ required: true, validator: Fomat.Rules.Verifiy().Num }],

        question_score: [
          { required: true, validator: Fomat.Rules.Verifiy().Qnum }
        ],
        course_id: [
          { required: true, validator: Fomat.Rules.Verifiy().Required }
        ],
        question_num: [
          {
            required: true,
            validator: Fomat.Rules.Verifiy().Qnum
          }
        ],

        description: [
          {
            required: true,
            validator: Fomat.Rules.Verifiy().Required
          }
        ]
      }
    };
  },

  watch: {
    "formValidate.valueList"(newValue, oldValue) {
      if (newValue.length === 0) {
        this.formValidate.project_id = "";
        this.formValidate.major_id = "";
        this.formValidate.course_id = "";
      } else if (newValue.length === 1) {
        this.formValidate.project_id = newValue[0];
        this.formValidate.major_id = "";
        this.formValidate.course_id = "";
        console.log(1);
      } else if (newValue.length === 2) {
        this.formValidate.project_id = newValue[0];
        this.formValidate.major_id = newValue[1];
        this.formValidate.course_id = "";
      } else {
        this.formValidate.project_id = newValue[0];
        this.formValidate.major_id = newValue[1];
        this.formValidate.course_id = newValue[2];
      }
    }
  },
  methods: {
    ...mapMutations(["addTag", "closeTag"]),
    getProMajList() {
      zkProMjorCou3tree().then(res => {
        let rep = res.data;
        if (rep.code === 200) {
          this.list = rep.data;
        }
      });
    },

    handleSubmit() {
      putSprintPaper(this.formValidate).then(res => {
        let rep = res.data;
        if (rep.code === 200) {
          this.$Message.success("修改成功，请注意查看");
          this.$router.push({ name: "SprintList" });
        } else if (res.data.code === 405) {
          this.$Message.error("修改失败，请注意检查填写格式");
        }
      });
    },
    start_time(val) {
      this.formValidate.start_time = val;
    },
    end_time(val) {
      this.formValidate.end_time = val;
    },
    resets(name) {
      this.valueList = [];
      this.$refs[name].resetFields();
    },
    GetPapar() {
      getSprintPaper({ id: this.$route.query.id }).then(res => {
        let rep = res.data;
        if (rep.code === 200) {
          this.formValidate.project_id = rep.data.project_id;
          this.formValidate.major_id = rep.data.major_id;
          this.formValidate.valueList = [
            rep.data.project_id,
            rep.data.major_id,
            rep.data.course_id
          ];
          this.formValidate.paper_name = rep.data.paper_name;
          this.formValidate.difficulty = rep.data.difficulty;
          this.formValidate.answer_time = rep.data.answer_time;
          this.formValidate.paper_score = rep.data.paper_score;
          this.formValidate.paper_type = rep.data.paper_type;
          this.formValidate.question_score = rep.data.question_score;
          this.formValidate.question_num = rep.data.question_num;
          this.formValidate.discuss_num = rep.data.discuss_num;
          this.formValidate.discuss_score = rep.data.discuss_score;
          this.formValidate.plate_id = rep.data.plate_id;
          this.formValidate.description = rep.data.description;
          this.formValidate.status = rep.data.status;
          this.formValidate.course_id = rep.data.course_id;
          this.formValidate.id = this.$route.query.id;
          this.formValidate.start_time = rep.data.start_time;
          this.formValidate.end_time = rep.data.end_time;
        }
      });
    },
    getplate() {
      getPlate().then(res => {
        let rep = res.data;
        let Arr = [];
        let arr = [2, 3];
        if (rep.code === 200) {
          rep.data.forEach(e => {
            arr.forEach(item => {
              if (item === e.id) {
                Arr.push(e);
              }
            });
          });
        }
        this.Tagslists = Arr;
      });
    }
  },
  mounted() {
    this.getProMajList();
    this.getplate();
    this.GetPapar();
  }
};
</script>

<style lang="less" scoped>
</style>
