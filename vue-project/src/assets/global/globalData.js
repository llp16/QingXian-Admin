var basePageInfo = {
	// 导航条
	asideList: [
		{ link: '/manage_good_approve', item: '物品交易管理' },
		{	link: '/manage_info_approve', item: '信息共享管理'},
		{	link: '/manage_user', item: '用户管理'},
		{	link: '/user_feedback', item: '用户反馈'}
	],

	// getIntoUserPage: false,
	goodData: [{
			label: null,
			category: null,
			title: null,
			price: null,
			content: null,
			user_contact: null,
			nickname: null,
			user_id: null,
			pics: {}
		},
	],
}
// 输出
export default {
  basePageInfo
}
