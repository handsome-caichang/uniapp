<template>
	<view class="uni-page-body">
		<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(item,index) in list" :key="index">
			<view class="uni-media-list">
				<image class="uni-media-list-logo" :src="item.img"></image>
				<view class="uni-media-list-body">
					<view class="uni-media-list-text-top"> {{item.name}}  <text style="margin-left: 20upx;"> {{item.num}}</text></view>
					<view class="uni-media-list-text-bottom uni-ellipsis">
						<text style="margin-right: 20upx;">{{item.time}}</text>
						<text>{{item.address}}</text>
					</view>
				</view>
				<view class="option">
					<uni-icons type="arrowthinup" size="18"></uni-icons>
					<uni-icons type="arrowthindown" size="18" ></uni-icons>
					<uni-icons type="trash" size="18" ></uni-icons>
					<view class="checked-box">
						<checkbox :checked="item.isjiaji" :disabled="true" color="#E7211A" />
						<text style="color: #E7211A;">加急</text>
					</view>
				</view>
			</view>
		</view>
	</view>
	</view>
</template>
<script>
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	export default {
		components: {
			uniIcons
		},
		data() {
			return {
				list: [
					{
						img: '/static/img/gongkao.png',
						name: '张三',
						num: '3吨',
						address: '长沙',
						time: '2019/12/13',
						isjiaji:true,
					},{
						img: '/static/img/gongkao.png',
						name: '张三',
						num: '3吨',
						address: '长沙',
						time: '2019/12/13',
						isjiaji:false,
					},{
						img: '/static/img/gongkao.png',
						name: '张三',
						num: '3吨',
						address: '长沙',
						time: '2019/12/13',
						isjiaji:true,
					},
				]
			}
		},
		methods: {

		}
	}
</script>

<style scoped lang="scss">
	.uni-page-body {
		.option {
			display: flex;
			align-items: center;
			.uni-icons {
				width: 60upx;
				margin-right: 4upx;
			}
			.uni-checkbox-wrapper{
			}
		}
	}
</style>
