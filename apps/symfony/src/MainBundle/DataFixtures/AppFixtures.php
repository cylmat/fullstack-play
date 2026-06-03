<?php

namespace App\MainBundle\DataFixtures;

use App\MainBundle\Entity\Data\Contact;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\FixtureInterface;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\VarExporter\Hydrator;

class AppFixtures extends Fixture implements FixtureInterface
{
    /** @SuppressWarnings(PHPMD.StaticAccess) */
    public function load(ObjectManager $manager): void
    {
        $contact = new Contact();
        Hydrator::hydrate($contact, [
            'function'  => 'officer',
            'service'   => 'data',
            'firstname' => 'John',
            'lastname'  => 'Doe',
            'email'     => 'john.doe@arobase.com',
            'mobile'    => '+33606060202',
            'phone'     => '+33102030405',
            'comment'   => 'comment',
        ]);
        $manager->persist($contact);
    }
}
