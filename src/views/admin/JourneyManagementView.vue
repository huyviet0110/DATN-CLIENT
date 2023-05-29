<template>
  <b-col cols="9" class="buses-management ps-0 mb-5 me-0 ms-5">
    <div>
      <table class="w-100 text-center border-2 text-nowrap">
        <thead>
        <tr>
          <th>#</th>
          <th>Điểm khởi hành</th>
          <th>Điểm kết thúc</th>
          <th>Slug</th>
          <th>Ngày tạo</th>
          <th>Lần sửa cuối</th>
          <th>Sửa</th>
          <th>Xóa</th>
        </tr>
        </thead>
        <tbody>
        <b-overlay :show="!show_buses" no-wrap class="mt-5"></b-overlay>
        <tr v-for="(item, index) in itemsToShow(journeysData)" :key="item.id">
          <td>{{ ++index }}</td>
          <td>{{ item.departure_text }}</td>
          <td>{{ item.destination_text }}</td>
          <td>{{ item.slug }}</td>
          <td>{{ item.created_at_formatted }}</td>
          <td>{{ item.updated_at_formatted }}</td>
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
          v-show="items_to_show < journeysData.length"
        >
          Xem thêm
        </b-button>
      </b-row>
    </div>

    <b-modal id="modal-update-bus" size="lg" title="Cập nhật tuyến đường" hide-footer v-model="show_update_modal">
      <ValidationObserver v-slot="{ handleSubmit }">
        <b-form>
          <b-row>
            <b-col class="">
              <ValidationProvider rules="required|integer" name="departure location" v-slot="{ errors }">
                <b-form-group id="input-departure-group" label="Điểm khởi hành" label-for="departure_location_id">
                  <b-form-select
                    id="departure_location_id"
                    v-model="data_update.departure_location_id"
                    :options="locations"
                  ></b-form-select>
                  <span class="text-danger">{{ errors[0] }}</span>
                </b-form-group>

              </ValidationProvider>
            </b-col>

            <b-col class="">
              <ValidationProvider rules="required|integer" name="destination location" v-slot="{ errors }">
                <b-form-group id="input-destination-group" label="Điểm kết thúc" label-for="destination_location_id">
                  <b-form-select
                    id="destination_location_id"
                    v-model="data_update.destination_location_id"
                    :options="locations"
                  ></b-form-select>
                  <span class="text-danger">{{ errors[0] }}</span>
                </b-form-group>
              </ValidationProvider>
            </b-col>
          </b-row>

          <b-row>
            <b-col class="">
              <ValidationProvider rules="required|min:2|max:255" name="Slug" v-slot="{ errors }">
                <b-form-group id="input-slug-group" label="Slug" label-for="slug">
                  <b-form-input
                    id="slug"
                    v-model="data_update.slug"
                    type="text"
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
              @click.prevent="handleSubmit(updateJourney)"
            >
              Cập nhật
            </b-button>
          </div>
        </b-form>
      </ValidationObserver>
    </b-modal>

    <b-modal id="modal-destroy-bus" size="md" title="Bạn muốn xóa xe khách này" hide-footer v-model="show_destroy_modal">
      <p>Bạn sẽ không thể hoàn tác hành động này!</p>
      <div class="btn btn-danger float-end" @click="destroyJourney(data_destroy_id)">Đồng ý xóa</div>
    </b-modal>
  </b-col>
</template>

<script>
import { ORDERS_TO_SHOW, SEAT_TYPES } from '@/helpers/constant'
import ToastMixin from '@/Mixins/ToastMixin'

export default {
  data () {
    return {
      journeyData: {
        name: '',
        gender: '',
        birth_date: '',
        phone_number: '',
        address: '',
        avatar: '',
        avatar_file: null
      },
      journeysData: [],
      show_buses: true,
      show_create_modal: false,
      show_detail_modal: false,
      show_update_modal: false,
      show_destroy_modal: false,
      type_options: SEAT_TYPES,
      operator_options: [],
      data_update: null,
      data_destroy_id: null,
      base_url: import.meta.env.VITE_BASE_IMAGE_URL,
      items_to_show: ORDERS_TO_SHOW,
      locations: []
    }
  },
  mixins: [
    ToastMixin
  ],
  created () {
    this.getJourneysData()
    this.getAllLocations()
  },
  methods: {
    getJourneysData () {
      this.show_buses = false
      this.$adminRepository.getAllJourneys().then(response => {
        this.journeysData = response.data
        this.show_buses = true
      }).catch(error => {
        this.showToast('error', error.response.data.errors.error_message)
        this.show_buses = true
      })
    },
    getAllLocations () {
      this.$locationRepository.getAll().then(response => {
        this.locations = response.data
      }).catch(error => {
        this.showToast('error', error.response.data.errors.error_message)
      })
    },
    openModalUpdate (journey) {
      this.data_update = journey
      this.show_update_modal = true
    },
    openModalDestroy (journeyId) {
      this.data_destroy_id = journeyId
      this.show_destroy_modal = true
    },
    createJourney () {
      this.$adminRepository.createJourney(this.journeyData).then(() => {
        this.getBusesData()
        this.showToast('success', 'Thêm tuyến đường thành công!')
        this.show_create_modal = false
      }).catch(error => {
        this.showToast('error', error.response.data.errors.error_message)
      })
    },
    updateJourney () {
      this.$adminRepository.updateJourney(this.data_update).then(() => {
        this.getJourneysData()
        this.showToast('success', 'Cập nhật tuyến đường thành công!')
        this.show_update_modal = false
      }).catch(error => {
        this.showToast('error', error.response.data.errors.error_message)
      })
    },
    destroyJourney () {
      this.$adminRepository.destroyJourney(this.data_destroy_id).then(() => {
        this.getJourneysData()
        this.showToast('success', 'Xóa tuyến đường thành công!')
        this.show_destroy_modal = false
      }).catch(error => {
        this.showToast('error', error.response.data.errors.error_message)
      })
    },
    showMore () {
      this.items_to_show += this.items_to_show
    },
    itemsToShow () {
      return this.journeysData.slice(0, this.items_to_show)
    }
  }
}
</script>

<style>

</style>
