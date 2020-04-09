<template>
	<view class="container">
		<view class="user-section">
			<image class="bg" src="/static/img/user-bg.jpg"></image>
			<view class="user-info-box">
				<view class="portrait-box" @tap="navTo('/pages/user/userinfo/userinfo')">
					<image class="portrait" :src="userdata.headImage"></image>
				</view>
				<view class="info-box">
					<text class="username" style="color: #18C02C;">{{userdata.nickName}}</text>
				</view>
			</view>
			<view class="vip-card-box">
				<image class="card-bg" src="/static/img/vip-card-bg.png" mode=""></image>
				<view class="b-btn"  @tap="navTo('/pages/user/vipsend')" v-if="userdata.isVip == 0">
					立即开通
				</view>
				<view class="b-btn"  @tap="navTo('/pages/user/vipsend')" v-if="userdata.isVip == 1">
					续费VIP
				</view>
				<view class="tit" style="margin-top: 20upx;margin-left: 20upx;" v-if="userdata.isVip == 0">
					<text class="iconfont iconjiaoyi"></text>
					Recovery Station  会员  
				</view>
				<view class="tit" style="margin-top: 20upx;margin-left: 20upx;" v-if="userdata.isVip == 1">
					<text class="iconfont iconjiaoyi"></text>
					Recovery Station {{userdata.vipLevel == 0 ? '黄金' : "钻石"}} 会员  
				</view>
			</view>
		</view>

		<view class="cover-container" :style="[{
				transform: coverTransform,
				transition: coverTransition
			}]"
		 @touchstart="coverTouchstart" @touchmove="coverTouchmove" @touchend="coverTouchend">
			<image class="arc" src="/static/img/arc.png"></image>
			
			<view class="border-bottom c-item">
				<view class="c-title">
					个人中心 
				</view>
				<view class="c-list-box">
					<view class="c-list-item" v-for="(item, index) in list1 " :key="index" @tap="geren(item)" >
						<image :src="item.icon" class="img-icon" ></image>
						<text class="text">{{item.name}}</text>
					</view>
				</view>
			</view>
			<view class="border-bottom c-item">
				<view class="c-title">
					订单管理  
				</view>
				<view class="c-list-box">
					<view class="c-list-item" v-for="(item, index) in list2 " :key="index" @tap="geren(item)" style="width: 300upx;" >
						<image :src="item.icon" class="img-icon" ></image>
						<text class="text">{{item.name}}</text>
					</view>
				</view>
			</view>
			<view class="border-bottom c-item">
				<view class="c-title">
					财务管理  
				</view>
				<view class="c-list-box">
					<view class="c-list-item" v-for="(item, index) in list3 " :key="index" @tap="geren(item)" >
						<image :src="item.icon" class="img-icon" ></image>
						<text class="text">{{item.name}}</text>
					</view>
				</view>
			</view>
			<view class="c-item">
				<view class="c-title">
					工具 
				</view>
				<view class="c-list-box">
					<view class="c-list-item" v-for="(item, index) in list4 " :key="index"  @tap="geren(item)"  >
						<image :src="item.icon" class="img-icon" ></image>
						<text class="text">{{item.name}}</text>
					</view>
				</view>
			</view>
			
			<view class="fo-box" style="margin-top: 20upx;text-align: center;">
				<text class="text" style="color: #1F96F7;">意见反馈 | 联系客服</text>
			</view>
			
		</view>
	</view>


	</view>
</template>
<script>
	import {
		mapState
	} from 'vuex';
	let startY = 0,
		moveY = 0,
		pageAtTop = true;
	export default {
		components: {
		},
		data() {
			return {
				coverTransform: 'translateY(0px)',
				coverTransition: '0s',
				moving: false,
				userdata: {},
				list1: [
					{
						name: '余额',
						icon: '/static/img/user/yue.png',
						url: '/pages/user/moneybag/mbag'
					},{
						name: '信誉值',
						icon: '/static/img/user/xinyu.png',
						url: '/pages/user/reputationvalue'
					},{
						name: '废品帮VIP',
						icon: '/static/img/user/VIP.png',
						url: '/pages/user/vipsend'
					},{
						name: '我的成就',
						icon: '/static/img/user/chengjiu.png'
					},{
						name: '我的发布',
						icon: '/static/img/user/fabu.png',
						url: '/pages/customer/fabumanage/fabumanage'
					}
				],
				list2: [
					{
						name: '匹配订单管理',
						icon: '/static/img/user/dingdan.png',
						url: '/pages/product/order/ordermanage'
					},{
						name: '交易订单管理',
						icon: '/static/img/user/jiaoyi.png',
						url: '/pages/product/payorder/payordermanage'
					}
				],
				list3: [
					{
						name: '财务报表',
						icon: '/static/img/user/caiwu.png',
						// url: '/pages/report/report'
					},{
						name: '余额宝',
						icon: '/static/img/user/yuebao.png'
					},{
						name: '卡包',
						icon: '/static/img/user/kabao.png'
					}
				],
				list4: [
					{
						name: '计算器',
						icon: '/static/img/user/jisuanqi.png',
						url: '/pages/tool/calc'
					},{
						name: '万年历',
						icon: '/static/img/user/rili.png',
						url: '/pages/tool/calendar'
					},{
						name: '备忘录',
						icon: '/static/img/user/beiwanglu.png',
						url: '/pages/tool/beiwang'
					}
				],
			}
		},
		created() {
			this._updateuserhome();
			uni.$on('_updatehome',function(data){
				this._updateuserhome();
			})
		},
		onNavigationBarButtonTap(e) {
			const index = e.index;
			console.log(index)
			if (index === 0) {
				uni.navigateTo({
					url: '/pages/user/set'
				})
			} else if (index === 1) {
				// const pages = getCurrentPages();
				// const page = pages[pages.length - 1];
				// const currentWebview = page.$getAppWebview();
				// currentWebview.hideTitleNViewButtonRedDot({
				// 	index
				// });
				uni.navigateTo({
					url: '/pages/user/notice'
				})
			}
		},
		computed: {
		},
		methods: {
			_updateuserhome() {
				this.userdata = getApp().globalData.userdata;
			},
			geren(item) {
				if (item.url) {
					uni.navigateTo({
						url: item.url
					})
				}else {
					uni.showModal({
						title: "提示",
						content: item.name + '此功能暂未开发，敬请期待',
						showCancel: false,
					});
				}
			},
			navTo(url) {
				uni.navigateTo({
					url: url
				})
			},
			coverTouchstart(e) {
				if (pageAtTop === false) {
					return;
				}
				this.coverTransition = 'transform .1s linear';
				startY = e.touches[0].clientY;
			},
			coverTouchmove(e) {
				moveY = e.touches[0].clientY;
				let moveDistance = moveY - startY;
				if (moveDistance < 0) {
					this.moving = false;
					return;
				}
				this.moving = true;
				if (moveDistance >= 80 && moveDistance < 100) {
					moveDistance = 80;
				}

				if (moveDistance > 0 && moveDistance <= 80) {
					this.coverTransform = `translateY(${moveDistance}px)`;
				}
			},
			coverTouchend() {
				if (this.moving === false) {
					return;
				}
				this.moving = false;
				this.coverTransition = 'transform 0.3s cubic-bezier(.21,1.93,.53,.64)';
				this.coverTransform = 'translateY(0px)';
			}
			
			
		}
	}
</script>
<style lang='scss'>
	%flex-center {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	%section {
		display: flex;
		justify-content: space-around;
		align-content: center;
		background: #fff;
		border-radius: 10upx;
	}

	.user-section {
		height: 520upx;
		padding: 100upx 30upx 0;
		position: relative;

		.bg {
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			filter: blur(1px);
			opacity: .7;
		}
	}

	.user-info-box {
		height: 180upx;
		display: flex;
		align-items: center;
		position: relative;
		z-index: 1;

		.portrait {
			width: 130upx;
			height: 130upx;
			border: 5upx solid #fff;
			border-radius: 50%;
		}

		.username {
			font-size:34upx;
			color: #FFFFFF;
			margin-left: 20upx;
		}
	}

	.vip-card-box {
		display: flex;
		flex-direction: column;
		color: #f7d680;
		height: 240upx;
		background: linear-gradient(left, rgba(0, 0, 0, .7), rgba(0, 0, 0, .8));
		border-radius: 16upx 16upx 0 0;
		overflow: hidden;
		position: relative;
		padding: 20upx 24upx;

		.card-bg {
			position: absolute;
			top: 20upx;
			right: 0;
			width: 380upx;
			height: 260upx;
		}

		.b-btn {
			position: absolute;
			right: 20upx;
			top: 16upx;
			width: 132upx;
			height: 40upx;
			text-align: center;
			line-height: 40upx;
			font-size: 22upx;
			color: #36343c;
			border-radius: 20px;
			background: linear-gradient(left, #f9e6af, #ffd465);
			z-index: 1;
		}

		.tit {
			font-size: $font-base+2upx;
			color: #f7d680;
			margin-bottom: 28upx;

			.iconfont {
				color: #f6e5a3;
				margin-right: 16upx;
			}
		}

		.e-b {
			font-size: $font-sm;
			color: #d8cba9;
			margin-top: 10upx;
		}
	}

	.cover-container {
		margin-top: -150upx;
		position: relative;
		background: #f5f5f5;
		padding-bottom: 20upx;
		background-color: #FFFFFF;
		.arc {
			position: absolute;
			left: 0;
			top: -34upx;
			width: 100%;
			height: 36upx;
		}
	}

	.c-item {
		padding: 20upx 30upx;
		.c-title {
			color: #212121;
			font-size: 34upx;
		}
		.c-list-box {
			display: flex;
			flex-wrap: wrap;
			.c-list-item {
				width: 150upx;
				height: 100upx;
				margin-top: 20upx;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: space-between;
				.img-icon {
					width: 44upx;
					height: 44upx;
					border-radius: 50%;
				}
				.text {
					color: #575757;
				}
			}
		}
	}
	
</style>
