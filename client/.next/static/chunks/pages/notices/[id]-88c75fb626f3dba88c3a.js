_N_E=(window.webpackJsonp_N_E=window.webpackJsonp_N_E||[]).push([[36],{"8MCx":function(e,i,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/notices/[id]",function(){return t("T2oc")}])},T2oc:function(e,i,t){"use strict";t.r(i),t.d(i,"__N_SSG",(function(){return l}));var c=t("oYCi"),n=(t("mXGw"),t("i3OP")),o=t("UutA").b.section.withConfig({displayName:"NoticeDetail__NoticeDetailContainer",componentId:"sc-1bv6goh-0"})(["margin:2rem 0 4rem 0;& img{width:100%;object-fit:contain;border:1px solid black;& + div{display:flex;text-align:center;margin:1rem 0;border:1px solid black;font-size:0.8em;font-weight:600;& div{flex:1;padding:0.5rem 0;}& div:last-child{border-left:1px solid black;flex:3;}}}& div.content{display:flex;margin:2rem 0;& div{flex:1;padding:0.5rem;}& div:last-child{flex:3;white-space:pre-line;}& .title{font-size:1.5em;font-weight:600;}}"]),s=function(e){var i=e.notice;return Object(c.jsxs)(o,{children:[Object(c.jsx)("img",{src:i.thumb||"/img/logos/localhostLogoBlack.png"}),Object(c.jsxs)("div",{children:[Object(c.jsx)("div",{children:i.createTime}),Object(c.jsx)("div",{children:"\uacf5\uc9c0\uc0ac\ud56d"})]}),Object(c.jsxs)("div",{className:"content",children:[Object(c.jsx)("div",{className:"title",children:i.title}),Object(c.jsx)("div",{children:i.description})]})]})},r=t("dfTy"),l=!0;i.default=function(e){var i=e.pageProps;return Object(c.jsxs)(n.a,{title:"".concat(i.notice.title," | localhost"),children:[Object(c.jsx)(s,{notice:i.notice}),Object(c.jsx)("hr",{}),Object(c.jsx)("h3",{children:"\ucd5c\uadfc \uacf5\uc9c0"}),Object(c.jsx)(r.a,{notices:i.recentNotices})]})}},dfTy:function(e,i,t){"use strict";var c=t("oYCi"),n=(t("mXGw"),t("UutA")),o=t("5dyF"),s=t.n(o),r=n.b.div.withConfig({displayName:"NoticeItem__NoticeItemContainer",componentId:"sc-7rbhs5-0"})(["width:33%;height:16rem;display:inline-block;padding:1rem;box-sizing:border-box;transition:all 0.3s ease;&:hover{background-color:rgba(81,151,213,0.1);}& img{display:block;width:100%;height:10rem;border:1px solid black;object-fit:contain;}& .tag{margin:0.5rem 0;font-size:0.7em;}& .day{margin:0.5rem 0;text-align:right;font-size:0.8em;}& .title{overflow:hidden;height:2.5em;}& .flex{display:flex;& > *{flex:1;}}"]),l=function(e){var i=e.notice;return Object(c.jsx)(r,{children:Object(c.jsx)(s.a,{href:"/notices/[id]",as:"/notices/".concat(i.id),children:Object(c.jsxs)("a",{children:[Object(c.jsx)("img",{src:i.thumb||"/img/logos/localhostLogoBlack.png",alt:"thumb"}),Object(c.jsxs)("div",{className:"flex",children:[Object(c.jsx)("p",{className:"tag",children:"\uacf5\uc9c0\uc0ac\ud56d"}),Object(c.jsx)("p",{className:"day",children:i.createTime})]}),Object(c.jsx)("div",{className:"title",children:i.title})]})})})},a=n.b.div.withConfig({displayName:"NoticeList__NoticeListContainer",componentId:"sc-1jf86mb-0"})(["display:flex;flex-wrap:wrap;margin:0 0 2rem 0;"]);i.a=function(e){return Object(c.jsx)(a,{children:e.notices.map((function(e){return Object(c.jsx)(l,{notice:e},e.id)}))})}}},[["8MCx",0,2,1,3,5,4,6,7,8]]]);