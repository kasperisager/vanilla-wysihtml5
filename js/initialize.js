$(function() {
  $("#Form_Body").livequery(function() {
    $(this).wysihtml5();
  });
  $(document).bind("CommentAdded", function() {
    $("#Form_Body").data("wysihtml5").editor.clear();
  });
  $(document).bind("MessageAdded", function() {
    $("#Form_Body").data("wysihtml5").editor.clear();
  });
});

(function () {
  var setupRegularResize, setupIframeResize, e;

  function bind(a, b) {
    return function () {
      return a.apply(b, arguments);
    };
  }

  setupRegularResize = (function () {
    function a(a) {
      var self = this;
      this.el = a;
      this.resetHeight = bind(this.resetHeight, this);
      this.adjustHeight = bind(this.adjustHeight, this);
      this.watchForChanges = bind(this.watchForChanges, this);
      this.makeTestContainer = bind(this.makeTestContainer, this);
      this.preventScrollBars = bind(this.preventScrollBars, this);
      this.sourceContents = bind(this.sourceContents, this);
      this.source = bind(this.source, this);
      this.$el = $(this.el).css({ resize: "none" });
      this.heightLimit = this.$el.data("autoresize-limit");
      this.$source = this.source();
      this.originalHeight = this.$el.height();
      this.$testContainer = this.makeTestContainer();
      this.preventScrollBars();
      setTimeout(function () {
        self.adjustHeight();
        self.watchForChanges();
      }, 1);
    }

    // margin lines for resize
    a.prototype.resizeBy = 2;

    a.install = function (a) {
      if (!$(a).is("[data-autoresize]")) {
        $(a).attr("data-autoresize", true);
        return new this(a);
      }
    };
    a.prototype.source = function () {
      return this.$el;
    };
    a.prototype.sourceContents = function () {
      return this.$source.val().replace(/\n/g, "<br>").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    };
    a.prototype.preventScrollBars = function () {
      return this.$source.css("overflow", "hidden");
    };
    a.prototype.makeTestContainer = function () {
      var a, b, c, d, e;
      a = $("<div>").css({
        position: "absolute",
        left: -9999,
        top: 0,
        "word-wrap": "break-word"
      });
      b = ["fontSize", "fontFamily", "fontWeight", "letterSpacing", "lineHeight", "textDecoration", "padding"];
      for (d = 0, e = b.length; d < e; d++) {
        c = b[d];
        a.css(c, this.$source.css(c));
      }
      return a.insertBefore(this.$el);
    };
    a.prototype.watchForChanges = function () {
      var a = this;
      this.$source.bind("keyup keydown paste change focus", _.throttle(function () {
        return a.adjustHeight();
      }, $.support.touch ? 300 : 5));
      this.$el.closest("form").bind("reset", function () {
        return a.resetHeight();
      });
    };
    a.prototype.adjustHeight = function () {
      var a, b, c, d, e;
      this.$testContainer.width(this.$source.width());
      e = this.$testContainer.html("X").height();
      this.$testContainer.html(this.sourceContents());
      d = parseInt(this.$el.data("rows") || this.$el.attr("rows")) || false;
      c = d === 1 ? 1 : this.resizeBy * e;
      a = d ? e * d + 1 : this.originalHeight;
      b = this.$testContainer.height() + c;
      if (this.heightLimit && b > this.heightLimit) {
        b = this.heightLimit;
      }
      if (b < a) {
        b = a;
      }
      b = Math.round(b);
      return this.$el.css("min-height", b);
    };
    a.prototype.resetHeight = function () {
      return this.$el.css("min-height", this.originalHeight);
    };
    return a;
  }());

  setupIframeResize = (function (original) {
    function setup() {
      this.preventScrollBars = bind(this.preventScrollBars, this);
      this.sourceContents = bind(this.sourceContents, this);
      this.source = bind(this.source, this);
      setup.__super__.constructor.apply(this, arguments);
    }

    function extend(a, b) {
      function e() {
        this.constructor = a;
      }
      for (var c in b) {
        if (Object.prototype.hasOwnProperty.call(b, c)) {
          (a[c] = b[c]);
        }
      }
      e.prototype = b.prototype;
      a.prototype = new e();
      a.__super__ = b.prototype;
      return a;
    }

    extend(setup, original);

    setup.prototype.source = function () {
      return this.$el.contents().find("body");
    };
    setup.prototype.sourceContents = function () {
      return this.$source.html();
    };
    setup.prototype.preventScrollBars = function () {
      return this.$source.parent("html").css({ overflow: "hidden" });
    };

    return setup;
  }(setupRegularResize));

  // This sets up autoresize for the iframe or container
  $.fn.autoResize = function () {
    return this.each(function () {
      if (this.tagName.toLowerCase() === "iframe") {
        setupIframeResize.install(this);
      } else {
        setupRegularResize.install(this);
      }
    });
  };

}());

!function($, wysi) {
	"use strict"
	
	var defaultOptions = {
		events: {},
	};

	var Wysihtml5 = function(el, options) {
		this.el = el;
		this.toolbar = this.createToolbar(el, options || defaultOptions);
		this.editor =  this.createEditor(options);
		
		window.editor = this.editor;
	};
	
	Wysihtml5.prototype = {
		constructor: Wysihtml5,

		createEditor: function(options) {
			
			var editor = new wysi.Editor(this.el.attr('id'), {
	    		toolbar: 'wysihtml5-toolbar',
				parserRules: wysihtml5ParserRules,
				useLineBreaks: true
			});
			
			editor.observe("load", function () {
				$(this.composer.iframe).autoResize();
        wysihtml5.dom.insertCSS([".wysiwyg-font-size-smaller{font-size:smaller;}.wysiwyg-font-size-larger{font-size:larger;}.wysiwyg-font-size-xx-large{font-size:xx-large;}.wysiwyg-font-size-x-large{font-size:x-large;}.wysiwyg-font-size-large{font-size:large;}.wysiwyg-font-size-medium{font-size:medium;}.wysiwyg-font-size-small{font-size:small;}.wysiwyg-font-size-x-small{font-size:x-small;}.wysiwyg-font-size-xx-small{font-size:xx-small;}.wysiwyg-color-black{color:#000;}.wysiwyg-color-silver{color:silver;}.wysiwyg-color-gray{color:gray;}.wysiwyg-color-white{color:#FFF;}.wysiwyg-color-maroon{color:maroon;}.wysiwyg-color-red{color:red;}.wysiwyg-color-purple{color:purple;}.wysiwyg-color-fuchsia{color:#F0F;}.wysiwyg-color-green{color:green;}.wysiwyg-color-lime{color:lime;}.wysiwyg-color-olive{color:olive;}.wysiwyg-color-yellow{color:#FF0;}.wysiwyg-color-navy{color:navy;}.wysiwyg-color-blue{color:blue;}.wysiwyg-color-teal{color:teal;}.wysiwyg-color-aqua{color:aqua;}.wysiwyg-text-align-right{text-align:right;}.wysiwyg-text-align-center{text-align:center;}.wysiwyg-text-align-left{text-align:left;}.wysiwyg-text-align-justify{text-align:justify;}.wysiwyg-float-left{float:left;margin:0 8px 8px 0;}.wysiwyg-float-right{float:right;margin:0 0 8px 8px;}.wysiwyg-clear-right{clear:right;}.wysiwyg-clear-left{clear:left;}"]).into(editor.composer.sandbox.getDocument());
			});
						
	  		if(options && options.events) {
				for(var eventName in options.events) {
					editor.on(eventName, options.events[eventName]);
				}
			}	

	  		return editor;
		},
		
		createToolbar: function(el, options) {
			var self = this;
			
			this.el.before(toolbar);
			
			return toolbar;
		}
	};
	
	$.fn.wysihtml5 = function (options) {
		return this.each(function () {
			var $this = $(this);
	      	$this.data('wysihtml5', new Wysihtml5($this, options));
	    })
  	};

  	$.fn.wysihtml5.Constructor = Wysihtml5;

}(window.jQuery, window.wysihtml5);
