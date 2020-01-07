<template>
	<view class="uni-page-body">
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
			this.getServerData();
		},
		methods: {
			getServerData() {
				console.log(1)
				uni.showLoading({
					title: "正在加载数据..."
				})
				uni.request({
					url: 'https://unidemo.dcloud.net.cn/hello-uniapp-ucharts-data.json',
					data: {},
					success: function(res) {
						_self.fillData(res.data);
					},
					fail: () => {
						_self.tips = "网络错误，小程序端请检查合法域名";
					},
					complete() {
						uni.hideLoading();
					}
				});
			},
			fillData() {
				let Mix = {
					"categories": ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
					"series": [{
						"name": "废铁",
						"data": [40, 30, 55, 110, 24, 58,40, 30, 55, 110, 24, 58],
						"type": "column",
						"color": "#353DDB"
					}, {
						"name": "废铝",
						"data": [50, 20, 75, 60, 34, 38,40, 30, 55, 110, 24, 58],
						"type": "column",
						"color": "#34B5B0"
					}, {
						"name": "废铜",
						"data": [50, 20, 75, 60, 34, 38,40, 30, 55, 110, 24, 58],
						"type": "column",
						"color": "#DDAF8B"
					}, {
						"name": "交易总金额（元）",
						"data": [120, 140, 105, 170, 95, 160,120, 140, 105, 170, 95, 160],
						"type": "line",
						"color": "#E7211A"
					}]
				};
				this.showMix("canvasMix", Mix);
			},
			showMix(canvasId, chartData) {
				canvasObj[canvasId] = new uCharts({
					$this: _self,
					canvasId: canvasId,
					type: 'mix',
					fontSize: 11,
					padding: [15, 15, 0, 15],
					legend: {
						show: true,
						padding: 5,
						lineHeight: 11,
						margin: 6,
					},
					background: '#FFFFFF',
					pixelRatio: _self.pixelRatio,
					categories: chartData.categories,
					series: chartData.series,
					animation: false,
					enableScroll: true, //开启图表拖拽功能
					xAxis: {
						disableGrid: false,
						type: 'grid',
						gridType: 'dash',
						itemCount: 4,
						scrollShow: true,
						scrollAlign: 'left',
					},
					yAxis: {
						title: '数量（吨）',
						titleFontColor: '#212121',
						titleFontSize: 24,
						gridType: 'dash',
						dashLength: 2,
						splitNumber: 5,
						min: 10,
						max: 180,
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
