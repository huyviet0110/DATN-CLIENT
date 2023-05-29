import BaseRepository from '@/repositories/BaseRepository'
import axios from 'axios'

export default class TripRepository extends BaseRepository {
  constructor (baseURL) {
    super(baseURL + '/trips')
  }

  async getListFilter (data) {
    const response = await axios.get(this.baseURL + '/list-filter', { params: data })
    return response.data
  }

  async getTripByStations (data) {
    const response = await axios.get(this.baseURL + '/detail', {
      params: {
        trip_id: data.trip_id,
        pick_up_place: data.pick_up_place,
        drop_off_place: data.drop_off_place
      }
    })
    return response.data
  }
}
