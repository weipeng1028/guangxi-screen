<template>
  <div class="dashboard">
      <div class="flex-container column" >
          <div class="item one" @click="clickChart('1')" v-on:dblclick="dbclickChart('Analysis')" style="transform: translate(-32.4%,-33.5%) scale(0.33)">
            <v-line :message="backShow" v-if='jurisdiction'></v-line>
          </div>
          <div class="item two" @click="clickChart('2')" v-on:dblclick="dbclickChart('Excellent')" style="transform: translate(-32.4%,0.5%) scale(0.33)">
              <multipleColumn :message="backShow" v-if='jurisdiction'></multipleColumn>
          </div>
          <div class="item three" @click="clickChart('3')" v-on:dblclick="dbclickChart('Iframe')" style="transform: translate(-32.4%,34.5%) scale(0.33)">
              <v-iframe :message="backShow" v-if='jurisdiction'></v-iframe>
          </div>
          <div class="item four  active" @click="clickChart('4')" v-on:dblclick="dbclickChart('Bigscreen')" style="transform: translate(30.7%, 0) scale(1)">
            <column :message="backShow" v-if='jurisdiction'></column>
          </div>
      </div>
    </div>
   <!-- <div class="dashboard">
    <div class="flex-container column" v-if='jurisdiction'>
        <div class="item one" @click="clickChart('1')" v-on:dblclick="dbclickChart('1')" style="transform: translate(-32.4%,-33.5%) scale(0.33)">
           <v-line :message="backShow"></v-line>
        </div>
        <div class="item two" @click="clickChart('2')" v-on:dblclick="dbclickChart('2')" style="transform: translate(-32.4%,0.5%) scale(0.33)">
            <multipleColumn :message="backShow"></multipleColumn>
        </div>
        <div class="item three" @click="clickChart('3')" v-on:dblclick="dbclickChart('3')" style="transform: translate(-32.4%,34.5%) scale(0.33)">
            <v-iframe :message="backShow"></v-iframe>
        </div>
        <div class="item four  active" @click="clickChart('4')" v-on:dblclick="dbclickChart('4')" style="transform: translate(30.7%, 0) scale(1)">
          <column :message="backShow"></column>
        </div>
    </div>
  </div> -->
</template>

<script>
import column from '@/views/bigscreen/Screenbox'
import line from '@/views/bigscreen/Analysis'
import multipleColumn from '@/views/bigscreen/Excellent'
import iframe from '@/views/bigscreen/Iframe'
export default {
  data () {
    return {
      tokens: '',
      jurisdiction: false,
      backShow: true,
      items: []
    }
  },
  created () {
    this.tokens = this.$route.query.auth
    if (this.tokens) {
      this.$store.commit('user/userToken', this.tokens)
      this.$http.get(this.$api.bigScreen)
        .then(res => {
          if (res.data.code === 200) {
            this.jurisdiction = true
          }
        })
        .catch(() => {
          this.banckLogin()
        })
    } else {
      this.banckLogin()
    }
  },
  mounted () {
    this.atInit()
  },
  methods: {
    // 返回登录
    banckLogin () {
      setTimeout(function () {
        let url = window.g.login
        window.open(url, '_self')
      }, 2000)
    },
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
      if (clickIndex === '1') {
        this.key += 1
      }
    },
    dbclickChart (index) {
      this.$router.push({ name: index, query: { auth: this.tokens } })
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
    'v-iframe': iframe,
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
  cursor: pointer;
  box-shadow: 0 .125rem .25rem rgba(255, 255, 255, .12), 0 0 .375rem rgba(255, 255, 255, .04)
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
  min-height: calc(100vh);
  position: relative;
  /* min-height: calc(100vh - 10%); */
  width: 100%;
  overflow: hidden;
  box-sizing: content-box;
}
.screen-title {
  display: none;
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
.show-box{
  width: 100%;
  height: 100%;
}
.box-shadow {
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0);
  position: absolute;
  width: 100%;
  min-height: calc(100vh);
  cursor: pointer;
}
</style>
