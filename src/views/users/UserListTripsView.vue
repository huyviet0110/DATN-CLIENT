<template>
  <b-col cols="9" class="users-list-tris p-0 ps-4 font-size-14">
    <el-tabs v-model="active_name" stretch>
      <el-tab-pane label="Mới" name="new">
        <b-row v-if="list_orders.list_orders_new.length > 0">
          <OrderInfo
            v-for="order in ordersToShow(list_orders.list_orders_new)"
            :key="order.id"
            :order="order"
            :listStatus="order_status_types.NEW"
            @showFirstModal="showFirstModal"
          />

          <b-row class="mb-5">
            <b-button
              variant="primary"
              class="button-center mt-4"
              @click="showMoreOrders"
              v-show="orders_to_show < list_orders.list_orders_new.length">
              Xem thêm hóa đơn
            </b-button>
          </b-row>
        </b-row>

        <b-row v-else>
          <p>
            <span>Bạn chưa có chuyến đi nào,</span>
            <span>
            <router-link :to="{ name: 'home' }">
              đặt vé ngay
            </router-link>
          </span>
          </p>
        </b-row>
      </el-tab-pane>

      <el-tab-pane label="Đã trả tiền" name="already-paid">
        <b-row v-if="list_orders.list_orders_already_paid.length > 0">
          <OrderInfo
            v-for="order in ordersToShow(list_orders.list_orders_already_paid)"
            :key="order.id"
            :order="order"
            :listStatus="order_status_types.ALREADY_PAID"
            @showFirstModal="showFirstModal"
          />

          <b-row class="mb-5">
            <b-button
              variant="primary"
              class="button-center mt-4"
              @click="showMoreOrders"
              v-show="orders_to_show < list_orders.list_orders_already_paid.length">
              Xem thêm hóa đơn
            </b-button>
          </b-row>
        </b-row>

        <b-row v-else>
          <p>Chưa có chuyến đi nào</p>
        </b-row>
      </el-tab-pane>

      <el-tab-pane label="Đã hủy" name="canceled">
        <b-row v-if="list_orders.list_orders_cancelled.length > 0">
          <OrderInfo
            v-for="order in ordersToShow(list_orders.list_orders_cancelled)"
            :key="order.id"
            :order="order"
            :listStatus="order_status_types.CANCELED"
            @showFirstModal="showFirstModal"
          />

          <b-row class="mb-5">
            <b-button
              variant="primary"
              class="button-center mt-4"
              @click="showMoreOrders"
              v-show="orders_to_show < list_orders.list_orders_cancelled.length">
              Xem thêm hóa đơn
            </b-button>
          </b-row>
        </b-row>

        <b-row v-else>
          <p>Bạn chưa hủy chuyến đi nào</p>
        </b-row>
      </el-tab-pane>

      <el-tab-pane label="Thanh toán thất bại" name="payment-failed">
        <b-row v-if="list_orders.list_orders_failed.length > 0">
          <OrderInfo
            v-for="order in ordersToShow(list_orders.list_orders_failed)"
            :key="order.id"
            :order="order"
            :listStatus="order_status_types.PAYMENT_FAILED"
            @showFirstModal="showFirstModal"
          />

          <b-row class="mb-5">
            <b-button
              variant="primary"
              class="button-center mt-4"
              @click="showMoreOrders"
              v-show="orders_to_show < list_orders.list_orders_failed.length">
              Xem thêm hóa đơn
            </b-button>
          </b-row>
        </b-row>

        <b-row v-else>
          <p>Chưa có chuyến đi nào thanh toán thất bại</p>
        </b-row>
      </el-tab-pane>
    </el-tabs>

    <b-modal size="lg" scrollable title="Danh sách các vé đã đặt" v-model="show_first_modal" hide-footer>
      <b-row class="font-size-14 main-color">
        <b-row v-for="order_trip in order_detail?.order_trips" :key="order_trip.id">
          <b-row>
            <b-col class="p-0">
              <p class="mb-2 ps-0 fw-bold">Ngày khởi hành: {{ order_trip.ordered_at }}</p>
            </b-col>
            <b-col class="d-flex justify-content-end p-0">
              <b-button
                size="sm"
                variant="danger"
                class="pt-0 pb-0 btn-cancel-ticket btn-cancel"
                v-if="order_trip.status === order_status_types.NEW && order_detail.status === order_status_types.NEW"
                @click.prevent="showVerifyModal(order_trip.id)"
              >X
              </b-button>
            </b-col>
          </b-row>
          <b-row class="list-trips mb-3" @click="showSecondModal(order_trip.id)">
            <b-col class="ps-3">
              <p class="fw-bold fs-3 mb-0">{{ order_trip.departure_time }}</p>
              <p class="mb-0">{{ order_trip.bus_stand }}</p>
              <p class="mb-0">{{ order_trip.journey }}</p>
              <p class="mb-0">Biển số xe: <span class="fw-bold">{{ order_trip.license_plate }}</span></p>
            </b-col>
            <b-col class="d-flex justify-content-end">
              <p
                class="text-center modal-status align-items-center arrow arrow--left"
                :class="{
                  'bg-primary arrow-left-color--primary': order_detail.status === order_status_types.NEW && order_trip.status === order_status_types.NEW,
                  'bg-danger arrow-left-color--danger': order_detail.status === order_status_types.NEW && order_trip.status === order_status_types.CANCELED,
                  'bg-success arrow-left-color--success arrow-sm': order_detail.status === order_status_types.ALREADY_PAID,
                  'bg-danger arrow-left-color--danger': order_detail.status === order_status_types.CANCELED,
                  'bg-secondary arrow-left-color--secondary arrow-lg': order_detail.status === order_status_types.PAYMENT_FAILED
                }"
              >
                {{
                  (order_trip.status === order_status_types.NEW) ? getTextByValue(order_status_types_name, order_detail.status) : getTextByValue(order_status_types_name, order_status_types.CANCELED)
                }}
              </p>
            </b-col>
          </b-row>
        </b-row>
      </b-row>
    </b-modal>

    <b-modal id="modal-order-detail" size="xl" title="Thông tin chi tiết vé" hide-footer v-model="show_second_modal">
      <b-row class="font-size-14 d-flex justify-content-center">
        <b-col cols="3" class="ps-0 d-flex justify-content-center align-items-center">
          <div class="bus-image-ticket">
            <img :src="order_trip_detail?.bus_image" alt="bus-stand-sub-image">
          </div>
        </b-col>
        <b-col cols="2">
          <p class="fw-bold text-primary">Thông tin chuyến đi</p>
          <p class="fw-semibold">Tuyến đường</p>
          <p>{{ order_trip_detail?.departure_location }} - {{ order_trip_detail?.destination_location }}</p>
          <p class="fw-semibold">Điểm đón</p>
          <p>{{ order_trip_detail?.pick_up_place }}</p>
          <p class="fw-semibold">Địa trả</p>
          <p>{{ order_trip_detail?.drop_off_place }}</p>
        </b-col>

        <b-col cols="2">
          <p class="fw-bold text-primary">Thông tin xe khách</p>
          <p class="fw-semibold">Nhà xe</p>
          <p>{{ order_trip_detail?.bus_stand }}</p>
          <p class="fw-semibold">Biến số xe</p>
          <p>{{ order_trip_detail?.bus_license_plate }}</p>
          <p class="fw-semibold">Loại xe</p>
          <p>{{ getTextByValue(bus_seat_types, order_trip_detail?.seat_type) }} {{ order_trip_detail?.seat_number }}
            chỗ</p>
        </b-col>

        <b-col cols="2">
          <p class="fw-bold text-primary text-end">Lộ trình di chuyển</p>
          <p class="fw-semibold text-end">Giờ khởi hành</p>
          <p class="text-end">{{ order_trip_detail?.departure_time }}</p>
          <p class="fw-semibold text-end">Tổng thời gian</p>
          <p class="text-end">{{ order_trip_detail?.total_time }}</p>
          <p class="fw-semibold text-end">Thời gian đón - trả</p>
          <p class="text-end">{{ order_trip_detail?.pick_up_time }} - {{ order_trip_detail?.drop_off_time }}</p>
        </b-col>

        <b-col cols="2" class="pe-0">
          <p class="fw-bold text-primary text-end">Thông tin thanh toán</p>
          <p class="text-end fw-semibold">Giá vé</p>
          <p class="text-end">{{ order_trip_detail?.price }}đ</p>
          <p class="text-end fw-semibold">Số chỗ ngồi đã đặt</p>
          <p class="text-end">{{ order_trip_detail?.seat_ordered }}</p>
          <p class="text-end fw-semibold">Tổng tiền</p>
          <p class="fs-5 fw-bold text-end text-primary">{{ order_trip_detail?.total_price }}đ</p>
        </b-col>
      </b-row>
    </b-modal>

    <b-modal size="xs" scrollable title="Hủy vé đã đặt?" v-model="show_verify_modal">
      <p>Bạn sẽ không thể hoàn nguyên hành động này!</p>

      <template #modal-footer="{ ok }">
        <b-button size="sm" variant="primary" @click.prevent="cancelTicket">
          Đồng ý
        </b-button>
        <b-button size="sm" variant="danger" @click="ok()">
          Đóng
        </b-button>
      </template>
    </b-modal>
  </b-col>
</template>

<script>
import {
  BUS_SEAT_TYPES,
  ORDER_STATUS_TYPES,
  ORDER_STATUS_TYPES_NAME, ORDERS_TO_SHOW,
  PAYMENT_METHOD_TYPES
} from '@/helpers/constant'
import ToastMixin from '@/Mixins/ToastMixin'
import OrderInfo from '@/components/users/OrderInfo.vue'
import CommonMixin from '@/Mixins/CommonMixin'

export default {
  data () {
    return {
      active_name: 'new',
      show_first_modal: false,
      show_second_modal: false,
      show_verify_modal: false,
      list_orders: {
        list_orders_new: [],
        list_orders_already_paid: [],
        list_orders_cancelled: [],
        list_orders_failed: []
      },
      order_status_types: ORDER_STATUS_TYPES,
      order_status_types_name: ORDER_STATUS_TYPES_NAME,
      payment_method_types: PAYMENT_METHOD_TYPES,
      order_detail: null,
      order_trip_detail: null,
      bus_seat_types: BUS_SEAT_TYPES,
      order_selected_id: null,
      ticket_selected_id: null,
      ticket_status: '',
      filter_orders_data: {
        from_date: null,
        to_date: null
      },
      orders_to_show: ORDERS_TO_SHOW
    }
  },
  components: {
    OrderInfo
  },
  mixins: [
    ToastMixin,
    CommonMixin
  ],
  created () {
    this.getAllListOrders()
  },
  methods: {
    getAllListOrders () {
      this.$orderRepository.getListOrders().then(response => {
        this.list_orders = response.data
      }).catch(error => {
        this.showToast('error', error.response.data.errors.error_message)
      })
    },
    showFirstModal (orderId, listStatus) {
      this.$orderRepository.getListOrderTrips(orderId).then(response => {
        this.order_detail = response.data
        this.order_selected_id = orderId
        this.ticket_status = listStatus
        this.show_first_modal = !this.show_first_modal
      }).catch(error => {
        this.showToast('error', error.response.data.errors.error_message)
      })
    },
    showSecondModal (orderTripId) {
      this.$orderRepository.getListOrderDetail(orderTripId).then(response => {
        this.order_trip_detail = response.data
        this.show_second_modal = !this.show_second_modal
      }).catch(error => {
        this.showToast('error', error.response.data.errors.error_message)
      })
    },
    showVerifyModal (ticketId) {
      this.ticket_selected_id = ticketId
      this.show_verify_modal = !this.show_verify_modal
    },
    cancelTicket () {
      this.$orderRepository.cancelTicket(this.order_selected_id, this.ticket_selected_id).then(() => {
        this.getAllListOrders()
        this.showFirstModal(this.order_selected_id)
        this.show_verify_modal = false
        this.show_first_modal = false
        this.showToast('success', 'Hủy vé thành công!')
      }).catch(error => {
        this.show_verify_modal = false
        this.showToast('error', error.response.data.errors.error_message)
      })
    },
    showMoreOrders () {
      this.orders_to_show += this.orders_to_show
    },
    disabledDates (datePicked) {
      let now = new Date(Date.now())
      now.setDate(now.getDate() - 1)
      return datePicked.getTime() > now.getTime()
    },
    disabledToDates (datePicked) {
      let now = new Date(Date.now())
      now.setDate(now.getDate() - 1)
      return (this.from_date) ? datePicked.getTime() < this.from_date.getTime() : datePicked.getTime() < now.getTime()
    },
    searchOrders (orderStatus) {
      this.$orderRepository.filterListOrders({ ...this.filter_orders_data, ...{ order_status: orderStatus } }).then(response => {
        if (orderStatus === this.order_status_types.NEW) {
          this.list_orders.list_orders_new = response.data
        } else if (orderStatus === this.order_status_types.ALREADY_PAID) {
          this.list_orders.list_orders_already_paid = response.data
        } else if (orderStatus === this.order_status_types.CANCELED) {
          this.list_orders.list_orders_cancelled = response.data
        } else {
          this.list_orders.list_orders_failed = response.data
        }
        this.showToast('success', 'Lọc đơn đặt vé thành công!')
      }).catch(error => {
        this.showToast('error', error.response.data.errors.erros_message)
      })
    },
    ordersToShow (orderListType) {
      return orderListType.slice(0, this.orders_to_show)
    }
  }
}
</script>

<style>

</style>
