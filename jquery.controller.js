$.fn.extend({
	controller: function(mapKeys, mapVars) {
		var keys = {};
		$.each(mapKeys, function(key) {
			eval('keys.' + key + ' = false;');
		});
		var update = function(func, fps) {
			window.setInterval(func.bind(this), 1000 / fps);
			if (mapKeys != undefined)
				$(window).on('keydown | keyup', function(ev) {
					var evalStr = '';
					$.each(mapKeys, function(key, val) {
						evalStr += "if (ev.keyCode == " + val +	") keys." +
							key + " = ev.type == 'keydown'; else "
					});
					evalStr += "if (ev.keyCode == 116) { console.log('F5 pressed.'); }";
					evalStr += "else if (ev.keyCode == 27) { console.log('ESC pressed.'); }";
					evalStr += "else ev.preventDefault();";
					eval(evalStr);
				});
		}
		return {
			obj: this,
			keys: keys,
			vars: mapVars == undefined ? {} : mapVars,
			update: update
		}
	},
	translate: function(x, y) {
		this.css({
			left: this.position().left + x,
			top: this.position().top + y
		});
	}
});