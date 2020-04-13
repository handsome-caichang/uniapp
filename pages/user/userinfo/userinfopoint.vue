<template>
	<view class="uni-page-body">
		<uni-list>
			<uni-list-item title="姓名"  :showArrow="false" :showBadge="true" >
				<text style="color:#575757;">{{user.realName}}</text>
			</uni-list-item>
			<!-- <uni-list-item title="性别"  :showArrow="false" :showBadge="true" >
				<text style="color:#575757;">男</text>
			</uni-list-item> -->
			<uni-list-item title="国籍（区域）"  :showArrow="false" :showBadge="true" >
				<text style="color:#575757;">中国大陆</text>
			</uni-list-item>
			<!-- <uni-list-item title="保证金"  :showArrow="false" :showBadge="true" >
				<text style="color:#575757;">未缴纳</text>
			</uni-list-item> -->
		</uni-list>
		<view class="viod" style="width: 100%;height: 18upx;background-color: #D3D3D3;"></view>
		<uni-list>
			<uni-list-item title="证件类型"  :showArrow="false" :showBadge="true" >
				<text style="color:#575757;">身份证</text>
			</uni-list-item>
			<uni-list-item title="证件号码"  :showArrow="false" :showBadge="true" >
				<text style="color:#575757;">{{user.idNumber}}</text>
			</uni-list-item>
			<uni-list-item title="证件有效期"  :showArrow="false" :showBadge="true" >
				<text style="color:#575757;">{{user.idCardValidity}}</text>
			</uni-list-item>
			<uni-list-item title="车牌号"  :showArrow="false" :showBadge="true" >
				<text style="color:#575757;">{{user.carCard}}</text>
			</uni-list-item>
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
			uniIcons,
			uniListItem
		},
		data() {
			return {
				user: {},
				uesrdata: {}
			}
		},
		created() {
			this.userdata = getApp().globalData.userdata;
			this.api.home.getRealInfo({
				data: {
					userId: this.userdata.userId
				}
			}).then(res => {
				this.user = res.data;
			})
		},
		methods: {
			
		},
	}
</script>

<style scoped lang="scss">
	.uni-page-body {
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
