<?php

declare(strict_types=1);

namespace App\MainBundle\Manager\Data\Redis;

use App\MainBundle\Service\Data\Redis\RedisScriptsInterface;

final class RandomApiManager
{
    public function __construct(
        private readonly RedisScriptsInterface $scriptManager,
    ) {}

    public function getData(): RandomApi
    {
        $randomApi = new RandomApi();
        $randomApi->random_int = \random_int(1, 99);
        $randomApi->random_script_int = $this->scriptManager->getRandomInt();

        return $randomApi;
    }
}
