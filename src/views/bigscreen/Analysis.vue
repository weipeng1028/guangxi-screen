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
          <img :src="require('@/assets/images/header.png')">
          <div class="message">
            <div class="region-type">
              <span class="login-name">广西检察院</span>
              <el-radio-group v-model="regiontyp">
                <el-radio label="wx">微信公众号</el-radio>
                <el-radio label="wb">微博</el-radio>
                <el-radio label="tt">头条</el-radio>
                <el-radio label="dy">抖音</el-radio>
              </el-radio-group>
            </div>
            <div class="region-name">
              <span class="region-title">微信名称:</span>
              <span class="region-cont"
                    style="margin-right:1.5rem">账户简介内容</span>
              <span class="region-title">微信账号:</span>
              <span class="region-cont">账户简介内容</span>
            </div>
            <div class="region-brief">
              <span class="region-title">账号简介:</span>
              <span class="region-cont">账户简介内容,账户简介内容,账户简介内容,账户简介内容,账户简介内容,账户简介内容,账户简介内容</span>
            </div>
          </div>
        </div>
        <div class="top-right">
          <div class="right-data">
            <div class="region-name">
              <span class="region-title">发稿量:</span>
              <span class="region-cont"><i class="blue num">23423</i>个</span>
            </div>
            <div class="region-name">
              <span class="region-title">粉丝数:</span>
              <span class="region-cont"><i class="red num">21423</i>个</span>
            </div>
            <div class="region-name">
              <span class="region-title">最后更新时间:</span>
              <span class="region-cont">2020/4/28</span>
            </div>
          </div>
          <!-- 仪表盘 -->
          <div id="dashboard"></div>
          <div class="status">
            <span class="region-title">运行状态</span>
            <span class="status-data">良好</span>
          </div>
        </div>
      </div>
      <div class="line-center">
        <div class="tab-right">
          <el-button size="small"
                     :class="switchTab?'btn-active':''"
                     @click="switchUser">用户互动</el-button>
          <el-button size="small"
                     :class="switchTab?'':'btn-active'"
                     @click="switchArticle">最新文章</el-button>
        </div>
        <!-- 传播趋势图 -->
        <div id="line-tab"></div>
      </div>
      <div class="bottom">
        <div class="left-bar">
          <div class="title">
            <span>热门文章Top10</span>
          </div>
          <div id="left-bar"></div>
        </div>
        <div class="right-relation">
          <div class="title">
            <span>传播路径</span>
          </div>
          <div id="right-relation"></div>
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
      regiontyp: 'wx',
      switchTab: true
    }
  },
  methods: {
    // 仪表盘
    getDashboard () {
      let columnar = echarts.init(document.getElementById('dashboard'))
      let value = 83
      columnar.setOption({
        title: {
          text: `${value}分`,
          subtext: '综合稿件评分',
          left: 'center',
          top: 'center', // top待调整
          textStyle: {
            color: '#fff',
            fontSize: 20,
            fontFamily: 'DINAlternate-Bold'
          },
          subtextStyle: {
            color: '#ff',
            fontSize: 15,
            fontFamily: 'PingFangSC-Regular',
            top: 'center'
          },
          itemGap: -4 // 主副标题间距
        },
        xAxis: {
          splitLine: {
            show: false
          },
          axisLabel: {
            show: false
          },
          axisLine: {
            show: false
          },
          data: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
        },
        yAxis: {
          splitLine: {
            show: false
          },
          axisLabel: {
            show: false
          },
          axisLine: {
            show: false
          }
        },
        series: [
          // 内圆
          {
            type: 'pie',
            radius: ['0', '80%'],
            center: ['50%', '50%'],
            z: 0,
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: '#1147A1'
                },
                {
                  offset: 0.5,
                  color: '#423DB3'
                },
                {
                  offset: 1,
                  color: '#1147A1'
                }
                ]),
                label: {
                  show: false
                },
                labelLine: {
                  show: false
                }
              }
            },
            label: {
              normal: {
                position: 'center'

              }
            },
            data: [100]
          },
          // 进度圈
          {
            type: 'pie',
            clockWise: false,
            radius: ['88%', '88%'],
            data: [{
              value: value,
              itemStyle: {
                normal: {
                  borderWidth: 10,
                  borderColor: {
                    colorStops: [{
                      offset: 0,
                      color: '#7940FE' || '#00cefc' // 0% 处的颜色
                    }, {
                      offset: 1,
                      color: '#2A69EC' || '#367bec' // 100% 处的颜色
                    }]
                  },
                  color: { // 完成的圆环的颜色
                    colorStops: [{
                      offset: 0,
                      color: '#7940FE' || '#00cefc' // 0% 处的颜色
                    }, {
                      offset: 1,
                      color: '#2A69EC' || '#367bec' // 100% 处的颜色
                    }]
                  },
                  label: {
                    show: false
                  },
                  labelLine: {
                    show: false
                  }
                }
              }
            },
            {
              // name: 'gap',
              value: 100 - value,
              itemStyle: {
                normal: {
                  label: {
                    show: false
                  },
                  labelLine: {
                    show: false
                  },
                  color: 'rgba(0, 0, 0, 0)',
                  borderColor: 'rgba(0, 0, 0, 0)',
                  borderWidth: 0
                }
              }
            }
            ]
          },
          // 刻度尺
          {
            // name: "白色圈刻度",
            type: 'gauge',
            radius: '98%',
            startAngle: 225, // 刻度起始
            endAngle: -134.8, // 刻度结束
            z: 4,
            axisTick: {
              show: true,
              lineStyle: {
                width: 2,
                color: 'rgba(1,244,255, 0.9)'
              }
            },
            splitLine: {
              length: 16, // 刻度节点线长度
              lineStyle: {
                width: 2,
                color: 'rgba(1,244,255, 0.9)'
              } // 刻度节点线
            },
            axisLabel: {
              color: 'rgba(255,255,255,0)',
              fontSize: 12
            }, // 刻度节点文字颜色
            pointer: {
              show: false
            },
            axisLine: {
              lineStyle: {
                opacity: 0
              }
            },
            detail: {
              show: false
            },
            data: [{
              value: 0,
              name: ''
            }]
          }
        ]
      })
      // window.onresize = columnar.resize
      window.addEventListener('resize', function () {
        columnar.resize()
      })
    },
    // 用户互动数据
    switchUser () {
      this.switchTab = true
    },
    // 最新文章数据
    switchArticle () {
      this.switchTab = false
    },
    // 折线图
    gitLineCenter () {
      let lineCenter = echarts.init(document.getElementById('line-tab'))
      lineCenter.setOption({
        // 标题
        title: {
          text: '传播趋势图',
          textStyle: { // 设置主标题风格
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
          data: ['地区1', '地区2', '地区3', '地区4', '地区5', '地区6']
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
        series: [{
          name: '点赞数',
          type: 'line',
          areaStyle: {
            type: 'default',
            opacity: 0.1
          },
          data: [40, 20, 35, 60, 55, 10]
        }]
      })
      // window.onresize = lineCenter.resize
      window.addEventListener('resize', function () {
        lineCenter.resize()
      })
    },
    // 柱状图
    getLeftBar () {
      let leftBar = echarts.init(document.getElementById('left-bar'))
      var data = [30, 29, 28, 27, 26, 25, 24, 23, 22, 21]
      let option = {
        tooltip: {
          show: 'true',
          trigger: 'item',
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
          bottom: '1%',
          containLabel: true
        },
        xAxis: [{
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
            inside: false,
            textStyle: {
              color: '#bac0c0',
              fontWeight: 'normal',
              fontSize: '12'
            }
          },
          data: ['地区1', '地区2', '地区3', '地区4', '地区5', '地区6', '地区7', '地区8', '地区9', '地区10']
        }, {
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
          data: ['地区1', '地区2', '地区3', '地区4', '地区5', '地区6', '地区7', '地区8', '地区9', '地区10']
        }],
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
        series: [{
          name: '阅读量',
          type: 'bar',
          itemStyle: {
            normal: {
              show: true,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: '#00c0e9'
              }, {
                offset: 1,
                color: '#3b73cf'
              }]),
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
          data: data
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
          data: [30, 30, 30, 30, 30, 30, 30, 30, 30, 30]
        }
        ]
      }
      leftBar.setOption(option)
      window.addEventListener('resize', function () {
        leftBar.resize()
      })
    },
    // 关系图
    getrelation () {
      let relation = echarts.init(document.getElementById('right-relation'))
      relation.setOption({
        tooltip: {},
        legend: [{
          formatter: function (name) {
            return echarts.format.truncateText(name, 40, '14px Microsoft Yahei', '…')
          },
          tooltip: {
            show: true
          },
          selectedMode: 'false',
          bottom: 10,
          data: ['刘备2239', '诸葛亮1892', '曹操979', '关羽948', '张飞408', '赵云393', '孙权390', '吕布384', '周瑜328', '魏延327']
        }],
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
        series: [{
          name: '三国演义',
          type: 'graph',
          layout: 'force',

          force: {
            repulsion: 50
          },
          data: [
            {
              'name': '三国演义',
              // "x": 0,
              // y: 0,
              'symbolSize': 80,
              'draggable': 'true',
              'value': 27

            }, {
              'name': '刘备2239',
              'value': 15,
              'symbolSize': 30,
              'category': '刘备2239',
              'draggable': 'true'
            }, {
              'name': '使君70',
              'symbolSize': 3,
              'category': '刘备2239',
              'draggable': 'true',
              'value': 1
            }, {
              'name': '玄德1770',
              'symbolSize': 30,
              'category': '刘备2239',
              'draggable': 'true',
              'value': 1
            }, {
              'name': '皇叔112',
              'symbolSize': 15,
              'category': '刘备2239',
              'draggable': 'true',
              'value': 1
            }, {
              'name': '诸葛亮1892',
              'value': 60,
              'symbolSize': 30,
              'category': '诸葛亮1892',
              'draggable': 'true'
            }, {
              'name': '孔明1643',
              'symbolSize': 25,
              'category': '诸葛亮1892',
              'draggable': 'true',
              'value': 1
            }, {
              'name': '卧龙40',
              'symbolSize': 3,
              'category': '诸葛亮1892',
              'draggable': 'true',
              'value': 1
            }, {
              'name': '曹操979',
              'value': 5,
              'symbolSize': 20,
              'category': '曹操979',
              'draggable': 'true'
            }, {
              'name': '孟德29',
              'symbolSize': 3,
              'category': '曹操979',
              'draggable': 'true',
              'value': 1
            }, {
              'name': '曹公44',
              'symbolSize': 7,
              'category': '曹操979',
              'draggable': 'true',
              'value': 1
            }, {
              'name': '关羽948',
              'value': 40,
              'symbolSize': 9,
              'category': '关羽948',
              'draggable': 'true'
            }, {
              'name': '云长431',
              'symbolSize': 20,
              'category': '关羽948',
              'draggable': 'true',
              'value': 1
            }, {
              'name': '关公508',
              'symbolSize': 20,
              'category': '关羽948',
              'draggable': 'true',
              'value': 1
            }, {
              'name': '张飞408',
              'value': 8,
              'symbolSize': 20,
              'category': '张飞408',
              'draggable': 'true'
            }, {
              'name': '翼德55',
              'symbolSize': 5,
              'category': '张飞408',
              'draggable': 'true',
              'value': 1
            }, {
              'name': '赵云393',
              'value': 5,
              'symbolSize': 15,
              'category': '赵云393',
              'draggable': 'true'
            }, {
              'name': '子龙95',
              'symbolSize': 7,
              'category': '赵云393',
              'draggable': 'true',
              'value': 1
            }, {
              'name': '孙权390',
              'value': 30,
              'symbolSize': 15,
              'category': '孙权390',
              'draggable': 'true'
            }, {
              'name': '仲谋10',
              'symbolSize': 3,
              'category': '孙权390',
              'draggable': 'true',
              'value': 1
            }, {
              'name': '吴侯72',
              'symbolSize': 10,
              'category': '孙权390',
              'draggable': 'true',
              'value': 1
            }, {
              'name': '吕布384',
              'value': 20,
              'symbolSize': 30,
              'category': '吕布384',
              'draggable': 'true'
            }, {
              'name': '奉先15',
              'symbolSize': 3,
              'category': '吕布384',
              'draggable': 'true',
              'value': 1
            }, {
              'name': '温侯12',
              'symbolSize': 3,
              'category': '吕布384',
              'draggable': 'true',
              'value': 1
            }, {
              'name': '周瑜328',
              'value': 6,
              'symbolSize': 18,
              'category': '周瑜328',
              'draggable': 'true'
            }, {
              'name': '公瑾60',
              'symbolSize': 5,
              'category': '周瑜328',
              'draggable': 'true',
              'value': 1
            }, {
              'name': '周郎35',
              'symbolSize': 3,
              'category': '周瑜328',
              'draggable': 'true',
              'value': 1
            }, {
              'name': '魏延327',
              'value': 6,
              'symbolSize': 18,
              'category': '魏延327',
              'draggable': 'true'
            }, {
              'name': '文长12',
              'symbolSize': 3,
              'category': '魏延327',
              'draggable': 'true',
              'value': 1

            }],
          links: [
            {
              'source': '三国演义',
              'target': '刘备2239'
            }, {
              'source': '刘备2239',
              'target': '使君70'
            }, {
              'source': '刘备2239',
              'target': '玄德1770'
            }, {
              'source': '刘备2239',
              'target': '皇叔112'
            }, {
              'source': '三国演义',
              'target': '诸葛亮1892'
            }, {
              'source': '诸葛亮1892',
              'target': '孔明1643'
            }, {
              'source': '诸葛亮1892',
              'target': '卧龙40'
            }, {
              'source': '三国演义',
              'target': '曹操979'
            }, {
              'source': '曹操979',
              'target': '孟德29'
            }, {
              'source': '曹操979',
              'target': '曹公44'
            }, {
              'source': '三国演义',
              'target': '关羽948'
            }, {
              'source': '关羽948',
              'target': '云长431'
            }, {
              'source': '关羽948',
              'target': '关公508'
            }, {
              'source': '三国演义',
              'target': '张飞408'
            }, {
              'source': '张飞408',
              'target': '翼德55'
            }, {
              'source': '三国演义',
              'target': '赵云393'
            }, {
              'source': '赵云393',
              'target': '子龙95'
            }, {
              'source': '三国演义',
              'target': '孙权390'
            }, {
              'source': '孙权390',
              'target': '仲谋10'
            }, {
              'source': '孙权390',
              'target': '吴侯72'
            }, {
              'source': '三国演义',
              'target': '吕布384'
            }, {
              'source': '吕布384',
              'target': '奉先15'
            }, {
              'source': '吕布384',
              'target': '温侯12'
            }, {
              'source': '三国演义',
              'target': '周瑜328'
            }, {
              'source': '周瑜328',
              'target': '公瑾60'
            }, {
              'source': '周瑜328',
              'target': '周郎35'
            }, {
              'source': '三国演义',
              'target': '魏延327'
            }, {
              'source': '魏延327',
              'target': '文长12'
            }, {
              'source': '三国演义',
              'target': '法学院'

            }],
          categories: [
            {
              'name': '刘备2239'
            }, {
              'name': '诸葛亮1892'
            }, {
              'name': '曹操979'
            }, {
              'name': '关羽948'
            }, {
              'name': '张飞408'
            }, {
              'name': '赵云393'
            }, {
              'name': '孙权390'
            }, {
              'name': '吕布384'
            }, {
              'name': '周瑜328'
            }, {
              'name': '魏延327'
            }, {

            }],
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
        }]
      }
      )
      window.addEventListener('resize', function () {
        relation.resize()
      })
    }
  },
  mounted () {
    this.getDashboard()
    this.gitLineCenter()
    this.getLeftBar()
    this.getrelation()
  }
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
  height: 90%;
  border: 1px solid rgba(46, 189, 255, 0.555);
  z-index: 9999;
}
.bottom .title {
  display: flex;
  justify-content: space-around;
  margin-top: -2%;
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
#left-bar,#right-relation{
  width: 100%;
  height: 90%;
}
/*上左样式*/
.top-left {
  width: 50%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.top-left img {
  height: 80%;
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
  min-width: 8.7rem;
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
  background-color: #00c026;
  text-align: center;
  padding: 1rem 0;
}
#dashboard {
  width: 25%;
  height: 99%;
  max-height: 19rem;
}
.tab-right .btn-active {
  background-color: rgba(46, 189, 255, 0.555);
}
</style>
