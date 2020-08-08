<template>
  <div class="world">
     <editor id="editor_id" height="200px" width="100%" :content="editorText"
        :loadStyleMode="false"
        @on-content-change="onContentChange"></editor>
  </div>
</template>

<script>
export default {
  name: 'world',
  data () {
    return {
      editorText: ''
    }
  },
  methods: {
    onContentChange (val) {
      this.editorText = val
    }
  }
}
</script>
