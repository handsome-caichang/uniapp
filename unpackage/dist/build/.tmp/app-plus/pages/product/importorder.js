(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/product/importorder"],{"0b77":function(n,e,t){"use strict";t.r(e);var u=t("0fbe"),i=t("711b");for(var r in i)"default"!==r&&function(n){t.d(e,n,function(){return i[n]})}(r);t("1bf4");var o,c=t("f0c5"),a=Object(c["a"])(i["default"],u["b"],u["c"],!1,null,"08635c78",null,!1,u["a"],o);e["default"]=a.exports},"0fbe":function(n,e,t){"use strict";var u,i=function(){var n=this,e=n.$createElement;n._self._c},r=[];t.d(e,"b",function(){return i}),t.d(e,"c",function(){return r}),t.d(e,"a",function(){return u})},"1bf4":function(n,e,t){"use strict";var u=t("41f3"),i=t.n(u);i.a},"41f3":function(n,e,t){},"711b":function(n,e,t){"use strict";t.r(e);var u=t("bc13"),i=t.n(u);for(var r in u)"default"!==r&&function(n){t.d(e,n,function(){return u[n]})}(r);e["default"]=i.a},bc13:function(n,e,t){"use strict";(function(n){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var u=function(){return t.e("pages/product/child/rulpop").then(t.bind(null,"943f"))},i=function(){return t.e("components/uni-popup/uni-popup").then(t.bind(null,"e45d"))},r=function(){return Promise.all([t.e("common/vendor"),t.e("components/uni-icons/uni-icons")]).then(t.bind(null,"aa6a"))},o=function(){return t.e("components/uni-rate/uni-rate").then(t.bind(null,"5269"))},c={components:{uniRate:o,uniIcons:r,uniPopup:i,rulPop:u},data:function(){return{isactive:!0,protype:{label:"请选择货物类别",value:""},numberleng:"",pipeinum:"",price:"368",items:[{value:"USA",name:"余额支付"},{value:"CHN",name:"支付宝支付",checked:"true"},{value:"BRA",name:"微信支付"},{value:"JPN",name:"银行卡支付"}],current:0}},methods:{openrul:function(){var n=this;this.$nextTick(function(){n.$refs.showrul.open()})},changepage:function(n){this.isactive=n},payclick:function(){n.navigateTo({url:"/pages/customer/customerdetail"})},radioChange:function(n){for(var e=0;e<this.items.length;e++)if(this.items[e].value===n.target.value){this.current=e;break}}}};e.default=c}).call(this,t("6e42")["default"])},d543:function(n,e,t){"use strict";(function(n){t("e2db"),t("921b");u(t("66fd"));var e=u(t("0b77"));function u(n){return n&&n.__esModule?n:{default:n}}n(e.default)}).call(this,t("6e42")["createPage"])}},[["d543","common/runtime","common/vendor"]]]);