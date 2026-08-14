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

            return [
                'transaction' => $this->redisClient->get('trans_count'),
                'getAlpha' => $this->redisClient->get('ALPHA'),
                // @phpstan-ignore nullCoalesce.expr
                'hash->user:luc' => implode(',', $this->redisClient->hvals('user:luc') ?? []), // ->hgetall
                // @phpstan-ignore nullCoalesce.expr
                'list->eric:wish' => implode(',', $this->redisClient->lrange('eric:wishlist', 0, 2) ?? []),
                'list pop' => $this->redisClient->lpop('eric:wishlist'),
                'randomScriptInt' => $this->getRandomInt(),
                'scripts' => $this->scripts(),
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

    private function getRandomInt(): int
    {
        return (int) $this->redisClient->eval(
            'math.randomseed(ARGV[1]); return math.random(0, 100)',
            0,
            (string)(time() * rand()),
        );
    }

    private function scripts(): string
    {
        $scripts = '';

        // get last item of list "eric:wishlist"
        $scripts .= $this->redisClient->eval(
            'return redis.call("lindex", "eric:wishlist", -1)',
            0
        );

        return $scripts;
    }
}
