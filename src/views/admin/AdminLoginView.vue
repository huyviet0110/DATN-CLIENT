<template>
  <div class="login-form">
    <AdminLoginForm />
  </div>
</template>

<script>
import AdminLoginForm from '@/components/auth/AdminLoginForm.vue'

export default {
  components: {
    AdminLoginForm
  },
  created () {
    if (localStorage.getItem('admin_jwt_token')) {
      this.$adminRepository.getProfile().then(response => {
        localStorage.setItem('adminData', response.data.admin)
        this.$router.push({ name: 'admins' })
      }).catch(() => {
        this.$router.push({ name: 'admins.login' })
      })
    }
  }
}
</script>

<style>

</style>
