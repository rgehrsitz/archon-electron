import { createRouter, createWebHashHistory } from 'vue-router'
import Style from '@/views/StyleView.vue'
import Dashboard from '@/views/HomeView.vue'
import Welcome from '@/views/WelcomeView.vue'

const routes = [
  {
    meta: {
      title: 'Select style'
    },
    path: '/',
    name: 'style',
    component: Style
  },
  {
    // Document title tag
    // We combine it with defaultDocumentTitle set in `src/main.js` on router.afterEach hook
    meta: {
      title: 'Welcome'
    },
    path: '/welcome',
    name: 'welcome',
    component: Welcome
  },
  {
    // Document title tag
    // We combine it with defaultDocumentTitle set in `src/main.js` on router.afterEach hook
    meta: {
      title: 'Dashboard'
    },
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard
  },
  {
    meta: {
      title: 'Equipment'
    },
    path: '/equipment',
    name: 'equipment',
    component: () => import('@/views/EquipmentView.vue')
  },
  {
    meta: {
      title: 'Snapshots'
    },
    path: '/snapshots',
    name: 'snapshots',
    component: () => import('@/views/SnapshotsView.vue')
  },
  {
    meta: {
      title: 'Diff View'
    },
    path: '/diffview',
    name: 'diffview',
    component: () => import('@/views/DiffView.vue')
  },
  {
    meta: {
      title: 'Settings'
    },
    path: '/settings',
    name: 'settings',
    component: () => import('@/views/SettingsView.vue')
  },
  {
    meta: {
      title: 'Login'
    },
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginView.vue')
  },
  {
    meta: {
      title: 'Error'
    },
    path: '/error',
    name: 'error',
    component: () => import('@/views/ErrorView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior (to, from, savedPosition) {
    return savedPosition || { top: 0 }
  }
})

export default router
