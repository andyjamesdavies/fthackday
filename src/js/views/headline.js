define([
		'jqueryLoader',	//Included by default, but needed in less instances now that views have cached '$el'
		'underscore',
		'backbone',
		'text!templates/headline.html'
	],
	function($, _, Backbone, TemplateStr) {
		"use strict";

		return Backbone.View.extend({
			template : _.template(TemplateStr),
			
			initialize : function() {
				_.bindAll(this, 'render');
				
				this.$el = $(this.el);
				this.render();
			},
			render : function() {
				this.$el.append(this.template({ headline: this.options.article.get('title').title }));
				return this;
			}
		});
	}
);
