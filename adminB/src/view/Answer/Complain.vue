<template>
  <div>
     <Card>
       <p slot="title">答疑投诉列表</p>
          <Button type="default" shape="circle" icon="md-sync" @click="seachQ"></Button>
         <Divider type="vertical" />
         <Select v-model="cursefrom.answer_type" clearable style="width:150px" placeholder="选择答疑类型">
          <Option v-for="item in Typeid" :value="item.id" :key="item.id">{{ item.value }}</Option>
        </Select>
         <Divider type="vertical" />
        <Select v-model="cursefrom.answer_teacher_id" clearable style="width:150px" placeholder="选择投诉老师">
          <Option v-for="item in teacherID" :value="item.id" :key="item.id">{{ item.truename }}</Option>
        </Select>
         <Divider type="vertical" />
        <Select v-model="cursefrom.complain_id" clearable style="width:150px" placeholder="选择投诉类型">
          <Option v-for="item in complain" :value="item.id" :key="item.id">{{ item.complain_name }}</Option>
        </Select>
         <Divider type="vertical" />
        <Select v-model="cursefrom.status" clearable style="width:150px" placeholder="选择是否查阅">
          <Option v-for="item in status" :value="item.id" :key="item.id">{{ item.value }}</Option>
        </Select>
        <Divider type="vertical" />
         <Button type='primary' @click="seach" style="margin-right: 10px;">搜索</Button>
       <Table stripe size="small" :columns="columns" :data="data" style="margin:15px 0"></Table>
        <div style="padding: 20px 0; text-align: right;">
         <Page :total="total" @on-change="onChange" @on-page-size-change="onPageSizeChange" :current="cursefrom.page" :page-size="cursefrom.limit" size="small" show-total show-elevator show-sizer />
        </div>
     </Card>
      <Modal v-model="modalS"   :footer-hide="true"  :width="640" mask>
         <Card>
          <p slot="title">添加图片证据</p>
          <ImageN ref="teamlate"/>
          <div style="display:flex;justify-content: center;">
             <Button type='primary' @click="Submint" style="margin-right: 10px;">确认上传</Button>
          </div>
         </Card>
      </Modal>
      <Modal v-model="modal0"  scrollable :footer-hide="true"  :width="640" mask>

      <Tabs type="card">
       <TabPane label="答疑投诉详情" >
         <Row style="margin-top: 20px;">
            <Row style="border: 1px solid #ccc;">
              <Row style="border-bottom: 1px solid #ccc; text-align: center;">
                <Col :span="12" class="box"><strong>投诉情况</strong></Col>
                <Col :span="12" class="box" style="border-left: 1px solid #ccc;"><strong>详情内容</strong></Col>
              </Row>
              <Row style="border-bottom: 1px solid #ccc; text-align: center;">
                <Col :span="12" class="box" style="line-height: 32px;">主键id</Col>
                <Col :span="12" class="box" style="border-left: 1px solid #ccc;">
                  <Input  readonly v-model='Details.id'></Input>
                </Col>
              </Row>
              <Row style="border-bottom: 1px solid #ccc; text-align: center;">
                <Col :span="12" class="box" style="line-height: 32px;">用户id</Col>
                <Col :span="12" class="box" style="border-left: 1px solid #ccc;">
                  <Input  readonly v-model='Details.user_id'></Input>
                </Col>
              </Row>
              <Row style="border-bottom: 1px solid #ccc; text-align: center;">
                <Col :span="12" class="box" style="line-height: 32px;">学员名称</Col>
                <Col :span="12" class="box" style="border-left: 1px solid #ccc;">
                  <Input  readonly v-model='Details.username'></Input>
                </Col>
              </Row>
              <Row style="border-bottom: 1px solid #ccc; text-align: center;">
                <Col :span="12" class="box" style="line-height: 32px;">学员电话</Col>
                <Col :span="12" class="box" style="border-left: 1px solid #ccc;">
                  <Input readonly v-model='Details.mobile' ></Input>
                </Col>
              </Row>
                <Row style="border-bottom: 1px solid #ccc; text-align: center;">
                <Col :span="12" class="box" style="line-height: 32px;">答疑id</Col>
                <Col :span="12" class="box" style="border-left: 1px solid #ccc;">
                  <Input readonly v-model='Details.answer_id' ></Input>
                </Col>
              </Row>
                <Row style="border-bottom: 1px solid #ccc; text-align: center;">
                <Col :span="12" class="box" style="line-height: 32px;">答疑类型</Col>
                <Col :span="12" class="box" style="border-left: 1px solid #ccc;">
                  <Input readonly v-model="Details.answer_type===1?'课程':'题库'"></Input>
                </Col>
              </Row>
              <Row style="border-bottom: 1px solid #ccc; text-align: center;">
                <Col :span="12" class="box" style="line-height: 32px;">投诉内容id</Col>
                <Col :span="12" class="box" style="border-left: 1px solid #ccc;">
                  <Input readonly v-model='Details.complain_id' ></Input>
                </Col>
              </Row>
                <Row style="border-bottom: 1px solid #ccc; text-align: center;">
                <Col :span="12" class="box" style="line-height: 32px;">投诉名称</Col>
                <Col :span="12" class="box" style="border-left: 1px solid #ccc;">
                  <Input readonly v-model='Details.complain_name' ></Input>
                </Col>
              </Row>

               <Row style="border-bottom: 1px solid #ccc; text-align: center;">
                <Col :span="12" class="box" style="line-height: 32px;">投诉内容</Col>
                <Col :span="12" class="box" style="border-left: 1px solid #ccc;">
                  <Input readonly v-model='Details.content' ></Input>
                </Col>
              </Row>
              <Row style="border-bottom: 1px solid #ccc; text-align: center;">
                <Col :span="12" class="box" style="line-height: 32px;">教师名称</Col>
                <Col :span="12" class="box" style="border-left: 1px solid #ccc;">
                  <Input readonly v-model='Details.teacher_name' ></Input>
                </Col>
              </Row>
            </Row>
            <Row style="border-bottom: 1px solid #ccc; text-align: center;">
                <Col :span="12" class="box" style="line-height: 32px;">回复人姓名</Col>
                <Col :span="12" class="box" style="border-left: 1px solid #ccc;">
                  <Input readonly v-model='Details.reply_user_name' ></Input>
                </Col>
              </Row>
               <Row style="border-bottom: 1px solid #ccc; text-align: center;">
                <Col :span="12" class="box" style="line-height: 32px;">创建时间</Col>
                <Col :span="12" class="box" style="border-left: 1px solid #ccc;">
                  <Input readonly v-model='Details.create_time'></Input>
                </Col>
              </Row>
            </Row>
          </Row>
        </TabPane>

      </Tabs>

      </Modal>
  </div>
</template>
<script>
import { complainList, imgRecord, affirmComplain, complainDetails, complainTypeList, getAnswerUser } from '@/api/Answer'
import { mapMutations } from 'vuex'
import ImageN from '../components/video/image'
export default {
  components: {
    ImageN
  },
  data () {
    return {
      modal0: false,

      Typeid: [{ id: 1, value: '课程' }, { id: 2, value: '题库' }],
      status: [{ id: 1, value: '查阅' }, { id: 2, value: '未查阅' }],
      teacherID: [],
      complain: [],
      modalS: false,
      imupdata: {
        id: '',
        img_record: ''
      },
      Details: [],
      title: '添加追问时间',
      columns: [
        {
          title: 'ID',
          key: 'id',
          minWidth: 50,
          tooltip: true
        },

        {
          title: '学员电话',
          key: 'mobile',
          minWidth: 90,
          tooltip: true,
          align: 'center'
        },
        {
          title: '投诉确认',
          key: 'is_affirm',
          minWidth: 100,
          tooltip: true,
          align: 'center',
          render: (h, params) => {
            let text = ''
            let color = ''
            if (params.row.is_affirm === 1) {
              text = '确认投诉'
              color = '#019beb'
            } else if (params.row.is_affirm === 2) {
              text = '否认投诉'
              color = 'red'
            } else {
              text = '待审核'
              color = '#222'
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
          title: '答疑类型',
          key: 'answer_type',
          minWidth: 90,
          tooltip: true,
          render: (h, params) => {
            let text = ''
            let color = ''
            if (params.row.answer_type === 1) {
              text = '课程'
              color = '#019beb'
            } else {
              text = '题库'
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
          title: '投诉名称',
          key: 'complain_name',
          minWidth: 90,
          tooltip: true,
          align: 'center'
        },
        {
          title: '投诉内容',
          key: 'content',
          minWidth: 100,
          tooltip: true,
          align: 'center'
        },
        {
          title: '教师名称',
          key: 'teacher_name',
          minWidth: 90,
          tooltip: true,
          align: 'center'
        },

        {
          title: '是否查阅',
          key: 'status',
          minWidth: 90,
          tooltip: true,
          render: (h, params) => {
            let text = ''
            let color = ''
            if (params.row.status === 1) {
              text = '查阅'
              color = '#019beb'
            } else {
              text = '未查阅'
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
          minWidth: 380,
          align: 'center',
          render: (h, params) => {
            let disable1 = false
            let disable2 = false
            if (params.row.is_affirm === 1) {
              disable1 = true
              disable2 = true
            } else if (params.row.is_affirm === 2) {
              disable1 = true
              disable2 = true
            }
            return h('div', [
              h('Button', {
                props: {
                  type: 'success',
                  size: 'small',
                  disabled: disable1
                },
                style: {
                  marginRight: '10px'
                },
                on: {
                  click: () => {
                    this.sure(params.row)
                  }
                }
              }, '确认投诉'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small',
                  disabled: disable2
                },
                style: {
                  marginRight: '10px'
                },
                on: {
                  click: () => {
                    this.but(params.row)
                  }
                }
              }, '否认投诉'),
              h('Button', {
                props: {
                  type: 'warning',
                  size: 'small'

                },
                style: {
                  marginRight: '10px'
                },
                on: {
                  click: () => {
                    this.putAnswer(params.row)
                  }
                }
              }, '修改'),
              h('Button', {
                props: {
                  type: 'info',
                  size: 'small'

                },
                style: {
                  marginRight: '10px'
                },
                on: {
                  click: () => {
                    this.lookmove(params.row)
                  }
                }
              }, '详情'),
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'

                },
                style: {
                  marginRight: '10px'
                },
                on: {
                  click: () => {
                    this.updata(params.row)
                  }
                }
              }, '证据记录')
            ])
          }
        }
      ],
      data: [],
      Auth: [],
      total: 1,
      cursefrom: {
        page: 1,
        limit: 10,
        answer_type: '',
        answer_teacher_id: '',
        status: '',
        complain_id: ''
      }

    }
  },
  methods: {
    ...mapMutations([
      'addTag'
    ]),
    onChange (val) {
      this.cursefrom.page = val
      this.getData(this.cursefrom)
    },
    onPageSizeChange (val) {
      this.cursefrom.limit = val
      this.getData(this.cursefrom)
    },
    putAnswer (row) {
      const route = {
        name: 'putCAnwer',
        meta: {
          title: `${row.answer_id}-课程答疑修改`
        },
        query: {
          id: row.answer_id
        }
      }
      this.addTag({
        route: route,
        type: 'push'
      })
      const Aroute = {
        name: 'putQuanter',
        meta: {
          title: `${row.answer_id}-题库答疑修改`
        },
        query: {
          id: row.answer_id
        }
      }
      this.addTag({
        route: Aroute,
        type: 'push'
      })
      if (row.answer_type === 2) {
        this.$router.push(Aroute)
      } else {
        this.$router.push(route)
      }
    },
    getData (obj) {
      complainList(obj).then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.data = rep.data.data
          this.total = rep.data.total
        }
      })
    },
    getcomplain () {
      complainTypeList().then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.complain = rep.data
        }
      })
    },
    sure (row) {
      affirmComplain({ id: row.id, is_affirm: 1, answer_type: row.answer_type, answer_id: row.answer_id }).then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.$Message.success('已确认投诉问题，转交老师投诉')
          this.getData(this.cursefrom)
        }
      })
    },
    but (row) {
      affirmComplain({ id: row.id, is_affirm: 2, answer_type: row.answer_type, answer_id: row.answer_id }).then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.$Message.error('已取消投诉问题，本条投诉作废')
          this.getData(this.cursefrom)
        }
      })
    },
    updata (row) {
      this.modalS = true
      this.imupdata.img_record = row.img_record
      this.$refs.teamlate.uploadList3[0].url = row.img_record
      this.imupdata.id = row.id
    },
    // 上传图片证据
    Submint () {
      this.imupdata.img_record = this.$refs.teamlate.imageUrl
      imgRecord({ id: this.imupdata.id, img_record: this.imupdata.img_record }).then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.$Message.success('已上传成功，请留意图片内容')
          this.modalS = false
        }
      })
    },
    getAnswerUser () {
      getAnswerUser().then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.teacherID = rep.data
        }
      })
    },
    getComplains (id) {
      complainDetails({ id: id }).then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.Details = rep.data
        }
      })
    },
    lookmove (row) {
      this.getComplains(row.id)
      this.modal0 = true
    },
    seach () {
      this.getData(this.cursefrom)
    },
    seachQ () {
      this.cursefrom.page = 1
      this.cursefrom.limit = 10
      this.cursefrom.answer_type = ''
      this.cursefrom.answer_teacher_id = ''
      this.cursefrom.status = ''
      this.cursefrom.complain_id = ''
      this.getData(this.cursefrom)
    }
  },
  mounted () {
    this.getData(this.cursefrom)
    this.getcomplain()
    this.getAnswerUser()
  }
}
</script>
