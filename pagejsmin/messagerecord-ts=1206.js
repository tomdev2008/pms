﻿M.Page.MessageRecordPage=M.createClass();M.extend(M.Page.MessageRecordPage.prototype,{context:{},submittext:"处理中...",getTradingId:0,getTradingCode:0,init:function(){this.initDOM();this.initEvent();},initDOM:function(){this.context.fromdate=$("#fromdate");this.context.enddate=$("#enddate");this.context.searchbtn=$("#searchbtn");this.context.pagelist=$("#pagelist");this.context.page=$("#page");this.context.sendrole=$("#sendrole");this.context.msgrole=$("#msgrole");this.context.fromdate.datepicker({showOtherMonths:true,selectOtherMonths:true});this.context.enddate.datepicker({showOtherMonths:true,selectOtherMonths:true});},initEvent:function(){this.context.searchbtn.bind("click",this.searchbtn_click.toEventHandler(this));this.context.pagelist.bind("click",this.pagelist_click.toEventHandler(this));this.context.sendrole.bind("click",this.sendrole_click.toEventHandler(this));},sendrole_click:function(){M.Popup(this.context.msgrole,{"hideclass":"bootbox modal view fade","showclass":"bootbox modal view fade in"});},pagelist_click:function(e)
{var ele=M.EventEle(e);var t=ele.attr("tag");if(t=="page")
{var newp=ele.attr("p");if(M.isEmpty(newp))
{return;}
var p=parseInt(newp);this.context.page.val(p);this.searchbtn_click();}},searchbtn_click:function(e)
{document.forms[0].submit();},NoUndefined:function(str)
{return M.isEmpty(str)?"":str;},_closepopup:function()
{M.ClosePopup();},destroy:function(){}});var messageRecord;M.ready(function(){messageRecord=new M.Page.MessageRecordPage();return messageRecord;});