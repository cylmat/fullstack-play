<?php

declare(strict_types=1);

namespace App\MainBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/', name: 'home')]
final class HomeController extends AbstractController
{
    public function __invoke(): Response
    {
       // $response = $action->execute(new AppRequest());

        return $this->render('page/home.html.twig');
    }
}
