needAskLogout = false;
var imgTotal = 0;
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
		if(imgTotal == 0){
			sorry("请上传您的图片.");
			return;
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
	uploadTip('show');
}

function uploadSuccess(result) {
	uploadTip('hidden');
	var resp = result.response.substr(result.response.lastIndexOf("<string"));
	var start = resp.indexOf(">");
	var end = resp.lastIndexOf("</string>");
	var server_url = resp.substring(start + 2, end - 1);
	insertImage(server_url);
	imgTotal++;
}

function uploadFail(error) {
	uploadTip('hidden');
	sorry("上传文件失败!errorCode:" + error.code);
}

function insertImage(url) {
	$("#content").val($("#content").val() + "[img src='" + url + "'/]");
}

function uploadTip(flg){
	if(flg == 'show'){
		$("#btn-insert").css({"display":"none"});
		$("#btn-insert-tip").css({"display":"block"});
	}else{
		$("#btn-insert").css({"display":"block"});
		$("#btn-insert-tip").css({"display":"none"});
	}
}
