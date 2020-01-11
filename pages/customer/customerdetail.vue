<template>
	<view class="detail">
		<view class="uni-flex uni-row item">
			<view class="text uni-flex" style="width: 180rpx;height: 180rpx;justify-content: center;align-items: center;" @tap="headtap">
				<image :src="detail.img" style="width: 150rpx;height: 150rpx;"></image>
			</view>
			<view class="uni-flex uni-column" style="flex: 1;justify-content: center;">
				<view class="text title" style="text-align: left;padding-top: 10rpx;">
					黄先生
				</view>
				<view class="address">
					震撼
				</view>
				<view>
					可收货物：
				</view>
				<view class="uni-flex uni-row listbox">
					<view class="pro-type-item">飞天<text class="jiaji">(加急)</text>
					</view>
					<view class="pro-type-item">飞天</view>
					<view class="pro-type-item">飞天</view>
					<view class="pro-type-item">飞天</view>
					<view class="pro-type-item">飞天</view>
					<view class="pro-type-item">飞天</view>
				</view>
			</view>
		</view>
		<view class="item">
			从业年限：<text>5年</text>
		</view>
		<view class="item uni-flex"  style="align-items: center;" >
			信誉评分：<uni-rate class="rate" size="14" :value="3" /> <text class="btn" @tap="toRateDetail">了解详情</text>
		</view>
		<view class="item">
			保证金缴纳：<text>5300元</text>
		</view>
		<view class="item">
			更多展示
		</view>
		<view class="s-container">
			<scroll-view class="scroll-view_H" scroll-x="true" scroll-left="120">
				<image class="img" v-for="(item,index) in prolist" :key="index" :src="item" mode="scaleToFill" @tap="listimgtap(index)"></image>
			</scroll-view>
		</view>
		
		<!-- <view class="towbtn">
			<view class="error-btn" @tap="clearbtn">
				取消
			</view>
			<view class="primary-btn" @tap="popbtn">
				申请匹配
			</view>
		</view>
		
		<view class="towbtn">
			<view class="error-btn" @tap="clearbtn">
				拒绝
			</view>
			<view class="primary-btn" @tap="tongyi">
				同意
			</view>
		</view> -->
		<!-- v-if="sourcetype == '1'" 根据当前登录用户是否实名，没有去实名 -->
		<view class="btn-container" >
			<!-- <button type="primary">申请匹配</button> -->
			<view class="primary-btn" @tap="popbtn">
				申请匹配
			</view>
		</view>
		
	<!-- 	<view class="btn-container contact">
			<view class="primary-btn" @tap="popbtn">
				<uni-icons type="phone" size="18" color="#fff" ></uni-icons>
				<text>联系回收人</text>
			</view>
		</view> -->
		
		<uni-popup ref="showtip" type="bottom">
			<view class="pop-container">
				<view class="top-box">
					选择匹配货物
				</view>
			<!-- 新增跳转tab 发布货物 -->
				<scroll-view scroll-y="true" class="scroll-box" >
					<view class="uni-list">
						<radio-group @change="checkboxChange">
							<label class="uni-list-cell uni-list-cell-pd" v-for="item in items" :key="item.value">
								<view>
									<radio color="#09BB07" :value="item.value" :checked="item.checked" />
								</view>
								<view class="right">
									<view class="top" style="font-size: 32upx;">
										<text>飞天</text>
										<text style="margin-left: 30upx;">3顿</text>
									</view>
									<view style="font-size: 24upx;">宁波易鑫科技有限公司</view>
									<view class="bottom" style="font-size: 24upx;">
										<text>发布时间：2019/12/13</text>
										<text style="margin-left: 30upx;">镇海</text>
									</view>
								</view>
							</label>
						</radio-group>
					</view>
				</scroll-view>
				
				<view class="fo-box border-top">
					<view class="primary-btn" @tap="checkbtn">
						确认申请
					</view>
				</view>
			</view>
		</uni-popup>
		
	</view>
</template>

<script>
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	import uniRate from '@/components/uni-rate/uni-rate.vue'
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	export default {
		components: {
			uniRate,
			uniPopup,
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
					img: 'http://img001.hc360.cn/y5/M00/1B/45/wKhQUVYFE0uEZ7zVAAAAAMj3H1w418.jpg',
				},
				prolist: [
					'http://img001.hc360.cn/y5/M00/1B/45/wKhQUVYFE0uEZ7zVAAAAAMj3H1w418.jpg',
					'http://img001.hc360.cn/y5/M00/1B/45/wKhQUVYFE0uEZ7zVAAAAAMj3H1w418.jpg',
					'http://img001.hc360.cn/y5/M00/1B/45/wKhQUVYFE0uEZ7zVAAAAAMj3H1w418.jpg',
					'http://img001.hc360.cn/y5/M00/1B/45/wKhQUVYFE0uEZ7zVAAAAAMj3H1w418.jpg',
					'http://img001.hc360.cn/y5/M00/1B/45/wKhQUVYFE0uEZ7zVAAAAAMj3H1w418.jpg'
				],
				sourcetype: ''
			}
		},
		onLoad: (options) => {
			console.log(options)
			console.log(this)
			// this.sourcetype = options.sourcetype;
		},
		methods: {
			//  f
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
			toRateDetail() {
				uni.navigateTo({
					url: '/pages/user/reputationrun'
				})
			},
			tongyi() {
				uni.navigateTo({
					url: '/pages/other/pipeisuccess'
				})
			},
			checkbtn() {
				this.$refs.showtip.close();
				console.log(this.items.filter(item=>item.checked)[0])
				
				uni.showModal({
					title: '申请匹配成功，等待回收人确认。'
				})
				
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
				this.$refs.showtip.open();
			}
		}
	}
</script>

<style lang="scss" scoped>
	.detail {
		overflow: hidden;
		padding: 0 20upx;
		.scroll-box{
			height: 800upx;
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
				background-color: #EBEBEB;
				.right {
					flex: 1;
					margin-left: 30upx;
				}
			}
			.fo-box {
				padding-top: 40upx;
				padding-bottom: 40upx;
				display: flex;
				justify-content: center;
				.primary-btn{
					width: 290upx;
					height: 98upx;
					line-height: 98upx;
					font-size: 38upx;
					text-align: center;
					border-radius: 8upx;
					color: $font-color-withe;
					background-color: $uni-bg-color-grey;
				}
			}
		}
		.btn-container {
			margin-top: 100upx;
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
			.primary-btn {
				position: relative;
				display: block;
				margin-left: auto;
				margin-right: auto;
				padding-left: 14px;
				padding-right: 14px;
				box-sizing: border-box;
				font-size: 36upx;
				text-align: center;
				text-decoration: none;
				line-height: 2.55555556;
				border-radius: 5px;
				overflow: hidden;
				color: $font-color-withe;
				background-color: $uni-bg-color-grey;
			}
		}
		.towbtn {
			margin-top: 100upx;
			display: flex;
			justify-content: space-between;
			padding: 0 30upx;
			.primary-btn {
				width: 290upx;
				height: 104upx;
				line-height: 104upx;
				font-size: 38upx;
				text-align: center;
				border-radius: 5px;
				color: $font-color-withe;
				background-color: $uni-bg-color-grey;
			}
			.error-btn {
				width: 290upx;
				height: 104upx;
				line-height: 104upx;
				font-size: 38upx;
				text-align: center;
				border-radius: 8upx;
				color: $font-color-withe;
				background-color: #E7211A;
			}
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
