<template>
  <div class="player-container">
    <video-player class="vjs-custom-skin video-player"
                  :options="playerOptions"></video-player>
  </div>
</template>
<script>

// import videojs from 'video.js'

import 'video.js/dist/video-js.css'

import 'vue-video-player/src/custom-theme.css'

import { videoPlayer } from 'vue-video-player'

export default {

  components: {

    videoPlayer

  },

  data () {
    return {

      playerOptions: {

        playbackRates: [0.7, 1.0, 1.5, 2.0], // 播放速度

        autoplay: false,

        controls: true,

        preload: true, // 视频预加载

        muted: false, // 默认情况下将会消除任何音频。

        loop: false, // 导致视频一结束就重新开始

        language: 'zh-CN',

        aspectRatio: '8:3', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）

        fluid: false, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。

        sources: [{

          type: 'video/mp4',

          src: 'http://vjs.zencdn.net/v/oceans.mp4'

        }],

        poster: 'http://static.smartisanos.cn/pr/img/video/video_03_cc87ce5bdb.jpg', // 你的封面地址

        width: document.documentElement.clientWidth,

        notSupportedMessage: '此视频暂无法播放，请稍后再试' // 允许覆盖Video.js无法播放媒体源时显示的默认信息。

      }

    }
  }

}

</script>

<style type="text/css" scoped lang="scss">
</style>
