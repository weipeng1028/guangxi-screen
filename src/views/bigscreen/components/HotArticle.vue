<template>
  <div class="hot-article">
    <div class="area-rank">
      <p class="title">
        优秀作品展示
      </p>
    </div>
    <div class="tuxing-fine article-content"
                   ref="element">
                <div class="element-content">
                  <el-carousel indicator-position="none"
                               :autoplay="true"
                               :interval="5000"
                               :height="imgHeight">
                    <el-carousel-item v-for="(item,index) in images"
                                      :key="index">
                      <img :src="item.coverUrl"
                           alt="123"
                           class="fine-img"
                           ref="imgHeight"
                           @click="routerWeb(item)">
                      <img :src="require('@/assets/images/text/autoPlay.png')"
                           @click="routerWeb(item)"
                           class="center-img">
                    </el-carousel-item>
                  </el-carousel>
                </div>
              </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      images: [],
      imgHeight: ''
    }
  },
  methods: {
    // 优秀作品展示
    autoPlay () {
      this.$http.get(this.$api.displayExcellentWorks)
        .then(res => {
          if (res.data.data) {
            this.images = res.data.data
          }
        })
        .catch(() => {
        })
    },
    // 点击跳转
    routerWeb (item) {
      // window.location.href = item.video_url
      window.open(item.videoUrl, '_blank')
    }
  },
  created () {
    this.autoPlay() // 优秀作品展示
  }
}
</script>
<style scoped>
.hot-article {
  height: 100%;
}
.area-rank {
  height: 20%;
}
/* .area-rank .title {
  color: #fff;
  font-size: 2rem;
  text-align: center;
  height: 4rem;
  line-height: 4rem;
} */
.area-rank .title {
  color: #fff;
  font-size: 1.5rem;
  text-align: center;
  height: 20%;
  line-height: 5rem;
}
.area-rank .title::after {
  content: '';
  display: inline-block;
  width: 10px;
  height: 10px;
  background-color: #00ceff;
  vertical-align: middle;
  margin-left: 10px;
  margin-top: -5px;
  transform: rotate(45deg);
}
.area-rank .title::before {
  content: '';
  display: inline-block;
  width: 10px;
  height: 10px;
  background-color: #00ceff;
  vertical-align: middle;
  margin-right: 10px;
  margin-top: -5px;
  transform: rotate(45deg);
}
.tuxing-fine {
  height: 90%;
  padding: 2px;
  margin: 0 auto;
  overflow: hidden;
}
.element-content {
  position: relative;
  width: 99%;
  height: 100%;
  margin: auto;
  overflow: hidden;
}
.article-content {
  overflow: hidden;
  height: 80%;
  padding: 10px 2px;
  background: url('../../../assets/images/articleBg.png') no-repeat bottom center;
  background-size: 100% 99%;
  box-sizing: border-box;
}
.fine-img {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: 0 auto;
  max-width: 100%;
  height: 100%;
  cursor: pointer;
}
.center-img {
  width: 3vw;
  height: 3vw;
  display: block;
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  bottom: 50%;
  margin: 0 auto;
  max-width: 100%;
  max-height: 100%;
  cursor: pointer;
}
</style>
