// extend jQuery with a method to test if a jQuery-selector returns an empty object
$.fn.exists = function () {
    return this.length !== 0;
}

// sticky nav, modal dialog, and Toolkit-assets
jQuery(document).ready(function ($) {
	//sticky nav
	var nav = $('nav#topNav'),
		aHome = $('a#home'),
		$body = $('body'),
		navH = nav.outerHeight(),
		assetsHref = '';

	aHome.click(function(e) {
		$('html, body').animate({ scrollTop: 0 }, 'slow');
		return false;
	});

	$(window).scroll(function() {
		var scrollVal = $(this).scrollTop();

		if ( scrollVal > $('header').outerHeight() ) {
			$body.addClass('fixedNav');
			//small delay because FireFox did not render css-transition immediately after 'position:fixed'
			setTimeout( function(){ aHome.addClass('fixed'); } ,100);
		} else {
			$body.removeClass('fixedNav');
			setTimeout( function(){ aHome.removeClass('fixed'); } ,100);
		}
	});

	// Modal dialog click-event
	if( $('.modal').exists() ) {
		$('.modal').click(function(e) {
			assetsHref = this.hash;

			$('#basic-modal-content').modal({
				zIndex: 300,
				opacity: 70,
				closeHTML: '',
				//overlayClose: true,
				onShow: function(d) {
					var modal = this,
						modalContent = d.data[0],
						isDisabled = true,
						downloadBtn = $('#downloadBtn',modalContent),
						downloadTxt = 'Please agree to terms and conditions.';

					//always disable download on initial
					downloadBtn.attr("disabled", isDisabled);
					downloadBtn.attr('title', downloadTxt );

					$('#agreeChkbox',modalContent).click(function(e){
						var thisEl = $(this);

						isDisabled = !isDisabled;
						thisEl.toggleClass('isChecked');
						downloadBtn.attr('disabled', isDisabled);
						downloadBtn.attr('title', (isDisabled ? downloadTxt : '') );
					});

					$('#downloadBtn',modalContent).click(function(e){
						if(assetsHref !== '') {
							window.location = 'assets/' + assetsHref.substring(1) + '.zip';
							//close the dialog
							modal.close(); // or $.modal.close();
						} else {
							alert('Sorry, we do not have this available for download yet.');
						}
					});

				}
			});
			return false;
		});
	}

	//bind event for assets-icons
	if( $('ul#mainAssets').exists() ) {
		var mainAssetsLink = $('li a','ul#mainAssets'),
			first_mainAssetsLink = mainAssetsLink.eq(0);

		function scrollToAsset(thisEl) {
			//small delay to let nav settle to 'position:fixed'
			setTimeout(function() {
				$('html, body').animate({ scrollTop: Math.round( thisEl.offset().top - (navH + 10) ) }, 'fast');
			}, 100);
		}

		function resetSection() {
			mainAssetsLink.each(function(index) {
				$(this).parent().removeClass('active inactive');
			});
			$body.removeClass('fixedFooter');			
		}

		function toggleSection() {
			var thisEl = $(this),
				thisElParent = thisEl.parent(),
				section = this.hash || thisEl.attr('href'),
				$section = $(section),
				sectionTop = Math.round(thisEl.offset().top + thisEl.height() + 40);

			function footerTop() {
				$('footer').css('top', sectionTop + $section.height() );
			}

			if(thisElParent.hasClass('active')) {
				$section.hide();
				resetSection();
			} else {
				mainAssetsLink.each(function(index) {
					$(this).parent().removeClass('active');
					$(this).parent().addClass('inactive');
				});

				thisElParent.addClass('active');
				thisElParent.removeClass('inactive');
				$('section.detail').hide();
				$section.show().css('top', sectionTop);				
				/* Chrome bug: jumpy when 'hide()' is first
				$('section.detail').each(function(index) {
					if ( $(this).attr('id') != $section.attr('id') ) {
						$(this).hide();
					}
				});
				*/				
				$body.addClass('fixedFooter');

	    		if( $('.flexslider',section).exists() ) {
		    		$('.flexslider',section).flexslider({
					    animation: "slide",
					    slideshow: false
					});
				}

				//small delay to let flexsliders settle heights
				setTimeout(footerTop, 100);

				scrollToAsset(thisEl);
			}		
		}

		$('a','#startBtn').click(function(e) {
			if( first_mainAssetsLink.parent().hasClass('active') ) {
				scrollToAsset( first_mainAssetsLink );
			} else {
				toggleSection.call( first_mainAssetsLink );
			}
			this.blur();			
			return false;
		});

		mainAssetsLink.click(function(e) {		
			toggleSection.call(this);
			if( $('#tiptip_holder').exists() ) { 
				$('#tiptip_holder').fadeOut(200); 
			}
			this.blur();	
			return false;
		});

		//reset on window.resize
		$(window).resize(function() {
			$('section:visible').hide();
			resetSection();
			if( $('.modal').exists() ) {
				$.modal.close();
			}
		});
	}
// end .ready	
});

// FAQs page
jQuery(document).ready(function ($) {
	if( $('body#faq').exists() ) {
		$('h3', '#faqContent').click(function(e) {
			var thisEl = $(this);

			thisEl.next().slideToggle('fast').siblings('p:visible').slideUp('fast');
			
			if(thisEl.siblings().hasClass('active')) {
				thisEl.siblings().removeClass('active');
			}
			
			if(thisEl.hasClass('active')) {
				thisEl.removeClass('active');
			} else {
				thisEl.addClass('active');
			}
		});
	}
// end .ready	
});

