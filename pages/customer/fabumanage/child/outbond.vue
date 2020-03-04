<template>
	<view class="uni-page-body outbond">
		<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(item,index) in list" :key="index">
			<view class="uni-media-list">
				<image class="uni-media-list-logo" :src="item.headImage"></image>
				<view class="uni-media-list-body">
					<view class="uni-media-list-text-top"> {{item.name}}</view>
					<view class="uni-media-list-text-bottom uni-ellipsis">
						<text style="margin-right: 20upx;">{{item.createTime}}</text>
						<text>{{item.district}}</text>
					</view>
				</view>
				<view class="option-box">
					<uni-icons type="arrowthinup" size="24"></uni-icons>
					<uni-icons type="arrowthindown" size="24" ></uni-icons>
					<uni-icons type="trash" size="24" @tap="del(item)" ></uni-icons>
					<view class="checked-box" @tap="jiaji(item)" >
						<checkbox :checked="item.urgent" color="#E7211A" />
						<text style="color: #E7211A;">加急</text>
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
		data() {
			return {
				list: []
			}
		},
		created() {
			this.getdata();
		},
		methods: {
			getdata() {
				this.api.home.getRecoveryList({
					data: {
						userId: getApp().globalData.userdata.userId,
						countPerPage: 2000,
						pageIndex: 1
					}
				}).then(res=>{
					this.list = res.data
				})
			},
			del(item) {
				this.api.home.delRecovery({
					userId: getApp().globalData.userdata.userId,
					id: item.recoveryId
				}).then(res=>{
					this.getdata();
				})
			},
			jiaji(item) {
				if (item.urgent) {
					this.api.home.urgentRecovery({
						userId: getApp().globalData.userdata.userId,
						id: item.recoveryId
					}).then(res=>{
						this.getdata();
					})
				}else {
					this.api.home.cancelUrgentRecovery({
						userId: getApp().globalData.userdata.userId,
						id: item.recoveryId
					}).then(res=>{
						this.getdata();
					})
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.outbond {
		.option-box {
			display: flex;
			align-items: center;
			.uni-icons {
				display: inline-block;
				height: 60upx;
				width: 60upx;
				display: flex;
				justify-content: center;
				align-items: center;
				margin-right: 10upx;
			}
			.checked-box{
				margin-left: 20upx;
			}
		}
		.uni-media-list-logo {
			height: 50upx;
			width: 50upx;
			border-radius: 50upx;
		}
		.uni-media-list  {
			padding-left: 10px;
			padding-right: 10px;
		}
		.list-succ {
			&.class1 {
				color: #E7211A;
			}
			&.class2 {
				color: #1596F7;
			}
			&.class3 {
				color: #18C02C;
			}
			&.class4 {
				color: #E7211A;
			}
		}
	}
</style>
