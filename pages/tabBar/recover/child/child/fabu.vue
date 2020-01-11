<template>
	<view class="container-box" >
		<view class="text" style="color: #575757;">
			选择分类
		</view>
		<view class="uni-flex item-box">
			<view class="_itemtype" :class="activeindex===index?'active':''" v-for="(item, index) in  list" :key="index" @tap="clickitem(index)" >
				{{item}}
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
	export default {
		data() {
			return {
				list: [
					'紫铜',
					'电线电缆',
					'黄铜',
					'电线废料',
					'供电局废料',
					'紫铜',
					'电线电缆',
					'黄铜',
					'电线废料',
					'供电局废料',
					'紫铜',
					'电线电缆',
					'黄铜',
					'电线废料',
					'供电局废料',
					'紫铜',
					'电线电缆',
					'黄铜',
					'电线废料',
					'供电局废料'
				],
				activeindex: 0,
				ischeck: false,
				btnactive: false, // 如果不是vip 不能发布
			}
		},
		methods: {
			clickitem(index) {
				this.activeindex = index;
			},
			fabucur() {
				// 需要实名，
				// uni.showModal({
				// 	title: "发布成功"
				// });
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
