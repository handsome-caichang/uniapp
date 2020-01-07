const tabList = [{
		id: "tab01",
		name: '推荐',
		newsid: 0
	}, {
		id: "tab02",
		name: '二手设备',
		newsid: 23
	}, {
		id: "tab03",
		name: '非金属',
		newsid: 223
	}, {
		id: "tab04",
		name: '消费',
		newsid: 221
	}, {
		id: "tab05",
		name: '娱乐',
		newsid: 225
	}, {
		id: "tab06",
		name: '区块链',
		newsid: 208
	}];
const newsList = [{
		id: 1,
		title: '从亲密无间到相爱相杀，这就是人类一败涂地的真相',
		author: 'TapTap',
		images: [
			'http://fc-feed.cdn.bcebos.com/0/pic/9107b498a0cbea000842763091e833b6.jpg',
			'http://fc-feed.cdn.bcebos.com/0/pic/dc4b0610241d7016279f4f4652ea0886.jpg',
			'http://fc-feed.cdn.bcebos.com/0/pic/0f6effa42536fb5c2ca945bd46c59335.jpg',
		],
		time: '2小时前',
		type: 3,
	},

	{
		id: 2,
		title: '别再玩手机了，赶紧学前端，晚一年能少掉5根头发',
		author: '爱考过',
		images: [
			'https://paimgcdn.baidu.com/v.777468F4BED7DDDA5B4958C671B07659?src=http%3A%2F%2Ffc-feed.cdn.bcebos.com%2F0%2Fpic%2F0bcc93ff9222cafa4526c980c17f69ec.jpg&rz=ar_3_370_245',
		],
		time: '30分钟前',
		type: 1,
	},
	{
		id: 3,
		title: '将府公园成居民身边“大绿肺”',
		author: '新京报',
		images: [
			'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1692298215,2450965851&fm=15&gp=0.jpg',
		],
		time: '2小时前',
		type: 3,
	},
	{
		id: 5,
		title: '继国通倒下后，又一公司放弃快递业务，曾砸20亿战“三通一达”',
		author: '全球加盟网',
		images: ['https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2892004605,2174659864&fm=26&gp=0.jpg'],
		videoSrc: 'https://dcloud-img.oss-cn-hangzhou.aliyuncs.com/guide/uniapp/%E7%AC%AC1%E8%AE%B2%EF%BC%88uni-app%E4%BA%A7%E5%93%81%E4%BB%8B%E7%BB%8D%EF%BC%89-%20DCloud%E5%AE%98%E6%96%B9%E8%A7%86%E9%A2%91%E6%95%99%E7%A8%8B@20181126.mp4',
		time: '5分钟前',
		type: 3,
	},
	{
		id: 6,
		title: '奔驰车主哭诉维权续：双方再次协商无果',
		author: '环球网',
		images: [],
		time: '5分钟前',
		type: 3,
	},
	{
		id: 7,
		title: '靠跑车激发潜能，奔驰Pro跑车首测，怎么那么像意大利跑车设计',
		author: '车品',
		images: [
			'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2133231534,4242817610&fm=173&app=49&f=JPEG?w=218&h=146&s=4FB42BC55E2A26076B2D1301030060C6',
			'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=1276936674,3021787485&fm=173&app=49&f=JPEG?w=218&h=146&s=4FB02FC40B00064332AD45170300D0C7',
			'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=1909353310,863816541&fm=173&app=49&f=JPEG?w=218&h=146&s=25F67E844C002445437DE8810300E0D3',
		],
		time: '2019-04-14 ：10:58',
		type: 3,
	},
	{
		id: 8,
		title: '程序员浪漫起来有多可怕，看完这3段代码眼睛湿润了!',
		author: '车品',
		images: [
			'http://p3-tt.bytecdn.cn/list/pgc-image/15394993934784aeea82ef5',
			'http://p1-tt.bytecdn.cn/list/pgc-image/153949939338547b7a69cf6',
			'http://p1-tt.bytecdn.cn/list/509a000211b25f210c77',
		],
		time: '2019-04-14 ：10:58',
		type: 3,
	},
]
const evaList = [{
		src: 'http://gss0.baidu.com/-fo3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/77c6a7efce1b9d1663174705fbdeb48f8d546486.jpg',
		nickname: 'Ranth Allngal',
		time: '09-20 12:54',
		zan: '54',
		content: '评论不要太苛刻，不管什么产品都会有瑕疵，客服也说了可以退货并且商家承担运费，我觉得至少态度就可以给五星。'
	},
	{
		src: 'http://img0.imgtn.bdimg.com/it/u=2396068252,4277062836&fm=26&gp=0.jpg',
		nickname: 'Ranth Allngal',
		time: '09-20 12:54',
		zan: '54',
		content: '楼上说的好有道理。'
	}
]
const bannerlist = [
	"/static/img/temp/banner3.jpg",
	"/static/img/temp/banner2.jpg",
	"/static/img/temp/banner4.jpg"
]
const arrayText = [
	'设置支付密码。为了确保您的资金安全，',
	'设置支付密码。为了确保您的资金安全，',
	'设置支付密码。为了确保您的资金安全，',
	'设置支付密码。为了确保您的资金安全，',
	'设置支付密码。为了确保您的资金安全，'
]
const goodsList = [{
		image: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553187020783&di=bac9dd78b36fd984502d404d231011c0&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201609%2F26%2F20160926173213_s5adi.jpeg",
		image2: "http://pic.rmb.bdstatic.com/819a044daa66718c2c40a48c1ba971e6.jpeg",
		image3: "http://img001.hc360.cn/y5/M00/1B/45/wKhQUVYFE0uEZ7zVAAAAAMj3H1w418.jpg",
		title: "古黛妃 短袖t恤女夏装2019新款韩版宽松",
		price: 179,
		sales: 61,
	},
	{
		image: "http://img.zcool.cn/community/017a4e58b4eab6a801219c77084373.jpg",
		image2: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554013048&di=a3dc9fd1406dd7bad7fbb97b5489ec04&imgtype=jpg&er=1&src=http%3A%2F%2Fimg009.hc360.cn%2Fhb%2FnKo44ac2656F831c684507E3Da0E3a26841.jpg",
		image3: "http://img.zcool.cn/community/017a4e58b4eab6a801219c77084373.jpg",
		title: "潘歌针织连衣裙",
		price: 78,
		sales: 16,
	},
	{
		image: "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1620020012,789258862&fm=26&gp=0.jpg",
		image2: "http://m.360buyimg.com/n12/jfs/t247/42/1078640382/162559/3628a0b/53f5ad09N0dd79894.jpg%21q70.jpg",
		image3: "http://ikids.61kids.com.cn/upload/2018-12-29/1546070626796114.jpg",
		title: "巧谷2019春夏季新品新款女装",
		price: 108.8,
		sales: 5,
	}, {
		image: "http://img13.360buyimg.com/popWaterMark/jfs/t865/120/206320620/138889/dcc94caa/550acedcN613e2a9d.jpg",
		image2: "http://images.jaadee.com/images/201702/goods_img/30150_d85aed83521.jpg",
		image3: "http://img13.360buyimg.com/popWaterMark/jfs/t865/120/206320620/138889/dcc94caa/550acedcN613e2a9d.jpg",
		title: "私萱连衣裙",
		price: 265,
		sales: 88,
	}, {
		image: "https://img13.360buyimg.com/n8/jfs/t1/30343/20/1029/481370/5c449438Ecb46a15b/2b2adccb6dc742fd.jpg",
		image2: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553418265666&di=d4a7f7eb0ae3c859edeb921641ee1c3a&imgtype=0&src=http%3A%2F%2Fimg003.hc360.cn%2Fy3%2FM02%2FF8%2F9F%2FwKhQh1TuSkGELIlQAAAAAPuLl4M987.jpg",
		image3: "http://img.ef43.com.cn/product/2016/8/05100204b0c.jpg",
		title: "娇诗茹 ulzzang原宿风学生潮韩版春夏短",
		price: 422,
		sales: 137,
	}, {
		image: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553187020783&di=bac9dd78b36fd984502d404d231011c0&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201609%2F26%2F20160926173213_s5adi.jpeg",
		image2: "http://image5.suning.cn/uimg/b2c/newcatentries/0070158827-000000000622091973_2_800x800.jpg",
		image3: "http://img.61ef.cn/news/201903/20/2019032009251784.jpg",
		title: "古黛妃 短袖t恤女夏装2019新款韩版宽松",
		price: 179,
		sales: 95,
	},
]
const	productList = [
			{
				goods_id: 0,
				img: '/static/img/goods/p1.jpg',
				name: '商品名称商品名称商品名称商品名称商品名称',
				price: '￥168',
				slogan: '1235人付款'
			},
			{
				goods_id: 1,
				img: '/static/img/goods/p2.jpg',
				name: '商品名称商品名称商品名称商品名称商品名称',
				price: '￥168',
				slogan: '1235人付款'
			},
			{
				goods_id: 2,
				img: '/static/img/goods/p3.jpg',
				name: '商品名称商品名称商品名称商品名称商品名称',
				price: '￥168',
				slogan: '1235人付款'
			},
			{
				goods_id: 3,
				img: '/static/img/goods/p4.jpg',
				name: '商品名称商品名称商品名称商品名称商品名称',
				price: '￥168',
				slogan: '1235人付款'
			},
			{
				goods_id: 4,
				img: '/static/img/goods/p5.jpg',
				name: '商品名称商品名称商品名称商品名称商品名称',
				price: '￥168',
				slogan: '1235人付款'
			},
			{
				goods_id: 5,
				img: '/static/img/goods/p6.jpg',
				name: '商品名称商品名称商品名称商品名称商品名称',
				price: '￥168',
				slogan: '1235人付款'
			},
			{
				goods_id: 6,
				img: '/static/img/goods/p7.jpg',
				name: '商品名称商品名称商品名称商品名称商品名称',
				price: '￥168',
				slogan: '1235人付款'
			},
			{
				goods_id: 7,
				img: '/static/img/goods/p8.jpg',
				name: '商品名称商品名称商品名称商品名称商品名称',
				price: '￥168',
				slogan: '1235人付款'
			},
			{
				goods_id: 8,
				img: '/static/img/goods/p9.jpg',
				name: '商品名称商品名称商品名称商品名称商品名称',
				price: '￥168',
				slogan: '1235人付款'
			},
			{
				goods_id: 9,
				img: '/static/img/goods/p10.jpg',
				name: '商品名称商品名称商品名称商品名称商品名称',
				price: '￥168',
				slogan: '1235人付款'
			}
		]
			

export default {
	tabList,
	newsList,
	evaList,
	bannerlist,
	arrayText,
	goodsList,
	productList
}
