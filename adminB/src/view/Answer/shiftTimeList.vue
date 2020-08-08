<template>
  <div>
    <Card>
      <p slot="title">答疑转移时间列表</p>
      <Button type='primary'
              v-if="Auth.top"
              @click="ADDlist"
              style="margin: 10px 0;">{{Auth.top[0].menu_title}}</Button>
      <Divider type="vertical" />
      <Table stripe
             size="small"
             :columns="columns"
             :data="data"></Table>
      <div style="padding: 20px 0; text-align: right;">
        <Page :total="total"
              @on-change="onChange"
              @on-page-size-change="onPageSizeChange"
              :current="cursefrom.page"
              :page-size="cursefrom.limit"
              size="small"
              show-total
              show-elevator
              show-sizer />
      </div>
    </Card>
    <Modal v-model="modal0"
           mask
           :title="title"
           footer-hide>
      <div>
        <Form ref="AddFrom"
              :model="AddFrom"
              :rules="AddFromvalue"
              :label-width="80">
          <FormItem label="转移时间"
                    prop="answer_time"
                    style="margin-top:20px">
            <Input type="number"
                   v-model="AddFrom.answer_time"
                   placeholder="输入答疑转移时间 /小时"
                   style="width: 100%" />
          </FormItem>
        </Form>
        <div style="text-align: center;">
          <Button type="primary"
                  @click="sumbit"
                  style="width:110px;height:40px">提 交</Button>
        </div>
      </div>
    </Modal>
  </div>
</template>
<script>
import {
  shiftTimeList,
  userPageRuleList,
  addShiftTime,
  putShiftTime,
  statusShiftTime
} from '@/api/Answer';
import Fomat from '@/libs/fomat';

export default {
  data() {
    return {
      modal0: false,
      title: '添加答疑转移时间',
      columns: [
        {
          title: 'ID',
          key: 'id',
          minWidth: 100,
          tooltip: true
        },
        {
          title: '答疑转移时间/小时',
          key: 'answer_time',
          minWidth: 200,
          tooltip: true,
          align: 'center'
        },

        {
          title: '开启状态',
          key: 'status',
          minWidth: 90,
          tooltip: true,
          render: (h, params) => {
            let text = '';
            let color = '';
            if (params.row.status === 1) {
              text = '开启';
              color = '#019beb';
            } else {
              text = '关闭';
              color = 'red';
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
          minWidth: 250,
          align: 'center',
          render: (h, params) => {
            let btns = []
            if (this.Auth.right) {
              let listBtn = this.Auth.right
              let obj = {}
              listBtn.forEach(e => {
                obj = h(
                  'Button',
                  {
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
                  },
                  e.menu_title
                )
                if (params.row.status === 1) {
                  if (e.key != 'C') btns.push(obj)
                } else {
                  if (e.key != 'D') btns.push(obj)
                }
              })
            }
            return h('div', [...btns])
          }
        }
      ],
      data: [],
      Auth: [],
      total: 1,
      cursefrom: {
        page: 1,
        limit: 10
      },
      AddFrom: {
        id: '',
        answer_time: ''
      },
      AddFromvalue: {
        answer_time: [{ required: true, validator: Fomat.Rules.Verifiy().Bnum }]
      }
    }
  },
  methods: {
    onChange(val) {
      this.cursefrom.page = val
      this.getData()
    },
    onPageSizeChange(val) {
      this.cursefrom.limit = val
      this.getData()
    },
    ADDlist() {
      this.modal0 = true
      this.AddFrom.answer_time = '';
      this.title = '添加答疑转移时间';
    },
    getData() {
      shiftTimeList(this.cursefrom).then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.data = rep.data.data
          this.total = rep.data.total
        }
      })
    },
    sumbit() {
      if (this.title === '添加答疑转移时间') {
        this.$refs.AddFrom.validate(valid => {
          if (valid) {
            addShiftTime(this.AddFrom).then(res => {
              let rep = res.data
              if (rep.code === 200) {
                this.$Message.success('添加成功，请注意查看')
                this.getData()
                this.modal0 = false
              } else if (rep.code === 405) {
                this.$Message.error('添加失败，请注意检查填写格式')
              }
            })
          }
        })
      } else {
        this.$refs.AddFrom.validate(valid => {
          if (valid) {
            putShiftTime(this.AddFrom).then(res => {
              let rep = res.data
              if (rep.code === 200) {
                this.$Message.success('修改成功，请注意查看')
                this.getData()
                this.modal0 = false
              } else if (rep.code === 405) {
                this.$Message.error('修改失败，请注意检查填写格式')
              }
            })
          }
        })
      }
    },
    publicFun(key, row) {
      switch (key) {
        case 'B':
          this.title = '修改答疑转移时间';
          this.AddFrom.answer_time = row.answer_time
          this.AddFrom.id = row.id
          this.modal0 = true
          break;
        case 'C':
          statusShiftTime({
            id: row.id,
            status: row.status === 1 ? 2 : 1
          }).then(res => {
            let rep = res.data
            if (rep.code === 200) {
              this.getData()
            }
          })
          break;
        case 'D':
          statusShiftTime({
            id: row.id,
            status: row.status === 1 ? 2 : 1
          }).then(res => {
            let rep = res.data
            if (rep.code === 200) {
              this.getData()
            }
          })
          break;
      }
    },
    getdata() {
      userPageRuleList({ menu_name: this.$route.name }).then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.Auth = rep.data
        }
      })
    }
  },
  mounted() {
    this.getData()
    this.getdata()
  }
}
</script>
