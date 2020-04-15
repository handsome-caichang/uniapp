<template>
	<view class="uni-page-body">
		<view class="status"  :style="{position:headerPosition}" ></view>
		<view class="header-box">
			<view class="item" :class="isactive?'active':''"  @tap="changepage(true)" >
				回收站
			</view>
			<view class="item" :class="!isactive?'active':''"  @tap="changepage(false)" >
				我要买货
			</view>
		</view>
		<view class="container">
			<sell-pro ref="sellpro" v-if="isactive"></sell-pro>
			<buy-pro ref="buypro" v-if="!isactive"></buy-pro>
		</view>
	</view>
</template>	
<script>
	import buyPro from "./child/buypro.vue"
	import sellPro from "./child/sellpro.vue"
	export default {
		components: {
			sellPro,
			buyPro
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
				isactive: true,
				headerPosition: 'fixed'
			}
		},
		onReachBottom() {
			this.getmore()
		},
		methods: {
			changepage(flag) {
				this.isactive = flag;
			},
			getmore() {
				this.$nextTick(()=>{
					if (this.isactive){
						this.$refs.sellpro.getmore();
					}else {
						this.$refs.buypro.getmore();
					}
				})
			}
		}
	}
</script>
<style lang="scss" scoped>
	.uni-page-body {
		height: 100%;
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
		.container {
			flex: 1;
			height: 100%;
		}
	}
</style>
