<template>
	<view class="uni-page-body">

		<view class="content-box">
			<checkbox-group @change="checkboxChange">
				<label class="uni-list-cell" v-for="item in items" :key="item.realseId">
					<view v-if="showguanli" style="width: 60upx;margin-left: 10upx;">
						<checkbox :value="item.realseId" :checked="item.checked" />
					</view>
					<view class="uni-media-list" @tap="resultres(item)">
						<image class="uni-media-list-logo" :src="item.headImage"></image>
						<view class="uni-media-list-body">
							<view class="uni-media-list-text-top">{{item.name}}</view>
							<view class="uni-media-list-text-bottom uni-ellipsis">发布时间：{{item.createTime}} {{item.district}}</view>
						</view>
						<view>
							<view class="list-succ" :class="{ 'class1': item.status == 1,'class2': item.status == 2,'class3': item.status == 3,'class4': item.status == 4} ">
								<!-- // 【//0：待处理 1：审核中 2：带匹配 3：匹配成功    4:审核失败 5：已取消 -->
								{{ item.status == 1 ? '审核中' : (item.status == 2 ? '待匹配' : ( item.status == 3 ? '交易中' :  (item.status ==  4 ? '审核失败' : (item.status ==  5 ? '已取消' : ''))))}}
							</view>
							<view class="number-id">
								NO.{{item.realseId}}
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
				items: []
			}
		},
		created() {
			this.api.home.getRealseList({
				data: {
					userId: getApp().globalData.userdata.userId,
					countPerPage: 2000,
					pageIndex: 1
				}
			}).then(res => {
				console.log("我的发布");
				console.log(res);
				res.data.forEach(item => {
					this.$set(item, 'checked', false)
				})
				this.items = res.data;
			})
		},
		methods: {
			resultres(item) {
				if (item.status === 4) {
					getApp().globalData.examineres = item;
					uni.navigateTo({
						url: "/pages/customer/fabumanage/examineres",
					})
				}
			},
			closeord() {
				var that = this;
				uni.showModal({
					title: '确认取消发布吗？',
					content: '取消后将不可恢复',
					success: (res) => {
						if (res.confirm) {
							console.log({
								data: that.items
							})
							let list = [];
							that.items.forEach(item => {
								if (item.checked) {
									list.push(item);
								}
							})
							console.log(list)
							if (list[0]) {
								that.api.home.cancelRealse({
									userId: getApp().globalData.userdata.userId,
									orderNo: '' + list[0].realseId
								}).then(res => {
									uni.showModal({
										title: "提示",
										content: '取消成功',
										showCancel: false,
									});
								})
							}
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
			checkboxChange(e) {
				var values = [e.detail.realseId];
				for (var i = 0, lenI = this.items.length; i < lenI; ++i) {
					if (values.includes(this.items[i].realseId)) {
						this.items[i].checked = true;
					} else {
						this.items[i].checked = false;
					}
				}
			},
			checkboxChangeall(e) {
				console.log(e)
				let values = e.detail.value;
				if (values.length) {
					this.items.forEach(item => {
						item.checked = true;
					})
				} else {
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
		.uni-media-list {
			justify-content: space-between;
		}

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

			.uni-list-cell {
				justify-content: center;
				align-items: center;

				.uni-media-list-logo {
					height: 50upx;
					width: 50upx;
					border-radius: 50upx;
				}
				.uni-media-list  {
					padding-left: 0px;
					padding-right: 0px;
				}
				.list-succ {
					&.class1 {
						color: #E7211A;
					}
					&.class2 {
						color: #1596F7;
					}
					&.class3 {
						color: #18C02C;
					}
					&.class4 {
						color: #E7211A;
					}
				}
			}
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
