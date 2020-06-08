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
            <el-carousel trigger="click" :autoplay="false" indicator-position="none">
              <el-carousel-item v-for="item in 4" :key="item">
                <video controls="controls" :poster="videoData.cover_url">
                    <source :src="videoData.url" type="video/mp4">
                </video>
              </el-carousel-item>
            </el-carousel>
          </div>
        </div>
        <div class="top-right content-box">
          <div class="title-border">
            <p>优秀文章展示</p>
          </div>
          <div class="content">
            <el-carousel  direction="vertical" :autoplay="true" indicator-position="none">
              <el-carousel-item v-for="(item, index) in articleData" :key="index">
                <div class="article-cont">
                  <div class="article-title" v-html="item.title">
                  </div>
                  <div>
                    <img ref="banner" @click="findArticle(item, index)"
                 :src="item.cover"
                 class="bannerImg">
                  {{item.content}}
                  </div>

                </div>
              </el-carousel-item>
            </el-carousel>
          </div>
        </div>
      </div>
      <div class="bottom">
        <div class="title-border">
          <p>优秀图片展示</p>
        </div>
        <div class="swiper-box"
             ref="element">
          <div ref="bannerbox" v-for="(item, index) in articleData"
               :key="index"
               class="bannerbox">
            <img ref="banner" @click="findArticle(item, index)"
                 :src="item.cover"
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
      videoData: {
        url: 'http://vjs.zencdn.net/v/oceans.mp4',
        cover_url: require('@/assets/images/text/401147252.png')
      },
      articleData: [],
      bannerImgLst: []
    }
  },
  methods: {
    EnterCont () {
      this.showShadow = true
    },
    LeaveCont () {
      this.showShadow = false
    },
    // 获取优秀视频
    getVideo () {
      this.$http.get(this.$api.displayExcellentWorks)
        .then(res => {
          if (res.data.data) {
            // console.log(res.data.data)
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
          }
        })
        .catch(() => {
        })
    },
    findArticle (item, index) {
      console.log(item)
    }
    // 动态设置轮播图高度
    // setBannerH () {
    //   this.bannerH = this.$refs.element.offsetHeight
    //    this.$refs.banner.forEach(item => {
    //      item.style.height = this.bannerH + 'px'
    //      item.style.width = '100%'
    //    })
    //   console.log(this.$refs.bannerbox)
    //   this.$refs.bannerbox.forEach(item => {
    //      item.style.height = this.bannerH + 'px'
    //      item.style.width = '50%'
    //    })
    // }
  },
  created () {
    var oMeta = document.createElement('meta')
    oMeta.name = 'referrer'
    oMeta.content = 'never'
    document.getElementsByTagName('head')[0].appendChild(oMeta)
    this.getVideo()
    this.getArticle()
  }
  // mounted () {
  //   this.setBannerH()
  //   window.addEventListener('resize', () => {
  //     this.setBannerH()
  //   }, false)
  // }
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
  background: #010e50 url(../../assets/images/bigscreen.png) center top no-repeat;
  background-size: 100% 100%;
  line-height: 1.15;
}
.screen-title {
  display: block;
  height: 8rem;
  margin: 0 auto;
}
.screen-bg{
  display: block;
  background: url(../../assets/images/TOP_BG.png) center top no-repeat;
  background-size: 100% 100;
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
.content .el-carousel{
  height: 100%;
}
.content video {
  width: 98%;
  display: block;
  height: 96%;
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
  z-index: 9999;
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
  animation: 35s wordsLoop linear infinite normal;
}
.bannerImg{
  width: 100%;
  height: 100%;
  cursor: pointer;
}
@keyframes wordsLoop {
  0% {
    transform: translateX(300%);
    -webkit-transform: translateX(300%);
  }
  25%{
    transform: translateX(0);
    -webkit-transform: translateX(0);
  }
  50%{
    transform: translateX(-300%);
    -webkit-transform: translateX(-300%);
  }
  75%{
    transform: translateX(0);
    -webkit-transform: translateX(0);
  }
  100% {
    transform: translateX(300%);
    -webkit-transform: translateX(300%);
  }
}
.article-cont{
  height: 100%;
  overflow: hidden;
  padding:1.25rem;
  word-break: break-all;
  font-size: 1.25rem;
  text-indent: 2rem;
  line-height: 1.8rem;
  box-sizing: border-box;
  color: #fff;
}
.article-cont .bannerImg{
  width: 25%;
  height: 25%;
  float:left;
  margin: 0 .625rem .625rem 0;
}
.article-title{
  text-align: center;
  font-size: 2rem;
  line-height: 1.5;
}
</style>
