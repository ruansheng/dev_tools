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
$("#tools-iframe").css({"position":"fixed", "width":"100%", "height":"500px", "z-index":10000, "top":"0px", "left":"0px", "display":"none"});

// 添加上线文菜单(添加收藏)iframe
var menusAddcollectBarFrame = document.createElement('iframe');
menusAddcollectBarFrame.setAttribute("id", "menus-addcollect-iframe");
menusAddcollectBarFrame.src = chrome.runtime.getURL('menus_addcollect_bar.html');
$("body").prepend(menusAddcollectBarFrame);
$("#menus-addcollect-iframe").css({"position":"fixed", "width":"100%", "height":"100%", "z-index":10000, "top":"0px", "left":"0px", "display":"none"});

// 添加上线文菜单(转时间戳)iframe
var menusTrantimestampBarFrame = document.createElement('iframe');
menusTrantimestampBarFrame.setAttribute("id", "menus-trantimestamp-iframe");
menusTrantimestampBarFrame.src = chrome.runtime.getURL('menus_trantimestamp_bar.html');
$("body").prepend(menusTrantimestampBarFrame);
$("#menus-trantimestamp-iframe").css({"position":"fixed", "width":"100%", "height":"100%", "z-index":10000, "top":"0px", "left":"0px", "display":"none"});

// 添加上线文菜单(转日期)iframe
var menusTrandateBarFrame = document.createElement('iframe');
menusTrandateBarFrame.setAttribute("id", "menus-trandate-iframe");
menusTrandateBarFrame.src = chrome.runtime.getURL('menus_trandate_bar.html');
$("body").prepend(menusTrandateBarFrame);
$("#menus-trandate-iframe").css({"position":"fixed", "width":"100%", "height":"100%", "z-index":10000, "top":"0px", "left":"0px", "display":"none"});

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

/**
* Trantimestamp Bar Dispaly
*/
function contextMenusTrantimestampBarDispaly() {
	var display =$('#menus-trantimestamp-iframe').css('display');
	if(display == 'none'){
	 	$("#menus-trantimestamp-iframe").css({"display":"block"});  
	} else {
		$("#menus-trantimestamp-iframe").css({"display":"none"});
	}
}

/**
* Trandate Bar Dispaly
*/
function contextMenusTrandateBarDispaly() {
	var display =$('#menus-trandate-iframe').css('display');
	if(display == 'none'){
	 	$("#menus-trandate-iframe").css({"display":"block"});  
	} else {
		$("#menus-trandate-iframe").css({"display":"none"});
	}
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
		} else if(request.type == "tranTimestamp") {
			contextMenusTrantimestampBarDispaly();
			console.log(document);			
		} else if(request.type == "tranDate") {
			contextMenusTrandateBarDispaly();
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


