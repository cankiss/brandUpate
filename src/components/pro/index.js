export default [{
        path: '/pro',
        component: () =>
            import ('./pro.vue'),
        redirect: "/pro/yxlist",
        children: [{
                path: 'ztlist',
                component: () =>
                    import ('./list/yxlist.vue')
            },
            {
                path: 'yxlist',
                component: () =>
                    import ('./list/yxlist.vue')
            },
            {
                path: 'sblist',
                component: () =>
                    import ('./list/sblist.vue')
            }

        ]
    },
    {
        path: '/pro/ztDetail/:param/:id',
        component: () =>
            import ('./detail/biaoDetail.vue'),
    },
    {
        path: '/pro/proDetail/:param/:id',
        component: () =>
            import ('./detail/biaoDetail.vue'),
    },
    {
        path: '/pro/sbDetail/:param/:id',
        component: () =>
            import ('./detail/biaoDetail.vue'),
    },
    {
        path: '/pro/detail/',
        name: 'detailDesc',
        component: () =>
            import ('./detail/detailDesc.vue'),
        children: [{
                path: 'introduce/:id/:type/:name', //type=1是智投，=2是亿宝优选，=3是散标
                component: () =>
                    import ('./detail/proIntroduce.vue')
            },
            {
                path: 'record/:id/:type/:name',
                component: () =>
                    import ('./detail/proRecord.vue')
            },
            {
                path: 'detail/:id/:type/:name',
                component: () =>
                    import ('./detail/proItemDetail.vue')
            },
            {
                path: 'question/:id/:type/:name',
                component: () =>
                    import ('./detail/proQuestionList.vue')
            },
            {
                path: 'prosb/:id/:type/:name',
                component: () =>
                    import ('./detail/prosb.vue')

            },
            {
                path: 'sb/detail/:id/:type/:name/:bnid',
                component: () =>
                    import ('./detail/sbItemDetail.vue')
            }

        ]
    },
    {
        path: '/pro/invest/:id/:type',
        meta: { requiresAuth: true },
        component: () =>
            import ('./invest/invest.vue')

    },
    {
        path: '/pro/investSuccess',
        component: () =>
            import ('./invest/investSuccess.vue'),
        meta: {
            requiresAuth: true
        }

    },
    {
        path: '/pro/checkCoupon/:id/:amount/:profit/:type',
        component: () =>
            import ('./invest/checkCoupon.vue'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/pro/cashRule/:id',
        component: () =>
            import ('./detail/cashRule.vue')

    }
]