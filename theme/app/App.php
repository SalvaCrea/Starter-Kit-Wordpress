<?php
namespace AppWordpress;

class App
{
    public function __construct()
    {
        $postTypeExemple         = new Model\PostType\PostTypeExample();
        $widgetFooterLeft        = new Model\Widget\WidgetExample();
        $sidebarFooterLeft       = new Model\Sidebar\SidebarFooterLeft();
        $sidebarFooterRight      = new Model\Sidebar\SidebarFooterRight();
        $sidebarFooterMiddleLeft = new Model\Sidebar\SidebarFooterMiddleLeft();
        $sidebarFooterMiddleLeft = new Model\Sidebar\SidebarFooterMiddleRight();
    }
    /**
     * Add Variable Globale in Twig
     * @param array return array
     */
    public function add_to_context( $context ) {
        $context['menu'] = new Menu();
        $context['site'] = $this;
        $context['themeUrl'] = get_template_directory_uri();
        $context['urlFolderImg'] = $context['themeUrl'] . "/" . "images";
        return $context;
    }
    public function add_to_twig( $twig ) {
        /* this is where you can add your own functions to twig */
        // $twig->addExtension( new \Twig_Extension_StringLoader() );
        // $twig->addFilter('myfoo', new \Twig_SimpleFilter('myfoo', array($this, 'myfoo')));
        return $twig;
    }
}
