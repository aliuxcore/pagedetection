/*
* this plugin will detect the page's idle time and trigger the specified event
* author: macisi528@gmail.com
* date: 2013/8/30
*/
(function(win, $){
	"use strict";

	var PageDetection = (function(){
		// default config
		var _config = {
			timing: 10000,
			once: true
		};
		// status map
		var status = {
			stop: 0,
			pause: 1,
			run: 2
		};

		var timer;

		function _clear() {
			timer && clearTimeout(timer);
		}

		var ret = {
			init: function(option){
				this.config = $.extend({}, _config, option);
				this.status = status.stop;
				this.remain = this.config.timing;

				$(document).on({
					"click.pd": $.proxy(this.reset, this),
					"scroll.pd": $.proxy(this.reset, this),
					"keypress.pd": $.proxy(this.reset, this)
				});

				return this;
			},
			start: function(){
				this.status = status.run;
				this.t = $.now();
				timer = setTimeout($.proxy(function(){
					this.config.onTimeout && $.isFunction(this.config.onTimeout) && this.config.onTimeout.call(this);
					!this.config.once && (this.status === status.run) && this.start();
					this.remain = this.config.timing;
				}, this), this.remain);

				return this;
			},
			pause: function(){
				if (this.status < status.run) return;
				this.status = status.pause;
				this.config.onPause && this.config.onPause.call(this);
				this.remain = this.remain - this.getTime();
				_clear();

				return this;
			},
			continue: function(){
				if (!this.remain || this.remain <= 0 || this.status !== status.pause) return;
				_clear();
				this.start();

				return this;
			},
			getTime: function(){
				return $.now() - this.t;
			},
			reset: function(e){
				if (this.status < status.pause) return;
				_clear();
				this.remain = this.config.timing;
				this.start();
				
				return this;
			},
			cancel: function(){
				_clear();
				this.status = status.stop;

				return this;
			}
		}

		return ret;
	})();

	win.PageDetection = PageDetection;

})(window, jQuery);