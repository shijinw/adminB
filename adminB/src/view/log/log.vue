
<template>
  <div>
    <Card>
      <div>
        <Button type="default" shape="circle" icon="md-sync" @click="seach"></Button>
        <Divider type="vertical" />
        <Select v-model="form.user_id" @on-change="select" style="width:300px">
          <Option v-for="item in list" :value="item.id" :key="item.value">{{ item.truename }}</Option>
        </Select>
      </div>
      <Divider />
      <Timeline>
        <TimelineItem v-for="(val, index) in data" :key="index">
          <p class="time">{{ val.login_time }}</p>
          <p class="content">{{ val.details }}</p>
        </TimelineItem>
      </Timeline>
      <div style="padding: 20px 0; text-align: right;">
        <Page :total="total" @on-change="onChange" @on-page-size-change="onPageSizeChange" :current="form.page" :page-size="form.limit" size="small" show-total show-elevator show-sizer />
      </div>
    </Card>

  </div>
</template>

<script>
import { userList, userLog } from '@/api/control'
import moment from 'moment'
export default {
  data () {
    return {
      data: [],
      list: [],
      total: 1,
      form: {
        page: 1,
        limit: 10,
        user_id: '0'
      }
    }
  },
  methods: {
    onChange (val) {
      var self = this
      self.form.page = val
      self.getData(self.form)
    },
    onPageSizeChange (val) {
      var self = this
      self.form.limit = val
      self.getData(self.form)
    },
    select (val) {
      this.form.page = 1
      this.form.user_id = val
      this.getData(this.form)
    },
    seach () {
      this.getData(this.form)
    },
    getData (obj) {
      userLog(obj).then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.total = rep.data.total * 1
          this.data = rep.data.data
        }
      })
    }
  },
  created () {
    userList({ limit: 1000, page: 1 }).then(res => {
      let rep = res.data
      if (rep.code === 200) {
        this.list = rep.data.data
      }
    })
  },
  mounted () {
    this.getData(this.form)
  }
}
</script>

<style lang="less">
.time{
    font-size: 14px;
    font-weight: bold;
}
.content{
    padding-left: 5px;
}
</style>
