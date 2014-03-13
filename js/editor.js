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
    , stylesheets   : gdn.url('/plugins/wysihtml5/design/editor.css')
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
