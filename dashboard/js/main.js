// extend jQuery with a method to test if a jQuery-selector returns an empty object
$.fn.exists = function () {
    return this.length !== 0;
}

/*-- Dashboard --*/
jQuery(document).ready(function ($) {  
  if ( $('#dashboard').exists() ) {
    $('*[data-toggle="popover"]', '#dashboard').popover();

    $('.progress-wrapper').find('*[data-toggle="popover"]').on('show.bs.popover', function () {
      var $this = $(this);
      $this.mousemove(function(event) {
        var left = event.pageX - $this.offset().left - 50;
        //var top = event.pageY - $(this).offset().top;
        $this.next('.popover').css({left: left});
      });
    });

    $('.welcome-intro h4 a').click(function(e) {
      e.preventDefault();

      var $link = $(e.currentTarget),
          $linkParent = $link.parent().parent(),
          stepNum = parseInt($link.data('step'));
          nextStepNum = stepNum + 1;

      if ( !$linkParent.hasClass('grayout') ) {
        $linkParent.find('.icon-checkbox').toggleClass('checked');
        $linkParent.toggleClass('active');
        
        $('#step-' + nextStepNum).toggleClass('grayout active disabled');
        
        if ( $('#step-' + nextStepNum).hasClass('grayout') ) {
          //disable all steps after current
          for (i = nextStepNum; i < 5; i++ ) {
            var $stepEl = $('#step-' + i);
            $stepEl.addClass('grayout disabled').removeClass('active');
            //$stepEl.find('input[type="checkbox"]').addClass('disabled');
            $stepEl.find('.icon-checkbox').removeClass('checked');
          }         
        }

        if (stepNum >= 3) {
          $('.row.widget-row').removeClass('grayout');
        } else {
          $('.row.widget-row').addClass('grayout');
        }   
      }
    });
  }
// end .ready        
});


/*--Details --*/
jQuery(document).ready(function ($) {  
  if ( $('#details').exists() ) {
    /*-- Boostrap-modal event --*/
    function initCloseBtn(element) {
      $('#' + element).on('show.bs.modal', function (e) {
        $( '<button type="button" id="' + element + '-close" class="close" data-dismiss="modal">&times;</button>' )
        .click(function () {
          $('#' + element).modal('hide');
        })
        .appendTo(document.body);
      });

      $('#' + element).on('hide.bs.modal', function (e) {
        $('#' + element + '-close').remove();
      });
    }

    initCloseBtn('siteslistModal');

    /*-- side-menu --*/
    $('#groupbyMenu .dropdown-menu a').click(function (e) {
      e.preventDefault();
      var $link = $(e.currentTarget),
          $pathSubmenu = $('#path-submenu'),
          $prioritySubmenu = $('#priority-submenu');

      $('.select-ed', '#groupbyMenu').text( $link.text() );
      $('.dropdown-menu li.current', '#groupbyMenu').removeClass('current');
      $link.parent().addClass('current');

      $pathSubmenu.toggle();
      $prioritySubmenu.toggle();
      $('.policy-submenu li.active').removeClass('active');
      $pathSubmenu.find('li:first-child').addClass('active');
      $prioritySubmenu.find('li:first-child').addClass('active');
    });

    $('.policy-submenu a').click(function(e) {
      e.preventDefault();
      var $link = $(e.currentTarget);
      $('.policy-submenu li.active').removeClass('active');
      $link.parent().addClass('active');
    });


    /*-- Sites-List --*/
    $('.siteslist-link, .paths span.button').click(function (e) {
      $('html, body').animate({scrollTop: 0}, 250);
      //$link.toggleClass('active');
      $('#details-siteslist').toggle();
      //$('#tableDetails').table().data( "table" ).refresh();
    });

    $('button.closeme', '#details-siteslist').click(function (e) {
      $('#details-siteslist').hide();
    });

    $('.table-scroll').on('click', '.btn-activate', function () {
        $(this).parent().parent().parent('tr').addClass('tr-active');
    });

    /*-- Sites-List animation --*/
    var isAnimating = false;

    $('.btn-yes', '#siteslistModal').click(function () {
      var $siteslistModal = $('#siteslistModal'),
          $trActive = $('.tr-active'),
          $modalFooter = $('.modal-footer', '#siteslistModal'),
          $confirmQuestion = $('#confirm-question', '#siteslistModal'),
          $successMessage = $('#success-message', '#siteslistModal'),
          $btnDeviceActive = $('.btn-device-active'),
          activeNum = parseInt( $btnDeviceActive.find('em').text() );

      isAnimating = true;

      $btnDeviceActive.removeClass('glow');
      $trActive.addClass('confirmed grayout');

      $modalFooter.hide();
      $confirmQuestion.hide();
      $successMessage.show();

      setTimeout(function () {
        $('.modal-backdrop').removeClass('in');
        $siteslistModal.addClass('scale').css({
          left: $btnDeviceActive.offset().left,
          top: $btnDeviceActive.offset().top,
          opacity: '0'
        });

        $btnDeviceActive.addClass('glow');

        $trActive.find('div.slideme').slideUp(600, function () {
          $trActive.remove();
          //reset modal
          $siteslistModal.removeClass('scale').css({left:'', top: '', opacity: ''});          
          $modalFooter.show();
          $confirmQuestion.show();
          $successMessage.hide();

          isAnimating = false;
        });
        
        setTimeout(function () {
          $btnDeviceActive.find('em').text( (activeNum + 1) );
        }, 150);

        setTimeout(function () {
          //close modal
          $siteslistModal.modal('hide');
          $('#siteslistModal-close').remove();
        }, 500);
      
      }, 900);
    });

    $('#siteslistModal').on('hide.bs.modal', function (e) {
      if (!isAnimating) {
        $('.tr-active').removeClass('tr-active');
      }
    });

  }
// end .ready        
});
