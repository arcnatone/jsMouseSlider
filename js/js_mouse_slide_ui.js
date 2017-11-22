/* 
# ------------
#
# jsMouseSlide
#
#
# Author : Ji-seop
# Last Update : 2017-10-10
# Options : showItem(int), padding(px), mode(justify, center)
#
#-------------
*/
(function($){
	$.fn.jsMouseSlider = function(options){
		var slideObj = $(this);
		var slideArr = new Array();
		var defaults = new Array();
		defaults = {
			showItem : 6,
			mode : "justify",
			padding : 0
		};
		var options = $.extend({}, defaults, options);
		slideArr = {
			area : slideObj,
			areaWidth : slideObj.width(),
			wrap : null,
			list : slideObj.find(".slide-list"),
			listLength : slideObj.find(".slide-list").find(".slide-item").length,
			listWidth : 0,
			item : slideObj.find(".slide-list").find(".slide-item"),
			itemWidth : slideObj.find(".slide-list").find(".slide-item").outerWidth(),
			options : options
		};

		/* Default Setting */
		slideArr.list.css({"display":"inline-block"}).wrap("<div class='slide-wrap'></div>")
				.parent(".slide-wrap").css({"position":"absolute", "left":"0", "width":"999999px"});
		slideArr.wrap = slideArr.area.find(".slide-wrap");
		slideArr.area.height(slideArr.area.find(".slide-wrap").height());
		slideArr.list.css({"padding-left":slideArr.options.padding, "padding-right":slideArr.options.padding});
		
		var marginCalc = (slideArr.areaWidth-(slideArr.itemWidth*slideArr.options.showItem))/(slideArr.options.showItem-1);
		slideArr.listWidth = (slideArr.itemWidth*slideArr.listLength)+(marginCalc*(slideArr.listLength-1))+(slideArr.options.padding*2);
		slideArr.item.css("margin-left", marginCalc).filter(":first").css("margin-left", 0);
		
		var listCenter = function(){
			slideArr.wrap.stop().animate({"left":(slideArr.areaWidth-slideArr.listWidth)/2}, 150);
		}

		/* Mode Event */
		if(slideArr.options.mode == "center"){
			listCenter();
		}

		slideArr.area.mouseenter(function(){
			/* Array Update */
			slideArr.area = slideObj;
			slideArr.list = slideArr.area.find(".slide-list");
			slideArr.item = slideArr.list.find(".slide-item");

			slideArr.areaWidth = slideArr.area.width();
			slideArr.listLength = slideArr.item.length;

			slideArr.area.on("mousemove", function(e){
				var xPos = e.clientX;//마우스 x좌표
				var listLeft = slideArr.area.offset().left;//목록 left좌표
				var lDis = xPos-listLeft;//list내 마우스 이동거리(left기준)

				if(slideArr.listWidth > slideArr.areaWidth){
					slideArr.wrap.css({"left":-1*lDis*(slideArr.listWidth-slideArr.areaWidth)/slideArr.areaWidth});
				}
			});
		});
		slideArr.area.mouseleave(function(){
			if(slideArr.options.mode == "center"){
				listCenter();
			}
			slideArr.area.off("mousemove");
		});

		return $(this);
	};
}(jQuery));

