<template>
	<view class="uni-page-body header-page-bodys">
		<view class="header-box">
			<view class="item" :class="isactive?'active':''" @tap="changepage(true)">
				发布货物
			</view>
			<view class="item" :class="!isactive?'active':''" @tap="changepage(false)">
				发布求购
			</view>
		</view>
		<view class="containers">
			<input-bond ref="sellpro" v-if="isactive"></input-bond>
			<out-bond ref="buypro" v-if="!isactive"></out-bond>
		</view>
	</view>
</template>
<script>
	import inputBond from "./child/inputbond.vue"
	import outBond from "./child/outbond.vue"
	export default {
		components: {
			inputBond,
			outBond
		},
		data() {
			return {
				isactive: true,
			}
		},
		methods: {
			changepage(flag) {
				this.isactive = flag;
			},
		}
	}
</script>
<style lang="scss" scoped>
	.header-page-bodys {

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
	}
</style>
