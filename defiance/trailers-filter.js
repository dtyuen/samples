/*
Quicksand-plugin Filter and Sort for Video-Trailers page
  dependencies:
      jquery-1.8.2.min.js
      jquery.easing.1.3.js
      jquery.quicksand.js
*/

// Custom sorting plugin
(function($) {
  $.fn.sorted = function(customOptions) {
    var startIndex, endIndex, sortedArr = [], counters = [];
    var options = {
      max_per_page: 12,
      reversed: false,
      by: function(a) { return a.text(); }
    };
    $.extend(options, customOptions);
    $data = $(this);
    arr = $data.get();
    arr.sort(function(a, b) {
        var valA = options.by($(a));
        var valB = options.by($(b));
      if (options.reversed) {
        return (valA < valB) ? 1 : (valA > valB) ? -1 : 0;				
      } else {		
        return (valA < valB) ? -1 : (valA > valB) ? 1 : 0;	
      }
    });

    counters.push(arr.length); //total-count
    counters.push(options.max_per_page);
    sortedArr.push(counters); //push counters-array at 0-index first
    //next, push the array-slice for pagination
    for(i=0; i<Math.ceil(arr.length/options.max_per_page); i++) {   	
    	startIndex = options.max_per_page*i;
    	endIndex = options.max_per_page*(i+1); 
    	sortedArr.push(arr.slice(startIndex,endIndex));
    }
    return $(sortedArr);
  };
})(jQuery);

// DOMContentLoaded
$(function() {
  
  var $filterType = $('#filterMenu'), //bind select-dropmenu in the form
      $trailers = $('#trailers'), //get the first collection
      $navBelow = $('#nav-below');

  // clone applications to get a second collection
  var $data = $trailers.clone();

  function filterHandler(onPage, callback) {
    var onPage = onPage || 1,
      callback = callback || "",
      startNum = 0;

    if ($filterType.val() == 'all') {
      var $filteredData = $data.find('li');
      //sort data differently for variation in animation
      var $sortedData = $filteredData.sorted({
        by: function(v) {
          return $(v).attr('data-id');
        }
      });
    } else {
      var $filteredData = $data.find('li[data-type~=' + $filterType.val() + ']');
      //sort data
      var $sortedData = $filteredData.sorted({
        by: function(v) {
          return $(v).find('.title').text();          
        }
      });
    }
    //document.location.hash = '#' + $filterType.val();
    //console.log($filteredData);    

    $('#filterSelect-ed').html($('select#filterMenu option:selected').text());
    //console.log($sortedData);  
    //console.log(onPage);

    // finally, call quicksand
    $trailers.quicksand($sortedData[onPage], callback);

    startNum = (1 + ($sortedData[0][1] * (onPage-1)) );
    $('#numFound').html("<em>" + filterText_array.displaying + " "  + startNum + " - " + (startNum + ($sortedData[onPage].length-1)) + " " + filterText_array.of + "</em><br><b>" + $sortedData[0][0] + " " + filterText_array.videos + "</b> " + filterText_array.found);

    // build pagination
    $navBelow.html("");
    
    if($sortedData.length>2) {
      var pageLink, 
          pageNum = "",
          trailerPagination = document.createElement("div");

      trailerPagination.className = "pagination";      
      for(i=1; i<($sortedData.length); i++) {
      	pageNum = (i<10) ? "0"+i : i ;
      	if(i === onPage) {
      		pageLink = document.createElement("span");
      		pageLink.className = "current";
      		pageLink.innerHTML = pageNum;
      		trailerPagination.appendChild(pageLink); 	      		
      	} else {      		
      		pageLink = document.createElement("a");
      		pageLink.innerHTML = pageNum;
      		pageLink.onclick = (function() {  
      				//create a closure for 'var j' and 'filterHandler'
      				var j = i;
      				return function() { filterHandler(j); };
      			})();
      		trailerPagination.appendChild(pageLink);		      		
      	}
      }
      $navBelow.append(trailerPagination);
    }
  }

  // call Quicksand on every form change
  $filterType.change( function(){ filterHandler(); });

  // initial filter onload
  //$('select#filterMenu option[value=' + document.location.hash.substr(1) +']').attr('selected','selected');
  filterHandler(1, function() {
  	$trailers.show('slow', function() {
      $navBelow.show('slow');
    });
  });
});
