define([
		'underscore',
		'backbone',
		'collections/articles'
	],
	function(_, Backbone, ArticlesCollection) {
		"use strict";
		
		var API_KEY = '8f4a8b83f48c4eecf9b6b64c90a4451b'
		
		return Backbone.Model.extend({
			idAttribute: 'modelId',
			initialize : function() {
				this.url = this.get('apiUrl') + '/main-content?apiKey=' + API_KEY;	
			},
			setupArticles: function () {
				var pageItems = this.attributes.pageItems;
				if (pageItems.length > 0) {
					var articlesCollection = new ArticlesCollection(pageItems);
					this.set({pageArticles: articlesCollection });
				}
			},
			getArticleAt: function (n) {
				return this.get('pageArticles').at(n);
			}
		});
	}
);
