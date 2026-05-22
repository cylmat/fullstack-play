<?php

namespace App\MainBundle\Manager;

class Php8Manager
{
    /** @return array<string, mixed> */
    public function php80(): array
    {
        // @see https://www.php.net/manual/en/migration80.new-features.php
        $namedArguments = array_fill(start_index: 0, count: 5, value: 'array_fill(start_index: 0);');

        return [
            'Union Types' => null,
            'NamedArguments' => $namedArguments[0],
            'Attributes' => null,
            'Constructor Property Promotion' => null,
            'Match Expression' => null,
            'Nullsafe Operator' => null,
            'JIT' => null,
        ];
    }
}
