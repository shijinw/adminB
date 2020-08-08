<template>
  <textarea :id='id' :value='value'></textarea>
</template>

<script>
// upLoad image api
import { upLoadImage } from '@/api/control'
// Import TinyMCE
import tinymce from 'tinymce/tinymce'
import 'tinymce/themes/modern/theme'
import 'tinymce/plugins/advlist'
import 'tinymce/plugins/autolink'
import 'tinymce/plugins/lists'
import 'tinymce/plugins/link'
import 'tinymce/plugins/image'
import 'tinymce/plugins/charmap'
import 'tinymce/plugins/preview'
import 'tinymce/plugins/hr'
import 'tinymce/plugins/anchor'
import 'tinymce/plugins/pagebreak'
import 'tinymce/plugins/imagetools'
import 'tinymce/plugins/searchreplace'
import 'tinymce/plugins/visualblocks'
import 'tinymce/plugins/visualchars'
import 'tinymce/plugins/code'
import 'tinymce/plugins/fullpage'
import 'tinymce/plugins/insertdatetime'
import 'tinymce/plugins/nonbreaking'
import 'tinymce/plugins/save'
import 'tinymce/plugins/table'
import 'tinymce/plugins/contextmenu'
import 'tinymce/plugins/directionality'
import 'tinymce/plugins/paste'
import 'tinymce/plugins/textcolor'
import 'tinymce/plugins/colorpicker'
import 'tinymce/plugins/textpattern'
import 'tinymce/plugins/autoresize'
const INIT = 0
const CHANGED = 2
// var EDITOR = null
export default {
  props: {
    value: {
      type: String,
      editor: null,
      required: true
    },
    setting: {},
    withCredentials: {
      default: false,
      type: Boolean
    }
  },
  watch: {
    value: function (val) {
      if (this.status === INIT || tinymce.activeEditor.getContent() !== val) {
        tinymce.activeEditor.setContent(val)
      }
      this.status = CHANGED
    }
  },
  data () {
    return {
      status: INIT,
      id: 'editor-' + new Date().getTime()
    }
  },
  methods: {
    destroy () {
      tinymce.get(this.id).destroy()
    }
  },
  mounted () {
    const _this = this
    const setting =
      {
        selector: '#' + _this.id,
        language_url: '/tinymce/zh_CN.js',
        language: 'zh_CN',
        skin_url: '/tinymce/skins/lightgray', // 主题
        branding: false,
        init_instance_callback: function (editor) {
          // EDITOR = editor
          console.log('Editor: ' + editor.id + ' is now initialized.')
          editor.on('input change undo redo', () => {
            var content = editor.getContent()
            _this.$emit('show', content)
          })
        },
        image_title: false, // 是否开启图片标题设置的选择，这里设置否
        automatic_uploads: true, // 开启点击图片上传时，自动进行远程上传操作
        insert_button_items: 'image link | inserttable',
        paste_retain_style_properties: 'all',
        paste_word_valid_elements: '*[*]', // word需要它
        paste_data_images: true, // 粘贴的同时能把内容里的图片自动上传，非常强力的功能
        paste_convert_word_fake_lists: false, // 插入word文档需要该属性
        paste_webkit_styles: 'all',
        paste_merge_formats: false,
        nonbreaking_force_tab: false,
        paste_auto_cleanup_on_paste: false,
        content_style: 'img {max-width: 100%; height: auto;}',
        menubar: 'edit insert view format table tools',
        'plugins': [ // image跟imagetools为开启图片上传的插件功能
          'advlist autolink lists link image charmap preview hr anchor pagebreak imagetools',
          'searchreplace visualblocks visualchars code fullpage',
          'insertdatetime nonbreaking save table contextmenu directionality',
          'paste textcolor colorpicker textpattern imagetools'
        ],
        'toolbar_items_size': 'small',
        'toolbar1': 'undo redo | outdent indent | removeformat | fontsizeselect | forecolor backcolor bold italic | link image | bullist numlist',
        // 图片上传
        images_upload_handler: function (blobInfo, success, failure) {
          upLoadImage(blobInfo.blob(), 'image', res => {
            success(res.data.image_url)
          }, err => {
            failure('上传失败：' + err)
          })
        }
      }
    Object.assign(setting, _this.setting)
    tinymce.init(setting)
  },
  beforeDestroy: function () {
    tinymce.get(this.id).destroy()
  }
}
</script>
