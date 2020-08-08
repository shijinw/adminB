<template>
  <div>
    <Card>
      <p slot="title">账号列表</p>
      <div>
        <Button type="default"
                shape="circle"
                icon="md-sync"
                @click="resetQ('formSeach')"></Button>
        <Divider type="vertical" />
        <Input v-model="formSeach.username"
               placeholder="登陆名称"
               style="width: 160px; margin-right: 10px;" />
        <Input v-model="formSeach.truename"
               placeholder="用户名"
               style="width: 160px; margin-right: 10px;" />
        <Input v-model="formSeach.mobile"
               placeholder="电话号码"
               style="width: 160px; margin-right: 10px;" />
        <Button type='primary'
                @click="seach"
                style="margin-right: 10px;">搜索</Button>
        <Button type='primary'
                style="margin-right: 10px;"
                @click="addNumber">添加账号</Button>
      </div>
      <Divider />
      <Table size="small"
             :columns="columns"
             :data="data"></Table>
      <div style="padding: 20px 0; text-align: right;">
        <Page :total="total"
              @on-change="onChange"
              @on-page-size-change="onPageSizeChange"
              :current="formSeach.page"
              :page-size="formSeach.limit"
              size="small"
              show-total
              show-elevator
              show-sizer />
      </div>

      <!-- 添加账号 -->
      <Modal v-model="modal"
             draggable
             :title="title"
             :width="640"
             :footer-hide="true">
        <div>
          <Form ref="formValidate"
                :model="formValidate"
                :rules="ruleValidate"
                :label-width="80">
            <Row>
              <Col :span="12">
              <FormItem label="账户名称"
                        prop="username">
                <Input v-model="formValidate.username"
                       placeholder="账户名称"></Input>
                <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：字母或数字，用做登录后台账号</p>
              </FormItem>
              </Col>
              <Col :span="12">
              <FormItem label="真实姓名"
                        prop="truename">
                <Input v-model="formValidate.truename"
                       placeholder="真实姓名"
                       :maxlength="5" />
                <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：汉字，2 ~ 4字</p>
              </FormItem>
              </Col>
            </Row>
            <Row>
              <Col :span="12">
              <FormItem label="账户密码"
                        prop="password">
                <Input v-model="formValidate.password"
                       placeholder="账户密码"></Input>
                <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：用做登录后台密码</p>
              </FormItem>
              </Col>
              <Col :span="12">
              <FormItem label="确认密码"
                        prop="pass">
                <Input v-model="formValidate.pass"
                       placeholder="确认密码"></Input>
                <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：请再次输入密码</p>
              </FormItem>
              </Col>
            </Row>
            <Row>
              <Col :span="12">
              <FormItem label="绑定角色"
                        prop="group_id">
                <Select v-model="formValidate.group_id"
                        clearable>
                  <Option v-for="item in roleList"
                          :value="item.value"
                          :key="item.value">{{ item.label }}</Option>
                </Select>
                <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：选择角色则拥有对应权限</p>
              </FormItem>
              </Col>
              <Col :span="12">
              <FormItem label="手机号码">
                <Input v-model="formValidate.mobile"
                       placeholder="手机号码"></Input>
                <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：用于特殊情况联系</p>
              </FormItem>
              </Col>
            </Row>
            <Row>
              <Col :span="12">
              <FormItem label="班 主 任"
                        prop="is_teacher">
                <RadioGroup v-model="formValidate.is_teacher">
                  <Radio label="1">是</Radio>
                  <Radio label="2">不是</Radio>
                </RadioGroup>
                <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：选择是否是班主任</p>
              </FormItem>
              </Col>
              <Col :span="12">
              <FormItem label="答疑老师"
                        prop="is_answer">
                <RadioGroup v-model="formValidate.is_answer">
                  <Radio label="1">是</Radio>
                  <Radio label="2">不是</Radio>
                </RadioGroup>
                <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：选择是否是答疑老师</p>
              </FormItem>
              </Col>
            </Row>
            <Row>
              <Col :span="12">
              <FormItem label="用户别名"
                        prop="alias_name">
                <Input v-model="formValidate.alias_name"
                       placeholder="姓名别名设置"></Input>
                <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：用于姓名别名设置</p>
              </FormItem>
              </Col>

            </Row>
            <FormItem>
              <div style="text-align: right;">
                <Button @click="handleReset('formValidate')">重置</Button>
                <Button type="primary"
                        @click="handleSubmit('formValidate')"
                        style="margin-left: 8px">提 交</Button>
              </div>
            </FormItem>
          </Form>
        </div>
      </Modal>

      <!-- 修改信息 -->
      <Modal v-model="modal2"
             draggable
             :title="title2"
             :width="640"
             :footer-hide="true">
        <div>
          <Form ref="formValidate2"
                :model="formValidate2"
                :rules="ruleValidate2"
                :label-width="80">
            <Row>
              <Col :span="12">
              <FormItem label="账户名称"
                        prop="username">
                <Input v-model="formValidate2.username"
                       placeholder="账户名称"
                       readonly></Input>
                <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：字母，用做登录后台账号，只读</p>
              </FormItem>
              </Col>
              <Col :span="12">
              <FormItem label="真实姓名"
                        prop="truename">
                <Input v-model="formValidate2.truename"
                       placeholder="真实姓名"
                       :maxlength="5" />
                <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：汉字，2 ~ 4字</p>
              </FormItem>
              </Col>
            </Row>
            <Row>
              <Col :span="12">
              <FormItem label="绑定角色"
                        prop="group_id">
                <Select v-model="formValidate2.group_id"
                        clearable>
                  <Option v-for="item in roleList"
                          :value="item.value"
                          :key="item.value">{{ item.label }}</Option>
                </Select>
                <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：选择角色则拥有对应权限</p>
              </FormItem>
              </Col>
              <Col :span="12">
              <FormItem label="手机号码">
                <Input v-model="formValidate2.mobile"
                       placeholder="手机号码"></Input>
                <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：用于特殊情况联系</p>
              </FormItem>
              </Col>
            </Row>
            <Row>
              <Col :span="12">
              <FormItem label="班 主 任"
                        prop="is_teacher">
                <RadioGroup v-model="formValidate2.is_teacher">
                  <Radio label="1">是</Radio>
                  <Radio label="2">不是</Radio>
                </RadioGroup>
                <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：选择是否是班主任</p>
              </FormItem>
              </Col>
              <Col :span="12">
              <FormItem label="答疑老师"
                        prop="is_answer">
                <RadioGroup v-model="formValidate2.is_answer">
                  <Radio label="1">是</Radio>
                  <Radio label="2">不是</Radio>
                </RadioGroup>
                <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：选择是否是答疑老师</p>
              </FormItem>
              </Col>
            </Row>
            <Row>
              <Col :span="12">
              <FormItem label="用户别名"
                        prop="alias_name">
                <Input v-model="formValidate2.alias_name"
                       placeholder="姓名别名设置"></Input>
                <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：用于姓名别名设置</p>
              </FormItem>
              </Col>
            </Row>
            <FormItem>
              <div style="text-align: right;">
                <Button @click="handleReset2('formValidate2')">重置</Button>
                <Button type="primary"
                        @click="handleSubmit2('formValidate2')"
                        style="margin-left: 8px">修 改</Button>
              </div>
            </FormItem>
          </Form>
        </div>
      </Modal>
      <!-- 重置密码 -->
      <Modal v-model="modal3"
             draggable
             scrollable
             title="重置密码"
             :footer-hide="true">
        <div>
          <Form ref="pasForm"
                :model="pasForm"
                :rules="rulePas"
                :label-width="80">
            <FormItem label="新 密 码"
                      prop="pass">
              <Input v-model="pasForm.pass"
                     type="password"
                     placeholder="请输入密码"></Input>
            </FormItem>
            <FormItem label="确认密码"
                      prop="password">
              <Input v-model="pasForm.password"
                     type="password"
                     placeholder="请再次输入密码"></Input>
            </FormItem>
            <FormItem>
              <div style="text-align: right;">
                <Button @click="handleReset3('pasForm')"
                        style="margin-right: 8px">重 置</Button>
                <Button type="primary"
                        @click="handleSubmit3('pasForm')">提 交</Button>
              </div>
            </FormItem>
          </Form>
        </div>
      </Modal>
    </Card>
  </div>
</template>

<script>
import {
  userList,
  groupList,
  addUser,
  putUser,
  deleteUser,
  frozenUser,
  changePassword
} from "@/api/control";
import Fomat from "@/libs/fomat";

export default {
  data() {
    return {
      data: [],
      total: 0,
      formSeach: {
        page: 1,
        limit: 10,
        username: "",
        truename: "",
        mobile: ""
      },
      visible: false,
      uploadList: [],
      uploadList2: [],
      roleList: [],
      defaultProps: {
        children: "children",
        label: "label"
      },
      columns: [
        {
          title: "ID",
          key: "id",
          minWidth: 80
        },
        {
          title: "账号头像",
          key: "head_img",
          minWidth: 100,
          render: (h, params) => {
            return h("div", [
              h("img", {
                attrs: {
                  src: params.row.head_img
                },
                style: {
                  width: "24px",
                  height: "24px",
                  padding: "5px 0 0 0"
                }
              })
            ]);
          }
        },
        {
          title: "登录账号",
          key: "username",
          minWidth: 100
        },
        {
          title: "真实姓名",
          key: "truename",
          minWidth: 100
        },
        {
          title: "手机号码",
          key: "mobile",
          minWidth: 100
        },

        {
          title: "账号状态",
          key: "is_frozen",
          minWidth: 100,
          render: (h, params) => {
            let texts = "";
            if (params.row.is_frozen == 0) {
              texts = "正常";
            } else if (params.row.is_frozen == 1) {
              texts = "冻结";
            }
            return h(
              "div",
              {
                props: {}
              },
              texts
            );
          }
        },
        {
          title: "用户别名",
          key: "alias_name",
          minWidth: 120,
          align: "center"
        },
        {
          title: "操作",
          key: "action",
          minWidth: 300,
          align: "center",
          render: (h, params) => {
            let texts = "";
            let disable = false;
            let disabled = false;
            if (params.row.is_frozen == 0) {
              texts = "冻结";
            } else if (params.row.is_frozen == 1) {
              texts = "解冻";
            }
            if (params.row.id === 1) {
              disable = true;
            } else {
              disable = false;
            }
            if (params.row.id === 1) {
              disabled = true;
            } else {
              disabled = false;
            }
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
                    type: "info",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.pasResat(params.row);
                    }
                  }
                },
                "重置密码"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "warning",
                    size: "small",
                    disabled: disabled
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.putType(params.row);
                    }
                  }
                },
                texts
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small",
                    disabled: disable
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
      ],
      modal: false,
      modal2: false,
      modal3: false,
      form: {
        id: "",
        title: "",
        arr: []
      },
      title: "",
      title2: "",
      formValidate: {
        truename: "",
        password: "",
        pass: "",
        mobile: "",
        email: "",
        group_id: "",
        head_img: "",
        username: "",
        is_teacher: "2",
        is_answer: "2",
        alias_name: ""
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
        is_answer: "",
        alias_name: ""
      },
      ruleValidate: {
        username: [{ required: true, validator: Fomat.Rules.Verifiy().ENcode }],
        truename: [
          {
            required: true,
            validator: Fomat.Rules.Verifiy().Required,
            message: "请输入真实姓名"
          }
        ],
        password: [
          { required: true, message: "请输入账号密码", trigger: "blur" }
        ],
        pass: [
          { required: true, message: "请再次输入账号密码", trigger: "blur" }
        ],
        mobile: [{ required: true, validator: Fomat.Rules.Verifiy().Tel }],
        email: [{ required: true, validator: Fomat.Rules.Verifiy().Email }],
        group_id: [
          { required: true, message: "请选择角色", trigger: "change" }
        ],
        head_img: [
          { required: true, message: "请上传头像", trigger: "change" }
        ],
        is_teacher: [
          { required: true, message: "请选择是否是班主任", trigger: "change" }
        ],
        is_answer: [
          { required: true, message: "请选择是否是答疑老师", trigger: "change" }
        ],
        alias_name: [
          { required: true, message: "请输入姓名的别名", trigger: "blur" }
        ]
      },
      ruleValidate2: {
        username: [{ required: true, validator: Fomat.Rules.Verifiy().ENcode }],
        truename: [
          {
            required: true,
            validator: Fomat.Rules.Verifiy().Required,
            message: "请输入真实姓名"
          }
        ],
        mobile: [{ required: true, validator: Fomat.Rules.Verifiy().Tel }],
        email: [{ required: true, validator: Fomat.Rules.Verifiy().Email }],
        group_id: [
          { required: true, message: "请选择角色", trigger: "change" }
        ],
        head_img: [
          { required: true, message: "请上传头像", trigger: "change" }
        ],
        is_teacher: [
          { required: true, message: "请选择是否是班主任", trigger: "change" }
        ],
        is_answer: [
          { required: true, message: "请选择是否是答疑老师", trigger: "change" }
        ],
        alias_name: [
          { required: true, message: "请输入姓名的别名", trigger: "blur" }
        ]
      },
      pasForm: {
        user_id: "",
        pass: "",
        password: ""
      },
      rulePas: {
        pass: [{ required: true, message: "请输入密码", trigger: "blur" }],
        password: [
          { required: true, message: "请再次输入密码", trigger: "blur" }
        ]
      }
    };
  },
  components: {},
  watch: {
    uploadList(newValue, oldValue) {
      if (newValue.length != 0) {
        this.formValidate.head_img = newValue[0].url;
      } else {
        this.formValidate.head_img = "";
      }
    },
    uploadList2(newValue, oldValue) {
      if (newValue.length != 0) {
        this.formValidate2.head_img = newValue[0].url;
      } else {
        this.formValidate2.head_img = "";
      }
    }
  },
  methods: {
    seach() {
      this.getData(this.formSeach);
    },
    resetQ() {
      this.formSeach.username = "";
      this.formSeach.truename = "";
      this.formSeach.mobile = "";
      this.getData(this.formSeach);
    },
    putType(row) {
      if (row.is_frozen == 0) {
        this.$Modal.confirm({
          title: "温馨提示",
          content: "是否确认冻结此用户吗？",
          onOk: () => {
            frozenUser({ user_id: row.id, is_frozen: 1 }).then(res => {
              if (res.data.code === 200) {
                this.$Message.success("冻结成功!");
                this.getData(this.formSeach);
              }
            });
          }
        });
      } else {
        this.$Modal.confirm({
          title: "温馨提示",
          content: "是否为此用户解除冻结？",
          onOk: () => {
            frozenUser({ user_id: row.id, is_frozen: 0 }).then(res => {
              if (res.data.code === 200) {
                this.$Message.success("账号已恢复正常!");
                this.getData(this.formSeach);
              }
            });
          }
        });
      }
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
      console.log("准备上传————001");
    },
    onChange(val) {
      var self = this;
      self.formSeach.page = val;
      self.getData(self.formSeach);
    },
    onPageSizeChange(val) {
      var self = this;
      self.formSeach.limit = val;
      self.getData(self.formSeach);
    },
    addNumber() {
      this.title = "添加账号";
      this.handleReset("formValidate");
      this.modal = true;
    },
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          addUser(this.formValidate).then(res => {
            if (res.data.code === 200) {
              this.$Message.success("添加成功!");
              this.handleReset(name);
              this.modal = false;
              this.getData(this.formSeach);
            }
          });
        } else {
          this.$Message.error("请认真填写后再提交!");
        }
      });
    },
    handleReset(name) {
      this.uploadList = [];
      this.$refs[name].resetFields();
    },
    handleSubmit2(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          putUser(this.formValidate2).then(res => {
            if (res.data.code === 200) {
              this.$Message.success("修改成功!");
              this.handleReset2(name);
              this.modal2 = false;
              this.getData(this.formSeach);
            }
          });
        } else {
          this.$Message.error("请认真填写后再提交!");
        }
      });
    },
    handleReset2(name) {
      this.uploadList2 = [];
      this.$refs[name].resetFields();
    },
    handleSubmit3(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
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
              this.$Message.success("重置成功!");
              this.handleReset3(name);
              this.modal3 = false;
              this.getData(this.formSeach);
            }
          });
        } else {
          this.$Message.error("请认真填写后再提交!");
        }
      });
    },
    handleReset3(name) {
      this.$refs[name].resetFields();
    },
    pasResat(row) {
      this.pasForm.user_id = row.id;
      this.modal3 = true;
    },
    remove(row) {
      this.$Modal.confirm({
        title: "温馨提示",
        content: "是否确认删除此角色吗？",
        onOk: () => {
          deleteUser(row.id).then(res => {
            if (res.data.code === 200) {
              this.$Message.success("删除成功!");
              this.getData(this.formSeach);
            }
          });
        }
      });
    },
    put(row) {
      this.formValidate2.user_id = row.id;
      this.formValidate2.username = row.username;
      this.formValidate2.truename = row.truename;
      this.formValidate2.mobile = row.mobile;
      this.formValidate2.email = row.email;
      this.formValidate2.alias_name = row.alias_name;
      this.formValidate2.is_answer = row.is_answer.toString();
      this.formValidate2.is_teacher = row.is_teacher.toString();
      this.formValidate2.group_id = row.group_id ? row.group_id.toString() : "";
      let list = row.head_img.split("/");
      let name = list[list.length - 1];
      this.uploadList2 = [];
      let obj = {
        name: name,
        url: row.head_img
      };
      this.uploadList2.push(obj);
      this.title2 = "修改账号信息";
      this.modal2 = true;
    },
    getData(obj) {
      userList(obj).then(res => {
        let rep = res.data;
        if (rep.code === 200) {
          this.total = rep.data.total;
          this.data = rep.data.data;
        }
      });
    },
    getList() {
      groupList().then(res => {
        let rep = res.data;
        if (rep.code === 200) {
          this.roleList = [];
          rep.data.forEach(val => {
            let obj = {};
            obj.label = val.title;
            obj.value = val.id.toString();
            this.roleList.push(obj);
          });
        }
      });
    }
  },
  mounted() {
    this.getData(this.formSeach);
    this.getList();
  }
};
</script>

<style lang="less">
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
