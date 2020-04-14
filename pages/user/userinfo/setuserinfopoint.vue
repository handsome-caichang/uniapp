<template>
	<view class="uni-page-body">
		<uni-list>
			<uni-list-item title="姓名" :showArrow="false" :showBadge="true" >
				<input class="uni-input" type="text" :maxlength="5" v-model="realName" placeholder-class="p-active" />
			</uni-list-item>
			<uni-list-item title="手机号码(实名绑定)"  :showArrow="false" :showBadge="true" >
				<input class="uni-input" type="number" :maxlength="11" v-model="realMobilePhone" placeholder-class="p-active" />
			</uni-list-item>
			<uni-list-item title="证件类型"  :showArrow="false" :showBadge="true" >
				<text style="color:#575757;">身份证</text>
			</uni-list-item>
			<uni-list-item title="证件号码"  :showArrow="false" :showBadge="true" >
				<input class="uni-input" type="text" :maxlength="18" v-model="idNumber" placeholder-class="p-active" />
			</uni-list-item>
		<!-- 	<uni-list-item title="证件的有效期"  :showArrow="false" :showBadge="true" >
				<input class="uni-input" type="text" :maxlength="10" v-model="idCardValidity" placeholder="1997" placeholder-class="p-active" />
			</uni-list-item> -->
			<!-- <uni-list-item title="车牌号"  :showArrow="false" :showBadge="true" >
				<input class="uni-input" type="text" v-model="carCard" placeholder-class="p-active" />
			</uni-list-item> -->
		</uni-list>
		<view class="viod" style="width: 100%;height: 18upx;background-color: #D3D3D3;"></view>
		<view class="uni-list list-pd">
			<view class="uni-list-cell cell-pd">
				<view class="uni-uploader">
					<view class="uni-uploader-head">
						<view class="uni-uploader-title ">身份证正面</view>
					</view>
					<view class="uni-uploader-body">
						<view class="uni-uploader__files">
							<view class="uni-uploader__file" v-if="idCardFront"  @tap="chooseImage('idCardFront')">
								<image class="uni-uploader__img" :src="idCardFront" :data-src="idCardFront"></image>
							</view>
							<view class="uni-uploader__input-box" v-if="!idCardFront" >
								<view class="uni-uploader__input" @tap="chooseImage('idCardFront')"></view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="uni-list list-pd">
			<view class="uni-list-cell cell-pd">
				<view class="uni-uploader">
					<view class="uni-uploader-head">
						<view class="uni-uploader-title ">身份证反面</view>
					</view>
					<view class="uni-uploader-body">
						<view class="uni-uploader__files">
							<view class="uni-uploader__file" v-if="idCardBack"  @tap="chooseImage('idCardBack')">
								<image class="uni-uploader__img" :src="idCardBack" :data-src="idCardBack"></image>
							</view>
							<view class="uni-uploader__input-box"  v-if="!idCardBack" >
								<view class="uni-uploader__input" @tap="chooseImage('idCardBack')"></view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- <view class="uni-list list-pd">
			<view class="uni-list-cell cell-pd">
				<view class="uni-uploader">
					<view class="uni-uploader-head">
						<view class="uni-uploader-title ">人脸照</view>
					</view>
					<view class="uni-uploader-body">
						<view class="uni-uploader__files">
							<view class="uni-uploader__file" v-if="faceImage"  @tap="chooseImage('faceImage')">
								<image class="uni-uploader__img" :src="faceImage" :data-src="faceImage"></image>
							</view>
							<view class="uni-uploader__input-box"  v-if="!faceImage" >
								<view class="uni-uploader__input" @tap="chooseImage('faceImage')"></view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view> -->
		<view class="fo-box">
			<view class="primary-btn" @tap="fabu">
				确认
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
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	import uniList from '@/components/uni-list/uni-list.vue'
	import uniListItem from '@/components/uni-list-item/uni-list-item.vue'
	import uploadImage from '@/common/ossutil/uploadFile.js';
	export default {
		components: {
			uniList,
			uniIcons,
			uniListItem
		},
		data() {
			return {
				realName: "",
				idNumber: "",
				realMobilePhone: "",
				idCardValidity: "",
				idCardFront: "",
				idCardBack: "",
				faceImage: "",
				carCard: "",
				sourceType: ['拍照', '相册', '拍照或相册'],
				sourceTypeIndex: 2,
				userdata: {},
			}
		},
		created() {
			this.userdata = getApp().globalData.userdata;
			this.getdata();
			this.realMobilePhone = this.userdata.mobilePhone;
		},
		methods: {
			getdata() {
				this.api.home.getRealInfo({
					data: {
						userId: this.userdata.userId
					}
				}).then(res => {
					console.log(res);
					if (res.data.idNumber) {
						this.realName = res.data.realName;
						this.carCard = res.data.carCard;
						this.realMobilePhone = res.data.realMobilePhone;
						this.idCardValidity = res.data.idCardValidity;
						this.idNumber = res.data.idNumber;
						this.idCardFront = res.data.idCardFront;
						this.idCardBack = res.data.idCardBack;
						this.faceImage = res.data.isDepositMoneyfaceImage;
					}
				})
			},
			fabu() {
				this.api.home.userRealAuth({
					userId: this.userdata.userId,
					realName: this.realName,
					idNumber: this.idNumber,
					realMobilePhone: this.realMobilePhone,
					idCardValidity: this.idCardValidity,
					idCardFront: this.idCardFront,
					idCardBack: this.idCardBack,
					faceImage: this.faceImage,
					carCard: this.carCard,
				}).then(res => {
					// console.log(res);
					getApp().globalData.userdata.isReal = 2;
					uni.showModal({
						title: "提示",
						content: '实名成功',
						showCancel: false,
					});
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
			chooseImage: async function(name) {
				// #ifdef APP-PLUS
				// TODO 选择相机或相册时 需要弹出actionsheet，目前无法获得是相机还是相册，在失败回调中处理
				if (this.sourceTypeIndex !== 2) {
					let status = await this.checkPermission();
					if (status !== 1) {
						return;
					}
				}
				// #endif
				uni.chooseImage({
					sourceType: sourceType[this.sourceTypeIndex],
					sizeType: "compressed",
					count: 1,
					success: (res) => {
						// 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
						var tempFilePaths = res.tempFilePaths;
						//支持多图上传
						for (var i = 0; i < res.tempFilePaths.length; i++) {
							//显示消息提示框
							uni.showLoading({
							  mask: true
							})
							//上传图片
							//图片路径可自行修改
							uploadImage(res.tempFilePaths[i], 'images/',
								result => {
									 this[name] = result;
									 uni.hideLoading();
								}
							)
						}
					},
					fail: (err) => {
						// #ifdef APP-PLUS
						if (err['code'] && err.code !== 0 && this.sourceTypeIndex === 2) {
							this.checkPermission(err.code);
						}
						// #endif
					}
				})
			},
		}
	}
</script>

<style scoped lang="scss">
	.uni-page-body {
		.uni-input {
			width: 400upx;
			border: 1upx solid $border-color-base;
			text-align: right;
		}
		.uni-uploader {
			padding: 20upx;
		}
		.uni-page-footer{
			position: fixed;
			bottom: 50upx;
			left: 0upx;
			right: 0upx;
			text-align: center;
			color: #1F96F7;
			font-size: 22upx;
			.icon {
				margin-right: 10upx
			}
		}
		.fo-box {
			display: flex;
			justify-content: center;
			margin-top: 20upx;
			margin-bottom: 20upx;
			.primary-btn {
				width: 326upx;
				height: 98upx;
				line-height: 98upx;
				text-align: center;
				background-color: #18C02C;
				border-radius: 8upx;
				color: #fff;
				font-size: 38upx;
			}
		}
	}
</style>
