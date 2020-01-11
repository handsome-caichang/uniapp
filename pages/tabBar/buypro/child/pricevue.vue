<template>
	<view class="buy-container-sell">
		<view class="uni-flex address-box">
			<view class="nominal">
				货物地址
			</view>
			<view class="text-btn" @tap="chooseCity">
				{{region.label}}
			</view>
		</view>
		
		<view class="text" style="color: #575757;margin-top: 20upx;">
			选择分类
		</view>
		
		<view class="uni-flex" style="flex-wrap: wrap;">
			<view class="_itemtype" :class="activeindex===index?'active':''" v-for="(item, index) in  list" :key="index" @tap="clickitem(index)" >
				{{item}}
			</view>
		</view>
		
		<view class="price-box">
			<view class="uni-flex">
				<text class="text">镇海区：</text>
				<text class="price">38000~42000元/吨</text>
			</view>
			<view class="uni-flex">
				<text class="text">镇海区：</text>
				<text class="price">38000~42000元/吨</text>
			</view>
			<view class="uni-flex">
				<text class="text">镇海区：</text>
				<text class="price">38000~42000元/吨</text>
			</view>
			<view class="uni-flex">
				<text class="text">镇海区：</text>
				<text class="price">38000~42000元/吨</text>
			</view>
			<view class="uni-flex">
				<text class="text">镇海区：</text>
				<text class="price">38000~42000元/吨</text>
			</view>
		</view>
		
		<view class="point">
			<icon type="warn" size="12"/>
			<text class="text">该价格为地区平均价格，仅供参考</text>
		</view>
		
		<mpvue-city-picker :themeColor="themeColor" ref="mpvueCityPicker" :pickerValueDefault="cityPickerValue" @onCancel="onCancel" @onConfirm="onConfirm"></mpvue-city-picker>
		
	</view>
</template>
<script>
	import mpvueCityPicker from '@/components/mpvue-citypicker/mpvueCityPicker.vue'
	export default {
		components: {
			mpvueCityPicker
		},
		data() {
			return {
				cityPickerValue: [0, 0, 1],
				themeColor: '#007AFF',
				activeindex: 0,
				region:{label:"请点击选择地址",value:[],cityCode:""},
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
					'供电局废料',
				]
			}
		},
		created() {},
		onReady() {},
		onShow() {},
		methods: {
			clickitem(index) {
				this.activeindex = index;
			},
			onCancel(e) {
				console.log(e)
			},
			chooseCity() {
				this.$refs.mpvueCityPicker.show()
			},
			onConfirm(e) {
				this.region = e;
				this.cityPickerValue = e.value;
			},
		}
	}
</script>
<style lang="scss" scoped>
	.buy-container-sell {
		padding: 40upx;
		.point {
			margin-top: 30upx;
			color: #555555;
			display: flex;
			justify-content: center;
			align-items: center;
			.text {
				margin-left: 10upx;
			}
		}
		.address-box {
			align-items: center;
			font-size: 32upx;
			.nominal {
				color: #575757;
				font-size: 28upx;
			}
			.text-btn {
				padding: 2upx 10upx;
				border: 1px solid #575757;
				border-radius: 6upx;
				margin-left: 20upx;
			}
		}
		.price-box {
			margin-top: 30upx;
		}
	}
</style>
