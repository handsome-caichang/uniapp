<template>
	<view class="uni-page-body paypop">
	
		<view class="header-box border-bottom">
			<view class="text">
				支付金额（元）
			</view>
			<view class="price-box ">
				¥ <text>30</text>
			</view>
		</view>
	
		<view class="uni-list box-con">
			<radio-group @change="radioChange">
				<label class="uni-list-cell uni-list-cell-pd uni-list-item " v-for="(item, index) in items" :key="item.value">
					<view style="display:flex;justify-content: center;">
						<image style="width: 48upx;height: 48upx;margin-right: 20upx;" src="/static/img/gongkao.png"></image>
						<text>{{item.name}}</text>
					</view>
					<view>
						<radio color="#FFCC33" :value="item.value" :checked="index === current" />
					</view>
				</label>
			</radio-group>
			
			<view class="point">
				 注：本次支付为平台信息服务费，交易完成后平台将退还10元至余额；若未与货主达成交易，平台将全额收取服务费。支付成功即可与货主联系。
			</view>
			
		</view>
		
		<view class="btnbox">
			<view class="pri-box border-top">
				<view class="sun">
					总计：<text class="price">{{price}}元</text>
				</view>
			</view>
			<view class="rightbtn" @tap="clickpage">
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
				price: '368',
				items: [{
						value: 'USA',
						name: '余额支付'
					},
					// {
					// 	value: 'CHN',
					// 	name: '支付宝支付',
					// 	checked: 'true'
					// },
					{
						value: 'BRA',
						name: '微信支付'
					},
					// {
					// 	value: 'JPN',
					// 	name: '银行卡支付'
					// }
				],
				current: 0
			}
		},
		computed: {

		},
		methods: {
			clickpage() {
				this.$emit('clickpay', this.items[this.current])
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
	.uni-page-body {
		&.paypop {
			background-color: #fff;
		}
		.uni-list:before {
			height: 0;
		}
		.uni-list:after {
			height: 0;
		}
		.uni-list-item {
			padding-left: 100upx;
		}
		.uni-list-cell:after {
			height: 0;
		}
		.box-con {
			padding-bottom: 100upx;
			.point {
				padding: 50upx;
				color: #767676;
				font-size: 22upx;
			}
		}
		.header-box {
			padding: 20upx 20upx 0upx;
			.text {
				color: #212121;
				font-size: 34upx;
			}
			.price-box {
				height: 100upx;
				color: #212121;
				font-size: 44upx;
			}
		}
		
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
					height:94upx;
					line-height: 94upx;
					font-size: 34upx;
					font-weight: 500;
					.price {
						color: #E5AD0D;
						font-weight: bold;
					}
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
		
	}
</style>
