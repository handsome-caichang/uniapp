<template>
	<view class="uni-page-body">
		<view class="content">
			<view class="title">编号{{examineres.realseId}}订单发布审核结果</view>
			<view class="contact">你的编号“{{examineres.realseId}}”提审时间</view>
			<view class="contact">{{examineres.createTime}} </view>
			<view class="contact">订单发布审核未通过，原因如下：</view>
			<view class="res">{{examineres.failReason}}</view>
			<view class="time">{{examineres.createTime}} </view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				examineres: {}
			}
		},
		created() {
			this.examineres = getApp().globalData.examineres
		}
	}
</script>

<style scoped lang="scss">
	.content {
		margin: 180upx 50upx;
		border: 1upx solid #717171;
		padding: 10upx;
		.title {
			color: #212121;
			font-size: 34upx;
			text-align: center;
		}
		.contact {
			font-size: 28upx;
			color: #575757;
			text-align: center;
		}
		.res {
			font-size: 28upx;
			color: #575757;
		}
		.time{
			margin-top: 10upx;
			text-align: right;
			font-size: 22upx;
			color: #575757;
		}
	}
</style>
