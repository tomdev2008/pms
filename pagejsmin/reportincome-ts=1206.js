M.Page.ReportIncome=M.createClass();M.extend(M.Page.ReportIncome.prototype,{context:{},droplist:{},dropdownliststa:{"innidlist":null},submittext:"处理中...",selectuidstatus:"",selectincomestatus:"",selectpaytypetatus:"",init:function(){this.initDOM();this.initEvent();this.getpaytypestatus();this._initexporturl();},initDOM:function(){this.context.fromdate=$("#fromdate");this.context.enddate=$("#enddate");this.context.dateval=$("#dateval");this.context.datevallist=$("#datevallist");this.context.reloadbtn=$("#reloadbtn");this.context.daterange=$("#daterange");this.context.daylist=$("#daylist");this.context.datelist=$("#datelist");this.context.pagelist=$("#pagelist");this.context.pagelist1=$("#pagelist1");this.context.incomelist=$("#incomelist");this.context.dayincomelist=$("#dayincomelist");this.context.innid=$("#innid");this.context.hide_innid=$("#hide_innid");this.context.date=$("#date");this.context.filtercreator=$("#filtercreator");this.context.filtercreator2=$("#filtercreator2");this.context.filterpaytype=$("#filterpaytype");this.context.paytypelist=$("#paytypelist");this.context.paytype=$("#paytype");this.context.otherlist=$("#otherlist");this.context.daily_toggle=$("#daily_toggle");this.context.daily_toshow=$("#daily_toshow");this.context.room_toggle=$("#room_toggle");this.context.room_toshow=$("#room_toshow");this.context.exportwaterdetail=$("#exportwaterdetail");this.context.body=$(document.body);this.context.fromdate.datepicker('destroy');this.context.enddate.datepicker('destroy');this.context.fromdate.datetimepicker({timeFormat:"HH:mm",dateFormat:"yy-mm-dd"});this.context.enddate.datetimepicker({timeFormat:"HH:mm",dateFormat:"yy-mm-dd"});this.context.datevallist.addClass('box-full');this.context.incomelist.find("div[tag=payitemlist]").find("input[tag=option]").attr("checked","checked").attr("selectstatus","1");},initEvent:function(){this.context.reloadbtn.bind("click",this.reloadbtn_click.toEventHandler(this));this.context.daterange.bind("click",this.daterange_click.toEventHandler(this));this.context.pagelist.bind("click",this.pagelist_click.toEventHandler(this));this.context.pagelist1.bind("click",this.pagelist1_click.toEventHandler(this));this.context.incomelist.bind("click",this.incomelist_click.toEventHandler(this));this.context.innid.bind("change",this.inn_change.toEventHandler(this));this.context.body.bind("click",this.document_click.toEventHandler(this));this.context.dateval.bind("focus",this.dateval_focus.toEventHandler(this));this.context.paytypelist.bind("click",this.paytypelist_click.toEventHandler(this));this.context.datelist.bind("change",this.datelist_change.toEventHandler(this));this.context.daily_toggle.bind("click",this.daily_toggle_click.toEventHandler(this));this.context.room_toggle.bind("click",this.room_toggle_click.toEventHandler(this));},getpaytypestatus:function(){var selected_paytype_list="";this.context.otherlist.find("input[type=checkbox]:checked").each(function(){selected_paytype_list+=$(this).attr('code')+",";});this.selectpaytypetatus=selected_paytype_list;},datelist_change:function(e){document.forms[0].submit();},document_click:function(e){var ele=M.EventEle(e);var style=ele.attr("tag");if(style!='dropdownlist'&&style!='other'){var tpl=ele.parents("th[tag=filter]");var hf=ele.parents("div[tag=filter]");var of=ele.parents('.ip-dropdown');if(tpl.length+hf.length+of.length==0){this.context.body.children().find(".ip-dropdown[type=dropdownlist]:visible").hide();}
var tpl=ele.parents("th[tag=payitem]");if(tpl.length==0&&style!='payitem'){this.context.incomelist.find("div[tag=payitemlist]").hide();}
tpl=ele.parents("th[tag=th_date]");var df=ele.parents(".ui-datepicker-header");var df1=ele.parents(".ui-datepicker-calendar");var df2=ele.parents(".ui-timepicker-div");var df3=ele.parents(".ui-datepicker-buttonpane");var df4=ele.hasClass("ui-datepicker");if(tpl.length==0&&df.length==0&&df1.length==0&&df2.length==0&&df3.length==0&&df4==false){this.context.incomelist.find("div[tag=dateselect]").children('div').hide();}}},daily_toggle_click:function(e)
{var ele=M.EventEle(e);var t=ele.attr("tag");var target=null;if(t=="daily_toggle")
{target=ele.parent().children("a[tag=daily_toggle]");}
if(t=="daily_i")
{target=ele.parent("a[tag=daily_toggle]");}
if(!M.isEmpty(target))
{this.context.daily_toggle.hide();this.context.daily_toshow.slideDown("slow");}},room_toggle_click:function(e)
{var ele=M.EventEle(e);var t=ele.attr("tag");var target=null;if(t=="room_toggle")
{target=ele.parent().children("a[tag=room_toggle]");}
if(t=="room_i")
{target=ele.parent("a[tag=room_toggle]");}
if(!M.isEmpty(target))
{this.context.room_toggle.hide();this.context.room_toshow.slideDown("slow");}},inn_change:function(e)
{document.forms[0].submit();},paytypelist_click:function(e){var ele=M.EventEle(e);var t=ele.attr("tag");var mainitem=null;var mainitemall=null;if(t=="paytype")
{mainitem=ele.parents("li[tag=paytypeitem]");}
else if(t=='paytypeitem'){mainitem=ele;}
else if(t=='paytypeall'){mainitemall=ele.parents("li[tag=paytypeitemall]");}
else if(t=='paytypeitemall'){mainitemall=ele;}
if(t=="paytypeall"||t=="paytypeitemall"){var all=$("#all").attr("class");if(all=="checked"){return false;}}
if(t=='other'){var showstatus=this.context.otherlist.css("display");this.context.otherlist.toggle();if(showstatus=="none"){var paytypelist_obj=this.context.otherlist.children("div").children("div");this._handlepaytypestatus(paytypelist_obj);}}
if(t=='paytypeitemother'||!M.isEmpty(mainitem)||!M.isEmpty(mainitemall)){if(!M.isEmpty(mainitem)){var itemClass=mainitem.attr("class");if(!M.isEmpty(itemClass)){mainitem.removeClass('checked');$("#all").removeClass('checked');}
else{mainitem.addClass('checked');$("#all").removeClass('checked');}}
if(!M.isEmpty(mainitemall)){var itemClassall=mainitemall.attr("class");if(!M.isEmpty(itemClassall)){mainitemall.parent().children().removeClass('checked');}
else{mainitemall.parent().children().removeClass('checked');mainitemall.addClass('checked');this.context.otherlist.find("input[type=checkbox]:checked").attr("checked",false);}}
if(t=='paytypeitemother'){var check=this.context.otherlist.find("input[type=checkbox]:checked");if(check.length>0){$("#all").removeClass('checked');}}
if(t=='paytypeitemother'){var selected_paytype_list="";this.context.otherlist.find("input[type=checkbox]:checked").each(function(){selected_paytype_list+=$(this).attr('code')+",";});this.selectpaytypetatus=selected_paytype_list;this.context.otherlist.hide();}
var selectedPayType='';this.context.paytypelist.children(".checked").each(function(){selectedPayType+=$(this).attr('code')+",";var i=0;});this.context.otherlist.find("input[type=checkbox]:checked").each(function(){selectedPayType+=$(this).attr('code')+",";});if(!M.isEmpty(selectedPayType)){selectedPayType=selectedPayType.substr(0,selectedPayType.length-1);}
this.context.paytype.val(selectedPayType);var innid=this.context.innid.attr("value");this.context.hide_innid.val(innid);var date=this.context.datelist.attr("value");this.context.date.val(date);document.forms[0].submit();}},_getselectPayType:function(e){var selectedPayType='';this.context.paytypelist.find("li.checked").each(function(){selectedPayType+=$(this).attr('code')+",";var i=0;});this.context.paytypelist.find("li[tag=other]").find("input:checked").each(function(){selectedPayType+=$(this).attr('code')+",";});if(!M.isEmpty(selectedPayType)){selectedPayType=selectedPayType.substr(0,selectedPayType.length-1);}
return selectedPayType;},reloadbtn_click:function(e){document.forms[0].submit();},dateval_focus:function(e){this.context.datevallist.show();},daterange_click:function(e){var ele=M.EventEle(e);var t=ele.attr("tag");if(t=="showlist"||t=="filter")
{M.stopevent(e);this.context.daylist.show();}
if(t=="date")
{var d=ele.attr("d");var innid=this.context.innid.val();if(ele.attr("class")!="on"){location.href="/reportincome.php?innid="+innid+"&date="+d;}
else
{this.context.daylist.hide();}}},incomelist_click:function(e)
{var ele=M.EventEle(e);var t=ele.attr("tag");var target=null;var target2=null;switch(t){case'value':target=ele.parent().children(".filter");break;case'filterarrow':target=ele.parent(".filter");break;case'filter':target=ele.children(".filter");break;case'value2':target2=ele.parent().children(".filter");break;case'filterarrow2':target2=ele.parent(".filter");break;case'filter2':target2=ele.children(".filter");break;case'confirm2':var selectedincome="";this.context.filtercreator2.find("input[type=checkbox]:checked").each(function(){selectedincome+=$(this).attr('val')+",";});if(M.isEmpty(selectedincome))
{alert("请您至少选择一个收款类型来筛选");return false;}
this.selectincomestatus=selectedincome;ele.parents(".ip-dropdown").hide();this.filterlist();break;case'confirm':var selecteduid="";this.context.filtercreator.find("input[type=checkbox]:checked").each(function(){selecteduid+=$(this).attr('val')+",";});if(M.isEmpty(selecteduid))
{alert("请您至少选择一个操作员来筛选");return false;}
this.selectuidstatus=selecteduid;ele.parents(".ip-dropdown").hide();this.filterlist();break;case'payitem':ele.parents("th[tag=payitem]").find("div[tag=payitemlist]").toggle();ele.parents("th[tag=payitem]").find("div[tag=payitemlist]").find("input[selectstatus=1]").attr("checked","checked");break;case'confirmpayitem':var target=ele.parents("th[tag=payitem]").find("div[tag=payitemlist]");var option=target.find("input:checked");if(option.length==0){alert("请您至少选择一个收款项目来筛选");return false;}
target.hide();target.find("input").attr("selectstatus","0");target.find("input:checked").attr("selectstatus","1");this.filterlist();break;case'oparatetoggle':var checked=ele.attr("checked");if(checked=="checked"){ele.parents("div[tag=filtercreator]").find("div[tag=filteruser]").find("input").attr("checked",checked);}else{ele.parents("div[tag=filtercreator]").find("div[tag=filteruser]").find("input").attr("checked",false);}
break;case'dateselect':this.dateselect_show(ele);break;case'confirmdate':this.confirmdate(ele);break;}
if(!M.isEmpty(target))
{var showstatus=target.children(".ip-dropdown").css("display");target.children(".ip-dropdown").toggle();if(showstatus=="none"){var uidlist=target.children(".ip-dropdown").children("div").children("div");this._handleuidstatus(uidlist);}}
if(!M.isEmpty(target2))
{var showstatus=target2.children(".ip-dropdown").css("display");target2.children(".ip-dropdown").toggle();if(showstatus=="none"){var incomestatuslist=target2.children(".ip-dropdown").children("div").children("div");this._handleincomestatus(incomestatuslist);}}},confirmdate:function(ele){var fromdate=ele.parent().children('input[name=fromdate]').val();var enddate=ele.parent().children('input[name=enddate]').val();var dateformat='入住日期（';dateformat+=M.timeformat(M.strtotime(fromdate),'m-d');dateformat+='至'+M.timeformat(M.strtotime(enddate),'m-d');dateformat+='）';ele.parents('th').attr('fromdate',fromdate);ele.parents('th').attr('enddate',enddate);if(M.isEmpty(fromdate)&&M.isEmpty(enddate)){ele.parents('th').find('span').html('入住日期');}else{ele.parents('th').find('span').html(dateformat);}
this.filterlist();ele.parent().hide();},_handleuidstatus:function(filterlist){var uidlist=this.selectuidstatus.split(",");if(this.selectuidstatus==''){filterlist.each(function(){$(this).children("label").children("input").attr("checked","checked");});}else{filterlist.each(function(){var value=$(this).children("label").children("input").attr("val");var has=0;for(var i=0;i<uidlist.length;i++){var l=uidlist[i];if(value==l){has=1;}}
if(has==1){$(this).children("label").children("input").attr("checked","checked");}else{$(this).children("label").children("input").attr("checked",false);$(this).children("label").children("input").attr("checked",false);}});}},_handleincomestatus:function(incomestatuslist){var uidlist=this.selectincomestatus.split(",");if(this.selectincomestatus==''){incomestatuslist.each(function(){$(this).children("label").children("input").attr("checked","checked");});}else{incomestatuslist.each(function(){var value=$(this).children("label").children("input").attr("val");var has=0;for(var i=0;i<uidlist.length;i++){var l=uidlist[i];if(value==l){has=1;}}
if(has==1){$(this).children("label").children("input").attr("checked","checked");}else{$(this).children("label").children("input").attr("checked",false);$(this).children("label").children("input").attr("checked",false);}});}},_handlepaytypestatus:function(paytypelist_obj){var pay_list=this.selectpaytypetatus.split(",");if(this.selectpaytypetatus==''){paytypelist_obj.each(function(){$(this).children("label").children("input").attr("checked",false);});}else{paytypelist_obj.each(function(){var value=$(this).children("label").children("input").attr("code");var has=0;for(var i=0;i<pay_list.length;i++){var l=pay_list[i];if(value==l){has=1;}}
if(has==1){$(this).children("label").children("input").attr("checked","checked");}else{$(this).children("label").children("input").attr("checked",false);$(this).children("label").children("input").attr("checked",false);}});}},dateselect_show:function(ele){var html_th=ele.parents('th');var fromdate=html_th.attr('fromdate');var enddate=html_th.attr('enddate');if(M.isEmpty(fromdate)||M.isEmpty(enddate)){fromdate=M.timeformat(this._getNewDate(M.getTime(),1));enddate=M.timeformat(this._getNewDate(M.getTime(),7));}
html_th.find('input[name=fromdate]').val(fromdate).datepicker({showOtherMonths:true,selectOtherMonths:true});html_th.find('input[name=enddate]').val(enddate).datepicker({showOtherMonths:true,selectOtherMonths:true});html_th.children('div').children('div').show();},_getNewDate:function(date,day){var now=new Date(date.getFullYear(),date.getMonth(),date.getDate()+day);return now;},_getcondition:function()
{var conditions={};this.context.incomelist.children('tbody').children("tr:first").children("th[tag=filter]").each(function(){var f=$(this).attr("field");var dlist=$(this).children(".filter");var selectval='';dlist.find("input[type=checkbox]:checked").each(function(){var value=$(this).attr("val");if(value=="all"){selectval='all';return false;}
selectval+=$(this).attr("val")+",";});if(selectval.length>0&&selectval!='all')
{selectval=selectval.substring(0,selectval.length-1);}
conditions[f]=selectval;});this.context.incomelist.children('tbody').children("tr:first").children("th[tag=filter2]").each(function(){var f=$(this).attr("field");var dlist=$(this).children(".filter");var selectval='';dlist.find("input[type=checkbox]:checked").each(function(){selectval+=$(this).attr("val")+",";});if(selectval.length>0)
{selectval=selectval.substring(0,selectval.length-1);}
conditions[f]=selectval;});var payitem=[];this.context.incomelist.find("div[tag=payitemlist]").find("input:checked").each(function(){var value=$(this).attr("val");payitem.push(value);});var fromdate=this.context.fromdate.val();var enddate=this.context.enddate.val();var innid=this.context.innid.val();var paytypes=this._getselectPayType();var html_firstTr=this.context.incomelist.children('tbody').children("tr:first");var checkin_fromdate=html_firstTr.children('th[tag=th_date]').attr('fromdate');var checkin_enddate=html_firstTr.children('th[tag=th_date]').attr('enddate');conditions['payitem']=payitem.toString();conditions['paytypes']=paytypes;conditions['fromdate']=fromdate;conditions['enddate']=enddate;conditions['innid']=innid;conditions['checkin_fromdate']=checkin_fromdate;conditions['checkin_enddate']=checkin_enddate;return conditions;},filterlist:function()
{var condition=this._getcondition();var paytypes=this._getselectPayType();condition["pageindex"]=1;this._changereporturl(condition);M._getjson("/Reportsource/getincomedata",condition,this.detaillist_finished.toEventHandler(this));},_initexporturl:function(){var condition=this._getcondition();condition["pageindex"]=1;this._changereporturl(condition);},_changereporturl:function(data){var href='/Reportsource/accountlistexport?fromdate='+data.fromdate+'&enddate='+data.enddate+'&opeater='+data.creator+"&paytype="+data.creator2
+'&paytypes='+data.paytypes+'&pageindex='+data.pageindex+'&payitem='+data.payitem;if(!M.isEmpty(data.checkin_fromdate)&&!M.isEmpty(data.checkin_enddate)){href+='&checkin_fromdate='+data.checkin_fromdate+'&checkin_enddate='+data.checkin_enddate;}
this.context.exportwaterdetail.attr("url",href);},pagelist_click:function(e)
{var ele=M.EventEle(e);var t=ele.attr("tag");if(t=="page")
{var p=ele.attr("p");if(!M.isEmpty(p)&&!isNaN(p)){var condition=this._getcondition();condition["pageindex"]=p;M._getjson("/Reportsource/getincomedata",condition,this.detaillist_finished.toEventHandler(this));}}},detaillist_finished:function(d)
{if(d.status=="success")
{var pagedata=d.pages;var detaillist=d.detaillist;var total=d.total;var html_list='';for(var i=0;i<detaillist.length;i++)
{var item=detaillist[i];html_list+="<tr tag='item' did='"+item.id+"'>";html_list+="<td>"+item.createondesc+"</td>";html_list+="<td>"+item.username+"</td>";html_list+="<td tag='orderdetail'><span>"+item.o_guestname+"</span><br/><span>"+item.o_phone+"</span></td>";html_list+="<td>"+item.o_checkindateformat+"</td>";html_list+="<td>"+item.o_channelname+"</td>";html_list+="<td>"+item.paytypename+"</td>";html_list+="<td>"+item.payitemname+"</td>";if(item.paytype==1){html_list+="<td>"+item.payitemtypename+"</td>";}
else
{html_list+="<td class='red'>"+item.payitemtypename+"</td>";}
if(item.paytype==1){html_list+="<td class='bg-total'>"+item.amountdesc+"</td>";}
else
{html_list+="<td class='red bg-total'>"+item.amountdesc+"</td>";}
html_list+="</tr>";}
this.context.incomelist.children("tbody").children("tr[tag=item]").remove();var totaltr=this.context.incomelist.children("tbody").children("tr[tag=total]");$(html_list).insertBefore(totaltr);totaltr.children("td[tag=total]").html(total);var prepage=pagedata.prepage;var nextpage=pagedata.nextpage;var pages=pagedata.pages;var pageindex=pagedata.pageindex;var html_pages='';html_pages+='<li><a p="'+prepage+'" tag="page" href="javascript:">&laquo;</a></li>';for(var i=0;i<pages.length;i++)
{var page=pages[i];if(page.code==pageindex)
{html_pages+='<li class="active"><a href="javascript:" title="">'+page.name+'</a></li>';}
else
{html_pages+='<li><a href="javascript:" tag="page" p="'+page.code+'" title="">'+page.name+'</a></li>';}}
html_pages+='<li><a href="javascript:" tag="page" p="'+nextpage+'">&raquo;</a></li>';this.context.pagelist.html(html_pages);}else{alert(d.msg);}},pagelist1_click:function(e)
{var ele=M.EventEle(e);var t=ele.attr("tag");if(t=="page")
{var p=ele.attr("p");if(!M.isEmpty(p)&&!isNaN(p)){var condition={};var fromdate=this.context.fromdate.val();var enddate=this.context.enddate.val();var innid=this.context.innid.val();var paytypes=this._getselectPayType();condition['fromdate']=fromdate;condition['enddate']=enddate;condition['innid']=innid;condition['paytypes']=paytypes;condition["pageindex"]=p;M._getjson("/Reportsource/getdayincome",condition,this.datdetaillist_finished.toEventHandler(this));}}},datdetaillist_finished:function(d)
{if(d.status=="success")
{var innid=d.req.innid;var pagedata=d.pages;var detaillist=d.detaillist;var tmpl=this.context.dayincomelist.children("tbody").children("tr[tag=tmpl]");var totalrow=this.context.dayincomelist.children("tbody").children("tr[tag=total]");this.context.dayincomelist.children("tbody").children("tr[tag=item]").remove();for(var i=0;i<detaillist.length;i++)
{var item=detaillist[i];var detail=item.detail;var total=item.total;var daterow=tmpl.clone().show().attr('tag','item');daterow.children('td[tag=date]').html(item.datedesc);daterow.children('td[tag=total]').html(total);if(!M.isEmpty(detail))
{for(ptype in detail)
{var v=detail[ptype];daterow.children('td[tag='+v.paytypecode+']').html(v.total);}
daterow.children('td[tag=detail]').html('<a href="/reportincome.php?innid='+innid+'&fromdate='+item.date+'&enddate='+item.date+'">查看明细</a>');}
daterow.insertBefore(totalrow);}
var prepage=pagedata.prepage;var nextpage=pagedata.nextpage;var pages=pagedata.pages;var pageindex=pagedata.pageindex;var html_pages='';html_pages+='<li><a p="'+prepage+'" tag="page" href="javascript:">&laquo;</a></li>';for(var i=0;i<pages.length;i++)
{var page=pages[i];if(page.code==pageindex)
{html_pages+='<li class="active"><a href="javascript:" title="">'+page.name+'</a></li>';}
else
{html_pages+='<li><a href="javascript:" tag="page" p="'+page.code+'" title="">'+page.name+'</a></li>';}}
html_pages+='<li><a href="javascript:" tag="page" p="'+nextpage+'">&raquo;</a></li>';this.context.pagelist1.html(html_pages);}},_closepopup:function()
{M.ClosePopup();},destroy:function(){}});M.ready(function(){page=new M.Page.ReportIncome();return page;});