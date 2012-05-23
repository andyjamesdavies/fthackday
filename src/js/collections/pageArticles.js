define([
		'underscore',
		'backbone'
	],
	function(_, Backbone) {
		"use strict";
		
		return Backbone.Collection.extend({
			url: '/src/stubdata/pages.json',
			initialize : function() {
				
			}
		});
	}
);