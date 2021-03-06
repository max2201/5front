import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld.vue';
import Login from '@/components/Login.vue';
import Register from '@/components/Register.vue';
import UserBoard from '@/components/UserBoard.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        guest: true,
      },
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: {
        guest: true,
      },
    },
    {
      path: '/userboard',
      name: 'userboard',
      component: UserBoard,
      meta: {
        requiresAuth: true,
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem('jwt') == null) {
      next({
        path: '/login',
        params: { nextUrl: to.fullPath },
      });
    } else {
      const user = JSON.parse(localStorage.getItem('user'));
      next({ name: 'userboard' });
    }
  } else if (to.matched.some(record => record.meta.guest)) {
    if (localStorage.getItem('jwt') == null) {
      next();
    } else {
      next({ name: 'userboard' });
    }
  } else {
    next();
  }
});

export default router;
