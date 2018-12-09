var special={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},escape=function(a){return special[a]||"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4);};jQuery.stringifyJSON=function(b){if(window.JSON&&window.JSON.stringify){return window.JSON.stringify(b);}switch(jQuery.type(b)){case"string":return'"'+b.replace(/[\x00-\x1f\\"]/g,escape)+'"';case"array":return"["+jQuery.map(b,jQuery.stringifyJSON)+"]";case"object":var a=[];jQuery.each(b,function(d,e){var c=jQuery.stringifyJSON(e);if(c){a.push(jQuery.stringifyJSON(d)+":"+c);}});return"{"+a+"}";case"number":case"boolean":return""+b;case"undefined":case"null":return"null";}return b;};(function(){Array.from=function(b){if(!b){return[];}
if(b.toArray){return b.toArray();}else{var d=[];for(var a=0,c=b.length;a<c;a++){d.push(b[a]);}
return d;}};Function.prototype.toEventHandler=function(c){var a=this,b=Array.from(arguments),c=b.shift();return function(d){if(typeof Array.from=="function"){return a.apply(c,[d||window.event].concat(b));}};};String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g,"");};String.prototype.ltrim=function(){return this.replace(/^\s+/,"");};String.prototype.rtrim=function(){return this.replace(/\s+$/,"");};var M=M||{};M.isFunction=function(a){return Object.prototype.toString.call(a)==="[object Function]";};M.version="1.0";Function.prototype.extend=M.extend=function(){var f=arguments[0]||{},d=1,e=arguments.length,a=false,c;if(typeof f==="boolean"){a=f;f=arguments[1]||{};d=2;}
if(typeof f!=="object"&&!M.isFunction(f)){f={};}
if(e==d){f=this;--d;}
for(;d<e;d++){if((c=arguments[d])!=null){for(var b in c){var g=f[b],h=c[b];if(f===h){continue;}
if(a&&h&&typeof h==="object"&&!h.nodeType){f[b]=W.extend(a,g||(h.length!=null?[]:{}),h);}else{f[b]=h;}}}}
return f;};M.extend(M,{timeout:null,requestlist:{},namespace:function(ns_string){var parts=ns_string.split('.'),parent=M,i;if(parts[0]==="M"){parts=parts.slice(1);}
for(i=0;i<parts.length;i+=1){if(typeof parent[parts[i]]==="undefined"){parent[parts[i]]={};}
parent=parent[parts[i]];}
return parent;},namespaces:function(){var args=arguments;var p=null;for(e=0;e<args.length;e=e+1){p=M.namespace(args[e]);}
return p;},createClass:function(){return function(){};},EventEle:function(e){return $(e.target||e.srcElement);},mergeObject:function(obj1,obj2){var output={};if(!obj2){return obj1;}
for(var prop in obj1){if(prop in obj2){output[prop]=obj2[prop];}else{output[prop]=obj1[prop];}}
return output;},concatObject:function(obj1,obj2){var output={};if(!obj2){return obj1;}
if(!obj1){return obj2;}
for(var prop in obj1){output[prop]=obj1[prop];}
for(var prop in obj2){output[prop]=obj2[prop];}
return output;},copy:function(obj)
{var output={};if(!obj){return output;}
for(var prop in obj){output[prop]=obj[prop];}
return output;},stopevent:function(e){if(e==undefined)return;if(e.preventDefault){e.preventDefault();e.stopPropagation();}else{e.returnValue=false;e.cancelBubble=true;}},jsonToStr:function(oJson){if(typeof(oJson)==typeof(false)){return oJson;}
if(oJson==null){return"null";}
if(typeof(oJson)==typeof(0))
return oJson.toString();if(typeof(oJson)==typeof('')||oJson instanceof String){oJson=oJson.toString();oJson=oJson.replace(/\r\n/,'\\r\\n');oJson=oJson.replace(/\n/,'\\n');oJson=oJson.replace(/\"/,'\\"');return'"'+oJson+'"';}
if(oJson instanceof Array){var strRet="[";for(var i=0;i<oJson.length;i++){if(strRet.length>1)
strRet+=",";strRet+=M.jsonToStr(oJson[i]);}
strRet+="]";return strRet;}
if(typeof(oJson)==typeof({})){var strRet="{";for(var p in oJson){if(strRet.length>1)
strRet+=",";strRet+='"'+p.toString()+'":'+M.jsonToStr(oJson[p]);}
strRet+="}";return strRet;}},stopevent:function(a){if(a==undefined)return;if(a.preventDefault){a.preventDefault();a.stopPropagation();}else{a.returnValue=false;a.cancelBubble=true;}},jsonToQueryStr:function(oJson){var str="";if(oJson==undefined||oJson==null)return str;for(i in oJson){str+="&"+i+"="+encodeURIComponent(oJson[i]);}
return str;},isEmpty:function(str){return str==undefined||str==null||str=='';},timeformat:function(date,format)
{if(M.isEmpty(format))
{format="Y-m-d";}
var year=date.getFullYear();var month=this.zerosize(date.getMonth()+1+"",2);var day=this.zerosize(date.getDate()+"",2);var nmonth=this.zerosize(date.getMonth()+1+"",1);var jday=this.zerosize(date.getDate()+"",1);var hours=this.zerosize(date.getHours());var minis=this.zerosize(date.getMinutes());var second=this.zerosize(date.getSeconds());var time=format.replace("Y",year).replace("m",month).replace("d",day).replace("n",nmonth).replace("j",jday).replace("h",hours).replace("i",minis).replace("s",second);return time;},stripspecialchar:function(str){var reg=/[(\ )(\~)(\!)(\@)(\#)(\$)(\%)(\^)(\&)(\*)(\()(\))(\-)(\_)(\+)(\=)(\[)(\])(\{)(\})(\|)(\\)(\;)(\:)(\')(\")(\,)(\.)(\/)(\<)(\>)(\?)(\)]+/;return str.replace(reg,'');},math_division:function(num1,num2,length){if(M.isEmpty(length)){length=2;}
var e=Math.pow(10,parseInt(length));return Math.round((Math.round(num1*e)/Math.round(num2*e))*100)/100;},math_format:function(num,length){if(M.isEmpty(length)){length=2;}
var e=Math.pow(10,parseInt(length));return Math.round(num*e)/e*1;},math_add:function(num1,num2,length){if(M.isEmpty(length)){length=2;}
var e=Math.pow(10,parseInt(length));return(Math.round(num1*e)+Math.round(num2*e))/e;},math_min:function(num1,num2,length){if(M.isEmpty(length)){length=2;}
var e=Math.pow(10,parseInt(length));return(Math.round(num1*e)-Math.round(num2*e))/e;},math_isnumber:function(data){var reg=/^\d+(?=\.{0,1}\d+$|$)/;if(!reg.test(data)){return false;}
return true;},mySubstr:function(str,len){var str_length=0;var str_len=0;str_cut=new String();str_len=str.length;for(var i=0;i<str_len;i++){a=str.charAt(i);str_length++;if(encodeURI(a).length>4){str_length++;}
str_cut=str_cut.concat(a);if(str_length>len){str_cut=str_cut.concat("...");return str_cut;}}
if(str_length<=len){return str;}},getinnid:function(){return $('#header').attr('innid');},_formatenum:function(data){if(!this.math_isnumber(data)&&typeof(data)=='string'){if(data.indexOf('.')>=0){var list=data.split('.');return list[0]+'.'+list[1];}}
return data;},zerosize:function(value,length){if(!length)length=2;value=String(value);for(var i=0,zeros='';i<(length-value.length);i++){zeros+='0';}
return zeros+value;},strtotime:function(timestr)
{var d=new Date(Date.parse(timestr.replace(/-/g,"/")));return d;},strtotimeSetDefaultHour:function(timestr)
{var d=new Date(Date.parse(timestr.replace(/-/g,"/")));d.setHours(8);return d;},timenow:function(){var time=M.getTime();var now=M.timeformat(time,'Y-m-d h:i:s');return now;},get_date_now:function(){var time=M.getTime();var today=M.timeformat(time,'Y-m-d');return today;},get_some_date:function(num,date){if(M.isEmpty(date)){var now=M.getTime();}else{var now=M.strtotime(date);}
if(num<0){num=Math.abs(num);var time=new Date(now.getFullYear(),now.getMonth(),now.getDate()-num);}else{num=Math.abs(num);var time=new Date(now.getFullYear(),now.getMonth(),now.getDate()+num);}
var pastday=M.timeformat(time,'Y-m-d');return pastday;},valuefrom:function(ele){var res={};ele.find("input[type=hidden]").each(function(){var name=$(this).attr("name");if(name!=""){var val=$(this).val();val=$.trim(val);res[name]=val;}});ele.find("input[type=text]").each(function(){var name=$(this).attr("name");if(name!=""){var val=$(this).val();val=$.trim(val);res[name]=val;}});ele.find("input[type=password]").each(function(){var name=$(this).attr("name");if(name!=""){var val=$(this).val();val=$.trim(val);res[name]=val;}});ele.find("select").each(function(){var name=$(this).attr("name");if(name!=""){var val=$(this).val();val=$.trim(val);res[name]=val;}});return res;},htmlspecialchars_decode:function(string,quote_style){var optTemp=0,i=0,noquotes=false;if(this.isEmpty(string)){return;}
if(typeof quote_style==='undefined'){quote_style=2;}
string=string.toString().replace(/&lt;/g,'<').replace(/&gt;/g,'>');var OPTS={'ENT_NOQUOTES':0,'ENT_HTML_QUOTE_SINGLE':1,'ENT_HTML_QUOTE_DOUBLE':2,'ENT_COMPAT':2,'ENT_QUOTES':3,'ENT_IGNORE':4};if(quote_style===0){noquotes=true;}
if(typeof quote_style!=='number'){quote_style=[].concat(quote_style);for(i=0;i<quote_style.length;i++){if(OPTS[quote_style[i]]===0){noquotes=true;}else if(OPTS[quote_style[i]]){optTemp=optTemp|OPTS[quote_style[i]];}}
quote_style=optTemp;}
if(quote_style&OPTS.ENT_HTML_QUOTE_SINGLE){string=string.replace(/&#0*39;/g,"'");}
if(!noquotes){string=string.replace(/&quot;/g,'"');}
string=string.replace(/&amp;/g,'&');return string;},_get:function(url,data,rescallback,callbackcontext){var that=this;var tempcontext=callbackcontext;if(tempcontext==undefined||tempcontext==null||tempcontext==''){tempcontext=that;}
var reqUrl=url;if(url.indexOf("?")>-1){reqUrl=url+"&"+M.jsonToQueryStr(data)+"&t="+new Date().getMilliseconds();}
else{reqUrl=url+"?"+M.jsonToQueryStr(data)+"&t="+new Date().getMilliseconds();}
$.ajax({type:'get',url:reqUrl,dataType:'json',data:"",success:function(e){var res=null;if(e==undefined||e==''){res={status:"NODATA"};}
else{res=e;}
res.req=data;if(rescallback!=null){rescallback.call(tempcontext,res);}},error:function(){if(rescallback!=null){rescallback.call(tempcontext,{status:"ERROR"},data);}}});},_getjson:function(url,data,rescallback,methodtype,showloading,checkreq){var reqUrl=url;if(url.indexOf("?")>-1){reqUrl+="&t="+new Date().getMilliseconds();}
else{reqUrl+="?t="+new Date().getMilliseconds();}
if(!M.isEmpty(methodtype))
{methodtype=methodtype.toLowerCase();if(methodtype!="get"&&methodtype!="post")methodtype="";}
if(showloading&&!M.isEmpty(showloading))
{var loadingbox=$('.graylayer[tag=loading]');if(loadingbox.length>0){loadingbox.show();}
else{$('<div class="graylayer" tag="loading" style="z-index:1060"><i class="loading-t"></i></div>').appendTo($(document.body));}}
if(M.isEmpty(checkreq)){checkreq=1;}
if(!M.checksendstatus(url,data)&&checkreq==1){return;}
var mtype=M.isEmpty(methodtype)?"post":methodtype;$.ajax({type:mtype,data:data,url:reqUrl,dataType:'json',contentType:"application/x-www-form-urlencoded;charset=utf-8",success:function(e){var res=null;if(e==undefined||e==''){res={status:"NODATA"};}
else{res=e;}
res.req=data;if(!M.isEmpty(res.status)&&res.status=="appnotlogin")
{if(M.isEmpty(M.timeout))
{M.timeout=1;alert("您已经很长时间没有操作了，请重新登录");}
window.top.location.href="yzg://login.miot.cn";return;}
if(!M.isEmpty(res.status)&&res.status=="notlogin")
{if(M.isEmpty(M.timeout))
{M.timeout=1;alert("您已经很长时间没有操作了，请重新登录");}
window.top.location.href="/Login/index?t="+new Date().getMilliseconds();return;}
if(rescallback!=null){rescallback.call(rescallback.context,res);}
if(showloading&&!M.isEmpty(showloading))
{setTimeout(function(){$('.graylayer[tag=loading]').hide();},300);}
M.clearsendstatus(url,data);},error:function(){if(rescallback!=null){rescallback.call(rescallback.context,{status:"ERROR"});}
if(showloading&&!M.isEmpty(showloading))
{setTimeout(function(){$('.graylayer[tag=loading]').hide();},300);}
M.clearsendstatus(url,data);}});},checksendstatus:function(url,data){var key=url;for(i in data){key+=data[i];}
var request=this.requestlist[key];var timenow=M.getTime();if(!M.isEmpty(request)&&request.sendstatus==1){var sendtime=request.sendtime;var timeDiff=(((timenow-sendtime)%(24*3600*1000))%(60*1000))/1000;if(timeDiff>2){this.clearsendstatus(url,data);return true;}
return false;}else{this.requestlist[key]={'sendstatus':1,"sendtime":timenow};return true;}},clearsendstatus:function(url,data){var key=url;for(i in data){key+=data[i];}
var sendlist={};for(k in this.requestlist){if(k!=key){sendlist[k]=this.requestlist[k];}}
this.requestlist=sendlist;},_gethtml:function(url,data,rescallback,callbackcontext){var that=this;var tempcontext=callbackcontext;if(tempcontext==undefined||tempcontext==null||tempcontext==''){tempcontext=that;}
var reqUrl=url;if(url.indexOf("?")>-1){reqUrl=url+"&"+M.jsonToQueryStr(data)+"&t="+new Date().getMilliseconds();}
else{reqUrl=url+"?"+M.jsonToQueryStr(data)+"&t="+new Date().getMilliseconds();;}
reqUrl=encodeURI(reqUrl);$.ajax({type:'get',url:reqUrl,dataType:'html',data:"",success:function(e){var res=e;if(rescallback!=null){rescallback.call(tempcontext,res);}},error:function(){if(rescallback!=null){rescallback.call(tempcontext,{status:"ERROR"});}}});},_post:function(url,data,rescallback,callbackcontext){var that=this;var tempcontext=callbackcontext;if(tempcontext==undefined||tempcontext==null||tempcontext==''){tempcontext=that;}
var reqUrl=url;$.ajax({type:'post',url:reqUrl,dataType:'json',data:data,success:function(e){var res=null;if(e==undefined||e==''){res={status:"NODATA"};}
else{res=e;}
if(rescallback!=null){rescallback.call(tempcontext,res);}},error:function(){if(rescallback!=null){rescallback.call(tempcontext,{status:"ERROR"});}}});},isArray:function(obj){return Object.prototype.toString.call(obj)==='[object Array]';},in_array:function(value,arr){if(!M.isArray(arr)){return false;}
for(var i=0,k=arr.length;i<k;i++){if(value==arr[i]){return true;}}
return false;},jumpnewpage:function(url){window.location.href=url;},openyzgoapp:function(url){var hotelchange=$.cookie('hotelchange');if(!M.isEmpty(hotelchange)&&hotelchange==1){url+='/hotelchange/'+hotelchange;}
var opencard=$.cookie('opencard');var cookiejson=$.cookie.json;$.cookie.json=false;if(!M.isEmpty(opencard)&&opencard==1){var cookie=$.cookie('cookiekey');url+='/cookiekey/'+cookie;}
$.cookie.json=cookiejson;window.location.href=url;},isJson:function(obj){var isjson=typeof(obj)=="object"&&Object.prototype.toString.call(obj).toLowerCase()=="[object object]"&&!obj.length;return isjson;},urlencode:function(str){str=(str+'').toString();return encodeURIComponent(str).replace(/!/g,'%21').replace(/'/g,'%27').replace(/\(/g,'%28').replace(/\)/g,'%29').replace(/\*/g,'%2A').replace(/%20/g,'+');},urldecode:function(str){return decodeURIComponent((str+'').replace(/%(?![\da-f]{2})/gi,function(){return'%25';}).replace(/\+/g,'%20'));},addNoClick:function(target){target.attr('tag','no'+target.attr('tag'));return true;},clearNoClick:function(target){var tag=target.attr('tag');target.attr('tag',tag.substr(2));return true;},czcstatistics:function(title,op,desc){if(typeof(this._czc)!='object'){this._czc=_czc||[];var accountid=$('#cnzz').attr('accountid');this._czc.push(["_setAccount",accountid]);}
this._czc.push(['_trackEvent',title,op,desc,'','']);},});var J=navigator.userAgent.toLowerCase();M.browser={version:(J.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/)||[0,"0"])[1],safari:/webkit/.test(J),opera:/opera/.test(J),msie:/msie/.test(J)&&!/opera/.test(J),mozilla:/mozilla/.test(J)&&!/(compatible|webkit)/.test(J)};M.extend(M,{isReady:false,readyList:[],pageArray:[],ready:function(a){if(a==undefined||a==null)return;if(M.isReady){a.call(document,this);}else{M.readyList.push(a);M.pageArray.push(a);}
return this;}});M.namespaces("M.Page","M.Data","M.Util","M.Controls","M.CONST");window.M=M;$(document).ready(function(){if(!M.isReady){M.isReady=true;if(M.readyList){for(var i=0;i<M.readyList.length;i++){var res=M.readyList[i].call(document,this);if(res&&res.init){res.init.call(res);}}}
M.readyList=null;$(document).triggerHandler("ready");}});M.CONST.Tag="tag";})();(function(a){var r=a.fn.domManip,d="_tmplitem",q=/^[^<]*(<[\w\W]+>)[^>]*$|\{\{\! /,b={},f={},e,p={key:0,data:{}},i=0,c=0,l=[];function g(g,d,h,e){var c={data:e||(e===0||e===false)?e:d?d.data:{},_wrap:d?d._wrap:null,tmpl:null,parent:d||null,nodes:[],calls:u,nest:w,wrap:x,html:v,update:t};g&&a.extend(c,g,{nodes:[],parent:d});if(h){c.tmpl=h;c._ctnt=c._ctnt||c.tmpl(a,c);c.key=++i;(l.length?f:b)[i]=c}return c}a.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(f,d){a.fn[f]=function(n){var g=[],i=a(n),k,h,m,l,j=this.length===1&&this[0].parentNode;e=b||{};if(j&&j.nodeType===11&&j.childNodes.length===1&&i.length===1){i[d](this[0]);g=this}else{for(h=0,m=i.length;h<m;h++){c=h;k=(h>0?this.clone(true):this).get();a(i[h])[d](k);g=g.concat(k)}c=0;g=this.pushStack(g,f,i.selector)}l=e;e=null;a.tmpl.complete(l);return g}});a.fn.extend({tmpl:function(d,c,b){return a.tmpl(this[0],d,c,b)},tmplItem:function(){return a.tmplItem(this[0])},template:function(b){return a.template(b,this[0])},domManip:function(d,m,k){if(d[0]&&a.isArray(d[0])){var g=a.makeArray(arguments),h=d[0],j=h.length,i=0,f;while(i<j&&!(f=a.data(h[i++],"tmplItem")));if(f&&c)g[2]=function(b){a.tmpl.afterManip(this,b,k)};r.apply(this,g)}else r.apply(this,arguments);c=0;!e&&a.tmpl.complete(b);return this}});a.extend({tmpl:function(d,h,e,c){var i,k=!c;if(k){c=p;d=a.template[d]||a.template(null,d);f={}}else if(!d){d=c.tmpl;b[c.key]=c;c.nodes=[];c.wrapped&&n(c,c.wrapped);return a(j(c,null,c.tmpl(a,c)))}if(!d)return[];if(typeof h==="function")h=h.call(c||{});e&&e.wrapped&&n(e,e.wrapped);i=a.isArray(h)?a.map(h,function(a){return a?g(e,c,d,a):null}):[g(e,c,d,h)];return k?a(j(c,null,i)):i},tmplItem:function(b){var c;if(b instanceof a)b=b[0];while(b&&b.nodeType===1&&!(c=a.data(b,"tmplItem"))&&(b=b.parentNode));return c||p},template:function(c,b){if(b){if(typeof b==="string")b=o(b);else if(b instanceof a)b=b[0]||{};if(b.nodeType)b=a.data(b,"tmpl")||a.data(b,"tmpl",o(b.innerHTML));return typeof c==="string"?(a.template[c]=b):b}return c?typeof c!=="string"?a.template(null,c):a.template[c]||a.template(null,q.test(c)?c:a(c)):null},encode:function(a){return(""+a).split("<").join("&lt;").split(">").join("&gt;").split('"').join("&#34;").split("'").join("&#39;")}});a.extend(a.tmpl,{tag:{tmpl:{_default:{$2:"null"},open:"if($notnull_1){__=__.concat($item.nest($1,$2));}"},wrap:{_default:{$2:"null"},open:"$item.calls(__,$1,$2);__=[];",close:"call=$item.calls();__=call._.concat($item.wrap(call,__));"},each:{_default:{$2:"$index, $value"},open:"if($notnull_1){$.each($1a,function($2){with(this){",close:"}});}"},"if":{open:"if(($notnull_1) && $1a){",close:"}"},"else":{_default:{$1:"true"},open:"}else if(($notnull_1) && $1a){"},html:{open:"if($notnull_1){__.push($1a);}"},"=":{_default:{$1:"$data"},open:"if($notnull_1){__.push($.encode($1a));}"},"!":{open:""}},complete:function(){b={}},afterManip:function(f,b,d){var e=b.nodeType===11?a.makeArray(b.childNodes):b.nodeType===1?[b]:[];d.call(f,b);m(e);c++}});function j(e,g,f){var b,c=f?a.map(f,function(a){return typeof a==="string"?e.key?a.replace(/(<\w+)(?=[\s>])(?![^>]*_tmplitem)([^>]*)/g,"$1 "+d+'="'+e.key+'" $2'):a:j(a,e,a._ctnt)}):e;if(g)return c;c=c.join("");c.replace(/^\s*([^<\s][^<]*)?(<[\w\W]+>)([^>]*[^>\s])?\s*$/,function(f,c,e,d){b=a(e).get();m(b);if(c)b=k(c).concat(b);if(d)b=b.concat(k(d))});return b?b:k(c)}function k(c){var b=document.createElement("div");b.innerHTML=c;return a.makeArray(b.childNodes)}function o(b){return new Function("jQuery","$item","var $=jQuery,call,__=[],$data=$item.data;with($data){__.push('"+a.trim(b).replace(/([\\'])/g,"\\$1").replace(/[\r\t\n]/g," ").replace(/\$\{([^\}]*)\}/g,"{{= $1}}").replace(/\{\{(\/?)(\w+|.)(?:\(((?:[^\}]|\}(?!\}))*?)?\))?(?:\s+(.*?)?)?(\(((?:[^\}]|\}(?!\}))*?)\))?\s*\}\}/g,function(m,l,k,g,b,c,d){var j=a.tmpl.tag[k],i,e,f;if(!j)throw"Unknown template tag: "+k;i=j._default||[];if(c&&!/\w$/.test(b)){b+=c;c=""}if(b){b=h(b);d=d?","+h(d)+")":c?")":"";e=c?b.indexOf(".")>-1?b+h(c):"("+b+").call($item"+d:b;f=c?e:"(typeof("+b+")==='function'?("+b+").call($item):("+b+"))"}else f=e=i.$1||"null";g=h(g);return"');"+j[l?"close":"open"].split("$notnull_1").join(b?"typeof("+b+")!=='undefined' && ("+b+")!=null":"true").split("$1a").join(f).split("$1").join(e).split("$2").join(g||i.$2||"")+"__.push('"})+"');}return __;")}function n(c,b){c._wrap=j(c,true,a.isArray(b)?b:[q.test(b)?b:a(b).html()]).join("")}function h(a){return a?a.replace(/\\'/g,"'").replace(/\\\\/g,"\\"):null}function s(b){var a=document.createElement("div");a.appendChild(b.cloneNode(true));return a.innerHTML}function m(o){var n="_"+c,k,j,l={},e,p,h;for(e=0,p=o.length;e<p;e++){if((k=o[e]).nodeType!==1)continue;j=k.getElementsByTagName("*");for(h=j.length-1;h>=0;h--)m(j[h]);m(k)}function m(j){var p,h=j,k,e,m;if(m=j.getAttribute(d)){while(h.parentNode&&(h=h.parentNode).nodeType===1&&!(p=h.getAttribute(d)));if(p!==m){h=h.parentNode?h.nodeType===11?0:h.getAttribute(d)||0:0;if(!(e=b[m])){e=f[m];e=g(e,b[h]||f[h]);e.key=++i;b[i]=e}c&&o(m)}j.removeAttribute(d)}else if(c&&(e=a.data(j,"tmplItem"))){o(e.key);b[e.key]=e;h=a.data(j.parentNode,"tmplItem");h=h?h.key:0}if(e){k=e;while(k&&k.key!=h){k.nodes.push(j);k=k.parent}delete e._ctnt;delete e._wrap;a.data(j,"tmplItem",e)}function o(a){a=a+n;e=l[a]=l[a]||g(e,b[e.parent.key+n]||e.parent)}}}function u(a,d,c,b){if(!a)return l.pop();l.push({_:a,tmpl:d,item:this,data:c,options:b})}function w(d,c,b){return a.tmpl(a.template(d),c,b,this)}function x(b,d){var c=b.options||{};c.wrapped=d;return a.tmpl(a.template(b.tmpl),b.data,c,b.item)}function v(d,c){var b=this._wrap;return a.map(a(a.isArray(b)?b.join(""):b).filter(d||"*"),function(a){return c?a.innerText||a.textContent:a.outerHTML||s(a)})}function t(){var b=this.nodes;a.tmpl(null,null,null,this).insertBefore(b[0]);a(b).remove()}})(jQuery);(function($,document,undefined){var pluses=/\+/g;function raw(s){return s;}
function decoded(s){return decodeURIComponent(s.replace(pluses,' '));}
var config=$.cookie=function(key,value,options){if(value!==undefined){options=$.extend({},config.defaults,options);if(value===null){options.expires=-1;}
if(typeof options.expires==='number'){var time=options.expires,t=options.expires=new Date();options.expires=new Date(options.expires.getTime()+time*1000).toUTCString();}
if(options.expires.toLowerCase()=="session"){if(M.browser.msie){options.expires="At the end of the Session";}
else{options.expires="Session";}}
value=config.json?$.stringifyJSON(value):String(value);return(document.cookie=[encodeURIComponent(key),'=',config.raw?value:encodeURIComponent(value),options.expires?'; expires='+options.expires:'',options.path?'; path='+options.path:'',options.domain?'; domain='+options.domain:'',options.secure?'; secure':''].join(''));}
var decode=config.raw?raw:decoded;var cookies=document.cookie.split('; ');for(var i=0,l=cookies.length;i<l;i++){var parts=cookies[i].split('=');if(decode(parts.shift())===key){var cookie=decode(parts.join('='));return config.json?$.parseJSON(cookie):cookie;}}
return null;};config.defaults={};$.removeCookie=function(key,options){if($.cookie(key)!==null){$.cookie(key,null,options);return true;}
return false;};})(jQuery,document);$.cookie.json=true;M.extend(M,{_secondDiff:0,setTime:function(time)
{var sms=time.getTime();var cms=new Date().getTime();var diff=sms-cms;this._secondDiff=diff;},getTime:function(){var cms=new Date().getTime();var sms=cms+this._secondDiff;var now=new Date(sms);return now;}});M.Controls.Popup=M.createClass();M.extend(M.Controls.Popup.prototype,{overlay:null,content:null,classes:{},popup:function(ele,classes,popupfinished){this.overlay=$('<div class="graylayer"></div>');this.content=ele;this.classes=classes;this.overlay.appendTo($(document.body));this.overlay.bind("click",this.overlay_click.toEventHandler(this));if(!M.isEmpty(classes)&&!M.isEmpty(classes.showclass))
{if(typeof(eval(classes.drag))!="function"){classes.drag=function(){};}
ele.show("fast",function(){ele.attr("class",classes.showclass);if(!M.isEmpty(popupfinished))
{popupfinished.call(popupfinished.context,null);}
if(classes.dragable)
{var oclass=ele.attr("class");ele.draggable({cancel:".noclass",handle:".modal-header",cursor:"move",drag:classes.drag,start:function(event,ui)
{var c1=$(this).attr("class");if(c1.indexOf("nofade")<0)
{var nclass=$(this).attr("class").replace(oclass,oclass+" nofade");$(this).attr("class",nclass).attr("preclass",oclass);}}});}}.toEventHandler(this));}},overlay_click:function()
{},close:function(animate)
{M.popupids[this.id]="";if(!M.isEmpty(this.classes)&&!M.isEmpty(this.classes.hideclass))
{this.content.attr("class",this.classes.hideclass);}
setTimeout(this.delayfun.toEventHandler(this),310);},delayfun:function(){if(!M.isEmpty(this.content))
{if(this.classes.dragable)
{this.content.removeAttr("style");}
this.content.hide();}
this.destroy();},destroy:function()
{if(!M.isEmpty(this.overlay))
{this.overlay.unbind("click");this.overlay.remove();}
this.overlay=null;this.content=null;this.classes=null;}});M.extend(M,{popups:new Array(),popupids:{},Popup:function(ele,classes,popupfinished){if(ele.length==0)return;var eleid=$(ele).attr("id");if(M.isEmpty(this.popupids[eleid]))
{var popup=new M.Controls.Popup();popup.id=eleid;if(classes.dragable==undefined||classes.dragable==null)
{classes.dragable=true;}
popup.popup(ele,classes,popupfinished);this.popups.push(popup);this.popupids[eleid]="1";}},ClosePopup:function()
{if(!M.isEmpty(this.popups))
{var len=this.popups.length;for(var i=0;i<len;i++)
{var t=this.popups.pop();this.popupids[t.id]="";t.close();}}},CloseLast:function()
{if(!M.isEmpty(this.popups))
{var t=this.popups.pop();this.popupids[t.id]="";t.close();}}});M.Controls.DropdownList=M.createClass();M.extend(M.Controls.DropdownList.prototype,{options:{disable:false,optionwidth:null,optionheight:null,optiontpl:'<div tag="option" value="${value}"><a tag="option" value="${value}" href="javascript:;">${name}</a></div>',optionaddtpl:'<div tag="addoption"><input class="txt" type="text" setplaceholder  placeholder="新增项目" value="新增项目"><input tag="add" class="btn" type="button" value="+"></li>'},status:0,listdom:null,valele:null,optionsele:null,onchange:null,onselect:null,onadd:null,afteradd:null,delay2hide:null,init:function(ele,onchange,options){if(!M.isEmpty(options)){this.options=$.extend({},this.options,options);}
this.delay2hide=null;this.listdom=$(ele);this.onchange=onchange;this.listdom.attr("tag","dropdownlist")
this.valele=this.listdom.children("span");this.valele.attr('tag','value');this.optionsele=this.listdom.children("div");this.optionsele.children("div").find("div[tag!='addoption']").attr("tag",'option').children("a").attr("tag","option");this.initvalue();},initvalue:function()
{var valObj=this._getvalfromoption(this.optionsele.children().children("div:first"));this.listdom.unbind("click");this.listdom.bind("click",this.onclick.toEventHandler(this));this.listdom.each(function(){var value=$(this).attr("value");var tpl=$(this);if(!M.isEmpty(value)){var list=tpl.children("div").find("div[tag=option]");var name='';list.each(function(){var val=$(this).attr("value");if(val==value){name=$(this).children("a").text();}});if(M.isEmpty(name)){var firsttpl=tpl.children("div").find("div[tag=option]:first");name=firsttpl.children("a").text();value=firsttpl.attr("value");}
tpl.children("span").attr("value",value).html(name);}else{var firsttpl=tpl.children("div").find("div[tag=option]:first");name=firsttpl.children("a").text();value=firsttpl.attr("value");tpl.children("span").attr("value",value).html(name);}});},create:function()
{},onclick:function(e){if(this.options.disable==true){return;}
var selft=M.EventEle(e).attr("tag");if(selft=="value"){var ele=M.EventEle(e);var showstatus=ele.parents("div[tag=dropdownlist]").children("div").css("display");if(showstatus!='none'){ele.parents("div[tag=dropdownlist]").children("div").hide();return;}}
if(selft=="dropdownlist"){var ele=M.EventEle(e);var showstatus=ele.children("div").css("display");if(showstatus!='none'){ele.children("div").hide();return;}}
if(selft!="dropdownlist"){var ele=M.EventEle(e).parent();}else{var ele=M.EventEle(e);}
var t=ele.attr("tag");clearTimeout(this.delay2hide);if(t=="dropdownlist"){ele.parents("form").children().find(".droplist_on").removeClass("droplist_on").children("div").hide();ele.addClass("droplist_on");var test=ele.children("span").attr("value");this._setselected(test);if(ele.children("span").attr("optionlength")==0){return;}}
if(t=="value"||t=="dropdownlist")
{this._toggle(ele);}
else if(t=="option")
{var disabled=ele.attr("disabled");if(!M.isEmpty(disabled)&&disabled=="disabled"){return;}
this._setvalele(ele);var valObj=this._getvalfromoption(ele);var oval=this._getval();if(oval!=valObj.value){this._setval(valObj);if(!M.isEmpty(this.onchange))
{this.onchange.call(this,ele);}}
this.listdom.removeClass("droplist_on");this._hide();}
else if(t=="add")
{if(!M.isEmpty(this.onadd))
{this.onadd.call(this,valObj.value);}}},onmouseover:function(e){this.status=0;},onmouseout:function(e)
{var ele=M.EventEle(e);this.status=1;this.delay2hide=setTimeout(function(){if(this.status==1){this._hide();this.status=0;}}.toEventHandler(this),3000);},val:function(val)
{if(M.isEmpty(val))
{return this._getval();}
else
{this._setval(val);}},valAdd:function(val)
{var ele=this.optionsele.children("div[tag=addoptoin]").find("input[type=text]");if(M.isEmpty(val))
{ele.val(val);}
else
{return M.getVal(ele);}},bindsource:function(source,field)
{if(M.isEmpty(field))
{field={"vlaue":"value","name":"name"};}
this._clearoptions();var tmpsource=[];if(!M.isEmpty(source))
{for(var i=0;i<source.length;i++)
{var it=source[i];tmpsource.push({"value":it[field.value],"name":it[field.name]});}}
var eles=$.tmpl(this.options.optiontpl,tmpsource);this._addoptionsele(eles);this.initvalue();},addoption:function(optionObj)
{this._addoptionsele($.tmpl(this.options.optiontpl,optionObj));},_setvalele:function(ele){this.valele=ele.parents("div[tag=dropdownlist]").children("span");this.optionsele=ele.parents("div[tag=dropdownlist]").children("div");},_create:function(){},_hasaddoption:function()
{var ele=this.optionsele.children("div[tag=addoptoin]");return ele.length>0;},_addoptionsele:function(ele)
{if(this._hasaddoption())
{ele.insertBefore(this.optionsele.children("div[tag=addoptoin]"));}
else
{this.optionsele.append(ele);}},_setselected:function(value){var list=this.optionsele.children("div").children();var name='';list.each(function(){var val=$(this).attr("value");if(val==value){name=$(this).children("a").text();$(this).children("a").addClass("on");}else{$(this).children("a").removeClass("on");}});return name;},_getvalfromoption:function(ele){var v=ele.attr("value");var t=ele.text();if(M.isEmpty(v))
{v=ele.children("a").attr("value");}
v=M.isEmpty(v)?"":v;return{"value":v,"name":t};},_getval:function()
{var v=this.valele.attr("value");return M.isEmpty(v)?"":v;},_setval:function(valObj)
{this.valele.attr("value",valObj.value);var name=this._setselected(valObj.value);this.valele.text(name);},_toggle:function(ele)
{var status=ele.children("div").css("display");ele.children("div").toggle();if(status=="none"){var optionheight=30;var value=ele.children("span").attr("value");var maxheight=ele.children("div").children("div").css("max-height").replace("px","");if(M.isEmpty(maxheight)){maxheight=ele.children("div").css("max-height").replace("px","");ele.children("div").scrollTop(0);}
if(!M.isEmpty(maxheight)&&!M.isEmpty(value)){ele.children("div").children("div").scrollTop(0);var endtop=ele.find("div[tag=option][value="+value+"]").offset().top;var starttop=ele.children("div").children("div").offset().top;var rangeheight=ele.children("div").children("div").height();var prangheight=ele.children("div").height();if(rangeheight>prangheight){rangeheight=prangheight;}
var mheight=endtop-starttop+30;if(mheight>=rangeheight){var scrollheight=mheight-maxheight+100;if(scrollheight<0){scrollheight=0;}
ele.children("div").children("div").scrollTop(scrollheight);}}}},_show:function(){this.optionsele.show();},_hide:function()
{this.optionsele.hide();},_clearoptions:function(){this.optionsele.children("div").remove();},clear:function(){},setdisable:function(value){this.options.disable=value;},destroy:function()
{}});M.extend(M,{DropdownList:function(ele,onchange,options){var droplist=new M.Controls.DropdownList();droplist.init(ele,onchange,options);return droplist;}});M.Controls.H5=M.createClass();M.extend(M.Controls.H5.prototype,{tpl:'<div style="display:none;" id="h5_ui_message" class="g-pop">'
+'<div class="mask"></div>'
+'<div class="ui_messageBox">'
+'<div class="content" tag="msg">操作失败</div>'
+'<div style="display:none;" tag="op" class="op">'
+' <a class="btn" href="javascript:;" tag="confirm">是</a>'
+'<a class="btn" href="javascript:;" tag="cancle">否</a>'
+' </div>'
+'<div class="op op-1" tag="close">'
+'<a class="btn btn-primary" href="javascript:void(0);" tag="confirm">知道了</a>'
+'</div>'
+'</div>'
+'</div>',uimessage_init:function(msg){$(document.body).append(this.tpl);var ui_messageBox=$("#h5_ui_message");ui_messageBox.show().find("div[tag=msg]").html(msg);return ui_messageBox;},success:function(msg){var ui_messageBox=this.uimessage_init(msg);ui_messageBox.find("a[tag=confirm]").bind("click",this.closeMessage);},error:function(msg){var ui_messageBox=this.uimessage_init(msg);ui_messageBox.find("a[tag=confirm]").bind("click",this.closeMessage);},confirmmessage:function(msg,confirm_func,domsg){var ui_messageBox=this.uimessage_init(msg);if(typeof(eval(confirm_func))=="function"){ui_messageBox.find("a[tag=confirm]").bind("click",confirm_func);}else{ui_messageBox.find("a[tag=confirm]").bind("click",this.closeMessage);}},confirm:function(confirm_func,cancle_func,msg){var ui_messageBox=this.uimessage_init(msg);ui_messageBox.find("div[tag=op]").show();ui_messageBox.find("div[tag=close]").hide();ui_messageBox.find("div[tag=op]").children("a[tag=confirm]").bind("click",confirm_func);ui_messageBox.find("div[tag=op]").children("a[tag=cancle]").bind("click",cancle_func);},closeMessage:function(){$("#h5_ui_message").remove();}});M.H5=new M.Controls.H5();M.extend(M,{success_tpl:'<div id="ui_message_auto" class="ui_messageBox ui_mb_tiny fade ui_mb_success" style="display:none;"><div class="content" tag="msg"><i class="icon_success"></i><span class="t16"></span></div></div>',error_tpl:'<div id="ui_message_auto" class="ui_messageBox ui_mb_tiny fade ui_mb_error" style="display:none;"><div class="content" tag="msg"><span class="t16"></span></div></div>',layer_tpl:'<div id="lightgraylayer" class="graylayer lightgraylayer" style="display:none"></div>',confirm_tpl:'<div id="ui_message" class="ui_messageBox fade in ui_mb_success" style="display:none;"><div class="content" tag="msg"></div><div class="mt20">'
+'<a href="javascript:;" class="mr20 btn btn-primary" tag="confirm">确认</a><a href="javascript:;" tag="cancle" class="btn">取消</a></div></div>',confirmmessage_tpl:'<div id="ui_message" class="ui_messageBox fade in ui_mb_success" style="display:none;"><div class="content" tag="msg"></div><div class="mt20">'
+'<a href="javascript:;" tag="confirm" class="btn">确认</a></div></div>',getVal:function(ele){if(ele.val()==ele.attr("placeholder"))
{return"";}
return ele.val();},emptyVal:function(ele)
{$(ele).val($(ele).attr("placeholder"));},getDroplistVal:function(ele){return ele.children("span").attr("value");},uimessage_init:function(layer_tpl,message_tpl,msg){$(document.body).append(layer_tpl);$(document.body).append(message_tpl);var ui_messageBox=$("#ui_message");var transparentlayer=$("#lightgraylayer");if(!M.isEmpty(msg))
ui_messageBox.children("div[tag=msg]").html(msg);marginLeft=-ui_messageBox.outerWidth()/2;ui_messageBox.css("margin-left",marginLeft);ui_messageBox.show();transparentlayer.show();ui_messageBox.addClass('in');return ui_messageBox;},uimessage_init_automatic:function(message_tpl,msg){$(document.body).append(message_tpl);var ui_messageBox=$("#ui_message_auto");var transparentlayer=$("#lightgraylayer");if(!M.isEmpty(msg))
ui_messageBox.children("div[tag=msg]").children('span').html(msg);marginLeft=-ui_messageBox.outerWidth()/2;ui_messageBox.css("margin-left",marginLeft);ui_messageBox.show();ui_messageBox.addClass('in');return ui_messageBox;},win_resize:function(ui_messageBox){var marginLeft=-ui_messageBox.outerWidth()/2;ui_messageBox.css("margin-left",marginLeft);},strfilter:function(str){var filterRule=/[0-9a-zA-Z\u4e00-\u9fa5_]/g;var newstr='';if(!M.isEmpty(str)){var judge=str.match(filterRule);if(!M.isEmpty(judge)){newstr=judge.join('');}}
return newstr;},getstrlength:function(str){var realLength=0,len=str.length,charCode=-1;for(var i=0;i<len;i++){charCode=str.charCodeAt(i);if(charCode>=0&&charCode<=128)realLength+=1;else realLength+=2;}
return realLength;},success:function(msg){var ui_messageBox=this.uimessage_init_automatic(this.success_tpl,msg);setTimeout(this.closeMessageAuto,2000);},error:function(msg){var ui_messageBox=this.uimessage_init_automatic(this.error_tpl,msg);setTimeout(this.closeMessageAuto,2000);},confirmmessage:function(msg,confirm_func,domsg){var ui_messageBox=this.uimessage_init(this.layer_tpl,this.confirmmessage_tpl);ui_messageBox.children("div[tag=msg]").html(msg);if(M.isEmpty(domsg)){domsg="确定";}
ui_messageBox.children("div").children("a[tag=confirm]").html(domsg);if(typeof(eval(confirm_func))=="function"){ui_messageBox.children("div").children("a[tag=confirm]").bind("click",confirm_func);}else{ui_messageBox.children("div").children("a[tag=confirm]").bind("click",this.closeMessage);}
this.win_resize(ui_messageBox);},confirm:function(msg,confirm_func,cancle_func,domsg,canclemsg){var ui_messageBox=this.uimessage_init(this.layer_tpl,this.confirm_tpl);ui_messageBox.children("div[tag=msg]").html(msg);if(M.isEmpty(domsg)){domsg="确定";}
if(M.isEmpty(canclemsg)){canclemsg="取消";}
if(M.isEmpty(canclemsg)||M.isEmpty(domsg)){msg+='？';}
ui_messageBox.children("div").children("a[tag=confirm]").html(domsg);ui_messageBox.children("div").children("a[tag=cancle]").html(canclemsg);ui_messageBox.children("div").children("a[tag=confirm]").bind("click",confirm_func);ui_messageBox.children("div").children("a[tag=cancle]").bind("click",cancle_func);},closeMessage:function(){var ui_messageBox=$("#ui_message");var transparentlayer=$("#lightgraylayer");ui_messageBox.hide("3000",function(){ui_messageBox.removeClass('in');transparentlayer.hide();});transparentlayer.hide("1000",function(){ui_messageBox.hide();});ui_messageBox.remove();transparentlayer.remove();},closeMessageAuto:function(){var ui_messageBox=$("#ui_message_auto");var transparentlayer=$("#lightgraylayer");ui_messageBox.hide("3000",function(){ui_messageBox.removeClass('in');transparentlayer.hide();});transparentlayer.hide("1000",function(){ui_messageBox.hide();});ui_messageBox.remove();transparentlayer.remove();}});function on_blur()
{if($(this).val()=="")
{$(this).val($(this).attr("placeholder"));}}
function on_focus()
{if($(this).val()==$(this).attr("placeholder"))
{$(this).val("");}}
function on_ready(ele)
{if(M.isEmpty($(ele).val()))
{$(ele).val($(ele).attr("placeholder"));}}
M.Controls.Ga=new M.createClass();M.extend(M.Controls.Ga.prototype,{init:function(){$('body').bind("click",this.body_click.toEventHandler(this));$('body').find('input[ga=input]').bind("focus",this.focusin.toEventHandler(this));},body_click:function(e){var ele=M.EventEle(e);this.ga(ele);},focusin:function(e){var ele=M.EventEle(e);this.ga(ele);},ga:function(ele){var gastatus=ele.attr("ga");var gname=ele.attr("gname");if(M.isEmpty(gastatus)||M.isEmpty(gname)){return;}
var cate='';if(gname.indexOf('order_')>=0){var formtpl=ele.parents("div[tag=popform]");var action=$("#ordercell").attr("action");if(action=='add'){gname=gname.replace('order_','预定_');cate='预定';}else if(action=='edit'){gname=gname.replace('order_','修改_');cate='修改';}else{gname=gname.replace('order_','补录_');cate='补录';}}else{if(gname.indexOf('_')>=0){var cate_arr=gname.split('_');cate=cate_arr[0];}else{cate='none';}}
var ga=window[window['GoogleAnalyticsObject']||'ga'];if(ga){ga('send','event',cate,'click',gname,1);}}});$(document).ready(function(){$("input[type=text][setplaceholder]").blur(on_blur);$("input[type=text][setplaceholder]").focus(on_focus);$("textarea[setplaceholder]").blur(on_blur);$("textarea[setplaceholder]").focus(on_focus);$("input[type=text][setplaceholder]").each(function(){on_ready($(this));});$("textarea[setplaceholder]").each(function(){on_ready($(this));});var tool=$('#header .tool a')
var tool_active=$('#header .tool .active')
tool.bind('mouseover',function(){if($(this).hasClass('active'))
{}
else
{$(this).addClass('hover')
tool_active.removeClass('hover')}});tool.bind('mouseout',function(){$(this).removeClass('hover')
tool_active.addClass('hover')});$("a[tag=closebtn]").click(function(){M.CloseLast();M.stopevent();}.toEventHandler(this));var Gas=new M.Controls.Ga();Gas.init();$(".main-user").hover(function(){$(this).children('p').show();},function(){$(this).children('p').hide();});$(".main-user").click(function(){location.href='/Logout'});$('body').keydown(function(event){switch(event.keyCode){case 27:M.CloseLast();break;}});});