<template>
	<view class="detail">
		<view class="uni-flex uni-row item">
			<view class="text uni-flex" style="width: 180rpx;height: 180rpx;justify-content: center;align-items: center;" @tap="headtap">
				<image :src="detail.headImage" mode="aspectFit" style="width: 150rpx;height: 150rpx;"></image>
			</view>
			<view class="uni-flex uni-column" style="flex: 1;justify-content: center;">
				<view class="text title" style="text-align: left;padding-top: 10rpx;">
					{{detail.nickName}}
				</view>
				<view class="address">
					{{detail.province}}{{detail.city}}{{detail.district}}
				</view>
				<view style="font-size: 34upx;">
					可收货物：
				</view>
				<view class="uni-flex uni-row listbox">
					<view class="pro-type-item" v-for="(item,index) in detail.recoverys" :key="index" >{{item}}</view>
				</view>
			</view>
		</view>
		<view class="item">
			从业年限：<text>{{detail.years}}年</text>
		</view>
		<view class="item uni-flex"  style="align-items: center;" >
			信誉评分：<uni-rate class="rate" size="14" :value="customerdata.star" /> <text class="btn" @tap="toRateDetail">了解详情</text>
		</view>
		<view class="item">
			保证金缴纳：<text>{{detail.depositMoney?detail.depositMoney/100:0}}元</text>
		</view>
		<view class="item">
			更多展示
		</view>
		<view class="s-container" v-if="detail.images">
			<scroll-view class="scroll-view_H" scroll-x="true" scroll-left="120">
				<image class="img" v-for="(item,index) in detail.images" :key="index" :src="item" mode="aspectFit" @tap="listimgtap(index)"></image>
			</scroll-view>
		</view>
		
		<view class="towbtn"  v-if="customerdata.sourcetype == 3">
			<view class="error-btn" @tap="clearbtn">
				取消申请
			</view>
			<view class="primary-btn" @tap="popbtn">
				申请匹配
			</view>
		</view>
		
		<view class="towbtn" v-if="customerdata.sourcetype == 2">
			<view class="error-btn" @tap="clearbtn">
				拒绝
			</view>
			<view class="primary-btn" @tap="tongyi">
				同意
			</view>
		</view>
		<!-- v-if="sourcetype == '1'" 根据当前登录用户是否实名，没有去实名 -->
		<view class="btn-container" v-if="customerdata.sourcetype == 1"  >
			<view class="primary-btn" @tap="popbtn">
				申请匹配
			</view>
		</view>
		
	<!-- 	<view class="btn-container">
			<view class="icon-btn" @tap="callCustomer">
				<uni-icons type="phone" size="18" color="#fff" ></uni-icons>
				<text>联系回收人</text>
			</view>
		</view> -->
		
		<uni-popup ref="showtip" type="bottom">
			<view class="pop-container">
				<view class="top-box">
					选择匹配货物
				</view>
			<!-- 新增跳转tab 发布货物 -->
				<scroll-view scroll-y="true" class="scroll-box" >
					<view class="uni-list">
						<radio-group @change="checkboxChange">
							<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in productlist" :key="index">
								<view>
									<radio color="#09BB07" :value="item.realseId" :checked="index === currentindex" />
								</view>
								<view class="right">
									<view class="top" style="font-size: 32upx;">
										<text>{{item.classify}}</text>
										<text style="margin-left: 30upx;">{{item.count}}吨</text>
									</view>
									<view style="font-size: 24upx;">{{item.nickName}}</view>
									<view class="bottom" style="font-size: 24upx;">
										<text>发布时间：{{item.createTime}}</text>
										<!-- <text style="margin-left: 30upx;">镇海</text> -->
									</view>
								</view>
							</label>
						</radio-group>
					</view>
				</scroll-view>
				
				<view class="fo-box border-top">
					<view class="primary-btn" @tap="checkbtn">
						确认申请
					</view>
				</view>
			</view>
		</uni-popup>
		
	</view>
</template>

<script>
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	import uniRate from '@/components/uni-rate/uni-rate.vue'
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	export default {
		components: {
			uniRate,
			uniPopup,
			uniIcons
		},
		data() {
			return {
				productlist: [],
				currentindex: 0,
				detail: {
				},
				prolist: [
				],
				sourcetype: '',
				customerdata: {},
			}
		},
		created() {
			this.customerdata = getApp().globalData.customerdata;
			console.log(this.customerdata);
			if (this.customerdata.sourcetype == 2 || this.customerdata.sourcetype == 3) {
				this.customerdata.userId = this.customerdata.buyUserId;
			}
			this.api.home.getRecoveryInfo({
				data: {
					userId: this.customerdata.userId
				}
			}).then(res => {
				console.log(res);
				this.detail = res.data;
			})
		},
		methods: {
			//  f
			
			headtap() {
				uni.previewImage({
					current: 0,
					urls: [this.detail.headImage],
					indicator: 'none'
				})
			},
			listimgtap(current) {
				uni.previewImage({
					current: current,
					urls: this.detail.images,
				})
			},
			toRateDetail() {
				uni.navigateTo({
					url: '/pages/user/reputationrun'
				})
			},
			tongyi() {
				this.api.home.sureMatching({
					userId: getApp().globalData.userdata.userId,
					matchId: this.customerdata.matchId
				}).then(res => {
					console.log(res);
					uni.navigateTo({
						url: '/pages/other/pipeisuccess'
					})
				})
			},
			clearbtn() {
				this.api.home.cancelMatching({
					userId: getApp().globalData.userdata.userId,
					matchId: this.customerdata.matchId
				}).then(res => {
					uni.showModal({
						title: "提示",
						content: '成功拒绝',
						showCancel: false,
					});
				})
			},
			checkbtn() {
				this.api.home.realseAddMatching({
					"userId": getApp().globalData.userdata.userId,
					"toUserId": this.customerdata.userId,
					"realseId": this.productlist[this.currentindex].realseId,
				}).then(res => {
					uni.showModal({
						title: "提示",
						content: '申请匹配成功，等待回收人确认。',
						showCancel: false,
					});
					this.$refs.showtip.close();
				})
			},
			checkboxChange (e) {
			   for (let i = 0; i < this.productlist.length; i++) {
					if (this.productlist[i].value === e.target.value) {
						this.currentindex = i;
						break;
					}
				}
			},
			popbtn() {
				if (getApp().globalData.userdata.isReal !== 2) {
					uni.showModal({
						title: "提示",
						content: '该操作需要实名，请先前往我的->点击头像->实名认证，进行实名认证',
						showCancel: false,
					});
					return;
				}
				if (getApp().globalData.userdata.type == 1) {
					uni.showModal({
						title: "提示",
						content: '该操作需要发布货物，请先前往我是货主->发布货物，进行货物发布',
						showCancel: false,
					});
					return;
				}
				this.api.home.getSellUserGoodsList({
					data: {
						userId: getApp().globalData.userdata.userId
					}
				}).then(res => {
					console.log(res);
					this.productlist = res.data;
					this.$refs.showtip.open();
				})
			},
			callCustomer() {
				uni.makePhoneCall({
				    phoneNumber: this.detail.phone //仅为示例
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.detail {
		overflow: hidden;
		padding: 0 20upx;
		.scroll-box{
			height: 800upx;
		}
		.pop-container {
			background-color: #EBEBEB;
			.top-box {
				text-align: center;
				height: 60upx;
				line-height: 60upx;
				font-size: 32upx;
			}
			.uni-list {
				background-color: #EBEBEB;
				.right {
					flex: 1;
					margin-left: 30upx;
				}
			}
			.fo-box {
				padding-top: 40upx;
				padding-bottom: 40upx;
				display: flex;
				justify-content: center;
				.primary-btn{
					width: 290upx;
					height: 98upx;
					line-height: 98upx;
					font-size: 38upx;
					text-align: center;
					border-radius: 8upx;
					color: $font-color-withe;
					background-color: $uni-bg-color-grey;
				}
			}
		}
		.btn-container {
			margin-top: 100upx;
			&.contact {
				.primary-btn {
					height: 100upx;
					display: flex;
					justify-content: center;
					align-items: center;
					// flex-direction: column;
					width: 40%;
					.uni-icons {
						margin-left: 10upx;
						// height: 60upx;
					}
				}
			}
			.primary-btn {
				margin: 0 auto;
				width: 50%;
				height: 104upx;
				line-height: 104upx;
				padding-left: 14px;
				padding-right: 14px;
				font-size: 36upx;
				text-align: center;
				text-decoration: none;
				border-radius: 5px;
				overflow: hidden;
				color: $font-color-withe;
				background-color: $uni-bg-color-grey;
			}
			.icon-btn {
				margin: 0 auto;
				width: 50%;
				height: 104upx;
				padding-left: 14px;
				padding-right: 14px;
				box-sizing: border-box;
				font-size: 36upx;
				text-align: center;
				text-decoration: none;
				border-radius: 5px;
				overflow: hidden;
				color: $font-color-withe;
				background-color: $uni-bg-color-grey;
				display: flex;
				justify-content: center;
				align-items: center;
				.uni-icon {
					margin-right: 10upx;
				}
			}
		}
		.towbtn {
			margin-top: 100upx;
			display: flex;
			justify-content: space-between;
			padding: 0 30upx;
			.primary-btn {
				width: 290upx;
				height: 104upx;
				line-height: 104upx;
				font-size: 38upx;
				text-align: center;
				border-radius: 5px;
				color: $font-color-withe;
				background-color: $uni-bg-color-grey;
			}
			.error-btn {
				width: 290upx;
				height: 104upx;
				line-height: 104upx;
				font-size: 38upx;
				text-align: center;
				border-radius: 8upx;
				color: $font-color-withe;
				background-color: #E7211A;
			}
		}
		
		.s-container {
			margin-top: 30upx;
			.scroll-view_H {
				white-space: nowrap;
				width: 100%;
				.img {
					display: inline-block;
					width: 160upx;
					height: 202upx;
					margin-right: 30upx;
				}
			}
		}
		.item {
			color: $font-color-dark;
			font-size: 32upx;
			.btn {
				padding: 0 20upx;
				border-radius: 10upx;
				margin-left: 20upx;
				color: #007aff;
				border: 1upx solid #007aff;
			}
			.title {
				font-size: 38upx;
			}
			.address {
				text-indent: 20upx;
				font-size: 34upx;
			}
			.listbox {
				flex-wrap: wrap;
				.pro-type-item {
					margin-top: 20upx;
					margin-right: 20upx;
					font-size: 32upx;
				}
			}
		}
	}
</style>
