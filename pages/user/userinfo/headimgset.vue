<template>
	<view class="uni-page-body">
		<view class="uni-uploader">
			<view class="uni-uploader__input-box">
				<view class="uni-uploader__input" v-if="imageList.length == 0" @tap="chooseImage(0)"></view>
				<view class="imgbox" v-else>
					<image class="imgbox" v-for="(item,index) in imageList" :key="index" :src="item" mode=""></image>
				</view>
			</view>
		</view>
		<view class="button-sp-area">
			<button type="default" plain="true" @tap="chooseImage(1)" style="margin-top:30upx;margin-bottom: 30upx;">从相册选一张</button>
			<button type="default" plain="true" @tap="chooseImage(0)" style="margin-top:30upx;margin-bottom: 30upx;">拍一张照片</button>
		</view>
		<!-- <view class="uni-uploader__input-box">
			<view class="uni-uploader__input" @tap="chooseImage"></view>
		</view> -->
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
	]
	import permision from "@/common/permission.js"
	export default {
		components: {
		},
		data() {
			return {
				sourceType: ['拍照', '相册'],
				sourceTypeIndex: 0,
				imageList: [],
			}
		},
		methods: {
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
			chooseImage: async function(index) {
				this.sourceTypeIndex = index;
				// TODO 选择相机或相册时 需要弹出actionsheet，目前无法获得是相机还是相册，在失败回调中处理
				if (this.sourceTypeIndex !== 2) {
					let status = await this.checkPermission();
					if (status !== 1) {
						return;
					}
				}
				uni.chooseImage({
					sourceType: sourceType[this.sourceTypeIndex],
					sizeType: "compressed",
					count: 1,
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
		}
	}
</script>

<style scoped lang="scss">
	.uni-page-body {
		.uni-uploader__input-box {
			width: 100%;
			height: 750upx;
			border: none;
		}
		.button-sp-area {
			margin: 0 auto;
			width: 60%;
		}
		.imgbox {
			margin: 0 auto;
			width: 100%;
			height: 750upx;
		}
	}
</style>
