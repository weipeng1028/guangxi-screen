<!--
 * @Email: 您选择的账号不在服务区
 * @Author: MaiChao
 * @Date: 2020-06-10 13:50:15
 * @LastEditors: MaiChao
 * @LastEditTime: 2020-08-11 18:36:32
-->
<template>
  <div class="screen-box">
    <div class="box-shadow" v-if="this.message">
    </div>
    <div class="back-hone" v-if="!this.message" @click="backHome">
        <i class="el-icon-back"></i>
      </div>
    <iframe class="show-box" src="http://www.zfrmt.com.cn/ec/webpart/datav/dvLargeScreenAjax.jsp?cpyId=5db418b9-790e-48f6-9bf2-113d19ee6247&parType=statistic&timeType=year"></iframe>
  </div>
</template>
<script>
export default {
  props: ['message'],
  data () {
    return {}
  },
  methods: {
    backHome () {
      this.$router.push({ name: 'dashboard', query: { auth: this.$store.state.user.token } })
    }
  },
  created () {

  }
}
</script>

<style lang="css" scoped>
.screen-box {
  width: 100%;
  min-height: calc(100vh);
  margin: 0 auto;
  box-sizing: content-box;
  background: #010e50 url(../../assets/images/bigscreen.png) center top no-repeat;
  background-size: 100% 100%;
  line-height: 1.15;
  position: relative;
}
.show-box{
  width: 100%;
  min-height: calc(100vh);
}
.box-shadow {
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0);
  position: absolute;
  width: 100%;
  min-height: calc(100vh);
}
.back-hone{
  color: rgba(240, 16, 27, 0.74);
  position: absolute;
  left: 0.5rem;
  top: 0.5rem;
  font-size: 0.5rem;
  cursor: pointer;
}
</style>
