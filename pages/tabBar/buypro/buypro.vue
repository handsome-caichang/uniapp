<template>
	<view class="uni-page-body">
		<view class="status"  :style="{position:headerPosition}" ></view>
		<view class="header-box">
			<view class="item" :class="isactive?'active':''"  @tap="changepage(true)" >
				价格查询
			</view>
			<view class="item" :class="!isactive?'active':''"  @tap="changepage(false)" >
				发布货物
			</view>
		</view>
		<view class="container">
			<price-vue ref="sellpro" v-if="isactive"></price-vue>
			<!-- 需要实名 -->
			<fabu-vue ref="buypro" v-if="!isactive"></fabu-vue>
		</view>
	</view>
</template>
<script>
	import fabuVue from "./child/fabuvue.vue"
	import priceVue from "./child/pricevue.vue"
	export default {
		components: {
			priceVue,
			fabuVue
		},
		onPageScroll(e) {
			//兼容iOS端下拉时顶部漂移
			if (e.scrollTop >= 0) {
				this.headerPosition = "fixed";
			} else {
				this.headerPosition = "absolute";
			}
		},
		data() {
			return {
				isactive: false,
				headerPosition: 'fixed'
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
	.header-box {
		width: 100%;
		padding: 0;
		height: 100upx;
		display: flex;
		align-items: center;
		justify-content: space-around;
		/*  #ifdef  APP-PLUS  */
		margin-top: var(--status-bar-height); //覆盖样式
		/*  #endif  */
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
