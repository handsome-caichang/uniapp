<template>
	<view class="uni-page-body">
		<view class="viod">
			
		</view>
		<view class="input-container">
			
			<view class="point">
				转出金额（元）
			</view>
			<view class="input-box">
				<view class="icon-box">
					￥
				</view>
				<input type="number" class="input" v-model="bondnum" placeholder="请输入100的整倍数" maxlength="12" >
				<view class="all" style="color: #18C02C;">
					全部
				</view>
			</view>
		</view>
		
		<view class="btnbox" :class="{'isded':!bondnum}" >
			确认转出
		</view>
		
		<view class="text">
			<text> 转出的金额将在24小时后存至余额，可在</text>
			<text style="color: #212121;">我的—余额 </text>
			<text>中查看</text>
		</view>
	</view>
</template>
<script>
	export default {
		components: {
		},
		data() {
			return {
				bondnum: '',
			}
		},
		methods: {
			
		}
	}
</script>

<style scoped lang="scss">
	.uni-page-body {
		.text {
			margin: 0 auto;
			margin-top: 30upx;
			width: 60%;
			font-size: 22upx;
			text-align: center;
			color: #767676;
		}
		
		.viod {
			height: 12upx;
			width: 100%;
			background-color: #FAFAFA;
			margin-top: 30upx;
		}
		.input-container {
			.point {
				padding-left: 20upx;
				padding-top: 30upx;
				color: #212121;
				font-size: 34upx;
			}
			.input-box {
				margin-top: 30upx;
				display: flex;
				align-items: center;
				border-bottom: 1upx solid #E3E3E3;
				padding: 10upx 60upx 10upx 20upx;
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