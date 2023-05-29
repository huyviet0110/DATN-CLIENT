<template>
  <section class="section-list-service">
    <div class="main-title">
      <h1 class="number-available-trip">
        {{ mainTitle }}
        <span class="number-trips">{{ numberTrips }} chuyến</span>
      </h1>
    </div>

    <el-carousel indicator-position="none" :interval="2000">
      <el-carousel-item v-for="(item, index) in 4" :key="item">
        <div class="service-list">
          <div class="service-item" v-for="(item, subIndex) in (index === 0 || index === 2) ? listImages : getReverseList" :key="subIndex">
            <a href="javascript:void(0)" class="card-service">
              <b-card
                :img-src="item"
                img-top
              ></b-card>
            </a>
          </div>
        </div>
      </el-carousel-item>
    </el-carousel>

    <div class="order-list-trips">
      <div class="main-title">Sắp xếp theo:</div>
      <div class="order-title"><a href="#" @click="sortTrips('departure_time', 'asc')">Giờ đi sớm nhất</a></div>
      <div class="order-title"><a href="#" @click="sortTrips('departure_time', 'desc')">Giờ đi muộn nhất</a></div>
      <div class="order-title"><a href="#" @click="sortTrips('price', 'asc')">Giá tăng dần</a></div>
      <div class="order-title"><a href="#" @click="sortTrips('price', 'desc')">Giá giảm dần</a></div>
    </div>
  </section>
</template>

<script>
import ConvertString from '@/Mixins/ConvertString'

export default {
  mixins: [
    ConvertString
  ],
  props: {
    mainTitle: String,
    numberTrips: Number,
    listImages: {
      type: Array,
      require: true
    }
  },
  methods: {
    sortTrips (sort_field, sort_type) {
      this.$emit('sortTrips', { sort_field, sort_type })
    }
  },
  computed: {
    getReverseList () {
      return this.listImages.slice().reverse()
    }
  }
}
</script>

<style>
@import '@/assets/css/list-trips/service-list.css';
</style>
