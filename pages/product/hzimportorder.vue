<template>
	<view class="importorder">
		<view class="uni-flex content">
			
			<view class="left">
				<image src="/static/img/goods/p8.jpg" class="headerimg"></image>
				<view class="title" style="font-weight: 500;">
					黄先生
				</view>
				<view class="title">
					从业年限：5年
				</view>
				<view class="title pinfen">
					信誉评分：
					<uni-rate class="rate" :size="12" :value="5" />
				</view>
				<view class="address">
					<text style="margin-right: 20upx;">镇海</text>
				</view>
			</view>
			<image class="jiaoyiimg" src="/static/img/jiaoyi.png"></image>
			<view class="right">
				<image src="/static/img/goods/p8.jpg" class="headerimg"></image>
				<view class="title" style="font-weight: 500;">
					<text>废铁</text>
					<text style="margin-left: 10upx;">2吨</text>
				</view>
				<view class="title">
					宁波*****有限公司
				</view>
				<view class="title">
					2019/12/13
				</view>
				<view class="address">
					<text style="margin-right: 20upx;">镇海</text>
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
						<view class="input" :class="protype.value?'':'place'">
							{{protype.value ? protype.value : protype.label }}
						</view>
						<uni-icons class="icon" type="arrowdown"></uni-icons>
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
						<view class="input" :class="protype.value?'':'place'">
							{{protype.value ? protype.value : protype.label }}
						</view>
						<uni-icons class="icon" type="arrowdown"></uni-icons>
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
		
		<view class="btnbox">
			确认录入
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
			}
		},
		methods: {
			openrul() {
				this.$nextTick(() => {
					this.$refs.showrul.open();
				})
			},
			changepage(flag) {
				this.isactive = flag;
			},
		}
	}
</script>

<style lang="scss" scoped>
	.importorder {
		.uni-list-cell::after{
			height: 0;
		}
		.btnbox {
			color: #fff;
			font-size: 38upx;
			height: 98upx;
			line-height: 98upx;
			width: 326upx;
			margin: 0 auto;
			margin-top: 120upx;
			text-align: center;
			background-color: #18C02C;
			border-radius: 8upx;
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
