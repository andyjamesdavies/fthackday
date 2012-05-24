define([
		'jqueryLoader',
        'underscore',
        'backbone',
		'views/data-view',
		'views/headline',
		'views/article'
	],
	function($, _, Backbone, DataView, HeadlineView, ArticleView) {
		"use strict";
		
		return {
			initialize : function() {
				_.bindAll(this, 'renderArticle', 'renderHeadline', 'setHeight');
				
				this.setHeight();
				
				window.APP_EVENTS = {};
				_.extend(window.APP_EVENTS, Backbone.Events);
				
				this.dataView = new DataView({
					el : document.getElementById('content')
				});
				
				window.APP_EVENTS.on('pagesLoaded', this.renderArticle);
				window.APP_EVENTS.on('pagesLoaded', this.renderHeadline);
				$(window).bind('resize', this.setHeight);
			},
			renderArticle: function () {
				if (this.tmpArticle === undefined) {
					this.pagesCollection = this.dataView.pagesCollection; 
					this.page = this.pagesCollection.at(0);
					this.tmpArticle = this.page.get('pageArticles').at(0);
				}
				
				this.article = new ArticleView({
					el : document.getElementById('article'),
					article: this.tmpArticle
				});
				
				var that = this;
				
				$('body').find('#showArticle').bind('click', function(e) {
					e.preventDefault();
					that.article.openOverlay(that.tmpArticle);
				});
			},
			renderHeadline: function () {
				if (this.tmpArticle === undefined) {
					this.pagesCollection = this.dataView.pagesCollection; 
					this.page = this.pagesCollection.at(0);
					this.tmpArticle = this.page.get('pageArticles').at(0);
				}
				
				this.headline = new HeadlineView({
					el: document.getElementById('headline'),
					article: this.tmpArticle
				});	
				
				var that = this;
				$('body').find('#showHeadline').bind('click', function(e) {
					e.preventDefault();
					that.headline.openOverlay(that.tmpArticle);
				});
			},
			setHeight: function () {
				$('body').height($(window).innerHeight());
				
				$('#headline, #article').css({ top: (($('body').height()/100)) + 'px'});
			}
		};
	}
);