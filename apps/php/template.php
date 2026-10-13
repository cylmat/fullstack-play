<?php

function template($title, $content) {
    return
<<<EOF
<html>
    $title
    $content
</html>
EOF;
}
