<?php

namespace App\Tests\MainBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;
use Symfony\Component\HttpFoundation\Request;

final class HomeControllerTest extends WebTestCase
{
    public function testHome()
    {
        $client = static::createClient();
        $crawler = $client->request(Request::METHOD_GET, '/');

        $this->assertResponseIsSuccessful();
        $h2 = $crawler->filter('h2')->first()->text();

        $this->assertSame('Home', $h2);
    }
}
