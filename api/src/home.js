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
	getSellUserGoodsList(params) {
		return http.get(
			'recovery/getSellUserGoodsList',
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
	getIndustryInformationClassify(params) {
		return http.get(
			'advert/getIndustryInformationClassify',
			params
		);
	},
	getRecoveryInfo(params) {
		return http.get(
			'user/getRecoveryInfo',
			params
		);
	},
	recoveryAddMatching(params) {
		return http.post(
			'recovery/addMatching',
			params
		);
	},
	realseAddMatching(params) {
		return http.post(
			'realse/addMatching',
			params
		);
	},
	getRealseGoodsInfo(params) {
		return http.get(
			'recovery/getRealseGoodsInfo',
			params
		);
	},
	getApplyMatchList(params) {
		return http.get(
			'realse/getApplyMatchList',
			params
		);
	},
	getReceivedMatchList(params) {
		return http.get(
			'realse/getReceivedMatchList',
			params
		);
	},
	sureMatching(params) {
		return http.post(
			'realse/sureMatching',
			params
		);
	},
	cancelMatching(params) {
		return http.post(
			'realse/cancelMatching',
			params
		);
	},
	recoverygetApplyMatchList(params) {
		return http.get(
			'recovery/getApplyMatchList',
			params
		);
	},
	recoverygetReceivedMatchList(params) {
		return http.get(
			'recovery/getReceivedMatchList',
			params
		);
	},
	getMatchSuccessList(params) {
		return http.get(
			'realse/getMatchSuccessList',
			params
		);
	},
	recoverygetMatchSuccessList(params) {
		return http.get(
			'recovery/getMatchSuccessList',
			params
		);
	},
	recoverysureMatching(params) {
		return http.post(
			'recovery/sureMatching',
			params
		);
	},
	recoverycancelMatching(params) {
		return http.post(
			'recovery/cancelMatching',
			params
		);
	},
	getRecommendRecoverUserList(params) {
		return http.get(
			'realse/getRecommendRecoverUserList',
			params
		);
	},
	getRealseList(params) {
		return http.get(
			'realse/getRealseList',
			params
		);
	},
	cancelRealse(params) {
		return http.post(
			'realse/cancelRealse',
			params
		);
	},
	getRecoveryList(params) {
		return http.get(
			'recovery/getRecoveryList',
			params
		);
	},
	delRecovery(params) {
		return http.post(
			'recovery/delRecovery',
			params
		);
	},
	urgentRecovery(params) {
		return http.post(
			'recovery/urgentRecovery',
			params
		);
	},
	cancelUrgentRecovery(params) {
		return http.post(
			'recovery/cancelUrgentRecovery',
			params
		);
	},
}
