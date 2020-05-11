<template>
	<view class="listbox" style="padding: 0upx 40upx 40upx;">
		<view style="width: 100%;text-align: center;height: 80upx;font-size: 48upx;color: #212121;" @tap="chooselocation">
			<text style="float: left;">地区：</text>
			<text>	{{ region.label }}</text>
		</view>
		<view class="example-box" v-for="(item, index) in huishoulist" :key="index" @tap="todetail(item)">
			<view class="uni-flex uni-row item-box">
				<view class="text uni-flex" style="width: 180rpx;height: 180rpx;justify-content: center;align-items: center;">
					<image mode="aspectFit" :src="item.headImage" style="width: 180rpx;height: 180rpx;"></image>
				</view>
				<view class="uni-flex uni-column" style="flex: 1;justify-content: center;margin-left: 20upx;">
					<view class="uni-flex" style="justify-content: space-between;align-items: center;height: 60upx;">
						<text style="color: #212121;font-weight: 600;font-size: 32upx;">{{item.nickName}}</text>
					</view>
					<view class="uni-flex title" style="align-items: center;height: 40upx;">
						<text style="color: #212121;font-weight: 500;font-size: 28upx;margin-right: 60upx;">从业{{item.year}}年</text>
						<text style="color: #212121;font-weight: 500;font-size: 28upx;margin-right: 60upx;">保证金：{{ item.depositMoney ? item.depositMoney/100 : 0}}</text>
					</view>
					<view class="address uni-ellipsis" style="width: 100%;font-size: 20upx;margin-bottom: 10upx;margin-top: 10upx;">
						<uni-rate class="rate" :size="12" :value="item.star" />
					</view>
				</view>
			</view>
		</view>
		<view class="no-pro" v-if="!huishoulist.length">
			<icon type="warn" size="80" color="#F8B551"></icon>
			<view class="text">暂无数据</view>
		</view>
		<mpvue-city-picker ref="mpvueCityPicker" :pickerValueDefault="cityPickerValue" @onConfirm="onConfirm"></mpvue-city-picker>
	</view>
</template>

<script>
	import mpvueCityPicker from '@/components/mpvue-citypicker/mpvueCityPicker.vue'
	import provinceData from '@/components/mpvue-citypicker/city-data/province.js';
	import cityData from '@/components/mpvue-citypicker/city-data/city.js';
	import areaData from '@/components/mpvue-citypicker/city-data/area.js';
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
				huishoulist: [],
			}
		},
		created() {
			this.getdata();
			uni.getLocation({
				geocode: true,
				success: res => {
					console.log(res);
					var provinceindex = 0,cityindex =0,districtindex=0;
					provinceData.forEach((item,index) => {
						if (item.label == res.address.province) {
							provinceindex = index;
						}
					})
					cityData.forEach((item,index)=> {
						if (index == provinceindex) {
							item.forEach((it, y) => {
								if (it.label == res.address.city) {
									cityindex = y;
								}
							})
						}
					})
					areaData.forEach((item,index)=> {
						if (index == provinceindex) {
							item.forEach((it, y) => {
								if (cityindex == y) {
									it.forEach((area, areaindex)=> {
										if (area.label == res.address.district) {
											districtindex = areaindex;
											this.region = {
												label: area.label,
												value: [provinceindex, cityindex, areaindex],
												cityCode: area.value
											}
											this.cityPickerValue =  [provinceindex, cityindex, areaindex];
										}
									})
								}
							})
						}
					})
					this.getdata();
				},
				fail: err => {}
			});
		},
		methods: {
			chooselocation() {
				this.$refs.mpvueCityPicker.show();
			},
			onConfirm(e) {
				this.region = e;
				this.region.city = e.label.split('-');
				this.region.label = this.region.city[this.region.city.length-1]
				this.cityPickerValue = e.value;
				this.getdata();
			},
			getdata() {
				// 回收人推荐
				console.log(this.region);
				this.api.home.getRecommendRecoverUserList({
					data: {
						userId: getApp().globalData.userdata.userId,
						countPerPage: 2000,
						pageIndex: 1,
						district: this.region.label,
						cityCode: this.region.cityCode
					}
				}).then(res => {
					console.log(res)
					this.huishoulist = res.data;
				})
			},
			todetail(item) {
				item.sourcetype = 1;
				getApp().globalData.customerdata = item;
				uni.navigateTo({
					url: `/pages/customer/customerdetail`
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.listbox {
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
		}
	}
</style>
