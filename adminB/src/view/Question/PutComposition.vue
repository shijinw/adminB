<template>
  <div>
    <Card style="width: 1000px;">
      <p slot="title">添加题库</p>
      <Form ref="formValidate"
            :model="formValidate"
            :rules="ruleValidate"
            :label-width="80">
        <Row>
          <Col :span="12">
          <FormItem label="绑定课程"
                    prop="project_id"
                    style="margin-left:10px">
            <Cascader :data="list"
                      v-model="valueList"
                      change-on-select
                      placeholder="项目/专业/课程"></Cascader>
            <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：选择项目/专业/课程</p>
          </FormItem>
          </Col>

          <Col :span="12">
          <FormItem label="模考名称"
                    prop="mock_name"
                    style="margin-left:10px">
            <Input v-model="formValidate.mock_name"
                   placeholder="输入试卷名称"
                   style="width: 100%" />

            <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：选择试卷名称</p>
          </FormItem>

          </Col>
        </Row>
        <Row>

          <Col :span="12">
          <FormItem label="答题时间"
                    prop="answer_time"
                    style="margin-left:10px">
            <Input v-model="formValidate.answer_time"
                   placeholder="输入限制答题时间1-240"
                   style="width: 100%" />

            <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：题限制答题时间</p>
          </FormItem>
          </Col>
          <Col :span="12">
          <FormItem label="试卷总分"
                    prop="mock_score">
            <Input v-model="formValidate.mock_score"
                   placeholder="输入试卷总分"
                   style="width: 100%" />

            <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：输入试卷总分</p>
          </FormItem>

          </Col>
        </Row>
        <Row>

          <Col :span="12">
          <FormItem label="类型"
                    prop="mock_type">
            <Select v-model="formValidate.mock_type"
                    clearable
                    placeholder="类型">
              <Option v-for="item in formatFile"
                      :value="item.id"
                      :key="item.id">{{ item.name }}</Option>
            </Select>
            <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：选择类型</p>
          </FormItem>
          </Col>
          <Col :span="12">
          <FormItem label="难易度"
                    prop="difficulty">
            <Select v-model="formValidate.difficulty"
                    clearable
                    placeholder="类型"
                    style="width:405px">
              <Option v-for="item in grade"
                      :value="item.name"
                      :key="item.id">{{ item.name }}</Option>
            </Select>
            <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：选择难易度</p>
          </FormItem>
          </Col>
        </Row>

        <Row>
          <Col :span="12">
          <FormItem label="题目数量"
                    prop="question_num"
                    style="margin-left:10px">
            <Input v-model="formValidate.question_num"
                   placeholder="输入题目数量"
                   style="width: 100%" />

            <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：输入单选题数量,最多1-50道</p>
          </FormItem>
          </Col>
          <Col :span="12">
          <FormItem label="每题分值"
                    prop="question_score"
                    style="margin-left:20px">
            <Input v-model="formValidate.question_score"
                   placeholder="输入每题分值1-100"
                   style="width: 100%" />

            <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：输入每题分值最大100</p>
          </FormItem>

          </Col>
        </Row>
        <Row>
          <FormItem label="试卷描述"
                    prop="description"
                    style="margin-left:10px">

            <Input v-model="formValidate.description"
                   :rows="6"
                   type="textarea"
                   placeholder="输入详细的试卷描述"
                   style="width: 100%" />

          </FormItem>
        </Row>

        <FormItem>
          <div style="text-align: center;">
            <Button @click="resets('formValidate')"
                    style="margin-left: 8px;width:110px;height:40px">重置</Button>
            <Button type="primary"
                    @click="handleSubmit"
                    style="margin-left: 8px;width:110px;height:40px">提 交</Button>
          </div>
        </FormItem>
      </Form>
    </Card>

  </div>

</template>

<script>
import { zkProMjorCou3tree } from '@/api/Linkmenu';
import { mapMutations } from 'vuex';
import { zhengkeList } from '@/api/student';
import { getPlate, getMock, putPaperMock } from '@/api/question';
import Fomat from '@/libs/fomat';

export default {
  data() {
    return {
      data3: [],
      formatFile: [
        {
          id: 1,
          name: '单选 '
        },
        {
          id: 2,
          name: '论述题'
        }
      ],
      grade: [
        {
          id: 1,
          name: 'A'
        },
        {
          id: 2,
          name: 'B'
        },
        {
          id: 3,
          name: 'C'
        }
      ],

      Tagslists: [],

      tagsList: [
        {
          id: 1,
          name: '固定日期关课'
        },
        {
          id: 2,
          name: '按照学习天数关课'
        }
      ],

      list: [],
      formdata: [],
      valueList: [],

      formValidate: {
        project_id: '',
        mock_id: '',
        major_id: '',
        mock_type: '',
        mock_name: '',
        answer_time: '',
        mock_score: '',
        question_score: '',
        question_num: '',
        description: '',
        course_id: '',
        difficulty: ''
      },

      ruleValidate: {
        name: [
          {
            required: true,
            validator: Fomat.Rules.Verifiy().Required,
            trigger: 'blur'
          }
        ],
        mock_type: [
          {
            required: true,
            validator: Fomat.Rules.Verifiy().Required,
            trigger: 'change'
          }
        ],
        course_id: [
          { required: true, validator: Fomat.Rules.Verifiy().Required }
        ],
        project_id: [
          {
            required: true,
            validator: Fomat.Rules.Verifiy().Required,
            trigger: 'change'
          }
        ],
        difficulty: [
          {
            required: true,
            validator: Fomat.Rules.Verifiy().Required,
            trigger: 'change'
          }
        ],

        mock_name: [
          {
            required: true,
            validator: Fomat.Rules.Verifiy().SRequired,
            trigger: 'change'
          }
        ],
        answer_time: [{ required: true, validator: Fomat.Rules.Verifiy().num }],
        mock_score: [
          { required: true, validator: Fomat.Rules.Verifiy().Required }
        ],

        plate_id: [
          { required: true, validator: Fomat.Rules.Verifiy().Required }
        ],
        question_score: [
          { required: true, validator: Fomat.Rules.Verifiy().Qnum }
        ],
        question_num: [
          {
            required: true,
            validator: Fomat.Rules.Verifiy().five
          }
        ],

        description: [
          {
            required: true,
            validator: Fomat.Rules.Verifiy().Required,
            trigger: 'change'
          }
        ]
      }
    }
  },

  watch: {
    valueList(newValue, oldValue) {
      if (newValue.length === 0) {
        this.formValidate.project_id = '';
        this.formValidate.major_id = '';
        this.formValidate.course_id = '';
      } else if (newValue.length === 1) {
        this.formValidate.project_id = newValue[0]
        this.formValidate.major_id = '';
        this.formValidate.course_id = '';
      } else if (newValue.length === 2) {
        this.formValidate.project_id = newValue[0]
        this.formValidate.major_id = newValue[1]
        this.formValidate.course_id = '';
      } else {
        this.formValidate.project_id = newValue[0]
        this.formValidate.major_id = newValue[1]
        this.formValidate.course_id = newValue[2]
      }
    }
  },
  methods: {
    ...mapMutations(['addTag', 'closeTag']),
    getProMajList() {
      zkProMjorCou3tree().then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.list = rep.data
        }
      })
    },
    resets(name) {
      this.valueList = []
      this.$refs[name].resetFields()
    },
    handleSubmit() {
      this.formValidate.mock_id = this.$route.query.id
      putPaperMock(this.formValidate).then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.$Message.success('添加成功，请注意查看')
          this.$router.push({ name: 'composition_list' })
        } else if (res.data.code === 405) {
          this.$Message.error('添加失败，请注意检查填写格式')
        }
      })
    },
    getmock() {
      getMock({ mock_id: this.$route.query.id }).then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.valueList = [
            rep.data.project_id,
            rep.data.major_id,
            rep.data.course_id
          ]
          this.formValidate.project_id = rep.data.project_id
          this.formValidate.major_id = rep.data.major_id
          this.formValidate.mock_name = rep.data.mock_name
          this.formValidate.course_id = rep.data.course_id
          this.formValidate.answer_time = rep.data.answer_time
          this.formValidate.mock_score = rep.data.mock_score
          this.formValidate.mock_type = rep.data.mock_type
          this.formValidate.question_num = rep.data.question_num
          this.formValidate.question_score = rep.data.question_score
          this.formValidate.description = rep.data.description
          this.formValidate.course_id = rep.data.course_id
          this.formValidate.difficulty = rep.data.difficulty
        }
      })
    },
    getcourse() {
      zhengkeList().then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.formdata = rep.data
        }
      })
    },
    getplate() {
      getPlate().then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.Tagslists = rep.data
        }
      })
    }
  },
  mounted() {
    this.getProMajList()
    this.getplate()
    this.getcourse()
    this.getmock()
  }
}
</script>

<style lang="less" scoped>
</style>
