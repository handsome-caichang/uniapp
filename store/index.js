import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import state from './state/index.js'
import getters from './getters/index.js'
import mutations from './mutations/index.js'
import actions from './actions/index.js'

const store = new Vuex.Store({
	state,
	getters,
	mutations,
	actions,
	// strict: process.env.NODE_ENV !== 'production'
})

export default store
