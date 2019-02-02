// JavaScript Document
function getByClass(oParent, sClass){
	var aResult=[];
	var aEle=oParent.getElementsByTagName('*');
	
	for(var i=0; i<aEle.length; i++){
		if(aEle[i].className==sClass){
			aResult.push(aEle[i]);
		}
	}
	return aResult;
};

// 返回元素e的第n层祖先元素
function parent(e, n) {
  if ( n === undefined)  n = 1;
  while ( n -- && e) e = e.parentNode;
  if (!e || e.nodeType !== 1) return null;
  return e;
};

function getStyle(obj, name){
	if (obj.currentStyle){ //ie
		return obj.currentStyle[name];
	}
	else {
		return getComputedStyle(obj, false)[name]; //firefox
	}
};

function startMove2(obj, json, fnEnd){
	clearInterval(obj.timer);
	obj.timer=setInterval(function(){
		var bStop=true;
		
		for (var attr in json){
		  var cur=0;
		  
		  if(attr=='opacity'){
			  cur=Math.round(parseFloat(getStyle(obj,attr))*100);
		  }
		  else{
			  cur=parseInt(getStyle(obj,attr));
		  }
		  
		  var speed=(json[attr]-cur)/6;
		  speed=speed>0?Math.ceil(speed):Math.floor(speed);	
		  	
		  if(cur!=json[attr])
			  bStop=false;

		  if(attr=='opacity'){
			  obj.style.filter='alpha(opacity:'+(cur+speed)+')';
			  obj.style.opacity=(cur+speed)/100;
		  }
		  else{
			  obj.style[attr]=cur+speed+'px';
		  }
		}
		if(bStop){
			clearInterval(obj.timer);
			if(fnEnd) fnEnd();
		}
	},30);
};

function myAddEvent(obj, ev, fn){
	if(obj.attachEvent){
		obj.attachEvent('on'+ev, fn);
	}
	else {
		obj.addEventListener(ev, fn, false);
	}
};

function getPos(ev){
	var scrollTop=document.documentElement.scrollTop||document.body.scrollTop; //ie, ff; chrome
	var scrollLeft=document.documentElement.scrollLeft||document.body.scrollLeft;
	
	return {x: ev.clientX+scrollLeft, y: ev.clientY+scrollTop};
};

function css(obj, name, value){
	if (arguments.length==2){
		return obj.style[name];
	}
	else {
		return obj.style[name]=value;
	}
};

function fix(){
  if(window.XMLHttpRequest){
    return;
  }
  else {
    var scrollTop=document.documentElement.scrollTop || document.body.scrollTop;
    var oDivMenu=document.getElementById('menuF');

    oDivMenu.style.top=document.documentElement.clientHeight-50-oDivMenu.offsetHeight+scrollTop+'px';
  }
};

myAddEvent(window,'scroll',fix);
myAddEvent(window,'resize',fix);

myAddEvent(window,'load',function(){
	var oDivMenu=document.getElementById('menuF');
	var oATop=oDivMenu.getElementsByTagName('a')[2];
	var timerTop=null;

	oATop.onclick=function(){
		clearInterval(timerTop);
		timerTop=setInterval(function(){
			var scrollTop=document.documentElement.scrollTop || document.body.scrollTop;
			var speed=(0-scrollTop)/6;

			speed=Math.floor(speed);
			scrollTop2=scrollTop+speed;
			window.scrollTo(0,scrollTop2);
			if(scrollTop==0){
				clearInterval(timerTop);
			}
		},30);
	};

	var oDivSear=document.getElementById('sear');
	var oDivDown=oDivSear.getElementsByTagName('div')[0];

	oDivSear.onclick=function(ev){
		var oEvent=ev||event;

		oDivDown.style.display='block';
		oEvent.cancelBubble=true;

		var aAOpt=oDivDown.getElementsByTagName('a');

		for(var i=0;i<aAOpt.length;i++){
			aAOpt[i].onclick=function(ev){
				var oEvent=ev||event;
				var sOpt=this.innerText || this.textContent;
				var oSpanSel=oDivSear.getElementsByTagName('span')[0];

				oSpanSel.innerHTML=sOpt;
				oEvent.cancelBubble=true;
				oDivDown.style.display='none';
			};
		};
	};

	myAddEvent(document,'click',function(){
		oDivDown.style.display='none';
	});

	function topMenu(clsItem){
		var oDivTM=document.getElementById('topMenu');
		var oDivItem=getByClass(oDivTM,clsItem)[0];
		var oDivList=oDivItem.getElementsByTagName('div')[0];

		oDivItem.onclick=function(ev){
			var oEvent=ev||event;

			oDivList.style.display='block';
			oEvent.cancelBubble=true;
		};

		myAddEvent(document,'click',function(){
			oDivList.style.display='none';
		});
	};

	topMenu('top-d-e top-d-v');
	topMenu('top-d-e pr');

	var oDivCM=document.getElementById('carMake');
	var oDivCMMenu=oDivCM.getElementsByTagName('div')[0];

	oDivCM.onmouseover=function(){
		oDivCMMenu.style.display='block';
	};

	oDivCM.onmouseout=function(){
		oDivCMMenu.style.display='none';
	};
});