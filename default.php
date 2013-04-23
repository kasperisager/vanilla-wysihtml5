<?php if (!defined("APPLICATION")) exit();

$PluginInfo['Wysihtml5'] = array(
   'Name'         => 'Wysihtml5',
   'Description'  => 'Turns the default text area into an HTML5 editor that generates valid and semantic markup.',
   'Version'      => '1.3.0',
   'Author'       => 'Kasper K. Isager',
   'AuthorEmail'  => 'kasperisager@gmail.com',
   'AuthorUrl'    => 'http://github.com/kasperisager',
   'RequiredApplications' => array('Vanilla' => '2.1a')
);

/**
 * Wysihtml5 plugin for Vanilla
 *
 * @package    Wysihtml5 Plugin
 * @version    1.3.0
 * @author     Kasper Kronborg Isager <kasperisager@gmail.com>
 * @author     Diego Zanella <diego@pathtoenlightenment.net>
 * @copyright  Copyright © 2013
 * @license    http://opensource.org/licenses/MIT MIT
 */
class Wysihtml5 extends Gdn_Plugin
{
   /**
    * Add the WYSIWYG editor to all text boxes
    *
    * @access public
    */
   public function Gdn_Form_BeforeBodyBox_Handler()
   {
      $this->AttachFormattingBar(Gdn::Controller());
   }

   /**
    * Adds the formatting bar to the form used by the Controller.
    *
    * @access  public
    * @param   Gdn_Controller $Sender
    */
   private function AttachFormattingBar($Sender)
   {
      $this->AddWysihtml5($Sender);

      $Form = $Sender->Form;
      $Format = $Form->GetValue('Format');

      if ($Format) {
         $Formatter = Gdn::Factory($Format.'Formatter');
         if ($Formatter && method_exists($Formatter, 'FormatForWysiwyg')) {
            $Body = $Formatter->FormatForWysiwyg($Form->GetValue('Body'));
            $Form->SetValue('Body', $Body);
         } elseif (!in_array($Format, array('Html', 'Wysiwyg'))) {
            $Form->SetValue('Body', Gdn_Format::To($Form->GetValue('Body'), $Format));
         }
      }

      $Form->SetValue('Format', 'Wysiwyg');
      echo $Sender->FetchView('toolbar', NULL, 'plugins/Wysihtml5');
   }

   /**
    * Add Wysihtml5 resources
    * 
    * @access  private
    * @param   Gdn_Controler $Sender
    */
   private function AddWysihtml5($Sender)
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
