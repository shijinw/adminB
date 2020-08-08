<template>
  <div>
    <Card style="width:1000px">
      <p slot="title">友盟全局推送列表</p>
      <div>
        <Button type='primary'
                @click="AddKnow"
                style="margin-right: 10px;">添加友盟消息</Button>
      </div>
      <Divider />
      <Table stripe
             size="small"
             :columns="columns"
             :data="data"></Table>

    </Card>
    <Modal v-model="modals"
           draggable
           scrollable
           title="添加友盟推送"
           :width="740"
           :footer-hide="true">
      <div style="margin-top:20px">
        <Form ref="formCalidate"
              :model="formCalidate"
              :rules="ruleValidate2"
              :label-width="80">
          <FormItem label="标题"
                    prop="title">
            <Input v-model="formCalidate.title"
                   placeholder="标题名称"></Input>
            <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：友盟标题名称</p>
          </FormItem>
          <FormItem label="推送类型"
                    prop="type">
            <Select v-model="formCalidate.type"
                    clearable
                    label-in-value
                    style="width:100%;"
                    placeholder="二级分类名称">
              <Option v-for="item in status"
                      :value="item.id"
                      :key="item.id">{{ item.name }}</Option>
            </Select>
            <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：选择推送类型</p>
          </FormItem>
          <FormItem label="简介"
                    prop="brief">
            <Input v-model="formCalidate.brief"
                   placeholder="简介"></Input>
            <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：友盟消息简介</p>
          </FormItem>
          <FormItem label="链接推送"
                    prop="href"
                    v-if="formCalidate.type===1?false:true">
            <Input v-model="formCalidate.href"
                   placeholder="链接推送"></Input>
            <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：链接推送地址</p>
          </FormItem>
          <FormItem label="文字推送"
                    prop="content"
                    v-if="formCalidate.type===1?true:false">
            <Input type="textarea"
                   v-model="formCalidate.content"
                   placeholder="文字推送"
                   :rows="3"></Input>
            <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：输入文字推送</p>
          </FormItem>
          <FormItem>
            <div style="text-align: right;">
              <Button @click="handleReset2('formCalidate')">重置</Button>
              <Button type="primary"
                      @click="handleSubmit2('formCalidate')"
                      style="margin-left: 8px">提 交</Button>
            </div>
          </FormItem>
        </Form>
      </div>
    </Modal>
  </div>
</template>
<script>
import { sysMessageList, addSysMessage } from "@/api/info";
import Fomat from "@/libs/fomat";

export default {
  data() {
    return {
      columns: [
        {
          title: "ID",
          key: "id",
          minWidth: 60,
          tooltip: true
        },

        {
          title: "标题",
          key: "title",
          minWidth: 120,
          tooltip: true
        },
        {
          title: "推送类型",
          key: "type",
          minWidth: 150,
          tooltip: true,
          render: (h, params) => {
            let texts = "";
            let color = "";
            if (params.row.type === 1) {
              texts = "普通消息";
              color = "#019beb";
            } else if (params.row.type === 2) {
              texts = "链接推送消息";
              color = "red";
            }
            return h(
              "div",
              {
                style: {
                  color: color
                }
              },
              texts
            );
          }
        },
        {
          title: "内容",
          key: "content",
          minWidth: 100,
          tooltip: true
        },

        {
          title: "创建时间",
          key: "create_time",
          minWidth: 100,
          tooltip: true,
          align: "center"
        }
      ],
      data: [],
      content: [],
      status: [
        { id: 1, name: "普通消息" },
        { id: 2, name: "链接推送消息" }
      ],
      modals: false,
      ruleValidate2: {
        title: [{ required: true, validator: Fomat.Rules.Verifiy().Required }],

        type: [{ required: true, validator: Fomat.Rules.Verifiy().Required }],
        href: [{ required: true, validator: Fomat.Rules.Verifiy().Required }],
        content: [
          { required: true, validator: Fomat.Rules.Verifiy().Required }
        ],
        brief: [{ required: true, validator: Fomat.Rules.Verifiy().Required }]
      },

      formCalidate: {
        title: "",
        type: 1,
        href: "",
        content: "",
        brief: ""
      }
    };
  },
  methods: {
    AddKnow() {
      this.modals = true;
      this.$refs.formCalidate.resetFields();
    },
    handleReset2(name) {
      this.$refs[name].resetFields();
      this.formCalidate.type = 2;
    },
    handleSubmit2(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          addSysMessage(this.formCalidate).then(res => {
            let rep = res.data;
            if (rep.code === 200) {
              this.$Message.success("添加成功!注意查看");
              this.getData();
              this.modals = false;
            } else if (rep.code === 405) {
              this.$Message.error("添加失败!注意填写格式");
            }
          });
        } else {
          this.$Message.error("添加失败!注意填写格式");
        }
      });
    },

    getData() {
      sysMessageList().then(res => {
        let rep = res.data;
        if (rep.code === 200) {
          this.data = rep.data;
        }
      });
    }
  },
  mounted() {
    this.getData();
  }
};
</script>
