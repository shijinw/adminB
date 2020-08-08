<template>
  <div>
    <Card>
      <div>
        <Button type="default"
                shape="circle"
                icon="md-sync"
                @click="Cseach"></Button>
        <Divider type="vertical" />
        <Input v-model="form.phone"
               placeholder="手机号码"
               style="width: 200px;" />
        <Divider type="vertical" />
        <DatePicker v-model="form.starttime"
                    type="datetime"
                    placeholder="发送时间"
                    style="width: 200px; margin-right: 10px;"></DatePicker>
        <DatePicker v-model="form.endtime"
                    type="datetime"
                    placeholder="结束时间"
                    style="width: 200px; margin-right: 10px;"></DatePicker>
        <Button type='primary'
                @click="seach"
                style="margin-right: 10px;">搜索</Button>
        <Button type='primary'
                @click="openSend"
                style="margin-right: 10px;">发送短信</Button>
      </div>
      <Divider />
      <Table size="small"
             :columns="columns"
             :data="data"></Table>
      <div style="padding: 20px 0; text-align: right;">
        <Page :total="total"
              @on-change="onChange"
              @on-page-size-change="onPageSizeChange"
              :current="form.page"
              :page-size="form.limit"
              size="small"
              show-total
              show-elevator
              show-sizer />
      </div>

      <!-- 发送短信 -->
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
            <FormItem label="短信内容"
                      prop="content">
              <Input v-model="formValidate.content"
                     type="textarea"
                     :autosize="{ minRows: 4, maxRows: 10 }"
                     placeholder="短信内容"></Input>
              <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：请按规范填写短信内容，否则可能审核失败！</p>
            </FormItem>
            <FormItem label="接 收 人"
                      prop="phone">
              <Input v-model="formValidate.phone"
                     type="textarea"
                     :autosize="{ minRows: 2, maxRows: 6 }"
                     placeholder="短信接收人"></Input>
              <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：多个接收人请使用“/”进行分割！</p>
            </FormItem>
            <FormItem>
              <div style="text-align: right;">
                <Button @click="handleReset('formValidate')">重置</Button>
                <Button type="primary"
                        @click="handleSubmit('formValidate')"
                        style="margin-left: 8px">发送短信</Button>
              </div>
            </FormItem>
          </Form>
        </div>
      </Modal>

    </Card>
  </div>
</template>

<script>
import { smsList, massSms } from '@/api/info';
import moment from 'moment';
export default {
  data() {
    return {
      form: {
        page: 1,
        limit: 10,
        phone: '',
        starttime: '',
        endtime: ''
      },
      data: [],
      columns: [
        {
          title: 'ID',
          key: 'id',
          minWidth: 80
        },
        {
          title: '短信内容',
          key: 'content',
          minWidth: 300
        },
        {
          title: '手机号码',
          key: 'phone',
          minWidth: 150
        },
        {
          title: '发送时间',
          key: 'add_time',
          minWidth: 150
        },
        {
          title: '操作人',
          key: 'truename',
          minWidth: 100
        }
      ],
      modal: false,
      title: '',
      total: 0,
      formValidate: {
        phone: '',
        content: ''
      },
      ruleValidate: {
        phone: [
          { required: true, message: '请输入接收人手机号码', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请输入短信内容', trigger: 'blur' }
        ]
      }
    }
  },
  components: {},
  watch: {},
  methods: {
    onChange(val) {
      var self = this
      self.form.page = val
      self.getData(self.form)
    },
    onPageSizeChange(val) {
      var self = this
      self.form.limit = val
      self.getData(self.form)
    },
    openSend() {
      this.title = '发送短信';
      this.handleReset('formValidate')
      this.modal = true
    },
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.formValidate.phone = this.formValidate.phone
            .split('/')
            .join(',')
          massSms(this.formValidate).then(res => {
            if (res.data.code === 200) {
              this.$Message.success(
                '发送成功，可能审核需要短暂时间，请耐心等待!'
              )
              this.handleReset(name)
              this.getData(this.form)
            }
          })
          this.modal = false
        } else {
          this.$Message.error('请认真填写后再提交!')
        }
      })
    },
    handleReset(name) {
      this.$refs[name].resetFields()
    },
    seach() {
      this.getData(this.form)
    },
    Cseach() {
      this.form.starttime = '';
      this.form.endtime = '';
      this.form.phone = '';
      this.getData(this.form)
    },
    getData(obj) {
      if (obj.starttime != '')
        obj.starttime = moment(obj.starttime).format('YYYY-MM-DD HH:mm:ss')
      else obj.starttime = '';
      if (obj.endtime != '')
        obj.endtime = moment(obj.endtime).format('YYYY-MM-DD HH:mm:ss')
      else obj.endtime = '';
      smsList(obj).then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.data = rep.data.data
          this.total = rep.data.total
        }
      })
    }
  },
  mounted() {
    this.getData(this.form)
  }
}
</script>

<style lang="less">
</style>
