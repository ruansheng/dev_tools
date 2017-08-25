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