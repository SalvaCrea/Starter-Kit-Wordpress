<?php
namespace AppWordpress;

class App
{
    public function __construct()
    {
        $postTypeExemple         = new Component\PostType\PostTypeExample();
        $widgetFooterLeft        = new Component\Widget\WidgetExample();
        $sidebarFooterLeft       = new Component\Sidebar\SidebarFooterLeft();
        $sidebarFooterRight      = new Component\Sidebar\SidebarFooterRight();
        $sidebarFooterMiddleLeft = new Component\Sidebar\SidebarFooterMiddleLeft();
        $sidebarFooterMiddleLeft = new Component\Sidebar\SidebarFooterMiddleRight();
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
