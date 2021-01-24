import { createRouter, createWebHashHistory } from 'vue-router'
import index from "../components/index.vue";
import service_index from '../components/service/index.vue'
import service_infor from '../components/service/infor.vue'
import service_upload from '../components/service/upload.vue'
import service_type from '../components/service/type.vue'
import service_customisation from '../components/service/customisation.vue'
import task_index from '../components/crowdsourcing/index.vue'
import task_tag from '../components/crowdsourcing/tag.vue'
import task_upload from '../components/crowdsourcing/upload.vue'
import task_infor from '../components/crowdsourcing/infor.vue'
import login from '../components/user/login.vue'
import signup from '../components/user/signUp.vue'
import user_index from '../components/user/index.vue'
import profile from '../components/user/profile.vue'
import star from '../components/user/star.vue'
import message from '../components/user/message.vue'
import user_services from '../components/user/user_services.vue'
import user_tasks from '../components/user/user_tasks.vue'
import user_solutions from '../components/user/user_solutions.vue'

const routes = [
  {
    path: '/',
    component: index,
    children: [
      {
        path: '/',
        name: 'service_index',
        component: service_index
      },
      {
        path: '/service_infor',
        name: 'service_infor',
        component: service_infor
      },
      {
        path: '/service_type',
        name: 'service_type',
        component: service_type
      },
      {
        path: '/service_upload',
        name: 'service_upload',
        component: service_upload
      },
      {
        path: '/service_customisation',
        name: 'service_customisation',
        component: service_customisation
      },
      {
        path: '/task_index',
        name: 'task_index',
        component: task_index
      },
      {
        path: '/task_tag',
        name: 'task_tag',
        component: task_tag
      },
      {
        path: '/task_upload',
        name: 'task_upload',
        component: task_upload
      },
      {
        path: '/task_infor',
        name: 'task_infor',
        component: task_infor
      },
      {
        path:'/user',
        component:user_index,
        children: [
            {
              path: '/user',
              name: 'profile',
              component: profile
            },
            {
              path: '/user/star',
              name: 'star',
              component: star
            },
            {
              path: '/user/message',
              name: 'message',
              component: message
            },
            {
              path: '/user/services',
              name: 'services',
              component: user_services
            },
            {
              path: '/user/tasks',
              name: 'tasks',
              component: user_tasks
            },
            {
              path: '/user/solutions',
              name: 'solutions',
              component: user_solutions
            },

          ]
      }
    ]

  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/signup',
    name: 'signup',
    component: signup
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
