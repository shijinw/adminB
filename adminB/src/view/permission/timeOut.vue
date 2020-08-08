<template>
  <div>
    <Card style="width: 800px;">
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <FormItem label="答疑超时" prop="id">
          <Select v-model="id" placeholder="请选择时间或关闭时间">
            <Option v-for="(val, index) in data" :key="index" :value="val.id">{{ val.answer_time }}</Option>
          </Select>
          <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：答疑老师未在该时间内为学员解答问题视为超时</p>
        </FormItem>
        <FormItem>
          <div style="text-align: right;">
            <Button type="primary" @click="handleSubmit('formValidate')" style="margin-left: 8px">提 交</Button>
          </div>
        </FormItem>
      </Form>
    </Card>
  </div>
</template>

<script>
import { answerTimeList, putAnswerTime } from '@/api/control'
export default {
  data () {
    return {
      data: [],
      id: '',
      formValidate: {
        id: ''
      },
      ruleValidate: {
        id: [
          { required: true, message: '请选择', trigger: 'change' }
        ]
      }
    }
  },
  components: {
    
  },
  watch: {
    id (newValue, oldValue) {
      this.formValidate.id = newValue.toString()
    }
  },
  methods: {
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          putAnswerTime(this.formValidate).then(res => {
            if (res.data.code === 200) {
              this.$Message.success('提交成功!');
              this.getData()
            }
          })
        } else {
          this.$Message.error('请认真填写后再提交!');
        }
      })
    },
    getData () {
      answerTimeList().then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.data = rep.data.data
          this.data.forEach(v => {
            if (v.status == 1) {
              this.id = v.id
            }
          });
        }
      })
    }
  },
  mounted () {
    this.getData()
  }
}
</script>

<style lang="less">

</style>
