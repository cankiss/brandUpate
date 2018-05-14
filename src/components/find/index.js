export default [{
	path: '/find',
	component: () =>
		import('./find.vue')
}, {
	path: '/find/aboutAPP',
	component: () =>
		import('./aboutAPP/aboutAPP.vue')
}, {
	path: '/find/customerService',
	component: () =>
		import('./customerService/customerService.vue')
}, {
	path: '/find/lectureRoom',
	component: () =>
		import('./lectureRoom/lectureRoom.vue')
}, {
	path: '/find/lectureRoom/secretary',
	component: () =>
		import('./lectureRoom/secretary.vue')
}, {
	path: '/find/lectureRoom/intelligence',
	component: () =>
		import('./lectureRoom/intelligence.vue')
}, {
	path: '/find/lectureRoom/preferred',
	component: () =>
		import('./lectureRoom/preferred.vue')
}, {
	path: '/find/lectureRoom/upgrade',
	component: () =>
		import('./lectureRoom/upgrade.vue')
}, {
	path: '/find/help/bankQuota',
	component: () =>
		import('./help/bankQuota.vue')
}, {
	path: '/find/help/:tabName',
	component: () =>
		import('./help/help.vue')
}, {
	path: '/find/help/:tabName/:helpId',
	component: () =>
		import('./help/helpDetail.vue')
}, {
	path: '/find/suggest',
	meta: {
		requiresAuth: true
	},
	component: () =>
		import('./suggest/suggest.vue')
}, {
	path: '/find/wechat',
	component: () =>
		import('./wechat/wechat.vue')
}, {
	path: '/find/memberClub',
	meta: {
		requiresAuth: true
	},
	component: () =>
		import('./memberClub/memberClub.vue'),
	redirect: '/find/memberClub/memberright',
	children: [{
			name: 'growsystem',
			path: "growsystem",
			component: () =>
				import('./memberClub/growsystem.vue')
		},
		{
			name: 'memberright',
			path: 'memberright',
			component: () =>
				import('./memberClub/memberRight.vue')
		}
	]
}, {
	path: '/find/memberClub/grade',
	meta: {
		requiresAuth: true
	},
	component: () =>
		import('./memberClub/memberGrade.vue')
}, {
	path: '/find/memberClub/detail',
	meta: {
		requiresAuth: true
	},
	component: () =>
		import('./memberClub/memberDetail.vue')
}]
