import axios from 'axios'

export default class BaseRepository {
  constructor (baseURL) {
    this.baseURL = baseURL
    axios.defaults.headers.get.Accept = 'application/json'
    axios.defaults.headers.get['Content-Type'] = 'application/json'
    axios.defaults.headers.post.Accept = 'application/json'
    axios.defaults.headers.post['Content-Type'] = 'application/json'
  }

  async getAll (data) {
    const response = await axios.get(this.baseURL, { params: data })
    return response.data
  }

  async getById (id) {
    const response = await axios.get(`${this.baseURL}/${id}`)
    return response.data
  }

  async create (data) {
    const response = await axios.post(this.baseURL, data)
    return response.data
  }

  async update (id, data) {
    const response = await axios.put(`${this.baseURL}/${id}`, data)
    return response.data
  }

  async delete (id) {
    const response = await axios.delete(`${this.baseURL}/${id}`)
    return response.data
  }
}
