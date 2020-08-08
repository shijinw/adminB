<template>
  <div>
    <Card style="width: 1000px;">
      <p slot="title">修改官网学员中心数据</p>
      <Form ref="formValidate"
            :model="formValidate"
            :rules="ruleValidate"
            :label-width="80">
        <Row>
        
          <Col :span="12">
          <FormItem label="标题"
                    prop="title">
            <Input v-model="formValidate.title"
                   placeholder="输入试卷名称"
                   style="width: 100%" />
            <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：输入资讯标题</p>
          </FormItem>
          </Col>
          <Col :span="12">
          <FormItem label="选择分类"
                    prop="title">
             <Select v-model="formValidate.type_id" clearable placeholder="选择分类" >
                <Option v-for="item in typeList" :value="item.id" :key="item.id">{{ item.type_name }}</Option>
              </Select>
            <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：选择官网学员中心分类</p>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col :span="12">
          <FormItem label="关键字"
                    prop="keyword">
            <Input v-model="formValidate.keyword"
                   placeholder="输入试卷名称"
                   style="width: 100%" />
            <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：输入关键字</p>
          </FormItem>
          </Col>
          <Col :span="12">
          <FormItem label="来源"
                    prop="source">
            <Input v-model="formValidate.source"
                   placeholder="输入来源位置"
                   style="width: 100%" />
            <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：输入资讯来源位置</p>
          </FormItem>

          </Col>
        </Row>
              <Row>

          <Col :span="12">
          <FormItem label="作者"
                    prop="author"
                    style="margin-left:10px">
            <Input v-model="formValidate.author"
                   placeholder="作者名"
                   style="width: 100%" />
            <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：输入文章作者名</p>
          </FormItem>

          </Col>
        
        </Row>
        <Row>

          <FormItem label="资讯内容"
                    prop="content">
            <editor ref="editor"
                    :retitle="'Zedito'"
                    :value.sync="formValidate.content"
                    ></editor>
            <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：输入详细的资讯内容 </p>
          </FormItem>
        </Row>

        <FormItem>
          <div style="text-align: center;">
            <Button @click="resets('formValidate')"
                    style="margin-left: 8px;width:110px;height:40px">重置</Button>
            <Button type="primary"
                    @click="handleSubmit('formValidate')"
                    style="margin-left: 8px;width:110px;height:40px">提 交</Button>
          </div>
        </FormItem>
      </Form>
    </Card>

  </div>

</template>

<script>
import { stuCenTypeList, getStuCen,putStuCen  } from "@/api/Consult";
import editor from "../../components/editor/editor.vue";
import Fomat from "@/libs/fomat";

export default {
  components: {
    editor
  },
  data() {
    return {
      data3: [],

     
      list: [],
      formdata: [],
      valueList: [],
      typeList:[],
      formValidate: {
        title: "",
        keyword: "",
        source: "",
        type_id: "",
        author: "",
        content: "",
        
      },

      ruleValidate: {
        title: [
          {
            required: true,
            validator: Fomat.Rules.Verifiy().Required,
            trigger: "blur"
          }
        ],
        keyword: [
          {
            required: true,
            validator: Fomat.Rules.Verifiy().Required
          }
        ],
        source: [{ required: true, validator: Fomat.Rules.Verifiy().Required }],
        type_id: [
          {
            required: true,
            validator: Fomat.Rules.Verifiy().Required
          }
        ],
        image: [
          {
            required: true,
            validator: Fomat.Rules.Verifiy().Required
          }
        ],

        content: [
          {
            required: true,
            validator: Fomat.Rules.Verifiy().Required
          }
        ],
        jumphref: [
          { required: true, validator: Fomat.Rules.Verifiy().Required }
        ],
        author: [{ required: true, validator: Fomat.Rules.Verifiy().Required }],

        is_hot: [{ required: true, validator: Fomat.Rules.Verifiy().Required }],
        is_head: [{ required: true, validator: Fomat.Rules.Verifiy().Required }]
      }
    };
  },


  methods: {
   

    handleSubmit(name) {
    
      this.$refs[name].validate(valid => {
        if (valid) {
          putStuCen(this.formValidate).then(res => {
            let rep = res.data;
            if (rep.code === 200) {
              this.$Message.success("修改成功，请注意查看");
              this.$router.go(-1);
            } else if (res.data.code === 405) {
              this.$Message.error("修改失败，请注意检查填写格式");
            }
          });
        }
      });
    },
   getData () {
      stuCenTypeList().then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.typeList = rep.data
        }
      })
    },
      getPutData () {
      getStuCen({id:this.$route.query.id}).then(res => {
        let rep = res.data
        if (rep.code === 200) {
     this.formValidate.type_id=rep.data.type_id
     this.formValidate.id=rep.data.id
     this.formValidate.title=rep.data.title
     this.formValidate.keyword=rep.data.keyword
     this.formValidate.content=rep.data.content
      this.formValidate.source=rep.data.source
       this.formValidate.author=rep.data.author
        }
      })
    },
    resets(name) {
      this.$refs[name].resetFields();
    
    }
  },
  mounted() {
      this.getData()
      this.getPutData()
  }
};
</script>

<style lang="less" scoped>
</style>
