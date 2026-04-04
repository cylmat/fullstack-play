<?php

namespace App\MainBundle\Manager\Play;

use App\MainBundle\Model\Play\EncryptedData;
use App\MainBundle\Service\Encryption\EncryptionFactory;
use Symfony\Component\Workflow\WorkflowInterface;

final class EncryptManager
{
    public function __construct(
        private readonly EncryptionFactory $factory,
        private readonly WorkflowInterface $workflow,
    ) {}

    /** @param int[] $options */
    public function encryptValue(string $algo, string $value, array $options = []): EncryptedData
    {
        $encryptedData = $this->factory->create($algo)->encrypt($value, $options);
        $this->workflow->apply($encryptedData, EncryptedData::FINISH_TRANSITION);

        return $encryptedData;
    }
}
