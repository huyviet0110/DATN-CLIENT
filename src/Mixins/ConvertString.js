export default {
  methods: {
    changeToSlug (string) {
      return string.split(' ').join('-')
    }
  }
}