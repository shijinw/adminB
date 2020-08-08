<template>
  <div>
    <Card>
      <p slot="title">题库答疑统计列表</p>
      <div>
        <Button
          type="default"
          shape="circle"
          icon="md-sync"
          @click="seach('cursefrom')"
        ></Button>
        <Divider type="vertical" />

        <Select
          v-model="cursefrom.course_id"
          clearable
          style="width:200px"
          placeholder="正课类型"
        >
          <Option
            v-for="item in formatFile"
            :value="item.menu_title"
            :key="item.id"
            >{{ item.menu_title }}</Option
          >
        </Select>

        <Divider type="vertical" />

        <DatePicker
          @on-change="getStime"
          format="yyyy-MM-dd"
          type="date"
          placeholder="开始时间"
          style="width: 140px"
        ></DatePicker>
        <Divider type="vertical" />
        <DatePicker
          @on-change="getEtime"
          format="yyyy-MM-dd"
          type="date"
          placeholder="回复时间"
          style="width: 140px"
        ></DatePicker>
        <Divider type="vertical" />
        <Select
          v-model="cursefrom.reply_user_id"
          clearable
          placeholder="回复老师"
          style="width:100px"
        >
          <Option v-for="item in formatcard" :value="item.id" :key="item.id">{{
            item.truename
          }}</Option>
        </Select>
        <div style="float:right">
          <Button type="primary" @click="seachKnow" style="margin-right: 10px;"
            >筛选</Button
          >
        </div>
      </div>
      <Divider />
      <Table stripe size="small" :columns="columns" :data="data"></Table>

      <div style="padding: 20px 0; text-align: right;">
        <Page
          :total="total"
          @on-change="onChange"
          @on-page-size-change="onPageSizeChange"
          :current="cursefrom.page"
          :page-size="cursefrom.limit"
          size="small"
          show-total
          show-elevator
          show-sizer
        />
      </div>
    </Card>
  </div>
</template>

<script>
import {
  questionDayCount,
  userPageRuleList,
  getAnswerUser
} from "@/api/Answer";
import { mapMutations } from "vuex";

export default {
  data() {
    return {
      data: [],
      total: 1,

      valueList: [],
      list: [],
      fromData: {
        mobile: "",
        course_name: "",
        section_name: "",
        create_time: "",
        reply_status: "",
        quiz_source: "",
        reply_user_name: "",
        reply_time: "",
        quiz: "",
        quiz_image: "",
        reply_quiz: "",
        reply_image: ""
      },
      formatFile: [],
      formatcard: [],
      formatkeat: [
        {
          id: 1,
          name: "回复"
        },
        {
          id: 2,
          name: "未回复"
        }
      ],
      cursefrom: {
        limit: 10,
        page: 1,
        course_id: "",
        reply_status: "",
        reply_user_id: "",
        start_time: "",
        end_time: "",
        menu_name: this.$route.name
      },
      Comfrom: {
        course_id: "",
        quiz_source: "",
        reply_status: "",
        mobile: "",
        start_time: "",
        end_time: ""
      },
      columns: [
        {
          title: "答疑老师",
          key: "reply_user_name",
          minWidth: 100,
          tooltip: true
        },
        {
          title: "答疑数量",
          key: "days_num",
          minWidth: 100,
          tooltip: true,
          align: "center"
        },

        {
          title: "回复时间",
          key: "reply_time",
          minWidth: 100,
          tooltip: true,
          align: "center"
        }
      ]
    };
  },
  methods: {
    ...mapMutations(["addTag"]),
    seach(name) {
      this.$refs[name].resetFields();
    },
    seachKnow() {
      this.getQdata(this.cursefrom);
    },

    daolist() {
      this.modal0 = true;
    },
    onChange(val) {
      this.cursefrom.page = val;

      this.getQdata(this.cursefrom);
    },
    getStime(startime) {
      this.cursefrom.start_time = startime;
    },
    getEtime(startime) {
      this.cursefrom.end_time = startime;
    },
    onPageSizeChange(val) {
      this.form.limit = valcursefrom;

      this.getQdata(this.cursefrom);
    },
    getQdata(obj) {
      questionDayCount(obj).then(res => {
        let rep = res.data;
        if (rep.code === 200) {
          this.data = rep.data.data;
          this.total = rep.data.total;
        }
      });
    },
    getThear() {
      getAnswerUser().then(res => {
        let rep = res.data;
        if (rep.code === 200) {
          this.formatcard = rep.data;
        }
      });
    },
    getdata() {
      userPageRuleList({ menu_name: this.$route.name }).then(res => {
        let rep = res.data;
        if (rep.code === 200) {
          this.formatFile = rep.data.right;
          this.getQdata(this.cursefrom);
        }
      });
    }
  },

  mounted() {
    this.getdata();
    this.getQdata(this.cursefrom);
    this.getThear();
  }
};
</script>

<style lang="less" scoped></style>
