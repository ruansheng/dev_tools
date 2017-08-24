// 面板显示
chrome.browserAction.onClicked.addListener(function(tab) {
	chrome.tabs.sendMessage(tab.id, {type: 'toggleBar'});
});

//右键菜单:一级菜单
var parent = chrome.contextMenus.create({"title": "devtools"});
var id = chrome.contextMenus.create({"title": "添加收藏", "parentId": parent, "onclick": doOnMessageToContent});

// 通知内容页脚本执行 添加收藏
function doOnMessageToContent() {
	chrome.tabs.getSelected(null, function(tab) {
	  	chrome.tabs.sendRequest(tab.id, {type: "addCollect"}, function(response) {
	    	//console.log(response.farewell);
	  	});
	});
}
