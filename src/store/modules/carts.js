export const state = () => ({
  user_id: null,
  carts: [],
  name: '',
  phone: '',
  email: ''
})

export const mutations = {
  ADD_TICKET_TO_CARTS (state, ticket) {
    state.carts.push(ticket)
  },
  REMOVE_TICKET_IN_CARTS (state, ticketId) {
    state.carts = state.carts.filter(ticket => ticket.trip_id !== ticketId)
  },
  UPDATE_QUANTITY (state, ticket) {
    const ticket_in_carts = state.carts.find(item => item.id === ticket.id)
    ticket_in_carts.quantity += ticket.quantity
  },
  ADD_PASSENGER_INFO (state, ticket) {
    state.name = ticket.name
    state.phone = ticket.phone
    state.email = ticket.email
    state.user_id = ticket.user_id ?? null
  },
  REMOVE_ALL_TICKETS (state) {
    state.carts = []
  }
}

export const actions = {
  addTicketToCarts ({ state, commit }, ticket) {
    const cart_item = state.carts.find(item => item.trip_id === ticket.trip_id)
    if (!cart_item) {
      commit('ADD_TICKET_TO_CARTS', ticket)
    } else {
      commit('UPDATE_QUANTITY', ticket)
    }
  },
  removeTicketInCarts ({ commit }, ticketId) {
    commit('REMOVE_TICKET_IN_CARTS', ticketId)
  },
  addPassengerInfo ({ commit }, passengerInfo) {
    commit('ADD_PASSENGER_INFO', passengerInfo)
  },
  removeAllTickets ({ commit }) {
    commit('REMOVE_ALL_TICKETS')
  }
}

export const getters = {
  getCarts (state) {
    return state.carts
  },
  getPassengerInfo (state) {
    return {
      user_id: state.user_id,
      name: state.name,
      phone: state.phone,
      email: state.email
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
