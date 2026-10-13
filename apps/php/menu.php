<?php

namespace App;

include __DIR__ . '/Php8Manager.php';

$php8Manager = new Php8Manager();
$php80Features = $php8Manager->php80();

echo '<pre>';
foreach ($php80Features as $feature => $description) {
    echo "$feature: $description\n";
}
echo '</pre>';
