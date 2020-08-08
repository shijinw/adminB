<template>
  <div>
    <Card style="width: 100%;">
      <p slot="title">修改课程包</p>
      <Form ref="formValidate"
            :model="formValidate"
            :rules="ruleValidate"
            :label-width="80">
        <Row>
          <Col :span="12">
          <FormItem label="课程名"
                    prop="name">
            <Input v-model="formValidate.name"
                   type="text"
                   placeholder="课程标题名"></Input>
            <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：课程标题名</p>
          </FormItem>
          </Col>
          <Col :span="12">
          <FormItem label="分类标签"
                    prop="type_id">
            <Select v-model="formValidate.type_id"
                    clearable
                    placeholder="标签">
              <Option v-for="item in TagsList"
                      :value="item.id"
                      :key="item.id">{{ item.type_name }}</Option>
            </Select>
            <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：选择分类标签</p>
          </FormItem>
          </Col>

        </Row>

        <Row>
          <Col :span="12">
          <FormItem label="购买次数"
                    prop="buy_num">
            <Input v-model="formValidate.buy_num"
                   type="number"
                   placeholder="购买次数"></Input>
            <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：输入播放次数</p>
          </FormItem>
          </Col>
          <Col :span="12">
          <FormItem label="选择讲师"
                    prop="teacher_name">
            <Input placeholder="选择讲师"
                   v-model="formValidate.teacher_name"
                   readonly
                   style="width: 230px" />
            <Button type="info"
                    @click="thers">选择</Button>
            <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：选择主讲老师</p>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col :span="12">
          <FormItem label="参与人数"
                    prop="join_num">
            <Input v-model="formValidate.join_num"
                   type="number"
                   placeholder="参与人数"></Input>
            <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：输入参与人数</p>
          </FormItem>

          </Col>

          <Col :span="12">
          <FormItem label="课程价格"
                    prop="price">
            <Input type="number"
                   v-model="formValidate.price"
                   placeholder="输入课程价格"
                   clearable
                   style="width: 300px" />
            <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：调整该课程的价格</p>
          </FormItem>
          </Col>
        </Row>

        <Row>

          <!-- <Col :span="12">
          <FormItem label="计费方式"
                    prop="billing_status">
            <RadioGroup v-model="formValidate.billing_status"
                        style="margin-left:10px">
              <Radio :label="1">收费</Radio>
              <Radio :label="2">免费</Radio>
            </RadioGroup>
            <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: nvbormal;">提示：选择该课程是否为收费课程</p>
          </FormItem>
          </Col> -->
          <Col :span="12">
          <FormItem label="到期时间"
                    prop="study_days">
            <Input type="number"
                   v-model="formValidate.study_days"
                   placeholder="输入到期时间/天"
                   clearable />
            <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: nvbormal;">提示：选择该课程到期时间/天</p>
          </FormItem>
          </Col>
        </Row>

        <Row>
          <FormItem label="课程描述"
                    prop="description">
            <Input v-model="formValidate.description"
                   type="textarea"
                   :autosize="{minRows: 3,maxRows: 10}"
                   placeholder="简介..."></Input>
            <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：课程描述</p>
          </FormItem>
        </Row>
        <Row>
          <FormItem label="课程资讯"
                    prop="consult">
            <ESditors ref="Consult"
                      :retitle="'editor_id'"
                      v-model="formValidate.consult"></ESditors>
          </FormItem>
        </Row>
        <Row>
          <FormItem label="七星服务"
                    prop="seven_serve">
            <ECditors ref="senven"
                      :retitle="'editor_id2'"
                      v-model="formValidate.seven_serve"></ECditors>
          </FormItem>
        </Row>
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
          <div style="text-align: center;">
            <Button @click="handleReset('formValidate')">重置</Button>
            <Button type="primary"
                    @click="handleSubmit('formValidate')"
                    style="margin-left: 8px">修 改 课 程</Button>
          </div>
        </FormItem>
      </Form>
    </Card>
    <Modal v-model="modal"
           draggable
           scrollable
           title="讲师列表"
           :width="800"
           :footer-hide="true">
      <div>
        <Table ref="tables"
               stripe
               size="small"
               :columns="columns1"
               :data="teacherList"></Table>
      </div>
      <Button type="primary"
              @click="OK">确定选择</Button>
    </Modal>
  </div>

</template>

<script>
import { orgList } from "@/api/course";
import { putEduPackage, getEduPackage, eduTypeList } from "@/api/Educode";
import ECditors from "@/components/editor/editor";
import ESditors from "@/components/editor/editor";
import { proMjor2tree } from "@/api/Linkmenu";

import { mapMutations } from "vuex";
import { teacherList } from "@/api/teacher";
import Fomat from "@/libs/fomat";
import config from "@/config";
export default {
  data() {
    return {
      uplodapath: "/upload/Index/uploadImage",
      visible: false,
      modal: false,
      parmsid: [],
      onoff: true,
      show: true,
      count: "添加课程",
      timer: null,
      ther: [],
      Ather: [],
      class_name: "",
      moddle: {
        courseOne: false,
        courseTwo: true
      },
      uploadList: [],
      uploadList2: [],
      uploadList3: [],
      uploadList4: [],
      uploadList5: [],

      TagsList: [],
      imgUrl: "",
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
      valueList: [],
      orgList: [],
      teacherList: [],
      formValidate: {
        teacher_name: "",
        type_id: "",
        view_class: "",
        id: "",
        name: "",
        project_id: "",
        buy_num: "",
        major_id: "",
        org_id: "",
        teacher_id: "",
        description: "",
        status: "",
        study_days: "",
        brief_img: "",
        pc_img: "",
        app_img: "",
        billing_status: "1",
        sort: "",
        price: "",
        join_num: "",
        is_sign: "",
        is_zheng: "",
        vip_video: "",
        vip_bank: "",
        line_answer: "",
        is_overclass: "",
        consult: "",
        seven_serve: ""
      },
      columns1: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "ID",
          key: "id"
        },
        {
          title: "姓名",
          key: "name"
        },
        {
          title: "专业",
          key: "title"
        }
      ],
      ruleValidate: {
        name: [
          {
            required: true,
            validator: Fomat.Rules.Verifiy().elegan
          }
        ],
        project_id: [
          {
            required: true,
            validator: Fomat.Rules.Verifiy().Required,
            trigger: "change"
          }
        ],
        view_class: [
          {
            required: true,
            validator: Fomat.Rules.Verifiy().Required,
            trigger: "change"
          }
        ],
        org_id: [
          {
            required: true,
            validator: Fomat.Rules.Verifiy().Required,
            trigger: "change"
          }
        ],
        teacher_name: [
          {
            required: true,
            validator: Fomat.Rules.Verifiy().Required,
            trigger: "change"
          }
        ],
        description: [
          {
            required: true,
            validator: Fomat.Rules.Verifiy().Required,
            trigger: "blur"
          }
        ],
        join_num: [
          {
            required: true,
            validator: Fomat.Rules.Verifiy().Bnum,
            trigger: "change"
          }
        ],
        status: [
          {
            required: true,
            validator: Fomat.Rules.Verifiy().Required,
            trigger: "change"
          }
        ],
        brief_img: [
          { required: true, validator: Fomat.Rules.Verifiy().Required }
        ],
        buy_num: [{ required: true, validator: Fomat.Rules.Verifiy().Bnum }],
        type_id: [
          { required: true, validator: Fomat.Rules.Verifiy().Required }
        ],
        app_img: [
          { required: true, validator: Fomat.Rules.Verifiy().Required }
        ],
        pc_img: [{ required: true, validator: Fomat.Rules.Verifiy().Required }],
        wx_img: [{ required: true, validator: Fomat.Rules.Verifiy().Required }],
        mobile_img: [
          { required: true, validator: Fomat.Rules.Verifiy().Required }
        ],
        study_days: [
          {
            required: true,
            validator: Fomat.Rules.Verifiy().Bnum
          }
        ],

        billing_status: [
          {
            required: true,
            validator: Fomat.Rules.Verifiy().Required,
            trigger: "change"
          }
        ],
        price: [
          {
            required: true,
            validator: Fomat.Rules.Verifiy().patten,
            trigger: "change"
          }
        ],
        line_answer: [
          {
            required: true,
            validator: Fomat.Rules.Verifiy().Required,
            trigger: "change"
          }
        ],
        consult: [
          {
            required: true,
            validator: Fomat.Rules.Verifiy().Required,
            trigger: "change"
          }
        ],
        seven_serve: [
          {
            required: true,
            validator: Fomat.Rules.Verifiy().Required,
            trigger: "change"
          }
        ],
        is_overclass: [
          {
            required: true,
            validator: Fomat.Rules.Verifiy().Required,
            trigger: "change"
          }
        ],
        vip_video: [
          {
            required: true,
            validator: Fomat.Rules.Verifiy().Required,
            trigger: "change"
          }
        ],
        vip_bank: [
          {
            required: true,
            validator: Fomat.Rules.Verifiy().Required,
            trigger: "change"
          }
        ],
        is_sign: [
          {
            required: true,
            validator: Fomat.Rules.Verifiy().Required,
            trigger: "change"
          }
        ],
        sort: [
          {
            required: true,
            validator: Fomat.Rules.Verifiy().Required,
            trigger: "change"
          }
        ],

        is_zheng: [
          {
            required: true,
            validator: Fomat.Rules.Verifiy().Required,
            trigger: "change"
          }
        ]
      }
    };
  },
  components: {
    // 引入组件
    ECditors,
    ESditors
  },
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
    "formValidate.view_class"(newValue, oldValue) {
      if (newValue === 1) {
        this.moddle.courseOne = true;
        this.moddle.courseTwo = false;
      } else if (newValue === 2) {
        this.moddle.courseOne = false;
        this.moddle.courseTwo = true;
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
    rowClassName(row, index) {
      if (index === 1) {
        return "demo-table-info-row";
      } else if (index === 3) {
        return "demo-table-error-row";
      }
      return "";
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
    handleBeforeUpload() {},
    handleSubmit(name) {
      this.formValidate.consult = this.$refs.Consult.editorText;
      this.formValidate.seven_serve = this.$refs.senven.editorText;
      this.$refs[name].validate(valid => {
        if (valid) {
          if (this.onoff) {
            putEduPackage(this.formValidate).then(res => {
              if (res.data.code === 200) {
                this.onoff = false;
                this.$Message.success("修改成功!");
                this.$router.push({ name: "eduPackageList" });
              }
            });
          }
        } else {
          this.$Message.error("请认真填写信息!");
        }
      });
    },

    handleReset(name) {
      this.valueList = [];
      this.uploadList = [];
      this.uploadList2 = [];
      this.uploadList3 = [];
      this.uploadList4 = [];
      this.uploadList5 = [];
      this.$refs.Consult.editorText = "";
      this.$refs.senven.editorText = "";
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
    courseDate(val) {
      this.formValidate.study_date = val;
    },
    thers() {
      this.modal = true;
    },

    OK() {
      this.modal = false;
      let { objData } = this.$refs.tables;
      let arr = [];
      let str = [];
      for (let item in objData) {
        if (objData[item]._isChecked === true) {
          arr.push(objData[item].id);
          str.push(objData[item].name);
        }

        this.formValidate.teacher_id = arr.join(",");
        this.formValidate.teacher_name = str.join(",");
      }
    },
    // 获取关课方式
    getList(obj) {
      eduTypeList(obj).then(res => {
        let rep = res.data;
        if (rep.code === 200) {
          this.TagsList = rep.data;
        }
      });
    },
    // 获取教师
    getTeacherList(obj) {
      teacherList(obj).then(res => {
        let rep = res.data;
        if (rep.code === 200) {
          this.teacherList = rep.data.data;
        }
      });
    },
    getData(id) {
      getEduPackage({ id: id }).then(res => {
        let rep = res.data;
        if (rep.code === 200) {
          this.formValidate.id = rep.data.id;
          this.formValidate.billing_status = rep.data.billing_status;
          this.formValidate.name = rep.data.name;
          this.formValidate.study_days = rep.data.study_days;
          this.valueList = [rep.data.project_id, rep.data.major_id];
          this.formValidate.view_class = rep.data.view_class;
          this.formValidate.org_id = rep.data.org_id;
          this.formValidate.teacher_id = rep.data.teacher_id.split(",");
          this.formValidate.status = rep.data.status;
          this.formValidate.sort = rep.data.sort;
          this.formValidate.price = rep.data.price;
          this.formValidate.vip_bank = rep.data.vip_bank;
          this.formValidate.is_sign = rep.data.is_sign;
          this.formValidate.is_zheng = rep.data.is_zheng;
          this.formValidate.description = rep.data.description;
          this.formValidate.join_num = rep.data.join_num;
          this.formValidate.type_id = rep.data.type_id;
          this.formValidate.teacher_name = rep.data.teacher_name;
          this.formValidate.vip_video = rep.data.vip_video;
          this.formValidate.line_answer = rep.data.line_answer;
          this.formValidate.vip_bank = rep.data.vip_bank;
          this.formValidate.study_date = rep.data.study_date;
          this.formValidate.study_days = rep.data.study_days;
          this.formValidate.consult = rep.data.consult;
          this.formValidate.seven_serve = rep.data.seven_serve;
          this.$refs.Consult.editorText = rep.data.consult;
          this.$refs.senven.editorText = rep.data.seven_serve;
          this.formValidate.buy_num = rep.data.buy_num;
          this.formValidate.is_overclass = rep.data.is_overclass;
          let { objData } = this.$refs.tables;
          this.formValidate.teacher_id.forEach((e, i) => {
            for (let item in objData) {
              if (objData[item].id == e) {
                this.$refs.tables.objData[item]._isChecked = true;
              }
            }
          });

          this.TagsList.forEach(item => {
            if (item.id === this.formValidate.type_id) {
              this.class_name = item.class_name;
            }
          });
          let list = [];
          let name = "";
          let list2 = [];
          let name2 = "";
          let list3 = [];
          let name3 = "";
          let list4 = [];
          let name4 = "";
          let list5 = [];
          let name5 = "";
          if (rep.data.pc_img) {
            list = rep.data.pc_img.split("/");
            name = list[list.length - 1];
          }
          this.uploadList = [];
          let obj = {
            name: name,
            url: rep.data.pc_img
          };

          rep.data.pc_img
            ? this.uploadList.push(obj)
            : (this.formValidate.pc_img = rep.data.pc_img);
          if (rep.data.app_img) {
            list2 = rep.data.app_img.split("/");
            name2 = list2[list2.length - 1];
          }
          this.uploadList2 = [];
          let obj2 = {
            name: name2,
            url: rep.data.app_img
          };

          rep.data.app_img
            ? this.uploadList2.push(obj2)
            : (this.formValidate.app_img = rep.data.app_img);
          if (rep.data.wx_img) {
            list3 = rep.data.wx_img.split("/");
            name3 = list3[list3.length - 1];
          }
          this.uploadList3 = [];
          let obj3 = {
            name: name3,
            url: rep.data.wx_img
          };

          rep.data.wx_img
            ? this.uploadList3.push(obj3)
            : (this.formValidate.wx_img = rep.data.wx_img);
          if (rep.data.mobile_img) {
            list4 = rep.data.mobile_img.split("/");
            name4 = list4[list4.length - 1];
          }
          this.uploadList4 = [];
          let obj4 = {
            name: name4,
            url: rep.data.mobile_img
          };

          rep.data.mobile_img
            ? this.uploadList4.push(obj4)
            : (this.formValidate.mobile_img = rep.data.mobile_img);
          if (rep.data.brief_img) {
            list5 = rep.data.brief_img.split("/");
            name5 = list5[list5.length - 1];
          }
          this.uploadList5 = [];
          let obj5 = {
            name: name5,
            url: rep.data.brief_img
          };

          rep.data.brief_img
            ? this.uploadList5.push(obj5)
            : (this.formValidate.brief_img = rep.data.brief_img);
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
