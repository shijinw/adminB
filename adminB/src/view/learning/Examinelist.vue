<template>
  <div>
 <Card>
      <p slot="title">考期列表</p>
      <div style="margin-bottom:20px">
              <Button type='primary' @click="addTag" style="margin-left: 10px">添加考期</Button>
      </div>
      <Table size="small" :columns="columns" :data="data"></Table>

    </Card>
   <Modal v-model="modal2"  scrollable title="添加考试时间" :width="600" :footer-hide="true">
     <div>
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                   <FormItem label="选择课程" prop="course_id" :label-width="100">
                    <Select v-model="formValidate.course_id" clearable placeholder="课程名">
                         <Option v-for="item in grade" :value="item.id" :key="item.id">{{ item.name }}</Option>
                      </Select>
                      </FormItem>
                      <FormItem label="考期名" prop="name" :label-width="100">
                                   <Input v-model="formValidate.name" placeholder="输入考期名称"  />
                       </FormItem>
                       <FormItem label="考试时间" prop="test_time" :label-width="100">
                         <DatePicker type="date" show-week-numbers v-model="formValidate.test_time" @on-change="onChange" placeholder="考试时间" style="width: 200px"></DatePicker>
                       </FormItem>
      </Form>
         <div style="text-align: center;">
            <Button type="success" @click="handleSubmit" style="width:120px;height:45px;margin-right: 100px">提 交</Button>
          </div>
      </div>
    </Modal>
      <Modal v-model="modal3"  scrollable title="修改考试时间" :width="600" :footer-hide="true">
     <div>
      <Form ref="formCalidate" :model="formCalidate" :rules="ruleValidate" :label-width="80">
                      <FormItem label="计划名" prop="name" :label-width="100">
                                   <Input v-model="formCalidate.name" placeholder="输入计划名称"  />
                       </FormItem>
                       <FormItem label="考试时间" prop="test_time" :label-width="100">
                         <DatePicker type="date" show-week-numbers v-model="formCalidate.test_time" @on-change="PonChange" placeholder="考试时间" style="width: 200px"></DatePicker>
                       </FormItem>
      </Form>
         <div style="text-align: center;">
            <Button type="success" @click="handleSubmit2" style="width:120px;height:45px;margin-right: 100px">提 交</Button>
          </div>
      </div>
    </Modal>
  </div>
</template>
<script>
import { addTestTime, testTimeList, putTestTime, delTestTime } from '@/api/studyplan'
import { zkProMjorCou3tree } from '@/api/Linkmenu'
import { zhengkeList } from '@/api/student'

import Fomat from '@/libs/fomat'
export default {
  data () {
    return {
      formlate: {
        limit: 10,
        page: 1,
        course_id: '',
        name: '',
        status: ''
      },
      grade: [],
      lists: [],
      formValidate: {
        course_id: '',
        test_time: '',
        name: ''

      },
      formCalidate: {
        course_id: '',
        days: '',
        name: '',
        id: ''
      },
      modal2: false,
      modal3: false,
      total: '',
      ruleValidate: {
        name: [{ required: true, message: '请输入考期名' }],
        test_time: [{ required: true, message: '请输入考期时间' }],
        course_id: [{ required: true, message: '请选择正课' }]
      },
      formatFile: [
        { id: 1, name: '有效' },
        { id: 2, name: '无效' }
      ],
      columns: [
        {
          title: '考期ID',
          key: 'id',
          minWidth: 80,
          align: 'center'
        },
        {
          title: '考期名称',
          key: 'name',
          minWidth: 150,
          align: 'center',
          tooltip: true
        },
        {
          title: '考期时间',
          key: 'test_time',
          minWidth: 100,
          align: 'center'
        },
        {
          title: '课程名称',
          key: 'course_name',
          minWidth: 200,
          align: 'center',
          tooltip: true
        },

        {
          title: '操作',
          key: 'action',
          minWidth: 200,
          align: 'center',
          render: (h, params) => {
            return h('div', [

              h('Button', {
                props: {
                  type: 'info',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.put(params.row)
                  }
                }
              }, '修改'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.remove(params.row)
                  }
                }
              }, '删除')

            ])
          }
        }
      ],
      data: []
    }
  },
  watch: {
    'formValidate.valueList' (newValue, oldValue) {
      if (newValue.length === 3) {
        this.formValidate.course_id = newValue[2]
      }
    }
  },
  methods: {
    seachQ () {
      this.formlate.course_id = ''
      this.formlate.name = ''
      this.formlate.days = ''
    },
    seach () {
      this.getData(this.formlate)
    },
    addTag () {
      this.$refs.formValidate.resetFields()
      this.formValidate.test_time = ''
      this.modal2 = true
    },
    onChange (val) {
      this.formValidate.test_time = val
    },
    PonChange (val) {
      this.formCalidate.test_time = val
    },
    put (row) {
      this.modal3 = true
      this.formCalidate.name = row.name
      this.formCalidate.test_time = row.test_time
      this.formCalidate.course_id = row.course_id
      this.formCalidate.id = row.id
    },
    remove (row) {
      delTestTime({ id: row.id }).then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.$Message.success('删除成功，请注意查看')
          this.getData(this.formlate)
        }
      })
    },
    handleSubmit () {
      this.$refs.formValidate.validate((valid) => {
        addTestTime(this.formValidate).then(res => {
          let rep = res.data
          if (rep.code === 200) {
            this.modal2 = false
            this.$Message.success('添加成功，请注意查看')
            this.getData(this.formlate)
          }
        })
      })
    },

    handleSubmit2 () {
      putTestTime(this.formCalidate).then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.modal3 = false
          this.$Message.success('修改成功，请注意查看')
          this.getData(this.formlate)
        }
      })
    },
    getZhen () {
      zhengkeList().then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.grade = rep.data
        }
      })
    },
    getProMajList () {
      zkProMjorCou3tree().then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.lists = rep.data
        }
      })
    },
    getData () {
      testTimeList().then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.data = rep.data
        }
      })
    }
  },
  mounted () {
    this.getProMajList()
    this.getData(this.formlate)
    this.getZhen()
  }
}
</script>
