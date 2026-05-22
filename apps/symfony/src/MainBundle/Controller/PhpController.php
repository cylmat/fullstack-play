<?php

namespace App\MainBundle\Controller;

use App\MainBundle\Manager\Php8Manager;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class PhpController extends AbstractController
{
    public function __construct(
        private readonly Php8Manager $php8Manager,
    ) {}

    #[Route('/php', name: 'app_php')]
    public function php(): Response
    {
        return $this->render('page/php.html.twig', [
            'php80' => $this->php8Manager->php80(),
        ]);
    }
}
