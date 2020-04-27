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
          <div class="content"
               @mouseenter="EnterCont"
               @mouseleave="LeaveCont">
            <p class="video-title"
               v-if="this.showShadow">视频名称</p>
            <video :src="data.url"
                   controls="controls">
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
      <div class="bottom">
        <div class="title-border">
          <p>优秀图片展示</p>
        </div>
        <div class="swiper-box"
             ref="element">
          <!-- <el-carousel trigger="click" type="card"
                        indicator-position="none"
                       :height="bannerH +'px'">
            <el-carousel-item v-for="(item,index) in bannerImgLst"
                              :key="index">
              <img :src="item"
                   class="bannerImg">
            </el-carousel-item>
          </el-carousel> -->
          <div ref="bannerbox" v-for="(item, index) in bannerImgLst"
               :key="index"
               class="bannerbox">
            <img ref="banner"
                 :src="item"
                 class="bannerImg">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      showShadow: false,
      bannerH: 200,
      swiperOption: {
        debugger: true,
        // 显示分页
        pagination: {
          el: '.swiper-pagination'
        },
        // 设置点击箭头
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        // 自动轮播
        autoplay: {
          delay: 2000,
          // 当用户滑动图片后继续自动轮播
          disableOnInteraction: false
        },
        // 同时展示个数
        slidesPerView: 1,
        spaceBetween: 10,
        // 滑动方向

        direction: 'horizontal',

        // 小手掌抓取滑动

        grabCursor: true,

        // 开启循环模式
        loop: true
      },
      data: {
        url: 'http://vjs.zencdn.net/v/oceans.mp4',
        cover_url: '../../assets/images/bigscreen.png'
      },
      bannerImgLst: [
        require('@/assets/images/text/401147252.png'),
        require('@/assets/images/text/500327078.png'),
        require('@/assets/images/text/501002026.png'),
        require('@/assets/images/text/401147252.png'),
        require('@/assets/images/text/500327078.png'),
        require('@/assets/images/text/501002026.png')
      ]
    }
  },
  methods: {
    EnterCont () {
      this.showShadow = true
    },
    LeaveCont () {
      this.showShadow = false
    },
    // 动态设置轮播图高度
    setBannerH () {
      this.bannerH = this.$refs.element.offsetHeight
      this.$refs.banner.forEach(item => {
        item.style.height = this.bannerH + 'px'
        item.style.width = '100%'
      })
      this.$refs.bannerbox.forEach(item => {
        item.style.height = this.bannerH + 'px'
        item.style.width = '50%'
      })
    }
  },
  mounted () {
    this.setBannerH()
    window.addEventListener('resize', () => {
      this.setBannerH()
    }, false)
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
.title-border {
  display: block;
  height: 4rem;
  margin: 0 auto;
  margin-bottom: 1rem;
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
  position: relative;
}
.content video {
  width: 98%;
  display: block;
  height: 90%;
  margin: 2% auto;
  outline: none;
}
.video-title {
  font-size: 1.5rem;
  line-height: 5rem;
  color: #fff;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.6);
  width: 98%;
  left: 1%;
  top: 1%;
}
.swiper-box {
  height: calc(100% - 6rem);
  width: 100%;
  display: flex;
  justify-content: space-around;
  overflow: hidden;
  /* background: url(../../assets/images/articleBg-All.png) center top no-repeat;
  background-size: 100% 100%; */
}
.bottom {
  height: 50%;
}
.bottom .title-border {
  margin-top: 1rem;
}
.bannerbox {
  min-width: 25%;
  height: 100%;
  margin-right: 10px;
  animation: 15s wordsLoop linear infinite normal;
}
@keyframes wordsLoop {
  0% {
    transform: translateX(100%);
    -webkit-transform: translateX(100%);
  }
  25%{
    transform: translateX(0);
    -webkit-transform: translateX(0);
  }
  50%{
    transform: translateX(-100%);
    -webkit-transform: translateX(-100%);
  }
  75%{
    transform: translateX(0);
    -webkit-transform: translateX(0);
  }
  100% {
    transform: translateX(100%);
    -webkit-transform: translateX(100%);
  }
}
/* @-webkit-keyframes wordsLoop {
  0% {
    transform: translateX(100%);
    -webkit-transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
    -webkit-transform: translateX(-100%);
  }
} */
</style>
