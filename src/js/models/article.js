define([
		'backbone'
	],
	function(Backbone) {
		"use strict";
		
		var API_KEY = '8f4a8b83f48c4eecf9b6b64c90a4451b'
		
		return Backbone.Model.extend({
			idAttribute: 'modelId',
			initialize : function() {
				this.url = this.get('links')[0].href + '?apiKey=' + API_KEY;	
			}
		});
	}
);
