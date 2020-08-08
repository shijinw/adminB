<template>
  <div>
    <Card>
      <Tabs type="card"
            v-model="name"
            @on-click="tagChange"
            :animated="false">
        <TabPane label="支付宝设置"
                 name="alipay">
          <Row style="margin-top: 20px;">
            <Row style="border: 1px solid #ccc;">
              <Row style="border-bottom: 1px solid #ccc; text-align: center;">
                <Col :span="12"
                     class="box"><strong>名称</strong></Col>
                <Col :span="12"
                     class="box"
                     style="border-left: 1px solid #ccc;"><strong>内容</strong></Col>
              </Row>
              <Row style="border-bottom: 1px solid #ccc; text-align: center;">
                <Col :span="12"
                     class="box"
                     style="line-height: 32px;">合作者身份（PID）</Col>
                <Col :span="12"
                     class="box"
                     style="border-left: 1px solid #ccc;">
                <Input v-model="zhifuForm.app_id"
                       placeholder="合作者身份（PID）"></Input>
                </Col>
              </Row>
              <Row style="border-bottom: 1px solid #ccc; text-align: center;">
                <Col :span="12"
                     class="box"
                     style="line-height: 32px;">安全效验码（Key）</Col>
                <Col :span="12"
                     class="box"
                     style="border-left: 1px solid #ccc;">
                <Input v-model="zhifuForm.private_key"
                       placeholder="安全效验码（Key）"></Input>
                </Col>
              </Row>
              <Row style="border-bottom: 1px solid #ccc; text-align: center;">
                <Col :span="12"
                     class="box"
                     style="line-height: 32px;">商家邮箱</Col>
                <Col :span="12"
                     class="box"
                     style="border-left: 1px solid #ccc;">
                <Input v-model="zhifuForm.alipay_email"
                       placeholder="商家邮箱"></Input>
                </Col>
              </Row>
              <Row style="text-align: center;">
                <Col :span="12"
                     class="box"
                     style="line-height: 32px;">支付选择（企业或者个人，个人需指定）</Col>
                <Col :span="12"
                     class="box"
                     style="border-left: 1px solid #ccc;">
                <Input v-model="zhifuForm.alipay_type"
                       placeholder="支付选择（企业或者个人，个人需指定）"></Input>
                </Col>
              </Row>
            </Row>
            <Row style="margin-top: 20px;text-align: center;">
              <Button type="primary"
                      @click="put">修 改</Button>
            </Row>
          </Row>
        </TabPane>
        <TabPane label="微信支付设置"
                 name="WeChat">
          <Row style="margin-top: 20px;">
            <Row style="border: 1px solid #ccc;">
              <Row style="border-bottom: 1px solid #ccc; text-align: center;">
                <Col :span="12"
                     class="box"><strong>名称</strong></Col>
                <Col :span="12"
                     class="box"
                     style="border-left: 1px solid #ccc;"><strong>内容</strong></Col>
              </Row>
              <Row style="border-bottom: 1px solid #ccc; text-align: center;">
                <Col :span="12"
                     class="box"
                     style="line-height: 32px;">支付的APPID</Col>
                <Col :span="12"
                     class="box"
                     style="border-left: 1px solid #ccc;">
                <Input v-model="wxForm.APPID"
                       placeholder="支付的APPID"></Input>
                </Col>
              </Row>
              <Row style="border-bottom: 1px solid #ccc; text-align: center;">
                <Col :span="12"
                     class="box"
                     style="line-height: 32px;">商户号</Col>
                <Col :span="12"
                     class="box"
                     style="border-left: 1px solid #ccc;">
                <Input v-model="wxForm.MCHID"
                       placeholder="商户号"></Input>
                </Col>
              </Row>
              <Row style="text-align: center;">
                <Col :span="12"
                     class="box"
                     style="line-height: 32px;">支付秘钥</Col>
                <Col :span="12"
                     class="box"
                     style="border-left: 1px solid #ccc;">
                <Input v-model="wxForm.KEY"
                       placeholder="支付秘钥"></Input>
                </Col>
              </Row>
            </Row>
            <Row style="margin-top: 20px;text-align: center;">
              <Button type="primary"
                      @click="put">修 改</Button>
            </Row>
          </Row>
        </TabPane>
        <TabPane label="cc视频设置"
                 name="ccvideo">
          <Row style="margin-top: 20px;">
            <Row style="border: 1px solid #ccc;">
              <Row style="border-bottom: 1px solid #ccc; text-align: center;">
                <Col :span="12"
                     class="box"><strong>名称</strong></Col>
                <Col :span="12"
                     class="box"
                     style="border-left: 1px solid #ccc;"><strong>内容</strong></Col>
              </Row>
              <Row style="border-bottom: 1px solid #ccc; text-align: center;">
                <Col :span="12"
                     class="box"
                     style="line-height: 32px;">cc视频ID_加密</Col>
                <Col :span="12"
                     class="box"
                     style="border-left: 1px solid #ccc;">
                <Input v-model="ccForm.cc_appID_encrypt"
                       placeholder="cc视频ID_加密"></Input>
                </Col>
              </Row>
              <Row style="text-align: center;">
                <Col :span="12"
                     class="box"
                     style="line-height: 32px;">cc视频ID_非加密</Col>
                <Col :span="12"
                     class="box"
                     style="border-left: 1px solid #ccc;">
                <Input v-model="ccForm.cc_appID_unencrypt"
                       placeholder="cc视频ID_非加密"></Input>
                </Col>
              </Row>
            </Row>
            <Row style="margin-top: 20px;text-align: center;">
              <Button type="primary"
                      @click="put">修 改</Button>
            </Row>
          </Row>
        </TabPane>
        <TabPane label="短信账户设置"
                 name="sendSms">
          <Row style="margin-top: 20px;">
            <Row style="border: 1px solid #ccc;">
              <Row style="border-bottom: 1px solid #ccc; text-align: center;">
                <Col :span="12"
                     class="box"><strong>名称</strong></Col>
                <Col :span="12"
                     class="box"
                     style="border-left: 1px solid #ccc;"><strong>内容</strong></Col>
              </Row>
              <Row style="border-bottom: 1px solid #ccc; text-align: center;">
                <Col :span="12"
                     class="box"
                     style="line-height: 32px;">用户名</Col>
                <Col :span="12"
                     class="box"
                     style="border-left: 1px solid #ccc;">
                <Input v-model="sendSmsForm.username"
                       placeholder="用户名"></Input>
                </Col>
              </Row>
              <Row style="text-align: center;">
                <Col :span="12"
                     class="box"
                     style="line-height: 32px;">密码</Col>
                <Col :span="12"
                     class="box"
                     style="border-left: 1px solid #ccc;">
                <Input v-model="sendSmsForm.password"
                       placeholder="密码"></Input>
                </Col>
              </Row>
            </Row>
            <Row style="margin-top: 20px;text-align: center;">
              <Button type="primary"
                      @click="put">修 改</Button>
            </Row>
          </Row>
        </TabPane>
        <TabPane label="优惠卷设置"
                 name="coupon">
          <Row style="border: 1px solid #ccc;">
            <Row style="border-bottom: 1px solid #ccc; text-align: center;">
              <Col :span="12"
                   class="box"><strong>名称</strong></Col>
              <Col :span="12"
                   class="box"
                   style="border-left: 1px solid #ccc;"><strong>内容</strong></Col>
            </Row>
            <Row style="text-align: center;">
              <Col :span="12"
                   class="box"
                   style="line-height: 32px;">优惠券最高减免额度(元)</Col>
              <Col :span="12"
                   class="box"
                   style="border-left: 1px solid #ccc;">
              <Input v-model="couponForm.coupon"
                     placeholder="优惠券最高减免额度"></Input>
              </Col>
            </Row>
          </Row>
          <Row style="margin-top: 20px;text-align: center;">
            <Button type="primary"
                    @click="put">修 改</Button>
          </Row>
          </Row>
        </TabPane>
        <TabPane label="内购开关"
                 name="purchase">
          <Row style="border: 1px solid #ccc;">
            <Row style="border-bottom: 1px solid #ccc; text-align: center;">
              <Col :span="12"
                   class="box"><strong>名称</strong></Col>
              <Col :span="12"
                   class="box"
                   style="border-left: 1px solid #ccc;"><strong>内容</strong></Col>
            </Row>
            <Row style="text-align: center;">
              <Col :span="12"
                   class="box"
                   style="line-height: 32px;">是否开启内购</Col>
              <Col :span="12"
                   class="box"
                   style="border-left: 1px solid #ccc;line-height: 32px;">
              {{ purchaseForm.in_purchase == 1 ? '是' : '否' }}
              </Col>
            </Row>
          </Row>
          <Row style="margin-top: 20px;text-align: center;">
            <Button type="primary"
                    @click="put">修 改</Button>
          </Row>
        </TabPane>
        <TabPane label="超级验证码"
                 name="superverify">
          <Row style="border: 1px solid #ccc;">
            <Row style="border-bottom: 1px solid #ccc; text-align: center;">
              <Col :span="12"
                   class="box"><strong>名称</strong></Col>
              <Col :span="12"
                   class="box"
                   style="border-left: 1px solid #ccc;"><strong>内容</strong></Col>
            </Row>
            <Row style="text-align: center;">
              <Col :span="12"
                   class="box"
                   style="line-height: 32px;">超级验证码</Col>
              <Col :span="12"
                   class="box"
                   style="border-left: 1px solid #ccc;">
              <Input v-model="ckoble.superverify"
                     placeholder="超级验证码输入"></Input>
              </Col>
            </Row>
          </Row>
          <Row style="margin-top: 20px;text-align: center;">
            <Button type="primary"
                    @click="put">修 改</Button>
          </Row>
          </Row>
        </TabPane>
        <TabPane label="邮箱设置"
                 name="email">
          <Row style="border: 1px solid #ccc;">
            <Row style="border-bottom: 1px solid #ccc; text-align: center;">
              <Col :span="12"
                   class="box"><strong>名称</strong></Col>
              <Col :span="12"
                   class="box"
                   style="border-left: 1px solid #ccc;"><strong>内容</strong></Col>
            </Row>
            <Row style="border-bottom: 1px solid #ccc; text-align: center;">
              <Col :span="12"
                   class="box"
                   style="line-height: 32px;">邮箱服务器</Col>
              <Col :span="12"
                   class="box"
                   style="border-left: 1px solid #ccc;">
              <Input v-model="emailForm.Host"
                     placeholder="邮箱服务器"></Input>
              </Col>
            </Row>
            <Row style="border-bottom: 1px solid #ccc; text-align: center;">
              <Col :span="12"
                   class="box"
                   style="line-height: 32px;">邮件发送端口</Col>
              <Col :span="12"
                   class="box"
                   style="border-left: 1px solid #ccc;">
              <Input v-model="emailForm.Port"
                     placeholder="邮件发送端口"></Input>
              </Col>
            </Row>
            <Row style="border-bottom: 1px solid #ccc; text-align: center;">
              <Col :span="12"
                   class="box"
                   style="line-height: 32px;">发件人地址</Col>
              <Col :span="12"
                   class="box"
                   style="border-left: 1px solid #ccc;">
              <Input v-model="emailForm.From"
                     placeholder="发件人地址"></Input>
              </Col>
            </Row>
            <Row style="border-bottom: 1px solid #ccc; text-align: center;">
              <Col :span="12"
                   class="box"
                   style="line-height: 32px;">用户昵称</Col>
              <Col :span="12"
                   class="box"
                   style="border-left: 1px solid #ccc;">
              <Input v-model="emailForm.FromName"
                     placeholder="用户昵称"></Input>
              </Col>
            </Row>
            <Row style="border-bottom: 1px solid #ccc; text-align: center;">
              <Col :span="12"
                   class="box"
                   style="line-height: 32px;">用户名</Col>
              <Col :span="12"
                   class="box"
                   style="border-left: 1px solid #ccc;">
              <Input v-model="emailForm.Username"
                     placeholder="用户名"></Input>
              </Col>
            </Row>
            <Row style="text-align: center;">
              <Col :span="12"
                   class="box"
                   style="line-height: 32px;">密码</Col>
              <Col :span="12"
                   class="box"
                   style="border-left: 1px solid #ccc;">
              <Input v-model="emailForm.Password"
                     placeholder="密码"></Input>
              </Col>
            </Row>
          </Row>
          <Row style="margin-top: 20px;text-align: center;">
            <Button type="primary"
                    @click="put">修 改</Button>
          </Row>
          </Row>
        </TabPane>
        <TabPane label="训练营开关"
                 name="sprint">
          <Row style="border: 1px solid #ccc;">
            <Row style="border-bottom: 1px solid #ccc; text-align: center;">
              <Col :span="12"
                   class="box"><strong>名称</strong></Col>
              <Col :span="12"
                   class="box"
                   style="border-left: 1px solid #ccc;"><strong>内容</strong></Col>
            </Row>
            <Row style="text-align: center;">
              <Col :span="12"
                   class="box"
                   style="line-height: 32px;">是否开启冲刺训练营模块</Col>
              <Col :span="12"
                   class="box"
                   style="border-left: 1px solid #ccc;line-height: 32px;">
              {{ sprintForm.sprint == 1 ? '是' : '否' }}
              </Col>
            </Row>
          </Row>
          <Row style="margin-top: 20px;text-align: center;">
            <Button type="primary"
                    @click="put">修 改</Button>
          </Row>
        </TabPane>
      </Tabs>
    </Card>
  </div>
</template>

<script>
import { systemList, putSystem } from "@/api/info";
export default {
  data() {
    return {
      name: "alipay",
      zhifuForm: {
        app_id: "",
        private_key: "",
        alipay_type: "",
        alipay_email: "",
        inc_type: "alipay"
      },
      ckoble: {
        superverify: "",
        inc_type: "superverify"
      },
      wxForm: {
        APPID: "",
        MCHID: "",
        KEY: "",
        inc_type: "WeChat"
      },
      ccForm: {
        cc_appID_encrypt: "",
        cc_appID_unencrypt: "",
        inc_type: "ccvideo"
      },
      couponForm: {
        coupon: "",
        inc_type: "coupon"
      },
      purchaseForm: {
        in_purchase: "",
        inc_type: "purchase"
      },
      sprintForm: {
        sprint: "",
        inc_type: "sprint"
      },
      sendSmsForm: {
        username: "",
        password: "",
        inc_type: "sendSms"
      },
      emailForm: {
        Host: "",
        Port: "",
        From: "",
        FromName: "",
        Username: "",
        Password: "",
        inc_type: "email"
      }
    };
  },
  components: {},
  watch: {},
  methods: {
    tagChange(name) {
      this.getData(name);
    },
    getData(name) {
      systemList(name).then(res => {
        let rep = res.data;
        if (rep.code === 200) {
          if (rep.data.inc_type === "alipay") {
            this.zhifuForm.app_id = rep.data.app_id;
            this.zhifuForm.private_key = rep.data.private_key;
            this.zhifuForm.alipay_type = rep.data.alipay_type;
            this.zhifuForm.alipay_email = rep.data.alipay_email;
          } else if (rep.data.inc_type === "ccvideo") {
            this.ccForm.cc_appID_encrypt = rep.data.cc_appID_encrypt;
            this.ccForm.cc_appID_unencrypt = rep.data.cc_appID_unencrypt;
          } else if (rep.data.inc_type === "coupon") {
            this.couponForm.coupon = rep.data.coupon;
          } else if (rep.data.inc_type === "superverify") {
            this.ckoble.superverify = rep.data.superverify;
          } else if (rep.data.inc_type === "purchase") {
            this.purchaseForm.in_purchase = rep.data.in_purchase;
          } else if (rep.data.inc_type === "WeChat") {
            this.wxForm.APPID = rep.data.APPID;
            this.wxForm.MCHID = rep.data.MCHID;
            this.wxForm.KEY = rep.data.KEY;
          } else if (rep.data.inc_type === "sendSms") {
            this.sendSmsForm.username = rep.data.username;
            this.sendSmsForm.password = rep.data.password;
          } else if (rep.data.inc_type === "email") {
            this.emailForm.Host = rep.data.Host;
            this.emailForm.Port = rep.data.Port;
            this.emailForm.From = rep.data.From;
            this.emailForm.FromName = rep.data.FromName;
            this.emailForm.Username = rep.data.Username;
            this.emailForm.Password = rep.data.Password;
          }
        }
      });
    },
    put() {
      if (this.name === "alipay") {
        if (
          this.zhifuForm.app_id == "" ||
          this.zhifuForm.private_key == "" ||
          this.zhifuForm.alipay_type == "" ||
          this.zhifuForm.alipay_email == ""
        ) {
          this.$Message.error("支付宝设置里每项都为必填项!");
          return;
        }
        putSystem(this.zhifuForm).then(res => {
          if (res.data.code === 200) {
            this.$Message.success("修改成功!");
            this.getData(this.name);
          }
        });
      } else if (this.name === "ccvideo") {
        if (
          this.ccForm.cc_appID_encrypt == "" ||
          this.ccForm.cc_appID_unencrypt == ""
        ) {
          this.$Message.error("cc视频设置里每项都为必填项!");
          return;
        }
        putSystem(this.ccForm).then(res => {
          if (res.data.code === 200) {
            this.$Message.success("修改成功!");
            this.getData(this.name);
          }
        });
      } else if (this.name === "coupon") {
        if (this.couponForm.coupon == "") {
          this.$Message.error("优惠卷限额设置里每项都为必填项!");
          return;
        }
        putSystem(this.couponForm).then(res => {
          if (res.data.code === 200) {
            this.$Message.success("修改成功!");
            this.getData(this.name);
          }
        });
      } else if (this.name === "WeChat") {
        if (
          this.wxForm.APPID == "" ||
          this.wxForm.MCHID == "" ||
          this.wxForm.KEY == ""
        ) {
          this.$Message.error("微信支付设置里每项都为必填项!");
          return;
        }
        putSystem(this.wxForm).then(res => {
          if (res.data.code === 200) {
            this.$Message.success("修改成功!");
            this.getData(this.name);
          }
        });
      } else if (this.name === "sendSms") {
        if (
          this.sendSmsForm.username == "" ||
          this.sendSmsForm.password == ""
        ) {
          this.$Message.error("短信账户设置里每项都为必填项!");
          return;
        }
        putSystem(this.sendSmsForm).then(res => {
          if (res.data.code === 200) {
            this.$Message.success("修改成功!");
            this.getData(this.name);
          }
        });
      } else if (this.name === "purchase") {
        if (this.purchaseForm.in_purchase == 1) {
          this.purchaseForm.in_purchase = 2;
        } else {
          this.purchaseForm.in_purchase = 1;
        }
        putSystem(this.purchaseForm).then(res => {
          if (res.data.code === 200) {
            this.$Message.success("修改成功!");
            this.getData(this.name);
          }
        });
      } else if (this.name === "superverify") {
        putSystem({
          inc_type: this.ckoble.inc_type,
          superverify: this.ckoble.superverify
        }).then(res => {
          if (res.data.code === 200) {
            this.$Message.success("修改成功!");
            this.getData(this.name);
          }
        });
      } else if (this.name === "email") {
        if (
          this.emailForm.Host == "" ||
          this.emailForm.Port == "" ||
          this.emailForm.From == "" ||
          this.emailForm.FromName == "" ||
          this.emailForm.Username == "" ||
          this.emailForm.Password == ""
        ) {
          this.$Message.error("邮箱设置里每项都为必填项!");
          return;
        }
        putSystem(this.emailForm).then(res => {
          if (res.data.code === 200) {
            this.$Message.success("修改成功!");
            this.getData(this.name);
          }
        });
      } else if (this.name === "sprint") {
        if (this.sprintForm.sprint == 1) {
          this.sprintForm.sprint = 2;
        } else {
          this.sprintForm.sprint = 1;
        }
        putSystem(this.sprintForm).then(res => {
          if (res.data.code === 200) {
            this.$Message.success("修改成功!");
            this.getData(this.name);
          }
        });
      }
    }
  },
  mounted() {
    this.getData(this.name);
  }
};
</script>

<style lang="less">
.box {
  padding: 12px 6px;
  font-size: 14px;
  color: #333;
}
</style>
