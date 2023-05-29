<template>
  <div class="list-trips-page">
    <HomeHeader :userData="userData" @orderTrip="reloadSearchTrips" />
    <div class="content">
      <SearchTrips :provinces="provinces" :districts="districts" :dataSearchTrips="data_search_trips" @searchTrips="searchTrips" />
      <div>
        <b-overlay :show="!show_trips" no-wrap></b-overlay>
        <b-row v-if="is_exist_trips">
          <b-col class="side-bar-filter-trips" cols="3">
            <FilterTrips :busStands="bus_stands" :pickupPlaces="pickup_places" :dropoffPlaces="dropoff_places" :seatTypes="seat_types" @filterTrips="filterTrips" @removeFilters="removeFilters" />
          </b-col>

          <b-col class="list-trips" cols="9">
            <b-row>
              <ServiceList :mainTitle="service_list.main_title" :numberTrips="list_trips.length" :listImages="service_list.list_images" @sortTrips="sortTrips" />
            </b-row>

            <b-row v-for="trip in tripsToShow" :key="trip.id">
              <ListTrips :tripInfo="trip" :userData="userData" :orderedAt="data_search_trips.departure_date" />
            </b-row>

            <b-row>
              <b-button variant="primary" class="button-center mt-4" @click="showMoreTrips" v-show="trips_to_show < list_trips.length">
                Xem thêm chuyến
              </b-button>
            </b-row>
          </b-col>
        </b-row>

        <b-row v-else>
          <p class="text-center fw-bold">
            Xin lỗi bạn vì sự bất tiện này. HBus sẽ cập nhật ngay khi có thông tin xe hoạt động trên tuyến đường bạn
            chọn
          </p>
          <p class="text-center">Xin bạn vui lòng thay đổi tuyến đường hoặc ngày khởi hành tìm kiếm</p>
        </b-row>
      </div>
    </div>
    <HomeFooter />
    <el-backtop :right="100" :bottom="100" />
  </div>
</template>

<script>
import HomeFooter from '@/layouts/HomeFooter.vue'
import HomeHeader from '@/layouts/HomeHeader.vue'
import SearchTrips from '@/components/list-trips/SearchTrips.vue'
import FilterTrips from '@/components/list-trips/FilterTrips.vue'
import ListTrips from '@/components/list-trips/ListTrips.vue'
import ServiceList from '@/components/list-trips/ServiceList.vue'
import {
  DEFAULT_PARAMS_SEARCH_TRIPS,
  HIGHEST_LEVEL, LIST_IMAGES_SERVICE, TRIPS_TO_SHOW
} from '@/helpers/constant'
import ToastMixin from '@/Mixins/ToastMixin'
import CommonMixin from '@/Mixins/CommonMixin'

export default {
  mixins: [
    ToastMixin,
    CommonMixin
  ],
  created () {
    this.getUserInfo()
    this.getAllLocations()
    this.getParamsValue()
    this.getAllTrips(this.data_search_trips)
    this.getListFilters()
  },
  mounted () {
    this.scrollToTopScreen()
  },
  data () {
    return {
      service_list: {
        main_title: 'Tuyến đường bạn chọn hiện tại đang có:',
        list_images: LIST_IMAGES_SERVICE
      },
      list_trips: [],
      provinces: [],
      districts: [],
      data_search_trips: null,
      is_exist_trips: false,
      bus_stands: [],
      pickup_places: [],
      dropoff_places: [],
      seat_types: [],
      data_filter_trips: null,
      data_sort_trips: null,
      show_trips: true,
      trips_to_show: TRIPS_TO_SHOW,
      userData: null,
      isAuthenticated: false,
      isShowLoginBtn: false
    }
  },
  methods: {
    searchTrips (dataSearch) {
      this.data_search_trips = dataSearch
      this.getAllTrips(this.data_search_trips)
      this.getListFilters()
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
        }).catch(() => {
          this.showToast('error', 'Hệ thống đang có lỗi, website sẽ hoạt động lại trong thời gian sớm nhất')
        })
      }
    },
    getParamsValue () {
      this.data_search_trips = (
        this.$route.params.departure_location_id
        && this.$route.params.destination_location_id
        && this.$route.params.departure_date
      ) ? (this.$route.params) : DEFAULT_PARAMS_SEARCH_TRIPS
    },
    getAllTrips (dataSearch) {
      this.show_trips = false
      this.$tripRepository.getAll(dataSearch).then(response => {
        this.list_trips = response.data.trips
        this.is_exist_trips = true
        this.show_trips = true
      }).catch(() => {
        this.is_exist_trips = false
        this.show_trips = true
      })
    },
    filterTrips (dataFilter) {
      this.data_filter_trips = dataFilter
      this.getAllTrips({ ...this.data_search_trips, ...dataFilter })
      this.getListFilters()
    },
    getListFilters () {
      this.$tripRepository.getListFilter(this.data_search_trips).then(response => {
        this.show_trips = true
        this.bus_stands = response.data.bus_stands
        this.pickup_places = response.data.pickup_places
        this.dropoff_places = response.data.dropoff_places
        this.seat_types = response.data.seat_types
      }).catch(() => {
        this.is_exist_trips = false
        this.show_trips = true
      })
    },
    removeFilters (dataFilter) {
      this.filterTrips(dataFilter)
    },
    sortTrips (dataSort) {
      this.getAllTrips({ ...this.data_search_trips, ...this.data_filter_trips, ...dataSort })
      this.data_sort_trips = dataSort
    },
    showMoreTrips () {
      this.trips_to_show += this.trips_to_show
    },
    getUserInfo () {
      this.userData = JSON.parse(localStorage.getItem('userData'))
    },
    reloadSearchTrips () {
      this.getAllTrips({ ...this.data_search_trips, ...this.data_filter_trips ?? null, ...this.data_sort_trips ?? null })
      this.getListFilters()
    }
  },
  computed: {
    tripsToShow () {
      return this.list_trips.slice(0, this.trips_to_show).filter(trip => trip.seat_available > 0)
    }
  },
  components: {
    ServiceList,
    FilterTrips,
    HomeHeader,
    HomeFooter,
    ListTrips,
    SearchTrips
  }
}
</script>

<style>
@import '@/assets/css/list-trips/main.css';
</style>
