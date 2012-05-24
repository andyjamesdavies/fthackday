define([
		'jqueryLoader',	//Included by default, but needed in less instances now that views have cached '$el'
		'underscore',
		'backbone',
		'text!templates/article.html'
	],
	function($, _, Backbone, TemplateStr) {
		"use strict";

		return Backbone.View.extend({
			template : _.template(TemplateStr),
			
			initialize : function() {
				this.render();
			},
			
			render : function() {
				this.$el.append(this.template(/*model/collection*/));
				
				return this;
			}
		});
	}
);
