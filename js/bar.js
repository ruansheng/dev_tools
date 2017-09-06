var auto_flush = true;
$(function() {

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

	// unicode转换
	$('#unicode-prompt-toggle').click(function() {
	    $('#unicode-alert').modal({
	      relatedTarget: this
	    });
	});
	
	$('#transform_unicode').click(function() {
		var zhongweng_text = $('#zhongwen-text').val();
		var unicode_text = encodeUnicode(zhongweng_text);
		$('#unicode-text').val(unicode_text);
	});

	$('#transform_zhongwen').click(function() {
		var unicode_text = $('#unicode-text').val();
		var zhongweng_text = decodeUnicode(unicode_text);
		$('#zhongwen-text').val(zhongweng_text);
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

	// urlencode转换
	$('#urlencode-prompt-toggle').click(function() {
	    $('#urlencode-alert').modal({
	      relatedTarget: this
	    });
	});
	
	$('#transform_urlencode').click(function() {
		var old_text = $('#old-text').val();
		var encode_text = encodeURIComponent(old_text);
		$('#encode-text').val(encode_text);
	});

	$('#transform_urldecode').click(function() {
		var encode_text = $('#encode-text').val();
		var old_text = decodeURIComponent(encode_text);
		$('#old-text').val(old_text);
	});
	
	// 计算器
	$('#calculator-prompt-toggle').click(function() {
		$("#calculator-box").empty();
		$("#calculator-box").Calculadora({
			TituloHTML:"",
			EtiquetaBorrar:'清空'
		});
	    $('#calculator-alert').modal({
			  relatedTarget: this
	    });
	});

	// 正则表达式
	$('#regexp-prompt-toggle').click(function() {
		$('#regexp-alert').modal({
			relatedTarget: this
		});
	});

	// 正则表达式匹配
	$('#test_match_btn').click(function(){
		var waiting_match_content = $('#waiting_match_content').val();
		var regexp_string = $('#regexp_string').val();
		if(waiting_match_content == '' || regexp_string == '') {
			return;
		}
		
		var is_ok = true;
		var message = '';
		try {
			var result = waiting_match_content.match(regexp_string);
	    } catch(err) {
			is_ok = false;
			message = err.message;
	    }
		
		if(is_ok == false) {
			$('#regepx-box-ret').text(message);			
			return;
		}
		
		if(result == null || result == '' || result.length == 0) {
			$('#regepx-box-ret').text('未匹配到');			
			return;
		} 
		var match_result = '';
		for(var i = 0; i < result.length; i++) {
			match_result += result[i] + "\n\n";
		}
		$('#regepx-box-ret').text(match_result);			
	});

	// 定时刷新收藏的标签
	setInterval(function() {
		// 发消息到background通知content隐藏iframe
		chrome.extension.sendRequest({type: "getCollectList"}, function(response) {
			dispalyList(response.list)
		});
	}, 1000);

	function dispalyList(list) {
		var html = '';
		for(var i =0; i < list.length; i++){
			var item_style =  list[i].style;
			html += '<a style="max-width:120px;display:inline-block;float:left;padding:5px;overflow:scroll;margin-top:3px;" class="am-badge am-radius '+ item_style +'" target="_blank" href="'+ list[i].link +'"><span style="dispaly:block;">' + list[i].title + '</span></a><br/>';	
		}
		$('#collect-list-box').html(html);
	}
	
	function dispalyRemoveList(list) {
		var html = '';
		for(var i =0; i < list.length; i++){
			var item_style =  list[i].style;
			html += '<div>';
				html += '<div style="width:170px;display:inline-block;float:left;">';
					html += '<a style="max-width:120px;display:inline-block;float:left;padding:5px;overflow:scroll;margin-top:3px;" class="am-badge am-radius '+ item_style +'" target="_blank" href="'+ list[i].link +'"><span style="dispaly:block;">' + list[i].title + '</span></a>';
				html += '</div>';	
				html += '<div style="width:50px;display:inline-block;float:left;">';
					html += '<button type="button" class="am-close remove-this-label" link="'+ list[i].link +'">&times;</button>';
				html += '</div>';	
			html += '</div>';	
		}
		$('#collect-remove-list-box').html(html);
	}
	
	// 加载标签
	function loadCollectLabels(){
		chrome.extension.sendRequest({type: "getCollectList"}, function(response) {
			dispalyRemoveList(response.list)
		});
	}
	
	// 新增标签模态框
	$('#add_collect_label').click(function(){
	    $('#add-collect-alert').modal({
			  relatedTarget: this,
			  onConfirm: function(e) {
				var page_title = $('#add-collect-title').val();
				var page_link = $('#add-collect-link').val();	
				var item_style = $('input[name="item-style"]:checked').val();	
				if(page_title != '' && page_link != '') {
					// localStrage存储
					chrome.extension.sendRequest({type: "saveCollectData", title: page_title, link: page_link, style: item_style}, function(response) {});								
				}
			},
			onCancel: function(e) {
			}
	    });
	});
	
	// 删除标签模态框
	$('#remove_collect_label').click(function(){
		loadCollectLabels();
	    $('#remove-collect-alert').modal({
			relatedTarget: this
		});
	});
	
	// 删除标签
	$('body').on('click', '.remove-this-label', function(){
		var link = $(this).attr('link')
		// 通知background删除标签
		chrome.extension.sendRequest({type: "removeCollectData", link: link}, function(response) {
			loadCollectLabels();
		});								
	});
	
	// 清空标签
	$('#clear_collect_label').click(function(){
		// 通知background清空标签
		chrome.extension.sendRequest({type: "clearCollectData"}, function(response) {
			loadCollectLabels();
		});								
	});
	
})
