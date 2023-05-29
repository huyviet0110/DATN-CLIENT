<template>
  <div class="trip-information">
    <div>
      <b-row class="header">
        <div class="notification">
          <span class="right-arrow">Thông báo</span>
        </div>
        <div class="description">
          <a href="javascript:void(0)">Chính sách hỗ trợ đổi vé</a>
        </div>
      </b-row>

      <b-row class="trip-detail">
        <div class="bus-main-image">
          <img :src="tripInfo.bus.image" alt="bus-stand-sub-image">
        </div>

        <div class="trip-info">
          <div class="name">
            {{ tripInfo.bus.bus_stand.name }}
          </div>

          <div class="seat-number">
            {{ getTextByValue(seat_types, tripInfo.bus.type) }} {{ tripInfo.bus.seat_number }} Chỗ
          </div>

          <b-row>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="74" viewBox="0 0 14 74">
              <path fill="none" stroke="#787878" stroke-linecap="round" stroke-width="2" stroke-dasharray="0 7" d="M7 13.5v46"></path>
              <g fill="none" stroke="#484848" stroke-width="3">
                <circle cx="7" cy="7" r="7" stroke="none"></circle>
                <circle cx="7" cy="7" r="5.5"></circle>
              </g>
              <path d="M7 58a5.953 5.953 0 0 0-6 5.891 5.657 5.657 0 0 0 .525 2.4 37.124 37.124 0 0 0 5.222 7.591.338.338 0 0 0 .506 0 37.142 37.142 0 0 0 5.222-7.582A5.655 5.655 0 0 0 13 63.9 5.953 5.953 0 0 0 7 58zm0 8.95a3.092 3.092 0 0 1-3.117-3.06 3.117 3.117 0 0 1 6.234 0A3.092 3.092 0 0 1 7 66.95z" fill="#787878"></path>
            </svg>

            <div class="trip-time">
              <div class="pickup_dropoff_time">
                <span>{{ tripInfo.departure_time }} • </span>{{ getFirstPickupPlacesName() }}
              </div>

              <div class="total-time">{{ tripInfo.total_time }}</div>

              <div class="pickup_dropoff_time">
                <span>{{ tripInfo.destination_time }} • </span>{{ getLastDropoffPlacesName() }}
              </div>
            </div>
          </b-row>
        </div>

        <div class="view-trip-detail">
          <a href="javascript:void(0)" @click.prevent="openTripDetail">
            Thông tin chi tiết<span><b-icon icon="caret-down-fill"></b-icon></span>
          </a>
        </div>

        <div class="price-info">
          <div class="price">
            {{ tripInfo.price }}đ
          </div>

          <div class="seat-remaining">
            Còn {{ tripInfo.seat_available }} chỗ trống
          </div>

          <div class="select-trip">
            <button class="mt-5" @click.prevent="openSelectTrip">Chọn chuyến</button>
          </div>
        </div>
      </b-row>
    </div>

    <div v-show="showTripDetail">
      <el-tabs v-model="activeName">
        <el-tab-pane label="Hình ảnh" name="first">
          <el-carousel trigger="click" arrow="always">
            <el-carousel-item v-for="(item, index) in busSubImages" :key="index">
              <div class="bus-image">
                <img :src="item.imgSrc" alt="bus-image">
              </div>
            </el-carousel-item>
          </el-carousel>
        </el-tab-pane>

        <el-tab-pane label="Tiện ích" name="second">
          <div class="extension-list font-size-14">
            <ul>
              <li>
                <div class="icon">
                  <img src="/src/assets/images/homepage/1609836966722.png" alt="icon-service">
                </div>
                <div class="title">
                  <p>Xem vị trí xe trực tuyến</p>
                </div>
                <div class="description">
                  <p>Cho phép hành khách nhìn thấy được lộ trình và thời gian di chuyển của chiếc xe
                    khách mình đã đặt vé.</p>
                </div>
              </li>

              <li>
                <div class="icon">
                  <img src="/src/assets/images/homepage/1609838042285.png" alt="icon-service">
                </div>
                <div class="title">
                  <p>Dây đai an toàn</p>
                </div>
                <div class="description">
                  <p>Trên xe có trang bị dây đai an toàn cho hành khách khi ngồi trên xe</p>
                </div>
              </li>

              <li>
                <div class="icon">
                  <img src="/src/assets/images/homepage/1609837962216.png" alt="icon-service">
                </div>
                <div class="title">
                  <p>Khử trùng xe</p>
                </div>
                <div class="description">
                  <p>Nhà xe có thực hiện phun khử trùng Nano Bạc lên xe nhằm bảo vệ an toàn cho hành khách mùa Covid</p>
                </div>
              </li>

              <li>
                <div class="icon">
                  <img src="/src/assets/images/homepage/1609837921462.png" alt="icon-service">
                </div>
                <div class="title">
                  <p>Nước rửa tay</p>
                </div>
                <div class="description">
                  <p>Nhà xe có trang bị nước rửa tay diệt khuẩn trước khi lên xe và trong xe</p>
                </div>
              </li>

              <li>
                <div class="icon">
                  <img src="/src/assets/images/homepage/1609837906714.png" alt="icon-service">
                </div>
                <div class="title">
                  <p>Đo thân nhiệt</p>
                </div>
                <div class="description">
                  <p>Hành khách sẽ được đo thân nhiệt trước khi lên xe để xác định không nghi nhiễm/ lan truyền vi rút
                    Covid cho hành khách khác.</p>
                </div>
              </li>

              <li>
                <div class="icon">
                  <img src="/src/assets/images/homepage/1609837896898.png" alt="icon-service">
                </div>
                <div class="title">
                  <p>Khuyến cáo đeo khẩu trang</p>
                </div>
                <div class="description">
                  <p>Có đảm bảo khuyến cáo tất cả hành khách đeo khẩu trang khi lên xe</p>
                </div>
              </li>

              <li>
                <div class="icon">
                  <img src="/src/assets/images/homepage/1610093150480.png" alt="icon-service">
                </div>
                <div class="title">
                  <p>Nước uống</p>
                </div>
                <div class="description">
                  <p>Nhà xe có phục vụ nước cho hành khách</p>
                </div>
              </li>
            </ul>
          </div>
        </el-tab-pane>

        <el-tab-pane label="Điểm đón, trả" name="third">
          <div class="station-places">
            <div class="title">
              <p>Lưu ý</p>
            </div>

            <div class="description">
              <p>Các mốc thời gian đón, trả bên dưới là thời gian dự kiến.
                Lịch này có thể thay đổi tùy tình hình thưc tế.</p>
            </div>

            <div class="pickup-dropoff-stations">
              <div class="pickup-places">
                <div class="title">
                  <p>Điểm đón</p>
                </div>

                <div class="list-pickup">
                  <ul>
                    <li v-for="pickup in pickupPlaces" :key="pickup">
                      <span class="time">{{ getPickupTime(pickup) }} • </span>
                      <span class="name">{{ pickup }}</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div class="dropoff-places ps-0">
                <div class="title">
                  <p>Điểm trả</p>
                </div>

                <div class="list-dropoff">
                  <ul>
                    <li v-for="dropoff in dropoffPlaces" :key="dropoff">
                      <span class="time">{{ getDropoffTime(dropoff) }} • </span>
                      <span class="name">{{ dropoff }}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </el-tab-pane>

        <el-tab-pane label="Chính sách" name="fourth">
          <div class="policy">
            <div class="title">
              <p class="fs-5">Chính sách nhà xe</p>
            </div>

            <div class="requirement">
              <p>Yêu cầu khi lên xe</p>

              <ul>
                <li>Có mặt tại văn phòng/quầy vé/bến xe trước 30 phút để làm thủ tục lên xe</li>
                <li>Xuất trình SMS/Email đặt vé trước khi lên xe</li>
                <li>Không mang đồ ăn, thức ăn có mùi lên xe</li>
                <li>Không hút thuốc, uống rượu, sử dụng chất kích thích trên xe</li>
                <li>Không mang các vật dễ cháy nổ lên xe</li>
                <li>Không vứt rác trên xe</li>
                <li>Không làm ồn, gây mất trật tự trên xe</li>
                <li>Không mang giày, dép trên xe</li>
              </ul>
            </div>

            <div class="requirement">
              <p>Hành lý xách tay</p>

              <ul>
                <li>Tổng trọng lượng hành lý không vượt quá 10 kg</li>
                <li>Không vận chuyển hàng hóa cồng kềnh</li>
                <li>Không hoàn tiền trong trường hợp hủy vé do vi phạm các quy định về hành lý</li>
              </ul>
            </div>

            <div class="requirement">
              <p>Trẻ em và phụ nữ có thai</p>

              <ul>
                <li>Trẻ em dưới 4 tuổi hoặc dưới 100 cm được miễn phí vé nếu ngồi cùng ghế/giường với bố mẹ</li>
                <li>Trẻ em từ 4 tuổi hoặc cao từ 100 cm trở lên mua vé như người lớn</li>
                <li>Phụ nữ có thai cần đảm bảo sức khỏe trong suốt quá trình di chuyển</li>
                <li>Nhà xe có quyền từ chối phục vụ nếu hành khách không tuân thủ quy định về trẻ em và phụ nữ có thai
                </li>
              </ul>
            </div>

            <div class="requirement">
              <p>Động vật cảnh/Thú cưng</p>

              <ul>
                <li>Hành khách có động vật đi cùng vui lòng báo trước khi khởi hành và có mặt trước giờ khởi hành ít
                  nhất 1440 phút
                </li>
              </ul>
            </div>

            <div class="requirement">
              <p>Xuất hóa đơn GTGT</p>

              <ul>
                <li>Nhà xe từ chối xuất lại hóa đơn nếu hành khách cung cấp sai thông tin</li>
              </ul>
            </div>
          </div>
        </el-tab-pane>

        <el-tab-pane label="Đánh giá" name="fifth">
          <div class="feedback">
            <p>Hiện tại chưa có đánh giá nào</p>
          </div>
        </el-tab-pane>

        <div class="report">
          <a href="javascript:void(0)">
            Báo cáo sai, thiếu thông tin
          </a>
        </div>
      </el-tabs>
    </div>

    <div class="select-trip" v-show="showSelectTrip">
      <el-steps :active="active" finish-status="success" align-center>
        <el-step title="Chọn số ghế"></el-step>
        <el-step title="Điểm đón trả"></el-step>
        <el-step title="Nhập thông tin"></el-step>
      </el-steps>


      <ValidationObserver v-slot="{ handleSubmit }">
        <div class="step-1" v-if="active === 0">
          <div class="title">
            <p>HuyVietBus cam kết giữ đúng số lượng vé bạn đã chọn.</p>
          </div>

          <div class="select-seat-quantity">
            <div class="title">
              Số lượng ghế
            </div>

            <div class="quantity">
              <el-input-number v-model="trip_selected.quantity" :min="0" :max="tripInfo.seat_available"></el-input-number>
            </div>
          </div>
        </div>

        <div class="step-2" v-if="active === 1">
          <div class="title">
            <p>An tâm được đón đúng nơi, trả đúng chỗ đã chọn và dễ dàng thay đổi khi cần.</p>
          </div>

          <div class="pickup-dropoff-stations">
            <div class="pickup-places ps-2">
              <div class="title-station">
                <p>Điểm đón</p>
              </div>
              <div class="list-pickup">
                <b-form-group>
                  <b-form-radio-group v-model="trip_selected.pick_up_place" name="pick_up_places">
                    <b-form-radio
                      v-for="pickup in pickupPlaces"
                      :key="pickup"
                      :value="pickup"
                      class="mt-2 custom-radio-btn d-flex align-items-center">
                      <span class="time">{{ getPickupTime(pickup) }} • </span>
                      <span class="name">{{ pickup }}</span>
                    </b-form-radio>
                  </b-form-radio-group>
                </b-form-group>
              </div>
            </div>

            <div class="dropoff-places">
              <div class="title-station">
                <p>Điểm trả</p>
              </div>
              <div class="list-dropoff">
                <b-form-group>
                  <b-form-radio-group v-model="trip_selected.drop_off_place" name="drop_off_places">
                    <b-form-radio
                      v-for="dropoff in dropoffPlaces"
                      :key="dropoff"
                      :value="dropoff"
                      class="mt-2 custom-radio-btn d-flex align-items-center">
                      <span class="time">{{ getDropoffTime(dropoff) }} • </span>
                      <span class="name">{{ dropoff }}</span>
                    </b-form-radio>
                  </b-form-radio-group>
                </b-form-group>
              </div>
            </div>
          </div>
        </div>

        <div class="step-3" v-if="active === 2">
          <div class="title">
            <p>Chúng tôi chỉ dùng thông tin của bạn trong việc ghi nhận vé.</p>
          </div>

          <div class="form-receiver">
            <b-form>
              <ValidationProvider name="name" :rules="{ required: true, min: 2, max: 100, regex: /^(?:[\p{Lu}\p{Ll}][a-zà-ỹ]* ?)*[\p{Lu}\p{Ll}][\p{L} ]*$/u }" v-slot="{ errors }">
                <b-form-group label="Họ tên" label-for="name">
                  <b-form-input
                    v-model="passenger_info.name"
                    id="name"
                    type="text"
                    placeholder="Tên người đi"
                  ></b-form-input>
                  <span class="text-danger">{{ errors[0] }}</span>
                </b-form-group>
              </ValidationProvider>

              <ValidationProvider name="phone" :rules="{ min: 10, max: 20, regex: /^(\+\d{1,3}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{3,14}$/ }" v-slot="{ errors }">
                <b-form-group label="Số điện thoại" label-for="phone">
                  <b-form-input
                    v-model="passenger_info.phone"
                    id="phone"
                    type="text"
                    placeholder="Số điện thoại"
                  ></b-form-input>
                  <span class="text-danger">{{ errors[0] }}</span>
                </b-form-group>
              </ValidationProvider>

              <ValidationProvider name="email" rules="required|email|max:100" v-slot="{ errors }">
                <b-form-group label="Email để nhận thông tin vé" label-for="email">
                  <b-form-input
                    v-model="passenger_info.email"
                    id="email"
                    type="email"
                    placeholder="Email để nhận thông tin vé"
                  ></b-form-input>
                  <span class="text-danger">{{ errors[0] }}</span>
                </b-form-group>
              </ValidationProvider>

              <div class="license">
                <p>Bằng việc nhấn nút Tiếp Tục, bạn đồng ý với</p>

                <p>
                  <a href="javascript:void(0)">Chính sách bảo mật thông tin</a>
                  và
                  <a href="javascript:void(0)">Quy chế</a>
                </p>
              </div>
            </b-form>
          </div>
        </div>

        <div class="btn-step">
          <div class="btn-previous-step">
            <el-button class="previous-step" @click="previous">Quay lại</el-button>
          </div>

          <div class="btn-next-step">
            <el-button class="next-step" @click="handleSubmit(next)">Tiếp tục</el-button>
          </div>
        </div>
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
import ConvertString from '@/Mixins/ConvertString'
import { BUS_SUB_IMAGES, MAXLENGTH_DISPLAY, SEAT_TYPES } from '@/helpers/constant'
import CommonMixin from '@/Mixins/CommonMixin'
import ToastMixin from '@/Mixins/ToastMixin'
import { mapGetters } from 'vuex'

export default {
  mixins: [
    ConvertString,
    CommonMixin,
    ToastMixin
  ],
  props: {
    tripInfo: {
      type: Object,
      required: true
    },
    userData: {
      type: Object,
      required: false
    },
    orderedAt: {
      type: Date,
      required: true
    }
  },
  data () {
    return {
      showTripDetail: false,
      showSelectTrip: false,
      showStep1: false,
      activeName: 'first',
      active: 0,
      busSubImages: BUS_SUB_IMAGES,
      maxlengthDisplay: MAXLENGTH_DISPLAY,
      pickupPlaces: this.getListPickupPlaces(),
      dropoffPlaces: this.getListDropoffPlaces(),
      seat_types: SEAT_TYPES,
      passenger_info: {
        user_id: this.userData?.id,
        name: '',
        phone: '',
        email: ''
      },
      trip_selected: {
        trip_id: this.tripInfo?.id,
        departure_location: '',
        destination_location: '',
        ordered_at: this.orderedAt,
        pick_up_place: this.getListPickupPlaces()[0],
        drop_off_place: this.getListDropoffPlaces()[0],
        pick_up_time: '',
        drop_off_time: '',
        quantity: 0,
        price: 0,
        price_formatted: '',
        license_plate: ''
      }
    }
  },
  methods: {
    openTripDetail () {
      this.showTripDetail = !this.showTripDetail
      this.showSelectTrip = false
    },
    openSelectTrip () {
      this.showSelectTrip = !this.showSelectTrip
      this.showTripDetail = false
      this.passenger_info.user_id = this.passengerInfo.user_id ?? this.passenger_info.user_id
      this.passenger_info.name = this.passengerInfo.name
      this.passenger_info.phone = this.passengerInfo.phone
      this.passenger_info.email = this.passengerInfo.email
    },
    previous () {
      if (--this.active < 1) this.active = 0
    },
    next () {
      if (++this.active === 1 && this.trip_selected.quantity < 1) {
        --this.active
        this.showToast('error', 'Bạn phải chọn ít nhất 1 ghế!')
        return
      } else if (this.active === 1 && this.trip_selected.quantity > this.tripInfo.seat_available - this.quantity_ordered) {
        --this.active
        this.showToast('error', 'Bạn đã chọn quá số lượng ghế còn lại!')
        return
      }
      this.active -= 1

      if (++this.active > 2) {
        this.$tripRepository.getTripByStations(this.trip_selected).then(response => {
          this.trip_selected.departure_location = response.data.departure_location
          this.trip_selected.destination_location = response.data.destination_location
          this.trip_selected.pick_up_time = response.data.pick_up_time
          this.trip_selected.drop_off_time = response.data.drop_off_time
          this.trip_selected.price = response.data.price
          this.trip_selected.price_formatted = response.data.price_formatted
          this.trip_selected.license_plate = response.data.license_plate

          this.$store.dispatch('carts/addTicketToCarts', this.trip_selected)
          this.$store.dispatch('carts/addPassengerInfo', this.passenger_info)
          this.showSelectTrip = false
          this.active = 0
          this.quantity = 0
          this.showToast('success', 'Thêm vé vào giỏ hàng thành công!')
        }).catch(() => {
          this.showSelectTrip = false
          this.active = 0
          this.showToast('error', 'Thêm vé vào giỏ hàng thất bại!')
        })
      }
    },
    getListPickupPlaces () {
      return [...new Set(this.tripInfo.stations.map(station => station.pick_up_place))]
    },
    getListDropoffPlaces () {
      return [...new Set(this.tripInfo.stations.map(station => station.drop_off_place))]
    },
    getFirstPickupPlacesName () {
      return this.tripInfo.stations[0].pick_up_place.substr(0, this.maxlengthDisplay) + '...'
    },
    getLastDropoffPlacesName () {
      return this.tripInfo.stations[this.tripInfo.stations.length - 1].drop_off_place.substr(0, this.maxlengthDisplay) + '...'
    },
    getPickupTime (pickupPlace) {
      return this.tripInfo.stations.find(station => station.pick_up_place === pickupPlace)?.pick_up_time
    },
    getDropoffTime (dropoffPlace) {
      return this.tripInfo.stations.find(station => station.drop_off_place === dropoffPlace)?.drop_off_time
    }
  },
  computed: {
    ...mapGetters('carts', {
      passengerInfo: 'getPassengerInfo'
    })
  }
}
</script>

<style>
@import '@/assets/css/list-trips/list-trips.css';
</style>
