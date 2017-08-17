$(document).keypress(function(e) {
    var keyCode = e.which;
    var ctrlKey = e.ctrlKey || e.metaKey;
	var shiftKey = e.shiftKey;
    if(ctrlKey && shiftKey && keyCode == 13) {  // ctrl + shift + enter
    	toggleBarDispaly();
	}
	return true;
});

var barFrame = document.createElement('iframe');
barFrame.setAttribute("id", "tools-iframe");
barFrame.src = chrome.runtime.getURL('bar.html');
$("body").prepend(barFrame);
$("#tools-iframe").css({"position":"fixed", "width":"100%", "z-index":10000, "top":"0px", "left":"0px", "display":"none"});

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