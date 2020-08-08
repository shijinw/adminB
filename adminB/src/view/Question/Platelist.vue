<template>
  <div>
    <Card>
      <p slot="title">板块内容修改</p>
      <Table stripe
             size="small"
             :columns="columns"
             :data="data">
      </Table>
    </Card>
    <Modal v-model="modal"
           draggable
           scrollable
           title="添加专业"
           width="700"
           :footer-hide="true">
      <div>
        <Form ref="majorForm"
              :model="majorForm"
              :rules="ruleMajor"
              :label-width="80">
          <FormItem label="	版块标题提示"
                    prop="plate_title"
                    :label-width="150">
            <Input v-model="majorForm.plate_title"
                   placeholder="请输入版块标题提示"></Input>
          </FormItem>
          <FormItem label="版块弹窗提示内容"
                    prop="plate_content"
                    :label-width="150">
            <Input v-model="majorForm.plate_content"
                   placeholder="请输入版块弹窗提示内容"></Input>
          </FormItem>
          <FormItem label="试卷弹框提示"
                    prop="paper_title"
                    :label-width="150">
            <Input v-model="majorForm.paper_title"
                   placeholder="请输入试卷弹框提示"></Input>
          </FormItem>
          <FormItem label="试卷弹框提示内容"
                    prop="paper_content"
                    :label-width="150">
            <Input v-model="majorForm.paper_content"
                   placeholder="请输入试卷弹框提示内容"></Input>
          </FormItem>
          <FormItem>
            <div style="text-align: center;">
              <Button @click="handleReset('majorForm')"
                      style="margin-right: 8px">重 置</Button>
              <Button type="primary"
                      @click="handleSubmit('majorForm')">提 交</Button>
            </div>
          </FormItem>
        </Form>
      </div>
    </Modal>
  </div>
</template>
<script>
import { getPlate, putPlate } from "@/api/question";
import Fomat from "@/libs/fomat";

export default {
  data() {
    return {
      modal: false,
      majorForm: {
        id: "",
        plate_content: "",
        paper_content: "",
        plate_title: "",
        paper_title: ""
      },
      ruleMajor: {
        plate_content: [
          {
            required: true,
            validator: Fomat.Rules.Verifiy().Required
          }
        ],
        paper_content: [
          {
            required: true,
            validator: Fomat.Rules.Verifiy().Required
          }
        ],
        plate_title: [
          {
            required: true,
            validator: Fomat.Rules.Verifiy().Required
          }
        ],
        paper_title: [
          {
            required: true,
            validator: Fomat.Rules.Verifiy().Required
          }
        ]
      },
      columns: [
        {
          title: "板块ID",
          key: "id",
          minWidth: 60,
          align: "center"
        },

        {
          title: "版块名称",
          key: "plate_name",
          minWidth: 90,
          tooltip: true
        },
        {
          title: "版块提示标题",
          key: "plate_title",
          minWidth: 140,
          tooltip: true,
          align: "center"
        },
        {
          title: "版块内容提示",
          key: "plate_content",
          minWidth: 180,
          tooltip: true,
          align: "center"
        },
        {
          title: "试卷提示标题",
          key: "paper_title",
          minWidth: 180
        },
        {
          title: "版块卷子内容提示",
          key: "paper_content",
          minWidth: 180,
          tooltip: true
        },
        {
          title: "操作",
          minWidth: 130,
          align: "center",
          render: (h, params) => {
            return h("div", [
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
                      this.putPlate(params.row);
                    }
                  }
                },
                "修改"
              )
            ]);
          }
        }
      ],
      data: []
    };
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          putPlate(this.majorForm).then(res => {
            let rep = res.data;
            if (rep.code === 200) {
              this.$Message.success("修改成功，请注意查看");
              this.modal = false;
               this.getPlateData();
            } else if (res.data.code === 405) {
              this.$Message.error("修改失败，请注意检查填写格式");
            }
          });
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    },
    getPlateData() {
      getPlate().then(res => {
        let rep = res.data;
        if (rep.code === 200) {
          this.data = rep.data;
        }
      });
    },
    putPlate(row) {
      this.majorForm.plate_content = row.plate_content;
      this.majorForm.paper_content = row.paper_content;
      this.majorForm.plate_title = row.plate_title;
      this.majorForm.paper_title = row.paper_title;
      this.majorForm.id = row.id;
      this.modal = true;
    }
  },
  mounted() {
    this.getPlateData();
  }
};
</script>