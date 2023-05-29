<template>
  <div class="users-page">
    <HomeHeader :userData="userData" :isAuthenticated="isAuthenticated" />
    <b-row class="mt-4">
      <UserSideBar />
      <router-view />
    </b-row>
  </div>
</template>

<script>
import HomeHeader from '@/layouts/HomeHeader.vue'
import UserSideBar from '@/layouts/UserSideBar.vue'

export default {
  data () {
    return {
      userData: null,
      isAuthenticated: true
    }
  },
  created () {
    this.getProfile()
  },
  methods: {
    getProfile () {
      this.userData = JSON.parse(localStorage.getItem('userData'))
    }
  },
  components: {
    UserSideBar,
    HomeHeader
  }
}
</script>

<style>
@import "@/assets/css/users/main.css";
</style>
