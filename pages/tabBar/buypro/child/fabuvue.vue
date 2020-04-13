<template>
	<view class="container-fabu">
		<view class="form-box">
			<view class="uni-flex item-box">
				<view class="uni-label-box">
					<image class="img-icon" src="/static/img/huozhu/leibie.png"></image>
					<text class="text bitian">货物类别</text>
				</view>
				<picker @change="bindPickerChange" :value="protypeindex" :range="goodtypelist" range-key="name">
					<view class="uni-input">{{protype.value ? protype.value : protype.label }}</view>
				</picker>
				<!-- <view class="input-box" @tap="selectprotype"> -->
					<!-- <view class="input" :class="protype.value?'':'place'">
						{{protype.value ? protype.value : protype.label }}
					</view>
					<uni-icons class="icon" type="arrowdown"></uni-icons> -->
				<!-- </view> -->
			</view>
			<view class="uni-flex item-box">
				<view class="uni-label-box">
					<image class="img-icon" src="/static/img/huozhu/shulian.png"></image>
					<text class="text bitian">货物数量(吨)</text>
				</view>
				<view class="input-box">
					<input class="uni-input" v-model="numberleng" type="number" placeholder="请输入货物数量（可预估）" />
				</view>
			</view>
			<view class="uni-flex item-box">
				<view class="uni-label-box">
					<image class="img-icon" src="/static/img/huozhu/shoujia.png"></image>
					<text class="text">售价</text>
				</view>
				<view class="input-box">
					<input class="uni-input" v-model="price" type="number" placeholder="请输入货物售价（可预估）" />
				</view>
			</view>
			<view class="uni-flex item-box">
				<view class="uni-label-box">
					<image class="img-icon" src="/static/img/huozhu/dizhi.png"></image>
					<text class="text bitian">货物地址</text>
				</view>
				<view class="input-box">
					<input class="uni-input" v-model="address" type="text" placeholder="货物地址" />
					<!-- <view class="input " :class="region.cityCode?'':'place'">{{region.label}}</view>
					<uni-icons class="icon" type="arrowdown"></uni-icons> -->
				</view>
			</view>
			<view class="uni-flex item-box">
				<view class="uni-label-box">
					<image class="img-icon" src="/static/img/huozhu/lianxiren.png"></image>
					<text class="text bitian">联系人</text>
				</view>
				<view class="input-box">
					<input class="uni-input" v-model="contentname" maxlength="8" type="text" placeholder="请填写联系人称呼" />
				</view>
			</view>
			<view class="uni-flex item-box">
				<view class="uni-label-box">
					<image class="img-icon" src="/static/img/huozhu/dianhua.png"></image>
					<text class="text bitian">联系电话</text>
				</view>
				<view class="input-box">
					<input class="uni-input" v-model="contentphone" maxlength="11" type="number" placeholder="请填写联系人电话号码" />
				</view>
			</view>
			<view class="uni-flex item-box">
				<view class="uni-label-box">
					<image class="img-icon" src="/static/img/huozhu/pipeishu.png"></image>
					<text class="text">允许匹配数</text>
				</view>
				<!-- 下拉框 5 15 20 -->
				<view class="input-box">
					<input class="uni-input" v-model="pipeinum" maxlength="2" type="number" placeholder="如不输入，系统默认无限量" />
				</view>
			</view>


			<view class="uni-list list-pd">
				<view class="uni-list-cell cell-pd">
					<view class="uni-uploader">
						<view class="uni-uploader-head">
							<view class="uni-uploader-title bitian">上传图片</view>
							<view class="uni-uploader-info">{{imageList.length}}/9</view>
						</view>
						<view class="uni-uploader-body">
							<view class="uni-uploader__files">
								<block v-for="(image,index) in imageList" :key="index">
									<view class="uni-uploader__file">
										<uni-icons type="close" size="20" color="#E7211A" class="sunui-img-removeicon clear-icon" @tap="delimg(index)" ></uni-icons>
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

		<view class="fo-box">
			<view class="primary-btn" @tap="fabu">
				发布审核
			</view>
		</view>

		<view class="point">
			<icon type="warn" size="12" />
			<text class="text">中途退出系统将不保留此次编辑</text>
		</view>

		<mpvue-city-picker :themeColor="themeColor" ref="mpvueCityPicker" :pickerValueDefault="cityPickerValue"
		 @onConfirm="onConfirm"></mpvue-city-picker>

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
	import { mapMutations,mapState } from 'vuex';
	import permision from "@/common/permission.js"
	import mpvueCityPicker from '@/components/mpvue-citypicker/mpvueCityPicker.vue'
	import uniIcons from '@/components/uni-icons/uni-icons.vue'
	import uploadImage from '@/common/ossutil/uploadFile.js';
	export default {
		components: {
			uniIcons,
			mpvueCityPicker
		},
		data() {
			return {
				themeColor: '#007AFF',
				protype: {
					label: "请选择货物类别",
					value: "",
				},
				protypeindex: 0,
				array: [
				],
				region: {
					label: "请点击选择地址",
					value: [],
					cityCode: ""
				},
				cityPickerValue: [0, 0, 1],
				numberleng: "",
				price: "",
				contentname: '',
				contentphone: '',
				pipeinum: "",
				address: '',
				sourceType: ['拍照', '相册', '拍照或相册'],
				sourceTypeIndex: 2,
				imageList: [],
				countIndex: 8,
				count: [1, 2, 3, 4, 5, 6, 7, 8, 9]
			}
		},
		computed: {
			...mapState(["goodtypelist"])
		},
		methods: {
			delimg(index) {
				this.imageList.splice(index, 1)
			},
			bindPickerChange: function(e) {
				this.protypeindex = e.target.value;
				this.protype.value = this.goodtypelist[this.protypeindex].name;
			},
			// 
			fabu() {
				if (getApp().globalData.userdata.isReal !== 2) {
					uni.showModal({
						title: "提示",
						content: '该操作需要实名，请先前往我的->点击头像->实名认证，进行实名认证',
						success: function (res) {
							if (res.confirm) {
								console.log('用户点击确定');
								uni.navigateTo({
									url: "/pages/user/userinfo/setuserinfopoint"
								})
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});
					return;
				}
				let address = uni.getStorageSync('_location');
				// console.log(address);
				// "address": {
				// 	"city": "长沙市",
				// 	"district": "岳麓区",
				// 	"poiName": "保利林语社区公园",
				// 	"province": "湖南省",
				// 	"street": "桐梓坡西路",
				// 	"streetNum": "316号"
				// },
				this.api.home.realseGoods({
					classify: this.protype.value,
					count: +this.numberleng,
					"address": this.address,
					"userId": getApp().globalData.userdata.userId,
					"linkName": this.contentname,
					"tel": this.contentphone,
					"images": this.imageList.join(','),
					"matchingNumber": +this.pipeinum,
					"bedrockPrice": +this.price,
					"outsidePrice": +this.price,
					province: address.address.province,
					city: address.address.city,
					district: address.address.district,
					lat: ""+address.latitude,
					lng: ""+address.longitude,
				}).then(res => {
					uni.navigateTo({
						url: "/pages/other/fabusuccess"
					})
				})
				// uni.navigateTo({
				// 	url: "/pages/other/fabusuccess"
				// })
			},
			selectprotype() {
				
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
				// #ifdef APP-PLUS
				// TODO 选择相机或相册时 需要弹出actionsheet，目前无法获得是相机还是相册，在失败回调中处理
				if (this.sourceTypeIndex !== 2) {
					let status = await this.checkPermission();
					if (status !== 1) {
						return;
					}
				}
				// #endif

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
									this.imageList = this.imageList.concat([result]);
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
			previewImage(e) {
				var current = e.target.dataset.src
				uni.previewImage({
					current: current,
					urls: this.imageList
				})
				
			},
			onCancel(e) {
				console.log(e)
			},
			chooseCity() {
				this.$refs.mpvueCityPicker.show()
			},
			onConfirm(e) {
				this.region = e;
				this.cityPickerValue = e.value;
			},
		}
	}
</script>

<style lang="scss" scoped>
	.container-fabu {
		padding: 40upx 20upx 0upx;
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

	.form-box {
		.item-box {
			margin-bottom: 12upx;

			.uni-label-box {
				flex: 2;
				display: flex;
				align-items: center;

				.img-icon {
					width: 40upx;
					height: 40upx;
					margin-right: 10upx;
				}

				.text {
					font-size: 33upx;
				}
			}

			.input-box {
				flex: 3;
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 1upx 20upx;
				height: 70upx;
				border: 1px solid #575757;
				border-radius: 6px;

				.input {
					&.place {
						color: #575757;
					}
				}

				.uni-input {
					padding: 0;
				}
			}
		}
	}

	.point {
		margin-top: 30upx;
		color: #555555;
		display: flex;
		justify-content: center;
		align-items: center;

		.text {
			margin-left: 10upx;
		}
	}
</style>
