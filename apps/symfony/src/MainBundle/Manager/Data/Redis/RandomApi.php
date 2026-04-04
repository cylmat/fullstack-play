<?php

declare(strict_types=1);

namespace App\MainBundle\Manager\Data\Redis;

final class RandomApi
{
    public int $randomInt;
    public int $randomScriptInt;
    public string $cacheGet;
    public string $cacheDynamic;
}
