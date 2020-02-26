<template>
	<view class="container-sell" style="padding: 0 20upx;">
		<view class="header-box-sell">
			<view class="addr" @tap="chooselocation">
				<uni-icons type="location"></uni-icons>
				{{ city }}
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
							<image :src="item.img" style="width: 180rpx;height: 180rpx;"></image>
						</view>
						<view class="uni-flex uni-column" style="flex: 1;justify-content: center;margin-left: 20upx;">
							<view class="uni-flex" style="justify-content: space-between;align-items: center;height: 60upx;">
								<text style="color: #212121;font-weight: 500;font-size: 32upx;">张三</text>
								<text class="time" style="color: #575757;font-size: 20upx;">更新时间：2019/12/6</text>
							</view>
							<view class="uni-flex title" style="align-items: center;height: 40upx;">
								<text style="width:80upx;color: #212121;font-weight: 500;font-size: 28upx;">废铁</text>
								<text class="price " style="width:350upx;font-size: 24upx;">2000-2150元/吨（预估运费40元/吨）</text>
							</view>
							<view class="address uni-ellipsis" style="width: 100%;font-size: 20upx;margin-bottom: 10upx;margin-top: 10upx;">
								宁波市镇海团桥菜场对面张三废品回收
							</view>
							<view class="uni-flex" style="justify-content: space-between;font-size: 20upx;color: #575757;">
								<uni-rate class="rate" :size="12" :value="5" />
								<view class="text">距我2.3km</view>
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
		</view>

		<view class="filter-box">
			<uni-drawer :visible="showRight" mode="right" @close="closeDrawer('right')">
				<view class="uni-flex uni-row filter">
					<view class="text" v-for="(item, index) in tabLists" :key="index" :class="{ active: item.isactive }" @tap="checkitem(item)">{{ item.name }}</view>
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
			city: '北京',
			cityPickerValue: [0, 0, 1],
			tabIndex: 0,
			productList: [],
			showRight: false,
			tabLists: [],
			tablist: ['价格', '距离', '常用'],
			activeindex: 0
		};
	},
	created() {
		// this.getlocation();
		this.loadData();
	},
	computed: {
		...mapState(["userInfo"])
	},
	methods: {
		onConfirm(e) {
			this.city = e.label;
			this.cityPickerValue = e.value;
		},
		getmore() {
			let len = this.productList.length;
			if (len >= 20) {
				return false;
			}
			// 演示,随机加入商品,生成环境请替换为ajax请求
			let end_goods_id = this.productList[len - 1] ? this.productList[len - 1].goods_id : 0;
			for (let i = 1; i <= 10; i++) {
				let goods_id = end_goods_id + i;
				let p = {
					goods_id: goods_id,
					img: '/static/img/goods/p' + (goods_id % 10 == 0 ? 10 : goods_id % 10) + '.jpg',
					name: '商品名称商品名称商品名称商品名称商品名称',
					price: '￥168',
					slogan: '1235人付款'
				};
				this.productList.push(p);
			}
		},
		checkitem(item) {
			item.isactive = !item.isactive;
		},
		changetab(index) {
			this.activeindex = index;
			if (index == 2) {
				this.productList = [];
			} else {
				this.getmore();
			}
		},
		closeDrawer() {
			this.showRight = false;
		},
		filtertap() {
			this.showRight = true;
		},
		async loadData() {
			uni.getLocation({
				geocode: true,
				success: res => {
					this.api.home.getRealseGoodsList({
						type: this.activeindex+1,
						userId: getApp().globalData.userdata.userId,
						lat: ""+res.latitude,
						longitude: ""+res.longitude,
					}).then(res => {
						this.productList = JSON.parse(res.data)
					})
					uni.setStorageSync('_location', res);
					this.city = res.address.city;
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
			let id = item.goods_id;
			uni.navigateTo({
				url: `/pages/product/malldetail?id=${id}`
			});
		},
		chooselocation() {
			this.$refs.mpvueCityPicker.show();
		}
	}
};
</script>
<style lang="scss" scoped>
.container-sell {
	position: absolute;
	top: 200upx;
	left: 0;
	right: 0;
	bottom: 0;
	flex: 1;
	height: 100%;
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
			padding: 100upx 10upx;

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

		.addr {
			width: 120upx;
			height: 60upx;
			flex-shrink: 0;
			display: flex;
			align-items: center;
			font-size: 28upx;

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
		position: absolute;
		top: 100upx;
		bottom: 0;
		right: 0;
		left: 0;
		z-index: 10;
		flex: 1;
		height: 100%;
		.tablebox {
			padding: 0upx 20upx;
			display: flex;

			.tableitem {
				color: $font-color-light;
				font-size: 28upx;
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
