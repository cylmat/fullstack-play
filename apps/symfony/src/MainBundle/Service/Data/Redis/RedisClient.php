<?php

declare(strict_types=1);

namespace App\MainBundle\Service\Data\Redis;

use App\MainBundle\Service\Data\ClientInterface;
use App\MainBundle\Service\Data\ClientNull;

// Doc.

/**
 * @see https://github.com/predis/predis/wiki
 *
 * @method mixed  get(string $key)
 * @method bool   set(string $key, string $value)
 * @method bool   setex(string $key, int $ttl, string $value)
 * @method int    del(string ...$keys)
 * @method int    exists(string $key)
 * @method int    incrby(string $key, int $value)
 * @method int    decrby(string $key, int $value)
 * @method bool   expire(string $key, int $seconds)
 * @method int    ttl(string $key)
 * @method bool   flushall()
 * @method array<string> keys(string $pattern)
 * @method mixed  pipeline()
 * @method mixed  eval(string $script, int $numkeys, mixed ...$args)
 */
final class RedisClient implements ClientInterface
{
    private ClientInterface $client;

    /** @param ClientInterface|null $redisClient Can be "Predis" or other Redis client */
    public function __construct(?ClientInterface $redisClient = null)
    {
        $this->init($redisClient);
    }

    public function connect(): mixed
    {
        return $this->client->connect();
    }

    public function __call(string $name, mixed $arguments): mixed
    {
        return $this->client->{$name}(...$arguments);
    }

    private function init(?ClientInterface $redisClient): void
    {
        try {
            $this->client = $redisClient ?: new ClientNull();
            $this->client->connect();
        } catch (\Throwable) {
            $this->client = new ClientNull();
        }
    }
}
