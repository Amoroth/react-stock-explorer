(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{106:function(e,t,a){e.exports={container:"Stocks_container__1IOqm","markets-container":"Stocks_markets-container__1bGVF","stocks-container":"Stocks_stocks-container__1gy6_",panel:"Stocks_panel__3Nsn9","panel-details":"Stocks_panel-details__1qic6","panel-title":"Stocks_panel-title__1V9s0","panel-upper":"Stocks_panel-upper__ZYUNh","panel-favorite":"Stocks_panel-favorite__2W3bC","no-favorites":"Stocks_no-favorites__jy8R6"}},285:function(e,t,a){"use strict";a.r(t);var n=a(9),c=a(10),o=a(12),r=a(11),s=a(13),i=a(0),l=a.n(i),u=a(288),m=a(106),p=a.n(m),f=function(e){var t=e.change,a=e.title,n=e.short,c=e.favorite,o=e.onFav,r=e.price,s=e.history,i=e.currency,u="".concat(t>0?"+":"").concat((100*t).toFixed(2),"%"),m=a;m.length>30&&(m="".concat(m.slice(0,28),"..."));var f=function(e){("keypress"===e.type&&13===e.which||"click"===e.type)&&s.push("/stock?cmp=".concat(n))};return l.a.createElement("div",{className:p.a.panel,onClick:f,role:"button",onKeyPress:f,tabIndex:0},l.a.createElement("div",{className:p.a["panel-upper"]},l.a.createElement("h6",{className:p.a["panel-title"],title:"."===m[m.length-2]?a:null},m),l.a.createElement("button",{className:p.a["panel-favorite"],onClick:function(e){return o(e,n)},type:"button"},c?l.a.createElement("i",{className:"material-icons",style:{color:"red"}},"favorite"):l.a.createElement("i",{className:"material-icons"},"favorite_border"))),l.a.createElement("div",{className:p.a["panel-details"]},l.a.createElement("span",null,n),l.a.createElement("span",null,"".concat("NaN"===r?0:r," ").concat(i)),l.a.createElement("span",{style:{color:t>0?"green":"red"}},u)))};f.defaultProps={favorite:!1};var h=Object(u.a)(f),k=a(8),v=a.n(k),d=function(e){var t=e.children,a=e.func;return l.a.createElement("button",{className:v.a["circular-button"],type:"button",onClick:a},t)};d.defaultProps={children:"",func:function(){}};var y=d,_=a(19),b=function(e){function t(){var e,a;Object(n.a)(this,t);for(var c=arguments.length,s=new Array(c),i=0;i<c;i++)s[i]=arguments[i];return(a=Object(o.a)(this,(e=Object(r.a)(t)).call.apply(e,[this].concat(s)))).state={stocks:[],market:"infocus"},a.onMarketChange=function(e){a.state.market!==e&&("favorites"!==e?fetch("https://api.iextrading.com/1.0/stock/market/list/".concat(e)).then(function(e){return e.json()}).then(function(t){a.setState({stocks:t,market:e})}).catch(function(){}):a.loadFavorites())},a.loadFavorites=function(){var e=a.props.favorites;e.length<1?a.setState({stocks:[],market:"favorites"}):fetch("https://api.iextrading.com/1.0/stock/market/batch?types=quote&symbols=".concat(e,"&filter=companyName,symbol,close,changePercent")).then(function(e){return e.json()}).then(function(e){var t=Object.keys(e).map(function(t){return e[t].quote});a.setState({stocks:t,market:"favorites"})}).catch(function(){})},a}return Object(s.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){var e=this,t=this.state.market;fetch("https://api.iextrading.com/1.0/stock/market/list/".concat(t)).then(function(e){return e.json()}).then(function(t){e.setState({stocks:t})}).catch(function(){})}},{key:"render",value:function(){var e=this,t=this.state,a=t.stocks,n=t.market,c=this.props,o=c.favorites,r=c.onFavorite,s=c.currency,i=c.currencyFormat,u=l.a.createElement(_.a,null);a.length>0?u=a.map(function(e){return l.a.createElement(h,{title:e.companyName,short:e.symbol,price:i(e.close),currency:s,change:e.changePercent,favorite:o.includes(e.symbol),key:e.symbol,onFav:r})}):"favorites"===n&&(u=l.a.createElement("h4",{className:p.a["no-favorites"]},"No Favorites! Add some by pressing the heart button"));var m=["In Focus","Favorites","Gainers","Losers"].map(function(t){var a=t.replace(" ","").toLowerCase();return l.a.createElement(y,{func:function(){return e.onMarketChange(a)},key:a},t)});return l.a.createElement("div",{className:p.a.container},l.a.createElement("div",{className:p.a["markets-container"]},m),l.a.createElement("div",{className:p.a["stocks-container"]},u))}}]),t}(l.a.Component);t.default=b}}]);
//# sourceMappingURL=1.2ab85867.chunk.js.map