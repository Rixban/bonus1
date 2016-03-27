// The anonymous function below will fire on page load

// Some things to consider
// $.ajax(); to make your requests a little easier. Or the vanilla js way, it's up to you.
// $.on(); for event handling
// Remember, selecting elements in jQuery is like selecting them in CSS
// You'll probably have to manipulate some strings
// some jQuery functions to help display results
// $.show(), $.hide(), $.slideup(), $.slidedown(), $.fadein(), $.fadeout()
// Add content from requests with something like
// $.html(), $.text(), etc.
// keyup events could be helpful to get value of field as the user types

(function() {
	var myArray; 
	var userInput;
	var entries = 0;
	$(".flexsearch-suggestion").hide();
	$.ajax({
		type: 'GET',
		url: 'http://www.mattbowytz.com/simple_api.json',
		data: {query : userInput, data: "all"},
		success: function (data) {
			myArray = data.data.interests.concat(data.data.programming);
			myArray.sort();
             }
	})
	// Magic!

	$( ".flexsearch-input" ).keyup(function() {
		entries = 0;
		$(".flexsearch-suggestion").hide();
		userInput = document.querySelector('.flexsearch-input').value;
		search(userInput);
	});
	
	function search(data){
		$("#suggestion").empty();
		for(i = 0; i < myArray.length; i++){
			if(myArray[i].toLowerCase().indexOf(data.toLowerCase()) != -1 && data !=""){
				var match = true;
				for(j = 0; j < data.length; j++){
					if(myArray[i][j].toLowerCase() != data[j].toLowerCase()){
						match = false;
					}
				}
				if(match){
					 var display=document.getElementById("suggestion");
					$("#suggestion").append("<ul>"+myArray[i]+"</ul>");
					entries++;
							if(entries == 0){
			$(".flexsearch-suggestion").hide();
		}
		else{
			$(".flexsearch-suggestion").show();
		}
				}
			}
		}
	}
	
	$( "#suggestion" ).on( "click", "ul", function() {
		userInput = $(this).text();
		document.querySelector('.flexsearch-input').value = userInput;
		search(userInput);
		window.location.href = "https://www.google.com/#q="+userInput;
	});
	
	//$( "#suggestion" ).on( "click", function() {
	
	//});
	

	$( ".flexsearch-form" ).on( "submit", function redirect(e){
		e.preventDefault();
		window.location.href = "https://www.google.com/#q="+userInput;
	});
	console.log('Keepin\'n it clean with an external script!');
})();