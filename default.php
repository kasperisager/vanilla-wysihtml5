<?php if (!defined("APPLICATION")) exit();

$PluginInfo['Wysihtml5'] = array(
   'Name'         => 'Wysihtml5',
   'Description'  => 'Turns the default text area into an HTML5 editor that generates valid and semantic markup.',
   'Version'      => '1.0.8',
   'Author'       => 'Kasper K. Isager',
   'AuthorEmail'  => 'kasperisager@gmail.com',
   'AuthorUrl'    => 'http://github.com/kasperisager',
   'RequiredApplications' => array('Vanilla' => '2.1a')
);

/**
 * Wysihtml5 plugin for Vanilla
 *
 * @package    Addons
 * @version    1.0.8
 * @author     Kasper Kronborg Isager <kasperisager@gmail.com>
 * @copyright  Copyright © 2013
 * @license    http://opensource.org/licenses/MIT MIT
 */
class Wysihtml5 extends Gdn_Plugin
{
   /**
    * Add the WYSIWYG editor to all text boxes
    * 
    * @param  Gdn_Controller $Sender
    * @since  1.0.0
    * @access public
    */
   public function Gdn_Form_BeforeBodyBox_Handler($Sender)
   {
      $this->_AddWysihtml5(Gdn::Controller());

      $Format = $Sender->GetValue('Format');

      if ($Format) {
         $Formatter = Gdn::Factory($Format.'Formatter');
         if ($Formatter && method_exists($Formatter, 'FormatForWysiwyg')) {
            $Body = $Formatter->FormatForWysiwyg($Sender->GetValue('Body'));
            $Sender->SetValue('Body', $Body);
         } elseif (!in_array($Format, array('Html', 'Wysiwyg'))) {
            $Sender->SetValue('Body', Gdn_Format::To($Sender->GetValue('Body'), $Format));
         }
      }

      $Sender->SetValue('Format', 'Wysiwyg');

      ?>
      <div id="wysihtml5-toolbar" style="display: none;">

         <a data-wysihtml5-command="bold" class="Button" title="CTRL+B"><span class="sprite sprite-bold-png"></span></a>
         <a data-wysihtml5-command="italic" class="Button" title="CTRL+I"><span class="sprite sprite-italic-png"></span></a>
         <a data-wysihtml5-command="underline" class="Button"><span class="sprite sprite-underline-png"></span></a>
         <a data-wysihtml5-command="justifyLeft" class="Button"><span class="sprite sprite-left-png"></span></a>
         <a data-wysihtml5-command="justifyCenter" class="Button"><span class="sprite sprite-center-png"></span></a>
         <a data-wysihtml5-command="justifyRight" class="Button"><span class="sprite sprite-right-png"></span></a>
         <a data-wysihtml5-command="insertUnorderedList" class="Button"><span class="sprite sprite-bulleted-png"></span></a>
         <a data-wysihtml5-command="insertOrderedList" class="Button"><span class="sprite sprite-numbered-png"></span></a>
         <a data-wysihtml5-command="createLink" class="Button"><span class="sprite sprite-link-png"></span></a>
         <a data-wysihtml5-command="insertImage" class="Button"><span class="sprite sprite-image-png"></span></a>
         <a data-wysihtml5-action="change_view" class="Button"><span class="sprite sprite-html-png"></span></a>

         <div data-wysihtml5-dialog="createLink" class="createLink" style="display: none;">
            <label>
               <?php T('Link') ?>:
               <input data-wysihtml5-dialog-field="href" value="http://" type="text" class="InputBox">
            </label>
            <a data-wysihtml5-dialog-action="save" class="Button"><?php T('OK') ?></a>
            <a data-wysihtml5-dialog-action="cancel" class="Button"><?php T('Cancel') ?></a>
         </div>
         
         <div data-wysihtml5-dialog="insertImage" class="insertImage" style="display: none;">
            <label>
               <?php T('Image') ?>:
               <input data-wysihtml5-dialog-field="src" value="http://" type="text" class="InputBox">
            </label>
            <label>
               <?php T('Align') ?>:
               <select data-wysihtml5-dialog-field="className">
                  <option value=""><?php T('default') ?></option>
                  <option value="wysiwyg-float-left"><?php T('left') ?></option>
                  <option value="wysiwyg-float-right"><?php T('right') ?></option>
               </select>
            </label>
            <a data-wysihtml5-dialog-action="save" class="Button"><?php T('OK') ?></a>
            <a data-wysihtml5-dialog-action="cancel" class="Button"><?php T('Cancel') ?></a>
         </div>
         
      </div>
      <?php
   }
   
   /**
    * Add Wysihtml5 resources
    * 
    * @param  Gdn_Controler $Sender
    * @since  1.0.0
    * @access private
    */
   private function _AddWysihtml5($Sender)
   {
      static $Added = FALSE;
      if ($Added) return;

      $Sender->AddCssFile('wysihtml5.css', 'plugins/Wysihtml5');
      $Sender->AddCssFile('sprites12.css', 'plugins/Wysihtml5');
      $Sender->AddJsFile('advanced.js', 'plugins/Wysihtml5');
      $Sender->AddJsFile('wysihtml5.js', 'plugins/Wysihtml5');
      $Sender->AddJsFile('initialize.js', 'plugins/Wysihtml5');
      $Sender->AddJsFile('underscore.js', 'plugins/Wysihtml5');

      $Added = TRUE;
   }
}