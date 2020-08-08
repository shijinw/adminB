<template>
  <div>
    <Card>
      <p slot="title">广告图列表</p>
       <Button type="default" shape="circle" icon="md-sync" @click="seachQ"></Button>
        <Divider type="vertical" />
          <Select v-model="formAalidate.position_id" clearable style="width:120px" placeholder="广告图引用位置">
          <Option v-for="item in formatFile" :value="item.id" :key="item.id">{{ item.position_name }}</Option>
        </Select>
        <Divider type="vertical" />
     <Input v-model="formAalidate.title" placeholder="广告图名称" style="width: 80px" />
         <Divider type="vertical" />
       <Button type='primary' @click="seachW" style="margin-right: 10px;">搜索</Button>
        <Button type='primary' @click="openSend" style="margin-right: 10px;">添加广告图</Button>

      <Table size="small" :columns="columns" :data="data" style="margin-top:20px"></Table>

    <Modal class="modal1" title="查看图片" v-model="visible"  >
      <img :src="imageUrl" v-if="visible" style="width: 100%">
  </Modal>
   <!-- 添加项目 -->
    <Modal v-model="modal"  title="添加广告图" :footer-hide="true" :width="800">
      <div>
        <Form ref="projectForm" :model="projectForm" :rules="ruleProject" :label-width="80">
          <FormItem label="广告图名" prop="title" style="width:500px">
            <Input v-model="projectForm.title" placeholder="请输入广告图名称"></Input>
          </FormItem>
          <FormItem label="外链地址" prop="jump_href" style="width:500px">
            <Input v-model="projectForm.jump_href" placeholder="请输入外链地址，选填项"></Input>
          </FormItem>
          <FormItem label="广告位置" prop="position_id" style="width:500px">
            <Select v-model="projectForm.position_id">
          <Option v-for="item in formatFile" :value="item.id" :key="item.id" placeholder="请选择引用位置">{{ item.position_name }}</Option>
            </Select>
          </FormItem>
          <FormItem label="是否上架" prop="status" style="width:500px">
            <Select v-model="projectForm.status">
              <Option v-for="item in statusList" :value="item.id" :key="item.id" placeholder="请选择状态">{{ item.name }}</Option>
            </Select>
          </FormItem>
           <FormItem label="排序位置" prop="sort" style="width:500px">
            <Input type="number" v-model="projectForm.sort" placeholder="请输入图片排序位置，必填项"></Input>
          </FormItem>
           <FormItem >
             <Imagen  ref="imgs"></Imagen>
           </FormItem>
          <FormItem>
            <div style="text-align: center;">
              <Button @click="handleReset('projectForm')" style="margin-right: 8px">重 置</Button>
              <Button type="primary" @click="handleSubmit('projectForm')">提 交</Button>
            </div>
          </FormItem>
        </Form>
      </div>
    </Modal>
    <!-- 修改项目 -->
    <Modal v-model="modal1"  title="添加广告图" :footer-hide="true" :width="800">
      <div>
        <Form ref="projectform" :model="projectform" :rules="ruleProject" :label-width="80">
          <FormItem label="广告图名" prop="title" style="width:500px">
            <Input v-model="projectform.title" placeholder="请输入广告图名称"></Input>
          </FormItem>
          <FormItem label="外链地址" prop="jump_href" style="width:500px">
            <Input v-model="projectform.jump_href" placeholder="请输入外链地址，选填项"></Input>
          </FormItem>
          <FormItem label="广告位置" prop="position_id" style="width:500px">
            <Select v-model="projectform.position_id">
          <Option v-for="item in formatFile" :value="item.id" :key="item.id" placeholder="请选择引用位置">{{ item.position_name }}</Option>
            </Select>
          </FormItem>
          <FormItem label="是否上架" prop="status" style="width:500px">
            <Select v-model="projectform.status">
              <Option v-for="item in statusList" :value="item.id" :key="item.id" placeholder="请选择状态">{{ item.name }}</Option>
            </Select>
          </FormItem>
           <FormItem label="排序位置" prop="sort" style="width:500px">
            <Input type="number" v-model="projectform.sort" placeholder="请输入图片排序位置，必填项"></Input>
          </FormItem>
           <FormItem >
             <Imagen  ref="imgs2" :text="projectform.image_href"></Imagen>
           </FormItem>
          <FormItem>
            <div style="text-align: center;">
              <Button @click="handleReset('projectform')" style="margin-right: 8px">重 置</Button>
              <Button type="primary" @click="handlesubmit('projectform')">提 交</Button>
            </div>
          </FormItem>
        </Form>
      </div>
    </Modal>
    </Card>
  </div>
</template>

<script>
import { advertList, positionList, addAdvert, putAdvert, getAdvert, deleteAdvert, isStatus } from '@/api/info'
import Imagen from '../components/images.vue'
import Fomat from '@/libs/fomat'

export default {
  data () {
    return {
      data: [],
      imageUrl: '',
      formatFile: [],
      visible: false,
      modal: false,
      modal1: false,
      columns: [
        {
          title: 'ID',
          key: 'id',
          minWidth: 70
        },
        {
          title: '标题',
          key: 'title',
          minWidth: 80
        },
        {
          title: '引用位置',
          key: 'position_name',
          minWidth: 80
        },
        {
          title: '图片地址',
          key: 'image_href',
          minWidth: 140,
          tooltip: true,
          render: (h, params) => {
            return h('div', [
              h(
                'img',
                {
                  attrs: {
                    src: params.row.image_href, style: 'width: 40px;height: 30px;border-radius: 2px;'
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
          title: '跳转地址',
          key: 'jump_href',
          tooltip: true,
          minWidth: 100
        },
        {
          title: '状态',
          key: 'status',
          minWidth: 80,
          tooltip: true,
          render: (h, params) => {
            let text = ''
            let color = ''
            if (params.row.status === 1) {
              text = '正常'
              color = '#019beb'
            } else {
              text = '无效'
              color = 'red'
            }
            return h('div', [
              h(
                'span',
                {
                  style: {
                    color: color
                  }
                },
                text
              )
            ])
          }
        },
        {
          title: '操作',
          key: 'action',
          minWidth: 150,
          align: 'center',
          render: (h, params) => {
            let text = ''
            let color = ''
            if (params.row.status === 2) {
              text = '上架'
              color = 'success'
            } else {
              text = '下架'
              color = 'warning'
            }
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
                  type: color,
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.gettes(params.row)
                  }
                }
              }, text),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
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

      title: '',
      type: 1,
      statusList: [
        {
          id: 1,
          name: '上架'
        },
        {
          id: 2,
          name: '下架'
        }
      ],
      formValidate: {
        id: '',
        class_name: ''
      },
      formAalidate: {
        page: 1,
        limit: 10,
        title: '',
        position_id: ''

      },
      projectForm: {
        title: '',
        position_id: '',
        image_href: '',
        jump_href: '',
        status: '',
        sort: ''
      },
      projectform: {
        id: '',
        title: '',
        position_id: '',
        image_href: '',
        jump_href: '',
        status: '',
        sort: ''
      },
      ruleProject: {
        title: [
          { required: true, validator: Fomat.Rules.Verifiy().Required }
        ],
        sort: [
          { required: true, message: '请输入排序位置' }
        ],
        status: [
          { required: true, message: '请选择上架状态', trigger: 'change', type: 'number' }
        ],
        position_id: [
          { required: true, message: '请选择应用位置', trigger: 'change', type: 'number' }
        ],
        jump_href: [
          { required: true, validator: Fomat.Rules.Verifiy().URL }
        ]
      }
    }
  },
  components: {
    Imagen
  },
  watch: {

  },
  methods: {
    seachQ () {
      this.formAalidate.title = ''
      this.formAalidate.position_id = ''
      this.getData(this.formAalidate)
    },
    seachW () {
      this.getData(this.formAalidate)
    },
    openSend () {
      this.modal = true
    },
    handleSubmit (name) {
      this.projectForm.image_href = this.$refs.imgs.imageUrl
      this.$refs[name].validate((valid) => {
        if (valid) {
          addAdvert(this.projectForm).then(res => {
            if (res.data.code === 200) {
              this.$Message.success('添加成功!,请注意查看')
              this.modal = false
              this.handleReset('projectForm')
              this.getData(this.formAalidate)
            } else if (res.data.code === 405) {
              this.$Message.error('添加失败!,请注意查看填写需求')
            }
          })
        } else {
          this.$Message.error('添加失败!,请注意查看填写需求')
        }
      })
    },
    handlesubmit (name) {
      if (this.$refs.imgs2.imageUrl) {
        this.projectform.image_href = this.$refs.imgs2.uploadList3[0].url
      }
      this.$refs[name].validate((valid) => {
        if (valid) {
          putAdvert(this.projectform).then(res => {
            if (res.data.code === 200) {
              this.$Message.success('修改成功!,请注意查看')
              this.modal1 = false
              this.handleReset('projectform')
              this.getData(this.formAalidate)
            }
          })
        } else {
          this.$Message.error('修改失败!,请注意查看填写需求')
        }
      })
    },
    gettes (row) {
      isStatus({ id: row.id, status: row.status === 1 ? 2 : 1 }).then(res => {
        if (res.data.code === 200) {
          this.$Message.success('添加成功!,请注意查看')
          this.getData(this.formAalidate)
        } else if (res.data.code === 405) {
          this.$Message.error('添加失败!,请注意查看填写需求')
        }
      })
    },
    lookdown (row) {
      this.imageUrl = row.image_href
      this.visible = true
    },
    handleReset (name) {
      this.$refs[name].resetFields()
    },
    remove (row) {
      this.$Modal.confirm({
        title: '温馨提示',
        content: '是否确认删除此标签吗？',
        onOk: () => {
          deleteAdvert({ id: row.id }).then(res => {
            if (res.data.code === 200) {
              this.$Message.success('删除成功!')
              this.getData(this.formAalidate)
            }
          })
        }
      })
    },
    put (row) {
      this.modal1 = true
      this.projectform.id = row.id
      getAdvert({ id: row.id }).then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.projectform.title = rep.data.title
          this.projectform.sort = rep.data.sort
          this.projectform.status = rep.data.status
          this.projectform.jump_href = rep.data.jump_href
          this.projectform.position_id = rep.data.position_id
          this.projectform.image_href = rep.data.image_href
          this.$refs.imgs2.uploadList3[0].url = rep.data.image_href
        }
      })
    },
    getData (obj) {
      advertList(obj).then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.data = rep.data.data
        }
      })
    },

    getwData () {
      positionList().then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.formatFile = rep.data.data
        }
      })
    }
  },
  mounted () {
    this.getData(this.formAalidate)
    this.getwData()
  }
}
</script>

<style lang="less">

</style>
