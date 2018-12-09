M.Page.AccountManagePage=M.createClass();M.extend(M.Page.AccountManagePage.prototype,{context:{},temp_interval:{},tpl_account:'<tr uid="${uid}" rc="${rolecode}" innid="${innid}">'
+'<td tag="username">${username}</td>'
+'<td tag="userid">${userid}</td>'
+'<td>${innname}</td>'
+'<td>'
+'<a tag="edit" href="#?">修改</a>&nbsp;'
+'<a tag="del" href="#?">删除</a>&nbsp;'
+'<a tag="editauth" href="#?">设置权限</a>'
+'</td>'
+'</tr>',init:function(){this.initDOM();this.initEvent();},initDOM:function(){this.context.userinfo=$("#userinfo");this.context.userinfotable=this.context.userinfo.children("table");this.context.editpassword=$("#editpassword");this.context.oldpass=$("#oldpass");this.context.newpass=$("#newpass");this.context.confirmnewpass=$("#confirmnewpass");this.context.innlist=$("#innlist");this.context.innform=$("#innform");this.context.f_innname=$("#f_innname");this.context.f_innshortname=$("#f_innshortname");this.context.f_cityname=$("#f_cityname");this.context.f_title=$("#f_title");this.context.f_savebtn=$("#f_savebtn");this.context.f_hiddencell=$("#f_hiddencell");this.context.waiterlist=$("#waiterlist");this.context.waiteraccount=$("#waiteraccount");this.context.u_userid=$("#u_userid");this.context.u_pass=$("#u_pass");this.context.u_confirmpass=$("#u_confirmpass");this.context.u_innlist=$("#u_innlist");this.context.u_username=$("#u_username");this.context.u_savebtn=$("#u_savebtn");this.context.u_title=$("#u_title");this.context.u_hiddencell=$("#u_hiddencell");this.context.u_form=$("#u_form");this.context.userfunc=$('#userfunc');this.context.uh_hidden=$("#uh_hidden");this.context.funcfields=$("#funcfields");},initEvent:function(){this.context.userinfo.bind("click",this.userinfo_click.toEventHandler(this));$(document).bind("click",this.document_click.toEventHandler(this));$("a[tag=closebtn]").click(this.close_click.toEventHandler(this));this.context.editpassword.bind("click",this.editpassword_click.toEventHandler(this));this.context.waiterlist.bind("click",this.waiterlist_click.toEventHandler(this));this.context.waiteraccount.bind("click",this.waiteraccount_click.toEventHandler(this));this.context.userfunc.bind("click",this.userfunc_click.toEventHandler(this));},document_click:function(e)
{var ele=M.EventEle(e);var t=ele.attr("tag");var name=ele.attr("name");if(t!="save"&&t!="value"&&t!='getverfiy'&&t!='savephone')
{this._userinfo_editfieldhide();}},_userinfo_editfieldhide:function()
{this.context.userinfo.children("table").children("tbody").children("tr[tag=editfield]").each(function(){$(this).hide();});this.context.userinfo.children("table").children("tbody").children("tr[tag=info]").each(function(){$(this).show();});},userinfo_click:function(e)
{var ele=M.EventEle(e);var t=ele.attr("tag");switch(t){case'edit':this._userinfo_editfieldhide();var par=ele.parents("tr");var field=par.attr("field");par.hide();var editfield=par.parent().children("tr[field="+field+"][tag=editfield]").show();var input=editfield.find("input[type=text]:first");input.val(input.attr("tempval"));M.stopevent(e);break;case'editphone':this._userinfo_editfieldhide();this.editPhoneFun();M.stopevent(e);break;case'save':this.saveinfofield(ele);M.stopevent(e);break;case'editpass':this.context.oldpass.val("");this.context.newpass.val("");this.context.confirmnewpass.val("");M.Popup(this.context.editpassword,{"hideclass":"bootbox modal sm fade","showclass":"bootbox modal sm fade in"},function(){this.context.oldpass.focus();}.toEventHandler(this));break;case'getverfiy':this.getVerfiyFun(ele);break;case'savephone':this.savePhoneFun();break;default:break;}},savePhoneFun:function(){var phone=this.context.userinfo.find('tr[data-type=phone_input]').find('input[name=phone]').val();var verfiycode=this.context.userinfo.find('tr[data-type=phone_verfiy]').find('input[name=verfiycode]').val();if(M.isEmpty(verfiycode)){alert('验证码为空');return false;}
M._getjson('/account/phonechange',{'phone':phone,'verfiycode':verfiycode},this.savePhoneFun_callback.toEventHandler(this));},savePhoneFun_callback:function(d){if(d.status=='success'){var data=d.data;this.context.userinfo.find('tr[data-type=phone_input]').hide();this.context.userinfo.find('tr[data-type=phone_verfiy]').hide();this.context.userinfo.find('tr[data-type=phone]').show().find('td[name=phone]').html(data.phone);this.cancelSecondsCountdown();}else{alert(d.msg);}},getVerfiyFun:function(ele){var phone=ele.parent().parent().find('input').val();if(M.isEmpty(phone)){alert('手机号不能为空');return false;}
M._getjson('/account/getverfiy',{'phone':phone},this.getVerfiyFun_callback.toEventHandler(this));return true;},getVerfiyFun_callback:function(d){if(d.status=='success'){this.secondsCountdown();}else{alert(d.msg);}
return true;},cancelSecondsCountdown:function(){var target=this.context.userinfo.find('a[tag=nogetverfiy]');target.attr('tag','getverfiy').html('获取验证码');clearInterval(this.temp_interval);},secondsCountdown:function(){var target=this.context.userinfo.find('a[tag=getverfiy]');var countdown=60;var _this=this;target.attr('tag','nogetverfiy').html(countdown+"秒后可重发");this.temp_interval=setInterval(function(){countdown--;if(countdown<=0){target.attr('tag','getverfiy').html('获取验证码');clearInterval(_this.temp_interval);}else{target.html(countdown+"秒后可重发");}},1000);},editPhoneFun:function(){this.context.userinfo.find('tr[data-type=phone]').hide();if(this.context.userinfo.find('tr[data-type=phone_input]').find('a[tag=getverfiy]').length>=1){this.context.userinfo.find('tr[data-type*=phone_]').show().find('input').val('');this.context.userinfo.find('tr[data-type=phone_verfiy]').show().find('input').val('');}else{this.context.userinfo.find('tr[data-type*=phone_]').show();this.context.userinfo.find('tr[data-type=phone_verfiy]').show();}
return true;},editpassword_click:function(e)
{var ele=M.EventEle(e);var t=ele.attr("tag");if(t=="editpass")
{this.savepass(ele);}},waiterlist_click:function(e)
{var ele=M.EventEle(e);var t=ele.attr("tag");if(t=="add")
{this.addwaiter(ele);}
if(t=="edit")
{this.editwaiter(ele);}
if(t=="del")
{this.delwaiter(ele);}
if(t=="editauth")
{this.edituserfunc(ele);}},waiteraccount_click:function(e)
{var ele=M.EventEle(e);var t=ele.attr("tag");if(t=="save")
{this.savewaiter(ele);}},userfunc_click:function(e)
{var ele=M.EventEle(e);var t=ele.attr("tag");if(t=="inn")
{var ischecked=ele.attr("checked");if(ischecked=="checked"||ischecked==true)
{var innid=ele.parents('div[tag=innfield]').attr("innid");this.context.funcfields.children().children("ul[for="+innid+"]").children("li[tag=fun][isdef=1]").find('input[type=checkbox]').attr("checked",true);}
else
{ele.parents('div[tag=innfield]').next().find('input[type=checkbox]').attr("checked",false);}}
if(t=="func")
{var ischecked=ele.attr("checked");var inns=ele.parents("ul[tag=funlist]");if(ischecked=="checked"||ischecked==true)
{var innid=inns.attr("for");this.context.funcfields.children("div[tag=innfield][innid="+innid+"]").find("input[type=checkbox]").attr("checked",true);this.context.funcfields.children().children("ul[for="+innid+"]").find("li[tag=fun][isdef=1]").find('input[type=checkbox]').attr("checked","checked");var name=ele.attr("name");if(name=="orderadd"||name=="orderdelete"||name=="ordercheckinandout"||name=="orderaccountedit"){inns.find('input[type=checkbox][name=orderview]').attr("checked",true);}
if(name=="orderaccountedit"){inns.find('input[type=checkbox][name=orderview]').attr("checked",true);inns.find('input[type=checkbox][name=orderadd]').attr("checked",true);}
if(name=="messagecontacts"){inns.find('input[type=checkbox][name=messagevisit]').attr("checked",true);}
if(name=="consumevisit"||name=='consumevisitdeledit'){var plginon=this.context.uh_hidden.attr("consumeplugin");if(plginon!="1")
{alert("需在个性化功能中打开记一笔");}}
if(name=='consumevisitdeledit'){inns.find('input[type=checkbox][name=consumevisit]').attr("checked",true);}}else{var name=ele.attr("name");if(name=="orderview"){inns.find('input[type=checkbox][name=orderadd]').attr("checked",false);inns.find('input[type=checkbox][name=orderdelete]').attr("checked",false);inns.find('input[type=checkbox][name=ordercheckinandout]').attr("checked",false);inns.find('input[type=checkbox][name=orderaccountedit]').attr("checked",false);}
if(name=="messagevisit"){inns.find('input[type=checkbox][name=messagecontacts]').attr("checked",false);}
if(name=='consumevisit'){inns.find('input[type=checkbox][name=consumevisitdeledit]').attr("checked",false);}}}
if(t=="save")
{this.savefunc();}},close_click:function(e)
{this._closepopup();},saveinfofield:function(ele)
{var tr=ele.parents("tr");var field=tr.attr("field");var val=tr.find("input:first").val();if(M.isEmpty(val))
{if(field=='userid'){alert("帐号不能为空");return;}else if(field=='username'){alert("联系人不能为空");return;}}
var data={"field":field,"value":val};M._getjson("/Account/infosave",data,this.infosave_finished.toEventHandler(this));},infosave_finished:function(d)
{if(d.status=="success")
{M.success('保存成功');var tbody=this.context.userinfotable.children("tbody");var infotr=tbody.children("tr[field="+d.req.field+"][tag=info]");var edittr=tbody.children("tr[field="+d.req.field+"][tag=editfield]");edittr.find("input:first").val(d.req.value).attr("tempval",d.req.value);edittr.hide();infotr.children("td[tag=inf]").html(d.d);infotr.show();}
else
{alert(d.msg);}},savepass:function(ele)
{var oldpass=this.context.oldpass.val().trim();var newpass=this.context.newpass.val().trim();var confirmpass=this.context.confirmnewpass.val().trim();if(M.isEmpty(oldpass))
{alert('原密码不能为空');return;}
if(M.isEmpty(newpass))
{alert('新密码不能为空');return;}
if(newpass.length<6)
{alert('新密码不能少于6位');return;}
if(M.isEmpty(confirmpass))
{alert("确认密码不能为空");return;}
if(newpass!=confirmpass)
{alert("确认密码和新密码输入不一致");return;}
var data={"oldpass":oldpass,"newpass":newpass,"confirmpass":confirmpass};M._getjson("/Account/savepass/",data,this.savepass_finished.toEventHandler(this));},savepass_finished:function(d)
{this.context.oldpass.val("");this.context.newpass.val("");this.context.confirmnewpass.val("");if(d.status=="success")
{alert("修改成功，请重新登录");this._closepopup();window.location.href="/Login/index";}
else
{alert(d.msg);}},_clearwaiterform:function()
{M.emptyVal(this.context.u_userid);this.context.u_pass.val("");this.context.u_confirmpass.val("");this.context.u_username.val("");this.context.u_form.children('li[tag=editfun]').hide();this.context.u_hiddencell.attr("uid","").attr("action","");this.context.u_form.children("li[tag=role]").children("input[type=radio][name=role]").attr("checked",false);},_clearuserfunc:function()
{this.context.uh_hidden.val('');var innfields=this.context.funcfields.children("div[tag=innfield]");innfields.each(function(){$(this).find("input[type=checkbox]").attr("checked",false);$(this).next().find("input[type=checkbox]").attr("checked",false);});},addwaiter:function(ele)
{M._getjson("/Account/addAccountCheck",{},this.addwaiter_finished.toEventHandler(this));},addwaiter_finished:function(d){if(d.status=='success'){this.context.u_title.html("添加子账号");this.context.u_savebtn.html("下一步，设置权限");this._clearwaiterform();this.context.u_hiddencell.attr("uid","").attr("innid","").attr("action","add");M.Popup(this.context.waiteraccount,{"hideclass":"bootbox modal sm fade","showclass":"bootbox modal sm fade in"},function(){this.context.u_username.focus();}.toEventHandler(this));}else{this.context.waiterlist.find("span[tag=tips]").show();}},savewaiter:function(ele)
{var userid=M.getVal(this.context.u_userid).trim();var pass=this.context.u_pass.val().trim();var confirmpass=this.context.u_confirmpass.val().trim();var username=this.context.u_username.val().trim();if(M.isEmpty(userid))
{alert("帐号不能为空");return;}
if(M.isEmpty(pass))
{alert("密码不能为空");return;}
if(pass.length<6)
{alert("密码不能少于6位");return;}
if(M.isEmpty(confirmpass))
{alert("确认密码不能为空");return;}
if(pass!=confirmpass)
{alert("确认密码和密码输入不一致");return;}
var uid=this.context.u_hiddencell.attr("uid");var data={"userid":userid,"pass":pass,"confirmpass":confirmpass,"innlist":"","username":username,"role":""};var action=this.context.u_hiddencell.attr("action");data.a=action=="add"?"adduser":"edituser";if(action=="edit"){data.uid=uid;M._getjson("/Account/edituser",data,this.savewaiter_finished.toEventHandler(this));}else{M._getjson("/Account/adduser",data,this.savewaiter_finished.toEventHandler(this));}},savewaiter_finished:function(d)
{if(d.status=="success")
{this._clearwaiterform();var group=d.group;var uid=d.uid;if(!M.isEmpty(group))
{var ele=$.tmpl(this.tpl_account,group);if(d.req.a=="adduser")
{this.context.waiterlist.children("div[tag=nouser]").hide();this.context.waiterlist.children("table").show();this.context.waiterlist.children("table").children("tbody").append(ele);this._closepopup();this._clearuserfunc();this.context.uh_hidden.val(uid);M.Popup(this.context.userfunc,{"hideclass":"modal fade","showclass":"modal fade in"},function(){}.toEventHandler(this));return;}
else
{var target=this.context.waiterlist.children("table").children("tbody").children("tr[uid="+uid+"]");target.html(ele.html());target.attr("innid",group.innid).attr("rc",group.rolecode);this._closepopup();}}
this._closepopup();}
else
{if(!M.isEmpty(d.msg))
{alert(d.msg);}}},editwaiter:function(ele)
{this._clearwaiterform();this.context.u_title.html("修改子账号");this.context.u_savebtn.html("保存修改");var tr=ele.parents("tr");var uid=tr.attr("uid");var innid=tr.attr("innid");var rc=tr.attr("rc");this.context.u_hiddencell.attr("uid",uid).attr("innid",innid).attr("action","edit");this.context.u_form.children('li[tag=editfun]').show();var userid=tr.children("td[tag=userid]").text().trim();var username=tr.children("td[tag=username]").text().trim();this.context.u_userid.val(userid);this.context.u_username.val(username);this.context.u_pass.val("//////");this.context.u_confirmpass.val("//////");M.Popup(this.context.waiteraccount,{"hideclass":"bootbox modal sm fade","showclass":"bootbox modal sm fade in"},function(){this.context.u_username.focus();}.toEventHandler(this));},delwaiter:function(ele)
{var test=confirm("确认删除吗");if(!test)return;var tr=ele.parents("tr");var uid=tr.attr("uid");if(M.isEmpty(uid))
{return;}
var data={"uid":uid};M._getjson("/Account/deluser/",data,this.delwaiter_finished.toEventHandler(this));},delwaiter_finished:function(d)
{if(d.status=="success")
{this.context.waiterlist.children("table").children("tbody").children("tr[uid="+d.req.uid+"]").remove();var len=this.context.waiterlist.children("table").children("tbody").children("tr[uid]").length;if(len<=0)
{this.context.waiterlist.children("table").hide();this.context.waiterlist.children("div[tag=nouser]").show();}}
else
{alert(d.msg);}},savefunc:function(){var uid=this.context.uh_hidden.val();if(M.isEmpty(uid))
{return;}
var fundata={"inns":[]};var innfields=this.context.funcfields.children("div[tag=innfield]");innfields.each(function(){var ckbox=$(this).find("input[type=checkbox]");var ischecked=ckbox.attr("checked");if(ischecked=="checked")
{var innid=ckbox.val();var innfun={"innid":innid};var funlist=$(this).next();funlist.find("input[type=checkbox]").each(function(){var funischecked=$(this).attr("checked");if(funischecked=="checked")
{var f=$(this).attr("name");innfun[f]=1;}});fundata.inns.push(innfun);}});if(fundata.inns.length==0)
{alert('请为帐号设置权限');return;}
var data={"uid":uid,"inns":""};data.inns=M.jsonToStr(fundata.inns);M._getjson("/Account/setfunc/",data,this.setfunc_finished.toEventHandler(this));},setfunc_finished:function(d)
{if(d.status=="success")
{this._clearwaiterform();var group=d.group;var uid=d.uid;if(!M.isEmpty(group))
{var ele=$.tmpl(this.tpl_account,group);var target=this.context.waiterlist.children("table").children("tbody").children("tr[uid="+uid+"]");target.html(ele.html());target.attr("innid",group.innid).attr("rc",group.rolecode);}
this._closepopup();}
else
{if(!M.isEmpty(d.msg))
{alert(d.msg);}}},edituserfunc:function(ele)
{this._clearuserfunc();var uid=ele.parents('tr').attr("uid");if(M.isEmpty(uid)){return;}
this.context.uh_hidden.val(uid);M._getjson("/Account/getfunlist",{'uid':uid},this.getfunlist_finished.toEventHandler(this));M.Popup(this.context.userfunc,{"hideclass":"modal fade","showclass":"modal fade in"},function(){}.toEventHandler(this));},getfunlist_finished:function(d)
{if(d.status=="success")
{var funlist=d.funlist;if(!M.isEmpty(funlist))
{for(var i=0;i<funlist.length;i++)
{var hasinn=false;var fun=funlist[i];var target=this.context.funcfields.children().children("ul[tag=funlist][for="+fun.innid+"]");target.children().find("input[tag=func]").each(function(){var name=$(this).attr("name");var val=fun[name];if(!M.isEmpty(val))
{hasinn=true;$(this).attr("checked",val=="1");}});this.context.funcfields.children("div[tag=innfield][innid="+fun.innid+"]").find("input[type=checkbox]").attr('checked',hasinn);}}}
else
{if(!M.isEmpty(d.msg))
{alert(d.msg);}}},timeformat:function(date,format)
{if(M.isEmpty(format))
{format="Y-m-d";}
var year=date.getFullYear();var month=this.zerosize(date.getMonth()+1+"",2);var day=this.zerosize(date.getDate()+"",2);var time=format.replace("Y",year).replace("m",month).replace("d",day);return time;},_closepopup:function()
{M.ClosePopup();},destroy:function(){}});M.ready(function(){var account=new M.Page.AccountManagePage();return account;});