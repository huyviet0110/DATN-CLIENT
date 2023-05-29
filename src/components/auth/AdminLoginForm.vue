<template>
  <div class="layout">
    <b-container>
      <b-row>
        <b-col md="5" class="mx-auto form-background">
          <div class="wrapper-page">
            <div class="container-fluid p-0">
              <div class="card">
                <div class="card-body">

                  <div class="text-center mt-4 mb-2">
                    <router-link :to="{ name: 'home' }">
                      <img src="/src/assets/images/logo-main.png" class="logo-dark mx-auto" alt="logo-company">
                    </router-link>
                  </div>

                  <h4 class="text-muted text-center font-size-18 fw-bold">Đăng nhập</h4>

                  <div class="p-3">
                    <ValidationObserver v-slot="{ handleSubmit }">
                      <b-form ref="formRegister">
                        <validation-provider name="email" rules="required|email|max:100" v-slot="{ errors }">
                          <b-form-input
                            class="form-group"
                            id="email"
                            type="email"
                            v-model="dataUser.email"
                            placeholder="Email"
                          ></b-form-input>
                          <span class="error-color">{{ errors[0] }}</span>
                        </validation-provider>

                        <validation-provider name="password" rules="required" v-slot="{ errors }">
                          <b-form-input
                            class="form-group"
                            id="password"
                            type="password"
                            v-model="dataUser.password"
                            placeholder="Mật khẩu"
                            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{10,100}$"
                          ></b-form-input>
                          <span class="error-color">{{ errors[0] }}</span>
                        </validation-provider>

                        <b-button
                          class="form-group col-12"
                          type="submit"
                          variant="primary"
                          @click.prevent="handleSubmit(login)"
                        >
                          Đăng nhập
                        </b-button>
                      </b-form>
                    </ValidationObserver>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import ToastMixin from '@/Mixins/ToastMixin'

export default {
  mixins: [
    ToastMixin
  ],
  data () {
    return {
      dataUser: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    login () {
      this.$adminRepository.login(this.dataUser).then(() => {
        this.$router.push({ name: 'admins' })
      }).catch(error => {
        this.showToast('error', error.response.data.errors.error_message)
      })
    }
  }
}
</script>

<style scoped>
@import url('@/assets/css/auth/form.css');
</style>
