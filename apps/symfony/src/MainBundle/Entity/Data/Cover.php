<?php

namespace App\MainBundle\Entity\Data;

use App\MainBundle\Repository\Data\CoverRepository;
use Doctrine\ORM\Mapping as ORM;

/** @SuppressWarnings(PHPMD.ShortVariable) */
#[ORM\Entity(repositoryClass: CoverRepository::class)]
class Cover
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private int $id;

    #[ORM\OneToOne(targetEntity: Book::class, mappedBy: 'cover')]
    private Book $book;

    public function getId(): int
    {
        return $this->id;
    }

    public function getBook(): ?Book
    {
        return $this->book;
    }

    public function setBook(?Book $book): static
    {
        $this->book = $book;

        return $this;
    }
}
