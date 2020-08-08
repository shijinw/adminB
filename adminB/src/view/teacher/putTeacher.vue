<template>
  <div>
    <Card style="width: 800px;">
      <p slot="title">修改讲师</p>
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <Row>
          <Col :span="12">
            <FormItem label="讲师名称" prop="name">
              <Input v-model="formValidate.name" placeholder="讲师名称"></Input>
              <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：中文名字</p>
            </FormItem>
          </Col>
          <Col :span="12">
            <FormItem label="英文名称" >
              <Input v-model="formValidate.en_name" placeholder="英文名称"></Input>
              <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：英文名字</p>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col :span="12">
      <FormItem label="选择头衔" prop="teacher_title_id">
          <Select v-model="formValidate.teacher_title_id" clearable>
            <Option v-for="item in titleList" :value="item.id.toString()" :key="item.id">{{ item.title }}</Option>
          </Select>
          <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：选择讲师标签、头衔</p>
        </FormItem>
          </Col>
          <Col :span="12">
            <FormItem label="讲师头像" prop="uploadList">
              <div class="demo-upload-list" v-for="(item,key) in formValidate.uploadList" :key="key">
                <template>
                  <img :src="item.url">
                  <div class="demo-upload-list-cover">
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

        <FormItem label="资　　历" prop="longevity">
          <Input v-model="formValidate.longevity" type="textarea" :autosize="{minRows: 3,maxRows: 10}" placeholder="资历..."></Input>
          <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：可以填写资历</p>
        </FormItem>
        <FormItem label="简　　介" prop="introduce">
          <Input v-model="formValidate.introduce" type="textarea" :autosize="{minRows: 3,maxRows: 10}" placeholder="简介..."></Input>
          <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：可以填写简介</p>
        </FormItem>
        <FormItem>
          <div style="text-align: right;">
            <Button @click="handleReset('formValidate')">重置</Button>
            <Button type="primary" @click="handleSubmit('formValidate')" style="margin-left: 8px">修 改 讲 师</Button>
          </div>
        </FormItem>
      </Form>
    </Card>
  </div>
</template>

<script>
import { getTeacher, teacherTitleList, putTeacher } from '@/api/teacher'
import { mapMutations } from 'vuex'
import Fomat from '@/libs/fomat'
import config from '@/config'
export default {
  data () {
    return {
      uplodapath: '/upload/Index/uploadImage',
      visible: false,
      titleList: '',
      imgUrl: '',
      editorSetting: { // 配置富文本编辑器高
        height: 500,
        width: 600
      },
      formValidate: {
        id: '',
        name: '',
        longevity: '',
        introduce: '',
        sort: '',
        pictrue: '',
        en_name: '',
        teacher_title_id: '',
        uploadList: []
      },
      ruleValidate: {
        name: [
          { required: true, validator: Fomat.Rules.Verifiy().Required }
        ],
        longevity: [
          { required: true, message: '请输入讲师资历', trigger: 'blur' }
        ],
        introduce: [
          { required: true, message: '请输入讲师简介', trigger: 'blur' }
        ],
        sort: [
          { required: true, validator: Fomat.Rules.Verifiy().Bnum }
        ],
        en_name: [
          { required: true, message: '请选择头像上传', trigger: 'blur' }
        ],
        teacher_title_id: [
          { required: true, message: '请选择讲师头衔', trigger: 'change' }
        ],
        uploadList: [
          { required: true, message: '请选择讲师头衔' }
        ]
      }
    }
  },

  watch: {
    'formValidate.uploadList' (newValue, oldValue) {
      if (newValue.length != 0) {
        this.formValidate.pictrue = newValue[0].url
      } else {
        this.formValidate.pictrue = ''
      }
    }
  },
  methods: {
    ...mapMutations([
      'addTag',
      'closeTag'
    ]),
    editors (content) { // editor组件传过来的值赋给content
      this.formValidate.introduce = content
    },
    handleView (url) {
      this.imgUrl = url
      this.visible = true
    },
    handleRemove (file) {
      let fileList = this.formValidate.uploadList
      this.formValidate.uploadList.splice(fileList.indexOf(file), 1)
    },
    handleSuccess (res, file) {
      if (res.code === 200) {
        this.formValidate.uploadList = []
        let obj = {
          name: file.name,
          url: res.data.image_url
        }
        this.formValidate.uploadList.push(obj)
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
    getTitle () {
      teacherTitleList().then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.titleList = rep.data
        }
      })
    },
    getData () {
      getTeacher(this.$route.query.id).then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.formValidate.id = rep.data.id
          this.formValidate.name = rep.data.name
          this.formValidate.longevity = rep.data.longevity
          this.formValidate.introduce = rep.data.introduce
          this.formValidate.sort = rep.data.sort ? rep.data.sort.toString() : rep.data.sort
          let list = rep.data.pictrue.split('/')
          let name = list[list.length - 1]
          this.formValidate.uploadList = []
          let obj = {
            name: name,
            url: rep.data.pictrue
          }
          rep.data.pictrue ? this.formValidate.uploadList.push(obj) : this.formValidate.pictrue = rep.data.pictrue
          this.formValidate.en_name = rep.data.en_name
          this.formValidate.teacher_title_id = rep.data.teacher_title_id.toString()
        }
      })
    },
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          if (!this.formValidate.pictrue) {
            this.$Message.error('请上传讲师头像!')
            return
          }
          putTeacher(this.formValidate).then(res => {
            if (res.data.code === 200) {
              this.$Message.success('修改成功!')
              this.handleReset(name)
              let route = {
                name: 'put_teacher',
                query: {
                  id: this.$route.query.id
                },
                meta: {
                  title: `修改讲师 - ${this.$route.query.id}`
                }
              }
              this.closeTag({
                route: route
              })
              this.$router.push('teacher_list')
            }
          })
        } else {
          this.$Message.error('请认真填写信息!')
        }
      })
    },
    handleReset (name) {
      this.formValidate.uploadList = []
      this.$refs[name].resetFields()
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
    this.getTitle()
    this.getData()
  }
}
</script>

<style lang="less">
.demo-upload-list{
    display: inline-block;
    width: 80px;
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
