<template>
  <div class="article">
    <div class="top-num">
      <div class="wb-fans top-box">
        <div>
          <p class="name">总文章发布条数</p>
          <p class="num"
             v-text="this.totalPublish"></p>
        </div>
      </div>
    </div>
    <!-- 文章列表 -->
    <div class="area-article">
      <div class="title-tabs"
           @mouseenter="StopList()"
           @mouseleave="UpList()">
        <span @click="checkdTab(1)"
              :class="wxActive?'aricle-active':''"> <img :src="require('@/assets/images/wx.png')"> 微信</span>
        <span @click="checkdTab(2)"
              :class="wbActive?'aricle-active':''"><img :src="require('@/assets/images/wb.png')">微博</span>
        <span @click="checkdTab(3)"
              :class="tdActive?'aricle-active':''"><img :src="require('@/assets/images/tt.png')">今日头条</span>
        <span @click="checkdTab(4)"
              :class="dyActive?'aricle-active':''"><img :src="require('@/assets/images/dy.png')">抖音</span>
      </div>
      <div class="article-content">
        <p class="article-top">
          <span class="new-company"
                v-text="this.typeof"></span>
          <span style="width:13%;text-align: left;">阅读量</span>
        </p>
        <div id="area-article"
             class="tubiao-size">
          <ul class="new-list"
              :class="{anim:animateList}"
              @mouseenter="StopList()"
              @mouseleave="UpList()">
            <li v-for="(item,index) in articleList"
                :key="index"
                class="show-article">
              <span @click="activeWeb(item)"
                    class="new-company"
                    v-html="item.title"></span>
              <span style="width:13%;text-align: center;">{{item.readNum}}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      totalPublish: '1008611',
      typeof: '微信最新文章列表',
      animateList: false,
      articleType: '',
      wxActive: true,
      wbActive: false,
      dyActive: false,
      tdActive: false,
      articleList: [],
      intNumList: null
    }
  },
  methods: {
    // 地区文章数据***
    checkdTab (type) {
      this.articleType = type
      if (!type) {
        type = 1
      }
      if (type === 1) {
        this.typeof = '微信最新文章列表'
        this.wxActive = true
        this.wbActive = false
        this.dyActive = false
        this.tdActive = false
      } else if (type === 2) {
        this.typeof = '微博最新文章列表'
        this.wxActive = false
        this.wbActive = true
        this.dyActive = false
        this.tdActive = false
      } else if (type === 3) {
        this.typeof = '头条最新文章列表'
        this.wxActive = false
        this.wbActive = false
        this.dyActive = false
        this.tdActive = true
      } else {
        this.typeof = '抖音最新文章列表'
        this.wxActive = false
        this.wbActive = false
        this.dyActive = true
        this.tdActive = false
      }
      this.StopList()
      this.$http.get(this.$api.channelsLatestReadNum, { params: { id: type, region: this.region } })
        .then(res => {
          if (res.data.data) {
            this.articleList = res.data.data
            this.UpList()
          }
        })
        .catch(() => {
        })
    },
    // 文章列表动画
    ScrollList () {
      if (this.ayy.length > 10) {
        this.intNumList = setInterval(() => {
          this.animateList = true // 向上滚动的时候需要添加css3过渡动画
          setTimeout(() => {
            this.ayy.push(this.ayy[0]) // 将数组的第一个元素添加到数组的
            this.ayy.shift() // 删除数组的第一个元素
            this.animateList = false
          }, 500)
        }, 1000)
      }
    },
    // 鼠标移上去停止
    StopList () {
      clearInterval(this.intNumList)
      this.intNumList = undefined
    },
    UpList () {
      if (!this.intNumList) {
        this.ScrollList()
      }
    },
    // 总文章发布数
    getTotalPublish () {
      this.$http.get(this.$api.totalPublish)
        .then(res => {
          if (res.data.data) {
            this.totalPublish = this.appendNum(res.data.data.totalPublish)
          }
        })
        .catch(() => {
        })
    }
  },
  created () {
    this.getTotalPublish()
    this.checkdTab()
  }
}
</script>
<style scoped>
.article,
.grid-content {
  height: 100%;
}
.top-num {
  height: 20%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.top-box {
  background: url('../../../assets/images/top-box.png') no-repeat bottom center;
  background-size: 100% 100%;
  width: 80%;
  height: 100%;
  font-size: 0.8rem;
  box-sizing: border-box;
  display: flex;
  align-items: center; /*定义body的元素垂直居中*/
  justify-content: center; /*定义body的里的元素水平居中*/
}

.top-box .name {
  color: #fff;
  font-size: 0.33rem;
  text-align: center;
}
.top-box .num {
  color: #00ceff;
  font-size: 0.66rem;
  text-align: center;
}
.area-article {
  height: 80%;
}
.title-tabs {
  height: 20%;
  line-height: 1.11rem;
  display: flex;
  justify-content: space-around;
}
.title-tabs span {
  display: inline-block;
  width: 22%;
  color: #fff;
  text-align: center;
  border: none;
  cursor: pointer;
  font-size: 0.33rem;
  /* border: 1px solid #00ceff;
  box-shadow:  0 2px 12px 0 #00ceff;
  background-color: rgba($color: #fff, $alpha: 0.1) */
}
.title-tabs span img {
  height: 0.44rem;
  vertical-align: middle;
  margin-right: 5px;
}
.title-tabs .active {
  border: 1px solid #00ceff;
  box-shadow: 0 2px 12px 0 #00ceff;
  background-color: rgba(255, 255, 255, 0.1);
}
.title-tabs .aricle-active {
  color: #00ceff;
}
.article-content {
  overflow: hidden;
  height: 80%;
  background: url('../../../assets/images/articleBg-All.png') no-repeat bottom
    center;
  background-size: 100% 99%;
  box-sizing: border-box;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.9);
}
.article-top {
  box-sizing: border-box;
  display: flex;
  font-size: 0.33rem;
  justify-content: space-between;
  width: 100%;
  padding: 0 15px;
  margin: 0 auto;
  border-bottom: 1px solid rgba(64, 205, 221, 0.555);
  color: #fff;
  line-height: 0.8rem;
  /* background-color: rgba(79, 41, 248,0.3); */
}
.tubiao-size {
  height: calc(100% - 0.8rem);
  margin: 0 auto;
  overflow: hidden;
}
.new-list {
  font-size: 0.33rem;
  padding: 0 5px;
  line-height: 0.8rem;
  color: #fff;
  transition: top 0.5s;
}
.anim {
  transition: all 0.5s;
  margin-top: -0.8rem;
  /* 高度等于行高 */
}
.show-article {
  display: flex;
  justify-content: space-between;
  padding: 0 15px;
  height: 0.8rem;
  line-height: 0.8rem;
}
</style>
