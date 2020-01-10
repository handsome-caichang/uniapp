<template>
	<view class="uni-page-body orderin">
		<scroll-view class="scroll-h" :scroll-x="true" :show-scrollbar="false">
			<view class="uni-tab-item" v-for="(item,index) in tablist" :key="index" :class="activeindex==index?'active':''" @tap="changetab(index)">
				{{item}}
			</view>
		</scroll-view>

		<view class="listbox" style="margin-top: 20upx;">
			<view v-if="activeindex === 0" class="tuijian-box">
				<view class="example-box" v-for="(item,index) in productList" :key="index" @tap="clickitem(item)">
					<view class="uni-flex uni-row item-box">
						<view class="text uni-flex" style="width: 160rpx;height: 130rpx;justify-content: center;align-items: center;">
							<image :src="item.img" style="width: 160rpx;height: 130rpx;"></image>
						</view>
						<view class="uni-flex uni-column" style="flex: 1;justify-content: center;margin-left: 20upx;">
							<view class="uni-flex" style="justify-content: space-between;align-items: center;height: 40upx;">
								<view style="color: #343434;font-weight: 500;font-size: 34upx;">废铁 | 10000吨</view>
								<text class="time" style="color: #575757;font-size: 20upx;">更新时间：2019/12/6</text>
							</view>
							<view class="uni-flex" style="justify-content: space-between;align-items: center;height: 40upx;">
								<view style="color: #212121;font-size: 28upx;">宁波****有限公司</view>
								<text class="detail-btn" >查看详情</text>
							</view>
							<!-- <view class="vipmore" v-if="novip"> :class="novip?'noclick':''"
								<icon type="warn" size="12"></icon>
								<text style="margin-left: 10upx;">注册会员才能查看详情喔！</text>
							</view> -->
							<view class="uni-flex" style="justify-content: space-between;align-items: center;">
								<view class="price" style="font-size: 28upx;font-weight: 500;">价格面议</view>
								<text class="time" style="color: #343434;font-size: 22upx;">宁波镇海</text>
							</view>
				
						</view>
					</view>
				</view>
			</view>
			
			
			<view class="shoudao" v-if="activeindex === 1">
				<view class="uni-list">
					<uni-list>
						<uni-list-item class="" :thumb="item.img" :showBadge="true" :showArrow="false" :note="'关闭时间：'+item.time+'  '+item.address" v-for="(item,index) in successlist"
						 :key="index">
							<view slot="content" style="height: 50upx;">
								<text style="font-size: 34upx;margin-right: 20upx;">{{item.type}}</text>
								<text style="font-size: 34upx;margin-right: 20upx;">{{item.num}}</text>
							</view>
							<view slot="content_end" class="uni-flex" style="align-items: center;height: 50upx;">
								<text style="font-size: 34upx;margin-right: 20upx;">{{item.name}}</text>
							</view>
							<view class="btn" style="">
								<image src="/static/img/guanbi.png" mode="" style="width: 108upx;height:68upx" ></image>
							</view>
						</uni-list-item>
					</uni-list>
				</view>
			</view>

			<view class="shoudao" v-if="activeindex === 2">
				<view class="uni-list">
					<uni-list>
						<uni-list-item class="" :thumb="item.img" :note="'关闭时间：'+item.time+'  '+item.address" v-for="(item,index) in shoudaolist"
						 :key="index" @tap="clickitem(item)" >
							<view slot="content" style="height: 50upx;">
								<text style="font-size: 34upx;margin-right: 20upx;">{{item.name}}</text>
							</view>
							<view slot="content_end" class="uni-flex" style="align-items: center;height: 50upx;">
								<text style="font-size: 34upx;margin-right: 20upx;">从业{{item.age}}年</text>
								<uni-rate class="rate" :size="12" :value="item.xinyu" />
							</view>
							<view class="btn" style="color: #fff;background-color: #18C02C;font-size: 28upx;padding: 0upx 20upx;border-radius: 20upx;margin-right: 40upx;">接受</view>
						</uni-list-item>
					</uni-list>
				</view>
			</view>
			
			<view class="shoudao" v-if="activeindex === 3">
				<view class="uni-list">
					<uni-list>
						<uni-list-item class="" :thumb="item.img" :note="'关闭时间：'+item.time+'  '+item.address" v-for="(item,index) in successlist"
						 :key="index" @tap="nvto(item, '/pages/product/order/orderdetailhuozhu')" >
							<view slot="content" style="height: 50upx;">
								<text style="font-size: 34upx;margin-right: 20upx;">{{item.type}}</text>
								<text style="font-size: 34upx;margin-right: 20upx;">{{item.num}}</text>
							</view>
							<view slot="content_end" class="uni-flex" style="align-items: center;height: 50upx;">
								<text style="font-size: 34upx;margin-right: 20upx;">{{item.name}}</text>
							</view>
							<view class="btn" style="color: #18C02C;font-size: 34upx;margin-right: 20upx;">匹配成功</view>
						</uni-list-item>
					</uni-list>
				</view>
			</view>
			
		</view>
	</view>
</template>
<script>
	import uniRate from '@/components/uni-rate/uni-rate.vue'
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	import uniList from '@/components/uni-list/uni-list.vue'
	import uniListItem from '@/components/uni-list-item/uni-list-item.vue'
	export default {
		components: {
			uniList,
			uniIcons,
			uniRate,
			uniListItem
		},
		created() {
			this.loadData();
		},
		data() {
			return {
				productList: [],
				successlist: [
					{
						name: '宁波****有限公司',
						num: '3吨',
						time: '2019/12/13',
						address: '镇海',
						img: '/static/img/missing-face.png',
						type: '废铁'
					},{
						name: '宁波****有限公司',
						num: '3吨',
						time: '2019/12/13',
						address: '镇海',
						img: '/static/img/missing-face.png',
						type: '废铁'
					},{
						name: '宁波****有限公司',
						num: '3吨',
						time: '2019/12/13',
						address: '镇海',
						img: '/static/img/missing-face.png',
						type: '废铁'
					},
				],
				shoudaolist: [{
					name: '张三',
					num: '3吨',
					time: '2019/12/13',
					address: '镇海',
					img: '/static/img/missing-face.png',
					age: 3,
					xinyu: 5
				},{
					name: '张三',
					num: '3吨',
					time: '2019/12/13',
					address: '镇海',
					img: '/static/img/missing-face.png',
					age: 3,
					xinyu: 5
				},{
					name: '张三',
					num: '3吨',
					time: '2019/12/13',
					address: '镇海',
					img: '/static/img/missing-face.png',
					age: 3,
					xinyu: 5
				}],
				tablist: [
					'货物推荐',
					'申请记录',
					'收到申请',
					'匹配成功',
				],
				jilulist: [{
					name: '宁波易鑫科技有限公司',
					num: '3吨',
					type: '废铁',
					time: '2019/12/13',
					address: '镇海',
					img: '/static/img/missing-face.png',
					list: [{
						name: '战三',
						img: '/static/img/missing-face.png',
						age: 3,
						xinyu: 3.5
					}, {
						name: '战三',
						img: '/static/img/missing-face.png',
						age: 3,
						xinyu: 3.5
					}, {
						name: '战三',
						img: '/static/img/missing-face.png',
						age: 3,
						xinyu: 3.5
					}, {
						name: '战三',
						img: '/static/img/missing-face.png',
						age: 3,
						xinyu: 3.5
					}, ]
				}, {
					name: '宁波易鑫科技有限公司',
					num: '3吨',
					type: '废铁',
					time: '2019/12/13',
					address: '镇海',
					img: '/static/img/missing-face.png',
					list: [{
						name: '战三',
						img: '/static/img/missing-face.png',
						age: 3,
						xinyu: 3.5
					}, {
						name: '战三',
						img: '/static/img/missing-face.png',
						age: 3,
						xinyu: 3.5
					}, {
						name: '战三',
						img: '/static/img/missing-face.png',
						age: 3,
						xinyu: 3.5
					}, {
						name: '战三',
						img: '/static/img/missing-face.png',
						age: 3,
						xinyu: 3.5
					}, ]
				}, {
					name: '宁波易鑫科技有限公司',
					num: '3吨',
					type: '废铁',
					time: '2019/12/13',
					address: '镇海',
					img: '/static/img/missing-face.png',
					list: [{
						name: '战三',
						img: '/static/img/missing-face.png',
						age: 3,
						xinyu: 3.5
					}, {
						name: '战三',
						img: '/static/img/missing-face.png',
						age: 3,
						xinyu: 3.5
					}, {
						name: '战三',
						img: '/static/img/missing-face.png',
						age: 3,
						xinyu: 3.5
					}, {
						name: '战三',
						img: '/static/img/missing-face.png',
						age: 3,
						xinyu: 3.5
					}, ]
				}],
				activeindex: 0,
				huishoulist: [{
						name: '战三',
						img: '/static/img/missing-face.png',
						age: 3,
						xinyu: 3.5
					},
					{
						name: '战三',
						img: '/static/img/missing-face.png',
						age: 3,
						xinyu: 3.5
					}, {
						name: '战三',
						img: '/static/img/missing-face.png',
						age: 3,
						xinyu: 3.5
					}, {
						name: '战三',
						img: '/static/img/missing-face.png',
						age: 3,
						xinyu: 3.5
					}, {
						name: '战三',
						img: '/static/img/missing-face.png',
						age: 3,
						xinyu: 3.5
					}, {
						name: '战三',
						img: '/static/img/missing-face.png',
						age: 3,
						xinyu: 3.5
					}, {
						name: '战三',
						img: '/static/img/missing-face.png',
						age: 3,
						xinyu: 3.5
					}, {
						name: '战三',
						img: '/static/img/missing-face.png',
						age: 3,
						xinyu: 3.5
					}
				]
			}
		},
		methods: {
			async loadData() {
				this.productList = await this.$api.json('productList');
			},
			changetab(active) {
				this.activeindex = active
			},
			clickitem(item) {
				uni.navigateTo({
					url: '/pages/product/productdetail'
				})
			},
			nvto(item, url) {
				uni.navigateTo({
					url,
				})
			}
		},
	}
</script>

<style scoped lang="scss">
	.orderin {
		.tuijian-box {
			margin: 0 20upx;
			padding-bottom: 20upx;
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
		.headerimg {
			width: 60upx;
			height: 60upx;
			border-radius: 50%;
			margin-bottom: 10upx;
		}
		
		.uni-list-item__container {
			border-top: 0upx;
		}
		
		.listbox {
			.huishouren {
				display: flex;
				flex-wrap: wrap;
				padding: 0 40upx;
				justify-content: space-around;
				.cusitem {
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					padding: 20upx;

					.name {
						color: #303030;
						font-size: 22upx;
						height: 28upx;
					}

					.point {
						height: 38upx;
						color: #303030;
						font-size: 22upx;
						margin-bottom: 10upx;
					}
				}
			}
		}

		.scroll-h {
			margin-top: 20upx;
			padding: 0upx 30upx;
			width: 100%;
			height: 80upx;
			flex-direction: row;
			white-space: nowrap;

			.uni-tab-item {
				display: inline-block;
				flex-wrap: nowrap;
				color: $font-color-light;
				font-size: 28upx;
				border: 2upx solid $font-color-light;
				padding: 0 20upx;
				height: 48upx;
				line-height: 48upx;
				margin-right: 40upx;
				border-radius: 8upx;

				&.active {
					background-color: $font-color-light;
					color: $font-color-withe;
				}
			}
		}
	}
</style>
