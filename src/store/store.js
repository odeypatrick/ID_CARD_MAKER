import { createStore } from 'vuex'
import { auth } from './modules/auth'
// import axios from 'axios'

const store = createStore({
	modules: {
        auth
	}
});

export default store;