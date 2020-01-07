<script>
export default {
	created() {
		// #ifdef APP-PLUS
		plus.navigator.closeSplashscreen(); 
		// #endif 
	},
	onLaunch: function() {
		let userdata = uni.getStorageSync('userdata');
		if (!userdata) {
			uni.reLaunch({
				url: '/pages/login/login'
			})
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
	@import '/static/css/common.scss';
/* #endif*/
</style>
