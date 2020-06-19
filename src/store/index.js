import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // what comes back from the server after user login
    loginResponse: null
  },
  mutations: {
    SET_USER_DATA(state, userData) {
      // setting the loginResponse object in state property
      state.loginResponse = userData;
      // storing the loginResponse object in the local storage
      localStorage.setItem('user', JSON.stringify(userData));
      // setting the headers with the JWT token
      axios.defaults.headers.common['Authorization'] = `Bearer ${
        userData.token
      }`;
    },
    // reversing the process
    CLEAR_USER_DATA(state) {
      localStorage.removeItem('user');
      // reload the page
      location.reload()
    }

  },
  actions: {
    // login action
    login ({ commit }, credentials ) {
      let formData = JSON.stringify(credentials);
      return axios.post('http://192.168.0.55:12345/user/staff/login', formData)
                    // getting back data response back
                  .then(({ data}) => {
                    // console.log(data);
                    // committing to this mutation with data parameter
                    commit('SET_USER_DATA', data.payload)
                  });
    },

    // logout action
    logout ({commit}) {
      commit('CLEAR_USER_DATA')
    }
  },

  modules: {
  },

  getters: {
    loggedIn (state) {
      // this will return truthiness or falseness of the value we enter before !!
      // if user is null it will return false if not null then true
      return !!state.loginResponse
    }
  }
})
