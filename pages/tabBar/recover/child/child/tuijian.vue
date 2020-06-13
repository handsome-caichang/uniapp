<template>
	<view class="tuijian-box">
		<view style="width: 100%;text-align: center;height: 80upx;font-size: 40upx;color: #212121;display: flex;justify-content: space-around;align-items: center;"
		 @tap="chooselocation">
			<text style="float: left;">地区：</text>
			<text> {{ region.label }}</text>
		</view>
		<view style="width: 100%;text-align: center;height: 80upx;font-size: 40upx;color: #212121;display: flex;justify-content: space-around;align-items: center;"
		 @tap="chooselocation">
			<text style="float: left;">货物类别：</text>
			<picker @change="bindPickerChange" :value="protypeindex" :range="goodtypelist" range-key="name">
				<view class="uni-input" style="font-size: 40upx;color: #212121;">{{protype.value ? protype.value : protype.label }}</view>
			</picker>
		</view>
		<view class="example-box" v-for="(item,index) in productList" :key="index" @tap="clickitem(item)">
			<view class="uni-flex uni-row item-box">
				<view class="text uni-flex" style="width: 160rpx;height: 130rpx;justify-content: center;align-items: center;">
					<image :src="item.images[0]" style="width: 160rpx;height: 130rpx;"></image>
				</view>
				<view class="uni-flex uni-column" style="flex: 1;justify-content: center;margin-left: 20upx;">
					<view class="uni-flex" style="justify-content: space-between;align-items: center;height: 40upx;">
						<view style="color: #343434;font-weight: 500;font-size: 34upx;">{{item.classifyName}} | {{item.count}}吨</view>
						<text class="time" style="color: #575757;font-size: 20upx;">更新时间：{{utils.timeTodate('m-d', item.createTime)}}</text>
					</view>
					<view class="uni-flex" style="justify-content: space-between;align-items: center;height: 40upx;">
						<view style="color: #212121;font-size: 28upx;">{{item.name}}</view>
						<text class="detail-btn" :class="novip?'noclick':''">查看详情</text>
					</view>
					<view class="vipmore" v-if="novip">
						<icon type="warn" size="12"></icon>
						<text style="margin-left: 10upx;">注册会员才能查看详情喔！</text>
					</view>
					<view class="uni-flex" style="justify-content: space-between;align-items: center;">
						<view class="price" style="font-size: 28upx;font-weight: 500;" v-if="item.bedrockPrice">{{item.outsidePrice}}元</view>
						<view class="price" style="font-size: 28upx;font-weight: 500;" v-else>价格面议</view>
						<text class="time" style="color: #343434;font-size: 22upx;">{{item.address}}</text>
					</view>

				</view>
			</view>
		</view>
		<view class="no-pro" v-if="!productList.length">
			<icon type="warn" size="80" color="#F8B551"></icon>
			<view class="text">暂无数据</view>
		</view>
		<mpvue-city-picker ref="mpvueCityPicker" :pickerValueDefault="cityPickerValue" @onConfirm="onConfirm"></mpvue-city-picker>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	import mpvueCityPicker from '@/components/mpvue-citypicker/mpvueCityPicker.vue'
	import provinceData from '@/components/mpvue-citypicker/city-data/province.js';
	import cityData from '@/components/mpvue-citypicker/city-data/city.js';
	import areaData from '@/components/mpvue-citypicker/city-data/area.js';
	import utils from '@/components/shoyu-date/utils.filter.js';
	export default {
		components: {
			mpvueCityPicker,
		},
		data() {
			return {
				cityPickerValue: [0, 0, 1],
				region: {
					label: "请点击选择地区",
					value: [],
					cityCode: ""
				},
				productList: [],
				novip: true,
				utils,
				userdata: {},
				protypeindex: 0,
				protype: {
					label: "请点击选择货物类别",
					value: "",
				},
			}
		},
		computed: {
			...mapState(["goodtypelist"])
		},
		created() {
			this.userdata = getApp().globalData.userdata;
			if (this.userdata.isVip == 1) {
				this.novip = false;
			}
			uni.getLocation({
				geocode: true,
				success: res => {
					console.log(res);
					var provinceindex = 0,
						cityindex = 0,
						districtindex = 0;
					provinceData.forEach((item, index) => {
						if (item.label == res.address.province) {
							provinceindex = index;
						}
					})
					cityData.forEach((item, index) => {
						if (index == provinceindex) {
							item.forEach((it, y) => {
								if (it.label == res.address.city) {
									cityindex = y;
								}
							})
						}
					})
					areaData.forEach((item, index) => {
						if (index == provinceindex) {
							item.forEach((it, y) => {
								if (cityindex == y) {
									it.forEach((area, areaindex) => {
										if (area.label == res.address.district) {
											districtindex = areaindex;
											this.region = {
												label: area.label,
												value: [provinceindex, cityindex, areaindex],
												cityCode: area.value
											}
											this.cityPickerValue = [provinceindex, cityindex, areaindex];
										}
									})
								}
							})
						}
					})
					this.getdata();
				},
				fail: err => {
					this.getdata();
				}
			});
		},
		methods: {
			bindPickerChange(e) {
				this.protypeindex = e.target.value;
				this.protype.value = this.goodtypelist[this.protypeindex].name;
			},
			chooselocation() {
				this.$refs.mpvueCityPicker.show();
			},
			onConfirm(e) {
				this.region = e;
				this.region.city = e.label.split('-');
				this.region.label = this.region.city[this.region.city.length - 1]
				this.cityPickerValue = e.value;
				this.getdata();
			},
			clickitem(item) {
				if (this.novip) {
					uni.showModal({
						title: "提示",
						content: '该操作需要开通VIP，请先前往我的->废品帮VIP，开通VIP服务',
						success: function(res) {
							if (res.confirm) {
								console.log('用户点击确定');
								uni.navigateTo({
									url: "/pages/user/vipsend"
								})
							}
						}
					});
					return;
				}
				item.sourcetype = 1;
				getApp().globalData.productdetail = item;
				uni.navigateTo({
					url: `/pages/product/productdetail`
				})
			},
			getdata() {
				let res = uni.getStorageSync('_location');
				this.api.home.goodsRecommend({
					data: {
						userId: getApp().globalData.userdata.userId,
						lat: "" + res.latitude,
						lng: "" + res.longitude,
						district: this.region.label,
						cityCode: this.region.cityCode,
						classify: this.protype.value,
						type: 1,
					}
				}).then(res => {
					console.log(res);
					res.data.forEach(item => {
						if (typeof item.createTime == 'string') {
							let time = item.createTime.replace(' ', "T")
							let datetime = new Date(time).getTime();
							item.createTime = datetime;
						}
					})
					this.productList = res.data;
				})
			},
			getmore() {
				this.getdata();
			},
		}
	}
</script>

<style lang="scss" scoped>
	.tuijian-box {
		margin: 0 -40upx;
		padding-bottom: 20upx;

		.no-pro {
			display: flex;
			flex-direction: column;
			justify-content: center;
			text-align: center;
			color: #767676;
			margin-top: 100upx;

			.text {
				margin-top: 30upx;
			}
		}

		.example-box {
			margin-top: 20upx;
			border: 1px solid $border-color-base;
			border-radius: 8upx;
			padding: 20upx;

			.header-box {
				justify-content: space-between;
				align-items: center;

				.uni-flex {
					flex: 1;
					align-items: center;
					margin-right: 40upx;
				}

				.headerimg {
					height: 80upx;
					width: 80upx;
					border-radius: 50%;
					margin-right: 20upx;
				}

				.name {
					color: #212121;
					font-size: 36upx;
					font-weight: 500;
					margin-right: 10upx;
				}
			}

			.content-box {
				.title {
					font-weight: 500;
					color: #212121;
					font-size: 32upx;

					.price {
						margin-left: 10upx;
					}
				}

				.address {}
			}

			.detail-btn {
				color: #FFFFFF;
				font-size: 22upx;
				background-color: #18C02C;
				border-radius: 10upx;
				padding: 0 10upx;
				margin-right: 30upx;

				&.noclick {
					background-color: #AAAAAA;
				}
			}

			.vipmore {
				display: flex;
				justify-content: flex-end;
				align-items: center;
				color: #767676;
				font-size: 22upx;
			}
		}
	}
</style>
