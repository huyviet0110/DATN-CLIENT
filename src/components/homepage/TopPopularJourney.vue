<template>
  <section id="top-list-popular" class="top-list-popular" v-show="is_exist_top_journey">
    <div class="title">
      <h1>Tuyến đường phổ biến</h1>
    </div>

    <div id="carouselExampleControls" class="carousel slide">
      <div class="carousel-inner">
        <div class="carousel-item active">
          <b-row class="ps-0">
            <b-col class="pe-0 me-2 slide-top-list" v-for="(journey, index) in first_top_four_journey" :key="journey.id">
              <router-link
                :to="{ name: 'list-trips', params: {
                  departure_location_id: journey.departure_location.id,
                  destination_location_id: journey.destination_location.id,
                  departure_date: tomorrow }}"
                class="card-top-list">
                <b-card
                  :class="'top-' + (index + 1)"
                  :title="journey.departure_location.name + ' - ' + journey.destination_location.name"
                  :img-src="first_top_four_journey_images[index]"
                  img-alt="Journey-image"
                  img-top>
                  <b-card-text>
                    Từ {{ journey.price }}đ
                  </b-card-text>
                </b-card>
              </router-link>
            </b-col>
          </b-row>
        </div>

        <div class="carousel-item">
          <b-row class="ps-2">
            <b-col class="pe-0 me-2 slide-top-list" v-for="(journey, index) in next_top_four_journey" :key="journey.id">
              <router-link
                :to="{ name: 'list-trips', params: {
                  departure_location_id: journey.departure_location.id,
                  destination_location_id: journey.destination_location.id,
                  departure_date: tomorrow }}"
                class="card-top-list">
                <b-card
                  :class="'top-' + (index + 5)"
                  :title="journey.departure_location.name + ' - ' + journey.destination_location.name"
                  :img-src="next_top_four_journey_images[index]"
                  img-alt="Journey-image"
                  img-top>
                  <b-card-text>
                    Từ {{ journey.price }}đ
                  </b-card-text>
                </b-card>
              </router-link>
            </b-col>
          </b-row>
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
        <span class="icon-control-left d-flex justify-content-center align-items-center">
          <b-icon icon="chevron-left"></b-icon>
        </span>
        <span class="visually-hidden btn-previous">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
        <span class="icon-control-right d-flex justify-content-center align-items-center">
          <b-icon icon="chevron-right"></b-icon>
        </span>
        <span class="visually-hidden btn-next">Next</span>
      </button>
    </div>
  </section>
</template>

<script>
import { TOMORROW, FIRST_TOP_FOUR_JOURNEY_IMAGES, NEXT_TOP_FOUR_JOURNEY_IMAGES } from '@/helpers/constant'

export default {
  created () {
    this.getListTripsByTopJourneys()
  },
  data () {
    return {
      first_top_four_journey: [],
      next_top_four_journey: [],
      first_top_four_journey_images: FIRST_TOP_FOUR_JOURNEY_IMAGES,
      next_top_four_journey_images: NEXT_TOP_FOUR_JOURNEY_IMAGES,
      tomorrow: TOMORROW,
      is_exist_top_journey: false
    }
  },
  methods: {
    getListTripsByTopJourneys () {
      this.$journeyRepository.getTopList().then(response => {
        this.first_top_four_journey = response.data.slice(0, 4)
        this.next_top_four_journey = response.data.slice(4, 8)
        this.is_exist_top_journey = true
      }).catch(() => {
        this.is_exist_top_journey = false
      })
    }
  }
}
</script>

<style>
@import "@/assets/css/homepage/top-popular-journey.css";
</style>
