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
				_.bindAll(this, 'render');
				
				this.$el = $(this.el);
				this.render();
			},
			
			render : function() {
				
				var that = this;
				
//				console.log(this.options);
				this.options.article.getContent(function (pageArticle) {
					that.$el.append(that.template({
						headline: pageArticle.get('title').title,
						byline: pageArticle.get('editorial').byline,
						body: pageArticle.get('item').body.body
					}));
				});
				
//				this.$el.append(this.template({ headline: this.article.get('title').title }));
				
				return this;
			}
		});
	}
);
