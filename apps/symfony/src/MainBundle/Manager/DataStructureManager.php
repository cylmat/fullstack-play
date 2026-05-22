<?php

namespace App\MainBundle\Manager;

use DS\Pair;

class DataStructureManager
{
    /** @return array<string, mixed> */
    public function structures(): array
    {
        $pair = new Pair('key', 'value');

        return [
            'pair' => $pair,
        ];
    }
}
