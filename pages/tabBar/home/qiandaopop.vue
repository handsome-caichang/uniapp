<template>
	<view class="uni-page-body qiandao">
		<view class="clonse-icon-box">
			<uni-icons @tap="closeitem" class="clonse-icon" type="close"  color="#fff" size="32" ></uni-icons>
		</view>
		<view class="content-box">
			<view class="header">
				 <icon type="success" color="#18C02C" size="26"/>
				<view class="success-text">
					签到成功
				</view>
				<!-- <view class="point-text">
					已经连续签到
				</view>
				<view class="list-box">
					<uni-steps :options="list1" active-color="#18C02C" :active="activeindex" />
				</view> -->
			</view>
			<view class="content">
				<image class="img" src="/static/img/qiandao.png" mode=""></image>
			</view>
		</view>
	</view>
</template>
<script>
	import uniSteps from '@/components/uni-steps/uni-steps.vue'
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	export default {
		components: {
			uniIcons,
			uniSteps
		},
		data() {
			return {
				list1: [
					{title:'1',desc:'第一天'},
					{title:'2',desc:'第二天'},
					{title:'3',desc:'第三天'},
					{title:'4',desc:'第四天'},
					{title:'5',desc:'第五天'},
					{title:'6',desc:'第六天'},
					{title:'7',desc:'第七天'}
				],
				activeindex: 2,
				
			}
		},
		computed: {

		},
		methods: {
			closeitem() {
				this.$emit('closepop')
			}
		}
	}
</script>

<style scoped lang="scss">
	.qiandao {
		position: relative;
		.clonse-icon-box {
			display: flex;
			justify-content: flex-end;
			width: 600upx;
			margin: 0 auto;
		}
		.content-box {
			margin: 0 110upx;
			background: rgba(255, 255, 255, 1);
			border-radius: 20upx;
			position: relative;
			.header {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				padding: 37upx 0upx 65upx;
				.success-text {
					color: #333333;
					font-size: 50upx;
				}
				.point-text {
					color: #666666;
					font-size: 24upx;
				}
				.list-box {
					display: flex;
					margin-top: 20upx;
				}
			}

			.content {
				display: flex;
				position: relative;

				.img {
					width: 600upx;
					height: 260upx;
					border-radius: 0upx 0upx 20upx 20upx;
				}
			}
		}
	}
</style>
