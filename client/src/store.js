import Vue from 'vue'
import Vuex from 'vuex'
import axios from './configs/axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    auth: {},
    questions: [],
    myQuestions: [],
    question: {}
  },
  mutations: {
    SET_AUTH (state, data) {
      state.auth = data
    },

    SIGNUP (state, data) {
      localStorage.setItem('token', data.token)
      localStorage.setItem('_id', data.payload._id)
      localStorage.setItem('name', data.payload.name)
      localStorage.setItem('email', data.payload.email)
      state.auth = data
    },
    SIGNIN (state, data) {
      localStorage.setItem('token', data.token)
      localStorage.setItem('_id', data.payload._id)
      localStorage.setItem('name', data.payload.name)
      localStorage.setItem('email', data.payload.email)
      state.auth = data
    },
    SIGNOUT (state) {
      localStorage.clear()
      state.auth = {}
    },
    FETCH_QUESTIONS (state, questions) {
      state.questions = questions
    },
    FETCH_MY_QUESTIONS (state, myQuestions) {
      state.myQuestions = myQuestions
    },
    ADD_QUESTION (state, payload) {
      state.questions.push(payload)
    },
    GET_QUESTION (state, question) {
      state.question = question
    }
  },
  actions: {
    checkLogin ({ dispatch, commit }) {
      let data = {
        token: localStorage.getItem('token'),
        payload: {
          name: localStorage.getItem('name'),
          email: localStorage.getItem('email'),
          _id: localStorage.getItem('_id')
        }
      }
      commit('SET_AUTH', data)
    },
    signup ({ dispatch, commit }, payload) {
      return new Promise((resolve, reject) => {
        axios({
          url: '/users/signup',
          method: 'POST',
          data: payload
        })
          .then(({ data }) => {
            console.log(data)
            commit('SIGNUP', data)
            resolve('Signup success!')
          })
          .catch(err => {
            if (err.response) {
              console.log(err.response)
              reject(err.response.data.errors)
            }
          })
      })
    },

    signin ({ dispatch, commit }, payload) {
      return new Promise((resolve, reject) => {
        axios({
          url: '/users/signin',
          method: 'POST',
          data: payload
        })
          .then(({ data }) => {
            console.log(data)
            commit('SIGNIN', data)
            resolve('Signin success!')
          })
          .catch(err => {
            if (err.response) {
              reject(err.response.data.errors)
            }
          })
      })
    },

    signout ({ dispatch, commit }) {
      return new Promise((resolve, reject) => {
        commit('SIGNOUT')
        resolve('Signout success!')
      })
    },

    fetchQuestions ({ dispatch, commit, state }) {
      console.log('masuk fetch question')
      return new Promise((resolve, reject) => {
        axios({
          url: '/questions',
          method: 'GET'
        })
          .then(({ data }) => {
            commit('FETCH_QUESTIONS', data)
            resolve()
          })
          .catch(err => {
          // console.log(err)
            if (err.response) {
              console.log(err.response)
              reject(err.response.data.errors)
            }
          })
      })
    },

    fetchMyQuestions ({ dispatch, commit, state }) {
      return new Promise((resolve, reject) => {
        axios({
          url: '/questions/my',
          method: 'GET',
          headers: {
            token: state.auth.token
          }
        })
          .then(({ data }) => {
            commit('FETCH_MY_QUESTIONS', data)
            resolve()
          })
          .catch(err => {
          // console.log(err)
            if (err.response) {
              console.log(err.response)
              reject(err.response.data.errors)
            }
          })
      })
    },

    addQuestion ({ dispatch, commit, state }, payload) {
      console.log(payload)
      return new Promise((resolve, reject) => {
        axios({
          url: '/questions',
          method: 'POST',
          headers: {
            token: state.auth.token
          },
          data: payload
        })
          .then(({ data }) => {
            console.log(data)
            resolve('Question added successfully!')
          })
          .catch(err => {
            console.log(err)
            if (err.response) {
              console.log(err.response)
              reject(err.response.data.errors)
            }
          })
      })
    },

    getQuestion ({ dispatch, commit, state }, id) {
      return new Promise((resolve, reject) => {
        axios({
          url: `/questions/${id}`,
          method: 'GET'
        })
          .then(({ data }) => {
            commit('GET_QUESTION', data)
            resolve(data)
          })
          .catch(err => {
            if (err.response) {
              console.log(err.response)
              reject(err.response.data.errors)
            }
          })
      })
    },

    addAnswer ({ dispatch, commit, state }, payload) {
      return new Promise((resolve, reject) => {
        axios({
          url: `/answers/${payload.questionId}`,
          method: 'POST',
          headers: {
            token: state.auth.token
          },
          data: payload.data
        })
          .then(({ data }) => {
            console.log(data)
            dispatch('getQuestion', payload.questionId)
            resolve('Answer added successfully!')
          })
          .catch(err => {
            console.log(err)
            if (err.response) {
              console.log(err.response)
              reject(err.response.data.errors)
            }
          })
      })
    },

    editAnswer ({ dispatch, commit, state }, payload) {
      return new Promise((resolve, reject) => {
        axios({
          url: `/answers/${payload.answerId}`,
          method: 'PATCH',
          headers: {
            token: state.auth.token
          },
          data: payload.data
        })
          .then(({ data }) => {
          // console.log(data)
            dispatch('getQuestion', payload.questionId)
            resolve('Answer updated successfully!')
          })
          .catch(err => {
          // console.log(err)
            if (err.response) {
              console.log(err.response)
              reject(err.response.data.errors)
            }
          })
      })
    },

    deleteAnswer ({ dispatch, commit, state }, payload) {
      return new Promise((resolve, reject) => {
        axios({
          url: `/answers/${payload.answerId}`,
          method: 'DELETE',
          headers: {
            token: state.auth.token
          }
        })
          .then(({ data }) => {
          // console.log(data)
            dispatch('getQuestion', payload.questionId)
            resolve('Answer deleted successfully!')
          })
          .catch(err => {
          // console.log(err)
            if (err.response) {
              console.log(err.response)
              reject(err.response.data.errors)
            }
          })
      })
    },

    upvoteQuestion ({ dispatch, commit, state }, questionId) {
      return new Promise((resolve, reject) => {
        axios({
          url: `/questions/${questionId}/upvote`,
          method: 'POST',
          headers: {
            token: state.auth.token
          }
        })
          .then(({ data }) => {
          // console.log(data)
            dispatch('getQuestion', questionId)
            resolve('You upvoted this question')
          })
          .catch(err => {
          // console.log(err)
            if (err.response) {
              console.log(err.response)
              reject(err.response.data.errors)
            }
          })
      })
    },

    downvoteQuestion ({ dispatch, commit, state }, questionId) {
      return new Promise((resolve, reject) => {
        axios({
          url: `/questions/${questionId}/downvote`,
          method: 'POST',
          headers: {
            token: state.auth.token
          }
        })
          .then(({ data }) => {
          // console.log(data)
            dispatch('getQuestion', questionId)
            resolve('You downvoted this question')
          })
          .catch(err => {
          // console.log(err)
            if (err.response) {
              console.log(err.response)
              reject(err.response.data.errors)
            }
          })
      })
    },

    upvoteAnswer ({ dispatch, commit, state }, payload) {
      return new Promise((resolve, reject) => {
        axios({
          url: `/answers/${payload.answerId}/upvote`,
          method: 'POST',
          headers: {
            token: state.auth.token
          }
        })
          .then(({ data }) => {
            console.log(data)
            dispatch('getQuestion', payload.questionId)
            resolve('You upvoted this answer')
          })
          .catch(err => {
            console.log(err)
            if (err.response) {
              console.log(err.response)
              reject(err.response.data.errors)
            }
          })
      })
    },

    downvoteAnswer ({ dispatch, commit, state }, payload) {
      return new Promise((resolve, reject) => {
        axios({
          url: `/answers/${payload.answerId}/downvote`,
          method: 'POST',
          headers: {
            token: state.auth.token
          }
        })
          .then(({ data }) => {
            console.log(data)
            dispatch('getQuestion', payload.questionId)
            resolve('You downvoted this answer')
          })
          .catch(err => {
            console.log(err)
            if (err.response) {
              console.log(err.response)
              reject(err.response.data.errors)
            }
          })
      })
    },

    deleteQuestion ({ dispatch, commit, state }, questionId) {
      return new Promise((resolve, reject) => {
        axios({
          url: `/questions/${questionId}`,
          method: 'DELETE',
          headers: {
            token: state.auth.token
          }
        })
          .then(({ data }) => {
            console.log(data)
            // dispatch('fetchQuestion')
            resolve('Question deleted successfully!')
          })
          .catch(err => {
          // console.log(err)
            if (err.response) {
              console.log(err.response)
              reject(err.response.data.errors)
            }
          })
      })
    },

    editQuestion ({ dispatch, commit, state }, payload) {
      return new Promise((resolve, reject) => {
        axios({
          url: `/questions/${payload.questionId}`,
          method: 'PUT',
          headers: {
            token: state.auth.token
          },
          data: payload.data
        })
          .then(({ data }) => {
            console.log(data)
            resolve('Question updated successfully!')
          })
          .catch(err => {
            console.log(err)
            if (err.response) {
              console.log(err.response)
              reject(err.response.data.errors)
            }
          })
      })
    }
  }
})
