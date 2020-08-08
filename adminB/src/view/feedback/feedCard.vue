<template>
  <div style="background:white">
    <div class="waterfall">
      <div v-for="(val, key) in Datalist" :key="key" style="width:450px;margin:10px">
        <Card :bordered="false" style="margin:10px" :style="{ background: val.color }">
          <div style="white-space:nowrap;">
            <strong>反馈问题：</strong>
            {{ val.content }}
          </div>
          <div>
            <strong>发布时间：</strong>
            <span>{{ val.create_time }}</span>
          </div>
          <div>
            <strong>联系方式：</strong>
            <span>{{ val.information }}</span>
          </div>
          <div>
            <strong>学员ID：</strong>
            <span>{{ val.user_id }}</span>
          </div>
          <div>
            <strong>学员手机号：</strong>
            <span>{{ val.mobile }}</span>
          </div>
          <div>
            <strong>学员备注：</strong>
            <span>{{ val.teacher_remark }}</span>
          </div>
          <div v-if="val.image[0]">
            <strong>关联图片：</strong>
            <div>
              <div class="demo-upload-list" v-for="(item, index) in val.image" :key="index">
                <template>
                  <img :src="item" />
                  <div class="demo-upload-list-cover">
                    <Icon type="ios-eye-outline" @click.native="handleView(item)"></Icon>
                  </div>
                </template>
              </div>
            </div>
          </div>
          <div>
            <div>
              <strong>后台反馈：</strong>
              <Input
                style="width:80%"
                placeholder="请输入收到反馈的答复"
                :ref="val.information"
                :value="val.remark"
                @on-blur="blurchange(val)"
              />
            </div>
          </div>
        </Card>
      </div>
    </div>
    <Modal draggable title="图片预览" v-model="visible">
      <img :src="imgUrl" v-if="visible" style="width: 100%" />
    </Modal>
    <div style="padding: 20px 0; text-align: center;">
      <Page
        :total="total"
        @on-change="onChange"
        @on-page-size-change="onPageSizeChange"
        :current="formdata.page"
        :page-size="formdata.limit"
        size="small"
        show-total
        show-elevator
        show-sizer
      />
    </div>
  </div>
</template>

<script>
import { getFeedback, upIdear } from "@/api/data";
import { setTimeout } from "timers";
export default {
  data() {
    return {
      visible: false,
      imgUrl: "",
      total: 0,
      uploadList3: [],
      Datalist: [],
      settime: null,
      Num: 4,
      remark: "",
      formdata: {
        limit: 10,
        page: 1
      }
    };
  },
  methods: {
    onChange(val) {
      this.formdata.page = val;
      this.getData(this.formdata);
    },
    onPageSizeChange(val) {
      this.formdata.limit = val;
      this.getData(this.formdata);
    },
    handleView(imgs) {
      this.imgUrl = imgs;
      this.visible = true;
    },
    blurchange(val) {
      if (this.$refs[val.information][0].currentValue === "") {
        this.$Message.error("请您输入备注信息!");
      } else {
        if (this.Num === 4) {
          upIdear({
            id: val.id,
            remark: this.$refs[val.information][0].currentValue
          }).then(res => {
            let rep = res.data;
            if (rep.code === 200) {
              this.getData(this.formdata);
              this.settime = setInterval(() => {
                this.Num--;
                if (this.Num <= 0) {
                  this.Num = 4;
                  clearInterval(this.settime);
                }
                console.log(this.Num);
              }, 1000);
              this.$Message.success("备注成功，请注意查看!");
            }
          });
        } else {
          this.$Message.error("提交过快，请注意!");
        }
      }
    },
    getData(obj) {
      getFeedback(obj).then(res => {
        let rep = res.data;
        if (rep.code === 200) {
          let arr = rep.data.data;
          this.total = rep.data.total;
          arr.forEach(item => {
            item.color = this.getColor();
          });
          this.Datalist = arr;
        }
      });
    },
    getColor() {
      let colorValue =
        "#20B2AA, #87CEFA, #8470FF, #778899, #B0C4DE, #9370D8, #3CB371, #7B68EE, #EE82EE, #00FFFF, #7FFFD4";
      let colorArray = colorValue.split(",");
      return colorArray[Math.floor(Math.random() * 11)];
    }
  },
  mounted() {
    this.getData(this.formdata);
  }
};
</script>
<style lang="less" scoped>
.imgs {
  width: 60px;
  height: 60px;
}

.demo-upload-list {
  display: inline-block;
  width: 60px;
  height: 60px;
  text-align: center;
  line-height: 60px;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  margin-right: 4px;
}
.demo-upload-list img {
  width: 100%;
  height: 100%;
}
.demo-upload-list-cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}
.demo-upload-list:hover .demo-upload-list-cover {
  display: block;
}
.demo-upload-list-cover i {
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  margin: 0 2px;
}
.waterfall {
  width: 100%;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
}
</style>
