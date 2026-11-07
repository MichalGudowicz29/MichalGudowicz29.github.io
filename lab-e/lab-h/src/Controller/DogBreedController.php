<?php

namespace App\Controller;

use App\Entity\DogBreed;
use App\Form\DogBreedType;
use App\Repository\DogBreedRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/dog/breed')]
final class DogBreedController extends AbstractController
{
    #[Route(name: 'app_dog_breed_index', methods: ['GET'])]
    public function index(DogBreedRepository $dogBreedRepository): Response
    {
        return $this->render('dog_breed/index.html.twig', [
            'dog_breeds' => $dogBreedRepository->findAll(),
        ]);
    }

    #[Route('/new', name: 'app_dog_breed_new', methods: ['GET', 'POST'])]
    public function new(Request $request, EntityManagerInterface $entityManager): Response
    {
        $dogBreed = new DogBreed();
        $form = $this->createForm(DogBreedType::class, $dogBreed);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->persist($dogBreed);
            $entityManager->flush();

            return $this->redirectToRoute('app_dog_breed_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->render('dog_breed/new.html.twig', [
            'dog_breed' => $dogBreed,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_dog_breed_show', methods: ['GET'])]
    public function show(DogBreed $dogBreed): Response
    {
        return $this->render('dog_breed/show.html.twig', [
            'dog_breed' => $dogBreed,
        ]);
    }

    #[Route('/{id}/edit', name: 'app_dog_breed_edit', methods: ['GET', 'POST'])]
    public function edit(Request $request, DogBreed $dogBreed, EntityManagerInterface $entityManager): Response
    {
        $form = $this->createForm(DogBreedType::class, $dogBreed);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->flush();

            return $this->redirectToRoute('app_dog_breed_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->render('dog_breed/edit.html.twig', [
            'dog_breed' => $dogBreed,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_dog_breed_delete', methods: ['POST'])]
    public function delete(Request $request, DogBreed $dogBreed, EntityManagerInterface $entityManager): Response
    {
        if ($this->isCsrfTokenValid('delete'.$dogBreed->getId(), $request->getPayload()->getString('_token'))) {
            $entityManager->remove($dogBreed);
            $entityManager->flush();
        }

        return $this->redirectToRoute('app_dog_breed_index', [], Response::HTTP_SEE_OTHER);
    }
}
