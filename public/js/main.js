window.awe = window.awe || {};
awe.init = function () {
	awe.showPopup();
	awe.hidePopup();	
};
$(document).ready(function ($) {
	"use strict";
	awe_owl();
	awe_backtotop();
	awe_category();
	awe_menumobile();
	awe_lazyloadImage();
});

$(window).on("load resize",function(e){	
	setTimeout(function(){
		$('.mm-menu').removeClass('');
	},500);
	setTimeout(function(){
		awe_owl();
	},1000);
});
$(document).on('click','.overlay, .close-popup, .btn-continue, .fancybox-close', function() {   
	hidePopup('.awe-popup'); 	
	setTimeout(function(){
		$('.loading').removeClass('loaded-content');
	},500);
	return false;
})
$(window).on('load', function () {
	$('.home-slider').removeClass('hidden_slider');
	$('.section_bloggg').removeClass('hidden_blog');
});
/********************************************************
# LAZY LOAD
********************************************************/
function awe_lazyloadImage() {
	var i = $("[data-lazyload]");
	i.length > 0 && i.each(function() {
		var i = $(this), e = i.attr("data-lazyload");
		i.appear(function() {
			i.removeAttr("height").attr("src", e);
		}, {
			accX: 0,
			accY: 120
		}, "easeInCubic");
	});
	var e = $("[data-lazyload2]");
	e.length > 0 && e.each(function() {
		var i = $(this), e = i.attr("data-lazyload2");
		i.appear(function() {
			i.css("background-image", "url(" + e + ")");
		}, {
			accX: 0,
			accY: 120
		}, "easeInCubic");
	});
} window.awe_lazyloadImage=awe_lazyloadImage;

/********************************************************
# SHOW LOADING
********************************************************/
function awe_showLoading(selector) {
	var loading = $('.loader').html();
	$(selector).addClass("loading").append(loading); 
}  window.awe_showLoading=awe_showLoading;

/********************************************************
# HIDE LOADING
********************************************************/
function awe_hideLoading(selector) {
	$(selector).removeClass("loading"); 
	$(selector + ' .loading-icon').remove();
}  window.awe_hideLoading=awe_hideLoading;

/********************************************************
# SHOW POPUP
********************************************************/
function awe_showPopup(selector) {
	$(selector).addClass('active');
}  window.awe_showPopup=awe_showPopup;

/********************************************************
# HIDE POPUP
********************************************************/

function awe_hidePopup(selector) {
	$(selector).removeClass('active');
}  window.awe_hidePopup=awe_hidePopup;
/********************************************************
# HIDE POPUP
********************************************************/
awe.hidePopup = function (selector) {
	$(selector).removeClass('active');
}


/************************************************/
$(document).on('click','.overlay, .close-popup, .btn-continue, .fancybox-close', function() {   
	awe.hidePopup('.awe-popup'); 
	setTimeout(function(){
		$('.loading').removeClass('loaded-content');
	},500);
	return false;
})
/********************************************************
# CONVERT VIETNAMESE
********************************************************/
function awe_convertVietnamese(str) { 
	str= str.toLowerCase();
	str= str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a"); 
	str= str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e"); 
	str= str.replace(/ì|í|ị|ỉ|ĩ/g,"i"); 
	str= str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o"); 
	str= str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u"); 
	str= str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y"); 
	str= str.replace(/đ/g,"d"); 
	str= str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'| |\"|\&|\#|\[|\]|~|$|_/g,"-");
	str= str.replace(/-+-/g,"-");
	str= str.replace(/^\-+|\-+$/g,""); 
	return str; 
} window.awe_convertVietnamese=awe_convertVietnamese;


/********************************************************
# SIDEBAR CATEOGRY
********************************************************/
function awe_category(){
	$('.nav-category .fa-angle-right').click(function(e){
		$(this).parent().toggleClass('active');
	});
	$('.nav-category .fa-angle-down').click(function(e){
		$(this).parent().toggleClass('active');
	});
} window.awe_category=awe_category;

$('.hs-submit').click(function(e){

	var a = $('.group_a input').val()+ '%20AND%20';
	if($('.group_a input').val() ==""){
		a = "";
	}
	var b = $('.ab select').val();
	var c = $('.abs select').val();
	window.location.href = '/search?query='+a+'product_type:('+b+')vendor:('+c+')';
});

/********************************************************
Search header
********************************************************/
$('body').click(function(event) {
	if (!$(event.target).closest('.collection-selector').length) {
		$('.list_search').css('display','none');
	};
});
/* top search */

$('.search_text').click(function(){
	$(this).next().slideToggle(200);
	$('.list_search').show();
})

$('.list_search .search_item').on('click', function (e) {
	$('.list_search').hide();

	var optionSelected = $(this);

	/*
  var id = optionSelected.attr('data-coll-id');
  var handle = optionSelected.attr('data-coll-handle');
  var coll_name = optionSelected.attr('data-coll-name');
  */

	var title = optionSelected.text();
	//var filter = '(collectionid:product' + (id == 0 ? '>=0' : ('=' + id)) + ')';


	//console.log(coll_name);
	$('.search_text').text(title);
	var h = $(".collection-selector").width() + 10;

	$('.header-main form input').css('padding-left',h + 'px');

	/*
  $('.ultimate-search .collection_id').val(filter);
  $('.ultimate-search .collection_handle').val(handle);
  $('.ultimate-search .collection_name').val(coll_name);
  */

	$(".search-text").focus();
	optionSelected.addClass('active').siblings().removeClass('active');
	//console.log($('.kd_search_text').innerWidth());


	//$('.list_search').slideToggle(0);

	/*
  sessionStorage.setItem('last_search', JSON.stringify({
    title: title,
    handle: handle,
    filter: filter,
    name: coll_name
  }));
  */  
});


$('.header_search form button').click(function(e) {
	if($(window).width() > 992){
		e.preventDefault();
		searchCollection();
		setSearchStorage('.header_search form');
	}
});

$('#mb_search').click(function(){
	$('.mb_header_search').slideToggle('fast');
});

$('.fi-title.drop-down').click(function(){
	$(this).toggleClass('opentab');
});



function searchCollection() {
	var collectionId = $('.list_search .search_item.active').attr('data-coll-id');
	var searchVal = $('.header_search input[type="search"]').val();
	var url = '';
	if(collectionId == 0) {
		url = '/search?q='+ searchVal;
	}
	else {
		url = '/search?q=collections:'+ collectionId +' AND name:' + searchVal;
		/*
    if(searchVal != '') {
      url = '/search?type=product&q=' + searchVal + '&filter=(collectionid:product=' + collectionId + ')';
    }
    else {
      url = '/search?type=product&q=filter=(collectionid:product=' + collectionId + ')';
    }
    */
	}
	window.location=url;
}


/*** Search Storage ****/

function setSearchStorage(form_id) {
	var seach_input = $(form_id).find('.search-text').val();
	var search_collection = $(form_id).find('.list_search .search_item.active').attr('data-coll-id');
	sessionStorage.setItem('search_input', seach_input);
	sessionStorage.setItem('search_collection', search_collection);
}
function getSearchStorage(form_id) {
	var search_input_st = ''; // sessionStorage.getItem('search_input');
	var search_collection_st = ''; // sessionStorage.getItem('search_collection');
	if(sessionStorage.search_input != '') {
		search_input_st = sessionStorage.search_input;
	}
	if(sessionStorage.search_collection != '') {
		search_collection_st = sessionStorage.search_collection;
	}
	$(form_id).find('.search-text').val(search_input_st);
	$(form_id).find('.search_item[data-coll-id="'+search_collection_st+'"]').addClass('active').siblings().removeClass('active');
	var search_key = $(form_id).find('.search_item[data-coll-id="'+search_collection_st+'"]').text();
	if(search_key != ''){
		$(form_id).find('.collection-selector .search_text').text(search_key);
	}
	//$(form_id).find('.search_collection option[value="'+search_collection_st+'"]').prop('selected', true);
}
function resetSearchStorage() {
	sessionStorage.removeItem('search_input');
	sessionStorage.removeItem('search_collection');
}
$(window).load(function() {
	getSearchStorage('.header_search form');
		resetSearchStorage();
		var h = $(".collection-selector").width() + 10;
		$('.header-main form input').css('padding-left',h + 'px');
});



/********************************************************
# MENU MOBILE
********************************************************/
function awe_menumobile(){
	$('.menu-bar').click(function(e){
		e.preventDefault();
		$('#nav').toggleClass('open');
	});
	$('#nav .fa').click(function(e){		
		e.preventDefault();
		$(this).parent().parent().toggleClass('open');
	});
} window.awe_menumobile=awe_menumobile;

/********************************************************
# ACCORDION
********************************************************/
function awe_accordion(){
	$('.accordion .nav-link').click(function(e){
		e.preventDefault;
		$(this).parent().toggleClass('active');
	})
} window.awe_accordion=awe_accordion;

/********************************************************
# OWL CAROUSEL
********************************************************/
function awe_owl() { 
	$('.owl-carousel:not(.not-aweowl)').each( function(){
		var xs_item = $(this).attr('data-xs-items');
		var md_item = $(this).attr('data-md-items');
		var lg_item = $(this).attr('data-lg-items');
		var sm_item = $(this).attr('data-sm-items');	
		var margin=$(this).attr('data-margin');
		var dot=$(this).attr('data-dot');
		var nav=$(this).attr('data-nav');
		var height=$(this).attr('data-height');
		var play=$(this).attr('data-play');
		var loop=$(this).attr('data-loop');
		if (typeof margin !== typeof undefined && margin !== false) {    
		} else{
			margin = 30;
		}
		if (typeof xs_item !== typeof undefined && xs_item !== false) {    
		} else{
			xs_item = 1;
		}
		if (typeof sm_item !== typeof undefined && sm_item !== false) {    

		} else{
			sm_item = 3;
		}	
		if (typeof md_item !== typeof undefined && md_item !== false) {    
		} else{
			md_item = 3;
		}
		if (typeof lg_item !== typeof undefined && lg_item !== false) {    
		} else{
			lg_item = 3;
		}
		if (typeof dot !== typeof undefined && dot !== true) {   
			dot= true;
		} else{
			dot = false;
		}
		$(this).owlCarousel({
			loop:loop,
			margin:Number(margin),
			responsiveClass:true,
			dots:dot,
			nav:nav,
			autoplay:false,
			autoHeight: true,
			autoplayHoverPause:true,
			responsive:{
				0:{
					items:Number(xs_item)				
				},
				600:{
					items:Number(sm_item)				
				},
				1000:{
					items:Number(md_item)				
				},
				1200:{
					items:Number(lg_item)				
				}
			}
		})
	})
} window.awe_owl=awe_owl;


/* check last active owl-item */
function check_last_active(){
	var x = $('.owl-carousel:not(.slider)');
	setTimeout(function(){
		x.find('.owl-item.active .product-box-5').css('border-right','1px solid #ebebeb');
		if(x.find('.active').first()){
			x.find('.owl-item.active').first().find('.product-box-5').css('border-right','none');
		}
	}, 300);
} window.check_last_active = check_last_active;
/*OWL TAB SP MỚI*/
$(document).ready(function (){
	var wDW = $(window).width();
	if (wDW < 767) {
		$(".product_sale").owlCarousel({
			navigation : true,
			nav: true,
			items:1,
			navigationPage: false,
			navigationText : false,
			slideSpeed : 1000,
			pagination : true,
			dots: false,
			margin: 10,
			autoHeight:false,
			autoplay:false,
			autoplayTimeout:false,
			autoplayHoverPause:true,
			loop: false,
			responsive: {
				0: {
					items: 1
				},
				320: {
					items: 1
				},
				543: {
					items: 1
				}
			}
		});
	}
});


/* OWL SLIDER */
$(document).ready(function (){
	$('.home-slider').owlCarousel({
		loop:false,
		margin:0,
		responsiveClass:true,
		items: 1,
		dots:true,
		nav:false,
		responsive:{
			0:{
				items:1,
				nav:true
			},
			600:{
				items:1,
				nav:false
			},
			992: {
				items:1,
			},
			1200:{
				items:1,
				nav:true,
				loop:false
			}
		}
	});
});

/* OWL SP NỔI BẬT */
$(document).ready(function (){
	$("#gallery_prdloop").owlCarousel({
		navigation : true,
		nav: true,
		items:3,
		navigationPage: false,
		navigationText : false,
		slideSpeed : 1000,
		pagination : true,
		dots: false,
		margin: 10,
		autoHeight:false,
		autoplay:false,
		autoplayTimeout:false,
		autoplayHoverPause:true,
		loop: false,
		responsive: {
			0: {
				items: 3
			},
			320: {
				items: 3
			},
			543: {
				items: 3
			},
			768: {
				items: 3
			},
			991: {
				items: 3
			},
			992: {
				items: 3
			},
			1300: {
				items: 3,
				margin: 0
			},
			1590: {
				items: 3,
				margin: 10
			}
		}
	});
});

/********************************************************
# BACKTOTOP
********************************************************/
function awe_backtotop() { 
	/* Back to top */
	if ($('#back-to-top').length) {
		var scrollTrigger = 200, // px
		backToTop = function () {
			var scrollTop = $(window).scrollTop();
			if (scrollTop > scrollTrigger) {
				$('#back-to-top').addClass('show');
			} else {
				$('#back-to-top').removeClass('show');
			}
		};
		backToTop();
		$(window).on('scroll', function () {
			backToTop();
		});
		$('#back-to-top').on('click', function (e) {
			e.preventDefault();
			$('html,body').animate({
				scrollTop: 0
			}, 700);
		});
	}
} window.awe_backtotop=awe_backtotop;

/********************************************************
# Tab
********************************************************/
$(".e-tabs:not(.not-dqtab)").each( function(){
	$(this).find('.tabs-title li:first-child').addClass('current');
	$(this).find('.tab-content').first().addClass('current');

	$(this).find('.tabs-title li').click(function(){
		var tab_id = $(this).attr('data-tab');

		var url = $(this).attr('data-url');
		$(this).closest('.e-tabs').find('.tab-viewall').attr('href',url);

		$(this).closest('.e-tabs').find('.tabs-title li').removeClass('current');
		$(this).closest('.e-tabs').find('.tab-content').removeClass('current');

		$(this).addClass('current');
		$(this).closest('.e-tabs').find("#"+tab_id).addClass('current');
	});    
});
/*Open filter*/
$('.open-filters').click(function(e){
	e.stopPropagation();
	$(this).toggleClass('openf');
	$('.dqdt-sidebar').toggleClass('openf');
});
/********************************************************
# DROPDOWN
********************************************************/
$('.dropdown-toggle').click(function() {
	$(this).parent().toggleClass('open'); 	
}); 
$('.btn-close').click(function() {
	$(this).parents('.dropdown').toggleClass('open');
}); 
$('body').click(function(event) {
	if (!$(event.target).closest('.dropdown').length) {
		$('.dropdown').removeClass('open');
	};
});

/*Bắt lỗi điền giá trị âm pop cart*/
$(document).on('keydown','#qty, #quantity-detail, .number-sidebar',function(e){-1!==$.inArray(e.keyCode,[46,8,9,27,13,110,190])||/65|67|86|88/.test(e.keyCode)&&(!0===e.ctrlKey||!0===e.metaKey)||35<=e.keyCode&&40>=e.keyCode||(e.shiftKey||48>e.keyCode||57<e.keyCode)&&(96>e.keyCode||105<e.keyCode)&&e.preventDefault()});
/* Cong tru product detaile*/

$(document).on('click','.qtyplus',function(e){
	e.preventDefault();   
	fieldName = $(this).attr('data-field'); 
	var currentVal = parseInt($('input[data-field='+fieldName+']').val());
	if (!isNaN(currentVal)) { 
		$('input[data-field='+fieldName+']').val(currentVal + 1);
	} else {
		$('input[data-field='+fieldName+']').val(0);
	}
});

$(document).on('click','.qtyminus',function(e){
	e.preventDefault(); 
	fieldName = $(this).attr('data-field');
	var currentVal = parseInt($('input[data-field='+fieldName+']').val());
	if (!isNaN(currentVal) && currentVal > 1) {          
		$('input[data-field='+fieldName+']').val(currentVal - 1);
	} else {
		$('input[data-field='+fieldName+']').val(1);
	}
});


$(document).ready(function() {
	$('.btn-wrap').click(function(e){
		$(this).parent().slideToggle('fast');
	});



	/*fix menu sub*/
	jQuery("#nav li.level0 li").mouseover(function(){
		if(jQuery(window).width() >= 740){
			jQuery(this).children('ul').css({top:0,left:"158px"});
			var offset = jQuery(this).offset();
			if(offset && (jQuery(window).width() < offset.left+300)){
				jQuery(this).children('ul').removeClass("right-sub");
				jQuery(this).children('ul').addClass("left-sub");
				jQuery(this).children('ul').css({top:0,left:"-158px"});
			} else {
				jQuery(this).children('ul').removeClass("left-sub");
				jQuery(this).children('ul').addClass("right-sub");
			}
			jQuery(this).children('ul').fadeIn(100);
		}
	}).mouseleave(function(){
		if(jQuery(window).width() >= 740){
			jQuery(this).children('ul').fadeOut(100);
		}
	});
});

/*FIx brand*/
$(window).on("load resize",function(){
	$(".content_category .item").each(function() {
		var num = $(this).find('.title_cate a >span').text();
		if ($.isNumeric(num)) {
			$(this).find('.title_cate a >span').addClass('numb').html('('+num+')');
		} else {
			$(this).find('.title_cate a >span').addClass('noNumb');
		}
	});
});

/**************************************************
Silick Slider
**************************************************/

$(document).ready(function(){
	
	$('.gallery_prdloop .item a.img-body').click(function(){		
		var link = $(this).attr('data-image');
		$('.large-image-1 a>img').attr('src', link);
	});

	
});


jQuery(document).ready(function(){
	if( $('.cd-stretchy-nav').length > 0 ) {
		var stretchyNavs = $('.cd-stretchy-nav');

		stretchyNavs.each(function(){
			var stretchyNav = $(this),
			stretchyNavTrigger = stretchyNav.find('.cd-nav-trigger');

			stretchyNavTrigger.on('click', function(event){
				event.preventDefault();
				stretchyNav.toggleClass('nav-is-visible');
			});
		});

		$(document).on('click', function(event){
			( !$(event.target).is('.cd-nav-trigger') && !$(event.target).is('.cd-nav-trigger span') ) && stretchyNavs.removeClass('nav-is-visible');
		});
	}
});

/* Js Hover icon service*/
$(function() {
	$(".service-item")
	.mouseover(function() { 
		var src = $(this).find('.media a img').attr("data-src");
		var imgurl = $(this).find('.media a img');
		$(imgurl).attr("src", src);
	})
	.mouseout(function() {
		var src = $(this).find('.media a img').attr("longdesc");
		var imgurl = $(this).find('.media a img');
		$(imgurl).attr("src", src);
	});
});


/*MENU MOBILE*/

$('.menu-bar-h').click(function(e){
	e.stopPropagation();
	$('.menu_mobile').toggleClass('open_sidebar_menu');
	$('.opacity_menu').toggleClass('open_opacity');
});
$('.opacity_menu').click(function(e){
	$('.menu_mobile').removeClass('open_sidebar_menu');
	$('.opacity_menu').removeClass('open_opacity');
});
$('.ct-mobile li .ti-plus').click(function() {
	$(this).closest('li').find('> .sub-menu').slideToggle("fast");
	$(this).closest('i').toggleClass('show_open hide_close');
	return false;              
});



$(document).ready(function(){
	var wDW = $(window).width();

	/*Click tab danh muc 1*/
	var $this = $('.tab_link_module');
	$this.find('.head-tabs').first().addClass('active');
	$this.find('.content-tab').first().show();
	var title_first = $('.link_tab_check_click li:first-child >a').text();
	$('.title_check_tabs').text(title_first)
	$this.find('.head-tabs').on('click',function(){
		if(!$(this).hasClass('active')){
			$this.find('.head-tabs').removeClass('active');
			var $src_tab = $(this).attr("data-src");
			$this.find($src_tab).addClass("active");
			$this.find(".content-tab").hide();
			var $selected_tab = $(this).attr("href");
			$this.find($selected_tab).show();
		}
		return false;
	})
	$(".button_show_tab").click(function(){ 
		$('.ul_link').slideToggle('down');
	});
	if (wDW < 992) {
		var title_first = $('.ul_link li:first-child >a').text();
		$('.title_check_tabs').text(title_first);
		$this.find('.head-tabs').on('click',function(){
			$('.ul_link').slideToggle('up');
			var title_tabs = $(this).text();
			$('.title_check_tabs').text(title_tabs);
		})
	}

});



$(document).ready(function(){
	var wDW = $(window).width();

	/*Click tab danh muc 2*/
	var $this = $('.tab_link_modules');
	$this.find('.head-tabss').first().addClass('active');
	$this.find('.content-tab').first().show();
	$this.find('.head-tabss').on('click',function(){
		if(!$(this).hasClass('active')){
			$this.find('.head-tabss').removeClass('active');
			var $src_tab = $(this).attr("data-src");
			$this.find($src_tab).addClass("active");
			$this.find(".content-tab").hide();
			var $selected_tab = $(this).attr("href");
			$this.find($selected_tab).show();
		}
		return false;
	})
	$("#button_show_tabs").click(function(){ 
		$('.ul_links').slideToggle('down');
	});
	if (wDW < 992) {
		var title_first = $('.ul_links li:first-child >a').text();
		$('.title_check_tabss').text(title_first);
		$this.find('.head-tabss').on('click',function(){
			$('.ul_links').slideToggle('up');
			var title_tabs = $(this).text();
			$('.title_check_tabss').text(title_tabs);
		})
	}

});


/*** FIX POPUP LOGIN / REGISTER ***/
$(document).mouseup(function(e) {
	var container = $("#login_register");
	if (!container.is(e.target) && container.has(e.target).length === 0) {
		container.fadeOut();
		$('#login_register').modal('hide');
	}
});


/*hover get image thumb product item grid*/
function owl_thumb_image() { 
	$('.product_image_list').owlCarousel({
		loop:false,
		margin:5,
		responsiveClass:true,
		items: 3,
		dots:false,
		nav:true,
		responsive:{
			0:{
				items:1,
				nav:true
			},
			600:{
				items:2,
				nav:false
			},
			992: {
				items:2,
			},
			1200:{
				items:3,
				nav:true,
				loop:false
			}
		}
	})
} window.owl_thumb_image=owl_thumb_image;



$(function() {
	$(".owl_product_item_content .saler_item").each(function() {
		var _this = $(this).find('.owl_item_product .product-box');
		var this_thumb = $(_this).find('.product-thumbnail .image_link img');
		var default_this_thumb = $(_this).find('.product-thumbnail .image_link').attr('data-images');
		var this_mini_thumb = $(_this).find('.action_image .owl_image_thumb_item .product_image_list .item_image');
		$(this_mini_thumb)
		.mouseover(function() { 
			var this_s = $(this).attr('data-image');
			this_thumb.attr('src', this_s);
		})
		.mouseout(function() {
			this_thumb.attr('src', default_this_thumb);
		});
	});
});

function hover_thumb_image() {
	$(function() {
		$(".product-col").each(function() {
			var _this = $(this).find('.product-box');
			var this_thumb = $(_this).find('.product-thumbnail .image_link img');
			var default_this_thumb = $(_this).find('.product-thumbnail .image_link').attr('data-images');
			var this_mini_thumb = $(_this).find('.action_image .owl_image_thumb_item .product_image_list .item_image');
			$(this_mini_thumb)
			.mouseover(function() { 
				var this_s = $(this).attr('data-image');
				this_thumb.attr('src', this_s);
			})
			.mouseout(function() {
				this_thumb.attr('src', default_this_thumb);
			});
		});
	});
} window.hover_thumb_image=hover_thumb_image;
/*End*/

/*Double click go to link menu*/
var wDWs = $(window).width();
if (wDWs < 1199) {
	$('.ul_menu li:has(ul)' ).doubleTapToGo();
	$('.item_big li:has(ul)' ).doubleTapToGo();
}
var ww = $(window).width();
if (ww >= 1200){
							   
	$(document).ready(function() {
		if($(window).width()>1200){
			$('#img_01').elevateZoom({
				gallery:'gallery_02', 
				zoomWindowWidth:420,
				zoomWindowHeight:500,
				zoomWindowOffetx: 10,
				easing : true,
				scrollZoom : true,
				cursor: 'pointer', 
				galleryActiveClass: 'active', 
				imageCrossfade: true
			});
		}
	});
	 
	 }
	 $("#img_02").click(function(e){
		 e.preventDefault();
		 var hr = $(this).attr('src');
		 $('#img_01').attr('src',hr);
		 $('.large_image_url').attr('href',hr);
		 $('#img_01').attr('data-zoom-image',hr);
	 });

	 $(window).on("load resize",function(e){
		 if($(window).width()<768){					   
			 $('.product-tab .tab-link:nth-child(1) ').append('<div class="tab-content-mobile"></div>');
			 $('.product-tab .tab-link:nth-child(1) .tab-content-mobile').append($('#tab-1').html());
			 $('.product-tab .tab-link:nth-child(1)').addClass('current');

			 $('.product-tab .tab-link:nth-child(2)').append('<div class="tab-content-mobile"></div>');
			 $('.product-tab .tab-link:nth-child(2) .tab-content-mobile').append($('#tab-2').html());

			 $('.product-tab .tab-link:nth-child(3)').append('<div class="tab-content-mobile"></div>');
			 $('.product-tab .tab-link:nth-child(3) .tab-content-mobile').append($('#tab-3').html());

			 $('.product-tab .tab-content').remove();
			 $('.tab-link').click(function(e){

			 })
		 }
	 });


	 if($(window).width()<768){					   
		 $('.product-tab .tab-link:nth-child(1) ').append('<div class="tab-content-mobile"></div>');
		 $('.product-tab .tab-link:nth-child(1) .tab-content-mobile').append($('#tab-1').html());
		 $('.product-tab .tab-link:nth-child(1)').addClass('current');

		 $('.product-tab .tab-link:nth-child(2)').append('<div class="tab-content-mobile"></div>');
		 $('.product-tab .tab-link:nth-child(2) .tab-content-mobile').append($('#tab-2').html());

		 $('.product-tab .tab-link:nth-child(3)').append('<div class="tab-content-mobile"></div>');
		 $('.product-tab .tab-link:nth-child(3) .tab-content-mobile').append($('#tab-3').html());

		 $('.product-tab .tab-content').remove();

	 }

	 $(".not-dqtab").each( function(e){
		 $(this).find('.tabs-title li:first-child').addClass('current');
		 $(this).find('.tab-content').first().addClass('current');

		 $(this).find('.tabs-title li').click(function(){
			 if($(window).width()>315){	
				 if($(this).hasClass('current')){
					 $(this).removeClass('current');
				 }else{
					 var tab_id = $(this).attr('data-tab');
					 var url = $(this).attr('data-url');
					 $(this).closest('.e-tabs').find('.tab-viewall').attr('href',url);

					 $(this).closest('.e-tabs').find('.tabs-title li').removeClass('current');
					 $(this).closest('.e-tabs').find('.tab-content').removeClass('current');

					 $(this).addClass('current');
					 $(this).closest('.e-tabs').find("#"+tab_id).addClass('current');
				 }
			 }else{
				 var tab_id = $(this).attr('data-tab');
				 var url = $(this).attr('data-url');
				 $(this).closest('.e-tabs').find('.tab-viewall').attr('href',url);

				 $(this).closest('.e-tabs').find('.tabs-title li').removeClass('current');
				 $(this).closest('.e-tabs').find('.tab-content').removeClass('current');

				 $(this).addClass('current');
				 $(this).closest('.e-tabs').find("#"+tab_id).addClass('current');

			 }

		 });    
	 });
	 function scrollToxx() {
		 $('html, body').animate({ scrollTop: $('.product-tab.e-tabs').offset().top }, 'slow');
		 $('.product-tab .tab-link').removeClass('current');
		 $('.product-tab .tab-link[data-tab=tab-3]').addClass('current');
		 $('.product-tab .tab-content').removeClass('current');
		 $('.product-tab .tab-content#tab-3').addClass('current');

		 return false;
	 }
	 /*For recent product*/
	 var alias = 'sofa-da-ma-ntx1824-1';
	 /*end*/
	 if (ww >= 1200){
		 
		 $(document).ready(function() {
			 $('#img_01').elevateZoom({
				 gallery:'gallery_02', 
				 zoomWindowWidth:420,
				 zoomWindowHeight:500,
				 zoomWindowOffetx: 10,
				 easing : true,
				 scrollZoom : true,
				 cursor: 'pointer', 
				 galleryActiveClass: 'active', 
				 imageCrossfade: true

			 });
		 });
		  
		  }
		  $('#gallery_00 img, .swatch-element label').click(function(e){

			  $('.checkurl').attr('href',$(this).attr('src'));
			  if (ww >= 1200){
				  
				  setTimeout(function(){
					  $('.zoomContainer').remove();				
					  $('#zoom_01').elevateZoom({
						  gallery:'gallery_02', 
						  zoomWindowWidth:420,
						  zoomWindowHeight:500,
						  zoomWindowOffetx: 10,
						  easing : true,
						  scrollZoom : true,
						  cursor: 'pointer', 
						  galleryActiveClass: 'active', 
						  imageCrossfade: true
					  });
				  },300);
				   
				   }
				  });
