<!-- 柱状图 -->
<style scoped>
.columnChart{
  height: 800px;
  background: #010e50 url(../../../assets/images/bigscreen.png) center top no-repeat;
  background-size: 100% 100%;
  color: white}
  .main{
    width: 100%;
    top: 10%;
    height: calc(100% - 100px);
    margin-top: -15px}
</style>

<template>
<div class="columnChart">
  <!-- <v-filter :myChart="myChart" v-if="myChart._dom"></v-filter> -->
  <div class="main"></div>
</div>

</template>

<script>
import echarts from 'echarts'

export default {
  data () {
    return {
      legendArr: [],
      color: ['#6fd7fa', '#07f943', '#AE5548', '#8304f9', '#b4fe04', '#fa5307'],
      myChart: {},
      name: '柱状图'
    }
  },
  methods: {
    atInit () {
      this.legendArr = this.myChart.getOption().series
      this.legendArr.forEach((data) => {
        data.selected = true
      })
      // this.$root.charts.push(this.myChart)
      window.addEventListener('resize', function () {
        this.myChart.resize()
      }.bind(this))
    }
  },
  components: {
  },
  mounted () {
    // 基于准备好的dom，初始化echarts实例
    this.myChart = echarts.init(document.querySelector('.columnChart .main'))
    this.myChart.setOption({
      title: {
        show: false
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        show: false
      },
      toolbox: {
        show: false
      },
      color: this.color,
      calculable: true,
      xAxis: [{
        name: '产品',
        type: 'category',
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        nameTextStyle: {
          color: 'rgba(255, 255, 255, 0.69)'
        },
        axisLabel: {
          textStyle: {
            color: 'white'
          }
        },
        data: ['产品1', '产品2']
      }],
      yAxis: [{
        axisLine: {
          show: false
        },
        nameLocation: 'end',
        nameGap: 20,
        nameRotate: 0,
        axisTick: {
          show: false
        },
        splitLine: {
          lineStyle: {
            color: ['rgba(230, 230, 230, 0.2)']
          }
        },
        axisLabel: {
          textStyle: {
            color: 'white',
            fontSize: 14
          }
        },
        name: '数量',
        type: 'value',
        nameTextStyle: {
          color: 'rgba(255, 255, 255, 0.69)'
        }
      }],
      series: [{
        name: '标签1',
        type: 'bar',
        data: [2.0, 4.9],
        barWidth: 16,
        barGap: 0
      }, {
        name: '标签2',
        type: 'bar',
        data: [2.6, 5.9],
        barWidth: 16,
        barGap: 0
      }, {
        name: '标签3',
        type: 'bar',
        data: [2.0, 6.4],
        barWidth: 16,
        barGap: 0
      }, {
        name: '标签4',
        type: 'bar',
        data: [4.0, 5.9],
        barWidth: 16,
        barGap: 0
      }, {
        name: '标签5',
        type: 'bar',
        data: [5.6, 4.9],
        barWidth: 16,
        barGap: 0
      }, {
        name: '标签6',
        type: 'bar',
        data: [2.0, 3.4],
        barWidth: 16,
        barGap: 0
      }]
    })
    this.atInit()
  }
}

</script>
