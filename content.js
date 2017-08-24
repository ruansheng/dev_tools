$(document).keypress(function(e) {
    var keyCode = e.which;
    var ctrlKey = e.ctrlKey || e.metaKey;
	var shiftKey = e.shiftKey;
    if(ctrlKey && shiftKey && keyCode == 4) {  // ctrl + shift + D
    	toggleBarDispaly();
	}
	return true;
});

var barFrame = document.createElement('iframe');
barFrame.setAttribute("id", "tools-iframe");
barFrame.src = chrome.runtime.getURL('bar.html');
$("body").prepend(barFrame);
$("#tools-iframe").css({"position":"fixed", "width":"100%", "height":"500px", "z-index":10000, "top":"0px", "left":"0px", "display":"none"});

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

chrome.runtime.onMessage.addListener(function(msg) {
	if (msg.type == "toggleBar") {
		toggleBarDispaly();
	}
});

var menusBarFrame = document.createElement('iframe');
menusBarFrame.setAttribute("id", "menus-iframe");
menusBarFrame.src = chrome.runtime.getURL('menus_bar.html');
$("body").prepend(menusBarFrame);
$("#menus-iframe").css({"position":"fixed", "width":"100%", "height":"auto", "z-index":10000, "top":"0px", "left":"0px", "display":"none","opacity":1});


function contextMenusBarDispaly() {
	var display =$('#menus-iframe').css('display');
	if(display == 'none'){
	 	$("#menus-iframe").css({"display":"block"});  
	} else {
		$("#menus-iframe").css({"display":"none"});
	}
}

chrome.extension.onRequest.addListener(
  	function(request, sender, sendResponse) {
    	if(request.type == "addCollect") {
			contextMenusBarDispaly();
		}
	}
);

