<template>
  <b-col cols="3" class="users-side-bar p-3">
    <ul class="ps-0 mb-0">
      <li class="mb-3">
        <router-link :to="{ name: 'users' }">
          <img src="https://storage.googleapis.com/fe-production/images/Auth/account-circle.svg" alt="account" class="icon-nav">
          <span>Thông tin tài khoản</span>
        </router-link>
      </li>
      <li class="mb-3">
        <router-link :to="{ name: 'users.list-trips' }">
          <img src="https://storage.googleapis.com/fe-production/images/ticket.svg" alt="list-trips" class="icon-nav">
          <span>Vé của tôi</span>
        </router-link>
      </li>
      <li>
        <a href="javascript:void(0)" @click="logout">
          <img src="https://storage.googleapis.com/fe-production/images/Auth/logout.svg" alt="logout" class="icon-nav">
          <span>Đăng xuất</span>
        </a>
      </li>
    </ul>
  </b-col>
</template>

<script>
import { CURRENT_PAGE } from '@/helpers/constant'

export default {
  data () {
    return {
      current_page: CURRENT_PAGE
    }
  },
  methods: {
    logout () {
      this.$userRepository.logout().then(() => {
        this.$router.go(this.current_page)
      }).catch(error => {
        this.showToast('error', error.response.data.errors.error_message)
      })
    }
  }
}
</script>

<style>

</style>
