<template>
  <div>
    <Card style="width: 100%;">
      <p slot="title">官网学员中心列表</p>
      <div>
        <Button type="default" shape="circle" icon="md-sync" @click="seach('cursefrom')"></Button>
        <Divider type="vertical" />
        <Select v-model="cursefrom.type_id" clearable placeholder="选择分类" style="width:250px">
          <Option v-for="item in TagsList" :value="item.id" :key="item.id">{{ item.type_name }}</Option>
        </Select>
        <Divider type="vertical" />
        <Input
          v-model="cursefrom.news_id"
          placeholder="ID"
          style="width: 100px; margin-right: 10px;"
        />
        <Divider type="vertical" />
        <Input
          v-model="cursefrom.title"
          placeholder="标题名"
          style="width: 100px; margin-right: 10px;"
        />
        <Divider type="vertical" />
        <Input
          v-model="cursefrom.keyword"
          placeholder="关键字"
          style="width: 100px; margin-right: 10px;"
        />
        <Divider type="vertical" />
        <Input
          v-model="cursefrom.source"
          placeholder="来源"
          style="width: 80px; margin-right: 10px;"
        />

        <div style="float:right">
          <Button type="primary" @click="seachKnow" style="margin-right: 10px;">筛选</Button>
          <Button type="primary" @click="AddKnow" style="margin-right: 10px;">添加数据</Button>
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
import { stuCenList, stuCenTypeList } from "@/api/Consult";
import { mapMutations } from "vuex";

export default {
  data() {
    return {
      data: [],
      total: 1,
      TagsList: [],
      valueList: [],
      list: [],
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
        parent_id: "",
        type_id: "",
        news_id: "",
        title: "",
        keyword: "",
        source: ""
      },

      columns: [
        {
          title: "ID",
          key: "id",
          minWidth: 60,
          tooltip: true,
          align: "center"
        },

        {
          title: "标题",
          key: "title",
          minWidth: 130,
          tooltip: true,
          align: "center"
        },
        {
          title: "关键字",
          key: "keyword",
          minWidth: 120,
          tooltip: true,
          align: "center"
        },
        {
          title: "来源",
          key: "source",
          minWidth: 90,
          tooltip: true,
          align: "center"
        },

        {
          title: "作者",
          key: "author",
          minWidth: 90,
          tooltip: true,
          align: "center"
        },

        {
          title: "点击量",
          key: "browse",
          minWidth: 80,
          tooltip: true,
          align: "center"
        },
        {
          title: "创建时间",
          key: "create_time",
          minWidth: 120,
          tooltip: true,
          align: "center"
        },
        {
          title: "分类名称",
          key: "type_name",
          minWidth: 90,
          tooltip: true,
          align: "center"
        },
        {
          title: "操作",
          key: "action",
          minWidth: 180,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "info",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.put(params.row);
                    }
                  }
                },
                "修改"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.remove(params.row);
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ]
    };
  },
  watch: {
    valueList(newValue, oldValue) {
      if (newValue.length === 0) {
        this.cursefrom.parent_id = "";
        this.cursefrom.type_id = "";
      } else if (newValue.length === 1) {
        this.cursefrom.parent_id = newValue[0];
        this.cursefrom.type_id = "";
      } else {
        this.cursefrom.parent_id = newValue[0];
        this.cursefrom.type_id = newValue[1];
      }
    }
  },
  methods: {
    ...mapMutations(["addTag"]),
    seach(name) {
      this.cursefrom.limit = 10;
      this.cursefrom.page = 1;
      this.cursefrom.type_id = "";
      this.cursefrom.news_id = "";
      this.cursefrom.title = "";
      this.cursefrom.keyword = "";
      this.cursefrom.source = "";
      this.getQdata(this.cursefrom);
    },
    seachKnow() {
      this.getQdata(this.cursefrom);
    },

    AddKnow() {
      const route = {
        name: "addStuCen",
        meta: {
          title: `添加数据`
        }
      };
      this.addTag({
        route: route,
        type: "push"
      });
      this.$router.push(route);
    },
    put(row) {
      const route = {
        name: "putStuCen",
        meta: {
          title: `${row.id} - 修改数据`
        },
        query: {
          id: row.id
        }
      };
      this.addTag({
        route: route,
        type: "push"
      });
      this.$router.push(route);
    },
    remove(row) {
      deleteNews({ id: row.id }).then(res => {
        let rep = res.data;
        if (rep.code === 200) {
          this.getQdata(this.cursefrom);
          this.$Message.success("操作成功，请注意查看");
        }
      });
    },
    headNews(row) {
      headNews({
        news_id: row.id,
        is_head: row.is_head === 1 ? "2" : "1"
      }).then(res => {
        let rep = res.data;
        if (rep.code === 200) {
          this.getQdata(this.cursefrom);
          this.$Message.success("操作成功，请注意查看");
        }
      });
    },
    hotNews(row) {
      hotNews({ news_id: row.id, is_hot: row.is_hot === 1 ? "2" : "1" }).then(
        res => {
          let rep = res.data;
          if (rep.code === 200) {
            this.getQdata(this.cursefrom);
            this.$Message.success("操作成功，请注意查看");
          }
        }
      );
    },
    onChange(val) {
      this.cursefrom.page = val;

      this.getQdata(this.cursefrom);
    },
    onPageSizeChange(val) {
      this.form.limit = val;

      this.getQdata(this.cursefrom);
    },
    getData() {
      stuCenTypeList().then(res => {
        let rep = res.data;
        if (rep.code === 200) {
          this.TagsList = rep.data;
        }
      });
    },
    getQdata(obj) {
      stuCenList(obj).then(res => {
        let rep = res.data;
        if (rep.code === 200) {
          this.data = rep.data.data;
          this.total = rep.data.total;
        }
      });
    }
  },

  mounted() {
    this.getData();
    this.getQdata(this.cursefrom);
  }
};
</script>

<style lang="less" scoped>
</style>
