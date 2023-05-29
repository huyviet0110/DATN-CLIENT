<template>
  <section id="section-search-trip" class="section-search-trip">
    <b-container class="container-search-trip d-flex align-items-center justify-content-center">
      <b-row>
        <b-row class="filter-trips">
          <b-row>
            <b-col class="d-flex justify-content-center align-items-center">
              <div class="current-service d-flex justify-content-center align-items-center">
                <svg viewBox="0 0 24 24" class="bus-icon">
                  <path d="M4 16c0 .88.39 1.67 1 2.22V20c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h8v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1.78c.61-.55 1-1.34 1-2.22V6c0-3.5-3.58-4-8-4s-8 .5-8 4v10zm3.5 1c-.83 0-1.5-.67-1.5-1.5S6.67 14 7.5 14s1.5.67 1.5 1.5S8.33 17 7.5 17zm9 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm1.5-6H6V6h12v5z"></path>
                </svg>
                <span>Xe khách</span>
              </div>
            </b-col>
          </b-row>

          <b-row class="d-flex flex- justify-content-center align-items-center">
            <b-col cols="9">
              <b-row class="filter-info">
                <b-col class="departure-location">
                  <div class="switch-icon-container bg-gray icon-switch" @click="switchLocation">
                    <div class="material-icons-wrapper md-24 switch-icon ">
                      <b-icon icon="arrow-left-right" aria-hidden="true"></b-icon>
                    </div>
                  </div>

                  <div class="icon d-flex align-items-center">
                    <img src="/src/assets/images/homepage/pickup_vex_blue_24dp.svg" alt="departure-location-icon">
                  </div>

                  <div class="info">
                    <div class="title">
                      Nơi xuất phát
                    </div>
                    <div class="name">
                      <el-select v-model="data_search_trips.departure_location_id" filterable placeholder="Nơi xuất phát">
                        <el-option-group
                          label="Tỉnh - Thành phố">
                          <el-option
                            v-for="location in provinces"
                            :key="location.id"
                            :label="location.name"
                            :value="location.id">
                          </el-option>
                        </el-option-group>

                        <el-option-group
                          label="Quận - Huyện">
                          <el-option
                            v-for="location in districts"
                            :key="location.id"
                            :label="location.name"
                            :value="location.id">
                          </el-option>
                        </el-option-group>
                      </el-select>
                    </div>
                  </div>
                </b-col>

                <b-col class="destination-location">
                  <div class="icon d-flex align-items-center">
                    <img src="/src/assets/images/homepage/pickup_negative_24dp.svg" alt="destination-location-icon">
                  </div>

                  <div class="info">
                    <div class="title">
                      Nơi đến
                    </div>
                    <div class="name">
                      <el-select v-model="data_search_trips.destination_location_id" filterable placeholder="Nơi đến">
                        <el-option-group
                          label="Tỉnh - Thành phố">
                          <el-option
                            v-for="location in provinces"
                            :key="location.id"
                            :label="location.name"
                            :value="location.id">
                          </el-option>
                        </el-option-group>

                        <el-option-group
                          label="Quận - Huyện">
                          <el-option
                            v-for="location in districts"
                            :key="location.id"
                            :label="location.name"
                            :value="location.id">
                          </el-option>
                        </el-option-group>
                      </el-select>
                    </div>
                  </div>
                </b-col>

                <b-col class="departure-date">
                  <div class="icon d-flex align-items-center">
                    <img src="/src/assets/images/homepage/event_vex_blue_24dp.svg" alt="departure-date-icon">
                  </div>

                  <div class="info">
                    <div class="title">
                      Ngày đi
                    </div>
                    <div class="detail">
                      <el-date-picker
                        v-model="data_search_trips.departure_date"
                        type="date"
                        placeholder="Nhập ngày đi"
                        format="dd-MM-yyyy"
                        :picker-options="{ disabledDate: (datePicked) => disabledDates(datePicked) }"
                      >
                      </el-date-picker>
                    </div>
                  </div>
                </b-col>
              </b-row>
            </b-col>

            <b-col cols="3">
              <div class="btn btn-primary btn-search-trips fs-6" @click="searchTrips">
                Tìm chuyến
              </div>
            </b-col>
          </b-row>
        </b-row>
      </b-row>
    </b-container>
  </section>
</template>

<script>
import { HIGHEST_LEVEL, THIRTY_DAYS_AFTER_TODAY } from '@/helpers/constant'
import ToastMixin from '@/Mixins/ToastMixin'

export default {
  created () {
    this.getAllLocations()
  },
  data () {
    return {
      provinces: [],
      districts: [],
      data_search_trips: {
        departure_location_id: '',
        destination_location_id: '',
        departure_date: ''
      },
      thirty_days_after_today: THIRTY_DAYS_AFTER_TODAY
    }
  },
  mixins: [
    ToastMixin
  ],
  methods: {
    switchLocation () {
      [
        this.data_search_trips.departure_location_id,
        this.data_search_trips.destination_location_id
      ] = [
        this.data_search_trips.destination_location_id,
        this.data_search_trips.departure_location_id
      ]
    },
    searchTrips () {
      for (const param in this.data_search_trips) {
        if (!this.data_search_trips[param]) {
          this.showToast('error', 'Bạn cần nhập đầy đủ 3 ô: Nơi xuất phát, nơi đến, ngày đi')
          return false
        }
      }
      this.$router.push({ name: 'list-trips', params: this.data_search_trips })
    },
    getAllLocations () {
      if (localStorage.getItem('provinces') && localStorage.getItem('districts')) {
        this.provinces = JSON.parse(localStorage.getItem('provinces'))
        this.districts = JSON.parse(localStorage.getItem('districts'))
      } else {
        this.$locationRepository.getAll().then(response => {
          for (const location of response.data) {
            (location.parent_id === HIGHEST_LEVEL) ? this.provinces.push(location) : this.districts.push(location)
          }
          localStorage.setItem('provinces', JSON.stringify(this.provinces))
          localStorage.setItem('districts', JSON.stringify(this.districts))
        }).catch(error => {
          this.showToast('error', error.response.data.errors.error_message)
        })
      }
    },
    disabledDates (datePicked) {
      let now = new Date(Date.now())
      now.setDate(now.getDate() - 1)
      return datePicked.getTime() < now.getTime() || datePicked.getTime() > this.thirty_days_after_today
    }
  }
}
</script>

<style>
@import '@/assets/css/homepage/search-trip.css';
</style>
