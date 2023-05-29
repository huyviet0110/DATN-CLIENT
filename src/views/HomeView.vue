<template>
  <div class="homepage">
    <HomeHeader :userData="userData" />
    <SearchTrip />
    <div class="container-main">
      <TopPopularJourney />
      <ServiceList id="service-list-first" :mainTitle="serviceList.serviceListFirst.mainTitle" :serviceList="serviceList.serviceListFirst.items" />
      <AdsList id="ads-list-first" :mainTitle="adsList.adsListFirst.mainTitle" :adsList="adsList.adsListFirst.items" />
      <ServiceList id="service-list-second" :mainTitle="serviceList.serviceListSecond.mainTitle" :serviceList="serviceList.serviceListSecond.items" />
      <ServiceList id="service-list-third" :mainTitle="serviceList.serviceListThird.mainTitle" :serviceList="serviceList.serviceListThird.items" />
      <NewsList :mainTitle="newsList.mainTitle" :newsList="newsList.items" />
<!--      <CustomerFeedback />-->
<!--      <AchievementList />-->
      <HomeFooter />
    </div>
    <el-backtop :right="100" :bottom="100" />
  </div>
</template>

<script>
import HomeFooter from '@/layouts/HomeFooter.vue'
import SearchTrip from '@/components/homepage/SearchTrip.vue'
import TopPopularJourney from '@/components/homepage/TopPopularJourney.vue'
import ServiceList from '@/components/homepage/ServiceList.vue'
import AdsList from '@/components/homepage/AdsList.vue'
// import CustomerFeedback from '@/components/homepage/CustomerFeedback.vue'
// import AchievementList from '@/components/homepage/AchievementList.vue'
import HomeHeader from '@/layouts/HomeHeader.vue'
import NewsList from '@/components/homepage/NewsList.vue'
import {
  ADS_LIST_FIRST_ITEMS, ADS_LIST_SECOND_ITEMS, ADS_LIST_THIRD_ITEMS,
  NEWS_LIST_ITEMS,
  SERVICE_LIST_FIRST_ITEMS,
  SERVICE_LIST_SECOND_ITEMS,
  SERVICE_LIST_THIRD_ITEMS
} from '@/helpers/constant'

export default {
  data () {
    return {
      serviceList: {
        serviceListFirst: {
          mainTitle: 'Vé xe Lễ 30/4 - 1/5/2023',
          items: SERVICE_LIST_FIRST_ITEMS
        },
        serviceListSecond: {
          mainTitle: 'Dịch vụ thuê xe',
          items: SERVICE_LIST_SECOND_ITEMS
        },
        serviceListThird: {
          mainTitle: 'Dành cho Đối tác Nhà xe',
          items: SERVICE_LIST_THIRD_ITEMS
        }
      },
      newsList: {
        mainTitle: 'Tin tức',
        items: NEWS_LIST_ITEMS
      },
      adsList: {
        adsListFirst: {
          mainTitle: 'Ưu đãi nổi bật',
          items: ADS_LIST_FIRST_ITEMS
        },
        adsListSecond: {
          mainTitle: 'Ưu đãi từ đối tác của HuyVietBus',
          items: ADS_LIST_SECOND_ITEMS
        },
        adsListThird: {
          mainTitle: 'HuyVietBus có gì mới?',
          items: ADS_LIST_THIRD_ITEMS
        }
      },
      userData: null
    }
  },
  created () {
    this.getUserInfo()
  },
  methods: {
    getUserInfo () {
      this.userData = JSON.parse(localStorage.getItem('userData'))
    }
  },
  components: {
    NewsList,
    HomeHeader,
    // AchievementList,
    // CustomerFeedback,
    AdsList,
    ServiceList,
    TopPopularJourney,
    SearchTrip,
    HomeFooter
  }
}
</script>

<style>
@import '@/assets/css/homepage/main.css';
</style>
