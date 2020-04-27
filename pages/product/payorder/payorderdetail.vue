<template>
	<view class="uni-page-body payorderdetail">
		<view class="uni-flex content">
			<view class="left">
				<image :src="orderdetail.buyUser.headImage" class="headerimg"></image>
				<view class="title" style="font-weight: 500;margin-top: 30upx;">
					{{orderdetail.buyUser.nickName}}
				</view>
			</view>
			<image class="jiaoyiimg" src="/static/img/jiaoyi.png"></image>
			<view class="right">
				<image :src="orderdetail.sellUser.headImage" class="headerimg"></image>
				<view class="title" style="font-weight: 500;margin-top: 30upx;">
					<text>{{orderdetail.sellUser.nickName}}</text>
				</view>
			</view>
		</view>
		<view class="content-pro">
			<view class="title">
				货物类别：{{orderdetail.buyClassify}}
			</view>
			<view class="title">
				录入货物数量：{{orderdetail.buyCount}}
			</view>
			<view class="title">
				买家是否录入订单：{{orderdetail.isBuyWrite==1?'已录入':'未录入'}}
			</view>
			<view class="title">
				卖家是否录入订单：{{orderdetail.isSellWrite==1?'已录入':'未录入'}}
			</view>
			<view class="title">
				交易类型：{{orderdetail.buyType==1?'称重交易':'估值交易' }}
			</view>
			<view class="title">
				交易时间：{{ utils.timeTodate('Y m-d', ordetail.createTime)}}
			</view>
			<view class="title">
				买家录入金额：{{ orderdetail.buyMoney ? orderdetail.buyMoney / 100 : ""}} 元
			</view>
			<view class="title">
				卖家录入金额：{{ orderdetail.sellMoney ? orderdetail.sellMoney / 100 : ''}} 元
			</view>
			<!-- <view class="title">
				可获取鼓励金：{{orderdetail.giveEncourageMoney}} 元
			</view>
			<view class="title">
				{{orderdetail.isPayCommission == 1 ? '已' : '未'}}支付佣金： {{orderdetail.payCommissionMoney}} 元
			</view> -->
			<!--  -->
		</view>
	</view>
</template>
<script>
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	import utils from '@/components/shoyu-date/utils.filter.js';
	export default {
		components: {
			uniIcons
		},
		created() {
			// {"isSuccessful":1,"data":{
				// "giveEncourageMoney":200,"buyCount":0,"orderNo":"DD2020041519151646","payCommissionMoney":2,
				// "buyUser":{"sellUserId":"1","sellDistrict":null,"nickName":"蔡畅","headImage":"https://nb-fpb.oss-cn-hangzhou.aliyuncs.com/images/1586948568747121.png"},
				// "sellType":2,"buyMoney":10000,"payMsgMoney":3000,"sellClassify":"金属","isPayCommission":0,"sellCount":0,"isPayMsg":1,"buyType":2,"buyRemark":null,"sellMoney":10000,
				// "isGiveEncourageMoney":1,"matchId":23,"isSellWrite":1,"isBuyWrite":1,"buyClassify":"金属","sellRemark":null,
				// "sellUser":{"buyUserId":"2","star":0,"nickName":"蔡畅2号","headImage":"https://nb-fpb.oss-cn-hangzhou.aliyuncs.com/images/158677617925013.png","buyDistrict":null,"years":15}},"error":"成功"}
			this.ordetail = getApp().globalData.payorderdetail;
			this.api.order.getOrderInfo({
				data: {
					userId: getApp().globalData.userdata.userId,
					orderNo: this.ordetail.orderNo
				}
			}).then(res => {
				console.log(res);
				this.orderdetail = res.data;
			})
		},
		data() {
			return {
				utils,
				orderdetail: {
					buyUser: {},
					sellUser: {}
				},
				ordetail: {},
			}
		},
		methods: {
		},
	}
</script>

<style scoped lang="scss">
	.payorderdetail {
		.content-pro {
			padding: 40upx;
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
				height: 300upx;
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
