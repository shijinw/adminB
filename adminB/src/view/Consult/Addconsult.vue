<template>
  <div>
    <Card style="width: 1000px;">
      <p slot="title">添加资讯</p>
      <Form ref="formValidate"
            :model="formValidate"
            :rules="ruleValidate"
            :label-width="80">
        <Row>
          <Col :span="12">
          <FormItem label="一级/二级"
                    prop="parent_id"
                    style="margin-left:10px">
            <Cascader :data="list"
                      v-model="valueList"
                      placeholder="新闻一级分类/二级分类"></Cascader>
            <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：选择新闻的一级分类/二级分类</p>
          </FormItem>
          </Col>
          <Col :span="12">
          <FormItem label="标题"
                    prop="title">
            <Input v-model="formValidate.title"
                   placeholder="输入试卷名称"
                   style="width: 100%" />
            <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：输入资讯标题</p>
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

          <FormItem label="资讯内容"
                    prop="content">
            <editor ref="editor"
                    :retitle="'Zedito'"
                    :value.sync="formValidate.content"></editor>
            <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：输入详细的资讯内容 </p>
          </FormItem>
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
          <Col :span="12">
          <FormItem label="是否热点"
                    prop="is_hot">
            <RadioGroup v-model="formValidate.is_hot"
                        style="margin-left:30px">
              <Radio :label="1">允许</Radio>
              <Radio :label="2">不允许</Radio>
            </RadioGroup>
            <p style="padding-top: 8px; font-size:
               12px; color: #999; line-height: nvbormal;">提示：选择该资讯是否设为热点事件</p>
          </FormItem>
          </Col>
        </Row>
        <Row>

          <Col :span="12">
          <FormItem label="是否头条"
                    style="margin-left:20px"
                    prop="is_head">
            <RadioGroup v-model="formValidate.is_head"
                        style="margin-left:30px">
              <Radio :label="1">是</Radio>
              <Radio :label="2">不是</Radio>
            </RadioGroup>
            <p style="padding-top: 8px; font-size:
               12px; color: #999; line-height: nvbormal;">提示：选择该资讯是否设为头条事件</p>
          </FormItem>
          </Col>
        </Row>

        <Row>
          <Images ref="images"></Images>
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
import { NewsTypeLevel, addNews } from "@/api/Consult";
import Images from "../components/video/imagens.vue";
import editor from "../../components/editor/editor.vue";
import Fomat from "@/libs/fomat";

export default {
  components: {
    Images,
    editor
  },
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
        title: "",
        keyword: "",
        source: "",
        parent_id: "",
        type_id: "",
        image: "",
        content: "",
        jumphref: "",
        author: "",
        is_hot: 2,
        is_head: 2
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
        parent_id: [
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

    handleSubmit(name) {
      this.formValidate.image = this.$refs.images.uploadList3[0].url;
      this.$refs[name].validate(valid => {
        if (valid) {
          addNews(this.formValidate).then(res => {
            let rep = res.data;
            if (rep.code === 200) {
              this.$Message.success("添加成功，请注意查看");
              this.$router.go(-1);
            } else if (res.data.code === 405) {
              this.$Message.error("添加失败，请注意检查填写格式");
            }
          });
        }
      });
    },
    resets(name) {
      this.valueList = [];
      this.$refs[name].resetFields();
    }
  },
  mounted() {
    this.getProMajList();
  }
};
</script>

<style lang="less" scoped>
</style>
