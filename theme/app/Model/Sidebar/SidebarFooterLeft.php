<?php
namespace AppWordpress\Model\Sidebar;

use ChocolatineWp\Model\Sidebar;

class SidebarFooterLeft extends Sidebar
{
    public $id           = 'default_left';
    public $name         = 'Sidebar Footer Left';
    public $description  = "Sidebar Footer Left...";
    public $beforeWidget = '<li id="%1$s" class="widget %2$s">';
    public $afterWidget  = '</li>';
    public $beforeTitle  = '<h2 class="widgettitle">';
    public $afterTitle   = '</h2>';
}
