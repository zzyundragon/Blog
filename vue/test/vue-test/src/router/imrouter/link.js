export default {
  render: function (createElement) {
    return createElement('a', { attrs: { 'to': this.to } }, this.$slots.default)
  },
  props: {
    to: {
      type: String,
      default: '/',
      required: true
    }
  }
}
