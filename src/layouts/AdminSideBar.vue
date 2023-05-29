<template>
  <b-col cols="3" class="users-side-bar admins-side-bar p-3">
    <ul class="ps-0 mb-0">
      <li class="mb-3">
        <router-link :to="{ name: 'admins' }">
          <img src="https://storage.googleapis.com/fe-production/images/Auth/account-circle.svg" alt="account" class="icon-nav">
          <span>Quản trị xe khách</span>
        </router-link>
      </li>
      <li class="mb-3">
        <router-link :to="{ name: 'admins.list-users' }">
          <img src="https://storage.googleapis.com/fe-production/images/ticket.svg" alt="list-users" class="icon-nav">
          <span>Quản trị người dùng</span>
        </router-link>
      </li>
      <li class="mb-3">
        <router-link :to="{ name: 'admins.list-journeys' }">
          <img src="https://storage.googleapis.com/fe-production/images/ticket.svg" alt="list-journeys" class="icon-nav">
          <span>Quản trị tuyến đường</span>
        </router-link>
      </li>
      <li class="mb-3">
        <router-link :to="{ name: 'admins.list-trips' }">
          <img src="https://storage.googleapis.com/fe-production/images/ticket.svg" alt="list-trips" class="icon-nav">
          <span>Quản trị chuyến đi</span>
        </router-link>
      </li>
      <li class="mb-3">
        <router-link :to="{ name: 'admins.list-orders' }">
          <img src="https://storage.googleapis.com/fe-production/images/ticket.svg" alt="list-orders" class="icon-nav">
          <span>Quản trị hóa đơn</span>
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
      this.$adminRepository.logout().then(() => {
        this.$router.push({ name: 'home' })
      }).catch(error => {
        this.showToast('error', error.response.data.errors.error_message)
      })
    }
  }
}
</script>

<style>

</style>
