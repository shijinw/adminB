<template>
  <div>
    <Card style="width: 800px;">
      <p slot="title">添加课程表单</p>
      <Form ref="formValidate"
            :model="formValidate"
            :rules="ruleValidate"
            :label-width="80">
        <Row>
          <Col :span="12">
          <FormItem label="项目专业"
                    prop="project_id">
            <Cascader :data="list"
                      v-model="valueList"
                      change-on-select
                      placeholder="项目/专业"></Cascader>
            <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：选择项目 and 专业</p>
          </FormItem>
          </Col>
          <Col :span="12">
          <FormItem label="分类标签"
                    prop="class_id">
            <Select v-model="formValidate.class_id"
                    clearable
                    placeholder="分类标签">
              <Option v-for="item in tagsList"
                      :value="item.id"
                      :key="item.id">{{ item.class_name }}</Option>
            </Select>
            <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：选择分类标签</p>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col :span="12">
          <FormItem label="选择机构"
                    prop="org_id">
            <Select v-model="formValidate.org_id"
                    clearable
                    placeholder="所属机构">
              <Option v-for="item in orgList"
                      :value="item.id"
                      :key="item.id">{{ item.org_name }}</Option>
            </Select>
            <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: nvbormal;">提示：选择所属机构</p>
          </FormItem>
          </Col>
          <Col :span="12">
          <FormItem label="选择讲师"
                    prop="teacher_id">
            <Select v-model="formValidate.teacher_id"
                    clearable
                    placeholder="主讲老师">
              <Option v-for="item in teacherList"
                      :value="item.id"
                      :key="item.id">{{ item.name }}</Option>
            </Select>
            <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：选择主讲老师</p>
          </FormItem>
          </Col>
        </Row>
        <Row>

          <Col :span="12">
          <FormItem label="是否正课"
                    prop="is_zhengke">
            <RadioGroup v-model="formValidate.is_zhengke">
              <Radio label="1">是</Radio>
              <Radio label="2">不是</Radio>
            </RadioGroup>
            <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：选择课程是否为正课</p>
          </FormItem>
          </Col>

          <Col :span="12">
          <FormItem label="VIP视频"
                    prop="vip_video">
            <RadioGroup v-model="formValidate.vip_video">
              <Radio label="1">是</Radio>
              <Radio label="2">不是</Radio>
            </RadioGroup>
            <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: nvbormal;">提示：选择该课程是否为VIP课程</p>
          </FormItem>
          </Col>
        </Row>
        <Col :span="12">
        <FormItem label="VIP题库"
                  prop="vip_bank">
          <RadioGroup v-model="formValidate.vip_bank">
            <Radio label="1">是</Radio>
            <Radio label="2">不是</Radio>
          </RadioGroup>
          <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：选择该课程是否有VIP题库</p>
        </FormItem>
        </Col>
        </Row>
        <Row>
          <Col :span="12">
          <FormItem label="在线答疑"
                    prop="line_answer">
            <RadioGroup v-model="formValidate.line_answer">
              <Radio label="1">是</Radio>
              <Radio label="2">不是</Radio>
            </RadioGroup>
            <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: nvbormal;">提示：选择该课程是否有在线答疑</p>
          </FormItem>
          </Col>
          <Col :span="12">
          <FormItem label="翻转课堂"
                    prop="is_overclass">
            <RadioGroup v-model="formValidate.is_overclass">
              <Radio label="1">是</Radio>
              <Radio label="2">不是</Radio>
            </RadioGroup>
            <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：选择该课程是否是翻转课堂</p>
          </FormItem>
          </Col>
          <Col :span="12">
          <FormItem label="是否面授"
                    prop="course_type">
            <RadioGroup v-model="formValidate.course_type">
              <Radio label="1">网课</Radio>
              <Radio label="2">面授</Radio>
            </RadioGroup>
            <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：选择该课程是网课or面授</p>
          </FormItem>
          </Col>
        </Row>
           <FormItem label="开通训练营"
                    prop="is_sprint" 
                    :label-width="90"
                    v-if="formValidate.is_zhengke==1?true:false">
            <RadioGroup v-model="formValidate.is_sprint">
              <Radio label="1">是</Radio>
              <Radio label="2">否</Radio>
            </RadioGroup>
            <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：选择该课程是否开通冲刺训练营</p>
          </FormItem>
        <Row v-if="Quesvasble">
          <Col :span="12">
          <FormItem label="绑定题库"
                    >
            <Select v-model="formValidate.bind_question"
                    clearable
                    placeholder="题库列表">
              <Option v-for="item in QuertionList"
                      :value="item.id"
                      :key="item.id">{{ item.name }}</Option>
            </Select>
          </FormItem>
          </Col>
        </Row>
        <FormItem label="课程标题"
                  prop="name">
          <Input v-model="formValidate.name"
                 type="text"
                 placeholder="课程标题"></Input>
          <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：课程标题</p>
        </FormItem>
        <FormItem label="描　　述"
                  prop="description">
          <Input v-model="formValidate.description"
                 type="textarea"
                 :autosize="{minRows: 3,maxRows: 10}"
                 placeholder="简介..."></Input>
          <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：课程描述</p>
        </FormItem>
        <Row>
          <Col :span="12">
          <FormItem label="PC封面"
                    prop="pc_img">
            <MyImages :loadList.sync="formValidate.pc_img" ></MyImages>
            <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：请上传正常比例的图片</p>  
          </FormItem>
          </Col>
          <Col :span="12">
          <FormItem label="APP封面"
                    prop="app_img">
            <MyImages :loadList.sync="formValidate.app_img" ></MyImages>
            <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：请上传正常比例的图片</p>  
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col :span="12">
          <FormItem label="微信封面"
                    prop="wx_img">
             <MyImages :loadList.sync="formValidate.wx_img" ></MyImages>
             <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：请上传正常比例的图片</p>  
          </FormItem>
          </Col>
          <Col :span="12">
          <FormItem label="手机封面"
                    prop="mobile_img">
           <MyImages :loadList.sync="formValidate.mobile_img" ></MyImages>
           <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：请上传正常比例的图片</p>  
          </FormItem>
          </Col>
        </Row>
        <FormItem label="课程简介"
                  prop="brief_img">
             <MyImages :loadList.sync="formValidate.brief_img" :isActive="true"></MyImages>
               <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：课程简介为图片，您可以在“365编辑器”上编辑，完成后点击[生成长图]</p>
        </FormItem>
        <FormItem>
          <div style="text-align: right;">
            <Button @click="handleReset('formValidate')">重置</Button>
            <Button type="primary"
                    @click="handleSubmit('formValidate')"
                    style="margin-left: 8px">添 加 课 程</Button>
          </div>
        </FormItem>
      </Form>
    </Card>
  </div>
</template>

<script>
import { orgList, addCourse, getQueList } from '@/api/course';
import { mapMutations } from 'vuex';
import { proMjor2tree } from '@/api/Linkmenu';
import { labelList } from '@/api/tags';
import { teacherList } from '@/api/teacher';
import MyImages from '../components/Images/MastImage';
import Fomat from '@/libs/fomat';
import config from '@/config';
export default {
  data() {
    return {
      uplodapath: '/upload/Index/uploadImage',
      visible: false,
      Quesvasble: false,
      uploadList: [],
      uploadList2: [],
      uploadList3: [],
      uploadList4: [],
      uploadList5: [],
      imgUrl: '',
      tagsList: [],
      list: [],
      valueList: [],
      orgList: [],
      teacherList: [],
      QuertionList: [],
      formValidate: {
        name: '',
        project_id: '',
        major_id: '',
        class_id: '',
        org_id: '',
        teacher_id: '',
        description: '',
        status: '',
        brief_img: '',
        pc_img: '',
        app_img: '',
        wx_img: '',
        mobile_img: '',
        is_zhengke: '',
        vip_video: '',
        vip_bank: '',
        line_answer: '',
        is_overclass: '',
        course_type: '',
        bind_question: '',
        is_sprint :''
      },
      ruleValidate: {
        name: [
          {
            required: true,
            validator: Fomat.Rules.Verifiy().Required,
            trigger: 'blur'
          }
        ],
        project_id: [
          {
            required: true,
            validator: Fomat.Rules.Verifiy().Required,
            trigger: 'change'
          }
        ],
        class_id: [
          {
            required: true,
            validator: Fomat.Rules.Verifiy().Required,
            trigger: 'change'
          }
        ],
        course_type: [
          {
            required: true,
            validator: Fomat.Rules.Verifiy().Required,
            trigger: 'change'
          }
        ],
        org_id: [
          {
            required: true,
            validator: Fomat.Rules.Verifiy().Required,
            trigger: 'change'
          }
        ],
        teacher_id: [
          {
            required: true,
            validator: Fomat.Rules.Verifiy().Required,
            trigger: 'change'
          }
        ],
        bind_question: [
          {
            required: true,
            validator: Fomat.Rules.Verifiy().Required,
            trigger: 'change'
          }
        ],
        description: [
          {
            required: true,
            validator: Fomat.Rules.Verifiy().Required,
            trigger: 'blur'
          }
        ],
        status: [
          {
            required: true,
            validator: Fomat.Rules.Verifiy().Required,
            trigger: 'change'
          }
        ],
        brief_img: [
          { required: true, validator: Fomat.Rules.Verifiy().Required }
        ],
        app_img: [
          { required: true, validator: Fomat.Rules.Verifiy().Required }
        ],
        pc_img: [{ required: true, validator: Fomat.Rules.Verifiy().Required }],
        wx_img: [{ required: true, validator: Fomat.Rules.Verifiy().Required }],
        mobile_img: [
          { required: true, validator: Fomat.Rules.Verifiy().Required }
        ],
        is_zhengke: [
          {
            required: true,
            validator: Fomat.Rules.Verifiy().Required,
            trigger: 'change'
          }
        ],
        is_sprint: [
          {
            required: true,
            validator: Fomat.Rules.Verifiy().Required,
            trigger: 'change'
          }
        ],
        vip_bank: [
          {
            required: true,
            validator: Fomat.Rules.Verifiy().Required,
            trigger: 'change'
          }
        ],
         vip_bank: [
          {
            required: true,
            validator: Fomat.Rules.Verifiy().Required,
            trigger: 'change'
          }
        ],
        line_answer: [
          {
            required: true,
            validator: Fomat.Rules.Verifiy().Required,
            trigger: 'change'
          }
        ],
        is_overclass: [
          {
            required: true,
            validator: Fomat.Rules.Verifiy().Required,
            trigger: 'change'
          }
        ]
      }
    }
  },
  components: { // 引入组件
    MyImages
  },
  watch: {
    valueList(newValue, oldValue) {
      if (newValue.length === 0) {
        this.formValidate.project_id = '';
        this.formValidate.major_id = '';
      } else if (newValue.length === 1) {
        this.formValidate.project_id = newValue[0]
        this.formValidate.major_id = '';
      } else {
        this.formValidate.project_id = newValue[0]
        this.formValidate.major_id = newValue[1]
      }
    },
   
    'formValidate.course_type'(newValue) {
      if (newValue === '1') {
        this.Quesvasble = false
      } else {
        this.Quesvasble = true
      }
    }
  },
  methods: {
    ...mapMutations(['addTag', 'closeTag']),
    getProMajList() {
      proMjor2tree().then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.list = rep.data
        }
      })
    },
    
    handleSubmit(name) {
     if(this.formValidate.is_zhengke==2) this.formValidate.is_sprint=2
      this.$refs[name].validate(valid => {
        if (valid) {
          addCourse(this.formValidate).then(res => {
            if (res.data.code === 200) {
              this.$Message.success('添加成功!')
              this.handleReset(name)
              this.$router.push({ name: 'course_list' })
            }
          })
        } else {
          this.$Message.error('请认真填写信息!')
        }
      })
    },
    handleReset(name) {
       this.valueList=[]
      this.$refs[name].resetFields()
    },
    getOrgList() {
      orgList().then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.orgList = rep.data
        }
      })
    },
    getTeacherList(obj) {
      teacherList(obj).then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.teacherList = rep.data.data
        }
      })
    },
    getList(obj) {
      labelList(obj).then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.tagsList = rep.data
        }
      })
    },
    getQuesList() {
      getQueList().then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.QuertionList = rep.data
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

    this.getList({ status: '', class_name: '' })
    this.getProMajList()
    this.getOrgList()
    this.getQuesList()
    this.getTeacherList({
      page: 1,
      limit: 10000,
      name: '',
      teacher_title_id: ''
    })
  }
}
</script>

<style lang="less">


</style>
