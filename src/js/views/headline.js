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
				_.bindAll(this, 'render', 'closeOverlay');
				
				this.$el = $(this.el);
				this.render();
			},
			render : function() {
				this.$template = $(this.template({ headline: this.options.article.get('title').title }));
				
				this.$el.html(this.$template);
				
				var closeButton = this.$el.find('.close');
				var that = this;
				closeButton.bind('click', function (e) {
					e.preventDefault();
					that.$el.empty();
					that.closeOverlay();
				});
				return this;
			},
			closeOverlay: function () {
				$('body').find('#overlay').hide();
				$('body').find('#headline').hide();
			}
		});
	}
);
