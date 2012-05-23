define([
        'jqueryLoader',
		'underscore',
		'backbone',
		'models/page'
	],
	function($, _, Backbone, PageModel) {
		"use strict";
		
		return Backbone.Collection.extend({
			model: PageModel,
			initialize : function() {
			}
		});
	}
);