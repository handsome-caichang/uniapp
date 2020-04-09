<template>
	<view class="uni-page-body orderin">
		<view class="shoudao">
			<view class="uni-list">
				<uni-list>
					<uni-list-item :thumb="item.headerimg" :showBadge="true" :showArrow="false" :note="'交易时间：'+item.createTime+'  '+item.district"
					 v-for="(item,index) in recordlist" :key="index">
						<view slot="content" style="height: 50upx;">
							<text style="font-size: 34upx;margin-right: 20upx;">{{item.userName}}</text>
						</view>
						<view slot="content_end" class="uni-flex" style="align-items: center;height: 50upx;">
							<text style="margin-right: 20upx;">{{item.goodsName}}</text>
							<text style="margin-right: 20upx;">{{item.count}}</text>
						</view>
					</uni-list-item>
				</uni-list>
			</view>
		</view>
		<view class="no-pro" v-if="!recordlist.length">
			<icon type="warn" size="80" color="#F8B551"></icon>
			<view class="text">暂无数据</view>
		</view>
	</view>
</template>
<script>
	import uniList from '@/components/uni-list/uni-list.vue'
	import uniListItem from '@/components/uni-list-item/uni-list-item.vue'
	export default {
		components: {
			uniList,
			uniListItem,
		},
		created() {},
		data() {
			return {
				recordlist: []
			}
		},
		created() {
			this.api.order.getOrderList({
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
		methods: {
		},
	}
</script>

<style scoped lang="scss">
	.orderin {}
</style>
