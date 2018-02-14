<?php
namespace AppWordpress\Model\Sidebar;

use ChocolatineWp\Model\Sidebar;

class SidebarFooterRight extends Sidebar
{
    public $id           = 'default_right';
    public $name         = 'Sidebar Footer Right';
    public $description  = "Sidebar Footer Right...";
    public $beforeWidget = '<li id="%1$s" class="widget %2$s">';
    public $afterWidget  = '</li>';
    public $beforeTitle  = '<h2 class="widgettitle">';
    public $afterTitle   = '</h2>';
}
