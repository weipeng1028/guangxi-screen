<template>
  <div class="region">
    <div class="top-num">
      <div class="top-box">
        <div>
          <p class="name">微博粉丝数</p>
          <p class="num"
                     v-text="this.wbFans"></p>
        </div>
      </div>
      <div class="top-box">
        <div>
          <p class="name">微信关注总条数</p>
          <p class="num"
                     v-text="this.wxFans"></p>
        </div>
      </div>
    </div>
    <!-- 区排行榜图表 -->
    <div class="area-article area-rank">
      <!-- <p class="title">
        区排行榜
      </p> -->
      <p class="tab-title">
        <span @click="titleTabs(true)"
              class="district"
              :class="areaRank?'title-active':''">市排行榜</span>
        <span @click="titleTabs(false)"
              class="hot-article"
              :class="areaRank?'':'title-active'">区排行榜</span>
      </p>
      <div id="area-tuxing"
           class="article-content region-rank"
           v-if="areaRank">
        <p class="article-top">
          <span style="width:9%;text-align: left;">排名</span>
          <span class="list-name">单位名称</span>
          <span style="width:10%;text-align: left;">微信</span>
          <span style="width:13%;text-align: left;">微博</span>
          <span style="width:13%;text-align: left;">头条</span>
          <span style="width:13%;text-align: left;">总分</span>
        </p>
        <div id="area-article"
             class="tubiao-size">
          <ul class="new-list"
              :class="{anim:animateRank}"
              @mouseenter="StopRank()"
              @mouseleave="UpRank()">
            <li v-for="(item,index) in att"
                :key="index"
                class="show-article">
              <span style="width:9%;text-align: left;">{{item.num}}</span>
              <span class="list-name">{{item.name}}</span>
              <span style="width:10%;text-align: center;">{{item.wx}}</span>
              <span style="width:13%;text-align: center;">{{item.wb}}</span>
              <span style="width:13%;text-align: center;">{{item.tt}}</span>
              <span style="width:13%;text-align: left;">{{item.total}}</span>
            </li>
          </ul>
        </div>
      </div>
      <div id="area-rank-tuxing" v-else
                   class="article-content">
                <p class="article-top">
                  <span style="width:10%;text-align: left;">排名</span>
                  <span style="width:15%;text-align: left;">渠道</span>
                  <span class="company">文章标题</span>
                  <span style="width:15%;text-align: center;">热度</span>
                </p>
                <div id="area-article"
                     class="tubiao-size">
                  <ul class="new-list"
                      :class="{anim:animateHot}"
                      @mouseenter="StopHot()"
                      @mouseleave="UpHot()">
                    <li v-for="(item,index) in arr"
                        :key="index"
                        class="show-article">
                      <span style="width:10%;text-align: left;">{{item.num}}</span>
                      <span v-if="item.source===1"
                            style="width:15%;text-align: left;">微信</span>
                      <span v-if="item.source===2"
                            style="width:15%;text-align: left;">微博</span>
                      <span v-if="item.source===4"
                            style="width:15%;text-align: left;">头条</span>
                      <span v-if="item.source===5"
                            style="width:15%;text-align: left;">抖音</span>
                      <span @click="activeWeb(item)"
                            class="company">{{item.title}}</span>
                      <span style="width:15%;text-align: center;">{{item.hotnum}}</span>
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
      areaRank: '',
      wxFans: '1008611',
      wbFans: '1008611',
      animateRank: false,
      animateHot: false, // 文章排行榜类名设置
      regionData: [], // 地区数据
      // 热门文章排行榜
      arr: [],
      att: []
    }
  },
  methods: {
    titleTabs (type) {
      this.areaRank = !!type
    },
    // 鼠标移上去停止
    StopRank () {
      clearInterval(this.intNumRank)
    },
    UpRank () {
      this.ScrollRank()
    },
    StopHot () {
      clearInterval(this.intNumHot)
    },
    UpHot () {
      this.ScrollHot()
    },
    // 区排行榜数据
    getDistrictRanking () {
      this.$http.get(this.$api.DistrictRanking)
        .then(res => {
          if (res.data.data) {
            this.att = res.data.data
            this.ScrollRank()
          }
        })
        .catch(() => {
        })
    },
    // 区排行榜
    ScrollRank () {
      if (this.att.length > 10) {
        this.intNumRank = setInterval(() => {
          this.animateRank = true // 向上滚动的时候需要添加css3过渡动画
          setTimeout(() => {
            this.att.push(this.att[0]) // 将数组的第一个元素添加到数组的
            this.att.shift() // 删除数组的第一个元素
            this.animateRank = false
          }, 500)
        }, 1000)
      }
    },
    // 热门文章数据
    gethotArticles () {
      this.$http.get(this.$api.hotArticles)
        .then(res => {
          if (res.data.data) {
            this.arr = res.data.data
            this.ScrollHot()
          }
        })
        .catch(() => {
        })
    },
    // 热门文章
    ScrollHot () {
      if (this.arr.length > 10) {
        this.intNumHot = setInterval(() => {
          this.animateHot = true // 向上滚动的时候需要添加css3过渡动画
          setTimeout(() => {
            this.arr.push(this.arr[0]) // 将数组的第一个元素添加到数组的
            this.arr.shift() // 删除数组的第一个元素
            this.animateHot = false
          }, 500)
        }, 1000)
      }
    },
    // 三位数添加逗号
    appendNum (n) {
      var b = parseInt(n).toString()
      var len = b.length
      if (len <= 3) { return b }
      var r = len % 3
      return r > 0 ? b.slice(0, r) + ',' + b.slice(r, len).match(/\d{3}/g).join(',') : b.slice(r, len).match(/\d{3}/g).join(',')
    },
    // 微信微博粉丝关注数
    getFans () {
      this.$http.get(this.$api.fans)
        .then(res => {
          if (res.data.data) {
            this.wxFans = this.appendNum(res.data.data.wxFansNum)
            this.wbFans = this.appendNum(res.data.data.wbFansNum)
          }
        })
        .catch(() => {
        })
    }
  },
  created () {
    this.getDistrictRanking() // 区排行榜动画触发
    this.gethotArticles() // 热门文章排行榜动画触发
    this.getFans()
  }
}
</script>
<style scoped>
.region {
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
  width: 45%;
  height: 100%;
  font-size: 4rem;
  box-sizing: border-box;
  display: flex;
  align-items: center; /*定义body的元素垂直居中*/
  justify-content: center; /*定义body的里的元素水平居中*/
}

.top-box .name {
  color: #fff;
  font-size: 1.5rem;
  text-align: center;
}
.top-box .num {
  color: #00ceff;
  font-size: 3rem;
  text-align: center;
}
.district,
.hot-article {
  display: block;
  width: 50%;
  text-align: center;
}
.district,
.hot-article {
  display: block;
  width: 50%;
  text-align: center;
}
.title-active {
  color: #00ceff;
}
.title-tabs .aricle-active {
  color: #00ceff;
}
.area-rank {
  height: 80%;
}
.tab-title {
  cursor: pointer;
  display: flex;
  align-items: center;
  color: #fff;
  font-size: 1.5rem;
  text-align: center;
  height: 20%;
  line-height: 5rem;
}
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
/* #area-tuxing {
  background: url('../../../assets/images/articleBg-Flip.png') no-repeat bottom
    center;
  background-size: 100% 99%;
  box-sizing: border-box;
} */
.article-top {
  box-sizing: border-box;
  display: flex;
  font-size: 1.5rem;
  justify-content: space-between;
  width: 100%;
  height: 4rem;
  padding: 0 15px;
  margin: 0 auto;
  border-bottom: 1px solid rgba(64, 205, 221, 0.555);
  color: #fff;
  line-height: 4rem;
}
.article-content {
  overflow: hidden;
  height: 80%;
  background: url("../../../assets/images/articleBg-All.png") no-repeat bottom center;
  background-size: 100% 99%;
  box-sizing: border-box;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.9)
}
.tubiao-size {
  height: calc(100% - 4rem);
  margin: 0 auto;
  overflow: hidden;
}
.new-list {
  font-size: 1.5rem;
  padding: 0 5px;
  line-height: 4rem;
  color: #fff;
  transition: top 0.5s;
}
.anim {
  transition: all 0.5s;
  margin-top: -4rem;
  /* 高度等于行高 */
}
.show-article {
  display: flex;
  justify-content: space-between;
  padding: 0 15px;
  height: 4rem;
  line-height: 4rem;
}
.company {
  display: inline-block;
  width: 65%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
  text-align: left;
}
</style>
