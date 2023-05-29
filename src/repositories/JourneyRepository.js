import BaseRepository from '@/repositories/BaseRepository'
import axios from 'axios'

export default class JourneyRepository extends BaseRepository {
  constructor (baseURL) {
    super(baseURL + '/journeys')
  }

  async getTopList () {
    const response = await axios.get(this.baseURL + '/top-popular')
    return response.data
  }
}
