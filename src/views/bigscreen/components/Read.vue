<template>
  <div class="read">
    <div class="area-rank">
      <p class="title">
        阅读量趋势
      </p>
      <div class="read-box"
           id="read-num"
           @mouseenter="readEnter()"
           @mouseleave="readLeave()"></div>
    </div>
  </div>
</template>
<script>
import echarts from 'echarts/lib/echarts' // echarts
import 'echarts/lib/component/visualMap'
require('echarts/lib/chart/line')
require('echarts/lib/component/tooltip')
export default {
  data () {
    return {
      timer: null,
      faultByHourIndex: 0,
      lineChart: '',
      option: '',
      data: []
    }
  },
  methods: {
    getRead () {
      let monitorBar = echarts.init(document.getElementById('read-num'))
      this.$http.get(this.$api.channelsDayReadSum)
        .then(res => {
          if (res.data.data) {
            let tt = []
            let wx = []
            let wb = []
            res.data.data.tt.forEach((item, index) => {
              this.data.push(item.date)
              tt.push(item.sum)
              wx.push(res.data.data.wx[index].sum)
              wb.push(res.data.data.wb[index].sum)
            })
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
                  fontSize: 18
                }
              },
              grid: {
                left: '6%',
                right: '5%',
                bottom: '3%',
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
                // {
                //   name: '网站'
                // },
                {
                  name: '头条'
                }],
                textStyle: {
                  color: '#a8aab0',
                  fontStyle: 'normal',
                  fontFamily: '微软雅黑',
                  fontSize: 18
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
                      fontSize: 20
                    },
                    rotate: 0
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
                      fontSize: 18
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
                  type: 'line',
                  data: wx,
                  barWidth: 10,
                  barGap: 0, // 柱间距离
                  // label: {//图形上的文本标签
                  //     normal: {
                  //       show: true,
                  //       position: 'top',
                  //       textStyle: {
                  //           color: '#a8aab0',
                  //           fontStyle: 'normal',
                  //           fontFamily: '微软雅黑',
                  //           fontSize: 12,
                  //       },
                  //     },
                  // },
                  itemStyle: {
                    normal: {
                      show: true,
                      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                          offset: 0,
                          color: 'rgba(12,255,0, 1)'
                        },
                        {
                          offset: 1,
                          color: 'rgba(12,255,0, 0)'
                        }
                      ]),
                      barBorderRadius: 50,
                      borderWidth: 0
                    }
                  }
                },
                {
                  name: '微博',
                  type: 'line',
                  data: wb,
                  barWidth: 10,
                  barGap: 0, // 柱间距离
                  // label: {//图形上的文本标签
                  //     normal: {
                  //       show: true,
                  //       position: 'top',
                  //       textStyle: {
                  //           color: '#a8aab0',
                  //           fontStyle: 'normal',
                  //           fontFamily: '微软雅黑',
                  //           fontSize: 12,
                  //       },
                  //     },
                  // },
                  itemStyle: {
                    normal: {
                      show: true,
                      color: '#ff000c',
                      barBorderRadius: 50,
                      borderWidth: 0
                    }
                  }
                },
                // {
                //   name: '网站',
                //   type: 'line',
                //   data: [9, 20, 33, 30, 66, 82, 52, 41, 66, 81, 17, 28, 33, 60],
                //   barWidth: 10,
                //   barGap: 0, // 柱间距离
                //   // label: {//图形上的文本标签
                //   //     normal: {
                //   //       show: true,
                //   //       position: 'top',
                //   //       textStyle: {
                //   //           color: '#a8aab0',
                //   //           fontStyle: 'normal',
                //   //           fontFamily: '微软雅黑',
                //   //           fontSize: 12,
                //   //       },
                //   //     },
                //   // },
                //   itemStyle: {
                //     normal: {
                //       show: true,
                //       color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                //         offset: 0,
                //         color: '#5768EF'
                //       }, {
                //         offset: 1,
                //         color: '#5768EF'
                //       }]),
                //       barBorderRadius: 50,
                //       borderWidth: 0
                //     }
                //   }
                // },
                {
                  name: '头条',
                  type: 'line',
                  data: tt,
                  itemStyle: {
                    normal: {
                      show: true,
                      color: '#f6ff00',
                      barBorderRadius: 50,
                      borderWidth: 0
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
            this.readLeave()
          }
        })
        .catch(() => {
        })
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
    }
  },
  mounted () {
    this.getRead()
  }
}
</script>
<style scoped>
.read {
  height: 100%;
}
.area-rank {
  height: 100%;
}
.read-box {
  overflow: hidden;
  height: 80%;
  width: 100%;
  margin: auto;
  background: url('../../../assets/images/articleBg-All.png') no-repeat bottom center;
  background-size: 100% 99%;
  box-sizing: border-box;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.9)
}
.area-rank .title {
  color: #fff;
  font-size: 0.33rem;
  text-align: center;
  height: 20%;
  line-height: 1.11rem;
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
</style>
