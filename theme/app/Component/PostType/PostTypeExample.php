<?php

namespace AppWordpress\Component\PostType;

use ChocolatineWp\Component\PostType;

class PostTypeExample extends PostType
{
    var $idName = 'PostTypeExample';
    var $singularName = 'Post Type Example';
    var $pluralName = 'Posts Types Examples';
    var $description = 'Post Type Description...';

    public function Model()
    {
        return [
            'title'  => 'Post Type Example Input',
            'fields' => array(
                array(
                    'id'   => 'example-id',
                    'name' => 'example-name',
                    'type' => 'text',
                )
            )
        ];
    }
}
