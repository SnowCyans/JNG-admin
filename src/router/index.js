import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    name: 'login',
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  { path: '/', component: Layout, redirect: '/welcome', children: [{ path: 'welcome', name: 'welcome', component: () => import('@/views/welcome') }] },
  {
    path: '/user',
    component: Layout,
    redirect: '/user/userlist',
    name: 'user',
    meta: { title: '用户管理', icon: 'peoples' },
    children: [{
      path: 'userlist',
      name: 'userlist',
      component: () => import('@/views/dashboard/userlist/index.vue'),
      meta: { title: '用户列表', icon: 'component' }
    },
    {
      path: 'user',
      name: 'user',
      component: () => import('@/views/dashboard/userlist/index.vue')
    }]
  },

  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'example',
    meta: { title: '权限管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'table',
        name: 'table',
        component: () => import('@/views/table/index'),
        meta: { title: '角色列表', icon: 'component' }
      },
      {
        path: 'tree',
        name: 'tree',
        component: () => import('@/views/tree/index'),
        meta: { title: '权限列表', icon: 'component' }
      }
    ]
  },

  {
    path: '/commodity',
    component: Layout,
    redirect: '/commodity/commoditylist',
    name: 'commodity',
    meta: {
      title: '商品管理',
      icon: 'shopping'
    },
    children: [
      {
        path: 'commoditylist',
        name: 'commoditylist',
        component: () => import('@/views/commodity/commoditylist/index.vue'),
        meta: { title: '商品列表', icon: 'component' }

      },
      {
        path: '/parameter',
        name: '/parameter',
        component: () => import('@/views/commodity/parameter/index.vue'),
        meta: { title: '分类参数', icon: 'component' }
      },
      {
        path: '/classification',
        name: '/classification',
        component: () => import('@/views/commodity/classification/index.vue'),
        meta: { title: '商品分类', icon: 'component' }
      },
      {
        path: '/add',
        name: '/add',
        component: () => import('@/views/commodity/commoditylist/addCommodity/index.vue')
      }

    ]
  },

  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'nested',
    meta: {
      title: '订单管理',
      icon: 'money'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'menu1',
        meta: { title: '订单列表' }
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        name: 'menu2'
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
