<script>

export default {
	globalData: {  
		userdata: {},
		address: {},
		webviewlink: "",
		customerdata: {},
		productdetail: {},
		orderdetail: {},
		malldetail: {},
		userlistmanage: {},
		examineres: {},
		payorderdetail: {},
	},  
	created() {
		// #ifdef APP-PLUS
		plus.navigator.closeSplashscreen(); 
		const _handlePush = function(message) {
			console.log(message)
		};
		plus.push.addEventListener('click', function(message) {
			// plus.nativeUI.toast('push click');
			_handlePush(message);
		});
		plus.push.addEventListener('receive', function(message) {
			// plus.nativeUI.toast('push receive');
			_handlePush(message);
		});
		// #endif 
	},
	onLaunch: function() {
		// #ifdef APP-PLUS
		
		// #endif
		let userdata = uni.getStorageSync('userdata');
		if (!userdata) {
			uni.reLaunch({
				url: '/pages/login/login'
			})
		}else {
			// this.api.home.getRecoveryInfo({
			// 	userId: userdata.userId
			// }).then(res => {
				this.globalData.userdata = userdata;
			// })
		}
	},
	onShow: function() {},
	onHide: function() {},
	methods: {}
};
</script>

<style lang="scss">
/* #ifndef APP-PLUS-NVUE */
	@import '/static/css/uni.css';
	@import '/static/css/iconfont.css';
	@import '/static/css/common.scss';
	uni-page-body, uni-page-refresh {
		height: 100%;
	}
	.header-page-body {
		height: 100%;
	}
/* #endif*/
</style>
                   