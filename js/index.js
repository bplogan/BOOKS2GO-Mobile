/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
    	alert("4");
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
    	alert("5");
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
    	alert("6");
    	//StatusBar.overlaysWebView(false);
        app.receivedEvent('deviceready');
        
    },
    tokenHandler:function(msg) {
    	alert("7");
       	//alert("Token Handler " + msg);
		var UIDt = window.localStorage.getItem("user_id");
		alert("8");
			if(UIDt > 0){       
				alert("9");
	       	  $.ajax({
		        type: "POST",
		        url: "http://www.books2go.ca/mobiservice/notification.php?reg=1",
		        async: false,
		        data: {'UUID' : msg, 'UID' : UIDt, 'platform' : 'ios'},
		        dataType: "json",
		        success: function(data) {
		        	alert("10");
		        	//alert(data.test);
		        	window.localStorage.setItem("UUID",msg);
				    window.localStorage.setItem("PLATFORM", 'ios');
				    alert("11");
		        	window.location = "profile.html";
		     	},
		 	 	error: function(xhr, desc, err) {
		        alert(xhr + " Details: " + desc + "\nError:" + err, $("#err"), 0);
		       }
		   	});         
	   	}else{
	   		alert("not logged in");
	   		window.location = "main.html";
	   	}		
       	
       	
    },
    errorHandler:function(error) {
        console.log("Error Handler  " + error);
       alert("error");
    },
    // result contains any message sent from the plugin call
    successHandler: function(result) {
      alert("success");
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
    	
        var pushNotification = window.plugins.pushNotification;
        // TODO: Enter your own GCM Sender ID in the register call for Android
        if (device.platform == 'android' || device.platform == 'Android') {
            pushNotification.register(this.successHandler, this.errorHandler,{"senderID":"758601829939","ecb":"app.onNotificationGCM"});
        }
        else {
        	alert("7");
            pushNotification.register(this.tokenHandler,this.errorHandler,{"badge":"true","sound":"true","alert":"true","ecb":"app.onNotificationAPN"});
        }
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
        alert("penis?");
    },
    // iOS
    onNotificationAPN: function(event) {
        var pushNotification = window.plugins.pushNotification;
        console.log("Received a notification! " + event.alert);
        console.log("event sound " + event.sound);
        console.log("event badge " + event.badge);
        console.log("event " + event);
        if (event.alert) {
            navigator.notification.alert(event.alert);
        }
        if (event.badge) {
            console.log("Set badge on  " + pushNotification);
            pushNotification.setApplicationIconBadgeNumber(this.successHandler, event.badge);
        }
        if (event.sound) {
            var snd = new Media(event.sound);
            snd.play();
        }
        var urlios = event.url;
        window.location = urlios;
    },
    // Android
    onNotificationGCM: function(e) {
        switch( e.event )
        {
            case 'registered':
                if ( e.regid.length > 0 )
                {
                    // Your GCM push server needs to know the regID before it can push to this device
                    // here is where you might want to send it the regID for later use.
                    //alert('registration id = '+e.regid);
                    var UID = window.localStorage.getItem("user_id");
                    if(UID > 0){
                    $.ajax({
				        type: "POST",
				        url: "http://www.books2go.ca/mobiservice/notification.php?reg=1",
				        async: false,
				        data: {'UUID' : e.regid, 'UID' : UID, 'platform' : 'android'},
				        dataType: "json",
				        success: function(data) {
				        	window.localStorage.setItem("UUID",e.regid);
				        	window.localStorage.setItem("PLATFORM", 'android');
				        	window.location = "profile.html";
				     	},
				 	 	error: function(xhr, desc, err) {
				        alert(xhr + " Details: " + desc + "\nError:" + err, $("#err"), 0);
				       }
				   	});
				   	}else{
				   		window.location = "main.html";
				   	}		
                }
            break;

            case 'message':
              // this is the actual push notification. its format depends on the data model
              // of the intermediary push server which must also be reflected in GCMIntentService.java
              alert('message = '+e.message+' msgcnt = '+e.msgcnt);
              var urldroid = e.url;
              window.location = urldroid;
            break;

            case 'error':
              alert('GCM error = '+e.msg);
            break;

            default:
              alert('An unknown GCM event has occurred');
              break;
        }
    }

};