<?php

declare(strict_types=1);

namespace App\MainBundle\Manager\Data;

use Doctrine\DBAL\Result;
use Doctrine\ORM\EntityManagerInterface;

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
        $createTable = <<<R
            CREATE TABLE IF NOT EXISTS `my_table6` (
                `id` INT NOT NULL AUTO_INCREMENT,
                `name` VARCHAR(255) NOT NULL,
                PRIMARY KEY (`id`)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        R;
        $this->runQuery( $createTable);

        return [
            'create_table' => $this->runQuery('SELECT * FROM my_table6'),
        ];
    }

    private function runQuery(string $sql): Result
    {
        return $this->entityManager->getConnection()->executeQuery($sql);
    }
}
