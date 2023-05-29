<template>
  <div class="admins-page">
    <AdminHeader :userData="userData" />
    <b-row class="mt-4 justify-content-around">
      <AdminSideBar />
      <router-view />
    </b-row>
  </div>
</template>

<script>
import AdminHeader from '@/layouts/AdminHeader.vue'
import AdminSideBar from '@/layouts/AdminSideBar.vue'

export default {
  data () {
    return {
      userData: null
    }
  },
  created () {
    this.getProfile()
  },
  methods: {
    getProfile () {
      if (localStorage.getItem('admin_jwt_token')) {
        this.$adminRepository.getProfile().then(response => {
          this.userData = response.data
        }).catch(() => {
          this.$router.push({ name: 'admins.login' })
        })
      } else {
        this.$router.push({ name: 'admins.login' })
      }
    }
  },
  components: {
    AdminSideBar,
    AdminHeader
  }
}
</script>

<style>
@import "@/assets/css/users/main.css";
@import "@/assets/css/admins/main.css";
</style>
