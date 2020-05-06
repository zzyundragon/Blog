<template>
  <div id="about">{{ userInfo }}</div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'about',
  data() {
    return {

    }
  },
  computed: {
    ...mapState(['userInfo'])
  }
}
</script>

<style lang='stylus' scoped></style>
