export const state = () => ({
  list: null,
  error: false,
})

export const mutations = {
  add(state, data) {
    state.list = data
  },
  error(state, data) {
    state.error = data
  },
}
