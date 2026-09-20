| Pattern | Utilisation dans Symfony | Exemple |
|---|---|---|
| **Abstract Factory** | Création de familles d’objets liés via des fabriques configurables | Factories de formulaires, fabriques de validateurs ou de services |
| **Builder** | Construction progressive d’objets complexes | `FormBuilder`, `QueryBuilder` de Doctrine, builders de requêtes HTTP |
| **Factory Method** | Délégation de la création d’objets à une méthode ou à un service | Création de réponses, de contrôleurs, de validateurs ou de normalizers |
| **Prototype** | Duplication d’objets existants | Utilisation occasionnelle de `clone`, notamment dans des objets de configuration ou des builders |
| **Singleton** | Services partagés du conteneur, mais de manière contrôlée | Un service Symfony est souvent partagé par défaut (`shared: true`) |



| Pattern | Utilisation dans Symfony | Exemple |
|---|---|---|
| **Adapter** | Adaptation d’une API vers une autre interface | Adaptateurs de cache, bridges Doctrine, adaptateurs de stockage |
| **Bridge** | Séparation entre une abstraction et son implémentation | Système de cache, composants HTTP, intégration avec différentes plateformes |
| **Composite** | Composition d’objets traités uniformément | Arbre de formulaires, contraintes de validation composées, arbres de configuration |
| **Decorator** | Ajout de comportements autour d’un service existant | Décorateurs de services, middleware, décorateurs de cache |
| **Facade** | Interface simplifiée devant un sous-système complexe | `HttpKernel`, `RequestStack`, certaines API haut niveau |
| **Flyweight** | Partage d’objets coûteux ou réutilisables | Métadonnées de validation, caches de configuration, descripteurs |
| **Proxy** | Objet intermédiaire contrôlant l’accès à un autre objet | Services lazy, proxies Doctrine, chargement différé |



| Pattern | Utilisation dans Symfony | Exemple |
|---|---|---|
| **Chain of Responsibility** | Traitement successif par plusieurs maillons | HttpKernel, middleware HTTP, chaîne de sécurité, normalizers |
| **Command** | Encapsulation d’une action dans un objet | Commandes Console, messages Messenger |
| **Interpreter** | Interprétation d’un langage ou d’expressions | `ExpressionLanguage`, expressions de sécurité |
| **Iterator** | Parcours uniforme de collections | `Iterator`, `Traversable`, itérateurs de Doctrine et des composants |
| **Mediator** | Centralisation de la communication entre objets | EventDispatcher, MessageBus, Messenger |
| **Memento** | Capture et restauration d’un état | Sessions, sauvegarde de configuration, historique dans certains composants |
| **Observer** | Notification d’objets lorsqu’un événement survient | EventDispatcher, événements du noyau, Doctrine |
| **State** | Modification du comportement selon un état interne | Workflow, états d’un token de sécurité, cycle de vie des objets |
| **Strategy** | Interchangeabilité d’algorithmes | Encodeurs, normalizers, transports Messenger, politiques de cache |
| **Template Method** | Structure algorithmique avec étapes spécialisables | Classes abstraites de commandes, loaders, extracteurs |
| **Visitor** | Opération appliquée à des éléments d’une structure | Traversée de métadonnées, visiteurs de configuration, AST et arbres de compilation |


Les patterns les plus importants dans Symfony

1. Dependency Injection
2. Event Dispatcher — Observer et Mediator
3. HttpKernel — Facade, Chain of Responsibility et Template Method
4. Conteneur de services — Factory, Proxy, Decorator et Strategy
5. Messenger — Command, Mediator et Chain of Responsibility, Strategy
6. Form component — Builder, Composite, Strategy et Observer, Decorator
7. Security — Strategy, Chain of Responsibility et State, Command
8. Workflow — State


