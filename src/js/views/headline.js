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
				return this;
			},
			getHeadlineCallback: function (articleModel) {
				this.$template = $(this.template({ headline: articleModel.get('title').title }));
				
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
				$('body').find('#headline').addClass('hidden');
			},
			openOverlay: function (articleModel) {
				this.getHeadlineCallback(articleModel);
				
				$('body').find('#overlay').removeClass('hidden');
				$('body').find('#headline').removeClass('hidden');
			}
		});
	}
);
