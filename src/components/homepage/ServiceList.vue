<template>
  <section class="section-service-list">
    <div class="title">
      <h1>{{ mainTitle }}</h1>
    </div>

    <el-carousel indicator-position="none" :interval="2000">
      <el-carousel-item v-for="(item, index) in 4" :key="item">
        <div class="service-list">
          <div class="service-item" v-for="(item, subIndex) in (index === 0 || index === 2) ? serviceList : getReverseList" :key="subIndex">
            <a href="javascript:void(0)" class="card-service">
              <b-card
                :title="item.title"
                :img-src="item.imgSrc"
                :img-alt="changeToSlug(item.title)"
                img-top
              ></b-card>
            </a>
          </div>
        </div>
      </el-carousel-item>
    </el-carousel>
  </section>
</template>

<script>
import ConvertString from '@/Mixins/ConvertString'
import CommonMixin from '@/Mixins/CommonMixin'

export default {
  mixins: [
    ConvertString,
    CommonMixin
  ],
  props: {
    mainTitle: String,
    serviceList: {
      type: Array,
      required: true
    }
  },
  computed: {
    getReverseList () {
      return this.serviceList.slice().reverse()
    }
  }
}
</script>

<style>
@import "@/assets/css/homepage/service-list.css";
</style>
