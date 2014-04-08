needAskLogout = false;
$(function() {
    ajaxGet(groupService + "Detail", { id: getItem("gid") }, function(data) {
        var d = XML2JSON(data);
        $("#title").html(d[0]);
        $("#source").val(d[1]);
        $("section").html(d[2].replace(/src="..\//gim, "src=\"" + fileHost));
    });

    $("nav ul").click(function (e) {
        var tag = e.target;
        if (tag.nodeName.toUpperCase() !== "LI") {
            while (tag.parentNode.nodeName.toUpperCase() !== "LI") tag = tag.parentNode;
            tag = tag.parentNode;
        }
        switch (tag.id) {
            case "home": redirect("../index.html"); break;
            case "news": redirect("../nws/list.html"); break;
            case "activity": redirect("../vol/launch-activity.html"); break;
            case "imgnew": redirect("../imgnws/list.html"); break;
            case "help": redirect("../help.html"); break;
            case "login": redirect("../login.html"); break;
        }
    });
})