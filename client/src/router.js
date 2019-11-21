import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/question/my',
      name: 'myquestion',
      component: () => import('./views/MyQuestion.vue')
    },
    {
      path: '/question/:id',
      name: 'question',
      component: () => import('./views/Question.vue')
    },
    {
      path: '/question/edit/:id',
      name: 'question-edit',
      component: () => import('./views/EditQuestion.vue')
    },
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('./views/Signup.vue')
    },
    {
      path: '/signin',
      name: 'signin',
      component: () => import('./views/Signin.vue')
    },
    {
      path: '/ask',
      name: 'Ask',
      component: () => import('./views/Ask.vue')
    }
  ]
})
