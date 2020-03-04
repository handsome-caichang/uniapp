<template>
	<view class="uni-page-body orderin">
			<view class="shoudao" >
				<view class="uni-list">
					<uni-list>
						<uni-list-item :thumb="item.img" :showBadge="true" :showArrow="false" :note="'最近交易：'+item.createTime+'  '+item.district" v-for="(item,index) in recordlist"
						 :key="index" @tap="clickitem(item)" >
							<view slot="content" style="height: 50upx;">
								<text style="font-size: 34upx;margin-right: 20upx;">{{item.userName}}</text>
								<text style="padding:2upx 4upx;font-size: 16upx;border: 1upx solid #AAAAAA;color: #575757;border-radius: 10upx;">备注</text>
							</view>
							<view slot="content_end" class="uni-flex" style="align-items: center;height: 50upx;">
								<text style="margin-right: 20upx;">交易种类：{{item.goodsName}}</text>
							</view>
							<view style="background-color: #18C02C;color: #fff;padding: 4upx 8upx;border-radius: 10upx;">
								再次交易
							</view>
						</uni-list-item>
					</uni-list>
				</view>
			</view>

		</view>
	</view>
</template>
<script>
	import uniList from '@/components/uni-list/uni-list.vue'
	import uniListItem from '@/components/uni-list-item/uni-list-item.vue'
	export default {
		components: {
			uniList,
			uniListItem
		},
		created() {
			this.api.order.getSellOrderList({
				data: {
					userId: getApp().globalData.userdata.userId,
					countPerPage: 200,
					pageIndex: 1,
				}
			}).then(res => {
				console.log(res);
				this.recordlist = res.data;
			})
		},
		data() {
			return {
				recordlist: []
			}
		},
		methods: {
			clickitem(item) {
				uni.navigateTo({
					url: '/pages/product/payorder/hzpayorderdetail'
				})
			}
		},
	}
</script>

<style scoped lang="scss">
	.orderin {
		
	}
</style>
