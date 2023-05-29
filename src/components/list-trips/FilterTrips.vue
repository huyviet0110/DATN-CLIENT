<template>
  <div>
    <b-row class="side-bar-above">
      <b-col class="title-left">
        Lọc
      </b-col>

      <b-col class="title-right">
        <a href="javascript:void(0)" @click.prevent="removeFilters">Xóa lọc</a>
      </b-col>
    </b-row>

    <b-row class="side-bar-below">
      <b-row class="search-trips">
        <div class="header mt-0">
          Nhà xe
        </div>
        <b-form-input
          v-model="bus_stand_search"
          class="form-group"
          id="filter_bus_stand"
          type="search"
          placeholder="Tìm trong danh sách"
        ></b-form-input>
      </b-row>

      <b-row class="checkbox-list">
        <ul>
          <li>
            <b-form-group>
              <b-form-checkbox-group v-model="data_filter_trips.bus_stands">
                <b-form-checkbox
                  v-for="busStand in filteredBusStands"
                  :key="busStand.id"
                  :value="busStand.id"
                  @change="filterTrips">
                  {{ busStand.name }} ({{ busStand.trips_number }})
                </b-form-checkbox>
              </b-form-checkbox-group>
            </b-form-group>
          </li>
        </ul>
      </b-row>

      <b-row class="search-trips">
        <div class="header">
          Điểm đón
        </div>
        <b-form-input
          v-model="pick_up_search"
          class="form-group"
          id="filter_pick_up"
          type="search"
          placeholder="Tìm trong danh sách"
        ></b-form-input>
      </b-row>

      <b-row class="checkbox-list">
        <ul>
          <li>
            <b-form-group>
              <b-form-checkbox-group v-model="data_filter_trips.pick_up_places">
                <b-form-checkbox
                  v-for="pickup in filteredPickUps"
                  :key="pickup.name"
                  :value="pickup.name"
                  @change="filterTrips">
                  {{ pickup.name }} ({{ pickup.trips_number }})
                </b-form-checkbox>
              </b-form-checkbox-group>
            </b-form-group>
          </li>
        </ul>
      </b-row>

      <b-row class="search-trips">
        <div class="header">
          Điểm trả
        </div>
        <b-form-input
          v-model="drop_off_search"
          class="form-group"
          id="filter_drop_off"
          type="search"
          placeholder="Tìm trong danh sách"
        ></b-form-input>
      </b-row>

      <b-row class="checkbox-list">
        <ul>
          <li>
            <b-form-group>
              <b-form-checkbox-group v-model="data_filter_trips.drop_off_places">
                <b-form-checkbox
                  v-for="dropoff in filteredDropOffs"
                  :key="dropoff.name"
                  :value="dropoff.name"
                  @change="filterTrips">
                  <span>{{ dropoff.name }} ({{ dropoff.trips_number }})</span>
                </b-form-checkbox>
              </b-form-checkbox-group>
            </b-form-group>
          </li>
        </ul>
      </b-row>

      <b-row class="search-trips">
        <div class="header">
          Loại ghế / giường
        </div>
      </b-row>

      <b-row class="checkbox-seat-type mt-0">
        <ul>
          <li>
            <b-form-group>
              <b-form-checkbox-group v-model="data_filter_trips.seat_types">
                <b-form-checkbox
                  v-for="seat in seatTypes"
                  :key="seat.type"
                  :value="seat.type"
                  class="mt-2"
                  @change="filterTrips">
                  <span>{{ getTextByValue(seat_types, seat.type) }} ({{ seat.trips_number }})</span>
                </b-form-checkbox>
              </b-form-checkbox-group>
            </b-form-group>
          </li>
        </ul>
      </b-row>
    </b-row>
  </div>
</template>

<script>
import { SEAT_TYPES } from '@/helpers/constant'
import CommonMixin from '@/Mixins/CommonMixin'

export default {
  props: {
    busStands: {
      type: Array,
      required: true
    },
    pickupPlaces: {
      type: Array,
      required: false
    },
    dropoffPlaces: {
      type: Array,
      required: false
    },
    seatTypes: {
      type: Array,
      required: false
    }
  },
  data () {
    return {
      bus_stand_search: '',
      pick_up_search: '',
      drop_off_search: '',
      seat_types: SEAT_TYPES,
      data_filter_trips: {
        bus_stands: [],
        pick_up_places: [],
        drop_off_places: [],
        seat_types: []
      }
    }
  },
  mixins: [
    CommonMixin
  ],
  computed: {
    filteredBusStands () {
      return this.busStands.filter(item => {
        return item.name.toLowerCase().includes(this.bus_stand_search.toLowerCase())
      }).filter(item => item.trips_number > 0)
    },
    filteredPickUps () {
      return this.pickupPlaces.filter(item => {
        return item.name.toLowerCase().includes(this.pick_up_search.toLowerCase())
      }).filter(item => item.trips_number > 0)
    },
    filteredDropOffs () {
      return this.dropoffPlaces.filter(item => {
        return item.name.toLowerCase().includes(this.drop_off_search.toLowerCase())
      }).filter(item => item.trips_number > 0)
    }
  },
  methods: {
    filterTrips () {
      this.$emit('filterTrips', this.data_filter_trips)
    },
    removeFilters () {
      for (const filter_type in this.data_filter_trips) {
        this.data_filter_trips[filter_type] = []
      }
      this.$emit('removeFilters', this.data_filter_trips)
    }
  }
}
</script>

<style>
@import '@/assets/css/list-trips/filter-trips.css';
</style>
