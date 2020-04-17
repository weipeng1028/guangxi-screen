<template>
  <div class="hot-article">
    <div class="area-rank">
      <p class="title">
        热门文章列表
      </p>
    </div>
    <div class="hot-box"></div>
  </div>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  methods: {
  },
  mounted () {
  }
}
</script>
<style scoped>
.hot-article {
  height: 100%;
}
.area-rank {
  height: 20%;
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
.hot-box {
  overflow: hidden;
  height: 80%;
  background: url('../../../assets/images/articleBg-All.png') no-repeat bottom
    center;
  background-size: 100% 99%;
  box-sizing: border-box;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.9)
}
</style>
