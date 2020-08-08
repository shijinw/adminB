<template>
  <div>
    <Card>
     <p slot="title">题库答疑回复修改</p>
      <div>
     <Form :model="fromData" :rules="ruleValidate" :label-width="80" style="width:95%;margin:0 auto;">
    <div style="margin:0 auto;width:60rem;">
      <div class="tuer">
       <div class="content"><strong class="example">手机号码 :</strong>  <span style="color:cornflowerblue;font-size:15px" v-text="fromData.mobile"></span></div>
       <div class="content"><strong class="example">课程名称 :</strong>  <span style="color:cornflowerblue;font-size:15px" v-text="fromData.course_name"></span></div>
       <div class="content"><strong class="example">创建时间 :</strong>  <span style="color:cornflowerblue;font-size:15px" v-text="fromData.create_time"></span></div>
       <div class="content"><strong class="example">回复状态 :</strong>  <span style="color:cornflowerblue;font-size:15px" >{{fromData.reply_status===1?"已回复":"未回复"}}</span></div>
       <div class="content"><strong class="example">提问端 :</strong>  <span style="color:cornflowerblue;font-size:15px">{{fromData.quiz_source===1?"手机":"pc端"}}</span></div>
       <div class="content"><strong class="example">答疑老师姓名 :</strong>  <span style="color:cornflowerblue;font-size:15px" v-text="fromData.reply_user_name"></span></div>
       <div class="content"><strong class="example">回复时间 :</strong>  <span style="color:cornflowerblue;font-size:15px" v-text="fromData.reply_time"></span></div>
       <div class="content" style="width:95%"><strong class="example">知识点名称 :</strong>  <span style="color:cornflowerblue;font-size:15px" v-text="fromData.know_name"></span></div>
      </div>
        <div style="border:1px solid #999;border-radius: 20px;margin:10px 0">
        <div class="content" style="width:95%"><strong class="example">题目内容 :</strong>
           <component :is="item.component" :text="item.text" v-for="(item,inde) in items" :key="inde"></component>
       </div>
           <div class="content" style="width:95%" v-if="fromData.question_info.question_type===1?true:false"><strong class="example">选项答案 </strong>
           <p :style="fromData.question_info.true_options==='A'?isactive:isActive"><strong class="example">A :</strong>{{fromData.question_info.option_a}}</p>

           <p :style="fromData.question_info.true_options==='B'?isactive:isActive"><strong class="example">B :</strong>{{fromData.question_info.option_b}}</p>

           <p :style="fromData.question_info.true_options==='C'?isactive:isActive"><strong class="example">C :</strong>{{fromData.question_info.option_c}}</p>

           <p :style="fromData.question_info.true_options==='D'?isactive:isActive"><strong class="example">D :</strong>{{fromData.question_info.option_d}}</p>
       </div>
      <div class="content" style="width:95%" v-if="fromData.question_info.question_type===1?true:false"><strong class="example">正确选项 ：{{fromData.question_info.true_options}}</strong></div>
      <div class="content" style="width:95%"><strong class="example">题目难度 ：{{fromData.difficulty}}</strong></div>
     <div class="content" style="width:95%;"><strong class="example"> 题目解析 ：</strong>
       <p style="overflow: hidden;white-space: pre-wrap;">{{fromData.question_info.analysis}}</p>
       <img v-if="fromData.question_info.analysis_img" style="width:100px;height:120px" :src="fromData.question_info.analysis_img"></img>
      </div>
       <div class="content" style="width:95%;">
          <p style="overflow: hidden;white-space: pre-wrap;">{{fromData.question_info.analysis_one}}</p>
       <img v-if="fromData.question_info.analysis_img_one" style="width:100px;height:120px" :src="fromData.question_info.analysis_img"></img>
      </div>
   </div>
    </div>
    <div style="border:1px solid #999;border-radius: 20px;margin:10px auto">
         <div style="width:92%;margin:10px auto">
              <FormItem label="提问问题" prop="quiz">
                <Input v-model="fromData.quiz" type="textarea" placeholder="输入需要修改的提问问题" :rows="3" />
              </FormItem>
            </div>
            <FormItem label="提问图片" style="width:92%;margin:10px auto">
              <Images style="margin:25px" :loadList="fromData.quiz_image" All="All"></Images>
            </FormItem>  
        </div>
        <div style="border:1px solid #999;border-radius: 20px;margin:10px 0" >
    <FormItem label="回复提问" prop="reply_quiz" style="margin:20px auto;width:95%">
         <Input v-model="fromData.reply_quiz" type="textarea"   placeholder="输入回复答案"  :rows="3" />
          </FormItem>
            <FormItem label="回复图片" style="width:92%;margin:10px auto">
            <Images style="margin:25px" :loadList="fromData.reply_image" All="All"></Images>
          </FormItem>
        </div>
  <div  style="border:1px solid #999;border-radius: 20px;margin:10px 0" v-if="fromData.z_quiz">
           <FormItem label="追问提问" prop="z_quiz">
              <Input v-model="fromData.z_quiz" type="textarea" placeholder="输入追问提问问题" :rows="3" />
            </FormItem>
          <FormItem label="追问提问图片" style="width:92%;margin:10px auto" :label-width="90">
            <Images style="margin:25px" :loadList="fromData.z_quiz_image" All="All"></Images>
          </FormItem>
        </div>
    <div style="border:1px solid #999;border-radius: 20px;margin:10px 0" v-if="fromData.z_quiz">
   <FormItem label="追问回复" prop="z_reply_quiz" style="margin:20px auto;width:95%">
            <Input
              v-model="fromData.z_reply_quiz"
              type="textarea"
              placeholder="输入追问回复"
              :rows="3"
              style="width: 100%"
            />
          </FormItem>
          <FormItem label="追问回复图片" style="width:92%;margin:10px auto" :label-width="90">
            <Images style="margin:25px" :loadList="fromData.z_reply_image" All="All"></Images>
          </FormItem>
  </div>
      <FormItem>
        <div style="text-align: center;">
          <Button type="success" @click="handleSubmit" style="margin-left: 8px;width:130px;height:45px;margin-right: 100px">提 交</Button>
        </div>
      </FormItem>
      </Form >
    </div>
    </Card>

  </div>

</template>

<script>
import { queAnswerInfo, putQueReplyAnswer } from '@/api/Answer'
import Images from '../components/Images/MastImage'
import Fomat from '@/libs/fomat'
import Imagen from '../components/creates/Imagen.vue'
import texts from '../components/creates/texts.vue'
import Viedo from '../components/video/Video.vue'
import config from '@/config'
export default {

  data () {
    return {
      uplodapath: '/upload/Index/uploadImage',
      visible1: false,
      fromdata: {
        id: '',
        reply_quiz: '',
        reply_image: ''
      },
      items: [],
      imageUrl: '',
      visible: false,
      imgUrl: '',
      difficulty: '',
      uploadList3: [],
      isactive: {
        marginLeft: '20px',
        color: 'green'
      },
      isActive: {
        marginLeft: '20px'
      },
      fromData: {
        mobile: '',
        course_name: '',
        section_name: '',
        create_time: '',
        reply_status: '',
        question_info: {},
        difficulty: '',
        quiz_source: '',
        reply_user_name: '',
        reply_time: '',
        quiz: '',
        reply_quiz:'',
        reply_image:'',
        z_reply_quiz:'',
        z_reply_image:'',
        quiz_image: '',
        z_quiz:'',
        z_quiz_image:'',
        know_name: ''

      },

      ruleValidate: {
        reply_quiz: [
          { required: true, validator: Fomat.Rules.Verifiy().Required, trigger: 'blur' }
        ],
        option_c: [
          {
            required: true,
            validator: Fomat.Rules.Verifiy().Required,
            trigger: 'change'
          }
        ]
      }

    }
  },
  components: {
    Images, Imagen, texts, Viedo
  },
  watch: {
    difficulty (newValue, oldValue) {
      if (newValue === 'A') {
        this.fromData.difficulty = '困难'
      } else if (newValue === 'B') {
        this.fromData.difficulty = '普通'
      } else if (newValue === 'C') {
        this.fromData.difficulty = '简单'
      }
    }
  },
  methods: {
    lookVideo () {
      this.visible1 = true
    },

    handleView (url) {
      this.imgUrl = url
      this.visible = true
    },
    handleBeforeUpload () {
      const check = this.uploadList3.length < 3
      if (!check) {
        this.$Message.warning(
          '上传图片不可超过三张，请核对'
        )
      }
      return check
    },
    handleRemove3 (file) {
      let fileList = this.uploadList3
      this.uploadList3.splice(fileList.indexOf(file), 1)
    },
    handleSuccess3 (res, file) {
      if (res.code === 200) {
        let obj = {
          name: file.name,
          url: res.data.image_url
        }
        this.uploadList3.push(obj)
        this.imageUrl = res.data.image_url
      }
    },
    handleFormatError (file) {
      this.$Message.warning(
        '文件 “' + file.name + '” 格式错误, 请上传 jpg 或 png.'
      )
    },
    handleMaxSize (file) {
      this.$Message.warning(
        '文件 “' + file.name + '” 太大, 不要超过 512k.'
      )
    },
    handleSubmit () {
      this.fromData.id = this.$route.query.id
      if (this.fromData.z_quiz) {
        if (this.fromData.z_reply_quiz) {
          putQueReplyAnswer({ 
                   id: this.fromData.id,
            quiz: this.fromData.quiz,
            z_quiz: this.fromData.z_quiz,
            quiz_image: this.fromData.quiz_image,
            z_quiz_image: this.fromData.z_quiz_image,
            reply_quiz: this.fromData.reply_quiz,
            reply_image: this.fromData.reply_image,
            z_reply_quiz: this.fromData.z_reply_quiz,
            z_reply_image: this.fromData.z_reply_image
           }).then(res => {
            let rep = res.data
            if (rep.code === 200) {
              this.$Message.success('追问回复成功，请注意查看')
              this.$router.go(-1)
            }
          })
        } else {
          this.$Message.error('追问回复内容不可小于10个字，请核对')
        }
      } else {
        if (this.fromData.reply_quiz) {
          putQueReplyAnswer({ 
                   id: this.fromData.id,
            quiz: this.fromData.quiz,
            z_quiz: "",
            quiz_image: this.fromData.quiz_image,
            z_quiz_image: "",
            reply_quiz: this.fromData.reply_quiz,
            reply_image: this.fromData.reply_image,
            z_reply_quiz: "",
            z_reply_image: ""
           }).then(res => {
            let rep = res.data
            if (rep.code === 200) {
              this.$Message.success('回复成功，请注意查看')
              this.$router.go(-1)
            }
          })
        } else {
          this.$Message.error('回复内容不可小于10个字，请核对')
        }
      }
    },
    getData () {
      queAnswerInfo({ id: this.$route.query.id }).then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.fromData = rep.data
          this.fromData.mobile = rep.data.mobile
          this.fromData.course_name = rep.data.course_name
          this.fromData.section_name = rep.data.section_name
          this.fromData.create_time = rep.data.create_time
          this.fromData.reply_status = rep.data.reply_status
          this.fromData.quiz_source = rep.data.quiz_source
          this.fromData.reply_user_name = rep.data.reply_user_name
          this.fromData.know_name = rep.data.know_name
          this.fromData.reply_time = rep.data.reply_time
          this.fromData.quiz = rep.data.quiz
          this.fromData.question_info = rep.data.question_info
          this.difficulty = rep.data.question_info.difficulty
         
          let Arr = []
          rep.data.question_stem.forEach((item, index) => {
            let reg = /http/
            if (reg.test(rep.data.question_stem[index])) {
              Arr.push({
                component: Imagen,
                text: item
              })
            } else {
              Arr.push({
                component: texts,
                text: item.replace(/\n/g, '<br>')
              })
            }
            this.items = Arr
          })
        } else if (rep.code === 412) {
          this.$Message.error(res.data.msg)
          this.$router.go(-1)
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
    this.$nextTick(() => {
      this.getData()
    })
  }
}
</script>

<style lang="less" scoped>
.example{
font-family:"Microsoft YaHei";
font-size:12px;
font-weight:600;
}

.tuer{
  display:flex;
  justify-content:left;
  flex-wrap: wrap;
}
.Icontent{
 width: 100%;
 display: flex;
 margin-top:20px;
 margin-right: 100px;
 margin-left: 50px;
justify-content: left;
}
.demo{
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
        margin: 15px;
}
.demo-upload{
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,.6);
}
.demo:hover .demo-upload{
        display: block;
    }
.imgs{
width:60px;
height: 60px;
}
.content{
 width: 25rem;
 margin:10px 50px 0 20px;
}
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
