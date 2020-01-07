import http from "../http/http.js"
export default {
	gettest(params) {
		return http.get(
			'gettest', {
				params: params
			});
	},
	getgrouplist(params) {
		return http.post(
			'getgrouplist',
			params
		);
	},
}
