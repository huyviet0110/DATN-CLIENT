<template>
  <b-col cols="9" class="buses-management ps-0 mb-5 me-0 ms-5">
    <div>
      <table class="w-100 text-center border-2 text-nowrap font-size-14">
        <thead>
        <tr>
          <th>#</th>
          <th>Tên người nhận</th>
          <th>Điện thoại</th>
          <th>Email</th>
          <th>Phương thức</th>
          <th>Trạng thái</th>
          <th>Tổng tiền</th>
          <th>Xem</th>
          <th>Sửa</th>
        </tr>
        </thead>
        <tbody>
        <b-overlay :show="!show_buses" no-wrap class="mt-5"></b-overlay>
        <tr v-for="(item, index) in itemsToShow(ordersData)" :key="item.id">
          <td>{{ ++index }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.phone }}</td>
          <td>{{ item.email }}</td>
          <td>{{ item.payment_method_text }}</td>
          <td>{{ item.status_text }}</td>
          <td>{{ item.total_payment_formatted }}đ</td>
          <td>
            <div class="btn btn-secondary" @click="openModalShow(item.id)">Xem</div>
          </td>
          <td>
            <div class="btn btn-primary" @click="openModalUpdate(item)">Sửa</div>
          </td>
        </tr>
        </tbody>
      </table>

      <b-row class="mb-5">
        <b-button
          variant="primary"
          class="button-center mt-4"
          @click="showMore"
          v-show="items_to_show < ordersData.length"
        >
          Xem thêm
        </b-button>
      </b-row>
    </div>

    <b-modal size="xl" title="Chi tiết hóa đơn" hide-footer v-model="show_detail_modal">
      <b-col>
        <h5>Thông tin các chuyến đi đã đặt</h5>
        <b-row class="text-nowrap" v-for="(item, index) in orderShow" :key="item?.id">
          <b-row class="border-table mb-5 p-3">
            <b-col cols="1" class="d-flex align-items-center">
              <b-row>
                <p class="text-primary fw-semibold text-center">STT</p>
                <p class="desc text-center">{{ ++index }}</p>
              </b-row>
            </b-col>
            <b-col cols="11">
              <b-row>
                <b-col>
                  <p class="text-primary fw-semibold">Điểm khởi hành</p>
                  <p class="desc">{{ item?.departure_location }}</p>
                </b-col>
                <b-col>
                  <p class="text-primary fw-semibold">Điểm kết thúc</p>
                  <p class="desc">{{ item?.destination_location }}</p>
                </b-col>
                <b-col>
                  <p class="text-primary fw-semibold">Nhà xe</p>
                  <p class="desc">{{ item?.bus_stand }}</p>
                </b-col>
                <b-col>
                  <p class="text-primary fw-semibold">Biển số xe</p>
                  <p class="desc">{{ item?.license_plate }}</p>
                </b-col>
                <b-col>
                  <p class="text-primary fw-semibold text-end">Số chỗ</p>
                  <p class="desc text-end">{{ item?.seat_number }}</p>
                </b-col>
                <b-col>
                  <p class="text-primary fw-semibold">Loại ghế</p>
                  <p class="desc">{{ item?.seat_type }}</p>
                </b-col>
                <b-col>
                  <p class="text-primary fw-semibold text-end">Thời gian khởi hành</p>
                  <p class="desc text-end">{{ item?.departure_time }}</p>
                </b-col>
                <b-col>
                  <p class="text-primary fw-semibold text-end">Tổng thời gian di chuyển</p>
                  <p class="desc text-end">{{ item?.total_time }}</p>
                </b-col>
                <b-col>
                  <p class="text-primary fw-semibold">Điểm đón</p>
                  <p class="desc">{{ item?.pick_up_place }}</p>
                </b-col>
                <b-col>
                  <p class="text-primary fw-semibold text-end">Thời gian đón</p>
                  <p class="desc text-end">{{ item?.pick_up_time }}</p>
                </b-col>
                <b-col>
                  <p class="text-primary fw-semibold">Điểm trả</p>
                  <p class="desc">{{ item?.drop_off_place }}</p>
                </b-col>
                <b-col>
                  <p class="text-primary fw-semibold text-end">Thời gian trả</p>
                  <p class="desc text-end">{{ item?.drop_off_time }}</p>
                </b-col>
                <b-col>
                  <p class="text-primary fw-semibold text-end">Giá</p>
                  <p class="desc text-end">{{ item?.price }}đ</p>
                </b-col>
                <b-col>
                  <p class="text-primary fw-semibold text-end">Số chỗ đã đặt</p>
                  <p class="desc text-end">{{ item?.seat_ordered }}</p>
                </b-col>
                <b-col>
                  <p class="text-primary fw-semibold text-end">Tổng tiền</p>
                  <p class="desc fs-5 text-primary fw-bold text-end">{{ item?.total_payment }}đ</p>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
        </b-row>
      </b-col>
    </b-modal>

    <b-modal id="modal-update-bus" size="lg" title="Cập nhật trạng thái hóa đơn" hide-footer v-model="show_update_modal">
      <ValidationObserver v-slot="{ handleSubmit }">
        <b-form>
          <ValidationProvider rules="required|oneOf:0,1,2,3" name="Status" v-slot="{ errors }">
            <b-form-group id="input-status-group" label="Trạng thái" label-for="status">
              <b-form-select
                id="status"
                v-model="orderData.status"
                :options="order_status"
              ></b-form-select>
              <span class="text-danger">{{ errors[0] }}</span>
            </b-form-group>
          </ValidationProvider>

          <div class="d-flex justify-content-end">
            <b-button
              type="submit"
              variant="primary"
              class="w-auto mt-4"
              @click.prevent="handleSubmit(updateOrder)"
            >
              Cập nhật
            </b-button>
          </div>
        </b-form>
      </ValidationObserver>
    </b-modal>
  </b-col>
</template>

<script>
import { ORDER_STATUS_TYPES_NAME, ORDERS_TO_SHOW, SEAT_TYPES } from '@/helpers/constant'
import ToastMixin from '@/Mixins/ToastMixin'

export default {
  data () {
    return {
      orderData: {
        status: '',
        payment_method: '',
        user_id: '',
        name: '',
        phone: '',
        email: '',
        total_payment: '',
        created_at: '',
        updated_at: ''
      },
      ordersData: [],
      show_buses: true,
      show_detail_modal: false,
      show_update_modal: false,
      type_options: SEAT_TYPES,
      operator_options: [],
      data_update: null,
      base_url: import.meta.env.VITE_BASE_IMAGE_URL,
      items_to_show: ORDERS_TO_SHOW,
      orderShow: null,
      order_status: ORDER_STATUS_TYPES_NAME
    }
  },
  mixins: [
    ToastMixin
  ],
  created () {
    this.getOrdersData()
  },
  methods: {
    getOrdersData () {
      this.show_buses = false
      this.$adminRepository.getAllOrders().then(response => {
        this.ordersData = response.data
        this.show_buses = true
      }).catch(error => {
        this.showToast('error', error.response.data.errors.error_message)
        this.show_buses = true
      })
    },
    openModalShow (orderId) {
      this.$adminRepository.findOrderById(orderId).then(response => {
        this.orderShow = response.data
        this.show_buses = true
        this.show_detail_modal = true
      }).catch(error => {
        this.showToast('error', error.response.data.errors.error_message)
        this.show_buses = true
      })
    },
    openModalUpdate (order) {
      this.orderData = order
      this.show_update_modal = true
    },
    updateOrder () {
      this.$adminRepository.updateOrder(this.orderData).then(() => {
        this.getOrdersData()
        this.showToast('success', 'Cập nhật hóa đơn thành công!')
        this.show_update_modal = false
      }).catch(error => {
        this.showToast('error', error.response.data.errors.error_message)
      })
    },
    showMore () {
      this.items_to_show += this.items_to_show
    },
    itemsToShow () {
      return this.ordersData.slice(0, this.items_to_show)
    }
  }
}
</script>

<style>

</style>
