M.Page.MessageSendPage=M.createClass();M.extend(M.Page.MessageSendPage.prototype,{context:{},submittext:"处理中...",init:function(){this.initDOM();this.initEvent();},initDOM:function(){this.context.innlist=$("#innlist");this.context.fromdate=$("#fromdate");this.context.enddate=$("#enddate");this.context.guestlist=$("#guestlist");this.context.msgtpl=$("#msgtpl");this.context.msg=$("#msg");this.context.leftwords=$("#leftwords");this.context.checkall=$("#checkall");this.context.sendbtn=$("#sendbtn");this.context.searchbtn=$("#searchbtn");this.context.msgrole=$("#msgrole");this.context.sendbox=$("#sendbox");this.context.fromdate.datepicker({showOtherMonths:true,selectOtherMonths:true});this.context.enddate.datepicker({showOtherMonths:true,selectOtherMonths:true});this.context.leftmsgdesc=$("#leftmsgdesc");this.context.senddesc=$("#senddesc");this.context.selectitemdesc=$("#selectitemdesc");this.context.selectdesc=$("#selectdesc");this.context.sendrole=$("#sendrole");this.context.whereselect=$("#whereselect");},initEvent:function(){this.context.msgtpl.bind("change",this.msgtpl_change.toEventHandler(this));this.context.guestlist.bind("click",this.guest_click.toEventHandler(this));this.context.guestlist.find('td[tag=checked]>input[type=checkbox]').bind("click",this.select_click.toEventHandler(this));this.context.guestlist.find('label[tag=selectall]>input[tag=checkalls]').bind("click",this.checkall_click.toEventHandler(this));this.context.sendbtn.bind("click",this.sendmsg_click.toEventHandler(this));this.context.searchbtn.bind("click",this.searchbtn_click.toEventHandler(this));this.context.sendbox.bind("click",this.sendbox_click.toEventHandler(this));this.context.sendbox.find('span[tag=info]:first').tooltip({position:{my:"left top+5",at:"left bottom"}});this.context.msg.bind("keyup",this.msg_keydown.toEventHandler(this));this.context.msg.bind("blur",this.msg_keydown.toEventHandler(this));this.context.sendrole.bind("click",this.sendrole_click.toEventHandler(this));this.context.whereselect.find('select[name=grade]').bind("change",this.grade_change.toEventHandler(this));},grade_change:function(e){this.searchbtn_click();},sendrole_click:function(){M.Popup(this.context.msgrole,{"hideclass":"bootbox modal view fade","showclass":"bootbox modal view fade in"});},select_click:function(e)
{var gradename=this._checkgrade();var len=this._calcselected();var alllen=this.context.guestlist.find('table[tag='+gradename+']').children("tbody").children("tr").find("td:first").find("input[type=checkbox]").length;if(len!=alllen){this.context.checkall.attr("checked",false);}},searchbtn_click:function(e)
{var hotelid=this.context.whereselect.find('select[name=hotelid]').val();var grade=this.context.whereselect.find('select[name=grade]').val();var url='/ShortMessage/messagesend?hotelid='+hotelid+'&grade='+grade;if(grade==2){var member=this.context.whereselect.find('select[name=member]').val();url+='&member='+member;}else{var status=this.context.whereselect.find('select[name=status]').val();var selectdatetype=this.context.whereselect.find('select[name=selectdatetype]').val();var fromdate=this.context.whereselect.find('input[name=fromdate]').val();var enddate=this.context.whereselect.find('input[name=enddate]').val();url+='&status='+status+'&selectdatetype='+selectdatetype+'&fromdate='+fromdate+'&enddate='+enddate;}
window.location=url;},msgtpl_change:function(e)
{var ele=M.EventEle(e);var t=ele.attr("tag");var tplid=$(ele).val();var tplcontent=ele.parent().children("input[type=hidden][tplid="+tplid+"]").val();this.context.msg.val(tplcontent);this.msg_keydown();},checkall_click:function(e)
{var ele=M.EventEle(e);var t=ele.attr("tag");var checked=ele.attr("checked");var ischeck=checked=="checked";var gradename=this._checkgrade();this.context.guestlist.find('table[tag='+gradename+']').find("input[type=checkbox]").each(function(){$(this).attr("checked",ischeck);});this._calcselected();},guest_click:function(e)
{var ele=M.EventEle(e);var t=ele.attr("tag");if(t!="item")
{ele=ele.parent();}
t=ele.attr("tag");if(t=="item")
{var checkInput=ele.children("td[tag=checked]").children("input[type=checkbox]");var checked=checkInput.attr("checked");if(t!="checked"){if(checked=="checked"||checked==true)
{checkInput.attr("checked",false);}
else
{checkInput.attr("checked",true);}}
M.stopevent(e);this._calcselected();}},_calcselected:function()
{var gradename=this._checkgrade();var len=this.context.guestlist.find('table[tag='+gradename+']').children("tbody").children("tr").find("td:first").find("input[type=checkbox]:checked").length;this.context.selectitemdesc.html(len);return len;},_checkgrade:function(){var grade=this.context.whereselect.find('select[name=grade]').val();var gradename='guestlist';if(grade==2){gradename='memberlist';}
return gradename},sendbox_click:function(e)
{var ele=M.EventEle(e);var t=ele.attr("tag");if(t=="sendrole")
{M.Popup(this.context.msgrole,{"hideclass":"bootbox modal view fade","showclass":"bootbox modal view fade in"});}},msg_keydown:function(e)
{var msg=M.getVal(this.context.msg);var len=msg.length;var maxlen=parseInt(this.context.leftwords.attr("val"));this.context.leftwords.html(len);var re_len=msg.replace(/[^\x00-\xff]/g,"**").length;var smscount=Math.ceil(re_len/2/63);smscount=smscount>7?7:smscount;this.context.leftwords.parent().children('b[tag=smscount]').html(smscount);},sendmsg_click:function(e)
{var msg=M.getVal(this.context.msg);if(M.isEmpty(msg))
{alert("短信内容不能为空");return;}
var innid=this.context.innlist.val();var len=0;var data={"act":"sendmsg","len":"0","msg":msg,"innid":innid};var gradename=this._checkgrade();if(gradename=='memberlist'){this.context.guestlist.find('table[tag='+gradename+']').children("tbody").children("tr").each(function(){var checked=$(this).children("td[tag=checked]").children("input[type=checkbox]").attr("checked");if(checked=="checked")
{len++;var guestname=$(this).children("td:eq(1)").text();var levelname=$(this).children("td:eq(2)").text();var phone=$(this).children("td:eq(3)").text();data["p"+len]=phone;data["n"+len]=guestname;data["inf"+len]=levelname;}});}else{this.context.guestlist.find('table[tag='+gradename+']').children("tbody").children("tr").each(function(){var checked=$(this).children("td[tag=checked]").children("input[type=checkbox]").attr("checked");if(checked=="checked")
{len++;var guestname=$(this).children("td:eq(1)").text();var phone=$(this).children("td:eq(2)").text();var inf=$(this).children("td:eq(3)").children("span[tag=roomname]").text();data["p"+len]=phone;data["n"+len]=guestname;data["inf"+len]=inf;}});}
data["len"]=len;if(len==0)
{alert("短信联系人不能为空");return;}
var btn=this.context.sendbtn;if(!this.req_before(btn)){return;}
M._getjson("/ShortMessage/sendmsg",data,this.sendmsg_finished.toEventHandler(this),"post");},sendmsg_finished:function(d)
{if(d.status=="success")
{var gradename=this._checkgrade();this.context.selectdesc.hide();if(gradename=='memberlist'){this._membertable(d,gradename);}else{this._guesttable(d,gradename);}
this.context.leftmsgdesc.html(d.leftdesc);this.context.senddesc.html(d.senddesc).show();M.success(d.senddesc);this._closepopup();}
else
{if(!M.isEmpty(d.msg))
{alert(d.msg);}}
var btn=this.context.sendbtn;this.req_end(btn);},_guesttable:function(d,gradename){var list=d.list;var len=list.length;var optime=d.optime;var statusname='发送中';var i=0;this.context.guestlist.find('table[tag='+gradename+']').hide().children("tbody").children("tr").each(function(){if(i==0)
{$(this).children("th:eq(0)").html("发送状态").appendTo($(this));$("<th>发送内容</th>").insertBefore($(this).children("th:eq(3)"));$(this).children("th:eq(4)").html("发送时间");$(this).children("th:eq(0)").attr("width","45");$(this).children("th:eq(1)").attr("width","100");$(this).children("th:eq(2)").attr("width","120");$(this).children("th:eq(4)").attr("width","110");$(this).children("th:eq(5)").attr("width","70");}
else
{var checkedtd=$(this).children("td:eq(0)");if(checkedtd.children("input[type=checkbox]").attr("checked")=="checked")
{checkedtd.html("").appendTo($(this));}
else
{$(this).remove();}
$("<td>"+d.req.msg+"</td>").insertBefore($(this).children("td:eq(3)"));$(this).children("td:eq(4)").html(optime);}
i++;});this.context.guestlist.find('table[tag='+gradename+']').show();i=0;this.context.guestlist.find('table[tag='+gradename+']').children("tbody").children("tr").each(function(){if(i==0)
{}
else
{var hs=false;for(var j=0;j<list.length;j++)
{if($(this).children("td:eq(1)").text().trim()==list[j])
{hs=true;break;}}
if(hs)
{$(this).children("td:eq(5)").html(statusname);}
else
{$(this).children("td:eq(5)").html("手机格式不正确");}}
i++;});},_membertable:function(d,gradename){var list=d.list;var len=list.length;var optime=d.optime;var statusname='发送中';var i=0;this.context.guestlist.find('table[tag='+gradename+']').hide().children("tbody").children("tr").each(function(){if(i==0)
{$(this).children("th:eq(0)").html("发送状态").appendTo($(this));$("<th>发送内容</th>").insertBefore($(this).children("th:eq(4)"));$(this).children("th:eq(5)").html("发送时间");$(this).children("th:eq(0)").attr("width","45");$(this).children("th:eq(1)").attr("width","100");$(this).children("th:eq(2)").attr("width","150");$(this).children("th:eq(3)").attr("width","100");$(this).children("th:eq(5)").attr("width","80");$(this).children("th:eq(6)").attr("width","80");}
else
{var checkedtd=$(this).children("td:eq(0)");if(checkedtd.children("input[type=checkbox]").attr("checked")=="checked")
{checkedtd.html("").appendTo($(this));}
else
{$(this).remove();}
$("<td>"+d.req.msg+"</td>").insertBefore($(this).children("td:eq(4)"));$(this).children("td:eq(5)").html(optime);}
i++;});this.context.guestlist.find('table[tag='+gradename+']').show();i=0;this.context.guestlist.find('table[tag='+gradename+']').children("tbody").children("tr").each(function(){if(i==0)
{}
else
{var hs=false;for(var j=0;j<list.length;j++)
{if($(this).children("td:eq(2)").text().trim()==list[j])
{hs=true;break;}}
if(hs)
{$(this).children("td:eq(6)").html(statusname);}
else
{$(this).children("td:eq(6)").html("手机格式不正确");}}
i++;});},close_click:function(e)
{this._closepopup();},tplform_click:function(e)
{var ele=M.EventEle(e);var t=ele.attr("tag");if(t=="save")
{this.tplform_save(ele);}},tpllist_click:function(e)
{var ele=M.EventEle(e);var t=ele.attr("tag");if(t=="add")
{this.addtpl();}
if(t=="edit")
{this.edittpl(ele);}
if(t=="delete")
{this.deltpl(ele);}},_clearform:function()
{this.context.tplname.val("");this.context.tplcontent.val("");this.context.tpl_hidden.attr("tplid","");},addtpl:function()
{this._clearform();this.context.tplform.children(".modal-header").find("h4").html("添加短信模版");this.context.tpl_hidden.attr("action","add");M.Popup(this.context.tplform,{"hideclass":"bootbox modal view fade","showclass":"bootbox modal view fade in"},function(){this.context.tplname.focus();}.toEventHandler(this));},deltpl:function(ele)
{var test=confirm("确认删除吗");if(!test)return;var tpl=ele.parents("li");var tplid=tpl.attr("tplid");M._getjson("/ajaxmsg.php",{"a":"deltpl","id":tplid},this.tpldel_finished.toEventHandler(this));},tpldel_finished:function(d)
{if(d.status=="success")
{this.context.tpllist.children("li[tplid="+d.req.id+"]").remove();}
else
{if(!M.isEmpty(d.msg))
{alert(d.msg);}}},reqbusy:function()
{alert("请求处理中，请稍后再试");},req_before:function(btn)
{var busy=btn.attr("busy");if(busy=="1")
{this.reqbusy();return false;}
btn.html(this.submittext).attr("busy","1");btn.attr("class",btn.attr("tempclass")+" disabled")
return true;},req_end:function(btn)
{btn.html(btn.attr("text")).attr("busy","");btn.attr("class",btn.attr("tempclass"));},NoUndefined:function(str)
{return M.isEmpty(str)?"":str;},_closepopup:function()
{M.CloseLast();},destroy:function(){}});var messageSend;M.ready(function(){messageSend=new M.Page.MessageSendPage();return messageSend;});