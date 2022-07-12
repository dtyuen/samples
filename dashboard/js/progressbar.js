// extend jQuery with a method to test if a jQuery-selector returns an empty object
$.fn.exists = function () {
    return this.length !== 0;
}

jQuery(document).ready(function ($) {  
  function numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  function handleClick(e) {
    if (e) e.preventDefault();
    var $progressbar = $('.progressbar-1', '.progressbar-wrapper'),
        $popover = $('.popover'),
        $popoverText = $popover.find('.popover-text'),
        $popoverNumber = $popover.find('.number'),
        $popoverAmount = $popoverNumber.find('.amount'),
        $amountRetire = $('.amount-retire'),
        $amountTarget = $('.amount-target'),
        $targetCheckmark = $('.target.icon-checkmark'),
        retireInt = parseInt($('input#amount-retire').val()),
        targetInt = parseInt($('input#amount-target').val()),        
        percent = Math.round(retireInt/targetInt * 100),
        shortfall = false,
        difference;

    // if( isNaN(retireInt) || isNaN(targetInt) ) {
    //   alert('Please enter a valid number.');
    //   return;
    // }

    $progressbar.css("width", (percent + '%'));

    $progressbar.find('span').text(percent + '%');
    $amountRetire.text(numberWithCommas(retireInt));
    $amountTarget.text(numberWithCommas(targetInt));

    /*-- popover -- */
    $popover.show();
    $popover.css("left", function() {
      if(percent < 76) {
        return (percent + 14 + '%');
      } else {
        return "90%";
      }
    });

    if(targetInt > retireInt) {
      shortfall = true;
      difference = numberWithCommas(targetInt - retireInt);
      $targetCheckmark.hide();
      $popover.removeClass('green');
      $popoverText.text('Shortfall');
      $popoverNumber.show();
      $popoverAmount.text(difference);
    } else if(targetInt === retireInt) {
      shortfall = false;
      $targetCheckmark.show();
      $popover.addClass('green');
      $popoverText.text('Goal reached!');
      $popoverNumber.hide();
    } else {
      shortfall = false;
      difference = numberWithCommas(retireInt - targetInt);
      $targetCheckmark.show();
      $popover.addClass('green');
      $popoverText.text('Surplus');
      $popoverNumber.show();
      $popoverAmount.text(difference);
    }
  }

  $('#calculate').click(handleClick);

  // initial load
  handleClick();
// end .ready        
});

