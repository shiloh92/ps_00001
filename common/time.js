// TIME, TIMERS, UNIXTIME FUNC ONLY
function getUnixDate(day) {
	var currentDate = new Date();
	var g = new Date();
	// we go back x number of days 
	g.setDate(currentDate.getDate() - day);
	var d = g.getDate();
	var m = g.getMonth() + 1;
	var y = g.getFullYear();
	var hr = g.getHours();
	var min = g.getMinutes();
	var s = g.getSeconds();
	var p = y + '-' + m + '-' + d + ' ' + hr + ':' + min + ':' + s;
	var unix = parseInt((new Date(p).getTime() / 1000).toFixed(0));
	return unix;
}

function getUnixTimeForApi(num){
  return num * 100;
}

function subdivideTime(date_object) {
  var time = [];
  var days = Math.floor(date_object / (1000 * 60 * 60 * 24));
  var hours = Math.floor((date_object % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((date_object % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((date_object % (1000 * 60)) / 1000);
  time.push(days, hours, minutes, seconds)
  return time;
}