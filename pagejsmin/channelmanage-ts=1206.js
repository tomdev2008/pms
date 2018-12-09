M.Page.ChannelManagePage=M.createClass();M.extend(M.Page.ChannelManagePage.prototype,{context:{},init:function(){this.initDOM();this.initEvent();this.initsort();},initDOM:function(){this.context.main=$('.main');this.context.channellist=$('#channellist');this.context.addnew=$('#addnew');this.context.addfield=this.context.channellist.children(".addnew");this.context.add_name=$("#add_name");this.context.setcolor=this.context.channellist.children("li").find("span[tag=channelcolor]");this.context.colorbox=this.context.channellist.children("li").find(".item");this.context.checkoutcolor=$("#checkoutcolor");},initEvent:function(){this.context.channellist.bind("click",this.channellist_click.toEventHandler(this));this.context.addnew.bind("click",this.addnew_click.toEventHandler(this));this.context.setcolor.bind("click",this.setcolor_click.toEventHandler(this));this.context.colorbox.bind("click",this.colorbox.toEventHandler(this));this.context.main.bind('click',this.main_click.toEventHandler(this));this.context.checkoutcolor.bind('click',this.checkoutcolor_click.toEventHandler(this));},checkoutcolor_click:function(){var checkedvalue=this.context.checkoutcolor.attr("checked");var checkoutcolor=0;if(checkedvalue=="checked"){checkoutcolor=1;}
M._getjson('/Plugin/setpluginselect',{'type':'checkoutcolor',"status":checkoutcolor},this.setCheckOutColor_finished.toEventHandler(this));},setCheckOutColor_finished:function(d){if(d.status=="success"){M.success('保存成功');}else{M.error(d.msg);}},initsort:function(){this.context.channellist.sortable({placeholder:"placeHolder",stop:this.savesort.toEventHandler(this)});},savesort:function(){var list=this.context.channellist.children("li");var data={};var sort=[];list.each(function(){var tpl=$(this);var cid=tpl.attr('cid');sort.push(cid);});data.sortdata=sort.toString();M._getjson('/Channel/sortchannel',data,this.sortchannel_finished.toEventHandler(this));},sortchannel_finished:function(d){if(d.status=="success"){if(d.ischange==1){M.success('保存成功');}}else{M.error(d.msg);}},main_click:function(e)
{var ele=M.EventEle(e);var t=ele.attr("tag");if(t!='channelcolor'){this.context.channellist.find(".list").css("display","none");}
return;},setcolor_click:function(e){var ele=M.EventEle(e);var cid=ele.parent().parent().attr("cid");this.context.channellist.find(".list").css("display","none");this.context.channellist.find("li[cid="+cid+"]").find(".list").css("display","block");},select_click:function(e){var ele=M.EventEle(e);var cid=ele.parent().parent().attr("cid");this.context.channellist.find(".list").css("display","none");this.context.channellist.find("li[cid="+cid+"]").find(".list").css("display","block");},color_select:function(ele){var cid=ele.parent().parent().attr("cid");this.context.channellist.find(".list").css("display","none");this.context.channellist.find("li[cid="+cid+"]").find(".list").css("display","block");},colorbox:function(e){var ele=M.EventEle(e);var flag=ele.attr("class");if(flag=='item'){var style=ele.children().attr("value");var cid=ele.parent().parent().parent().attr("cid");}else{var style=ele.attr("value");var cid=ele.parent().parent().parent().parent().attr("cid");}
M._getjson("/Channel/selectcolor",{"cid":cid,"style":style},this.selectcolor_finished.toEventHandler(this));},selectcolor_finished:function(d){if(d.status=="success"){var style=d.style;var cid=d.id;this.context.channellist.find(".list").css("display","none");this.context.channellist.find("li[cid="+cid+"]").find("span").removeClass("checked");this.context.channellist.find("li[cid="+cid+"]").find("span[class="+style+"]").attr("class",style+" checked");this.context.channellist.find("li[cid="+cid+"]").find("span[tag=channelcolor]").attr("class",style);}},channellist_click:function(e)
{var ele=M.EventEle(e);var t=ele.attr("tag");if(t=="del")
{this.delchannel(ele);}
if(t=='channelcolor'){this.color_select(ele);}
if(t=='color'){this.colorbox(e);}},addnew_click:function()
{this.addchannel();},addchannel:function()
{var channelname=M.getVal(this.context.add_name);if(M.isEmpty(channelname))
{alert('渠道名称不能为空');return;}
M._getjson("/Channel/addchannel",{"channelname":channelname},this.addchannel_finished.toEventHandler(this));},addchannel_finished:function(d)
{if(d.status=="success")
{var channelcode=d.channelcode;var id=d.id;var channelname=d.req.channelname;var iscus=d.iscustom;var style=iscus=="1"?"ico-custom":"ico-"+channelcode;var styletxt=iscus=="1"?channelname:"";var channel_tpl='<li cid="${id}">'
+'<i class="${style}">${styletxt}</i>'
+'<div class="ordercolors channels_color">'
+'<span class="ofreshgreen" tag="channelcolor"></span>'
+'<div class="list" style="display:none;">'
+'<div class="item"><span tag="color" value="ofreshgreen" class="ofreshgreen checked" title="清新绿"></span>清新绿</div>'
+'<div class="item"><span tag="color" value="osapphireblue" class="osapphireblue" title="宝石蓝"></span>宝石蓝</div>'
+'<div class="item"><span tag="color" value="oblue" class="oblue" title="蓝色"></span>蓝色</div>'
+'<div class="item"><span tag="color" value="ocyan" class="ocyan" title="青绿色"></span>青绿色</div>'
+'<div class="item"><span tag="color" value="ogreen" class="ogreen" title="绿色"></span>绿色</div>'
+'<div class="item"><span tag="color" value="oyellow" class="oyellow" title="黄色"></span>黄色</div>'
+'<div class="item"><span tag="color" value="oorange" class="oorange" title="橙色"></span>橙色</div>'
+'<div class="item"><span tag="color" value="ored" class="ored" title="红色"></span>红色</div>'
+'<div class="item"><span tag="color" value="oluxuryred" class="oluxuryred" title="奢华红"></span>奢华红</div>'
+'<div class="item"><span tag="color" value="opurple" class="opurple" title="紫色"></span>紫色</div>'
+'</div>'
+'</div>'
+'<label for="checkbox">${channelname}</label>'
+'<a href="#?" tag="del" title="删除该渠道" class="delete"></a>'
+'</li>';var tpl_li=$.tmpl(channel_tpl,{"id":id,"channelcode":channelcode,"channelname":channelname,"style":style,"styletxt":styletxt});this.context.channellist.append(tpl_li);this.setcolor_click(id);}
else
{if(!M.isEmpty(d.msg))
{alert(d.msg);}}
M.emptyVal(this.context.add_name);},delchannel:function(ele)
{var test=confirm("删除该渠道后，在修改原有订单时，客源渠道列表中将不再显示该渠道名称，可能会影响您的渠道统计数据，请谨慎操作。\n确认删除该渠道吗？");if(!test)return;var cid=ele.parents("li").attr("cid");if(M.isEmpty(cid))
{return;}
M._getjson("/Channel/delchannel",{"cid":cid},this.delchannel_finished.toEventHandler(this));},delchannel_finished:function(d)
{if(d.status=="success")
{var cid=d.req.cid;this.context.channellist.children("li[cid="+cid+"]").remove();}
else
{if(!M.isEmpty(d.msg))
{alert(d.msg);}}},NoUndefined:function(str)
{return M.isEmpty(str)?"":str;},_closepopup:function()
{M.ClosePopup();},destroy:function(){}});var page=null;M.ready(function(){page=new M.Page.ChannelManagePage();return page;});