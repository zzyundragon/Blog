<template>
  <div class='hello'>
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <B></B>
    <C></C>
  </div>
</template>

<script>
import B from './B'
import C from './C'
export default {
  name: 'HelloWorld',
  components: { B, C },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted () {
    this.$children[0].name = '12121'
    this.$children[1].name = 'abc'
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
