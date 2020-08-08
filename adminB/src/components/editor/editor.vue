<template>
  <div style="width:70%">
    <editor
      :id="retitle"
      height="250px"
      width="135%"
      :content="value"
      :afterChange="afterChange()"
      pluginsPath="/static/kindeditor/plugins/"
      :loadStyleMode="false"
      :uploadJson="uplodapath"
      :items="list"
      @on-content-change="onContentChange"
    ></editor>
  </div>
</template>

<script>
import config from "@/config";
export default {
  props: {
    retitle:{
      type:String
    },
    value:{
       type:String
    }
  },
  data() {
    return {
      editorText: "",
      uplodapath: "",
      list: [
        "source",
        "|",
        "undo",
        "redo",
        "|",
        "preview",
        "|",
        "justifyleft",
        "justifycenter",
        "justifyright",
        "justifyfull",
        "insertorderedlist",
        "insertunorderedlist",
        "indent",
        "outdent",
        "subscript",
        "superscript",
        "|",
        "fullscreen",
        "/",
        "table",
        "hr",
        "formatblock",
        "fontname",
        "fontsize",
        "|",
        "forecolor",
        "hilitecolor",
        "bold",
        "italic",
        "underline",
        "strikethrough",
        "lineheight",
        "removeformat",
        "|",
        "image",
        "flash"
      ]
    };
  },
  methods: {
    onContentChange(val) {
     this.$emit("update:value", val)
    },

    afterChange() {}
  },
  created() {
    switch (document.domain) {
      case "dests.youcaiwx.cn":
        this.uplodapath = `https://dests.youcaiwx.cn//php/upload_json.php`;
        break;
      case "ycdb.youcaiwx.cn":
        this.uplodapath = `https://ycdb.youcaiwx.cn/php/upload_json.php`;
        break;
      default:
        this.uplodapath = `https://dests.youcaiwx.cn//php/upload_json.php`;
        break;
    }
  }
};
</script>

<style>
#hello {
  float: left;
}
</style>
