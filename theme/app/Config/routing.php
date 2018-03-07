<?php
return [
    /**
     * Routing by Post Type
     */
    "post" => [
        "postType"   => "post",
        "controller" => AppWordpress\Controller\PostController::class,
        "method"     => "view",
    ],
    "page" => [
        "postType"   => "page",
        "controller" => AppWordpress\Controller\PageController::class,
        "method"     => "view",
    ],
    /**
     * Routing by path
     */
    "contact" => [
        "path"       => "/contact/{name}",
        "controller" => "@AppWordpress:ContactController:viewAction",
        "method"     => ["GET", "POST"],
    ]
];
