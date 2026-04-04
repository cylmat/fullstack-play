<?php

namespace App\MainBundle\Service\Encryption;

use App\MainBundle\Model\Play\EncryptedData;
use Symfony\Component\Workflow\WorkflowInterface;

class BcryptEncryption implements EncryptionInterface
{
    public function __construct(
        private readonly WorkflowInterface $encryptWorkflow,
    ) {}

    public function encrypt(string $value, array $options): EncryptedData
    {
        $encryptedData = new EncryptedData(\password_hash($value, PASSWORD_BCRYPT, $options));
        $this->encryptWorkflow->apply($encryptedData, EncryptedData::PROCESS_TRANSITION);

        return $encryptedData;
    }
}
