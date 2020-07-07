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
			var str = uni.getStorageSync("_notContent").content;
			var str2 = str.replace(new RegExp("img ","gm"),"img style='max-width:100% !important;'");
			this.content = str2;
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
			width: 100% !important;
		}
	}
	
</style>
