import { createStore } from 'vuex'
import axios from 'axios'
import router from '../router';

const store = createStore({
	state: {
		token: null,
		userId: null,
		user: {
			_id: "",
			username: "",
			role: "",
		},
		loginError: "",
		loginSuccess: "",
		fetchError: "",
		loading: false
	},
	getters: {
		user(state){
			return state.user;
		},
		isAuthenticated(state) {
			return state.token !== null;
		}
	},
	mutations: {
		loginUser(state, authData){
			state.token = authData.token
			state.userId = authData.userId
		},
		getUserData(state, data) {
			state.user = data.user
		},
		logoutUser(state){
			state.token = ""
			state.user = {
				_id: "",
				username: "",
				role: ""
			}
			router.push('/login')
		}
	},
	actions: {
		login({commit, state}, authData) {
			axios.post('https://nameless-basin-94170.herokuapp.com/api/login', authData)
            .then((res) => {
                state.loginSuccess = "Success"
				state.loading = false
				console.log(res.data)
				commit('loginUser', {
					token: res.data.token,
					userId: res.data._id
				})
				router.push('/');
            })
            .catch(err => {
                state.loginError = `[Login failed] ${err}`
				state.loginSuccess = ""
				state.loading = false
				console.log(err)
            })
		},
		fetchUser({commit, state},) {
			axios.get('https://nameless-basin-94170.herokuapp.com/api/user', {
				headers: {
					token: state.token
				}
			})
			.then((res) => {
				console.log('user gotten', res.data)
				commit('getUserData', {
					user: res.data.user
				})
			})
			.catch(err => {
				console.log(err)
				state.fetchError = err;
			})
		},
		logout({commit}){
			commit('logoutUser')
		}
	}
});

export default store;