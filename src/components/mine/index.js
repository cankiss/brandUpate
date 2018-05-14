let routers = [{
        path: "/mine",
        meta: { requiresAuth: false },
        component: () =>
            import ("./homePage")
    },
    {
        path: "/mine/setup",
        component: () =>
            import ("./accountSetup")
    },
    {
        path: "/mine/setup/bankCard",
        component: () =>
            import ("./accountSetup/children/bankCard")
    },
    {
        path: "/mine/setup/unBindCardExplain",
        meta: { requiresAuth: false },
        component: () =>
            import ("./accountSetup/children/unBindCardExplain")
    },
    {
        path: "/mine/setup/payPwdSet/:type",
        component: () =>
            import ("./accountSetup/children/payPwdSet")
    },
    {
        path: "/mine/setup/withoutPwdPay",
        component: () =>
            import ("./accountSetup/children/withoutPwdPay")
    },
    {
        path: "/mine/setup/deliveryAddress/:id",
        component: () =>
            import ("./accountSetup/children/deliveryAddress")
    },
    {
        path: "/mine/setup/manageAddress",
        component: () =>
            import ("./accountSetup/children/manageAddress")
    },
    {
        path: "/mine/setup/userAuth",
        component: () =>
            import ("./accountSetup/userAuth")
    },
    {
        path: "/mine/setup/easyRecharge",
        component: () =>
            import ("./accountSetup/easyRecharge")
    },
    {
      path: "/mine/setup/bankOpenAccount",
      component: () =>
        import ("./accountSetup/bankOpenAccount")
    },
    {
        path: "/mine/withdraw",
        component: () =>
            import ("./withdrawRecharge/withdraw")
    },
    {
        path: "/mine/withdrawRecharge/record/:type",
        name: "Record",
        component: () =>
            import ("./withdrawRecharge/children/record")
    },
    {
        path: "/mine/withdraw/explain",
        name: "withdrawExplain",
        component: () =>
            import ("./withdrawRecharge/children/withdrawExplain")
    },
    {
        path: "/mine/recharge",
        component: () =>
            import ("./withdrawRecharge/recharge")
    },
    {
        path: "/mine/invest",
        redirect: "/mine/invest/zhitou",
        children: [{
                path: "zhitou",
                name: "zhitou",
                component: () =>
                    import ("./investDetail/zhitouCom")
            },
            {
                path: "optimization",
                name: "opti",
                component: () =>
                    import ("./investDetail/optiCom")
            },
            {
                path: "sanbiao",
                name: "sanbiao",
                component: () =>
                    import ("./investDetail/sanBiao")
            }
        ],
        component: () =>
            import ("./investDetail")
    },
    {
        path: "/mine/invest/zhitou/exitZhitou/:nid/:name",
        name: "exitZhitou",
        component: () =>
            import ("./investDetail/children/exitZhitou.vue")
    },
    {
        path: "/mine/invest/optimization/optiDetail/:detail",
        name: "optiDetail",
        component: () =>
            import ("./investDetail/children/optiDetail")
    },
    {
        path: "/mine/invest/sanbiao/returnMoney/:borrowNid/:borrowInvestId",
        component: () =>
            import ("./investDetail/children/returnMoney")
    },
    {
        path: "/mine/overview",
        component: () =>
            import ("./accountOverview")
    },
    {
        path: "/mine/record",
        component: () =>
            import ("./accountRecord")
    },
    {
        path: "/mine/secretary",
        component: () =>
            import ("./investSecretary")
    },
    {
        path: "/mine/secretary/setup",
        name: "autoInvest",
        component: () =>
            import ("./investSecretary/setup")
    },
    {
        path: "/mine/secretary/explain",
        meta: { requiresAuth: false },
        name: "explain",
        component: () =>
            import ("./investSecretary/explain")
    },
    {
        path: "/mine/invite",
        component: () =>
            import ("./invitationRecord"),
        redirect: "/mine/invite/inviteRecord",
        children: [{
                path: "inviteRecord",
                name: "invite",
                component: () =>
                    import ("./invitationRecord/inviteRecord")
            },
            {
                path: "investRecord",
                name: "invest",
                component: () =>
                    import ("./invitationRecord/investRecord")
            }
        ]
    },
    {
        path: "/mine/myCoupon",
        component: () =>
            import ("./myCoupon"),
        redirect: "/mine/myCoupon/unuse",
        children: [{
                path: "unuse",
                component: () =>
                    import ("./myCoupon/noUsedCoupon.vue")
            },
            {
                path: "used",
                component: () =>
                    import ("./myCoupon/haveUsedCoupon.vue")
            },
            {
                path: "overTime",
                component: () =>
                    import ("./myCoupon/overTimeCoupon.vue")
            }
        ]
    }
];


export default routers.map(
    item =>
    !item.meta ? Object.assign(item, { meta: { requiresAuth: true } }) : item
);
