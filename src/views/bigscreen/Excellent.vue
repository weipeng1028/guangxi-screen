<template>
  <div class="screen-box">
    <div class="screen-title">
      <div class="screen-bg">
        新媒体优秀作品展示
      </div>
    </div>
    <div class="data-content">
      <div class="top">
        <div class="top-left content-box">
          <div class="title-border">
            <p>优秀视频展示</p>
          </div>
          <div class="content">
                          <p class="video-title">视频名称</p>
              <video :src="data.url" controls="controls">
              </video>
          </div>
        </div>
        <div class="top-right content-box">
          <div class="title-border">
            <p>优秀文章展示</p>
          </div>
          <div class="content">

          </div>
        </div>
      </div>
      <div class="bottom"></div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      data: {
        url: 'http://vjs.zencdn.net/v/oceans.mp4',
        cover_url: '../../assets/images/bigscreen.png'
      }
    }
  },
  components: {
  },
  methods: {
  }
}
</script>
<style lang="css" scoped>
.screen-box {
  width: 100%;
  min-height: calc(100vh);
  margin: 0 auto;
  box-sizing: content-box;
  background: #010e50 url(../../assets/images/bigscreen.png) center top
    no-repeat;
  background-size: 100% auto;
}
.screen-title {
  display: block;
  height: 8rem;
  margin: 0 auto;
}
.screen-bg {
  display: block;
  background: url(../../assets/images/TOP_BG.png) center top no-repeat;
  text-shadow: 3px 3px 3px rgba(0, 0, 0, 0.3);
  text-align: center;
  line-height: 9rem;
  color: #fff;
  font-size: 4rem;
}
.data-content {
  width: 100%;
  height: calc(100vh - 8rem);
  padding: 0 20px 20px 20px;
  box-sizing: border-box;
}
.top {
  height: 50%;
  display: flex;
  justify-content: space-between;
}
.top .content-box {
  width: 49%;
}
.content-box .title-border {
  display: block;
  height: 4rem;
  margin: 0 auto;
}
.title-border p {
  display: block;
  background: url(../../assets/images/title-border.png) center top no-repeat;
  background-size: 20rem 4rem;
  text-align: center;
  line-height: 4rem;
  color: #fff;
  font-size: 2rem;
}
.content {
  width: 100%;
  height: calc(100% - 5rem);
  display: block;
  background: url(../../assets/images/articleBg-All.png) center top no-repeat;
  background-size: 100% 100%;
  overflow: hidden;
  margin-top: 1rem;
  position: relative;
}
.content video{
  width: 98%;
  display: block;
  height: 90%;
  margin: 2% auto;
  outline: none;
}
.video-title{
  font-size: 1.5rem;
  line-height: 5rem;
  color: #fff;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.6);
  width: 98%;
  left: 1%;
  top: 1%;
}
</style>
