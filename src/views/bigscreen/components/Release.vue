<template>
  <div class="release">
    <div class="area-rank">
      <p class="title">
        文章传播排行
      </p>
      <div class="release-box" id="release-num"></div>
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
      option: ''
    }
  },
  methods: {
    getRelease () {
      let monitorBar = echarts.init(document.getElementById('release-num'))
      this.$http.get(this.$api.monthReadDifference)
        .then(res => {
          // 排行数据
          var option = {
            tooltip: {
              show: true,
              trigger: 'axis',

              axisPointer: {
                // 坐标轴指示器，坐标轴触发有效
                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
              }
            },
            legend: {
              data: ['趋势', '三十天', '六十天', '九十天'],
              top: '5%',
              center: 'center',
              textStyle: {
                color: 'rgba(250,250,250,0.6)',
                fontSize: 20
              }
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
            },
            xAxis: [
              {
                type: 'category',
                data: ['微信', '微博', '头条'],
                axisLine: {
                  show: true, // 隐藏X轴轴线
                  lineStyle: {
                    color: '#fff',
                    width: 2
                  }
                },
                axisTick: {
                  show: true // 隐藏X轴刻度
                },
                axisLabel: {
                  show: true,
                  textStyle: {
                    color: 'rgba(250,250,250,1)', // X轴文字颜色
                    fontSize: 20
                  }
                }
              }
            ],
            yAxis: [
              {
                type: 'value',
                /* name: "亿元", */
                nameTextStyle: {
                  color: '#fff',
                  fontSize: 20
                },
                splitLine: {
                  show: false
                },
                axisTick: {
                  show: true
                },
                axisLine: {
                  show: true,
                  lineStyle: {
                    color: '#26D9FF',
                    width: 2
                  }
                },
                axisLabel: {
                  show: true,
                  textStyle: {
                    color: 'rgba(250,250,250,1)',
                    fontSize: 20
                  }
                }
              },
              {
                type: 'value',
                show: false
              }
            ],
            series: [
              {
                name: '趋势',
                type: 'line',
                yAxisIndex: 0, // 使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用
                smooth: true, // 平滑曲线显示
                showAllSymbol: true, // 显示所有图形。
                symbol: 'circle', // 标记的图形为实心圆
                symbolSize: 8, // 标记的大小
                itemStyle: {
                  // 折线拐点标志的样式
                  color: '#1045A0',
                  borderColor: '#3D7EEB',
                  width: 2,
                  shadowColor: '#3D7EEB',
                  shadowBlur: 4
                },
                lineStyle: {
                  color: '#3D7EEB',
                  width: 2,
                  shadowColor: '#3D7EEB',
                  shadowBlur: 4
                },
                areaStyle: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      color: 'rgba(61,126,235, 0.5)'
                    },
                    {
                      offset: 1,
                      color: 'rgba(61,126,235, 0)'
                    }
                  ])
                },
                data: res.data.data[0].data
              },
              {
                name: '三十天',
                type: 'bar',
                barWidth: 30,
                itemStyle: {
                  normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                      {
                        offset: 0,
                        color: 'rgba(12,255,0, 1)'
                      },
                      {
                        offset: 1,
                        color: 'rgba(12,255,0, 0)'
                      }
                    ])
                    // borderColor: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    //   { offset: 0, color: 'rgba(160,196,225, 1)' }, { offset: 1, color: 'rgba(61,126,235, 1)' }
                    // ]),
                    // borderWidth: 2
                  }
                },
                data: res.data.data[0].data
              },
              {
                name: '六十天',
                type: 'bar',
                barWidth: 30,
                itemStyle: {
                  normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                      { offset: 0, color: 'rgba(15,197,243,1)' },
                      { offset: 1, color: 'rgba(15,197,243,0)' }
                    ])
                  //   borderColor: new echarts.graphic.LinearGradient(
                  //     0,
                  //     0,
                  //     0,
                  //     1,
                  //     [
                  //       { offset: 0, color: 'rgba(180,240,255,1)' },
                  //       { offset: 1, color: 'rgba(15,197,243,1)' }
                  //     ]
                  //   ),
                  //   borderWidth: 2
                  }
                },
                data: res.data.data[1].data
              },
              {
                name: '九十天',
                type: 'bar',
                barWidth: 30,
                itemStyle: {
                  normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                      {
                        offset: 0,
                        color: 'rgba(246,255,0, 1)'
                      },
                      {
                        offset: 1,
                        color: 'rgba(246,255,0, 0)'
                      }
                    ])
                    // borderColor: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    //   { offset: 0, color: 'rgba(255,0,84, 1)' }, { offset: 1, color: 'rgba(61,126,160, 1)' }
                    // ]),
                    // borderWidth: 2
                  }
                },
                data: res.data.data[2].data
              }
            ]
          }
          monitorBar.setOption(option, true)
          window.addEventListener('resize', function () {
            monitorBar.resize()
          })
          this.lineChart = monitorBar
        })
        .catch(() => {})
    }
  },
  mounted () {
    this.getRelease()
  },
  destroyed () {
    clearInterval(this.timer)
    this.timer = null
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
  font-size: 0.33rem;
  text-align: center;
  height: 1.11rem;
  line-height: 1.11rem;
}
.area-rank .title::after {
  content: "";
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
  content: "";
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
  background: url("../../../assets/images/articleBg-All.png") no-repeat bottom
    center;
  background-size: 100% 99%;
  box-sizing: border-box;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.9);
}
</style>
