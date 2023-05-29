<template>
  <b-col cols="9" class="buses-management ps-0 mb-5 me-0 ms-5">
    <div>
      <div class="btn btn-success mb-2" @click="openModalCreate">Thêm mới</div>
      <table class="w-100 text-center border-2 text-nowrap">
        <thead>
        <tr>
          <th>#</th>
          <th>Biển số xe</th>
          <th>Số chỗ</th>
          <th>Kiểu xe</th>
          <th>Nhà xe</th>
          <th>Ngày tạo</th>
          <th>Lần sửa cuối</th>
          <th>Xem</th>
          <th>Sửa</th>
          <th>Xóa</th>
        </tr>
        </thead>
        <tbody>
        <b-overlay :show="!show_buses" no-wrap class="mt-5"></b-overlay>
        <tr v-for="(bus, index) in itemsToShow(busesData)" :key="bus.id">
          <td>{{ ++index }}</td>
          <td>{{ bus.license_plate }}</td>
          <td>{{ bus.seat_number }}</td>
          <td>{{ bus.type_text }}</td>
          <td>{{ bus.bus_stand }}</td>
          <td>{{ bus.created_at_formatted }}</td>
          <td>{{ bus.updated_at_formatted }}</td>
          <td>
            <div class="btn btn-secondary" @click="openModalShow(bus)">Xem</div>
          </td>
          <td>
            <div class="btn btn-primary" @click="openModalUpdate(bus)">Sửa</div>
          </td>
          <td>
            <div class="btn btn-danger" @click="openModalDestroy(bus.id)">Xóa</div>
          </td>
        </tr>
        </tbody>
      </table>

      <b-row class="mb-5">
        <b-button
          variant="primary"
          class="button-center mt-4"
          @click="showMore"
          v-show="items_to_show < busesData.length"
        >
          Xem thêm
        </b-button>
      </b-row>
    </div>

    <b-modal id="modal-create-bus" size="lg" title="Tạo mới xe khách" hide-footer v-model="show_create_modal">
      <b-row class="d-flex justify-content-center">
        <b-row>
          <ValidationProvider rules="image|ext:jpeg,png,jpg,gif|size:2048" name="image" v-slot="{ errors }">
            <b-row>
              <b-col class="ps-0 pt-2">
                <b-form-group id="input-image-group" label="Ảnh đại diện" label-for="image">
                  <b-form-file
                    class="btn-file-custom"
                    v-model="data.image"
                    placeholder="Thay đổi ảnh đại diện ở đây..."
                  ></b-form-file>
                  <span class="text-danger">{{ errors[0] }}</span>
                </b-form-group>
              </b-col>
            </b-row>
          </ValidationProvider>
        </b-row>

        <b-form>
          <ValidationObserver v-slot="{ handleSubmit }">
            <b-form>
              <b-row>
                <b-col class="">
                  <ValidationProvider rules="required|min:5|max:20" name="license plate" v-slot="{ errors }">
                    <b-form-group id="input-license_plate-group" label="Biển số xe" label-for="license_plate">
                      <b-form-input
                        id="license_plate"
                        v-model="data.license_plate"
                        type="text"
                      ></b-form-input>
                      <span class="text-danger">{{ errors[0] }}</span>
                    </b-form-group>
                  </ValidationProvider>
                </b-col>

                <b-col class="">
                  <ValidationProvider rules="required|integer|min_value:20|max_value:100" name="seat number" v-slot="{ errors }">
                    <b-form-group id="input-seat_number-group" label="Số chỗ ngồi" label-for="seat_number">
                      <b-form-input
                        id="seat_number"
                        v-model="data.seat_number"
                        type="number"
                      ></b-form-input>
                      <span class="text-danger">{{ errors[0] }}</span>
                    </b-form-group>
                  </ValidationProvider>
                </b-col>
              </b-row>

              <b-row>
                <b-col class="">
                  <ValidationProvider rules="required|integer|oneOf:0,1,2" name="bus type" v-slot="{ errors }">
                    <b-form-group id="input-type-group" label="Kiểu xe" label-for="type">
                      <b-form-select
                        id="type"
                        v-model="data.type"
                        :options="type_options"
                      ></b-form-select>
                      <span class="text-danger">{{ errors[0] }}</span>
                    </b-form-group>

                  </ValidationProvider>
                </b-col>

                <b-col class="">
                  <ValidationProvider rules="required|integer" name="bus operator" v-slot="{ errors }">
                    <b-form-group id="input-admin_id-group" label="Nhà xe" label-for="admin_id">
                      <b-form-select
                        id="admin_id"
                        v-model="data.admin_id"
                        :options="operator_options"
                      ></b-form-select>
                      <span class="text-danger">{{ errors[0] }}</span>
                    </b-form-group>
                  </ValidationProvider>
                </b-col>
              </b-row>

              <div class="d-flex justify-content-end">
                <b-button
                  type="submit"
                  variant="success"
                  class="w-auto mt-4"
                  @click.prevent="handleSubmit(createBus)"
                >
                  Tạo
                </b-button>
              </div>
            </b-form>
          </ValidationObserver>
        </b-form>
      </b-row>
    </b-modal>

    <b-modal id="modal-show-bus" size="lg" title="Chi tiết xe khách" hide-footer v-model="show_detail_modal">
      <b-row class="text-center">
        <b-col>
          <img :src="base_url + data_detail?.image" alt="bus-image" class="show-image-buses">
        </b-col>
        <b-col>
          <p class="text-primary">#</p>
          <p class="desc">{{ data_detail?.id }}</p>
        </b-col>
        <b-col>
          <p class="text-primary">Biển số xe</p>
          <p class="desc">{{ data_detail?.license_plate }}</p>
        </b-col>
        <b-col>
          <p class="text-primary">Số chỗ ngồi</p>
          <p class="desc">{{ data_detail?.seat_number }}</p>
        </b-col>
        <b-col>
          <p class="text-primary">Kiểu xe</p>
          <p class="desc">{{ data_detail?.type_text }}</p>
        </b-col>
        <b-col>
          <p class="text-primary">Nhà xe</p>
          <p class="desc">{{ data_detail?.bus_stand }}</p>
        </b-col>
      </b-row>
    </b-modal>

    <b-modal id="modal-update-bus" size="lg" title="Cập nhật xe khách" hide-footer v-model="show_update_modal">
      <b-row class="d-flex justify-content-center">
        <b-row>
          <ValidationProvider rules="image|ext:jpeg,png,jpg,gif|size:2048" name="image" v-slot="{ errors }">
            <b-row>
              <b-col class="ps-0 pt-2">
                <b-form-group id="input-image-group" label="Ảnh đại diện" label-for="image">
                  <b-form-file
                    class="btn-file-custom"
                    v-model="data_update.image_file"
                    placeholder="Thay đổi ảnh đại diện ở đây..."
                  ></b-form-file>
                  <span class="text-danger">{{ errors[0] }}</span>
                </b-form-group>
              </b-col>
            </b-row>
          </ValidationProvider>
        </b-row>

        <b-form>
          <ValidationObserver v-slot="{ handleSubmit }">
            <b-row>
              <b-col class="">
                <ValidationProvider rules="required|min:5|max:20" name="license plate" v-slot="{ errors }">
                  <b-form-group id="input-license_plate-group" label="Biển số xe" label-for="license_plate">
                    <b-form-input
                      id="license_plate"
                      v-model="data_update.license_plate"
                      type="text"
                    ></b-form-input>
                    <span class="text-danger">{{ errors[0] }}</span>
                  </b-form-group>
                </ValidationProvider>
              </b-col>

              <b-col class="">
                <ValidationProvider rules="required|integer|min_value:20|max_value:100" name="seat number" v-slot="{ errors }">
                  <b-form-group id="input-seat_number-group" label="Số chỗ ngồi" label-for="seat_number">
                    <b-form-input
                      id="seat_number"
                      v-model="data_update.seat_number"
                      type="number"
                    ></b-form-input>
                    <span class="text-danger">{{ errors[0] }}</span>
                  </b-form-group>
                </ValidationProvider>
              </b-col>
            </b-row>

            <b-row>
              <b-col class="">
                <ValidationProvider rules="required|integer|oneOf:0,1,2" name="bus type" v-slot="{ errors }">
                  <b-form-group id="input-type-group" label="Kiểu xe" label-for="type">
                    <b-form-select
                      id="type"
                      v-model="data_update.type"
                      :options="type_options"
                    ></b-form-select>
                    <span class="text-danger">{{ errors[0] }}</span>
                  </b-form-group>

                </ValidationProvider>
              </b-col>

              <b-col class="">
                <ValidationProvider rules="required|integer" name="bus operator" v-slot="{ errors }">
                  <b-form-group id="input-admin_id-group" label="Nhà xe" label-for="admin_id">
                    <b-form-select
                      id="admin_id"
                      v-model="data_update.admin_id"
                      :options="operator_options"
                    ></b-form-select>
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
                @click.prevent="handleSubmit(updateBus)"
              >
                Cập nhật
              </b-button>
            </div>
          </ValidationObserver>
        </b-form>
      </b-row>
    </b-modal>

    <b-modal id="modal-destroy-bus" size="md" title="Bạn muốn xóa xe khách này" hide-footer v-model="show_destroy_modal">
      <p>Bạn sẽ không thể hoàn tác hành động này!</p>
      <div class="btn btn-danger float-end" @click="destroyBus(data_destroy_id)">Đồng ý xóa</div>
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
      busesData: [],
      show_buses: true,
      show_create_modal: false,
      show_detail_modal: false,
      show_update_modal: false,
      show_destroy_modal: false,
      data: {
        image: null,
        license_plate: '',
        seat_number: 20,
        type: 0,
        admin_id: null
      },
      type_options: SEAT_TYPES,
      operator_options: [],
      data_detail: null,
      data_update: null,
      data_destroy_id: null,
      base_url: import.meta.env.VITE_BASE_IMAGE_URL + 'buses/',
      items_to_show: ORDERS_TO_SHOW
    }
  },
  mixins: [
    ToastMixin
  ],
  created () {
    this.getBusesData()
    this.getBusOperatorsData()
  },
  methods: {
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
    },
    getBusesData () {
      this.show_buses = false
      this.$adminRepository.getAllBuses().then(response => {
        this.busesData = response.data
        this.show_buses = true
      }).catch(error => {
        this.showToast('error', error.response.data.errors.error_message)
        this.show_buses = true
      })
    },
    getBusOperatorsData () {
      this.$adminRepository.getAllBusOperators().then(response => {
        this.operator_options = response.data
        this.data.admin_id = this.operator_options[0].value
      }).catch(error => {
        this.showToast('error', error.response.data.errors.error_message)
      })
    },
    openModalCreate () {
      this.show_create_modal = true
    },
    openModalShow (bus) {
      this.data_detail = bus
      this.show_detail_modal = true
    },
    openModalUpdate (bus) {
      this.data_update = bus
      this.show_update_modal = true
    },
    openModalDestroy (busId) {
      this.data_destroy_id = busId
      this.show_destroy_modal = true
    },
    createBus () {
      const form = new FormData()
      form.append('license_plate', this.data.license_plate)
      form.append('seat_number', this.data.seat_number)
      form.append('type', this.data.type)
      form.append('admin_id', this.data.admin_id)
      if (this.data.image) {
        form.append('image', this.data.image)
      }

      this.$adminRepository.createBus(form).then(() => {
        this.getBusesData()
        this.showToast('success', 'Thêm xe khách thành công!')
        this.show_create_modal = false
      }).catch(error => {
        this.showToast('error', error.response.data.errors.error_message)
      })
    },
    updateBus () {
      const form = new FormData()
      form.append('id', this.data_update.id)
      form.append('license_plate', this.data_update.license_plate)
      form.append('seat_number', this.data_update.seat_number)
      form.append('type', this.data_update.type)
      form.append('admin_id', this.data_update.admin_id)
      if (this.data_update.image_file) {
        form.append('image', this.data_update.image_file)
      }

      this.$adminRepository.updateBus(form).then(() => {
        this.getBusesData()
        this.showToast('success', 'Cập nhật xe khách thành công!')
        this.show_update_modal = false
      }).catch(error => {
        this.showToast('error', error.response.data.errors.error_message)
      })
    },
    destroyBus () {
      this.$adminRepository.destroyBus(this.data_destroy_id).then(() => {
        this.getBusesData()
        this.showToast('success', 'Xóa xe khách thành công!')
        this.show_destroy_modal = false
      }).catch(error => {
        this.showToast('error', error.response.data.errors.error_message)
      })
    },
    showMore () {
      this.items_to_show += this.items_to_show
    },
    itemsToShow () {
      return this.busesData.slice(0, this.items_to_show)
    }
  }
}
</script>

<style>

</style>
