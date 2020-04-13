<template>
	<view class="uni-page-body">
			
		<view class="user-content">
			<view class="uni-flex">
				<image :src="shiming.faceImage" class="headerimg" ></image>
				<view class="text">
					<text v-if="!shiming.realName" style="padding: 0 20rpx;border-radius: 40upx;color: #fff;background-color: #666;">未实名</text> 
					<view class="name" v-else>
						{{shiming.realName ? shiming.realName : ''}}
					</view>
					<view class="cardid">
						{{shiming.idNumber ? shiming.idNumber : ''}}
					</view>
				</view>
			</view>
			<view class="uni-flex floor-item">
				<view class="left">
					<uni-icons type="checkbox-filled" color="#fff" ></uni-icons>
					个人隐私信息安全保障中
				</view>
				<view class="right" @tap="setpoint">
					查看更多 >
				</view>
			</view>
		</view>
		
		<uni-list>
			<uni-list-item title="个人信息" note="完善身份信息，体验更多服务" @tap="navTo()" />
			<!-- <uni-list-item title="证件照片" note="上传证件照片，提升信用积分" /> -->
			<!-- <uni-list-item title="人像照片" note="体验刷脸科技，享受更多服务" /> -->
			<!-- <uni-list-item title="身份验证" note="提升信用积分，增加匹配成功率" /> -->
		</uni-list>
		
		<view class="uni-page-footer">
			<uni-icons type="info-filled" class="icon" color="#1F96F7"></uni-icons>
			常见问题
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
			uniListItem,
			uniIcons
		},
		data() {
			return {
				shiming: {
					faceImage: "",
					realName: "",
					idNumber: ""
				},
				userdata: {}
			}
		},
		created() {
			this.userdata = getApp().globalData.userdata;
			this.api.home.getRealInfo({
				data: {
					userId: this.userdata.userId
				}
			}).then(res => {
				console.log(res);
				// {
				// 	"isSuccessful": 1,
				// 	"data": {
				// 		"realName": "徐君",
				// 		"carCard": "123456",
				// 		"realMobilePhone": "13486413332",
				// 		"idCardValidity": "1986",
				// 		"isDepositMoney": 0,
				// 		"idNumber": "330211198603081018",
				// 		"idCardFront": "https://nb-fpb.oss-cn-hangzhou.aliyuncs.com/images/158660782906791.png",
				// 		"idCardBack": "https://nb-fpb.oss-cn-hangzhou.aliyuncs.com/images/158660783224898.png",
				// 		"faceImage": ""
				// 	},
				// 	"error": "成功"
				// }
				this.shiming = res.data;
			})
		},
		methods: {
			navTo() {
				if (this.shiming.idNumber) {
					uni.navigateTo({
						url:  '/pages/user/userinfo/userinfopoint'
					})
				}else {
					let that = this;
					uni.showModal({
						title: "提示",
						content: '暂未实名，是否前往实名认证',
						success: (res) => {
							if (res.confirm) {
								that.setpoint();
							}
						}
					});
				}
			},
			setpoint() {
				uni.navigateTo({
					url: '/pages/user/userinfo/setuserinfopoint'
				})
			},
		}
	}
</script>

<style scoped lang="scss">
	.uni-page-body {
		.user-content {
			margin: 48upx;
			background-color: #18C02C;
			border-radius: 10upx;
			padding: 46upx;
			.headerimg {
				width: 100upx;
				height: 100upx;
				margin-right: 10upx;
			}
			.text {
				color: #fff;
			}
			.floor-item{
				margin-top: 60upx;
				color: #fff;
				justify-content: space-between;
			}
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
	}
</style>
