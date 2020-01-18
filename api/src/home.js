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
}
