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
				_.bindAll(this, 'render', 'getHeadlineCallback', 'closeOverlay', 'openOverlay');
				
				this.$el = $(this.el);
				this.render();
			},
			render : function() {
				this.getHeadlineCallback(this.options.article);
				this.closeOverlay();
				return this;
			},
			getHeadlineCallback: function (articleModel) {
				
				var image = '';
				if (articleModel.get('images').length > 0) {
					var img = articleModel.get('images')[0];
					image = '<img src="' + img.url + '" width="100%" />';
					this.$el.addClass('hasImage');
				}
				
				this.$template = $(this.template({ 
					headline: articleModel.get('title').title, 
					image: image
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
				this.$el.removeClass('hasImage');
				$('body').find('#overlay').removeClass('show');
				$('body').find('#headline').removeClass('show');
				$('body').find('#overlay').addClass('hidden');
				$('body').find('#headline').addClass('hidden');
			},
			openOverlay: function (articleModel) {
				this.getHeadlineCallback(articleModel);
				
				$('body').find('#overlay').removeClass('hidden');
				$('body').find('#headline').removeClass('hidden');
				$('body').find('#overlay').addClass('show');
				$('body').find('#headline').addClass('show');
			}
		});
	}
);
