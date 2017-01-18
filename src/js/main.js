$(document).ready(function() {
	jQuery.fn.visible = function() {
		return this.css('visibility', 'visible');
	};

	jQuery.fn.invisible = function() {
		return this.css('visibility', 'hidden');
	};


  $('#fullpage').fullpage({
		// fixedElements: '.header',
		anchors : ['home', 'pages', 'about-me', 'my-works', 'contact'],
		sectionsColor : ['#000', '#00ffb8', '#000' , '#fff', '#fff'],
		navigation : true,
		controlArrows : false,
		// responsiveWidth : true,
		// responsiveSlides : true,
		slidesNavigation: true,
    slidesNavPosition: 'bottom',

		afterLoad : function(anchorLink, index) {

			// Aumentar e diminuir tamanho do header
			if(anchorLink == 'home') {
				$('.logo').addClass('logo-lg');
				$('.logo').removeClass('logo-sm');
				$('.main-nav--anchor').removeClass('main-nav--anchor-sm');
			}
			else {
				$('.logo').removeClass('logo-lg');
				$('.logo').addClass('logo-sm');
				$('.main-nav--anchor').addClass('main-nav--anchor-sm');
			}

			// deixa logo preta
			if(anchorLink == 'contact' || anchorLink == 'pages' || anchorLink == 'my-works') {
        $('.logo').addClass('logo-black');
        $('.logo').removeClass('logo-white');
      }
			
			// retorna ao logo branco
      else {
				$('.logo').addClass('logo-white');
				$('.logo').removeClass('logo-black');
      }
			
			// deixa a navegação preta
     if(anchorLink == 'pages' || anchorLink == 'my-works' || anchorLink == 'contact') {
				$('.main-nav--anchor').addClass('black');
      }
      else { // retorna navegação ao branco
				$('.main-nav--anchor').removeClass('black');
      }

			if(anchorLink == 'my-works') {
				$.fn.fullpage.moveTo('my-works', 1);
			}

			if(anchorLink == 'pages') {
				$('[data-trigger="openMenu"]').invisible();
			}
			else {
				$('[data-trigger="openMenu"]').visible();
			}
		},

		onLeave : function(index, nextIndex, direction) {
			// if(index == 1) {
			// }
		}
  });

	$('[data-trigger="openMenu"]').on('click', function() {
		$.fn.fullpage.silentMoveTo('pages');
	});
});