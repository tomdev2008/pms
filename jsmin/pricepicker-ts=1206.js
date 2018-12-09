
var PROP_NAME="pricepicker";M.Controls.PricePicker=M.createClass();M.extend(M.Controls.PricePicker.prototype,{options:{months:6,fromdate:null,enddate:null,firstdate:null,lastdate:null,maxdate:null,date:new Date(),datestr:"",headerorder:[1,2,3,4,5,6,0],weektext:{"1":"周一","2":"周二","3":"周三","4":"周四","5":"周五","6":"周六","0":"周日"},editclass:"iorange"},systime:new Date(),systimestr:"",today:new Date(),getsystime:function(){var date=M.getTime();return date;},_getdatetime:function()
{var date=M.getTime();return date;},gettoday:function()
{var date=M.getTime();var newdate=new Date(date.getFullYear(),date.getMonth(),date.getDate());return newdate;},_pricesource:{},_defaultprice:"",_created:false,_head:null,_content:null,_selectvalele:null,_picker:null,_dateconverter:null,_contentClickHandler:null,_dateselected:null,_renderday:function(date,datasource,i)
{var price="";if(M.isEmpty(datasource))
{var time_today=this.today;if(date>=time_today)
{price=this._defaultprice;}}
else
{price=datasource.price;}
var html=this.pricepicker_convert(date,price,i);return html;},create:function(ele){if(this.options.date==null){this.options.date=new Date();}
this.options.fromdate=this._pricefromdate(this.options.date);this.options.enddate=this._priceenddate(this.options.date);this.options.lastdate=this._lastdate(this.options.date);this.options.firstdate=this._firstdate(this.options.date);ele.prepend(this._picker);this._head=$('<ul class="h"></ul>');this._content=$('<ul tag="selectable" class="d"></ul>');this._selectvalele=$('<input type="hidden" id="pricepickerval" />');this._picker=this._content;ele.append(this._content);ele.append(this._selectvalele);ele.append('<div class="clear"></div>');this._content.bind("click",this.content_click.toEventHandler(this));},setOptions:function(options)
{this.systime=this.getsystime();this.systimestr=this.timeformat(this.systime);this.today=this.gettoday();this.options.date=this.getsystime();if(!M.isEmpty(options.editclass)){this.options.editclass=options.editclass;}
if(!M.isEmpty(options.months)&&options.months>0){this.options.months=options.months;}
if(M.isEmpty(options.maxdate))
{this.maxdate=this.getsystime().setFullYear(this.systime.getFullYear()+1);}
else
{this.maxdate=options.maxdate;}},setDateConverter:function(converter){this._dateconverter=converter;},setHeaderConverter:function(converter){this._headerconverter=converter;},setdateselected:function(selected){this._dateselected=selected;},_generatepicker:function(){this._generatecontent();var that=this;this._content.selectable({filter:"li[edit=1]",selecting:function(event,ui){},selected:function(event,ui){var date=$(ui.selected).attr("date");var val=that._selectvalele.val();val+="d"+date+"p"+"$p";that._selectvalele.val(val);},stop:function(event,ui)
{if(that.has_stop())
{that.select_end();}},unselected:function(event,ui)
{that._selectvalele.val("");}});},enable_selectable_stop:function(){this._selectvalele.attr("catchstop",'1');},disable_selectable_stop:function(){this._selectvalele.attr("catchstop",'0');},has_stop:function(){return this._selectvalele.attr("catchstop")!="0";},select_end:function()
{var val=this._selectvalele.val();if(M.isEmpty(val))
{return;}
if(!M.isEmpty(this._dateselected))
{this._dateselected.call(this,this._selectvalele,val);}},before_open:function(){this.enable_selectable_stop();var that=this;$(document).bind("keydown",function(event){var event_code=event.keyCode||event.which;if(event_code==17||event_code==91)
{that.disable_selectable_stop();}});$(document).bind("keyup",function(event){var event_code=event.keyCode||event.which;if(event_code==17||event_code==91)
{that.enable_selectable_stop();that.select_end();}});},before_close:function(){this.enable_selectable_stop();$(document).unbind("keydown");$(document).unbind("keyup");},_generatepickerheader:function(){var headhtml='';var wkname="";var wkday="";for(var p in this.options.headerorder){wkname=this.options.weektext[p];wkday=p;headhtml+='<li>'+wkname+'</li>';}
this._head.html(headhtml);},_generatecontent:function()
{var fdate=this.options.fromdate;var edate=this.options.enddate;var bodyhtml="";var temphtml="";var time_today=this.gettoday();for(var i=0;fdate<=edate;i++)
{var dayofweek=fdate.getDay();var formatdate=this.timeformat(fdate);var priceObj=this._pricesource[formatdate];var pricetype=M.isEmpty(priceObj)?"0":priceObj.pricetype;if(fdate>=this.maxdate)
{}
if(fdate>=time_today&&fdate<=this.maxdate)
{var day_str=this.timeformat(fdate);var classname="";if(pricetype==1){classname=M.isEmpty(this.options.editclass)?"":this.options.editclass;}
if(this.systimestr==day_str)
{classname="today";}
bodyhtml+="<li edit='1' class='"+classname+"' type='"+pricetype+"' date='"+formatdate+"'>";}
else
{bodyhtml+="<li edit='0' date='"+formatdate+"' class='igray'>";}
if((M.isEmpty(priceObj)&&!(fdate>=time_today&&fdate<=this.maxdate))||fdate>this.maxdate){priceObj={"price":0,"pricetype":"0"};}
bodyhtml+=this._renderday(fdate,priceObj,i);bodyhtml+="</li>";fdate.setDate(fdate.getDate()+1);}
this._content.html(bodyhtml);},_changemonth:function(date){this.options.date=date;this.options.fromdate=this._pricefromdate(this.options.date);this.options.enddate=this._priceenddate(this.options.date);this._selectvalele.val("");this._generatepicker();},disable:function()
{},enable:function()
{},changedate:function(dateStr,pricesource)
{var datetime=new Date(Date.parse(dateStr.replace(/-/g,"/")));this._changemonth(datetime);},setcontent_clickhandler:function(handler){this._contentClickHandler=handler;},content_click:function(e)
{if(this._contentClickHandler!=undefined&&this._contentClickHandler!=null){this._contentClickHandler.call(this._contentClickHandler.content,e);}},setPriceSource:function(pricesource)
{if(!M.isEmpty(pricesource))
{this._pricesource=pricesource;}
else
{this._pricesource={};}},cleardefaultprice:function(){this._defaultprice='';},setdefaultprice:function(price)
{if(!M.isEmpty(price))
{this._defaultprice=price;var pricestr=M.isEmpty(price)?"":"￥"+price;this._content.children("li[type!=1]").each(function(){if($(this).attr("edit")=="1"||true)
{$(this).children("b").html(pricestr);}});if(!M.isEmpty(this._pricesource))
{var time_today=this.gettoday();for(var k in this._pricesource){if(M.isEmpty(k))
{continue;}
var dt=new Date(k);if(dt>=time_today)
{var v=this._pricesource[k];if(v.pricetype!="1")
{this._pricesource[k].price=price;}}}}}},getselectedvalue:function()
{return this._selectvalele.val();},setselectedvalue:function(val)
{this._selectvalele.val(val);},setupddateprice:function(dateprice){if(M.isArray(dateprice)){var editclass=this.options.editclass;for(var k in dateprice){this._content.find("li").each(function(){if($(this).attr('date')==dateprice[k].date){var pricestr=M.isEmpty(dateprice[k].price)?"":"￥"+dateprice[k].price;$(this).children("b").html(pricestr);$(this).attr("type","1");if(!M.isEmpty(editclass)){$(this).attr("class",editclass);}}});}
if(!M.isEmpty(dateprice))
{for(var i=0;i<dateprice.length;i++)
{var price=dateprice[i].price;var date=dateprice[i].date;var t=this._pricesource[date];if(!M.isEmpty(t))
{this._pricesource[date].price=price;this._pricesource[date].pricetype="1";}
else
{this._pricesource[date]={"price":dp.price,"pricetype":"1"};}}}}else{return false;}},setselecteddateprice:function(price,pricestr)
{var editclass=this.options.editclass;this._content.find("li.ui-selected").each(function(){var pricestr=M.isEmpty(price)?"":"￥"+price;$(this).children("b").html(pricestr);$(this).attr("type","1");if(!M.isEmpty(editclass)){$(this).attr("class",editclass);}});if(!M.isEmpty(pricestr))
{var priceArr=pricestr.split("d");for(var i=0;i<priceArr.length;i++)
{var dp=priceArr[i];var dparr=dp.split("p");var d=dparr[0];var t=this._pricesource[d];if(!M.isEmpty(t))
{this._pricesource[d].price=price;this._pricesource[d].pricetype="1";}
else
{this._pricesource[d]={"price":price,"pricetype":"1"};}}}},getfromdate:function()
{return this.timeformat(this.options.firstdate);},getenddate:function()
{return this.timeformat(this.options.lastdate);},refresh:function()
{this._content.selectable("refresh");this._selectvalele.val("");this._content.children(".ui-selected[edit=1][type=1]").attr("class","iorange");this._content.children(".ui-selected[edit=1][type=0]").attr("class","");},_issamemonth:function(date1,date2)
{return(date1.getFullYear()==date2.getFullYear()&&date1.getMonth()==date2.getMonth());},_pricefromdate:function(fromdate)
{var firstdayofmonth=new Date(fromdate.getFullYear(),fromdate.getMonth());var dayofweek=firstdayofmonth.getDay();if(dayofweek==0){dayofweek=7;}
var lessdays=dayofweek-1;firstdayofmonth.setDate(firstdayofmonth.getDate()-lessdays);return firstdayofmonth;},pricepicker_convert:function(date,price,i)
{var day=date.getDate();var datestr=M.timeformat(date,"Y-m-d");var holiday=M.Holiday();var value=holiday.getholiday(datestr);var wk=date.getDay();var wkname=this.options.weektext[wk];var pricestr=M.isEmpty(price)?"":"￥"+price;var daystr=i<7?day+wkname:day;var day_str=this.timeformat(date);if(this.systimestr==day_str)
{daystr=day+"(今天)";}
if(!M.isEmpty(value)){var tpl='<i class="holiday"><tt>'+value+'</tt>'+daystr+'</i>'
+'<b>'+pricestr+'</b>';}else{var tpl='<i>'+daystr+'</i>'
+'<b>'+pricestr+'</b>';}
return tpl;},_priceenddate:function(fromdate)
{var firstdayofnextmonth=new Date(fromdate.getFullYear(),fromdate.getMonth()+1,1);firstdayofnextmonth.setDate(firstdayofnextmonth.getDate()-1);var dayofweek=firstdayofnextmonth.getDay();var adddays=7-dayofweek;firstdayofnextmonth.setDate(firstdayofnextmonth.getDate()+adddays);return firstdayofnextmonth;},_firstdate:function(fromdate)
{var firstdayofmonth=new Date(fromdate.getFullYear(),fromdate.getMonth(),1);var dayofweek=firstdayofmonth.getDay();var lessdays=dayofweek;firstdayofmonth.setDate(firstdayofmonth.getDate()-lessdays);return firstdayofmonth;},_lastdate:function(fromdate)
{var firstdayofnextmonth=new Date(fromdate.getFullYear(),fromdate.getMonth()+this.options.months,1);firstdayofnextmonth.setDate(firstdayofnextmonth.getDate()-1);var dayofweek=firstdayofnextmonth.getDay();var adddays=7-dayofweek;firstdayofnextmonth.setDate(firstdayofnextmonth.getDate()+adddays);return firstdayofnextmonth;},timeformat:function(date){var time=""+date.getFullYear()+"-"+this.zerosize(date.getMonth()+1+"",2)+"-"+this.zerosize(date.getDate()+"",2);return time;},zerosize:function(value,length){if(!length){length=2;}
value=String(value);for(var i=0,zeros='';i<(length-value.length);i++){zeros+='0';}
return zeros+value;},_destroy:function(){$(document).unbind("keydown");}});M.extend(M,{PricePicker:function(ele,options){var control=new M.Controls.PricePicker();control.setOptions(options);control.create(ele);return control;}});