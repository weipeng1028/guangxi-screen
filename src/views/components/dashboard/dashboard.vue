<template lang="html">
  <div class="dashboard">
    <div class="title">
      传播分析123
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
  background: url('../../../assets/bg.jpg');
  background-size: 100% 100%;
}
.flex-container.column {
  min-height: calc(100vh - 5rem);
  position: relative;
  /* min-height: calc(100vh - 10%); */
  width: 100%;
  overflow: hidden;
  box-sizing: content-box;
}
.title{
  height: 5rem;
  margin: 0px;
  padding: 0px;
  background-size: 100% 100%;
  text-align: center;
  color: #fff;
  font-size: 3rem;
  line-height: 5rem;
}
.active {
  height: 100%;
  width: 76%;
  margin-left: 10px;
  line-height: 300px;
}
</style>
