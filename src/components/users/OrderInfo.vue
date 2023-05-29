<template>
  <b-row>
    <b-row>
      <p class="mb-2 ps-0 fw-bold">Ngày đặt vé: {{ order.created_at }}</p>
    </b-row>
    <b-row class="list-trips mb-3" @click="showFirstModal(order.id, listStatus)">
      <b-col class="ps-3">
        <p class="mb-0"><span class="fw-bold">Mã đơn đặt vé:</span>
          {{ order.id }}
        </p>
        <p class="mb-0"><span class="fw-bold">Trạng thái:</span>
          {{ getTextByValue(order_status_types_name, order.status) }}
        </p>
        <p class="mb-0"><span class="fw-bold">Phương thức thanh toán:</span>
          {{ getTextByValue(payment_method_types, order.payment_method) }}
        </p>
        <p class="mb-0"><span class="fw-bold">Tên người nhận:</span>
          {{ order.name }}
        </p>
        <p class="mb-0"><span class="fw-bold">Email:</span>
          {{ order.email }}
        </p>
        <p class="mb-0"><span class="fw-bold">Số điện thoại:</span>
          {{ order.phone }}
        </p>
        <p class="mb-0"><span class="fw-bold">Tổng tiền phải thanh toán: </span>
          <span class="text-primary fw-bold fs-6">{{ order.total_payment }}đ</span>
        </p>
      </b-col>
      <b-col class="d-flex justify-content-end">
        <p
          class="text-center status align-items-center arrow arrow--left"
          :class="{
            'bg-primary arrow-left-color--primary': listStatus === order_status_types.NEW,
            'bg-success arrow-left-color--success arrow-sm': listStatus === order_status_types.ALREADY_PAID,
            'bg-danger arrow-left-color--danger': listStatus === order_status_types.CANCELED,
            'bg-secondary arrow-left-color--secondary arrow-lg': listStatus === order_status_types.PAYMENT_FAILED
          }"
        >{{ getTextByValue(order_status_types_name, listStatus) }}</p>
      </b-col>
    </b-row>
  </b-row>
</template>

<script>
import {
  ORDER_STATUS_TYPES,
  ORDER_STATUS_TYPES_NAME,
  PAYMENT_METHOD_TYPES
} from '@/helpers/constant'
import CommonMixin from '@/Mixins/CommonMixin'

export default {
  props: {
    order: {
      type: Object,
      required: true
    },
    listStatus: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      order_status_types_name: ORDER_STATUS_TYPES_NAME,
      payment_method_types: PAYMENT_METHOD_TYPES,
      order_status_types: ORDER_STATUS_TYPES
    }
  },
  methods: {
    showFirstModal (orderId, listStatus) {
      this.$emit('showFirstModal', orderId, listStatus)
    }
  },
  mixins: [
    CommonMixin
  ]
}
</script>

<style>

</style>
