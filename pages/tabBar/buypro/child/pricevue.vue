<template>
	<view class="price-container-box">
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
			<view class="_itemtype" :class="activeindex==index?'active':''" v-for="(item, index) in goodtypelist" :key="index" @tap="clickitem(index)" >
				{{item.name}}
			</view>
		</view>
		
		<view class="price-box">
			<view class="uni-flex" v-for="(item ,index) in pricelist" :key="index">
				<text class="text">{{item.district}}：</text>
				<text class="price">{{item.lowPrice}}-{{item.highPrice}}元/吨</text>
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
	import { mapMutations,mapState } from 'vuex';
	import mpvueCityPicker from '@/components/mpvue-citypicker/mpvueCityPicker.vue'
	export default {
		components: {
			mpvueCityPicker
		},
		data() {
			return {
				cityPickerValue: [0, 0, 0],
				themeColor: '#007AFF',
				activeindex: 0,
				region:{label:"请点击选择地址",value:[],cityCode:"110101"},
				pricelist: [],
				list: []
			}
		},
		computed: {
			...mapState(["goodtypelist"])
		},
		created() {
		},
		methods: {
			getdata() {
				// 3302
				this.api.home.searchPriceByArea({
					data: {
						classify: this.goodtypelist[this.activeindex].name,
						cityId: this.region.cityCode
					}
				}).then(res => {
					console.log(res);
					this.pricelist = res.data;
				})
			},
			onCancel() {
				
			},
			clickitem(index) {
				this.activeindex = index;
				this.getdata();
			},
			chooseCity() {
				this.$refs.mpvueCityPicker.show()
			},
			onConfirm(e) {
				console.log(e);
				this.region = e;
				// this.region.city = e.label.split('-');
				// this.region.label = this.region.city[this.region.city.length-1]
				this.cityPickerValue = e.value;
				this.getdata();
			},
		}
	}
</script>
<style lang="scss" scoped>
	.price-container-box {
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
