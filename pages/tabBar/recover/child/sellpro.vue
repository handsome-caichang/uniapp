<template>
	<view class="box-container-sell" style="padding: 0 20upx;">
		<view class="header-box-sell">
			<view class="addr" @tap="chooselocation">
				<uni-icons type="location"></uni-icons>
				{{ region.label }}
			</view>
			<view class="input-box">
				<input placeholder="默认关键字" placeholder-style="color:#c0c0c0;" @tap="toSearch()" />
				<uni-icons class="icon" type="search"></uni-icons>
			</view>
			<view class="icon-btn" @tap="filtertap">
				<view class="iconfont icon-shaixuanicon"></view>
				<!-- <uni-icons type="more"></uni-icons> -->
			</view>
		</view>

		<view class="news">
			<view class="tablebox">
				<view class="tableitem" v-for="(item, index) in tablist" :key="index" :class="activeindex == index ? 'active' : ''" @tap="changetab(index)">{{ item }}</view>
			</view>
			<view class="cont-box" style="margin-bottom: 20upx;" v-if="productList.length">
				<view class="example-box" v-for="(item, index) in productList" :key="index" @tap="toGoods(item)">
					<view class="uni-flex uni-row item-box">
						<view class="text uni-flex" style="width: 180rpx;height: 180rpx;justify-content: center;align-items: center;">
							<image mode="aspectFit" :src="item.image" style="width: 180rpx;height: 180rpx;"></image>
						</view>
						<view class="uni-flex uni-column" style="flex: 1;justify-content: center;margin-left: 20upx;">
							<view class="uni-flex" style="justify-content: space-between;align-items: center;height: 60upx;">
								<text style="color: #212121;font-weight: 500;font-size: 32upx;">{{item.name}}</text>
								<text class="time" style="color: #575757;font-size: 20upx;">更新时间：{{item.createTime}}</text>
							</view>
							<view class="uni-flex title" style="align-items: center;height: 40upx;">
								<text style="width:80upx;color: #212121;font-weight: 500;font-size: 28upx;">{{item.classifyName}}</text>
								<text class="price " style="width:350upx;font-size: 24upx;">{{item.bedrockPrice}}-{{item.outsidePrice}}元/吨（预估运费{{item.freight}}元/吨）</text>
							</view>
							<view class="address uni-ellipsis" style="width: 100%;font-size: 20upx;margin-bottom: 10upx;margin-top: 10upx;">
								{{item.address}}
							</view>
							<view class="uni-flex" style="justify-content: space-between;font-size: 20upx;color: #575757;">
								<uni-rate class="rate" :size="12" :value="5" />
								<view class="text">距我{{item.distance}}</view>
							</view>
						</view>
					</view>
				</view>
			</view>

			<view class="no-pro" v-if="!productList.length && activeindex == 2">
				<icon type="warn" size="80" color="#F8B551"></icon>
				<view class="text">您还没有常用回收站</view>
				<view>快去搜索添加收藏吧</view>
			</view>
			<view class="no-pro" v-if="!productList.length && activeindex != 2">
				<icon type="warn" size="80" color="#F8B551"></icon>
				<view class="text">暂无数据</view>
			</view>
		</view>

		<view class="filter-box">
			<uni-drawer :visible="showRight" mode="right" @close="closeDrawer('right')">
				<view class="uni-flex uni-row filter">
					<view class="text" v-for="(item, index) in goodtypelist" :key="index" :class="{ active: item.isactive }" @tap="checkitem(item)">{{ item.name }}</view>
				</view>
			</uni-drawer>
		</view>

		<mpvue-city-picker ref="mpvueCityPicker" :pickerValueDefault="cityPickerValue" @onConfirm="onConfirm"></mpvue-city-picker>
	</view>
</template>
<script>
import mpvueCityPicker from '@/components/mpvue-citypicker/mpvueCityPicker.vue';
import uniRate from '@/components/uni-rate/uni-rate.vue';
import uniIcons from '@/components/uni-icons/uni-icons.vue';
import uniDrawer from '@/components/uni-drawer/uni-drawer.vue';
import amap from '@/common/SDK/amap-wx.js';
import { mapMutations,mapState } from 'vuex';
import provinceData from '@/components/mpvue-citypicker/city-data/province.js';
import cityData from '@/components/mpvue-citypicker/city-data/city.js';
import areaData from '@/components/mpvue-citypicker/city-data/area.js';
export default {
	components: {
		uniDrawer,
		uniIcons,
		uniRate,
		mpvueCityPicker
	},
	data() {
		return {
			headerPosition: 'fixed',
			region:{label:"东城区",value:[],cityCode:"110101"},
			cityPickerValue: [0, 0, 0],
			tabIndex: 0,
			productList: [
				{
					image: 'https://nb-fpb.oss-cn-hangzhou.aliyuncs.com/images/158660516001696.png',
					images: ['https://nb-fpb.oss-cn-hangzhou.aliyuncs.com/images/158660516001696.png'],
					name: '张家回收站',
					createTime: '2020/4/14',
					classifyName: '废铁',
					bedrockPrice: '2000',
					outsidePrice: '3000',
					freight: '40',
					address: '宁波市镇海',
					distance: '2.3km',
					headImage: 'https://nb-fpb.oss-cn-hangzhou.aliyuncs.com/images/158676446499037.png'
				},{
					image: 'https://nb-fpb.oss-cn-hangzhou.aliyuncs.com/images/158660814843654.png',
					images: ['https://nb-fpb.oss-cn-hangzhou.aliyuncs.com/images/158660814843654.png'],
					name: '德思回收站',
					createTime: '2020/4/14',
					classifyName: '塑料',
					bedrockPrice: '1000',
					outsidePrice: '2000',
					freight: '50',
					address: '宁波市镇海',
					distance: '5.9km',
					headImage: 'https://nb-fpb.oss-cn-hangzhou.aliyuncs.com/images/158676446499037.png'
				},
			],
			showRight: false,
			tablist: ['价格', '距离', '常用'],
			activeindex: 0,
			locationobj: {},
		};
	},
	created() {
		// this.getlocation();
		this.loadData();
	},
	computed: {
		...mapState(["userInfo","goodtypelist"])
	},
	methods: {
		onConfirm(e) {
			console.log(e)
			this.region = e;
			this.region.city = e.label.split('-');
			this.region.label = this.region.city[this.region.city.length-1]
			this.cityPickerValue = e.value;
			this.getRealseGoodsList();
		},
		checkitem(item) {
			item.isactive = !item.isactive;
			this.goodtypelist.forEach(it => {
				 if (it.name !== item.name) {
					 it.isactive = false;
				 }
			})
		},
		changetab(index) {
			this.activeindex = index;
			this.getRealseGoodsList();
		},
		closeDrawer() {
			this.getRealseGoodsList();
			this.showRight = false;
		},
		filtertap() {
			this.showRight = true;
		},
		getRealseGoodsList() {
			let classify = this.goodtypelist.filter(item => {
				return item.isactive
			});
			let ifyst = classify[0]  ? classify[0].name : '';
			this.api.home.getRealseGoodsList({
				data: {
					type: this.activeindex+1,
					userId: getApp().globalData.userdata.userId,
					lat: ""+this.locationobj.latitude,
					longitude: ""+this.locationobj.longitude,
					classify: ifyst,
					cityCode: this.region.cityCode
				}
			}).then(res => {
				// this.productList = res.data;
			})
		},
		async loadData() {
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
					this.locationobj = res;
					uni.setStorageSync('_location', res);
					this.getRealseGoodsList();
				},
				fail: err => {}
			});
			// this.productList = await this.$api.json('productList');
			this.tabLists = await this.$api.json('tabList');
			for (var i = 0; i < this.tabLists.length; i++) {
				this.$set(this.tabLists[i], 'isactive', false);
			}
		},
		toSearch() {},
		toGoods(item) {
			// getApp().globalData.malldetail = item;
			// uni.navigateTo({
			// 	url: `/pages/product/malldetail`
			// });
		},
		chooselocation() {
			this.$refs.mpvueCityPicker.show();
		}
	}
};
</script>
<style lang="scss" scoped>
.box-container-sell {
	// position: absolute;
	// top: 200upx;
	// left: 0;
	// right: 0;
	// bottom: 0;
	// flex: 1;
	// height: 100%;
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

	.filter-box {
		// position: absolute;
		// top: 0;
		// bottom: 0;
		// left: 0;
		// right: 0;
		.filter {
			// height: 100%;
			flex-wrap: wrap;
			padding: 100upx 0upx 10upx;
			.text {
				text-align: center;
				height: 50upx;
				line-height: 50upx;
				margin: 20upx;
				padding: 0 20upx;
				border: 1upx solid $border-color-dark;

				&.active {
					background-color: green;
					color: #ffffff;
				}
			}
		}
	}

	.header-box-sell {
		height: 100upx;
		display: flex;
		align-items: center;
		background-color: #fff;
		font-size: 38upx;
		.addr {
			width: 160upx;
			height: 60upx;
			flex-shrink: 0;
			display: flex;
			align-items: center;
			font-size: 38upx;

			.uni-icons {
				height: 60upx;
				margin-right: 10upx;
				display: flex;
				align-items: center;
				font-size: 42upx;
			}
		}

		.input-box {
			width: 100%;
			height: 60upx;
			background-color: #f5f5f5;
			border-radius: 30upx;
			position: relative;
			display: flex;
			align-items: center;

			.icon {
				display: flex;
				align-items: center;
				position: absolute;
				top: 0;
				right: 0;
				width: 60upx;
				height: 60upx;
				font-size: 34upx;
				color: #c0c0c0;
			}

			input {
				padding-left: 28upx;
				height: 28upx;
				font-size: 28upx;
			}
		}

		.icon-btn {
			width: 60upx;
			height: 60upx;
			flex-shrink: 0;
			display: flex;
			align-items: center;
			justify-content: center;

			.uni-icons {
				font-size: 42upx;
			}
		}
	}

	.news {
		// position: absolute;
		// top: 100upx;
		// bottom: 0;
		// right: 0;
		// left: 0;
		// z-index: 10;
		// flex: 1;
		// height: 100%;
		.tablebox {
			padding: 0upx 20upx;
			display: flex;
			
			.tableitem {
				color: $font-color-light;
				font-size: 36upx;
				border: 2upx solid $font-color-light;
				padding: 0 20upx;
				height: 48upx;
				line-height: 48upx;
				margin-right: 60upx;
				border-radius: 8upx;

				&.active {
					background-color: $font-color-light;
					color: $font-color-withe;
				}
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

				.address {
				}
			}
		}
	}
}
</style>
