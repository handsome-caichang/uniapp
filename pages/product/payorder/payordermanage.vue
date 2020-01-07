<template>
	<view class="uni-page-body payordermanage">
		<view class="header-box">
			<view class="item" :class="isactive===0?'active':''" @tap="changepage(0)">
				交易记录
			</view>
			<view class="item" :class="isactive===1?'active':''" @tap="changepage(1)">
				我的回收
			</view>
			<view class="item" :class="isactive===2?'active':''" @tap="changepage(2)">
				我的出售
			</view>

		</view>
		<view class="container">
			<record-list v-if="isactive===0"></record-list>
			<recovery-list v-if="isactive===1"></recovery-list>
			<sell-list v-if="isactive===2"></sell-list>
			<!-- <input-order ref="sellpro" v-if="isactive"></input-order> -->
			<!-- <out-order ref="buypro" v-if="!isactive"></out-order> -->
		</view>
	</view>
</template>
<script>
	import recordList from "./child/recordlist.vue"
	import recoveryList from "./child/recoverylist.vue"
	import sellList from "./child/sellList.vue"
	export default {
		components: {
			recordList,
			recoveryList,
			sellList
		},
		data() {
			return {
				isactive: 0,
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
	.payordermanage {
		.container {
			padding-top: 40upx;
		}

		.header-box {
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
