<template>
	<view class="uni-page-body sss">
		<uni-list>
			<uni-list-item :show-extra-icon="true" thumb="/static/img/user/headimg.png" title="头像" @tap="navTo('/pages/user/userinfo/headimgset')">
				<image :src="userdata.headImage" style="width: 76upx;height: 76upx;border-radius: 50%;margin-right: 20upx;"></image>
			</uni-list-item>
			<uni-list-item :show-extra-icon="true" thumb="/static/img/user/shiming.png" title="昵称">
				<view class="uni-flex">
					<input class="uni-input" style="text-align: right;width:400upx" @blur="saveuser" v-model="userdata.nickName"
					 maxlength="10" type="text" placeholder="用户昵称" />
				</view>
			</uni-list-item>
			<uni-list-item :show-extra-icon="true" thumb="/static/img/user/shiming.png" title="实名认证" @tap="navTo('/pages/user/userinfo/userinfoset')">
				<view class="uni-flex">
					<!-- <text style="color: #575757;margin-right: 20upx;">张三</text> -->
					<text style="padding: 0 20rpx;border-radius: 40upx;color: #fff;background-color: #18C02C;" v-if="userdata.isReal == 1">审核中</text>
					<text style="padding: 0 20rpx;border-radius: 40upx;color: #fff;background-color: #18C02C;" v-if="userdata.isReal == 2">已实名</text>
					<text style="padding: 0 20rpx;border-radius: 40upx;color: #fff;background-color: #666;" v-if="userdata.isReal == 3">认证失败</text>
					<text style="padding: 0 20rpx;border-radius: 40upx;color: #fff;background-color: #666;" v-if="!userdata.isReal">未实名</text>
				</view>
			</uni-list-item>
			<uni-list-item :show-extra-icon="true" thumb="/static/img/user/phone.png" title="绑定手机号" @tap="navTo('/pages/user/userinfo/setmobilephone')">
				<text style="color: #575757;margin-right: 20upx;">{{userdata.mobilePhone}}</text>
			</uni-list-item>
			<uni-list-item :show-extra-icon="true" thumb="/static/img/user/diqu.png" title="地区" @tap="setaddress">
				<view class="uni-flex">
					<text style="color: #575757;margin-right: 20upx;">{{region.label}}</text>
					<!-- <text style="padding: 0 20rpx;border-radius: 40upx;color: #fff;background-color: #18C02C;">已实名</text> -->
					<!-- <text style="padding: 0 20rpx;border-radius: 40upx;color: #fff;background-color: #666;">未实名</text> -->
				</view>
			</uni-list-item>
			<uni-list-item :show-extra-icon="true" thumb="/static/img/user/nianxian.png" title="从业年限">
				<view class="uni-flex">
					<input class="uni-input" style="text-align: right;" @blur="saveuser" v-model="userdata.years" maxlength="2" type="number"
					 placeholder="请填写从业年限" />
				</view>
			</uni-list-item>
			<uni-list-item :show-extra-icon="true" thumb="/static/img/user/nianxian.png" title="车牌号">
				<view class="uni-flex">
					<input class="uni-input" style="text-align: right;" @blur="saveuser" v-model="userdata.carCard" maxlength="10"
					 type="text" placeholder="请填写车牌号" />
				</view>
			</uni-list-item>
			<!-- <uni-list-item :show-extra-icon="true"  thumb="/static/img/user/baozhenjin.png" title="缴纳保证金" @tap="navTo('/pages/user/userinfo/userbond')" /> -->
			<uni-list-item :show-extra-icon="true" :showArrow="false" thumb="/static/img/user/gengduo.png" title="更多展示" />
		</uni-list>
		<view class="img-box">

			<view class="uni-list list-pd">
				<view class="uni-list-cell cell-pd">
					<view class="uni-uploader">
						<view class="uni-uploader-body">
							<view class="uni-uploader__files">
								<block v-for="(image,index) in imageList" :key="index">
									<view class="uni-uploader__file">
										<uni-icons type="close" size="20" color="#E7211A" class="sunui-img-removeicon clear-icon" @tap="delimg(index)"></uni-icons>
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

		<mpvue-city-picker :themeColor="themeColor" ref="mpvueCityPicker" :pickerValueDefault="cityPickerValue" @onConfirm="onConfirm"></mpvue-city-picker>

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
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	import mpvueCityPicker from '@/components/mpvue-citypicker/mpvueCityPicker.vue'
	import permision from "@/common/permission.js"
	import uniList from '@/components/uni-list/uni-list.vue'
	import uniListItem from '@/components/uni-list-item/uni-list-item.vue'
	import uploadImage from '@/common/ossutil/uploadFile.js';
	export default {
		components: {
			uniList,
			uniListItem,
			mpvueCityPicker,
			uniIcons
		},
		data() {
			return {
				cityPickerValue: [0, 0, 1],
				region: {
					label: "请点击选择地区",
					value: [],
					cityCode: ""
				},
				userdata: {},
				themeColor: '#007AFF',
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
		created() {
			this._updateuser();
			uni.$on('_updatehome', function(data) {
				this._updateuser();
			})
		},
		methods: {
			_updateuser() {
				this.userdata = getApp().globalData.userdata;
				if (this.userdata.province) {
					this.region.label = this.userdata.province + '-' + this.userdata.city + "-" + this.userdata.district;
				}
				this.imageList = this.userdata.images;
			},
			delimg(index) {
				this.imageList.splice(index, 1);
				this.userdata.images = this.imageList;
				this.saveuser();
			},
			setaddress() {
				this.$refs.mpvueCityPicker.show()
			},
			saveuser() {
				this.api.home.modifyUser({
					headImage: this.userdata.headImage,
					mobilePhone: this.userdata.mobilePhone,
					nickName: this.userdata.nickName,
					years: this.userdata.years,
					images: this.userdata.images,
					province: this.userdata.province,
					city: this.userdata.city,
					district: this.userdata.district,
					userId: this.userdata.userId,
					carCard: this.userdata.carCard,
				}).then(res => {
					console.log(res);
				})
			},
			onConfirm(e) {
				this.region = e;
				let list = e.label.split("-")
				this.cityPickerValue = e.value;
				this.api.home.modifyUser({
					headImage: this.userdata.headImage,
					mobilePhone: this.userdata.mobilePhone,
					years: this.userdata.year,
					images: this.userdata.images,
					nickName: this.userdata.nickName,
					province: list[0],
					city: list[1],
					district: list[2],
					userId: this.userdata.userId,
					carCard: this.userdata.carCard,
				}).then(res => {
					this.userdata.province = list[0];
					this.userdata.city = list[1];
					this.userdata.district = list[2];
					let userdata = uni.getStorageSync('userdata');
					let newuserdata = Object.assign(userdata, this.userdata);
					uni.setStorageSync('userdata', newuserdata);
					getApp().globalData.userdata = newuserdata;
					uni.$emit('_updateuser')
				})
			},
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

						// this.imageList = this.imageList.concat(res.tempFilePaths);
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
									this.imageList.push(result);
									this.api.home.modifyUser({
										headImage: this.headImage,
										mobilePhone: this.userdata.mobilePhone,
										years: this.userdata.years,
										images: this.imageList,
										province: this.userdata.province,
										city: this.userdata.city,
										district: this.userdata.district,
										userId: this.userdata.userId,
										nickName: this.userdata.nickName,
									}).then(res => {
										let userdata = uni.getStorageSync('userdata');
										let newuserdata = Object.assign(userdata, this.userdata);
										uni.setStorageSync('userdata', newuserdata);
										getApp().globalData.userdata = newuserdata;
										uni.hideLoading();
									})
								}
							)
						}
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
