<template>
  <div>
    <Card>
        <p slot="title">积分商品列表</p>
  <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <Row>
          <Col :span="12">
           <FormItem label="商品名称" prop="name">
              <Input v-model="formValidate.name" placeholder="商品名称"></Input>
              <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：输入积分商品名称</p>
            </FormItem>
          </Col>
           <Col :span="12">
            <FormItem label="商品类型" prop="type">
              <Select v-model="formValidate.type" clearable placeholder="商品类型">
                <Option v-for="item in tensList" :value="item.id" :key="item.id">{{ item.name }}</Option>
              </Select>
              <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：选择商品类型</p>
            </FormItem>
             </Col>
           </Row>
            <Row v-if="vasabl">
           <Col :span="12">
            <FormItem label="课程包id" prop="type_id">
              <Select v-model="formValidate.type_id" clearable placeholder="商品类型">
                <Option v-for="item in courseData" :value="item.id" :key="item.id">{{ item.name }}</Option>
              </Select>
              <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：选择商品类型</p>
            </FormItem>
             </Col>
           </Row>
         <div v-if="vasable">
           <Row>
              <Col :span="12">
            <FormItem label="优惠卷id" prop="type_id">
              <Select v-model="formValidate.type_id" clearable placeholder="优惠卷id">
                <Option v-for="item in youData" :value="item.id" :key="item.id">{{ item.name }}</Option>
              </Select>
              <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：选择优惠卷id</p>
            </FormItem>
             </Col>
            <Col :span="12">
               <FormItem label="结束时间" prop="end_time">
              <DatePicker type="date" placeholder="结束时间" v-model="formValidate.end_time" @on-change="handleChange"></DatePicker>
              <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：输入结束时间</p>
            </FormItem>
             </Col>
             </Row>
            <Row>
                <Col :span="12">
             <FormItem label="适用范围" prop="range">
              <Select v-model="formValidate.range" clearable placeholder="适用范围">
                <Option v-for="item in ranges" :value="item.id" :key="item.id">{{ item.name }}</Option>
              </Select>
              <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：选择适用范围</p>
            </FormItem>
             </Col>
            </Row>
            </div>
              <Row>
              <Col :span="12">
            <FormItem label="商品价格" prop="integral_price">
              <Input v-model="formValidate.integral_price" placeholder="商品名称"></Input>
              <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：输入商品价格</p>
            </FormItem>
             </Col>
            <Col :span="12">
               <FormItem label="商品数量" prop="number">
              <Input v-model="formValidate.number" placeholder="商品数量"></Input>
              <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：输入商品数量</p>
            </FormItem>
             </Col>
             </Row>
             <Row>
               <Col :span="12">
            <FormItem label="是否上架" prop="status">
              <Select v-model="formValidate.status" clearable placeholder="是否上架">
                <Option v-for="item in tatlist" :value="item.id" :key="item.id">{{ item.name }}</Option>
              </Select>
              <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：选择是否上架</p>
            </FormItem>
             </Col>

              </Row>
              <Row>
              <Images ref="imgs" />
              </Row>
              <Row>
                 <Col>
            <FormItem label="商品简介" prop="introduce">
                <Input type="textarea" v-model="formValidate.introduce" rows="4" placeholder="商品简介"></Input>
              <p style="padding-top: 8px; font-size: 12px; color: #999; line-height: normal;">提示：选择商品简介</p>
            </FormItem>
             </Col>
              </Row>
            <FormItem>
              <div style="text-align: center;">
                <Button @click="handleReset('formValidate')">重置</Button>
                <Button type="primary" @click="handleSubmit('formValidate')" style="margin-left: 8px">提 交</Button>
              </div>
            </FormItem>
          </Form>
    </Card>
  </div>
</template>
<script>
import { addGoods } from '@/api/info'
import { couponList } from '@/api/Coupon'
import { packageList } from '@/api/course'

import Images from '../components/video/imagens'
import Fomat from '@/libs/fomat'
export default {
  components: {
    Images
  },
  data () {
    return {
      formValidate: {
        name: '',
        type: '',
        image: '',
        status: '',
        introduce: '',
        integral_price: '',
        number: '',
        type_id: '',
        end_time: '',
        range: ''
      },

      youData: [],
      courseData: [],
      vasabl: false,
      vasable: false,
      tatlist: [{ id: 1, name: '上架' }, { id: 2, name: '下架' }],
      tensList: [{ id: 1, name: '实物物品' }, { id: 2, name: '课程' }, { id: 3, name: '优惠卷' }],
      ranges: [{ id: 1, name: '课程' }, { id: 1, name: '直播' }, { id: 3, name: '全部' }],
      ruleValidate: {
        name: [
          { required: true, validator: Fomat.Rules.Verifiy().Required }
        ],
        image: [
          { required: true, validator: Fomat.Rules.Verifiy().Required }
        ],
        type: [
          { required: true, validator: Fomat.Rules.Verifiy().Required }
        ],
        status: [
          { required: true, validator: Fomat.Rules.Verifiy().Required }
        ],
        introduce: [
          { required: true, validator: Fomat.Rules.Verifiy().Required }
        ],
        integral_price: [
          { required: true, validator: Fomat.Rules.Verifiy().Bnum }
        ],
        number: [
          { required: true, validator: Fomat.Rules.Verifiy().Bnum }
        ],
        type_id: [
          { required: true, validator: Fomat.Rules.Verifiy().Required }
        ],
        end_time: [
          { required: true, validator: Fomat.Rules.Verifiy().Required, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleSubmit (name) {
      this.formValidate.image = this.$refs.imgs.imageUrl
      this.$refs[name].validate((valid) => {
        if (valid) {
          addGoods(this.formValidate).then(res => {
            if (res.data.code === 200) {
              this.$Message.success('添加成功!')
              this.handleReset(name)
              this.$router.push({ name: 'IntegralTowTypeList' })
            }
          })
        } else {
          this.$Message.error('请认真填写后再提交!')
        }
      })
    },
    handleReset (name) {
      this.$refs[name].resetFields()
    },
    handleChange (date) {
      this.formValidate.end_time = date
    },
    getCoursedata () {
      packageList({ limit: 1000, page: 1 }).then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.courseData = rep.data.data
        }
      })
    }
  },
  mounted () {
    couponList().then(res => {
      let rep = res.data
      if (rep.code === 200) {
        this.youData = rep.data
      }
    })
    this.getCoursedata()
  },
  watch: {
    'formValidate.type' (newold) {
      if (newold === 1) {
        this.vasabl = false
        this.vasable = false
        this.formValidate.end_time = ''
        this.formValidate.range = ''
      } else if (newold === 3) {
        this.vasable = true
        this.vasabl = false
      } else {
        this.vasabl = true
        this.vasable = false
        this.formValidate.end_time = ''
        this.formValidate.range = ''
      }
    }
  }
}
</script>
