<?php

declare(strict_types=1);

namespace App\MainBundle\Controller;

use App\MainBundle\Manager\PatternManager;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class DesignPatternController extends AbstractController
{
    public function __construct(
        private readonly PatternManager $patternManager,
    ) {}

    #[Route('/pattern', name: 'app_pattern')]
    public function pattern(): Response
    {
        return $this->render('page/pattern.html.twig', [
            'patterns' => $this->patternManager->patterns(),
        ]);
    }
}
