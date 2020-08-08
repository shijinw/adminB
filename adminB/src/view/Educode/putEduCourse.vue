<template>
  <div>
    <Card style="width: 800px;">
      <p slot="title">后续教育修改课程</p>
      <Form ref="formValidate"
            :model="formValidate"
            :rules="ruleValidate"
            :label-width="80">

        <Row>
          <Col :span="12">
          <FormItem label="课程标题名"
                    prop="name"
                    :label-width="90">
            <Input v-model="formValidate.name"
                   type="text"
                   placeholder="课程标题"></Input>
            <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：课程标题</p>
          </FormItem>
          </Col>
          <Col :span="12">
          <FormItem label="播放次数"
                    prop="play_num">
            <Input type="number"
                   v-model="formValidate.play_num"
                   placeholder="输入播放次数"
                   clearable />
            <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：调整该输入播放次数</p>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col :span="12">
          <FormItem label="Cpe积分"
                    prop="cpe_integral">
            <Input type="number"
                   v-model="formValidate.cpe_integral"
                   placeholder="输入Cpe积分"
                   clearable />
            <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：调整该输入播放次数</p>
          </FormItem>
          </Col>
          <Col :span="12">
          <FormItem label="选择讲师"
                    prop="teacher_id">
            <Select v-model="formValidate.teacher_id"
                    clearable
                    placeholder="主讲老师">
              <Option v-for="item in teacherList"
                      :value="item.id"
                      :key="item.id">{{ item.name }}</Option>
            </Select>
            <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：选择主讲老师</p>
          </FormItem>
          </Col>
        </Row>
        <!-- <Col :span="12">
          <FormItem label="计费方式"
                    prop="billing_status">
            <RadioGroup v-model="formValidate.billing_status">
              <Radio label="1">收费</Radio>
              <Radio label="2">免费</Radio>
            </RadioGroup>
            <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：选择该课程的计费方式</p>
          </FormItem>
          </Col> -->

        <!-- <Col :span="12">
        <FormItem label="是否上架"
                  prop="status">
          <RadioGroup v-model="formValidate.status">
            <Radio label="1">上架</Radio>
            <Radio label="2">下架</Radio>
          </RadioGroup>
          <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: nvbormal;">提示：选择该课程是否上架</p>
        </FormItem>
        </Col> -->

        <!-- <Row v-if="Quesvasble">
          <Col :span="12">
          <FormItem label="绑定题库"
                    prop="bind_question">
            <Select v-model="formValidate.bind_question"
                    clearable
                    placeholder="题库列表">
              <Option v-for="item in QuertionList"
                      :value="item.id"
                      :key="item.id">{{ item.name }}</Option>
            </Select>
          </FormItem>
          </Col>
        </Row> -->
        <!-- <Row>
          <Col :span="12">
          <FormItem label="购买次数"
                    prop="play_num">
            <Input v-model="formValidate.play_num"
                   type="number"
                   placeholder="购买次数"></Input>
            <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：输入购买次数</p>
          </FormItem>
          </Col>
          <!-- <Col :span="12">
          <FormItem label="课程价格"
                    prop="price">
            <Input type="number"
                   v-model="formValidate.price"
                   placeholder="输入课程价格"
                   clearable />
            <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：调整该课程的价格</p>
          </FormItem>
          </Col> -->
        <!-- </Row> -->
        <FormItem label="描　　述"
                  prop="description">
          <Input v-model="formValidate.description"
                 type="textarea"
                 :autosize="{minRows: 3,maxRows: 10}"
                 placeholder="简介..."></Input>
          <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：课程描述</p>
        </FormItem>
        <Row>
          <Col :span="12">
          <FormItem label="PC封面"
                    prop="pc_img">
            <div class="course_img">
              <div class="demo-upload-list"
                   v-for="(item, index) in uploadList"
                   :key="index">
                <template>
                  <img :src="item.url">
                  <div class="demo-upload-list-cover">
                    <Icon type="ios-eye-outline"
                          @click.native="handleView(item.url)"></Icon>
                    <Icon type="ios-trash-outline"
                          @click.native="handleRemove(item)"></Icon>
                  </div>
                </template>
              </div>
              <Upload ref="upload"
                      :show-upload-list="false"
                      :before-upload="handleBeforeUpload"
                      :on-success="handleSuccess"
                      :on-format-error="handleFormatError"
                      :on-exceeded-size="handleMaxSize"
                      :format="['jpg','jpeg','png']"
                      :max-size="10240"
                      type="drag"
                      :action="uplodapath"
                      name="image"
                      style="display: inline-block;width:58px;">
                <div style="width: 58px;height:58px;line-height: 58px;">
                  <Icon type="ios-camera"
                        size="20"></Icon>
                </div>
              </Upload>
              <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：图片比例暂未定义</p>
              <Modal title="图片预览"
                     v-model="visible">
                <img :src="imgUrl"
                     v-if="visible"
                     style="width: 100%">
              </Modal>
            </div>
          </FormItem>
          </Col>
          <Col :span="12">
          <FormItem label="APP封面"
                    prop="app_img">
            <div class="course_img">
              <div class="demo-upload-list"
                   v-for="(item, index) in uploadList2"
                   :key="index">
                <template>
                  <img :src="item.url">
                  <div class="demo-upload-list-cover">
                    <Icon type="ios-eye-outline"
                          @click.native="handleView(item.url)"></Icon>
                    <Icon type="ios-trash-outline"
                          @click.native="handleRemove2(item)"></Icon>
                  </div>
                </template>
              </div>
              <Upload ref="upload"
                      :show-upload-list="false"
                      :before-upload="handleBeforeUpload"
                      :on-success="handleSuccess2"
                      :on-format-error="handleFormatError"
                      :on-exceeded-size="handleMaxSize"
                      :format="['jpg','jpeg','png']"
                      :max-size="10240"
                      type="drag"
                      :action="uplodapath"
                      name="image"
                      style="display: inline-block;width:58px;">
                <div style="width: 58px;height:58px;line-height: 58px;">
                  <Icon type="ios-camera"
                        size="20"></Icon>
                </div>
              </Upload>
              <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：图片比例暂未定义</p>
            </div>
          </FormItem>
          </Col>
        </Row>

        <FormItem label="课程简介"
                  prop="brief_img">
          <div class="course_img jianjie">
            <div class="demo-upload-list"
                 v-for="(item, index) in uploadList5"
                 :key="index">
              <template>
                <img :src="item.url">
                <div class="demo-upload-list-cover">
                  <Icon type="ios-eye-outline"
                        @click.native="handleView(item.url)"></Icon>
                  <Icon type="ios-trash-outline"
                        @click.native="handleRemove5(item)"></Icon>
                </div>
              </template>
            </div>
            <Upload ref="upload"
                    :show-upload-list="false"
                    :before-upload="handleBeforeUpload"
                    :on-success="handleSuccess5"
                    :on-format-error="handleFormatError"
                    :on-exceeded-size="handleMaxSize"
                    :format="['jpg','jpeg','png']"
                    :max-size="10240"
                    type="drag"
                    :action="uplodapath"
                    name="image"
                    style="display: inline-block;width:58px;">
              <div style="width: 58px;height:58px;line-height: 58px;">
                <Icon type="ios-camera"
                      size="20"></Icon>
              </div>
            </Upload>
            <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：课程简介为图片，您可以在“365编辑器”上编辑，完成后点击[生成长图]</p>
          </div>
        </FormItem>
        <FormItem>
          <div style="text-align: right;">
            <Button @click="handleReset('formValidate')">重置</Button>
            <Button type="primary"
                    @click="handleSubmit('formValidate')"
                    style="margin-left: 8px">修 改 课 程</Button>
          </div>
        </FormItem>
      </Form>
    </Card>
  </div>
</template>

<script>
import { orgList, getQueList } from "@/api/course";
import { putEduCourse, getEduCourse } from "@/api/Educode";

import { mapMutations } from "vuex";
import { proMjor2tree } from "@/api/Linkmenu";
import { labelList } from "@/api/tags";
import { teacherList } from "@/api/teacher";
import Fomat from "@/libs/fomat";
import config from "@/config";
export default {
  data() {
    return {
      uplodapath: "/upload/Index/uploadImage",
      visible: false,
      Quesvasble: false,
      uploadList: [],
      uploadList2: [],
      uploadList3: [],
      uploadList4: [],
      uploadList5: [],
      QuertionList: [],
      imgUrl: "",
      tagsList: [],
      list: [],
      valueList: [],
      orgList: [],
      teacherList: [],
      formValidate: {
        id: "",
        name: "",
        description: "",
        billing_status: "",
        price: "",
        brief_img: "",
        pc_img: "",
        app_img: "",
        status: "",
        play_num: "",
        teacher_id: "",
        cpe_integral: ""
      },
      ruleValidate: {
        name: [
          {
            required: true,
            validator: Fomat.Rules.Verifiy().Required,
            trigger: "blur"
          }
        ],

        teacher_id: [
          {
            required: true,
            validator: Fomat.Rules.Verifiy().Required,
            trigger: "blur"
          }
        ],
        description: [
          {
            required: true,
            validator: Fomat.Rules.Verifiy().Required,
            trigger: "blur"
          }
        ],

        app_img: [
          {
            required: true,
            validator: Fomat.Rules.Verifiy().Required,
            trigger: "blur"
          }
        ],
        pc_img: [
          {
            required: true,
            validator: Fomat.Rules.Verifiy().Required,
            trigger: "blur"
          }
        ],

        billing_status: [
          { required: true, validator: Fomat.Rules.Verifiy().Required }
        ],
        price: [{ required: true, validator: Fomat.Rules.Verifiy().patten }],
        brief_img: [
          {
            required: true,
            validator: Fomat.Rules.Verifiy().Required,
            trigger: "blur"
          }
        ],
        status: [{ required: true, validator: Fomat.Rules.Verifiy().Required }],
        play_num: [{ required: true, validator: Fomat.Rules.Verifiy().Bnum }],
        cpe_integral: [
          { required: true, validator: Fomat.Rules.Verifiy().Bnum }
        ]
      }
    };
  },
  // components: { // 引入组件
  //   MyEditor
  // },
  watch: {
    valueList(newValue, oldValue) {
      if (newValue.length === 0) {
        this.formValidate.project_id = "";
        this.formValidate.major_id = "";
      } else if (newValue.length === 1) {
        this.formValidate.project_id = newValue[0];
        this.formValidate.major_id = "";
      } else {
        this.formValidate.project_id = newValue[0];
        this.formValidate.major_id = newValue[1];
      }
    },
    uploadList(newValue, oldValue) {
      if (newValue.length != 0) {
        this.formValidate.pc_img = newValue[0].url;
      } else {
        this.formValidate.pc_img = "";
      }
    },
    uploadList2(newValue, oldValue) {
      if (newValue.length != 0) {
        this.formValidate.app_img = newValue[0].url;
      } else {
        this.formValidate.app_img = "";
      }
    },
    uploadList3(newValue, oldValue) {
      if (newValue.length != 0) {
        this.formValidate.wx_img = newValue[0].url;
      } else {
        this.formValidate.wx_img = "";
      }
    },
    uploadList4(newValue, oldValue) {
      if (newValue.length != 0) {
        this.formValidate.mobile_img = newValue[0].url;
      } else {
        this.formValidate.mobile_img = "";
      }
    },
    uploadList5(newValue, oldValue) {
      if (newValue.length != 0) {
        this.formValidate.brief_img = newValue[0].url;
      } else {
        this.formValidate.brief_img = "";
      }
    },
    "formValidate.course_type"(newValue) {
      if (newValue === "1") {
        this.Quesvasble = false;
      } else {
        this.Quesvasble = true;
      }
    }
  },
  methods: {
    ...mapMutations(["addTag", "closeTag"]),
    getProMajList() {
      proMjor2tree().then(res => {
        let rep = res.data;
        if (rep.code === 200) {
          this.list = rep.data;
        }
      });
    },
    handleView(url) {
      this.imgUrl = url;
      this.visible = true;
    },
    handleRemove(file) {
      let fileList = this.uploadList;
      this.uploadList.splice(fileList.indexOf(file), 1);
    },
    handleRemove2(file) {
      let fileList = this.uploadList2;
      this.uploadList2.splice(fileList.indexOf(file), 1);
    },
    handleRemove3(file) {
      let fileList = this.uploadList3;
      this.uploadList3.splice(fileList.indexOf(file), 1);
    },
    handleRemove4(file) {
      let fileList = this.uploadList4;
      this.uploadList4.splice(fileList.indexOf(file), 1);
    },
    handleRemove5(file) {
      let fileList = this.uploadList5;
      this.uploadList5.splice(fileList.indexOf(file), 1);
    },
    handleSuccess(res, file) {
      if (res.code === 200) {
        this.uploadList = [];
        let obj = {
          name: file.name,
          url: res.data.image_url
        };
        this.uploadList.push(obj);
      }
    },
    handleSuccess2(res, file) {
      if (res.code === 200) {
        this.uploadList2 = [];
        let obj = {
          name: file.name,
          url: res.data.image_url
        };
        this.uploadList2.push(obj);
      }
    },
    handleSuccess3(res, file) {
      if (res.code === 200) {
        this.uploadList3 = [];
        let obj = {
          name: file.name,
          url: res.data.image_url
        };
        this.uploadList3.push(obj);
      }
    },
    handleSuccess4(res, file) {
      if (res.code === 200) {
        this.uploadList4 = [];
        let obj = {
          name: file.name,
          url: res.data.image_url
        };
        this.uploadList4.push(obj);
      }
    },
    handleSuccess5(res, file) {
      if (res.code === 200) {
        this.uploadList5 = [];
        let obj = {
          name: file.name,
          url: res.data.image_url
        };
        this.uploadList5.push(obj);
      }
    },
    handleFormatError(file) {
      this.$Notice.warning({
        title: "文件格式验证",
        desc: "文件 “" + file.name + "” 格式错误, 请上传 jpg 或 png."
      });
    },
    handleMaxSize(file) {
      this.$Notice.warning({
        title: "文件大小验证",
        desc: "文件 “" + file.name + "” 太大, 不要超过 10M."
      });
    },
    handleBeforeUpload() {
      console.log("准备上传");
    },
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          putEduCourse(this.formValidate).then(res => {
            if (res.data.code === 200) {
              this.$Message.success("修改成功!");
              this.getData(this.$route.query.id);
              this.$router.push({ name: "eduCourseList" });
            }
          });
        } else {
          this.$Message.error("请认真填写信息!");
        }
      });
    },
    handleReset(name) {
      this.uploadList = [];
      this.uploadList2 = [];
      this.uploadList3 = [];
      this.uploadList4 = [];
      this.uploadList5 = [];
      this.$refs[name].resetFields();
    },
    getOrgList() {
      orgList().then(res => {
        let rep = res.data;
        if (rep.code === 200) {
          this.orgList = rep.data;
        }
      });
    },
    getTeacherList(obj) {
      teacherList(obj).then(res => {
        let rep = res.data;
        if (rep.code === 200) {
          this.teacherList = rep.data.data;
        }
      });
    },
    getList(obj) {
      labelList(obj).then(res => {
        let rep = res.data;
        if (rep.code === 200) {
          this.tagsList = rep.data;
        }
      });
    },
    getData(id) {
      getEduCourse({ id: id }).then(res => {
        let rep = res.data;
        if (rep.code === 200) {
          let rep = res.data;
          if (rep.code === 200) {
            this.formValidate.id = rep.data.id;
            this.formValidate.name = rep.data.name;
            this.formValidate.description = rep.data.description;
            this.formValidate.teacher_id = Number(rep.data.teacher_id);
            this.formValidate.billing_status = rep.data.billing_status;
            this.formValidate.price = rep.data.price;
            this.formValidate.status = rep.data.status.toString();
            this.formValidate.play_num = rep.data.play_num;
            this.formValidate.cpe_integral = rep.data.cpe_integral;
            let list = rep.data.pc_img.split("/");
            let name = list[list.length - 1];
            this.uploadList = [];
            let obj = {
              name: name,
              url: rep.data.pc_img
            };
            rep.data.pc_img
              ? this.uploadList.push(obj)
              : (this.formValidate.pc_img = rep.data.pc_img);

            let list2 = rep.data.app_img.split("/");
            let name2 = list[list.length - 1];
            this.uploadList2 = [];
            let obj2 = {
              name: name,
              url: rep.data.app_img
            };
            rep.data.app_img
              ? this.uploadList2.push(obj2)
              : (this.formValidate.app_img = rep.data.app_img);

            this.uploadList3 = [];

            let list5 = rep.data.brief_img.split("/");
            let name5 = list[list.length - 1];
            this.uploadList5 = [];
            let obj5 = {
              name: name,
              url: rep.data.brief_img
            };
            rep.data.brief_img
              ? this.uploadList5.push(obj5)
              : (this.formValidate.brief_img = rep.data.brief_img);
          }
        }
      });
    },
    getQuesList() {
      getQueList().then(res => {
        let rep = res.data;
        if (rep.code === 200) {
          this.QuertionList = rep.data;
        }
      });
    }
  },
  mounted() {
    if (process.env.NODE_ENV === "production") {
      switch (document.domain) {
        case "dests.youcaiwx.cn":
          this.uplodapath = `${config.baseUrl.test}/upload/Index/uploadImage`;
          break;
        case "ycdb.youcaiwx.cn":
          this.uplodapath = `${config.baseUrl.pro}/upload/Index/uploadImage`;
          break;
        default:
          this.uplodapath = "/upload/Index/uploadImage";
          break;
      }
    } else {
      this.uplodapath = "/upload/Index/uploadImage";
    }
    this.getList({ status: "", class_name: "" });
    this.getProMajList();
    this.getOrgList();
    this.getQuesList();
    this.getTeacherList({
      page: 1,
      limit: 10000,
      name: "",
      teacher_title_id: ""
    });
    this.getData(this.$route.query.id);
  }
};
</script>

<style lang="less">
.jianjie .demo-upload-list {
  width: 520px !important;
  height: 360px !important;
  line-height: 360px !important;
}
.course_img .demo-upload-list {
  display: inline-block;
  width: 180px;
  height: 100px;
  text-align: center;
  line-height: 100px;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  margin-right: 4px;
}
.course_img .demo-upload-list img {
  width: 100%;
}
.course_img .demo-upload-list-cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}
.course_img .demo-upload-list:hover .demo-upload-list-cover {
  display: block;
}
.course_img .demo-upload-list-cover i {
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  margin: 0 2px;
}
</style>
