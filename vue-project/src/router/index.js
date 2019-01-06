import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home/index.vue'
import login from '@/components/login/index.vue'
import manage_info_approve from '@/components/manage_info_approve/index.vue'
import manage_good_approve from '@/components/manage_good_approve/index.vue'
import manage_user from '@/components/manage_user/index.vue'
import user_feedback from '@/components/user_feedback/index.vue'
import manage_good_manage from '@/components/manage_good_manage/index.vue'
import manage_info_manage from '@/components/manage_info_manage/index.vue'


Vue.use(Router)

export default new Router({
  // mode: 'history',
	base: '/vue-project',
  routes: [
    {
      path: '*',
      component: home
    },
    {
      path: '/',
      name: 'home',
      component: resolve => require(['@/components/home/index.vue'],resolve),
      children: [{
        path: '/adminpage/login',
        name: 'adminpage/login',
        component: login // 登录页面
      },{
        path: '/manage_info_approve',
        name: 'manage_info_approve',
        component: manage_info_approve // 信息
      },{
        path: '/manage_good_approve',
        name: 'manage_good_approve',
        component: manage_good_approve // 商品审批
      },{
        path: '/manage_good_manage',
        name: 'manage_good_manage',
        component: manage_good_manage // 商品审批
      },{
        path: '/manage_info_manage',
        name: 'manage_info_manage',
        component: manage_info_manage // 商品审批
      },{
        path: '/manage_user',
        name: 'manage_user',
        component: manage_user // 用户管理
      },{
        path: '/user_feedback',
        name: 'user_feedback',
        component: user_feedback // 用户反馈
      }]
    }
  ]
})
