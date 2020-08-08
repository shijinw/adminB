<template>
  <div>
    <Card>
 <p slot="title">知识点节列表</p>
      <div>
        <Button type="default" shape="circle" icon="md-sync" @click="seach('cursefrom')"></Button>
<Divider type="vertical" />
           <Input v-model="cursefrom.know_section_name" placeholder="知识点节名称" style="width: 200px; margin-right: 10px;" />

<Divider type="vertical" />
       <Button type='primary' @click="addknow" style="margin-right: 10px;">节添加</Button>
        <Button type='primary' @click="seachKnow" style="margin-right: 10px;">筛选</Button>

      </div>
      <Divider />
           <Table stripe size="small" :columns="columns" :data="data" ></Table>
    </Card>
  <!-- 添加  -->
    <Modal v-model="modal" draggable  scrollable :title="title" :width="640" :footer-hide="true">
        <div>
          <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
            <FormItem label="节点名称"  prop="knob_name">
              <Input v-model="formValidate.knob_name" placeholder="知识点节点名"></Input>
              <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：输入知识点节名称</p>
            </FormItem>
            <FormItem>
              <div style="text-align: center;">
                <Button type="primary" @click="handleSubmit1" style="margin-left: 8px">提 交</Button>
              </div>
            </FormItem>
          </Form>
        </div>
      </Modal>
       <!-- 添加  -->
    <Modal v-model="modal2" draggable  scrollable title="添加知识点" :width="640" :footer-hide="true">
        <div>
          <Form ref="couserdata" :model="couserdata" :rules="coursevdata" :label-width="80">
            <FormItem label="知识点名"  prop="know_name">
              <Input v-model="couserdata.know_name" placeholder="知识点点名"></Input>
              <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：输入知识点名称</p>
            </FormItem>
            <FormItem>
              <div style="text-align: center;">
                <Button type="primary" @click="handleSubmit2" style="margin-left: 8px">提 交</Button>
              </div>
            </FormItem>
          </Form>
        </div>
      </Modal>
  </div>

</template>

<script>
import { knobList, putKnob, addKnob, delKnob, addKnow, knobMove } from '@/api/course'

import { mapMutations, mapState } from 'vuex'

export default {

  data () {
    return {
      data: [],
      total: 1,
      modal: false,
      modal2: false,
      title: '',
      valueList: [],
      list: [],
      formValidate: {
        knob_id: '',
        course_id: this.$route.query.course_id,
        knob_name: '',
        section_id: this.$route.query.section_id
      },
      ruleValidate: {
        knob_name: [
          { required: true, message: '请输入知识点节名', trigger: 'blur' }
        ]
      },
      coursevdata: {
        know_name: [
          { required: true, message: '请输入知识点节名', trigger: 'blur' }
        ]
      },
      formatFile: [],
      formatcard: [],
      couserdata: {
        knob_id: '',
        course_id: '',
        section_id: '',
        know_name: '',
        major_id: '',
        project_id: ''
      },
      cursefrom: {
        section_id: this.$route.query.section_id,
        know_section_name: '',
        course_id: this.$route.query.course_id
      },

      Comfrom: {
        course_id: '',
        quiz_source: '',
        reply_status: '',
        mobile: '',
        start_time: '',
        end_time: ''
      },
      columns: [
        {
          title: '知识点节ID',
          key: 'id',
          minWidth: 80,
          tooltip: true,
          align: 'center'
        },
        {
          title: '课程名称',
          key: 'course_name',
          minWidth: 120,
          tooltip: true,
          align: 'center'
        },
        {
          title: '知识点章名称',
          key: 'know_section_name',
          minWidth: 100,
          tooltip: true,
          align: 'center'
        },
        {
          title: '知识点节名称',
          key: 'knob_name',
          minWidth: 100,
          tooltip: true,
          align: 'center'
        },
        {
          title: '创建时间',
          key: 'create_time',
          minWidth: 100,
          tooltip: true,
          align: 'center'
        },
        {
          title: '节操作',
          key: 'action',
          minWidth: 200,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.down(params.row)
                  }
                }
              }, '上移'),
              h('Button', {
                props: {
                  type: 'success',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.up(params.row)
                  }
                }
              }, '下移'),
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
                    this.putbuild(params.row)
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
                    this.removes(params.row)
                  }
                }
              }, '删除')
            ])
          }
        },
        {
          title: '知识点操作',
          minWidth: 100,
          align: 'center',
          render: (h, params) => {
            return h('div', [

              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.addKnows(params.row)
                  }
                }
              }, '知识点添加')

            ])
          }
        }
      ]
    }
  },
  computed: {
    ...mapState(['formData'])
  },
  methods: {
    ...mapMutations(['addTag']),
    seach (name) {
      this.$refs[name].resetFields()
    },
    seachKnow () {
      this.getQdata(this.cursefrom)
    },

    addknow () {
      this.formValidate.knob_name = ''
      this.title = '添加知识点节'
      this.modal = true
    },
    putbuild (row) {
      this.title = '修改知识点节'
      this.formValidate.knob_id = row.id
      this.modal = true
      this.formValidate.knob_name = row.knob_name
    },
    handleSubmit1 () {
      if (this.title === '添加知识点节') {
        addKnob(this.formValidate).then(res => {
          if (res.data.code === 200) {
            this.$Message.success('添加成功!')
            this.getQdata(this.cursefrom)
            this.modal = false
          }
        })
      } else {
        putKnob(this.formValidate).then(res => {
          if (res.data.code === 200) {
            this.$Message.success('修改成功!')
            this.getQdata(this.cursefrom)
            this.modal = false
          }
        })
      }
    },
    handleSubmit2 () {
      addKnow(this.couserdata).then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.$Message.success('知识点添加成功!')
          this.modal2 = false
        }
      })
    },
    addKnows (row) {
      this.couserdata.project_id = this.formData.project_id
      this.couserdata.major_id = this.formData.major_id
      this.couserdata.course_id = this.formData.id
      this.couserdata.section_id = row.section_id
      this.couserdata.knob_id = row.id
      this.couserdata.know_name = ''
      this.modal2 = true
    },
    down (row) {
      knobMove({ id: row.id, move_status: 1, section_id: this.$route.query.section_id }).then(res => {
        if (res.data.code === 200) {
          this.$Message.success('修改成功!')
          this.getQdata(this.cursefrom)
        } else if (res.data.code === 405) {
          this.$Message.error(res.data.msg)
        }
      })
    },
    up (row) {
      knobMove({ id: row.id, move_status: 2, section_id: this.$route.query.section_id }).then(res => {
        if (res.data.code === 200) {
          this.$Message.success('修改成功!')
          this.getQdata(this.cursefrom)
        } else if (res.data.code === 405) {
          this.$Message.error(res.data.msg)
        }
      })
    },
    removes (row) {
      delKnob({ id: row.id }).then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.$Message.success('删除成功!')
          this.getQdata(this.cursefrom)
        }
        if (rep.code === 405) {
          this.$Message.error(rep.msg)
        }
      })
    },

    getQdata (obj) {
      knobList(obj).then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.data = rep.data
        }
      })
    }

  },

  mounted () {
    this.getQdata(this.cursefrom)
  }
}
</script>

<style lang="less" scoped>

</style>
