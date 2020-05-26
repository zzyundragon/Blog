<template>
  <li class="li-style">
    <div @click="toggle">
      <span>{{data.title}}</span>
      <span v-if="hasChildren">{{open ? '-' : '+'}}</span>
    </div>
    <ul v-if="open">
      <tree v-for="(v, k) in data.children" :key="k" :data="v"></tree>
    </ul>
  </li>
</template>

<script>
export default {
  name: "tree",
  data() {
    return {
      open: false
    };
  },
  computed: {
    hasChildren() {
      return this.data.children && this.data.children.length;
    }
  },
  props: {
    data: {
      type: Object
    }
  },
  methods: {
      toggle() {
          if(this.hasChildren) this.open = !this.open
      }
  },
};
</script>
<style>
.li-style {
  display: inline-block;
  width: 100%;
}
.li-style div{
    width: 100%;
    display: inline-block;
}
</style>