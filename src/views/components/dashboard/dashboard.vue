<template lang="html">
  <div class="dashboard">
    <div class="screen-title">
      <div class="screen-bg">
        新媒体大屏统计分析
      </div>
    </div>
    <div class="flex-container column">
        <div class="item one" @click="clickChart('1')" style="transform: translate(-32.4%,-33.5%) scale(0.33)">
          <multipleColumn></multipleColumn>
        </div>
        <div class="item two" @click="clickChart('2')" style="transform: translate(-32.4%,0.5%) scale(0.33)">
          <column></column>
        </div>
        <div class="item three" @click="clickChart('3')" style="transform: translate(-32.4%,34.5%) scale(0.33)">
          <v-line></v-line>
        </div>
        <div class="item four  active" @click="clickChart('4')" style="transform: translate(30.7%, 0) scale(1)">
          <!-- <point></point> -->
          <div>123321</div>
        </div>
    </div>
  </div>
</template>

<script>
import column from '@/views/components/column/column'
import line from '@/views/components/line/line'
import multipleColumn from '@/views/components/multipleColumn/multipleColumn'
// import point from '@/views/components/point/point'

export default {
  data () {
    return {
      items: []
    }
  },
  mounted () {
    this.atInit()
  },
  methods: {
    atResize () {
      this.$root.charts.forEach((myChart) => {
        myChart.resize()
      })
    },
    atInit () {
      this.items = document.querySelectorAll('.flex-container .item')
      for (let i = 0; i < this.items.length; i++) {
        this.items[i].dataset.order = i + 1
      }
    },
    clickChart (clickIndex) {
      let activeItem = document.querySelector('.flex-container .active')
      let activeIndex = activeItem.dataset.order
      let clickItem = this.items[clickIndex - 1]
      if (activeIndex === clickIndex) {
        return
      }
      activeItem.classList.remove('active')
      clickItem.classList.add('active')
      this.atSetStyle(clickItem, activeItem)
    },
    atSetStyle (el1, el2) {
      let transform1 = el1.style.transform
      let transform2 = el2.style.transform
      el1.style.transform = transform2
      el2.style.transform = transform1
    }
  },
  components: {
    column,
    multipleColumn,
    // point,
    'v-line': line
  }
}

</script>

<style scoped>
* {
  box-sizing: border-box;
}
.point,
.multipleColumn,
.columnChart,
.line {
  height: 100% !important;
  width: 100% !important;
  background: none !important;
}
.item {
  padding: 0px;
  margin: 0px;
  width: 68%;
  height: 100%;
  position: absolute;
  transform: scale(0.33);
  text-align: center;
  transition: all 0.8s;
  background: rgba(32, 32, 35, 0.5);
}
.dashboard {
  position: relative;
  width: 100%;
  height: 100%;
  margin: 0px;
  padding: 0px;
  background: #010e50 url(../../../assets/images/bigscreen.png) center top no-repeat;
  background-size: 100% 100%;
}
.flex-container.column {
  min-height: calc(100vh - 8rem);
  position: relative;
  /* min-height: calc(100vh - 10%); */
  width: 100%;
  overflow: hidden;
  box-sizing: content-box;
}
.screen-title {
  display: block;
  height: 8rem;
  margin: 0 auto;
}
.screen-bg{
  display: block;
  background: url(../../../assets/images/TOP_BG.png) center top no-repeat;
  text-shadow: 3px 3px 3px rgba(0, 0, 0, 0.3);
  text-align: center;
  line-height: 9rem;
  color: #fff;
  font-size: 4rem;
}
.active {
  height: 100%;
  width: 76%;
  margin-left: 10px;
  line-height: 300px;
}
</style>
