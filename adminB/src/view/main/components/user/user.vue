<template>
  <div class="user-avator-dropdown">
    <Button type="success" style="margin-right:5px" @click="coment">查看使用说明</Button>
    <Dropdown @on-click="handleClick">
      <Avatar :src="userAvator" />
      <strong style="padding: 0 6px 0 8px; color: #333; font-size: 14px;">{{ userName }}</strong>
      <Icon :size="18" type="md-arrow-dropdown"></Icon>
      <DropdownMenu slot="list">
        <DropdownItem name="putuser">修改信息</DropdownItem>
        <DropdownItem name="putpaseword">修改密码</DropdownItem>
        <DropdownItem name="logout">退出登录</DropdownItem>
      </DropdownMenu>
    </Dropdown>
    <!-- 修改信息 -->
    <Modal v-model="modal2" title="修改个人信息" :width="640" :footer-hide="true">
      <div>
        <Form ref="formValidate2" :model="formValidate2" :rules="ruleValidate" :label-width="80">
          <Row style="margin-top:20px">
            <Col :span="12">
              <FormItem label="真实姓名" prop="truename">
                <Input v-model="formValidate2.truename" placeholder="真实姓名"></Input>
                <p
                  style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;"
                >提示：汉字，2 ~ 4字</p>
              </FormItem>
            </Col>
            <Col :span="12">
              <FormItem label="手机号码" prop="mobile">
                <Input v-model="formValidate2.mobile" placeholder="手机号码"></Input>
                <p
                  style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;"
                >提示：用于特殊情况联系</p>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col :span="12">
              <FormItem label="绑定角色" prop="group_id" v-show="visible">
                <Select v-model="formValidate2.group_id" clearable>
                  <Option
                    v-for="item in roleList"
                    :value="item.value"
                    :key="item.value"
                  >{{ item.label }}</Option>
                </Select>
                <p
                  style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;"
                >提示：选择角色则拥有对应权限</p>
              </FormItem>
            </Col>
            <Col :span="12">
              <FormItem label="账户名称" prop="username" v-show="visible">
                <Input v-model="formValidate2.username" readonly placeholder="账户名称"></Input>
                <p
                  style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;"
                >提示：字母，用做登录后台账号</p>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col :span="12">
              <FormItem label="班 主 任" prop="is_teacher" v-show="visible">
                <RadioGroup v-model="formValidate2.is_teacher">
                  <Radio label="1">是</Radio>
                  <Radio label="2">不是</Radio>
                </RadioGroup>
                <p
                  style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;"
                >提示：选择是否是班主任</p>
              </FormItem>
            </Col>
            <Col :span="12">
              <FormItem label="答疑老师" prop="is_answer" v-show="visible">
                <RadioGroup v-model="formValidate2.is_answer">
                  <Radio label="1">是</Radio>
                  <Radio label="2">不是</Radio>
                </RadioGroup>
                <p
                  style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;"
                >提示：选择是否是答疑老师</p>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col :span="12">
              <FormItem label="邮箱地址" prop="email">
                <Input v-model="formValidate2.email" placeholder="邮箱地址"></Input>
                <p
                  style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;"
                >提示：用于特殊情况联系</p>
              </FormItem>
            </Col>
            <Col :span="12">
              <FormItem label="账号头像" prop="head_img">
                <div class="demo-upload-list" v-for="(item,key) in uploadList2" :key="key">
                  <template>
                    <img :src="item.url" />
                    <div class="demo-upload-list-cover">
                      <Icon type="ios-eye-outline" @click.native="handleView(item.url)"></Icon>
                      <Icon type="ios-trash-outline" @click.native="handleRemove2(item)"></Icon>
                    </div>
                  </template>
                </div>
                <Upload
                  ref="upload"
                  :show-upload-list="false"
                  :on-success="handleSuccess2"
                  :on-format-error="handleFormatError"
                  :on-exceeded-size="handleMaxSize"
                  :format="['jpg','jpeg','png']"
                  :max-size="1000"
                  type="drag"
                  action="/upload/Index/uploadImage"
                  name="image"
                  style="display: inline-block;width:58px;"
                >
                  <div style="width: 58px;height:58px;line-height: 58px;">
                    <Icon type="ios-camera" size="20"></Icon>
                  </div>
                </Upload>
                <p
                  style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;"
                >提示：图片为正方形比例</p>
              </FormItem>
            </Col>
          </Row>
          <FormItem>
            <div style="text-align: right;">
              <Button @click="handleReset2('formValidate2')">重置</Button>
              <Button
                type="primary"
                @click="handleSubmit2('formValidate2')"
                style="margin-left: 8px"
              >修 改</Button>
            </div>
          </FormItem>
        </Form>
      </div>
    </Modal>
    <!-- 重置密码-->
    <Modal v-model="modal" title="重置密码" :footer-hide="true">
      <div>
        <Form ref="pasForm" :model="pasForm" :rules="rulePas" :label-width="80">
          <FormItem label="原 密 码" prop="old_password">
            <Input v-model="pasForm.old_password" type="password" placeholder="请输入之前密码"></Input>
          </FormItem>
          <FormItem label="新 密 码" prop="pass">
            <Input v-model="pasForm.pass" type="password" placeholder="请输新密码"></Input>
          </FormItem>
          <FormItem label="再输密码" prop="password">
            <Input v-model="pasForm.password" type="password" placeholder="请再次输入新的密码"></Input>
          </FormItem>
          <FormItem>
            <div style="text-align: right;">
              <Button @click="handleReset3('pasForm')" style="margin-right: 8px">重 置</Button>
              <Button type="primary" @click="handleSubmit3">提 交</Button>
            </div>
          </FormItem>
        </Form>
      </div>
    </Modal>
  </div>
</template>

<script>
import "./user.less";
import Fomat from "@/libs/fomat";
import { putUser, changePassword } from "@/api/control";
import { userInfo } from "@/api/user";
import { mapActions } from "vuex";
import config from "@/config";

export default {
  name: "User",
  props: {
    userAvator: {
      type: String,
      default: ""
    },
    userName: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      uploadList2: [],
      modal2: false,
      modal: false,
      visible: false,
      pasForm: {
        user_id: "",
        pass: "",
        old_password: "",
        password: ""
      },
      formValidate2: {
        user_id: "",
        truename: "",
        mobile: "",
        email: "",
        group_id: "",
        head_img: "",
        username: "",
        is_teacher: "",
        is_answer: ""
      },
      roleList: [{ value: 1, label: "男" }, { value: 2, label: "女" }],
      man: [{ id: 1, name: "男" }, { id: 2, name: "女" }],
      imgUrl: "",
      rulePas: {
        old_password: [
          { required: true, message: "请输入原密码", trigger: "blur" }
        ],
        pass: [{ required: true, message: "请输入新密码", trigger: "blur" }],
        password: [{ required: true, message: "请输入新密码", trigger: "blur" }]
      },
      ruleValidate: {
        username: [
          { required: true, message: "请输入账号名称", trigger: "blur" }
        ],
        truename: [
          { required: true, validator: Fomat.Rules.Verifiy().Required }
        ],
        password: [
          { required: true, message: "请输入账号密码", trigger: "blur" }
        ],
        pass: [
          { required: true, message: "请再次输入账号密码", trigger: "blur" }
        ],
        mobile: [{ required: true, validator: Fomat.Rules.Verifiy().Tel }],
        email: [{ required: true, validator: Fomat.Rules.Verifiy().Required }],
        group_id: [
          { required: true, message: "请选择角色", trigger: "change" }
        ],
        head_img: [{ required: true, message: "请上传头像", trigger: "blur" }],
        is_teacher: [
          { required: true, message: "请选择是否是班主任", trigger: "change" }
        ],
        is_answer: [
          { required: true, message: "请选择是否是答疑老师", trigger: "change" }
        ]
      }
    };
  },
  watch: {
    uploadList2(newValue, oldValue) {
      if (newValue.length != 0) {
        this.formValidate2.head_img = newValue[0].url;
      } else {
        this.formValidate2.head_img = "";
      }
    }
  },
  methods: {
    ...mapActions(["handleLogOut"]),
    handleView(url) {},
    handleRemove2(file) {
      let fileList = this.uploadList2;
      this.uploadList2.splice(fileList.indexOf(file), 1);
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

    handleReset2(name) {
      this.uploadList = [];
      this.$refs[name].resetFields();
    },
    handleReset3(name) {
      this.$refs[name].resetFields();
    },
    handleSubmit2() {
      putUser(this.formValidate2).then(res => {
        if (res.data.code === 200) {
          this.$Message.success("修改成功!");
          this.modal2 = false;
        }
      });
    },
    handleSubmit3() {
      this.pasForm.user_id = this.$store.state.user.userId;
      if (this.pasForm.pass != this.pasForm.password) {
        this.$Message.error("两次密码不一致，请重新输入!");
        this.pasForm.pass = "";
        this.pasForm.password = "";
        return;
      }
      if (this.pasForm.pass.length < 6) {
        this.$Message.error("密码必须大于六位!");
        this.pasForm.pass = "";
        this.pasForm.password = "";
        return;
      }
      changePassword(this.pasForm).then(res => {
        if (res.data.code === 200) {
          this.$Message.success("修改成功,下次生效!请重新登录后查看");
          this.handleReset3("pasForm");
          this.modal = false;
        } else if (res.data.code === 405) {
          this.$Message.error(res.data.data);
        }
      });
    },
    coment() {
      if (process.env.NODE_ENV === "production") {
        switch (document.domain) {
          case "dests.youcaiwx.cn":
            window.open(`https://dests.youcaiwx.cn/explans/index.html`);
            break;
          case "ycdb.youcaiwx.cn":
            window.open(`https://ycdb.youcaiwx.cn/explans/index.html`);
            break;
          default:
            window.open(`https://ycdb.youcaiwx.cn/explans/index.html`);
            break;
        }
      } else {
        window.open(`${config.baseUrl.test}/explans/index.html`);
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
    handleClick(name) {
      switch (name) {
        case "logout":
          this.handleLogOut().then(() => {
            this.$router.push({
              name: "login"
            });
            setTimeout(() => {
              window.location.reload(); // 刷新 重置路由数据
            }, 16);
          });
          break;
        case "putuser":
          this.uploadList2 = [];
          this.modal2 = true;
          userInfo({ user_id: this.$store.state.user.userId }).then(res => {
            let rep = res.data;
            if (rep.code === 200) {
              this.pasForm.user_id = rep.data.id;
              this.formValidate2.mobile = rep.data.mobile;
              this.formValidate2.user_id = rep.data.id;
              this.formValidate2.username = rep.data.username;
              this.uploadList2.push({
                name: "name",
                url: rep.data.head_img.split(",")
              });

              this.formValidate2.truename = rep.data.truename;
              this.formValidate2.email = rep.data.email;
            }
          });
          break;
        case "putpaseword":
          this.modal = true;
          break;
      }
    }
  },
  mounted() {}
};
</script>
<style lang="less" scoped>
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
</style>
