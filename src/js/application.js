define([
        'underscore',
        'backbone',
		'views/main-view',
		'views/data-view',
		'views/headline',
		'views/article'
	],
	function(_, Backbone, MainView, DataView, HeadlineView, ArticleView) {
		"use strict";
		
		return {
			initialize : function() {

				window.APP_EVENTS = {};
				_.extend(window.APP_EVENTS, Backbone.Events);
				
				var app = new MainView({
					el : document.getElementById('content')
				});
				
				var dataView = new DataView({
					el : document.getElementById('content')
				});
		
				var headline = new HeadlineView({
					el: document.getElementById('headline'),
					dataView: dataView
				});
				
				var article = new ArticleView({
					el : document.getElementById('article'),
				});
			}
		};
	}
);