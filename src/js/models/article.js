define([
        'jqueryLoader',
        'underscore',
		'backbone',
		'text!stubdata/article-example.json'
	],
	function($, _, Backbone, ArticleStr) {
		"use strict";
		
		var API_KEY = '8f4a8b83f48c4eecf9b6b64c90a4451b'
		var USE_STUB = true;
		
		return Backbone.Model.extend({
			idAttribute: 'modelId',
			initialize : function() {
				_.bindAll(this, 'getContent');
				
				this.url = this.get('links')[0].href + '?apiKey=' + API_KEY;	
			},
			getContent: function (_callback) {
				if (USE_STUB) {
					var article = $.parseJSON(ArticleStr);
					this.set({ item: article.item });
					_callback(this);
				} else {
					this.fetch({
						success: _callback
					});
				}
			}
		});
	}
);
