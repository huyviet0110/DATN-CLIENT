<template>
  <b-col cols="9" class="buses-management ps-0 mb-5 me-0 ms-5">
    <div>
      <div class="btn btn-success mb-2" @click="openModalCreate">Thêm mới</div>
      <table class="w-100 text-center border-2 text-nowrap">
        <thead>
        <tr>
          <th>#</th>
          <th>Điểm đi</th>
          <th>Điểm đến</th>
          <th>Xe</th>
          <th>Giờ khởi hành</th>
          <th>Tổng thời gian</th>
          <th>Giá</th>
          <th>Xem</th>
          <th>Sửa</th>
          <th>Xóa</th>
        </tr>
        </thead>
        <tbody>
        <b-overlay :show="!show_buses" no-wrap class="mt-5"></b-overlay>
        <tr v-for="(item, index) in itemsToShow(tripsData)" :key="item.id">
          <td>{{ ++index }}</td>
          <td>{{ item.departure_location_name }}</td>
          <td>{{ item.destination_location_name }}</td>
          <td>{{ item.bus_stand }}</td>
          <td>{{ item.departure_time_formatted }}</td>
          <td>{{ item.total_time_formatted }}</td>
          <td>{{ item.price_formatted }}đ</td>
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
          v-show="items_to_show < tripsData.length"
        >
          Xem thêm
        </b-button>
      </b-row>
    </div>

    <b-modal id="modal-create-bus" size="lg" title="Tạo mới chuyến đi" hide-footer v-model="show_create_modal">
      <b-row class="d-flex justify-content-center">
        <ValidationObserver v-slot="{ handleSubmit }">
          <b-form>
            <b-row>
              <b-col class="">
                <ValidationProvider rules="required|integer" name="journey" v-slot="{ errors }">
                  <b-form-group id="input-journey-group" label="Tuyến đường" label-for="journey">
                    <b-form-select
                      id="destination_location_id"
                      v-model="tripDataToCreate.journey_id"
                      :options="journeys"
                    ></b-form-select>
                    <span class="text-danger">{{ errors[0] }}</span>
                  </b-form-group>
                </ValidationProvider>
              </b-col>

              <b-col>
                <ValidationProvider rules="required|integer" name="bus-stand" v-slot="{ errors }">
                  <b-form-group id="input-bus-stand-group" label="Xe khách" label-for="bus-stand">
                    <b-form-select
                      id="destination_location_id"
                      v-model="tripDataToCreate.bus_id"
                      :options="bus_options"
                    ></b-form-select>
                    <span class="text-danger">{{ errors[0] }}</span>
                  </b-form-group>
                </ValidationProvider>
              </b-col>
            </b-row>

            <b-row>
              <b-col cols="8" class="ps-0">
                <ValidationProvider rules="required" name="pick up place" v-slot="{ errors }">
                  <b-form-group id="input-pick_up_place-group" label="Điểm đón" label-for="pick_up_place" class="mt-2">
                    <b-form-input
                      id="pick_up_place"
                      v-model="tripDataToCreate.pick_up_place"
                    ></b-form-input>
                    <span class="text-danger">{{ errors[0] }}</span>
                  </b-form-group>
                </ValidationProvider>
              </b-col>
              <b-col cols="4" class="ps-0">
                <ValidationProvider name="pick up time" rules="required" v-slot="{ errors }">
                  <b-form-group id="input-pick_up_time-group" label="Thời gian đón" label-for="pick_up_time" class="pt-2">
                    <b-form-timepicker
                      id="pick_up_time"
                      v-model="tripDataToCreate.pick_up_time"
                      locale="vi"
                    ></b-form-timepicker>
                    <span class="text-danger">{{ errors[0] }}</span>
                  </b-form-group>
                </ValidationProvider>
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="8" class="ps-0">
                <ValidationProvider rules="required" name="drop off place" v-slot="{ errors }">
                  <b-form-group id="input-drop_off_place-group" label="Điểm trả" label-for="drop_off_place" class="mt-2">
                    <b-form-input
                      id="drop_off_place"
                      v-model="tripDataToCreate.drop_off_place"
                    ></b-form-input>
                    <span class="text-danger">{{ errors[0] }}</span>
                  </b-form-group>
                </ValidationProvider>
              </b-col>
              <b-col cols="4" class="ps-0">
                <ValidationProvider name="drop off time" rules="required" v-slot="{ errors }">
                  <b-form-group id="input-drop_off_time-group" label="Thời gian đón" label-for="drop_off_time" class="pt-2">
                    <b-form-timepicker
                      id="drop_off_time"
                      v-model="tripDataToCreate.drop_off_time"
                      locale="vi"
                    ></b-form-timepicker>
                    <span class="text-danger">{{ errors[0] }}</span>
                  </b-form-group>
                </ValidationProvider>
              </b-col>
            </b-row>

            <b-row>
              <b-col>
                <ValidationProvider name="departure time" rules="required" v-slot="{ errors }">
                  <b-form-group id="input-departure_time-group" label="Thời điểm khởi hành" label-for="departure_time" class="pt-2">
                    <b-form-timepicker
                      id="departure_time"
                      v-model="tripDataToCreate.departure_time"
                      locale="vi"
                    ></b-form-timepicker>
                    <span class="text-danger">{{ errors[0] }}</span>
                  </b-form-group>
                </ValidationProvider>
              </b-col>

              <b-col>
                <ValidationProvider name="total time" rules="required" v-slot="{ errors }">
                  <b-form-group id="input-total-time-group" label="Tổng thời gian" label-for="total-time" class="pt-2">
                    <b-form-timepicker
                      id="total-time"
                      v-model="tripDataToCreate.total_time"
                      locale="vi"
                    ></b-form-timepicker>
                    <span class="text-danger">{{ errors[0] }}</span>
                  </b-form-group>
                </ValidationProvider>
              </b-col>

              <b-col class="ps-0">
                <ValidationProvider rules="required|min_value:50000|max_value:5000000" name="price" v-slot="{ errors }">
                  <b-form-group id="input-price-group" label="Giá tiền" label-for="price" class="mt-2">
                    <b-form-input
                      id="price"
                      v-model="tripDataToCreate.price"
                      type="number"
                    ></b-form-input>
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
                @click.prevent="handleSubmit(createTrip)"
              >
                Tạo mới
              </b-button>
            </div>
          </b-form>
        </ValidationObserver>
      </b-row>
    </b-modal>

    <b-modal size="lg" title="Chi tiết chuyến đi" hide-footer v-model="show_detail_modal">
      <b-col class="text-center">
        <b-row class="text-nowrap">
          <b-col>
            <p class="text-primary">#</p>
            <p class="desc">{{ tripDataToShow?.id }}</p>
          </b-col>
          <b-col>
            <p class="text-primary">Điểm khởi hành</p>
            <p class="desc">{{ tripDataToShow?.departure_location_name }}</p>
          </b-col>
          <b-col>
            <p class="text-primary">Điểm kết thúc</p>
            <p class="desc">{{ tripDataToShow?.destination_location_name }}</p>
          </b-col>
          <b-col>
            <p class="text-primary">Biển số xe</p>
            <p class="desc">{{ tripDataToShow?.license_plate }}</p>
          </b-col>
          <b-col>
            <p class="text-primary">Nhà xe</p>
            <p class="desc">{{ tripDataToShow?.bus_stand_name }}</p>
          </b-col>
          <b-col>
            <p class="text-primary">Giờ khởi hành</p>
            <p class="desc">{{ tripDataToShow?.departure_time_formatted }}</p>
          </b-col>
          <b-col>
            <p class="text-primary">Tổng thời gian</p>
            <p class="desc">{{ tripDataToShow?.total_time_formatted }}</p>
          </b-col>
          <b-col>
            <p class="text-primary">Điểm đón</p>
            <p class="desc">{{ tripDataToShow?.pick_up_place }}</p>
          </b-col>
          <b-col>
            <p class="text-primary">Thời gian đón</p>
            <p class="desc">{{ tripDataToShow?.pick_up_time }}</p>
          </b-col>
          <b-col>
            <p class="text-primary">Điểm trả</p>
            <p class="desc">{{ tripDataToShow?.drop_off_place }}</p>
          </b-col>
          <b-col>
            <p class="text-primary">Thời gian trả</p>
            <p class="desc">{{ tripDataToShow?.drop_off_time }}</p>
          </b-col>
          <b-col>
            <p class="text-primary">Giá</p>
            <p class="desc">{{ tripDataToShow?.price_formatted }}đ</p>
          </b-col>
        </b-row>
      </b-col>
    </b-modal>

    <b-modal id="modal-update-bus" size="lg" title="Cập nhật chuyến đi" hide-footer v-model="show_update_modal">
      <ValidationObserver v-slot="{ handleSubmit }">
        <b-form>
          <b-row>
            <b-col class="">
              <ValidationProvider rules="required|integer" name="journey" v-slot="{ errors }">
                <b-form-group id="input-journey-group" label="Tuyến đường" label-for="journey">
                  <b-form-select
                    id="destination_location_id"
                    v-model="tripData.journey_id"
                    :options="journeys"
                  ></b-form-select>
                  <span class="text-danger">{{ errors[0] }}</span>
                </b-form-group>
              </ValidationProvider>
            </b-col>

            <b-col>
              <ValidationProvider rules="required|integer" name="bus-stand" v-slot="{ errors }">
                <b-form-group id="input-bus-stand-group" label="Xe khách" label-for="bus-stand">
                  <b-form-select
                    id="destination_location_id"
                    v-model="tripData.bus_id"
                    :options="bus_options"
                  ></b-form-select>
                  <span class="text-danger">{{ errors[0] }}</span>
                </b-form-group>
              </ValidationProvider>
            </b-col>
          </b-row>

          <b-row>
            <b-col cols="8" class="ps-0">
              <ValidationProvider rules="required" name="pick up place" v-slot="{ errors }">
                <b-form-group id="input-pick_up_place-group" label="Điểm đón" label-for="pick_up_place" class="mt-2">
                  <b-form-input
                    id="pick_up_place"
                    v-model="tripData.pick_up_place"
                  ></b-form-input>
                  <span class="text-danger">{{ errors[0] }}</span>
                </b-form-group>
              </ValidationProvider>
            </b-col>
            <b-col cols="4" class="ps-0">
              <ValidationProvider name="pick up time" rules="required" v-slot="{ errors }">
                <b-form-group id="input-pick_up_time-group" label="Thời gian đón" label-for="pick_up_time" class="pt-2">
                  <b-form-timepicker
                    id="pick_up_time"
                    v-model="tripData.pick_up_time"
                    locale="vi"
                  ></b-form-timepicker>
                  <span class="text-danger">{{ errors[0] }}</span>
                </b-form-group>
              </ValidationProvider>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="8" class="ps-0">
              <ValidationProvider rules="required" name="drop off place" v-slot="{ errors }">
                <b-form-group id="input-drop_off_place-group" label="Điểm trả" label-for="drop_off_place" class="mt-2">
                  <b-form-input
                    id="drop_off_place"
                    v-model="tripData.drop_off_place"
                  ></b-form-input>
                  <span class="text-danger">{{ errors[0] }}</span>
                </b-form-group>
              </ValidationProvider>
            </b-col>
            <b-col cols="4" class="ps-0">
              <ValidationProvider name="drop off time" rules="required" v-slot="{ errors }">
                <b-form-group id="input-drop_off_time-group" label="Thời gian đón" label-for="drop_off_time" class="pt-2">
                  <b-form-timepicker
                    id="drop_off_time"
                    v-model="tripData.drop_off_time"
                    locale="vi"
                  ></b-form-timepicker>
                  <span class="text-danger">{{ errors[0] }}</span>
                </b-form-group>
              </ValidationProvider>
            </b-col>
          </b-row>

          <b-row>
            <b-col>
              <ValidationProvider name="departure time" v-slot="{ errors }">
                <b-form-group id="input-departure_time-group" label="Thời điểm khởi hành" label-for="departure_time" class="pt-2">
                  <b-form-timepicker
                    id="departure_time"
                    v-model="tripData.departure_time"
                    locale="vi"
                  ></b-form-timepicker>
                  <span class="text-danger">{{ errors[0] }}</span>
                </b-form-group>
              </ValidationProvider>
            </b-col>

            <b-col>
              <ValidationProvider name="total time" v-slot="{ errors }">
                <b-form-group id="input-total-time-group" label="Tổng thời gian" label-for="total-time" class="pt-2">
                  <b-form-timepicker
                    id="total-time"
                    v-model="tripData.total_time"
                    locale="vi"
                  ></b-form-timepicker>
                  <span class="text-danger">{{ errors[0] }}</span>
                </b-form-group>
              </ValidationProvider>
            </b-col>

            <b-col class="ps-0">
              <ValidationProvider rules="required|min_value:50000|max_value:5000000" name="price" v-slot="{ errors }">
                <b-form-group id="input-price-group" label="Giá tiền" label-for="price" class="mt-2">
                  <b-form-input
                    id="price"
                    v-model="tripData.price"
                    type="number"
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
              @click.prevent="handleSubmit(updateTrip)"
            >
              Cập nhật
            </b-button>
          </div>
        </b-form>
      </ValidationObserver>
    </b-modal>

    <b-modal id="modal-destroy-bus" size="md" title="Bạn muốn xóa xe khách này" hide-footer v-model="show_destroy_modal">
      <p>Bạn sẽ không thể hoàn tác hành động này!</p>
      <div class="btn btn-danger float-end" @click="destroyTrip">Đồng ý xóa</div>
    </b-modal>
  </b-col>
</template>

<script>
import { ORDERS_TO_SHOW, SEAT_TYPES } from '@/helpers/constant'
import ToastMixin from '@/Mixins/ToastMixin'

export default {
  data () {
    return {
      tripData: {
        id: '',
        journey_id: '',
        bus_id: '',
        pick_up_place: '',
        drop_off_place: '',
        pick_up_time: '',
        drop_off_time: '',
        departure_time: '',
        total_time: '',
        price: ''
      },
      tripsData: [],
      tripDataToShow: null,
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
      journeys: [],
      bus_options: [],
      tripDataToCreate: {
        journey_id: '',
        bus_id: '',
        departure_time: '',
        total_time: '',
        price: ''
      }
    }
  },
  mixins: [
    ToastMixin
  ],
  created () {
    this.getAllTrips()
    this.getAllJourneys()
    this.getAllBuses()
  },
  methods: {
    getAllTrips () {
      this.show_buses = false
      this.$adminRepository.getAllTrips().then(response => {
        this.tripsData = response.data
        this.show_buses = true
      }).catch(error => {
        this.showToast('error', error.response.data.errors.error_message)
        this.show_buses = true
      })
    },
    getAllJourneys () {
      this.$adminRepository.getAllJourneys().then(response => {
        this.journeys = response.data
      }).catch(error => {
        this.showToast('error', error.response.data.errors.error_message)
      })
    },
    getAllBuses () {
      this.$adminRepository.getAllBuses().then(response => {
        this.bus_options = response.data
      }).catch(error => {
        this.showToast('error', error.response.data.errors.error_message)
      })
    },
    openModalCreate () {
      this.show_create_modal = true
    },
    openModalShow (trip) {
      this.tripDataToShow = trip
      this.show_detail_modal = true
    },
    openModalUpdate (journey) {
      this.tripData = journey
      this.show_update_modal = true
    },
    openModalDestroy (journeyId) {
      this.data_destroy_id = journeyId
      this.show_destroy_modal = true
    },
    createTrip () {
      this.$adminRepository.createTrip(this.tripDataToCreate).then(() => {
        this.getAllTrips()
        this.showToast('success', 'Thêm chuyến đi thành công!')
        this.show_create_modal = false
      }).catch(error => {
        this.showToast('error', error.response.data.errors.error_message)
      })
    },
    updateTrip () {
      this.$adminRepository.updateTrip(this.tripData).then(() => {
        this.getAllTrips()
        this.showToast('success', 'Cập nhật chuyến đi thành công!')
        this.show_update_modal = false
      }).catch(error => {
        this.showToast('error', error.response.data.errors.error_message)
      })
    },
    destroyTrip () {
      this.$adminRepository.destroyTrip(this.data_destroy_id).then(() => {
        this.getAllTrips()
        this.showToast('success', 'Xóa chuyến đi thành công!')
        this.show_destroy_modal = false
      }).catch(error => {
        this.showToast('error', error.response.data.errors.error_message)
      })
    },
    showMore () {
      this.items_to_show += this.items_to_show
    },
    itemsToShow () {
      return this.tripsData.slice(0, this.items_to_show)
    }
  }
}
</script>

<style>

</style>
