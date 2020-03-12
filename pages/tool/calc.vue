<template>
	<view class="uni-page-body calc-box-con">
		<!--显示框-->
		<view class="calc-box">
			<input type="text" size="21" class="input-box" maxlength="21" v-model="inputShow.value" readonly="readonly">
			<view class="btn-list">
				<view @click="clearValue()" class=" btn-30 btn-radius color-red clear-marginleft">C</view>
				<view class=" btn-30 btn-radius color-blue">+/-</view>
				<view @click="inputValue('%')" class=" btn-30 btn-radius color-blue">%</view>
				<view @click="backValue()" class=" btn-70 btn-radius color-red font-14">←</view>
				<view @click="inputValue('7')" class=" btn-30 btn-radius clear-marginleft">7</view>
				<view @click="inputValue('8')" class=" btn-30 btn-radius">8</view>
				<view @click="inputValue('9')" class=" btn-30 btn-radius">9</view>
				<view @click="squareValue()" class=" btn-30 btn-radius color-blue font-14">×²</view>
				<view @click="radicalValue()" class=" btn-30 btn-radius color-blue font-12">√</view>
				<view @click="inputValue('4')" class=" btn-30 btn-radius clear-marginleft">4</view>
				<view @click="inputValue('5')" class=" btn-30 btn-radius">5</view>
				<view @click="inputValue('6')" class=" btn-30 btn-radius">6</view>
				<view @click="inputValue('×')" class=" btn-30 btn-radius color-blue font-14">×</view>
				<view @click="inputValue('÷')" class=" btn-30 btn-radius color-blue font-12">÷</view>
				<view @click="inputValue('1')" class=" btn-30 btn-radius clear-marginleft">1</view>
				<view @click="inputValue('2')" class=" btn-30 btn-radius">2</view>
				<view @click="inputValue('3')" class=" btn-30 btn-radius">3</view>
				<view @click="inputValue('+')" class=" btn-30 btn-radius color-blue font-14">+</view>
				<view @click="inputValue('-')" class=" btn-30 btn-radius color-blue font-14">-</view>
				<view @click="inputValue('0')" class=" btn-70 btn-radius clear-marginleft">0</view>
				<view @click="inputValue('.')" class=" btn-30 btn-radius">.</view>
				<view @click="calValue()" class=" btn-70 btn-radius color-red font-14">=</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				inputShow: {
					value: 0
				}
			}
		},
		methods: {
			inputValue(param) {
				if (Object.prototype.toString.call(this.inputShow.value) == "[object Number]") { //判断输入框内容是否为数字类型
					this.inputShow.value = "0"; //数字类型说明是上个计算结果,清空内容
				}
				var str = '' + this.inputShow.value; //输入内容时,将输入框内容转为字符串类型
				var len = str.length;
				var arr = ["+", "-", "×", "÷"];
				var num = ('' + parseFloat(str.split('').reverse().join(''))).split('').reverse().join(''); //parseInt(str.split('').reverse().join('')))是获取输入框内最后一串数字,再反转回来 ,num为输入框内最后一串数字
				var nlen = num.length;
				if ((num != '0' && param != '.') || (param == '.' && num.indexOf(".") == -1)) { //输入框内最后一串数字不为0时拼接字符串
					if (arr.indexOf(str.charAt(len - 1)) != -1 && arr.indexOf(param) != -1) { //若一开始输入内容为运算符,输入无效
						return;
					}
					this.inputShow.value += param; //拼接输入内容
				} else {
					arr.push("%");
					if (param == '.') { //若num中已有小数点,输入内容为小数点,视为无效
						return;
					} else if (!(arr.indexOf(param) != -1)) { //判断输入框内最后一个字符不为运算符
						this.inputShow.value = str.substring(0, str.length - nlen) + param; //输入框内最后一串数字为0时,删除0拼接
					}
				}
			},
			clearValue() { //清空输入框内容
				this.inputShow.value = '0';
			},
			calValue() { //计算结果
				var str = this.inputShow.value;
				str = str.replace('×', '*').replace('÷', '/').replace('%', '*0.01'); //替换运算符
				try {
					this.inputShow.value = eval(str); //若用户输入内容不符合运算规则,不计算
				} catch (error) {
					return;
				}
			},
			squareValue() { //平方计算
				var str = this.inputShow.value;
				this.inputShow.value = Math.pow(eval(str), 2)
			},
			radicalValue() { //开根号计算
				var str = this.inputShow.value;
				this.inputShow.value = Math.sqrt(eval(str));
			},
			backValue() { //删除键,删除单个字符
				var str = this.inputShow.value;
				if (str.length == 1) {
					this.inputShow.value = "0";
				} else {
					this.inputShow.value = str.slice(0, str.length - 1);
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.calc-box-con {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding-top: 100upx;
		.calc-box {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			padding: 20upx;
			border-radius: 4upx;
			border: 1upx solid $border-color-base;
			display: inline-block;
			.input-box {
				margin: 0;
				width: 520upx;
				padding: 20upx 10upx;
				height: 80upx;
				// border: 1px solid #e5e5e5;
				border-radius: 3upx;
				background: #FFF;
				text-align: right;
				line-height: 56upx;
				font-size: 48upx;
				font-family: Verdana, Geneva, sans-serif;
				color: #666;
				outline: none;
				text-transform: uppercase;
			}

			.btn-list {
				width: 640upx;
				overflow: hidden;
			}

			.btn-list .btn-radius {
				border-radius: 2px;
				border: 1px solid #e5e5e5;
				background: -webkit-gradient(linear, 0 0, 0 100%, from(#f7f7f7), to(#ebebeb));
				background: -moz-linear-gradient(top, #f7f7f7, #ebebeb);
				filter: progid:DXImageTransform.Microsoft.gradient(startColorstr=#f7f7f7, endColorstr=#ebebeb, grandientType=1);
				line-height: 120upx;
				text-align: center;
				text-shadow: 0px 1px 1px #FFF;
				font-weight: bold;
				font-family: Verdana, Geneva, sans-serif;
				color: #666;
				float: left;
				margin-left: 11px;
				margin-top: 11px;
				font-size: 14px;
				cursor: pointer;
			}

			.btn-list .btn-radius:active {
				background: #ffffff;
			}

			.btn-list .clear-marginleft {
				margin-left: 0;
			}

			.btn-list .font-14 {
				font-size: 18px;
			}

			.btn-list .color-red {
				color: #ff5050
			}

			.btn-list .color-blue {
				color: #00b4ff
			}

			.btn-list .btn-30 {
				width: 100upx;
				height: 100upx;
			}

			.btn-list .btn-70 {
				width: 225upx;
				height: 100upx;
			}
		}
	}
</style>
