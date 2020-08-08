<template>
  <div>
    <Card>
      <p slot="title">热搜词统计</p>
      <Table size="small" :columns="columns" :data="data"></Table>
      <div style="padding: 20px 0; text-align: right;">
        <Page :total="total" @on-change="onChange" @on-page-size-change="onPageSizeChange" :current="form.page" :page-size="form.limit" size="small" show-total show-elevator show-sizer />
      </div>
    </Card>
  </div>
</template>

<script>
import { hotSearchList } from '@/api/control'
export default {
  data () {
    return {
      data: [],
      total: 0,
      form: {
        page: 1,
        limit: 10
      },
      columns: [
        {
          title: 'ID',
          key: 'id',
          minWidth: 80
        },
        {
          title: '关键词',
          key: 'tagname',
          minWidth: 100
        },
        {
          title: '搜索次数',
          key: 'count',
          minWidth: 100
        }
      ]
    }
  },
  components: {

  },
  watch: {

  },
  methods: {
    onChange (val) {
      var self = this
      self.form.page = val
      self.getData(self.form)
    },
    onPageSizeChange (val) {
      var self = this
      self.form.limit = val
      self.getData(self.form)
    },
    getData (obj) {
      hotSearchList(obj).then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.total = rep.data.total
          this.data = rep.data.data
        }
      })
    }
  },
  mounted () {
    this.getData(this.form)
  }
}
</script>

<style lang="less">

</style>
