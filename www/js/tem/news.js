needAskLogout = false;
$(function() {
	$("#btn-insert").click(getpic);
	$("#btn-pre").click(preNew);
	$("#pre-content").click(function() {
		this.style.display = "none";
	});
	$("#commit").click(function() {
		var id = getUser();
		var title = $("#txt_title").val();
		var content = parseContent();
		if(title === ""||content === ""){
			sorry("请先完善新闻信息！");
			return ;
		}
		ajaxGet(volService + "AddNews", {
			id : id,
			title : title,
			content : content
		}, function(data) {
			var d = XML2JSON(data);
        	d === 0 ? sorry("提交信息失败！") : (good("提交信息成功！"), redirect("info.html"));
		}, false, "POST");
	});
});

function preNew() {
	$("#pre-content").css("display", "block");
	$("#pre-content").html(parseContent());
}
function parseContent() {
	var h = $("#content").val();
	h = h.replace(/\[img/g, "<img").replace(/\/]/g, "/>");
	return h;
}
function getpic() {
	good(nav);
	good(JSON.stringify(nav));
	nav.camera.getPicture(uploadImage, picError, {
		sourceType : nav.camera.PictureSourceType.SAVEDPHOTOALBUM,
		destinationType : nav.camera.DestinationType.FILE_URL
	});
}

function picError(message) {
	// sorry(message);
}

function uploadImage(uri) {
	var ops = new FileUploadOptions();
	ops.fileKey = "file";
	ops.fileName = uri.substr(uri.lastIndexOf('/') + 1);
	ops.mimeType = "image/jpeg";
	ops.chunkedMode = false;
	var ft = new FileTransfer();
	ft.upload(uri, encodeURI(volService + "UploadFile"), uploadSuccess,
			uploadFail, ops);
}

function uploadSuccess(result) {
	var resp = result.response.substr(result.response.lastIndexOf("<string"));
	var start = resp.indexOf(">");
	var end = resp.lastIndexOf("</string>");
	var server_url = resp.substring(start + 2, end - 1);
	insertImage(server_url);
}

function uploadFail(error) {
	sorry("上传文件失败!errorCode:" + error.code);
}

function insertImage(url) {
	$("#content").val($("#content").val() + "[img src='" + url + "'/]");
}
