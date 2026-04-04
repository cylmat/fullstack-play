<?php

namespace App\MainBundle\Service\Encryption;

use App\MainBundle\Exception\Play\AlgorithmNotFoundException;
use Symfony\Component\Workflow\WorkflowInterface;

class EncryptionFactory
{
    public function __construct(
        private readonly WorkflowInterface $encryptWorkflow,
    ) {}

    public function create(string $algorithm): EncryptionInterface
    {
        return match (strtoupper($algorithm)) {
            HashAlgorithm::BCRYPT => new BcryptEncryption($this->encryptWorkflow),
            default => throw new AlgorithmNotFoundException()
        };
    }
}
