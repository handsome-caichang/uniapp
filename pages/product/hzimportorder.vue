<template>
	<view class="importorder">
		<view class="uni-flex content">
			<view class="left">
				<image :src="orderdetail.buyUserHeadImage" class="headerimg"></image>
				<view class="title" style="font-weight: 500;">
					{{orderdetail.buyUserName}}
				</view>
				<view class="title">
					从业年限：{{orderdetail.buyUserYear}}年
				</view>
				<view class="title pinfen">
					信誉评分：<uni-rate class="rate" :size="12" :value="orderdetail.star" />
				</view>
				<view class="address">
					<text style="margin-right: 20upx;">{{orderdetail.buyDistrict}}</text>
				</view>
			</view>
			<image class="jiaoyiimg" src="/static/img/jiaoyi.png"></image>
			<view class="right">
				<image src="/static/img/goods/p8.jpg" class="headerimg"></image>
				<view class="title" style="font-weight: 500;">
					<text>{{orderdetail.sellUserName}}</text>
					<text style="margin-left: 10upx;">{{orderdetail.count}}吨</text>
				</view>
				<view class="title">
						{{orderdetail.buyUserName}}
				</view>
				<view class="title">
					{{orderdetail.createTime}}
				</view>
				<view class="address">
					<text style="margin-right: 20upx;">{{orderdetail.sellDistrict}}</text>
				</view>
			</view>
		</view>
		<view class="header-box">
			<view class="item" :class="isactive?'active':''" @tap="changepage(true)">
				称重交易
			</view>
			<view class="item" :class="!isactive?'active':''" @tap="changepage(false)">
				估值交易
			</view>
		</view>

		<view class="pay-content" v-if="isactive">
			<view class="form-box uni-flex ">
				<view class="item-box" style="margin-right: 60upx;">
					<view class="uni-label-box">
						<text class="text bitian">货物类别</text>
					</view>
					<view class="input-box">
						<picker @change="bindPickerChange" :value="protypeindex" :range="goodtypelist" range-key="name">
							<view class="uni-input">{{protype.value ? protype.value : protype.label }}</view>
						</picker>
						<!-- <view class="input" :class="protype.value?'':'place'">
							{{protype.value ? protype.value : protype.label }}
						</view>
						<uni-icons class="icon" type="arrowdown"></uni-icons> -->
					</view>
				</view>
				<view class="item-box">
					<view class="uni-label-box">
						<text class="text bitian">货物数量</text>
					</view>
					<view class="input-box">
						<input class="uni-input" v-model="numberleng" type="number" placeholder="请输入货物数量" />
					</view>
				</view>
			</view>
			<view class="form-box uni-flex ">
				<view class="item-box">
					<view class="uni-label-box">
						<text class="text bitian"> 成交金额 </text>
					</view>
					<view class="input-box">
						<input class="uni-input" v-model="pipeinum" maxlength="2" type="number" placeholder="请输入成交金额" />
					</view>
				</view>
			</view>
			<view class="text-class" style="display: flex;align-items: center;justify-content: flex-end;">
				需支付佣金：                         
				<view class="price"> ¥500 </view>
			</view>
			<view class="lj-detail" >
				<text class="lj-btn"  @tap="openrul">了解计算详情</text>
			</view>
		</view>
		<view class="pay-content"  v-if="!isactive">
			<view class="form-box uni-flex ">
				<view class="item-box" style="margin-right: 60upx;">
					<view class="uni-label-box">
						<text class="text bitian">货物类别</text>
					</view>
					<view class="input-box">
						<picker @change="bindPickerChange" :value="protypeindex" :range="goodtypelist" range-key="name">
							<view class="uni-input">{{protype.value ? protype.value : protype.label }}</view>
						</picker>
					</view>
				</view>
				<view class="item-box">
					
				</view>
			</view>
			<view class="form-box uni-flex ">
				<view class="item-box">
					<view class="uni-label-box">
						<text class="text bitian"> 成交金额 </text>
					</view>
					<view class="input-box">
						<input class="uni-input" v-model="pipeinum" maxlength="2" type="number" placeholder="请输入成交金额" />
					</view>
				</view>
			</view>
			<view class="text-class" style="display: flex;align-items: center;justify-content: flex-end;">
				需支付佣金：                         
				<view class="price"> ¥500 </view>
			</view>
			<view class="lj-detail">
				<text class="lj-btn"  @tap="openrul">了解计算详情</text>
			</view>
		</view>
		
		
		<view style="padding-bottom: 100upx;">
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
		</view>
		
		<view class="btnbox">
			<view class="pri-box border-top">
				<view class="sun">
					总计：<text class="price">{{price}}元</text>
				</view>
			</view>
			<view class="rightbtn" @tap="payclick">
				确认支付
			</view>
		</view>
		
		<!-- 底部分享弹窗 -->
		<uni-popup ref="showrul" type="center">
			<view class="uni-pup">
				<rul-pop></rul-pop>
			</view>
		</uni-popup>
		
		

	</view>
</template>

<script>
	import rulPop from './child/rulpop.vue'
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import uniIcons from '@/components/uni-icons/uni-icons.vue'
	import uniRate from '@/components/uni-rate/uni-rate.vue'
	import { mapMutations,mapState } from 'vuex';
	export default {
		components: {
			uniRate,
			uniIcons,
			uniPopup,
			rulPop
		},
		data() {
			return {
				isactive: true,
				protype: {
					label: "请选择货物类别",
					value: "",
				},
				numberleng: "",
				pipeinum: "",
				price: '368',
				items: [{
						value: 'USA',
						name: '余额支付'
					},
					{
						value: 'CHN',
						name: '支付宝支付',
						checked: 'true'
					},
					{
						value: 'BRA',
						name: '微信支付'
					},
					{
						value: 'JPN',
						name: '银行卡支付'
					}
				],
				current: 0,
				orderdetail: {},
				protypeindex: 0,
			}
		},
		created() {
			this.orderdetail =  getApp().globalData.orderdetail;
		},
		computed: {
			...mapState(["goodtypelist"])
		},
		methods: {
			bindPickerChange: function(e) {
				this.protypeindex = e.target.value;
				this.protype.value = this.goodtypelist[this.protypeindex].name;
			},
			openrul() {
				this.$nextTick(() => {
					this.$refs.showrul.open();
				})
			},
			changepage(flag) {
				this.isactive = flag;
			},
			payclick() {
				// uni.navigateTo({
				// 	url: '/pages/customer/customerdetail'
				// })
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

<style lang="scss" scoped>
	.importorder {
		.uni-list-cell::after{
			height: 0;
		}
		.btnbox {
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
			display: flex;
			justify-content: space-between;
			align-items: center;
			background-color: #eee;
			.pri-box {
				flex: 1;
				padding-left: 50upx;
				.sun {
					height: 96upx;
					line-height: 96upx;
					font-size: 34upx;
					font-weight: 500;
					.price {
						font-weight: bold;
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
		
		.text-class {
			color: #212121;
			font-size: 40upx;
			font-weight: bold;
			text-align: right;
			margin-right: 60upx;
			.price {
				font-weight: bold;
				font-size: 40upx;
				margin-left: 10upx;
				color: #18C02C;
			}
		}
		.header-box {
			padding: 0 10%;
			height: 100upx;
			display: flex;
			align-items: center;
			justify-content: space-around;

			.item {
				color: #212121;
				font-size: 38upx;
				padding: 0 20upx;

				&.active {
					border-bottom: 4upx solid $font-color-light;
				}
			}
		}

		.pay-content {
			.lj-detail {
				display: flex;
				justify-content: flex-end;
				margin-top: 10upx;
				margin-right: 60upx;
				.lj-btn {
					padding:0upx 4upx;
					color: #1F96F7;
					font-size: 28upx;
					border: 1upx solid #1F96F7;
					border-radius: 4upx;
				}
			}
			.form-box{
				padding: 0 60upx;
				margin-top: 20upx;
			}
			.item-box {
				margin-bottom: 12upx;
				flex: 1;
				.uni-label-box {
					flex: 2;
					display: flex;
					align-items: center;

					.img-icon {
						width: 40upx;
						height: 40upx;
						margin-right: 10upx;
					}

					.text {
						font-size: 33upx;
					}
				}

				.input-box {
					flex: 3;
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding: 1upx 20upx;
					height: 70upx;
					border: 1px solid #575757;
					border-radius: 6px;

					.input {
						&.place {
							color: #575757;
						}
					}

					.uni-input {
						padding: 0;
					}
				}
			}

		}

		.content {
			padding: 0 20upx;
			justify-content: center;
			align-items: center;

			.jiaoyiimg {
				width: 80upx;
				height: 40upx;
			}

			.left,
			.right {
				flex: 1;
				width: 298upx;
				height: 371upx;
				border-radius: 12upx;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				border: 1upx solid #717171;

				.headerimg {
					height: 150upx;
					width: 150upx;
					border-radius: 50%;
				}

				.title {
					height: 46upx;
					font-size: 34upx;
				}

				.pinfen {
					display: flex;
					align-items: center;
				}

				.address {
					width: 100%;
					color: #575757;
					text-align: right;
				}
			}
		}


	}
</style>
