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
				_.bindAll(this, 'renderArticle', 'renderHeadline', 'setHeight', 'idleTimeout', 'thisTimeout');
				
				this.setHeight();
				
				window.APP_EVENTS = {};
				_.extend(window.APP_EVENTS, Backbone.Events);
				window.ARTICLE = null;
				window.HEADLINE = null;
				
				this.dataView = new DataView({
					el : document.getElementById('content')
				});
				
				window.APP_EVENTS.on('pagesLoaded', this.renderArticle);
				window.APP_EVENTS.on('pagesLoaded', this.renderHeadline);
				window.APP_EVENTS.on('tilesBuilt', this.idleTimeout);
				$(window).bind('resize', this.setHeight);
			},
			renderArticle: function () {
				if (this.tmpArticle === undefined) {
					this.pagesCollection = this.dataView.pagesCollection; 
					this.page = this.pagesCollection.at(0);
					this.tmpArticle = this.page.get('pageArticles').at(0);
				}
				
				window.ARTICLE = new ArticleView({
					el : document.getElementById('article'),
					article: this.tmpArticle
				});
				
				var that = this;
				
				$('body').find('#showArticle').bind('click', function(e) {
					e.preventDefault();
					window.ARTICLE.openOverlay(that.tmpArticle);
				});
			},
			renderHeadline: function () {
				if (this.tmpArticle === undefined) {
					this.pagesCollection = this.dataView.pagesCollection; 
					this.page = this.pagesCollection.at(0);
					this.tmpArticle = this.page.get('pageArticles').at(0);
				}
				
				window.HEADLINE = new HeadlineView({
					el: document.getElementById('headline'),
					article: this.tmpArticle
				});	
				
				var that = this;
				$('body').find('#showHeadline').bind('click', function(e) {
					e.preventDefault();
					window.HEADLINE.openOverlay(that.tmpArticle);
				});
			},
			setHeight: function () {
				$('body').height($(window).innerHeight());
				
				$('#headline, #article').css({ top: (($('body').height()/100)) + 'px'});
			},
			idleTimeout: function () {
				this.timeout = null;
				var idleTimeout = null;
				
				this.thisTimeout();
				var that = this;
				$(window).bind('mousemove', function() {
					clearInterval(that.interval);
					clearTimeout(that.timeout);
					
					clearTimeout(idleTimeout);
					idleTimeout = window.setTimeout(function () {
						that.thisTimeout();
					}, 1000);
				});
			},
			thisTimeout: function () {
				var $tableCells = $('#tiles td');
				var that = this;
				this.interval = window.setInterval(function() {
					var rand = Math.floor(Math.random()*$tableCells.length);
					
					$($tableCells.get(rand)).trigger('click');
					
					that.timeout = null;
					that.timeout = window.setTimeout(function() {
						console.log('TEST');
						$('#headline .close').trigger('click');
					}, 7000);
					
				}, 10000);
			}
		};
	}
);