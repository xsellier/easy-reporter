(function(e){function t(t){for(var i,l,a=t[0],o=t[1],u=t[2],d=0,h=[];d<a.length;d++)l=a[d],Object.prototype.hasOwnProperty.call(r,l)&&r[l]&&h.push(r[l][0]),r[l]=0;for(i in o)Object.prototype.hasOwnProperty.call(o,i)&&(e[i]=o[i]);c&&c(t);while(h.length)h.shift()();return n.push.apply(n,u||[]),s()}function s(){for(var e,t=0;t<n.length;t++){for(var s=n[t],i=!0,a=1;a<s.length;a++){var o=s[a];0!==r[o]&&(i=!1)}i&&(n.splice(t--,1),e=l(l.s=s[0]))}return e}var i={},r={index:0},n=[];function l(t){if(i[t])return i[t].exports;var s=i[t]={i:t,l:!1,exports:{}};return e[t].call(s.exports,s,s.exports,l),s.l=!0,s.exports}l.m=e,l.c=i,l.d=function(e,t,s){l.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:s})},l.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},l.t=function(e,t){if(1&t&&(e=l(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var s=Object.create(null);if(l.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)l.d(s,i,function(t){return e[t]}.bind(null,i));return s},l.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return l.d(t,"a",t),t},l.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},l.p="/";var a=window["webpackJsonp"]=window["webpackJsonp"]||[],o=a.push.bind(a);a.push=t,a=a.slice();for(var u=0;u<a.length;u++)t(a[u]);var c=o;n.push([0,"chunk-vendors"]),s()})({0:function(e,t,s){e.exports=s("b635")},"252c":function(e,t,s){"use strict";var i=s("8dad"),r=s.n(i);r.a},"2a0f":function(e,t,s){},"3b23":function(e,t,s){"use strict";var i=s("a25a"),r=s.n(i);r.a},"3b3c":function(e,t,s){"use strict";var i=s("9814"),r=s.n(i);r.a},"5e85":function(e,t,s){},"5ee0":function(e,t,s){"use strict";var i=s("9c56"),r=s.n(i);r.a},"8dad":function(e,t,s){},9814:function(e,t,s){},"9c3c":function(e,t,s){"use strict";var i=s("5e85"),r=s.n(i);r.a},"9c56":function(e,t,s){},a25a:function(e,t,s){},b635:function(e,t,s){"use strict";s.r(t);s("e792");var i=s("bc3a"),r=s.n(i),n=s("a026"),l=s("ce5b"),a=s.n(l),o=s("1321"),u=s.n(o),c=s("349e"),d=s.n(c),h=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("v-app",[e.connectionInitialized?e._e():s("CreateAdminForm",{ref:"createAdminForm",on:{createAdmin:e.createAdmin}}),!e.token&&e.connectionInitialized?s("LoginForm",{ref:"loginForm",on:{login:e.login}}):e._e(),e.token&&e.connectionInitialized?[s("v-tabs",{attrs:{color:"indigo",dark:"",absolute:"","clipped-left":"",centered:"","fixed-tabs":"","slider-color":"white",app:""},model:{value:e.active,callback:function(t){e.active=t},expression:"active"}},[s("v-tab",{attrs:{ripple:""}},[e._v("Charts")]),s("v-tab-item",[s("BugCharts",{ref:"bugCharts",on:{error:e.showError}})],1),s("v-tab",{attrs:{ripple:""}},[e._v("Bug reports")]),s("v-tab-item",[s("BugReports",{ref:"bugReports",on:{list:e.list,updateFilters:e.listReports,error:e.showError}})],1),s("v-select",{staticClass:"v-tabs__div",attrs:{xs12:"",items:e.games,label:"Games"},on:{change:function(t){return e.applicationChanged()}},model:{value:e.selectedGame,callback:function(t){e.selectedGame=t},expression:"selectedGame"}})],1)]:e._e(),s("ErrorSnackbar",{ref:"errorSnackbar"})],2)},v=[],p=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("v-snackbar",{model:{value:e.showSnackbar,callback:function(t){e.showSnackbar=t},expression:"showSnackbar"}},[e._v("\n  "+e._s(e.message)+"\n  "),s("v-btn",{attrs:{color:"pink",flat:""},on:{click:function(t){e.showSnackbar=!1}}},[e._v("\n    Close\n  ")])],1)},f=[],m={name:"ErrorSnackbar",data:()=>({showSnackbar:!1,position:"center",duration:1e4,message:""}),methods:{show:function(e){this.message=e,this.showSnackbar=!0}}},g=m,b=(s("3b23"),s("2877")),k=Object(b["a"])(g,p,f,!1,null,"df0e703a",null),_=k.exports,x=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"page-container"},[s("div",{attrs:{id:"chart"}},[s("VueApexCharts",{attrs:{type:"area",height:"400",options:e.chartOptions,series:e.series}})],1)])},w=[],$={name:"BugChart",components:{VueApexCharts:u.a},data(){return{summary:[],chartOptions:{chart:{height:320,type:"line",shadow:{enabled:!0,color:"#000",top:18,left:7,blur:10,opacity:1},animations:{enabled:!0,easing:"easeinout",speed:800,animateGradually:{enabled:!0,delay:150},dynamicAnimation:{enabled:!0,speed:350}}},markers:{size:0},stroke:{curve:"straight",lineCap:"round",width:1},yaxis:{min:0,title:{text:"Reports amount"}}}}},computed:{series:function(){var e=new Date,t=[];for(let s=0;s<12;++s)t.push(`${e.getFullYear()}-${e.getMonth()+1}`),e.setMonth(e.getMonth()-1);return t.reverse(),[{name:"Legit",data:t.reduce((e,t)=>{return e.push({x:t,y:this.summary.reduce((e,s)=>{return parseInt(s.Month)!=parseInt(t.split("-")[1])?e:s.numberOfReports},0)}),e},[])}]}},methods:{refreshSummary:function(e){this.summary=e}}},y=$,C=(s("9c3c"),Object(b["a"])(y,x,w,!1,null,"658510dc",null)),S=C.exports,A=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"page-container"},[s("v-navigation-drawer",{attrs:{fixed:"",app:""}},[s("v-list",{attrs:{dense:"",subheader:""}},[s("v-layout",{attrs:{wrap:"","align-center":""}},[s("v-list-tile")],1),s("v-layout",{attrs:{wrap:"","align-center":""}},[s("v-flex",[s("v-list-tile",[s("v-select",{attrs:{items:e.versionKeys,label:"Version"},model:{value:e.versionSelected,callback:function(t){e.versionSelected=t},expression:"versionSelected"}})],1)],1)],1),s("v-layout",[s("v-flex",{attrs:{xs6:""}},[s("v-list-tile",[s("v-list-tile-action",[s("v-checkbox",{on:{change:function(t){return e.emitUpdateSignal()}},model:{value:e.debug,callback:function(t){e.debug=t},expression:"debug"}})],1),s("v-list-tile-content",[s("v-list-tile-title",[e._v("Debug")])],1)],1)],1),s("v-flex",{attrs:{xs6:""}},[s("v-list-tile",[s("v-list-tile-action",[s("v-checkbox",{on:{change:function(t){return e.emitUpdateSignal()}},model:{value:e.deleted,callback:function(t){e.deleted=t},expression:"deleted"}})],1),s("v-list-tile-content",[s("v-list-tile-title",[e._v("Deleted")])],1)],1)],1)],1),s("v-layout",[s("v-flex",{attrs:{xs6:""}},[s("v-list-tile",[s("v-list-tile-action",[s("v-checkbox",{on:{change:function(t){return e.emitUpdateSignal()}},model:{value:e.uploaded,callback:function(t){e.uploaded=t},expression:"uploaded"}})],1),s("v-list-tile-content",[s("v-list-tile-title",[e._v("Uploaded")])],1)],1)],1),s("v-flex",{attrs:{xs6:""}},[s("v-list-tile",[s("v-list-tile-action",[s("v-checkbox",{model:{value:e.cracked,callback:function(t){e.cracked=t},expression:"cracked"}})],1),s("v-list-tile-content",[s("v-list-tile-title",[e._v("Cracked")])],1)],1)],1)],1),s("v-layout",[s("v-flex",{attrs:{xs6:""}},[s("v-list-tile",[s("v-list-tile-action",[s("v-checkbox",{on:{change:function(t){return e.emitUpdateSignal()}},model:{value:e.fixed,callback:function(t){e.fixed=t},expression:"fixed"}})],1),s("v-list-tile-content",[s("v-list-tile-title",[e._v("Fixed")])],1)],1)],1),s("v-flex",{attrs:{xs6:""}},[s("v-list-tile",[s("v-list-tile-action",[s("v-checkbox",{on:{change:function(t){return e.selectAll()}},model:{value:e.selectAllValue,callback:function(t){e.selectAllValue=t},expression:"selectAllValue"}})],1),s("v-list-tile-content",[s("v-list-tile-title",[e._v("Select all")])],1)],1)],1)],1),s("v-layout",[s("v-flex",{attrs:{xs6:""}},[s("v-list-tile",[s("v-list-tile-action",[s("v-btn",{attrs:{color:"primary",dark:"",small:""},on:{click:e.list}},[e._v("Refresh")])],1)],1)],1),e.reportsBulkDelete.length>0?s("v-flex",{attrs:{xs6:""}},[s("v-list-tile",[s("v-list-tile-action",[s("v-btn",{attrs:{color:"warning",dark:"",small:""},on:{click:function(t){return e.bulkDelete()}}},[e._v("Delete")])],1)],1)],1):e._e()],1),s("v-layout",{attrs:{wrap:"","align-center":""}},[s("v-list-tile",{attrs:{"d-flex":""}},[s("v-pagination",{attrs:{length:e.totalPages},on:{input:function(t){return e.changePage()},next:function(t){return e.emitUpdateSignal()},previous:function(t){return e.emitUpdateSignal()}},model:{value:e.currentPage,callback:function(t){e.currentPage=t},expression:"currentPage"}})],1)],1),s("v-layout",{attrs:{wrap:"","align-center":""}},[s("v-list-tile",{attrs:{"d-flex":""}},[s("v-list-tile-content",[s("v-list-tile-title",[e._v("Items: "+e._s(e.filteredReports.length)+" / "+e._s(e.totalItems))])],1)],1)],1),s("v-divider",{attrs:{inset:""}}),s("v-subheader",{attrs:{inset:""}},[e._v("Reports")]),s("v-list",{attrs:{"two-line":""}},[e._l(e.filteredReports,(function(t){return[s("v-list-tile",{key:t.filename,attrs:{avatar:"",ripple:""}},[s("v-list-tile-content",[s("v-list-tile-title",[e._v("\n                "+e._s(t.title)+"\n              ")]),s("v-list-tile-sub-title",{staticClass:"text--primary"},[e._v("\n                "+e._s(t.version)+"\n              ")]),s("v-list-tile-sub-title",[e._v("\n                "+e._s(t.created_at)+"\n              ")])],1),s("v-list-tile-action",[null==t.deleted_at?s("v-checkbox",{attrs:{value:t.filename},model:{value:e.reportsBulkDelete,callback:function(t){e.reportsBulkDelete=t},expression:"reportsBulkDelete"}}):e._e(),null==t.deleted_at?s("v-btn",{attrs:{small:""},on:{click:function(s){return e.info(t)}}},[e._v("Open")]):e._e()],1)],1),s("v-divider")]}))],2)],1)],1),s("v-content",[s("v-container",{attrs:{fluid:"","fill-height":""}},[s("v-layout",{attrs:{"justify-center":"","align-center":"",row:"",wrap:""}},[e.sending?[s("v-progress-linear",{attrs:{indeterminate:!0}})]:e._e(),null!=e.report?[s("v-layout",{attrs:{row:"",wrap:""}},[null!=e.report.data?s("v-flex",{staticClass:"headline",attrs:{xs12:"",tag:"h1"}},[e._v(e._s(e.report.data.error))]):e._e(),null==e.report.data?s("v-flex",{staticClass:"headline",attrs:{xs12:"",tag:"h1"}},[e._v("Custom bug report")]):e._e(),s("v-spacer"),s("v-flex",{attrs:{xs12:""}},[s("v-btn",{attrs:{color:"info",disabled:e.sending},on:{click:function(t){return e.downloadReport()}}},[e._v("Download")]),s("v-btn",{attrs:{color:"warning",disabled:e.sending},on:{click:function(t){return e.deleteReport()}}},[e._v("Delete")]),e.report.cracked?e._e():s("v-btn",{attrs:{color:"error",disabled:e.sending},on:{click:function(t){return e.flagVersionAsCracked()}}},[e._v("Flag version as cracked")]),e.report.cracked?s("v-btn",{attrs:{color:"info",disabled:e.sending},on:{click:function(t){return e.unflagVersionAsCracked()}}},[e._v("Unflag version as cracked")]):e._e(),e.report.fixed?e._e():s("v-btn",{attrs:{color:"info",disabled:e.sending},on:{click:function(t){return e.flagBugAsFixed()}}},[e._v("Flag bug as fixed")]),e.report.fixed?s("v-btn",{attrs:{color:"warning",disabled:e.sending},on:{click:function(t){return e.unflagBugAsFixed()}}},[e._v("Unflag bug as fixed")]):e._e()],1),s("v-spacer"),null!=e.report.data?s("v-flex",{attrs:{xs3:""}},[s("v-card",[s("v-toolbar",{attrs:{dense:""}},[s("v-toolbar-title",[e._v("Callstack")])],1),s("v-list",{attrs:{dense:"",subheader:""}},[s("v-spacer"),s("v-list-tile",[s("v-list-tile-content",[s("v-list-tile-title",[e._v(e._s(e.report.data.source_file)+" ("+e._s(e.report.data.source_line)+")")]),s("v-list-tile-sub-title",[e._v(e._s(e.report.data.source_func))])],1),e._l(e.formatCallstack(e.report.data.callstack),(function(t){return[s("v-list-tile-content",{key:t.name},[s("v-list-tile-title",[e._v(e._s(t.name))]),s("v-list-tile-sub-title",[e._v(e._s(t.line))])],1)]}))],2)],1)],1)],1):e._e(),e._v("\n                \n            "),s("v-layout",{attrs:{column:""}},[e.report.dump?s("v-flex",{attrs:{xs7:""}},[s("v-textarea",{staticClass:"logdump",attrs:{label:"Dump",readonly:"","auto-grow":"",value:e.report.dump}})],1):e._e(),e.report.logdump?s("v-flex",{attrs:{xs7:""}},[s("v-textarea",{staticClass:"logdump",attrs:{label:"Logs",readonly:"","auto-grow":"",value:e.report.logdump}})],1):e._e()],1),e._v("\n                \n            "),s("v-flex",{attrs:{xs2:""}},[s("v-card",[s("v-list",{attrs:{dense:"",subheader:""}},[s("v-list-tile",[s("v-list-tile-content",[s("v-list-tile-title",[e._v(e._s(e.report.system.name))]),s("v-list-tile-sub-title",[e._v("OS")])],1)],1),s("v-divider"),s("v-list-tile",[s("v-list-tile-content",[s("v-list-tile-title",[e._v(e._s(e.report.system.cpu.thread))]),s("v-list-tile-sub-title",[e._v("Can thread")])],1)],1),s("v-divider"),s("v-list-tile",[s("v-list-tile-content",[s("v-list-tile-title",[e._v(e._s(e.report.system.cpu.count))]),s("v-list-tile-sub-title",[e._v("CPU count")])],1)],1),s("v-divider"),s("v-list-tile",[s("v-list-tile-content",[s("v-list-tile-title",[e._v(e._s(e.report.system.cpu.model))]),s("v-list-tile-sub-title",[e._v("Model")])],1)],1),s("v-divider"),s("v-list-tile",[s("v-list-tile-content",[s("v-list-tile-title",[e._v(e._s(e.report.system.locale))]),s("v-list-tile-sub-title",[e._v("Locale")])],1)],1),s("v-divider"),s("v-list-tile",[s("v-list-tile-content",[s("v-list-tile-title",[e._v(e._s(e.report.system.screen.vsync))]),s("v-list-tile-sub-title",[e._v("VSync")])],1)],1),s("v-divider"),s("v-list-tile",[s("v-list-tile-content",[s("v-list-tile-title",[e._v(e._s(e.report.system.screen.resolution))]),s("v-list-tile-sub-title",[e._v("Resolution")])],1)],1),s("v-divider"),s("v-list-tile",[s("v-list-tile-content",[s("v-list-tile-title",[e._v(e._s(e.report.system.screen.fullscreen))]),s("v-list-tile-sub-title",[e._v("Fullscreen")])],1)],1),s("v-divider"),s("v-list-tile",[s("v-list-tile-content",[s("v-list-tile-title",[e._v(e._s(e.report.system.screen.size))]),s("v-list-tile-sub-title",[e._v("Window size")])],1)],1),s("v-divider"),s("v-list-tile",[s("v-list-tile-content",[s("v-list-tile-title",[e._v(e._s(e.report.system.executable))]),s("v-list-tile-sub-title",[e._v("Executable")])],1)],1)],1)],1)],1)],1)]:e._e()],2)],1)],1),s("v-footer",{attrs:{color:"indigo",app:"",inset:""}},[s("span",{staticClass:"white--text"},[e._v("© Easy reporter 2019")])])],1)},R=[],B={name:"BugReports",components:{},data(){return{versions:{},versionKeys:[],versionSelected:"None",reports:[],version:[],bugs:{},reportsBulkDelete:[],cache:{},report:null,username:"",password:"",filename:null,sending:!1,token:null,debug:!1,deleted:!1,uploaded:!0,fixed:!1,cracked:!1,selectAllValue:!1,totalPages:1,currentPage:1,totalItems:0,application_name:""}},computed:{filteredReports:function(){let e=this;return this.reports.filter(t=>{var s=t.uploaded==e.uploaded;s&=null!=t.deleted_at==e.deleted,s&=t.debug==e.debug,"None"!=e.versionSelected&&(s&=t.version==e.versionSelected);var i=!1;return null!=e.versions[t.version]&&(i=e.versions[t.version]),s&=i==e.cracked,s})}},methods:{selectAll:function(){this.selectAllValue?this.reportsBulkDelete=this.filteredReports.map(e=>e.filename):this.reportsBulkDelete=[]},bulkDelete:function(){this.sending=!0,this.$http({method:"POST",url:"/report/bulk/delete",headers:{Authorization:`Bearer ${this.token}`},data:{reports:this.reportsBulkDelete}}).then(()=>{return this.report=null,this.filename=null,this.sending=!1,this.reportsBulkDelete=[],this.list()}).catch(e=>{e.response&&e.response.status<500&&(this.token=null),this.sending=!1,this.$emit("error",this.token,`Cannot delete reports: ${e.message}`)})},formatCallstack:function(e){return e.reduce((e,t,s)=>{let i=parseInt(Math.floor(s/2),10);return s%2==0?e[i]={name:t}:e[i].line=t,e},[])},downloadReport:function(){var e="data:text/json;charset=utf-8,"+encodeURIComponent(JSON.stringify(this.report,null,2)),t=document.createElement("a");t.setAttribute("href",e),t.setAttribute("download",this.filename+".json"),document.body.appendChild(t),t.click(),t.remove()},deleteReport:function(){this.sending=!0,this.$http({method:"DELETE",url:`/report/${encodeURIComponent(this.filename)}`,headers:{Authorization:`Bearer ${this.token}`}}).then(()=>{return this.report=null,this.filename=null,this.sending=!1,this.list()}).catch(e=>{e.response&&e.response.status<500&&(this.token=null),this.sending=!1,this.$emit("error",this.token,`Cannot delete report: ${e.message}`)})},info:function(e){this.report=null,this.filename=null,null==e.deleted_at&&e.uploaded&&(this.sending=!0,this.$http({method:"get",url:`/report/${encodeURIComponent(e.filename)}`,headers:{Authorization:`Bearer ${this.token}`}}).then(t=>{let s=pako.ungzip(atob(t.data),{to:"string"});this.filename=e.filename,this.report=JSON.parse(s),this.report.version=e.version,this.report.title=e.title,this.report.cracked=this.versions[this.report.version]||!1,this.report.fixed=null!=this.bugs[e.version]&&null!=this.bugs[e.version][e.title]&&this.bugs[e.version][e.title],this.sending=!1}).catch(e=>{e.response&&e.response.status<500&&(this.token=null),this.sending=!1,this.$emit("error",this.token,`Cannot download report: ${e.message}`)}))},flagVersionAsCracked:function(){return this._setFlagVersionCracked(!0)},unflagVersionAsCracked:function(){return this._setFlagVersionCracked(!1)},_setFlagVersionCracked:function(e){return this.$http({method:"post",url:"/version/update",headers:{Authorization:`Bearer ${this.token}`},data:{application_name:this.application_name,name:this.report.version,cracked:e}}).then(()=>{this.versions[this.report.version]=e,this.report.cracked=e,this.sending=!1,this.$forceUpdate()}).catch(e=>{e.response&&e.response.status<500&&(this.token=null),this.sending=!1,this.$emit("error",this.token,`Cannot download report: ${e.message}`)})},flagBugAsFixed:function(){return this._setFlagBugFixed(!0)},unflagBugAsFixed:function(){return this._setFlagBugFixed(!1)},_setFlagBugFixed:function(e){return this.$http({method:"post",url:"/bug/update",headers:{Authorization:`Bearer ${this.token}`},data:{name:this.application_name,version:this.report.version,title:this.report.title,fixed:e}}).then(()=>{this.report.fixed=e,this.sending=!1,this.$forceUpdate()}).catch(e=>{e.response&&e.response.status<500&&(this.token=null),this.sending=!1,this.$emit("error",this.token,`Cannot download report: ${e.message}`)})},login:function(e){this.token=e},changePage:function(){this.emitUpdateSignal()},emitUpdateSignal:function(){this.sending=!0,this.$emit("updateFilters")},list:function(){this.sending=!0,this.$emit("list")},refreshReports:function(e,t,s){this.sending=!1,this.reports=e,this.totalPages=t,this.currentPage=Math.min(this.currentPage,t),this.totalItems=s},refreshVersions:function(e){this.sending=!1,this.versions=e,this.versionKeys=["None"].concat(Object.keys(e))},refreshBugs:function(e){this.sending=!1,this.bugs=e}}},F=B,P=(s("252c"),Object(b["a"])(F,A,R,!1,null,"7786c8c0",null)),O=P.exports,V=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("v-container",{attrs:{fluid:""}},[s("v-layout",{attrs:{row:"","justify-center":""}},[s("v-flex",{attrs:{xs12:"",sm8:"",md4:""}},[s("v-form",{ref:"form",staticClass:"formclass",on:{submit:function(t){return t.preventDefault(),e.login(t)}},model:{value:e.valid,callback:function(t){e.valid=t},expression:"valid"}},[s("v-card",{staticClass:"elevation-12"},[s("v-toolbar",{attrs:{dark:"",color:"primary"}},[s("v-toolbar-title",[e._v("Login form")]),s("v-spacer")],1),s("v-card-text",[s("v-text-field",{attrs:{rules:[e.rules.username],label:"Username",value:"",required:""},model:{value:e.username,callback:function(t){e.username=t},expression:"username"}}),s("v-text-field",{attrs:{"append-icon":e.passwordShow?"visibility":"visibility_off",rules:[e.rules.password],type:e.passwordShow?"text":"password",label:"Password",required:""},on:{"click:append":function(t){e.passwordShow=!e.passwordShow}},model:{value:e.password,callback:function(t){e.password=t},expression:"password"}})],1),s("v-card-actions",[s("v-spacer"),s("v-btn",{attrs:{disabled:e.sending||!e.valid,depressed:"",small:"",value:"",type:"submit",color:"primary"},on:{click:e.login}},[e._v("Login")])],1)],1)],1)],1)],1)],1)},j=[],D={name:"LoginForm",data:()=>({valid:!1,sending:!1,username:"",passwordShow:!1,password:"",rules:{username:e=>!!e||"Username is required",password:e=>!!e||"Password is required"}}),methods:{login:function(){this.sending=!0,this.$emit("login")},done:function(){this.sending=!1}}},U=D,z=(s("5ee0"),Object(b["a"])(U,V,j,!1,null,"7c671fe6",null)),E=z.exports,I=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("v-container",{attrs:{fluid:""}},[s("v-layout",{attrs:{row:"","justify-center":""}},[s("v-flex",{attrs:{xs12:"",sm8:"",md4:""}},[s("v-card",{staticClass:"elevation-12"},[s("v-toolbar",{attrs:{dark:"",color:"primary"}},[s("v-toolbar-title",[e._v("Create admin form")]),s("v-spacer")],1),s("v-card-text",[s("v-form",{ref:"form",model:{value:e.valid,callback:function(t){e.valid=t},expression:"valid"}},[s("v-text-field",{attrs:{rules:[e.rules.username],label:"Username",value:"",required:""},model:{value:e.username,callback:function(t){e.username=t},expression:"username"}}),s("v-text-field",{attrs:{"append-icon":e.passwordShow?"visibility":"visibility_off",rules:[e.rules.password],type:e.passwordShow?"text":"password",label:"Password",required:""},on:{"click:append":function(t){e.passwordShow=!e.passwordShow}},model:{value:e.password,callback:function(t){e.password=t},expression:"password"}})],1)],1),s("v-card-actions",[s("v-spacer"),s("v-btn",{attrs:{disabled:e.sending||!e.valid,depressed:"",small:"",value:"",color:"primary"},on:{click:e.createAdmin}},[e._v("Create admin")])],1)],1)],1)],1)],1)},G=[],M={name:"CreateAdminForm",data:()=>({valid:!1,sending:!1,username:"",passwordShow:!1,password:"",rules:{username:e=>!!e||"Username is required",password:e=>!!e||"Password is required"}}),methods:{createAdmin:function(){this.sending=!0,this.$emit("createAdmin")},done:function(){this.sending=!1}}},L=M,q=(s("3b3c"),Object(b["a"])(L,I,G,!1,null,"0b4fb0b8",null)),N=q.exports,J={name:"Application",components:{ErrorSnackbar:_,BugCharts:S,BugReports:O,LoginForm:E,VueApexCharts:u.a,CreateAdminForm:N},data(){return{active:"",versions:{},bugs:{},reports:[],reportsBulkDelete:[],cache:{},report:null,username:"",password:"",filename:null,sending:!1,connectionInitialized:!1,token:null,debug:!1,deleted:!1,uploaded:!0,selectedGame:null,games:[]}},computed:{filteredReports:function(){let e=this;return this.reports.filter(t=>{return t.uploaded==e.uploaded&&null!=t.deleted_at==e.deleted&&t.debug==e.debug})}},beforeMount:function(){return this.sending=!0,this.$http({method:"get",url:"/admin/exists",headers:{}}).then(e=>{this.connectionInitialized=e.data})},methods:{showError:function(e,t){this.token=e,this.$refs.errorSnackbar.show(t)},createAdmin:function(){this.sending=!0,this.$http.post("/admin/create",{username:this.$refs.createAdminForm.username,password:this.$refs.createAdminForm.password}).then(e=>{return this.token=e.data,this.sending=!1,this.connectionInitialized=!0,this.$refs.createAdminForm.done(),this.listReports()}).then(()=>this.listVersions()).then(()=>this.listBugs()).catch(e=>{this.sending=!1,this.$refs.createAdminForm.done(),this.token=null,this.$refs.errorSnackbar.show(`Login failed: ${e.message}`)})},login:function(){this.sending=!0,this.$http.post("/user/login",{username:this.$refs.loginForm.username,password:this.$refs.loginForm.password}).then(e=>{return this.$refs.loginForm&&this.$refs.loginForm.done(),this.token=e.data,this.sending=!1,this.listApplications()}).then(()=>{return this.refreshCharts()}).then(()=>{return this.listReports()}).then(()=>this.listVersions()).then(()=>this.listBugs()).catch(e=>{this.$refs.errorSnackbar.show(`Login failed: ${e.message}`),this.sending=!1,this.token=null,this.$refs.loginForm&&this.$refs.loginForm.done()})},applicationChanged:function(){return this.$refs.bugReports?(this.$refs.bugReports.application_name=this.selectedGame,this.refreshCharts().then(()=>this.list())):Promise.resolve()},refreshCharts:function(){return this.$http({method:"get",url:`/report/summary/${this.selectedGame}`,headers:{Authorization:`Bearer ${this.token}`}}).then(e=>{this.$refs.bugCharts.refreshSummary(e.data)})},list:function(){return this.listReports().then(()=>this.listVersions()).then(()=>this.listBugs())},listApplications:function(){return this.sending=!0,this.$http({method:"get",url:"/report/list-application/",headers:{Authorization:`Bearer ${this.token}`}}).then(e=>{this.sending=!1,this.games=e.data,null==this.selectedGame&&this.games.length>0&&(this.selectedGame=this.games[0])})},listReports:function(){return this.$refs.bugReports?(this.sending=!0,this.$http({method:"get",url:`/report/list/${this.selectedGame}/${this.$refs.bugReports.debug}/${this.$refs.bugReports.uploaded}/${this.$refs.bugReports.deleted}/${this.$refs.bugReports.fixed}/${this.$refs.bugReports.currentPage}`,headers:{Authorization:`Bearer ${this.token}`}}).then(e=>{this.reports=e.data.list,this.reports.sort((e,t)=>{return e.created_at<t.created_at}),this.sending=!1,this.$refs.bugReports.login(this.token),this.$refs.bugReports.refreshReports(this.reports,e.data.maxPage,e.data.total)}).catch(e=>{e.response&&e.response.status<500&&(this.token=null),this.sending=!1,this.$refs.errorSnackbar.show(`Cannot list reports: ${e.message}`)})):Promise.resolve()},listVersions:function(){return this.$refs.bugReports?(this.sending=!0,this.$http({method:"get",url:`/version/list/${this.selectedGame}`,headers:{Authorization:`Bearer ${this.token}`}}).then(e=>{this.versions=e.data.reduce((e,t)=>{return e[t.name]=t.cracked,e},{}),this.sending=!1,this.$refs.bugReports.refreshVersions(this.versions)}).catch(e=>{e.response&&e.response.status<500&&(this.token=null),this.sending=!1,this.$refs.errorSnackbar.show(`Cannot list versions: ${e.message}`)})):Promise.resolve()},listBugs:function(){return this.$refs.bugReports?(this.sending=!0,this.$http({method:"get",url:`/bug/list/${this.selectedGame}`,headers:{Authorization:`Bearer ${this.token}`}}).then(e=>{this.bugs=e.data.reduce((e,t)=>{return null==e[t.version]&&(e[t.version]={}),e[t.version][t.title]=t.fixed,e},{}),this.sending=!1,this.$refs.bugReports.refreshBugs(this.bugs)}).catch(e=>{e.response&&e.response.status<500&&(this.token=null),this.sending=!1,this.$refs.errorSnackbar.show(`Cannot list bugs: ${e.message}`)})):Promise.resolve()}}},T=J,K=(s("cbb4"),Object(b["a"])(T,h,v,!1,null,"cd62349e",null)),W=K.exports;n["default"].use(u.a),n["default"].use(a.a),n["default"].use(d.a),n["default"].prototype.$http=r.a,new n["default"]({el:"#app",render:e=>e(W)})},cbb4:function(e,t,s){"use strict";var i=s("2a0f"),r=s.n(i);r.a}});
//# sourceMappingURL=index.95d4c335.js.map