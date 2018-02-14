<?php

namespace AppWordpress\Model\PostType;

use ChocolatineWp\Model\PostType;

class PostTypeExample extends PostType
{
    var $idName = 'PostTypeExample';
    var $singularName = 'Post Type Example';
    var $pluralName = 'Posts Types Examples';
    var $description = 'Post Type Description...';

    public function model()
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
