<template>
	<view class="uni-page-body sss">
		<uni-list>
			<uni-list-item :show-extra-icon="true" :extra-icon="extraIcon1" title="头像" @tap="navTo('/pages/user/userinfo/headimgset')">
				<image src="/static/img/gongkao.png" style="width: 76upx;height: 76upx;border-radius: 50%;margin-right: 20upx;"></image>
			</uni-list-item>
			<uni-list-item :show-extra-icon="true" :extra-icon="extraIcon1" title="实名认证" @tap="navTo('/pages/user/userinfo/userinfoset')" >
				<view class="uni-flex">
					<text style="color: #575757;margin-right: 20upx;">张三</text>
					<text style="padding: 0 20rpx;border-radius: 40upx;color: #fff;background-color: #18C02C;">已实名</text>
				</view>
			</uni-list-item>
			<uni-list-item :show-extra-icon="true" :extra-icon="extraIcon1" title="绑定手机号">
				<text style="color: #575757;margin-right: 20upx;">1865226654</text>
			</uni-list-item>
			<uni-list-item :show-extra-icon="true" :extra-icon="extraIcon1" title="地区" />
			<uni-list-item :show-extra-icon="true" :extra-icon="extraIcon1" title="从业年限" />
			<uni-list-item :show-extra-icon="true" :extra-icon="extraIcon1" title="缴纳保证金" @tap="navTo('/pages/user/userinfo/userbond')" />
			<uni-list-item :show-extra-icon="true" :showArrow="false" :extra-icon="extraIcon1" title="更多展示" />
		</uni-list>
		<view class="img-box">

			<view class="uni-list list-pd">
				<view class="uni-list-cell cell-pd">
					<view class="uni-uploader">
						<view class="uni-uploader-body">
							<view class="uni-uploader__files">
								<block v-for="(image,index) in imageList" :key="index">
									<view class="uni-uploader__file">
										<image class="uni-uploader__img" :src="image" :data-src="image" @tap="previewImage"></image>
									</view>
								</block>
								<view class="uni-uploader__input-box">
									<view class="uni-uploader__input" @tap="chooseImage"></view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>

		</view>
	</view>
</template>
<script>
	var sourceType = [
		['camera'],
		['album'],
		['camera', 'album']
	];
	var sizeType = [
		['compressed'],
		['original'],
		['compressed', 'original']
	]
	import permision from "@/common/permission.js"
	import uniList from '@/components/uni-list/uni-list.vue'
	import uniListItem from '@/components/uni-list-item/uni-list-item.vue'
	export default {
		components: {
			uniList,
			uniListItem
		},
		data() {
			return {
				extraIcon1: {
					color: '#007aff',
					size: '22',
					type: 'gear-filled'
				},
				extraIcon2: {
					color: '#4cd964',
					size: '22',
					type: 'image'
				},
				sourceType: ['拍照', '相册', '拍照或相册'],
				sourceTypeIndex: 2,
				imageList: [],
				countIndex: 8,
				count: [1, 2, 3, 4, 5, 6, 7, 8, 9]
			}
		},
		methods: {
			navTo(url) {
				uni.navigateTo({
					url
				})
			},
			async checkPermission(code) {
				let type = code ? code - 1 : this.sourceTypeIndex;
				let status = permision.isIOS ? await permision.requestIOS(sourceType[type][0]) :
					await permision.requestAndroid(type === 0 ? 'android.permission.CAMERA' :
						'android.permission.READ_EXTERNAL_STORAGE');

				if (status === null || status === 1) {
					status = 1;
				} else {
					uni.showModal({
						content: "没有开启权限",
						confirmText: "设置",
						success: function(res) {
							if (res.confirm) {
								permision.gotoAppSetting();
							}
						}
					})
				}

				return status;
			},
			isFullImg: function() {
				return new Promise((res) => {
					uni.showModal({
						content: "已经有9张图片了,是否清空现有图片？",
						success: (e) => {
							if (e.confirm) {
								this.imageList = [];
								res(true);
							} else {
								res(false)
							}
						},
						fail: () => {
							res(false)
						}
					})
				})
			},
			chooseImage: async function() {
				// TODO 选择相机或相册时 需要弹出actionsheet，目前无法获得是相机还是相册，在失败回调中处理
				if (this.sourceTypeIndex !== 2) {
					let status = await this.checkPermission();
					if (status !== 1) {
						return;
					}
				}
				if (this.imageList.length === 9) {
					let isContinue = await this.isFullImg();
					if (!isContinue) {
						return;
					}
				}
				uni.chooseImage({
					sourceType: sourceType[this.sourceTypeIndex],
					sizeType: sizeType[this.sizeTypeIndex],
					count: this.imageList.length + this.count[this.countIndex] > 9 ? 9 - this.imageList.length : this.count[this.countIndex],
					success: (res) => {
						this.imageList = this.imageList.concat(res.tempFilePaths);
					},
					fail: (err) => {
						if (err['code'] && err.code !== 0 && this.sourceTypeIndex === 2) {
							this.checkPermission(err.code);
						}
					}
				})
			},
			previewImage(e) {
				var current = e.target.dataset.src
				uni.previewImage({
					current: current,
					urls: this.imageList
				})
			},
		}
	}
</script>

<style scoped lang="scss">
	.sss {
		.img-box {
			padding: 0 30upx;
		}

		.uni-list:before {
			height: 0;
		}

		.uni-list:after {
			height: 0;
		}
		.uni-uploader__input-box,
		.uni-uploader__file,
		.uni-uploader__img {
			width: 147upx;
			height: 147upx;
		}
	}
</style>
