<template>
	<view class="uni-page-body orderin">
		<view class="listbox" style="margin-top: 20upx;">
			<view class="uni-list">
				<view class="uni-list-item" style="padding: 0 40upx;" >
					<view class="uni-flex">
						<image :src="detail.img" class="headerimg" style="margin-top: 20upx;"></image>
						<view class="content" style="margin-left:10upx;flex: 1">
							<view class="title" style="font-size: 34upx;">{{detail.nickName}}</view>
							<view class="title" style="font-size: 34upx;">
								<text>{{detail.goodsName}}</text>
								<text style="margin-left: 20upx;">{{detail.count}}</text>
							</view>
							<view style="color: #575757;font-size: 28upx;">
								发布时间：<text>{{detail.createTime}}</text> <text>{{detail.sellDistrict}}</text>
							</view>
						</view>
						<view class="btnbox" style="margin-top: 30upx;" @tap="showguanli" >
							<view style="color: #18C02C;border: 1upx solid #18C02C;padding: 2upx 20upx;border-radius: 20upx;">管理</view>
						</view>
					</view>
				</view>
			</view>
			<view class="huishouren" style="padding: 0upx;">
				<view class="cusitem" v-for="(user,index) in detail.userList" :key="index">
					<uni-icons type="close" size="12" color="#E7211A" class="clear-icon" v-if="guanlishow" @tap="clearuser(user,index)" ></uni-icons>
					<image :src="user.headImage" class="headerimg"></image>
					<view class="name">{{user.nickName}}</view>
					<view class="point">从业{{user.years}}年</view>
					<uni-rate class="rate" :size="12" :value="user.star" />
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
		data() {
			return {
				guanlishow: false,
				detail: {
				},
			}
		},
		created() {
			this.detail =  getApp().globalData.userlistmanage;
		},
		methods: {
			clearuser(user,index) {
				// this.huishoulist.splice(index,1);
				this.api.home.cancelMatching({
					userId: user.buyUserId,
					matchId: this.detail.matchId
				}).then(res => {
					uni.showModal({
						title: "提示",
						content: '删除成功',
						showCancel: false,
					});
					this.detail.userList.splice(index,1);
				})
			},
			showguanli() {
				this.guanlishow = !this.guanlishow;
			},
			
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
		
		.listbox {
			
			.uni-list:before{
				height: 0;
			}
			.uni-list:after  {
				height: 0;
			}
			
			.huishouren {
				margin-top: 40upx;
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
					position: relative;
					.clear-icon {
						position: absolute;
						top: 0upx;
						right: 10upx;
						height: 50upx;
						width: 50upx;
					}
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
	}
</style>
