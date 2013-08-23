var container = document.getElementById('content');

var childs = container.childNodes;

var mapData = {};
var mapElement = [];
var viewing = [];

for(var i=0; i<childs.length; i++) {
   if (childs[i].nodeType == 1) {
   		mapElement[mapElement.length] = childs[i];
   		mapData[childs[i].id] = {
   			'count': 0,
   			'time': 0
   		}
   }
}
window.onscroll = function() {
	for (var i=0; i<mapElement.length; i++) {
	  	var offsetTop = 0;
		var ele = mapElement[i];
		var eleId = ele.id;
		var eleHeight = ele.clientHeight;
		do {
		  	if (!isNaN(ele.offsetTop)) {
		      	offsetTop += ele.offsetTop;
		  	}
		} while (ele = ele.offsetParent);

		var windowHeight = getWindowHeight();
		var currentScroll = document.body.scrollTop;
		if ((offsetTop >= currentScroll  && offsetTop <= (currentScroll + windowHeight)) ||
		  	offsetTop <= currentScroll && currentScroll <= (offsetTop + eleHeight)) {
			
			if (viewing.indexOf(eleId) < 0) {
			  	viewing[viewing.length] = eleId;
			  	mapData[eleId].count ++;
			}
		} else {
			if (viewing.indexOf(eleId) >= 0) {
				viewing.splice(viewing.indexOf(eleId), 1);
			}
		}
	}
	
	showResult();
}
window.onscroll();

setInterval(function() {
	for (var i = 0; i < viewing.length; i++) {
		mapData[viewing[i]].time ++;
	}
	showResult();
}, 1);


function showResult() {
	var html = "";
	for (var i=0; i<mapElement.length; i++) {
		var eleId = mapElement[i].id;
		html += eleId + " - " + mapData[eleId].count + " - " + mapData[eleId].time + "<br>";
	}
	document.getElementById('result').innerHTML = html;
}

function getWindowHeight() {
	var myHeight = 0;
	if( typeof(window.innerHeight) == 'number' ) {
		//Non-IE
		myHeight = window.innerHeight;
	} else if(document.documentElement && (document.documentElement.clientHeight)) {
		//IE 6+ in 'standards compliant mode'
		myHeight = document.documentElement.clientHeight;
	} else if(document.body && (document.body.clientHeight)) {
		//IE 4 compatible
		myHeight = document.body.clientHeight;
	}
	return myHeight;
}
