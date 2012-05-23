define([
		'jqueryLoader',
		'underscore',
		'backbone',
	],
	function($, _, Backbone) {
		"use strict";

		return Backbone.View.extend({
			
			initialize : function() {
				
				this.getArticleList();
			},
			getArticleList: function () {
				
			}
		});
	}
);
