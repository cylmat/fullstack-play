<?php

namespace App\MainBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class SymController extends AbstractController
{
    #[Route('/sym', name: 'app_sym')]
    public function sym(): Response
    {

        return $this->render('page/sym.html.twig', [

        ]);
    }
}
