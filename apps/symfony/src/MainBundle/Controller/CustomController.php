<?php

namespace App\MainBundle\Controller;

use App\MainBundle\Form\Text\TextType;
use App\MainBundle\Manager\Text\CommandManager;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class CustomController extends AbstractController
{

    #[Route('/custom', name: 'app_custom')]
    public function custom(Request $request): Response
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

    /**
     * @param mixed[][] $arguments
     *
     * @return mixed[]
     */
    private function commandArguments(string $command, array $arguments): array
    {
        return [
            'cmd' => $command,
            'arguments' => $arguments,
        ];
    }
}
