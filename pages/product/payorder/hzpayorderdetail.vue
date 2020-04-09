<template>
	<view class="uni-page-body">
		<view class="payorderdetail">
			<view class="uni-list">
				<view class="uni-list-cell" v-for="(item,index) in recordlist" :key="index" @tap="nato(item)" >
					<view class="uni-media-list">
						<image class="uni-media-list-logo" :src="item.img"></image>
						<view class="uni-media-list-body">
							<view class="uni-media-list-text-top">{{item.name}}</view>
							<view class="uni-media-list-text-top">{{item.type}}  <text>{{item.num}}</text></view>
							<view class="uni-media-list-text-bottom uni-ellipsis">
								交易时间： <text style="margin-right: 10upx;">2019/12/13</text> <text>镇海</text>
								<text style="float: right;">NO.1111114</text>
							</view>
							<image src="/static/img/payery.png" class="payicon" v-if="item.status === 0" ></image>
							<image src="/static/img/paysuc.png" class="payicon" v-if="item.status === 1" ></image>
							<uni-icons type="arrowright" size="20" class="rowicon" v-if="item.status === 0" ></uni-icons>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	export default {
		components: {
			uniIcons
		},
		created() {
		},
		data() {
			return {
				recordlist: [
				]
			}
		},
		methods: {
			nato(item) {
				uni.navigateTo({
					url: '/pages/product/hzimportorder'
				})
			}
		},
	}
</script>

<style scoped lang="scss">
	.payorderdetail {
		margin-top: 20upx;
		.uni-media-list-body {
			position: relative;
		}
		.uni-media-list-logo{
			width: 48upx;
			height: 48upx;
		}
		.uni-media-list-body {
			height: auto;
		}
		.payicon{
			position: absolute;
			right: 168upx;
			width: 108upx;
			height: 86upx;
		}
		.rowicon{
			position: absolute;
			right: 0upx;
		}
	}
</style>
