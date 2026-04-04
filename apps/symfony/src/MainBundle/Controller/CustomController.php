<?php

namespace App\MainBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class CustomController extends AbstractController
{
    #[Route('/custom', name: 'app_custom')]
    public function custom(): Response
    {
        // $cryptoForm = $this->createForm(CryptoType::class);
        // $cryptoForm->handleRequest($request);

        // $result = null;
        // if (Request::METHOD_POST === $request->getMethod()) {
        //     if ($cryptoForm->isSubmitted() && $cryptoForm->isValid()) {
        //         $value = $cryptoForm->getData()['ClearDataToConvert'];
        //         $this->addFlash('success', 'Form sended');

        //         $result = $action->execute(
        //             // new AppRequest(['value' => $value, 'options' => []])
        //         );
        //     }
        // }

        // $textForm = $this->createForm(TextType::class, null, []);
        // $textForm->handleRequest($request);


        return $this->render('page/custom.html.twig', [
            'textForm' => 'textForm', // $textForm,
            'encryptForm' => 'cryptoForm', // $cryptoForm->createView(),
            'result' => 'res',
        ]);
    }
}
