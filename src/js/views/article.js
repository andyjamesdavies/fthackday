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
				this.options.article.getContent(function (pageArticle) {
					
					that.$template = $(that.template({
						headline: pageArticle.get('title').title,
						byline: pageArticle.get('editorial').byline,
						body: pageArticle.get('item').body.body
					}));
					
					that.$el.html(that.$template);
					var closeButton = that.$el.find('.close');
					
					closeButton.bind('click', function (e) {
						e.preventDefault();
						that.$el.empty();
						that.closeOverlay();
					});
				});
				return this;
			},
			closeOverlay: function () {
				$('body').find('#overlay').hide();
				$('body').find('#article').hide();
			}
		});
	}
);
