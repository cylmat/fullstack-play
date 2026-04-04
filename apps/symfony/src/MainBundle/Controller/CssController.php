<?php

declare(strict_types=1);

namespace App\MainBundle\Controller;

use App\MainBundle\Contract\SerializerTrait;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class CssController extends AbstractController
{
    use SerializerTrait;

    public function __construct() {}

    #[Route('/css', name: 'css')]
    public function __invoke(): Response
    {
        // $response = $action->execute(new AppRequest());

        // return $this->getApiResponse();
        return $this->render('page/css.html.twig');
    }
}
