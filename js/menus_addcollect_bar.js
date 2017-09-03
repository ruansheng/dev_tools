$(function() {

	chrome.tabs.query({active: true, currentWindow: true}, function(tabs){  
	    chrome.tabs.sendMessage(tabs[0].id, {type:"get_page_info"}, function(response) {  
	        var title = response.title; 
			var url = response.url; 
			$('#page-title').val(title);
			$('#page-link').val(url);			
	    });
	});  

    chrome.runtime.onConnect.addListener(function(port) {
       port.onMessage.addListener(function(msg) {
           if(msg.type == "open_modal") {
			   openModal();
           }
       });
    });

	function openModal() { 
		$('#collect-form-alert').modal({
			relatedTarget: this,
			closeViaDimmer:false,
			onConfirm: function(e) {
				var page_title = $('#page-title').val();
				var page_link = $('#page-link').val();	
				var item_style = $('input[name="item-style"]:checked').val();	
				
				// localStrage存储
				chrome.extension.sendRequest({type: "saveCollectData", title: page_title, link: page_link, style: item_style}, function(response) {
				});
			
				// 发消息到background通知content隐藏iframe
				chrome.extension.sendRequest({type: "cancelAddCollect"}, function(response) {
				});
			},
			onCancel: function(e) {
				// 发消息到background通知content隐藏iframe
				chrome.extension.sendRequest({type: "cancelAddCollect"}, function(response) {
				});
			}
    	});
	}
})
