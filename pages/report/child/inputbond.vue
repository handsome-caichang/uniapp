<template>
	<view class="uni-page-body">

		<!-- <view class="option">
			<view class="header-text">
				选择分类
			</view>
			<view class="list">
				<view class="_itemtype" :class="{'active': curindex === index}" v-for="(item,index) in list" :key="index" @tap="clickitem(item,index)" >{{item}}</view>
			</view>
		</view> -->

		<view class="qiun-charts">
			<canvas canvas-id="canvasMix" id="canvasMix" class="charts" disable-scroll=true @touchstart="touchMix" @touchmove="moveMix"
			 @touchend="touchEndMix"></canvas>
		</view>
	</view>
</template>
<script>
	import uCharts from '@/components/u-charts/u-charts.js';
	var _self;
	var canvasObj = {};
	export default {
		components: {},
		data() {
			return {
				list: [
					'紫铜',
					'黄铜',
					'废纸',
					'库存积压',
					'废机械设备',
				],
				curindex: 0,
				cWidth: '',
				cHeight: '',
				tips: '',
				pixelRatio: 1,
				serverData: '',
				itemCount: 30, //x轴单屏数据密度
				sliderMax: 50
			}
		},
		created() {
			_self = this;
			this.cWidth = uni.upx2px(750);
			this.cHeight = uni.upx2px(500);
			this.arcbarWidth = uni.upx2px(24);
			this.gaugeWidth = uni.upx2px(30);
			this.getServerData();
		},
		methods: {
			clickitem(item, index) {
				this.curindex = index;
			},
			getServerData() {
				uni.showLoading({
					title: "正在加载数据..."
				})
				var date = new Date();
				var year=date.getFullYear(); //获取完整的年份(4位)
				this.api.home.getBillListYear({
					data: {
						userId: getApp().globalData.userdata.userId,
						year:year,
						type:0,
					}
				}).then(res => {
					uni.hideLoading();
					this.fillData(res.data.reverse());
				})
			},
			fillData(data = []) {
	
				let Mix = {
					"categories": [],
					"series": [{
						"name": "收入总金额（元）",
						"data": [],
						"type": "line",
						"color": "#18C02C"
					}]
				};
				data.forEach(item => {
					Mix.categories.push(item.time);
					Mix.series[0].data.push(item.sum)
				})
				this.showMix("canvasMix", Mix);
			},
			showMix(canvasId, chartData) {
				canvasObj[canvasId] = new uCharts({
					$this: _self,
					canvasId: canvasId,
					type: 'column',
					fontSize: 11,
					padding: [15, 15, 0, 15],
					legend: {
						show: true,
						padding: 5,
						lineHeight: 11,
						margin: 6,
					},
					background: '#FFFFFF',
					pixelRatio: 1,
					categories: chartData.categories,
					series: chartData.series,
					animation: false,
					enableScroll: true, //开启图表拖拽功能
					xAxis: {
						type: 'grid',
						gridType: 'dash',
						itemCount: 8,
						scrollShow: true,
						scrollAlign: 'left',
					},
					yAxis: {
						title: '',
						titleFontColor: '#212121',
						titleFontSize: 24,
						gridType: 'dash',
						dashLength: 4,
						splitNumber: 5,
						format: (val) => {
							return val.toFixed(0)
						}
					},
					width: _self.cWidth * _self.pixelRatio,
					height: _self.cHeight * _self.pixelRatio,
					dataLabel: true,
					dataPointShape: true,
					extra: {
						column: {
							width: 20 * _self.pixelRatio
						},
						tooltip: {
							bgColor: '#000000',
							bgOpacity: 0.7,
							gridType: 'dash',
							dashLength: 8,
							gridColor: '#1890ff',
							fontColor: '#FFFFFF',
							horizentalLine: true,
							xAxisLabel: true,
							yAxisLabel: true,
							labelBgColor: '#DFE8FF',
							labelBgOpacity: 0.95,
							labelAlign: 'left',
							labelFontColor: '#666666'
						}
					},
				});
			},
			touchMix(e) {
				canvasObj['canvasMix'].scrollStart(e);
			},
			moveMix(e) {
				canvasObj['canvasMix'].scroll(e);
			},
			touchEndMix(e) {
				canvasObj['canvasMix'].scrollEnd(e);
				canvasObj['canvasMix'].touchLegend(e);
				//下面是toolTip事件，如果滚动后不需要显示，可不填写
				canvasObj['canvasMix'].showToolTip(e, {
					format: function(item, category) {
						return category + ' ' + item.name + ':' + item.data
					}
				});
			},
		},
	}
</script>

<style scoped lang="scss">
	.uni-page-body {
		.option {
			padding: 30upx;

			.header-text {
				color: #575757;
			}

			.list {
				padding: 0upx 20upx;
				display: flex;
				flex-wrap: wrap;
			}
		}

		/* 通用样式 */
		.qiun-charts {
			width: 750upx;
			height: 500upx;
			background-color: #FFFFFF;
		}

		.charts {
			width: 750upx;
			height: 500upx;
			background-color: #FFFFFF;
		}

		/* 横屏样式 */
		.qiun-charts-rotate {
			width: 700upx;
			height: 1100upx;
			background-color: #FFFFFF;
			padding: 25upx;
		}

		.charts-rotate {
			width: 700upx;
			height: 1100upx;
			background-color: #FFFFFF;
		}
	}
</style>
