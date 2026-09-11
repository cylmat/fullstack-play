# TOOLS

Kube : kind, k3s, k3d
PlantUML, Mermaid CLI, Structurizr.
Diagrams.net


## Tips ##

Sur chaque nouvelle fonctionnalité importante : 
- Pour chaque skill, te demander : 
    - « Est‑ce que je le maîtrise déjà ? Oui / Non / Partiellement. » 
    - « Quel projet actuel peut servir de terrain de jeu pour l’améliorer ? »

- Dessine un **diagramme simple** (modules, flux de données, acteurs). 
- Liste les **pattern(s)** que tu utilises (service, repository, strategy, etc.)
- Documente tes décisions techniques : 
    - Pour chaque gros choix (lib, approche, structure), écris un court **ADR** (Architecture Decision Record) expliquant le contexte, la décision, les alternatives et les conséquences
- Commence à animer : 
    - **Revue d’architecture** avant le développement des grosses features. 
    - **Revue de code** en mettant l’accent sur la cohérence architecturale (séparation des responsabilités, découplage).
- Skills travaillés :
    - Design patterns
    - Principes SOLID/DRY/KISS
    - Communication technique et documentation.

Architectures backend :
- Étudier et appliquer : 
    - **DDD « light »** pour tes domaines métier :   
        - Identifier les bounded contexts (ex. : facturation, gestion utilisateurs, catalogue).   
        - Structurer ton code par domaine plutôt que par couche technique uniquement. 
    - **Architecture hexagonale** :   
        - Séparer le domaine (business logic) des adaptateurs (DB, HTTP, mail, etc.).   
        - Introduire des interfaces (ports) pour les services externes. 
        - (Optionnel) **CQRS** pour les parties où ça apporte un vrai plus (lecture très optimisée, écriture complexe)
    - Refactorer progressivement un projet existant pour : 
        - Clarifier les couches (controllers, services, repositories, domain). 
        - Réduire le couplage (moins de dépendances en cascade).

Architectures front :
- Structurer un projet React de manière exemplaire : 
    - Distinguer **composants « container »** (logique) et **composants « présentational »**. 
    - Choisir un **state management** clair (Redux, Zustand, etc.) et documenter la façon de l’utiliser. 
    - Mettre en place :    - Code splitting, lazy loading.    - Gestion centralisée des erreurs et des loaders.
- Skills travaillés :
    - DDD, hexagonal, CQRS (à niveau pragmatique)
    - Architecture de front moderne
    - Alignement front/back.

Responsable de la **robustesse globale** d’un système : rapide, sécurisé, testable, déployable.
- Sur un projet clé, fais un **audit de performance** : 
    - Identifie les requêtes SQL lourdes (profiling). 
    - Mets en place ou améliore :   
        - Caching applicatif (Doctrine, Redis).   
        - Caching HTTP (headers, reverse proxy)
        - Sur le front : 
            - Analyse le **bundle size** et mets en place :   
            - Code splitting.   
            - Chargement conditionnel de certaines parties.

- Passe en revue ton application selon une checklist type OWASP / CVE
    OWASP (Open Web Application Security Project) / CVE (Common Vulnerabilities and Exposures)
    - Auth, rôles, gestion des sessions/tokens. 
    - Validation des inputs partout. 
    - Protection contre XSS, CSRF, injections
    - Mets en place des **guidelines sécurité** pour ton équipe : 
        - Patterns de gestion des secrets. 
        - Usage standardisé des middlewares de sécurité.

- Structurer la stratégie de tests : 
    - S’assurer qu’il y a des **tests unitaires** pour les domaines critiques. 
    - Ajouter des **tests d’intégration** sur les flux métier clés. 
    - Mettre en place un **pipeline CI** qui lance les tests automatiquement
    - Introduire des outils : 
        - PHPStan/Psalm pour le backend. 
        - ESLint + tests Jest/Cypress pour le front.

- Comprendre et documenter : 
    - Comment l’application est **buildée, testée et déployée**. 
    - Quelles sont les dépendances (DB, cache, services externes)
    - Proposer, avec les DevOps /SRE ou l’équipe infra : 
        - Une architecture cible simple (2–3 services web, DB, cache, CDN). 
        - Les basiques de scaling (plusieurs instances backend, base de données adaptée).

Le DevOps accélère la livraison des logiciels, automatiser les déploiements via des pipelines CI/CD
SRE (Site Reliability Engineering) garantit la fiabilité des systèmes, utilise le code pour automatiser la gestion des infrastructures.

- Proposer un **cadre d’architecture** : 
    - Standards de design (patterns recommandés). 
    - Structure de projets (backend Symfony, front React). 
    - Guidelines sur tests, sécurité, performance
    - Devenir le référent pour : 
        - La **conception des nouveaux projets**. 
        - Les **choix de stack** et de libs. 
        - Les **revues d’architecture**.


## Étapes

Formaliser le rôle de concepteur

- Commence à traiter chaque nouvelle feature comme un **mini problème d’architecture** : 
- Rédiger un petit **diagramme** (modules, flux). 
- Choisir explicitement les **patterns** (ex. : strategy, observer, builder, ports & adapters). 
- Documenter tes décisions (même de manière légère)
- Propose à ton équipe : 
    - Des **design reviews** avant d’implémenter les grosses features. 
    - Des **refactorings guidés par des patterns** (par ex. découpler, introduire des interfaces, simplifier les dépendances).

Monter d’un cran sur les architectures modernes

- **DDD (Domain‑Driven Design)** :     
- Découpage par domaines, bounded contexts, agrégats, services de domaine.   
- **Architecture hexagonale** / « ports & adapters » :     
- Domaine au centre, périphériques (DB, API externes, UI) comme adaptateurs.   
- **Pattern CQRS** (si ça fait sens) :     
- Séparer commandes (écriture) et requêtes (lecture)

Ajouter une couche « système » (infra, perf, sécurité)

- **Performance et scalabilité applicative** : 
- Caching (HTTP, Redis, doctrine cache). 
- Conception de endpoints efficaces, pagination, batch processing
- Maîtriser les bonnes pratiques sécurité (OWASP, auth, gestion des sessions, injection, XSS)
- Comprendre Docker, kubernetes, le modèle de déploiement de ton app. 

Rapport à l’IA

- Garder une **culture IA** pour rester pertinent
- Savoir qu’on peut intégrer un LLM ou un service d’IA via API. 
- Comprendre à haut niveau ce qu’on peut faire (search, résumé, classification).
- Comprendre les besoins.  - Concevoir une architecture adaptée.  - Assurer la cohérence long terme du système.
