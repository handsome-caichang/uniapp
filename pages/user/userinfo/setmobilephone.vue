<template>
	<view class="container">
		<view class="list-cell ">
			<text class="cell-tit">+86 |</text>
			<input class="uni-input" type="number" :maxlength="11" v-model="phoneNum" placeholder="请输入手机号" placeholder-class="p-active" />
		</view>
		<view class="fo-box">
			<view class="primary-btn" @tap="fabu">
				确认
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapMutations
	} from 'vuex';
	import uniIcons from '@/components/uni-icons/uni-icons.vue'
	export default {
		components: {
			uniIcons,
		},
		data() {
			return {
				phoneNum: '',
				userdata: {},
			};
		},
		created() {
			this.userdata = getApp().globalData.userdata;
		},
		methods: {
			fabu() {
				this.api.home.modifyUser({
					headImage: this.userdata.headImage,
					mobilePhone: this.phoneNum,
					years:  this.userdata.years,
					images: this.userdata.images,
					province:this.userdata.province,
					city:this.userdata.city,
					district:this.userdata.district,
					userId: this.userdata.userId,
				}).then(res => {
					uni.showModal({
						title: "提示",
						content: '修改成功',
						showCancel: false
					});
					let userdata = uni.getStorageSync('userdata');
					this.userdata.mobilePhone = this.phoneNum;
					let newuserdata = Object.assign(userdata, this.userdata);
					uni.setStorageSync('userdata', newuserdata);
					getApp().globalData.userdata = newuserdata;
					uni.$emit('_updateuserhome');
				})
			}
		}
	}
</script>

<style lang='scss' scoped>
	page {
		background: $page-color-base;
	}
	
	.fo-box {
		display: flex;
		justify-content: center;
		margin-top: 20upx;
		margin-bottom: 20upx;
		.primary-btn {
			width: 326upx;
			height: 98upx;
			line-height: 98upx;
			text-align: center;
			background-color: #18C02C;
			border-radius: 8upx;
			color: #fff;
			font-size: 38upx;
		}
	}
	.list-cell {
		display: flex;
		align-items: center;
		padding: 20upx $page-row-spacing;
		position: relative;
		background: #fff;
		justify-content: space-between;
	}
	.cell-more {
		flex: 1;
		font-size:$font-lg;
		color: #575757;
		margin-left:10upx;
	}
	.uni-input {
		display: inline-block;
		width: 600upx;
		border: 2upx solid $border-color-base;
	}
	.cell-tit{
		flex: 1;
		font-size: $font-base + 2upx;
		color: $font-color-dark;
		margin-right:10upx;
	}
</style>
