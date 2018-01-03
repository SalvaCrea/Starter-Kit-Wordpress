<?php
require "vendor/autoload.php";


$timber = new \Timber\Timber();
\Timber\Timber::$dirname = array('templates', 'views');

new starterkitwp\StarterKit();
