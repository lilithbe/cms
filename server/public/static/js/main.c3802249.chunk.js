(this.webpackJsonpportfolio=this.webpackJsonpportfolio||[]).push([[0],{125:function(e,t,c){"use strict"},126:function(e,t,c){"use strict"},135:function(e,t){console.log("#/"===window.location.hash?"main":"non main")},136:function(e,t,c){"use strict";c(79)},235:function(e,t,c){},236:function(e,t,c){"use strict";c(125),c(70),c(126),c(71),c(135),c(136)},257:function(e,t,c){},258:function(e,t,c){"use strict";c.r(t);c(156);var a,o=c(1),n=c(17),l=c.n(n),s=c(21),i=c(26),r="AUTH_LOADING",d="AUTH_UPDATE",_="AUTH_LOGOUT",u="AUTH_FAIL",p=function(e){return function(t){try{t(j(!0)),t(h(e)),t(j(!1))}catch(c){t(j(!1)),t(f(c))}}},m=function(){return function(e){try{e(b()),e(j(!1))}catch(t){e(j(!1)),e(f(t))}}},b=function(){return{type:_}},j=function(e){return{type:r,payload:e}},h=function(e){return{type:d,payload:e}},f=function(e){return{type:u,payload:e}},y="CONFIG_LOADING",g="CONFIG_UPDATE",O="CONFIG_FAIL",x=function(e){return function(t){try{t(v(!0)),t(k(e)),t(v(!1))}catch(c){t(v(!1)),t(w(c))}}},v=function(e){return{type:y,payload:e}},k=function(e){return{type:g,payload:e}},w=function(e){return{type:O,payload:e}},D="BOARD_LOADING",N="BOARD_UPDATE",S="BOARD_FAIL",I=function(e){return function(t){try{t(C(!0)),t(L(e)),t(C(!1))}catch(c){t(C(!1)),t(E(c))}}},C=function(e){return{type:D,payload:e}},L=function(e){return{type:N,payload:e}},E=function(e){return{type:S,payload:e}},A="GROUP_LOADING",K="GROUP_UPDATE",P="GROUP_FAIL",T=function(e){return function(t){try{t(F(!0)),t(M(e)),t(F(!1))}catch(c){t(F(!1)),t(R(c))}}},F=function(e){return{type:A,payload:e}},M=function(e){return{type:K,payload:e}},R=function(e){return{type:P,payload:e}},U="SOCKET_LOADING",G="SOCKET_START",B="SOCKET_DISCONNECT",H="SOCKET_FAIL",Y=function(){return{type:B}},W=function(e){return{type:U,payload:e}},q=function(e){return{type:G,payload:e}},z=function(e){return{type:H,payload:e}},J="MESSAGE_LOADING",V="MESSAGE_UPDATE",X="MESSAGE_FAIL",Q=c(7),Z=c(70),$=c(6),ee=c(153),te=(c(228),c(229),c(230),c(231),c(232),c(233),c(234),c(235),c(57)),ce=(c(236),c(0)),ae=Object(i.b)((function(e){return{configData:e.configData,authData:e.authData}}),(function(e){return{setLogout:function(t){return e(m())},setLogin:function(t){return e(p(t))},setConfig:function(t){return e(x(t))},setBoard:function(t){return e(I(t))},setGroup:function(t){return e(T(t))}}}))((function(e){e.authData,e.configData;return Object(ce.jsx)("section",{id:"section-header",className:"section-show"})})),oe=c(49),ne=c(3),le=c(43),se=(c(137),c(138),c(74)),ie=(c(72),c(75)),re=c.n(ie),de=c(76),_e=c(77),ue=c.n(_e),pe=function(e){var t=e.setLogin,c=e.loginHandler,a=e.configData,n=e.socketData,l=Object(o.useState)(!1),i=Object(s.a)(l,2),r=i[0],d=i[1],_=Object(o.useState)({userId:"",password:"",remember:!0}),u=Object(s.a)(_,2),p=u[0],m=u[1],b=Object(o.useState)(!1),j=Object(s.a)(b,2),h=(j[0],j[1],Object($.e)()),f=function(e){m(Object(ne.a)(Object(ne.a)({},p),{},Object(oe.a)({},e.target.id,e.target.value)))},y=function(e){n.socket.emit("google-login",e)};return Object(ce.jsx)("form",{onSubmit:function(e){e.preventDefault(),n.socket.emit("local-login",p,(function(e){console.log(e),e.status?(t(e.data),localStorage.setItem(Q.d,e.token),localStorage.setItem(Q.c,p.remember),h.push("/"),c()):d(!r)}))},children:Object(ce.jsx)("div",{className:"flex align-items-center justify-content-center",children:Object(ce.jsxs)("div",{className:"surface-card p-4 shadow-2 border-round w-full lg:w-6",children:[Object(ce.jsx)("div",{className:"text-center mb-5",children:Object(ce.jsx)("div",{className:"text-900 text-3xl font-medium mb-3",children:"Welcome Admin"})}),Object(ce.jsxs)("div",{children:[Object(ce.jsx)("label",{htmlFor:"email",className:"block text-900 font-medium mb-2",children:"Email"}),Object(ce.jsx)(le.a,{onChange:f,name:"email",id:"userId",className:"w-full mb-3"}),Object(ce.jsx)("label",{htmlFor:"password",className:"block text-900 font-medium mb-2",children:"Password"}),Object(ce.jsx)(le.a,{type:"password",id:"password",className:"w-full mb-3",onChange:f}),Object(ce.jsx)("div",{className:"flex align-items-center justify-content-between mb-6",children:Object(ce.jsxs)("div",{className:"flex align-items-center",children:[Object(ce.jsx)(se.a,{className:"mr-2",onChange:function(e){m(Object(ne.a)(Object(ne.a)({},p),{},{remember:e.checked}))},id:"remember",checked:p.remember}),Object(ce.jsx)("label",{htmlFor:"rememberme",children:"Remember me"})]})}),Object(ce.jsx)(te.a,{label:"Local Login",type:"submit",icon:"pi pi-user",className:"w-full mb-1"}),Object(ce.jsx)("hr",{}),a.dc_auth_google.isUse?Object(ce.jsx)(re.a,{clientId:a.dc_auth_google.publicKey,onSuccess:function(e){console.log(e.profileObj),console.log(e.accessToken),y({id:e.googleId,type:"google-login",loginData:e.profileObj,token:e.accessToken})},onFailure:function(e){console.log(e)},disabled:!1,cookiePolicy:"single_host_origin"}):null,a.dc_auth_kakao.isUse?Object(ce.jsx)(de.a,{token:a.dc_auth_kakao.publicKey,onSuccess:function(e){y({id:e.profile.id,type:"kakao-login",loginData:e.profile.kakao_account,token:e.response.access_token})},onFail:function(e){console.log(e)},onLogout:function(e){console.log(e)}}):null,a.dc_auth_naver.isUse?Object(ce.jsx)(ue.a,{clientId:a.dc_auth_naver.publicKey,callbackUrl:"http://localhost:3001",render:function(e){return Object(ce.jsx)("button",{onClick:e.onClick,children:"Naver Login"})},onSuccess:function(e){return console.log(e)},onFailure:function(e){return console.log(e)}}):null]})]})})})},me=Object(i.b)((function(e){return{authData:e.authData,configData:e.configData,socketData:e.socketData}}),(function(e){return{setLogin:function(t){return e(p(t))}}}))(pe);pe.defaultProps={loginHandler:function(){}};var be=Object(i.b)((function(e){return{configData:e.configData,authData:e.authData}}),(function(e){return{setLogin:function(t){return e(p(t))},setConfig:function(t){return e(x(t))}}}))((function(e){e.authData;var t=e.configData,c=e.socketData,a=Object(o.useState)(!1),n=Object(s.a)(a,2),l=n[0],i=n[1],r=Object(o.useState)({userId:"",password:"",remember:!0}),d=Object(s.a)(r,2),_=d[0],u=d[1],m=Object(o.useState)(!1),b=Object(s.a)(m,2),j=(b[0],b[1],Object($.e)()),h=function(e){u(Object(ne.a)(Object(ne.a)({},_),{},Object(oe.a)({},e.target.id,e.target.value)))},f=function(e){c.socket.emit("google-login",e)};return Object(ce.jsx)("form",{onSubmit:function(e){e.preventDefault(),c.socket.emit("local-login",_,(function(e){console.log(e),e.status?(p(e.data),localStorage.setItem(Q.d,e.token),localStorage.setItem(Q.c,_.remember),j.push("/")):i(!l)}))},children:Object(ce.jsx)("div",{className:"flex align-items-center justify-content-center",children:Object(ce.jsxs)("div",{className:"surface-card p-4 shadow-2 border-round w-full xl:w-2 lg:w-3 md:w-4 sm:w-5",children:[Object(ce.jsx)("div",{className:"text-center mb-5",children:Object(ce.jsx)("div",{className:"text-900 text-3xl font-medium mb-3",children:"Register"})}),Object(ce.jsxs)("div",{children:[Object(ce.jsx)("label",{htmlFor:"email",className:"block text-900 font-medium mb-2",children:"Email"}),Object(ce.jsx)(le.a,{onChange:h,name:"email",id:"userId",className:"w-full mb-3"}),Object(ce.jsx)("label",{htmlFor:"password",className:"block text-900 font-medium mb-2",children:"Password"}),Object(ce.jsx)(le.a,{type:"password",id:"password",className:"w-full mb-3",onChange:h}),Object(ce.jsx)("div",{className:"flex align-items-center justify-content-between mb-6",children:Object(ce.jsxs)("div",{className:"flex align-items-center",children:[Object(ce.jsx)(se.a,{className:"mr-2",onChange:function(e){u(Object(ne.a)(Object(ne.a)({},_),{},{remember:e.checked}))},id:"remember",checked:_.remember}),Object(ce.jsx)("label",{htmlFor:"rememberme",children:"Remember me"})]})}),Object(ce.jsx)(te.a,{label:"Local Login",type:"submit",icon:"pi pi-user",className:"w-full mb-1"}),Object(ce.jsx)("hr",{}),t.dc_auth_google.isUse?Object(ce.jsx)(re.a,{clientId:t.dc_auth_google.publicKey,onSuccess:function(e){console.log(e.profileObj),console.log(e.accessToken),f({id:e.googleId,type:"google-login",loginData:e.profileObj,token:e.accessToken})},onFailure:function(e){console.log(e)},disabled:!1,cookiePolicy:"single_host_origin"}):null,t.dc_auth_kakao.isUse?Object(ce.jsx)(de.a,{token:t.dc_auth_kakao.publicKey,onSuccess:function(e){f({id:e.profile.id,type:"kakao-login",loginData:e.profile.kakao_account,token:e.response.access_token})},onFail:function(e){console.log(e)},onLogout:function(e){console.log(e)}}):null,t.dc_auth_naver.isUse?Object(ce.jsx)(ue.a,{clientId:t.dc_auth_naver.publicKey,callbackUrl:"http://localhost:3001",render:function(e){return Object(ce.jsx)("button",{onClick:e.onClick,children:"Naver Login"})},onSuccess:function(e){return console.log(e)},onFailure:function(e){return console.log(e)}}):null]})]})})})})),je=Object(i.b)((function(e){return{configData:e.configData,authData:e.authData}}),(function(e){return{setLogout:function(t){return e(m())},setLogin:function(t){return e(p(t))},setConfig:function(t){return e(x(t))},setBoard:function(t){return e(I(t))},setGroup:function(t){return e(T(t))}}}))((function(e){e.authData,e.configData;return Object(ce.jsx)("section",{id:"about",className:"about",children:Object(ce.jsxs)("div",{className:"about-me container",children:[Object(ce.jsxs)("div",{className:"section-title",children:[Object(ce.jsx)("h2",{children:"About"}),Object(ce.jsx)("p",{children:"Learn more about me"})]}),Object(ce.jsxs)("div",{className:"row",children:[Object(ce.jsx)("div",{className:"col-lg-4","data-aos":"fade-right",children:Object(ce.jsx)("img",{src:"/assets/images/profile.png",className:"img-fluid",alt:"profileImg"})}),Object(ce.jsxs)("div",{className:"col-lg-8 pt-4 pt-lg-0 content","data-aos":"fade-left",children:[Object(ce.jsx)("h3",{children:"NodeJs & FrontEnd & backEnd Developer"}),Object(ce.jsx)("p",{className:"font-italic",children:"I think that a person who enjoys cannot beat a person who works hard."}),Object(ce.jsxs)("div",{className:"row",children:[Object(ce.jsx)("div",{className:"col-lg-6",children:Object(ce.jsxs)("ul",{children:[Object(ce.jsxs)("li",{children:[Object(ce.jsx)("i",{className:"icofont-rounded-right"})," ",Object(ce.jsx)("strong",{children:"Birthday:"})," 9 May 1983"]}),Object(ce.jsxs)("li",{children:[Object(ce.jsx)("i",{className:"icofont-rounded-right"})," ",Object(ce.jsx)("strong",{children:"Website:"})," https://lilith.co.kr"]}),Object(ce.jsxs)("li",{children:[Object(ce.jsx)("i",{className:"icofont-rounded-right"})," ",Object(ce.jsx)("strong",{children:"Phone:"})," +10 010 5050 2783"]}),Object(ce.jsxs)("li",{children:[Object(ce.jsx)("i",{className:"icofont-rounded-right"})," ",Object(ce.jsx)("strong",{children:"City:"})," ","Deajun , Republic of Korea"]})]})}),Object(ce.jsx)("div",{className:"col-lg-6",children:Object(ce.jsxs)("ul",{children:[Object(ce.jsxs)("li",{children:[Object(ce.jsx)("i",{className:"icofont-rounded-right"})," ",Object(ce.jsx)("strong",{children:"Age:"})," ","39"]}),Object(ce.jsxs)("li",{children:[Object(ce.jsx)("i",{className:"icofont-rounded-right"})," ",Object(ce.jsx)("strong",{children:"Degree:"})," Master"]}),Object(ce.jsxs)("li",{children:[Object(ce.jsx)("i",{className:"icofont-rounded-right"})," ",Object(ce.jsx)("strong",{children:"PhEmailone:"})," lilithbe.dev@gmail.com"]}),Object(ce.jsxs)("li",{children:[Object(ce.jsx)("i",{className:"icofont-rounded-right"})," ",Object(ce.jsx)("strong",{children:"Freelance:"})," Available"]})]})})]}),Object(ce.jsx)("p",{children:"Developers should always have questions."}),Object(ce.jsx)("p",{children:"And I should always ask myself if I'm happy with it."}),Object(ce.jsx)("p",{children:"I always have to say no."}),Object(ce.jsx)("p",{children:"The harder I work, the better the results."}),Object(ce.jsx)("hr",{}),"I have never been infected with Corona, and I have been vaccinated with the Moderna vaccine twice."]})]})]})})})),he=function(){return Object(ce.jsx)("section",{id:"contact",class:"contact",children:Object(ce.jsxs)("div",{class:"container",children:[Object(ce.jsxs)("div",{class:"section-title",children:[Object(ce.jsx)("h2",{children:"Contact"}),Object(ce.jsx)("p",{children:"Contact Me"})]}),Object(ce.jsxs)("div",{class:"row mt-2",children:[Object(ce.jsx)("div",{class:"col-md-6 d-flex align-items-stretch",children:Object(ce.jsxs)("div",{class:"info-box",children:[Object(ce.jsx)("i",{class:"bx bx-map"}),Object(ce.jsx)("h3",{children:"My Address"}),Object(ce.jsx)("p",{children:"A108 Adam Street, New York, NY 535022"})]})}),Object(ce.jsx)("div",{class:"col-md-6 mt-4 mt-md-0 d-flex align-items-stretch",children:Object(ce.jsxs)("div",{class:"info-box",children:[Object(ce.jsx)("i",{class:"bx bx-share-alt"}),Object(ce.jsx)("h3",{children:"Social Profiles"}),Object(ce.jsxs)("div",{class:"social-links",children:[Object(ce.jsx)("a",{href:"#",class:"twitter",children:Object(ce.jsx)("i",{class:"icofont-twitter"})}),Object(ce.jsx)("a",{href:"#",class:"facebook",children:Object(ce.jsx)("i",{class:"icofont-facebook"})}),Object(ce.jsx)("a",{href:"#",class:"instagram",children:Object(ce.jsx)("i",{class:"icofont-instagram"})}),Object(ce.jsx)("a",{href:"#",class:"google-plus",children:Object(ce.jsx)("i",{class:"icofont-skype"})}),Object(ce.jsx)("a",{href:"#",class:"linkedin",children:Object(ce.jsx)("i",{class:"icofont-linkedin"})})]})]})}),Object(ce.jsx)("div",{class:"col-md-6 mt-4 d-flex align-items-stretch",children:Object(ce.jsxs)("div",{class:"info-box",children:[Object(ce.jsx)("i",{class:"bx bx-envelope"}),Object(ce.jsx)("h3",{children:"Email Me"}),Object(ce.jsx)("p",{children:"contact@example.com"})]})}),Object(ce.jsx)("div",{class:"col-md-6 mt-4 d-flex align-items-stretch",children:Object(ce.jsxs)("div",{class:"info-box",children:[Object(ce.jsx)("i",{class:"bx bx-phone-call"}),Object(ce.jsx)("h3",{children:"Call Me"}),Object(ce.jsx)("p",{children:"+1 5589 55488 55"})]})})]}),Object(ce.jsxs)("form",{action:"forms/contact.php",method:"post",role:"form",class:"php-email-form mt-4",children:[Object(ce.jsxs)("div",{class:"form-row",children:[Object(ce.jsxs)("div",{class:"col-md-6 form-group",children:[Object(ce.jsx)("input",{type:"text",name:"name",class:"form-control",id:"name",placeholder:"Your Name","data-rule":"minlen:4","data-msg":"Please enter at least 4 chars"}),Object(ce.jsx)("div",{class:"validate"})]}),Object(ce.jsxs)("div",{class:"col-md-6 form-group",children:[Object(ce.jsx)("input",{type:"email",class:"form-control",name:"email",id:"email",placeholder:"Your Email","data-rule":"email","data-msg":"Please enter a valid email"}),Object(ce.jsx)("div",{class:"validate"})]})]}),Object(ce.jsxs)("div",{class:"form-group",children:[Object(ce.jsx)("input",{type:"text",class:"form-control",name:"subject",id:"subject",placeholder:"Subject","data-rule":"minlen:4","data-msg":"Please enter at least 8 chars of subject"}),Object(ce.jsx)("div",{class:"validate"})]}),Object(ce.jsxs)("div",{class:"form-group",children:[Object(ce.jsx)("textarea",{class:"form-control",name:"message",rows:"5","data-rule":"required","data-msg":"Please write something for us",placeholder:"Message"}),Object(ce.jsx)("div",{class:"validate"})]}),Object(ce.jsxs)("div",{class:"mb-3",children:[Object(ce.jsx)("div",{class:"loading",children:"Loading"}),Object(ce.jsx)("div",{class:"error-message"}),Object(ce.jsx)("div",{class:"sent-message",children:"Your message has been sent. Thank you!"})]}),Object(ce.jsx)("div",{class:"text-center",children:Object(ce.jsx)("button",{type:"submit",children:"Send Message"})})]})]})})},fe=c(147),ye=function(){return Object(ce.jsx)("section",{id:"skill",className:"skill",children:Object(ce.jsx)("div",{className:"container-fluid",children:Object(ce.jsxs)("div",{className:"section-title",children:[Object(ce.jsx)("h2",{children:"Skill"}),Object(ce.jsx)("p",{children:"Here are my skills and usage examples."}),Object(ce.jsx)("div",{style:{width:"500px"},children:[{label:"NodeJs",type:"Software platform",level:80,children:[{label:"express",type:"library",level:90,children:[]},{label:"babel",type:"library",level:90,children:[{label:"babel-cli",type:"library",level:90,children:[]}]}]},{label:"Html",type:"language",level:90,children:[]},{label:"Javascript",type:"language",level:90,children:[{label:"socket.io",type:"library",level:99,children:[{label:"socket.io-client",type:"library",level:99,children:[]}]},{label:"redux",type:"library",level:99,children:[{label:"react-redux",type:"library",level:99,children:[]}]},{label:"React",type:"framework",level:80,children:[{label:"reactStrap",type:"library",level:99,children:[]},{label:"primeReact",type:"library",level:99,children:[]}]}]},{label:"CSS",type:"language",level:70,children:[]},{label:"SASS",type:"language",level:70,children:[]},{label:"MySql",type:"language",level:70,children:[{label:"Sequelize",type:"owl",level:70,children:[]}]}].map((function(e,t){return Object(ce.jsx)(ge,{item:e,index:t},t)}))})]})})})},ge=function e(t){var c=t.item;t.index;return Object(ce.jsx)("ul",{children:Object(ce.jsxs)("li",{children:[Object(ce.jsx)("div",{className:"",children:c.label}),Object(ce.jsxs)("div",{className:"",children:[Object(ce.jsx)(fe.a,{showValue:!1,value:c.level}),c.level,"%"]}),c.children.length>0?c.children.map((function(t,c){return Object(ce.jsx)(e,{item:t,index:c},c)})):null]})})},Oe=function(){return Object(ce.jsx)("section",{id:"portfolio",className:"portfolio",children:Object(ce.jsx)("div",{className:"container-fluid",children:Object(ce.jsxs)("div",{class:"section-title",children:[Object(ce.jsx)("h2",{children:"Portfolio"}),Object(ce.jsx)("p",{children:"Check My Portfolio"}),Object(ce.jsxs)("div",{class:"row",children:[Object(ce.jsx)("div",{className:"col-lg-2",children:"list"}),Object(ce.jsx)("div",{className:"col-lg-5",children:"doc"}),Object(ce.jsx)("div",{className:"col-lg-5",children:"code"})]})]})})})},xe=c(71),ve=c(148),ke=function(e){return e.isLoading?Object(ce.jsx)("div",{style:{position:"absolute",width:"100%",height:"100%",top:0,left:0,zIndex:999999,background:"rgba(0, 0, 0, 0.405)"},children:Object(ce.jsx)(ve.a,{style:{position:"absolute",top:"50%",left:"43%"}})}):null},we=(c(257),c(149)),De=c.n(we),Ne=c(42),Se=function(){var e=Object(o.useState)(0),t=Object(s.a)(e,2),c=t[0],a=t[1],n=[{label:"Home",to:"header"},{label:"About",to:"about"},{label:"Skill",to:"skill"},{label:"Portfolio",to:"portfolio"},{label:"Contact",to:"contact"}],l=function(){return Object(ce.jsx)("ul",{children:n.map((function(e,t){return Object(ce.jsx)("li",{className:c===t?"active":"",children:Object(ce.jsx)(Ne.b,{to:"/".concat(e.to),onClick:function(){i(e.to,t)},children:e.label})},t)}))})},i=function(e,t){a(t);document.getElementById("layout-wrapper").style="background-color:".concat(["#0000003b","#5403326c","#2903546c","#0326546c","#0351546c"][Math.floor(4*Math.random())]),"header"===e||"contact"===e?document.getElementById("layout-wrapper").classList.add("image"):document.getElementById("layout-wrapper").classList.remove("image"),"header"===e?document.getElementById("header").classList.remove("header-top"):(document.getElementById("header").classList.add("header-top"),setTimeout((function(){document.getElementById(e).classList.add("section-show")}),500))};return Object(ce.jsxs)("div",{children:[Object(ce.jsx)("header",{id:"header",className:"header-tops",children:Object(ce.jsxs)("div",{className:"container",children:[Object(ce.jsx)("h1",{children:Object(ce.jsx)(Ne.b,{to:"/header",onClick:function(){i("header",0)},children:"Jung-hyun Gwon"})}),Object(ce.jsxs)("h2",{children:["I'm a passionate ",Object(ce.jsx)("span",{children:"Progremer"})," from Republic of Korea"]}),Object(ce.jsx)("nav",{className:"nav-menu d-none d-lg-block",children:Object(ce.jsx)("ul",{children:Object(ce.jsx)(l,{})})})]})}),Object(ce.jsxs)("div",{children:[Object(ce.jsx)("button",{type:"button",className:"mobile-nav-toggle d-lg-none",onClick:function(e){e.preventDefault(),document.getElementById("body").classList.toggle("mobile-nav-active")},children:Object(ce.jsx)(De.a,{icon:"navigation-menu"})}),Object(ce.jsx)("nav",{className:"mobile-nav d-lg-none",children:Object(ce.jsx)("ul",{children:Object(ce.jsx)(l,{})})})]})]})},Ie=Object(i.b)((function(e){return{configData:e.configData,authData:e.authData,socketData:e.socketData,messageData:e.messageData}}),(function(e){return{setLogout:function(t){return e(m())},setLogin:function(t){return e(p(t))},setConfig:function(t){return e(x(t))},setBoard:function(t){return e(I(t))},setGroup:function(t){return e(T(t))},setSocketStart:function(t){return e(function(e){return function(t){try{t(W(!0)),t(q(e)),t(W(!1))}catch(c){t(W(!1)),t(z(c))}}}(t))},setDisconnect:function(){return e((function(e){try{e(Y()),e(W(!1))}catch(t){e(W(!1)),e(z(t))}}))}}}))((function(e){e.authData;var t=e.setConfig,c=e.setBoard,n=e.setGroup,l=e.setLogin,i=e.socketData,r=(e.messageData,e.setSocketStart),d=e.setDisconnect,_=Object(o.useState)(!1),u=Object(s.a)(_,2),p=u[0],m=u[1],b=Object(o.useState)(!1),j=Object(s.a)(b,2),h=j[0],f=j[1];return Object(Z.a)(l,i),Object(xe.a)(f,t,c,n,m),function(e,t){var c=Q.b;Object(o.useEffect)((function(){(a=Object(ee.a)(c)).emit("start",{data:"hi"},(function(t){e(a)})),a.on("disconnect",(function(){t()}))}),[c,t,e])}(r,d),Object(ce.jsxs)("div",{id:"layout-wrapper",className:"layout-wrapper",children:[Object(ce.jsx)(ke,{isLoading:h}),p?Object(ce.jsxs)("div",{children:[Object(ce.jsx)(Se,{}),Object(ce.jsxs)("div",{className:"layout-main-container",children:[Object(ce.jsx)($.a,{path:"/",exact:!0,component:ae}),Object(ce.jsx)($.a,{path:"/auth/login",component:me}),Object(ce.jsx)($.a,{path:"/auth/register",component:be}),Object(ce.jsx)($.a,{path:"/about",component:je}),Object(ce.jsx)($.a,{path:"/contact",component:he}),Object(ce.jsx)($.a,{path:"/skill",component:ye}),Object(ce.jsx)($.a,{path:"/portfolio",component:Oe})]})]}):null]})})),Ce=c(50),Le=c(150),Ee=c(151),Ae=c.n(Ee),Ke=c(152),Pe={isLoading:!0,isStart:!1,failData:null,isLogin:!1,isAdmin:!1,remember:!1,userId:"",email:"",firstName:"",lastName:"",fullName:"",nickName:"",useName:"",userImage:"/basic/default/user.jpg",userToken:"",userData:{},created:"",updated:"",level:0,grade:0,mobile:"",iat:0,exp:0,age:"",address:{},birthday:""},Te=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Pe,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case r:return Object(ne.a)(Object(ne.a)({},e),{},{isLoading:t.payload});case d:return Object(ne.a)(Object(ne.a)({},e),{},{isStart:!0,isLogin:!0,isAdmin:t.payload.isAdmin,remember:t.payload.remember,userId:t.payload.userId,userToken:t.payload.userToken,userData:t.payload.userData,created:t.payload.created,updated:t.payload.updatedAt,email:t.payload.email,firstName:t.payload.firstName,lastName:t.payload.lastName,fullName:t.payload.fullName,nickName:t.payload.nickName,useName:t.payload.useName,userImage:t.payload.userImage,type:t.payload.type,level:t.payload.level,grade:t.payload.grade,mobile:t.payload.mobile,iat:t.payload.iat,exp:t.payload.exp,age:t.payload.age,address:t.payload.address,birthday:t.payload.birthday});case _:return localStorage.removeItem(Q.d),localStorage.removeItem(Q.c),Pe;case u:return Object(ne.a)(Object(ne.a)({},e),{},{failData:t.payload});default:return e}},Fe={isStart:!1,isLoading:!1,failData:null,dc_title:"",dc_logoImage:"",dc_useLogoImage:!1,dc_mail:"",dc_mailName:"",dc_usePoint:!1,dc_loginPoint:0,dc_deleteContentDate:0,dc_userProfileChangeDate:0,dc_joinUserLogDelete:0,dc_hotSearchTextDelete:0,dc_captcha:"",dc_reCaptchaKey:"",dc_reCaptchaSecretKey:"",dc_possibleIp:"*",dc_impossibleIp:"",dc_analytics:"",dc_addMeta:"",dc_naverSyndicationKey:"",dc_textFilter:"",dc_reWriteSec:0,dc_searchLimit:0,dc_imageExtension:"",dc_videoExtention:"",dc_flashExtention:"",dc_fileExtention:"",dc_excelExtention:"",dc_addFont:"",dc_useHomepage:!1,dc_telephone:!1,dc_address:!1,dc_mobile:!1,dc_about:!1,dc_useReCommender:!1,dc_reCommenderAddPoint:3e3,dc_reCommenderRegisetAddPoint:3e3,dc_userImageWeight:5e4,dc_RegisterPoint:3e3,dc_terms:"",dc_privacy:"",dc_useCert:!1,dc_selectCert:"",dc_certKey:"",dc_certSecretKey:"",dc_useMail:!1,dc_auth_naver:{use:!1,publicKey:"",secretKey:""},dc_auth_google:{use:!1,publicKey:"",secretKey:""},dc_auth_kakao:{use:!1,publicKey:"",secretKey:""},dc_auth_fasebook:{use:!1,publicKey:"",secretKey:""},dc_auth_twiter:{use:!1,publicKey:"",secretKey:""},dc_auth_fayco:{use:!1,publicKey:"",secretKey:""},dc_auth_pass:{use:!1,publicKey:"",secretKey:""},dc_social_fallow_1:{sf_use:!0,sf_label:"",sf_img:"",sf_path:""},dc_social_fallow_2:{sf_use:!0,sf_label:"",sf_img:"",sf_path:""},dc_social_fallow_3:{sf_use:!0,sf_label:"",sf_img:"",sf_path:""},dc_social_fallow_4:{sf_use:!0,sf_label:"",sf_img:"",sf_path:""},dc_social_fallow_5:{sf_use:!0,sf_label:"",sf_img:"",sf_path:""},dc_social_fallow_6:{sf_use:!0,sf_label:"",sf_img:"",sf_path:""},dc_social_fallow_7:{sf_use:!0,sf_label:"",sf_img:"",sf_path:""},dc_social_fallow_8:{sf_use:!0,sf_label:"",sf_img:"",sf_path:""},dc_social_fallow_9:{sf_use:!0,sf_label:"",sf_img:"",sf_path:""},dc_social_fallow_10:{sf_use:!0,sf_label:"",sf_img:"",sf_path:""},dc_useSms:!1,dc_smsType:"sms",dc_smsTokenKey:"",sc_company_owner:"",sc_company_name:"",sc_company_saupja_no:"",sc_company_tel:"",sc_company_fax:"",sc_tongsin_no:"",sc_company_zip:"",sc_company_addr:"",sc_company_privacy_admin_name:"",sc_company_privacy_admin_email:"",sc_delivery_company:"",sc_delivery_start_time:17,sc_delivery_price:"",sc_delivery_infomation:"",sc_delivery_change_infomation:"",pc_mp_carousel_time_out:7e3,pc_mp_carousel_skin:"",pc_mp_product_section_1:{use:!0,order:1,label:"\uc778\uae30",xs:2,sm:2,md:3,lg:4,xl:4},pc_mp_product_section_2:{use:!0,order:2,label:"\ucd94\ucc9c",xs:2,sm:2,md:3,lg:4,xl:4},pc_mp_product_section_3:{use:!0,order:4,label:"\ud788\ud2b8",xs:2,sm:2,md:3,lg:4,xl:4},pc_mp_product_section_4:{use:!0,order:5,label:"\ud560\uc778",xs:2,sm:2,md:3,lg:4,xl:4},pc_mp_product_section_5:{use:!0,order:3,label:"\ucd5c\uc2e0",xs:2,sm:2,md:3,lg:4,xl:4},pc_mp_product_section_6:{use:!1,order:1,label:"",xs:2,sm:2,md:3,lg:4,xl:4},pc_mp_product_section_7:{use:!1,order:1,label:"",xs:2,sm:2,md:3,lg:4,xl:4},pc_mp_product_section_8:{use:!1,order:1,label:"",xs:2,sm:2,md:3,lg:4,xl:4},pc_mp_product_section_9:{use:!1,order:1,label:"",xs:2,sm:2,md:3,lg:4,xl:4},pc_mp_product_section_10:{use:!1,order:1,label:"",xs:2,sm:2,md:3,lg:4,xl:4},pc_lp_use_infinite_scroll:!0,pc_dp_imgviewr:{imgviewr_skin:""},pc_dp_costviewr:{title_skin:"",content_skin:"",option_skin:""},pc_dp_useSetProduct:!0,pc_etc_go_to_top:{use:!0,color:"",bg:"",border:""},pc_etc_go_to_next_section:{use:!0,color:"",bg:"",border:""},pc_etc_use_kakao_chat:!0,pc_etc_use_naver_chat:!0,pc_etc_use_server_chat:!0,pc_etc_left_side:["auth","cart","qna","myoder","delivery_check","comunity","cscenter","social_fallow","todat_click","payment"],pc_etc_right_side:["auth","menu"],dc_navgation:[]},Me=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Fe,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case y:return Object(ne.a)(Object(ne.a)({},e),{},{isLoading:t.payload});case g:return Object(ne.a)(Object(ne.a)({},e),{},{isStart:!0,dc_navgation:t.payload.dc_navgation,dc_title:t.payload.dc_title,dc_logoImage:t.payload.dc_logoImage,dc_useLogoImage:t.payload.dc_useLogoImage,dc_mail:t.payload.dc_mail,dc_mailName:t.payload.dc_mailName,dc_usePoint:t.payload.dc_usePoint,dc_loginPoint:t.payload.dc_loginPoint,dc_deleteContentDate:t.payload.dc_deleteContentDate,dc_userProfileChangeDate:t.payload.dc_userProfileChangeDat,dc_joinUserLogDelete:t.payload.dc_joinUserLogDelete,dc_hotSearchTextDelete:t.payload.dc_hotSearchTextDelete,dc_captcha:t.payload.dc_captcha,dc_reCaptchaKey:t.payload.dc_reCaptchaKey,dc_reCaptchaSecretKey:t.payload.dc_reCaptchaSecretKey,dc_possibleIp:t.payload.dc_possibleIp,dc_impossibleIp:t.payload.dc_impossibleIp,dc_analytics:t.payload.dc_analytics,dc_addMeta:t.payload.dc_addMeta,dc_naverSyndicationKey:t.payload.dc_naverSyndicationKey,dc_textFilter:t.payload.dc_textFilter,dc_reWriteSec:t.payload.dc_reWriteSec,dc_searchLimit:t.payload.dc_searchLimit,dc_imageExtension:t.payload.dc_imageExtension,dc_videoExtention:t.payload.dc_videoExtention,dc_flashExtention:t.payload.dc_flashExtention,dc_fileExtention:t.payload.dc_fileExtention,dc_excelExtention:t.payload.dc_excelExtention,dc_addFont:t.payload.dc_addFont,dc_useHomepage:t.payload.dc_useHomepage,dc_telephone:t.payload.dc_telephone,dc_address:t.payload.dc_address,dc_mobile:t.payload.dc_mobile,dc_about:t.payload.dc_about,dc_useReCommender:t.payload.dc_useReCommender,dc_reCommenderAddPoint:t.payload.dc_reCommenderAddPoint,dc_reCommenderRegisetAddPoint:t.payload.dc_reCommenderRegisetAddPoint,dc_userImageWeight:t.payload.dc_userImageWeight,dc_RegisterPoint:t.payload.dc_RegisterPoint,dc_terms:t.payload.dc_terms,dc_privacy:t.payload.dc_privacy,dc_useCert:t.payload.dc_useCert,dc_selectCert:t.payload.dc_selectCert,dc_certKey:t.payload.dc_certKey,dc_certSecretKey:t.payload.dc_certSecretKey,dc_useMail:t.payload.dc_useMail,dc_auth_naver:t.payload.dc_auth_naver,dc_auth_google:t.payload.dc_auth_google,dc_auth_kakao:t.payload.dc_auth_kakao,dc_auth_fasebook:t.payload.dc_auth_fasebook,dc_auth_twiter:t.payload.dc_auth_twiter,dc_auth_fayco:t.payload.dc_auth_fayco,dc_auth_pass:t.payload.dc_auth_pass,dc_social_fallow_1:t.payload.dc_social_fallow_1,dc_social_fallow_2:t.payload.dc_social_fallow_2,dc_social_fallow_3:t.payload.dc_social_fallow_3,dc_social_fallow_4:t.payload.dc_social_fallow_4,dc_social_fallow_5:t.payload.dc_social_fallow_5,dc_social_fallow_6:t.payload.dc_social_fallow_6,dc_social_fallow_7:t.payload.dc_social_fallow_7,dc_social_fallow_8:t.payload.dc_social_fallow_8,dc_social_fallow_9:t.payload.dc_social_fallow_9,dc_social_fallow_10:t.payload.dc_social_fallow_10,dc_useSms:t.payload.dc_useSms,dc_smsType:t.payload.dc_smsTyp,dc_smsTokenKey:t.payload.dc_smsTokenKey,sc_company_owner:t.payload.sc_company_owner,sc_company_name:t.payload.sc_company_name,sc_company_saupja_no:t.payload.sc_company_saupja_no,sc_company_tel:t.payload.sc_company_tel,sc_company_fax:t.payload.sc_company_fax,sc_tongsin_no:t.payload.sc_tongsin_no,sc_company_zip:t.payload.sc_company_zip,sc_company_addr:t.payload.sc_company_addr,sc_company_privacy_admin_name:t.payload.sc_company_privacy_admin_name,sc_company_privacy_admin_email:t.payload.sc_company_privacy_admin_email,sc_delivery_company:t.payload.sc_delivery_company,sc_delivery_start_time:t.payload.sc_delivery_start_time,sc_delivery_price:t.payload.sc_delivery_price,sc_delivery_infomation:t.payload.sc_delivery_infomation,sc_delivery_change_infomation:t.payload.sc_delivery_change_infomation,pc_mp_carousel_time_out:t.payload.pc_mp_carousel_time_out,pc_mp_carousel_skin:t.payload.pc_mp_carousel_skin,pc_mp_product_section_1:t.payload.pc_mp_product_section_1,pc_mp_product_section_2:t.payload.pc_mp_product_section_2,pc_mp_product_section_3:t.payload.pc_mp_product_section_3,pc_mp_product_section_4:t.payload.pc_mp_product_section_4,pc_mp_product_section_5:t.payload.pc_mp_product_section_5,pc_mp_product_section_6:t.payload.pc_mp_product_section_6,pc_mp_product_section_7:t.payload.pc_mp_product_section_7,pc_mp_product_section_8:t.payload.pc_mp_product_section_,pc_mp_product_section_9:t.payload.pc_mp_product_section_9,pc_mp_product_section_10:t.payload.pc_mp_product_section_10,pc_lp_use_infinite_scroll:t.payload.pc_lp_use_infinite_scroll,pc_dp_imgviewr:t.payload.pc_dp_imgview,pc_dp_costviewr:t.payload.pc_dp_costviewr,pc_dp_useSetProduct:t.payload.pc_dp_useSetProduct,pc_etc_go_to_top:t.payload.pc_etc_go_to_to,pc_etc_go_to_next_section:t.payload.pc_etc_go_to_next_sectio,pc_etc_use_kakao_chat:t.payload.pc_etc_use_kakao_chat,pc_etc_use_naver_chat:t.payload.pc_etc_use_naver_cha,pc_etc_use_server_chat:t.payload.pc_etc_use_server_chat,pc_etc_left_side:t.payload.pc_etc_left_side,pc_etc_right_side:t.payload.pc_etc_right_side});case O:return Object(ne.a)(Object(ne.a)({},e),{},{failData:t.payload});default:return e}},Re={isStart:!1,isLoading:!1,failData:null,board_config:[]},Ue=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Re,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case D:return Object(ne.a)(Object(ne.a)({},e),{},{isLoading:t.payload});case N:return Object(ne.a)(Object(ne.a)({},e),{},{isStart:!0,board_config:t.payload});case S:return Object(ne.a)(Object(ne.a)({},e),{},{failData:t.payload});default:return e}},Ge={isStart:!1,isLoading:!1,failData:null,group_config:[]},Be=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Ge,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case A:return Object(ne.a)(Object(ne.a)({},e),{},{isLoading:t.payload});case K:return Object(ne.a)(Object(ne.a)({},e),{},{isStart:!0,group_config:t.payload});case P:return Object(ne.a)(Object(ne.a)({},e),{},{failData:t.payload});default:return e}},He=c(35),Ye=c.n(He),We={isLoading:!1,failData:null,isSocket:!1,socket:null},qe=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:We,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case U:return Object(ne.a)(Object(ne.a)({},e),{},{isLoading:t.payload});case G:return Object(ne.a)(Object(ne.a)({},e),{},{isSocket:!0,socket:t.payload,startDate:Ye()().format("YYYY-MM-DD h:mm:ss")});case B:return We;case H:return Object(ne.a)(Object(ne.a)({},e),{},{failData:t.payload});default:return e}},ze={isLoading:!1,failData:null,message:[]},Je=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:ze,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case J:return Object(ne.a)(Object(ne.a)({},e),{},{isLoading:t.payload});case V:return Object(ne.a)(Object(ne.a)({},e),{},{message:t.payload});case X:return Object(ne.a)(Object(ne.a)({},e),{},{failData:t.payload});default:return e}},Ve=Object(Ce.combineReducers)({authData:Te,configData:Me,boardData:Ue,groupData:Be,socketData:qe,messageData:Je}),Xe=Object(Ce.createStore)(Ve,Object(Le.composeWithDevTools)(Object(Ce.applyMiddleware)(Ae.a,Ke.a)));l.a.render(Object(ce.jsx)(Ne.a,{children:Object(ce.jsx)(i.a,{store:Xe,children:Object(ce.jsx)(Ie,{})})}),document.getElementById("root"))},7:function(e,t,c){"use strict";c.d(t,"b",(function(){return n})),c.d(t,"a",(function(){return i})),c.d(t,"d",(function(){return h})),c.d(t,"c",(function(){return f}));var a="https://lilith.co.kr",o="".concat(a,"/api"),n=a,l="".concat(o,"/auth"),s=("".concat(l,"/login"),"".concat(l,"/register"),"".concat(l,"/email_check"),"".concat(l,"/profile"),"".concat(l,"/social_join"),"".concat(l,"/profile-update"),"".concat(l,"/session-check"),"".concat(o,"/check")),i="".concat(s,"/config"),r="".concat(o,"/content"),d=("".concat(r,"/group-list"),"".concat(r,"/group-content-list"),"".concat(r,"/board-list"),"".concat(r,"/list"),"".concat(r,"/write"),"".concat(r,"/update"),"".concat(r,"/delete"),"".concat(r,"/read"),"".concat(o,"/file")),_="".concat(d,"/upload"),u=("".concat(_,"/image"),"".concat(_,"/thumnail"),"".concat(d,"/list/myimagelist"),"".concat(d,"/xlsx"),"".concat(o,"/shop")),p=("".concat(u,"/category/root-list"),"".concat(u,"/category/children-list"),"".concat(u,"/category/getcount"),"".concat(u,"/list/dateup"),"".concat(u,"/list/category"),"".concat(u,"/upload/bulk"),"".concat(o,"/admin")),m="".concat(p,"/member"),b="".concat(p,"/config"),j="".concat(p,"/content"),h=("".concat(m,"/list"),"".concat(m,"/profile"),"".concat(m,"/delete"),"".concat(m,"/update"),"".concat(b,"/data"),"".concat(b,"/update"),"".concat(b,"/navgation"),"".concat(b,"/navgation-update"),"".concat(j,"/group-list"),"".concat(j,"/group-create"),"".concat(j,"/group-delete"),"".concat(j,"/group-update"),"".concat(j,"/board-list"),"".concat(j,"/board-create"),"".concat(j,"/board-delete"),"".concat(j,"/board-update"),"s_u_t"),f="s_r_t"},70:function(e,t,c){"use strict";c.d(t,"a",(function(){return i}));var a=c(7),o=c(1),n=c(140),l=c(35),s=c.n(l),i=function(e,t){var c=localStorage.getItem(a.d),l=localStorage.getItem(a.c);Object(o.useEffect)((function(){if(null!==c&&null!==l){var o=Object(n.a)(c);o.userToken=c;var i=s()(),r=s()(1e3*o.exp).format("YYYY-MM-DD HH:mm:ss");s.a.duration(i.diff(r)).asDays()<0?null!==t.socket&&t.socket.emit("token-login",{token:c},(function(t){e(o)})):(localStorage.removeItem(a.d),localStorage.removeItem(a.c))}}),[l,e,t,c])}},71:function(e,t,c){"use strict";c.d(t,"a",(function(){return l}));var a=c(1),o=c(72),n=c(7),l=(c(35),function(e,t,c,l,s){Object(a.useEffect)((function(){Object(o.a)(e,n.a,(function(e){t(e.data.config),c(e.data.boardConfig),l(e.data.groupConfig),s(!0)}))}),[e,c,t,l,s])})},72:function(e,t,c){"use strict";c.d(t,"a",(function(){return r}));var a=c(102),o=c.n(a),n=c(144),l=c(145),s=c.n(l),i=function(){var e=Object(n.a)(o.a.mark((function e(t,c,a){var n;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n={headers:{requestType:t.requestType,"X-CSRF-TOKEN":"CSFR-Token",Authorization:t.token},method:"post",url:t.url||"",data:t.data||""},e.next=3,s()(n).then((function(e){return!0===e.data.status&&c(!1),a(e),e})).catch((function(e){return a(e),e}));case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}}),e)})));return function(t,c,a){return e.apply(this,arguments)}}(),r=function(e,t,c,a,o){i({token:o,url:t,data:a},e,(function(e){200===e.status?c({data:e.data}):c({error:!0})}))}}},[[258,1,2]]]);
//# sourceMappingURL=main.c3802249.chunk.js.map