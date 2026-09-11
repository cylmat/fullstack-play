# Roadmap Architect

- « Conception et mise en œuvre d’architectures pour sites web / applications SaaS ».  
- « Encadrement technique de l’équipe (code reviews, design reviews) ».  
- « Mise en place de standards de qualité, sécurité et performance. »
- **Architecte logiciel web / Architecte applicatif**.  
- **Tech Lead / Lead Developer Full‑Stack Symfony/React** avec composante architecture.
- Leadership technique, Communication vers les métiers et la direction, Prise de décision stratégique (choix d’architecture).
- « Conception d’architecture pour [type d’appli] », « Encadrement technique de l’équipe dev ».    
- « Transformation de besoins métiers en solutions techniques complètes ».

---

- Partir d’un besoin métier (une idée d’application, un problème business)
- Le traduire en : 
    - **Architecture globale** (modules, services, flux de données, responsabilités).  
    - **Design patterns** adaptés (DDD, CQRS, hexagonal, event‑driven, etc.)
    - Choisir les technos (dont **Symfony, React**) et les intégrer intelligemment
    - Encadrer la réalisation :  
        - Faire des revues de code et de conception.  
        - Assurer la qualité, la performance, la sécurité.  
        - Travailler avec les PO / métiers pour ajuster.

- Savoir **concevoir un système** complet
- Savoir **justifier tes choix** (pourquoi tel pattern, telle séparation de responsabilités, etc.)
- Savoir **faire évoluer** l’architecture quand les exigences changent.

- Comptétences sur :
  - **Patterns d’architecture** (microservices, event‑driven, hexagonal, CQRS, etc.)  
  - **Scalabilité, résilience**, observabilité  
  - Choix de stack et **trade‑offs** (monolithes vs microservices, SQL vs NoSQL, etc.)
- Approfondir :
  - **Cloud public** (AWS/GCP/Azure) – IAM, réseau, services managés  
  - **Infrastructure as code** (Terraform, Ansible)  
  - **CI/CD** moderne, observabilité (Prometheus, Grafana, OpenTelemetry)  
- Rôles possibles :
    - **Site Reliability Engineer (SRE)**  
    - **Platform engineer / DevOps senior**  

**Tools**

- Mermaid, modèle C4 (Contexte, Conteneurs , Composants , Code), PlantUML, likec4, asciidoc
- diagrams.net,  Lucidchart, Miro, visual-paradigm
- structurizr.com-dsl (domain specific language)

## Roadmap

A. Fondamentaux d’architecture logicielle
- Principes de conception**  - SOLID, DRY, KISS, YAGNI. , Couplage vs cohésion, séparation des responsabilités
- Design patterns  
    - Patterns orientés objet : strategy, observer, factory, builder, adapter, decorator, facade, singleton (à manier avec précaution)
    - Patterns de structuration : MVC, layered architecture,, repository, service, command, event 

- Architectures modernes de backend
    - Monolithe structuré vs microservices.  
    - Architecture hexagonale.  
    - CQRS (Command Query Responsibility Segregation). 
    - Event‑driven (events de domaine, messaging).

B. Architecture de systèmes web
- Front web (React), backend (API Symfony), base de données, cache, fichiers statiques, services externes (paiement, mail, etc.)
- API et communication entre services
- REST bien conçu (ressources, verbes HTTP, statuts).  
- JSON, pagination, filtres, tri, versionning d’API.  
- (Optionnel mais utile) notions de GraphQL
- Gestion de l’état et des données**  
- Modélisation de données relationnelles (SQL), normalisation, indexes.  
- Mapping objet‑relationnel (ORM : Doctrine).  
- Transactions, cohérence, gestion des migrations.

C. Web front‑end architecturé
- Organisation des composants (smart/dumb components).  - State management (Redux, Zustand, Context API, etc.).  - Routing, lazy‑loading, code splitting
- Dossier structure, séparation logique / présentational. 
 - Gestion des formulaires, validation, error handling.

D. Performance et scalabilité
- Caching (HTTP, Redis, cache applicatif).  
- Optimisation SQL (indexes, requêtes, N+1).  
- Async / background jobs (queues, workers)
- Optimisation bundle (tree‑shaking dead code, code splitting).   (Webpack, Rollup, or Parcel)
- Minimisation des requêtes réseau, usage approprié du cache navigateur
- Stateless services, possibilité de scaling horizontal.  
- Connaître les bottlenecks classiques (DB, IO, CPU, réseau).

E. Sécurité applicative
- Authentification, autorisation, gestion de sessions et tokens (JWT).  
- Chiffrement des données sensibles, transport sécurisé (HTTPS)
- Injection (SQL, command, etc.).  
- XSS, CSRF, clickjacking.  
- Mauvaise gestion des erreurs / logs
- Validation des entrées.  
- Principe de moindre privilège. 
 - Gestion des secrets (env vars, vaults).

F. Qualité, maintenabilité et tests
- Tests unitaires (PHPUnit, Jest). 
- Tests d’intégration et/ou end‑to‑end (Behat, Cypress).
- Savoir détecter et réduire la dette.  
- Refactorer guidé par les patterns et par les tests
- Linters, formatters, analyse statique (PHPStan, Psalm, ESLint).  
- Coverage de tests, revues de code systématiques.

G. Infrastructure web (niveau architecte, pas forcément ops)
- Docker (conteneurs), configuration de base. 
- CI/CD : pipeline simple (tests + build + deploy)
- Dev / staging / prod, gestion des configs
- Comprendre les grands services (compute, DB, storage, cache).  
- Savoir discuter avec un DevOps / SRE pour choisir l’architecture de déploiement.

H. Conception fonctionnelle et métier
- Recueillir et clarifier les besoins métier (user stories, use cases).  
- Identifier les domaines fonctionnels (ex. : comptes, facturation, catalogue, etc.)
- Bounded contexts, langage ubiquitaire.  
- Entités, value objects, agrégats, services de domaine
- Comprendre les flows utilisateurs. 
 - Savoir aligner les choix techniques avec les objectifs produits.

I. Soft skills d’architecte
- Expliquer simplement des architectures à des non‑tech.  
- Faire des documents d’architecture compréhensibles (diagrams, ADR)
- Encadrer techniquement des devs.  
- Animer des design reviews
- Comparer des options (monolithe vs microservices, SQL vs NoSQL, etc.).  
- Justifier les choix (coût, performance, team skills, délais).
