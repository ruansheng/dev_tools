var auto_flush = true;
$(function() {

	function timestampToDate(timestamp){
		var d = new Date(timestamp * 1000);
		var year = d.getFullYear();
		var month = d.getMonth();
		var day = d.getDate();
		var hour = d.getHours();
		var minutes = d.getMinutes();
		var seconds = d.getSeconds();

		month = month + 1;
		if(month < 10) {
			month = "0" + month;
		}
		if(day < 10) {
			day = "0" + day;
		}
		if(hour < 10) {
			hour = "0" + hour;
		}
		if(minutes < 10) {
			minutes = "0" + minutes;
		}
		if(seconds < 10) {
			seconds = "0" + seconds;
		}
		var date = year + "-" + month + "-" + day + " " + hour + ":" + minutes + ":" + seconds;
		return date;
	}
	
	function dateToTimestamp(date) {
		var timestamp = Date.parse(new Date(date.replace(/-/g,  "/")));
		return timestamp / 1000;
	}
	
	function setNowTime() {
		// 当前时间戳
		var now_timestamp = parseInt(new Date().getTime()/1000);
		$('#now-timestamp').text(now_timestamp);
	
		// 当前时间字符串
		var now_date_string = timestampToDate(now_timestamp);
		$('#now-date-string').text(now_date_string);	
	}
	
	// 初始化设置当前时间
	setNowTime()
	
	// 每秒更新当前时间
	setInterval(function() {
		if(!auto_flush) {
			return;
		}
		setNowTime();
	}, 1000);
	
	$('#toggle_time').click(function() {
		var is_auto_flush = $(this).attr("auto_flush");
		if(is_auto_flush == 1) {
			$(this).attr("auto_flush", 0);
			auto_flush = false;
			$(this).text("开始");
			$(this).removeClass("am-btn-secondary")
			$(this).addClass("am-btn-danger")
		} else {
			$(this).attr("auto_flush", 1);			
			auto_flush = true;
			$(this).text("停止");
			$(this).removeClass("am-btn-danger")
			$(this).addClass("am-btn-secondary")
		}
	});
	
	// 时间戳转换日期
	$('#transform_timestamp').click(function() {
		var timestamp_string = $('#input_timestamp').val();
		if(timestamp_string == "") {
			return;
		}
		
		var timestamp_array = timestamp_string.split('\n');
		
		var date_array = new Array();
		for(i = 0; i < timestamp_array.length; i++) {
			var date = timestampToDate(timestamp_array[i]);		
			date_array.push(date);
		}
		$('#input_date').val(date_array.join('\n'));		
	});
	
	// 日期转换时间戳
	$('#transform_date').click(function() {
		var date_string = $('#input_date').val();
		if(date_string == "") {
			return;
		}
		
		var date_array = date_string.split('\n');
		
		var timestamp_array = new Array();
		for(i = 0; i < date_array.length; i++) {
			var date = dateToTimestamp(date_array[i]);		
			timestamp_array.push(date);
		}
		$('#input_timestamp').val(timestamp_array.join('\n'));		
	});
	
	$('#transform_md5').click(function(){
		var string = $('#waiting-encryption-string').val();
		if(string != '') {
			var hash = md5(string);
			$('#result-encryption-string').val(hash);			
		}
	});
	$('#transform_sha1').click(function(){
		var string = $('#waiting-encryption-string').val();
		if(string != '') {
			var hash = sha1(string);
			$('#result-encryption-string').val(hash);			
		}
	});

	$('#transform_base64_encode').click(function(){
		var string = $('#base64-encode-string').val();
		if(string != '') {
			var encodedData = window.btoa(string);
			$('#base64-decode-string').val(encodedData);			
		}
	});
	$('#transform_base64_decode').click(function(){
		var string = $('#base64-decode-string').val();
		if(string != '') {
			var decodedData = window.atob(string);
			$('#base64-encode-string').val(decodedData);			
		}
	});

	// color选择器
	$('#color-select-prompt-toggle').click(function() {
	    $('#color-select-alert').modal({
	      relatedTarget: this
	    });
	  });

	$('#color-picker').colpick({
		flat:true,
		//layout:'hex',
		submit:0
	});

	// 二维码
	$('#qrcode-prompt-toggle').click(function() {
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs){  
		    chrome.tabs.sendMessage(tabs[0].id, {type:"get_page_info"}, function(response) {  
		        var url = response.url; 
				$("#qrcode-box").empty();
				$('#waiting-create-qrcode-string').val(url);
				$('#qrcode-box').qrcode({width: 128,height: 128, text: url});
			    $('#qccode-alert').modal({
					  relatedTarget: this
			    });
		    });
		});  
	});
	  
	// 生成二维码
	$('#create_qrcode').click(function() {
		var string = $('#waiting-create-qrcode-string').val();
		$("#qrcode-box").empty();
		$('#qrcode-box').qrcode({width: 128,height: 128, text: string});
	});

	// json格式化
	$('#jsonview-confirm-toggle').click(function(){
		$('#jsonview-alert').modal({
		     relatedTarget: this
		});		
	});

	// 创建文本编辑器
	var editor = ace.edit("ace-editor");
	var json_string = editor.getValue();
	var json_obj = $.parseJSON(json_string);
	$("#jsonview-format-ret").JSONView(json_obj, { collapsed: true, nl2br: true, recursive_collapser: true });
	
	// 格式化
	$('#format-json-btn').click(function() {
		var json_string = editor.getValue();
		var json_obj = $.parseJSON(json_string);
		$("#jsonview-format-ret").JSONView(json_obj, { collapsed: true, nl2br: true, recursive_collapser: true });
	});
	
	$('#collapse-btn').on('click', function() {
		$('#jsonview-format-ret').JSONView('collapse');
	});

	$('#expand-btn').on('click', function() {
		$('#jsonview-format-ret').JSONView('expand');
	});

	$('#toggle-btn').on('click', function() {
		$('#jsonview-format-ret').JSONView('toggle');
	});

	$('#toggle-level1-btn').on('click', function() {
		$('#jsonview-format-ret').JSONView('toggle', 1);
	});

	$('#toggle-level2-btn').on('click', function() {
		$('#jsonview-format-ret').JSONView('toggle', 2);
	});
	
})
