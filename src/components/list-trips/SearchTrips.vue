<template>
  <section id="section-search-trips" class="section-search-trips">
    <div class="content-header">
      <b-row class="header">
        <b-col class="d-flex justify-content-center align-items-center">
          <div class="icon-bus float-start">
            <svg xmlns="http://www.w3.org/2000/svg" width="19" height="22" viewBox="0 0 19 22" fill="none">
              <path d="M4.512 0C2.568 0 .237 1.09.237 4.027V17.6s0 1.467 1.425 1.467v1.466S1.662 22 3.087 22s1.425-1.467 1.425-1.467v-1.466h9.976v1.466s0 1.467 1.425 1.467 1.425-1.467 1.425-1.467v-1.466s1.425 0 1.425-1.467V4.027C18.763 1.028 17.002 0 15.058 0H4.512zm.356 2.2h9.264c.094 0 .185.039.252.107a.372.372 0 0 1 0 .519.351.351 0 0 1-.252.107H4.868a.351.351 0 0 1-.252-.107.372.372 0 0 1 0-.519.351.351 0 0 1 .252-.107zM3.087 4.4h12.826c1.425 0 1.425 1.418 1.425 1.418v4.449s0 1.466-1.425 1.466H3.087c-1.425 0-1.425-1.466-1.425-1.466v-4.4s0-1.467 1.425-1.467zm0 10.267c.378 0 .74.154 1.008.43.267.274.417.647.417 1.036 0 .39-.15.762-.417 1.037-.268.275-.63.43-1.008.43s-.74-.155-1.008-.43a1.489 1.489 0 0 1-.417-1.037c0-.389.15-.762.417-1.037.268-.275.63-.43 1.008-.43zm12.826 0c.378 0 .74.154 1.008.43.267.274.417.647.417 1.036 0 .39-.15.762-.417 1.037-.267.275-.63.43-1.008.43s-.74-.155-1.008-.43a1.489 1.489 0 0 1-.417-1.037c0-.389.15-.762.417-1.037.268-.275.63-.43 1.008-.43z" fill="#2474E5"></path>
            </svg>
          </div>

          <div class="bus-text float-start">
            <span>Xe khách</span>
          </div>
        </b-col>
      </b-row>
    </div>

    <div class="bread-crumb">
      <router-link :to="{ name: 'home' }">Vé xe khách</router-link>
      <span>
        > xe đi
        {{ getLocationById(dataSearchTrips.departure_location_id) }}
        đến
        {{ getLocationById(dataSearchTrips.destination_location_id) }}
      </span>
    </div>

    <b-form>
      <b-row class="search-trips-form">
        <b-col cols="4">
          <b-row>
            <b-col cols="1">
              <svg class="icon-location" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 11.781 16">
                <path class="svg-location" d="M5.89 0A5.9 5.9 0 0 0 0 5.891 5.746 5.746 0 0 0 .517 8.3a37.14 37.14 0 0 0 5.127 7.591.328.328 0 0 0 .5 0A37.159 37.159 0 0 0 11.266 8.3a5.743 5.743 0 0 0 .515-2.4A5.9 5.9 0 0 0 5.89 0zm0 8.95a3.06 3.06 0 1 1 3.06-3.06 3.063 3.063 0 0 1-3.06 3.06z"></path>
              </svg>
            </b-col>

            <b-col cols="11">
              <el-select v-model="dataSearchTrips.departure_location_id" filterable placeholder="Nơi xuất phát" class="input-search-trips">
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

              <svg class="switch-location" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" @click="switchLocation">
                <g stroke="#0060c4">
                  <g fill="#fff">
                    <circle cx="14" cy="14" r="14" stroke="none"></circle>
                    <circle cx="14" cy="14" r="13.5" fill="none"></circle>
                  </g>
                  <path fill="none" stroke-linecap="round" stroke-miterlimit="10" d="M20 10.5H8.5M20.5 10.5L17 7M20.5 10.5L17 14M19.5 17.5H9M8 17.5l3.5-3.5M11.5 21L8 17.5"></path>
                </g>
              </svg>
            </b-col>
          </b-row>
        </b-col>

        <b-col cols="4" class="departure-location">
          <b-row class="departure-location-row">
            <b-col cols="1">
              <svg class="icon-location" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 11.781 16">
                <path class="svg-location" d="M5.89 0A5.9 5.9 0 0 0 0 5.891 5.746 5.746 0 0 0 .517 8.3a37.14 37.14 0 0 0 5.127 7.591.328.328 0 0 0 .5 0A37.159 37.159 0 0 0 11.266 8.3a5.743 5.743 0 0 0 .515-2.4A5.9 5.9 0 0 0 5.89 0zm0 8.95a3.06 3.06 0 1 1 3.06-3.06 3.063 3.063 0 0 1-3.06 3.06z"></path>
              </svg>
            </b-col>

            <b-col cols="11">
              <el-select v-model="dataSearchTrips.destination_location_id" filterable placeholder="Nơi đến" class="input-search-trips">
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
            </b-col>
          </b-row>
        </b-col>

        <b-col cols="2">
          <b-row>
            <el-date-picker
              v-model="dataSearchTrips.departure_date"
              type="date"
              placeholder="Nhập ngày đi"
              class="mt-1 ms-3"
              :picker-options="{ disabledDate: (datePicked) => disabledDates(datePicked) }"
            ></el-date-picker>
          </b-row>
        </b-col>

        <b-col cols="2" class="p-0">
          <b-button class="btn-search-trip" @click.prevent="searchTrips">
            Tìm vé
          </b-button>
        </b-col>
      </b-row>
    </b-form>

    <div class="title-ads">
      <p>HuyVietBus - Cam kết hoàn 150% nếu nhà xe không giữ vé</p>
    </div>
  </section>
</template>

<script>
import CommonMixin from '@/Mixins/CommonMixin'
import { THIRTY_DAYS_AFTER_TODAY } from '@/helpers/constant'

export default {
  props: {
    provinces: {
      type: Array,
      required: true
    },
    districts: {
      type: Array,
      required: true
    },
    dataSearchTrips: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      thirty_days_after_today: THIRTY_DAYS_AFTER_TODAY
    }
  },
  mixins: [
    CommonMixin
  ],
  methods: {
    switchLocation () {
      [
        this.dataSearchTrips.departure_location_id,
        this.dataSearchTrips.destination_location_id
      ] = [
        this.dataSearchTrips.destination_location_id,
        this.dataSearchTrips.departure_location_id
      ]
    },
    searchTrips () {
      this.$emit('searchTrips', this.dataSearchTrips)
    },
    getLocationById (location_id) {
      return this.provinces.find(province => province.id === location_id)?.name ?? this.districts.find(province => province.id === location_id).name.split('-').shift()
    },
    disabledDates (datePicked) {
      const now = new Date(Date.now())
      now.setDate(now.getDate() - 1)
      return datePicked.getTime() < now.getTime() || datePicked.getTime() > this.thirty_days_after_today
    }
  }
}
</script>

<style>
@import '@/assets/css/list-trips/search-trips.css';
</style>
