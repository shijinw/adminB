<template>
  <div style="width:700px;height:350px">
    <Card>
      <div class="drag-box-card">

        <!-- 切记设置list1和list2属性时，一定要添加.sync修饰符 -->
        <drag-list :list1.sync="list1" :list2.sync="list2" :dropConClass="dropConClass" @on-change="handleChange" @Updata="handleReachTop">
          <h3 slot="left-title">ID-视频名</h3>
          <Card class="drag-item" slot="left" slot-scope="left">{{ left.itemLeft.id }}{{left.itemLeft.video_name}}</Card>
          <h3 slot="right-title">已关联视频</h3>
          <Card class="drag-item" slot="right" slot-scope="right">{{ right.itemRight.id }}{{right.itemRight.video_name}}</Card>
        </drag-list>

      </div>
      
    </Card>
  </div>
</template>
<script>
import DragList from '@/components/drag-list'
import { teacherList } from '@/api/teacher'
import { mapActions  } from 'vuex'
export default {
  components: {
    DragList
  },
  data () {
    return {
      list1: [],
      list2: [],
      dropConClass: {
        left: ['drop-box', 'left-drop-box'],
        right: ['drop-box', 'right-drop-box']
      },
      draglist:[],
       page: 1,
      
    }
  },
  methods: {
     ...mapActions(['getDraglist']),
    handleChange ({ src, target, oldIndex, newIndex }) {
      this.handleList.push(`${src} => ${target}, ${oldIndex} => ${newIndex}`)
    },
    handleReachTop(value){
      if(value==-1){
        this.page++
        this.getDraglist(this.page).then(res=>{
          if(res[0]){
      this.draglist=[...this.draglist,...res]
          }else{
           this.$Message.error('数据已全部加载!') 
          }
           this.list1 =this.draglist
        })
      }
    }
  },
  mounted () {
    this.getDraglist().then(res=>{
      this.list1 =res
      this.draglist =res
      this.list2 =[ res[0]]
    })
    // teacherList(this.form).then(res => {
    //   this.list1 = res.data.data.data
    //   this.list2 = [res.data.data.data[0]]
    // })
  }
}
</script>
<style lang="less">
.drag-box-card{
  display: inline-block;
  width: 100%;
  height: 100%;
  .drag-item{
    margin: 10px;
  }
  h3{
    padding: 10px 15px;
  }
  .drop-box{
    border: 1px solid #eeeeee;
    height: 455px;
    border-radius: 5px;
  }
  .left-drop-box{
    margin-right: 10px;
  }
  .right-drop-box{
    //
  }
}
.handle-log-box{
  display: inline-block;
  margin-left: 20px;
  border: 1px solid #eeeeee;
  vertical-align: top;
  width: 200px;
  height: 500px;
  h3{
    padding: 10px 14px;
  }
  .handle-inner-box{
    height: ~"calc(100% - 44px)";
    overflow: auto;
    p{
      padding: 14px 0;
      margin: 0 14px;
      border-bottom: 1px dashed #eeeeee;
    }
  }
}
.res-show-box{
  display: inline-block;
  margin-left: 20px;
  border: 1px solid #eeeeee;
  vertical-align: top;
  width: 350px;
  height: 570px;
}
</style>
