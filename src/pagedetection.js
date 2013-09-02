/*
* this plugin will detect the page's idle time and trigger the specified event
* author: macisi528@gmail.com
* date: 2013/8/30
*/
(function(win, doc, $){
	"use strict";

	var _config = {
		timing: 10000,
		once: true
	};

	var status = {
		stop: 0,
		pause: 1,
		run: 2
	};


	var PageDetection = {
		/**
		 * [init description]
		 * @param  {[object]} option
		 * option = {
		 * 	timing: 10000, // set the waiting time, default is 10000 seconds
		 * 	onTimeout: function // the callback will be triggerred when the time out;
		 * 	onPause: function // the callback will be triggerred when pause;
		 * 	once: false // if "once" is true, it will trigger only one time
		 * }
		 */
		init: function(option){
			this.config = $.extend({}, _config, option);
			this.status = status.stop;
			$(document).on({
				"click.pd": $.proxy(this.reset, this),
				"scroll.pd": $.proxy(this.reset, this),
				"keypress.pd": $.proxy(this.reset, this)
			});
			this.remain = this.config.timing;

			return this;
		},
		start: function(){
			this.status = status.run;
			this.t = $.now();
			this.timer = setTimeout($.proxy(function(){
				this.config.onTimeout && $.isFunction(this.config.onTimeout) && this.config.onTimeout.call(this);
				!this.config.once && (this.status === status.run) && this.start();
			}, this), this.remain);

			return this;
		},
		pause: function(){
			if (this.status < status.run) return;
			this.status = status.pause;
			this.config.onPause && this.config.onPause.call(this);
			this.remain = this.remain - this.getTime();
			this.timer && clearTimeout(this.timer);
		},
		continues: function(){
			if (!this.remain || this.remain <= 0 || this.status !== status.pause) return;
			this.timer && clearTimeout(this.timer);
			this.start();
		},
		getTime: function(){
			return $.now() - this.t;
		},
		reset: function(e){
			if (this.status < status.pause) return;
			console.log("reset:", e, this.status);
			this.timer && clearTimeout(this.timer);
			this.remain = this.config.timing;
			this.start();
			return this;
		},
		cancel: function(){
			this.timer && clearTimeout(this.timer);
			this.status = status.stop;
		}
	};

	window.PageDetection = PageDetection;

})(window, document, jQuery);