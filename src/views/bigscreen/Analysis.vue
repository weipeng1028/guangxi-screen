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
              <span class="region-cont" style="margin-right:2rem">账户简介内容</span>
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
          <div id="dashboard"></div>
          <div class="status">
            <span class="region-title">运行状态</span>
            <span class="status-data">良好</span>
          </div>
        </div>
      </div>
      <div class="line-center">
      </div>
      <div class="bottom">
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
export default {
  data () {
    return {
      regiontyp: 'wx'
    }
  },
  methods: {
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
      window.onresize = columnar.resize
    }
  },
  mounted () {
    this.getDashboard()
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
  background: #010e50 url(../../assets/images/bigscreen.png) center top
    no-repeat;
  background-size: 100% auto;
}
.screen-title {
  display: block;
  height: 8rem;
  margin: 0 auto;
}
.screen-bg {
  display: block;
  background: url(../../assets/images/TOP_BG.png) center top no-repeat;
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
  height: 30%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
}
.line-center{
  height: 35%;
}
.bottom{
  height: 35%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
/*标题样式*/
.title-border {
  display: block;
  height: 4rem;
  margin: 0 auto;
  margin-bottom: 1rem;
}
.title-border p {
  display: block;
  background: url(../../assets/images/title-border.png) center top no-repeat;
  background-size: 20rem 4rem;
  text-align: center;
  line-height: 4rem;
  color: #fff;
  font-size: 2rem;
}
.content {
  width: 100%;
  height: calc(100% - 5rem);
  display: block;
  background: url(../../assets/images/articleBg-All.png) center top no-repeat;
  background-size: 100% 100%;
  overflow: hidden;
  position: relative;
}
/*上左样式*/
.top-left{
  width: 50%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.top-left img{
  height: 80%;
  vertical-align: middle;
}
.message{
  width: 75%;
  color: #fff;
  padding: 2rem 0;
  box-sizing: border-box;
}
.login-name{
  font-size: 3rem;
  line-height: 4rem;
  margin-right: 3rem;
}
.el-radio-group{
  height: 4rem;
}
.region-title{
  font-size: 2rem;
  margin-right: 2rem;
  line-height: 4rem;
}
.region-cont{
  font-size: 2rem;
  color: #1beafc;
  line-height: 4rem;
}
.right-data .region-cont{
  color: #fff;
}
.region-brief{
  display: flex;
}
.region-brief .region-title{
  max-width: 27%;
  min-width: 8.7rem;
}
/*上右部分*/
.top-right{
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.right-data{
  width: 40%;
    padding: 2rem 0;
  padding-left:5rem ;
  color: #fff;
  box-sizing: border-box;
}
.top-right img{
  height: 80%;
}
.num{
  display: inline-block;
  width: 8rem;
  font-style: normal;
  text-align: right;
}
.blue{
  color: #00c026;
}
.red{
  color: #e5001d;
}
.status {
  color: #fff;
}
.status-data{
  display: block;
  font-size: 3rem;
  border-radius: 5px;
  background-color: #00c026;
  text-align: center;
  padding: 1rem 0;
}
#dashboard{
  width: 25%;
  height: 100%;
  max-height: 20rem;
}
</style>
