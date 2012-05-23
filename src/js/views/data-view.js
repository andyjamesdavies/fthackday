define([
		'jqueryLoader',
		'underscore',
		'backbone',
		'collections/pages',
		'text!stubdata/pages.json'
	],
	function($, _, Backbone, PagesCollection, PagesStr) {
		"use strict";

		return Backbone.View.extend({
			
			initialize : function() {
				
				this.getPagesList();
			},
			getPagesList: function () {
				var data = $.parseJSON(PagesStr);
				this.pagesCollection = new PagesCollection(data.pages);
				
				var firstPage = this.pagesCollection.at(0);
				
				firstPage.fetch({
					success: function(Page) {
						Page.setupArticles();

						console.log(Page.get('pageArticles'));	
					}
				});

			}
		});
	}
);
