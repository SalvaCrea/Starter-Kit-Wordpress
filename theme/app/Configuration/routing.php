<?php
return [
    /**
     * Routing by Post Type
     */
    "post": [
        "postType": "post",
        "controller": "@AppWordpress:PostController:viewAction"
    ],
    "page": [
        "postType": "page",
        "controller": "@AppWordpress:PageController:viewAction"
    ],
    /**
     * Routing by path
     */
    "contact": [
        "path": "/contact/{name}",
        "controller": "@AppWordpress:ContactController:viewAction",
        "method": ["GET", "POST"]
    ]
];
