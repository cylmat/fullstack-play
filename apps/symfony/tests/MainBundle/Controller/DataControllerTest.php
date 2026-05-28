<?php

namespace App\Tests\MainBundle\Controller;

use App\Tests\TestTrait;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;
use Symfony\Component\HttpFoundation\Request;

final class DataControllerTest extends WebTestCase
{
    use TestTrait;

    public function setUp(): void
    {
        $this->createJsonClient();
    }

    public function test()
    {
        $this->client->request(Request::METHOD_GET, '/data');

        $responseData = $this->getSuccessfulResponseJsonData();

        $this->assertArrayHasKey('randomScriptInt', $responseData);
    }
}
