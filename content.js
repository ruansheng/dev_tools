// 主面板按键快捷键监听
$(document).keypress(function(e) {
    var keyCode = e.which;
    var ctrlKey = e.ctrlKey || e.metaKey;
	var shiftKey = e.shiftKey;
    if(ctrlKey && shiftKey && keyCode == 4) {  // ctrl + shift + D
    	toggleBarDispaly();
	}
	return true;
});

// 添加主面板iframe
var barFrame = document.createElement('iframe');
barFrame.setAttribute("id", "tools-iframe");
barFrame.src = chrome.runtime.getURL('bar.html');
$("body").prepend(barFrame);
$("#tools-iframe").css({"position":"fixed", "width":"100%", "height":"350px", "z-index":10000, "top":"0px", "left":"0px", "display":"none"});

// 添加上线文菜单(添加收藏)iframe
var menusAddcollectBarFrame = document.createElement('iframe');
menusAddcollectBarFrame.setAttribute("id", "menus-addcollect-iframe");
menusAddcollectBarFrame.src = chrome.runtime.getURL('menus_addcollect_bar.html');
$("body").prepend(menusAddcollectBarFrame);
$("#menus-addcollect-iframe").css({"position":"fixed", "width":"100%", "height":"100%", "z-index":10000, "top":"0px", "left":"0px", "display":"none"});

/**
* Bar Dispaly
*/
function toggleBarDispaly() {
	var display =$('#tools-iframe').css('display');
	if(display == 'none'){
	 	$("#tools-iframe").css({"display":"block"});  
	} else {
		$("#tools-iframe").css({"display":"none"});
	}
}

/**
* Addcollect Bar Dispaly
*/
function contextMenusAddcollectBarDispaly() {
	var display =$('#menus-addcollect-iframe').css('display');
	if(display == 'none'){
	 	$("#menus-addcollect-iframe").css({"display":"block"});  
	} else {
		$("#menus-addcollect-iframe").css({"display":"none"});
	}
}

function sendMessageToAddcollectBar() {
	var port = chrome.runtime.connect({name: "menus_pipe"});//通道名称
	port.postMessage({type: "open_modal"});//发送消息
	port.onMessage.addListener(function(msg) {//监听消息

	});
}

// 接收background.js的消息
chrome.runtime.onMessage.addListener(function(msg) {
	if (msg.type == "toggleBar") {
		toggleBarDispaly();
	}
});

// 接收background.js的消息
chrome.extension.onRequest.addListener(
  	function(request, sender, sendResponse) {
    	if(request.type == "addCollect") {
			contextMenusAddcollectBarDispaly();
			sendMessageToAddcollectBar();
		} else if(request.type == "cancelAddCollect") {
			contextMenusAddcollectBarDispaly();
		}
	}
);

// 接收bar.js menus_bar.js的消息
chrome.extension.onMessage.addListener(
  	function(request, sender, sendResponse) {
    	if(request.type == "get_page_info") {
			var title = document.title;
			var url = window.location.href;
			sendResponse({title:title, url:url}); 
		} else if(request.type == "get_select_content") {
			var selectionObj = window.getSelection();
			var rangeObj = selectionObj.getRangeAt(0);
			var docFragment = rangeObj.cloneContents();
			sendResponse({content:docFragment}); 
		}
});

