<template>
  <div>
    <Card>
      <p slot="title">后续教育课程包列表</p>
      <div>
        <Button type="default"
                shape="circle"
                icon="md-sync"
                @click="seachQ"></Button>
        <Divider type="vertical" />

        <Select v-model="form.type_id"
                clearable
                style="width:120px; margin-right: 10px;"
                placeholder="标签">
          <Option v-for="item in tagsList"
                  :value="item.id"
                  :key="item.id">{{ item.type_name }}</Option>
        </Select>
        <Select v-model="form.status"
                clearable
                style="width:100px;"
                placeholder="是否有效">
          <Option v-for="item in statusList"
                  :value="item.id"
                  :key="item.id">{{ item.value }}</Option>
        </Select>
        <Divider type="vertical" />
        <Input v-model="form.name"
               clearable
               placeholder="课程包名称"
               style="width: 100px; margin-right: 10px;" />
        <Input v-model="form.id"
               clearable
               placeholder="课程包ID"
               style="width: 80px; margin-right: 10px;" />
        <Button type="primary"
                @click="seach"
                style="margin-right: 10px;">搜索</Button>
        <Button v-if="Auth.top[0]"
                :type='Auth.top[0].menu_type'
                style="margin-right: 10px;"
                @click="addCourse">{{Auth.top[0].menu_title}}</Button>
      </div>
      <Divider />
      <Modal v-model="modal3"
             draggable
             title="课程组建"
             :width="800"
             :footer-hide="true">
        <div>

          <Transfer :titles="['课程ID-课程','已关联课程']"
                    :data="data3"
                    :target-keys="targetKeys3"
                    :list-style="listStyle"
                    :render-format="render3"
                    :operations="['取消关联','设置关联']"
                    @on-change="handleChange3"></Transfer>
        </div>
      </Modal>
      <!-- 课程排序 -->
      <Modal v-model="modal"
             draggable
             scrollable
             title="课程排序"
             :width="800"
             :footer-hide="true">
        <div>
          <Table stripe
                 size="small"
                 :columns="Coomes"
                 :data="MtagsList"></Table>
        </div>
      </Modal>

      <Table stripe
             size="small"
             :columns="columns"
             :data="data"
             @on-selection-change="selectRow"></Table>
      <div style="padding: 20px 0; text-align: right;">
        <Page :total="total"
              @on-change="onChange"
              @on-page-size-change="onPageSizeChange"
              :current="form.page"
              :page-size="form.limit"
              size="small"
              show-total
              show-elevator
              show-sizer />
      </div>
    </Card>
  </div>
</template>

<script>
import { userPageRuleList } from '@/api/Answer';
import {
  eduTypeList,
  eduPackageList,
  statusEduPackage,
  eduContentList,
  courseNoList,
  eduPackageContent,
  EduContentMove,
  delEduPackage,
  eduPackageMove
} from '@/api/Educode';
import { proMjor2tree } from '@/api/Linkmenu';
import { mapMutations } from 'vuex';

export default {
  data() {
    return {
      Row: 1,
      data: [],
      list: [],
      Audit: [],
      total1: 1,
      Row2: '',
      Auth: {
        right: [],
        top: []
      },
      courselist: [],
      modal3: false,
      modal: false,
      valueList3: [],
      valueList4: [],
      MtagsList: [],
      data3: [],
      Aarr: [],
      ListA: [],
      targetKeys3: [],
      listStyle: {
        width: '300px',
        height: '400px'
      },
      knowForm: {
        project_id: '',
        major_id: ''
      },
      tagsList: [],
      total: 0,
      Coomes: [
        {
          title: '课程ID',
          key: 'key',
          minWidth: 80
        },
        {
          title: '课程名称',
          key: 'label',
          minWidth: 80,
          align: 'center',
          tooltip: true
        },

        {
          title: '位置排序',
          key: 'sort',
          minWidth: 150,
          tooltip: true,
          render: (h, params) => {
            return h('div', [
              h('span', {
                style: {
                  marginRight: '10px'
                }
              }),
              h(
                'Button',
                {
                  props: {
                    type: 'dashed',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.up2(params.row)
                    }
                  }
                },
                '上移'
              ),
              h(
                'Button',
                {
                  props: {
                    type: 'dashed',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.down2(params.row)
                    }
                  }
                },
                '下移'
              )
            ])
          }
        }
      ],
      columns: [
        {
          title: '课程包ID',
          key: 'id',
          minWidth: 90,
          align: 'center'
        },
        {
          title: '课程包名称',
          key: 'name',
          minWidth: 140,
          tooltip: true
        },

        {
          title: '分类标签',
          key: 'type_name',
          minWidth: 100,
          tooltip: true
        },
        {
          title: '价格',
          key: 'price',
          minWidth: 90,
          tooltip: true
        },
        {
          title: '创建时间',
          key: 'create_time',
          minWidth: 120,
          tooltip: true
        },
        // {
        //   title: '审核状态',
        //   key: 'audit_status',
        //   minWidth: 80,
        //   tooltip: true,
        //   render: (h, params) => {
        //     let text = '';
        //     let color = '';
        //     if (params.row.audit_status === 1) {
        //       text = '已审核';
        //       color = '#019beb';
        //     } else {
        //       text = '未审核';
        //       color = 'red';
        //     }
        //     return h('div', [
        //       h(
        //         'span',
        //         {
        //           style: {
        //             color: color
        //           }
        //         },
        //         text
        //       )
        //     ])
        //   }
        // },
        {
          title: '状态',
          key: 'status',
          minWidth: 80,
          tooltip: true,
          render: (h, params) => {
            let text = '';
            let color = '';
            if (params.row.status == 1) {
              text = '上架';
              color = '#019beb';
            } else {
              text = '下架';
              color = 'red';
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
          minWidth: 410,
          align: 'center',
          render: (h, params) => {
            let btns = []
            if (this.Auth.right.length > 0) {
              let listBtn = this.Auth.right
              listBtn.forEach(e => {
                let obj = h(
                  'Button',
                  {
                    props: {
                      type: e.menu_type,
                      size: 'small'
                    },
                    style: {
                      marginRight: '5px'
                    },
                    on: {
                      click: () => {
                        this.publicFun(e.key, params.row)
                      }
                    }
                  },
                  e.menu_title
                )
                if (params.row.status == 1) {
                  if (e.key != 'b') btns.push(obj)
                } else {
                  if (e.key != 'g') btns.push(obj)
                }
              })
            }
            return h('div', [...btns])

            // let texts = ''
            // if (params.row.status == 2) {
            //   texts = '上架'
            // } else if (params.row.status == 1) {
            //   texts = '下架'
            // }
            // return h('div', [
            //   h(
            //     'Button',
            //     {
            //       props: {
            //         type: 'success',
            //         size: 'small'

            //       },
            //       style: {
            //         marginRight: '5px'

            //       },
            //       on: {
            //         click: () => {
            //           this.putaway(params.row)
            //         }
            //       }
            //     },
            //     texts
            //   ),

            //   h(
            //     'Button',
            //     {
            //       props: {
            //         type: 'info',
            //         size: 'small'
            //       },
            //       style: {
            //         marginRight: '5px'
            //       },
            //       on: {
            //         click: () => {
            //           this.put(params.row)
            //         }
            //       }
            //     },
            //     '修改'
            //   ),
            //   h(
            //     'Button',
            //     {
            //       props: {
            //         type: 'info',
            //         size: 'small'
            //       },
            //       style: {
            //         marginRight: '5px'
            //       },
            //       on: {
            //         click: () => {
            //           this.addKnow(params.row)
            //         }
            //       }
            //     },
            //     '课程组建'
            //   ),
            //   h(
            //     'Button',
            //     {
            //       props: {
            //         type: 'info',
            //         size: 'small'
            //       },
            //       style: {
            //         marginRight: '5px'
            //       },
            //       on: {
            //         click: () => {
            //           this.Solt(params.row)
            //         }
            //       }
            //     },
            //     '课程排序'
            //   ),
            //   h(
            //     'Button',
            //     {
            //       props: {
            //         type: 'error',
            //         size: 'small'
            //       },
            //       on: {
            //         click: () => {
            //           this.remove(params.row)
            //         }
            //       }
            //     },
            //     '删除'
            //   )
            // ])
          }
        }
      ],
      form: {
        page: 1,
        limit: 10,
        type_id: '',
        name: '',
        id: '',
        status: ''
      },

      statusList: [
        {
          id: '1',
          value: '有效'
        },
        {
          id: '2',
          value: '无效'
        }
      ]
    }
  },
  components: {},
  watch: {
    valueList3(newValue, oldValue) {
      if (newValue.length === 0) {
        this.form.project_id = '';
        this.form.major_id = '';
      } else if (newValue.length === 1) {
        this.form.project_id = newValue[0]
        this.form.major_id = '';
      } else {
        this.form.project_id = newValue[0]
        this.form.major_id = newValue[1]
      }
    },
    valueList4(newValue, oldValue) {
      if (newValue.length === 0) {
        this.knowForm.project_id = '';
        this.knowForm.major_id = '';
      } else if (newValue.length === 1) {
        this.knowForm.project_id = newValue[0]
        this.knowForm.major_id = '';
      } else {
        this.knowForm.project_id = newValue[0]
        this.knowForm.major_id = newValue[1]
      }
    }
  },

  methods: {
    ...mapMutations(['addTag', 'setcourse']),
    seach() {
      this.getData(this.form)
    },
    seachQ() {
      this.form.page = 1
      this.form.limit = 10
      this.form.type_id = '';
      this.form.name = '';
      this.form.id = '';
      this.form.status = '';
      this.getData(this.form)
    },

    addCourse() {
      const route = {
        name: 'addEduPackage',
        meta: {
          title: '添加后续课程包'
        }
      }
      this.addTag({
        route: route,
        type: 'push'
      })
      this.$router.push(route)
    },
    onChange(val) {
      this.form.page = val
      this.getData(this.form)
    },
    onPageSizeChange(val) {
      this.form.limit = val
      this.getData(this.form)
    },

    // id数组
    getTargetKeys() {
      // eduContentList({ package_id: this.Row.id }).then(res => {
      //   if (res.data.code === 200) {
      //     let arr = []
      //     res.data.data.forEach(val => {
      //       console.log(val)
      //       arr.push(val.course_id * 1)
      //     })
      //     console.log(arr)
      //     this.targetKeys3 = arr
      //   }
      // })
    },
    handleChange3(newTargetKeys, direction, moveKeys) {
      let arr = [...this.targetKeys3, ...moveKeys]
      eduPackageContent({
        package_id: this.Row.id,
        course_id: moveKeys.join(','),
        relevant: direction === 'left' ? 2 : 1
      }).then(res => {
        if (res.data.code === 200) {
          if (direction === 'left') {
            this.targetKeys3 = newTargetKeys
          } else {
            this.targetKeys3 = [...new Set(arr)]
          }
        }
      })
    },
    render3(item) {
      return item.key + ' - ' + item.label
    },
    publicFun(key, row) {
      switch (key) {
        case 'b':
          statusEduPackage({
            id: row.id,
            status: row.status === 1 ? 2 : 1
          }).then(res => {
            if (res.data.code === 200) {
              this.$Message.success(res.data.msg)
              this.getData(this.form)
            } else if (res.data.code === 405) {
              this.$Message.warning(res.data.msg)
            }
          })
          break;
        case 'c':
          const route = {
            name: 'putEduPackage',
            meta: {
              title: `${row.id} - 修改课程包`
            },
            query: {
              id: row.id
            }
          }
          this.addTag({
            route: route,
            type: 'push'
          })
          this.$router.push(route)
          break;
        case 'd':
          this.valueList4 = []
          eduContentList({ package_id: row.id }).then(res => {
            let arr = []
            if (res.data.code === 200) {
              res.data.data.forEach(val => {
                arr.push(val.key * 1)
              })
              this.targetKeys3 = arr
            }
          })
          this.Row = row
          this.modal3 = true
          break;
        case 'e':
          this.Row2 = row.id
          eduContentList({ package_id: row.id }).then(res => {
            let rep = res.data
            if (rep.code === 200) {
              this.MtagsList = rep.data
            }
          })
          this.modal = true
          this.modal3 = false
          break;
        case 'f':
          this.$Modal.confirm({
            title: '温馨提示',
            content: '确认删除此课程包吗？',
            onOk: () => {
              delEduPackage({ id: row.id }).then(res => {
                if (res.data.code === 200) {
                  this.$Message.success('删除成功!')
                  this.getData(this.form)
                }
              })
            }
          })
          break;
        case 'g':
          statusEduPackage({
            id: row.id,
            status: row.status === 2 ? 1 : 2
          }).then(res => {
            if (res.data.code === 200) {
              this.$Message.success(res.data.msg)
              this.getData(this.form)
            } else if (res.data.code === 405) {
              this.$Message.warning(res.data.msg)
            }
          })
          break;
        case 'h':
          eduPackageMove({
            id: row.id,
            move_status: 1
          }).then(res => {
            if (res.data.code === 200) {
              this.$Message.success(res.data.msg)
              this.getData(this.form)
            } else if (res.data.code === 405) {
              this.$Message.warning(res.data.msg)
            }
          })
          break;
        case 'i':
          eduPackageMove({
            id: row.id,
            move_status: 2
          }).then(res => {
            if (res.data.code === 200) {
              this.$Message.success(res.data.msg)
              this.getData(this.form)
            } else if (res.data.code === 405) {
              this.$Message.warning(res.data.msg)
            }
          })
          break;
      }
    },

    selectRow(e) {
      this.Audit = e
    },
    // seachKnow() {
    //   courseNoList().then(res => {
    //     if (res.data.code === 200) {
    //       let arr = []
    //       let Arr = []
    //       let Carr = []
    //       res.data.data.forEach(val => {
    //         arr.push(val.key * 1)
    //       })
    //       Arr = [...new Set([...arr, ...this.targetKeys3])]
    //       this.courselist.forEach((item, key) => {
    //         Arr.forEach(e => {
    //           if (item.key === e) {
    //             Carr.push(item)
    //           }
    //         })
    //       })

    //       this.data3 = Carr
    //       this.courselist = []
    //     }
    //   })
    // },

    getforEach() {
      courseNoList().then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.data3 = rep.data
        }
      })
    },

    toSection(row) {
      const route = {
        name: 'section_list',
        meta: {
          title: `${row.id} - 章节列表`
        },
        query: {
          id: row.id
        }
      }
      this.addTag({
        route: route,
        type: 'push'
      })
      this.$router.push(route)
    },

    up2(row) {
      EduContentMove({ id: row.id, move_status: 1 }).then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.$Message.success(rep.msg)
        } else if (rep.code === 405) {
          this.$Message.error(rep.msg)
        }
      })
      this.Usolt()
    },
    down2(row) {
      EduContentMove({ id: row.id, move_status: 2 }).then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.$Message.success(rep.msg)
        } else if (rep.code === 405) {
          this.$Message.error(rep.msg)
        }
      })
      this.Usolt()
    },
    getAuth(name) {
      userPageRuleList({ menu_name: name }).then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.Auth = rep.data
        }
      })
    },

    getData(obj) {
      eduPackageList(obj).then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.data = rep.data.data

          this.total = rep.data.total * 1
        }
      })
    },
    Usolt() {
      eduContentList({ package_id: this.Row2 }).then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.MtagsList = rep.data
        }
      })
    },

    getProMajListA() {
      proMjor2tree().then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.ListA = rep.data
        }
      })
    },
    getList(obj) {
      eduTypeList(obj).then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.tagsList = rep.data
        }
      })
    },
    getProMajList() {
      courseNoList().then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.list = rep.data
        }
      })
    }
  },
  mounted() {
    this.getList({ status: '', type_name: '' })

    this.getProMajList()
    this.getProMajListA()
    this.getforEach()
    this.getData(this.form)
    this.getAuth(this.$route.name)
  },
  destroyed() {
    this.setcourse(this.form)
  }
}
</script>

<style lang="less">
</style>
