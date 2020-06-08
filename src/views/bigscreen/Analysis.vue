<template>
  <div class="screen-box">
    <div class="screen-title">
      <div class="screen-bg">
        新媒体传播效果分析
      </div>
    </div>
    <div class="data-content">
      <div class="top">
        <div class="top-left">
          <img v-if="regiontyp === 'wb'" :src="userDetail.headimg" />
          <div v-if="regiontyp === 'wx'" class="wx-image" :style="{ 'backgroundImage': 'url(' + userDetail.headimg + ')' }"></div>
          <div class="message">
            <div class="region-type">
              <span class="login-name">{{ userDetail.nickname }}</span>
              <el-radio-group v-model="regiontyp" @change="tabChannel">
                <el-radio label="wx">微信公众号</el-radio>
                <el-radio label="wb">微博</el-radio>
              </el-radio-group>
            </div>
            <div class="region-name" v-if="regiontyp === 'wx'">
              <span class="region-title">微信名称:</span>
              <span class="region-cont" style="margin-right:1.5rem">{{
                userDetail.nickname
              }}</span>
              <span class="region-title">微信账号:</span>
              <span class="region-cont">{{ userDetail.name }}</span>
            </div>
            <div class="region-name" v-if="regiontyp === 'wb'">
              <span class="region-title">微博名称:</span>
              <span class="region-cont" style="margin-right:1.5rem">{{
                userDetail.nickname
              }}</span>
              <span class="region-title">微博账号:</span>
              <span class="region-cont">{{ userDetail.uid }}</span>
            </div>
            <div class="region-brief">
              <span class="region-title">账号简介:</span>
              <span class="region-cont"
                >账户简介内容,账户简介内容,账户简介内容,账户简介内容,账户简介内容,账户简介内容,账户简介内容</span
              >
            </div>
          </div>
        </div>
        <div class="top-right">
          <div class="right-data">
            <div class="region-name">
              <span class="region-title">发稿量:</span>
              <span class="region-cont"
                ><i class="blue num">{{ userDetail.count }}</i
                >个</span
              >
            </div>
            <div class="region-name" v-if="regiontyp === 'wb'">
              <span class="region-title">粉丝数:</span>
              <span class="region-cont"><i class="red num">{{userDetail.fansNum}}</i>个</span>
            </div>
            <div class="region-name" v-if="regiontyp === 'wx'">
              <span class="region-title">阅读数:</span>
              <span class="region-cont"
                ><i class="red num">{{ userDetail.readSum }}</i
                >个</span
              >
            </div>
            <div class="region-name">
              <span class="region-title">最后更新时间:</span>
              <span class="region-cont">{{ userDetail.time }}</span>
            </div>
          </div>
          <!-- 仪表盘 -->
          <div id="dashboard"></div>
          <div class="status">
            <span class="region-title">运行状态</span>
            <span v-if="this.dataArr<=30" class="status-data ordinary">一般</span>
            <span v-if="this.dataArr>30&&this.dataArr<=80" class="status-data good">良好</span>
            <span v-if="this.dataArr>70" class="status-data best">优秀</span>
          </div>
        </div>
      </div>
      <div class="line-center">
        <div class="tab-right">
          <el-button
            size="small"
            :class="switchTab ? 'btn-active' : ''"
            @click="switchUser"
            >用户互动</el-button>
          <el-button
            size="small"
            :class="switchTab ? '' : 'btn-active'"
            @click="switchArticle"
            >最新文章</el-button>
        </div>
        <!-- 传播趋势图 -->
        <div id="line-tab" @mouseenter="readEnter()"
           @mouseleave="readLeave()"></div>
      </div>
      <div class="bottom">
        <div class="left-bar">
          <div class="title">
            <span>{{leftTitle}}</span>
          </div>
          <div v-show="regiontyp==='wb'">123</div>
          <div v-show="regiontyp==='wx'"  id="left-bar" @mouseenter="barEnter()"
           @mouseleave="barLeave()"></div>
        </div>
        <div class="right-relation">
          <div class="title">
            <span>{{rightTitle}}</span>
          </div>
          <div v-show="regiontyp==='wx'" class="power-ranking">
            <div class="ranking-box">
              <div class="first-ranking ranking-flex">
                <ul>
                  <li v-for="item in rankingFirst" :key="item.rank">
                    <span class="ranking">{{item.rank+1}}</span>
                    <span class="power">{{item.value}}</span>
                  </li>
                </ul>
              </div>
              <div class="last-ranking ranking-flex">
                <ul>
                  <li v-for="item in rankingLast" :key="item.rank">
                    <span class="ranking">{{item.rank+1}}</span>
                    <span class="power">{{item.value}}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div v-show="regiontyp==='wb'" class="power-route">
              <div v-show="regiontyp==='wb'" id="right-relation"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import echarts from 'echarts/lib/echarts' // echarts
import 'echarts/lib/component/visualMap'
import 'echarts/lib/component/title'
require('echarts/lib/chart/pie')
require('echarts/lib/chart/gauge')
require('echarts/lib/chart/line')
require('echarts/lib/chart/bar')
require('echarts/lib/chart/graph')
require('echarts/lib/component/tooltip')
export default {
  data () {
    return {
      dataArr: 65,
      userDetail: {},
      regiontyp: 'wx',
      leftTitle: '被公众号转载Top10',
      rightTitle: '传播力排行榜',
      switchTab: true,
      userApi: '',
      articleApi: '',
      topApi: '',
      lineChart: '',
      option: '',
      timer: null,
      leftBar: '',
      barOption: '',
      barTimer: null,
      userData: [],
      userTime: [],
      rankingFirst: [],
      rankingLast: []
    }
  },
  methods: {
    // 仪表盘
    getDashboard () {
      if (this.regiontyp === 'wx') {
        this.DashboardApi = this.$api.wechatCommunicationForceScore
      } else if (this.regiontyp === 'wb') {
        this.DashboardApi = this.$api.weiboCommunicationForceScore
      }
      let columnar = echarts.init(document.getElementById('dashboard'))
      this.$http.get(this.DashboardApi)
        .then(res => {
          this.dataArr = res.data.data.score
          var colorTemplate1 = [[0.3, 'rgba(255,0,0,0.8)'], [0.7, 'rgba(0,255,255,0.8)'], [1, 'rgba(0,255,0,0.8)']]
          var option = {
            tooltip: {
              // 本系列特定的 tooltip 设定。
              show: false,
              // formatter: '{b}：{c}%',
              backgroundColor: 'rgba(50,50,50,0.7)', // 提示框浮层的背景颜色。注意：series.tooltip 仅在 tooltip.trigger 为 'item' 时有效。
              borderColor: '#333', // 提示框浮层的边框颜色。...
              borderWidth: 0, // 提示框浮层的边框宽。...
              padding: 5, // 提示框浮层内边距，单位px，默认各方向内边距为5，接受数组分别设定上右下左边距。...
              textStyle: {
                // 提示框浮层的文本样式。...
                // color ,fontStyle ,fontWeight ,fontFamily ,fontSize ,lineHeight ,.......
              }
            },

            series: [
              {
                name: '单仪表盘示例', // 系列名称,用于tooltip的显示，legend 的图例筛选，在 setOption 更新数据和配置项时用于指定对应的系列。
                type: 'gauge', // 系列类型
                radius: '80%', // 参数:number, string。 仪表盘半径,默认 75% ，可以是相对于容器高宽中较小的一项的一半的百分比，也可以是绝对的数值。
                center: ['50%', '55%'], // 仪表盘位置(圆心坐标)
                startAngle: 225, // 仪表盘起始角度,默认 225。圆心 正右手侧为0度，正上方为90度，正左手侧为180度。
                endAngle: -45, // 仪表盘结束角度,默认 -45
                clockwise: true, // 仪表盘刻度是否是顺时针增长,默认 true。
                min: 0, // 最小的数据值,默认 0 。映射到 minAngle。
                max: 100, // 最大的数据值,默认 100 。映射到 maxAngle。
                splitNumber: 10, // 仪表盘刻度的分割段数,默认 10。

                axisLine: {
                  // 仪表盘轴线(轮廓线)相关配置。
                  show: true, // 是否显示仪表盘轴线(轮廓线),默认 true。
                  lineStyle: {
                    // 仪表盘轴线样式。
                    color: colorTemplate1, // 仪表盘的轴线可以被分成不同颜色的多段。每段的  结束位置(范围是[0,1]) 和  颜色  可以通过一个数组来表示。默认取值：[[0.2, '#91c7ae'], [0.8, '#63869e'], [1, '#c23531']]
                    opacity: 1, // 图形透明度。支持从 0 到 1 的数字，为 0 时不绘制该图形。
                    width: 30, // 轴线宽度,默认 30。
                    shadowBlur: 20, // (发光效果)图形阴影的模糊大小。该属性配合 shadowColor,shadowOffsetX, shadowOffsetY 一起设置图形的阴影效果。
                    shadowColor: '#fff' // 阴影颜色。支持的格式同color。
                  }
                },

                splitLine: {
                  // 分隔线样式。
                  show: true, // 是否显示分隔线,默认 true。
                  length: 30, // 分隔线线长。支持相对半径的百分比,默认 30。
                  lineStyle: {
                    // 分隔线样式。
                    color: '#eee', // 线的颜色,默认 #eee。
                    opacity: 1, // 图形透明度。支持从 0 到 1 的数字，为 0 时不绘制该图形。
                    width: 2, // 线度,默认 2。
                    type: 'solid', // 线的类型,默认 solid。 此外还有 dashed,dotted
                    shadowBlur: 10, // (发光效果)图形阴影的模糊大小。该属性配合 shadowColor,shadowOffsetX, shadowOffsetY 一起设置图形的阴影效果。
                    shadowColor: '#fff' // 阴影颜色。支持的格式同color。
                  }
                },

                axisTick: {
                  // 刻度(线)样式。
                  show: true, // 是否显示刻度(线),默认 true。
                  splitNumber: 5, // 分隔线之间分割的刻度数,默认 5。
                  length: 8, // 刻度线长。支持相对半径的百分比,默认 8。
                  lineStyle: {
                    // 刻度线样式。
                    color: '#eee', // 线的颜色,默认 #eee。
                    opacity: 1, // 图形透明度。支持从 0 到 1 的数字，为 0 时不绘制该图形。
                    width: 1, // 线度,默认 1。
                    type: 'solid', // 线的类型,默认 solid。 此外还有 dashed,dotted
                    shadowBlur: 10, // (发光效果)图形阴影的模糊大小。该属性配合 shadowColor,shadowOffsetX, shadowOffsetY 一起设置图形的阴影效果。
                    shadowColor: '#fff' // 阴影颜色。支持的格式同color。
                  }
                },

                axisLabel: {
                  // 刻度标签。
                  show: false, // 是否显示标签,默认 true。
                  distance: 5, // 标签与刻度线的距离,默认 5。
                  color: '#fff', // 文字的颜色,默认 #fff。
                  fontSize: 12, // 文字的字体大小,默认 5。
                  formatter: '{value}' // 刻度标签的内容格式器，支持字符串模板和回调函数两种形式。 示例:// 使用字符串模板，模板变量为刻度默认标签 {value},如:formatter: '{value} kg'; // 使用函数模板，函数参数分别为刻度数值,如formatter: function (value) {return value + 'km/h';}
                },

                pointer: {
                  // 仪表盘指针。
                  show: true, // 是否显示指针,默认 true。
                  length: '70%', // 指针长度，可以是绝对数值，也可以是相对于半径的百分比,默认 80%。
                  width: 5 // 指针宽度,默认 8。
                },

                itemStyle: {
                  // 仪表盘指针样式。
                  color: 'auto', // 指针颜色，默认(auto)取数值所在的区间的颜色
                  opacity: 1, // 图形透明度。支持从 0 到 1 的数字，为 0 时不绘制该图形。
                  borderWidth: 0, // 描边线宽,默认 0。为 0 时无描边。
                  borderType: 'solid', // 柱条的描边类型，默认为实线，支持 'solid', 'dashed', 'dotted'。
                  borderColor: '#000', // 图形的描边颜色,默认 "#000"。支持的颜色格式同 color，不支持回调函数。
                  shadowBlur: 10, // (发光效果)图形阴影的模糊大小。该属性配合 shadowColor,shadowOffsetX, shadowOffsetY 一起设置图形的阴影效果。
                  shadowColor: '#fff' // 阴影颜色。支持的格式同color。
                },

                emphasis: {
                  // 高亮的 仪表盘指针样式
                  itemStyle: {
                    // 高亮 和正常  两者具有同样的配置项,只是在不同状态下配置项的值不同。
                  }
                },

                title: {
                  // 仪表盘标题。
                  show: true, // 是否显示标题,默认 true。
                  offsetCenter: [0, '20%'], // 相对于仪表盘中心的偏移位置，数组第一项是水平方向的偏移，第二项是垂直方向的偏移。可以是绝对的数值，也可以是相对于仪表盘半径的百分比。
                  color: '#fff', // 文字的颜色,默认 #333。
                  fontSize: 18 // 文字的字体大小,默认 15。
                },

                detail: {
                  // 仪表盘详情，用于显示数据。
                  show: true, // 是否显示详情,默认 true。
                  offsetCenter: [0, '50%'], // 相对于仪表盘中心的偏移位置，数组第一项是水平方向的偏移，第二项是垂直方向的偏移。可以是绝对的数值，也可以是相对于仪表盘半径的百分比。
                  color: 'auto', // 文字的颜色,默认 auto。
                  fontSize: 20, // 文字的字体大小,默认 15。
                  formatter: '{value}' // 格式化函数或者字符串
                },

                data: [{
                  name: '综合稿件评分',
                  value: this.dataArr
                }]
              }
            ]
          }
          columnar.setOption(option, true)
          window.addEventListener('resize', function () {
            columnar.resize()
          })
        })
        .catch(() => {})
    },
    // 用户互动数据
    switchUser () {
      this.switchTab = true
      if (this.regiontyp === 'wx') {
        this.userApi = this.$api.wxUserInteraction
      } else if (this.regiontyp === 'wb') {
        this.userApi = this.$api.wbUserInteraction
      }
      this.$http.get(this.userApi)
        .then(res => {
          this.userData = res.data.data.listData
          this.userTime = res.data.data.listTime
          this.gitLineCenter()
        })
        .catch(() => {})
    },
    // 最新文章数据
    switchArticle () {
      this.switchTab = false
      if (this.regiontyp === 'wx') {
        this.articleApi = this.$api.wxPublishArticles
      } else if (this.regiontyp === 'wb') {
        this.articleApi = this.$api.wbPublishArticles
      }
      this.$http.get(this.articleApi)
        .then(res => {
          this.userData = res.data.data.listData
          this.userTime = res.data.data.listTime
          this.gitLineCenter()
        })
        .catch(() => {})
    },
    // 折线图
    gitLineCenter () {
      let lineCenter = echarts.init(document.getElementById('line-tab'))
      this.option = {
        // 标题
        title: {
          text: '传播趋势图',
          textStyle: {
            // 设置主标题风格
            color: '#1beafc', // 设置主标题字体颜色
            // 字体大小
            fontSize: 18
          }
        },
        // 提示框
        tooltip: {
          trigger: 'axis'
        },
        // 保存图片
        toolbox: {
          show: true,
          feature: {
            saveAsImage: {
              show: true
            }
          }
        },
        //  图表距边框的距离,可选值：'百分比'¦ {number}（单位px）
        grid: {
          top: '20%', // 等价于 y: '16%'
          left: '1%',
          right: '1%',
          bottom: '1%',
          containLabel: true
        },
        // 图例-每一条数据的名字叫销量
        legend: {
          data: ['点赞数']
        },
        // x轴
        xAxis: {
          boundaryGap: false,
          axisLine: {
            lineStyle: {
              // 设置x轴颜色
              color: '#1beafc'
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: ['rgba(46, 189, 255,0.5)'],
              width: 1,
              type: 'solid'
            }
          },
          data: this.userTime
        },
        // y轴没有显式设置，根据值自动生成y轴
        yAxis: {
          boundaryGap: false,
          splitLine: {
            show: true,
            lineStyle: {
              color: ['rgba(46, 189, 255,0.5)'],
              width: 1,
              type: 'solid'
            }
          },
          axisLine: {
            lineStyle: {
              // 设置x轴颜色
              color: '#1beafc'
            }
          }
        },
        // 数据-data是最终要显示的数据
        series: [
          {
            name: '点赞数',
            type: 'line',
            areaStyle: {
              type: 'default',
              opacity: 0.1
            },
            data: this.userData
          }
        ]
      }
      lineCenter.setOption(this.option, true)
      // window.onresize = lineCenter.resize
      window.addEventListener('resize', function () {
        lineCenter.resize()
      })
      this.lineChart = lineCenter
      this.readLeave()
    },
    // 鼠标移出
    readLeave () {
      this.timer && clearInterval(this.timer)// 清除定时器
      this.faultByHourIndex = 0 // 播放所在下标
      this.timer = setInterval(() => { // 使得tootip每隔三秒自动显示
        this.lineChart.dispatchAction({
          type: 'showTip', // 根据 tooltip 的配置项显示提示框。
          seriesIndex: 0,
          dataIndex: this.faultByHourIndex
        })
        this.faultByHourIndex++
        if (this.faultByHourIndex >= this.option.series[0].data.length) {
          this.faultByHourIndex = 0
        }
      }, 1000)
    },
    // 鼠标移入
    readEnter () {
      this.timer && clearInterval(this.timer)// 清除定时器
    },
    // 柱状图
    getLeftBar () {
      if (this.regiontyp === 'wx') {
        this.leftTitle = '被公众号转载Top10'
        this.topApi = this.$api.wxReproducedByOfficialTop10
      } else if (this.regiontyp === 'wb') {
        this.leftTitle = '热门文章Top10'
        this.topApi = this.$api.communicationPowerRanking
      }
      this.$http.get(this.topApi)
        .then(res => {
          let maxData = []
          let value = []
          let name = []
          res.data.data.forEach(item => {
            name.push(item.nickname)
            value.push(item.countsum)
          })
          var max = Math.max.apply(null, value)
          value.forEach(item => {
            maxData.push(max)
          })
          let barCharts = echarts.init(document.getElementById('left-bar'))
          this.barOption = {
            tooltip: {
              show: 'true',
              trigger: 'item',
              axisPointer: {
                type: 'shadow'
              },
              backgroundColor: 'rgba(0,0,0,0.7)', // 背景
              padding: [8, 10], // 内边距
              extraCssText: 'box-shadow: 0 0 3px rgba(255, 255, 255, 0.4);', // 添加阴影
              formatter: function (params) {
                if (params.seriesName !== '') {
                  return params.name + '转发量 ：' + params.value
                }
              }
            },
            //  图表距边框的距离,可选值：'百分比'¦ {number}（单位px）
            grid: {
              top: '5%', // 等价于 y: '16%'
              left: '1%',
              right: '1%',
              bottom: '3%',
              containLabel: true
            },
            xAxis: [
              {
                type: 'category',
                axisTick: {
                  show: false
                },
                axisLine: {
                  show: true,
                  lineStyle: {
                    color: '#363e83'
                  }
                },
                axisLabel: {
                  show: false,
                  inside: false,
                  textStyle: {
                    color: '#bac0c0',
                    fontWeight: 'normal',
                    fontSize: '12'
                  }
                },
                data: name
              },
              {
                type: 'category',
                axisLine: {
                  show: false
                },
                axisTick: {
                  show: false
                },
                axisLabel: {
                  show: false
                },
                splitArea: {
                  show: false
                },
                splitLine: {
                  show: false
                },
                data: [
                  '地区1',
                  '地区2',
                  '地区3',
                  '地区4',
                  '地区5',
                  '地区6',
                  '地区7',
                  '地区8',
                  '地区9',
                  '地区10'
                ]
              }
            ],
            yAxis: {
              type: 'value',
              axisTick: {
                show: false
              },
              axisLine: {
                show: true,
                lineStyle: {
                  color: '#32346c'
                }
              },
              splitLine: {
                show: true,
                lineStyle: {
                  color: '#32346c '
                }
              },
              axisLabel: {
                textStyle: {
                  color: '#bac0c0',
                  fontWeight: 'normal',
                  fontSize: '12'
                },
                formatter: '{value}'
              }
            },
            series: [
              {
                name: '阅读量',
                type: 'bar',
                itemStyle: {
                  normal: {
                    show: true,
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                      {
                        offset: 0,
                        color: '#00c0e9'
                      },
                      {
                        offset: 1,
                        color: '#3b73cf'
                      }
                    ]),
                    barBorderRadius: 50,
                    borderWidth: 0
                  },
                  emphasis: {
                    shadowBlur: 15,
                    shadowColor: 'rgba(105,123, 214, 0.7)'
                  }
                },
                zlevel: 2,
                barWidth: '15%',
                data: value
              },
              {
                name: '',
                type: 'bar',
                xAxisIndex: 1,
                zlevel: 1,
                itemStyle: {
                  normal: {
                    color: '#121847',
                    borderWidth: 0,
                    shadowBlur: {
                      shadowColor: 'rgba(255,255,255,0.31)',
                      shadowBlur: 10,
                      shadowOffsetX: 0,
                      shadowOffsetY: 2
                    }
                  }
                },
                barWidth: '15%',
                data: maxData
              }
            ]
          }
          barCharts.setOption(this.barOption, true)
          window.addEventListener('resize', function () {
            barCharts.resize()
          })
          this.leftBar = barCharts
          this.barLeave()
        })
        .catch(() => {})
    },
    // 鼠标移出
    barLeave () {
      this.barTimer && clearInterval(this.barTimer)// 清除定时器
      this.barHourIndex = 0 // 播放所在下标
      this.barTimer = setInterval(() => { // 使得tootip每隔三秒自动显示
        this.leftBar.dispatchAction({
          type: 'showTip', // 根据 tooltip 的配置项显示提示框。
          seriesIndex: 0,
          dataIndex: this.barHourIndex
        })
        this.barHourIndex++
        if (this.barHourIndex >= this.barOption.series[0].data.length) {
          this.barHourIndex = 0
        }
      }, 1000)
    },
    // 鼠标移入
    barEnter () {
      this.barTimer && clearInterval(this.barTimer)// 清除定时器
    },
    // 微博传播排行
    getPowerRanking () {
      this.rightTitle = '传播力排行榜'
      this.rankingFirst = []
      this.rankingLast = []
      this.$http.get(this.$api.communicationPowerRanking)
        .then(res => {
          res.data.data.forEach((item, index) => {
            let add = {
              rank: '',
              value: ''
            }
            if (index < 5) {
              add.rank = index
              add.value = item
              this.rankingFirst.push(add)
            } else if (index >= 5 && index < 10) {
              add.rank = index
              add.value = item
              this.rankingLast.push(add)
            }
          })
        })
        .catch(() => {})
    },
    // 关系图
    getrelation () {
      this.rightTitle = '传播路径'
      let relation = echarts.init(document.getElementById('right-relation'))
      relation.setOption({
        tooltip: {},
        legend: [
          {
            formatter: function (name) {
              return echarts.format.truncateText(
                name,
                40,
                '14px Microsoft Yahei',
                '…'
              )
            },
            tooltip: {
              show: true
            },
            selectedMode: 'false',
            bottom: 10,
            data: [
              '刘备2239',
              '诸葛亮1892',
              '曹操979',
              '关羽948',
              '张飞408',
              '赵云393',
              '孙权390',
              '吕布384',
              '周瑜328',
              '魏延327'
            ]
          }
        ],
        //  图表距边框的距离,可选值：'百分比'¦ {number}（单位px）
        grid: {
          top: '5%', // 等价于 y: '16%'
          left: '1%',
          right: '1%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          show: true,
          feature: {
            dataView: {
              show: true,
              readOnly: true
            },
            restore: {
              show: true
            },
            saveAsImage: {
              show: true
            }
          }
        },
        animationDuration: 3000,
        animationEasingUpdate: 'quinticInOut',
        series: [
          {
            name: '三国演义',
            type: 'graph',
            layout: 'force',

            force: {
              repulsion: 50
            },
            data: [
              {
                name: '三国演义',
                // "x": 0,
                // y: 0,
                symbolSize: 80,
                draggable: 'true',
                value: 27
              },
              {
                name: '刘备2239',
                value: 15,
                symbolSize: 30,
                category: '刘备2239',
                draggable: 'true'
              },
              {
                name: '使君70',
                symbolSize: 3,
                category: '刘备2239',
                draggable: 'true',
                value: 1
              },
              {
                name: '玄德1770',
                symbolSize: 30,
                category: '刘备2239',
                draggable: 'true',
                value: 1
              },
              {
                name: '皇叔112',
                symbolSize: 15,
                category: '刘备2239',
                draggable: 'true',
                value: 1
              },
              {
                name: '诸葛亮1892',
                value: 60,
                symbolSize: 30,
                category: '诸葛亮1892',
                draggable: 'true'
              },
              {
                name: '孔明1643',
                symbolSize: 25,
                category: '诸葛亮1892',
                draggable: 'true',
                value: 1
              },
              {
                name: '卧龙40',
                symbolSize: 3,
                category: '诸葛亮1892',
                draggable: 'true',
                value: 1
              },
              {
                name: '曹操979',
                value: 5,
                symbolSize: 20,
                category: '曹操979',
                draggable: 'true'
              },
              {
                name: '孟德29',
                symbolSize: 3,
                category: '曹操979',
                draggable: 'true',
                value: 1
              },
              {
                name: '曹公44',
                symbolSize: 7,
                category: '曹操979',
                draggable: 'true',
                value: 1
              },
              {
                name: '关羽948',
                value: 40,
                symbolSize: 9,
                category: '关羽948',
                draggable: 'true'
              },
              {
                name: '云长431',
                symbolSize: 20,
                category: '关羽948',
                draggable: 'true',
                value: 1
              },
              {
                name: '关公508',
                symbolSize: 20,
                category: '关羽948',
                draggable: 'true',
                value: 1
              },
              {
                name: '张飞408',
                value: 8,
                symbolSize: 20,
                category: '张飞408',
                draggable: 'true'
              },
              {
                name: '翼德55',
                symbolSize: 5,
                category: '张飞408',
                draggable: 'true',
                value: 1
              },
              {
                name: '赵云393',
                value: 5,
                symbolSize: 15,
                category: '赵云393',
                draggable: 'true'
              },
              {
                name: '子龙95',
                symbolSize: 7,
                category: '赵云393',
                draggable: 'true',
                value: 1
              },
              {
                name: '孙权390',
                value: 30,
                symbolSize: 15,
                category: '孙权390',
                draggable: 'true'
              },
              {
                name: '仲谋10',
                symbolSize: 3,
                category: '孙权390',
                draggable: 'true',
                value: 1
              },
              {
                name: '吴侯72',
                symbolSize: 10,
                category: '孙权390',
                draggable: 'true',
                value: 1
              },
              {
                name: '吕布384',
                value: 20,
                symbolSize: 30,
                category: '吕布384',
                draggable: 'true'
              },
              {
                name: '奉先15',
                symbolSize: 3,
                category: '吕布384',
                draggable: 'true',
                value: 1
              },
              {
                name: '温侯12',
                symbolSize: 3,
                category: '吕布384',
                draggable: 'true',
                value: 1
              },
              {
                name: '周瑜328',
                value: 6,
                symbolSize: 18,
                category: '周瑜328',
                draggable: 'true'
              },
              {
                name: '公瑾60',
                symbolSize: 5,
                category: '周瑜328',
                draggable: 'true',
                value: 1
              },
              {
                name: '周郎35',
                symbolSize: 3,
                category: '周瑜328',
                draggable: 'true',
                value: 1
              },
              {
                name: '魏延327',
                value: 6,
                symbolSize: 18,
                category: '魏延327',
                draggable: 'true'
              },
              {
                name: '文长12',
                symbolSize: 3,
                category: '魏延327',
                draggable: 'true',
                value: 1
              }
            ],
            links: [
              {
                source: '三国演义',
                target: '刘备2239'
              },
              {
                source: '刘备2239',
                target: '使君70'
              },
              {
                source: '刘备2239',
                target: '玄德1770'
              },
              {
                source: '刘备2239',
                target: '皇叔112'
              },
              {
                source: '三国演义',
                target: '诸葛亮1892'
              },
              {
                source: '诸葛亮1892',
                target: '孔明1643'
              },
              {
                source: '诸葛亮1892',
                target: '卧龙40'
              },
              {
                source: '三国演义',
                target: '曹操979'
              },
              {
                source: '曹操979',
                target: '孟德29'
              },
              {
                source: '曹操979',
                target: '曹公44'
              },
              {
                source: '三国演义',
                target: '关羽948'
              },
              {
                source: '关羽948',
                target: '云长431'
              },
              {
                source: '关羽948',
                target: '关公508'
              },
              {
                source: '三国演义',
                target: '张飞408'
              },
              {
                source: '张飞408',
                target: '翼德55'
              },
              {
                source: '三国演义',
                target: '赵云393'
              },
              {
                source: '赵云393',
                target: '子龙95'
              },
              {
                source: '三国演义',
                target: '孙权390'
              },
              {
                source: '孙权390',
                target: '仲谋10'
              },
              {
                source: '孙权390',
                target: '吴侯72'
              },
              {
                source: '三国演义',
                target: '吕布384'
              },
              {
                source: '吕布384',
                target: '奉先15'
              },
              {
                source: '吕布384',
                target: '温侯12'
              },
              {
                source: '三国演义',
                target: '周瑜328'
              },
              {
                source: '周瑜328',
                target: '公瑾60'
              },
              {
                source: '周瑜328',
                target: '周郎35'
              },
              {
                source: '三国演义',
                target: '魏延327'
              },
              {
                source: '魏延327',
                target: '文长12'
              },
              {
                source: '三国演义',
                target: '法学院'
              }
            ],
            categories: [
              {
                name: '刘备2239'
              },
              {
                name: '诸葛亮1892'
              },
              {
                name: '曹操979'
              },
              {
                name: '关羽948'
              },
              {
                name: '张飞408'
              },
              {
                name: '赵云393'
              },
              {
                name: '孙权390'
              },
              {
                name: '吕布384'
              },
              {
                name: '周瑜328'
              },
              {
                name: '魏延327'
              },
              {}
            ],
            focusNodeAdjacency: true,
            roam: true,
            label: {
              normal: {
                show: true,
                position: 'top'
              }
            },
            lineStyle: {
              normal: {
                color: 'source',
                curveness: 0,
                type: 'solid'
              }
            }
          }
        ]
      })
      window.addEventListener('resize', function () {
        relation.resize()
      })
    },
    tabChannel () {
      this.getuser()
      this.switchUser()
      this.getDashboard()
      this.getLeftBar()
      if (this.regiontyp === 'wx') {
        this.getPowerRanking()
      } else if (this.regiontyp === 'wb') {
        this.getrelation()
      }
    },
    // 获取用户信息
    getuser () {
      if (this.regiontyp === 'wx') {
        this.$http
          .get(this.$api.wxInformation)
          .then(res => {
            this.userDetail = res.data.data
          })
          .catch(() => {})
      } else if (this.regiontyp === 'wb') {
        this.$http
          .get(this.$api.wbInformation)
          .then(res => {
            this.userDetail = res.data.data
          })
          .catch(() => {})
      }
    }
  },
  created () {
    this.getuser()
    this.switchUser()
  },
  mounted () {
    this.getDashboard()
    this.getLeftBar()
    if (this.regiontyp === 'wx') {
      this.getPowerRanking()
    } else if (this.regiontyp === 'wb') {
      this.getrelation()
    }
  }
}
</script>
<style lang="scss">
@import "./screen";
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
  height: 8rem;
  margin: 0 auto;
}
.screen-bg {
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
  height: 28%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
}
.line-center {
  width: 100%;
  height: 37%;
  position: relative;
  margin-bottom: 1.5rem;
}
.tab-right {
  position: absolute;
  width: 15%;
  right: 0;
  z-index: 9999999999;
}
.tab-right .el-button {
  width: 45%;
  background-color: rgba(0, 0, 0, 0.2);
  cursor: pointer;
  border-radius: 5px;
  color: #fff;
  border: 1px solid rgba(46, 189, 255, 0.555);
  z-index: 9999;
}
#line-tab {
  width: 100%;
  height: 98%;
}
.bottom {
  height: 35%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.left-bar,
.right-relation {
  width: 49%;
  height: 98%;
  border: 1px solid rgba(46, 189, 255, 0.555);
  z-index: 9999;
}
.bottom .title {
  display: flex;
  height: 3rem;
  margin-top: -1.5rem;
  margin-bottom: 1%;
}
.bottom .title span {
  border: 1px solid transparent;
  border-image: linear-gradient(
    to right,
    #0068b5 0%,
    #7cafe1 50%,
    #0068b5 100%
  );
  background: linear-gradient(
    to right,
    #0068b5 0%,
    #7cafe1 50%,
    #0068b5 100%
  ); /*用线性渐变创建图像*/
  display: inline-block;
  padding: 0.5rem 5rem;
  color: #fff;
  margin: 0 auto;
  font-size: 1.5rem;
}
#left-bar{
  width: 100%;
  height: 90%;
}
#right-relation {
  width: 100%;
  height: 100%;
}
/*上左样式*/
.top-left {
  width: 50%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.top-left img {
  max-height: 11rem;
  border-radius: 50%;
  vertical-align: middle;
}
.wx-image{
  width: 11rem;
  height: 11rem;
  border-radius: 50%;
  overflow: hidden;
  background-position: center;
  vertical-align: middle;
}
.message {
  width: 75%;
  color: #fff;
  padding: 1.5rem 0;
  box-sizing: border-box;
}
.login-name {
  font-size: 2.5rem;
  line-height: 3rem;
  margin-right: 2.5rem;
}
.el-radio-group {
  height: 3rem;
}
.region-title {
  font-size: 1.5rem;
  margin-right: 1.5rem;
  line-height: 3rem;
}
.region-cont {
  font-size: 1.5rem;
  color: #1beafc;
  line-height: 3rem;
}
.right-data .region-cont {
  color: #fff;
}
.region-brief {
  display: flex;
}
.region-brief .region-title {
  max-width: 27%;
  min-width: 6.5rem;
}
/*上右部分*/
.top-right {
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.right-data {
  width: 40%;
  padding: 1.5rem 0;
  padding-left: 5rem;
  color: #fff;
  box-sizing: border-box;
}
.top-right img {
  height: 80%;
}
.num {
  display: inline-block;
  width: 8rem;
  font-style: normal;
  text-align: right;
  text-align: center;
  font-size: 2rem;
}
.blue {
  color: #00c026;
}
.red {
  color: #e5001d;
}
.status {
  color: #fff;
}
.status-data {
  display: block;
  font-size: 2.5rem;
  border-radius: 5px;
  text-align: center;
  padding: 1rem 0;
}
.ordinary{
  background-color: rgba(255,0,0,0.8);
}
.good{
  background-color:rgba(0,255,255,0.8);
}
.best{
  background-color: #00c026;
}
.power-ranking,.power-route{
  width: 100%;
  height: 90%;
}
#dashboard{
  width: 40%;
  height: 100%;
}
.tab-right .btn-active {
  background-color: rgba(46, 189, 255, 0.555);
}
.ranking-box{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
}
.ranking-flex{
  width: 50%;
  height: 100%;
}
.ranking-flex ul{
  height: 100%;
}
.ranking-flex ul li:nth-of-type(2){
  background-color: rgba(255, 255, 255, 0.2);
}
.ranking-flex ul li:nth-of-type(4){
  background-color: rgba(255, 255, 255, 0.2);
}
.first-ranking ul li:nth-of-type(1) .ranking{
  padding: .3125rem;
  background-color: rgba(255,0,0,0.8);
  border-radius: 50%;
}
.first-ranking ul li:nth-of-type(2) .ranking{
  padding: .3125rem;
  background-color: rgba(0,255,0,0.8);
  border-radius: 50%;
}
.first-ranking ul li:nth-of-type(3) .ranking{
  padding: .3125rem;
  background-color: rgba(239,57,17,0.8);
  border-radius: 50%;
}
.ranking-flex li{
  height: 20%;
  font-size: 1.5rem;
  display: flex;
  justify-content: space-around;
  color: #fff;
}
.first-ranking li{
  padding: 0 14% 0 25%;
}
.last-ranking li{
  padding: 0 25% 0 14%;
}
.ranking-flex .ranking{
  display: inline-block;
  width: 1.5625rem;
  height: 1.5625rem;
  text-align: center;
  line-height: 1.5625rem;
  align-self: center;
}
.ranking-flex .power{
  display: inline-block;
  width: 60%;
  align-self: center;
  text-align: left;
}
</style>
