M.Page.ReportCrmCity=M.createClass();M.extend(M.Page.ReportCrmCity.prototype,{context:{},init:function(){this.initDOM();this.initEvent();this.initfun();this.initChart();},initDOM:function(){this.context.body=$('body');this.context.maincontent=$('#maincontent');this.context.reportimg=$('#reportimg');},initEvent:function(){this.context.body.bind('click',this.body_click.toEventHandler(this));},initfun:function(){var divtag_title=this.context.maincontent.children('div[tag=title]');M.DropdownList(divtag_title.find('div[t=innlist]'),this.select_change.toEventHandler(this),{});M.DropdownList(divtag_title.find('div[t=datelist]'),this.select_change.toEventHandler(this),{});},select_change:function(){var divtag_title=this.context.maincontent.children('div[tag=title]');var valueinnid=divtag_title.find('div[t=innlist]').children('span').attr('value');var valuedate=divtag_title.find('div[t=datelist]').children('span').attr('value');window.location.href='/report/reportcrmcity?valueinnid='+valueinnid+'&datecode='+valuedate;},body_click:function(e){var ele=M.EventEle(e);var tpl=ele.parents("div[tag=dropdownlist]");var style=ele.attr("tag");if(tpl.length==0&&style!='dropdownlist'){var divtag_title=this.context.maincontent.children('div[tag=title]');divtag_title.children().find(".droplist_on").removeClass("droplist_on").children("div").hide();}else if(!M.isEmpty(tpl)){var divtag_title=this.context.maincontent.children('div[tag=title]');if(M.isEmpty(tpl.attr("t"))){tpl=ele;}
if(tpl.attr("t")=='innlist'){divtag_title.find("div[t=datelist]").removeClass("droplist_on").children("div").hide();}else if(tpl.attr("t")=='datelist'){divtag_title.find("div[t=innlist]").removeClass("droplist_on").children("div").hide();}}},initChart:function(){var source_channel=reportdata.report;var f_source_channel=new Array();for(var d in source_channel)
{var v=source_channel[d];if(v.rate==0){continue;}
f_source_channel.push({"name":v.cityname,"color":v.color,y:parseInt(v.citynum)});}
var clolor=reportdata.graph;if(!M.isEmpty(f_source_channel)||f_source_channel.length>0){var incomepie=this.context.reportimg.highcharts({chart:{plotBackgroundColor:null,plotBorderWidth:null,plotShadow:true},title:{text:''},tooltip:{pointFormat:'{series.name}: <b>{point.percentage:.1f}%</b>'},credits:{enabled:false},plotOptions:{pie:{size:"80%",allowPointSelect:true,cursor:'pointer',dataLabels:{enabled:true,color:'#000000',connectorColor:'#000000',format:'{point.name}: {point.percentage:.1f} %'},colors:clolor}},legend:{layout:'vertical',align:'right',verticalAlign:'top',x:5,y:50,borderWidth:0,labelFormatter:function(){return this.name+'&nbsp';},useHTML:true},series:[{type:'pie',name:'占比',data:f_source_channel}]});}}});var reportCrmCity;M.ready(function(){reportCrmCity=new M.Page.ReportCrmCity();return reportCrmCity;});