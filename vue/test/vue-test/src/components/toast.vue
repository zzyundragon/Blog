<template>
  <div v-if="showToast">
    <h1>{{title}}</h1>
    <p>{{desc}}</p>
  </div>
</template>

<script>
export default {
  name: "toast",
  props: ["title", "desc", "duration"],
  data() {
    return {
      showToast: false
    };
  },
  methods: {
    show() {
      this.showToast = true;
      setTimeout(() => {
        this.hide()
      }, this.duration);
    },
    hide() {
        this.showToast = false;
        this.remove()
    }
  }
};
</script>
