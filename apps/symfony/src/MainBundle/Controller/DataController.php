<?php

declare(strict_types=1);

namespace App\MainBundle\Controller;

use App\MainBundle\Contract\SerializerTrait;
use App\MainBundle\Entity\Data\Factory;
use App\MainBundle\Manager\Data\FactoryManager;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class DataController extends AbstractController
{
    use SerializerTrait;

    public function __construct(
        private readonly FactoryManager $factoryManager,
    ) {}

    #[Route('/api/randomint', name: 'randomint')]
    public function __invoke(): Response
    {
        // $response = $action->execute(new AppRequest());

        // return $this->getApiResponse();
        return new Response('ok');
    }

    #[Route('/data')]
    public function index(): Response
    {
        return $this->render('page/data.html.twig');
    }

    // API

    #[Route('/api/factoryAllData', methods: ['GET'])]
    public function getFactories(): JsonResponse
    {
        $data = $this->factoryManager->getAllData();

        return $this->json([
            'factories' => $data['factories'],
            'contacts ' => $data['contacts'],
        ]);
    }

    #[Route('/api/factory', methods: ['POST'])]
    public function postFactory(Request $request): JsonResponse
    {
        /** @var Factory $factory */
        $factory = $this->deserialize(
            $request->request->all(),
            Factory::class
        );

        $this->factoryManager->addFactory($factory);

        return $this->json(null, 201);
    }

    #[Route('/api/factory/{id}', methods: ['DELETE'])]
    public function deleteFactory(Factory $factory): JsonResponse
    {
        $this->factoryManager->deleteFactory($factory);

        return $this->json(null, 204);
    }
}
