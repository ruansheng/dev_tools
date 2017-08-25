$(function() {
/*	
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs){  
	    chrome.tabs.sendMessage(tabs[0].id, {type:"get_select_content"}, function(response) {  
	        var content = response.content; 
			alert(content);
			//$('#page-link').val(url);			
	    });
	});  
*/

    $('#trandate-form-alert').modal({
      	relatedTarget: this,
		onConfirm: function(e) {
			// 发消息到background通知content隐藏iframe
			chrome.extension.sendRequest({type: "tranDate"}, function(response) {
			});
		},
		onCancel: function(e) {
			// 发消息到background通知content隐藏iframe
			chrome.extension.sendRequest({type: "tranDate"}, function(response) {
			});
		}
    });

})
