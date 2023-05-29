import axios from 'axios'
import BaseRepository from '@/repositories/BaseRepository'

export default class UserRepository extends BaseRepository {
  constructor (baseURL) {
    super(baseURL)
    axios.defaults.headers.common.Authorization = localStorage.getItem('jwt_token')
  }

  async register (dataUser) {
    const response = await axios.post(this.baseURL + '/auth/register', dataUser)

    return response.data
  }

  async login (dataUser) {
    const response = await axios.post(this.baseURL + '/auth/login', dataUser)
    localStorage.setItem('jwt_token', `Bearer ${response.data.data.token.access_token}`)
    localStorage.setItem('userData', response.data.data.user)
    axios.defaults.headers.common.Authorization = localStorage.getItem('jwt_token')

    return response.data
  }

  async logout () {
    const response = await axios.post(this.baseURL + '/users/logout')
    localStorage.removeItem('jwt_token')
    localStorage.removeItem('userData')
    axios.defaults.headers.common.Authorization = null

    return response.data
  }

  async getProfile () {
    const response = await axios.get(this.baseURL + '/users/profile', {
      headers: {
        Authorization: localStorage.getItem('jwt_token')
      }
    })
    return response.data
  }

  async updateUserProfile (userData) {
    const response = await axios.post(this.baseURL + '/users/update-profile', userData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return response.data
  }

  async sendMailForResetPassword (userData) {
    const response = await axios.post(this.baseURL + '/users/update-profile', userData)
    return response.data
  }
}
