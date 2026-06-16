<?php

namespace App\MainBundle\DataFixtures;

use App\MainBundle\Entity\Data\Book;
use DateTimeImmutable;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\FixtureInterface;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\VarExporter\Hydrator;

class AppFixtures extends Fixture implements FixtureInterface
{
    /** @SuppressWarnings(PHPMD.StaticAccess) */
    public function load(ObjectManager $manager): void
    {
        $book = new Book();
        Hydrator::hydrate($book, [
            'isbn' => 1234567890,
            'title' => 'Sample Book',
            'description' => 'This is a sample book description.',
            'price' => 19.99,
            'publishedAt' => new DateTimeImmutable(),
        ]);
        $manager->persist($book);
    }
}
