<?php

// use ramsey/uuid

namespace App\MainBundle\DataFixtures;

use App\MainBundle\Manager\Data\MysqlManager;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\FixtureInterface;
use Doctrine\Persistence\ObjectManager;

class MysqlFixtures extends Fixture implements FixtureInterface
{
    public function __construct(
        private readonly MysqlManager $mysqlManager,
    ) {}

    protected function setUp(): void
    {
        $this->execQueries();
    }

    // Warning !
    // FIXTURES LOAD IMPLICITE CREATE TRANSACTION //
    // Warning !
    // Solution : Set it outside of "load" Bundle method, for example in "setUp" method
    /*
    doctrine:fixtures:load
        └─ Doctrine Fixtures Bundle starts a transaction
        └─ Your fixture executes DROP TABLE / CREATE TABLE
            └─ MySQL implicitly commits the transaction
        └─ Fixtures Bundle tries to commit
            └─ "There is no active transaction"
    */

    /** @SuppressWarnings(PHPMD.UnusedFormalParameter) */
    public function load(ObjectManager $manager): void
    {
    }

    public function execQueries(): void
    {
        $connection = $this->mysqlManager->getEntityManager()->getConnection();

        $query = <<<R
            CREATE TABLE IF NOT EXISTS `fixtures` (
                `id` INT NOT NULL AUTO_INCREMENT,
                PRIMARY KEY (`id`)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        R;

        $connection->executeQuery($query);
    }
}
