export default [{
  path: '/wechat/check',
  component: () =>
    import ('./check.vue')
}, {
  path: '/wechat/callback',
  component: () =>
    import ('./callback.vue')
}, {
  path: '/wechat/unbind',
  component: () =>
    import ('./unbind.vue')
}]
