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
				_.bindAll(this, 'render', 'getArticleCallback');
				
				this.$el = $(this.el);
				this.render();
			},
			render : function() {
				this.options.article.getContent(this.getArticleCallback);
				this.closeOverlay();
				return this;
			},
			getArticleCallback: function (pageArticle) {

				this.$template = $(this.template({
					headline: pageArticle.get('title').title,
					byline: pageArticle.get('editorial').byline,
					body: pageArticle.get('item').body.body
				}));

				this.$el.html(this.$template);
				var closeButton = this.$el.find('.close');

				var that = this;
				closeButton.bind('click', function (e) {
					e.preventDefault();
					that.$el.empty();
					that.closeOverlay();
				});
			},
			closeOverlay: function () {

				$('body').find('#overlay').addClass('hidden');
				$('body').find('#article').addClass('hidden');
				$('body').find('#overlay').removeClass('show');
				$('body').find('#article').removeClass('show');
			},
			openOverlay: function (articleModel) {
				articleModel.getContent(this.getArticleCallback);
				

				$('body').find('#overlay').addClass('show');
				$('body').find('#article').addClass('show');
				$('body').find('#overlay').removeClass('hidden');
				$('body').find('#article').removeClass('hidden');
				
			}
		});
	}
);
