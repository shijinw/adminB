<template>
  <div>
    <Card>
      <p slot="title">课程包列表</p>
      <div>
        <Button type="default" shape="circle" icon="md-sync" @click="seachQ"></Button>
        <Divider type="vertical"/>
        <Cascader
          :data="ListA"
          v-model="valueList"
          change-on-select
          style="width:150px; display: inline-block;"
          placeholder="项目/专业"
        ></Cascader>
        <Divider type="vertical"/>
        <Select
          v-model="form.class_id"
          clearable
          style="width:120px; margin-right: 10px;"
          placeholder="标签"
        >
          <Option v-for="item in tagsList" :value="item.id" :key="item.id">{{ item.class_name }}</Option>
        </Select>
        <Select v-model="form.status" clearable style="width:100px;" placeholder="是否有效">
          <Option v-for="item in statusList" :value="item.id" :key="item.id">{{ item.value }}</Option>
        </Select>
        <Divider type="vertical"/>
        <Input
          v-model="form.name"
          clearable
          placeholder="课程包名称"
          style="width: 100px; margin-right: 10px;"
        />
        <Input
          v-model="form.id"
          clearable
          placeholder="课程包ID"
          style="width: 80px; margin-right: 10px;"
        />
        <Button type="primary" @click="seach" style="margin-right: 10px;">搜索</Button>
        <Button v-if="Auth.top[0]" :type='Auth.top[0].menu_type' style="margin-right: 10px;" @click="audit">{{Auth.top[0].menu_title}}</Button>
      </div>
      <Divider/>
      <Modal v-model="modal3" draggable title="课程包详情" :width="800" :footer-hide="true">
        <div>
       <Row style="background:#eee;padding:20px">
        <Col span="11">
            <Card :bordered="false" style="width:750px">
                <p slot="title" style="text-align: center;">{{Row2}}</p>
               <Table :columns="columns1" :data="MtagsList"></Table>
            </Card>
        </Col>

    </Row>
        </div>
      </Modal>

      <Table stripe size="small" :columns="columns" :data="data" @on-selection-change="selectRow"></Table>
      <div style="padding: 20px 0; text-align: right;">
        <Page
          :total="total"
          @on-change="onChange"
          @on-page-size-change="onPageSizeChange"
          :current="form.page"
          :page-size="form.limit"
          size="small"
          show-total
          show-elevator
          show-sizer
        />
      </div>
    </Card>
  </div>
</template>

<script>
import {
  auditPackage,
  courseNoList,
  getProjectMajor,
  packageList,
  deletePackage,
  auditDetaile
} from '@/api/course'
import { labelList } from '@/api/tags'
import { userPageRuleList } from '@/api/Answer'
import { mapMutations } from 'vuex'
import { log } from 'util'
import { truncate } from 'fs'
export default {
  data () {
    return {
      Row: 1,
      data: [],
      list: [],
      Audit: [],
      total1: 1,
      Row2: '',
      Auth: {
        right: [],
        top: []
      },
      modal3: false,
      modal: false,
      valueList3: [],
      MtagsList: [],
      data3: [],
      Aarr: [],
      ListA: [],
      targetKeys3: [],
      listStyle: {
        width: '300px',
        height: '400px'
      },
      knowForm: {
        project_id: '',
        major_id: ''
      },
      tagsList: [],
      valueList: [],
      total: 0,
      columns1: [
        {
          title: '课程ID',
          key: 'course_id',
          minWidth: 80
        },
        {
          title: '课程名称',
          key: 'course_name',
          minWidth: 150,
          tooltip: true

        },
        {
          title: '项目名称',
          key: 'project_name',
          minWidth: 100,
          tooltip: true
        },
        {
          title: '专业名称',
          key: 'major_name',
          minWidth: 100,
          tooltip: true
        }
      ],

      columns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '课程包ID',
          key: 'id',
          minWidth: 90
        },
        {
          title: '课程包名称',
          key: 'name',
          minWidth: 110,
          tooltip: true,
          align: 'center'
        },
        {
          title: '项目名称',
          key: 'project_name',
          minWidth: 100,
          tooltip: true
        },
        {
          title: '专业名称',
          key: 'major_name',
          minWidth: 100,
          tooltip: true
        },
        {
          title: '分类标签',
          key: 'class_name',
          minWidth: 100,
          tooltip: true
        },
        {
          title: '审核状态',
          key: 'audit_status',
          minWidth: 100,
          tooltip: true,
          render: (h, params) => {
            let text = ''
            let color = ''
            if (params.row.audit_status === 1) {
              text = '审核'
              color = '#019beb'
            } else {
              text = '未审核'
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
          title: '状态',
          key: 'status',
          minWidth: 100,
          tooltip: true,
          render: (h, params) => {
            let text = ''
            let color = ''
            if (params.row.status == '1') {
              text = '上架'
              color = '#019beb'
            } else {
              text = '下架'
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
          title: '课程包价格',
          key: 'price',
          minWidth: 100,
          tooltip: true,
          render: (h, params) => {
            let text = params.row.price
            let color = ''
            if (params.row.status == '1') {
              color = '#019beb'
            } else {
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
          minWidth: 150,
          align: 'center',
          render: (h, params) => {
            let btns = []
            if (this.Auth.right.length > 0) {
              let listBtn = this.Auth.right
              listBtn.forEach(e => {
                let obj = h('Button', {
                  props: {
                    type: e.menu_type,
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.publicFun(e.key, params.row)
                    }
                  }
                }, e.menu_title)
                btns.push(obj)
              })
            }
            return h('div', [...btns])
          //   return h('div', [

          //     h(
          //       'Button',
          //       {
          //         props: {
          //           type: 'info',
          //           size: 'small'
          //         },
          //         style: {
          //           marginRight: '5px'
          //         },
          //         on: {
          //           click: () => {
          //             this.put(params.row)
          //           }
          //         }
          //       },
          //       '查看'
          //     ),
          //     h(
          //       'Button',
          //       {
          //         props: {
          //           type: 'success',
          //           size: 'small'
          //         },
          //         style: {
          //           marginRight: '5px'
          //         },
          //         on: {
          //           click: () => {
          //             this.check(params.row)
          //           }
          //         }
          //       },
          //       '审核'
          //     )

          //   ])
          }
        }
      ],
      form: {
        page: 1,
        limit: 10,
        project_id: '',
        major_id: '',
        class_id: '',
        name: '',
        id: '',
        status: '',
        audit_status: '2'
      },

      statusList: [
        {
          id: '1',
          value: '有效'
        },
        {
          id: '2',
          value: '无效'
        }
      ]
    }
  },
  components: {},
  watch: {
    valueList (newValue, oldValue) {
      if (newValue.length === 0) {
        this.form.project_id = ''
        this.form.major_id = ''
      } else if (newValue.length === 1) {
        this.form.project_id = newValue[0]
        this.form.major_id = ''
      } else {
        this.form.project_id = newValue[0]
        this.form.major_id = newValue[1]
      }
    },
    valueList3 (newValue, oldValue) {
      if (newValue.length === 0) {
        this.knowForm.project_id = ''
        this.knowForm.major_id = ''
      } else if (newValue.length === 1) {
        this.knowForm.project_id = newValue[0]
        this.knowForm.major_id = ''
      } else {
        this.knowForm.project_id = newValue[0]
        this.knowForm.major_id = newValue[1]
      }
    }
  },

  methods: {
    ...mapMutations(['addTag']),
    seach () {
      this.getData(this.form)
    },
    seachQ () {
      this.form.page = 1
      this.form.limit = 10
      this.form.project_id = ''
      this.form.major_id = ''
      this.form.class_id = ''
      this.form.name = ''
      this.form.id = ''
      this.form.status = ''
      this.valueList = []
      this.getData(this.form)
    },
    onChange (val) {
      this.form.page = val
      this.getData(this.form)
    },
    onPageSizeChange (val) {
      this.form.limit = val
      this.getData(this.form)
    },
    remove (row) {
      this.$Modal.confirm({
        title: '温馨提示',
        content: '确认删除此课程包吗？',
        onOk: () => {
          deletePackage({ id: row.id }).then(res => {
            if (res.data.code === 200) {
              this.$Message.success('删除成功!')
              this.getData(this.form)
            }
          })
        }
      })
    },

    selectRow (e) {
      this.Audit = e
    },
    getAuth (name) {
      userPageRuleList({ menu_name: name }).then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.Auth = rep.data
        }
      })
    },

    // putaway (row) {
    //   console.log(row)
    //   statusPackage({ id: row.id, status: row.status === 1 ? '2' : '1' }).then(res => {
    //     if (res.data.code === 200) {
    //       this.$Message.success(res.data.msg)
    //       this.getData(this.form)
    //     } else if (res.data.code === 405) {
    //       this.$Message.warning(res.data.msg)
    //     }
    //   })
    // },
    publicFun (key, row) {
      if (key === 'b') {
        this.Row2 = row.name
        auditDetaile({ package_id: row.id }).then(res => {
          let rep = res.data
          if (rep.code === 200) {
            this.MtagsList = rep.data
          }
        })
        this.modal3 = true
      }
      if (key === 'c') {
        auditPackage({ id: row.id, audit_status: 1 }).then(res => {
          let rep = res.data
          if (rep.code === 200) {
            this.getData(this.form)
            this.$Message.success('审核成功')
          } else if (rep.code === 405) {
            this.$Message.success('审核失败，请核对')
          }
        })
      }
    },
    getData (obj) {
      packageList(obj).then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.data = rep.data.data

          this.total = rep.data.total * 1
        }
      })
    },

    // 审核按钮
    audit (e) {
      if (this.Audit.length !== 0) {
        let arr = []
        this.Audit.forEach((item) => {
          arr.push(item.id)
        })

        auditPackage({ id: arr.join(','), audit_status: 1 }).then(res => {
          let rep = res.data
          if (rep.code === 200) {
            this.getData(this.form)
            this.$Message.success('审核成功')
          } else if (rep.code === 405) {
            this.$Message.success('审核失败，请核对')
          }
        })
      } else {
        this.$Message.error('审核失败，请您选择需要审核的课程')
      }
    },
    getProMajListA () {
      getProjectMajor().then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.ListA = rep.data
        }
      })
    },
    getList (obj) {
      labelList(obj).then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.tagsList = rep.data
        }
      })
    },
    getProMajList () {
      courseNoList().then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.list = rep.data
        }
      })
    }
  },
  mounted () {
    this.getList({ status: '', class_name: '' })
    this.getProMajList()
    this.getProMajListA()
    this.getData(this.form)
    this.getAuth(this.$route.name)
  }
}
</script>

<style lang="less">
</style>
