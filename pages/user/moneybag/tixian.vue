<template>
	<view class="uni-page-body">
		<view class="input-container">
			<view class="point">
				提现金额
			</view>
			<view class="input-box">
				<view class="icon-box">
					￥
				</view>
				<input type="number" class="input" v-model="bondnum" maxlength="12">
			</view>
			<view class="point" style="color:#575757;font-size: 24upx;">可用余额{{CashMoney / 100}}元</view>
		</view>
		<view class="input-container">
			<view class="point">
				提现至
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
			确认提现
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
				phone: '',
				items: [
					{
						value: 'BRA',
						name: '微信',
						icon: '/static/img/pay/weixin.png',
					}
					// {
					// 	value: 'CHN',
					// 	name: '支付宝',
					// 	checked: 'true',
					// 	icon: '/static/img/pay/zhifubao.png',
					// }
				],
				current: 0,
				CashMoney: 0
			}
		},
		created() {
			this.phone = getApp().globalData.userdata.mobilePhone;
			this.api.home.getCashMoney({
				data: {
					userId: getApp().globalData.userdata.userId
				}
			}).then(res => {
				console.log(res)
				this.CashMoney = res.data;
			})
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
					this.api.home.withdrawCash({
						userId: getApp().globalData.userdata.userId,
						money: this.bondnum,
					}).then(res  => {
						uni.navigateTo({
							url: '/pages/other/tixiansuccess'
						})
					})
				}
			},
			initdata() {
				this.api.home.getCashMoney({
					userId: getApp().globalData.userdata.userId,
				}).then(res => {
					this.CashMoney = res;
				})
			}
			// 
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
