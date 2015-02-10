;(function ($, window, document, undefined) {

  window.Editor = window.Editor || function (options) {
    this.options = {
      textarea: '.js-text-box'
    };

    if (options) {
      $.extend(this.options, options);
    }
  };

  Editor.prototype.attachEditor = function (textarea) {
    var $textarea = $(textarea)
      , $toolbar  = $('.js-editor-toolbar', $textarea.closest('form'));

    // If an editor is already attached, bail out
    if ($textarea.data('editor')) return;

    var editor = new wysihtml5.Editor(textarea, {
      toolbar       : $toolbar[0]
    , parserRules   : wysihtml5ParserRules
    , useLineBreaks : false
    // this ensures a versioned style gnd.url doesn't
    , stylesheets   : $('link[href*="Wysihtml5/design/editor.css"]').attr('href') 
    });

    // Attach the editor to the textarea
    $textarea.data('editor', editor);
    
    // quotes compatibility
    $textarea.on('appendHtml',function(e, data){
       
       //ensure citation visible (but will be cleared later)
       //quote = data.replace("\n","<br>").replace(/<blockquote(.*rel="([^"]+)")[^>]*>(.*)/, '<blockquote$1><author>@$2</author>$3');
       
       // format newlines
       quote = data.replace("\n","<br>")
       
       $textarea.data('editor').composer.commands.exec("insertHTML",'<div class="WrapQuote">'+quote+'</div>');
    });
    
    editor.on('load', function(e) {
      var iframe = $(editor.composer.iframe)
        , body   = $('body', iframe.contents());
        
       // auto resize of editor frame
       $(iframe).wysihtml5_size_matters();

      // Initialize @mention autocompletion
      if (gdn.atCompleteInit) {
        gdn.atCompleteInit(body[0], iframe[0]);
      }
    });

    // Attach the editor to the textarea
    $textarea.data('editor', editor);

  };

  Editor.prototype.attachEditorHandler = function (e) {
    var self = this;

    $(this.options.textarea).each(function () {
      self.attachEditor(this);
    });
  };

  Editor.prototype.clearEditor = function (textarea) {
    var editor = $(textarea).data('editor');

    // Clear the contents of the editor
    editor.clear();
  };

  Editor.prototype.clearEditorHandler = function (e) {
    var self = this;

    $(this.options.textarea, e.target).each(function () {
      self.clearEditor(this);
    });
  };

})(jQuery, window, document);
