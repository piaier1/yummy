// JavaScript Document
/*

$(document).on("pageinit","#pageone",function(){
  $("p").on("tap",function(){
    $(this).hide();
  });                       
});

$(document).on("pageinit","#pageone",function(){
  $("p").on("taphold",function(){
    $(this).hide();
  });                       
});

*/
$(document).on("pageinit","#more",function(){
  $("#more").on("swiperight",function(){
    	$("#left-panel").panel("open");
  });                       
});

/* iscroll */
var myScroll,
	pullDownEl, pullDownOffset,
	pullUpEl, pullUpOffset,
	generatedCount = 0;

function pullDownAction () {
	
		var el, li, i;
		el = document.getElementById('thelist');
		
		for (i=0; i<5; i++) {
			innerHtml = 'aaa';
			li = document.createElement('li');
			li.innerText = 'Generated row ' + (++generatedCount);
			el.insertBefore(li, el.childNodes[0]);
		}
		
		myScroll.refresh();		// Remember to refresh when contents are loaded (ie: on ajax completion)	
/*	setTimeout(function () {	// <-- Simulate network congestion, remove setTimeout from production!
		var el, li, i;
		el = document.getElementById('thelist');

		for (i=0; i<3; i++) {
			li = document.createElement('li');
			li.innerText = 'Generated row ' + (++generatedCount);
			el.insertBefore(li, el.childNodes[0]);
		}
		
		myScroll.refresh();		// Remember to refresh when contents are loaded (ie: on ajax completion)
	}, 1000);	// <-- Simulate network congestion, remove setTimeout from production!*/
}

function pullUpAction () {
	setTimeout(function () {	// <-- Simulate network congestion, remove setTimeout from production!
		var el, li, i;
		el = document.getElementById('thelist');

		for (i=0; i<3; i++) {
			li = document.createElement('li');
			li.innerText = 'aaa ' + (++generatedCount);
			el.appendChild(li, el.childNodes[0]);
		}
		
		myScroll.refresh();		// Remember to refresh when contents are loaded (ie: on ajax completion)
	}, 1000);	// <-- Simulate network congestion, remove setTimeout from production!
}

function loaded() {
	pullDownEl = document.getElementById('pullDown');
	pullDownOffset = pullDownEl.offsetHeight;
	pullUpEl = document.getElementById('pullUp');	
	pullUpOffset = pullUpEl.offsetHeight;
	
	myScroll = new iScroll('wrapper', {
		useTransition: true,
		topOffset: pullDownOffset,
		onRefresh: function () {
			if (pullDownEl.className.match('loading')) {
				pullDownEl.className = '';
				pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Pull down to refresh...';
			} else if (pullUpEl.className.match('loading')) {
				pullUpEl.className = '';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Pull up to load more...';
			}
		},
		onScrollMove: function () {
			if (this.y > 5 && !pullDownEl.className.match('flip')) {
				pullDownEl.className = 'flip';
				pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Release to refresh...';
				this.minScrollY = 0;
			} else if (this.y < 5 && pullDownEl.className.match('flip')) {
				pullDownEl.className = '';
				pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Pull down to refresh...';
				this.minScrollY = -pullDownOffset;
			} else if (this.y < (this.maxScrollY - 5) && !pullUpEl.className.match('flip')) {
				pullUpEl.className = 'flip';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Release to refresh...';
				this.maxScrollY = this.maxScrollY;
			} else if (this.y > (this.maxScrollY + 5) && pullUpEl.className.match('flip')) {
				pullUpEl.className = '';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Pull up to load more...';
				this.maxScrollY = pullUpOffset;
			}
		},
		onScrollEnd: function () {
			if (pullDownEl.className.match('flip')) {
				pullDownEl.className = 'loading';
				pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Loading...';				
				pullDownAction();	// Execute custom function (ajax call?)
			} else if (pullUpEl.className.match('flip')) {
				pullUpEl.className = 'loading';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Loading...';				
				pullUpAction();	// Execute custom function (ajax call?)
			}
		}
	});
	
	setTimeout(function () { document.getElementById('wrapper').style.left = '0'; }, 800);
}

document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

document.addEventListener('DOMContentLoaded', function () { setTimeout(loaded, 200); }, false);

/* phonegap js 后退(可能多余 因为系统自动后退功能 除非需要按键虚拟键后退功能) */
//Wait for Cordova to load
/*document.addEventListener("deviceready", onDeviceReady, false);
// Cordova is ready
function onDeviceReady() {
// 注册回退按钮事件监听器
   document.addEventListener("backbutton", onBackKeyDown, false);
}
function onBackKeyDown(){
//返回到想要的page
//window.location.href="yijian.html";
 window.history.back()
}*/

/* exit; */
/*function exityum(){
document.addEventListener("deviceready", onDeviceReady, false);
 // PhoneGap is loaded and it is now safe to make calls PhoneGap methods
 function onDeviceReady() {
  // 注册回退按钮事件监听器
  document.addEventListener("backbutton", onBackKeyDown, false); //返回键
 } 
 function onConfirm(button) {
        //alert('You selected button ' + button);
  if(button==1) navigator.app.exitApp(); //选择了确定才执行退出
    }
    // Show a custom confirmation dialog
    function onBackKeyDown() {
        navigator.notification.confirm(
            '按确定退出程序!',  // message
            onConfirm,              // callback to invoke with index of button pressed
            '确定要退出程序吗?',            // title
            '确定,取消'          // buttonLabels
        );
    }
}*/