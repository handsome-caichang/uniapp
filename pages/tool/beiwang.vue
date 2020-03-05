<template>
	<view class="uni-page-body">
		<view class="uni-text" style="font-size: 32upx;color: #666;padding: 20upx;">
			 <textarea @blur="bindTextAreaBlur" :focus="true" v-model="note" :selection-start="note.length" :selection-end="note.length" auto-height />
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				note: ""
			}
		},
		created() {
			this.note = uni.getStorageSync("_noteText");
		},
		methods: {
			bindTextAreaBlur() {
				uni.setStorageSync("_noteText", this.note)
			}
		}
	}
</script>

<style>
</style>
