$(document).ready(function(){$("#fullpage").fullpage({anchors:["home","pages","about-me","my-works","contact"],sectionsColor:["#000","#00ffb8","#000","#fff","#fff"],navigation:!0,controlArrows:!1,slidesNavigation:!0,slidesNavPosition:"bottom",afterLoad:function(o,a){"home"==o?($(".logo").addClass("logo-lg"),$(".logo").removeClass("logo-sm"),$(".main-nav--anchor").removeClass("main-nav--anchor-sm")):($(".logo").removeClass("logo-lg"),$(".logo").addClass("logo-sm"),$(".main-nav--anchor").addClass("main-nav--anchor-sm")),"contact"==o||"pages"==o||"my-works"==o?($(".logo").addClass("logo-black"),$(".logo").removeClass("logo-white")):($(".logo").addClass("logo-white"),$(".logo").removeClass("logo-black")),"pages"==o||"my-works"==o||"contact"==o?$(".main-nav--anchor").addClass("black"):$(".main-nav--anchor").removeClass("black")}})});