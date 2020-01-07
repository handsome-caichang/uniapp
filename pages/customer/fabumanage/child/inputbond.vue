<template>
	<view class="uni-page-body">

		<view class="content-box">
			<checkbox-group @change="checkboxChange">
				<label class="uni-list-cell uni-list-cell-pd" v-for="item in items" :key="item.value">
					<view v-if="showguanli">
						<checkbox :value="item.value" :checked="item.checked" />
					</view>
					<view>
						<view class="uni-media-list" @tap="resultres(item)">
							<image class="uni-media-list-logo" src="/static/img/gongkao.png"></image>
							<view class="uni-media-list-body">
								<view class="uni-media-list-text-top">{{item.name}}</view>
								<view class="uni-media-list-text-bottom uni-ellipsis">发布时间：2019/12/13 镇海</view>
							</view>
							<view>
								<view class="list-succ">
									已交易
								</view>
								<view class="number-id">
									NO.1111111
								</view>
							</view>
						</view>
					</view>
				</label>
			</checkbox-group>
		</view>
		<view class="btnbox" v-if="!showguanli">
			<text class="btn" @tap="changeguanli">管理发布</text>
		</view>

		<view class="guanlibtn border-top" v-if="showguanli">
			<view class="checkbox">
				<checkbox-group @change="checkboxChangeall">
					<label>
						<checkbox value="all" />全选
					</label>
				</checkbox-group>
			</view>
			<view class="btn-box">
				<view class="_itemtype" @tap="changeguanli">
					关闭管理
				</view>
				<view class="_itemtype active" @tap="closeord">
					取消发布
				</view>
			</view>
		</view>

	</view>
</template>
<script>
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	import uniList from '@/components/uni-list/uni-list.vue'
	import uniListItem from '@/components/uni-list-item/uni-list-item.vue'
	export default {
		components: {
			uniList,
			uniIcons,
			uniListItem
		},
		data() {
			return {
				showguanli: false,
				items: [{
						value: 'USA',
						name: '美国'
					},
					{
						value: 'CHN',
						name: '中国',
						checked: 'true'
					},
					{
						value: 'BRA',
						name: '巴西'
					},
					{
						value: 'JPN',
						name: '日本'
					},
					{
						value: 'ENG',
						name: '英国'
					},
					{
						value: 'FRA',
						name: '法国'
					}
				]
			}
		},
		methods: {
				
			resultres(item) {
				uni.navigateTo({
					url: "/pages/customer/fabumanage/examineres",
					query: {
						id: item.value
					}
				})
				
			},
			closeord() {
				uni.showModal({
					title: '确认取消发布吗？',
					content: '取消后将不可恢复',
					success(res) {
						  if (res.confirm) {
							  
						  }
					}
				})
			},
			changeguanli() {
				this.showguanli = !this.showguanli;
				if (!this.showguanli) {
					this.items.forEach(item => {
						item.checked = false;
					})
				}
			},
			checkboxChange: function(e) {
				var items = this.items,
					values = e.detail.value;
				for (var i = 0, lenI = items.length; i < lenI; ++i) {
					const item = items[i]
					if (values.includes(item.value)) {
						this.$set(item, 'checked', true)
					} else {
						this.$set(item, 'checked', false)
					}
				}
			},
			checkboxChangeall(e) {
				let values = e.detail.value;
				if (values.length) {
					this.items.forEach(item => {
						item.checked = true;
					})
				}else {
					this.items.forEach(item => {
						item.checked = false;
					})
				}
			}
		},
	}
</script>

<style scoped lang="scss">
	.uni-page-body {
		.guanlibtn {
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 98upx;
			padding: 0 20upx;
			background-color: #eee;
			.btn-box {
				display: flex;
				._itemtype {
					margin-right: 20upx;
					&.bordert {
						border: 1upx solid $font-color-light;
						color: #18C02C;
					}
				}
			}
		}
		.content-box {
			margin-top: 20upx;
			padding-bottom: 100upx;
		}

		.btnbox {
			padding-bottom: 70upx;
			display: flex;
			justify-content: center;

			.btn {
				padding: 4upx 20upx;
				font-size: 34upx;
				border-radius: 20upx;
				color: #fff;
				background-color: $font-color-light;
			}
		}


	}
</style>
