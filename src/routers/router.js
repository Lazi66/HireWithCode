// src/routers/router.js

import { createRouter, createWebHistory } from 'vue-router'
import welcome from '../pages/welcome.vue'
import guid from '../pages/guid.vue'
import accept from '../pages/accept.vue'
import submit from '../pages/submit.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: welcome,
      name: 'Welcome',
      meta: { step: 0 } // 首页
    },
    {
      path: '/guid',
      component: guid,
      name: 'Guid',
      meta: { step: 1 } // 第二步
    },
    {
      path: '/accept',
      component: accept,
      name: 'Accept',
      meta: { step: 2 }
    },
    {
      path: '/submit',
      component: submit,
      name: 'Submit',
      meta: { step: 3 }
    }
  ]
})

// 全局前置守卫：控制页面访问权限
router.beforeEach((to, from, next) => {
  const toStep = to.meta.step ?? Infinity
  const fromStep = from.meta.step ?? -1

  // 只允许按步骤访问：0 → 1 → 2 → 3
  if (toStep === 0) {
    // 欢迎页始终可以访问
    next()
  } else if (fromStep + 1 >= toStep) {
    next()
  } else {
    alert('非法访问！请按流程进行操作')
    next('/')
  }
})

export default router