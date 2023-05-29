import axios from 'axios'
import BaseRepository from '@/repositories/BaseRepository'

export default class OrderRepository extends BaseRepository {
  constructor (baseURL) {
    super(baseURL)
    axios.defaults.headers.common.Authorization = localStorage.getItem('jwt_token')
  }

  async getListOrders () {
    const response = await axios.get(this.baseURL + '/users/list-orders')
    return response.data
  }

  async getListOrderTrips (OrderId) {
    const response = await axios.get(this.baseURL + `/users/list-order-trips/${OrderId}`)
    return response.data
  }

  async getListOrderDetail (orderTripId) {
    const response = await axios.get(this.baseURL + `/users/order-detail/${orderTripId}`)
    return response.data
  }

  async cancelTicket (orderId, ticketId) {
    const response = await axios.post(this.baseURL + '/users/cancel-ticket',
      {
        order_id: orderId,
        ticket_id: ticketId
      })
    return response.data
  }

  async orderTrip (data) {
    const response = await axios.post(this.baseURL + '/orders/order-trips', data)
    return response.data
  }

  async filterListOrders (filter_orders_data) {
    const response = await axios.get(this.baseURL + '/orders/list-orders', { params: filter_orders_data })
    return response.data
  }
}
