needAskLogout = false;
$(function() {
	var nowMill = new Date().getTime();
	var dayMill = 259200000;
	var sd = new Date();
	sd.setTime(nowMill + dayMill);
	var month = sd.getMonth() + 1;
	month = month < 10 ? ("0" + month) : month;
	var day = sd.getDate();
	day = day < 10 ? ("0" + day) : day;
	$("#txt_start_date").val(sd.getFullYear() + "-" + month + "-" + day);
	$("#txt_start_date").on('change',function(){
		$("#txt_end_date").val($(this).val());
	});
	$("#commit").click(function() {
		var title = $("#txt_title").val();
		var type = "";
		var seltype = document.getElementById("sel_type");
		if(seltype.selectedIndex > -1){			
			type = seltype.options[seltype.selectedIndex].value;
		}
        var address = $("#txt_address").val();
        var number = $("#txt_people").val();
        var content = $("#txt_content").val();
        var start = $("#txt_start_date").val();
        var end = start;
        var hour = $("#txt_time").val();
        var contact = $("#txt_contact").val();
        var phone = $("#txt_contact_phone").val();
        var arr = [title,address,number,content,end,start,hour,contact,phone];
        var complete = true;
        $.each(arr,function(index,value){
        	if(value===""){
        		complete = false;
        		return;
        	}
        });
        if (!complete) sorry("请先完善活动信息！");
        else if (!/^\d+$/i.test(number)) sorry("人数只能输入整数！"), $("#txt_people").focus();
        else if (!/^\d+$/i.test(hour)) sorry("时长只能输入整数！"), $("#txt_time").focus();
        else if(end > start) sorry("报名截止日期小于等于开展日期！"),$("#txt_end_date").focus();
        else {
        	var params = {};
        	params.id = getUser();
        	params.name = title;
        	params.type = type;
        	params.local = address;
        	params.count = number;
        	params.content = content;
        	params.end = end;
        	params.begin = start;
        	params.hour = hour;
        	params.contact = contact;
        	params.phone = phone;
        	ajaxGet(temService + "AddActivity", params, function(data) {
            	var d = XML2JSON(data);
            	d === 0 ? sorry("提交信息失败！") : (good("提交信息成功！"), redirect("activities-manager.html"));
            });
        }
	});
	ajaxGet(temService + "GetActivityType", {}, function(data) {
		var d = XML2JSON(data);
		var type = $("#sel_type").html("");
		for ( var i in d) {
			type.append($("<option>").text(d[i]));
		}
	});
	ajaxGet(temService + "GetUserPhone", {
		id : getUser()
	}, function(data) {
		var d = XML2JSON(data);
		if (d.length >= 2) {
			$("#txt_contact").val(d[0]);
			$("#txt_contact_phone").val(d[1]);
		}
	});
});