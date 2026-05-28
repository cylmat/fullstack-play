<?php

namespace App\MainBundle\Controller\Traits;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

trait ControllerTrait
{
    protected function renderJsonOrResponse(
        string $view,
        mixed $parameters,
        Request $request,
        int $status = Response::HTTP_OK,
    ): JsonResponse|Response {
        if ($request->isXmlHttpRequest()) {
            return $this->json($parameters, $status);
        }

        $response = $this->render($view, $parameters);
        $response->setStatusCode($status);

        return $response;
    }
}
