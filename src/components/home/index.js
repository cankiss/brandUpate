import company from "./inform/company.vue"; //公司简介
import formdata from "./inform/formData.vue"; //平台数据
import riskSystem from "./inform/riskSystem.vue"; //风险体系
import report from "./inform/report"; //运营报告
import annment from "./inform/announcement.vue"; //平台公告
import laws from "./inform/laws.vue"; //法律法规
export default [{
        path: '/',
        component: () =>
            import ('./home.vue')
    },
    {
        path: '/home/systemList',
        component: () =>
            import ('./systemNot/systemList.vue')
    },
    {
        path: '/home/systemInfo/:columncode/:id',
        component: () =>
            import ('./systemNot/systemInfo.vue')
    },
    {
        path: '/home/invitFriend/:backtype', //1是首页，2是发现
        meta: {requiresAuth: true},
        component: () =>
            import ('../common/invitFriend.vue')
    },
    {
        path: '/home/inform',
        component: () =>
            import ('./inform/inform.vue'),
        redirect: '/home/inform/company',
        children: [
            { name: 'company', path: 'company', component: company },
            { name: 'formdata', path: 'formdata', component: formdata },
            { name: 'riskSystem', path: 'riskSystem', component: riskSystem },
            { name: 'report', path: 'report', component: report },
            { name: 'annment', path: 'annment', component: annment },
            { name: 'laws', path: 'laws', component: laws }
        ]
    },
    {
        path: '/home/inform/ifream/:url',
        component: () =>
            import ('./inform/ifream.vue')
    }
]
