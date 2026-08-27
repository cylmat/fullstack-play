<?php

namespace App\MainBundle\Manager;

use Attribute;

#[Attribute]
class SetUpAttributeUsage { public function __construct(public int $value) {} }

class Testing {
    #[SetUpAttributeUsage(6)]
    public function usingTest(): void {}
}

class Php8Manager
{
    public function __construct(
        private string $constructorPromotion80 = 'PHP 8.0',
    ) { }

    /** @return array<string, mixed> */
    public function php80(
        int|bool $typeUnion = 1,
    ): array {
        // @see https://www.php.net/manual/en/migration80.new-features.php
        $namedArguments = array_fill(start_index: 0, count: 5, value: 1);
        $reflectionAttribute = new \ReflectionClass(Testing::class);
        $methodWithAttribute = $reflectionAttribute->getMethod('usingTest')->getAttributes(SetUpAttributeUsage::class)[0];
        $matching = match ('one') { 'one' => "Displaying", 'two' => "Error", };
        $nullSafe = $reflectionAttribute?->getConstant('NON_EXISTENT_CONSTANT');
        $stringCompare = 0 == 'foobar'; // false
        // $strlenType = strlen([]);

        return [
            'title' => 'PHP 8.0',
            'ref' => 'https://www.php.net/releases/8.0',

            'NamedArguments' => 'array_fill(0, count: 5)',
            'Attributes' => '#[Attribute] class SetUpAttributeUsage {}',
            'Constructor Property Promotion' => 'function __construct(public float $x = 0.0)',
            'Union Types' => 'private int|float $number',
            'Match Expression' => "return match ('one') {'one' => \"Displaying\",}",
            'Nullsafe Operator' => '$country = $session?->user?->getAddress()?->country;',
            'Saner string to number comparisons' => "0 == 'foobar' // false",
            'Consistent type errors' => 'strlen([]); // TypeErrorException',
            'JIT compilation' => null,
            'Improve' => 'mixed, return static',
            'NEW' => 'Weak Map, StringableInterface, str_contains(), str_starts_with(), str_ends_with(), fdiv()',
        ];
    }
}
