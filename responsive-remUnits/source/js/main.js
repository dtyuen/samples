// extend jQuery with a method to test if a jQuery-selector returns an empty object
$.fn.exists = function () {
    return this.length !== 0;
}

// info-panel
jQuery(document).ready(function ($) {  

    var $window = $(window),
        $body = $('body'),
        $html = $('html');

    function toggleBreakpoint() {
      var windowWidth = $window.width();
       // toggle breakpoint classes
      $html.toggleClass('desktop', (windowWidth >= 1025));
      $html.toggleClass('tablet-lnd', ( (windowWidth >= 769) && (windowWidth <= 1024) ));
      $html.toggleClass('tablet-ptr', ( (windowWidth >= 640) && (windowWidth <= 768) ));          
      $html.toggleClass('mobile', (windowWidth <= 639) );
    }

    toggleBreakpoint();

    if ( $('#panel').exists() ) {
      var $panel = $('#panel'),
          $win = $('.win', $panel),
          $width = $('.width', $panel),
          $fontsize = $('.fontsize', $panel),
          $closeBtn = $('.close-x', $panel);

      $closeBtn.click(function () {
        $panel.hide();
      });

      $win.html($window.width() + 'px');
      $width.html($body.outerWidth() + 'px');
      $fontsize.html($html.css('font-size'));
    }

    $(window).on('resize', function () {
        //console.log($window.width());
        toggleBreakpoint();

        if ( $('#panel').exists() ) {
          $win.html($window.width() + 'px');
          $width.html($body.outerWidth() + 'px');
          $fontsize.html($html.css('font-size'));
        }
    });
// end .ready        
});


// dashboard isotope
jQuery(document).ready(function ($) {  
  if ( $('#isotope-container').exists() ) {  
    var $container = $('#isotope-container');
    
    $container.isotope({
      itemSelector : '.element',
      masonry : {
        columnWidth : 1
      },
      getSortData : {
        date : function ( $elem ) {
          return Date.parse($elem.attr('data-date'));
        },
        priority : function ( $elem ) {
          return parseInt($elem.attr('data-priority'), 10 );
        },
        /*weight : function ( $elem ) {
          return parseFloat( $elem.find('.weight').text().replace( /[\(\)]/g, '') );
        },*/
        number : function ( $elem ) {
          return parseInt( $elem.find('.number').text(), 10 );
        },
        name : function ( $elem ) {
          return $elem.find('.name').text();
        }
      }    
    });
    
    
    var $optionSets = $('#options .option-set'),
        $optionLinks = $optionSets.find('a');

    $optionLinks.click(function () {
      var $this = $(this);
      // don't proceed if already selected
      if ( $this.hasClass('selected') ) {
        return false;
      }
      var $optionSet = $this.parents('.option-set');
      $optionSet.find('.selected').removeClass('selected');
      $this.addClass('selected');

      // make option object dynamically, i.e. { filter: '.my-filter-class' }
      var options = {},
          key = $optionSet.attr('data-option-key'),
          value = $this.attr('data-option-value');
      // parse 'false' as false boolean
      value = value === 'false' ? false : value;
      options[ key ] = value;
      if ( key === 'layoutMode' && typeof changeLayoutMode === 'function' ) {
        // changes in layout modes need extra logic
        changeLayoutMode( $this, options )
      } else {
        // otherwise, apply new options
        $container.isotope( options );
      }
      
      return false;
    });
  }
// end .ready        
});

