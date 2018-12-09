function calcRebate(){var totalrebate=0;var percentage=$("#rebate_input").val();if(isNaN(percentage)||percentage>100||percentage<0){alert('佣金比例格式不正确.');return;}
$(".orders_wrapper").each(function(index,ele){var total=$(ele).find(".total").text();var rebate=(total*percentage)/100;totalrebate+=rebate;$(ele).find(".rebate").text(rebate.toFixed(2));});$("#total_rebate").text(totalrebate.toFixed(2));$.getJSON("/Report/reportresell",{"setrebate":percentage});}
$(document).ready(function(){calcRebate();$("#innid, #orderstatus_select").change(function(){document.forms[0].submit();return;});});M.Page.ReportPage=M.createClass();M.extend(M.Page.ReportPage.prototype,{context:{},init:function(arg){this.initDOM();this.initEvent();},initDOM:function(){this.context.startdate=$("#startdate");this.context.enddate=$("#enddate");this.context.searchbtn=$("#searchbtn");this.context.hidden_page=$("#hidden_page");this.context.pagelist=$("#pagelist");this.context.hidden_str=$("#hidden_str");this.context.rebate_btn=$("#rebate_btn");this.context.rebate_input=$("#rebate_input");this.context.startdate.datepicker({showOtherMonths:true,selectOtherMonths:true});this.context.enddate.datepicker({showOtherMonths:true,selectOtherMonths:true});},initEvent:function(){this.context.pagelist.bind("click",this.pagelist_click.toEventHandler(this));this.context.searchbtn.bind("click",this.search_click.toEventHandler(this));this.context.rebate_btn.bind("click",this.rebate_click.toEventHandler(this));this.context.rebate_input.bind("focus",this.rebate_focus.toEventHandler(this));},search_click:function(e)
{document.forms[0].submit();},rebate_click:function(e)
{calcRebate();this.context.rebate_btn.css("display","none");},rebate_focus:function(e)
{this.context.rebate_btn.css("display","");},pagelist_click:function(e)
{var ele=M.EventEle(e);var t=ele.attr("tag");if(t=="page")
{var newp=ele.attr("p");if(M.isEmpty(newp))
{return;}
var p=parseInt(newp);this.context.hidden_page.val(p);document.forms[0].submit();}},NoUndefined:function(str)
{return M.isEmpty(str)?"":str;},_closepopup:function()
{this.context.inn_overlay.hide();this.context.innform.hide();},destroy:function(){}});