(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/user/set"],{"0640":function(n,t,e){},3988:function(n,t,e){"use strict";e.r(t);var u=e("4bb1"),o=e.n(u);for(var a in u)"default"!==a&&function(n){e.d(t,n,function(){return u[n]})}(a);t["default"]=o.a},4884:function(n,t,e){"use strict";(function(n){e("e2db"),e("921b");u(e("66fd"));var t=u(e("74e2"));function u(n){return n&&n.__esModule?n:{default:n}}n(t.default)}).call(this,e("6e42")["createPage"])},"4bb1":function(n,t,e){"use strict";(function(n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;e("2f62");var u=function(){return Promise.all([e.e("common/vendor"),e.e("components/uni-icons/uni-icons")]).then(e.bind(null,"aa6a"))},o={components:{uniIcons:u},data:function(){return{}},methods:{navTo:function(t){n.navigateTo({url:t})},toLogout:function(){n.showModal({content:"确定要退出登录么",success:function(t){t.confirm&&(n.removeStorageSync("userdata"),n.reLaunch({url:"/pages/login/login"}))}})},switchChange:function(n){var t=n.detail.value?"打开":"关闭";this.$api.msg("".concat(t,"消息推送"))}}};t.default=o}).call(this,e("6e42")["default"])},"74e2":function(n,t,e){"use strict";e.r(t);var u=e("b64f"),o=e("3988");for(var a in o)"default"!==a&&function(n){e.d(t,n,function(){return o[n]})}(a);e("9028");var c,r=e("f0c5"),i=Object(r["a"])(o["default"],u["b"],u["c"],!1,null,"8a1a8db0",null,!1,u["a"],c);t["default"]=i.exports},9028:function(n,t,e){"use strict";var u=e("0640"),o=e.n(u);o.a},b64f:function(n,t,e){"use strict";var u,o=function(){var n=this,t=n.$createElement;n._self._c},a=[];e.d(t,"b",function(){return o}),e.d(t,"c",function(){return a}),e.d(t,"a",function(){return u})}},[["4884","common/runtime","common/vendor"]]]);