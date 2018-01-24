<?php
require "vendor/autoload.php";


$timber = new \Timber\Timber();
\Timber\Timber::$dirname = array('templates', 'views');

new StarterKitWp\StarterKit();

$a = new StarterKitWp\Model\PostType\PostTypeExample();
$a->init();
