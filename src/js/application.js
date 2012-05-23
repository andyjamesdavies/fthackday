define([
		'views/main-view'
	],
	function(MainView) {
		"use strict";
		
		return {
			initialize : function() {
				
				var events = {};
				_.extend(events, Backbone.Events);
				
				var app = new MainView({
					el : document.getElementById('content'),
					events: events
				});
			}
		};
	}
);