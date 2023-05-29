<template>
  <header>
    <b-row>
      <b-col cols="3">
        <router-link :to="{ name: 'home' }">
          <div class="company-logo float-start d-flex align-items-center">
            <img src="/src/assets/images/logo-main.png" alt="company-main-logo">
          </div>
        </router-link>
      </b-col>

      <b-col cols="9" class="d-flex justify-content-end">
        <nav class="nav-bar float-start d-flex align-items-center justify-content-end">
          <ul class="nav">
            <li class="nav-item"><a class="nav-link" href="/#top-list-popular">Tuyến đường phổ biến</a></li>
            <li class="nav-item"><a class="nav-link" href="/#service-list-first">Vé xe lễ</a></li>
            <li class="nav-item"><a class="nav-link" href="/#ads-list-first">Ưu đãi</a></li>
            <li class="nav-item dropdown me-5">
              <a class="nav-link dropdown-toggle" href="javascript:void(0)" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                Dịch vụ nổi bật
              </a>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item nav-link" href="/#service-list-second">Dịch vụ thuê xe</a></li>
                <li><a class="dropdown-item nav-link" href="/#service-list-third">Dành cho Đối tác Nhà xe</a></li>
                <li><a class="dropdown-item nav-link" href="/#ads-list-third">Công nghệ mới</a></li>
              </ul>
            </li>
            <li class="nav-item">
              <b-dropdown id="dropdown-right" right variant="primary" class="dropdown-right">
                <template #button-content>
                  <img :src="(userData?.avatar) ? (base_url + userData.avatar) : '/src/assets/images/ic_user_default.png'" alt="avatar" class="img-avatar">
                </template>
                <b-dropdown-item :to="{ name: 'admins' }">
                  Quản trị xe khách
                </b-dropdown-item>
                <b-dropdown-item :to="{ name: 'admins.list-users' }">
                  Quản trị người dùng
                </b-dropdown-item>
                <b-dropdown-item @click.prevent="logout">Đăng xuất</b-dropdown-item>
              </b-dropdown>
            </li>
          </ul>
        </nav>
      </b-col>
    </b-row>
  </header>
</template>

<script>
import CommonMixin from '@/Mixins/CommonMixin'
import ToastMixin from '@/Mixins/ToastMixin'

export default {
  props: {
    userData: {
      type: Object,
      required: false
    }
  },
  data () {
    return {
      base_url: import.meta.env.VITE_BASE_IMAGE_URL
    }
  },
  mixins: [
    CommonMixin,
    ToastMixin
  ],
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
@import '@/assets/css/layouts/header.css';
</style>
