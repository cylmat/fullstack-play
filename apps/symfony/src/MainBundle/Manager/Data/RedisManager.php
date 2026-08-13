<?php

declare(strict_types=1);

namespace App\MainBundle\Manager\Data;

use Predis\Client as PredisClient;
use Predis\Connection\Resource\Exception\StreamInitException;
use Throwable;

final class RedisManager
{
    public function __construct(
        private PredisClient $redisClient,
    ) {}

    /** @return mixed[] */
    public function getData(): array
    {
        try {
            $this->init();

            $script = $this->getRandomInt();

            return [
                'randomScriptInt' => $script,
                'getAlpha' => $this->redisClient->get('ALPHA'),
            ];
        } catch (StreamInitException) {
            return [
                '' => 'Redis not reachable.',
            ];
        } catch (Throwable $e) {
            return [
                'error' => $e->getMessage(),
            ];
        }
    }

    private function init(): void
    {
        $script = file(__DIR__.'/Redis.txt', FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
        foreach ($script as $line) {
            if (str_starts_with($line, '--')) {
                continue;
            }
            $commands = explode(' ', $line);
            $this->redisClient->executeRaw($commands);
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
