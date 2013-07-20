/*!
FAQ-page scripts
*/
$(function(){

  var container = $('#faqContainer'),
      subnav = $('#faqSidebar'),
      containerTop = container.offset().top,
      subnavH = subnav.outerHeight(true),
      subnavTop = subnav.offset().top;         

  //getContainerH because container can resize 
  function getContainerH() {
    return container.height();
  }  

  //scroll-follow the faqSidebar
  $(window).scroll(function() {
    var scrollVal = $(this).scrollTop(),
        containerH = getContainerH(); //important to get the containerH again if it was resized

    if ( (scrollVal > subnavTop) && (scrollVal < (containerTop+containerH)) ) {
        if( scrollVal > ( (containerTop+containerH)-subnavH ) ) {
          subnav.css({'position':'absolute','top':'','bottom':'58px'});
        } else {
          subnav.css({'position':'fixed','top':'0px'});            
        }
    } else {
       subnav.css({'position':'static'});
    }
  });

  function gotoTop() {
    $('html, body').animate({scrollTop:200}, 200);
  }
  
  function toggleSection() {
    var thisEl = $(this);
    gotoTop();
    thisEl.next().slideToggle('fast').parent().siblings().find('.faqSection:visible').slideUp('fast');
    if(thisEl.parent().siblings().find('h3').hasClass('active')) {
      thisEl.parent().siblings().find('h3').removeClass('active');
    }
    if(thisEl.hasClass('active')) {
      thisEl.removeClass('active');
    } else {
      thisEl.addClass('active');
    }
  }

  function toggleSideBar() {
    var thisEl = $(this);
    if(thisEl.parent().siblings().hasClass('active')) {
      thisEl.parent().siblings().removeClass('active');
    }
    if(thisEl.parent().hasClass('active')) {
      thisEl.parent().removeClass('active');
    } else {
      thisEl.parent().addClass('active');
    }
  }

  $('section h3', '#faqContent').click(function() {
      var j = $(this).parent().attr('id');
      toggleSideBar.call($('li a[data-target="' + j + '"]', '#faqSidebar'));
      toggleSection.call(this);
  });

  /*
  $('.question h4', '#faqContent').click(function() {
    $(this).next().slideToggle('fast').parent().siblings().find('.answer:visible').slideUp('fast');
    if($(this).parent().siblings().hasClass('active')) {
      $(this).parent().siblings().removeClass('active');
    }
    if($(this).parent().hasClass('active')) {
      $(this).parent().removeClass('active');
    } else {
      $(this).parent().addClass('active');
    }
  });
  */

  $('li a', '#faqSidebar').click(function() {
    if($(this).parent().hasClass('active')) {
      gotoTop();
    } else {
      toggleSideBar.call(this);
      toggleSection.call($('section#' + $(this).data('target') + ' h3', '#faqContent'));
    }
    return false;
  });

  //show first FAQ section
  $('#faqContent').find('.faqSection').first().show().siblings().addClass('active');
  
  //alternate background
  //$('.question:even', '#faqContent').addClass('alt');

});