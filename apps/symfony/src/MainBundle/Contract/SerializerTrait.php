<?php

namespace App\MainBundle\Contract;

use RuntimeException;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\Serializer;

trait SerializerTrait
{
    /** @param array<mixed> $data
     *  @param array<mixed> $context
     */
    private function deserialize(array $data, string $type, array $context = []): object
    {
        if (!$this->container->has('serializer')) {
            throw new RuntimeException('Serializer service not available.');
        }

        /** @var Serializer $serializer */
        $serializer = $this->container->get('serializer');

        return $serializer->deserialize(json_encode($data), $type, 'json', $context);
    }

    /**
     * @param array<mixed>         $context
     * @param array<string, mixed> $headers
     */
    private function createJsonResponse(mixed $data, int $status = JsonResponse::HTTP_OK, array $context = [], array $headers = []): JsonResponse
    {
        /** @var Serializer $serializer */
        $serializer = $this->container->get('serializer');
        $json = $serializer->serialize($data, 'json', $context);

        return new JsonResponse($json, $status, $headers, true);
    }

    /**
     * @param array<mixed>         $context
     * @param array<string, mixed> $headers
     */
    private function create400Response(mixed $data, array $context = [], array $headers = []): JsonResponse
    {
        return $this->createJsonResponse($data, JsonResponse::HTTP_BAD_REQUEST, $context, $headers);
    }

    /**
     * @param array<mixed>         $context
     * @param array<string, mixed> $headers
     */
    private function create404Response(mixed $data, array $context = [], array $headers = []): JsonResponse
    {
        return $this->createJsonResponse($data, JsonResponse::HTTP_NOT_FOUND, $context, $headers);
    }
}
