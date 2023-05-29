<template>
  <section class="section-achievement-list">
    <div class="main-title">
      <h1>Nền tảng kết nối người dùng và nhà xe</h1>
    </div>

    <b-row class="achievement-list">
      <b-col class="list-advertisement">
        <b-row>
          <b-col cols="3">
            <div class="icon">
              <img src="/src/assets/images/homepage/bus-car-icon.svg" alt="nha-xe-chat-luong-cao">
            </div>
          </b-col>

          <b-col cols="9">
            <b-row class="title">
              2000+ nhà xe chất lượng cao
            </b-row>
            <b-row class="description">
              5000+ tuyến đường trên toàn quốc, chủ động và đa dạng lựa chọn.
            </b-row>
          </b-col>
        </b-row>
      </b-col>

      <b-col class="list-advertisement">
        <b-row>
          <b-col cols="3">
            <div class="icon">
              <img src="/src/assets/images/homepage/yellow-ticket-icon.svg" alt="dat-ve-de-dang">
            </div>
          </b-col>

          <b-col cols="9">
            <b-row class="title">
              Đặt vé dễ dàng
            </b-row>
            <b-row class="description">
              Đặt vé chỉ với 60s. Chọn xe yêu thích cực nhanh và thuận tiện, giá cả hợp lý.
            </b-row>
          </b-col>
        </b-row>
      </b-col>

      <b-col class="list-advertisement">
        <b-row>
          <b-col cols="3">
            <div class="icon">
              <img src="/src/assets/images/homepage/completement-icon.svg" alt="nha-xe-chat-luong-cao">
            </div>
          </b-col>

          <b-col cols="9">
            <b-row class="title">
              Đảm bảo có vé
            </b-row>
            <b-row class="description">
              Hoàn ngay 150% nếu không có vé, mang đến hành trình đầy đủ, trọn vẹn.
            </b-row>
          </b-col>
        </b-row>
      </b-col>

      <b-col class="un-margin list-advertisement">
        <b-row>
          <b-col cols="3">
            <div class="icon">
              <img src="/src/assets/images/homepage/coupon-icon.svg" alt="nha-xe-chat-luong-cao">
            </div>
          </b-col>

          <b-col cols="9">
            <div class="title">
              Nhiều ưu đãi
            </div>
            <div class="description">
              Hàng ngàn ưu đãi cực chất, uy tín, mang đậm tính độc quyền tại HuyVietBus.
            </div>
          </b-col>
        </b-row>
      </b-col>
    </b-row>

    <div class="main-title">
      <h1>HuyVietBus đã được nhắc đến trên</h1>
    </div>

    <div class="mentioned">
      <b-row>
        <b-col class="ps-0">
          <img src="/src/assets/images/homepage/logo-vne.png" alt="vn-express">
        </b-col>

        <b-col class="list-advertisement" v-for="(item, index) in logoMentioned" :key="index">
          <img :src="item.imgSrc" :alt="item.alt">
        </b-col>
      </b-row>
    </div>
  </section>
</template>

<script>
import { LOGO_MENTIONED } from '@/helpers/constant'

export default {
  data () {
    return {
      logoMentioned: LOGO_MENTIONED
    }
  }
}
</script>

<style>
@import "@/assets/css/homepage/achievement-list.css";
</style>
