<template>
  <div>
    <Card style="width: 800px;">
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <Row>
          <Col :span="12">
            <FormItem label="工作时间" prop="work_time">
              <Input v-model="formValidate.work_time" placeholder="工作时间"></Input>
              <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：例，9:00 - 18:00</p>
            </FormItem>
          </Col>
          <Col :span="12">
            <FormItem label="热线电话" prop="telephone">
              <Input v-model="formValidate.telephone" placeholder="热线电话"></Input>
              <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：例，0000 - 123456</p>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col :span="12">
            <FormItem label="班主任QQ" prop="teacher_qq">
              <Input v-model="formValidate.teacher_qq" placeholder="班主任QQ"></Input>
              <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：QQ号码</p>
            </FormItem>
          </Col>
          <Col :span="12">
            <FormItem label="二 维 码" prop="wx_code">
              <div class="demo-upload-list" v-for="item in uploadList">
                <template>
                  <img :src="item.url">
                  <div class="demo-upload-list-cover">b
                    <Icon type="ios-eye-outline" @click.native="handleView(item.url)"></Icon>
                    <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                  </div>
                </template>
              </div>
              <Upload
                ref="upload"
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
                  <Icon type="ios-camera" size="20"></Icon>
                </div>
              </Upload>
              <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：图片为正方形比例</p>
              <Modal title="图片预览" v-model="visible">
                <img :src="imgUrl" v-if="visible" style="width: 100%">
              </Modal>
            </FormItem>
          </Col>
        </Row>
        <FormItem label="咨询链接" prop="consult_href">
          <Input v-model="formValidate.consult_href" placeholder="咨询链接"></Input>
          <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：商务通链接</p>
        </FormItem>
        <FormItem label="是否显示" prop="status">
          <Input v-model="formValidate.status" placeholder="是否显示"></Input>
          <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：前台侧边栏是否显示，1 显示 2 不显示</p>
        </FormItem>
        <FormItem>
          <div style="text-align: right;">
            <Button @click="handleReset('formValidate')">重置</Button>
            <Button type="primary" @click="handleSubmit('formValidate')" style="margin-left: 8px">提 交</Button>
          </div>
        </FormItem>
      </Form>
    </Card>
  </div>
</template>

<script>
import { getOnline, putOnline } from '@/api/info'
import config from '@/config'
export default {
  data () {
    return {
      uplodapath: '/upload/Index/uploadImage',
      imgUrl: '',
      visible: false,
      uploadList: [],
      formValidate: {
        id: '',
        work_time: '',
        telephone: '',
        teacher_qq: '',
        consult_href: '',
        wx_code: '',
        status: ''
      },
      ruleValidate: {
        work_time: [
          { required: true, message: '请输入工作时间', trigger: 'blur' }
        ],
        telephone: [
          { required: true, message: '请输入热线电话', trigger: 'blur' }
        ],
        teacher_qq: [
          { required: true, message: '请输入班主任QQ', trigger: 'blur' }
        ],
        consult_href: [
          { required: true, message: '请输入咨询链接', trigger: 'blur' }
        ],
        wx_code: [
          { required: true, message: '请上传二维码', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '请输入是否显示', trigger: 'blur' }
        ]
      }
    }
  },
  components: {

  },
  watch: {
    uploadList (newValue, oldValue) {
      if (newValue.length != 0) {
        this.formValidate.wx_code = newValue[0].url
      } else {
        this.formValidate.wx_code = ''
      }
    }
  },
  methods: {
    handleView (url) {
      this.imgUrl = url
      this.visible = true
    },
    handleRemove (file) {
      let fileList = this.uploadList
      this.uploadList.splice(fileList.indexOf(file), 1)
    },
    handleSuccess (res, file) {
      if (res.code === 200) {
        this.uploadList = []
        let obj = {
          name: file.name,
          url: res.data.image_url
        }
        this.uploadList.push(obj)
      }
    },
    handleFormatError (file) {
      this.$Notice.warning({
        title: '文件格式验证',
        desc: '文件 “' + file.name + '” 格式错误, 请上传 jpg 或 png.'
      })
    },
    handleMaxSize (file) {
      this.$Notice.warning({
        title: '文件大小验证',
        desc: '文件 “' + file.name + '” 太大, 不要超过 10M.'
      })
    },
    handleBeforeUpload () {
      console.log('准备上传————001')
    },
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          putOnline(this.formValidate).then(res => {
            if (res.data.code === 200) {
              this.$Message.success('提交成功!')
              this.getData()
            }
          })
        } else {
          this.$Message.error('请认真填写后再提交!')
        }
      })
    },
    handleReset (name) {
      this.$refs[name].resetFields()
    },
    getData () {
      getOnline().then(res => {
        let rep = res.data
        if (rep.code === 200) {
          let list = rep.data.wx_code.split('/')
          let name = list[list.length - 1]
          this.uploadList = []
          let obj = {
            name: name,
            url: rep.data.wx_code
          }
          this.uploadList.push(obj)
          this.formValidate.consult_href = rep.data.consult_href
          this.formValidate.id = rep.data.id
          this.formValidate.status = rep.data.status.toString()
          this.formValidate.teacher_qq = rep.data.teacher_qq
          this.formValidate.telephone = rep.data.telephone
          this.formValidate.work_time = rep.data.work_time
        }
      })
    }
  },
  mounted () {
    if (process.env.NODE_ENV === 'production') {
      switch (document.domain) {
        case 'dests.youcaiwx.cn':
          this.uplodapath = `${config.baseUrl.test}/upload/Index/uploadImage`
          break
        case 'ycdb.youcaiwx.cn':
          this.uplodapath = `${config.baseUrl.pro}/upload/Index/uploadImage`
          break
        default:
          this.uplodapath = '/upload/Index/uploadImage'
          break
      }
    } else {
      this.uplodapath = '/upload/Index/uploadImage'
    }
    this.getData()
  }
}
</script>

<style lang="less">
.demo-upload-list{
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
    box-shadow: 0 1px 1px rgba(0,0,0,.2);
    margin-right: 4px;
}
.demo-upload-list img{
    width: 100%;
    height: 100%;
}
.demo-upload-list-cover{
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0,0,0,.6);
}
.demo-upload-list:hover .demo-upload-list-cover{
    display: block;
}
.demo-upload-list-cover i{
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin: 0 2px;
}
</style>
