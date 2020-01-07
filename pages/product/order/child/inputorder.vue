<template>
	<view class="uni-page-body orderin">
		<scroll-view class="scroll-h" :scroll-x="true" :show-scrollbar="false">
			<view class="uni-tab-item" v-for="(item,index) in tablist" :key="index" :class="activeindex==index?'active':''" @tap="changetab(index)">
				{{item}}
			</view>
		</scroll-view>

		<view class="listbox" style="margin-top: 20upx;">
			<view v-if="activeindex === 0">
				<view class="huishouren">
					<view class="cusitem" v-for="(item,index) in huishoulist" :key="index" @tap="nvto(item, '/pages/customer/customerdetail')">
						<image :src="item.img" class="headerimg"></image>
						<view class="name">{{item.name}}</view>
						<view class="point">从业{{item.age}}年</view>
						<uni-rate class="rate" :size="12" :value="item.xinyu" />
					</view>
				</view>
				<view class="genghuanbtn" style="text-align: right;color:#1F96F7;margin-top: 20upx;margin-right: 40upx;">
					<uni-icons type="loop" size="18" color="#1F96F7" style="margin-right:10upx"></uni-icons>
					换一批
				</view>
			</view>
			<view class="uni-list" v-if="activeindex === 1">
				<view class="uni-list-item border-bottom" style="padding: 0 40upx;" v-for="(item, index) in jilulist" :key="index">
					<view class="uni-flex">
						<image :src="item.img" class="headerimg" style="margin-top: 20upx;"></image>
						<view class="content" style="margin-left:10upx;flex: 1">
							<view class="title" style="font-size: 34upx;">{{item.name}}</view>
							<view class="title" style="font-size: 34upx;">
								<text>{{item.type}}</text>
								<text style="margin-left: 20upx;">{{item.num}}</text>
							</view>
							<view style="color: #575757;font-size: 28upx;">
								发布时间：<text>{{item.time}}</text> <text>{{item.address}}</text>
							</view>
						</view>
						<view class="btnbox" style="margin-top: 30upx;"  @tap="nvto(item, '/pages/product/order/applicationrecord')" >
							<view style="color: #18C02C;border: 1upx solid #18C02C;padding: 2upx 20upx;border-radius: 20upx;">管理</view>
						</view>
					</view>
					<view class="huishouren" style="padding: 0upx;">
						<view class="cusitem" v-for="(user) in item.list" :key="user.userid" @tap="nvto(user, '/pages/customer/customerdetail')">
							<image :src="user.img" class="headerimg"></image>
							<view class="name">{{user.name}}</view>
							<view class="point">从业{{user.age}}年</view>
							<uni-rate class="rate" :size="12" :value="user.xinyu" />
						</view>
					</view>
				</view>
			</view>

			<view class="shoudao" v-if="activeindex === 2">
				<view class="uni-list">
					<uni-list>
						<uni-list-item class="" :thumb="item.img" :note="'申请时间：'+item.time+'  '+item.address" v-for="(item,index) in shoudaolist"
						 :key="index"  @tap="nvto(user, '/pages/customer/customerdetail')" >
							<view slot="content" style="height: 50upx;">
								<text style="font-size: 34upx;margin-right: 20upx;">{{item.name}}</text>
							</view>
							<view slot="content_end" class="uni-flex" style="align-items: center;height: 50upx;">
								<text style="font-size: 34upx;margin-right: 20upx;">从业{{item.age}}年</text>
								<uni-rate class="rate" :size="12" :value="item.xinyu" />
							</view>
							<view class="btn" style="color: #fff;background-color: #18C02C;font-size: 28upx;padding: 0upx 20upx;border-radius: 20upx;margin-right: 20upx;">接受</view>
						</uni-list-item>
					</uni-list>
				</view>
			</view>
			
			<view class="shoudao" v-if="activeindex === 3">
				<view class="uni-list">
					<uni-list>
						<uni-list-item class="" :thumb="item.img" :note="'关闭时间：'+item.time+'  '+item.address" v-for="(item,index) in successlist"
						 :key="index"  @tap="nvto(item, '/pages/product/order/orderdetail')" >
							<view slot="content" style="height: 50upx;">
								<text style="font-size: 34upx;margin-right: 20upx;">{{item.type}}</text>
								<text style="font-size: 34upx;margin-right: 20upx;">{{item.num}}</text>
							</view>
							<view slot="content_end" class="uni-flex" style="align-items: center;height: 50upx;">
								<text style="font-size: 34upx;margin-right: 20upx;">{{item.name}}</text>
							</view>
							<view class="btn" style="color: #18C02C;font-size: 34upx;margin-right: 20upx;">匹配成功</view>
						</uni-list-item>
					</uni-list>
				</view>
			</view>
			
		</view>
	</view>
</template>
<script>
	import uniRate from '@/components/uni-rate/uni-rate.vue'
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	import uniList from '@/components/uni-list/uni-list.vue'
	import uniListItem from '@/components/uni-list-item/uni-list-item.vue'
	export default {
		components: {
			uniList,
			uniIcons,
			uniRate,
			uniListItem
		},
		data() {
			return {
				successlist: [
					{
						name: '宁波****有限公司',
						num: '3吨',
						time: '2019/12/13',
						address: '镇海',
						img: '/static/img/missing-face.png',
						type: '废铁'
					},{
						name: '宁波****有限公司',
						num: '3吨',
						time: '2019/12/13',
						address: '镇海',
						img: '/static/img/missing-face.png',
						type: '废铁'
					},{
						name: '宁波****有限公司',
						num: '3吨',
						time: '2019/12/13',
						address: '镇海',
						img: '/static/img/missing-face.png',
						type: '废铁'
					},
				],
				shoudaolist: [{
					name: '张三',
					num: '3吨',
					time: '2019/12/13',
					address: '镇海',
					img: '/static/img/missing-face.png',
					age: 3,
					xinyu: 5
				},{
					name: '张三',
					num: '3吨',
					time: '2019/12/13',
					address: '镇海',
					img: '/static/img/missing-face.png',
					age: 3,
					xinyu: 5
				},{
					name: '张三',
					num: '3吨',
					time: '2019/12/13',
					address: '镇海',
					img: '/static/img/missing-face.png',
					age: 3,
					xinyu: 5
				}],
				tablist: [
					'回收人推荐',
					'申请记录',
					'收到申请',
					'匹配成功',
				],
				jilulist: [{
					name: '宁波易鑫科技有限公司',
					num: '3吨',
					type: '废铁',
					time: '2019/12/13',
					address: '镇海',
					img: '/static/img/missing-face.png',
					list: [{
						name: '战三',
						img: '/static/img/missing-face.png',
						age: 3,
						xinyu: 3.5,
						userid: '123'
					}, {
						name: '战三',
						img: '/static/img/missing-face.png',
						age: 3,
						xinyu: 3.5,
						userid: '126343'
					}, {
						name: '战三',
						img: '/static/img/missing-face.png',
						age: 3,
						xinyu: 3.5,
						userid: '15345'
					}, {
						name: '战三',
						img: '/static/img/missing-face.png',
						age: 3,
						xinyu: 3.5,
						userid: '12434'
					}, ]
				}, {
					name: '宁波易鑫科技有限公司',
					num: '3吨',
					type: '废铁',
					time: '2019/12/13',
					address: '镇海',
					img: '/static/img/missing-face.png',
					list: [{
						name: '战三',
						img: '/static/img/missing-face.png',
						age: 3,
						xinyu: 3.5,
						userid: '6756'
					}, {
						name: '战三',
						img: '/static/img/missing-face.png',
						age: 3,
						xinyu: 3.5,
						userid: '87697'
					}, {
						name: '战三',
						img: '/static/img/missing-face.png',
						age: 3,
						xinyu: 3.5,
						userid: '456'
					}, {
						name: '战三',
						img: '/static/img/missing-face.png',
						age: 3,
						xinyu: 3.5,
						userid: '456456'
					}]
				}],
				activeindex: 0,
				huishoulist: [{
						name: '战三',
						img: '/static/img/missing-face.png',
						age: 3,
						xinyu: 3.5
					},
					{
						name: '战三',
						img: '/static/img/missing-face.png',
						age: 3,
						xinyu: 3.5
					}, {
						name: '战三',
						img: '/static/img/missing-face.png',
						age: 3,
						xinyu: 3.5
					}, {
						name: '战三',
						img: '/static/img/missing-face.png',
						age: 3,
						xinyu: 3.5
					}, {
						name: '战三',
						img: '/static/img/missing-face.png',
						age: 3,
						xinyu: 3.5
					}, {
						name: '战三',
						img: '/static/img/missing-face.png',
						age: 3,
						xinyu: 3.5
					}, {
						name: '战三',
						img: '/static/img/missing-face.png',
						age: 3,
						xinyu: 3.5
					}, {
						name: '战三',
						img: '/static/img/missing-face.png',
						age: 3,
						xinyu: 3.5
					}
				]
			}
		},
		methods: {
			changetab(active) {
				this.activeindex = active
			},
			nvto(item, url) {
				uni.navigateTo({
					url,
				})
			}
		},
	}
</script>

<style scoped lang="scss">
	.orderin {
		.headerimg {
			width: 60upx;
			height: 60upx;
			border-radius: 50%;
			margin-bottom: 10upx;
		}
		
		.uni-list-item__container {
			border-top: 0upx;
		}
		
		.listbox {
			.huishouren {
				display: flex;
				flex-wrap: wrap;
				padding: 0 40upx;
				justify-content: space-around;
				.cusitem {
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					padding: 20upx;

					.name {
						color: #303030;
						font-size: 22upx;
						height: 28upx;
					}

					.point {
						height: 38upx;
						color: #303030;
						font-size: 22upx;
						margin-bottom: 10upx;
					}
				}
			}
		}

		.scroll-h {
			margin-top: 20upx;
			padding: 0upx 30upx;
			width: 100%;
			height: 80upx;
			flex-direction: row;
			white-space: nowrap;

			.uni-tab-item {
				display: inline-block;
				flex-wrap: nowrap;
				color: $font-color-light;
				font-size: 28upx;
				border: 2upx solid $font-color-light;
				padding: 0 20upx;
				height: 48upx;
				line-height: 48upx;
				margin-right: 40upx;
				border-radius: 8upx;

				&.active {
					background-color: $font-color-light;
					color: $font-color-withe;
				}
			}
		}
	}
</style>
