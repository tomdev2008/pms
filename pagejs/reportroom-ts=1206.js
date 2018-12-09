M.Page.ReportRoom = M.createClass();
M.extend(M.Page.ReportRoom.prototype,
{
    context: {},
    dropdownliststa:{},
	submittext:"处理中...",
	tpl_consume:'<tr id="${id}" orderstatus="${orderstatus}">'
				+'<td>${guestname}</td>'
				+'<td>${roominfo}</td>'
				+'<td>${consumedate}</td>'
				+'<td>${checkoutdate}</td>'
				+'<td>${consumename2}</td>'
				+'<td>${consumename1}</td>'
				+'<td>${amount}</td>'
				+'<td>${orderstatusname}</td>'
				+'<td><a href="#?" tag="del" class="ml10">删除</a></td>'
				+'</tr>',
	cache_tpl_consumetype:{},
	cache_selectedcode:'',
	cache_selectedtype:'0',
	cache_pageindex:'1',
    init: function () {
        this.initDOM();
        this.initEvent();
        //this.initChart();
    }, 
    initDOM: function () {
		this.context.fromdate=$("#fromdate");
		this.context.enddate=$("#enddate");
		this.context.dateval=$("#dateval");
		this.context.datevallist=$("#datevallist");
        this.context.datelist=$("#datelist");
		this.context.reloadbtn=$("#reloadbtn");
		this.context.daterange=$("#daterange");
        this.context.body=$(document.body);
		this.context.innid=$("#innid");
		this.context.fromdate.datepicker({showOtherMonths: true,selectOtherMonths: true});
		this.context.enddate.datepicker({showOtherMonths: true,selectOtherMonths: true});
		this.context.exportbtn=$("#export");
		this.context.changetab=$("#change_tab");
        this.context.income_toggle=$("#income_toggle");
        this.context.income_toshow=$("#income_toshow");		
        this.context.pagelist=$("#pagelist");
        this.context.consume=$("#consume");
        this.context.nulldata=$("#nulldata");
        this.context.consumeexport=$("#consumeexport");
    },
    initEvent:function() {
		this.context.reloadbtn.bind("click",this.reloadbtn_click.toEventHandler(this));
		this.context.daterange.bind("click",this.daterange_click.toEventHandler(this));

		this.context.innid.bind("change",this.inn_change.toEventHandler(this));
        $(document.body).bind("click",this.document_click.toEventHandler(this));
		this.context.dateval.bind("focus",this.dateval_focus.toEventHandler(this));
        this.context.datelist.bind("change",this.datelist_change.toEventHandler(this));
       // this.context.exportbtn.bind("click",this.export_click.toEventHandler(this));
        this.context.changetab.bind("click",this.changetab_click.toEventHandler(this));
        this.context.income_toggle.bind("click",this.income_toggle_click.toEventHandler(this));
	    this.context.pagelist.bind("click",this.pagelist_click.toEventHandler(this));
	    this.context.consume.bind("click",this.consume_click.toEventHandler(this));
        $('#RevParinfo').find("span[tag=info]").tooltip({position:{ my: "left top+5", at: "left bottom" } });
    },
/*    export_click:function(e){
    	var fromtime=this.context.fromdate.val();
		var endtime=this.context.enddate.val();
		$.cookie('roomdate',fromtime+'_'+endtime,{'expires':'3600'});
    },*/
    datelist_change:function(e){
        document.forms[0].submit();
    },
    document_click:function(e){
    	var ele = M.EventEle(e);
    	var tag=ele.attr("tag");
    	if(M.isEmpty(tag)){
		    var tag_select = ele.parents('div[tag=consume_big]').find('div[tag=select]').attr('tag');
		    var tag_select2 = ele.parents('div[tag=consume_smart]').find('div[tag=select]').attr('tag');
		    if(tag_select!='select'){
				this.context.consume.find('th').find('div[tag=consume_big]').children('div').hide();
		    }
		    if(tag_select2!='select'){
			    this.context.consume.find('th').find('div[tag=consume_smart]').children('div').hide();
		    }
    	}
    },
    inn_change:function(e)
    {
    	document.forms[0].submit();
    },
    income_toggle_click:function(e)
    {
        var ele = M.EventEle(e);
        var t=ele.attr("tag");
        var target=null;
        if(t=="income_toggle")
        {
        	target=ele.parent().children("a[tag=income_toggle]");
        }
        if(t=="income_i")
        {	
        	target=ele.parent("a[tag=income_toggle]");
        }
        if(!M.isEmpty(target))
        {
        	 this.context.income_toggle.hide();
        	 this.context.income_toshow.slideDown("slow");        	
        }
    },
	reloadbtn_click:function(e){
        this.context.datelist.attr("name",'');
		document.forms[0].submit();
	},
	dateval_focus:function(e){
		this.context.datevallist.show();
	},
	daterange_click:function(e){
    	var ele = M.EventEle(e);
    	var t=ele.attr("tag");
		if(t=="showlist"||t=="filter")
		{
			M.stopevent(e);
			this.context.daylist.show();
		}
		if(t=="date")
		{
		}
	},
	changetab_click:function(e){
		var obj = M.EventEle(e);
		var tag = obj.attr('tag');
		if (tag) {
			var obj_li = obj.parent();
		} else {
			var obj_li = obj;
		}
		obj_li.parent().children().removeClass('on');
		obj_li.addClass('on');
		reportdata_finished({'datasource':reportdata}, tag);
	},
	pagelist_click:function(e){
		var ele = M.EventEle(e);
		var tag = ele.attr('tag');
		var p = ele.attr('p');
		if(M.isEmpty(p)){
			return false;
		}
		this.cache_pageindex = p;
		this.getconsumedateilpage(p);
	},
	getconsumedateilpage:function(p){
		var fromdate = this.context.fromdate.val();
		var enddate = this.context.enddate.val();
		var selectedcode = this.cache_selectedcode;
		var type = this.cache_selectedtype;
		var data = {'p':p,'fromdate':fromdate,'enddate':enddate,'selectedcode':selectedcode,'type':type};
		M._getjson('/Reportsource/getconsumelist',data,this.page_callback.toEventHandler(this));
	},
	page_callback:function(d){
		if(d.status=='success'){
			var data = d.data;
			var consumetypelist = data.consumetypelist;
			var tpl_tr = this.context.consume.find('tr:first').clone();
			this.context.consume.children('tbody').empty();
			this.context.consume.children('tbody').append(tpl_tr);
			if(!M.isEmpty(consumetypelist)){
				var tpl_tr_list = $.tmpl(this.tpl_consume,consumetypelist);
				this.context.consume.children('tbody').append(tpl_tr_list);
				this.handlepages(data.pagelist);
				this.cache_pageindex = data.pagelist.pageindex;
			}else{
				this.context.nulldata.show();
				this.context.pagelist.hide();
			}
		}
	},
	handlepages:function(pages){
		//this.context.pagelist.hide();
		var list=pages.pagelist;
		if(list.length==0)
			return;
		var nextpage=pages.nextpage;
		var pageindex=pages.pageindex;
		var maxpage=pages.maxpage;
		var prepage=pages.prepage;
		var html='<li><a p="'+prepage+'" tag="page" href="javascript:void(0);">&laquo;</a></li>';
		for(var i=0;i<list.length;i++){
			var p=list[i];
			if(p.code==pageindex){
				html+='<li class="active"><a href="javascript:void(0);" title="">'+p.name+'</a></li>';
			}else{
				html+=' <li><a href="javascript:void(0);" tag="page" p="'+p.code+'" title="">'+p.name+'</a></li>'
			}
		}
		if(maxpage>5){
			if(maxpage-pageindex>2){
				html+='<li><a href="javascript:void(0);">...</a></li>';
				html+='<li><a href="javascript:void(0);" tag="page" p="'+maxpage+'">'+maxpage+'</a></li>';
			}
		}
		html+='<li><a href="javascript:void(0);" tag="page" p="'+nextpage+'">&raquo;</a></li>';
		this.context.pagelist.show().html(html);
	},
	consume_click:function(e){
		var ele = M.EventEle(e);
		var tag = ele.attr('tag');
		if(tag == 'consume_big' || tag == 'consume_big_i'){
			if(tag=='consume_big_i'){
				tag = ele.parent().attr('tag');
				ele = ele.parent();
			}
			this.consumetypeselect(ele,tag);
		}else if(tag == 'consume_smart' || tag == 'consume_smart_i'){
			if(tag=='consume_smart_i'){
				tag = ele.parent().attr('tag');
				ele = ele.parent();
			}
			this.consumetypeselect(ele,tag);
		}else if(tag == 'del'){
			this.consumedetaildel(ele);
		}else if(tag == 'confirm'){
			this.searchconfirm(ele);
		}
	},
	consumedetaildel:function(ele){
		if(!confirm('是否确认删除？')){
			return false;
		}
		var id = ele.parents('tr').attr('id');
		var orderstatus = ele.parents('tr').attr('orderstatus');
		var data = {'cid':id};
		if(orderstatus==3){
			data['orderstatus'] = 'order';
		}
		M._getjson('/Book/deleteconsume',data,this.consumedetaildel_callback.toEventHandler(this));
	},
	consumedetaildel_callback:function(d){
		if(d.status=='success'){
			var data = d.detail;
			this.context.consume.find('tr[id='+data.id+']').remove();
			var tr_length = this.context.consume.find('tr').length;
			var p = parseInt(this.cache_pageindex);
			if(tr_length<=1){
				p = p - 1;
			}
			if(p>0){
				this.getconsumedateilpage(p);
			}else{
				this.context.consumeexport.hide();
				this.context.nulldata.show();
				this.context.pagelist.hide();
			}
		}
	},
	searchconfirm:function(ele){
		var fromdate = this.context.fromdate.val();
		var enddate = this.context.enddate.val();
		var selectedcode = '';
		var type = 0;
		ele.parents('div[tag=select]').find("input[type=checkbox]:checked").each(function(){
			selectedcode+=$(this).attr('val')+",";
		});
		if(M.isEmpty(selectedcode) )
		{
			alert("请您至少选择一个操作员来筛选");
			return false;
		}
		ele.parents('div[tag=select]').parent().hide();
		if(ele.parents('th').children('div').attr('tag')=='consume_big'){
			type = 1;
			this.context.consume.find('th').find('div[tag=consume_smart]').find('input[type=checkbox]').attr('checked',true)
		}else if(ele.parents('th').children('div').attr('tag')=='consume_smart'){
			type = 2;
			this.context.consume.find('th').find('div[tag=consume_big]').find('input[type=checkbox]').attr('checked',true)
		}
		this.cache_selectedcode = selectedcode;
		this.cache_selectedtype = type;
		var data = {'selectedcode':selectedcode,'type':type,'fromdate':fromdate,'enddate':enddate};
		M._getjson('/Reportsource/getconsumelist',data,this.page_callback.toEventHandler(this));
	},
	consumetypeselect:function(ele,tag){
		if(tag == 'consume_big'){
			tag = 'consume_smart';
		}else{
			tag = 'consume_big';
		}
		this.context.consume.find('th').find('div[tag='+tag+']').children('div').hide();
		if(ele.children('div').is(':hidden')){
			ele.children('div').show();
		}else{
			ele.children('div').hide();
		}
	},
    _closepopup:function()
    {
    	M.ClosePopup();
    },
    destroy: function () {

    }
});


var frweb=true;
if($("#monthselect").length>0)
{
	frweb=false;
}

function cleartable()
{
	var detail=$("#detail");
	var tbody=detail.children("tbody");
	tbody.children('tr[tag=d]').remove();
	var i=0;
	tbody.children('tr[tag=foot]').children("td").each(function(){
			$(this).html(i>0?'-':'');
			i++;
	});
	i=0;
	tbody.children('tr[tag=total]').children("td").each(function(){
		if(i>0)$(this).html('-');
		i++;
	});
	
	
	var tbody=$("#otherinfo").children("tbody");
	tbody.children('tr[tag=i]').remove();
	tbody.children('tr[tag=foot]').find('td[tag=total]').html('');
}
function createtable()
{
	var fromtime=$("#fromdate").val();
	var endtime=$("#enddate").val();
	var fromdate= M.strtotime(fromtime);
	var enddate= M.strtotime(endtime);
	var detail=$("#detail");
	var tbody=detail.children("tbody");
	var tmpl=tbody.children('tr[tag=tmpl]');
	while(fromdate<=enddate)
	{	
		var datestr=M.timeformat(fromdate,'m/d');
		var dateval=M.timeformat(fromdate);
		
		var daterow = tmpl.clone(true).show().attr('tag','d');
		daterow.attr('date',dateval);
		daterow.children('td[f=date]').html(datestr);
		daterow.insertAfter(tmpl);
		fromdate.setDate(fromdate.getDate()+1);
	}
}
function showdetail(detail,formatedsource,incomes)
{
	if(detail==null)return;
	var tbody=$("#detail").children("tbody");
	for(var i=0;i<detail.length;i++)
	{
		var d=detail[i];
		var date=d.ondate;
		var sale=d.sales;
		var rid=d.roomid;
		
		var target=tbody.children("tr[tag=d][date="+date+"]").children('td[rid='+rid+']');
		if(target.length>0)
		{
			target.html(sale);
		}	
	}	
	//显示总计
	for(var i=0;i<formatedsource.length;i++)
	{
		var d=formatedsource[i];
		var date=d.datestr;
		var sale=d.sales;
		var roomnum=d.roomnum/100;
		
		var target=tbody.children("tr[tag=d][date="+date+"]").children('td[field=sum]');
		if(target.length>0)
		{
			target.html(roomnum+"间/￥"+sale);
		}	
	}	
	if(!M.isEmpty(incomes))
	{
		for (var k in incomes) {
			var incomeval=incomes[k];
			var date=k;
			var target=tbody.children("tr[tag=d][date="+date+"]").children('td[field=other]');
			if(target.length>0)
			{
				target.html(incomeval);
			}
		}
	}
	
}

function showtotal(roomtotal)
{
	// if(M.isEmpty(detail))return;
	var tbody=$("#detail").children("tbody");
	var targettr=tbody.children('tr[tag=total]');
	//显示总计
	for(var rid in roomtotal)
	{	
		var target=targettr.children("td[rid="+rid+"]");
		if(target.length>0)
		{
			var v=roomtotal[rid];
			target.html(v>0?v:'-');
		}	
	}	
}
function showcheckinrate($ratedata)
{
	if(M.isEmpty($ratedata))return;
	var tbody=$("#detail").children("tbody");
	var footer=tbody.children("tr[tag=foot]");
	for(var i=0;i<$ratedata.length;i++)
	{
		var d=$ratedata[i];
		var rtid=d.roomtypeid;
		var rate=d.rate;
		var avg=d.avgprice;
		var total=d.totalsales;
		
		var target=footer.children('td[rtid='+rtid+']');
		if(target.length>0)
		{
			if(total>0)
			{
				var html='<p>总收益￥'+total+'</p><p>入住率'+rate+'%</p><p>平均房价￥'+avg+'</p>';
				target.html(html);
			}
		}	
	}
}

function showincomedetail(incomesource)
{
	if(M.isEmpty(incomesource)||incomesource.length==0)
	{
		$('#otherdetailhead').hide();
		$('#otherdetail').hide();
		return;
	}
	$('#otherdetailhead').show();
	$('#otherdetail').show();
	var tpl="<tr tag='i'><td>${date}</td><td>${income}</td><td>${desc}</td></tr>";
	
	var tbody=$("#otherinfo").children("tbody");
	tbody.children('tr[tag=i]').remove();
	var foot=tbody.children('tr[tag=foot]');
	var head=tbody.children('tr[tag=head]');
	var total=0;
	for(var i=0;i<incomesource.length;i++)
	{
		var income=incomesource[i];
		var d=M.timeformat(M.strtotime(income.arrivedate),'m/d');
		var val=M.math_format(income.income);
		total = M.math_add(total,val);
		var act=income.incomefrom=='delete'?'删除订单':'当日入住当日退房';
		var desc='<p>'+act+'，收入￥'+val+'</p>';
		
		var orderdesc=income.guestname;
		orderdesc+=M.isEmpty(income.channelname)?'':'&lt;'+income.channelname+'&gt;，';
		orderdesc+=M.isEmpty(income.phone)?'':income.phone+'，';
		orderdesc+=d+'入住，';
		orderdesc+='住'+income.nights+'晚，';
		orderdesc+=income.roomname+'('+income.roomtypename+')';
		desc+='<p>'+orderdesc+'</p>';
		
		var tmpl="<tr tag='i'><td>"+d+"</td><td>"+val+"</td><td>"+desc+"</td></tr>";
		$(tmpl).insertAfter(head);
	}
	foot.find('td[tag=total]').html(total);
}

/*--------------------highcharts start--------------------------*/
function createLine(xdata,ydata,caption,unit, neg) {
	var wd = parseInt($('#highcharts').css('width'));
	var num = parseInt(wd/56);
	var xlen = xdata.length;
	$('#highcharts').highcharts({
	    title: {
	        text: caption+'趋势图',
	        x: -20 //center
	    },
	    xAxis: {
	        categories: xdata,
			labels:{
				step:Math.ceil(xlen/num)
			}
	    },
	    yAxis: {
	        title: {
	            text: ''
	        },
	        min:neg?null:0, // 判断是否存在负值
	        plotLines: [{
	            value: 0,
	            width: 1,
	            color: '#808080'
	        }]
	    },
	    tooltip: {
	        valueSuffix: unit
	    },
	    legend: {
	    	enabled:false,
	        layout: 'vertical',
	        align: 'right',
	        verticalAlign: 'middle',
	        borderWidth: 0
	    },
	    credits:{ // 版权信息
            enabled:false
        },
	    series: [{
	        name: caption,
	        data: ydata
	    }]
	});
	
	// 重置样式
	var yy = $(".highcharts-xaxis-labels text[opacity='1']:first").attr('y');
	$(".highcharts-xaxis-labels text[opacity='1']").attr('y', yy);
	
}
/*----------------------highcharts start-----------------------*/

function _convertdatasource(source)
{
	var formatedsource=new Array();
	for(var i=0;i<source.length;i++)
	{
		var item=source[i];
		item.ondate=item.ondate.substr(0,10);
		formatedsource.push({"ondate":M.strtotime(item.ondate),"sales":item.sales,"roomnum":parseInt(item.roomnum),"realroomnum":parseInt(item.realroomnum),'datestr':item.ondate});
	}
	return formatedsource;
}
function reportdata_finished(d, t)
{
    if(frweb){
        cleartable();
        createtable();
    }
	if(1==1)
	{
		var source=d.datasource;
		var rsource=new Array();
		if(!M.isEmpty(source))
		{
			var report=source.report;
			var periodadr=source.periodadr;
			var todayadr=source.todayadr;
			var totaldata=source.totaldata;
			
			var formatedsource=_convertdatasource(report);
			if(M.isEmpty(formatedsource)){
				formatedsource=[];
			}
			
			//显示详细
			if(frweb)
			{	
				showdetail(source.detail,formatedsource,source.other);
				showtotal(source.roomtotal);
				showcheckinrate(source.checkinrate);
				showincomedetail(source.othersource);
			}

            //计算准备报表数据
			var source=source.reportsource;
			//var f_source=[];
			var xdata=[];
			var ydata=[];
			for(var k in source){
				var item=source[k];
				//f_source.push({"x":item.name,"y":item.sales});
				xdata.push(item.name);
				if (t == '1') {
					ydata.push(M.math_format(item.sales));
					var caption = '营业收入';
					var unit = ' 元';
				}else if (t == '2') {
					ydata.push(parseInt(item.rooms));
					var caption = '实住房间数';
					var unit = ' 间';					
				}else if (t == '3') {
					ydata.push(item.rate);
					var caption = '入住率';
					var unit = ' %';
				}else if (t == '4') {
					ydata.push(M.math_format(item.ave));
					var caption = '平均房价';
					var unit = ' 元/间';
				}
			}
			var ydata_str = "'"+ydata+"'";
			// 判断是否有负值
			if (ydata_str.indexOf('-') > 0) {
				createLine(xdata,ydata, caption, unit, -1);
			}else {
				createLine(xdata,ydata, caption, unit);
			}
		}
	}
}

$(document).ready(function(){
    reportdata_finished({'datasource':reportdata}, 1);
});
M.ready(function () {
	page = new M.Page.ReportRoom();
	return page;
});






