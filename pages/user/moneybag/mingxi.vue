<template>
	<view class="uni-page-body mingxi-container">
		<scroll-view id="tab-bar" class="scroll-h" :scroll-x="true" :show-scrollbar="false">
			<view class="uni-tab-item" v-for="(item,index) in tablist" :key="index" :class="activeindex==index?'active':''" @tap="changetab(index)">
				{{item}}
			</view>
		</scroll-view>
		<view class="uni-flex timefilter" :class="{'noin':activeindex!=0}">
			<view class="time">
				<!-- <text>本月</text> -->
				<!-- <picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
					<view class="uni-input">{{date}}</view>
				</picker> -->
				<picker @change="bindPickerChange" :value="timeindex" :range="array" range-key="name">
					<view class="uni-input">{{array[timeindex].name}}</view>
				</picker>
				<uni-icons type="arrowdown" color="#999999" size="12"></uni-icons>
			</view>
			<view class="sun">
				<view style="color: #999999;font-size: 22upx;" v-if="activeindex==0">支出¥3487</view>
				<view style="color: #999999;font-size: 22upx;">收入¥7789</view>
			</view>
		</view>
		
		<uni-list>
			<uni-list-item v-for="item in list[timeindex+1]" :key="item.orderNo" :title="item.remark" :note="item.createTime" :showArrow="false" :showBadge="true" >
				<view class="list-succ" :class="{'list-price': item.type==0,'list-succ': item.type == 1}" >
					{{item.type==0?'+':'-'}}{{item.count}}
				</view>
			</uni-list-item>
		</uni-list>
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
				tablist: [
					'全部',
					'佣金',
					'鼓励金',
					'保证金',
					'VIP'
				],
				activeindex: 0,
				array: [
					{name:'一月'},
					{name:'二月'},
					{name:'三月'},
					{name:'四月'},
					{name:'五月'},
					{name:'六月'},
					{name:'七月'},
					{name:'八月'},
					{name:'九月'},
					{name:'十月'},
					{name:'十一月'},
					{name:'十二月'}
				],
				timeindex: 0,
				list: [],
			}
		},
		created() {
			this.getdata();
		},
		methods: {
			changetab(index) {
				this.activeindex = index;
				this.getdata();
			},
			bindPickerChange: function(e) {
				this.timeindex = e.target.value
			},
			getdata() {
				this.list = [];
				let userdata = uni.getStorageSync('userdata');
				// console.log(userdata)
				this.api.home.getBillList({
					userId: userdata.userId,
					countPerPage: 1000,
					pageIndex: 1,
					orderType: this.activeindex,
				}).then(res => {
					this.list = res.data;
				})
			}
			// mingxi
		}
	}
</script>
<style lang="scss" >
	.mingxi-container {
		.scroll-h {
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
		.timefilter {
			background:rgba(231,231,231,1);
			padding: 4upx 60upx;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 20upx;
			&.noin {
				padding-top: 16upx;
				padding-bottom: 16upx;
			}
			.time {
				padding: 0upx 10upx;
				border-radius: 25upx;
				height: 50upx;
				text-align: center;
				overflow: hidden;
				background-color: #fff;
				display: flex;
				align-items: center;
			}
		}
	}
</style>
