<template>
	<view class="uni-page-body">
		<view class="input-container">
			<view class="point">
				充值金额
			</view>
			<view class="input-box">
				<view class="icon-box">
					￥
				</view>
				<input type="number" class="input" v-model="bondnum" maxlength="12" placeholder="请输入100的整倍数" >
			</view>
		</view>
		<view class="input-container">
			<view class="point">
				充值方式
			</view>
		</view>
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

		<view class="btnbox" :class="{'isded':!bondnum}" @tap="chongzhi" >
			确认充值
		</view>


	</view>
</template>
<script>
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	import uniList from '@/components/uni-list/uni-list.vue'
	import uniListItem from '@/components/uni-list-item/uni-list-item.vue'
	export default {
		components: {
			uniList,
			uniIcons,
			uniListItem
		},
		data() {
			return {
				bondnum: '',
				radiosvalue: '',
				items: [
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
				current: 1
			}
		},
		onLoad() {
		},
		methods: {
			radioChange(evt) {
				for (let i = 0; i < this.items.length; i++) {
					if (this.items[i].value === evt.target.value) {
						this.current = i;
						break;
					}
				}
			},
			chongzhi() {
				if (this.bondnum) {
					console.log(11)
					this.api.home.balanceRecharge({
						typeId: 1,
						userId: getApp().globalData.userdata.userId,
						money: this.bondnum * 100
					}).then(res => {
						console.log(res);
						var orderString = res.data;
						uni.requestPayment({
						    provider: 'wxpay',
						    orderInfo: orderString.data, //微信、支付宝订单数据
						    success: function (res) {
						        console.log('success:' + JSON.stringify(res));
								uni.navigateTo({
									url: '/pages/other/chongzhisuccess'
								})
						    },
						    fail: function (err) {
						        console.log('fail:' + JSON.stringify(err));
						    }
						});
					})
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.uni-page-body {
		
		.input-container {
			padding: 30upx 34upx;

			.point {
				padding-left: 30upx;
				color: #212121;
				font-size: 34upx;
			}

			.input-box {
				margin-top: 30upx;
				display: flex;
				align-items: center;
				border: 1upx solid #717171;
				padding: 4upx 10upx;
				border-radius: 4upx;

				.icon-box {
					width: 60upx;
					height: 80upx;
					line-height: 80upx;
					margin-right: 10upx;
					text-align: center;
					font-size: 44upx;
					color: #212121;
				}

				.input {
					flex: 1;
				}
			}
		}

		.btnbox {
			margin: 0 auto;
			margin-top: 78upx;
			width: 50%;
			text-align: center;
			line-height: 100upx;
			height: 100upx;
			color: #fff;
			background-color: $font-color-light;
			font-size: 40upx;
			border-radius: 8upx;

			&.isded {
				background-color: #ADDBB3;
			}
		}

	}
</style>
