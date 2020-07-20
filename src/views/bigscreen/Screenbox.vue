<template>
  <div class="screen-box">
    <div class="screen-title">
      <div class="screen-bg">
        新媒体大屏统计分析
      </div>
      <div class="back-hone"
           v-if="!this.message"
           @click="backHome">
        返回
      </div>
    </div>
    <div class="data-content">
      <div class="con-left">
        <div class="left-top">
          <region></region>
        </div>
        <div class="left-bottom">
          <div class="release-box">
            <release></release>
          </div>
        </div>
      </div>
      <div class="con-center">
        <div class="center-top">
          <div id="map-show"
               class="cen-top map"></div>
        </div>
      </div>
      <div class="con-right">
        <div class="right-top">
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
                      :class="wxActive?'aricle-active':''"> <img :src="require('@/assets/images/wx.png')">微信</span>
                <span @click="checkdTab(2)"
                      :class="wbActive?'aricle-active':''"><img :src="require('@/assets/images/wb.png')">微博</span>
                <span @click="checkdTab(3)"
                      :class="tdActive?'aricle-active':''"><img :src="require('@/assets/images/tt.png')">今日头条</span>
                <!-- <span @click="checkdTab(4)"
                      :class="dyActive?'aricle-active':''"><img :src="require('@/assets/images/dy.png')">抖音</span> -->
              </div>
              <div class="article-content">
                <p class="article-top">
                  <span class="new-company"
                        v-text="this.typeof"></span>
                  <span style="width:15%;text-align:center;">阅读量</span>
                </p>
                <div id="area-article"
                     class="tubiao-size">
                  <ul class="new-list"
                      v-if="articleList.length>0"
                      :class="{anim:animateList}"
                      @mouseenter="StopList()"
                      @mouseleave="UpList()">
                    <li v-for="(item,index) in articleList"
                        :key="index"
                        class="show-article">
                      <span @click="activeWeb(item)"
                            class="new-company"
                            v-html="item.title"></span>
                      <span style="width:15%;text-align:center;">{{item.readNum}}</span>
                    </li>
                  </ul>
                  <div v-else
                       class="content-center">
                    <p>暂无数据</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="right-bottom">
          <read></read>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import region from './components/Region.vue'
import release from './components/Release.vue'
import read from './components/Read.vue'
import echarts from 'echarts/lib/echarts' // echarts
import 'echarts/map/js/province/guangxi.js'
// import 'echarts-gl' // 3D地图插件
import 'echarts/lib/component/visualMap'
import 'echarts/lib/component/title'
require('echarts/lib/chart/map')
require('echarts/lib/chart/bar')
require('echarts/lib/chart/pie')
require('echarts/lib/chart/line')
require('echarts/lib/component/tooltip')
export default {
  props: ['message'],
  data () {
    return {
      regions: '河池市', // 地区文章参数
      totalPublish: '',
      typeof: '微信最新文章列表',
      animateList: false,
      articleType: 1, // 地区文章参数类型
      wxActive: true,
      wbActive: false,
      dyActive: false,
      tdActive: false,
      articleList: [], // 文章列表数据
      intNumList: null, // 文章轮播
      fhourTime: null, // 地图轮播
      data: []
    }
  },
  methods: {
    // 地图
    monitorMap () {
      let monitorMap = echarts.init(document.getElementById('map-show'))
      this.$http.get(this.$api.regions, { params: { id: this.articleType } })
        .then(res => {
          this.data = res.data.data
          var maxValue = []
          this.data.forEach(item => {
            if (item.wxRead) {
              item.value = item.wxRead
              maxValue.push(item.wxRead)
            } else if (item.wbDianzan) {
              item.value = item.wbDianzan
              maxValue.push(item.wbDianzan)
            } else if (item.jrttRead) {
              item.value = item.jrttRead
              maxValue.push(item.jrttRead)
            } else if (item.dyDianzan) {
              item.value = item.dyDianzan
              maxValue.push(item.dyDianzan)
            }
          })
          let option = {
            // 标题
            title: {
              text: '广西各地区数据统计',
              x: 'center',
              textStyle: {
                // 设置主标题风格
                color: '#1beafc', // 设置主标题字体颜色
                // 字体大小
                fontSize: 30
              }
            },
            tooltip: {
              show: true,
              backgroundColor: 'rgba(0,0,0,.8)',
              textStyle: {
                color: '#00ceff',
                decoration: 'none',
                fontFamily: 'Verdana, sans-serif',
                fontSize: 30,
                fontWeight: 'bold'
              },
              formatter: function (params, ticket, callback) {
                if (params.data.wxRead) {
                  return '地区名称：' + params.data.name +
                    '<br/>' + '微信' + '<br/>' + '阅读数：' + params.data.wxRead + '<br/>' + '点赞数：' + params.data.wxDianzan
                } else if (params.data.wbDianzan) {
                  return '地区名称：' + params.data.name +
                    '<br/>' + '微博' + '<br/>' + '点赞数：' + params.data.wbDianzan + '<br/>' + '评论数：' + params.data.wbPinglun + '<br/>' + '转发数：' + params.data.wbZhuanfa
                } else if (params.data.jrttRead) {
                  return '地区名称：' + params.data.name +
                    '<br/>' + '今日头条' + '<br/>' + '阅读数：' + params.data.jrttRead + '<br/>' + '评论数：' + params.data.jrttPinglun + '<br/>' + '转发数：' + params.data.jrttZhuanfa
                } else if (params.data.dyDianzan) {
                  return '地区名称：' + params.data.name +
                    '<br/>' + '抖音' + '<br/>' + '点赞数：' + params.data.dyDianzan + '<br/>' + '评论数：' + params.data.dyPinglun + '<br/>' + '转发数：' + params.data.dyZhuanfa
                }
              }
            },
            visualMap: {
              min: 0,
              max: Math.max.apply(null, maxValue),
              left: 40,
              textStyle: {
                color: '#fff',
                fontSize: 25
              },
              top: 'bottom',
              text: ['高', '低'],
              calculable: true,
              inRange: {
                color: ['#fffaa0', '#E0DAFF', '#ADBFFF', '#9CB4FF', '#6A9DFF', '#3889FF']
              }
            },
            geo: {
              map: '广西',
              zoom: 1.2,
              label: {
                normal: {
                  show: true,
                  fontSize: 30, // 文字大小
                  color: '#ff7200' // 文字颜色
                },
                emphasis: {
                  show: true,
                  color: '#013364'
                }
              },
              roam: true,
              itemStyle: {
                normal: {
                  areaColor: '#fbfbfb',
                  borderColor: '#b9b4b7'

                },
                emphasis: {
                  areaColor: '#05ff09'
                }
              }
            },
            series: [
              {
                type: 'map',
                name: '广西',
                map: '广西',
                geoIndex: 0,
                label: {
                  normal: {
                    show: true
                  },
                  emphasis: {
                    show: true
                  }
                },
                data: this.data
              }]
          }
          this.mapOption = option
          this.monitor = monitorMap
          monitorMap.setOption(option)
          window.onresize = monitorMap.resize
          let than = this
          monitorMap.on('click', function (e) {
            clearInterval(than.fhourTime)
            than.fhourTime = undefined
            than.regions = e.name
            than.idx = undefined
            than.cityShow = false
            than.getarticle()
          })
          // 地图定义轮播
          var hourIndex = 0
          clearInterval(than.fhourTime)
          than.fhourTime = undefined
          monitorMap.dispatchAction({
            type: 'highlight',
            seriesIndex: 0,
            dataIndex: 13
          })
          than.fhourTime = setInterval(function () {
            monitorMap.dispatchAction({
              type: 'downplay',
              seriesIndex: 0
            })
            monitorMap.dispatchAction({
              type: 'highlight',
              seriesIndex: 0,
              dataIndex: hourIndex
            })
            monitorMap.dispatchAction({
              type: 'showTip',
              seriesIndex: 0,
              dataIndex: hourIndex
            })

            if (than.regions[hourIndex]) {
              than.regions = than.regions[hourIndex].name
              than.getarticle()
            }
            hourIndex++
            if (hourIndex === than.data.length) {
              hourIndex = 0
            }
          }, 10000)
          // 鼠标移入停止轮播
          monitorMap.on('mousemove', function (e) {
            clearInterval(than.fhourTime)
            than.fhourTime = undefined
            monitorMap.dispatchAction({
              type: 'downplay',
              seriesIndex: 0
            })
            monitorMap.dispatchAction({
              type: 'highlight',
              seriesIndex: 0,
              dataIndex: e.dataIndex
            })
            monitorMap.dispatchAction({
              type: 'showTip',
              seriesIndex: 0,
              dataIndex: e.dataIndex
            })
          })
          // 鼠标移出恢复轮播
          monitorMap.on('mouseout', function () {
            if (!than.fhourTime) {
              than.fhourTime = setInterval(function () {
                than.cityShow = false
                monitorMap.dispatchAction({
                  type: 'downplay',
                  seriesIndex: 0
                })
                monitorMap.dispatchAction({
                  type: 'highlight',
                  seriesIndex: 0,
                  dataIndex: hourIndex
                })
                monitorMap.dispatchAction({
                  type: 'showTip',
                  seriesIndex: 0,
                  dataIndex: hourIndex
                })

                if (than.regions[hourIndex]) {
                  than.region = than.regions[hourIndex].name
                  than.getarticle()
                }
                hourIndex++
                if (hourIndex === than.regions.length) {
                  hourIndex = 0
                }
              }, 10000)
            }
          })
        })
        .catch(() => {
        })
    },
    // 地区文章数据***
    checkdTab (type) {
      if (!type) {
        type = 1
      }
      this.articleType = type
      switch (type) {
        case 1:
          this.typeof = '微信最新文章列表'
          this.wxActive = true
          this.wbActive = false
          this.dyActive = false
          this.tdActive = false
          break
        case 2:
          this.typeof = '微博最新文章列表'
          this.wxActive = false
          this.wbActive = true
          this.dyActive = false
          this.tdActive = false
          break
        case 3:
          this.typeof = '头条最新文章列表'
          this.wxActive = false
          this.wbActive = false
          this.dyActive = false
          this.tdActive = true
          break

        default:
          this.typeof = '抖音最新文章列表'
          this.wxActive = false
          this.wbActive = false
          this.dyActive = true
          this.tdActive = false
          break
      }
      this.monitorMap()
      this.getarticle()
    },
    // 地区文章数据获取
    getarticle () {
      this.StopList()
      var titles = ''

      var reg = /[\u4e00-\u9fa5]/g
      this.$http.get(this.$api.channelsLatestReadNum, { params: { id: this.articleType, region: this.regions } })
        .then(res => {
          if (res.data.data) {
            this.articleList = res.data.data
            if (this.articleType === 1) {
              this.typeof = '微信最新文章列表'
              this.wxActive = true
              this.wbActive = false
              this.dyActive = false
              this.tdActive = false
            } else if (this.articleType === 2) {
              this.typeof = '微博最新文章列表'
              this.wxActive = false
              this.wbActive = true
              this.dyActive = false
              this.tdActive = false
            } else if (this.articleType === 3) {
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
            this.articleList.forEach(item => {
              if (item.title) {
                titles = item.title.match(reg)
                item.title = titles.join('')
              } else {
                item.title = '转发微博'
              }
            })
            this.UpList()
          }
        })
        .catch(() => {
        })
    },
    activeWeb (item) {
      window.open(item.url, '_black')
    },
    // 文章列表动画
    ScrollList () {
      if (this.articleList.length > 10) {
        this.intNumList = setInterval(() => {
          this.animateList = true // 向上滚动的时候需要添加css3过渡动画
          setTimeout(() => {
            this.articleList.push(this.articleList[0]) // 将数组的第一个元素添加到数组的
            this.articleList.shift() // 删除数组的第一个元素
            this.animateList = false
          }, 500)
        }, 1000)
      }
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
    // 三位数添加逗号
    appendNum (n) {
      var b = parseInt(n).toString()
      var len = b.length
      if (len <= 3) { return b }
      var r = len % 3
      return r > 0 ? b.slice(0, r) + ',' + b.slice(r, len).match(/\d{3}/g).join(',') : b.slice(r, len).match(/\d{3}/g).join(',')
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
    },
    backHome () {
      this.$router.push({ name: 'dashboard' })
    }
  },
  created () {
    this.getTotalPublish()
    this.getarticle() // 最新文章
  },
  destroyed () {
    clearInterval(this.fhourTime)
  },
  mounted () {
    this.monitorMap()
    // this.drawLine()
  },
  components: {
    region,
    release,
    read
  }
}
</script>
<style scoped>
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
  display: flex;
  justify-content: space-between;
}
.data-content .con-left,
.data-content .con-right {
  width: 30%;
  height: 100%;
}
.data-content .con-center {
  width: 40%;
  height: 100%;
}
.left-top,
.right-top {
  height: 55%;
}
.center-top {
  height: 100%;
}
.center-bottom {
  position: relative;
  height: 36%;
}
.left-bottom,
.right-bottom {
  height: 45%;
}
.cen-top {
  width: 100%;
  height: 90%;
}
.map {
  position: relative;
  top: 5%;
}
/*文章列表*/

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
  background: url('../../assets/images/top-box.png') no-repeat bottom center;
  background-size: 100% 100%;
  width: 80%;
  height: 100%;
  font-size: 0.9rem;
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
  display: flex;
  justify-content: space-around;
}
.title-tabs span {
  display: inline-block;
  width: 24%;
  color: #fff;
  text-align: center;
  border: none;
  cursor: pointer;
  font-size: 0.33rem;
  align-self: center;
}
.title-tabs span img {
  height: 0.44rem;
  vertical-align: middle;
  margin-right: 0.07rem;
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
  background: url('../../assets/images/articleBg-All.png') no-repeat bottom
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
  line-height: 0.9rem;
  /* background-color: rgba(79, 41, 248,0.3); */
}
.tubiao-size {
  height: calc(100% - 0.9rem);
  margin: 0 auto;
  overflow: hidden;
}
.new-list {
  font-size: 0.33rem;
  padding: 0 5px;
  line-height: 0.9rem;
  color: #fff;
  transition: top 0.5s;
}
.anim {
  transition: all 0.5s;
  margin-top: -0.9rem;
  /* 高度等于行高 */
}
.show-article {
  display: flex;
  justify-content: space-between;
  padding: 0 15px;
  height: 0.9rem;
  line-height: 0.9rem;
}
.new-company {
  width: 85%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  cursor: pointer;
  text-align: left;
}
.release-box {
  width: 98%;
  height: 100%;
}
.back-hone {
  color: rgba(240, 16, 27, 0.74);
  position: absolute;
  right: 0.5rem;
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
