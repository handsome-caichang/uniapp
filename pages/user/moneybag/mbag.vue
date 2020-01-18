<template>
	<view class="uni-page-body">
		
		<view class="header-box">
			<image src="/static/img/goods/p1.jpg" class="img" ></image>
			<view class="price-box">
				<text>{{showyue}}</text>
				<text style="font-size: 34upx;">元</text>
			</view>
			<view class="iconfont icon-buxianshi" v-if="showprice" @click="changePassword" ></view>
			<view class="iconfont icon-xianshi" v-else @click="changePassword" ></view>
			<!-- <uni-icons style="margin-left:10upx" color="#fff" :type="showprice?'eye-slash':'eye'" size="24"  @click="changePassword" ></uni-icons> -->
		</view>
		<view class="viod"></view>
		
		<uni-list>
			<uni-list-item thumb="/static/img/user/chongzhi.png" title="充值" @tap="navTo('/pages/user/moneybag/chongzhi')" />
			<uni-list-item thumb="/static/img/user/tixian.png" title="提现"  @tap="navTo('/pages/user/moneybag/tixian')" />
			<uni-list-item thumb="/static/img/user/mingxi.png" title="收支明细"  @tap="navTo('/pages/user/moneybag/mingxi')" />
		</uni-list>
		
		<view class="uni-page-footer">
			<uni-icons type="info-filled" class="icon" color="#1F96F7"></uni-icons>
			常见问题
		</view>
		
		
	</view>
</template>
<script>
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	import uniList from '@/components/uni-list/uni-list.vue'
	import uniListItem from '@/components/uni-list-item/uni-list-item.vue'
	export default {
		components: {
			uniList,
			uniListItem,
			uniIcons
		},
		data() {
			return {
				yue: "5623.00",
				showprice: false,
			}
		},
		computed: {
			showyue: function () {
				if (this.showprice) {
					let str = '';
					for (var i = 0; i < this.yue.length; i++) {
						str += '*';
					}
					return str
				}else {
					return this.yue
				}
			},
		},
		created() {
			this.initdata();
		},
		methods: {
			navTo(url) {
				uni.navigateTo({
					url
				})
			},
			changePassword() {
				this.showprice = !this.showprice;
			},
			initdata() {
				this.api.home.getWealth({
					userId: getApp().globalData.userdata.userId,
				}).then(res => {
					this.yue = res.wealth;
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.uni-page-body {
		.header-box{
			display: flex;
			justify-content: space-between;
			align-items: center;
			background:linear-gradient(180deg,rgba(24,192,44,1) 0%,rgba(127,234,139,1) 100%);
			padding: 40upx 100upx;
			margin-bottom: 24upx;
			.img {
				height: 142upx;
				width: 142upx;
				margin-right: 8upx;
			}
			.price-box {
				color: #FFFFFF;
				font-size: 56upx;
			}
			.iconfont {
				margin-left: 20upx;
				color: #fff;
				font-size: 48upx;
			}
		}
		.uni-page-footer{
			position: fixed;
			bottom: 50upx;
			left: 0upx;
			right: 0upx;
			text-align: center;
			color: #1F96F7;
			font-size: 22upx;
			.icon {
				margin-right: 10upx
			}
		}
	}
</style>
