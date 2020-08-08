<template>
  <div>
    <img :src="text" style="width:300px;heigth:300px"><img/>
  </div>
</template>
<script>
export default {
  props: ['text'],
  data () {
    return {
      imager: ''
    }
  }
}
</script>
