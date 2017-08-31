// 面板显示
chrome.browserAction.onClicked.addListener(function(tab) {
	chrome.tabs.sendMessage(tab.id, {type: 'toggleBar'});
});

//右键菜单:一级菜单
var parent = chrome.contextMenus.create({"title": "devtools"});
chrome.contextMenus.create({"title": "添加收藏", "parentId": parent, "onclick": doOnMessageToContentFromCollect});

// 通知内容页脚本执行 添加收藏
function doOnMessageToContentFromCollect() {
	chrome.tabs.getSelected(null, function(tab) {
	  	chrome.tabs.sendRequest(tab.id, {type: "addCollect"}, function(response) {
	  	});
	});
}

// 接收 注入的 menus_bar js中发送的消息
chrome.extension.onRequest.addListener(
  function(request, sender, sendResponse) {
    if (request.type == "addCollect") {
		sendMessageToContent("addCollect");
  	} else if(request.type == "cancelAddCollect") {
  		sendMessageToContent("cancelAddCollect");
  	} else if(request.type == "saveCollectData") {
		saveCollectData(request.title, request.link);
	} else if(request.type == "getCollectList") {
		var data = getCollectData();
		sendResponse({list:data});
  	}
});
  
// 发送消息到默认content.js  
function sendMessageToContent(type) {
	chrome.tabs.getSelected(null, function(tab) {
	  	chrome.tabs.sendRequest(tab.id, {type: type}, function(response) {
	  	});
	});  	
}  

// 保存收藏的标签
function saveCollectData(title, link) {
	var data = {
		title:title,
		link:link
	};
	var list = new Array();
	if(list.length == 0) {
		list = new Array();
		list.push(data);
	} else {
		list.push(data);
	}
	var string = JSON.stringify(list);
	localStorage.setItem("collects", string);
}

// 获取收藏的标签
function getCollectData() {
	//saveCollectData("test", "http://www.baidu.com");
	var string = localStorage.getItem("collects");
	if(string == null) {
		return new Array();
	}
	var data = JSON.parse(string)
	return data;
}
