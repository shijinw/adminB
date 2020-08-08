<template>

  <div ref="Textare" style="position:relative">

  <Row>
          <FormItem label="题干扩展" prop="question_stem" style="margin-left:10px">
              <Input  type="textarea" v-model="Data" :rows='3' placeholder='请输入题干扩展内容'/>
                <Button  type="warning" class="handremove" @click="removes(id)">取消文字</Button>
          </FormItem>

        </Row>
  </div>
</template>
<script>
export default {
  props: ['text', 'id'],

  data () {
    return {
      Data: ''
    }
  },
  methods: {
    removes (id) {
      this.$emit('remoeview', id)
      this.$emit('remoeviews', id)
      this.show = false
    }
  },
  mounted () {
    this.Data = this.text
  }
}
</script>
<style scoped>
.handremove{
   position:absolute;
  right:0;
  top:2.5rem;
}
</style>
