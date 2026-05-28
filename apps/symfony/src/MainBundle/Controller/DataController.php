<?php

declare(strict_types=1);

namespace App\MainBundle\Controller;

use App\MainBundle\Controller\Traits\ControllerTrait;
use App\MainBundle\Controller\Traits\SerializerTrait;
use App\MainBundle\Manager\Data\RedisManager;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class DataController extends AbstractController
{
    use SerializerTrait;
    use ControllerTrait;

    /////////////// @todo APCU cache

    public function __construct(
        private readonly RedisManager $redisManager,
    ) {}

    #[Route('/data')]
    public function index(Request $request): Response
    {
        $redis = $this->redisManager->getData();

        $parameters = [
            'redis' => $redis,
        ];

        return $this->renderJsonOrResponse('page/data.html.twig', $parameters, $request);
    }
}
