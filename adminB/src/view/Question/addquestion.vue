<template>
  <div>
    <Card style="width: 1000px;">
      <p slot="title">添加试题</p>
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
      <Row>
          <Col :span="12">
            <FormItem label="绑定课程" prop="valueList" :label-width="100">
              <Cascader :data="list" v-model="formValidate.valueList"  placeholder="项目/专业/课程"></Cascader>
              <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;"
              >提示：选择项目/专业/课程</p>
            </FormItem>
          </Col>
          <Col :span="12">
           <FormItem label="知识点" prop="plate_id" :label-width="100">
                <Button type="primary" @click="Primay">关联知识点</Button>
          </FormItem>

          </Col>
       </Row>

          <Row>
            <Col :span="12">
            <FormItem label="类型" prop="question_type" :label-width="100">
              <Select v-model="formValidate.question_type" clearable placeholder="类型">
                <Option v-for="item in formatFile" :value="item.id" :key="item.id">{{ item.name }}</Option>
              </Select>
              <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：选择题目类型</p>
            </FormItem>
             </Col>
          <Col :span="12">
            <FormItem label="难易度" prop="difficulty" :label-width="100">
             <Select v-model="formValidate.difficulty" clearable placeholder="难易度">
                <Option v-for="item in grade" :value="item.name" :key="item.id">{{ item.name }}</Option>
              </Select>
              <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：选择题库的难易度</p>
            </FormItem>
          </Col>
           </Row>
           <Row>

          <Col :span="12">
            <FormItem label="是否调用" prop="know_call" :label-width="100">
                <RadioGroup v-model="formValidate.know_call" style="margin-left:10px">
                <Radio :label="1">是</Radio>
                <Radio :label="2">不是</Radio>
              </RadioGroup>
              <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：选择知识点是否调用</p>
            </FormItem>

          </Col>
        </Row>

      <Row>
          <FormItem label="题干首段" prop="question_stem" :label-width="100">
              <Input v-model="question_Stem"
              type="textarea" :rows="3"
              placeholder='请输入题干首段文字，首段只可以输入文字'
              />
      <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：首段只可输入文字，如果有其他扩展可点击添加</p>

          </FormItem>
          </Row>
       <component v-for="(val,key) in ADD" :text="val.text" :id="val.id" :is="val.component" :ref="'put'+key" :key="key+'put'" @remoeview='removeivew'></component>
               <Button type="info" style="margin-left:30.660377rem;margin-bottom:20px"  v-if="REmove"  @click='addFont(REmove)'>{{REmove}}</Button>
       <Row v-show="moddle">
            <FormItem label="选项A" prop="option_a" :label-width="100">
                <Input v-model="formValidate.option_a" type="textarea" placeholder='请输入选项A' />
            </FormItem>
        </Row>
         <Row v-show="moddle">
            <FormItem label="选项B" prop="option_b" :label-width="100">
                <Input v-model="formValidate.option_b" type="textarea" placeholder='请输入选项B'/>
            </FormItem>
        </Row>
         <Row v-show="moddle">
            <FormItem label="选项C" prop="option_c" :label-width="100">
                <Input v-model="formValidate.option_c" type="textarea" placeholder='请输入选项C'/>
            </FormItem>
        </Row>
         <Row v-show="moddle">
            <FormItem label="选项D" prop="option_d" :label-width="100">
                <Input v-model="formValidate.option_d" type="textarea" placeholder='请输入选项D'/>
            </FormItem>
        </Row>
         <Row v-show="moddle">
           <FormItem label="正确选项" prop="true_options" :label-width="100">
              <RadioGroup v-model="formValidate.true_options">
                <Radio label="A">A</Radio>
                <Radio label="B">B</Radio>
                <Radio label="C">C</Radio>
                <Radio label="D">D</Radio>
              </RadioGroup>
              <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：选择课程是否</p>
            </FormItem>
        </Row>
         <Row>
            <FormItem label="解析" prop="analysis" :label-width="100">
               <Input v-model="formValidate.analysis" type="textarea" placeholder="输入答案解析" :rows="3" style="width: 100%"/>
            </FormItem>
        </Row>
          <GImages ref="jiTu"></GImages>
         <Row>
            <FormItem label="解析2" :label-width="100">
               <Input v-model="formValidate.analysis_one" type="textarea" placeholder="输入答案解析2" :rows="3" style="width: 100%"/>
            </FormItem>
        </Row>
          <GImages ref="jiXi"></GImages>
          <Row>
           <FormItem label="应用场景" prop="plate_id" :label-width="100">
      <CheckboxGroup v-model="formValidate.plate_id">
        <Checkbox v-for="(val,key) in Plate" :label="val.id" :key="key">{{val.plate_name}}</Checkbox>

       </CheckboxGroup>
        <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：选择应用场景</p>
            </FormItem>
        </Row>

    <Row>
            <FormItem label="视频讲解"  :label-width="100">

               <Input v-model="formValidate.video_explain" placeholder="输入视频讲解地址" style="width: 100%" />

            </FormItem>
        </Row>

      <Row>
            <FormItem label="试题来源" :label-width="100">

               <Input v-model="formValidate.queston_source" placeholder="输入试题来源信息" style="width: 100%" />

            </FormItem>
        </Row>
          <Row>
            <FormItem label="试题备注" :label-width="100">

               <Input v-model="formValidate.remark" placeholder="输入试题备注信息" style="width: 100%" />

            </FormItem>
        </Row>
  <Row>
            <FormItem label="知识点备注" :label-width="100">

               <Input v-model="formValidate.know_remark" placeholder="输入知识点备注信息" style="width: 100%" />

            </FormItem>
        </Row>
        <FormItem>
          <div style="text-align: center;">

            <Button type="success" @click="handleSubmit('formValidate')" style="margin-left: 8px;width:130px;height:45px;margin-right: 100px">提 交</Button>

          </div>
        </FormItem>
      </Form>
    </Card>
<Modal v-model="modal3" draggable scrollable title="知识点关联" :width="800" :footer-hide="true">
        <div style="padding-bottom: 15px;">
            <Cascader :data="list3" v-model="valueList3" change-on-select placeholder="知识点章/知识点节" style="display: inline-block; width: 300px;" @on-change="seachKnow"></Cascader>
            <Divider type="vertical" />

          </div>
          <Transfer
            :data="data3"
            :target-keys="targetKeys3"
            :list-style="listStyle"
            :render-format="render3"
             :titles="['知识点id/名','已关联知识点']"
            :operations="['取消关联','设置关联']"
            @on-change="handleChange3"
          ></Transfer>

      </Modal>
  </div>

</template>

<script>
import { knowNoList } from '@/api/course'
import { zkProMjorCou3tree, knob2Tree } from '@/api/Linkmenu'
import { addQuestion, getPlate } from '@/api/question'
import { zhengkeList } from '@/api/student'

import { mapMutations } from 'vuex'
import Images from '../components/images.vue'
import GImages from '../components/video/images.vue'
import Textare from '../components/textare.vue'
import Fomat from '@/libs/fomat'

export default {

  data () {
    return {
      targetKeys3: [],
      data3: [],
      modal3: false,
      ADD: [],
      ADD2: false,
      ADD3: 1,
      REmove: '添加更多图片',
      Plate: [],
      listStyle: {
        width: '300px',
        height: '400px'
      },
      visible: false,
      visible2: false,
      plate_id: [],
      uploadList: [],
      list3: [],
      valueList3: [],
      uploadList2: [],
      formdata: [],
      single: '',
      knowForm: {
        project_id: '',
        major_id: '',
        course_id: '',
        section_id: '',
        knob_id: ''

      },
      formatFile: [{
        id: 1,
        name: '单选 '
      }, {
        id: 2,
        name: '论述题'
      }],
      grade: [{
        id: 1,
        name: 'A'
      }, {
        id: 2,
        name: 'B'
      },
      {
        id: 3,
        name: 'C'
      }],

      TagsList: '',
      imgUrl: '',
      imgUrl2: '',
      tagsList: [{
        id: 1,
        name: '固定日期关课'
      },
      {
        id: 2,
        name: '按照学习天数关课'
      }],

      list: [],
      moddle: true,
      valueList: [],
      question_Stem: '',
      formValidate: {
        project_id: '',
        major_id: '',
        question_type: 1,
        difficulty: '',
        know_call: 2,
        question_stem: [],
        course_id: '',
        option_a: '',
        option_b: '',
        question_Stem: '',
        option_c: '',
        option_d: '',
        true_options: '',
        analysis: '',
        analysis_one: '',
        analysis_img_one: '',
        analysis_img: '',
        queston_source: '',
        video_explain: '',
        plate_id: [],
        remark: '',
        know_id: '',
        know_remark: '',
        valueList: []

      },

      ruleValidate: {
        name: [
          {
            required: true,
            validator: Fomat.Rules.Verifiy().Required

          }
        ],
        question_type: [
          {
            required: true,
            validator: Fomat.Rules.Verifiy().Required

          }
        ],
        question_Stem: [
          { required: true, message: '请输入题目首段文字' }
        ],
        valueList: [
          {
            required: true,
            validator: Fomat.Rules.Verifiy().Build

          }
        ],
        difficulty: [
          {
            required: true,
            validator: Fomat.Rules.Verifiy().Required

          }
        ],

        option_a: [
          {
            required: true,
            validator: Fomat.Rules.Verifiy().Required

          }
        ],
        course_id: [ {
          required: true,
          validator: Fomat.Rules.Verifiy().Required

        }],
        option_c: [
          {
            required: true,
            validator: Fomat.Rules.Verifiy().Required

          }
        ],

        know_call: [
          {
            required: true,
            validator: Fomat.Rules.Verifiy().Required

          }
        ],
        question_stem: [
          { required: true, validator: Fomat.Rules.Verifiy().Required }
        ],
        true_options: [
          { required: true, validator: Fomat.Rules.Verifiy().Required }
        ],
        analysis: [{ required: true, validator: Fomat.Rules.Verifiy().Required }],
        analysis_img: [{ required: true, validator: Fomat.Rules.Verifiy().Required }],
        queston_source: [
          { required: true, validator: Fomat.Rules.Verifiy().Required }
        ],
        video_explain: [
          {
            required: true,
            validator: Fomat.Rules.Verifiy().Required

          }
        ],

        remark: [
          {
            required: true,
            validator: Fomat.Rules.Verifiy().Required

          }
        ],
        plate_id: [
          { required: true, message: '请选择该题目应用场景' }
        ],
        know_id: [
          {
            required: true,
            validator: Fomat.Rules.Verifiy().Required

          }
        ],
        option_b: [
          {
            required: true,
            validator: Fomat.Rules.Verifiy().Required

          }
        ],

        option_d: [
          {
            required: true,
            validator: Fomat.Rules.Verifiy().Required

          }
        ]
      }

    }
  },
  components: {
    Images, Textare, GImages
  },
  watch: {

    'formValidate.question_type' (newValue, oldValue) {
      if (newValue === 1) {
        this.moddle = true
      } else if (newValue === 2) {
        this.moddle = false
      }
    },
    // 'formValidate.plate_id' (newValue, oldValue) {
    //   console.log(newValue)

    //   if (newValue.length) {
    //     this.formValidate.plate_id = newValue.join(',')
    //   }
    // },
    'formValidate.valueList' (newValue, oldValue) {
      if (newValue.length === 0) {
        this.knowForm.project_id = ''
        this.knowForm.major_id = ''
        this.knowForm.course_id = ''
      } else if (newValue.length === 1) {
        this.knowForm.project_id = newValue[0]
        this.knowForm.major_id = ''
        this.knowForm.course_id = ''
      } else if (newValue.length === 2) {
        this.knowForm.project_id = newValue[0]
        this.knowForm.major_id = newValue[1]
        this.knowForm.course_id = ''
      } else {
        this.knowForm.project_id = newValue[0]
        this.knowForm.major_id = newValue[1]
        this.knowForm.course_id = newValue[2]
        this.knowForm.section_id = ''
        this.knowForm.knob_id = ''
        this.valueList3 = []
        this.getknows(this.knowForm)
        this.getProMajLists(newValue[2])
      }
    },
    valueList3 (newValue, oldValue) {
      if (newValue.length === 0) {
        this.knowForm.section_id = ''
        this.knowForm.knob_id = ''
      } else if (newValue.length === 1) {
        this.knowForm.section_id = newValue[0]
        this.knowForm.knob_id = ''
      } else {
        this.knowForm.section_id = newValue[0]
        this.knowForm.knob_id = newValue[1]
      }
    },
    ADD (newValue, oldValue) {
      if (newValue[newValue.length - 1]) {
        if (newValue[newValue.length - 1].statu === 1) {
          this.REmove = '添加更多文字'
        } else if (newValue[newValue.length - 1].statu === 2) {
          this.REmove = '添加更多图片'
        }
      } else {
        this.REmove = '添加更多图片'
      }
      if (newValue.length >= 4) {
        this.REmove = ''
      }
    }

  },
  methods: {
    ...mapMutations(['addTag', 'closeTag']),
    getProMajList () {
      zkProMjorCou3tree().then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.list = rep.data
        }
      })
    },

    getTargetKeys () {
      // knowNoList().then(res => {
      //   if (res.data.code === 200) {
      //     let arr = []
      //     res.data.data.forEach(val => {
      //       arr.push(val.course_id * 1)
      //     })
      //   }
      // })
    },
    handleChange3 (newTargetKeys, direction, moveKeys) {
      this.targetKeys3 = newTargetKeys
      this.formValidate.know_id = newTargetKeys.join(',')
    },
    render3 (item) {
      return item.key + ' - ' + item.label
    },
    getknows (obj) {
      knowNoList(obj).then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.data3 = rep.data
        }
      })
    },
    seachKnow () {
      knowNoList(this.knowForm).then(res => {
        if (res.data.code === 200) {
          this.data3 = res.data.data
        }
      })
    },
    Primay () {
      this.modal3 = true
    },
    addFont (REmove) {
      if (REmove === '添加更多文字') {
        this.ADD.push({
          id: new Date().getTime(),
          statu: 2,
          component: Textare
        })
      } else {
        this.ADD.push({
          id: new Date().getTime(),
          statu: 1,
          component: Images
        })
      }
    },

    removeivew (id) {
      this.ADD.forEach((e, i) => {
        if (e.id === id) {
          this.ADD.splice(i, 1)
        }
      })
    },
    handleSubmit (name) {
      if (this.$refs.jiTu) {
        this.formValidate.analysis_img = this.$refs.jiTu.uploadList3[0] ? this.$refs.jiTu.uploadList3[0].url : ''
        if (this.formValidate.analysis_img === undefined) {
          this.formValidate.analysis_img = ''
        }
      } else {
        this.formValidate.analysis_img = ''
      }
      if (this.$refs.jiXi) {
        this.formValidate.analysis_img_one = this.$refs.jiXi.uploadList3[0] ? this.$refs.jiXi.uploadList3[0].url : ''
        if (this.formValidate.analysis_img_one === undefined) {
          this.formValidate.analysis_img_one = ''
        }
      } else {
        this.formValidate.analysis_img_one = ''
      }
      let { put0, put1, put2, put3 } = this.$refs
      let stem0 = null
      let stem1 = null
      let stem2 = null
      let stem3 = null
      if (put0) {
        put0.length === 1 ? stem0 = put0[0].Data || put0[0].imageUrl : stem0 = ''
      }
      if (put1) {
        put1.length === 1 ? stem1 = put1[0].Data || put1[0].imageUrl : stem1 = ''
      }
      if (put2) {
        put2.length === 1 ? stem2 = put2[0].Data || put2[0].imageUrl : stem2 = ''
      }
      if (put3) {
        put3.length === 1 ? stem3 = put3[0].Data || put3[0].imageUrl : stem3 = ''
      }

      let stemAll = [this.question_Stem, stem0, stem1, stem2, stem3]
      this.formValidate.project_id = this.knowForm.project_id
      this.formValidate.major_id = this.knowForm.major_id
      this.formValidate.course_id = this.knowForm.course_id

      this.formValidate.question_stem = stemAll.filter(item => item)
      if (Array.isArray(this.formValidate.plate_id)) this.formValidate.plate_id = this.formValidate.plate_id.join(',')

      this.$refs[name].validate((valid) => {
        if (this.formValidate.question_type === 1) {
          if (valid) {
            console.log(this.formValidate)
            addQuestion(this.formValidate).then(res => {
              if (res.data.code === 200) {
              // this.data3 = res.data.data
                this.$Message.success('添加成功，请注意查看')
                this.formValidate.plate_id = []

                this.$router.push({ name: 'Question_list' })
              } else if (res.data.code === 405) {
                this.$Message.error('添加失败，请注意检查填写格式')
                this.formValidate.plate_id = this.formValidate.plate_id.split(',')
              }
            })
          } else {
            this.$Message.error('添加失败，请注意检查填写格式')
            this.formValidate.plate_id = this.formValidate.plate_id.split(',')
          }
        } else {
          addQuestion(this.formValidate).then(res => {
            if (res.data.code === 200) {
              // this.data3 = res.data.data
              this.$Message.success('添加成功，请注意查看')
              this.formValidate.plate_id = []

              this.$router.push({ name: 'Question_list' })
            } else if (res.data.code === 405) {
              this.$Message.error('添加失败，请注意检查填写格式')
              this.formValidate.plate_id = this.formValidate.plate_id.split(',')
            }
          })
        }
      })
    },
    getcourse () {
      zhengkeList().then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.formdata = rep.data
        }
      })
    },
    getProMajLists (id) {
      knob2Tree({ course_id: id }).then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.list3 = rep.data
          if (rep.data.length) {
            this.valueList3 = [rep.data[0].value, '']
            this.knowForm.section_id = rep.data[0].value
          }
          this.getknows(this.knowForm)
        }
      })
    },
    getplate () {
      getPlate().then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.Plate = rep.data
        }
      })
    }
  },
  mounted () {
    this.getProMajList()
    this.getplate()
    this.getcourse()
  }
}
</script>

<style lang="less" scoped>
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
