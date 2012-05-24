define([
		'jqueryLoader',
		'underscore',
		'backbone',
		'collections/pages',
		'text!stubdata/pages.json',
		'text!stubdata/pageArticles-example.json',
		'text!stubdata/article-example.json',
		'views/square'
	],
	function($, _, Backbone, PagesCollection, PagesStr, pageArticlesStr, ArticleStr, SquareView) {
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
				_.bindAll(this, 'render', 'getPagesList', 'renderGrid', 'getPageAt', 'pageFetchCallback', 'checkPagesLoaded');
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
						window.APP_EVENTS.trigger('pagesLoaded');
						that.isLoaded = true;
						clearInterval(interval);
						clearTimeout(timeout);
						$(that.progressIndicator).remove();
						that.sortArticles();
					}
				}, 100);
			},
			sortArticles : function() {
				var that = this;
				this.allArticles = [];
				
				// inspect pages collection and get each page
				_.each( this.pagesCollection.models, function( page ){
					
					// for each page, get its article collection
					var pg = page.get('pageArticles');
					
					// some pages don't have lists of 'articles', e.g. twitter, audio slideshows
					if ( pg ) {
						//for each article collection, get all the articles out and add to our big array
						_.each( pg.models, function(article){
							that.allArticles.push(article);
						})
					}
				});
				
				// how many article do we have?
				console.log(this.allArticles.length);
				
				// what subject is each article?
				_.each(this.allArticles, function(article){
					console.log(article.get('metadata').primarySection.term.name);
				});
				this.renderGrid();
			},
			renderGrid : function(){
				
				this.drawTiles();
				this.colourTiles();
			},
			drawTiles : function() {
				var rows = 5;
				var cols = 10;

				var html = $('<table id="tiles" border="1" class="front" width="100%" height="500px" cellpadding="0" cellspacing="0">');

				// chunk list of articles into grid size chunks
				for (var d = 0; d < rows; d++) {
					var tr = $('<tr>');
					for (var h = 0; h < cols; h++) {
						var squareView = new SquareView( { 'd' : d, 'h' : h, 'model' : this.allArticles[d*h] } );
						tr.append(squareView.$el);
					}
					html.append(tr);
				};
				this.$el.append(html);
			},
			colourTiles : function() {
				
				// we need to randomly colour the tiles as we make them
				// so they look really groovy

				var side = $('#tiles').attr('class');

				if (side === 'front') {
					side = 'back';
				} else {
					side = 'front';
				}

				// change the colur of the div to be random fro mour palette
				var buckets = 15;
				for ( var d = 0; d < 5; d++) {
					for ( var h = 0; h < 10; h++) {
						var sel = '#d' + d + 'h' + h + ' .tile .' + side;
						$(sel).css('background', this.colourPalette[Math.floor(Math.random()*15)]);
					}
				}
				
				// turn the tiles
				this.flipTiles();
			},
			flipTiles : function(){
				
				var rows = 5;
				var cols = 10;
				
				var oldSide = $('#tiles').attr('class');
				var newSide = '';

				if (oldSide == 'front') {
					newSide = 'back';
				} else {
					newSide = 'front';
				}

				var flipper = function(h, d, side) {
					return function() {
						var sel = '#d' + d + 'h' + h + ' .tile';
						var rotateY = 'rotateY(180deg)';

						if (side === 'back') {
							rotateY = 'rotateY(0deg)';	
						}
						
						$(sel).css('-webkit-transform', rotateY);

					};
				};

				for (var h = 0; h < cols; h++) {
					for (var d = 0; d < rows; d++) {
						var side = $('#tiles').attr('class');
						// the timeout here is how long it takes between turning tiles
						// the standard settings make a nice wave left-to-right
						setTimeout(flipper(h, d, side), (h * 20) + (d * 20) + (Math.random() * 100));
					}
				}
				$('#tiles').attr('class', newSide);
			}
		});
	}
);
