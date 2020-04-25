import http from "../http/http.js"
export default {
	sellUserWriteOrder(params) {
		return http.post(
			'order/sellUserWriteOrder',
			params
		);
	},
	buyUserWriteOrder(params) {
		return http.post(
			'order/buyUserWriteOrder',
			params
		);
	},
	getOrderList(params) {
		return http.get(
			'order/getOrderList',
			params
		);
	},
	getBuyOrderList(params) {
		return http.get(
			'order/getBuyOrderList',
			params
		);
	},
	getSellOrderList(params) {
		return http.get(
			'order/getSellOrderList',
			params
		);
	},
	payMsgFee(params) {
		return http.post(
			'order/payMsgFee',
			params
		);
	},
	getSellUserContact(params) {
		return http.get(
			'order/getSellUserContact',
			params
		);
	},
	calCommission(params) {
		return http.get(
			'order/calCommission',
			params
		);
	},
	calEncourage(params) {
		return http.get(
			'order/calEncourage',
			params
		);
	},
	getOrderInfo(params) {
		return http.get(
			'order/getOrderInfo',
			params
		);
	},
	
}