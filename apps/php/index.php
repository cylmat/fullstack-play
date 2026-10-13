<?php

namespace App;

include 'template.php';
include 'Php8Manager.php';

$php8Manager = new Php8Manager();
$php80Features = $php8Manager->php80();

$content = '<pre>';
foreach ($php80Features as $feature => $description) {
    $content .= "$feature: $description\n";
}
$content .= '</pre>';
echo template('PHP 8.0', $content);
