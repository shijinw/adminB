<template>
  <Card style="width: 800px;">
    <p slot="title">{{this.$route.query.title}}</p>
    <div>
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <FormItem label="名称" prop="student_name">
          <Input v-model="formValidate.student_name" placeholder="学员名称" style="width: 100%"></Input>
          <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：请输入学员名称</p>
        </FormItem>
        <FormItem label="公司" prop="student_comany">
          <Input v-model="formValidate.student_comany" placeholder="公司名称" style="width: 100%"></Input>
          <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：请输入公司名称</p>
        </FormItem>
        <FormItem label="标题" prop="title">
          <Input v-model="formValidate.title" placeholder="标题" style="width: 100%"></Input>
          <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：请输入标题</p>
        </FormItem>
        <FormItem label="学员视频">
          <Input v-model="formValidate.video_href" placeholder="学员视频简介" style="width: 100%"></Input>
          <p
            style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;"
          >提示：请输入学员视频简介</p>
        </FormItem>
        <FormItem label="头像">
          <MyImages></MyImages>
        </FormItem>
        <FormItem label="内容">
          <Editor ref="edors" :retitle="'Zedito'" :value.sync="formValidate.content"></Editor>
        </FormItem>
        <FormItem>
          <div style="text-align: center;">
            <Button type="primary" @click="handleSubmit('formValidate')">提 交</Button>
          </div>
        </FormItem>
      </Form>
    </div>
  </Card>
</template>
<script>
import { addElegant, putElegant } from "@/api/tags";
import Fomat from "@/libs/fomat";
import Editor from "../../components/editor/editor.vue";
import MyImages from "../components/Images/MastImage";
export default {
  data() {
    return {
      title: this.$route.query.title,
      row: this.$route.query.row ? JSON.parse(this.$route.query.row) : "",
      formValidate: {
        student_name: "",
        student_comany: "",
        title: "",
        head: "",
        content: "",
        video_href: "",
        id: ""
      },
      ruleValidate: {
        student_name: [{ required: true, message: "请输入学员名称" }],
        student_comany: [{ required: true, message: "请输入公司名称" }],
        title: [{ required: true, validator: Fomat.Rules.Verifiy().Twofive }],
        head: [{ required: true, message: "请输入头像" }],
        content: [{ required: true, message: "请输入内容" }],
        video_href: [{ required: true, message: "请输入学员视频简介" }]
      }
    };
  },
  methods: {
    handleSubmit(name) {
      if (this.title === "添加学员风采") {
        this.formValidate.head = this.$refs.imags.uploadList3[0].url;
        this.formValidate.content = this.$refs.edors.editorText;
        this.$refs[name].validate(valid => {
          if (valid) {
            addElegant(this.formValidate).then(res => {
              if (res.data.code === 200) {
                this.$Message.success("添加成功!，请注意查看");
                this.$router.push({ name: "elegantList" });
              }
            });
          } else {
            this.$Message.error("请输入后再提交!");
          }
        });
      } else {
        this.formValidate.head = this.$refs.imags.uploadList3[0].url;

        this.$refs[name].validate(valid => {
          if (valid) {
            putElegant(this.formValidate).then(res => {
              if (res.data.code === 200) {
                this.$Message.success("添加成功!，请注意查看");
                this.$router.push({ name: "elegantList" });
              }
            });
          } else {
            this.$Message.error("请输入后再提交!");
          }
        });
      }
    }
  },
  components: {
    MyImages,
    Editor
  },
  mounted() {
    if (this.title === "修改学员风采") {
      this.formValidate.student_name = this.row.student_name;
      this.formValidate.student_comany = this.row.student_comany;

      this.formValidate.title = this.row.title;

      this.formValidate.head = this.row.head;
      this.$refs.imags.uploadList3[0].url = this.row.head;
      this.formValidate.content = this.row.content;
      this.formValidate.video_href = this.row.video_href;
      this.formValidate.id = this.row.id;
    }
  }
};
</script>
