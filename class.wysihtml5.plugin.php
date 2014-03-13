<?php if (!defined('APPLICATION')) exit;

$PluginInfo['wysihtml5'] = array(
    'Name'        => "Wysihtml5",
    'Description' => "Turns the default text area into an HTML5 editor that generates valid and semantic markup.",
    'Version'     => '2.0.0',
    'Author'      => "Kasper Kronborg Isager",
    'AuthorEmail' => 'kasperisager@gmail.com',
    'AuthorUrl'   => 'https://github.com/kasperisager',
    'License'     => 'MIT',
    'RequiredApplications' => array('Vanilla' => '2.1.x')
);

/**
 * Wysihtml5 Plugin
 *
 * @author    Kasper Kronborg Isager <kasperisager@gmail.com>
 * @copyright 2014 (c) Kasper Kronborg Isager
 * @license   MIT
 * @package   Wysihtml5
 * @since     2.0.0
 */
class Wysihtml5Plugin extends Gdn_Plugin
{
    /**
     * Initialize Wysihtml5
     *
     * @param Gdn_Form $sender
     */
    public function Gdn_Form_beforeBodyBox_handler($sender)
    {
        // Make sure that Wysiwyg is used
        $sender->setValue('Format', 'Wysiwyg');

        // Remove jQuery Autogrow as it interfeers with the editor
        Gdn::controller()->removeJsFile('jquery.autogrow.js');

        // Add the assets we need for the editor
        Gdn::controller()->addJsFile('editor.min.js', 'plugins/wysihtml5');
        Gdn::controller()->addCssFile('editor.css', 'plugins/wysihtml5');

        // Render the formatting toolbar
        echo Gdn::controller()->fetchView('toolbar', '', 'plugins/wysihtml5');
    }
}
