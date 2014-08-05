// extend jQuery with a method to test if a jQuery-selector returns an empty object
$.fn.exists = function () {
    return this.length !== 0;
}

/*-- info-panel --*/
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

/*-- touch-enabled devices --*/
jQuery(document).ready(function ($) {  

    if ("ontouchstart" in document.documentElement) {
      document.documentElement.className += " touch";
    } else {
      document.documentElement.className += " no-touch";
    }

    $('.touch .touchHover').bind('click', function (e) {
    //$('.touch .touchHover').bind('touchstart', function(e) {
      //e.preventDefault();
      //alert($(this).attr('data-id'));
      $(this).toggleClass('touchHover_effect');
    });

    // Force touch to behave more :hover and less like :active on iOS. `function()` can be left empty.
    // http://stackoverflow.com/questions/2851663/how-do-i-simulate-a-hover-with-a-touch-in-touch-enabled-browsers
    //document.addEventListener("touchstart", function(){}, true);

    /*Modernizr.addTest('firefox', function () {
     return !!navigator.userAgent.match(/firefox/i);
    });*/

// end .ready        
}); 

/*-- nav and navMenu --*/
jQuery(document).ready(function ($) {  
  /*-- fixed-header --*/
  if ( $('.headerWrapper').exists() ) {
    var $headerWrapper = $('.headerWrapper'),
        hasHash = false;

    //on scroll
    $(window).scroll(function () {
      var scrollVal = $(this).scrollTop();
      if (!hasHash) {
        if (scrollVal > 5) {
          $headerWrapper.addClass('scrolled');
        } else {
          $headerWrapper.removeClass('scrolled');
        }
      }
    });

    if (window.location.hash) {
      var $htmlBody = $('html, body'),
          hasHash = true;
      //small delay to let page settle
      setTimeout(function () {
        $htmlBody.scrollTop( $(window.location.hash).offset().top - $headerWrapper.innerHeight() + 8 );
        //small delay to ensure after scrollTop
        setTimeout(function () { hasHash = false; }, 50);
      }, 50);
    }
  }

  /*-- nav, nav-menu --*/
  if ( $('#btnMenu').exists() ) {  
    var $btnMenu = $('#btnMenu'),
        $navMenu = $('#navMenu');

    $btnMenu.click(function (e) {
      e.preventDefault();
      $btnMenu.toggleClass('active');
      $navMenu.toggleClass('active');
      this.blur();
    });

    $navMenu.find('button.close').click(function (e) {
      $btnMenu.toggleClass('active');
      $navMenu.toggleClass('active');
    });
  }

  if ( $('#btsModal').exists() ) {
    var $body = $('body'),
        $loading = $('.loading', '#btsModal'),
        $modalBody = $('.modal-body', '#btsModal');

    /*-- modals --*/
    $('a[data-toggle="modal"][data-dialog], button[data-toggle="modal"][data-dialog]').click(function (e) {
      $.ajax({
        url: $(this).data('dialog'),
        timeout: 5000,  // sets timeout to 5 seconds
        success: function(data, textStatus, jqXHR)
        {
          //alert(data + ' | jqXHR: ' + JSON.stringify(jqXHR) + ' | textStatus: ' + textStatus);
          $loading.hide();
          $modalBody.html('').html(data);
        },
        error: function(jqXHR, textStatus, errorThrown)
        {
          //alert('jqXHR: ' + JSON.stringify(jqXHR) + ' | ' + 'errorThrown: ' + errorThrown + ' | textStatus: ' + textStatus);
          $loading.hide();
          $('<div/>', {'class': 'result error', html: 'Sorry, the content could not be loaded at this time.'}).appendTo( $modalBody ).show();
        }
      }); // end .ajax
    }); // end .click

    /*-- video modal --*/
    $('a[data-toggle="modal"][data-video], button[data-toggle="modal"][data-video]').click(function (e) {
      $body.addClass('videoModal');
      $loading.hide();
      $modalBody.html('<div class="responsive-container"><iframe src="' + $(this).data('video') + '" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe></div>');     
    }); // end .click      

    /*-- Boostrap-modal event --*/
    $('#btsModal').on('hidden.bs.modal', function (e) { 
      if ($body.hasClass('videoModal')) {
        $body.removeClass('videoModal');
        $modalBody.html('');
      }
    });
  }

  // if ( $('#loginModal').exists() ) {   
  //   // Boostrap-modal event
  //   $('#loginModal').on('shown.bs.modal', function (e) { 
  //     $('input[tabindex="1"]', '#loginModal').focus();
  //   });
  // }
// end .ready        
}); 


/*-- Team page --*/
jQuery(document).ready(function ($) {  
  if ( $('.team .photo').exists() ) {
    var i = 2; // first photo is 2nd-child because header-div is 1st-child
    var intervalId = setInterval(function () {
        if (i > $('.team .photo').length) { clearInterval(intervalId); } 
        $('.team .photo:nth-child(' + i + ')').css({opacity: 1});
        i++;      
      }, 200);
  }
// end .ready        
}); 


/*-- Sales modal --*/
jQuery(document).ready(function ($) {  
  if ( $('#salesModal').exists() ) {  
    
    // Boostrap-modal event
    // $('#salesModal').on('shown.bs.modal', function (e) { 
    //   $('input[tabindex="1"]', '#salesModal').focus();
    // });

    // .change-handler for all `.selectBG` dropmenus
    $('.selectBG select', '#salesModal').change(function () {
      var $this = $(this);
      $this.parent().find('.select-ed').removeClass('placeholder').html( 
        $this.find('option:selected').text()
      );
    }); // end .change

    // build `sub-category` dropmenu based on `category` dropmenu
    $('.selectBG select[name="category"]', '#salesModal').change(function () {
      var $this = $(this),
          $subCategory = $('.selectBG select[name="sub-category"]', '#salesModal'),
          $subCategorySpan = $subCategory.parent().find('.select-ed'),
          businesstoolsArr = ["Accounting Software", "Business Management/ERP", "Club/Association Management Software", "Construction Management Software", "CRM", "Donation Management Software", "Ecommerce,Education Software", "Events/Ticketing Software", "Field Service Management Software", "Government Software", "Healthcare Management Software", "Invoicing and Billing", "Law Practice Management Software", "Manufacturing/Farm Software", "Marketing Services/Software", "POS/Restaurant Management Software", "Project Management", "Reservations/Hospitality/Tour Operator Management Software", "Scheduling Software", "Spa/Beauty/Personal/Pet Services Software", "Vehicle/Real Estate Property Management Software", "Veterinary Management Software", "Other"],
          crowdfundingArr = ["Donations", "Equity", "Loans", "Registry", "Rewards", "Other"],
          marketplacesArr = ["Art/Music/Books/Entertainment", "Business Goods", "Clothes", "Consumer Goods", "Custom/Luxury", "Dating,Deals", "Delivery/Food", "Education", "Labor/Services", "Transportation", "Vacation/Rentals", "Other"],
          otherArr = ["Other"];

      function buildOptions(Arr) {
        Arr = Arr || [];
        // Clear existing options in second dropdown
        $subCategory.find('option:not(:first-child)').remove(); 
        for (var j = 0; j < Arr.length; j++) {
          // add options
          $('<option/>', {value: Arr[j], html: Arr[j]}).appendTo($subCategory);
        }
        $subCategory.prop( "disabled", false );
        $subCategorySpan.removeClass('placeholder').html( "Sub-Category" );
      }

      switch ( $this.find('option:selected').val() ) {
        case 'Business Tools':
          buildOptions(businesstoolsArr);
          break;
        case 'Crowdfunding':
          buildOptions(crowdfundingArr);
          break;
        case 'Marketplaces':
          buildOptions(marketplacesArr);
          break;
        case 'Other':
          buildOptions(otherArr);
          break;
        default:
          buildOptions();
          $subCategory.prop( "disabled", true );
          $subCategorySpan.addClass('placeholder');
          break;
      }
    }); // end .change

    //submit form by ajax
    $('form', '#salesModal').submit(function (e) {
      var postData = $( this ).serialize(),
          $loading = $('.loading', '#salesModal'),
          $submitBtn = $('button[type="submit"]', '#salesModal');

      //console.log(postData);
      e.preventDefault();
      $submitBtn.hide();
      $loading.show();

      $.ajax({
        url : 'http://go.pardot.com/l/44942/2014-05-21/qby',
        type: "POST",
        data : postData,
        timeout: 5000,  // sets timeout to 5 seconds
        dataType: 'jsonp',
        jsonpCallback: 'salesCallback',
        success: function(data, textStatus, jqXHR)
        {
          //alert('jqXHR: ' + JSON.stringify(jqXHR) + ' | textStatus: ' + textStatus);
          //if (data.result === 'success') {
            $loading.hide();
            $('.result', '#salesModal').removeClass('error').show().html( 'Thank you, your request has been submitted.' );
          /*} else {
            $loading.hide();
            $submitBtn.show();
            $('.result', '#salesModal').addClass('error').show().html( 'Sorry, we could not process the information given. Please check the fields, and try again.' );
          }*/
        },
        error: function(jqXHR, textStatus, errorThrown)
        {    
          $loading.hide();
          $('.result', '#salesModal').addClass('error').show().html( 'Sorry, we could not process the form at this time.' );
          //alert('jqXHR: ' + JSON.stringify(jqXHR) + ' | ' + 'errorThrown: ' + errorThrown + ' | textStatus: ' + textStatus);
        }
      }); // end .ajax
    }); // end .submit

  }
// end .ready        
}); 


/*-- Jobs page --*/
jQuery(document).ready(function ($) {  
  if ( $('.jobsRow').exists() ) {
    $.getJSON('http://www.jobscore.com/jobs/wepay/feed.json?callback=?', function (data) {
        //console.dir(data);
        var jobsArr = data.jobs,
            half = jobsArr.length / 2,
            $leftCol = $('.leftCol', '.jobsWrapper'),
            $rightCol = $('.rightCol', '.jobsWrapper'),
            $col = $leftCol,
            ulList = $('<ul/>'),
            priorDept,
            currentDept;
            
        function buildJobsModal(index) {
          var $jobModal = $('.modal-body', '#jobsModal');
          $jobModal.html("");
          $('<h4/>', {'class': 'job-title', html: $(this).text()}).appendTo( $jobModal );          
          $('<div/>', {'class': 'jobDetail', html: jobsArr[index].description}).appendTo( $jobModal );
          $('<a/>', {'class': 'btn btn-primary', href: jobsArr[index].apply_url, html: 'Apply'}).appendTo( $jobModal );  // target: '_blank'
        }

        $('button.close', '#jobsModal').click(function (e) {
          $('.jobDetail', '#jobsModal').scrollTop(0);
        });
            
        for(var i = 0; i < jobsArr.length; i++) {
          currentDept = jobsArr[i].department;
          
          if (currentDept !== priorDept) {
            if (ulList.find('li').length !== 0) { ulList.appendTo($col); }
            if (i > half) { $col = $rightCol; }
            $('<h4/>', {html: jobsArr[i].department}).appendTo($col);
            ulList = $('<ul/>');
          }

          $('<li><a data-index="' + i + '" data-toggle="modal" href="#jobsModal">' + jobsArr[i].title + '</a></li>')
            .on('click', function (e) {
              buildJobsModal.call( this, $(this).find('a').data('index') );
            })
            .appendTo( ulList );
          
          if ( i === jobsArr.length-1 ) { ulList.appendTo($col); }
          priorDept = currentDept;
        }

        $('.loading').hide();
        
        /*
        var items = [];
        $.each( data.jobs, function( i, val ) {
          items.push( "<h4>" + val.title + "</h4>" );
        });
        $('.leftCol', '.jobsWrapper').append(items.join( "" ));
        */
    }); // end .getJSON     
  }
// end .ready        
}); 


/*-- Platforms page --*/
jQuery(document).ready(function ($) {
  // if ( $('.rotate ul.logos').exists() ) {
  //   setInterval(function () {
  //     var $first = $('.rotate ul.logos li:first-child');
  //     $('.rotate ul.logos').append( $first );
  //   }, 5000 );
  // }

  if ( $('.rotate ul.logos').exists() ) {
    var n = 1,
        $clone = $('.rotate ul.logos').clone(),
        cloneLength = $clone.find('li').length,
        c = cloneLength;

    function getCloneA(index) {
      return $clone.find('li:nth-child(' + index + ') a');
    }

    $clone.find('a').addClass('opacity-0');

    setInterval(function () {
      var $originalLi = $('.rotate ul.logos li:nth-child(' + n + ')'),
          $originalA = $originalLi.find('a');

      $originalA.animate(
        {opacity: 0},
        1000,
        function () {
          var $cloneA = getCloneA(c);

          if ( $cloneA.data('id') === $originalA.data('id') ) {
            c--;
            $cloneA = getCloneA(c);
          }

          $originalA.remove();
          $cloneA.clone().appendTo( $originalLi ).animate({opacity: 1}, 1000);

          (n === 3) ? (n = 1) : n++;          
          (c === 1) ? (c = cloneLength) : c--;
      });
    }, 4000 );
  }

}); // end .ready

;
