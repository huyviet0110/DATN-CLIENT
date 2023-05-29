export default {
  methods: {
    scrollToTopScreen () {
      window.scrollTo(0, 0)
    },
    getTextByValue (listItem, value) {
      return (listItem.length > 0 && value !== null) ? listItem.find(item => item.value === value)?.text : null
    },
    formatDate (date) {
      const date_formatted = new Date(date)
      return date_formatted.getDate() + '/' + (date_formatted.getMonth() + 1) + '/' + date_formatted.getFullYear()
    },
    formatMoney (money) {
      return money.toLocaleString('en-US', { style: 'decimal', maximumFractionDigits: 0 })
    }
  }
}