﻿M.Page.PluginManagePage=M.createClass();M.extend(M.Page.PluginManagePage.prototype,{context:{},plugin:{},tipmasg:'如需修改，请点击左侧"客栈及房型" - "修改客栈信息"',innset:{},innsettemp:{},pluginlist:{},audio:null,tpl_loading:'<div class="tc" tag="loading" style="padding: 30px 0px;"><i class="loading32"></i></div>',tpl_recodesum:'<div id="men_recodesum" class="daybook" gname="顶部_记一笔" ga="a" title="记一笔"></div>',tpl_attn:' <li aid="${id}" tag="attn">'
+'<label>${username}</label>'
+'<a href="#?" tag="delete" title="删除该员工" class="delete"></a>'
+'</li>',init:function(){this.initDOM();this.initEvent();this.initfunction();},initDOM:function(){this.context.pluginlist=$('#pluginlist');this.context.ota_msgform=$("#ota_msgform");this.context.agreement_msg=$("#agreement_msg");this.context.header_ota=$("#header_ota");this.context.sub_nav=$("#sub-nav");this.context.microinn_openform=$("#microinn_openform");this.context.detail_set=$("#detail_set");this.context.microinn_btn=$("#microinn_btn");this.context.microinnform=$("#microinnform");this.context.innlist=$("#innlist");this.context.wifipassword=$("#wifipassword");this.context.savewifipassword=$("#savewifipassword");this.context.microinnrefuse=$("#microinnrefuse");this.context.microinn_close=$("#microinn_close");this.context.menu_log=$("#menu_log");this.context.cashierrules=$("#rules-cashier");this.context.agreerules=this.context.cashierrules.find("input[tag=agreerules]");this.context.opencashier=$("#opencashier");this.context.cashierend=$("#rules-cashier-end");this.context.cashierdetile=$("#cashierdetile");this.context.downloadQRPop=$("#downloadQRPop");this.context.downloadQR=$("#downloadQR");this.context.cashierdetailBox=$("#cashierdetailBox");this.context.main_container=$("#main-container");this.context.printsetform=$("#printsetform");this.context.rules_wkz=$("#rules_wkz");this.context.roomfoldPop=$("#roomfoldPop");this.context.consume=$("#rules-consume-end");this.context.settingpop=$("#settingPop");this.context.header=$("#header");this.context.printsetting=$("#printsetting");this.context.doorlocksettingpop=$("#DoorlockSettingPop");this.context.setattnform=$('#setattnform');this.context.membersettingpop=$("#membersettingpop");this.context.revertroomstatusPop=$("#revertroomstatusPop");this.context.pluginsettingform=$("#pluginsettingform");var innname=this.context.microinn_openform.children("div").children("ul").children("li[class=active]").children("a").text();if(!M.isEmpty(innname)){this.context.microinnform.children().find("span[innname=innname]").text(innname);}
this.context.microinnform.children().find("span[innname=innname]").next().attr("title","").tooltip({position:{my:"left+15 top+20",at:"left bottom"},track:1,content:this.tipmasg,show:{duration:100}});},initEvent:function(){this.context.pluginlist.bind("click",this.pluginlist_click.toEventHandler(this));this.context.agreement_msg.bind("click",this.agreement_msg_click.toEventHandler(this));this.context.detail_set.bind("click",this.detail_set_click.toEventHandler(this));this.context.microinn_close.bind("click",this.detail_set_click.toEventHandler(this));this.context.microinn_btn.bind("click",this.microinn_btn.toEventHandler(this));this.context.innlist.bind("click",this.innlist_click.toEventHandler(this));this.context.wifipassword.bind("input propertychange",this.changewifipassword.toEventHandler(this));this.context.savewifipassword.bind("click",this.savewifipassword.toEventHandler(this));this.context.opencashier.bind("click",this.opencashier.toEventHandler(this));this.context.agreerules.bind("click",this.agreerules.toEventHandler(this));this.context.cashierdetile.bind("click",this.cashierdetile.toEventHandler(this));this.context.downloadQR.bind('click',this.downloadQR.toEventHandler(this));this.context.printsetting.bind("click",this.printsetting_click.toEventHandler(this));this.context.printsetform.bind("click",this.printsetform_click.toEventHandler(this));this.context.printsetform.find("select[name=innlist]").bind("change",this.printinn_change.toEventHandler(this));this.context.pluginlist.find("div[tag=Revertroomstatus]").parents('li').find('label[tag=roomfold]').find('input').bind("click",this.openroomfold.toEventHandler(this));this.context.roomfoldPop.bind("click",this.roomfoldPop.toEventHandler(this));this.context.settingpop.bind("click",this.settingpop_click.toEventHandler(this));this.context.downloadQRPop.bind('click',this.downloadQRPop_click.toEventHandler(this));this.context.downloadQRPop.find("select[name=showinn]").bind("change",this.showinn_change.toEventHandler(this));this.context.settingpop.find('div[tag=switch]').bind("click",this.switch_click.toEventHandler(this));this.context.settingpop.find("select[name=setcheckouttime]").bind("change",this.setcheckouttime.toEventHandler(this));this.context.setattnform.bind('click',this.setattnform_click.toEventHandler(this));this.context.setattnform.find("select[name=innlist]").bind('change',this.fromattninn_chagne.toEventHandler(this));this.context.revertroomstatusPop.bind('click',this.revertroomstatusPop_click.toEventHandler(this));this.context.pluginsettingform.bind('click',this.pluginsettingform_click.toEventHandler(this));this.initAudio();},initAudio:function(){var audio5js=new Audio5js({ready:function(){this.load('/js/audio5/checkin.mp3');}});this.audio=audio5js;},setattnform_click:function(e){var ele=M.EventEle(e);var t=ele.attr("tag");switch(t){case'save':this.addattn(ele);break;case'delete':this.deleteattn(ele);break;}},play:function(){this.audio.seek(0);this.audio.play();},deleteattn:function(ele){var attnid=ele.parents("li[tag=attn]").attr("aid");var innid=this.context.setattnform.find("select[name=innlist]").val();var res=confirm("删除该员工后，修改原有订单时，业绩归属里将不再出现该员工，统计中会保留该员工原有的业绩。确定删除该员工吗？");if(!res){return;}
if(M.isEmpty(attnid)){return;}
M._getjson("/Plugin/deleteattn",{"attnid":attnid,"innid":innid},this.deleteattn_finished.toEventHandler(this));},deleteattn_finished:function(d){if(d.status=="success"){var aid=d.req.attnid;this.context.setattnform.find("ul[tag=attnlist]").children("li[aid="+aid+"]").remove();alert('删除成功');}else{alert(d.msg);}},addattn:function(ele){var username=M.getVal(ele.parent().children("input[name=username]"));var innid=this.context.setattnform.find("select[name=innlist]").val();if(M.isEmpty(username)){alert('员工姓名不能为空');return;}
M._getjson("/Plugin/addattn",{"username":username,"innid":innid},this.addattn_finished.toEventHandler(this));},addattn_finished:function(d){if(d.status=="success"){var data=d.data;var html=$.tmpl(this.tpl_attn,data);this.context.setattnform.find("ul[tag=attnlist]").children("li[tag=addnew]").before(html);this.context.setattnform.find("ul[tag=attnlist]").children("li[tag=addnew]").children("input[name=username]").val('')
M.success('添加成功');}else{alert(d.msg);}},settingpop_click:function(e){var ele=M.EventEle(e);var t=ele.attr("tag");switch(t){case'setattn':this.setattn();break;case'play':this.play();break;case'close':M.CloseLast();this.audio.pause();break;case'setorderdirtyroom':this.setorderdirtyroom(ele);break;}},setorderdirtyroom:function(ele){var value=0;if(ele.is(':checked')){value=1;}
var status=this.context.settingpop.find('div[tag=switch]').attr('status');if(status!=1){alert('请先开启脏房管理功能');this.context.settingpop.find('div[tag=dirtyroom]').find('input').removeAttr('checked');return;}
M._getjson("/Plugin/setpluginselect",{'type':'setorderdirtyroom','status':value},this.setorderdirtyroom_finished.toEventHandler(this));},setorderdirtyroom_finished:function(d){if(d.status=='success'){M.success('设置成功');}else{this.context.settingpop.find('div[tag=dirtyroom]').find('input').removeAttr('checked');M.error(d.msg);}},fromattninn_chagne:function(e){var innid=this.context.setattnform.find("select[name=innlist]").val();M._getjson("/Plugin/setattn",{"innid":innid},this.fromattninn_chagne_finished.toEventHandler(this));},fromattninn_chagne_finished:function(d){if(d.status=="success"){var attnlist=d.data;this.context.setattnform.find("ul[tag=attnlist]").children("li[tag=attn]").remove();if(!M.isEmpty(attnlist)&&attnlist.length>0){var html=$.tmpl(this.tpl_attn,attnlist);this.context.setattnform.find("ul[tag=attnlist]").children("li[tag=addnew]").before(html);}}},setattn:function(){var innid=this.context.setattnform.find("select[name=innlist]").val();M._getjson("/Plugin/setattn",{"innid":innid},this.setattn_finished.toEventHandler(this));},setattn_finished:function(d){if(d.status=="success"){var attnlist=d.data;this.context.setattnform.find("ul[tag=attnlist]").children("li[tag=attn]").remove();if(!M.isEmpty(attnlist)&&attnlist.length>0){var html=$.tmpl(this.tpl_attn,attnlist);this.context.setattnform.find("ul[tag=attnlist]").children("li[tag=addnew]").before(html);}
M.Popup(this.context.setattnform,{"hideclass":"modal modal-plugins fade","showclass":"modal modal-plugins fade in","dragable":false});}},initfunction:function(){var url=document.referrer;if(url=='http://yun.mei.cn/'||url=='http://yun.mei.cn/index.php'||url=='http://test.miot.cn/'||url=='http://test.miot.cn/index.php'||url=="http://v.yunzhanggui.net/"||url=="http://v.yunzhanggui.net/index.php"){var opencashier=$.cookie('opencashier');if(!M.isEmpty(opencashier)&&opencashier==1){$.cookie('opencashier',0,{expires:-1});this.context.pluginlist.find("div[tag=Cashier]").parents('li').find(".has-switch").children("div").trigger('click');}}},setcheckouttime:function(){var checkouttime=this.context.settingpop.find("select[name=setcheckouttime]").val();var data={"checkouttime":checkouttime};M._getjson("/Plugin/setcheckouttime",data,this.setcheckouttime_finished.toEventHandler(this));},setcheckouttime_finished:function(d){if(d.status=="success"){}else{M.error(d.msg);}},pluginlist_click:function(e){var ele=M.EventEle(e);var t=ele.attr("tag");if(t!='pop'){t=ele.parents('li').attr('tag');ele=ele.parents('li');}
switch(t){case"pop":this.settingpop_tpl(ele);break;}},settingpop_tpl:function(ele){var pid=ele.attr("pluginid");var pluginlist=this.pluginlist;var plugin=pluginlist[pid];var name=ele.attr("name");var status=ele.attr('status');var t=parseInt(Math.random()*100);var url=document.domain;this.context.settingpop.find('img[tag=pic]').attr('alt',plugin.title).attr('src','/pic/plugins/'+name+'.jpg?t='+t);this.context.settingpop.find('h2[tag=title]').html(plugin.title);this.context.settingpop.find('p[tag=info]').html(plugin.info);this.context.settingpop.find('div[tag=switch]').attr('status',status).attr('type',plugin.name).attr('pluginid',ele.attr('pluginid'));this.context.settingpop.find('div[t=plugin]').hide();this.context.settingpop.find('div[tag=audio]').hide();this.context.settingpop.find('div[tag=dirtyroom]').hide();if(name=="revertroomstatus"){this._showrevertroomstatus(pid);}else if(name=='reportallorder'){M._getjson("/Plugin/getplugindetail",{'pid':pid},this.getplugindetail_finished.toEventHandler(this));}else{if(name=='autocheckout'){M._getjson("/Plugin/getsetcheckouttime",{},this.getsetcheckouttime_finished.toEventHandler(this));}
if(plugin.name=='Audio'){this.context.settingpop.find('div[tag=audio]').show();}
if(status==1){this.context.settingpop.find('div[tag=switch]').removeClass('switch-off').addClass('switch-on');if(plugin.name=='Print'){this.context.settingpop.find('div[tag=printsetting]').show();}else if(plugin.name=='Cashier'){this.context.settingpop.find('div[tag=cashier]').show();}else if(plugin.name=='AutoCheckOut'){this.context.settingpop.find('div[tag=autocheckout]').show();}else if(plugin.name=='DoorLock'){this.context.settingpop.find('div[tag=doorlock]').show();}else if(plugin.name=='Attn'){this.context.settingpop.find('div[tag=attn]').show();}else if(plugin.name=='Dirtyroom'){var html_pluginscontent=this.context.settingpop.children('div').children('.plugins-content').children('.intro');html_pluginscontent.children('div[tag=dirtyroom]').hide();html_pluginscontent.append(this.tpl_loading);M._getjson("/Plugin/getorderdirtyroomstatus",{},this.getorderdirtyroomstatus_finished.toEventHandler(this));}}else{if(plugin.name=='Dirtyroom'){this.context.settingpop.find('div[tag=dirtyroom]').show();M._getjson("/Plugin/getorderdirtyroomstatus",{},this.getorderdirtyroomstatus_finished.toEventHandler(this));}
this.context.settingpop.find('div[tag=switch]').removeClass('switch-on').addClass('switch-off');}
M.Popup(this.context.settingpop,{"hideclass":"modal modal-plugins fade","showclass":"modal modal-plugins fade in","dragable":true});}},getplugindetail_finished:function(d){if(d.status=="success"){var data=d.data;var name=data.name;if(name=='Reportallorder'){var userset=data.userset;this.context.pluginsettingform.find('input[name=reportallorder]').attr('checked',false);if(!M.isEmpty(userset)&&userset.allorder==1){this.context.pluginsettingform.find('img[tag=pluginimg]').attr('src','/pic/plugins/rule-all.jpg');this.context.pluginsettingform.find('input[name=reportallorder][value=1]').attr('checked','checked');}else{this.context.pluginsettingform.find('img[tag=pluginimg]').attr('src','/pic/plugins/rule.jpg');this.context.pluginsettingform.find('input[name=reportallorder][value=2]').attr('checked','checked');}}
this.context.pluginsettingform.attr('pid',data.pid);M.Popup(this.context.pluginsettingform,{"hideclass":"modal modal-plugins fade","showclass":"modal modal-plugins fade in","dragable":true});}else{alert(d.msg);}},pluginsettingform_click:function(e){var ele=M.EventEle(e);var t=ele.attr('tag');if(t=='msg'){ele=ele.prev();t=ele.attr('tag');}
switch(t){case'reportallorder':this.context.pluginsettingform.find('input[name=reportallorder]').attr('checked',false);ele.attr('checked','checked');this.context.pluginsettingform.find('img[tag=pluginimg]').attr('src',ele.attr('img'));var allorder=ele.val();var pid=this.context.pluginsettingform.attr('pid');M._getjson('/plugin/setreportallorder',{'allorder':allorder,'pid':pid},function(){});break;}},_showrevertroomstatus:function(pid){M._getjson("/Plugin/getroomrevertstatus",{"pid":pid},this.getroomrevertstatus_finished.toEventHandler(this));},getroomrevertstatus_finished:function(d){if(d.status=="success"){var data=d.data;var userset=data.userset;this.context.revertroomstatusPop.find("input[name=roomrevertstatus][value="+userset.roomrevertstatus+"]").attr("checked","checked");if(userset.streamline==1){this.context.revertroomstatusPop.find("input[name=streamline]").attr("checked","checked");}else{this.context.revertroomstatusPop.find("input[name=streamline]").attr("checked",false);}
this.context.revertroomstatusPop.attr("up",data.id);M.Popup(this.context.revertroomstatusPop,{"hideclass":"modal modal-plugins fade","showclass":"modal modal-plugins fade in","dragable":true});}else{alert(d.msg);}},revertroomstatusPop_click:function(e){var ele=M.EventEle(e);var t=ele.attr("tag");if(t=="save"){var streamline=0;var roomrevertstatus=this.context.revertroomstatusPop.find("input[name=roomrevertstatus]:checked").val();var streamlinechecked=this.context.revertroomstatusPop.find("input[name=streamline]").attr("checked");if(streamlinechecked=="checked"){streamline=1;}
var pid=this.context.revertroomstatusPop.attr("up");var data={"roomrevertstatus":roomrevertstatus,"streamline":streamline,"pid":pid};M._getjson("/Plugin/saveroomrevertstatus",data,this.saveroomrevertstatus_finished.toEventHandler(this));}},saveroomrevertstatus_finished:function(d){if(d.status=="success"){M.success("保存成功");}else{alert(d.msg);}},getsetcheckouttime_finished:function(d){if(d.status=="success"){this.context.settingpop.find("select[name=setcheckouttime]").val(d.autocheckouttime);}},getorderdirtyroomstatus_finished:function(d){if(d.status=="success"){if(d.data.status==1){this.context.settingpop.find("div[tag=dirtyroom]").find('input').attr('checked','checked');}else{this.context.settingpop.find("div[tag=dirtyroom]").find('input').removeAttr('checked');}}
var html_pluginscontent=this.context.settingpop.children('div').children('.plugins-content').children('.intro');html_pluginscontent.children('div[tag=loading]').remove();html_pluginscontent.children('div[tag=dirtyroom]').show();},openroomfold:function(e){var ele=M.EventEle(e);var pluginid=ele.parents("li").attr("pluginid");var checked=ele.attr('checked');var data={"status":0,"pluginid":pluginid};if(checked=='checked'){data.status=1;}
M._getjson("/Plugin/setfoldroomstatus",data,this.setfoldroomstatus_finished.toEventHandler(this));},setfoldroomstatus_finished:function(d){if(d.status=="success"){var status=d.req.status;if(status==1){M.Popup(this.context.roomfoldPop,{"hideclass":"modal fade","showclass":"modal fade in"});}}else{M.error(d.msg);}},roomfoldPop:function(e){var ele=M.EventEle(e);var t=ele.attr("tag");if(t=='ok'){this._closepopup();}
if(t=='set'){window.location.href='roomtypemanage.php';}},downloadQR:function(){this._closepopup();M.Popup(this.context.downloadQRPop,{"hideclass":"modal fade","showclass":"modal fade in"});},printinn_change:function(){var innid=this.context.printsetform.find("select[name=innlist]").val();this._setinn(innid);},_saveinn:function(innid){var tplform=this.context.printsetform.find("div[tag=innset]");var type=tplform.find("input[name=type]:checked").val();var ticket=tplform.find("input[name=ticket]:checked").val();var phone=M.getVal(tplform.find("input[name=phone]"));var address=M.getVal(tplform.find("input[name=address]"));var tips=M.getVal(tplform.find("textarea[name=tipmsg]"));var data={"innid":innid,"phone":phone,"address":address,"tips":tips,"type":type,"ticket":ticket};this.innset[innid]=data;},printsetform_click:function(e){var ele=M.EventEle(e);var t=ele.attr("tag");switch(t){case'save':this.saveprintset();break;case'showinn':var innid=ele.val();this._saveinn(innid);break;}},saveprintset:function(){var data=this._getprintsetdata();var usid=this.context.printsetform.attr("usid");data.usid=usid;M._getjson("/Plugin/saveprintset",data,this.saveprintset_finished.toEventHandler(this));},saveprintset_finished:function(d){if(d.status=="success"){M.success('保存成功');M.CloseLast();}else{alert(d.msg);}},_getprintsetdata:function(){var data={};var innid=this.context.printsetform.find("select[name=innlist]").val();this._saveinn(innid);data.checkin=this._getsetoptionvalue('checkin');data.checkout=this._getsetoptionvalue('checkout');data.checkout=this._getsetoptionvalue('checkout');data.guestphone=this._getsetoptionvalue('guestphone');data.documentnum=this._getsetoptionvalue('documentnum');data.receptionphone=this._getsetoptionvalue('receptionphone');data.innaddress=this._getsetoptionvalue('innaddress');data.tips=this._getsetoptionvalue('tips');data.remark=this._getsetoptionvalue('remark');data.channel=this._getsetoptionvalue('channel');data.innstr=this._getselectprintinnlist().toString();var innset=this.innset;data.innset=JSON.stringify(this.innset);return data;},_getselectprintinnlist:function(){var tpl=this.context.printsetform.find("div[tag=innlist]").find("input[tag=inn]:checked");var data=[];tpl.each(function(){var innid=$(this).val();data.push(innid);});return data;},_getsetoptionvalue:function(name){var checked=this.context.printsetform.find("input[name="+name+"]").attr("checked");if(checked=="checked"){return 1;}else{return 0;}},printsetting_click:function(e){var ele=M.EventEle(e);var status=this.context.settingpop.find('div[tag=switch]').attr('status');this.printset(status);},printset:function(status){if(status!=1){M.error('请先开启插件再进行设置');return;}
this._clearprintsetform();var data={};M._getjson("/Plugin/getprintset",data,this.getprintset_finished.toEventHandler(this));},getprintset_finished:function(d){if(d.status=="success"){var userset=d.userset;var innset=d.innset;if(!M.isEmpty(userset)){this._setoptionselected("checkin",userset.checkin);this._setoptionselected("checkout",userset.checkout);this._setoptionselected("guestphone",userset.guestphone);this._setoptionselected("documentnum",userset.documentnum);this._setoptionselected("receptionphone",userset.receptionphone);this._setoptionselected("innaddress",userset.innaddress);this._setoptionselected("tips",userset.tips);this._setoptionselected("remark",userset.remark);this._setoptionselected("channel",userset.channel);var inntpl=this.context.printsetform.find("div[tag=innlist]");var innlist=userset.innstr.split(',');for(var i=0;i<innlist.length;i++){inntpl.find("input[value="+innlist[i]+"]").attr("checked","checked");}
this.innset=innset;var innid=this.context.printsetform.find("select[name=innlist]").val();this._setinn(innid);this.context.printsetform.attr("usid",userset.id);}
M.Popup(this.context.printsetform,{"hideclass":"modal large fade","showclass":"modal large fade in","dragable":true});}},_setinn:function(innid){var inn='';if(!M.isEmpty(this.innset)){inn=this.innset[innid];}else{this.innset={};}
if(!M.isEmpty(inn)){var ticket=inn.ticket;if(ticket!=2){ticket=1;}
this.context.printsetform.find("input[name=type]").attr('checked',false);this.context.printsetform.find("input[name=type][value="+inn.type+"]").attr('checked',"checked");this.context.printsetform.find("input[name=ticket]").attr('checked',false);this.context.printsetform.find("input[name=ticket][value="+ticket+"]").attr('checked',"checked");this._setinputmsg("phone",inn.phone);this._setinputmsg("address",inn.address);this._setinputmsg("tipmsg",inn.tips);}else{this.context.printsetform.find("input[name=type]").attr('checked',false);this.context.printsetform.find("input[name=type][value=1]").attr('checked',"checked");this.context.printsetform.find("input[name=ticket]").attr('checked',false);this.context.printsetform.find("input[name=ticket][value=1]").attr('checked',"checked");M.emptyVal(this.context.printsetform.find("input[name=phone]"));M.emptyVal(this.context.printsetform.find("input[name=address]"));M.emptyVal(this.context.printsetform.find("textarea[name=tipmsg]"));}},_setinputmsg:function(name,value){if(name=='tipmsg'){if(!M.isEmpty(value)){this.context.printsetform.find("textarea[name="+name+"]").val(value);}else{M.emptyVal(this.context.printsetform.find("textarea[name="+name+"]"));}}else{if(!M.isEmpty(value)){this.context.printsetform.find("input[name="+name+"]").val(value);}else{M.emptyVal(this.context.printsetform.find("input[name="+name+"]"));}}},_setoptionselected:function(name,value){if(value==1){this.context.printsetform.find("input[name="+name+"]").attr("checked","checked");}else{this.context.printsetform.find("input[name="+name+"]").attr("checked",false);}},_clearprintsetform:function(){this.context.printsetform.find("input[name=checkin]").attr("checked",false);this.context.printsetform.find("input[name=checkout]").attr("checked",false);this.context.printsetform.find("input[tag=inn]").attr("checked",false);this.context.printsetform.find("input[name=guestphone]").attr("checked",false);this.context.printsetform.find("input[name=documentnum]").attr("checked",false);this.context.printsetform.find("input[name=receptionphone]").attr("checked",false);this.context.printsetform.find("input[name=innaddress]").attr("checked",false);this.context.printsetform.find("input[name=tips]").attr("checked",false);this.context.printsetform.find("input[name=type]").attr('checked',false);this.context.printsetform.find("input[name=type][value=1]").attr('checked',"checked");M.emptyVal(this.context.printsetform.find("input[name=phone]").attr("placeholder","前台电话"));M.emptyVal(this.context.printsetform.find("input[name=address]").attr("placeholder","客栈地址"));M.emptyVal(this.context.printsetform.find("textarea[name=tipmsg]").attr("placeholder","温馨提醒"));},savprintset_finished:function(d){if(d.status=="success"){}else{M.error(d.msg);var pid=d.req.pluginid;var target=this.context.pluginlist.find("li[pluginid="+pid+"]").find("dd[tag=form]");var data=d.data;if(M.isEmpty(data.set.checkin)){target.find("input[name=checkin]").attr("checked",false);}else{target.find("input[name=checkin]").attr("checked","checked");}
if(M.isEmpty(data.set.checkout)){target.find("input[name=checkout]").attr("checked",false);}else{target.find("input[name=checkout]").attr("checked","checked");}}},savewifipassword:function(){var innid=this.context.microinn_openform.children("div").children("ul").children("li[class=active]").attr("innid");var wifipassword=M.getVal(this.context.microinnform.children().find("input[name=wifipassword]"));var data={"a":"editwifipassword","innid":innid,"wifipassword":wifipassword};M._getjson("/ajaxsetting.php",data,this.savewifipassword_finished.toEventHandler(this));},savewifipassword_finished:function(d){if(d.status=='success'){this.context.microinnform.children().find("a[tag=savewifi]").hide();this.context.microinnform.children().find("span[tag=savewifitips]").show();}else{alert(d.msg);}},changewifipassword:function(){var id=this.context.microinnform.attr("aid");if(M.isEmpty(id)){return;}
this.context.microinnform.children().find("span[tag=tips]").hide();this.context.microinnform.children().find("a[tag=savewifi]").show();},innlist_click:function(e){var ele=M.EventEle(e);var innid=ele.parent().attr("innid");M._getjson("/ajaxsetting.php",{"a":"getwkzinfo","innid":innid},this.getwkzinfo_finished.toEventHandler(this));},downloadQRPop_click:function(e){var ele=M.EventEle(e);var t=ele.attr("tag");if(t=='download'){var innid=this.context.downloadQRPop.find("select[name=showinn]").val();var src=this.context.downloadQRPop.find('img').attr('src');this.context.downloadQRPop.find('img').attr('a',"download");M._getjson("/Plugin/downloadkk",{"src":src,"innid":innid},this.download_finished.toEventHandler(this));}},download_finished:function(d){var innid=this.context.downloadQRPop.find("select[name=showinn]").val();var a=this.context.downloadQRPop.find('img').attr('a');var src=this.context.downloadQRPop.find('img').attr('src');window.location.href='/Plugin/downloadkk?innid='+innid+'&src='+encodeURIComponent(src);},showinn_change:function(){var innid=this.context.downloadQRPop.find("select[name=showinn]").val();var data={"innid":innid};M._getjson("/Plugin/getqrcodeimage",data,this.showinn_finished.toEventHandler(this));},showinn_finished:function(d){if(d.status=='success'){var src=d.src;this.context.downloadQRPop.find('img').attr('src',src);}},getwkzinfo_finished:function(d){if(d.status=='success'){this._clearmicroform();var innid=d.req.innid;this.context.innlist.children("li").removeClass("active");var innname=this.context.innlist.children("li[innid="+innid+"]").addClass("active").children("a").text();this.context.microinnform.children().find("span[innname=innname]").text(innname);if(!M.isEmpty(d.data)){var data=d.data;this.context.microinnform.children().find("input[name=address]").val(data.address);this.context.microinnform.children().find("input[name=phone]").val(data.phone);this.context.microinnform.children().find("input[name=wifipassword]").val(data.wifipassword);if(data.status==0){this.context.microinnrefuse.show();}else if(!M.isEmpty(data.id)){this.context.microinnform.attr("aid",data.id);this.context.microinnform.children().find("input[name=address]").val(data.address).attr("disabled","disabled");this.context.microinnform.children().find("input[name=phone]").val(data.phone).attr("disabled","disabled");this.context.microinnform.children().find("input[name=wifipassword]").val(data.wifipassword).attr("disabled","disabled");if(data.status==1){this.context.microinnform.children().find("input[name=wifipassword]").val(data.wifipassword).attr("disabled",false);this.context.microinn_btn.html('<a href="javascript:;" class="btn" style="width:120px;">已开通</a><span class="ml10">您可随时修改Wifi密码</span>');}
if(data.status==2){this.context.microinn_btn.html('<a href="javascript:;" class="btn" style="width:120px;">正在开通</a><span class="ml10">请等待客户经理上门为您指导</span>');}
if(data.status==3){this.context.microinn_btn.html('<a href="javascript:;" class="btn" style="width:120px;">正在开通</a><span class="ml10">微官网数据整理中</span>');}}}}else{alert(d.msg);}},microinn_btn:function(e){var ele=M.EventEle(e);var t=ele.attr("tag");if(t=='open'){this.openmicroinn();}
if(t=='edit'){this.editwifipassword();}},editwifipassword:function(){this.context.microinnform.children().find("input[name=wifipassword]").attr("disabled",false).focus();},openmicroinn:function(){var innid=this.context.microinn_openform.children("div").children("ul").children("li[class=active]").attr("innid");var address=this.context.microinnform.children().find("input[name=address]").val();var phone=M.getVal(this.context.microinnform.children().find("input[name=phone]"));var wifipassword=M.getVal(this.context.microinnform.children().find("input[name=wifipassword]"));if(M.isEmpty(address)){alert("请输入客栈地址");return;}
if(M.isEmpty(phone)){alert("请输入联系电话");return;}
var data={"a":"apply_wkz","innid":innid,"address":address,"phone":phone,"wifipassword":wifipassword};M._getjson("/ajaxsetting.php",data,this.openmicroinn_finished.toEventHandler(this));},openmicroinn_finished:function(d){if(d.status=='success'){this.context.microinnrefuse.hide();this.context.microinn_btn.html('<a href="javascript:;" class="btn" style="width:120px;">正在开通</a><span class="ml10">请等待客户经理上门为您指导</span>');}else{alert(d.msg);}},detail_set_click:function(){var display=this.context.microinn_openform.css("display");if(display=='none'){this.context.microinn_openform.slideDown("fast");}else{this.context.microinn_openform.slideUp("fast");}},_clearmicroform:function(){this.context.microinnrefuse.hide();this.context.microinnform.children().find("a[tag=savewifi]").hide();this.context.microinnform.children().find("span[tag=savewifitips]").hide();this.context.microinnform.children().find("span[tag=tips]").show();this.context.microinnrefuse.hide();this.context.microinnform.attr("aid","");this.context.microinnform.children().find("input[name=address]").val('').attr("disabled",false);this.context.microinnform.children().find("input[name=phone]").attr("disabled",false);this.context.microinnform.children().find("input[name=wifipassword]").attr("disabled",false);M.emptyVal(this.context.microinnform.children().find("input[name=phone]"));M.emptyVal(this.context.microinnform.children().find("input[name=wifipassword]"));this.context.microinn_btn.html('<a href="javascript:;"  class="btn btn-primary" style="width:120px;" tag="open">确认，申请开通</a>');},agreement_msg_click:function(){var data=this.plugin;M._getjson("/Plugin/setplugin",data,this._setplugin_finished.toEventHandler(this));},switch_click:function(e)
{var ele=M.EventEle(e);var plugin=ele.parents("div");var pluginid=plugin.attr("pluginid");if(M.isEmpty(pluginid)){plugin=ele;}
pluginid=plugin.attr("pluginid");var status=this._handle_status(plugin);var tag=plugin.attr("tag");var type=plugin.attr("type");if(type=='Needcar'&&status==0){var res=confirm("关闭后，您设置的时间提醒将会失效。确定关闭？");if(!res){return;}}
if(type=='Member'&&status==0){var res=confirm("关闭后，您会员设置的自动升级将会被关闭。确定关闭？");if(!res){return;}}
if(tag=="Cashier"&&status==1){this.pluginid=pluginid;this.status=status;this.context.opencashier.removeClass("btn-primary").addClass("btn-cancel").attr("flag","1");this.context.agreerules.attr("checked",false);M.Popup(this.context.cashierrules,{"hideclass":"modal fade","showclass":"modal fade in","dragable":true});}else{M._getjson("/Plugin/setplugin",{"pluginid":pluginid,"status":status},this._setplugin_finished.toEventHandler(this));}},agreerules:function(e){var agree=this.context.agreerules.is(":checked");if(agree==true){this.context.opencashier.removeClass("btn btn-cancel").addClass("btn btn-primary").attr("flag","1");}else{this.context.opencashier.removeClass("btn btn-primary").addClass("btn btn-cancel").attr("flag","");}},opencashier:function(e){var agree=this.context.agreerules.is(":checked");var flag=this.context.opencashier.attr("flag");if(agree==true&&flag==1){pluginid=this.pluginid;status=this.status;M._getjson("/Plugin/setplugin",{"pluginid":pluginid,"status":status},this._setplugin_finished.toEventHandler(this));}},_setplugin_finished:function(d){if(d.status=='success'){var req=d.req;var pluginid=req.pluginid;var status=req.status;this.context.pluginlist.children().find("li[pluginid="+pluginid+"]").attr("status",status);this.context.settingpop.find('div[tag=switch][pluginid='+pluginid+']').attr('status',status);var t=this.context.pluginlist.children().find("li[pluginid="+pluginid+"]").attr("name");var valuearr=Array('autocheckout','attn','audio','dirtyroom');if(status==1){this.context.settingpop.find('div[tag=switch]').removeClass('switch-off').addClass('switch-on');this.context.pluginlist.children().find("li[pluginid="+pluginid+"]").removeClass("plugins-off").addClass("plugins-on");if(t=='print'){this.context.settingpop.find('div[tag=printsetting]').show();}else if(t=='doorlock'){this.context.settingpop.find('div[tag=doorlock]').show();M.Popup(this.context.doorlocksettingpop,{"hideclass":"modal sm fade","showclass":"modal sm fade in","dragable":true});}else if(t=='member'){M.Popup(this.context.membersettingpop,{"hideclass":"modal large fade","showclass":"modal large fade in in","dragable":true});}else if(t=='autocheckout'){this.context.settingpop.find('div[tag=autocheckout]').show();}
else if(M.in_array(t,valuearr)){this.context.settingpop.find('div[tag='+t+']').show();}}else{this.context.settingpop.find('div[tag=switch]').removeClass('switch-on').addClass('switch-off');this.context.pluginlist.children().find("li[pluginid="+pluginid+"]").removeClass("plugins-on").addClass("plugins-off");if(t=='doorlock'){this.context.main_container.children('div.sidebar').find('li[tag=doorlock]').hide();this.context.settingpop.find('div[tag=doorlock]').hide();}else if(t=="audio"){this.audio.pause();}else if(t=='dirtyroom'){this.context.settingpop.find('input[tag=setorderdirtyroom]').removeAttr('checked');}else if(M.in_array(t,valuearr)){this.context.settingpop.find('div[tag='+t+']').hide();}}
if(t=='waterstatistics'){if(status==0){this.context.sub_nav.children('div').remove();}else{location.reload();}}
if(t=='ota'){if(status==0){this.context.header_ota.remove();}else{}}
if(t=='microinn'){if(status==1){M.Popup(this.context.rules_wkz,{"hideclass":"modal sm fade","showclass":"modal sm fade in","dragable":true});}else{this.context.microinn_openform.slideUp("fast");this.context.main_container.find("li[tag=wkz]").remove();}}
if(t=="cashier"){if(status==1){var payname="收银台";this._closepopup();M.Popup(this.context.cashierend,{"hideclass":"modal sm fade","showclass":"modal sm fade in","dragable":true});M._getjson("/Plugin/addpaymethod",{"payname":payname});}}
if(t=="print"){if(status==1){this.printset(status);}}
if(t=='consume'){if(status==1){M.Popup(this.context.consume,{"hideclass":"modal sm fade","showclass":"modal sm fade in","dragable":true});}}}else{alert(d.msg);}},cashierdetile:function(){M.Popup(this.context.cashierdetailBox,{"hideclass":"modal fade","showclass":"modal fade in","dragable":false});},_handle_status:function(plugin){var status=plugin.attr("status");if(status=='1'){status='0';}else{status='1';}
return status;},_closepopup:function()
{M.ClosePopup();},destroy:function(){}});