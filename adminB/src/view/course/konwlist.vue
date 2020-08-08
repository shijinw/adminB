<template>
  <div>
    <Card>
 <p slot="title">知识点章列表</p>
      <div>
        <Button type="default" shape="circle" icon="md-sync" @click="seach('cursefrom')"></Button>
<Divider type="vertical" />
           <Input v-model="cursefrom.know_section_name" placeholder="知识点章名称" style="width: 200px; margin-right: 10px;" />
<Divider type="vertical" />
       <Button type='primary' @click="addknow" style="margin-right: 10px;">章添加</Button>
        <Button type='primary' @click="seachKnow" style="margin-right: 10px;">筛选</Button>

      </div>
      <Divider />
           <Table stripe size="small" :columns="columns" :data="data" ></Table>
    </Card>
  <!-- 添加  -->
    <Modal v-model="modal" draggable  scrollable :title="title" :width="640" :footer-hide="true">
        <div>
          <Form ref="formValidate" :model="formValidate"  :rules="ruleValidate" :label-width="80">
            <FormItem label="章节名称" prop="know_section_name">
              <Input v-model="formValidate.know_section_name" placeholder="知识点章名"></Input>
              <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：输入知识点章名称</p>
            </FormItem>
            <FormItem>
              <div style="text-align: center;">
                <Button type="primary" @click="handleSubmit1" style="margin-left: 8px">提 交</Button>
              </div>
            </FormItem>
          </Form>
        </div>
      </Modal>
  </div>

</template>

<script>
import { knowSectionList, addKnowSection, putKnowSection, delKnowSection, knobSectionMove } from '@/api/course'
import { mapMutations } from 'vuex'

export default {

  data () {
    return {
      data: [],
      total: 1,
      modal: false,
      title: '',
      valueList: [],
      list: [],
      formValidate: {
        course_id: this.$route.query.id,
        know_section_name: ''
      },
      formatFile: [],
      formatcard: [],
      ruleValidate: {
        know_section_name: [
          { required: true, message: '请输入知识点章名', trigger: 'blur' }
        ]
      },
      cursefrom: {
        id: '',
        know_section_name: '',
        course_id: this.$route.query.id
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
          title: '知识点章ID',
          key: 'id',
          minWidth: 80,
          tooltip: true,
          align: 'center'
        },
        {
          title: '课程名称',
          key: 'course_name',
          minWidth: 100,
          tooltip: true,
          align: 'center'
        },

        {
          title: '知识点章名称',
          key: 'know_section_name',
          minWidth: 120,
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
          title: '章操作',
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
          title: '知识点节操作',
          key: 'action',
          minWidth: 180,
          align: 'center',
          render: (h, params) => {
            return h('div', [

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
                    this.knobList(params.row)
                  }
                }
              }, '知识点节管理')

            ])
          }
        }
      ]
    }
  },
  methods: {
    ...mapMutations(['addTag']),
    seach (name) {
      this.$refs[name].resetFields()
    },
    seachKnow () {
      this.getQdata(this.cursefrom)
    },
    knobList (row) {
      const route = {
        name: 'Konb_list',
        meta: {
          title: `${row.id}-知识点节列表`
        },
        query: {
          course_id: row.course_id,
          section_id: row.id
        }
      }
      this.addTag({
        route: route,
        type: 'push'
      })
      this.$router.push(route)
    },
    removes (row) {
      delKnowSection({ id: row.id }).then(res => {
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
    addknow () {
      this.formValidate.know_section_name = ''
      this.title = '添加知识点章'
      this.modal = true
    },
    putbuild (row) {
      this.title = '修改知识点章'
      this.formValidate.id = row.id
      this.modal = true
      this.formValidate.know_section_name = row.know_section_name
    },
    handleSubmit1 () {
      if (this.title === '添加知识点章') {
        addKnowSection(this.formValidate).then(res => {
          if (res.data.code === 200) {
            this.$Message.success('添加成功!')
            this.getQdata(this.cursefrom)
            this.modal = false
          }
        })
      } else {
        putKnowSection(this.formValidate).then(res => {
          if (res.data.code === 200) {
            this.$Message.success('修改成功!')
            this.getQdata(this.cursefrom)
            this.modal = false
          }
        })
      }
    },
    down (row) {
      knobSectionMove({ id: row.id, move_status: 1 }).then(res => {
        if (res.data.code === 200) {
          this.$Message.success('修改成功!')
          this.getQdata(this.cursefrom)
        } else if (res.data.code === 405) {
          this.$Message.error(res.data.msg)
        }
      })
    },
    up (row) {
      knobSectionMove({ id: row.id, move_status: 2 }).then(res => {
        if (res.data.code === 200) {
          this.$Message.success('修改成功!')
          this.getQdata(this.cursefrom)
        } else if (res.data.code === 405) {
          this.$Message.error(res.data.msg)
        }
      })
    },
    getQdata (obj) {
      knowSectionList(obj).then(res => {
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
