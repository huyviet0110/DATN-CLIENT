<template>
  <section class="section-news-list">
    <div class="title">
      <h1>{{ mainTitle }}</h1>
    </div>

    <el-carousel indicator-position="none" :interval="2000">
      <el-carousel-item v-for="(item, index) in 4" :key="item">
        <div class="news-list">
          <div class="news-item" v-for="(item, subIndex) in (index === 0 || index === 2) ? newsList : getReverseList" :key="subIndex">
            <a href="javascript:void(0)" class="card-news">
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
    mainTitle: {
      type: String,
      required: true
    },
    newsList: {
      type: Array,
      require: true
    }
  },
  computed: {
    getReverseList () {
      return this.newsList.slice().reverse()
    }
  }
}
</script>

<style>
@import "@/assets/css/homepage/news-list.css";
</style>
