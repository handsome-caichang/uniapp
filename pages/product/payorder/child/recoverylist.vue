<template>
	<view class="uni-page-body orderin">
		<view class="shoudao">
			<view class="uni-list">
				<uni-list>
					<uni-list-item :thumb="item.img" :showBadge="true" :showArrow="false" :note="'最近交易：'+item.time+'  '+item.address"
					 v-for="(item,index) in recordlist" :key="index">
						<view slot="content" style="height: 50upx;">
							<text style="font-size: 34upx;margin-right: 20upx;">{{item.name}}</text>
							<text style="padding:2upx 4upx;font-size: 22upx;border: 1upx solid #AAAAAA;color: #575757;border-radius: 10upx;"
							 @tap="addRemk(item)">备注</text>
						</view>
						<view slot="content_end" class="uni-flex" style="align-items: center;height: 50upx;">
							<text style="margin-right: 20upx;">交易种类：{{item.type}}</text>
						</view>
						<view @tap="clickitem(item)" style="background-color: #18C02C;color: #fff;padding: 4upx 8upx;border-radius: 10upx;">
							再次交易
						</view>
						<uni-badge class="uni-badge-right-top" :text="item.count" type="error" />
					</uni-list-item>
				</uni-list>
			</view>
		</view>
		<uni-popup ref="beizhushuru" type="center">
			<view class="inputbox">
				<view class="uni-textarea">
					<textarea :focus="true" v-model="remak" placeholder="请输入备注" />
					<view class="btn-box">
						<view class="left" @tap="closebeizhushuru">
							取消
						</view>
						<view class="right" @tap="subbeizhu">
							确认
						</view>
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>
<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import uniList from '@/components/uni-list/uni-list.vue'
	import uniListItem from '@/components/uni-list-item/uni-list-item.vue'
	import uniBadge from '@/components/uni-badge/uni-badge.vue'
	export default {
		components: {
			uniList,
			uniListItem,
			uniPopup,
			uniBadge
		},
		created() {
		},
		data() {
			return {
				remak: '',
				recordlist: [
					{
						name: '宁波康达医疗有限公司',
						num: '3吨',
						time: '2019/12/13',
						address: '镇海',
						img: '/static/img/missing-face.png',
						type: '废铁',
						cardid: 'NO.1111112',
						count: 1,
					},{
						name: '宁波康达医疗有限公司',
						num: '3吨',
						time: '2019/12/13',
						address: '镇海',
						img: '/static/img/missing-face.png',
						type: '废铁',
						cardid: 'NO.1111112',
						count: 1,
					},{
						name: '宁波康达医疗有限公司',
						num: '3吨',
						time: '2019/12/13',
						address: '镇海',
						img: '/static/img/missing-face.png',
						type: '废铁',
						cardid: 'NO.1111112',
						count: 1,
					},
				]
			}
		},
		methods: {
			clickitem(item) {
				uni.navigateTo({
					url: '/pages/product/payorder/payorderdetail'
				})
			},
			addRemk(item) {
				this.$nextTick(() => {
					this.$refs.beizhushuru.open();
				})
			},
			closebeizhushuru() {
				this.$refs.beizhushuru.close();
			},
			subbeizhu() {
				this.$refs.beizhushuru.close();
				uni.showToast({
					title: this.remak,
					icon: 'none'
				})
			}
		},
	}
</script>

<style lang="scss">
	.orderin {
		.uni-badge-right-top {
			position: absolute;
			top: 10upx;
			right: 20upx;
			transform: scale(0.8);
		}
		.inputbox {
			width: 600upx;
			height: 400upx;
			margin: 0 auto;
			background-color: #fff;
			border-radius: 8upx;
			padding: 20upx;
			.uni-textarea{
				font-size: 28upx;
				uni-textarea {
					border: 1upx solid $border-color-base;
				}
				.btn-box {
					margin-top: 100upx;
					padding: 0 100upx;
					display: flex;
					justify-content: space-around;
					align-items: center;
					.left,.right {
						height: 60upx;
						line-height: 60upx;
						width: 160upx;
						text-align: center;
						color: #666;
						border: 1upx solid $border-color-base;
						border-radius: 8upx;
					}
					.right{
						background-color: #007AFF;
						color: #FFFFFF;
						border: none;
					}
				}
			}
		}
	}
			
</style>
