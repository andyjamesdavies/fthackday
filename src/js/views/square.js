define([
		'jqueryLoader',	//Included by default, but needed in less instances now that views have cached '$el'
		'underscore',
		'backbone'
	],
	function($, _, Backbone) {
		"use strict";

		return Backbone.View.extend({
			
			events : {
				'click' : 'popup'
			},
			popup : function(){
//				window.ARTICLE.openOverlay(this.model);
				window.HEADLINE.openOverlay(this.model);
			},
			initialize : function() {
				_.bindAll(this, 'render');
				this.$el = $(this.el);
				this.render();
			},
			render : function() {
				this.$el = $('<td id="d' + this.options.d + 'h' + this.options.h + '" class="d' + this.options.d + 
					' h' + this.options.h + '"><div class="tile"><div class="face front"></div><div class="face back"></div></div></td>');
				return this;
			}
		});
	}
);