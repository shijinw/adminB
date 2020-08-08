<template>
  <div>
     <Card>
       <p slot="title">学员风采列表</p>
    <Divider type="vertical" />
           <Input v-model="formdata.student_name" placeholder="学员名称" style="width: 200px; margin-right: 10px;" />
      <Divider type="vertical" />
        <Button type='primary'  @click="search">筛选</Button>
    <Divider type="vertical" />
        <Button type='primary'  @click="addMenu">添加学员风采</Button>

      <Table size="small" :columns="columns" :data="data" style="margin-top:20px"></Table>
<div style="padding: 20px 0; text-align: right;">
        <Page :total="total1" @on-change="onChange" @on-page-size-change="onPageSizeChange" :current="formdata.page" :page-size="formdata.limit" size="small" show-total show-elevator show-sizer />
      </div>
     </Card>
   <Modal  title="查看图片" v-model="visible"  >
      <img :src="imageUrl" v-if="visible" style="width: 100%">
  </Modal>

  </div>
</template>
<script>
import { elegantList, deleteElegant } from '@/api/tags'
import { mapMutations } from 'vuex'

export default {

  data () {
    return {
      visible: false,
      total1: 1,
      columns: [
        {
          title: 'ID',
          key: 'id',
          minWidth: 80
        },
        {
          title: '学员名称',
          key: 'student_name',
          minWidth: 100,
          tooltip: true
        },
        {
          title: '标题',
          key: 'title',
          minWidth: 100,
          tooltip: true
        },
        {
          title: '学员视频',
          key: 'video_href',
          minWidth: 100,
          tooltip: true
        },

        {
          title: '头像',
          key: 'head',
          minWidth: 140,
          tooltip: true,
          render: (h, params) => {
            return h('div', [
              h(
                'img',
                {
                  attrs: {
                    src: params.row.head, style: 'width: 40px;height: 30px;border-radius: 2px;'
                  },
                  on: {
                    click: () => {
                      this.lookdown(params.row)
                    }
                  }
                }

              )
            ])
          }
        },

        {
          title: '就职公司',
          key: 'student_comany',
          minWidth: 100,
          tooltip: true
        },
        {
          title: '操作',
          key: 'is_addkonw',
          minWidth: 150,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
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
              }, '修改'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.remove(params.row)
                  }
                }
              }, '删除')
            ])
          }
        }
      ],
      data: [],
      imageUrl: '',
      formdata: {
        limit: 10,
        page: 1,
        student_name: ''
      }
    }
  },

  methods: {
    ...mapMutations(['addTag']),

    getData (obj) {
      elegantList(obj).then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.data = rep.data.data
          this.total1 = rep.data.total
        }
      })
    },
    handleReset4 (name) {
      this.$refs[name].resetFields()
    },

    lookdown (row) {
      this.imageUrl = row.head
      this.visible = true
    },
    addMenu () {
      const route = {
        name: 'addelegan',
        meta: {
          title: `添加学员风采`
        },
        query: {
          title: '添加学员风采'
        }
      }
      this.addTag({
        route: route,
        type: 'push'
      })
      this.$router.push(route)
      // this.modal = true
      // this.title = '添加学员风采'
      // this.formValidate.name_date = ''
      // this.formValidate.image_url = ''
      // this.$refs.imags.uploadList3[0].url = ''
    },
    search () {
      this.getData(this.formdata)
    },
    put (row) {
      const route = {
        name: 'addelegan',
        meta: {
          title: `修改学员风采`
        },
        query: {
          title: '修改学员风采',
          row: JSON.stringify(row)
        }
      }
      this.addTag({
        route: route,
        type: 'push'
      })
      this.$router.push(route)
      // this.formValidate.name_date = row.name_date
      // this.formValidate.image_url = row.image_url
      // this.$refs.imags.uploadList3[0].url = row.image_url
      // this.modal = true
      // this.title = '修改风采'
    },
    onChange (val) {
      this.formdata.page = val
      this.getData(this.formdata)
    },
    onPageSizeChange (val) {
      this.formdata.limit = val
      this.getData(this.formdata)
    },
    remove (row) {
      deleteElegant({ id: row.id }).then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.$Message.error('删除成功，请注意查看!')
          this.getData(this.formdata)
        }
      })
    }
  },
  mounted () {
    this.getData(this.formdata)
  }
}
</script>
