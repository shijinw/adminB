<template>
  <div>
    <Card>
      <p slot="title">章节列表</p>

      <Table size="small" :columns="columns" :data="data"></Table>

      <!-- 添加 or 修改 -->
      <Modal v-model="modal" draggable title="节点排序" :width="700" :footer-hide="true">
        <div>
           <Table size="small" :columns="columns2" :data="data2"></Table>
        </div>
      </Modal>

    </Card>
  </div>
</template>

<script>
import { knobList, sectionMove, getSection, knobMove } from '@/api/course'

export default {
  data () {
    return {
      data: [],
      data2: [],
      columns: [
        {
          title: 'ID',
          key: 'section_id',
          minWidth: 80
        },
        {
          title: '章节名称',
          key: 'section_name',
          minWidth: 200
        },
        {
          title: '添加时间',
          key: 'create_time',
          minWidth: 150
        },
        {
          title: '排序值',
          key: 'sort',
          minWidth: 100
        },
        {
          title: '操作',
          key: 'action',
          minWidth: 150,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'dashed',
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
              }, '上移'),
              h('Button', {
                props: {
                  type: 'dashed',
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
              }, '下移'),
              h('Button', {
                props: {
                  type: 'info',
                  size: 'small'
                },

                on: {
                  click: () => {
                    this.sort(params.row)
                  }
                }
              }, '节点排序')
            ])
          }
        }
      ],
      columns2: [
        {
          title: 'ID',
          key: 'id',
          minWidth: 80
        },
        {
          title: '节点名称',
          key: 'knob_name',
          minWidth: 100
        },
        {
          title: '添加时间',
          key: 'create_time',
          minWidth: 100
        },
        {
          title: '排序值',
          key: 'sort',
          minWidth: 80
        },

        {
          title: '操作',
          key: 'action',
          minWidth: 150,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'dashed',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.up2(params.row)
                  }
                }
              }, '上移'),
              h('Button', {
                props: {
                  type: 'dashed',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.down2(params.row)
                  }
                }
              }, '下移')

            ])
          }
        }
      ],
      modal: false,
      title: '',
      type: 1,
      formValidate: {
        id: '',
        org_name: ''
      },
      ruleValidate: {
        org_name: [
          { required: true, message: '请输入节点名称', trigger: 'blur' }
        ]
      }
    }
  },
  components: {

  },
  watch: {

  },
  methods: {
    up (row) {
      sectionMove({ section_id: row.section_id, move_status: 1 }).then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.$Message.success(rep.msg)
          this.getData()
        } else if (rep.code === 405) {
          this.$Message.success(rep.msg)
        }
      })
    },
    down (row) {
      sectionMove({ section_id: row.section_id, move_status: 2 }).then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.$Message.success(rep.msg)
          this.getData()
        } else if (rep.code === 405) {
          this.$Message.success(rep.msg)
        }
      })
    },
    up2 (row) {
      knobMove({ id: row.id, move_status: 1 }).then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.$Message.success(rep.msg)
          this.getDatas(row)
        } else if (rep.code === 405) {
          this.$Message.success(rep.msg)
        }
      })
    },
    down2 (row) {
      knobMove({ id: row.id, move_status: 2 }).then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.$Message.success(rep.msg)
          this.getDatas(row)
        } else if (rep.code === 405) {
          this.$Message.success(rep.msg)
        }
      })
    },
    sort (row) {
      this.getDatas(row)
      this.modal = true
    },
    getData () {
      getSection({ course_id: this.$route.query.id }).then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.data = rep.data
        }
      })
    },
    getDatas (row) {
      knobList({ course_id: this.$route.query.id, section_id: row.section_id }).then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.data2 = rep.data
        }
      })
    }
  },
  mounted () {
    this.getData()
  }
}
</script>

<style lang="less">

</style>
