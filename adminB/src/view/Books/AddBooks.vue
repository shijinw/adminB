<template>
  <div>
    <Card>
      <p slot="title">添加试卷</p>
      <Form ref="formValidate"
            :model="formValidate"
            :rules="ruleValidate"
            :label-width="80">
        <Row>
          <Col :span="12">
          <FormItem label="图书名称"
                    prop="name">
            <Input v-model="formValidate.name"
                   placeholder="输入图书名称"
                   style="width: 100%" />
            <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：输入图书名称</p>
          </FormItem>
          </Col>
          <Col :span="12">
          <FormItem label="出版社"
                    prop="pub_company">
            <Input v-model="formValidate.pub_company"
                   placeholder="输入出版社"
                   style="width: 100%" />
            <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：输入出版社</p>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col :span="12">
          <FormItem label="价格"
                    prop="price">
            <Input type="number"
                   v-model="formValidate.price"
                   placeholder="输入图书价格"
                   style="width: 100%" />
            <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：输入图书价格</p>
          </FormItem>
          </Col>
          <Col :span="12">
          <FormItem label="支付价格"
                    prop="pay_price">
            <Input type="number"
                   v-model="formValidate.pay_price"
                   placeholder="输入支付价格"
                   style="width: 100%" />
            <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：输入支付价格</p>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col :span="12">
          <FormItem label="是否上架"
                    prop="status">
            <Select v-model="formValidate.status"
                    clearable
                    placeholder="是否上架">
              <Option v-for="item in Tagslists"
                      :value="item.id"
                      :key="item.id">{{ item.name }}</Option>
            </Select>
            <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：选择是否上架</p>
          </FormItem>
          </Col>
          <Col :span="12">
          <FormItem label="是否预售"
                    prop="is_presell">
            <Select v-model="formValidate.is_presell"
                    clearable
                    placeholder="是否预售">
              <Option v-for="item in Tagslist"
                      :value="item.id"
                      :key="item.id">{{ item.name }}</Option>
            </Select>
            <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：选择是否预售</p>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col :span="12">
          <FormItem label="图书作者"
                    prop="author">
            <Input v-model="formValidate.author"
                   placeholder="输入图书作者"
                   style="width: 100%" />
            <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：输入图书作者</p>
          </FormItem>
          </Col>

        </Row>
        <Row style="margin-left:10px">
          <Col :span="12">
          <FormItem label="PC封面图"
                    prop="pc_img">
            <div class="course_img">
              <div class="demo-upload-list">
                <template>
                  <img :src="formValidate.pc_img">
                  <div class="demo-upload-list-cover">
                    <Icon type="ios-eye-outline"
                          @click.native="handleView(formValidate.pc_img)"></Icon>
                    <Icon type="ios-trash-outline"
                          @click.native="handleRemove3(formValidate.pc_img)"></Icon>
                  </div>
                </template>
              </div>
              <Upload ref="upload"
                      :show-upload-list="false"
                      :on-success="handleSuccess3"
                      :on-format-error="handleFormatError"
                      :on-exceeded-size="handleMaxSize"
                      :format="['jpg','jpeg','png']"
                      :max-size="2048"
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
          <Col :span="12">
          <FormItem label="H5封面图"
                    prop="h5_img">
            <div class="course_img">
              <div class="demo-upload-list">
                <template>
                  <img :src="formValidate.h5_img">
                  <div class="demo-upload-list-cover">
                    <Icon type="ios-eye-outline"
                          @click.native="handleView4(formValidate.h5_img)"></Icon>
                    <Icon type="ios-trash-outline"
                          @click.native="handleRemove4(formValidate.h5_img)"></Icon>
                  </div>
                </template>
              </div>
              <Upload ref="upload"
                      :show-upload-list="false"
                      :on-success="handleSuccess4"
                      :on-format-error="handleFormatError"
                      :on-exceeded-size="handleMaxSize"
                      :format="['jpg','jpeg','png']"
                      :max-size="2048"
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
        <Row style="margin-left:10px">
          <Col :span="12">
          <FormItem label="介绍"
                    prop="introduce">
            <div class="course_img">
              <div class="demo-upload-list">
                <template>
                  <img :src="formValidate.introduce">
                  <div class="demo-upload-list-cover">
                    <Icon type="ios-eye-outline"
                          @click.native="handleView5(formValidate.introduce)"></Icon>
                    <Icon type="ios-trash-outline"
                          @click.native="handleRemove5(formValidate.introduce)"></Icon>
                  </div>
                </template>
              </div>
              <Upload ref="upload"
                      :show-upload-list="false"
                      :on-success="handleSuccess5"
                      :on-format-error="handleFormatError"
                      :on-exceeded-size="handleMaxSize"
                      :format="['jpg','jpeg','png']"
                      :max-size="2048"
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
          <Col :span="12">
          <FormItem label="图书目录"
                    prop="catalogue">
            <div class="course_img">
              <div class="demo-upload-list">
                <template>
                  <img :src="formValidate.catalogue">
                  <div class="demo-upload-list-cover">
                    <Icon type="ios-eye-outline"
                          @click.native="handleView6(formValidate.catalogue)"></Icon>
                    <Icon type="ios-trash-outline"
                          @click.native="handleRemove6(formValidate.catalogue)"></Icon>
                  </div>
                </template>
              </div>
              <Upload ref="upload"
                      :show-upload-list="false"
                      :on-success="handleSuccess6"
                      :on-format-error="handleFormatError"
                      :on-exceeded-size="handleMaxSize"
                      :format="['jpg','jpeg','png']"
                      :max-size="2048"
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
        <FormItem>
          <div style="text-align: center;">
            <Button @click="resets('formValidate')"
                    style="width:110px;height:40px">重置</Button>
            <Button type="primary"
                    @click="handleSubmit"
                    style="margin-left: 8px;width:110px;height:40px">提 交</Button>
          </div>
        </FormItem>
      </Form>
    </Card>
    <Modal title="图片预览"
           v-model="visible">
      <img :src="imgUrl"
           v-if="visible"
           style="width: 100%">
    </Modal>
  </div>
</template>
<script>
import Fomat from '@/libs/fomat';
import { addBooks } from '@/api/Books';
import config from '@/config';
export default {
  props: ['text', 'id'],

  data() {
    return {
      Tagslists: [{ id: 1, name: '上架' }, { id: 2, name: '下架' }],
      Tagslist: [{ id: 1, name: '正式' }, { id: 2, name: '预售' }],
      imageUrl: '',
      visible: false,
      imgUrl: '',
      uplodapath: '/upload/Index/uploadImage',
      formValidate: {
        name: '',
        pc_img: '',
        h5_img: '',
        price: '',
        pay_price: '',
        introduce: '',
        catalogue: '',
        status: '',
        is_presell: '',
        pub_company: '',
        author: ''
      },

      ruleValidate: {
        name: [
          {
            required: true,
            validator: Fomat.Rules.Verifiy().Required,
            trigger: 'blur'
          }
        ],
        pc_img: [
          {
            required: true,
            validator: Fomat.Rules.Verifiy().Required
          }
        ],
        h5_img: [{ required: true, validator: Fomat.Rules.Verifiy().Required }],
        author: [{ required: true, validator: Fomat.Rules.Verifiy().Required }],
        price: [
          {
            required: true,
            validator: Fomat.Rules.Verifiy().patten
          }
        ],
        pay_price: [
          {
            required: true,
            validator: Fomat.Rules.Verifiy().patten
          }
        ],
        introduce: [
          {
            required: true,
            validator: Fomat.Rules.Verifiy().Required
          }
        ],

        catalogue: [
          {
            required: true,
            validator: Fomat.Rules.Verifiy().SRequired,
            trigger: 'change'
          }
        ],
        status: [{ required: true, validator: Fomat.Rules.Verifiy().num }],
        is_presell: [{ required: true, validator: Fomat.Rules.Verifiy().Num }],

        pub_company: [
          { required: true, validator: Fomat.Rules.Verifiy().Required }
        ]
      }
    }
  },
  methods: {
    handleView(url) {
      this.imgUrl = url
      this.visible = true
    },
    handleRemove3() {
      this.formValidate.pc_img = '';
    },
    handleView4(url) {
      this.imgUrl = url
      this.visible = true
    },
    handleRemove4() {
      this.formValidate.h5_img = '';
    },
    handleSuccess4(res, file) {
      if (res.code === 200) {
        this.imageUrl = res.data.image_url
        this.formValidate.h5_img = res.data.image_url
      }
    },
    handleView5(url) {
      this.imgUrl = url
      this.visible = true
    },
    handleRemove5() {
      this.formValidate.introduce = '';
    },
    handleSuccess5(res, file) {
      if (res.code === 200) {
        this.imageUrl = res.data.image_url
        this.formValidate.introduce = res.data.image_url
      }
    },
    handleView6(url) {
      this.imgUrl = url
      this.visible = true
    },
    handleRemove6() {
      this.formValidate.catalogue = '';
    },
    handleSuccess6(res, file) {
      if (res.code === 200) {
        this.imageUrl = res.data.image_url
        this.formValidate.catalogue = res.data.image_url
      }
    },
    handleSuccess3(res, file) {
      if (res.code === 200) {
        this.imageUrl = res.data.image_url
        this.formValidate.pc_img = res.data.image_url
      }
    },
    handleFormatError(file) {
      this.$Notice.warning({
        title: '文件格式验证',
        desc: '文件 “' + file.name + '” 格式错误, 请上传 jpg 或 png.'
      })
    },
    handleMaxSize(file) {
      this.$Notice.warning({
        title: '文件大小验证',
        desc: '文件 “' + file.name + '” 太大, 不要超过 2m'
      })
    },
    resets(name) {
      this.$refs[name].resetFields()
    },
    handleSubmit() {
      this.$refs.formValidate.validate(valid => {
        if (valid) {
          addBooks(this.formValidate).then(res => {
            let rep = res.data
            if (rep.code === 200) {
              this.$Message.success('添加成功，请注意查看')
              this.$router.push({ name: 'Booklist' })
            } else if (res.data.code === 405) {
              this.$Message.error('添加失败，请注意检查填写格式')
            }
          })
        }
      })
    }
  },
  mounted() {
    if (process.env.NODE_ENV === 'production') {
      switch (document.domain) {
        case 'dests.youcaiwx.cn':
          this.uplodapath = `${config.baseUrl.test}/upload/Index/uploadImage`
          break;
        case 'ycdb.youcaiwx.cn':
          this.uplodapath = `${config.baseUrl.pro}/upload/Index/uploadImage`
          break;
        default:
          this.uplodapath = '/upload/Index/uploadImage';
          break
      }
    } else {
      this.uplodapath = '/upload/Index/uploadImage';
    }
  }
}
</script>
<style scoped>
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
.handremove {
  position: absolute;
  right: 0;
  top: 6.037736rem;
}
</style>
