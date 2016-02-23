jQuery(document).ready(function ($) {  
  var slider = $('input#velocity-slider'),
      input = $('input#velocity-input'),
      redOverlay = $('.red-overlay', '.method1'),
      blueOverlay = $('.blue-overlay', '.method1'),
      star2 = $('img', '.method2');

  function updateColor(num) {
    var num = parseInt(num, 10);

    if ( isNaN(num) ) {
      return;
    }

    if (num === 0) {
       star2.css({
        'filter'         : '',
        '-webkit-filter' : ''       
       });

       redOverlay.css({'opacity': 0});
       blueOverlay.css({'opacity': 0});
    } else if (num < 0) {
      star2.css({
        'filter'         : 'hue-rotate(180deg) saturate('+ Math.abs(num) +')',
        '-webkit-filter' : 'hue-rotate(180deg) saturate('+ Math.abs(num) +')'
      });
      
      redOverlay.css({'opacity': 0});
      blueOverlay.css({'opacity': (Math.abs(num) - 10) / 100 });
    } else {
      star2.css({
        'filter'         : 'saturate('+ Math.abs(num) +')',
        '-webkit-filter' : 'saturate('+ Math.abs(num) +')'
      });

      blueOverlay.css({'opacity': 0});
      redOverlay.css({'opacity': (Math.abs(num) - 10) / 100 });
    }
  }

  slider.on("input change", function() {
    var num = slider.val();

    input.val(num);
    updateColor(num);
  });

  input.on("input change", function() {
    var num = input.val(); 

    slider.val(num);
    updateColor(num);
  });
// end .ready        
});
