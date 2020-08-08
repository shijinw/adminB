<template>
  <div>
    <Card>
      <p slot="title">学员的操作记录</p>
      <Tabs v-model="name" @on-click="clickTab">
        <TabPane label="学习记录" name="name1">
          <div>
            <Button type="default" shape="circle" icon="md-sync" @click="Dsearch1"></Button>
            <Divider type="vertical" />
            <DatePicker  v-model="form1.starttime" type="date" show-week-numbers placeholder="开始时间" style="margin-right: 10px;"></DatePicker>
            <DatePicker v-model="form1.endtime" type="date" show-week-numbers placeholder="结束时间" style="margin-right: 10px;"></DatePicker>
            <Button type='primary' style="margin-right: 10px;" @click="search1">搜索</Button>
          </div>
          <Divider />
          <Table size="small" :columns="columns1" :data="data1"></Table>
          <div style="padding: 20px 0; text-align: right;">
            <Page :total="total1" @on-change="onChange1" @on-page-size-change="onPageSizeChange1" :current="form1.page" :page-size="form1.limit" size="small" show-total show-elevator show-sizer />
          </div>
        </TabPane>
        <TabPane label="考试记录" name="name2">
          <div>
            <Button type="default" shape="circle" icon="md-sync" @click="Dsearchd2"></Button>

            <Divider type="vertical" />
            <Input v-model="form2.paper_name" placeholder="试卷名称" style="width: 160px; margin-right: 10px;" />
            <DatePicker v-model="form2.create_time" type="date" show-week-numbers placeholder="结束时间" style="margin-right: 10px;"></DatePicker>
            <Button type='primary' style="margin-right: 10px;" @click="search2">搜索</Button>
          </div>
          <Divider />
          <Table size="small" :columns="columns2" :data="data2"></Table>
          <div style="padding: 20px 0; text-align: right;">
            <Page :total="total2" @on-change="onChange2" @on-page-size-change="onPageSizeChange2" :current="form2.page" :page-size="form2.limit" size="small" show-total show-elevator show-sizer />
          </div>
        </TabPane>
        <TabPane label="积分记录" name="name3">
          <div>
            <Button type="default" shape="circle" icon="md-sync" @click="Dsearch3"></Button>
            <Divider type="vertical" />
            <DatePicker  v-model="form3.starttime" type="date" show-week-numbers placeholder="开始时间" style="margin-right: 10px;"></DatePicker>
            <DatePicker v-model="form3.endtime" type="date" show-week-numbers placeholder="结束时间" style="margin-right: 10px;"></DatePicker>
            <Button type='primary' style="margin-right: 10px;" @click="search3">搜索</Button>
          </div>
          <Divider />
          <Table size="small" :columns="columns3" :data="data3"></Table>
          <div style="padding: 20px 0; text-align: right;">
            <Page :total="total3" @on-change="onChange3" @on-page-size-change="onPageSizeChange3" :current="form3.page" :page-size="form3.limit" size="small" show-total show-elevator show-sizer />
          </div>
        </TabPane>
      </Tabs>
    </Card>
  </div>
</template>

<script>
import { studyRecords, testRecords, integralRecords } from '@/api/student'
import moment from 'moment'
export default {
  data () {
    return {
      name: 'name1',
      form1: {
        id: this.$route.query.id,
        page: 1,
        limit: 10,
        starttime: '',
        endtime: ''
      },
      form2: {
        id: this.$route.query.id,
        page: 1,
        limit: 10,
        paper_name: '',
        create_time: ''
      },
      form3: {
        id: this.$route.query.id,
        page: 1,
        limit: 10,
        starttime: '',
        endtime: ''
      },
      data1: [],
      data2: [],
      data3: [],
      total1: 0,
      total2: 0,
      total3: 0,
      plateList: [
        {
          value: '1',
          label: '知识点练习'
        },
        {
          value: '2',
          label: '阶段测试'
        },
        {
          value: '3',
          label: '真题练习'
        },
        {
          value: '4',
          label: '论述题'
        },
        {
          value: '5',
          label: '组卷模考'
        }
      ],
      columns1: [
        {
          title: 'ID',
          key: 'id',
          minWidth: 80
        },
        {
          title: '课程名称',
          key: 'course_name',
          minWidth: 100
        },
        {
          title: '章节名称',
          key: 'section_name',
          minWidth: 100
        },
        {
          title: '考点名称',
          key: 'testcenter_name',
          minWidth: 100
        },
        {
          title: '视频类型',
          key: 'video_type',
          minWidth: 100,
          render: (h, params) => {
            let texts = ''
            if (params.row.video_type == 1) {
              texts = '视频'
            } else if (params.row.video_type == 2) {
              texts = '直播'
            }
            return h('div', {
              props: {}
            }, texts)
          }
        },
        {
          title: '学习时间',
          key: 'create_time',
          minWidth: 150
        }
      ],
      columns2: [
        {
          title: 'ID',
          key: 'id',
          minWidth: 80
        },
        {
          title: '试卷名称',
          key: 'paper_name',
          minWidth: 150
        },
        {
          title: '做题用时/s',
          key: 'used_time',
          minWidth: 100
        },
        {
          title: '正确率',
          key: 'accuracy',
          minWidth: 100,
          render: (h, params) => {
            let texts = ''
            if (params.row.accuracy === 0) {
              texts = 0
            } else {
              texts = `${Number(params.row.accuracy * 100).toFixed(1)}%`
            }
            return h('div', {
              props: {}
            }, texts)
          }
        },
        {
          title: '得分',
          key: 'score',
          minWidth: 100
        },
        {
          title: '所属板块',
          key: 'plate_name',
          minWidth: 100,
    
        },
        {
          title: '交卷时间',
          key: 'create_time',
          minWidth: 150
        }
      ],
      columns3: [
        {
          title: 'ID',
          key: 'id',
          minWidth: 80
        },
        {
          title: '项目名称',
          key: 'name',
          minWidth: 150
        },
        {
          title: '积分详情',
          key: 'detailed',
          minWidth: 100
        },
        {
          title: '类型',
          key: 'type',
          minWidth: 100,
          render: (h, params) => {
            let texts = ''
            if (params.row.type == 1) {
              texts = '收入'
            } else if (params.row.type == 2) {
              texts = '支出'
            }
            return h('div', {
              props: {}
            }, texts)
          }
        },
        {
          title: '变化时间',
          key: 'time',
          minWidth: 150
        }
      ]
    }
  },
  methods: {
    search1 () {
      this.getData1(this.form1)
    },
    search2 () {
      this.getData2(this.form2)
    },
    search3 () {
      this.getData3(this.form3)
    },
    Dsearch1 () {
      this.form1.starttime = ''
      this.form1.endtime = ''
      console.log(1)
      this.getData1(this.form1)
    },
    Dsearchd2 () {
      this.form2.paper_name = ''
      this.form2.create_time = ''
      this.getData2(this.form2)
    },
    Dsearch3 () {
      this.form3.starttime = ''
      this.form3.endtime = ''
      this.getData3(this.form3)
    },
    clickTab (name) {
      if (name === 'name1') {
        this.form1 = {
          id: this.$route.query.id,
          page: 1,
          limit: 10,
          starttime: '',
          endtime: ''
        }
        this.getData1(this.form1)
      } else if (name === 'name2') {
        this.form2 = {
          id: this.$route.query.id,
          page: 1,
          limit: 10,
          name: '',
          plate: '',
          created: ''
        }
        this.getData2(this.form2)
      } else if (name === 'name3') {
        this.form3 = {
          id: this.$route.query.id,
          page: 1,
          limit: 10,
          starttime: '',
          endtime: ''
        }
        this.getData3(this.form3)
      }
    },
    onChange1 (val) {
      var self = this
      self.form1.page = val
      self.getData1(self.form1)
    },
    onPageSizeChange1 (val) {
      var self = this
      self.form1.limit = val
      self.getData1(self.form1)
    },
    onChange2 (val) {
      var self = this
      self.form2.page = val
      self.getData2(self.form2)
    },
    onPageSizeChange2 (val) {
      var self = this
      self.form2.limit = val
      self.getData2(self.form2)
    },
    onChange3 (val) {
      var self = this
      self.form3.page = val
      self.getData3(self.form3)
    },
    onPageSizeChange3 (val) {
      var self = this
      self.form3.limit = val
      self.getData3(self.form3)
    },
    getData1 (obj) {
      if (obj.starttime != '' && obj.endtime != '') {
        obj.starttime = moment(obj.starttime).format('YYYY-MM-DD')
        obj.endtime = moment(obj.endtime).format('YYYY-MM-DD')
      }
      studyRecords(obj).then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.total1 = rep.data.total
          this.data1 = rep.data.data
        }
      })
    },
    getData2 (obj) {
      if (obj.created != '') {
        obj.created = moment(obj.created).format('YYYY-MM-DD')
      }
      testRecords(obj).then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.total2 = rep.data.total
          this.data2 = rep.data.data
        }
      })
    },
    getData3 (obj) {
      if (obj.starttime != '' && obj.endtime != '') {
        obj.starttime = moment(obj.starttime).format('YYYY-MM-DD')
        obj.endtime = moment(obj.endtime).format('YYYY-MM-DD')
      }
      integralRecords(obj).then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.total3 = rep.data.total
          this.data3 = rep.data.data
        }
      })
    }
  },
  mounted () {
    this.getData1(this.form1)
  }
}
</script>

<style lang="less">
.demo-upload-list{
    display: inline-block;
    width: 60px;
    height: 60px;
    text-align: center;
    line-height: 60px;
    border: 1px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    position: relative;
    box-shadow: 0 1px 1px rgba(0,0,0,.2);
    margin-right: 4px;
}
.demo-upload-list img{
    width: 100%;
    height: 100%;
}
.demo-upload-list-cover{
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0,0,0,.6);
}
.demo-upload-list:hover .demo-upload-list-cover{
    display: block;
}
.demo-upload-list-cover i{
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin: 0 2px;
}
</style>
