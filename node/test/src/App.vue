<template>
  <div id="app" class="relative">
    <div
      id="nav"
      class="flex flex-between wd-per-100 hgh-per-3 absolute left-0 top-0 bg-white items-center"
    >
      <div class="home">{{ $t('common.navTitle') }}</div>
      <div class="handle flex items-center hgh-per-100">
        <div @click="miniWindow">最小化</div>
        <div @click="closeWindow">关闭</div>
      </div>
    </div>
    <Modal v-model="modal" id="close" :closable="!modal">
      <p>Content of dialog</p>
      <p>Content of dialog</p>
      <p>Content of dialog</p>
      <div slot="footer" class="flex flex-between">
        <Button type="error" size="large" @click="confirmClose">关闭客户端</Button>
        <Button type="error" size="large" @click="modal = false">取消</Button>
      </div>
    </Modal>
    <router-view class="page" />
  </div>
</template>
<script>
import { ipcRenderer } from 'electron'
import { Modal } from 'view-design'
export default {
  data() {
    return {
      modal: false
    }
  },
  components: {
    Modal: Modal
  },
  methods: {
    miniWindow() {
      ipcRenderer.send('min')
    },
    closeWindow() {
      this.modal = true
    },
    confirmClose() {
      ipcRenderer.send('closed')
    }
  }
}
</script>
<style lang="stylus">
#app
  wh(100%, 100%)
  #nav
    -webkit-app-region drag
  .page
    padding-top 3%
    box-sizing border-box
#close
  .ivu-modal
    top 40%
</style>
