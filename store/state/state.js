// 数据相关
const DataState = {
    
    // 用户基本信息
    userInfo: {},
	ProvinceList: [], // 省份
	goodtypelist: [], // 类型
	
	forcedLogin: true,
	hasLogin: false,
	userName: "",
	typelist: [
		{
			text: '钢铁',
		},{
			text: '钢铁',
		},{
			text: '钢铁',
		},{
			text: '钢铁',
		},
	],
	location: {} // 位置
	
};
// UI界面展示相关
const UIState = {
    // app是否启动完成
    appInited: false,

	hasLogin: false,
	loginProvider: "",
	weixindata: null,

    // 控制app.vue页面里的'full-block'是否显示;
    // serverBlock: false,

    // 是否要展示欢迎页
    // showWelcome: false

}


const state = {
    ...DataState,
    ...UIState
}

export default state