M.Page.LogPage=M.createClass();M.extend(M.Page.LogPage.prototype,{context:{},init:function(arg){this.initDOM();this.initEvent();},initDOM:function(){this.context.fromdate=$("#fromdate");this.context.enddate=$("#enddate");this.context.searchbtn=$("#searchbtn");this.context.hidden_page=$("#hidden_page");this.context.pagelist=$("#pagelist");this.context.hidden_str=$("#hidden_str");this.context.selectuserid=$("#selectuserid");this.context.selectuserid.val(this.context.hidden_str.val());this.context.fromdate.datepicker({showOtherMonths:true,selectOtherMonths:true});this.context.enddate.datepicker({showOtherMonths:true,selectOtherMonths:true});},initEvent:function(){this.context.pagelist.bind("click",this.pagelist_click.toEventHandler(this));this.context.searchbtn.bind("click",this.search_click.toEventHandler(this));},search_click:function(e)
{document.forms[0].submit();},pagelist_click:function(e)
{var ele=M.EventEle(e);var t=ele.attr("tag");if(t=="page")
{var newp=ele.attr("p");if(M.isEmpty(newp))
{return;}
var p=parseInt(newp);this.context.hidden_page.val(p);document.forms[0].submit();}},NoUndefined:function(str)
{return M.isEmpty(str)?"":str;},_closepopup:function()
{this.context.inn_overlay.hide();this.context.innform.hide();},destroy:function(){}});var page;M.ready(function(){page=new M.Page.LogPage();return page;});