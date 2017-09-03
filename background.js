// 面板显示
chrome.browserAction.onClicked.addListener(function(tab) {
	chrome.tabs.sendMessage(tab.id, {type: 'toggleBar'});
});

//右键菜单:一级菜单
var parent = chrome.contextMenus.create({"title": "devtools"});
chrome.contextMenus.create({"title": "添加收藏标签", "parentId": parent, "onclick": doOnMessageToContentFromCollect});
chrome.contextMenus.create({"title": "清空收藏标签", "parentId": parent, "onclick": doClearCollectList});

// 通知内容页脚本执行 添加收藏
function doOnMessageToContentFromCollect() {
	chrome.tabs.getSelected(null, function(tab) {
	  	chrome.tabs.sendRequest(tab.id, {type: "addCollect"}, function(response) {
	  	});
	});
}

// 在当前北京中执行 清空收藏
function doClearCollectList(){
	localStorage.setItem("collects", "");
}

// 接收 注入的 menus_bar js中发送的消息
chrome.extension.onRequest.addListener(
  function(request, sender, sendResponse) {
    if (request.type == "addCollect") {
		sendMessageToContent("addCollect");
  	} else if(request.type == "cancelAddCollect") {
  		sendMessageToContent("cancelAddCollect");
  	} else if(request.type == "saveCollectData") {
		saveCollectData(request.title, request.link, request.style);
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
function saveCollectData(title, link, style) {
	var data = {
		title:title,
		link:link,
		style: style
	};
	var list = getCollectData();
	list.push(data);
	var string = JSON.stringify(list);
	localStorage.setItem("collects", string);
}

// 获取收藏的标签
function getCollectData() {
	var string = localStorage.getItem("collects");
	if(string == null || string == "") {
		return new Array();
	}
	var data = JSON.parse(string)
	return data;
}
