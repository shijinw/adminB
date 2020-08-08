<template>
  <div>
 <Card>
      <p slot="title">0元体验学习计划列表</p>
      <div style="margin-bottom:20px">
       <Button type="default" shape="circle" icon="md-sync" @click="seachQ"></Button>
        <Divider type="vertical" />
             <Input v-model="formlate.name" placeholder="输入计划名称" style="width: 120px" />
            <Divider type="vertical" />
          <Select v-model="formlate.status" clearable style="width:120px" placeholder="选择是否有效">
          <Option v-for="item in formatFile" :value="item.id" :key="item.id">{{ item.name }}</Option>
        </Select>
        <Divider type="vertical" />
                      <Button type='primary' @click="seach" style="margin-left: 10px">搜 索</Button>
              <Button type='primary' @click="addTags" style="margin-left: 10px">添加学习计划</Button>
      </div>
      <Table size="small" :columns="columns" :data="data"></Table>
<div style="padding: 20px 0; text-align: right;">
        <Page :total="total" @on-change="onChange" @on-page-size-change="onPageSizeChange" :current="formlate.page" :page-size="formlate.limit" size="small" show-total show-elevator show-sizer />
      </div>
    </Card>
   <Modal v-model="modal2"  scrollable title="添加学习计划" :width="600" :footer-hide="true">
     <div>
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                   <FormItem label="绑定课程" prop="course_id" :label-width="100">
                    <Select v-model="formValidate.course_id" clearable placeholder="难易度">
                         <Option v-for="item in grade" :value="item.id" :key="item.id">{{ item.name }}</Option>
                      </Select>
                      </FormItem>
                      <FormItem label="计划名" prop="name" :label-width="100">
                                   <Input v-model="formValidate.name" placeholder="输入计划名称"  />
                       </FormItem>
                       <FormItem label="计划天数" prop="days" :label-width="100">
                                   <Input type="number" v-model="formValidate.days" placeholder="输入计划天数"  />
                       </FormItem>
      </Form>
         <div style="text-align: center;">
            <Button type="success" @click="handleSubmit" style="width:120px;height:45px;margin-right: 100px">提 交</Button>
          </div>
      </div>
    </Modal>
      <Modal v-model="modal3"  scrollable title="修改学习计划" :width="600" :footer-hide="true">
     <div>
      <Form ref="formCalidate" :model="formCalidate" :rules="ruleValidate" :label-width="80">
                      <FormItem label="计划名" prop="name" :label-width="100">
                                   <Input v-model="formCalidate.name" placeholder="输入计划名称"  />
                       </FormItem>

      </Form>
         <div style="text-align: center;">
            <Button type="success" @click="handleSubmit2" style="width:120px;height:45px;margin-right: 100px">提 交</Button>
          </div>
      </div>
    </Modal>
    <Modal v-model="modal4"  mask title="选择日程" :width="1100" :footer-hide="true">
     <div>
       <Form ref="formDalidate" :model="formDalidate" :rules="ruleValidate" :label-width="80">
          <Row>
                  <Col :span="6">
                    <FormItem label="日程表" prop="days" :label-width="100">
           <Select v-model="formDalidate.days" clearable placeholder="选择天数" style="width:200px">
                         <Option v-for="item in Days" :value="item.id" :key="item.id">{{ item.name }}</Option>
                      </Select>
            <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：选择当前天数</p>
             </FormItem>
                       </Col>
          <Col :span="6">
          <FormItem label="是否休息" prop="name" :label-width="100">
              <RadioGroup v-model="formDalidate.name" style="margin-left:10px">
                <Radio :label="2">休息</Radio>
                <Radio :label="1">正常</Radio>
              </RadioGroup>
                  <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：选择是否为休息日</p>
                    </FormItem>
        </Col>
   <Col :span="6">
         <Button v-if="formDalidate.name===2?false:true"  type="info" @click="Addvideo" style="width:120px;height:45px;">关联视频</Button>

        </Col>
               </Row>
      </Form>
            <Table v-if="formDalidate.name===2?false:true" size="small" :columns="columns2" :data="Zvideo"></Table>
            <p v-if="formDalidate.name===2?true:false" style="text-align:center">当前为休息日，没有学习计划</p>
       <div style="text-align: center;">
            <Button type="success" @click="handleSubmit3" style="width:120px;height:45px;margin: 28px">提 交</Button>
          </div>
      </div>
    </Modal>
    <!-- 添加  -->
    <Modal v-model="Videomodal" mask title="关联视频" :width="800" :footer-hide="true">
        <div>
         <Divider type="vertical" />
              <Select v-model="formDalidate.section_id" clearable placeholder="输入章节id" style="width:120px">
                         <Option v-for="item in Sentions" :value="item.section_id" :key="item.section_id">{{ item.section_name }}</Option>
                      </Select>
                <Divider type="vertical" />
             <Input v-model="formDalidate.video_name" placeholder="输入视频名称" style="width: 120px" />
             <Divider type="vertical" />
                      <Button type='primary' @click="seachVideo" style="margin-left: 10px">搜 索</Button>
                <Table size="small" :columns="VideoColumns" :data="Videolist" @on-selection-change="selectionStu" @on-select-cancel="selectionCancel" style="margin-top:15px"></Table>
      <div style="padding: 20px 0; text-align: right;">
        <Page :total="Vtotal" @on-change="VonChange" @on-page-size-change="VonPageSizeChange" :current="formDalidate.page" :page-size="formDalidate.limit" size="small" show-total show-elevator show-sizer />
      </div>

        </div>
      </Modal>
  </div>
</template>
<script>
import { addExperPlan, planExperList, putExperPlan, delExperVideo, delExperPlan, statusPlanExper, planExperCouList, getVideoList, addExperDetil } from '@/api/studyplan'
import { zhengkeList } from '@/api/student'
import { getSection } from '@/api/course'
import { mapMutations } from 'vuex'
import { setNumber } from '@/libs/util'
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
      Submit3: {},
      Days: [],
      grade: [],
      lists: [],
      formValidate: {
        course_id: '',
        days: '',
        name: '',
        valueList: []
      },
      formCalidate: {
        course_id: '',
        days: '',
        name: '',
        id: ''
      },
      formDalidate: {
        limit: 10,
        page: 1,
        days: 1,
        name: 2,
        is_source: 2,
        plan_id: '',
        course_id: '',
        section_id: '',
        video_name: ''
      },
      modal2: false,
      modal3: false,
      modal4: false,
      Sentions: [],
      Videolist: [],
      Sele_id: [],
      Videomodal: false,
      Zvideo: [],
      total: 1,
      Vtotal: 1,
      ruleValidate: {
        name: [{ required: true, message: '请输入学习计划名' }],
        days: [{ required: true, message: '请输入学习计划天数' }],
        course_id: [{ required: true, message: '请选择正课' }]
      },
      formatFile: [
        { id: 1, name: '有效' },
        { id: 2, name: '无效' }
      ],
      columns2: [
        {
          title: '视频ID',
          key: 'id',
          minWidth: 80,
          align: 'center'
        },
        {
          title: '视频名称',
          key: 'video_name',
          minWidth: 150,
          align: 'center',
          tooltip: true
        },

        {
          title: '视频时长',
          key: 'video_time',
          minWidth: 150,
          align: 'center',
          tooltip: true
        },
        {
          title: '操作',
          key: 'action',
          minWidth: 280,
          align: 'center',
          render: (h, params) => {
            return h('div', [

              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.removeVideo(params.row)
                  }
                }
              }, '取消关联')
            ])
          }
        }
      ],
      VideoColumns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '视频ID',
          key: 'video_id',
          minWidth: 80,
          align: 'center'
        },
        {
          title: '视频名称',
          key: 'video_name',
          minWidth: 150,
          align: 'center',
          tooltip: true
        },

        {
          title: '课程名称',
          key: 'course_name',
          minWidth: 150,
          align: 'center',
          tooltip: true
        },
        {
          title: '章节名称',
          key: 'section_name',
          minWidth: 150,
          align: 'center',
          tooltip: true
        },
        {
          title: '视频时长',
          key: 'video_time',
          minWidth: 150,
          align: 'center',
          tooltip: true
        }
      ],
      columns: [
        {
          title: '0元体验计划ID',
          key: 'id',
          minWidth: 120,
          align: 'center'
        },
        {
          title: '计划名称',
          key: 'name',
          minWidth: 150,
          align: 'center',
          tooltip: true
        },
        {
          title: '计划时间',
          key: 'days',
          minWidth: 100,
          align: 'center',
          tooltip: true
        },
        {
          title: '课程名称',
          key: 'course_name',
          minWidth: 200,
          align: 'center',
          tooltip: true
        },

        {
          title: '添加时间',
          key: 'create_time',
          minWidth: 150,
          align: 'center',
          tooltip: true
        },
        {
          title: '状态',
          key: 'status',
          minWidth: 80,
          align: 'center',
          tooltip: true,
          render: (h, params) => {
            let text = ''
            let color = ''
            if (params.row.status === 1) {
              text = '有效'
              color = '#019beb'
            } else {
              text = '无效'
              color = 'red'
            }
            return h('div', [
              h(
                'span',
                {
                  style: {
                    color: color
                  }
                },
                text
              )
            ])
          }
        },

        {
          title: '操作',
          key: 'action',
          minWidth: 280,
          align: 'center',
          render: (h, params) => {
            let texts = ''
            if (params.row.status == 2) {
              texts = '上架'
            } else if (params.row.status == 1) {
              texts = '下架'
            }

            return h('div', [
              h(
                'Button',
                {
                  props: {
                    type: 'success',
                    size: 'small'

                  },
                  style: {
                    marginRight: '5px'

                  },
                  on: {
                    click: () => {
                      this.putaway(params.row)
                    }
                  }
                },
                texts
              ),
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
                  type: 'warning',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.calendar(params.row)
                  }
                }
              }, '日程管理'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
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
    },
    'formDalidate.days' (newValue, oldValue) {
      this.getvideo(this.Submit3.id)
    },
    'formDalidate.name' (newValue, oldValue) {
      this.Sele_id = []
    }

  },
  methods: {
    ...mapMutations(['addTag', 'setcourse']),
    seachQ () {
      this.formlate.course_id = ''
      this.formlate.name = ''
      this.formlate.days = ''
    },
    setDays (days) {
      for (let i = 1; i <= days; i++) {
        let Day = setNumber(i)
        let obj = {
          id: i,
          name: `第${Day}天`
        }
        this.Days.push(obj)
      }
    },
    removeVideo (row) {
      delExperVideo({ plan_id: this.formDalidate.plan_id, days: this.formDalidate.days, video_id: row.id }).then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.getvideo(this.formDalidate.plan_id)
          this.$Message.success('您已选择取消视频关联')
        }
      })
    },
    seach () {
      this.getData(this.formlate)
    },
    onChange (val) {
      this.formlate.page = val
      this.getData(this.formlate)
    },
    onPageSizeChange () {
      this.formlate.limit = val
      this.getData(this.formlate)
    },
    VonChange (val) {
      this.formDalidate.page = val
      this.getWvideo(this.formDalidate)
    },
    VonPageSizeChange () {
      this.formDalidate.limit = val
      this.getWvideo(this.formDalidate)
    },
    selectionStu (arr) {
      let list = arr.map(item => item.video_id)
      if (list.length > 0) {
        list.forEach(v => {
          this.Sele_id.push(v)
        })
      }
      this.Sele_id = Array.from(new Set(this.Sele_id))
    },
    selectionCancel (arr, row) {
      this.Sele_id.splice(this.Sele_id.findIndex(v => v === row.id), 1)
    },
    getSention (id) {
      getSection({ course_id: id }).then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.Sentions = rep.data
        }
      })
    },
    addTags () {
      this.$refs.formValidate.resetFields()
      this.modal2 = true
    },
    Addvideo () {
      this.getSention(this.formDalidate.course_id)
      this.getWvideo(this.formDalidate)
      this.Videomodal = true
    },
    put (row) {
      this.modal3 = true
      this.formCalidate.name = row.name
      this.formCalidate.days = row.days
      this.formCalidate.course_id = row.course_id
      this.formCalidate.id = row.id
    },
    remove (row) {
      delExperPlan({ id: row.id }).then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.$Message.warning('删除计划成功，请注意查看')
          this.getData(this.formlate)
        }
      })
    },
    seachVideo () {
      this.getWvideo(this.formDalidate)
    },
    handleSubmit3 () {
      if (this.formDalidate.name === 2) {
        addExperDetil({
          course_id: this.formDalidate.course_id,
          video_id: this.Sele_id.join(','),
          plan_id: this.formDalidate.plan_id,
          days: this.formDalidate.days,
          is_rest: this.formDalidate.name
        }).then(res => {
          let rep = res.data
          if (rep.code === 200) {
            this.$Message.warning('您选择今日休息，请选择其他日期')
            this.getvideo(this.formDalidate.plan_id)
          }
        })
      } else {
        if (this.Sele_id.length) {
          addExperDetil({
            course_id: this.formDalidate.course_id,
            video_id: this.Sele_id.join(','),
            plan_id: this.formDalidate.plan_id,
            days: this.formDalidate.days,
            is_rest: this.formDalidate.name
          }).then(res => {
            let rep = res.data
            if (rep.code === 200) {
              this.$Message.success('添加视频成功，请注意查看')
              this.getvideo(this.formDalidate.plan_id)
            }
          })
        } else {
          this.$Message.error('未添加视频，请注意查看')
        }
      }
    },
    handleSubmit () {
      this.$refs.formValidate.validate((valid) => {
        addExperPlan(this.formValidate).then(res => {
          let rep = res.data
          if (rep.code === 200) {
            this.modal2 = false
            this.$Message.success('添加成功，请注意查看')
            this.getData(this.formlate)
          }
        })
      })
    },

    calendar (row) {
      this.Submit3 = row
      this.Days = []
      this.formDalidate.days = 1
      this.formDalidate.course_id = row.course_id
      this.formDalidate.plan_id = row.id
      this.setDays(row.days)
      this.getvideo(row.id)
      this.modal4 = true
    },
    putaway (row) {
      statusPlanExper({ id: row.id, status: row.status === 1 ? '2' : '1' }).then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.getData(this.formlate)
        }
      })
    },
    handleSubmit2 () {
      putExperPlan(this.formCalidate).then(res => {
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
    getWvideo (obj) {
      getVideoList(obj).then(res => {
        let rep = res.data
        if (rep.code === 200) {
          let arr = rep.data.data
          arr.forEach(val => {
            if (this.Sele_id.length > 0) {
              this.Sele_id.forEach(key => {
                if (key === val.video_id) {
                  val._checked = true
                }
              })
            }
          })

          this.Videolist = arr
          this.Vtotal = rep.data.total
        }
      })
    },
    getvideo (id) {
      planExperCouList({ plan_id: id, days: this.formDalidate.days }).then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.Zvideo = rep.data.data
          rep.data.plan_info ? this.formDalidate.name = rep.data.plan_info.is_rest : this.formDalidate.name = 1
        }
      })
    },
    getData (obj) {
      planExperList(obj).then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.data = rep.data.data
          this.total = rep.data.total
        }
      })
    }
  },
  mounted () {
    this.getData(this.formlate)
    this.getZhen()
  }
}
</script>
