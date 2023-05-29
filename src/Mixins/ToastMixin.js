export default {
  methods: {
    showToast (type, message) {
      const validTypes = ['success', 'info', 'warning', 'error', 'default']

      if (validTypes.includes(type) && message) {
        this.$toast.open({
          type,
          message,
          position: 'bottom-left',
          duration: 5000,
          dismissible: true
        })
      }
    }
  }
}