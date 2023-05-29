import BaseRepository from '@/repositories/BaseRepository'

export default class LocationRepository extends BaseRepository {
  constructor (baseURL) {
    super(baseURL + '/locations')
  }
}
