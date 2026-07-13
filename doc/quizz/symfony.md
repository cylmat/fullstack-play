Symfony
=======

Quizz
-----

1. Quelle est la différence entre un service et un contrôleur dans Symfony ?
→ Un contrôleur gère les requêtes HTTP ; un service contient la logique réutilisable injectée dans les contrôleurs.

2. Qu’est-ce que l’injection de dépendance et comment Symfony la met-elle en œuvre ?
→ C’est le fait de fournir les dépendances d’une classe via le conteneur de services de Symfony.

3. À quoi sert le fichier services.yaml dans un projet Symfony ?
→ Définit les services et leur configuration (autowiring, visibilité, arguments…).

4. Expliquez la différence entre les annotations @Route et la configuration de routes via YAML ou PHP.
→ @Route est défini dans le code via annotations/attributs, YAML/PHP via fichiers de config. Même effet, syntaxe différente.

5. Que fait la commande php bin/console cache:clear ?
→ Vide et reconstruit le cache de Symfony (config, routes, conteneur…).

6. Quelle est la différence entre paramConverter et un service qui charge manuellement une entité ?
→ ParamConverter charge automatiquement les entités à partir des paramètres de route, un service le ferait manuellement.

7. Qu’est-ce que Doctrine dans Symfony et à quoi sert l’EntityManager ?
→ Doctrine est l’ORM de Symfony ; EntityManager gère les entités (persist, flush, remove…).

8. Différence entre persist() et flush() dans Doctrine ?
→ persist() prépare l’objet à être enregistré, flush() exécute les requêtes SQL.

9. Quelle est la différence entre une entité Symfony et un DTO (Data Transfer Object) ?
→ L’entité représente une table BD ; le DTO sert à transférer des données sans logique métier.

10. Qu’est-ce qu’un EventSubscriber dans Symfony ? Donnez un cas d’usage.
→ Écoute des événements du kernel ou Doctrine pour exécuter du code automatiquement (ex : logger, audit).

11. À quoi sert le fichier security.yaml ?
→ Configure l’authentification, les rôles, les firewalls et les règles d’accès.

12. Quelle est la différence entre un firewall et un access control dans Symfony ?
→ Le firewall gère la sécurité de la requête (authentification) ; l’access control gère les autorisations.

13. Comment fonctionne le système d’authentification via JWT dans un projet Symfony ?
→ Authentifie via un token signé transmis dans les headers sans session.

14. À quoi sert le composant Validator dans Symfony ?
→ Valide les données d’entités ou formulaires selon des contraintes (ex : NotBlank, Email).

15. Comment définir un middleware (EventListener) global dans Symfony ?
→ Listener sur kernel.request ou kernel.response pour intercepter toutes les requêtes/réponses.

16. Quelle est la différence entre un contrôleur API (JsonResponse) et un contrôleur classique (Response) ?
→ JsonResponse renvoie du JSON (API), Response renvoie du HTML ou texte classique.

17. Comment gérer les erreurs 404 ou 403 dans Symfony proprement ?
→ Gérer via ErrorController, templates error404.html.twig, ou événements ExceptionListener.

18. Quelles sont les bonnes pratiques pour paginer des résultats dans une API Symfony ?
→ Utiliser PaginatorInterface, Pagerfanta ou KnpPaginatorBundle, éviter de charger tout en mémoire.

19. Expliquez comment utiliser les environnements (.env, .env.local) dans Symfony.
→ .env global, .env.local pour machine locale, .env.prod pour la prod.

20. Quelle est la commande pour créer une migration et appliquer les changements de schéma en base ?
→ php bin/console make:migration puis php bin/console doctrine:migrations:migrate.

21. Quelle est la différence entre le hashage et le cryptage ?
→ Hashage = irréversible (password_hash()), cryptage = réversible (clé).

22. Que fait une requête HTTP de type PUT par rapport à POST ?
→ PUT remplace une ressource, POST crée une nouvelle ressource.

23. Quelle est la différence entre une API REST et une API GraphQL ?
→ REST = endpoints multiples ; GraphQL = une seule requête flexible avec schéma.

24. Expliquez le principe de fonctionnement d'un token JWT.
→ JSON Web Token signé contenant les infos utilisateur (header + payload + signature).

25. Quelle est la différence entre une base de données relationnelle et NoSQL ?
→ Relationnelle = tables et relations fixes ; NoSQL = documents ou clés/valeurs, plus flexible.

26. Que signifie l’acronyme ACID en base de données ?
→ Atomicité, Cohérence, Isolation, Durabilité : garanties des transactions.

27. À quoi sert un ORM (comme Sequelize ou TypeORM) ?
→ ORM = mapping objets ↔ tables ; Doctrine gère cela automatiquement.

28. Qu’est-ce qu’un Command Handler dans une architecture CQRS Symfony ?
→ Sépare les commandes (actions) de la logique de lecture (requêtes).

29. Quelle est la différence entre un Service Container et un Service Locator en PHP ?
→ Container = injection automatique ; Locator = récupération manuelle d’un service.

30. Qu’est-ce qu’un Trait en PHP et quand faut-il éviter de l’utiliser dans Symfony ?
→ Bloc de code réutilisable ; à éviter pour la logique métier complexe (favoriser services).

31. Quelle est la différence entre un bundle et un package Composer dans Symfony ?
→ Bundle = module intégré à Symfony ; Package = dépendance PHP installée via Composer.

32. Comment fonctionne le Kernel de Symfony et quel est son rôle principal ?
→ Point d’entrée de l’application ; initialise les bundles, services et traite les requêtes.

33. Qu’est-ce qu’un Controller Resolver et comment Symfony l’utilise-t-il pour exécuter les contrôleurs ?
→ Trouve et exécute le bon contrôleur pour une requête donnée.

34. Décrivez le cycle de vie d’une requête HTTP dans Symfony (Request → Response).
→ HTTP Request → Router → Controller → Response → HTTP Response.

35. Quelle est la différence entre un service public et un service privé dans le conteneur de services Symfony ?
→ Public = accessible partout ; Privé = uniquement injecté via autowiring.

36. Comment peut-on surcharger la configuration d’un bundle tiers dans Symfony ?
→ Placer la config personnalisée dans config/packages/nom_du_bundle.yaml.

37. Quelle est la différence entre les fichiers .env, .env.local, .env.test et .env.prod ?
→ Environnements distincts selon contexte (dev, test, prod).

38. À quoi sert le fichier bootstrap.php dans le dossier config/ d’un projet Symfony ?
→ Initialise l’autoload et prépare l’environnement avant le Kernel.

39. Comment configurer plusieurs Entity Managers ou connexions Doctrine dans Symfony ?
→ Déclarer plusieurs connexions Doctrine dans doctrine.yaml.

40. Comment définir un paramètre global dans Symfony et l’injecter dans un service ou un contrôleur ?
→ Déclaré dans services.yaml sous parameters: et injecté via le conteneur.

41. Comment mettre en place une relation ManyToMany et la gérer dans un formulaire Symfony ?
→ Définie via annotations @ManyToMany ; souvent gérée par une table de jointure.

42. Quelle est la différence entre les stratégies de chargement EAGER et LAZY dans Doctrine ?
→ EAGER = charge tout de suite ; LAZY = charge à la demande.

43. Quelles sont les bonnes pratiques pour optimiser les performances des requêtes Doctrine ?
→ Utiliser join fetch, indexation, cache, pagination, éviter les N+1.

44. Qu’est-ce qu’un Lifecycle Callback dans Doctrine et donnez un exemple d’utilisation ?
→ Méthodes exécutées automatiquement à certains moments (ex : @PrePersist).

45. Comment effectuer une requête personnalisée (DQL ou QueryBuilder) dans un repository Doctrine ?
→ Permet des requêtes personnalisées en orienté objet (createQueryBuilder()).

46. Quelle est la différence entre un voter et un access control dans Symfony ?
→ Voter = logique fine d’autorisation ; Access Control = règle globale dans security.yaml.

47. Comment créer un authentificateur personnalisé (Custom Authenticator) dans Symfony 7 ?
→ Classe qui gère manuellement la logique d’authentification (ex : JWT, API Key).

48. Quelle est la différence entre un UserProvider et un Authenticator dans le système de sécurité ?
→ UserProvider charge l’utilisateur ; Authenticator gère le processus de login.

49. Comment fonctionne la protection CSRF dans les formulaires Symfony ?
→ Token unique ajouté aux formulaires pour éviter les attaques intersites.

50. Comment gérer la régénération du token de session après une authentification réussie (pour éviter le session fixation) ?
→ Régénérer l’ID de session après login avec migrate() pour éviter le vol de session.
