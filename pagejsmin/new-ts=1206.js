﻿M.Page.NewPage=M.createClass();M.extend(M.Page.NewPage.prototype,{context:{},autopop:false,poped:false,ready:false,init:function(){this.initDOM();this.initEvent();this.ready=true;if(this.autopop&&!this.poped)
{this.pop();M._getjson("/book/newfuncshow",{"op":"newfuncdis"},this.newfundisplay_finished.toEventHandler(this));}},initDOM:function(){this.context.newFunctionRemind=$("#newFunctionRemind");this.context.newFunctionRemindPop=$("#newFunctionRemindPop");this.context.deepgraylayer=$("#deepgraylayer");this.context.newfuncele=$('#newfunc');this.context.newfuncele1=$('#newfunc1');this.context.newfunctiontip=$("#newfunctiontip");this.context.new_funclist=$("#new_funclist");this.context.func_tip=$("#func_tip");this.context.funclist=$("#funclist");this.context.newfunc_miotgong=$("#newfunc_miotgong");this.context.chargeinfopop=$("#chargeinfopop");},initEvent:function(){this.context.newfunctiontip.bind("click",this.show_newfunc.toEventHandler(this));this.context.chargeinfopop.bind("click",this.chargeinfopop_click.toEventHandler(this));this.context.func_tip.bind("click",this.show_funclist.toEventHandler(this));this.context.new_funclist.children(".msgPop-close").bind("click",this.close_funclist.toEventHandler(this));this.context.funclist.bind("click",this.funclist_click.toEventHandler(this));this.context.newfuncele.bind("click",this.newfuncele_click.toEventHandler(this));this.context.newFunctionRemind.bind("click",this.newFunctionRemind_click.toEventHandler(this));},newFunctionRemind_click:function(e){var src=this.context.newFunctionRemind.attr('data-src');var href=this.context.newFunctionRemind.attr('data-href');if(src){this.context.newFunctionRemindPop.find('img[tag=pic]').attr('src',src);M.Popup(this.context.newFunctionRemindPop,{"hideclass":"modal fade","showclass":"modal fade in","dragable":false},function(){}.toEventHandler(this));}else if(href){window.open(href);}
return true;},newfuncele_click:function(e)
{var ele=M.EventEle(e);var tag=ele.attr("tag");if(tag=="closebtn")
{var nredirect=ele.attr("needredirect");if(nredirect==1){var t=ele.attr("url");location.href=t;}}
if(tag=="knowbtn")
{if(ele.attr("disabled")){return false;}
M._getjson("/book/newfuncshow",{"op":"newfuncdis"},this.newfundisplay_finished.toEventHandler(this));}},funclist_click:function(e){var ele=M.EventEle(e);var img=ele.attr("imgid");if(M.isEmpty(img)){var target=ele.parents("a");img=target.attr("imgid");}else{var target=ele;}
var bdisplay=target.attr("bdisplay");var classvalue=target.attr("class");var t=target.attr("tag");if(t=='points'){window.open('/Public/integral');return;}
if(classvalue=="more"){return;}
if(M.isEmpty(img)){return;}
var tpl_img=this.context.newfuncele.find("img");tpl_img.attr("src","/pic/"+img);if(t=="setfeature"){this.context.newfuncele.find('div[tag=href]').show();this.context.newfuncele.find('div[tag=btn]').hide();}else{this.context.newfuncele.find('div[tag=href]').hide();this.context.newfuncele.find('div[tag=btn]').show();}
if(t=='miotgongju'){M.Popup(this.context.newfunc_miotgong,{"hideclass":"modal fade","showclass":"modal fade in","dragable":false},function(){}.toEventHandler(this));}else{M.Popup(this.context.newfuncele,{"hideclass":"modal fade","showclass":"modal fade in","dragable":false},function(){}.toEventHandler(this));}},show_funclist:function(){var ele=this.context.new_funclist;ele.css("display","block");ele.css("opacity","100");},close_funclist:function(){var ele=this.context.new_funclist;ele.css("display","none");ele.css("opacity","0");},chargeinfopop_click:function(e){var ele=M.EventEle(e);var t=ele.attr('tag');if(t=='knowbtn'){M._getjson("/book/newfuncshow",{"op":"newfuncdis"},this.newfundisplay_finished.toEventHandler(this));}},show_newfunc:function(e){var ele=M.EventEle(e);ele.parent().css("display","none");M.Popup(this.context.newfuncele,{"hideclass":"modal fade","showclass":"modal fade in","dragable":false},function(){}.toEventHandler(this));M.stopevent(e);M._getjson("/book/newfuncshow",{"op":"newfuncdis"},this.newfundisplay_finished.toEventHandler(this));},pop:function()
{this.poped=true;if(this.context.newfuncele.attr('autodisplay')==0)
{M.Popup(this.context.newfuncele,{"hideclass":"modal fade","showclass":"modal fade in","dragable":false},function(){}.toEventHandler(this));}
if(this.context.newfunc_miotgong.attr('autodisplay')==0)
{M.Popup(this.context.newfunc_miotgong,{"hideclass":"modal fade","showclass":"modal fade in","dragable":false},function(){}.toEventHandler(this));}
if(this.context.newfuncele1.attr('autodisplay')==0)
{this.context.newfuncele1.show();}},_settime:function(val){var that=this;if(val==0){this.context.chargeinfopop.find("a[t=knowbtnbtn]").attr('tag','knowbtn').addClass('btn-primary').removeAttr("disabled");$("#timer").text("");}else{$("#timer").text(val+'S');val--;setTimeout(function(){that._settime(val)},1000);}},newfundisplay_finished:function(d)
{},doredirect:function()
{},NoUndefined:function(str)
{return M.isEmpty(str)?"":str;},_closepopup:function()
{M.ClosePopup();},destroy:function(){}});