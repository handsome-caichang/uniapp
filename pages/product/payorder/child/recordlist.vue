<template>
	<view class="uni-page-body orderin">
		<view class="shoudao">
			<view class="uni-list">
				<uni-list>
					<uni-list-item :thumb="item.img" :showBadge="true" :showArrow="false" :note="'交易时间：'+item.time+'  '+item.address+'       '+item.cardid"
					 v-for="(item,index) in recordlist" :key="index" @tap="clickitem(item)">
						<view slot="content" style="height: 50upx;">
							<text style="font-size: 34upx;margin-right: 20upx;">{{item.name}}</text>
						</view>
						<view slot="content_end" class="uni-flex" style="align-items: center;height: 50upx;">
							<text style="margin-right: 20upx;">{{item.type}}</text>
							<text style="margin-right: 20upx;">{{item.num}}</text>
						</view>
					</uni-list-item>
				</uni-list>
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
			uniListItem,
		},
		created() {},
		data() {
			return {
				recordlist: [{
					name: '王先生',
					num: '3吨',
					time: '2019/12/13',
					address: '镇海',
					img: '/static/img/missing-face.png',
					type: '废铁',
					cardid: 'NO.1111112',
				}, {
					name: '王先生',
					num: '3吨',
					time: '2019/12/13',
					address: '镇海',
					img: '/static/img/missing-face.png',
					type: '废铁',
					cardid: 'NO.1111112',
				}, {
					name: '王先生',
					num: '3吨',
					time: '2019/12/13',
					address: '镇海',
					img: '/static/img/missing-face.png',
					type: '废铁',
					cardid: 'NO.1111112',
				}, ]
			}
		},
		methods: {
			clickitem(item) {
				uni.navigateTo({
					url: '/pages/product/payorder/payorderdetail'
				})
			}
		},
	}
</script>

<style scoped lang="scss">
	.orderin {}
</style>
