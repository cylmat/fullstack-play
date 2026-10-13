<?php

function template($title, $content) {

    $menu = include "menu.php";

    return <<<EOF
<html>
    <div>$menu</div>
    $title
    $content
</html>
EOF;
}
