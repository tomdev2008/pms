M.Page.ContactPage=M.createClass();M.extend(M.Page.ContactPage.prototype,{context:{},submittext:"处理中...",tpl:'<tr cid="${id}"><td tag="name">${name}</td>'
+'<td tag="mobile">${mobile}</td><td tag="remark">${remark}</td>'
+'<td><a href="javascript:;" class="mr10" tag="sendmessage">发送短信</a><a href="javascript:;" class="mr10" tag="edit">修改</a><a href="javascript:;" tag="delete">删除</a></td>'
+'</tr>',init:function(){this.initDOM();this.initEvent();},initDOM:function(){this.context.username=$("#username");this.context.usermobile=$("#usermobile");this.context.remark=$("#remark");this.context.addcontact=$("#addcontact");this.context.contactlist=$("#contactlist");this.context.contactform=$("#contactform");this.context.tpl_hidden=$("#tpl_hidden");this.context.button_click=$("#button_click");this.context.pagelist=$("#pagelist");this.context.page=$("#page");this.context.msgform=$("#msgform");this.context.leftwords=$("#leftwords");this.context.msg_hidden=$("#msg_hidden");this.context.msgtpl=$("#msgtpl");this.context.msg=$("#msg");this.context.msgrole=$("#msgrole");this.context.nocontacts=$("#nocontacts");this.context.hidden_page=$("#hidden_page");this.context.submform=$("#submform");this.context.sendrole=$("#sendrole");},initEvent:function(){this.context.addcontact.bind("click",this._addcontact.toEventHandler(this))
this.context.contactlist.bind("click",this.contactlist_click.toEventHandler(this));this.context.pagelist.bind("click",this.pagelist_click.toEventHandler(this));this.context.contactform.bind("click",this.contactform_click.toEventHandler(this));this.context.msgform.bind("click",this.msgform_click.toEventHandler(this));this.context.msgtpl.bind("change",this.msgtpl_change.toEventHandler(this));this.context.msg.bind("keyup",this.msg_keydown.toEventHandler(this));this.context.msg.bind("blur",this.msg_keydown.toEventHandler(this));this.context.sendrole.bind("click",this.sendrole_click.toEventHandler(this));},sendrole_click:function(){M.Popup(this.context.msgrole,{"hideclass":"bootbox modal view fade","showclass":"bootbox modal view fade in"});},msgtpl_change:function()
{var tplid=this.context.msgtpl.val();var tpl=this.context.msgtpl.parent().find("input[type=hidden][tplid="+tplid+"]").val();this.context.msgform.children(".modal-body").find(".cntlist").children("li[tag=msg]").children("textarea").val(tpl);this.msg_keydown();},msg_keydown:function(e)
{var msg=M.getVal(this.context.msg);var len=msg.length;var maxlen=parseInt(this.context.leftwords.attr("val"));this.context.leftwords.html(len);},_addcontact:function(){this._clearform();this.context.contactform.children("div").children("h4").text("添加联系人");this.context.button_click.attr("tag","addsave");this.context.button_click.text("确认添加");M.Popup(this.context.contactform,{"hideclass":"bootbox modal view fade","showclass":"bootbox modal view fade in"},function(){this.context.username.focus();}.toEventHandler(this));},contactform_click:function(e){var ele=M.EventEle(e);var t=ele.attr("tag");if(t=='addsave'){this.addcontact();}
if(t=='editsave'){this.editcontactsave(ele);}},editcontactsave:function(ele){var name=M.getVal(this.context.username);var mobile=M.getVal(this.context.usermobile);var remark=M.getVal(this.context.remark);var id=this.context.tpl_hidden.attr("cid");if(M.isEmpty(name)){alert("用户名不能为空");return;}
if(M.isEmpty(mobile)){alert("手机号不能为空");return;}
var reg=/^([0-9]{11})?$/;if(reg.test(mobile)==false){alert("手机号不合法");return;}
M._getjson("/ShortMessage/contactsoperate",{"act":"edit","id":id,"name":name,"mobile":mobile,"remark":remark},this.contacteditsave_finished.toEventHandler(this));},contacteditsave_finished:function(d){if(d.status=='success'){var tpl=this.context.contactlist.children("tr[cid="+d.req.id+"]");tpl.children("td[tag=name]").text(d.req.name);tpl.children("td[tag=mobile]").text(d.req.mobile);tpl.children("td[tag=remark]").text(d.req.remark);}else{if(!M.isEmpty(d.msg))
{alert(d.msg);}}
this._closepopup();},contactlist_click:function(e){var ele=M.EventEle(e);var t=ele.attr("tag");if(t=='delete'){this.deletecontact(ele);}
if(t=='edit'){this.editcontact(ele);}
if(t=='sendmessage'){this.sendmsg(ele);}},sendmsg:function(ele)
{var gname="";var phone="";var roomname="";var cityname="";var tpl=ele.parents("tr");var phone=tpl.children("td[tag=mobile]").text();if(M.isEmpty(phone))return;var gname=tpl.children("td[tag=name]").text();var header=this.context.msgform.children(".modal-header").children("h4").html("发送短信给："+gname);this.context.msg_hidden.attr("guestname",gname).attr("phone",phone);var cntlist=this.context.msgform.children(".modal-body").find(".cntlist");var phoneele=cntlist.children("li[tag=phone]");var tmpl=cntlist.children("li[tag=tmpl]");phoneele.find("span[tag=phone]").html(phone);phoneele.find("span[tag=hisinfo]:first").attr("title","").tooltip({position:{my:"left top+5",at:"left bottom"}});tmpl.find("span[tag=info]:first").tooltip({position:{my:"left top+5",at:"left bottom"}});this.context.leftwords.html(0);M._getjson("/ShortMessage/checksendrecord",{"phone":phone},this.msghis_finished.toEventHandler(this),"get");M.Popup(this.context.msgform,{"hideclass":"bootbox modal view fade","showclass":"bootbox modal view fade in"},function(){}.toEventHandler(this));},msghis_finished:function(d)
{if(d.status=="success")
{var cntlist=this.context.msgform.children(".modal-body").find(".cntlist");var phoneele=cntlist.children("li[tag=phone]");phoneele.find("span[tag=hisinfo]").attr("title",d.record);}},msgform_click:function(e)
{var ele=M.EventEle(e);var t=ele.attr("tag");if(t=="send")
{this.savemsg();}
if(t=="msgrole")
{M.Popup(this.context.msgrole,{"hideclass":"bootbox modal view fade","showclass":"bootbox modal view fade in"});}},savemsg:function()
{var phone=this.context.msg_hidden.attr("phone");var guestname=this.context.msg_hidden.attr("guestname");var roomname=this.context.msg_hidden.attr("roomname");var cntlist=this.context.msgform.children(".modal-body").find(".cntlist");var msgfield=cntlist.children("li[tag=msg]").children("textarea");var msg=M.getVal(msgfield);if(M.isEmpty(msg))
{alert("短信内容不能为空");return;}
var innid=this.context.msg_hidden.attr("innid");var data={"len":"1","msg":msg,"innid":innid,"p1":phone,"n1":guestname};var btn=cntlist.children("li[tag=save]").children("a[tag=send]");if(!this.req_before(btn)){return;}
M._getjson("/ShortMessage/sendSMS",data,this.sendmsg_finished.toEventHandler(this),"get");},req_before:function(btn)
{var busy=btn.attr("busy");if(busy=="1")
{this.reqbusy();return false;}
btn.html(this.submittext).attr("busy","1");btn.attr("class",btn.attr("tempclass")+" disabled");return true;},req_end:function(btn)
{btn.html(btn.attr("text")).attr("busy","");btn.attr("class",btn.attr("tempclass"));},sendmsg_finished:function(d)
{if(d.status=="success")
{M.success(d.senddesc);this._closepopup();}
else
{if(!M.isEmpty(d.msg))
{alert(d.msg);}}
var cntlist=this.context.msgform.children(".modal-body").find(".cntlist");var btn=cntlist.children("li[tag=save]").children("a[tag=send]");this.req_end(btn);},editcontact:function(ele){var tpl=ele.parents("tr");var id=tpl.attr("cid");var name=tpl.children("td[tag=name]").text();var mobile=tpl.children("td[tag=mobile]").text();var remark=tpl.children("td[tag=remark]").text();this._clearform();this.context.contactform.children("div").children("h4").text("编辑联系人");this.context.button_click.attr("tag","editsave");this.context.button_click.text("保存");this.context.tpl_hidden.attr("cid",id);this.context.username.val(name);this.context.usermobile.val(mobile);this.context.remark.val(remark);M.Popup(this.context.contactform,{"hideclass":"bootbox modal view fade","showclass":"bootbox modal view fade in"},function(){this.context.username.focus();}.toEventHandler(this));},addcontact:function(){var name=M.getVal(this.context.username);var mobile=M.getVal(this.context.usermobile);var remark=M.getVal(this.context.remark);if(M.isEmpty(name)){alert("用户名不能为空");return;}
if(M.isEmpty(mobile)){alert("手机号不能为空");return;}
var reg=/^([0-9]{11})?$/;if(reg.test(mobile)==false){alert("手机号不合法");return;}
M._getjson("/ShortMessage/contactsoperate",{"act":"add","name":name,"mobile":mobile,"remark":remark},this.contactsave_finished.toEventHandler(this));},contactsave_finished:function(d){if(d.status=="success"){var tpl=this.tpl;var tplele=$.tmpl(tpl,d.data);this.context.contactlist.parent().parent().show();this.context.nocontacts.hide();tplele.insertAfter(this.context.contactlist.children("tr[tag=head]"));}else
{if(!M.isEmpty(d.msg))
{alert(d.msg);}}
this._closepopup();},deletecontact:function(ele){var test=confirm("确认删除吗");if(!test)return;var tpl=ele.parents("tr");var id=tpl.attr("cid");M._getjson("/ShortMessage/contactsoperate",{"act":"del","id":id},this.delcontact_finished.toEventHandler(this));},delcontact_finished:function(d){if(d.status=="success")
{this.context.contactlist.children("tr[cid="+d.req.id+"]").remove();if(this.context.contactlist.children("tr[cid]").length==0)
{this.context.contactlist.parent().parent().hide();this.context.nocontacts.show();}}
else
{if(!M.isEmpty(d.msg))
{alert(d.msg);}}},pagelist_click:function(e)
{var ele=M.EventEle(e);var t=ele.attr("tag");if(t=="page")
{var newp=ele.attr("p");if(M.isEmpty(newp))
{return;}
var p=parseInt(newp);this.context.hidden_page.val(p);this.context.submform.submit();}},searchbtn_click:function(e)
{document.forms[0].submit();},_clearform:function(){M.emptyVal(this.context.username);M.emptyVal(this.context.usermobile);M.emptyVal(this.context.remark);},NoUndefined:function(str)
{return M.isEmpty(str)?"":str;},_closepopup:function()
{M.ClosePopup();},destroy:function(){}});M.ready(function(){var contact=new M.Page.ContactPage();return contact;});