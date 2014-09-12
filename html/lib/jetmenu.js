/*
NAME: Jet Responsive Megamenu 
AUTHOR PAGE: http://codecanyon.net/user/marcoarib
ITEM PAGE: http://codecanyon.net/item/jet-responsive-megamenu/5719593
*/

jQuery.fn.jetmenu = function(options){
	var settings = {
		 indicator	 		:true     			// indicator that indicates a submenu
		,speed	 			:300     			// submenu speed
		,delay				:0					// submenu show delay
		,hideClickOut		:true     			// hide submenus when click outside menu
		,align				:"left"				// menu alignment (left/right)
		,submenuTrigger		:"hover"			// defines if submenu appears after hover/click
	}
	$.extend( settings, options );
	
	var menu = $(".jetmenu");
	var lastScreenWidth = window.innerWidth;
	var bigScreen = false;
	
	$(menu).prepend("<li class='showhide'><span class='title'>MENU</span><span class='icon'><em></em><em></em><em></em><em></em></span></li>");
	
	if(settings.indicator == true){
		$(menu).find("a").each(function(){
			if($(this).siblings(".dropdown, .megamenu").length > 0){
				$(this).append("<span class='indicator'>+</span>");
			}
		});
	}
		
	screenSize();
	
	$(window).resize(function() {
		if(lastScreenWidth <= 768 && window.innerWidth > 768){
			unbindEvents();
			hideCollapse();
			bindHover();
			if(settings.align == "right" && bigScreen == false){
				rightAlignMenu();
				bigScreen = true;
			}
		}
		if(lastScreenWidth > 768 && window.innerWidth <= 768){
			unbindEvents();
			showCollapse();
			bindClick();
			if(bigScreen == true){
				rightAlignMenu();
				bigScreen = false;
			}
		}
		if(settings.align == "right"){
			if(lastScreenWidth > 768 && window.innerWidth > 768)
				fixSubmenuRight();
		}
		else{
			if(lastScreenWidth > 768 && window.innerWidth > 768)
				fixSubmenuLeft();
		}
		lastScreenWidth = window.innerWidth;
	});
	
	function screenSize(){
		if(window.outerWidth <= 768){
			showCollapse();
			bindClick();
			if(bigScreen == true){
				rightAlignMenu();
				bigScreen = false;
			}
		}
		else{
			hideCollapse();
			bindHover();
			if(settings.align == "right"){
				rightAlignMenu();
				bigScreen = true;
			}
			else{
				fixSubmenuLeft();
			}
		}
	}
	
	function bindHover(){
		if (navigator.userAgent.match(/Mobi/i) || window.navigator.msMaxTouchPoints > 0 || settings.submenuTrigger == "click"){						
			$(menu).find("a").on("click touchstart", function(e){
				e.stopPropagation(); 
				e.preventDefault();
				$(this).parent("li").siblings("li").find(".dropdown, .megamenu").stop(true, true).fadeOut(settings.speed);
				if($(this).siblings(".dropdown, .megamenu").css("display") == "none"){
					$(this).siblings(".dropdown, .megamenu").stop(true, true).delay(settings.delay).fadeIn(settings.speed);
					return false; 
				}
				else{
					$(this).siblings(".dropdown, .megamenu").stop(true, true).fadeOut(settings.speed);
					$(this).siblings(".dropdown").find(".dropdown").stop(true, true).fadeOut(settings.speed);
				}
				window.location.href = $(this).attr("href");
			});
			
			$(menu).find("li").bind("mouseleave", function(){
				$(this).children(".dropdown, .megamenu").stop(true, true).fadeOut(settings.speed);
			});
			
			if(settings.hideClickOut == true){
				$(document).bind("click.menu touchstart.menu", function(ev){
					if($(ev.target).closest(menu).length == 0){
						$(menu).find(".dropdown, .megamenu").fadeOut(settings.speed);
					}
				});
			}
		}
		else{
			$(menu).find("li").bind("mouseenter", function(){
				$(this).children(".dropdown, .megamenu").stop(true, true).delay(settings.delay).fadeIn(settings.speed);
			}).bind("mouseleave", function(){
				$(this).children(".dropdown, .megamenu").stop(true, true).fadeOut(settings.speed);
			});
		}
	}
	
	function bindClick(){
		$(menu).find("li:not(.showhide)").each(function(){
			if($(this).children(".dropdown, .megamenu").length > 0){
				$(this).children("a").bind("click", function(e){
					if($(this).siblings(".dropdown, .megamenu").css("display") == "none"){
						$(this).siblings(".dropdown, .megamenu").delay(settings.delay).slideDown(settings.speed).focus();
						$(this).parent("li").siblings("li").find(".dropdown, .megamenu").slideUp(settings.speed);
						return false;
					}
					else{
						$(this).siblings(".dropdown, .megamenu").slideUp(settings.speed).focus();
						firstItemClick = 1;
					}
				});
			}
		});
	}
	
	function showCollapse(){
		$(menu).children("li:not(.showhide)").hide(0);
		$(menu).children("li.showhide").show(0);
		$(menu).children("li.showhide").bind("click", function(){
			if($(menu).children("li").is(":hidden")){
				$(menu).children("li").slideDown(settings.speed);
			}
			else{
				$(menu).children("li:not(.showhide)").slideUp(settings.speed);
				$(menu).children("li.showhide").show(0);
				$(menu).find(".dropdown, .megamenu").hide(settings.speed);
			}
		});
	}
	
	function hideCollapse(){
		$(menu).children("li").show(0);
		$(menu).children("li.showhide").hide(0);
	}	
	
	function rightAlignMenu(){
		$(menu).children("li").addClass("jsright");
		var items = $(menu).children("li");
		$(menu).children("li:not(.showhide)").detach();
		for(var i = items.length; i >= 1; i--){
			$(menu).append(items[i]);
		}			
		fixSubmenuRight();
	}
	
	function fixSubmenuRight(){
		$(menu).children("li").removeClass("last");
		var items = $(menu).children("li");
		for(var i = 1; i <= items.length; i++){
			if($(items[i]).children(".dropdown, .megamenu").length > 0){
				var lastItemsWidth = 0;
				for(var y = 1; y <= i; y++){
					lastItemsWidth = lastItemsWidth + $(items[y]).outerWidth();
				}
				if($(items[i]).children(".dropdown, .megamenu").outerWidth() > lastItemsWidth){
					$(items[i]).addClass("last");
				}
			}
		}
	}
	
	function fixSubmenuLeft(){
		$(menu).children("li").removeClass("fix-sub");
		var items = $(menu).children("li");
		var menuWidth = $(menu).outerWidth();
		var itemsWidth = 0;
		for(var i = 1; i <= items.length; i++){
			if($(items[i]).children(".dropdown, .megamenu").length > 0){
				if($(items[i]).position().left + $(items[i]).children(".dropdown, .megamenu").outerWidth() > menuWidth){
					$(items[i]).addClass("fix-sub");
				}
			}
		}
	}
	
	function unbindEvents(){
		$(menu).find("li, a").unbind();
		$(document).unbind("click.menu touchstart.menu");
		$(menu).find(".dropdown, .megamenu").hide(0);
	}
}








