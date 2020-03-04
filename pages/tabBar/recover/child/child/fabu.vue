<template>
	<view class="container-box" >
		<view class="text" style="color: #575757;">
			选择分类
		</view>
		<view class="uni-flex item-box">
			<view class="_itemtype" :class="activeindex===index?'active':''" v-for="(item, index) in  goodtypelist" :key="index" @tap="clickitem(index)" >
				{{item.name}}
			</view>
		</view>
		
		<view class="uni-flooter-box">
			<view class="checked-box">
				<checkbox :checked="ischeck" color="#E7211A" />
				<text style="color: #E7211A;">加急</text>
			</view>
			<view class="btn" :class="btnactive?'active':''" @tap="fabucur" >
				确认发布
			</view>
		</view>
		
		<view class="point-box">
			<icon type="warn" size="20" ></icon>
			<text style="margin-left: 10upx;">开通会员才能发布求购喔！钻石级别会员可加急</text>
		</view>
		
	</view>
</template>

<script>
	import { mapMutations,mapState } from 'vuex';
	export default {
		data() {
			return {
				activeindex: 0,
				ischeck: false,
				btnactive: true, // 如果不是vip 不能发布
			}
		},
		computed: {
			...mapState(['goodtypelist'])
		},
		methods: {
			clickitem(index) {
				this.activeindex = index;
			},
			fabucur() {
				let address = uni.getStorageSync('_location');
				this.api.home.realseRecovery({
					classify: this.goodtypelist[this.activeindex].name,
					urgent: this.ischeck ? 1 : 0,
					userId: getApp().globalData.userdata.userId,
					province: address.address.province,
					city: address.address.city,
					district: address.address.district,
					lat: ""+address.latitude,
					lng: ""+address.longitude,
				}).then(res => {
					uni.showModal({
						title: "提示",
						content: '发布成功',
						showCancel: false,
					});
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container-box {
		.item-box {
			flex-wrap: wrap;
		}
		.uni-flooter-box {
			margin-top: 100upx;
			display: flex;
			justify-content: flex-start;
			align-items: center;
			.checked-box {
				padding-left: 20upx;
			}
			.btn {
				margin-left: 50upx;
				width:  332upx;
				height: 100upx;
				line-height: 100upx;
				background:rgba(170,170,170,1);
				border-radius:8px;
				text-align: center;
				color: #fff;
				font-size: 38upx;
				&.active {
					background-color: #18C02C;
				}
			}
		}
		.point-box {
			text-align: center;
			display: flex;
			align-items: center;
			padding: 0 18%;
		}
	}
</style>
