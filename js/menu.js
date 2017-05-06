var navM = document.getElementById('navM');
navM.style.width = window.innerWidth;

var toggText = document.getElementById('sh');
toggText.style.left = window.innerWidth/2 - 40;

$(function() {
    function toggle() {
      $( "#navM" ).slideToggle(600);
	  if (toggText.innerHTML == "Controls")
	  {
		toggText.innerHTML = "Hide";
	  }
	  else
	  {
		toggText.innerHTML = "Controls";
	  }
    };
 
    $( "#toggle" ).click(function() {
      toggle();
    });
  });

