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
      this.$http
        .get(this.$api.monthReadDifference)
        .then(res => {
          // console.log(res.data.data)
          // 排行数据
          var rankData = [
            {
              data: [
                {
                  name: '微信',
                  value: 180.45
                },
                {
                  name: '微博',
                  value: 152.2
                },
                {
                  name: '头条',
                  value: 147.91
                }
              ]
            },
            {
              data: [
                {
                  name: '微信',
                  value: 197.67
                },

                {
                  name: '微博',
                  value: 165.53
                },

                {
                  name: '头条',
                  value: 147.91
                },

                {
                  name: '抖音',
                  value: 107.92
                }
              ]
            },

            {
              data: [
                {
                  name: '微信',
                  value: 249.05
                },

                {
                  name: '微博',
                  value: 169.16
                },

                {
                  name: '头条',
                  value: 147.91
                }
              ]
            },

            {
              data: [
                {
                  name: '微信',
                  value: 274.44
                },

                {
                  name: '微博',
                  value: 178.64
                },

                {
                  name: '头条',
                  value: 157.74
                }
              ]
            },

            {
              data: [
                {
                  name: '微信',
                  value: 284.08
                },

                {
                  name: '微博',
                  value: 185.26
                },

                {
                  name: '头条',
                  value: 180.4
                }
              ]
            },

            {
              data: [
                {
                  name: '微信',
                  value: 297.14
                },
                {
                  name: '微博',
                  value: 202.22
                },

                {
                  name: '头条',
                  value: 188.48
                }
              ]
            },

            {
              data: [
                {
                  name: '微信',
                  value: 313.22
                },

                {
                  name: '微博',
                  value: 202.35
                },

                {
                  name: '头条',
                  value: 191.12
                }
              ]
            },

            {
              data: [
                {
                  name: '微信',
                  value: 315.3
                },

                {
                  name: '微博',
                  value: 202.35
                },

                {
                  name: '头条',
                  value: 191.12
                }
              ]
            },

            {
              data: [
                {
                  name: '微信',
                  value: 315.3
                },

                {
                  name: '微博',
                  value: 202.35
                },

                {
                  name: '头条',
                  value: 191.12
                }
              ]
            },

            {
              data: [
                {
                  name: '微信',
                  value: 315.3
                },

                {
                  name: '微博',
                  value: 202.35
                },

                {
                  name: '头条',
                  value: 191.12
                }
              ]
            },

            {
              data: [
                {
                  name: '微信',
                  value: 315.3
                },
                {
                  name: '微博',
                  value: 202.35
                },

                {
                  name: '头条',
                  value: 191.12
                }
              ]
            },

            {
              data: [
                {
                  name: '微信',
                  value: 315.3
                },

                {
                  name: '微博',
                  value: 202.35
                },

                {
                  name: '头条',
                  value: 191.12
                }
              ]
            },

            {
              data: [
                {
                  name: '微信',
                  value: 322.49
                },
                {
                  name: '微博',
                  value: 202.35
                },

                {
                  name: '头条',
                  value: 191.12
                }
              ]
            },

            {
              data: [
                {
                  name: '微信',
                  value: 550
                },

                {
                  name: '微博',
                  value: 480
                },

                {
                  name: '头条',
                  value: 420
                }
              ]
            },

            {
              category: '2019-05-19',
              data: [
                {
                  name: '微信',
                  value: 600
                },
                {
                  name: '微博',
                  value: 550
                },

                {
                  name: '头条',
                  value: 450
                }
              ]
            },

            {
              data: [
                {
                  name: '微信',
                  value: 666
                },
                {
                  name: '微博',
                  value: 555
                },

                {
                  name: '头条',
                  value: 485
                }
              ]
            }
          ]
          var wxImg = new Image()
          var wbImg = new Image()
          var ydImg = new Image()
          wxImg.src = require('@/assets/images/wxTop.png')
          wbImg.src = require('@/assets/images/wbTop.png')
          ydImg.src = require('@/assets/images/ydTop.png')
          var playInterval = 50
          // 千分位
          function formatNum (strNum) {
            if (Math.round(strNum) <= 10 && strNum.length <= 3) {
              return strNum
            }
            var u0 = 0
            while (Math.round(strNum) > 1000000 && u0 < 3) {
              strNum = Math.round(Math.round(strNum) / 10000)
              u0 = u0 + 1
            }

            if (!/^(\+|-)?(\d+)(\.\d+)?$/.test(strNum)) {
              return strNum
            }
            // var a = RegExp.$1
            var b = RegExp.$2
            // var c = RegExp.$3
            var re = new RegExp()
            re.compile('(\\d)(\\d{3})(,|$)')
            while (re.test(b)) {
              b = b.replace(re, '$1,$2$3')
            }
            return b
          }
          // 基础设置
          var option = {
            baseOption: {
              animationDurationUpdate: playInterval * 1.5,
              animationEasingUpdate: 'quinticInOut',
              timeline: {
                show: false,
                axisType: 'category',
                orient: 'vertical',
                autoPlay: true,
                loop: false,
                playInterval: playInterval,
                left: null,
                right: 30,
                top: 330,
                bottom: 100,
                height: null,
                label: {
                  normal: {
                    show: true,
                    interval: 0
                  }
                },
                symbol: 'none',
                lineStyle: {
                  color: '#ccc',
                  show: false
                },
                checkpointStyle: {
                  symbol: 'none',
                  color: '#bbb',
                  borderColor: '#777',
                  show: false,
                  borderWidth: 1
                },
                controlStyle: {
                  showNextBtn: false,
                  showPrevBtn: false,
                  normal: {
                    color: '#666',
                    show: false,
                    borderColor: '#666'
                  },
                  emphasis: {
                    color: '#aaa',
                    borderColor: '#aaa'
                  }
                },
                data: rankData.map(function (ele) {
                  return ele.date
                })
              },
              grid: [
                {
                  left: '8%',
                  right: '5%',
                  top: '10%',
                  height: 'auto',
                  bottom: '10%'
                }
              ],
              xAxis: [{}],
              yAxis: [{}],
              series: [
                {
                  id: '30',
                  type: 'bar',
                  itemStyle: {
                    color: {
                      image: wxImg,
                      repeat: 'repeat'
                    }
                  },
                  barWidth: 20,
                  stack: 'a',
                  yAxisIndex: 0,
                  tooltip: {
                    show: false
                  },
                  label: {
                    normal: {
                      show: true,
                      position: 'top',
                      distance: 10,
                      formatter: function (param) {
                        return param.value + '%'
                      },
                      textStyle: {
                        color: '#ffffff',
                        fontSize: '16'
                      }
                    }
                  },
                  data: []
                },
                {
                  id: '60',
                  type: 'bar',
                  itemStyle: {
                    color: {
                      image: wbImg,
                      repeat: 'repeat'
                    }
                  },
                  barWidth: 20,
                  stack: 'b',
                  yAxisIndex: 0,
                  tooltip: {
                    show: false
                  },
                  label: {
                    normal: {
                      show: true,
                      position: 'top',
                      distance: 10,
                      formatter: function (param) {
                        return param.value + '%'
                      },
                      textStyle: {
                        color: '#ffffff',
                        fontSize: '16'
                      }
                    }
                  },
                  data: []
                },
                {
                  id: '90',
                  type: 'bar',
                  itemStyle: {
                    color: {
                      image: ydImg,
                      repeat: 'repeat'
                    }
                  },
                  barWidth: 20,
                  stack: 'c',
                  yAxisIndex: 0,
                  tooltip: {
                    show: false
                  },
                  label: {
                    normal: {
                      show: true,
                      position: 'top',
                      distance: 10,
                      formatter: function (param) {
                        return param.value + '%'
                      },
                      textStyle: {
                        color: '#ffffff',
                        fontSize: '16'
                      }
                    }
                  },
                  data: []
                }
              ]
            },
            options: []
          }
          for (var i = 0; i < 16; i++) {
            option.options.push({
              xAxis: [
                {
                  type: 'category',
                  show: true,
                  // max: xMax,
                  axisLabel: {
                    textStyle: {
                      color: 'rgba(255,255,255,0.9)',
                      fontFamily: 'Microsoft YaHei'
                    }
                  },
                  data: rankData[i].data
                    .map(function (ele) {
                      return ele.name
                    })
                    .reverse()
                }
              ],
              yAxis: [
                {
                  type: 'value',
                  axisTick: {
                    show: false
                  },
                  axisLine: {
                    show: true,
                    lineStyle: {
                      color: 'rgba(121,121,121,0.3)'
                    }
                  },
                  axisLabel: {
                    // interval: 0,
                    // rotate: 40,
                    textStyle: {
                      color: 'rgba(255,255,255,0.9)',
                      fontFamily: 'Microsoft YaHei'
                    }
                  }
                }
              ],
              series: [
                {
                  id: '30',
                  itemStyle: {
                    normal: {
                      label: {
                        show: true,
                        position: 'top',
                        formatter: '{c}%'
                      },
                      shadowBlur: 20,
                      shadowColor: 'rgba(40, 40, 40, 0.5)'
                    },
                    color: {
                      image: wxImg,
                      repeat: 'repeat'
                    }
                  },
                  stack: 'a',
                  yAxisIndex: 0,
                  label: {
                    normal: {
                      position: 'top',
                      formatter: function (p) {
                        return p.name + ': ' + formatNum(p.value)
                      }
                    }
                  },
                  data: rankData[i].data
                    .map(function (ele) {
                      return ele.value
                    })
                    .sort(function (a, b) {
                      return a > b
                    })
                },
                {
                  id: '60',
                  itemStyle: {
                    normal: {
                      label: {
                        show: true,
                        position: 'top',
                        formatter: '{c}%'
                      },
                      shadowBlur: 20,
                      shadowColor: 'rgba(40, 40, 40, 0.5)'
                    },
                    color: {
                      image: wbImg,
                      repeat: 'repeat'
                    }
                  },
                  stack: 'b',
                  yAxisIndex: 0,
                  label: {
                    normal: {
                      position: 'top',
                      formatter: function (p) {
                        return p.name + ': ' + formatNum(p.value)
                      }
                    }
                  },
                  data: rankData[i].data
                    .map(function (ele) {
                      return ele.value
                    })
                    .sort(function (a, b) {
                      return a > b
                    })
                },
                {
                  id: '90',
                  itemStyle: {
                    normal: {
                      label: {
                        show: true,
                        position: 'top',
                        formatter: '{c}%'
                      },
                      shadowBlur: 20,
                      shadowColor: 'rgba(40, 40, 40, 0.5)'
                    },
                    color: {
                      image: ydImg,
                      repeat: 'repeat'
                    }
                  },
                  stack: 'c',
                  yAxisIndex: 0,
                  label: {
                    normal: {
                      position: 'top',
                      formatter: function (p) {
                        return p.name + ': ' + formatNum(p.value)
                      }
                    }
                  },
                  data: rankData[i].data
                    .map(function (ele) {
                      return ele.value
                    })
                    .sort(function (a, b) {
                      return a > b
                    })
                }
              ]
            })
          }
          option = {
            tooltip: {
              show: true,
              trigger: 'axis',

              axisPointer: {
                // 坐标轴指示器，坐标轴触发有效
                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
              }
            },
            legend: {
              data: ['趋势', 'Thirty', 'Sixty', 'Ninety'],
              top: '5%',
              center: 'center',
              textStyle: {
                color: 'rgba(250,250,250,0.6)',
                fontSize: 16
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
                    color: '#26D9FF',
                    width: 2
                  }
                },
                axisTick: {
                  show: true // 隐藏X轴刻度
                },
                axisLabel: {
                  show: true,
                  textStyle: {
                    color: 'rgba(250,250,250,0.6)', // X轴文字颜色
                    fontSize: 16
                  }
                }
              }
            ],
            yAxis: [
              {
                type: 'value',
                /* name: "亿元", */
                nameTextStyle: {
                  color: '#ebf8ac',
                  fontSize: 16
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
                    color: 'rgba(250,250,250,0.6)',
                    fontSize: 16
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
                name: 'Thirty',
                type: 'bar',
                barWidth: 15,
                itemStyle: {
                  normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                      {
                        offset: 0,
                        color: 'rgba(61,126,235, 1)'
                      },
                      {
                        offset: 1,
                        color: 'rgba(61,126,235, 0)'
                      }
                    ]),
                    borderColor: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                      { offset: 0, color: 'rgba(160,196,225, 1)' }, { offset: 1, color: 'rgba(61,126,235, 1)' }
                    ]),
                    borderWidth: 2
                  }
                },
                data: res.data.data[0].data
              },
              {
                name: 'Sixty',
                type: 'bar',
                barWidth: 15,
                itemStyle: {
                  normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                      { offset: 0, color: 'rgba(15,197,243,1)' },
                      { offset: 1, color: 'rgba(15,197,243,0)' }
                    ]),
                    borderColor: new echarts.graphic.LinearGradient(
                      0,
                      0,
                      0,
                      1,
                      [
                        { offset: 0, color: 'rgba(180,240,255,1)' },
                        { offset: 1, color: 'rgba(15,197,243,1)' }
                      ]
                    ),
                    borderWidth: 2
                  }
                },
                data: res.data.data[1].data
              },
              {
                name: 'Ninety',
                type: 'bar',
                barWidth: 15,
                itemStyle: {
                  normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                      {
                        offset: 0,
                        color: 'rgba(160,126,235, 1)'
                      },
                      {
                        offset: 1,
                        color: 'rgba(160,126,235, 0)'
                      }
                    ]),
                    borderColor: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                      { offset: 0, color: 'rgba(160,196,225, 1)' }, { offset: 1, color: 'rgba(61,126,160, 1)' }
                    ]),
                    borderWidth: 2
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
  font-size: 1.5rem;
  text-align: center;
  height: 20%;
  line-height: 5rem;
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
