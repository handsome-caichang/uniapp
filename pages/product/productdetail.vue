<template>
	<view class="detail">
		<view class="uni-flex uni-row item">
			<view class="text uni-flex" style="width: 230rpx;height: 230rpx;justify-content: center;align-items: center;">
				<image :src="detail.img" style="width: 210rpx;height: 210rpx;" @tap="headtap"></image>
			</view>
			<view class="uni-flex uni-column" style="flex: 1;justify-content: center;margin-left: 30upx;">
				<view class="text title" style="text-align: left;padding-top: 10rpx;color: #212121;">
					废铁 
					<text>2吨</text>
				</view>
				<view class="price">2015~3000元/吨</view>
				<view style="color: #212121;">宁波*****有限公司</view>
				<view class="uni-flex" style="justify-content:space-between;color: #575757;">
					<text>2019/12/13</text>
					<text>镇海</text>
				</view>
			</view>
		</view>
		<view class="item" style="margin-top: 30upx;color: #212121;font-size: 36upx;">
			货物详情：
		</view>
		<view class="s-container">
			<scroll-view class="scroll-view_H" scroll-x="true" scroll-left="120">
				<image class="img" v-for="(item,index) in prolist" :key="index" :src="item" mode="scaleToFill" @tap="listimgtap(index)"></image>
			</scroll-view>
		</view>
		<!-- 首页进来，实名认证  -->
		<view class="btn-container">
			<!-- <button type="primary">申请匹配</button> -->
			<view class="primary-btn" @tap="popbtn">
				申请匹配
			</view>
		</view>
		
		<!-- <view class="towbtn">
			<view class="error-btn" @tap="clearbtn">
				拒绝
			</view>
			<view class="primary-btn" @tap="tongyi">
				同意
			</view>
		</view> -->
	
		<!-- <view class="btn-container contact">
			<view class="primary-btn" @tap="popbtn">
				<uni-icons type="phone" size="18" color="#fff" ></uni-icons>
				<text>联系回收人</text>
			</view>
		</view> -->
	
	</view>
</template>

<script>
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	export default {
		components: {
			uniIcons
		},
		data() {
			return {
				items: [{
						value: 'USA',
						name: '美国'
					},
					{
						value: 'CHN',
						name: '中国',
						checked: 'true'
					},
					{
						value: 'BRA',
						name: '巴西'
					},
					{
						value: 'JPN',
						name: '日本'
					},
					{
						value: 'ENG',
						name: '英国'
					},
					{
						value: 'FRA',
						name: '法国'
					}
				],
				detail: {
					img: 'http://img001.hc360.cn/y5/M00/1B/45/wKhQUVYFE0uEZ7zVAAAAAMj3H1w418.jpg'
				},
				prolist: [
					'http://img001.hc360.cn/y5/M00/1B/45/wKhQUVYFE0uEZ7zVAAAAAMj3H1w418.jpg',
					'http://img001.hc360.cn/y5/M00/1B/45/wKhQUVYFE0uEZ7zVAAAAAMj3H1w418.jpg',
					'http://img001.hc360.cn/y5/M00/1B/45/wKhQUVYFE0uEZ7zVAAAAAMj3H1w418.jpg',
					'http://img001.hc360.cn/y5/M00/1B/45/wKhQUVYFE0uEZ7zVAAAAAMj3H1w418.jpg',
					'http://img001.hc360.cn/y5/M00/1B/45/wKhQUVYFE0uEZ7zVAAAAAMj3H1w418.jpg'
				]
			}
		},
		methods: {
			headtap() {
				uni.previewImage({
					current: 0,
					urls: [this.detail.img],
					indicator: 'none'
				})
			},
			listimgtap(current) {
				uni.previewImage({
					current: current,
					urls: this.prolist,
				})
			},
			clearbtn() {
				
			},
			tongyi() {
				uni.navigateTo({
					url: '/pages/other/pipeisuccess'
				})
			},
			checkbtn() {
				this.$refs.showtip.close();
				console.log(this.items.filter(item=>item.checked)[0])
			},
			checkboxChange (e) {
				var items = this.items,
					values = e.detail.value;
				for (var i = 0, lenI = items.length; i < lenI; ++i) {
					const item = items[i]
					if(values.indexOf(item.value) >= 0){
						this.$set(item,'checked',true)
					}else{
						this.$set(item,'checked',false)
					}
				}
			},
			popbtn() {
				uni.showModal({
					title: '申请匹配成功，等待货主确认。'
				})
				// this.$refs.showtip.open();
			}
		}
	}
</script>

<style lang="scss">
	.detail {
		overflow: hidden;
		padding: 0 20upx;
		.scroll-box{
			height: 800upx;
		}
		
		.towbtn {
			margin-top: 100upx;
			display: flex;
			justify-content: space-around;
			padding: 0 100upx;
			.primary-btn {
				margin-right: 0;
				width: 204upx;
				height: 104upx;
				line-height: 104upx;
				font-size: 38upx;
				text-align: center;
				border-radius: 5px;
				color: $font-color-withe;
				background-color: $uni-bg-color-grey;
			}
			.error-btn {
				width: 204upx;
				height: 104upx;
				line-height: 104upx;
				font-size: 38upx;
				text-align: center;
				border-radius: 5px;
				color: $font-color-withe;
				background-color: #E7211A;
			}
		}
		.pop-container {
			background-color: #EBEBEB;
			.top-box {
				text-align: center;
				height: 60upx;
				line-height: 60upx;
				font-size: 32upx;
			}
			.uni-list {
				.right {
					flex: 1;
					margin-left: 30upx;
				}
			}
		}
		.btn-container {
			margin-top: 200upx;
			&.contact {
				.primary-btn {
					height: 100upx;
					display: flex;
					justify-content: center;
					align-items: center;
					// flex-direction: column;
					width: 40%;
					.uni-icons {
						margin-left: 10upx;
						// height: 60upx;
					}
				}
			}
		}
		.primary-btn {
			position: relative;
			display: block;
			margin-left: auto;
			margin-right: auto;
			padding-left: 14px;
			padding-right: 14px;
			box-sizing: border-box;
			font-size: 18px;
			text-align: center;
			text-decoration: none;
			line-height: 2.55555556;
			border-radius: 5px;
			overflow: hidden;
			color: $font-color-withe;
			background-color: $uni-bg-color-grey;
		}
		.s-container {
			margin-top: 30upx;
			.scroll-view_H {
				white-space: nowrap;
				width: 100%;
				.img {
					display: inline-block;
					width: 160upx;
					height: 202upx;
					margin-right: 30upx;
				}
			}
		}
		.item {
			color: $font-color-dark;
			.btn {
				padding: 0 20upx;
				border-radius: 10upx;
				margin-left: 20upx;
				color: #007aff;
				border: 1upx solid #007aff;
			}
			.title {
				font-size: 36upx;
			}
			.address {
				text-indent: 20upx;
			}
			.listbox {
				flex-wrap: wrap;
				.pro-type-item {
					margin-top: 20upx;
					margin-right: 20upx;
				}
			}
		}
	}
</style>
