<template>
  <b-col cols="9" class="buses-management ps-0 mb-5 me-0 ms-5">
    <div>
      <table class="w-100 text-center border-2 text-nowrap">
        <thead>
        <tr>
          <th>#</th>
          <th>Họ tên</th>
          <th>Email</th>
          <th>Giới tính</th>
          <th>Ngày sinh</th>
          <th>Số điện thoại</th>
          <th>Xem</th>
          <th>Sửa</th>
          <th>Xóa</th>
        </tr>
        </thead>
        <tbody>
        <b-overlay :show="!show_buses" no-wrap class="mt-5"></b-overlay>
        <tr v-for="(item, index) in itemsToShow(usersData)" :key="item.id">
          <td>{{ ++index }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.email }}</td>
          <td>{{ item.gender_text }}</td>
          <td>{{ item.birth_date }}</td>
          <td>{{ item.phone_number }}</td>
          <td>
            <div class="btn btn-secondary" @click="openModalShow(item)">Xem</div>
          </td>
          <td>
            <div class="btn btn-primary" @click="openModalUpdate(item)">Sửa</div>
          </td>
          <td>
            <div class="btn btn-danger" @click="openModalDestroy(item.id)">Xóa</div>
          </td>
        </tr>
        </tbody>
      </table>

      <b-row class="mb-5">
        <b-button
          variant="primary"
          class="button-center mt-4"
          @click="showMore"
          v-show="items_to_show < usersData.length"
        >
          Xem thêm
        </b-button>
      </b-row>
    </div>

    <b-modal id="modal-show-bus" size="lg" title="Chi tiết user" hide-footer v-model="show_detail_modal">
      <b-col class="text-center">
        <b-row class="w-25 mx-auto mb-4">
          <img :src="base_url + userData?.avatar" alt="user-avatar" class="show-image-buses rounded-circle">
        </b-row>
        <b-row class="text-nowrap">
          <b-col>
            <p class="text-primary">#</p>
            <p class="desc">{{ userData?.id }}</p>
          </b-col>
          <b-col>
            <p class="text-primary">Họ tên</p>
            <p class="desc">{{ userData?.name }}</p>
          </b-col>
          <b-col>
            <p class="text-primary">Email</p>
            <p class="desc">{{ userData?.email }}</p>
          </b-col>
          <b-col>
            <p class="text-primary">Giới tính</p>
            <p class="desc">{{ userData?.gender_text }}</p>
          </b-col>
          <b-col>
            <p class="text-primary">Ngày sinh</p>
            <p class="desc">{{ userData?.birth_date }}</p>
          </b-col>
          <b-col>
            <p class="text-primary">Số điện thoại</p>
            <p class="desc">{{ userData?.phone_number }}</p>
          </b-col>
          <b-col>
            <p class="text-primary">Lần sửa cuối</p>
            <p class="desc">{{ userData?.updated_at_formatted }}</p>
          </b-col>
          <b-col>
            <p class="text-primary">Địa chỉ</p>
            <p class="desc">{{ userData?.address }}</p>
          </b-col>
        </b-row>
      </b-col>
    </b-modal>

    <b-modal id="modal-update-bus" size="lg" title="Cập nhật thông tin user" hide-footer v-model="show_update_modal">
      <ValidationObserver v-slot="{ handleSubmit }">
        <b-form>
          <b-row>
            <b-col class="pt-0 pe-0">
              <b-row class="w-100 d-flex justify-content-center">
                <div class="ps-0 pe-0 img-border">
                  <img v-if="userData.avatar !== ''" :src="base_url + userData.avatar" alt="avatar" class="img-preview">
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
                    class="mt-2 d-flex justify-content-left gap-2"
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
              @click.prevent="handleSubmit(updateUser)"
            >
              Cập nhật
            </b-button>
          </div>
        </b-form>
      </ValidationObserver>
    </b-modal>

    <b-modal id="modal-destroy-bus" size="md" title="Bạn muốn xóa xe khách này" hide-footer v-model="show_destroy_modal">
      <p>Bạn sẽ không thể hoàn tác hành động này!</p>
      <div class="btn btn-danger float-end" @click="destroyUser(data_destroy_id)">Đồng ý xóa</div>
    </b-modal>
  </b-col>
</template>

<script>
import { GENDER_TYPES, ORDERS_TO_SHOW, SEAT_TYPES } from '@/helpers/constant'
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
      ],
      usersData: [],
      show_buses: true,
      show_create_modal: false,
      show_detail_modal: false,
      show_update_modal: false,
      show_destroy_modal: false,
      data: {
        name: null,
        avatar: null,
        gender: null,
        birth_date: null,
        phone_number: null,
        address: null,
        image: null
      },
      type_options: SEAT_TYPES,
      operator_options: [],
      data_update: null,
      data_destroy_id: null,
      base_url: import.meta.env.VITE_BASE_IMAGE_URL,
      items_to_show: ORDERS_TO_SHOW
    }
  },
  mixins: [
    ToastMixin
  ],
  created () {
    this.getUsersData()
  },
  methods: {
    getUsersData () {
      this.show_buses = false
      this.$adminRepository.getAllUsers().then(response => {
        this.usersData = response.data
        this.show_buses = true
      }).catch(error => {
        this.showToast('error', error.response.data.errors.error_message)
        this.show_buses = true
      })
    },
    openModalShow (user) {
      this.userData = user
      this.show_detail_modal = true
    },
    openModalUpdate (user) {
      this.userData = user
      this.show_update_modal = true
    },
    openModalDestroy (userId) {
      this.data_destroy_id = userId
      this.show_destroy_modal = true
    },
    updateUser () {
      const form = new FormData()
      form.append('id', this.userData.id)
      form.append('name', this.userData.name)
      form.append('gender', this.userData.gender)
      form.append('birth_date', this.userData.birth_date)
      form.append('phone_number', this.userData.phone_number)
      form.append('address', this.userData.address)
      if (this.userData.avatar_file) {
        form.append('avatar', this.userData.avatar_file)
      }
      this.$adminRepository.updateUser(form).then(() => {
        this.getUsersData()
        this.showToast('success', 'Cập nhật user thành công!')
        this.show_update_modal = false
      }).catch(error => {
        this.showToast('error', error.response.data.errors.error_message)
      })
    },
    destroyUser () {
      this.$adminRepository.destroyUser(this.data_destroy_id).then(() => {
        this.getUsersData()
        this.showToast('success', 'Xóa user thành công!')
        this.show_destroy_modal = false
      }).catch(error => {
        this.showToast('error', error.response.data.errors.error_message)
      })
    },
    showMore () {
      this.items_to_show += this.items_to_show
    },
    itemsToShow () {
      return this.usersData.slice(0, this.items_to_show)
    }
  }
}
</script>

<style>

</style>
