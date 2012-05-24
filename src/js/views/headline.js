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
				
				window.APP_EVENTS.on('pagesLoaded', this.render);
			},
			
			render : function() {
				
				console.log('TEST');
				
//				var page = this.options.dataView.
				
//				this.model = this.options.dataView.getArticleAt()
				
				
				//this.$el.append(this.template(/*model/collection*/));
				
				return this;
			}
		});
	}
);
