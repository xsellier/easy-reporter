(function(e){function t(t){for(var i,l,o=t[0],a=t[1],u=t[2],c=0,h=[];c<o.length;c++)l=o[c],Object.prototype.hasOwnProperty.call(r,l)&&r[l]&&h.push(r[l][0]),r[l]=0;for(i in a)Object.prototype.hasOwnProperty.call(a,i)&&(e[i]=a[i]);d&&d(t);while(h.length)h.shift()();return n.push.apply(n,u||[]),s()}function s(){for(var e,t=0;t<n.length;t++){for(var s=n[t],i=!0,o=1;o<s.length;o++){var a=s[o];0!==r[a]&&(i=!1)}i&&(n.splice(t--,1),e=l(l.s=s[0]))}return e}var i={},r={index:0},n=[];function l(t){if(i[t])return i[t].exports;var s=i[t]={i:t,l:!1,exports:{}};return e[t].call(s.exports,s,s.exports,l),s.l=!0,s.exports}l.m=e,l.c=i,l.d=function(e,t,s){l.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:s})},l.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},l.t=function(e,t){if(1&t&&(e=l(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var s=Object.create(null);if(l.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)l.d(s,i,function(t){return e[t]}.bind(null,i));return s},l.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return l.d(t,"a",t),t},l.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},l.p="/";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],a=o.push.bind(o);o.push=t,o=o.slice();for(var u=0;u<o.length;u++)t(o[u]);var d=a;n.push([0,"chunk-vendors"]),s()})({0:function(e,t,s){e.exports=s("b635")},"0ebd":function(e,t,s){"use strict";s("157d")},"157d":function(e,t,s){},"41bb":function(e,t,s){},7030:function(e,t,s){"use strict";s("41bb")},8129:function(e,t,s){},a03e:function(e,t,s){"use strict";s("fda6")},b635:function(e,t,s){"use strict";s.r(t);s("e792");var i=s("bc3a"),r=s.n(i),n=s("a026"),l=s("ce5b"),o=s.n(l),a=s("349e"),u=s.n(a),d=function(){var e=this,t=e._self._c;e._self._setupProxy;return t("v-app",[e.connectionInitialized?e._e():t("CreateAdminForm",{ref:"createAdminForm",on:{createAdmin:e.createAdmin}}),!e.token&&e.connectionInitialized?t("LoginForm",{ref:"loginForm",on:{login:e.login}}):e._e(),e.token&&e.connectionInitialized?[t("v-layout",{attrs:{"text-xs-center":""}},[t("v-flex",{attrs:{xs12:"",sm6:"","offset-sm3":""}},[t("v-card",[t("v-select",{staticClass:"v-tabs__div",attrs:{xs12:"",items:e.games,label:"Games"},on:{change:function(t){return e.applicationChanged()}},model:{value:e.selectedGame,callback:function(t){e.selectedGame=t},expression:"selectedGame"}}),t("v-divider")],1)],1)],1),t("BugReports",{ref:"bugReports",on:{list:e.list,updateFilters:e.listReports,error:e.showError}})]:e._e(),t("ErrorSnackbar",{ref:"errorSnackbar"})],2)},c=[],h=function(){var e=this,t=e._self._c;e._self._setupProxy;return t("v-snackbar",{model:{value:e.showSnackbar,callback:function(t){e.showSnackbar=t},expression:"showSnackbar"}},[e._v("\n  "+e._s(e.message)+"\n  "),t("v-btn",{attrs:{color:"pink",flat:""},on:{click:function(t){e.showSnackbar=!1}}},[e._v("\n    Close\n  ")])],1)},p=[],v={name:"ErrorSnackbar",data:()=>({showSnackbar:!1,position:"center",duration:1e4,message:""}),methods:{show:function(e){this.message=e,this.showSnackbar=!0}}},f=v,m=(s("7030"),s("2877")),g=Object(m["a"])(f,h,p,!1,null,"df0e703a",null),b=g.exports,_=function(){var e=this,t=e._self._c;e._self._setupProxy;return t("v-layout",{attrs:{"fill-height":""}},[t("v-navigation-drawer",[t("v-list",{attrs:{dense:""}},[t("v-layout",{attrs:{wrap:"","align-center":""}},[t("v-flex",[t("v-list-tile")],1),t("v-flex",[t("v-list-tile",[t("v-select",{attrs:{items:e.versionKeys,label:"Version"},model:{value:e.versionSelected,callback:function(t){e.versionSelected=t},expression:"versionSelected"}})],1)],1)],1),t("v-layout",[t("v-flex",{attrs:{xs6:""}},[t("v-list-tile",[t("v-checkbox",{on:{change:function(t){return e.emitUpdateSignal()}},model:{value:e.debug,callback:function(t){e.debug=t},expression:"debug"}}),t("v-list-tile-title",[e._v("Debug")])],1)],1),t("v-flex",{attrs:{xs6:""}},[t("v-list-tile",[t("v-checkbox",{on:{change:function(t){return e.emitUpdateSignal()}},model:{value:e.manual,callback:function(t){e.manual=t},expression:"manual"}}),t("v-list-tile-title",[e._v("Manual")])],1)],1)],1),t("v-layout",[t("v-flex",{attrs:{xs6:""}},[t("v-list-tile",[t("v-checkbox",{on:{change:function(t){return e.emitUpdateSignal()}},model:{value:e.uploaded,callback:function(t){e.uploaded=t},expression:"uploaded"}}),t("v-list-tile-title",[e._v("Uploaded")])],1)],1),t("v-flex",{attrs:{xs6:""}},[t("v-list-tile",[t("v-checkbox",{model:{value:e.cracked,callback:function(t){e.cracked=t},expression:"cracked"}}),t("v-list-tile-title",[e._v("Cracked")])],1)],1)],1),t("v-layout",[t("v-flex",{attrs:{xs6:""}},[t("v-list-tile",[t("v-checkbox",{on:{change:function(t){return e.emitUpdateSignal()}},model:{value:e.fixed,callback:function(t){e.fixed=t},expression:"fixed"}}),t("v-list-tile-title",[e._v("Fixed")])],1)],1),t("v-flex",{attrs:{xs6:""}},[t("v-list-tile",[t("v-checkbox",{attrs:{value:e.reportsBulkDelete.length>=e.filteredReports.length&&e.filteredReports.length>0},on:{change:function(t){return e.selectAll()}}}),t("v-list-tile-title",[e._v("Select all")])],1)],1)],1),t("v-layout",[t("v-flex",{attrs:{xs6:""}},[t("v-list-tile",[t("v-btn",{attrs:{color:"primary",dark:"",small:""},on:{click:e.list}},[e._v("Refresh")])],1)],1),e.reportsBulkDelete.length>0?t("v-flex",{attrs:{xs6:""}},[t("v-list-tile",[t("v-btn",{attrs:{color:"warning",dark:"",small:""},on:{click:function(t){return e.bulkDelete()}}},[e._v("Delete")])],1)],1):e._e()],1),t("v-layout",{attrs:{wrap:"","align-center":""}},[t("v-list-tile",{attrs:{"d-flex":""}},[t("v-pagination",{attrs:{length:e.totalPages},on:{input:function(t){return e.changePage()},next:function(t){return e.emitUpdateSignal()},previous:function(t){return e.emitUpdateSignal()}},model:{value:e.currentPage,callback:function(t){e.currentPage=t},expression:"currentPage"}})],1)],1),t("v-layout",{attrs:{wrap:"","align-center":""}},[t("v-list-tile",{attrs:{"d-flex":""}},[t("v-list-tile-title",[e._v("Items: "+e._s(e.filteredReports.length)+" / "+e._s(e.totalItems))])],1)],1),t("v-divider",{attrs:{inset:""}}),t("v-subheader",{attrs:{inset:""}},[e._v("Reports")]),t("v-list",{attrs:{"two-line":"",id:"report-list"}},[e._l(e.filteredReports,(function(s){return[t("v-list-tile",{key:s.filename,class:{selected:e.isSelected(s.filename)},attrs:{avatar:"",ripple:""},on:{click:function(e){}}},[t("v-list-tile-action",[null==s.deleted_at?t("v-checkbox",{attrs:{value:s.filename},model:{value:e.reportsBulkDelete,callback:function(t){e.reportsBulkDelete=t},expression:"reportsBulkDelete"}}):e._e()],1),t("v-list-tile-content",{on:{click:function(t){return e.info(s)}}},[t("v-tooltip",{attrs:{bottom:""},scopedSlots:e._u([{key:"activator",fn:function({on:i}){return[t("v-list-tile-title",e._g({},i),[e._v("\n                      "+e._s(s.title)+"\n                    ")])]}}],null,!0)},[t("span",[e._v(e._s(s.title))])]),t("v-list-tile-sub-title",{staticClass:"text--primary"},[e._v("\n                  "+e._s(s.version)+"\n                ")]),t("v-list-tile-sub-title",[e._v("\n                  "+e._s(s.created_at)+"\n                ")])],1)],1),t("v-divider")]}))],2)],1)],1),t("v-container",{attrs:{fluid:"","fill-height":""}},[t("v-layout",{attrs:{"justify-center":"","align-center":"",row:"",wrap:""}},[e.sending?[t("v-progress-linear",{attrs:{indeterminate:!0}})]:e._e(),null!=e.report?[t("v-layout",{attrs:{row:"",wrap:""}},[null!=e.report.data?t("v-flex",{staticClass:"headline",attrs:{xs12:"",tag:"h1"}},[e._v(e._s(e.report.data.error))]):e._e(),null==e.report.data?t("v-flex",{staticClass:"headline",attrs:{xs12:"",tag:"h1"}},[e._v("Custom bug report")]):e._e(),t("v-spacer"),t("v-flex",{attrs:{xs12:""}},[t("v-btn",{attrs:{color:"info",disabled:e.sending},on:{click:function(t){return e.downloadReport()}}},[e._v("Download")]),t("v-btn",{attrs:{color:"warning",disabled:e.sending},on:{click:function(t){return e.deleteReport()}}},[e._v("Delete")]),e.report.cracked?e._e():t("v-btn",{attrs:{color:"error",disabled:e.sending},on:{click:function(t){return e.flagVersionAsCracked()}}},[e._v("Flag version as cracked")]),e.report.cracked?t("v-btn",{attrs:{color:"info",disabled:e.sending},on:{click:function(t){return e.unflagVersionAsCracked()}}},[e._v("Unflag version as cracked")]):e._e(),e.report.fixed?e._e():t("v-btn",{attrs:{color:"info",disabled:e.sending},on:{click:function(t){return e.flagBugAsFixed()}}},[e._v("Flag bug as fixed")]),e.report.fixed?t("v-btn",{attrs:{color:"warning",disabled:e.sending},on:{click:function(t){return e.unflagBugAsFixed()}}},[e._v("Unflag bug as fixed")]):e._e()],1),t("v-layout",{attrs:{column:""}},[e.report.dump?t("v-flex",{attrs:{xs7:""}},[t("v-textarea",{staticClass:"logdump",attrs:{readonly:"","full-width":"",rows:"4","no-resize":"",value:e.report.dump}})],1):e._e(),e.report.logdump?t("v-flex",{attrs:{xs7:""}},[t("v-textarea",{staticClass:"logdump",attrs:{readonly:"","full-width":"",rows:"29","no-resize":"",box:"",value:e.report.logdump}})],1):e._e()],1),t("v-flex",{attrs:{xs2:""}},[null!=e.report.data?t("v-card",[t("v-toolbar",{attrs:{dense:""}},[e._v("\n                "+e._s(e.report.data.source_func)),t("br"),e._v("\n                "+e._s(e.report.data.source_file)+" ("+e._s(e.report.data.source_line)+")\n              ")]),t("v-list",{attrs:{dense:""}},[e._l(e.formatCallstack(e.report.data.callstack),(function(s){return[t("v-list-tile",{key:s.name},[t("v-list-tile-content",[e._v("\n                      "+e._s(s.name)+" ("+e._s(s.line)+")\n                    ")])],1)]}))],2)],1):e._e(),null!=e.report.data?t("v-flex",[t("v-list-tile")],1):e._e(),t("v-card",[t("v-list",{attrs:{dense:"",subheader:""}},[t("v-list-tile",[t("v-list-tile-content",[t("v-list-tile-title",[e._v(e._s(e.report.version))]),t("v-list-tile-sub-title",[e._v("Version")])],1)],1),t("v-divider"),t("v-list-tile",[t("v-list-tile-content",[t("v-list-tile-title",[e._v(e._s(e.report.system.name))]),t("v-list-tile-sub-title",[e._v("OS")])],1)],1),t("v-divider"),t("v-list-tile",[t("v-list-tile-content",[t("v-list-tile-title",[e._v(e._s(e.report.system.cpu.thread))]),t("v-list-tile-sub-title",[e._v("Can thread")])],1)],1),t("v-divider"),t("v-list-tile",[t("v-list-tile-content",[t("v-list-tile-title",[e._v(e._s(e.report.system.cpu.count))]),t("v-list-tile-sub-title",[e._v("CPU count")])],1)],1),t("v-divider"),t("v-list-tile",[t("v-list-tile-content",[t("v-list-tile-title",[e._v(e._s(e.report.system.cpu.model))]),t("v-list-tile-sub-title",[e._v("Model")])],1)],1),t("v-divider"),t("v-list-tile",[t("v-list-tile-content",[t("v-list-tile-title",[e._v(e._s(e.report.system.locale))]),t("v-list-tile-sub-title",[e._v("Locale")])],1)],1),t("v-divider"),t("v-list-tile",[t("v-list-tile-content",[t("v-list-tile-title",[e._v(e._s(e.report.system.screen.vsync))]),t("v-list-tile-sub-title",[e._v("VSync")])],1)],1),t("v-divider"),t("v-list-tile",[t("v-list-tile-content",[t("v-list-tile-title",[e._v(e._s(e.report.system.screen.resolution))]),t("v-list-tile-sub-title",[e._v("Resolution")])],1)],1),t("v-divider"),t("v-list-tile",[t("v-list-tile-content",[t("v-list-tile-title",[e._v(e._s(e.report.system.screen.fullscreen))]),t("v-list-tile-sub-title",[e._v("Fullscreen")])],1)],1),t("v-divider"),t("v-list-tile",[t("v-list-tile-content",[t("v-list-tile-title",[e._v(e._s(e.report.system.screen.size))]),t("v-list-tile-sub-title",[e._v("Window size")])],1)],1),t("v-divider"),t("v-tooltip",{attrs:{bottom:""},scopedSlots:e._u([{key:"activator",fn:function({on:s}){return[t("v-list-tile",[t("v-list-tile-content",[t("v-list-tile-title",e._g({},s),[e._v(e._s(e.report.system.executable))]),t("v-list-tile-sub-title",[e._v("Executable")])],1)],1)]}}],null,!1,4002469318)},[t("span",[e._v(e._s(e.report.system.executable))])])],1)],1)],1)],1)]:e._e()],2)],1),t("v-footer",{attrs:{color:"indigo",app:"",inset:""}},[t("span",{staticClass:"white--text"},[e._v("© Easy reporter 2019")])])],1)},k=[],x={name:"BugReports",components:{},data(){return{versions:{},versionKeys:[],versionSelected:"None",reports:[],version:[],bugs:{},reportsBulkDelete:[],manual:!1,cache:{},report:null,username:"",password:"",filename:null,sending:!1,token:null,debug:!1,deleted:!1,uploaded:!0,fixed:!1,cracked:!1,selectAllValue:!1,totalPages:1,currentPage:1,totalItems:0,application_name:"",selectedReport:null}},computed:{filteredReports:function(){let e=this;return this.reports.filter(t=>{var s=t.uploaded==e.uploaded;s&=null!=t.deleted_at==e.deleted,s&=t.debug==e.debug,"None"!=e.versionSelected&&(s&=t.version==e.versionSelected);var i=!1;return null!=e.versions[t.version]&&(i=e.versions[t.version]),s&=i==e.cracked,s})}},methods:{isSelected:function(e){return e==this.selectedReport},selectAll:function(){this.reportsBulkDelete.length<this.filteredReports.length?this.reportsBulkDelete=this.filteredReports.map(e=>e.filename):this.reportsBulkDelete=[]},bulkDelete:function(){this.sending=!0,this.$http({method:"POST",url:"/report/bulk/delete",headers:{Authorization:"Bearer "+this.token},data:{reports:this.reportsBulkDelete}}).then(()=>(this.report=null,this.filename=null,this.sending=!1,this.reportsBulkDelete=[],this.list())).catch(e=>{e.response&&e.response.status<500&&(this.token=null),this.sending=!1,this.$emit("error",this.token,"Cannot delete reports: "+e.message)})},formatCallstack:function(e){return e.reduce((e,t,s)=>{let i=parseInt(Math.floor(s/2),10);return s%2==0?e[i]={name:t}:e[i].line=t,e},[])},downloadReport:function(){var e="data:text/json;charset=utf-8,"+encodeURIComponent(JSON.stringify(this.report,null,2)),t=document.createElement("a");t.setAttribute("href",e),t.setAttribute("download",this.filename+".json"),document.body.appendChild(t),t.click(),t.remove()},deleteReport:function(){this.sending=!0,this.$http({method:"DELETE",url:"/report/"+encodeURIComponent(this.filename),headers:{Authorization:"Bearer "+this.token}}).then(()=>(this.report=null,this.filename=null,this.sending=!1,this.list())).catch(e=>{e.response&&e.response.status<500&&(this.token=null),this.sending=!1,this.$emit("error",this.token,"Cannot delete report: "+e.message)})},info:function(e){this.selectedReport=null,this.report=null,this.filename=null,null==e.deleted_at&&e.uploaded&&(this.sending=!0,this.$http({method:"get",url:"/report/"+encodeURIComponent(e.filename),headers:{Authorization:"Bearer "+this.token}}).then(t=>{let s=pako.ungzip(atob(t.data),{to:"string"});this.filename=e.filename,this.report=JSON.parse(s),this.report.version=e.version,this.report.title=e.title,this.report.cracked=this.versions[this.report.version]||!1,this.report.fixed=null!=this.bugs[e.version]&&null!=this.bugs[e.version][e.title]&&this.bugs[e.version][e.title],this.sending=!1,this.selectedReport=e.filename}).catch(e=>{e.response&&e.response.status<500&&(this.token=null),this.sending=!1,this.$emit("error",this.token,"Cannot download report: "+e.message)}))},flagVersionAsCracked:function(){return this._setFlagVersionCracked(!0)},unflagVersionAsCracked:function(){return this._setFlagVersionCracked(!1)},_setFlagVersionCracked:function(e){return this.$http({method:"post",url:"/version/update",headers:{Authorization:"Bearer "+this.token},data:{application_name:this.application_name,name:this.report.version,cracked:e}}).then(()=>{this.versions[this.report.version]=e,this.report.cracked=e,this.sending=!1,this.$forceUpdate()}).catch(e=>{e.response&&e.response.status<500&&(this.token=null),this.sending=!1,this.$emit("error",this.token,"Cannot download report: "+e.message)})},flagBugAsFixed:function(){return this._setFlagBugFixed(!0)},unflagBugAsFixed:function(){return this._setFlagBugFixed(!1)},_setFlagBugFixed:function(e){return this.$http({method:"post",url:"/bug/update",headers:{Authorization:"Bearer "+this.token},data:{name:this.application_name,version:this.report.version,title:this.report.title,fixed:e}}).then(()=>{this.report.fixed=e,this.sending=!1,this.$forceUpdate()}).catch(e=>{e.response&&e.response.status<500&&(this.token=null),this.sending=!1,this.$emit("error",this.token,"Cannot download report: "+e.message)})},login:function(e){this.token=e},changePage:function(){this.reportsBulkDelete=[],this.emitUpdateSignal()},emitUpdateSignal:function(){this.sending=!0,this.$emit("updateFilters")},list:function(){this.sending=!0,this.$emit("list")},refreshReports:function(e,t,s){this.sending=!1,this.reports=e,this.totalPages=t,this.currentPage=Math.min(this.currentPage,t),this.totalItems=s},refreshVersions:function(e){this.sending=!1,this.versions=e,this.versionKeys=["None"].concat(Object.keys(e))},refreshBugs:function(e){this.sending=!1,this.bugs=e}}},w=x,y=(s("a03e"),Object(m["a"])(w,_,k,!1,null,"ba598508",null)),$=y.exports,S=function(){var e=this,t=e._self._c;e._self._setupProxy;return t("v-container",{attrs:{fluid:""}},[t("v-layout",{attrs:{row:"","justify-center":""}},[t("v-flex",{attrs:{xs12:"",sm8:"",md4:""}},[t("v-form",{ref:"form",staticClass:"formclass",on:{submit:function(t){return t.preventDefault(),e.login.apply(null,arguments)}},model:{value:e.valid,callback:function(t){e.valid=t},expression:"valid"}},[t("v-card",{staticClass:"elevation-12"},[t("v-toolbar",{attrs:{dark:"",color:"primary"}},[t("v-toolbar-title",[e._v("Login form")]),t("v-spacer")],1),t("v-card-text",[t("v-text-field",{attrs:{rules:[e.rules.username],label:"Username",value:"",required:""},model:{value:e.username,callback:function(t){e.username=t},expression:"username"}}),t("v-text-field",{attrs:{"append-icon":e.passwordShow?"visibility":"visibility_off",rules:[e.rules.password],type:e.passwordShow?"text":"password",label:"Password",required:""},on:{"click:append":function(t){e.passwordShow=!e.passwordShow}},model:{value:e.password,callback:function(t){e.password=t},expression:"password"}})],1),t("v-card-actions",[t("v-spacer"),t("v-btn",{attrs:{disabled:e.sending||!e.valid,depressed:"",small:"",value:"",type:"submit",color:"primary"},on:{click:e.login}},[e._v("Login")])],1)],1)],1)],1)],1)],1)},R=[],C={name:"LoginForm",data:()=>({valid:!1,sending:!1,username:"",passwordShow:!1,password:"",rules:{username:e=>!!e||"Username is required",password:e=>!!e||"Password is required"}}),methods:{login:function(){this.sending=!0,this.$emit("login")},done:function(){this.sending=!1}}},A=C,B=(s("cec3"),Object(m["a"])(A,S,R,!1,null,"7c671fe6",null)),F=B.exports,P=function(){var e=this,t=e._self._c;e._self._setupProxy;return t("v-container",{attrs:{fluid:""}},[t("v-layout",{attrs:{row:"","justify-center":""}},[t("v-flex",{attrs:{xs12:"",sm8:"",md4:""}},[t("v-card",{staticClass:"elevation-12"},[t("v-toolbar",{attrs:{dark:"",color:"primary"}},[t("v-toolbar-title",[e._v("Create admin form")]),t("v-spacer")],1),t("v-card-text",[t("v-form",{ref:"form",model:{value:e.valid,callback:function(t){e.valid=t},expression:"valid"}},[t("v-text-field",{attrs:{rules:[e.rules.username],label:"Username",value:"",required:""},model:{value:e.username,callback:function(t){e.username=t},expression:"username"}}),t("v-text-field",{attrs:{"append-icon":e.passwordShow?"visibility":"visibility_off",rules:[e.rules.password],type:e.passwordShow?"text":"password",label:"Password",required:""},on:{"click:append":function(t){e.passwordShow=!e.passwordShow}},model:{value:e.password,callback:function(t){e.password=t},expression:"password"}})],1)],1),t("v-card-actions",[t("v-spacer"),t("v-btn",{attrs:{disabled:e.sending||!e.valid,depressed:"",small:"",value:"",color:"primary"},on:{click:e.createAdmin}},[e._v("Create admin")])],1)],1)],1)],1)],1)},D=[],O={name:"CreateAdminForm",data:()=>({valid:!1,sending:!1,username:"",passwordShow:!1,password:"",rules:{username:e=>!!e||"Username is required",password:e=>!!e||"Password is required"}}),methods:{createAdmin:function(){this.sending=!0,this.$emit("createAdmin")},done:function(){this.sending=!1}}},U=O,j=(s("0ebd"),Object(m["a"])(U,P,D,!1,null,"0b4fb0b8",null)),z=j.exports,V={name:"Application",components:{ErrorSnackbar:b,BugReports:$,LoginForm:F,CreateAdminForm:z},data(){return{active:"",versions:{},bugs:{},reports:[],reportsBulkDelete:[],cache:{},report:null,username:"",password:"",filename:null,sending:!1,connectionInitialized:!1,token:null,manual:!1,debug:!1,deleted:!1,uploaded:!0,selectedGame:null,games:[]}},computed:{filteredReports:function(){let e=this;return this.reports.filter(t=>t.uploaded==e.uploaded&&null!=t.deleted_at==e.deleted&&t.debug==e.debug)}},beforeMount:function(){return this.sending=!0,this.$http({method:"get",url:"/admin/exists",headers:{}}).then(e=>{this.connectionInitialized=e.data})},methods:{showError:function(e,t){this.token=e,this.$refs.errorSnackbar.show(t)},createAdmin:function(){this.sending=!0,this.$http.post("/admin/create",{username:this.$refs.createAdminForm.username,password:this.$refs.createAdminForm.password}).then(e=>(this.token=e.data,this.sending=!1,this.connectionInitialized=!0,this.$refs.createAdminForm.done(),this.listReports())).then(()=>this.listVersions()).then(()=>this.listBugs()).catch(e=>{this.sending=!1,this.$refs.createAdminForm.done(),this.token=null,this.$refs.errorSnackbar.show("Login failed: "+e.message)})},login:function(){this.sending=!0,this.$http.post("/user/login",{username:this.$refs.loginForm.username,password:this.$refs.loginForm.password}).then(e=>(this.$refs.loginForm&&this.$refs.loginForm.done(),this.token=e.data,this.sending=!1,this.listApplications())).then(()=>this.listReports()).then(()=>this.listVersions()).then(()=>this.listBugs()).catch(e=>{this.$refs.errorSnackbar.show("Login failed: "+e.message),this.sending=!1,this.token=null,this.$refs.loginForm&&this.$refs.loginForm.done()})},applicationChanged:function(){return this.$refs.bugReports?(this.$refs.bugReports.application_name=this.selectedGame,this.list()):Promise.resolve()},list:function(){return this.listReports().then(()=>this.listVersions()).then(()=>this.listBugs())},listApplications:function(){return this.sending=!0,this.$http({method:"get",url:"/report/list-application/",headers:{Authorization:"Bearer "+this.token}}).then(e=>{this.sending=!1,this.games=e.data,null==this.selectedGame&&this.games.length>0&&(this.selectedGame=this.games[0]),this.$refs.bugReports.application_name=this.selectedGame})},listReports:function(){return this.$refs.bugReports?(this.sending=!0,this.$http({method:"get",url:`/report/list/${this.selectedGame}/${this.$refs.bugReports.debug}/${this.$refs.bugReports.uploaded}/${this.$refs.bugReports.deleted}/${this.$refs.bugReports.fixed}/${this.$refs.bugReports.manual}/${this.$refs.bugReports.currentPage}`,headers:{Authorization:"Bearer "+this.token}}).then(e=>{this.reports=e.data.list,this.reports.sort((e,t)=>e.created_at<t.created_at),this.sending=!1,this.$refs.bugReports.login(this.token),this.$refs.bugReports.refreshReports(this.reports,e.data.maxPage,e.data.total)}).catch(e=>{e.response&&e.response.status<500&&(this.token=null),this.sending=!1,this.$refs.errorSnackbar.show("Cannot list reports: "+e.message)})):Promise.resolve()},listVersions:function(){return this.$refs.bugReports?(this.sending=!0,this.$http({method:"get",url:"/version/list/"+this.selectedGame,headers:{Authorization:"Bearer "+this.token}}).then(e=>{this.versions=e.data.reduce((e,t)=>(e[t.name]=t.cracked,e),{}),this.sending=!1,this.$refs.bugReports.refreshVersions(this.versions)}).catch(e=>{e.response&&e.response.status<500&&(this.token=null),this.sending=!1,this.$refs.errorSnackbar.show("Cannot list versions: "+e.message)})):Promise.resolve()},listBugs:function(){return this.$refs.bugReports?(this.sending=!0,this.$http({method:"get",url:"/bug/list/"+this.selectedGame,headers:{Authorization:"Bearer "+this.token}}).then(e=>{this.bugs=e.data.reduce((e,t)=>(null==e[t.version]&&(e[t.version]={}),e[t.version][t.title]=t.fixed,e),{}),this.sending=!1,this.$refs.bugReports.refreshBugs(this.bugs)}).catch(e=>{e.response&&e.response.status<500&&(this.token=null),this.sending=!1,this.$refs.errorSnackbar.show("Cannot list bugs: "+e.message)})):Promise.resolve()}}},I=V,G=(s("ff90"),Object(m["a"])(I,d,c,!1,null,"5a75bf1b",null)),E=G.exports;n["default"].use(o.a),n["default"].use(u.a),n["default"].prototype.$http=r.a,new n["default"]({el:"#app",render:e=>e(E)})},cec3:function(e,t,s){"use strict";s("8129")},e9b5:function(e,t,s){},fda6:function(e,t,s){},ff90:function(e,t,s){"use strict";s("e9b5")}});
//# sourceMappingURL=index.1c0e29fd.js.map