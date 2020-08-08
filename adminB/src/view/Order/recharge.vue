<template>
  <div>
    <Card>
      <p slot="title">流水列表</p>
      <div>
        <Collapse>
          <Panel>
            <Button type="default"
                    shape="circle"
                    icon="md-sync"
                    @click="seachQ"></Button>
            <Divider type="vertical" />
            <Input v-model="form.order_num"
                   placeholder="订单编号"
                   style="width: 100px; margin-right: 10px;" />
            <Divider type="vertical" />
            <Input v-model="form.mobile"
                   placeholder="手机号码"
                   style="width: 100px; margin-right: 10px;" />
            <Divider type="vertical" />
            <Select v-model="form.pay_type"
                    clearable
                    style="width:100px"
                    placeholder="支付类型">
              <Option v-for="item in statusList"
                      :value="item.id"
                      :key="item.id">{{ item.value }}</Option>
            </Select>
            <Divider type="vertical" />
            <Select v-model="form.is_live"
                    clearable
                    style="width:100px"
                    placeholder="订单类型">
              <Option v-for="item in is_live"
                      :value="item.id"
                      :key="item.id">{{ item.value }}</Option>
            </Select>
            <p slot="content">
              <Divider type="vertical"
                       style="margin-left:50px" />
              <DatePicker @on-change="getStime"
                          format="yyyy-MM-dd"
                          type="date"
                          placeholder="下单开始时间"
                          style="width: 140px"></DatePicker>
              <Divider type="vertical" />
              <DatePicker @on-change="getEtime"
                          format="yyyy-MM-dd"
                          type="date"
                          placeholder="下单结束时间"
                          style="width: 140px"></DatePicker>
              <Divider type="vertical" />
              <DatePicker @on-change="getPStime"
                          format="yyyy-MM-dd"
                          type="date"
                          placeholder="付款开始时间"
                          style="width: 140px"></DatePicker>
              <Divider type="vertical" />
              <DatePicker @on-change="getPEtime"
                          format="yyyy-MM-dd"
                          type="date"
                          placeholder="付款结束时间"
                          style="width: 140px"></DatePicker>
            </p>
          </Panel>
        </Collapse>
        <Button type='primary'
                @click="seach"
                style="margin-right: 10px;margin-top: 20px;">搜索</Button>
      </div>
      <Divider />
      <Table size="small"
             :columns="columns"
             :data="data"></Table>
      <div style="padding: 20px 0; text-align: right;">
        <Page :total="total"
              @on-change="onChange"
              @on-page-size-change="onPageSizeChange"
              :current="form.page"
              :page-size="form.limit"
              size="small"
              show-total
              show-elevator
              show-sizer />
      </div>
      <!-- 添加 or 修改 -->
      <Modal v-model="modal"
             scrollable
             :footer-hide="true"
             :width="640"
             mask>

        <Tabs type="card">
          <TabPane label="订单详情">
            <Row style="margin-top: 20px;">
              <Row style="border: 1px solid #ccc;">
                <Row style="border-bottom: 1px solid #ccc; text-align: center;">
                  <Col :span="12"
                       class="box"><strong>订单情况</strong></Col>
                  <Col :span="12"
                       class="box"
                       style="border-left: 1px solid #ccc;"><strong>详情内容</strong></Col>
                </Row>
                <Row style="border-bottom: 1px solid #ccc; text-align: center;">
                  <Col :span="12"
                       class="box"
                       style="line-height: 32px;">主键id</Col>
                  <Col :span="12"
                       class="box"
                       style="border-left: 1px solid #ccc;">
                  <Input readonly
                         v-model='data0.id'></Input>
                  </Col>
                </Row>
                <Row style="border-bottom: 1px solid #ccc; text-align: center;">
                  <Col :span="12"
                       class="box"
                       style="line-height: 32px;">手机号码</Col>
                  <Col :span="12"
                       class="box"
                       style="border-left: 1px solid #ccc;">
                  <Input readonly
                         v-model='data0.mobile'></Input>
                  </Col>
                </Row>
                <Row style="border-bottom: 1px solid #ccc; text-align: center;">
                  <Col :span="12"
                       class="box"
                       style="line-height: 32px;">订单编号</Col>
                  <Col :span="12"
                       class="box"
                       style="border-left: 1px solid #ccc;">
                  <Input readonly
                         v-model='data0.order_num'></Input>
                  </Col>
                </Row>
                <Row style="border-bottom: 1px solid #ccc; text-align: center;">
                  <Col :span="12"
                       class="box"
                       style="line-height: 32px;">支付状态</Col>
                  <Col :span="12"
                       class="box"
                       style="border-left: 1px solid #ccc;">
                  <Input readonly
                         v-model='data0.pay_status'></Input>
                  </Col>
                </Row>

                <Row style="border-bottom: 1px solid #ccc; text-align: center;">
                  <Col :span="12"
                       class="box"
                       style="line-height: 32px;">支付价格</Col>
                  <Col :span="12"
                       class="box"
                       style="border-left: 1px solid #ccc;">
                  <Input readonly
                         v-model='data0.pay_price'></Input>
                  </Col>
                </Row>
                <Row style="border-bottom: 1px solid #ccc; text-align: center;">
                  <Col :span="12"
                       class="box"
                       style="line-height: 32px;">支付状态</Col>
                  <Col :span="12"
                       class="box"
                       style="border-left: 1px solid #ccc;">
                  <Input readonly
                         v-model='data0.pay_status'></Input>
                  </Col>
                </Row>
                <Row style="border-bottom: 1px solid #ccc; text-align: center;">
                  <Col :span="12"
                       class="box"
                       style="line-height: 32px;">支付方式</Col>
                  <Col :span="12"
                       class="box"
                       style="border-left: 1px solid #ccc;">
                  <Input readonly
                         v-model='data0.pay_type'></Input>
                  </Col>
                </Row>
                <Row style="border-bottom: 1px solid #ccc; text-align: center;">
                  <Col :span="12"
                       class="box"
                       style="line-height: 32px;">订单来源</Col>
                  <Col :span="12"
                       class="box"
                       style="border-left: 1px solid #ccc;">
                  <Input readonly
                         v-model='data0.origin'></Input>
                  </Col>
                </Row>

                <Row style="border-bottom: 1px solid #ccc; text-align: center;">
                  <Col :span="12"
                       class="box"
                       style="line-height: 32px;">下单时间</Col>
                  <Col :span="12"
                       class="box"
                       style="border-left: 1px solid #ccc;">
                  <Input readonly
                         v-model='data0.add_time'></Input>
                  </Col>
                </Row>
                <Row style="border-bottom: 1px solid #ccc; text-align: center;">
                  <Col :span="12"
                       class="box"
                       style="line-height: 32px;">支付时间</Col>
                  <Col :span="12"
                       class="box"
                       style="border-left: 1px solid #ccc;">
                  <Input readonly
                         v-model='data0.pay_time'></Input>
                  </Col>
                </Row>
                <Row style="border-bottom: 1px solid #ccc; text-align: center;">
                  <Col :span="12"
                       class="box"
                       style="line-height: 32px;">课程到期时间</Col>
                  <Col :span="12"
                       class="box"
                       style="border-left: 1px solid #ccc;">
                  <Input readonly
                         v-model='data0.update_time'></Input>
                  </Col>
                </Row>
                <Row style="border-bottom: 1px solid #ccc; text-align: center;">
                  <Col :span="12"
                       class="box"
                       style="line-height: 32px;">充值金额</Col>
                  <Col :span="12"
                       class="box"
                       style="border-left: 1px solid #ccc;">
                  <Input readonly
                         v-model='data0.pay_price'></Input>
                  </Col>
                </Row>
              </Row>

            </Row>
          </TabPane>

        </Tabs>

      </Modal>

    </Card>
  </div>
</template>

<script>
import { voucherList, voucherDetails } from '@/api/order';

export default {
  data() {
    return {
      total: 0,
      data: [],
      modal0: false,
      starttime: '',
      endtime: '',
      pay_status: [
        {
          id: '1',
          value: '已经付款'
        },
        {
          id: '2',
          value: '未付款'
        },
        {
          id: '3',
          value: '订单取消'
        }
      ],
      is_live: [
        {
          id: '1',
          value: '直播订单'
        },
        {
          id: '2',
          value: '课程订单'
        },
        {
          id: '3',
          value: '图书订单'
        },
        {
          id: '4',
          value: '积分订单'
        }
      ],
      statusList: [
        {
          id: '1',
          value: '银联'
        },
        {
          id: '2',
          value: '微信'
        },
        {
          id: '3',
          value: '余额'
        },
        {
          id: '4',
          value: '支付宝'
        },
        {
          id: '5',
          value: '后台'
        },
        {
          id: '6',
          value: '积分兑换'
        },
        {
          id: '7',
          value: '课程卡开课'
        }
      ],
      columns: [
        {
          title: 'ID',
          key: 'id',
          minWidth: 50
        },
        {
          title: '手机号码',
          key: 'mobile',
          minWidth: 100,
          tooltip: true
        },
        {
          title: '订单编号',
          key: 'order_num',
          minWidth: 100,
          tooltip: true
        },
        {
          title: '用户余额',
          key: 'balance',
          minWidth: 100,
          tooltip: true
        },

        {
          title: '下单时间',
          key: 'add_time',
          minWidth: 110,
          tooltip: true
        },
        {
          title: '支付时间',
          key: 'pay_time',
          minWidth: 110,
          tooltip: true
        },
        {
          title: '到期时间',
          key: 'update_time',
          minWidth: 90,
          tooltip: true
        },
        {
          title: '支付价格',
          key: 'pay_price',
          minWidth: 90,
          tooltip: true
        },

        {
          title: '支付状态',
          key: 'pay_status',
          minWidth: 100,
          render: (h, params) => {
            let text = '';
            let color = '';
            if (params.row.pay_status == '已付款') {
              text = '已付款';
              color = '#019beb';
            } else if (params.row.pay_status == '未付款') {
              text = '未付款';
              color = 'red';
            } else if (params.row.pay_status == '订单取消') {
              text = '订单取消';
              color = '#eaa70e';
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
          title: '支付方式',
          key: 'pay_type',
          minWidth: 100,
          align: 'center',
          render: (h, params) => {
            let text = '';
            let color = '';
            if (params.row.pay_type == '银联') {
              text = '银联';
              color = '#019beb';
            } else if (params.row.pay_type == '微信') {
              text = '微信';
              color = 'red';
            } else if (params.row.pay_type == '余额') {
              text = '余额';
              color = '#eaa70e';
            } else if (params.row.pay_type == '支付宝') {
              text = '支付宝';
              color = '#26ec89';
            } else if (params.row.pay_type == '后台') {
              text = '后台';
              color = '#444f5a';
            } else if (params.row.pay_type == '积分兑换') {
              text = '积分兑换';
              color = '#131415';
            } else if (params.row.pay_type == '课程卡开课') {
              text = '课程卡开课';
              color = '#d811c9';
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
          minWidth: 90,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h(
                'Button',
                {
                  props: {
                    type: 'info',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.addlook(params.row)
                    }
                  }
                },
                '详情'
              )
            ])
          }
        }
      ],

      modal: false,
      data0: {},
      title: '',
      type: 1,
      formValidate: {
        id: '',
        class_name: '',
        status: ''
      },
      ruleValidate: {
        class_name: [
          { required: true, message: '请输入标签名称', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '请选择是否显示', trigger: 'change' }
        ]
      },
      form: {
        page: 1,
        limit: 10,
        is_live: '2',
        mobile: '',
        package_name: '',
        order_num: '',
        pay_type: '',
        pay_status: '',
        start_time: '',
        end_time: '',
        pay_start_time: '',
        pay_end_time: ''
      }
    }
  },
  components: {},
  watch: {},
  methods: {
    seachQ() {
      this.form.status = '';
      this.form.class_name = '';
      this.getData(this.form)
    },
    seach() {
      this.getData(this.form)
    },
    addTag() {
      this.modal0 = true
    },
    getStime(startime) {
      this.form.start_time = startime
    },
    getEtime(startime) {
      this.form.end_time = startime
    },
    getPStime(startime) {
      this.form.pay_start_time = startime
    },
    getPEtime(startime) {
      this.form.pay_end_time = startime
    },
    onChange(val) {
      this.form.page = val
      this.getData(this.form)
    },
    onPageSizeChange(val) {
      this.form.limit = val
      this.getData(this.form)
    },

    handleReset(name) {
      this.$refs[name].resetFields()
    },

    addlook(row) {
      voucherDetails({ id: row.id }).then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.data0 = rep.data
          // rep.data.is_live === 1 ? this.data0.is_live = '直播订单' : this.data0.is_live = '课程订单'
        }
      })
      this.modal = true
    },
    getData(obj) {
      voucherList(obj).then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.data = rep.data.data
          this.total = rep.data.total * 1
        }
      })
    }
  },
  mounted() {
    this.getData(this.form)
  }
}
</script>

<style lang="less">
</style>
