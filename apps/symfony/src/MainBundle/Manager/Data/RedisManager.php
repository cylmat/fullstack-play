<?php

declare(strict_types=1);

namespace App\MainBundle\Manager\Data;

use Predis\ClientInterface as PredisClientInterface;

final class RedisManager
{
    public function __construct(
        private PredisClientInterface $redisClient,
    ) {}

    /** @return mixed[] */
    public function getData(): array
    {
        try {
            $script = $this->getRandomInt();

            return [
                'randomScriptInt' => $script,
            ];
        } catch (\Throwable $e) {
            return [
                'error' => $e->getMessage(),
            ];
        }
    }

    public function getRandomInt(): int
    {
        return (int) $this->redisClient->eval(
            'math.randomseed(ARGV[1]); return math.random(0, 100)',
            0,
            (string)(time() * rand()),
        );
    }
}
