<?php

declare(strict_types=1);

namespace App\MainBundle\Manager\Data;

use Doctrine\DBAL\Exception\ConnectionException;
use Doctrine\ORM\EntityManagerInterface;
use Throwable;

final class MysqlManager
{
    public function __construct(
        private readonly EntityManagerInterface $entityManager,
    ) {}

    public function getEntityManager(): EntityManagerInterface
    {
        return $this->entityManager;
    }

    /** @return mixed[] */
    public function getData(): array
    {
        try {
            $query = file_get_contents(__DIR__.'/Mysql.sql');
            $this->runQuery($query);

            return [
                'table6' => $this->runQuery('SELECT * FROM my_table6'),
                'black_hole' => $this->runQuery('SELECT * FROM my_black_hole'),
            ];
        } catch (ConnectionException) {
            return [
                '' => [['MySql not reachable.']],
            ];
        } catch (Throwable $e) {
            return [
                'error' => [[$e->getMessage()]],
            ];
        }

    }

    /** @return mixed[] */
    private function runQuery(string $sql): array
    {
        return $this->entityManager->getConnection()->executeQuery($sql)->fetchAllAssociative();
    }
}
