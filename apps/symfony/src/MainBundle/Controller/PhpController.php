<?php

namespace App\MainBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class PhpController extends AbstractController
{
    #[Route('/php', name: 'app_php')]
    public function sym(Request $request): Response
    {


        return $this->render('page/php.html.twig', [

        ]);
    }
}
