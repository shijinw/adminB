<template>
  <div>
    <Card style="width: 100%;">
      <p slot="title">
        {{ this.$route.query.status === "1" ? "添加详情" : "修改详情" }}
      </p>
      <Form
        ref="formPalidate"
        :model="formPalidate"
        :rules="ruleTalidate"
        :label-width="80"
      >
        <FormItem label="二级菜单" prop="title">
          <Input
            v-model="formPalidate.title"
            placeholder="二级菜单名称"
          ></Input>
          <p
            style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;"
          >
            提示：二级菜单板块名称
          </p>
        </FormItem>
        <FormItem label="详细内容" prop="content">
          <Editor ref="editor" :retitle="'Zedito'"  :value.sync="formPalidate.content"></Editor>
        </FormItem>

        <div style="text-align: center;">
          <Button
            type="warning"
            @click="handleSubmit4"
            style="margin-left: 8px"
            >{{ this.$route.query.status === "1" ? "添加" : "修改" }}</Button
          >
        </div>
      </Form>
    </Card>
  </div>
</template>
<script>
import Fomat from "@/libs/fomat";
import { getDoc, addDoc, putDoc } from "@/api/tags";
import Editor from "../../components/editor/editor.vue";
export default {
  data() {
    return {
      formPalidate: {
        title: "",
        document_id: "",
        parent_id: "",
        content: ""
      },
      ruleTalidate: {
        title: [
          {
            required: true,
            validator: Fomat.Rules.Verifiy().Required,
            trigger: "blur"
          }
        ],
        content: [
          {
            required: true,
            validator: Fomat.Rules.Verifiy().Required,
            trigger: "blur"
          }
        ]
      }
    };
  },
  components: {
    Editor
  },
  methods: {
    handleSubmit4() {
      
      this.formPalidate.parent_id = this.$route.query.parent_id;
      this.formPalidate.document_id = this.$route.query.id;
      if (this.$route.query.status === "1") {
        addDoc(this.formPalidate).then(res => {
          let rep = res.data;
          if (rep.code === 200) {
            this.$Message.success("添加成功，请注意查看!");
            this.$router.push("Explain");
          } else {
            this.$Message.error("添加失败，请注意格式问题!");
          }
        });
      } else {
        putDoc(this.formPalidate).then(res => {
          let rep = res.data;
          if (rep.code === 200) {
            this.$Message.success("修改成功，请注意查看!");
            this.$router.push("Explain");
          } else {
            this.$Message.error("修改失败，请注意格式问题!");
          }
        });
      }
    }
  },
  mounted() {
    if (this.$route.query.status === "2") {
      getDoc({ parent_id: this.$route.query.id }).then(res => {
        let rep = res.data;
        if (rep.code === 200) {
          this.formPalidate.title = rep.data.title;
          this.formPalidate.document_id = rep.data.document_id;
          this.formPalidate.parent_id = rep.data.parent_id;
          
        }
      });
    }
  }
};
</script>
