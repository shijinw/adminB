<template>

    <div ref="dom"></div>

</template>

<script>
import echarts from 'echarts'
import { questionMonthCount } from '@/api/Answer'
import { on, off } from '@/libs/tools'
export default {

  data () {
    return {
      dom: null,
      Data: [],
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
      }
    }
  },
  methods: {
    resize () {
      this.dom.resize()
    }
  },

  watch: {
    series (newvalue) {
      this.option.series = newvalue
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.dom = echarts.init(this.$refs.dom)
      questionMonthCount({ menu_name: this.$route.name }).then(res => {
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

          })
        }
      })

      on(window, 'resize', this.resize)
    })
  },
  beforeDestroy () {
    off(window, 'resize', this.resize)
  }
}
</script>
