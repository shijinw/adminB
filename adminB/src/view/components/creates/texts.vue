<template>
  <div>
    <p style="overflow: hidden;white-space: pre-wrap;" v-html="text"><p/>
  </div>
</template>
<script>
export default {
  props: ['text']

}
</script>
