export default {
    setlocation(state, userName) {
        state.location = location;
    },
    logout(state) {
        state.userName = "";
        state.hasLogin = false;
    },
	setuserInfo(state, data) {
		state.userInfo = Object.assign(state.userInfo, data);
	},
	setProvinceList(state, data) {
		state.ProvinceList = data;
	},
	setgoodtypelist(state, data) {
		state.goodtypelist = data;
	},
	logintest(state, provider) {
		state.hasLogin = true;
		state.loginProvider = provider;
	},
	setWeixindata(state, weixindata) {
		state.weixindata = weixindata
	},
}