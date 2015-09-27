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
	var UID = window.localStorage.getItem("user_id");
	if(UID > 0){
	$.ajax({
	       type: "POST",
	       url: "http://www.books2go.ca/mobiservice/get_inboxcount.php",
	       data: {'UID' : UID,'SENT' : '0'},
	       dataType: "json",
	       success: function(data) {
	    	  
	    	    if(data.count > 0){
	    	    	
	    	    	$(".inbox-count").html(data.count);
	    	    	$(".inbox-count").show();
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
}

function LoadHeader(){
	
	if(window.localStorage.getItem("user_id") > 0){
		
		$('#head-buttons').html('<ul>' +
        '<li class="mytab"><a href="#mypanel"  data-icon="bars" class="ui-nodisc-icon transparentButton"></a></li>' +
        '<li class="mytab"><a data-ajax="false"  href="search.html"  data-icon="search" class="ui-nodisc-icon transparentButton"></a></li>' +
        '<li class="mytab"><a data-ajax="false"  href="postbook.html"  data-icon="plus" class="ui-nodisc-icon transparentButton"  ></a></li>' +
        '<li class="mytab"><a data-ajax="false"  href="inbox.html"  data-icon="mail" class="ui-nodisc-icon transparentButton" ><span class="inbox-count inbox-head" id="inbox-head" style="padding:1px;display:none;text-shadow:none"  ></span></a></li>' +
        '<li class="mytab"><a data-ajax="false"  href="profile.html"  data-icon="user" class="ui-nodisc-icon transparentButton" ></a></li>' +
        '<li class="mytab"><a href="feedback.html" data-ajax="false"  data-icon="comment" class="ui-nodisc-icon transparentButton" ></a></li>' +
        '</ul>');
        
		$("#head-buttons").show();

		
		GetInboxCount();
	}else{
		
		$('#head-buttons').html('<ul>' +
        '<li><a data-ajax="false" href="login.html" data-icon="user" class="ui-nodisc-icon transparentButton" ></a>' +
        '<li><a data-ajax="false" href="register.html" data-icon="gear" class="ui-nodisc-icon transparentButton" ></a>' +
        '<li><a data-ajax="false" href="search.html" data-icon="search" class="ui-nodisc-icon transparentButton" ></a>' +
        '</ul>');
		
	}
}
function LoadPanel(){
	
$('[data-role="panel"]').html(' ' +	
'<img src="images/logo3.png" width="100%" />' + 
'<div style="height:30px"></div>' +
'<ul data-role="listview" id="menu">' +
'<li><a href="javascript:GoHome()" data-rel="close" data-ajax="false">Home</a></li>' +
'<li><a href="search.html" data-rel="close" data-ajax="false">Search</a></li>' +
'<li id="uprofile" style="display:none" data-role="collapsible" data-iconpos="right" data-inset="false">' +
'<h2>Profile</h2>' +
'<ul data-role="listview" data-theme="a">' +
'<li><a href="mybooks.html" data-rel="close" data-ajax="false">&nbsp; - My textbooks</a></li>' +
'<li><a href="postbook.html" data-rel="close" data-ajax="false">&nbsp; - Post a textbook</a></li>' +
'<li><a href="inbox.html" data-rel="close" data-ajax="false">&nbsp; - Inbox</a></li>' +
'<li><a href="wishlist.html" data-rel="close" data-ajax="false">&nbsp; - Wish list</a></li>' +
'<li><a href="editprofile.html" data-rel="close" data-ajax="false">&nbsp; - Edit profile</a></li>' +
'<li><a href="editschools.html" data-rel="close" data-ajax="false">&nbsp; - Edit schools</a></li>' +
'<li><a href="changepassword.html" data-rel="close" data-ajax="false">&nbsp; - Change password</a></li>' +
'</ul>' +
'</li>' +
'<li style="display:none" id="logout"><a href="logout.html" data-rel="user" data-ajax="false">Log out</a></li>' +
'<li style="display:none" id="login"><a href="login.html" data-rel="user" data-ajax="false">Log In</a></li>' +
'</ul>');

}
