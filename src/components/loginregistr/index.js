export default [
  {
    path: '/register/:id',//判断是否是活动注册 1是 2不是
    component:() =>
       import('./register.vue')
  },
  {
    path: '/registerSafety',
    component:() =>
      import('./registerSafety.vue')
  },
  {
    path: '/login/:id',//判断是否是活动登录 1是 2不是
    component:() =>
      import('./login.vue')
  },
  {
    path: '/forgotpassword',
    component:() =>
      import('./forgotpassword.vue')
  },
  {
    path: '/modifypassword',
    component:() =>
      import('./modifypassword.vue')
  },
  {
    path: '/changepassword',
    component:() =>
      import('./changepassword.vue')
  }
]
