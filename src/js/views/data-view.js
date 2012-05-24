define([
		'jqueryLoader',
		'underscore',
		'backbone',
		'collections/pages',
		'text!stubdata/pages.json',
		'text!stubdata/pageArticles-example.json',
		'text!stubdata/article-example.json'
	],
	function($, _, Backbone, PagesCollection, PagesStr, pageArticlesStr, ArticleStr) {
		"use strict";

		var USE_STUB = true;
		
		return Backbone.View.extend({
			
			colourPalette : [
				'#e0bbe8',
				'#ff8079',
				'#5154a6',
				'#4883e8',
				'#37adff',

				'#91a631',
				'#d2c97c',
				'#dcc498',
				'#c8917d',
				'#d07641',

				'#cf4732',
				'#a6451b',
				'#fa5965',
				'#7a4f3d',
				'#ac765e'
			],
			
			initialize : function() {
				_.bindAll(this, 'render', 'getPagesList', 'getPageAt', 'pageFetchCallback', 'checkPagesLoaded');
				this.render();
			},
			render: function () {
				this.$el = $(this.el);
				
				// load progress indicator here
				this.progressIndicator = $('<div id="progress">loading...</p>');
				this.$el.append(this.progressIndicator);
				
				this.getPagesList();
				
				this.pagesLoaded = [];
				_.each(this.pagesCollection.models, this.getPageAt);
				this.checkPagesLoaded();
			},
			getPagesList: function () {
				var data = $.parseJSON(PagesStr);
				this.pagesCollection = new PagesCollection(data.pages);
			},
			getPageAt: function (item, n) {
				var page = this.pagesCollection.at(n);
				if (this.pages === undefined) {
					this.pages = [];
				}
				
				if (USE_STUB) {
					var pageArticles = $.parseJSON(pageArticlesStr);
					page.set({ 'pageItems': pageArticles.pageItems });
					this.pageFetchCallback(page);
				} else {					
					this.pages[n] = page.fetch({
						success: this.pageFetchCallback
					});
				}
			},
			pageFetchCallback: function(page) {
				page.setupArticles();
				this.pagesLoaded.push(true);
			},
			checkPagesLoaded: function() {
				this.isLoaded = false;
				
				var that = this;
				var timeout = window.setTimeout(function() {
					that.isLoaded = true;
					window.APP_EVENTS.trigger('pageLoadFailed');
				}, 30000);
				
				var interval = window.setInterval(function() {
					if ((that.pagesLoaded.length === that.pagesCollection.length) || (that.isLoaded === true)) {
						console.log('pagesLoaded');
						window.APP_EVENTS.trigger('pagesLoaded');
						that.isLoaded = true;
						clearInterval(interval);
						clearTimeout(timeout);
						$(that.progressIndicator).remove();
					}
				}, 100);
			}
		});
	}
);
