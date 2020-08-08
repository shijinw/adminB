<template>
  <div>
    <h5>{{VideoT}}</h5>
    <github-badge slug="sinchang/vue-dplayer" />
    <d-player :options="options"
              @play="play"
              ref="player">
    </d-player>

  </div>
</template>

<script>
import GitHubBadge from '../../../../node_modules/vue-dplayer/node_modules/vue-github-badge'
import VueDPlayer from 'vue-dplayer'
import 'vue-dplayer/dist/vue-dplayer.css'
export default {
  props: ['url', 'VideoT'],
  data () {
    return {
      options: {
        video: {
          url: ''
        },
        autoplay: false,
        contextmenu: [
          {
            text: 'GitHub',
            link: 'https://github.com/MoePlayer/vue-dplayer'
          }
        ]
      },
      player: null
    }
  },
  watch: {
    url (newVal, oldVal) {
      this.player = this.$refs.player.dp
      this.player.switchVideo({
        url: newVal
      })
    }
  },

  methods: {
    play () {

    },
    lookVideo () {
      const player = this.$refs.player.dp

      player && player.pause()
    },
    cuureVideo (time) {
      const player = this.$refs.player.dp.video

      player.currentTime = time
    }
  },

  components: {
    'github-badge': GitHubBadge,
    'd-player': VueDPlayer
  },
  mounted () {
  }

}
</script>

<style scoped>
  body {
    margin: 0;
    padding: 0;
    text-align: center;
  }

  a {
    color: #42b983;
    text-decoration: none;
  }

  .dplayer {
    width: 500px;
    margin:350x;
  }

  h5 {
    font-size: 18px;
    color: #42b983;
    margin: 10px 0 10px;
  }

  @media (max-width: 768px) {
    .dplayer {
      width: 90%;
    }

    h1 {
      font-size: 30px;
    }

    h2 {
      font-size: 16px;
    }
  }
</style>
