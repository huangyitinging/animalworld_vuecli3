import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '*',
      redirect: '/'
    },
    {
      name: 'Login',
      path: '/login',
      component: () => import('./views/Login.vue')
    },
    {
      name: 'Dashboard',
      path: '/admin',
      component: () => import('./components/Dashboard.vue'),
      children: [
        {
          name: 'Products',
          path: 'products',
          component: () => import('./views/Products.vue'),
          meta: { requiresAuth: true }
        },
        {
          name: 'CreateCoupon',
          path: 'createcoupon',
          component: () => import('./views/CreateCoupon.vue'),
          meta: { requiresAuth: true }
        },
        {
          name: 'OrderList',
          path: 'orderlist',
          component: () => import('./views/OrderList.vue'),
          meta: { requiresAuth: true }
        }
      ]
    },
    {
      path: '/',
      component: () => import('./components/NavbarFront.vue'),
      children: [
        {
          name: 'Index',
          path: '/',
          component: () => import('./components/Index.vue')
        },
        {
          name: 'PetProduct',
          path: 'petproduct',
          component: () => import('./views/PetProduct.vue')
        },
        {
          name: 'Coupon',
          path: 'coupon',
          component: () => import('./views/Coupon.vue')
        },
        {
          name: 'Product',
          path: 'product/:id',
          component: () => import('./views/Product.vue')
        },
        {
          name: 'ShoppingCart',
          path: 'shoppingcart',
          component: () => import('./views/ShoppingCart.vue')
        },
        {
          name: 'Checkout',
          path: 'checkout',
          component: () => import('./views/Checkout.vue')
        },
        {
          name: 'Order',
          path: 'order/:orderId',
          component: () => import('./views/Order.vue')
        },
        {
          name: 'CustomerOrders',
          path: 'customer_order',
          component: () => import('./views/CustomerOrders.vue')
        },
        {
          name: 'CustomerCheckout',
          path: 'customer_checkout/:orderId',
          component: () => import('./views/CustomerCheckout.vue')
        }
      ]
    }

  ]
})
