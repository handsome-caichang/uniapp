(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/product/newsdetail"],{"83b6":function(t,e,n){"use strict";n.r(e);var a=n("edb0"),u=n.n(a);for(var r in a)"default"!==r&&function(t){n.d(e,t,function(){return a[t]})}(r);e["default"]=u.a},8768:function(t,e,n){"use strict";var a,u=function(){var t=this,e=t.$createElement;t._self._c},r=[];n.d(e,"b",function(){return u}),n.d(e,"c",function(){return r}),n.d(e,"a",function(){return a})},cad6:function(t,e,n){"use strict";n.r(e);var a=n("8768"),u=n("83b6");for(var r in u)"default"!==r&&function(t){n.d(e,t,function(){return u[t]})}(r);n("e4a6");var c,o=n("f0c5"),i=Object(o["a"])(u["default"],a["b"],a["c"],!1,null,"f075967a",null,!1,a["a"],c);e["default"]=i.exports},e452:function(t,e,n){"use strict";(function(t){n("e2db"),n("921b");a(n("66fd"));var e=a(n("cad6"));function a(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("6e42")["createPage"])},e4a6:function(t,e,n){"use strict";var a=n("ef0e"),u=n.n(a);u.a},edb0:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=u(n("514a"));function u(t){return t&&t.__esModule?t:{default:t}}var r="<p>获取信息失败1</p>";var c={data:function(){return{banner:{},content:[]}},onLoad:function(e){t.setNavigationBarTitle({title:e.title}),this.banner=e,this.getDetail()},methods:{getDetail:function(){var e=this;t.request({url:"https://unidemo.dcloud.net.cn/api/news/36kr/5194916",success:function(t){var n=r;200==t.statusCode&&(n=t.data.content);var u=(0,a.default)(n);e.content=u}})}}};e.default=c}).call(this,n("6e42")["default"])},ef0e:function(t,e,n){}},[["e452","common/runtime","common/vendor"]]]);