import { createStore, createLogger } from 'vuex'
import createPersistedState from "vuex-persistedstate";

const debug = process.env.NODE_ENV !== 'production'

import { moduleAuth } from './modules/moduleAuth'
import { moduleSearch } from './modules/moduleSearch'

export default createStore({
  modules: {
    moduleAuth,
    moduleSearch
  },
  strict: debug,
  plugins: [createLogger(), createPersistedState({
    getState: (key) => JSON.parse(localStorage.getItem(key)),
    setState: (key, state) => localStorage.setItem(key, JSON.stringify(state))
  })]
})