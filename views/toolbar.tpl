<div class="editor-toolbar js-editor-toolbar" style="display: none;">

  <a data-wysihtml5-command="bold" class="Button" title="CTRL+B">
    <span>{t c="Bold"}</span> <i class="icon icon-bold"></i>
  </a>
  <a data-wysihtml5-command="italic" class="Button" title="CTRL+I">
    <span>{t c="Italic"}</span> <i class="icon icon-italic"></i>
  </a>
  <a data-wysihtml5-command="underline" class="Button">
    <span>{t c="Underline"}</span> <i class="icon icon-underline"></i>
  </a>
  <a data-wysihtml5-command="justifyLeft" class="Button">
    <span>{t c="Left"}</span> <i class="icon icon-align-left"></i>
  </a>
  <a data-wysihtml5-command="justifyCenter" class="Button">
    <span>{t c="Center"}</span> <i class="icon icon-align-center"></i>
  </a>
  <a data-wysihtml5-command="justifyRight" class="Button">
    <span>{t c="Right"}</span> <i class="icon icon-align-right"></i>
  </a>
  <a data-wysihtml5-command="insertUnorderedList" class="Button">
    <span>{t c="Bulleted List"}</span> <i class="icon icon-list-ul"></i>
  </a>
  <a data-wysihtml5-command="insertOrderedList" class="Button">
    <span>{t c="Numbered List"}</span> <i class="icon icon-list-ol"></i>
  </a>
  <a data-wysihtml5-command="createLink" class="Button">
    <span>{t c="Link"}</span> <i class="icon icon-link"></i>
  </a>
  <a data-wysihtml5-command="insertImage" class="Button">
    <span>{t c="Image"}</span> <i class="icon icon-picture"></i>
  </a>
  <a data-wysihtml5-action="change_view" class="Button">
    <span>{t c="Source"}</span> <i class="icon icon-source"></i>
  </a>

  <div data-wysihtml5-dialog="createLink" class="createLink" style="display: none;">
    <label>
      {t c="Link"}
      <input data-wysihtml5-dialog-field="href" value="http://" type="text" class="InputBox">
    </label>
    <a data-wysihtml5-dialog-action="save" class="Button">{t c="OK"}</a>
    <a data-wysihtml5-dialog-action="cancel" class="Button">{t c="Cancel"}</a>
  </div>

  <div data-wysihtml5-dialog="insertImage" class="insertImage" style="display: none;">
    <label>
      {t c="Image"}:
      <input data-wysihtml5-dialog-field="src" value="http://" type="text" class="InputBox">
    </label>
    <label>
      {t c="Align"}:
      <select data-wysihtml5-dialog-field="className">
        <option value="">{t c="Default"}</option>
        <option value="wysiwyg-float-left">{t c="Left"}</option>
        <option value="wysiwyg-float-right">{t c="Right"}</option>
      </select>
    </label>
    <a data-wysihtml5-dialog-action="save" class="Button">{t c="OK"}</a>
    <a data-wysihtml5-dialog-action="cancel" class="Button">{t c="Cancel"}</a>
  </div>

</div>
