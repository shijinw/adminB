<template>
  <div>
    <Card>
      <p slot="title">签到图列表</p>
      <Divider type="vertical" />
      <Input v-model="formdata.name_date"
             placeholder="日期名称"
             style="width: 200px; margin-right: 10px;" />
      <Divider type="vertical" />
      <Button type='primary'
              @click="search">筛选</Button>
      <Divider type="vertical" />
      <Button type='primary'
              @click="addMenu">添加签到图</Button>

      <Table size="small"
             :columns="columns"
             :data="data"
             style="margin-top:20px"></Table>
    </Card>
    <Modal title="查看图片"
           v-model="visible">
      <img :src="imageUrl"
           v-if="visible"
           style="width: 100%">
    </Modal>
    <Modal v-model="modal"
           draggable
           scrollable
           :title="title"
           :width="700"
           :footer-hide="true">
      <div>
        <Form ref="formValidate"
              :model="formValidate"
              :rules="ruleValidate"
              :label-width="80">
          <FormItem label="日期"
                    prop="name_date">
            <DatePicker v-model="formValidate.name_date"
                        @on-change="dateliat"
                        placeholder="时间"
                        style="width: 100%"></DatePicker>
            <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：日期名称</p>
          </FormItem>
          <Images ref="imags"></Images>
          <FormItem>
            <div style="text-align: center;">
              <Button type="primary"
                      @click="handleSubmit('formValidate')">提 交</Button>
            </div>
          </FormItem>
        </Form>
      </div>
    </Modal>
  </div>
</template>
<script>
import { signImgList, addSignImg, putSignImg } from '@/api/tags';
import Images from '../components/video/image.vue';

export default {
  data() {
    return {
      visible: false,
      modal: false,
      title: '',
      formValidate: {
        name_date: '',
        image_url: '',
        id: ''
      },

      ruleValidate: {
        name_date: [{ required: true, message: '请输入时间日期' }]
      },
      columns: [
        {
          title: 'ID',
          key: 'id',
          minWidth: 80
        },
        {
          title: '创建时间',
          key: 'create_time',
          minWidth: 100
        },
        {
          title: '图片地址',
          key: 'image_url',
          minWidth: 140,
          tooltip: true,
          render: (h, params) => {
            return h('div', [
              h('img', {
                attrs: {
                  src: params.row.image_url,
                  style: 'width: 40px;height: 30px;border-radius: 2px;'
                },
                on: {
                  click: () => {
                    this.lookdown(params.row)
                  }
                }
              })
            ])
          }
        },
        {
          title: '日期名称',
          key: 'name_date',
          minWidth: 100
        },
        {
          title: '操作',
          key: 'is_addkonw',
          minWidth: 150,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h(
                'Button',
                {
                  props: {
                    type: 'info',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.put(params.row)
                    }
                  }
                },
                '修改'
              )
            ])
          }
        }
      ],
      data: [],
      imageUrl: '',
      formdata: {
        limit: 10,
        page: 1,
        name_date: ''
      }
    }
  },
  components: {
    Images
  },
  methods: {
    getData(obj) {
      signImgList(obj).then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.data = rep.data.data
        }
      })
    },
    handleReset4(name) {
      this.$refs[name].resetFields()
    },
    handleSubmit(name) {
      if (this.title === '添加签到图') {
        this.formValidate.image_url = this.$refs.imags.uploadList3[0].url
        this.$refs[name].validate(valid => {
          if (valid) {
            addSignImg(this.formValidate).then(res => {
              if (res.data.code === 200) {
                this.$Message.success('添加成功!，请注意查看')
                this.handleReset4(name)
                this.getData(this.formdata)
                this.modal = false
              }
            })
          } else {
            this.$Message.error('请输入后再提交!')
          }
        })
      } else {
        this.formValidate.image_url = this.$refs.imags.uploadList3[0].url
        this.$refs[name].validate(valid => {
          if (valid) {
            putSignImg(this.formValidate).then(res => {
              if (res.data.code === 200) {
                this.$Message.success('修改成功!，请注意查看')
                this.handleReset4(name)
                this.getData(this.formdata)
                this.modal = false
              }
            })
          } else {
            this.$Message.error('请输入后再提交!')
          }
        })
      }
    },
    dateliat(date) {
      this.formValidate.name_date = date
    },
    lookdown(row) {
      this.imageUrl = row.image_url
      this.visible = true
    },
    addMenu() {
      this.modal = true
      this.title = '添加签到图';
      this.formValidate.name_date = '';
      this.formValidate.image_url = '';
      this.$refs.imags.uploadList3[0].url = '';
    },
    search() {
      this.getData(this.formdata)
    },
    put(row) {
      this.formValidate.name_date = row.name_date
      this.formValidate.image_url = row.image_url
      this.formValidate.id = row.id
      this.$refs.imags.uploadList3[0].url = row.image_url
      this.modal = true
      this.title = '修改签到图';
    }
  },
  mounted() {
    this.getData(this.formdata)
  }
}
</script>
