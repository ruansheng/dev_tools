// 面板显示
chrome.browserAction.onClicked.addListener(function(tab) {
	chrome.tabs.sendMessage(tab.id, {type: 'toggleBar'});
});

//右键菜单:一级菜单
var parent = chrome.contextMenus.create({"title": "devtools"});
chrome.contextMenus.create({"title": "添加收藏", "parentId": parent, "onclick": doOnMessageToContentFromCollect});
chrome.contextMenus.create({"title": "转时间戳", "parentId": parent, "onclick": doOnMessageToContentFromTrantimestamp});
chrome.contextMenus.create({"title": "转日期", "parentId": parent, "onclick": doOnMessageToContentFromTrandate});

// 通知内容页脚本执行 添加收藏
function doOnMessageToContentFromCollect() {
	chrome.tabs.getSelected(null, function(tab) {
	  	chrome.tabs.sendRequest(tab.id, {type: "addCollect"}, function(response) {
	  	});
	});
}

// 通知内容页脚本执行 转时间戳
function doOnMessageToContentFromTrantimestamp() {
	chrome.tabs.getSelected(null, function(tab) {
	  	chrome.tabs.sendRequest(tab.id, {type: "tranTimestamp"}, function(response) {
	  	});
	});
}

// 通知内容页脚本执行 转日期
function doOnMessageToContentFromTrandate() {
	chrome.tabs.getSelected(null, function(tab) {
	  	chrome.tabs.sendRequest(tab.id, {type: "tranDate"}, function(response) {
	  	});
	});
}

// 接收 注入的 menus_bar js中发送的消息
chrome.extension.onRequest.addListener(
  function(request, sender, sendResponse) {
    if (request.type == "addCollect") {
		sendMessageToContent("addCollect");
  	} else if(request.type == "tranTimestamp") {
		sendMessageToContent("tranTimestamp");  		
  	} else if(request.type == "tranDate") {
		sendMessageToContent("tranDate");  		
  	}
});
  
// 发送消息到默认content.js  
function sendMessageToContent(type) {
	chrome.tabs.getSelected(null, function(tab) {
	  	chrome.tabs.sendRequest(tab.id, {type: type}, function(response) {
	  	});
	});  	
}  