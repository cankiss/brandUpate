export default [{
	path: '/newUser',//新手福利首页
	component: () =>
		import('./newUser.vue')
}, {
	path: '/exCash',//我的体验金
	meta: {requiresAuth: true},
	component: () =>
		import('./exCash.vue')
}, {
	path: '/usageRules',
	component: () =>
		import('./usageRules.vue')
}, {
	path: '/usageProtocol',
	component: () =>
		import('./usageProtocol.vue')
}, {
	path: '/cash-rules',
	component: () =>
		import('./usageRules.vue')
}, {
	path: '/lendSuccess',
	component: () =>
		import('./lendSuccess.vue')
}]