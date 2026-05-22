<?php

declare(strict_types=1);

namespace App\MainBundle\Controller;

use App\MainBundle\Manager\DataStructureManager;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class DataStructureController extends AbstractController
{
    public function __construct(
        private readonly DataStructureManager $dataStructureManager,
    ) {}

    #[Route('/ds', name: 'app_ds')]
    public function structure(): Response
    {
        return $this->render('page/data_structure.html.twig', [
            'structures' => $this->dataStructureManager->structures(),
        ]);
    }
}
