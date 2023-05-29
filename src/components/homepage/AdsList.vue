<template>
  <section class="section-ads-list">
    <div class="title">
      <h1>{{ mainTitle }}</h1>
    </div>

    <b-row>
      <b-col class="list-advertisement" v-for="(item, index) in adsList" :key="index">
        <a href="javascript:void(0)" class="card-service">
          <b-card
            :title="item.title"
            :img-src="item.imgSrc"
            :img-alt="changeToSlug(item.title)"
            img-top
          ></b-card>
        </a>
      </b-col>
    </b-row>
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
    adsList: {
      type: Array,
      required: true
    }
  },
  computed: {
    getReverseList () {
      return this.adsList.slice().reverse()
    }
  }
}
</script>

<style>
@import "@/assets/css/homepage/ads-list.css";
</style>
