<template>
  <div>
    <Card style="width:800px">
      <Tabs type="card"
            v-model="name"
            @on-click="tagChange"
            :animated="false">
        <TabPane label="安卓APK信息"
                 name="alipay">
          <Row style="margin-top: 20px;">
            <Row style="border: 1px solid #ccc;">
              <Row style="border-bottom: 1px solid #ccc; text-align: center;">
                <Col :span="12"
                     class="box"
                     style="line-height: 42px;"><strong>名称</strong></Col>
                <Col :span="12"
                     class="box"
                     style="border-left: 1px solid #ccc;line-height: 42px"><strong>内容</strong></Col>
              </Row>
              <Row style="border-bottom: 1px solid #ccc; text-align: center;">
                <Col :span="12"
                     class="box"
                     style="line-height: 42px;">APK名称</Col>
                <Col :span="12"
                     class="box"
                     style="border-left: 1px solid #ccc;line-height: 42px">
                <Input v-model="APKlist.apk_name"
                       placeholder="APK名称"></Input>
                </Col>
              </Row>
              <Row style="border-bottom: 1px solid #ccc; text-align: center;">
                <Col :span="12"
                     class="box"
                     style="line-height: 42px;">版本名称</Col>
                <Col :span="12"
                     class="box"
                     style="border-left: 1px solid #ccc;line-height: 42px">
                <Input v-model="APKlist.versionname"
                       placeholder="版本名称"></Input>
                </Col>
              </Row>
              <Row style="border-bottom: 1px solid #ccc; text-align: center;">
                <Col :span="12"
                     class="box"
                     style="line-height: 42px;">版本号</Col>
                <Col :span="12"
                     class="box"
                     style="border-left: 1px solid #ccc;line-height: 42px">
                <Input v-model="APKlist.versioncode"
                       placeholder="版本号"></Input>
                </Col>
              </Row>
              <Row style="border-bottom: 1px solid #ccc; text-align: center;">
                <Col :span="12"
                     class="box"
                     style="line-height: 42px;">版本大小</Col>
                <Col :span="12"
                     class="box"
                     style="border-left: 1px solid #ccc;line-height: 42px">
                <Input v-model="APKlist.apksize"
                       placeholder="版本大小"></Input>
                </Col>
              </Row>

              <Row style="border-bottom: 1px solid #ccc; text-align: center;">
                <Col :span="12"
                     class="box"
                     style="line-height: 42px;">下载地址</Col>
                <Col :span="12"
                     class="box"
                     style="border-left: 1px solid #ccc;line-height: 42px">
                <Input v-model="APKlist.downloadurl"
                       search
                       enter-button="上传文件"
                       @on-search="ADDapp"
                       placeholder="下载地址"></Input>
                </Col>
              </Row>
              <Row style="border-bottom: 1px solid #ccc; text-align: center;">
                <Col :span="12"
                     class="box"
                     style="line-height: 42px;">更新内容</Col>
                <Col :span="12"
                     class="box"
                     style="border-left: 1px solid #ccc;line-height: 42px">
                <Input type="textarea"
                       v-model="APKlist.modifycontent"
                       :row="3"
                       placeholder="更新内容"></Input>
                </Col>
              </Row>
              <Row style="border-bottom: 1px solid #ccc; text-align: center;">
                <Col :span="12"
                     class="box"
                     style="line-height: 42px;">是否强制更新</Col>
                <Col :span="12"
                     class="box"
                     style="border-left: 1px solid #ccc;line-height: 42px">
                <Select v-model="APKlist.updatestatus"
                        placeholder="是否强制更新">
                  <Option v-for="(val, index) in packList"
                          :key="index"
                          :value="val.id">{{ val.name }}</Option>
                </Select>
                </Col>
              </Row>
              <Row style="border-bottom: 1px solid #ccc; text-align: center;">
                <Col :span="12"
                     class="box"
                     style="line-height: 42px;">apk 是否完整</Col>
                <Col :span="12"
                     class="box"
                     style="border-left: 1px solid #ccc;line-height: 42px">
                <Input v-model="APKlist.apkmd5"
                       placeholder="apk 是否完整"></Input>
                </Col>
              </Row>
            </Row>
            <Row style="margin-top: 20px;text-align: center;">
              <Button type="primary"
                      @click="put">修 改</Button>
            </Row>
          </Row>
        </TabPane>
        <Modal v-model="modal1"
               title="上传安卓文件">
          <Upload type="drag"
                  :headers="tookens"
                  name="apk"
                  :on-success="handleSuccess"
                  :on-format-error="handleFormatError"
                  :action="baseurl">
            <div style="padding: 20px 0">
              <Icon type="ios-cloud-upload"
                    size="52"
                    style="color: #3399ff"></Icon>
              <p>点击上传或拖拽上传</p>
            </div>
          </Upload>
        </Modal>
        <TabPane label="苹果APK信息"
                 name="apple">
          <Row style="margin-top: 20px;">
            <Row style="border: 1px solid #ccc;">
              <Row style="border-bottom: 1px solid #ccc; text-align: center;">
                <Col :span="12"
                     class="box"
                     style="line-height: 42px;"><strong>名称</strong></Col>
                <Col :span="12"
                     class="box"
                     style="border-left: 1px solid #ccc;line-height: 42px"><strong>内容</strong></Col>
              </Row>
              <Row style="border-bottom: 1px solid #ccc; text-align: center;">
                <Col :span="12"
                     class="box"
                     style="line-height: 42px;">APK名称</Col>
                <Col :span="12"
                     class="box"
                     style="border-left: 1px solid #ccc;line-height: 42px">
                <Input v-model="APKlist1.apk_name"
                       placeholder="APK名称"></Input>
                </Col>
              </Row>
              <Row style="border-bottom: 1px solid #ccc; text-align: center;">
                <Col :span="12"
                     class="box"
                     style="line-height: 42px;">版本名称</Col>
                <Col :span="12"
                     class="box"
                     style="border-left: 1px solid #ccc;line-height: 42px">
                <Input v-model="APKlist1.versionname"
                       placeholder="版本名称"></Input>
                </Col>
              </Row>
              <Row style="border-bottom: 1px solid #ccc; text-align: center;">
                <Col :span="12"
                     class="box"
                     style="line-height: 42px;">版本号</Col>
                <Col :span="12"
                     class="box"
                     style="border-left: 1px solid #ccc;line-height: 42px">
                <Input v-model="APKlist1.versioncode"
                       placeholder="版本号"></Input>
                </Col>
              </Row>
              <Row style="border-bottom: 1px solid #ccc; text-align: center;">
                <Col :span="12"
                     class="box"
                     style="line-height: 42px;">版本大小</Col>
                <Col :span="12"
                     class="box"
                     style="border-left: 1px solid #ccc;line-height: 42px">
                <Input v-model="APKlist1.apksize"
                       placeholder="版本大小"></Input>
                </Col>
              </Row>

              <Row style="border-bottom: 1px solid #ccc; text-align: center;">
                <Col :span="12"
                     class="box"
                     style="line-height: 42px;">下载地址</Col>
                <Col :span="12"
                     class="box"
                     style="border-left: 1px solid #ccc;line-height: 42px">
                <Input v-model="APKlist1.downloadurl"
                       placeholder="下载地址"></Input>
                </Col>
              </Row>
              <Row style="border-bottom: 1px solid #ccc; text-align: center;">
                <Col :span="12"
                     class="box"
                     style="line-height: 42px;">更新内容</Col>
                <Col :span="12"
                     class="box"
                     style="border-left: 1px solid #ccc;line-height: 42px">
                <Input type="textarea"
                       :row="3"
                       v-model="APKlist1.modifycontent"
                       placeholder="更新内容"></Input>
                </Col>
              </Row>
              <Row style="border-bottom: 1px solid #ccc; text-align: center;">
                <Col :span="12"
                     class="box"
                     style="line-height: 42px;">是否强制更新</Col>
                <Col :span="12"
                     class="box"
                     style="border-left: 1px solid #ccc;line-height: 42px">
                <Select v-model="APKlist1.updatestatus"
                        placeholder="是否强制更新">
                  <Option v-for="(val, index) in packList"
                          :key="index"
                          :value="val.id">{{ val.name }}</Option>
                </Select>
                </Col>
              </Row>
              <Row style="border-bottom: 1px solid #ccc; text-align: center;">
                <Col :span="12"
                     class="box"
                     style="line-height: 42px;">apk 是否完整</Col>
                <Col :span="12"
                     class="box"
                     style="border-left: 1px solid #ccc;line-height: 42px">
                <Input v-model="APKlist1.apkmd5"
                       placeholder="apk 是否完整"></Input>
                </Col>
              </Row>
            </Row>
            <Row style="margin-top: 20px;text-align: center;">
              <Button type="success"
                      @click="Aput">修 改</Button>
            </Row>
          </Row>
        </TabPane>
      </Tabs>
    </Card>
  </div>
</template>
<script>
import { putApk, apkList } from '@/api/info';
import { getToken } from '@/libs/util';
import config from '@/config';
export default {
  data() {
    return {
      tookens: {
        token: getToken()
      },
      baseurl: '',
      name: 'alipay',
      modal1: false,
      APKlist: {
        id: '',
        apk_name: '',
        versionname: '',
        versioncode: '',
        apksize: '',
        downloadurl: '',
        modifycontent: '',
        updatestatus: '',
        apkmd5: ''
      },
      APKlist1: {
        id: '',
        apk_name: '',
        versionname: '',
        versioncode: '',
        apksize: '',
        downloadurl: '',
        modifycontent: '',
        updatestatus: '',
        apkmd5: ''
      },
      packList: [
        {
          id: 1,
          name: '正常更新'
        },
        {
          id: 2,
          name: '强制更新'
        }
      ]
    }
  },

  methods: {
    tagChange(name) {},
    put() {
      putApk(this.APKlist).then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.$Message.success('操作成功，请核对信息')
        } else if (rep.code === 405) {
          this.$Message.error('操作失败，请检查填写信息是否符合规范')
        }
      })
    },
    Aput() {
      putApk(this.APKlist1).then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.$Message.success('操作成功，请核对信息')
        } else if (rep.code === 405) {
          this.$Message.error('操作失败，请检查填写信息是否符合规范')
        }
      })
    },
    handleFormatError(file) {
      this.$Message.warning(
        '文件名' + file.name + ' 不是apk格式的文件，请重新上传'
      )
    },
    handleSuccess(res, file) {
      if (res.code === 200) {
        this.$Message.success('文件名' + file.name + ' 上传成功！')
        this.APKlist.downloadurl = res.data.downloadurl
        this.modal1 = false
      }
    },
    ADDapp() {
      this.modal1 = true
    },
    getData() {
      apkList().then(res => {
        let rep = res.data
        if (rep.code === 200) {
          this.APKlist.id = rep.data[0].id
          this.APKlist.apk_name = rep.data[0].apk_name
          this.APKlist.versionname = rep.data[0].versionname
          this.APKlist.versioncode = rep.data[0].versioncode
          this.APKlist.apksize = rep.data[0].apksize
          this.APKlist.downloadurl = rep.data[0].downloadurl
          this.APKlist.modifycontent = rep.data[0].modifycontent
          this.APKlist.updatestatus = rep.data[0].updatestatus
          this.APKlist.apkmd5 = rep.data[0].apkmd5

          this.APKlist1.id = rep.data[1].id
          this.APKlist1.apk_name = rep.data[1].apk_name
          this.APKlist1.versionname = rep.data[1].versionname
          this.APKlist1.versioncode = rep.data[1].versioncode
          this.APKlist1.apksize = rep.data[1].apksize
          this.APKlist1.downloadurl = rep.data[1].downloadurl
          this.APKlist1.modifycontent = rep.data[1].modifycontent
          this.APKlist1.updatestatus = rep.data[1].updatestatus
          this.APKlist1.apkmd5 = rep.data[1].apkmd5
        }
      })
    }
  },
  mounted() {
    this.getData()
    if (process.env.NODE_ENV === 'production') {
      switch (document.domain) {
        case 'dests.youcaiwx.cn':
          this.baseurl = `${config.baseUrl.test}/admin/System/apkUpload`
          break;
        case 'ycdb.youcaiwx.cn':
          this.baseurl = `${config.baseUrl.pro}/admin/System/apkUpload`
          break;
        default:
          this.baseurl = '/admin/System/apkUpload';
          break
      }
    } else {
      this.baseurl = '/admin/System/apkUpload';
    }
  }
}
</script>
