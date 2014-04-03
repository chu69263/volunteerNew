needAskLogout = false;
$(function() {
	var ul = $("article ul").html("");
	ajaxGet(imgNwsService + "ImgNews", { userId: getUser() }, function(data) {
		var d = XML2JSON(data);
		for (var i = 0, arr; arr = d[i++];) {
			var btn = "<button type='button' n_id='" + arr[0] + "'>&times;</button>";
			ul.append("<li><span>" + arr[1] + "<br><span>" + arr[2] + "</span><br><span>" + arr[3] + "</span></span>" + btn + "</li>");
		}
		
		ul.find("button").click(function(){
			var id = $(this).attr("n_id");
			confirm("你真的要删除本条交流吗？",function(btn) { btn === 1 && delItem(id); }, "提 示", "是,否");
		});
	});
	
	$("#create").click(function(){
		redirect("add-news.html");
	});
})
function delItem(nId){
	ajaxGet(imgNwsService+"delImgNew",{id:nId},function(data){
		var d = XML2JSON(data);
		if(d=='1'){
			good("删除成功");
			win.location.reload();
		}else{
			sorry("删除失败");
		}
	});
}