<template>
  <div class="screen-box"
       v-if='jurisdiction'>
    <div class="screen-title">
      <div class="screen-bg">
        新媒体优秀作品展示
      </div>
      <div class="back-hone"
           v-if="!this.message"
           @click="backHome">
        <i class="el-icon-back"></i>
      </div>
    </div>
    <div class="data-content">
      <div class="top">
        <div class="top-left content-box">
          <div class="title-border">
            <p>优秀视频展示</p>
          </div>
          <div class="video-content">
            <div>
              <div class="swiper-container">
                <div class="swiper-wrapper"
                     @mouseenter="stopSwiper"
                     @mouseleave="restSwiper">
                  <div class="swiper-slide slide_item"
                       v-for="(item,i) in images"
                       :key="i">
                    <div class="img-box">
                      <img :src="item.coverUrl" />
                    </div>
                    <img :src="require('@/assets/images/text/autoPlay.png')"
                         @click="routerWeb(item)"
                         class="center-img">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="top-right content-box">
          <div class="title-border">
            <p>优秀文章展示</p>
          </div>
          <div class="content">
            <el-carousel direction="vertical"
                         :interval="5000"
                         :autoplay="true"
                         indicator-position="none"
                         v-if="articleData.length>0">
              <el-carousel-item v-for="(item, index) in articleData"
                                :key="index">
                <div class="article-cont">
                  <div class="article-title"
                       v-html="item.title">
                  </div>
                  <div class="article-text">
                    <img ref="banner"
                         @click="findArticle(item, index)"
                         :src="item.cover"
                         class="bannerImg">
                    {{item.content}}
                  </div>
                </div>
              </el-carousel-item>
            </el-carousel>
            <div v-else
                 class="content-center">
              <p>暂无数据</p>
            </div>
          </div>
        </div>
      </div>
      <div class="bottom">
        <div class="title-border">
          <p>优秀图片展示</p>
        </div>
        <div class="swiper-box"
             ref="element"
             v-if="articleData.length>0">
          <div ref="bannerbox"
               v-for="(item, index) in articleData"
               :key="index"
               class="bannerbox">
            <img ref="banner"
                 @click="findArticle(item, index)"
                 :src="item.cover"
                 class="bannerImg">
          </div>
        </div>
        <div v-else
             class="content-center">
          <p>暂无数据</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'
export default {
  props: ['message'],
  data () {
    return {
      jurisdiction: false,
      animateRank: false,
      intNumRank: undefined,
      videoData: {
        url: 'http://vjs.zencdn.net/v/oceans.mp4',
        cover_url: require('@/assets/images/text/401147252.png')
      },
      images: [],
      articleData: [],
      bannerImgLst: [],
      mySwiper: {}
    }
  },
  methods: {
    // 返回登录
    banckLogin () {
      setTimeout(function () {
        let url = window.g.login
        window.open(url, '_self')
      }, 2000)
    },
    backHome () {
      this.$router.push({ name: 'dashboard', query: { auth: this.$store.state.user.token } })
    },
    stopSwiper () {
      this.mySwiper.stopAutoplay()
    },
    restSwiper () {
      this.mySwiper.startAutoplay()
    },
    startSwiper () {
      this.mySwiper = new Swiper('.swiper-container', {
        initialSlide: 0,
        loop: true,
        speed: 2000,
        slidesPerView: 3,
        spaceBetween: 0,
        observer: true,
        observeParents: true,
        paginationClickable: true,
        grabCursor: true, // 设置为true时，鼠标覆盖Swiper时指针会变成手掌形状，拖动时指针会变成抓手形状。
        autoplay: {
          delay: 3000, // 自动切换延时
          stopOnLastSlide: false, // 如果设置为true，当切换到最后一个slide时停止自动切换。（loop模式下无效）。
          disableOnInteraction: false // 用户操作swiper之后，是否禁止autoplay。默认为true：停止。
        },
        keyboard: true, // 键盘切换
        // 如果需要分页器
        pagination: {
          el: '.swiper-pagination',
          clickable: true // 此参数设置为true时，点击分页器的指示点分页器会控制Swiper切换。
        },
        // 如果需要前进后退按钮
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      })
    },
    // 获取优秀视频
    getVideo () {
      this.$http.get(this.$api.displayExcellentWorks)
        .then(res => {
          if (res.data.data) {
            this.images = res.data.data
          }
        })
        .catch(() => {
        })
    },
    // 获取优秀文章图片
    getArticle () {
      this.$http.get(this.$api.excellentArticles)
        .then(res => {
          if (res.data.data) {
            this.articleData = res.data.data
            // this.articleData.forEach(item => {
            //   if (item.content.length > 450) {
            //     item.content = item.content.substring(0, 495) + '...'
            //   }
            // })
          }
        })
        .catch(() => {
        })
    },
    findArticle (item, index) {
      window.open(item.url, '_blank')
    },
    // 点击跳转
    routerWeb (item) {
      // window.location.href = item.video_url
      window.open(item.videoUrl, '_blank')
    }
  },
  created () {
    this.tokens = this.$route.query.auth
    if (this.tokens) {
      this.$store.commit('user/userToken', this.tokens)
      this.$http.get(this.$api.bigScreen)
        .then(res => {
          if (res.data.code === 200) {
            this.jurisdiction = true
            this.getVideo()
            this.getArticle()
          }
        })
        .catch(() => {
          this.banckLogin()
        })
    } else {
      this.banckLogin()
    }
    var oMeta = document.createElement('meta')
    oMeta.name = 'referrer'
    oMeta.content = 'never'
    document.getElementsByTagName('head')[0].appendChild(oMeta)
  },
  mounted () {
    if (this.tokens) {
      this.startSwiper()
    } else {
      this.banckLogin()
    }
  }
}
</script>
<style lang="scss">
@import './screen';
</style>
<style lang="css" scoped>
.screen-box {
  width: 100%;
  min-height: calc(100vh);
  margin: 0 auto;
  box-sizing: content-box;
  background: #010e50 url(../../assets/images/bigscreen.png) center top
    no-repeat;
  background-size: 100% 100%;
  line-height: 1.15;
}
.screen-title {
  display: block;
  height: 1.8rem;
  margin: 0 auto;
}
.screen-bg {
  display: block;
  background: url(../../assets/images/TOP_BG.png) center top no-repeat;
  background-size: 50% 2rem;
  text-shadow: 3px 3px 3px rgba(0, 0, 0, 0.3);
  text-align: center;
  line-height: 2rem;
  color: #fff;
  font-size: 0.9rem;
}
.data-content {
  width: 100%;
  height: calc(100vh - 1.8rem);
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
  height: 0.8rem;
  margin: 0 auto;
  margin-bottom: 0.22rem;
}
.title-border p {
  display: block;
  background: url(../../assets/images/title-border.png) center top no-repeat;
  background-size: 4.44rem 0.8rem;
  text-align: center;
  line-height: 0.8rem;
  color: #fff;
  font-size: 0.44rem;
}
.content {
  width: 100%;
  height: calc(100% - 1.11rem);
  display: block;
  background: url(../../assets/images/articleBg-All.png) center top no-repeat;
  background-size: 100% 100%;
  overflow: hidden;
  position: relative;
}
.content-carousel {
  width: 66%;
}
.content .el-carousel {
  height: 100%;

  margin: 0 auto;
}
.content video {
  width: 98%;
  display: block;
  height: 96%;
  margin: 2% auto;
  outline: none;
}
.video-title {
  font-size: 0.33rem;
  line-height: 1.11rem;
  color: #fff;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.6);
  width: 98%;
  left: 1%;
  top: 1%;
  z-index: 9999;
}
.swiper-box {
  height: calc(100% - 1.33rem);
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
  margin-top: 0.22rem;
}
.bannerbox {
  min-width: 25%;
  height: 100%;
  margin-right: 10px;
  animation: 50s wordsLoop linear infinite normal;
}
.bannerImg {
  width: 100%;
  height: 100%;
  cursor: pointer;
}
@keyframes wordsLoop {
  0% {
    transform: translateX(300%);
    -webkit-transform: translateX(300%);
  }
  25% {
    transform: translateX(0);
    -webkit-transform: translateX(0);
  }
  50% {
    transform: translateX(-300%);
    -webkit-transform: translateX(-300%);
  }
  75% {
    transform: translateX(0);
    -webkit-transform: translateX(0);
  }
  100% {
    transform: translateX(300%);
    -webkit-transform: translateX(300%);
  }
}
.article-cont {
  height: 100%;
  overflow: hidden;
  padding: 0.28rem;
  word-break: break-all;
  font-size: 0.28rem;
  text-indent: 0.44rem;
  line-height: 0.375rem;
  box-sizing: border-box;
  color: #fff;
}
.article-cont .bannerImg {
  width: 25%;
  height: 25%;
  float: left;
  margin: 0 0.14rem 0.14rem 0;
}
.article-title {
  text-align: center;
  font-size: 0.444rem;
  line-height: 1.5;
  margin-bottom: 0.08rem;
}
.article-text {
  font-size: 0.33rem;
  letter-spacing: 0.05rem;
  line-height: 1.4;
}
/**视频 */
.video-content {
  width: 100%;
  height: calc(100% - 1.11rem);
  display: block;
  background: url(../../assets/images/articleBg-All.png) center top no-repeat;
  background-size: 100% 100%;
  overflow: hidden;
  position: relative;
  padding: 1%;
  box-sizing: border-box;
}
.swiper-container {
  height: 100%;
}
.swiper-slide {
  height: 100%;
}
.swiper-slide .img-box {
  height: 100%;
  max-width: 90%;
  display: block;
  margin: 0 auto;
}
.swiper-slide .img-box img {
  width: 100%;
  height: 100%;
}
.center-img {
  width: 20%;
  position: absolute;
  left: 40%;
  top: 40%;
}
.back-hone {
  color: rgba(240, 16, 27, 0.74);
  position: absolute;
  left: 0.5rem;
  top: 0.5rem;
  font-size: 0.5rem;
  cursor: pointer;
}
.content-center {
  display: flex;
  color: #fff;
  width: 100%;
  height: 100%;
  text-align: center;
}
.content-center p {
  width: 100%;
  font-size: 0.33rem;
  align-self: center;
}
</style>
