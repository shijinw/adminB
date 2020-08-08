<template>
  <div>
    <Card>

      <div>
        <Button type="default" shape="circle" icon="md-sync" @click="seach('cursefrom')"></Button>

        <Divider type="vertical" />
          <Select v-model="cursefrom.course_id" clearable style="width:120px" placeholder="正课类型">
          <Option v-for="item in formatFile" :value="item.menu_title" :key="item.id">{{ item.menu_title }}</Option>
        </Select>
        <Divider type="vertical" />

        <Divider type="vertical" />

          <DatePicker @on-change="getStime" format="yyyy-MM-dd" type="date" placeholder="开始时间" style="width: 140px"></DatePicker>
  <Divider type="vertical" />
        <DatePicker  @on-change="getEtime" format="yyyy-MM-dd" type="date" placeholder="回复时间" style="width: 140px"></DatePicker>
  <Divider type="vertical" />
             <Select v-model="cursefrom.reply_user_id" clearable placeholder="回复老师" style="width:100px">
                <Option v-for="item in formatcard" :value="item.id" :key="item.id">{{ item.truename }}</Option>
              </Select>
        <div style="float:right">
        <Button type='primary' @click="seachKnow" style="margin-right: 10px;">筛选</Button>

          </div>

      </div>
      <Divider />
       <p style="color:#444;font-size:18px;font-weight:800">课程答疑月折线图统计</p>
       <div ref="dom" style="height:370px"></div>
       <div style="margin-top:20px">
   <p style="color:#444;font-size:18px;font-weight:800">课程答疑月表格统计</p>
   <Table stripe size="small" :columns="columns" :data="data" ></Table>
   </div>

    </Card>

  </div>
</template>
<script>
import echarts from 'echarts'
import { on, off } from '@/libs/tools'

import { courseMonthCount, userPageRuleList, getAnswerUser } from '@/api/Answer'
export default {
  data () {
    return {
      therat: [],
      Data: [],
      data: [],
      dom: null,
      option: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        grid: {
          top: '3%',
          left: '1.2%',
          right: '1%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: []
      },
      formatkeat: [{
        id: 1,
        name: '回复'
      },
      {
        id: 2,
        name: '未回复'
      }],
      formatcard: [],
      cursefrom: {
        menu_name: this.$route.name,
        course_id: '',
        reply_user_id: '',
        start_time: '',
        end_time: ''
      },
      formatFile: [],
      columns: [

        {
          title: '答疑老师',
          key: 'reply_user_name',
          minWidth: 100,
          tooltip: true
        },
        {
          title: '答疑数量',
          key: 'days_num',
          minWidth: 100,
          tooltip: true,
          align: 'center'
        },
        {
          title: '提问时间',
          key: 'start_time',
          minWidth: 100,
          tooltip: true,
          align: 'center'
        },
        {
          title: '回复时间',
          key: 'end_time',
          minWidth: 100,
          tooltip: true,
          align: 'center'
        }

      ]
    }
  },

  methods: {
    seachKnow () {
      this.getEdata(this.cursefrom)
    },
    seach (name) {
      this.$refs[name].resetFields()
    },

    resize () {
      this.dom.resize()
    },
    getStime (startime) {
      this.cursefrom.start_time = startime
    },
    getEtime (startime) {
      this.cursefrom.end_time = startime
    },
    getCata () {
      userPageRuleList({ menu_name: this.$route.name }).then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.formatFile = rep.data.right
        }
      })
    },
    getThear () {
      getAnswerUser().then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.formatcard = rep.data
        }
      })
    },
    getEdata (obj) {
      courseMonthCount(obj).then(res => {
        let rep = res.data.data.linechare
        if (res.data.code === 200) {
          this.data = res.data.data.fromtable
          let arr = []
          let Arr = []
          rep.forEach(item => {
            arr.push(item.reply_user_name)
            Arr.push({ name: item.reply_user_name,
              type: 'line',
              smooth: true,
              data: item.data
            })
          })
          this.dom.setOption({

            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'cross',
                label: {
                  backgroundColor: '#6a7985'
                }
              }
            },
            legend: {
              data: arr
            },
            toolbox: {
              show: true,
              feature: {
                mark: { show: true },
                dataView: { show: true, readOnly: false },
                magicType: { show: true, type: ['line', 'bar', 'stack', 'tiled'] },
                restore: { show: true },
                saveAsImage: { show: true }
              }
            },
            calculable: true,
            grid: {
              top: '3%',
              left: '1.2%',
              right: '1%',
              bottom: '3%',
              containLabel: true
            },
            xAxis: [
              {
                type: 'category',
                boundaryGap: false,
                data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
              }
            ],
            yAxis: [
              {
                type: 'value'
              }
            ],
            series: Arr

          }, true)
        }
      })
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.dom = echarts.init(this.$refs.dom)
      this.getEdata(this.cursefrom)
      on(window, 'resize', this.resize)
    })

    this.getCata()
    this.getThear()
  },
  beforeDestroy () {
    off(window, 'resize', this.resize)
  }
}
</script>
