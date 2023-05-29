<template>
  <b-col cols="9" class="users-profile p-0 ps-4">
    <ValidationObserver v-slot="{ handleSubmit }">
      <b-form>
        <b-row>
          <b-col class="pt-0 pe-0">
            <b-row class="w-100 d-flex justify-content-center">
              <div class="ps-0 pe-0 img-border">
                <img v-if="userData.avatar !== ''" :src="base_avatar_url + userData.avatar" alt="avatar" class="img-preview">
              </div>
            </b-row>
          </b-col>

          <b-col class="pe-0 pt-0 pb-3 mt-auto mb-auto">
            <ValidationProvider :rules="{ required: true, min: 2, max: 100, regex: /^(?:[\p{Lu}\p{Ll}][a-zà-ỹ]* ?)*[\p{Lu}\p{Ll}][\p{L} ]*$/u }" name="name" v-slot="{ errors }">
              <b-form-group id="input-name-group" label="Họ và tên" label-for="name">
                <b-form-input
                  id="name"
                  v-model="userData.name"
                  type="text"
                ></b-form-input>
                <span class="text-danger">{{ errors[0] }}</span>
              </b-form-group>
            </ValidationProvider>
          </b-col>
        </b-row>

        <b-row>
          <b-col class="pe-0">
            <ValidationProvider rules="image|ext:jpeg,png,jpg,gif|size:2048" name="avatar" v-slot="{ errors }">
              <b-row>
                <b-col class="ps-0 pt-2">
                  <b-form-group id="input-avatar-group" label="Ảnh đại diện" label-for="avatar">
                    <b-form-file
                      class="btn-file-custom"
                      v-model="userData.avatar_file"
                      placeholder="Thay đổi ảnh đại diện ở đây..."
                    ></b-form-file>
                    <span class="text-danger">{{ errors[0] }}</span>
                  </b-form-group>
                </b-col>
              </b-row>
            </ValidationProvider>
          </b-col>

          <b-col class="pe-0">
            <ValidationProvider name="birth-date" v-slot="{ errors }">
              <b-form-group id="input-birth_date-group" label="Ngày sinh" label-for="birth_date" class="pt-2">
                <b-form-datepicker
                  id="birth_date"
                  v-model="userData.birth_date"
                  locale="vi"
                  :date-format-options="{ day: 'numeric', month: 'numeric', day: 'numeric' }"
                ></b-form-datepicker>
                <span class="text-danger">{{ errors[0] }}</span>
              </b-form-group>
            </ValidationProvider>
          </b-col>
        </b-row>

        <b-row>
          <b-col cols="3" class="ps-0 pe-0">
            <ValidationProvider rules="integer|oneOf:0,1" name="gender" v-slot="{ errors }">
              <b-form-group id="input-gender-group" label="Giới tính" label-for="gender" class="mt-2 custom-btn-radio border-1">
                <b-form-radio-group
                  id="gender"
                  v-model="userData.gender"
                  :options="gender_types"
                  class="mt-2"
                ></b-form-radio-group>
                <span class="text-danger">{{ errors[0] }}</span>
              </b-form-group>
            </ValidationProvider>
          </b-col>

          <b-col cols="3" class="ps-0">
            <ValidationProvider :rules="{ min: 10, max: 20, regex: /^(\+\d{1,3}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{3,14}$/ }" name="phone-number" v-slot="{ errors }">
              <b-form-group id="input-phone_number-group" label="Số điện thoại" label-for="phone_number" class="mt-2">
                <b-form-input
                  id="phone_number"
                  v-model="userData.phone_number"
                ></b-form-input>
                <span class="text-danger">{{ errors[0] }}</span>
              </b-form-group>
            </ValidationProvider>
          </b-col>

          <b-col cols="6" class="ps-0 pe-0">
            <ValidationProvider rules="min:2|max:255" name="address" v-slot="{ errors }">
              <b-form-group id="input-address-group" label="Địa chỉ" label-for="address" class="mt-2">
                <b-form-input
                  id="address"
                  v-model="userData.address"
                ></b-form-input>
                <span class="text-danger">{{ errors[0] }}</span>
              </b-form-group>
            </ValidationProvider>
          </b-col>
        </b-row>

        <div class="d-flex justify-content-end">
          <b-button
            type="submit"
            variant="primary"
            class="w-auto mt-4"
            @click.prevent="handleSubmit(updateProfile)"
          >
            Cập nhật
          </b-button>
        </div>
      </b-form>
    </ValidationObserver>
  </b-col>
</template>

<script>
import { GENDER_TYPES } from '@/helpers/constant'
import ToastMixin from '@/Mixins/ToastMixin'

export default {
  data () {
    return {
      userData: {
        name: '',
        gender: '',
        birth_date: '',
        phone_number: '',
        address: '',
        avatar: '',
        avatar_file: null
      },
      gender_types: GENDER_TYPES,
      base_avatar_url: import.meta.env.VITE_BASE_IMAGE_URL,
      aria_code_selected: null,
      aria_codes: [
        { value: 'A', text: '+234' },
        { value: 'B', text: '+234' }
      ]
    }
  },
  mixins: [
    ToastMixin
  ],
  created () {
    this.getProfile()
  },
  methods: {
    getProfile () {
      this.userData = JSON.parse(localStorage.getItem('userData'))
    },
    updateProfile () {
      const form = new FormData()
      form.append('name', this.userData.name)
      form.append('gender', this.userData.gender)
      form.append('birth_date', this.userData.birth_date)
      form.append('phone_number', this.userData.phone_number)
      form.append('address', this.userData.address)
      if (this.userData.avatar_file) {
        form.append('avatar', this.userData.avatar_file)
      }

      this.$userRepository.updateUserProfile(form).then(response => {
        this.userData = response.data
        this.showToast('success', 'Cập nhật thông tin tài khoản thành công')
      }).catch(error => {
        this.showToast('error', error.response.data.errors.error_message)
      })
    }
  }
}
</script>

<style>

</style>
