<template>
  <div id="home" class="pt-45 pb-45 pl-30 pr-30">
    <!-- user & menu -->
    <div class="header">
      <div class="user">
        <Button type="info"></Button>
        <Button type="primary" @click='setLang("zh")'>{{ $t('common.lang_zh') }}</Button>
        <Button type="primary" @click='setLang("en")'>{{ $t('common.lang_en') }}</Button>
      </div>
      <div class="menu"></div>
    </div>
    <!-- main container -->
    <div class="main-container">
      <row class="hgh-per-100">
        <coll span="14" class="hgh-per-100">
          <coll span="24" class="banner">
            <img :src="Banner" class="wd-per-100" alt />
          </coll>
          <coll span="24" class="flex flex-wrap items-center">
            <img
              :src="list"
              class="wd-per-49 flex-none"
              :class="{'self-start': index <= 1}"
              v-for="(list,index) in columns"
              :key="index"
              alt
            />
          </coll>
        </coll>
        <coll span="10" class="hgh-per-100">col-12</coll>
      </row>
      <div class="banner"></div>
    </div>
    <!-- others -->
    <img :src="Astronaut" class="wd-per-16 fixed right-0 bottom-0" alt />
    <img :src="Setting" class="fixed setting wd-per-4" alt />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import md5 from 'js-md5'
import { Button, Row, Col } from 'view-design'
import Astronaut from './images/astronaut.png'
import Banner from './images/banner.png'
import Setting from './images/setting.png'
import { getPodiumList, loginFunc } from '@/service/index'
// import AgoraRtcEngine from 'agora-electron-sdk'

export default {
  name: 'HomePage',
  data() {
    return {
      userInfo: {},
      data: {},
      Banner: Banner,
      columns: Array.from({ length: 4 }, (v, k) => require('./images/column/' + (k + 1) + '.png')),
      Astronaut: Astronaut,
      Setting: Setting
    }
  },
  components: {
    Button: Button,
    row: Row,
    coll: Col
  },
  computed: {
    ...mapState(['title', 'lang'])
  },
  async created() {
    // this.rtcEngine = new AgoraRtcEngine()
    // console.log('rtc =', this.rtcEngine)
    document.title = this.$t('common.title')
    try {
      let res = await loginFunc({
        userName: 'superAdmin',
        password: md5('administrator')
      })
      sessionStorage.setItem('userInfo', JSON.stringify(res.data.data))
      await this.insertUserInfo()
      this.data = await getPodiumList()
    } catch (error) {
      console.log('error =', error)
    }
  },
  methods: {
    ...mapActions(['getUserInfo', 'insertUserInfo', 'changeLang']),
    setLang(lang) {
      localStorage.setItem('lang', lang)
      this.changeLang(lang)
      window.location.reload()
    }
  }
}
</script>
<style lang="stylus" scoped>
#home
  wh(100vw, 100vh)
  bg('./images/bg.png')
  background-size cover
  .setting
    bottom 5vh
    left 3vw
  .header
    wh(100%, 12vh)
  .main-container
    width 79vw
    height 68vh
    margin 0 auto
    .banner
      margin-bottom 2vh
</style>
