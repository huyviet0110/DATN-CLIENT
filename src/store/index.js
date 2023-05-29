import Vuex from 'vuex'
import Vue from 'vue'
import carts from '@/store/modules/carts'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    carts
  }
})
export default store
