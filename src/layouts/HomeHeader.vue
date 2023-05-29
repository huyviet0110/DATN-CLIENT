<template>
  <header>
    <b-row>
      <b-col cols="3">
        <router-link :to="{ name: 'home' }">
          <div class="company-logo float-start d-flex align-items-center">
            <img src="/src/assets/images/logo-main.png" alt="company-main-logo">
          </div>
        </router-link>
      </b-col>

      <b-col cols="9" class="d-flex justify-content-end">
        <nav class="nav-bar float-start d-flex align-items-center justify-content-end">
          <ul class="nav">
            <li class="nav-item"><a class="nav-link" href="/#top-list-popular">Tuyến đường phổ biến</a></li>
            <li class="nav-item"><a class="nav-link" href="/#service-list-first">Vé xe lễ</a></li>
            <li class="nav-item"><a class="nav-link" href="/#ads-list-first">Ưu đãi</a></li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="javascript:void(0)" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                Dịch vụ nổi bật
              </a>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item nav-link" href="/#service-list-second">Dịch vụ thuê xe</a></li>
                <li><a class="dropdown-item nav-link" href="/#service-list-third">Dành cho Đối tác Nhà xe</a></li>
              </ul>
            </li>
            <li class="nav-item">
              <a class="btn btn-outline-secondary mx-3 btn-hotline" href="javascript:void(0)" @click="showCarts">
                <span class="fw-semibold me-1">Giỏ hàng</span>
                <b-icon icon="cart3" aria-hidden="true" class="text-primary fw-bold"></b-icon>
              </a>
            </li>
            <li class="nav-item" v-if="!userData">
              <router-link :to="{ name: 'login' }" class="btn btn-dark btn-login">
                Đăng nhập
              </router-link>
            </li>
            <li class="nav-item" v-else>
              <b-dropdown id="dropdown-right" right variant="primary" class="dropdown-right">
                <template #button-content>
                  <img :src="(userData?.avatar) ? (base_url + userData.avatar) : '/src/assets/images/ic_user_default.png'" alt="avatar" class="img-avatar">
                </template>
                <b-dropdown-item :to="{ name: 'users' }">
                  Thông tin tài khoản
                </b-dropdown-item>
                <b-dropdown-item :to="{ name: 'users.list-trips' }">
                  Vé của tôi
                </b-dropdown-item>
                <b-dropdown-item @click.prevent="logout">Đăng xuất</b-dropdown-item>
              </b-dropdown>
            </li>
          </ul>
        </nav>
      </b-col>
    </b-row>

    <b-modal size="xl" scrollable title="Danh sách các vé trong giỏ hàng" v-model="show_carts" hide-footer>
      <b-overlay :show="showCartModal" no-wrap></b-overlay>
      <b-row class="font-size-14 main-color">
        <b-row v-for="ticket in carts" :key="ticket.trip_id">
          <b-row>
            <b-col class="p-0">
              <p class="mb-2 ps-0 fw-bold">Ngày đi: {{ formatDate(ticket.ordered_at) }}</p>
            </b-col>
            <b-col class="d-flex justify-content-end p-0">
              <b-button
                size="sm"
                variant="danger"
                class="pt-0 pb-0 btn-cancel-ticket btn-cancel"
                @click="showVerifyModal(ticket.trip_id)"
              >X
              </b-button>
            </b-col>
          </b-row>
          <b-row class="list-trips mb-3">
            <b-col cols="3" class="ps-3">
              <p class="fw-bold fs-3 mb-0">{{ ticket.pick_up_time }}</p>
              <p class="mb-0">{{ ticket.departure_location }} - {{ ticket.destination_location }}</p>
              <p class="mb-0">Biển số xe: <span class="fw-bold">{{ ticket.license_plate }}</span></p>
            </b-col>
            <b-col cols="2" class="mt-2">
              <p class="fw-bold fs-6 mb-0">Điểm đón</p>
              <p class="mb-0"><span class="fw-bold">{{ ticket.pick_up_time }}</span> - {{ ticket.pick_up_place }}</p>
            </b-col>
            <b-col cols="2" class="mt-2">
              <p class="fw-bold fs-6 mb-0">Điểm trả</p>
              <p class="mb-0"><span class="fw-bold">{{ ticket.drop_off_time }}</span> - {{ ticket.drop_off_place }}</p>
            </b-col>
            <b-col cols="1" class="mt-2">
              <p class="fw-bold fs-6 mb-0 text-end">Giá tiền</p>
              <p class="mb-0 text-end">{{ ticket.price_formatted }}đ</p>
            </b-col>
            <b-col cols="3" class="mt-2">
              <p class="fw-bold fs-6 mb-0 text-center">Số lượng</p>
              <p class="text-end d-flex justify-content-center">
                <el-input-number v-model="ticket.quantity" :min="1"></el-input-number>
              </p>
            </b-col>
            <b-col cols="1" class="mt-2 ps-0">
              <p class="fw-bold fs-6 mb-0 text-end">Tổng tiền</p>
              <p class="mb-0 text-end fs-6 fw-bold text-primary">{{ formatMoney(ticket.price * ticket.quantity) }}đ</p>
            </b-col>
          </b-row>
        </b-row>
        <b-row class="d-flex justify-content-end">
          <b-button class="bg-primary border-0 btn-small" @click="orderTrip">
            Đặt vé
          </b-button>
        </b-row>
      </b-row>
    </b-modal>

    <b-modal size="xs" scrollable title="Bạn muốn hủy vé này?" v-model="show_verify_modal">
      <p>Bạn sẽ không thể hoàn nguyên hành động này!</p>

      <template #modal-footer="{ ok }">
        <b-button size="sm" variant="primary" @click.prevent="removeTicket">
          Đồng ý
        </b-button>
        <b-button size="sm" variant="danger" @click="ok()">
          Đóng
        </b-button>
      </template>
    </b-modal>
  </header>
</template>

<script>
import { CURRENT_PAGE } from '@/helpers/constant'
import { mapGetters } from 'vuex'
import CommonMixin from '@/Mixins/CommonMixin'
import ToastMixin from '@/Mixins/ToastMixin'

export default {
  props: {
    userData: {
      type: Object,
      required: false
    }
  },
  data () {
    return {
      current_page: CURRENT_PAGE,
      base_url: import.meta.env.VITE_BASE_IMAGE_URL,
      show_carts: false,
      show_verify_modal: false,
      ticket_selected_id: null,
      ticketInfo: {
        carts: [],
        user_id: this.userData?.id ?? null,
        name: '',
        phone: '',
        email: ''
      },
      showCartModal: false
    }
  },
  mixins: [
    CommonMixin,
    ToastMixin
  ],
  methods: {
    logout () {
      this.$userRepository.logout().then(() => {
        this.$router.go(this.current_page)
      }).catch(error => {
        this.showToast('error', error.response.data.errors.error_message)
      })
    },
    showCarts () {
      if (this.carts.length > 0) {
        this.show_carts = true
      } else {
        this.showToast('info', 'Giỏ hàng hiện tại không có vé nào!')
      }
    },
    showVerifyModal (ticketId) {
      this.ticket_selected_id = ticketId
      this.show_verify_modal = true
    },
    removeTicket () {
      this.$store.dispatch('carts/removeTicketInCarts', this.ticket_selected_id)
      this.show_verify_modal = false
      if (this.carts.length === 0) {
        this.show_carts = false
      }
      this.showToast('success', 'Hủy vé thành công!')
    },
    orderTrip () {
      this.ticketInfo.carts = this.carts
      this.ticketInfo.user_id = this.passengerInfo.user_id
      this.ticketInfo.name = this.passengerInfo.name
      this.ticketInfo.phone = this.passengerInfo.phone
      this.ticketInfo.email = this.passengerInfo.email
        this.showCartModal = true

      this.$orderRepository.orderTrip(this.ticketInfo).then(response => {
        this.$store.dispatch('carts/removeAllTickets')
        this.show_carts = false
        this.showToast('success', response.data)
        this.$emit('orderTrip')
        this.showCartModal = false
      }).catch(error => {
        this.showToast('error', error.response.data.errors.error_message)
      })
    }
  },
  computed: {
    ...mapGetters('carts', {
      carts: 'getCarts',
      passengerInfo: 'getPassengerInfo'
    })
  }
}
</script>

<style>
@import '@/assets/css/layouts/header.css';
</style>
