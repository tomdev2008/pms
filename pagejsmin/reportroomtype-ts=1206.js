var chart;var trendchart;var legend;var chartData=[{"sales":0,"name":"","nights":0}];AmCharts.ready(function(){chart=new AmCharts.AmSerialChart();chart.dataProvider=chartData;chart.categoryField="name";chart.rotate=true;chart.depth3D=0;chart.angle=10;var categoryAxis=chart.categoryAxis;categoryAxis.inside=true;categoryAxis.fillAlpha=1;categoryAxis.gridAlpha=0;var valueAxis=new AmCharts.ValueAxis();valueAxis.title="入住率对比图 百分比%";chart.addValueAxis(valueAxis);var graph=new AmCharts.AmGraph();graph.title="入住率";graph.valueField="rate";graph.type="column";graph.balloonText="[[category]]";graph.lineAlpha=0;graph.colorField="color";graph.fillAlphas=1;graph.behindColumns=true;chart.addGraph(graph);chart.write("chartdiv");loadreportdata();});function _convertdatasourcepie(source)
{var formatedsource=new Array();for(var i=0;i<source.length;i++)
{var item=source[i];formatedsource.push({"rate":item.rate,"color":item.color,"name":item.name});}
return formatedsource;}
function _convertdatasourcetrend(source)
{var formatedsource=new Array();for(var i=0;i<source.length;i++)
{var item=source[i];formatedsource.push({"ondate":M.strtotime(item.ondate),"selfsales":item.selfsales,"elongsales":item.elongsales,"ctripsales":item.ctripsales,"qunarsales":item.qunarsales,"othersales":item.othersales});}
return formatedsource;}
function reportdata_finished(d)
{$("#loading").hide();if(d.status=="success")
{var source=d.datasource;var rsource=new Array();var report=source.total;if(M.isEmpty(report)||report.length==0)
{$("#nodata").show();$("#desc").html("无数据");}
else
{$("#desc").html("总入住率为 "+source.totalrate);}
var formatedsource=_convertdatasourcepie(report);if(M.isEmpty(formatedsource)){formatedsource=[];}
chart.dataProvider=formatedsource;chart.invalidateSize();chart.validateData();chart.validateNow();chart.animateAgain();chart.write("chartdiv");}}
function loadreportdata()
{$("#loading").show();$("#nodata").hide();var tabpie=$("#tabpie").attr('class');if(tabpie=='on')
{$("#tabtrend").attr("class",'');$("#tabpie").attr("class",'on');}
else
{$("#tabtrend").attr("class",'on');$("#tabpie").attr("class",'');}
var fromtime=$("#startdate").val();var endtime=$("#enddate").val();if(M.isEmpty(fromtime)||M.isEmpty(endtime))
{var val=$("#monthselect").val();var valArr=val.split("_");fromtime=valArr[0];endtime=valArr[1];}
var innid=$("#innid").val();var cookiekey=$("#_hidden").val();M._getjson("/Reportsource/getoccupancyrate",{"fromdate":fromtime,"enddate":endtime,"innid":innid,"cookiekey":cookiekey},this.reportdata_finished);}
$(document).ready(function(){$("#startdate").datepicker({showOtherMonths:true,selectOtherMonths:true});$("#enddate").datepicker({showOtherMonths:true,selectOtherMonths:true});$("#innid").change(function(){$("#nodata").hide();loadreportdata();});$("#monthselect").change(function(){loadreportdata();});});function flushchart(num)
{if(num==2)
{$("#chartdiv").hide();$("#trendchartdiv").show();$("#tabpie").attr("class",'');$("#tabtrend").attr("class",'on');trendchart.validateData();trendchart.validateNow();trendchart.animateAgain();trendchart.write("trendchartdiv");}
else
{$("#trendchartdiv").hide();$("#chartdiv").show();$("#tabtrend").attr("class",'');$("#tabpie").attr("class",'on');chart.validateData();chart.validateNow();chart.animateAgain();chart.write("chartdiv");}}