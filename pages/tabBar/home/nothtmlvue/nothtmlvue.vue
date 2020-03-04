<template>
	<view>
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

<style>
</style>
