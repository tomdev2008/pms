M.Page.MessageTplPage=M.createClass();M.extend(M.Page.MessageTplPage.prototype,{context:{},submittext:"处理中...",init:function(){this.initDOM();this.initEvent();},initDOM:function(){this.context.tpllist=$("#tpllist");this.context.addfield=$("#addfield");this.context.tplform=$("#tplform");this.context.tplname=$("#tplname");this.context.tplcontent=$("#tplcontent");this.context.savebtn=$("#savebtn");this.context.tpl_hidden=$("#tpl_hidden");this.context.msgrole=$("#msgrole");this.context.leftwords=$("#leftwords");this.context.sendrole=$("#sendrole");},initEvent:function(){this.context.tpllist.bind("click",this.tpllist_click.toEventHandler(this));this.context.tplform.bind("click",this.tplform_click.toEventHandler(this));this.context.tplcontent.bind("keyup",this.msg_keydown.toEventHandler(this));this.context.tplcontent.bind("blur",this.msg_keydown.toEventHandler(this));this.context.sendrole.bind("click",this.sendrole_click.toEventHandler(this));},sendrole_click:function(){M.Popup(this.context.msgrole,{"hideclass":"bootbox modal view fade","showclass":"bootbox modal view fade in"});},msg_keydown:function(e)
{var msg=M.getVal(this.context.tplcontent);var len=msg.length;this.context.leftwords.html(len);var smscount=this._handlSMSCount(msg);this.context.leftwords.parent().children('b[tag=smscount]').html(smscount);},_handlSMSCount:function(msg){if(msg.length<1){return 0;}
var re_len=msg.replace(/[^\x00-\xff]/g,"**").length;var smscount=Math.ceil(re_len/2/63);smscount=smscount>7?7:smscount;return smscount;},_closepopup:function()
{M.CloseLast();},close_click:function(e)
{this._closepopup();},tplform_click:function(e)
{var ele=M.EventEle(e);var t=ele.attr("tag");if(t=="save")
{this.tplform_save(ele);}
if(t=="sendrole")
{M.Popup(this.context.msgrole,{"hideclass":"bootbox modal view fade","showclass":"bootbox modal view fade in"});}},tpllist_click:function(e)
{var ele=M.EventEle(e);var t=ele.attr("tag");if(t=="add")
{this.addtpl();}
if(t=="delete")
{this.deltpl(ele);}},_clearform:function()
{this.context.leftwords.html("0");M.emptyVal(this.context.tplname);M.emptyVal(this.context.tplcontent);this.context.tpl_hidden.attr("tplid","");},addtpl:function()
{this._clearform();this.context.tplform.children(".modal-header").find("h4").html("添加短信模版");this.context.tpl_hidden.attr("action","add");M.Popup(this.context.tplform,{"hideclass":"bootbox modal view fade","showclass":"bootbox modal view fade in"},function(){this.context.tplname.focus();}.toEventHandler(this));},deltpl:function(ele)
{var test=confirm("确认删除吗");if(!test)return;var tpl=ele.parents("li");var tplid=tpl.attr("tplid");M._getjson("/ShortMessage/messagetploperate",{"act":"deltpl","id":tplid},this.tpldel_finished.toEventHandler(this));},tpldel_finished:function(d)
{if(d.status=="success")
{this.context.tpllist.children("li[tplid="+d.req.id+"]").remove();}
else
{if(!M.isEmpty(d.msg))
{alert(d.msg);}}},tplform_save:function(ele)
{var tplname=M.getVal(this.context.tplname).trim();var tplcontent=M.getVal(this.context.tplcontent).trim();if(M.isEmpty(tplname))
{alert('模版名称不能为空');return;}
if(M.isEmpty(tplcontent))
{alert('模版内容不能为空');return;}
var data={"act":"addtpl","tplname":tplname,"tplcontent":tplcontent};var btn=this.context.savebtn;if(!this.req_before(btn)){return;}
M._getjson("/ShortMessage/messagetploperate",data,this.tplsave_finished.toEventHandler(this));},tplsave_finished:function(d)
{var tpl_temp='<li tplid="${id}">'
+'<h5 tag="name">${tplname}</h5>'
+'<p tag="content">${tplcontent}</p>'
+'<div class="link"><span class="fl" style="color:#c00;" tag="applystatus">(审核中)</span>'
+'<a tag="delete" class="fr" href="#?">删除</a>'
+'</div>'
+'</li>';if(d.status=="success")
{var tpl=d.tpl;var tplele=$.tmpl(tpl_temp,tpl);tplele.insertBefore(this.context.addfield);}
else
{if(!M.isEmpty(d.msg))
{alert(d.msg);}}
var btn=this.context.savebtn;this.req_end(btn);if(d.status=="success")
{this._closepopup();}},reqbusy:function()
{alert("请求处理中，请稍后再试");},req_before:function(btn)
{var busy=btn.attr("busy");if(busy=="1")
{this.reqbusy();return false;}
btn.html(this.submittext).attr("busy","1");btn.attr("class",btn.attr("tempclass")+" disabled");return true;},req_end:function(btn)
{btn.html(btn.attr("text")).attr("busy","");btn.attr("class",btn.attr("tempclass"));},NoUndefined:function(str)
{return M.isEmpty(str)?"":str;},_closepopup:function()
{M.ClosePopup();},destroy:function(){}});var messageTpl;M.ready(function(){messageTpl=new M.Page.MessageTplPage();return messageTpl;});