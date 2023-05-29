import axios from 'axios'
import BaseRepository from '@/repositories/BaseRepository'

export default class AdminRepository extends BaseRepository {
  constructor (baseURL) {
    super(baseURL + '/admins')
    axios.defaults.headers.common.Authorization = localStorage.getItem('admin_jwt_token')
  }

  async login (dataUser) {
    const response = await axios.post(this.baseURL + '/login', dataUser)
    localStorage.setItem('admin_jwt_token', `Bearer ${response.data.data.token.access_token}`)
    axios.defaults.headers.common.Authorization = localStorage.getItem('admin_jwt_token')

    return response.data
  }

  async logout () {
    const response = await axios.post(this.baseURL + '/logout', null, {
      headers: {
        Authorization: localStorage.getItem('admin_jwt_token')
      }
    })
    localStorage.removeItem('admin_jwt_token')
    axios.defaults.headers.common.Authorization = null

    return response.data
  }

  async getProfile () {
    const response = await axios.get(this.baseURL + '/profile', {
      headers: {
        Authorization: localStorage.getItem('admin_jwt_token')
      }
    })
    return response.data
  }

  async getAllBuses () {
    const response = await axios.get(this.baseURL + '/buses', {
      headers: {
        Authorization: localStorage.getItem('admin_jwt_token')
      }
    })
    return response.data
  }

  async getAllJourneys () {
    const response = await axios.get(this.baseURL + '/journeys', {
      headers: {
        Authorization: localStorage.getItem('admin_jwt_token')
      }
    })
    return response.data
  }

  async getAllBusOperators () {
    const response = await axios.get(this.baseURL + '/bus-operators', {
      headers: {
        Authorization: localStorage.getItem('admin_jwt_token')
      }
    })
    return response.data
  }

  async getAllTrips () {
    const response = await axios.get(this.baseURL + '/trips', {
      headers: {
        Authorization: localStorage.getItem('admin_jwt_token')
      }
    })
    return response.data
  }

  async getAllOrders () {
    const response = await axios.get(this.baseURL + '/orders', {
      headers: {
        Authorization: localStorage.getItem('admin_jwt_token')
      }
    })
    return response.data
  }

  async createBus (data) {
    const response = await axios.post(this.baseURL + '/buses/create', data, {
      headers: {
        Authorization: localStorage.getItem('admin_jwt_token'),
        'Content-Type': 'multipart/form-data'
      }
    })
    return response.data
  }

  async createJourney (data) {
    const response = await axios.post(this.baseURL + '/journeys/create', data, {
      headers: {
        Authorization: localStorage.getItem('admin_jwt_token')
      }
    })
    return response.data
  }

  async createTrip (data) {
    const response = await axios.post(this.baseURL + '/trips/create', data, {
      headers: {
        Authorization: localStorage.getItem('admin_jwt_token')
      }
    })
    return response.data
  }

  async createOrder (data) {
    const response = await axios.post(this.baseURL + '/orders/create', data, {
      headers: {
        Authorization: localStorage.getItem('admin_jwt_token')
      }
    })
    return response.data
  }

  async updateBus (data) {
    const response = await axios.post(this.baseURL + '/buses/update', data, {
      headers: {
        Authorization: localStorage.getItem('admin_jwt_token'),
        'Content-Type': 'multipart/form-data'
      }
    })
    return response.data
  }

  async updateJourney (data) {
    const response = await axios.post(this.baseURL + '/journeys/update', data, {
      headers: {
        Authorization: localStorage.getItem('admin_jwt_token')
      }
    })
    return response.data
  }

  async updateTrip (data) {
    const response = await axios.post(this.baseURL + '/trips/update', data, {
      headers: {
        Authorization: localStorage.getItem('admin_jwt_token')
      }
    })
    return response.data
  }

  async updateOrder (data) {
    const response = await axios.post(this.baseURL + '/orders/update', data, {
      headers: {
        Authorization: localStorage.getItem('admin_jwt_token')
      }
    })
    return response.data
  }

  async destroyBus (busId) {
    const response = await axios.post(this.baseURL + '/buses/destroy', { id: busId }, {
      headers: {
        Authorization: localStorage.getItem('admin_jwt_token')
      }
    })
    return response.data
  }

  async destroyJourney (journeyId) {
    const response = await axios.post(this.baseURL + '/journeys/destroy', { id: journeyId }, {
      headers: {
        Authorization: localStorage.getItem('admin_jwt_token')
      }
    })
    return response.data
  }

  async destroyTrip (tripId) {
    const response = await axios.post(this.baseURL + '/trips/destroy', { id: tripId }, {
      headers: {
        Authorization: localStorage.getItem('admin_jwt_token')
      }
    })
    return response.data
  }

  async getAllUsers () {
    const response = await axios.get(this.baseURL + '/users', {
      headers: {
        Authorization: localStorage.getItem('admin_jwt_token')
      }
    })
    return response.data
  }

  async updateUser (data) {
    const response = await axios.post(this.baseURL + '/users/update', data, {
      headers: {
        Authorization: localStorage.getItem('admin_jwt_token'),
        'Content-Type': 'multipart/form-data'
      }
    })
    return response.data
  }

  async destroyUser (userId) {
    const response = await axios.post(this.baseURL + '/users/destroy', { id: userId }, {
      headers: {
        Authorization: localStorage.getItem('admin_jwt_token')
      }
    })
    return response.data
  }

  async findOrderById (orderId) {
    const response = await axios.get(`${this.baseURL}/orders/${orderId}`, {
      headers: {
        Authorization: localStorage.getItem('admin_jwt_token')
      }
    })
    return response.data
  }
}
