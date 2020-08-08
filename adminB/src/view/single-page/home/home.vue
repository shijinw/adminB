<template>
  <div>
    <div v-if="user_id===1?true:false">
    <Row :gutter="20" v-if="data.user_count || data.user_count == 0">
      <i-col span="6" style="height: 120px;">
        <infor-card shadow color="#2d8cf0" icon="ios-people" :icon-size="36">
          <count-to :end="data.user_count" count-class="count-style"/>
          <p>总学员数量</p>
        </infor-card>
      </i-col>
      <i-col span="6" style="height: 120px;">
        <infor-card shadow color="#19be6b" icon="md-people" :icon-size="36">
          <count-to :end="data.formal_user_count" count-class="count-style"/>
          <p>正式学员数量</p>
        </infor-card>
      </i-col>
      <i-col span="6" style="height: 120px;">
        <infor-card shadow color="#ff9900" icon="ios-person" :icon-size="36">
          <count-to :end="data.web_user_count" count-class="count-style"/>
          <p>网络学员数量</p>
        </infor-card>
      </i-col>
      <i-col span="6" style="height: 120px;">
        <infor-card shadow color="#E46CBB" icon="ios-person" :icon-size="36">
          <count-to :end="data.face_user_count" count-class="count-style"/>
          <p>面授学员数量</p>
        </infor-card>
      </i-col>
    </Row>
    <Row :gutter="20" style="margin-top: 20px;" v-if="data.today_register_count  || data.today_register_count == 0">
      <i-col span="6" style="height: 120px;">
        <infor-card shadow color="#ed3f14" icon="ios-create" :icon-size="36">
          <count-to :end="data.today_register_count" count-class="count-style"/>
          <p>今日注册数量</p>
        </infor-card>
      </i-col>
      <i-col span="6" style="height: 120px;">
        <infor-card shadow color="#9A66E4" icon="ios-list-box" :icon-size="36">
          <count-to :end="data.today_order_count" count-class="count-style"/>
          <p>今日订单成功数</p>
        </infor-card>
      </i-col>
      <i-col span="6" style="height: 120px;">
        <infor-card shadow color="#00EEEE" icon="ios-heart" :icon-size="36">
          <count-to :end="data.today_sign_count" count-class="count-style"/>
          <p>今日签到数量</p>
        </infor-card>
      </i-col>
      <i-col span="6" style="height: 120px;">
        <infor-card shadow color="#CD3700" icon="ios-desktop" :icon-size="36">
          <count-to :end="data.today_login_count" count-class="count-style"/>
          <p>今日登录数量</p>
        </infor-card>
      </i-col>
    </Row>
    <Row :gutter="20" style="margin-top: 20px;" v-if="data.order_count || data.order_count == 0">
      <i-col span="6" style="height: 120px;">
        <infor-card shadow color="#8B1A1A" icon="ios-list-box" :icon-size="36">
          <count-to :end="data.order_count" count-class="count-style"/>
          <p>总订单数量</p>
        </infor-card>
      </i-col>
      <i-col span="6" style="height: 120px;">
        <infor-card shadow color="#8B8989" icon="ios-ribbon" :icon-size="36">
          <count-to :end="data.count_bank" count-class="count-style"/>
          <p>试题总数</p>
        </infor-card>
      </i-col>
      <i-col span="6" style="height: 120px;">
        <infor-card shadow color="#CD5555" icon="logo-yen" :icon-size="36">
          <count-to :end="data.count_price" :decimals="2" count-class="count-style"/>
          <p>总成交金额(百万)</p>
        </infor-card>
      </i-col>
      <i-col span="6" style="height: 120px;">
        <infor-card shadow color="#EE2C2C" icon="logo-yen" :icon-size="36">
          <count-to :end="data.count_week_price" :decimals="2" count-class="count-style"/>
          <p>七日内成交金额(万)</p>
        </infor-card>
      </i-col>
    </Row>
    <Row :gutter="20" style="margin-top: 20px;" v-if="data.nocouanswer || data.nocouanswer == 0">
      <i-col span="6" style="height: 120px;">
        <infor-card shadow color="#8B7500" icon="ios-stats" :icon-size="36">
          <count-to :end="data.nocouanswer" count-class="count-style"/>
          <p>课程未回复答疑</p>
        </infor-card>
      </i-col>
      <i-col span="6" style="height: 120px;">
        <infor-card shadow color="#71C671" icon="md-trending-up" :icon-size="36">
          <count-to :end="data.noqueanswer" count-class="count-style"/>
          <p>题库未回复答疑</p>
        </infor-card>
      </i-col>
      <i-col span="6" style="height: 120px;">
        <infor-card shadow color="#7CCD7C" icon="ios-stats" :icon-size="36">
          <count-to :end="data.couanswer" count-class="count-style"/>
          <p>课程回复总量</p>
        </infor-card>
      </i-col>
      <i-col span="6" style="height: 120px;">
        <infor-card shadow color="#388E8E" icon="md-trending-up" :icon-size="36">
          <count-to :end="data.queAnswer" count-class="count-style"/>
          <p>题库回复总量</p>
        </infor-card>
      </i-col>
    </Row>
    <Divider v-if="data.time"/>
    <Divider v-if="data.time">{{ data.time }} 统计</Divider>
    <Divider v-if="data.time"/>
    <Row style="margin-top: 20px;" v-if="data.tpversion">
      <Row style="border: 1px solid #ccc;">
        <Row style="border-bottom: 1px solid #ccc; text-align: center;">
          <Col :span="12" class="box">服务器域名</Col>
          <Col :span="12" class="box" style="border-left: 1px solid #ccc;">{{ data.url }}</Col>
        </Row>
        <Row style="border-bottom: 1px solid #ccc; text-align: center;">
          <Col :span="12" class="box">服务器系统类型</Col>
          <Col :span="12" class="box" style="border-left: 1px solid #ccc;">{{ data.server_os }}</Col>
        </Row>
        <Row style="border-bottom: 1px solid #ccc; text-align: center;">
          <Col :span="12" class="box">服务器IP地址</Col>
          <Col :span="12" class="box" style="border-left: 1px solid #ccc;">{{ data.server_ip }}</Col>
        </Row>
        <Row style="border-bottom: 1px solid #ccc; text-align: center;">
          <Col :span="12" class="box">服务器环境</Col>
          <Col :span="12" class="box" style="border-left: 1px solid #ccc;">{{ data.server_soft }}</Col>
        </Row>
        <Row style="border-bottom: 1px solid #ccc; text-align: center;">
          <Col :span="12" class="box">PHP版本</Col>
          <Col :span="12" class="box" style="border-left: 1px solid #ccc;">{{ data.php_version }}</Col>
        </Row>
        <Row style="border-bottom: 1px solid #ccc; text-align: center;">
          <Col :span="12" class="box">mysql数据库版本</Col>
          <Col :span="12" class="box" style="border-left: 1px solid #ccc;">{{ data.mysql_version }}</Col>
        </Row>
        <Row style="text-align: center;">
          <Col :span="12" class="box">TP框架版本</Col>
          <Col :span="12" class="box" style="border-left: 1px solid #ccc;">{{ data.tpversion }}</Col>
        </Row>
      </Row>
    </Row>
    </div>
    <div v-if="user_id===1?false:true">
    <img style="width:100%;height:100%" :src="imgs"></img>
    </div>
  </div>
</template>

<script>
import InforCard from '_c/info-card'
import CountTo from '_c/count-to'
import Cookies from 'js-cookie'
import { getUserInfo } from '@/api/user'
import { homeData } from '@/api/control'
import mings from '@/assets/images/mings.jpg'
export default {
  name: 'home',
  components: {
    InforCard,
    CountTo
  },
  data () {
    return {
      data: {},
      user_id: '',
      imgs: mings
    }
  },
  created () {
    homeData().then(res => {
      if (res.data.code === 200) {
        this.data = res.data.data
      }
    })
  },
  mounted () {
    getUserInfo(Cookies.get('sign')).then(res => {
      let rep = res.data
      if (rep.code === 200) {
        this.user_id = rep.data.group_id
      }
    })
  }
}
</script>

<style lang="less">
.count-style{
  font-size: 36px;
}
.box {
  padding: 12px 6px;
  font-size: 14px;
  color: #333;
}
</style>
