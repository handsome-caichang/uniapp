<template>
	<view class="uni-page-body vipsend">

		<view class="header-box">
			<view class="uni-flex">
				<image  :src="userdata.headImage" class="img"></image>
				<view class="name-box">
					<text class="name">{{userdata.name}}</text>
					<text class="vip">黄金</text>
				</view>
			</view>
			<view class="vip-point">
				<view class="vip-text">货物推荐 &bull; 首页展示 &bull; 发布求购</view>
				<view class="vip-text">货物推荐 &bull; 首页展示 &bull; 发布求购</view>
				<view class="vip-text">货物推荐 &bull; 首页展示 &bull; 发布求购</view>
			</view>
			<view class="xingyu">
				VIP
			</view>
		</view>
		
		<view class="vip-content">
			<view class="typelist">
				<view class="item" :class="{'active': isactive}" @tap="changevip(true)">
					黄金VIP
				</view>
				<view class="item" :class="{'active': !isactive}" @tap="changevip(false)">
					钻石VIP
				</view>
			</view>
			<view class="listcon">
				<view class="listhuanj" v-if="isactive">
					<view class="hjitem">&bull; 发布5种求购信息</view>
					<view class="hjitem">&bull; 平台推荐3吨及以下货物</view>
					<view class="hjitem">&bull; 获得优先匹配权</view>
					<view class="hjitem">&bull; 首页展示个人资料</view>
				</view>
				<view class="listhuanj" v-else>
					<view class="hjitem">&bull; 发布10种求购信息</view>
					<view class="hjitem">&bull; 平台推荐3吨以上(预估)货物</view>
					<view class="hjitem">&bull; 获得优先匹配权</view>
					<view class="hjitem">&bull; 首页展示个人资料</view>
					<view class="hjitem">&bull; 可加急求购</view>
				</view>
			</view>
			
			<view class="list-sku">
				<view class="sku-item" :class="{'active': isactivesku==1}" @tap="changesuk(1)">3个月</view>
				<view class="sku-item" :class="{'active': isactivesku==2}" @tap="changesuk(2)">6个月</view>
				<view class="sku-item" :class="{'active': isactivesku==3}" @tap="changesuk(3)" >1年</view>
			</view>
			
		</view>
	
	
		<view class="uni-list">
			<radio-group @change="radioChange">
				<label class="uni-list-cell uni-list-cell-pd uni-list-item " v-for="(item, index) in items" :key="item.value">
					<view style="display:flex;justify-content: center;">
						<image style="width: 48upx;height: 48upx;margin-right: 20upx;" :src="item.icon"></image>
						<text>{{item.name}}</text>
					</view>
					<view>
						<radio color="#FFCC33" :value="item.value" :checked="index === current" />
					</view>
				</label>
			</radio-group>
		</view>
		
		<view class="btnbox">
			<view class="pri-box border-top">
				<view class="sun">
					总计：<text class="price">{{price}}元</text>
				</view>
				<view class="point">开通会员代表接受《会员服务协议》</view>
			</view>
			<view class="rightbtn" @tap="sub">
				确认支付
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
			uniListItem,
			uniIcons,
			uniRate
		},
		data() {
			return {
				isactive: true,
				isactivesku: 2,
				price: '',
				userdata: {},
				items: [
					{
						value: 'USA',
						name: '余额支付',
						icon: '/static/img/pay/yuebao.png',
					},
					// {
					// 	value: 'CHN',
					// 	name: '支付宝支付',
					// 	checked: 'true',
					// 	icon: '/static/img/pay/zhifubao.png',
					// },
					{
						value: 'BRA',
						name: '微信支付',
						icon: '/static/img/pay/weixin.png',
					},
					// {
					// 	value: 'JPN',
					// 	name: '银行卡支付',
					// 	icon: '/static/img/pay/yinhanka.png',
					// }
				],
				current: 0,
				viplist: [],
			}
		},
		computed: {

		},
		created() {
			this.userdata = getApp().globalData.userdata;
			this.api.home.walletgetVipList({
				data: {
					userId: this.userdata.userId
				}
			}).then(res => {
				console.log(res)
				this.viplist = res.data;
				this.setvipprice();
			})
		},
		methods: {
			setvipprice() {
				var vipType = this.isactive ? 0 : 1;
				var vipTime = this.isactivesku;
				this.viplist.forEach(item => {
					if (item.vipType == vipType && vipTime == item.vipType) {
						this.price = item.price;
					}
				})
			},
			sub() {
				this.api.home.submitVipOrder({
					vipType: this.isactive ? 0 : 1,
					timeType: this.current + 1,
					userId: this.userdata.userId
				}).then(res => {
					console.log(res);
					// "orderNo": "VIP202004071359001"
					this.api.home.payVipOrder({
						"orderNo": res.data.orderNo,
						"userId": this.userdata.userId,
						"payType": this.current == 0 ? 2 : 1
					}).then(ret => {
						var orderString = ret.data;
						console.log(ret)
						uni.requestPayment({
						    provider: 'wxpay',
						    orderInfo: orderString, //微信、支付宝订单数据
						    success: function (res) {
								uni.showModal({
									title: "提示",
									content: '充值成功，请关闭APP后再次进入',
									showCancel: false,
								});
						    },
						    fail: function (err) {
						       uni.showModal({
						       	title: "提示",
						       	content: '支付失败',
						       	showCancel: false,
						       });
						    }
						});
					})
				})
			},
			changevip(flg) {
				this.isactive = flg;
				this.setvipprice();
			},
			changesuk(nu) {
				this.isactivesku = nu;
				this.setvipprice();
			},
			radioChange(evt) {
				for (let i = 0; i < this.items.length; i++) {
					if (this.items[i].value === evt.target.value) {
						this.current = i;
						break;
					}
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.vipsend {
		padding-bottom: 98upx;
		.btnbox {
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.pri-box {
				flex: 1;
				padding-left: 50upx;
				.sun {
					height: 56upx;
					font-size: 34upx;
					font-weight: 500;
					.price {
						color: #E5AD0D;
					}
				}
				.point {
					height: 40upx;
					color: #767676;
					font-size: 24upx;
				}
			}
			.rightbtn {
				width:244upx;
				height:96upx;
				line-height: 96upx;
				background:linear-gradient(180deg,rgba(255,204,60,1) 0%,rgba(254,229,172,1) 100%);
				text-align: center;
				color: #83551F;
				font-size: 28upx;
			}
		}
		
		.vip-content {
			.list-sku {
				display: flex;
				padding: 0upx 0upx 60upx 80upx;
				.sku-item {
					margin-right: 20upx;
					color: #3D3D3D;
					border: 2upx solid #FEC932;
					width: 120upx;
					font-size: 28upx;
					text-align: center;
					border-radius: 20upx;
					&.active {
						background-color: #FFF2D3;
					}
					&.did {
						border: 2upx solid rgba($color: #000000, $alpha: 0);
						background-color: #AAAAAA;
					}
				}
			}
			.listhuanj {
				padding: 27upx 0upx 30upx 80upx;
				display: flex;
				flex-wrap: wrap;
				.hjitem{
					color: #FEC932;
					font-size: 28upx;
					margin-right: 20upx;
				}
			}
			.typelist {
				margin-top: 47upx;
				padding: 0 80upx;
				display: flex;
				.item {
					padding: 24upx;
					margin-right: 60upx;
					border:2upx solid #FEC932;
					border-radius:12upx;
					color: #3D3D3D;
					font-size: 28upx;
					&.active {
						background-color: #FFF2D3;
					}
				}
			}
		}
		.header-box {
			background: linear-gradient(128deg, rgba(255, 204, 60, 1) 0%, rgba(254, 229, 172, 1) 100%);
			padding: 40upx 20upx;
			margin-bottom: 24upx;
			position: relative;

			.xingyu {
				position: absolute;
				right: 20upx;
				bottom: 62upx;
				width: 382upx;
				height: 144upx;
				font-size: 200upx;
				line-height: 1;
				text-align: center;
				color:rgba(254,254,254,0.37);
			}

			.img {
				height: 62upx;
				width: 62upx;
				border-radius: 50%;
			}

			.vip-point {
				margin-top: 20upx;
				.vip-text {
					color: #fff;
					font-size: 22upx;
				}
			}

			.name-box {
				color: #fff;
				width: 120upx;
				margin-left: 10upx;
				line-height: 1;
				.name {
					font-size: 38upx;
					font-weight: 500;
					text-align: center;
				}

				.vip {
					font-size: 34upx;
					text-align: center;
				}
			}

		}
	}
</style>
