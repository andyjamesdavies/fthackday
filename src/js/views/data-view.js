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

		var USE_STUB = false;
		
		return Backbone.View.extend({
			
			initialize : function() {
				_.bindAll(this, 'render', 'getPagesList', 'getPageAt', 'pageFetchCallback', 'getArticleContent', 'articleFetchCallback', 'checkPagesLoaded');
				
				this.render();
			},
			render: function () {
				this.$el = $(this.el);
				
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
			getArticleAt: function(page, n) {
				
			},
			getArticleContent: function(page, n) {
				if (USE_STUB) {
					var article = $.parseJSON(ArticleStr);
					page.getArticleAt(n).add(article);
					this.articleFetchCallback();
				} else {
					page.getArticleAt(n).fetch({
						success: this.articleFetchCallback
					});
				}
			},
			articleFetchCallback: function(article) {
				
			},
			checkPagesLoaded: function() {
				this.isLoaded = false;
				
				var that = this;
				var timeout = window.setTimeout(function() {
					that.isLoaded = true;
					window.APP_EVENTS.trigger('pageLoadFailed');
					clearInterval(interval);
				}, 20000);
				
				var interval = window.setInterval(function() {
					if ((that.pagesLoaded.length === that.pagesCollection.length) || (that.isLoaded === true)) {
						window.APP_EVENTS.trigger('pagesLoaded');
						that.isLoaded = true;
						clearInterval(interval);
						clearTimeout(timeout)
					}
				}, 100);
			}
		});
	}
);
