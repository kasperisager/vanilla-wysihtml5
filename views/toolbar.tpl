<div id="wysihtml5-toolbar" style="display: none;">

   <a data-wysihtml5-command="bold" class="Button" title="CTRL+B">
      <span class="sprite sprite-bold-png"></span>
   </a>
   <a data-wysihtml5-command="italic" class="Button" title="CTRL+I">
      <span class="sprite sprite-italic-png"></span>
   </a>
   <a data-wysihtml5-command="underline" class="Button">
      <span class="sprite sprite-underline-png"></span>
   </a>
   <a data-wysihtml5-command="justifyLeft" class="Button">
      <span class="sprite sprite-left-png"></span>
   </a>
   <a data-wysihtml5-command="justifyCenter" class="Button">
      <span class="sprite sprite-center-png"></span>
   </a>
   <a data-wysihtml5-command="justifyRight" class="Button">
      <span class="sprite sprite-right-png"></span>
   </a>
   <a data-wysihtml5-command="insertUnorderedList" class="Button">
      <span class="sprite sprite-bulleted-png"></span>
   </a>
   <a data-wysihtml5-command="insertOrderedList" class="Button">
      <span class="sprite sprite-numbered-png"></span>
   </a>
   <a data-wysihtml5-command="createLink" class="Button">
      <span class="sprite sprite-link-png"></span>
   </a>
   <a data-wysihtml5-command="insertImage" class="Button">
      <span class="sprite sprite-image-png"></span>
   </a>
   <a data-wysihtml5-action="change_view" class="Button">
      <span class="sprite sprite-html-png"></span>
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
            <option value="">{t c="default"}</option>
            <option value="wysiwyg-float-left">{t c="left"}</option>
            <option value="wysiwyg-float-right">{t c="right"}</option>
         </select>
      </label>
      <a data-wysihtml5-dialog-action="save" class="Button">{t c="OK"}</a>
      <a data-wysihtml5-dialog-action="cancel" class="Button">{t c="Cancel"}</a>
   </div>

</div>