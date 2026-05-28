<?php

namespace App\Tests;

use Symfony\Bundle\FrameworkBundle\KernelBrowser;

trait TestTrait
{
    protected KernelBrowser $client;

    protected function createJsonClient(): void
    {
        $this->client = static::createClient();
        $this->client->setServerParameter('HTTP_X-Requested-With', 'XMLHttpRequest');
    }

    protected function assertSuccessfulJson(): void
    {
        $this->assertResponseIsSuccessful();
        $this->assertJson($this->client->getResponse()->getContent());
    }

    protected function getSuccessfulResponseJsonData(): array
    {
        $this->assertSuccessfulJson();

        return json_decode($this->client->getResponse()->getContent(), true);
    }
}