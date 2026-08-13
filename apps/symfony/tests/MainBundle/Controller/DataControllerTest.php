<?php

namespace App\Tests\MainBundle\Controller;

use App\Tests\TestTrait;
use Doctrine\ORM\EntityManager;
use PHPUnit\Framework\Attributes\AllowMockObjectsWithoutExpectations;
use Predis\Client;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;
use Symfony\Component\HttpFoundation\Request;

#[AllowMockObjectsWithoutExpectations]
final class DataControllerTest extends WebTestCase
{
    use TestTrait;

    public function setUp(): void
    {
        $this->createJsonClient();
    }

    public function test()
    {
        $this->mockClients();

        $this->client->request(Request::METHOD_GET, '/data');
        $responseData = $this->getSuccessfulResponseJsonData();

        $this->assertArrayHasKey('table6', $responseData['mysql'] ?? []);
        $this->assertArrayHasKey('randomScriptInt', $responseData['redis'] ?? []);
    }

    # Allow testing without database service running
    private function mockClients(): void
    {
        $redis = $this->createMock(Client::class);
        // $redis->method('eval')->willReturn(42);

        $mysql = $this->createMock(EntityManager::class);

        $container = static::getContainer();
        $container->set('doctrine.orm.entity_manager', $mysql);
        $container->set('snc_redis.default', $redis);
    }
}
