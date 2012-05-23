define([
		'underscore',
		'backbone',
		'models/article'
	],
	function(_, Backbone, ArticleModel) {
		"use strict";
		
		return Backbone.Collection.extend({
			model: ArticleModel,
			initialize : function() {
				
			}
		});
	}
);