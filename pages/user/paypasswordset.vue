<template>
	<view class="container">
		<view class="list-cell ">
			<text class="cell-tit">旧密码（首次设置不需要）</text>
			<input class="uni-input" type="password" :maxlength="18" v-model="oldpassword" placeholder="请输入密码" placeholder-class="p-active" />
		</view>
		<view class="list-cell ">
			<text class="cell-tit">新密码</text>
			<input class="uni-input" type="password" :maxlength="18" v-model="newpassword" placeholder="请输入密码" placeholder-class="p-active" />
		</view>
		<view class="list-cell ">
			<text class="cell-tit">确认密码</text>
			<input class="uni-input" type="password" :maxlength="18" v-model="conpassword" placeholder="请输入密码" placeholder-class="p-active" />
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
				oldpassword: '',
				newpassword: '',
				conpassword: ''
			};
		},
		onLoad() {

		},
		methods: {
			fabu() {
				if (this.newpassword !== this.conpassword) {
					uni.showModal({
						title: "提示",
						content: '两次密码不一致',
						showCancel: false
					});
				} else {
					this.api.home.setPayPassword({
						userId: getApp().globalData.userdata.userId,
						oldPassword: this.oldpassword,
						payPassword: this.newpassword
					}).then(res => {
						uni.showModal({
							title: "提示",
							content: '修改成功',
							showCancel: false
						});
					})
				}
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
		width: 400upx;
		border: 2upx solid $border-color-base;
	}
	.cell-tit{
		flex: 1;
		font-size: $font-base + 2upx;
		color: $font-color-dark;
		margin-right:10upx;
	}
</style>
