<template>
  <div style="background:white">
       <div class="waterfall">
          <div v-for="(val,key) in Datalist" :key="key" style="width:450px;margin:10px">
          <Card :bordered="false" style="margin:10px" :style="{background:val.color}">
           <div ><strong>用户名：</strong>{{val.user_name}}</div>
           <div><strong>ID：</strong><span>{{val.id}}</span></div>
           <div><strong>联系方式：</strong><span>{{val.mobile}}</span></div>
           <div><strong>邮箱账户：</strong><span>{{val.email}}</span></div>
           <div><strong>创建时间：</strong><span>{{val.create_time}}</span></div>
        </Card>
  </div>
        </div>
  </div>

</template>

<script>
import { dataAskList } from '@/api/data'
export default {
  data () {
    return {
      visible: false,
      imgUrl: '',
      total: 0,
      uploadList3: [],
      Datalist: [],
      formdata: {
        limit: 10,
        page: 1
      }
    }
  },
  methods: {
    onChange (val) {
      this.formdata.page = val
      this.getData(this.formdata)
    },
    onPageSizeChange (val) {
      this.formdata.limit = val
      this.getData(this.formdata)
    },
    getData (obj) {
      dataAskList(obj).then(res => {
        let rep = res.data
        if (rep.code === 200) {
          let arr = rep.data.data
          arr.forEach(item => {
            item.color = this.getColor()
          })
          this.Datalist = arr
        }
      })
    },
    getColor () {
      let colorValue = '#20B2AA, #87CEFA, #8470FF, #778899, #B0C4DE, #9370D8, #3CB371, #7B68EE, #EE82EE, #00FFFF, #7FFFD4'
      let colorArray = colorValue.split(',')
      return colorArray[Math.floor(Math.random() * 11)]
    }
  },
  mounted () {
    this.getData(this.formdata)
  }

}
</script>
<style lang="less" scoped>

.imgs {
 width: 60px;
 height: 60px;
}

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
.waterfall {
  width: 100%;
    list-style: none;
    display: flex;
    flex-wrap:wrap;
}
</style>
