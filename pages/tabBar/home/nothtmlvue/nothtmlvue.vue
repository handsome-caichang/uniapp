<template>
	<view class="nothtmlvue">
		<view v-html="content"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				content: '',
			}
		},
		onLoad(options) {

		},
		created() {
			console.log(uni.getStorageSync("_notContent"))
			this.content = uni.getStorageSync("_notContent").content;
		}
	}
</script>

<style lang="scss" scoped>
	.nothtmlvue {
		font-size: 24upx;
		max-width: 100%;
		overflow-x: hidden;
		padding: 20upx;

		img {
			width: 100%;
		}
	}
</style>
