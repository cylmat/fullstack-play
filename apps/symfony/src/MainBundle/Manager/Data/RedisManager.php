<?php

declare(strict_types=1);

namespace App\MainBundle\Manager\Data;

use Predis\Client as PredisClient;

final class RedisManager
{
    public function __construct(
        private PredisClient $redisClient,
    ) {}

    /** @return mixed[] */
    public function getData(): array
    {
        return [
            'randomScriptInt' => $this->getRandomInt(),
        ];
    }

    public function getRandomInt(): int
    {
        return (int) $this->redisClient->eval(
            'math.randomseed(ARGV[1]); return math.random(0, 100)'
        , 0, (string)(time() * rand()));
    }
}
