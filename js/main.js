
function GoHome(){
	if(window.localStorage.getItem("user_id")){
		if(window.localStorage.getItem("user_id") > 0){
			window.location = "profile.html";
		}
	}else{
		window.location = "index.html";
	}
}
function GoSearch(){
	window.location = "search.html";
}
function GoLogin(){
	window.location = "login.html";
}

function showErrorMessage(message, $container, delay) {
	$err = $('<div/>', {
		id : 'error_message'
	});
	$err.attr('data-role', 'popup');
	$err.attr('data-theme', 'a');
	$err.attr('data-overlay-theme', 'a');
	$err.attr('data-transition', 'slidedown');
	$err.attr('data-position-to', 'window');
	$err.addClass('ui-content');
	$err.text(message);

	$container.children().detach();
	$container.append($err);

	$err.popup();
	$err.popup("open");

	
}

$(document).on('focus', 'input, textarea', function() {
	$.mobile.activePage.find("div[data-role='footer']").hide();
});

$(document).on('blur', 'input, textarea', function() {
	$.mobile.activePage.find("div[data-role='footer']").show();
});


function GetInboxCount(){
	var UID = window.localStorage.getItem("user_id")
	$.ajax({
	       type: "POST",
	       url: "http://www.books2go.ca/mobiservice/get_inboxcount.php",
	       data: {'UID' : UID,'SENT' : '0'},
	       dataType: "json",
	       success: function(data) {
	    	  
	    	    if(data.count > 0){
	    	    	$(".inbox-count").html(data.count);
	    	    }else{
	    			$(".inbox-count").hide();
	    		}
	     	},
	 	 	error: function(xhr, desc, err) {
	         alert(xhr);
	         alert("Details: " + desc + "\nError:" + err);
	       }
	   });      
	
}




