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
          this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
    	
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
    	
    	var uuid = device.uuid;
    	StatusBar.overlaysWebView(false);
        if(PushbotsPlugin.isiOS()){
			PushbotsPlugin.initializeiOS("553fa49017795918698b4571");
		}
		if(PushbotsPlugin.isAndroid()){
			PushbotsPlugin.initializeAndroid("553fa49017795918698b4571", "758601829939");
		}
		setTimeout(function(){ 
			PushbotsPlugin.setAlias(uuid);
		}, 3000);
        
        PushbotsPlugin.onNotificationClick(myMsgClickHandler);
        
       
        
        
        
    },
    

};


 function myMsgClickHandler(msg){
	    	alert("balls");
	    	alert(JSON.stringify(msg));
	 	}