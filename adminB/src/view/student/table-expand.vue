<style scoped>
  .expand-row{
    margin-bottom: 16px;
  }
</style>

<template>
  <div>
    <Row class="expand-row">
      <Col span="8">
        <span class="expand-key">创建时间: </span>
        <span class="expand-value">{{ row.created }}</span>
      </Col>
      <Col span="8">
        <span class="expand-key">最后登录时间: </span>
        <span class="expand-value">{{ row.last_login }}</span>
      </Col>
      <Col span="8">
        <span class="expand-key">来源: </span>
        <span class="expand-value">{{ row.from == 1 ? 'pc注册' : 'app注册' }}</span>
      </Col>
    </Row>
    <Row>
      <Col span="8">
        <span class="expand-key">冻结（截止时间）: </span>
        <span class="expand-value">{{ row.stop_time ? row.stop_time : '账号正常' }}</span>
      </Col>
      <Col span="8">
        <span class="expand-key">毕业时间: </span>
        <span class="expand-value">{{ row.finishtime ? row.finishtime : '没有毕业' }}</span>
      </Col>
      <Col span="8">
        <span class="expand-key">学员类型: </span>
        <span class="expand-value">{{ row.type == 1  ? '网络学员' : '面授学员' && row.type == null? '' : ''}}</span>
      </Col>
    </Row>
  </div>
</template>

<script>
export default {
  props: {
    row: Object
  }
}
</script>
