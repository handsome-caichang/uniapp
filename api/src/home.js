import http from "../http/http.js"
export default {
	// gettest(params) {
	// 	return http.get(
	// 		'gettest', {
	// 			params: params
	// 		});
	// },
	sendVerificationCode(params) {
		return http.post(
			'user/sendVerificationCode',
			params
		);
	},
	login(params) {
		return http.post(
			'user/login',
			params
		);
	},
	getAdvertList(params) {
		return http.post(
			'advert/getAdvertList',
			params
		);
	},
	getClassify(params) {
		return http.get(
			'goods/getClassify',
			params
		);
	},
	getStarBillList(params) {
		return http.get(
			'bill/getStarBillList',
			params
		);
	},
	getBillList(params) {
		return http.get(
			'bill/getBillList',
			params
		);
	},
	checkIn(params) {
		return http.post(
			'check/checkIn',
			params
		);
	},
	depositToMoney(params) {
		return http.post(
			'wallet/depositToMoney',
			params
		);
	},
	payDeposit(params) {
		return http.post(
			'wallet/payDeposit',
			params
		);
	},
	getWealth(params) {
		return http.get(
			'wallet/getWealth',
			params
		);
	},
	getCashMoney(params) {
		return http.get(
			'wallet/getCashMoney',
			params
		);
	},
	searchPriceByArea(params){
		return http.get(
			'goods/searchPriceByArea',
			params
		);
	},
	realseRecovery(params){
		return http.post(
			'recovery/realseRecovery',
			params
		);
	},
	realseGoods(params){
		return http.post(
			'realse/realseGoods',
			params
		);
	},
	getAppVersion(params) {
		return http.get(
			'system/getAppVersion',
			params
		);
	},
	modifyPassword(params) {
		return http.post(
			'user/modifyPassword',
			params
		);
	},
	modifyUser(params) {
		return http.post(
			'user/modifyUser',
			params
		);
	},
	forgetPassword(params) {
		return http.post(
			'user/forgetPassword',
			params
		);
	},
	forgetPayPassword(params) {
		return http.post(
			'user/forgetPayPassword',
			params
		);
	},
	getVipList(params) {
		return http.get(
			'advert/getVipList',
			params
		);
	},
	getNoticeList(params) {
		return http.get(
			'advert/getNoticeList',
			params
		);
	},
	getIndustryInformationList(params) {
		return http.get(
			'advert/getIndustryInformationList',
			params
		);
	},
	getRealseSellInfo(params) {
		return http.get(
			'user/getRealseSellInfo',
			params
		);
	},
	getProvinceList(params) {
		return http.get(
			'city/getProvinceList',
			params
		);
	},
	getCityListByProvince(params) {
		return http.get(
			'city/getCityListByProvince',
			params
		);
	},
	goodsRecommend(params) {
		return http.get(
			'recovery/goodsRecommend',
			params
		);
	},
	getRealseGoodsList(params) {
		return http.get(
			'realse/getRealseGoodsList',
			params
		);
	},
	
}
