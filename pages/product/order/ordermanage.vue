<template>
	<view class="uni-page-body">
		<view class="header-box">
			<view class="item" :class="isactive?'active':''"  @tap="changepage(true)" >
				我是货主
			</view>
			<view class="item" :class="!isactive?'active':''"  @tap="changepage(false)" >
				我要回收人
			</view>
		</view>
		<view class="container">
			<input-order ref="sellpro" v-if="isactive"></input-order>
			<out-order ref="buypro" v-if="!isactive"></out-order>
		</view>
	</view>
</template>
<script>
	import inputOrder from "./child/inputorder.vue"
	import outOrder from "./child/outorder.vue"
	export default {
		components: {
			inputOrder,
			outOrder
		},
		data() {
			return {
				isactive: true,
			}
		},
		onShow() {
			if (this.isactive) {
				this.$nextTick(function(){
					this.$refs.sellpro.updatedata();
				})
			}else {
				this.$nextTick(function(){
					this.$refs.buypro.updatedata();
				})
			}
		},
		methods: {
			changepage(flag) {
				this.isactive = flag;
			},
			getmore() {
				
			}
		}
	}
</script>
<style lang="scss" scoped>
	.header-box {
		width: 100%;
		padding: 0;
		height: 100upx;
		display: flex;
		align-items: center;
		justify-content: space-around;

		.item {
			color: #212121;
			font-size: 38upx;
			padding: 0 20upx;

			&.active {
				border-bottom: 4upx solid $font-color-light;
			}
		}
		
	}
</style>
