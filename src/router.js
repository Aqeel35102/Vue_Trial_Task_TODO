import { createRouter, createWebHistory } from 'vue-router';
// import the component's
import todoList from './components/todoList.vue'
import welcomePage from './components/welcomePage.vue'
import loginPage from './components/loginPage.vue'
import registerPage from './components/registerPage.vue'
import addTodo from './components/addTodo.vue'
import updateTodo from './components/updateTodo.vue'
import store from "./store"



const routes = [
  {
    path: '/',
    component: welcomePage
  },
  {
    path: '/login',
    component: loginPage,
  },
  {
    path: '/register',
    component: registerPage,

  },
  {
    path: '/todo',
    component: todoList,
    meta: {requireAuth: true}
  },
  {
    path: '/addTodo',
    component: addTodo,
    meta: {requireAuth: true}
  },
  {
    path: '/updateTodo/:id',
    component: updateTodo,
    meta: {requireAuth: true}
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  //check if user is logged in?
  if (to.meta.requireAuth && !store.getters['loginModule/isLogged']) {

    next('/login');
  } else if ((to.path === '/login' || to.path === '/register') && store.getters['loginModule/isLogged']) {

    next('/todo');
  }else {
    
    next();
  }
});


export default router;
