<template>
	<view class="uni-page-body orderin">
		<view class="shoudao">
			<view class="uni-list">
				<uni-list>
					<uni-list-item :thumb="item.headerimg" :showBadge="true" :showArrow="false" :note="'交易时间：'+utils.timeTodate('Y m-d', item.createTime)+'  '+item.district"
					 v-for="(item,index) in recordlist" :key="index" @tap="gotodetail(item)" >
						<view slot="content" style="height: 50upx;">
							<text style="font-size: 34upx;margin-right: 20upx;">{{item.userName}}</text>
						</view>
						<view slot="content_end" class="uni-flex" style="align-items: center;height: 50upx;position: relative;">
							<text style="margin-right: 20upx;">{{item.goodsName}}</text>
							<text style="margin-right: 20upx;">{{item.count}}</text>
							<view class="statusimg">
								<image v-if="item.status==1" src="/static/img/paysuc.png" mode="aspectFit"></image>
								<image v-if="item.status==0"  src="/static/img/payery.png" mode="aspectFit"></image>
							</view>
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
	import utils from '@/components/shoyu-date/utils.filter.js';
	export default {
		components: {
			uniList,
			uniListItem,
		},
		created() {},
		data() {
			return {
				utils,
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
				res.data.forEach(item => {
					let time = item.createTime.replace(' ', "T")
					let datetime = new Date(time).getTime();
					item.createTime = datetime;
				})
				this.recordlist = res.data;
			})
		},
		methods: {
			gotodetail(item) {
				getApp().globalData.payorderdetail = item;
				uni.navigateTo({
					url: '/pages/product/payorder/payorderdetail'
				})
			}
		},
	}
</script>

<style scoped lang="scss">
	.orderin {
		.statusimg {
			position: absolute;
			top: 0%;
			right: 10%;
			image {
				width: 100upx;
				height: 100upx;
			}
		}
	}
</style>
