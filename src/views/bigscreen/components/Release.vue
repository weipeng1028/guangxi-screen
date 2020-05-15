<template>
  <div class="release">
    <div class="area-rank">
      <p class="title">
        文章发布量
      </p>
      <div class="release-box"
           id="release-num" @mouseenter="enter()" @mouseleave="leave()"></div>
    </div>
  </div>
</template>
<script>
import echarts from 'echarts/lib/echarts' // echarts
import 'echarts/lib/component/visualMap'
require('echarts/lib/chart/bar')
require('echarts/lib/component/tooltip')
export default {
  data () {
    return {
      timer: null,
      faultByHourIndex: 0,
      lineChart: '',
      option: '',
      data: [
        '桂林市',
        '贺州市',
        '梧州市',
        '玉林市',
        '北海市',
        '防城港市',
        '钦州市',
        '崇左市',
        '百色市',
        '河池市',
        '柳州市',
        '南宁市',
        '贵港市',
        '来宾市'
      ]
    }
  },
  methods: {
    getRelease () {
      let monitorBar = echarts.init(document.getElementById('release-num'))
      this.option = {
        tooltip: { // 提示框组件
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
            label: {
              backgroundColor: '#6a7985'
            }
          },
          textStyle: {
            color: '#fff',
            fontStyle: 'normal',
            fontFamily: '微软雅黑',
            fontSize: 12
          }
        },
        grid: {
          left: '3%',
          right: '5%',
          bottom: '0',
          top: '15%',
          // padding:'0 0 10 0',
          containLabel: true
        },
        legend: {// 图例组件，颜色和名字
          right: '10%',
          top: '5%',
          itemGap: 16,
          itemWidth: 18,
          itemHeight: 10,
          data: [{
            name: '微信'
            // icon:'image://../wwwroot/js/url2.png', //路径
          },
          {
            name: '微博'
          },
          {
            name: '网站'
          },
          {
            name: '头条'
          }],
          textStyle: {
            color: '#a8aab0',
            fontStyle: 'normal',
            fontFamily: '微软雅黑',
            fontSize: 12
          }
        },
        xAxis: [
          {
            type: 'category',
            data: this.data,
            axisLabel: { // 坐标轴刻度标签的相关设置。
              // interval: 0,//设置为 1，表示『隔一个标签显示一个标签』
              // margin:15,
              textStyle: {
                color: '#fff',
                fontStyle: 'normal',
                fontFamily: '微软雅黑',
                fontSize: 12
              },
              rotate: 50
            },
            axisTick: {// 坐标轴刻度相关设置。
              show: false
            },
            axisLine: {// 坐标轴轴线相关设置
              lineStyle: {
                color: '#fff',
                opacity: 0.2
              }
            },
            splitLine: { // 坐标轴在 grid 区域中的分隔线。
              show: false
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            splitNumber: 5,
            axisLabel: {
              textStyle: {
                color: '#a8aab0',
                fontStyle: 'normal',
                fontFamily: '微软雅黑',
                fontSize: 12
              }
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: ['#fff'],
                opacity: 0.06
              }
            }

          }
        ],
        series: [
          {
            name: '微信',
            type: 'bar',
            stack: '发布量',
            data: [15, 30, 45, 55, 60, 62, 80, 62, 60, 55, 45, 30, 15, 10],
            barWidth: 10,
            barGap: 0, // 柱间距离

            itemStyle: {
              normal: {
                show: true,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: '#03fb55'
                }, {
                  offset: 1,
                  color: '#03fb55'
                }])
              }
            }
          },
          {
            name: '微博',
            type: 'bar',
            stack: '发布量',
            data: [8, 25, 30, 35, 55, 62, 65, 55, 60, 45, 42, 15, 12, 5],
            barWidth: 10,

            itemStyle: {
              normal: {
                show: true,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: '#69CBF2'
                }, {
                  offset: 1,
                  color: '#69CBF2'
                }])
              }
            }
          },
          {
            name: '网站',
            type: 'bar',
            stack: '发布量',
            data: [9, 20, 33, 30, 66, 82, 52, 41, 66, 81, 17, 28, 33, 60],
            barWidth: 10,
            barGap: 0, // 柱间距离

            itemStyle: {
              normal: {
                show: true,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: '#5768EF'
                }, {
                  offset: 1,
                  color: '#5768EF'
                }])
              }
            }
          },
          {
            name: '头条',
            type: 'bar',
            stack: '发布量',
            data: [60, 31, 52, 55, 75, 10, 80, 44, 31, 20, 80, 33, 23, 40],
            barWidth: 10,
            barGap: 0, // 柱间距离

            itemStyle: {
              normal: {
                show: true,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: '#fffaa0'
                }, {
                  offset: 1,
                  color: '#fffaa0'
                }])
              }
            }
          }
        ]
      }
      monitorBar.setOption(this.option)
      window.addEventListener('resize', function () {
        monitorBar.resize()
      })
      this.lineChart = monitorBar
      this.leave()
    },
    // 鼠标移出
    leave () {
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
    enter () {
      this.timer && clearInterval(this.timer)// 清除定时器
    }
  },
  mounted () {
    this.getRelease()
  }
}
</script>
<style scoped>
.release {
  height: 100%;
}
.area-rank {
  height: 100%;
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
.release-box {
  overflow: hidden;
  height: 80%;
  background: url('../../../assets/images/articleBg-All.png') no-repeat bottom
    center;
  background-size: 100% 99%;
  box-sizing: border-box;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.9)
}
</style>
