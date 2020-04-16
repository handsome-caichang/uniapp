<template>
	<view class="uni-page-body orderin">
		<scroll-view class="scroll-h" :scroll-x="true" :show-scrollbar="false">
			<view class="uni-tab-item" v-for="(item,index) in tablist" :key="index" :class="{'active': activeindex == index,'hongdian': index == 2 }" @tap="changetab(index)">
				{{item}}
				<text v-if="index == 2 && newleng" class="hongdiannum">{{newleng}}</text>
			</view>
		</scroll-view>

		<view class="listbox" style="margin-top: 20upx;">
			<view v-if="activeindex === 0">
				<view class="huishouren">
					<view class="cusitem" v-for="(item,index) in huishoulist" :key="index" @tap="nvtocustomer(item,1)">
						<image mode="aspectFit" :src="item.headImage" class="headerimg"></image>
						<view class="name">{{item.nickName}}</view>
						<view class="point">从业{{item.year}}年</view>
						<uni-rate class="rate" :size="12" :value="item.star" />
					</view>
				</view>
				<view class="no-pro" v-if="!huishoulist.length">
					<icon type="warn" size="80" color="#F8B551"></icon>
					<view class="text">暂无数据</view>
				</view>
				<view class="genghuanbtn" style="text-align: right;color:#1F96F7;margin-top: 20upx;margin-right: 40upx;">
					<uni-icons type="loop" size="18" color="#1F96F7" style="margin-right:10upx"></uni-icons>
					换一批
				</view>
			</view>
			<view class="uni-list" v-if="activeindex === 1">
				<view class="no-pro" v-if="!jilulist.length">
					<icon type="warn" size="80" color="#F8B551"></icon>
					<view class="text">暂无数据</view>
				</view>
				<view class="uni-list-item border-bottom" style="padding: 0 40upx;" v-for="(item, index) in jilulist" :key="index">
					<view class="uni-flex">
						<image mode="aspectFit" :src="item.images ? item.images[0] : ''" class="headerimg" style="margin-top: 20upx;"></image>
						<view class="content" style="margin-left:10upx;flex: 1">
							<view class="title" style="font-size: 34upx;">{{item.nickName}}</view>
							<view class="title" style="font-size: 34upx;">
								<text>{{item.goodsName}}</text>
								<text style="margin-left: 20upx;">{{item.count}}吨</text>
							</view>
							<view style="color: #575757;font-size: 28upx;">
								发布时间：<text>{{ utils.timeTodate('Y m-d', item.createTime) }}</text> <text style="float: right;">{{item.sellDistrict}}</text>
							</view>
						</view>
						<view class="btnbox" style="margin-top: 30upx;" @tap="guanli(item, '/pages/product/order/applicationrecord')">
							<view style="color: #18C02C;border: 1upx solid #18C02C;padding: 2upx 20upx;border-radius: 20upx;">管理</view>
						</view>
					</view>
					<view class="huishouren" style="padding: 0upx;">
						<view class="cusitem" v-for="(user) in item.userList" :key="user.buyUserId" @tap="nvtocustomer(user,3,item)">
							<image :src="user.headImage" class="headerimg"></image>
							<view class="name">{{user.nickName}}</view>
							<view class="point">从业{{user.years}}年</view>
							<uni-rate class="rate" :size="12" :value="user.star" />
						</view>
					</view>
				</view>
			</view>

			<view class="shoudao" v-if="activeindex === 2">
				<view class="no-pro" v-if="!shoudaolist.length">
					<icon type="warn" size="80" color="#F8B551"></icon>
					<view class="text">暂无数据</view>
				</view>
				<view class="uni-list">
					<uni-list>
						<uni-list-item class="" :thumb="item.headImage" :note="'申请时间：'+item.createTime" v-for="(item,index) in shoudaolist"
						 :key="index" @tap="sureMatching(item)">
							<view slot="content" style="height: 50upx;">
								<text style="font-size: 34upx;margin-right: 20upx;">{{item.buyUserName}}</text>
							</view>
							<view slot="content_end" class="uni-flex" style="align-items: center;height: 50upx;">
								<text style="font-size: 34upx;margin-right: 20upx;">从业{{item.buyUserYear}}年</text>
								<uni-rate class="rate" :size="12" :value="item.start" />
							</view>
							<view class="btn" v-if="item.status == 0" style="color: #fff;background-color: #18C02C;font-size: 28upx;padding: 0upx 20upx;border-radius: 20upx;margin-right: 40upx;">接受</view>
							<view class="btn" v-if="item.status == 1" style="color: #fff;background-color: #575757;font-size: 28upx;padding: 0upx 20upx;border-radius: 20upx;margin-right: 40upx;">已同意</view>
							<view class="btn"  v-if="item.status == 99" style="color: #fff;background-color: #DD524D;font-size: 28upx;padding: 0upx 20upx;border-radius: 20upx;margin-right: 40upx;">已拒绝</view>
						</uni-list-item>
					</uni-list>
				</view>
			</view>

			<view class="shoudao" v-if="activeindex === 3">
				<view class="no-pro" v-if="!successlist.length">
					<icon type="warn" size="80" color="#F8B551"></icon>
					<view class="text">暂无数据</view>
				</view>
				<view class="uni-list">
					<uni-list>
						<uni-list-item class="" :thumb="item.buyUserHeadImage" :note="'时间：'+item.createTime+'  '+item.sellDistrict"
						 v-for="(item,index) in successlist" :key="index" @tap="toorderdetail(item, '/pages/product/order/orderdetail')">
							<view slot="content" style="height: 50upx;">
								<text style="font-size: 34upx;margin-right: 20upx;">{{item.buyUserName}}</text>
							</view>
							<view slot="content_end" class="uni-flex" style="align-items: center;height: 50upx;">
								<text style="font-size: 34upx;margin-right: 20upx;">从业{{item.buyUserYear}}年</text>
								<uni-rate class="rate" :size="12" :value="item.start" />
							</view>
							<view class="btn" v-if="item.status == 99" style="color: #DD524D;font-size: 34upx;margin-right: 20upx;">匹配关闭</view>
							<view class="btn"  v-if="item.status == 0 || item.status == 1" style="color: #18C02C;font-size: 34upx;margin-right: 20upx;">匹配成功</view>
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
	import utils from '@/components/shoyu-date/utils.filter.js';
	export default {
		components: {
			uniList,
			uniIcons,
			uniRate,
			uniListItem
		},
		data() {
			return {
				utils,
				successlist: [],
				shoudaolist: [],
				tablist: [
					'回收人推荐',
					'申请记录',
					'收到申请',
					'匹配成功',
				],
				jilulist: [],
				activeindex: 0,
				huishoulist: [],
				newleng: 1,
			}
		},
		created() {
			this.api.home.realsegetNewReceivedMatchList({
				data: {
					userId:  getApp().globalData.userdata.userId,
				}
			}).then(res => {
				this.newleng = res.data.length;
			})
			this.gettuijian();
		},
		methods: {
			updatedata() {
				this.changetab(this.activeindex);
			},
			nvtocustomer(item, sourcetype, parent) {
				item.sourcetype = sourcetype;
				item.matchId = parent ? parent.matchId : '';
				getApp().globalData.customerdata = item;
				uni.navigateTo({
					url: `/pages/customer/customerdetail`
				});
			},
			changetab(active) {
				this.activeindex = active;
				if (this.activeindex == 1) {
					this.getjilu();
				} else if (this.activeindex == 2) {
					this.getshoudao();
				} else if (this.activeindex == 3) {
					this.getMatchSuccessList();
				}
			},
			gettuijian() {
				// 回收人推荐
				this.api.home.getRecommendRecoverUserList({
					data: {
						userId: getApp().globalData.userdata.userId,
						countPerPage: 2000,
						pageIndex: 1,
					}
				}).then(res => {
					console.log(res)
					this.huishoulist = res.data;
				})
			},
			getjilu() {
				this.api.home.getApplyMatchList({
					data: {
						userId: getApp().globalData.userdata.userId
					}
				}).then(res => {
					res.data.forEach(item => {
						let time = item.createTime.replace(' ', "T")
						let datetime = new Date(time).getTime();
						item.createTime = datetime;
					})
					this.jilulist = res.data;
				})
			},
			getMatchSuccessList() {
				this.api.home.getMatchSuccessList({
					data: {
						userId: getApp().globalData.userdata.userId
					}
				}).then(res => {
					this.successlist = res.data;
				})
			},
			getshoudao() {
				this.api.home.getReceivedMatchList({
					data: {
						userId: getApp().globalData.userdata.userId
					}
				}).then(res => {
					this.shoudaolist = res.data;
				})
			},
			sureMatching(item) {
				if (item.status == 0) {
					item.sourcetype = 2;
					getApp().globalData.customerdata = Object.assign({}, item);;
					uni.navigateTo({
						url: `/pages/customer/customerdetail`
					});
				}
			},
			toorderdetail(item) {
				getApp().globalData.orderdetail = Object.assign({}, item);;
				uni.navigateTo({
					url: `/pages/product/order/orderdetail`
				});
			},
			guanli(item, url) {
				getApp().globalData.userlistmanage =  Object.assign({}, item);;
				uni.navigateTo({
					url,
				})
			}
		},
	}
</script>

<style scoped lang="scss">
	.orderin {
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
				&.hongdian {
					position: relative;
				}
				.hongdiannum {
					position: absolute;
					border-radius: 50%;
					top: -6upx;
					right: -6upx;
					background-color: #E7211A;
					color: #fff;
					font-size: 32upx;
					width: 32upx;
					height: 32upx;
					line-height: 1;
					text-align: center;
					transform: scale(0.6);
				}
			}
		}
	}
</style>
