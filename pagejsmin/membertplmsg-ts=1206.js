M.Page.AutoMessageTplPage=M.createClass();M.extend(M.Page.AutoMessageTplPage.prototype,{context:{},submittext:"处理中...",msglength:'<span>已输入<b>${inputlength}</b>字，还可输入<b class="remtxt">${leftlength}</b>字</span>',msgmembertip:'启用后，用户在注册成为会员或手动添加为会员后，会收到此信息',msgtitle:{'membernote':'修改会员通知'},contentmaxlen:110,init:function(){this.initDOM();this.initEvent();this.inittooltip();},initDOM:function(){this.context.tpllist=$("#tpllist");this.context.addfield=$("#addfield");this.context.tplform=$("#tplform");this.context.tplname=$("#tplname");this.context.tplcontent=$("#tplcontent");this.context.savebtn=$("#savebtn");this.context.tpl_hidden=$("#tpl_hidden");this.context.leftwords=$("#leftwords");this.context.sendrole=$("#sendrole");this.context.msgrole=$("#msgrole");this.context.editmsgform=$("#editmsgform");this.context.msgcontent=$("#msgcontent");this.context.savemsg=$("#savemsg");this.context.stopautomsg=$("#stopautomsg");this.context.showsendrole=$("#showsendrole");this.context.msgrole=$("#msgrole");},initEvent:function(){this.context.tpllist.bind("click",this.tpllist_click.toEventHandler(this));this.context.tplform.bind("click",this.tplform_click.toEventHandler(this));this.context.tplcontent.bind("keyup",this.msg_keydown.toEventHandler(this));this.context.tplcontent.bind("blur",this.msg_keydown.toEventHandler(this));this.context.msgcontent.bind("lick keyup",this.msg_keydown.toEventHandler(this));this.context.sendrole.bind("click",this.sendrole_click.toEventHandler(this));this.context.savemsg.bind("click",this.savemsg_click.toEventHandler(this));this.context.stopautomsg.bind("click",this.stopautomsg_click.toEventHandler(this));this.context.showsendrole.bind("click",this.sendrole_click.toEventHandler(this));},inittooltip:function(){var tpl_li=this.context.tpllist.children().find("ul[tag=inn]");var msgmembertip=this.msgmembertip;tpl_li.each(function(){$(this).children().find("i[tag=info_membernote]").attr("title",'').tooltip({position:{my:"left+15 top+20",at:"left bottom"},track:1,content:msgmembertip,show:{duration:100}});});},stopautomsg_click:function(){var type=this.context.editmsgform.attr("type");var innid=this.context.editmsgform.attr("innid");var data={"type":type,"innid":innid};M._getjson("/ShortMessage/stopmembertpl",data,this.stopmembertpl_finished.toEventHandler(this));},stopmembertpl_finished:function(d){if(d.status=='success'){var type=d.req.type;var innid=d.req.innid;var tpl=this.context.tpllist.children().find("ul[innid="+innid+"]").children("li[tplcode="+type+"]").children("div");tpl.children("span[tag=applystatus]").remove();tpl.children("span[tag=status]").html("未启用");}else{alert(d.msg);}
this._closepopup();},savemsg_click:function(){var tag=this.context.savemsg.attr("tag");if(tag=='disabled'){return false;}
this.context.savemsg.attr("tag","disabled");var type=this.context.editmsgform.attr("type");var innid=this.context.editmsgform.attr("innid");var content=M.getVal(this.context.msgcontent);var data={"type":type,"content":content,"innid":innid};M._getjson("/ShortMessage/updmembertpl",data,this.updmembertpl_finished.toEventHandler(this));},updmembertpl_finished:function(d){this.context.savemsg.attr("tag","");if(d.status=='success'){var type=d.req.type;var innid=d.req.innid;var tpl=this.context.tpllist.children().find("ul[innid="+innid+"]").children("li[tplcode="+type+"]").children("div");var length=tpl.children("span[tag=applystatus]").length;if(length==0){tpl.children("span:first").after('<span class="fl" style="color:#c00;"> (新内容审核中) </span>');}else{tpl.children("span[tag=applystatus]").html('(新内容审核中)');}
if(d.isfirst==1){this.context.tpllist.children().find("ul[innid="+innid+"]").children("li[tplcode="+type+"]").children("p[tag=content]").html(M.htmlspecialchars_decode(d.data.tplcontent));}
this._closepopup();}else{alert(d.msg);}},sendrole_click:function(){M.Popup(this.context.msgrole,{"hideclass":"bootbox modal view fade","showclass":"bootbox modal view fade in"});},tpllist_click:function(e)
{var ele=M.EventEle(e);var t=ele.attr("tag");var id=ele.attr("data-id");var innid=ele.parents("ul[tag=inn]").attr("innid");var type_arr=Array('order','checkin','checkout','comment','membernote');if(M.in_array(t,type_arr)){this.editmsgorder(t,innid,id);}},editmsgorder:function(t,innid,id){this._clearautoform();this.context.editmsgform.attr("type",t).attr("innid",innid);M._getjson("/ShortMessage/getmembertpl",{"type":t,"innid":innid,"id":id},this.getautomsg_finished.toEventHandler(this));},getautomsg_finished:function(d){if(d.status=='success'){var data=d.data;var type=d.req.type;this.context.msgcontent.val(M.htmlspecialchars_decode(data.tplcontent));this.context.msgcontent.parent().children('span').remove();if(data.status==2){this.context.savemsg.attr("tag","disabled").removeClass("btn-primary").addClass("btn-cancle");}
if(data.isstop==1){this.context.stopautomsg.show();}
this.context.editmsgform.children("div").children("h4[tag=title]").html(this.msgtitle[type]);this.contentmaxlen=d.content_maxlen;this.msg_keydown();M.Popup(this.context.editmsgform,{"hideclass":"bootbox modal view fade","showclass":"bootbox modal view fade in"});}else{M.error(d.msg);}},_clearautoform:function(){this.context.stopautomsg.hide();this.context.msgcontent.val();var content=M.emptyVal(this.context.msgcontent);this.context.savemsg.attr("tag","").removeClass("btn-primary").removeClass("btn-cancle");this.context.savemsg.attr("tag","").addClass("btn-primary");this.context.editmsgform.children().find("li[tag=orderinfo]").css("display","none");this.context.editmsgform.children().find("li[tag=tip]").css("display","none");},msg_keydown:function()
{var msg=this.context.msgcontent.val();var len=msg.length;var leftlength=this.contentmaxlen-len;var data={"inputlength":len,"leftlength":leftlength};var msg=$.tmpl(this.msglength,data);this.context.msgcontent.parent().next().html(msg);},my_strlen:function(str){var userAgent=navigator.userAgent.toLowerCase();var is_opera=userAgent.indexOf('opera')!=-1&&opera.version();var is_moz=(navigator.product=='Gecko')&&userAgent.substr(userAgent.indexOf('firefox')+8,3);var is_ie=(userAgent.indexOf('msie')!=-1&&!is_opera)&&userAgent.substr(userAgent.indexOf('msie')+5,3);var is_safari=(userAgent.indexOf('webkit')!=-1||userAgent.indexOf('safari')!=-1);return(is_ie&&str.indexOf('\n')!=-1)?str.replace(/\r?\n/g,'_').length:str.length;},_clearmsgorder:function(){},_closepopup:function()
{M.CloseLast();},close_click:function(e)
{this._closepopup();},tplform_click:function(e)
{var ele=M.EventEle(e);var t=ele.attr("tag");if(t=="save")
{this.tplform_save(ele);}
if(t=="sendrole")
{M.Popup(this.context.msgrole,{"hideclass":"bootbox modal view fade","showclass":"bootbox modal view fade in"});}},_clearform:function()
{this.context.leftwords.html("0");M.emptyVal(this.context.tplname);M.emptyVal(this.context.tplcontent);this.context.tpl_hidden.attr("tplid","");},addtpl:function()
{this._clearform();this.context.tplform.children(".modal-header").find("h4").html("添加短信模版");this.context.tpl_hidden.attr("action","add");M.Popup(this.context.tplform,{"hideclass":"bootbox modal view fade","showclass":"bootbox modal view fade in"},function(){this.context.tplname.focus();}.toEventHandler(this));},edittpl:function(ele)
{var tpl=ele.parents("li");var tplid=tpl.attr("tplid");var tplname=tpl.children("h5[tag=name]").text();var tplcontent=tpl.children("p[tag=content]").text();this._clearform();this.context.tplform.children(".modal-header").find("h4").html("修改短信模版");this.context.tpl_hidden.attr("tplid",tplid);this.context.tpl_hidden.attr("action","edit");this.context.tplname.val(tplname);this.context.tplcontent.val(tplcontent);this.context.leftwords.html(tplcontent.length);M.Popup(this.context.tplform,{"hideclass":"bootbox modal view fade","showclass":"bootbox modal view fade in"},function(){this.context.tplname.focus();}.toEventHandler(this));},deltpl:function(ele)
{var test=confirm("确认删除吗");if(!test)return;var tpl=ele.parents("li");var tplid=tpl.attr("tplid");M._getjson("/ajaxmsg.php",{"a":"deltpl","id":tplid},this.tpldel_finished.toEventHandler(this));},tpldel_finished:function(d)
{if(d.status=="success")
{this.context.tpllist.children("li[tplid="+d.req.id+"]").remove();}
else
{if(!M.isEmpty(d.msg))
{alert(d.msg);}}},tplform_save:function(ele)
{var tplname=M.getVal(this.context.tplname).trim();var tplcontent=M.getVal(this.context.tplcontent).trim();if(M.isEmpty(tplname))
{alert('模版名称不能为空');return;}
if(M.isEmpty(tplcontent))
{alert('模版内容不能为空');return;}
var data={"a":"addtpl","tplname":tplname,"tplcontent":tplcontent};var action=this.context.tpl_hidden.attr("action");if(action=="edit")
{var tplid=this.context.tpl_hidden.attr("tplid");if(M.isEmpty(tplid))return;data["a"]="edittpl";data["id"]=tplid;}
var btn=this.context.savebtn;if(!this.req_before(btn)){return;}
M._getjson("/ajaxmsg.php",data,this.tplsave_finished.toEventHandler(this));},tplsave_finished:function(d)
{var tpl_temp='<li tplid="${id}">'
+'<h5 tag="name">${tplname}</h5>'
+'<p tag="content">${tplcontent}</p>'
+'<div class="link">'
+'<a tag="delete" class="fl" href="#?">删除</a>'
+'<a tag="edit" class="fr" href="#?">修改模板</a>'
+'</div>'
+'</li>';if(d.status=="success")
{if(d.req.a=="addtpl")
{var tpl=d.tpl;var tplele=$.tmpl(tpl_temp,tpl);tplele.insertBefore(this.context.addfield);}
else
{var tpl=d.tpl;var tplele=$.tmpl(tpl_temp,tpl);var target=this.context.tpllist.children("li[tplid="+d.req.id+"]").html(tplele.html());}}
else
{if(!M.isEmpty(d.msg))
{alert(d.msg);}}
var btn=this.context.savebtn;this.req_end(btn);if(d.status=="success")
{this._closepopup();}},reqbusy:function()
{alert("请求处理中，请稍后再试");},req_before:function(btn)
{var busy=btn.attr("busy");if(busy=="1")
{this.reqbusy();return false;}
btn.html(this.submittext).attr("busy","1");btn.attr("class",btn.attr("tempclass")+" disabled")
return true;},req_end:function(btn)
{btn.html(btn.attr("text")).attr("busy","");btn.attr("class",btn.attr("tempclass"));},NoUndefined:function(str)
{return M.isEmpty(str)?"":str;},_closepopup:function()
{M.ClosePopup();},destroy:function(){}});M.ready(function(){var autoMessageTpl=new M.Page.AutoMessageTplPage();return autoMessageTpl;});