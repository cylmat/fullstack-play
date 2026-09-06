# AI Application Developer/ Integrations Engineer 

(intégration d’API OpenAI, Claude, etc. dans des apps web)



### A. Architecture & conception d’applications IA (LLM, RAG, etc.)

1. Comment définirais-tu la différence entre **un produit IA** et **une application classique qui utilise simplement une API d’IA** ?

2. Peux-tu décrire l’architecture d’une **application web** qui consomme des APIs LLM (OpenAI, Claude, etc.) : front, backend, orchestration des appels, persistance, monitoring ?

3. Comment conçois-tu une **API backend** qui expose des capacités IA à d’autres services internes, sans les laisser gérer directement les prompts et les détails du modèle ?

4. Comment gérerais-tu le **state de conversation** avec un LLM dans une application web multi-utilisateur (sessions, contexte, historique, stockage, confidentialité) ?

5. Comment décides-tu si une fonctionnalité IA doit être :  
   - un **assistant conversationnel**,  
   - une **fonction d’autocomplétion**,  
   - ou une **API “batch”** qui génère des résultats en arrière-plan ?

6. Quelles sont selon toi les **bonnes pratiques de design de flux utilisateur** pour une interface qui inclut de l’IA générative (réponse non déterministe, parfois erronée) ?

7. Décris une application IA que tu as réalisée de bout en bout (use case, stack, architecture, principaux challenges techniques).

8. Comment gères-tu la **distinction entre logique métier** et **logique IA** dans le code, pour éviter que tout soit mélangé dans des prompts et du glue code ?

9. Comment introduirais-tu une **fonctionnalité IA** (LLM, classification, recommandation) dans une application existante sans casser l’architecture ni les tests ?

10. Peux-tu expliquer comment tu aborderais la **migration d’une app IA monolithique** vers une architecture plus modulaire ou microservices (pour scalabilité, maintenabilité) ?

---

### B. Intégration d’APIs OpenAI, Claude, etc. (AI Integrations Engineer)

11. Peux-tu détailler ta manière d’intégrer une **API LLM (OpenAI, Claude, etc.)** dans un backend Node.js / Python / autre (gestion des clés, des erreurs, du temps de réponse) ?

12. Comment gères-tu la **rotation et la sécurisation des clés API** dans une application qui consomme plusieurs providers (OpenAI, Anthropic, etc.) ?

13. Explique comment tu mettrais en place une **abstraction de fournisseur d’IA** (interface commune) pour pouvoir changer facilement de provider sous le capot.

14. Comment gères-tu les **timeouts et la latence** lorsque tu fais des appels à des services IA externes dans une application web interactive ?

15. Quelle est ta stratégie pour **gestion des erreurs** (rate limiting, faillures réseau, réponses invalides) des APIs IA dans un service en production ?

16. Comment mettrais-tu en place un système de **retry avec backoff** pour les appels LLM, sans impacter négativement l’expérience utilisateur ?

17. Comment instrumentes-tu les appels aux APIs IA (logs, traces, métriques) pour pouvoir **débugger et optimiser** une app IA en production ?

18. Peux-tu expliquer comment tu adapterais une app existante pour fonctionner avec **plusieurs modèles / versions** (par ex. GPT‑4, GPT‑4.1, Claude 3, modèle open source) en parallèle ?

19. Comment gères-tu la **limitation de tokens** (input + output) côté backend et côté UX pour éviter les erreurs “context too long” ou les coûts imprévisibles ?

20. Peux-tu détailler comment tu construirais une **API interne “LLM Gateway”** que les autres équipes peuvent appeler, sans se soucier du provider réel derrière ?

---

### C. Développement d’applications IA / SDK / DevTools (Developer Automation / DevTools)

21. Quel type de **outils pour développeurs** as-tu déjà construit ou amélioré (CLI, SDK, plugins, extensions, linters, CI/CD) ?

22. Comment concevrais-tu un **SDK client** pour simplifier l’utilisation d’une API LLM (gestion des prompts, du streaming, des modèles, des erreurs) par d’autres devs ?

23. Comment mettrais-tu en place un système de **tests automatisés** pour une application qui utilise des LLM, sachant que les réponses ne sont pas déterministes ?

24. Peux-tu décrire comment tu automatiserais la **génération de code boilerplate** via l’IA (par ex. scaffolding de services, modèles, fichiers de config) pour accélérer les devs ?

25. Comment utiliserais-tu l’IA pour **améliorer la qualité du code** (refactoring, suggestions de tests, détection de smell) dans un pipeline DevTools / CI ?

26. As-tu déjà mis en place un **assistant IA pour développeurs** intégré dans l’IDE ou la pipeline (code completion, documentation, review) ? Comment ?

27. Comment aborderais-tu la conception d’un outil de **documentation auto-générée** (docs d’API, guides) basé sur l’IA, à partir du code et des commentaires existants ?

28. Comment garantis-tu la **répétabilité et la fiabilité** des outils IA destinés aux développeurs (éviter des suggestions aléatoires trop différentes d’une exécution à l’autre) ?

29. Peux-tu expliquer comment tu intégrerais un **assistant IA dans les outils CI/CD** (par ex. commentaire intelligent sur des PR, suggestion de fixes) ?

30. Comment structurerais-tu un projet DevTools qui expose à la fois :  
    - des **APIs IA**,  
    - des **plugins pour IDE**,  
    - et des **scripts CLI** pour les devs ?

---

### D. Données, RAG, contexte & persistance

31. As-tu déjà mis en place du **RAG (Retrieval-Augmented Generation)** ? Peux-tu expliquer l’architecture technique du pipeline (ingestion, index, retrieval, génération) ?

32. Comment choisirais-tu et intégrerais-tu un **moteur de vecteurs / base de données vectorielle** (par ex. Elasticsearch + vectors, Pinecone, Qdrant, pgvector, etc.) dans une app IA ?

33. Comment gères-tu la **mise à jour des données indexées** (documents, logs, knowledge base) pour un système RAG, sans impacter les performances ?

34. Comment structurerais-tu les **schemas de données** (documents, métadonnées, tags) pour maximiser la pertinence d’un système de recherche sémantique ?

35. Comment gères-tu la **confidentialité et la séparation des données** dans une app IA multi-tenant (chaque client a son propre contexte, docs, logs) ?

36. Peux-tu décrire comment tu mettrais en place une **journalisation des interactions avec l’IA** (requests, responses, erreurs, feedback) pour analytics et amélioration future ?

37. Comment gérerais-tu la **purge ou anonymisation** de certaines données sensibles qui ont été envoyées au LLM, pour respecter des contraintes de privacy / RGPD ?

38. Comment utiliserais-tu les **feedbacks utilisateur** (likes/dislikes, corrections, annotations) pour améliorer un système IA au fil du temps (approche “human in the loop”) ?

39. Peux-tu expliquer comment tu limiterais le **risque de fuite de données** internes via une app IA (prompt injection, context leaking entre utilisateurs) ?

40. Comment mettrais-tu en place un système d’**audit** (qui a fait quelle requête, quel résultat, quelles données étaient en contexte) pour une app IA utilisée en entreprise ?

---

### E. Performance, coût, sécurité & opérations

41. Comment gères-tu le **coût des appels IA** dans une application à fort trafic : monitoring, alertes, optimisation de prompts, mise en cache, limitation d’usage ?

42. Quels sont tes réflexes pour **optimiser la latence** d’une app IA : streaming de réponses, pré-calcul, batching, proximisation régionale, etc. ?

43. Peux-tu décrire une situation où tu as dû faire des **compromis entre qualité du modèle, latence et coût** pour une app IA en production ?

44. Comment t’y prends-tu pour **sécuriser une app IA** contre les attaques de type **prompt injection**, désactivation de garde-fous, outputs malveillants ?

45. Comment intègres-tu les **vérifications de sécurité** (authentification, autorisation, validation d’input/output) lorsqu’une app dépend fortement d’un provider externe (OpenAI, Claude…) ?

46. Comment mettrais-tu en place du **monitoring et des alertes** spécifiques aux fonctionnalités IA (drift de comportement, baisse de qualité perçue, augmentation des erreurs) ?

47. Peux-tu expliquer comment tu gères des **déploiements versionnés** de fonctionnalités IA (rollout progressif, canary, A/B test, rollback rapide) ?

48. Comment conçois-tu la **resilience** de ton système si le provider d’IA devient indisponible ou change brutalement de comportement (downgrade, réseau, politique) ?

49. Comment documenterais-tu pour les autres équipes (dev, ops, produit) la **stack IA** de l’application (modèles, endpoints, contrats, limites, risques) ?

50. Peux-tu décrire un **projet concret** où tu as joué le rôle de développeur d’applications IA / DevTools / intégrateur LLM : quelle était ta contribution, quels problèmes tu as résolus, et quelles leçons techniques tu en as tirées ?









Réponses


Voici des **réponses détaillées de niveau senior** pour les 50 questions “AI Application Developer / DevTools / AI Integrations Engineer”.  
Je réponds comme un candidat expérimenté qui a déjà livré plusieurs apps IA en production.

---

### A. Architecture & conception d’applications IA (LLM, RAG, etc.)

**1. Différence produit IA vs app classique qui utilise une API d’IA**

Pour moi, un **produit IA** est conçu autour d’une capacité d’IA comme élément central de la proposition de valeur, avec une architecture pensée pour le cycle de vie du modèle, la qualité des réponses, le feedback et la gouvernance.  
Une **app classique qui consomme une API IA** ajoute plus ponctuellement une fonctionnalité intelligente (auto‑complétion, résumé) sans que toute l’expérience, le monitoring, les données et la roadmap soient structurés autour de l’IA.  
En tant que dev, cela change beaucoup : dans un produit IA, je dois gérer **RAG, feedback loop, logs, métriques de qualité, drift**, alors que dans une app classique je peux parfois traiter l’IA comme un service externe “best effort”.

---

**2. Architecture d’une app web qui consomme des APIs LLM**

Typiquement, je sépare :

- **Front-end** (React/Vue/Svelte) qui gère l’UX : formulaire, streaming de réponse, affichage du contexte, indicateurs d’état (loading, erreurs).  
- **Backend** (Node.js, Python/FastAPI, etc.) qui :
  - centralise les appels vers les providers (OpenAI, Anthropic, etc.) via un module d’**orchestration LLM** ;
  - applique les contrôles de sécurité (auth, quota, validation input) ;
  - gère le **state de conversation** (context, historique) côté base de données ou cache (Redis, Postgres).  
- **Persistance** pour :
  - les logs des requêtes/réponses ;  
  - les profils utilisateurs ;  
  - le contexte long terme (RAG, documents).  
- **Monitoring/observability** : traces (OpenTelemetry), métriques (Prometheus), dashboard (Grafana) pour latence, coût, erreurs, usage.  

Cette architecture me permet de **changer le provider LLM, ajuster les prompts ou les modèles** sans toucher au front.

---

**3. Concevoir une API backend qui expose des capacités IA**

Je ne laisse pas les autres services jouer directement avec les prompts : je crée une **API métier**.  
Par exemple :

- Endpoint `POST /ai/summary` avec un contrat clair : input = texte + paramètres (niveau de détail, langue), output = résumé.  
- La logique IA (prompt, modèle, temperature, RAG éventuel) est encapsulée dans un service interne.  

L’avantage :

- les autres équipes consomment une **API stable, testée et documentée** ;  
- je peux faire évoluer la **stack IA (modèle, prompt, provider)** sans casser leurs intégrations ;  
- je peux ajouter du **monitoring et des garde‑fous** à cet endroit (validation input, filtres, logs).

---

**4. Gestion du state de conversation multi‑utilisateur**

Je distingue plusieurs niveaux de contexte :

- **Session client** (cookie, token, JWT) pour identifier l’utilisateur.  
- **State conversation** stocké côté backend :
  - soit dans une base type Redis (pour rapidité) ;  
  - soit dans une table SQL/NoSQL avec une clé `user_id + conversation_id`.  
- **Filtrage de l’historique** : je ne renvoie pas tout à chaque fois, je sélectionne les messages pertinents (fenêtre de contexte, résumé) pour contrôler le coût et les tokens.  
- **Confidentialité** :
  - chaque conversation est **scopée à l’utilisateur ou au tenant** ;  
  - aucune fuite de contexte entre utilisateurs ;  
  - les logs sont anonymisés ou pseudonymisés selon les contraintes.  

Ainsi, je peux gérer **chat multi‑user** sans collisions, avec une bonne maîtrise du contexte.

---

**5. Choisir entre assistant conversationnel, autocomplétion ou batch IA**

Je pars du **workflow utilisateur** :

- Si l’utilisateur a une tâche ouverte, exploratoire, multi‑étapes, je privilégie un **assistant conversationnel**.  
- Si l’utilisateur saisit du texte ou du code, et que l’IA doit juste compléter ou aider en temps réel, c’est une **autocomplétion** (type copilote).  
- Si la tâche est lourde, peut prendre du temps, ou doit être exécutée à heure fixe, je fais une **API batch** asynchrone (job en queue + notification).  

Techniquement, cela change :

- latence attendue ;  
- pattern de requêtes (streaming vs job queue) ;  
- manière de gérer le contexte ;  
- interfacer avec le reste du système (webhook, callbacks).

---

**6. Bonnes pratiques UX pour IA générative**

Quelques principes concrets :

- **Indiquer clairement qu’il s’agit d’IA**, et que les réponses peuvent être approximatives.  
- Donner du **contrôle à l’utilisateur** : paramètres (ton, longueur, langue), boutons “regénérer”, “affiner”.  
- Afficher la **source ou le contexte** (dans le cas du RAG) pour permettre la vérification.  
- Proposer des **suggestions de prompts** ou d’exemples pour guider l’usage.  
- Mettre en avant des **actions correctives** : signaler une mauvaise réponse, éditer le résultat, voir l’impact.  

En tant que dev, j’implémente des composants UI qui reflètent ces notions : états d’erreur, streaming, affichage des tokens restants, etc.

---

**7. Exemple d’application IA réalisée de bout en bout**

Un exemple : un **assistant de support client** intégré à une plateforme SaaS.

- **Stack** : React front, Node.js backend, Postgres pour les données, vecteurs dans pgvector, LLM OpenAI + Anthropic en backup.  
- **Fonctionnalités** :
  - réponse aux questions des utilisateurs à partir de la documentation ;  
  - classification automatique des tickets ;  
  - suggestions de réponse pour les agents.  
- **Challenges techniques** :
  - qualité du RAG (choix du chunking, embeddings, re‑ranking) ;  
  - latence vs coût (streaming pour les utilisateurs, pré-calcul pour les suggestions offline) ;  
  - robustesse aux prompt injections dans les tickets.  

J’ai conçu les **APIs internes**, l’**orchestrateur RAG** et la **pipeline d’ingestion de docs**, ainsi que le **monitoring** (latence, coût, satisfaction agent).

---

**8. Séparer logique métier et logique IA**

Je crée souvent deux couches :

- **Service métier** : gère les règles de business, les workflows, la validation, les statuts, la sécurité.  
- **Service IA** : gère les prompts, les appels aux modèles, la gestion du contexte, les conversions de formats (JSON, texte, etc.).  

Le code IA est dans un module dédié (`llm_service`, `rag_engine`), avec des interfaces claires.  
Les tests unitaires ne dépendent pas du LLM ; je simule la couche IA avec des **stubs** ou des fixtures.  
Ainsi, il est possible de **changer le modèle, la façon de prompt, ou même retirer l’IA** sans réécrire la logique métier.

---

**9. Introduire une fonctionnalité IA dans une app existante**

Je commence par :

1. Identifier un **point de friction** où l’IA apporte une valeur concrète (ex : génération de contenu, aide à la recherche).  
2. Ajouter une **API interne** qui encapsule la nouvelle fonctionnalité IA.  
3. Adapter le front/UX pour intégrer cette fonctionnalité de façon progressive (feature flag, beta).  

Niveau technique :

- j’ajoute des tests sur l’API IA (contrat, erreurs) ;  
- j’intègre le monitoring spécifique (latence, succès, feedback) ;  
- je garde la **fonctionnalité non‑IA en fallback** au début.  

Cela permet une **intégration progressive** sans casser l’existant.

---

**10. Migration d’une app IA monolithique vers microservices**

Je commence par isoler les domaines :

- **Service “LLM Gateway”** : toutes les interactions avec les LLM.  
- **Service “RAG / recherche”** : ingestion et index, requêtes vectorielles.  
- **Service “business”** : workflows métier, gestion des utilisateurs.  

Ensuite :

- j’extrais les portions du monolithe en services séparés, avec des **APIs bien définies** ;  
- j’installe un **gateway/API router** (Kong, NGINX, etc.) ;  
- je mets en place l’**observability distribuée** (traces, logs par service).  

Le but est de rendre le système **scalable et maintenable** : chaque service peut évoluer, être refactoré, ou changer de stack IA sans impact sur les autres.

---

### B. Intégration d’APIs OpenAI, Claude, etc. (AI Integrations Engineer)

**11. Intégration d’une API LLM dans un backend**

Dans un backend Node.js ou Python :

- Je crée un module `llm_client` qui :
  - gère la **configuration** (clé API, endpoint, modèle, paramètres par défaut) ;  
  - gère les **timeouts** et la **retries** ;  
  - expose des méthodes métier (`generate_summary`, `classify`, `chat`).  
- Je protège les clés via des **variables d’environnement**, un **vault** (HashiCorp Vault, AWS Secrets Manager), et jamais dans le code.  
- Je gère les erreurs :
  - type de failure (réseau, quota, invalid_request) ;  
  - traductions en erreurs HTTP propres ;  
  - log structuré pour l’analyse.  

Ensuite, j’intègre ce module dans mes handlers de routes, en restant attentif à la **latence** et au **coût**.

---

**12. Rotation et sécurisation des clés API**

Je traite les clés comme des secrets :

- Stockage dans un **secret manager** (AWS Secrets Manager, GCP Secret Manager, Vault).  
- Rotation régulière (cron + scripts) ; les services récupèrent toujours la **dernière version**.  
- Jamais dans le code, ni dans les logs, ni dans le front.  
- Éventuellement : **clé par environnement** (dev, staging, prod), et parfois **clé par tenant** si on facture à l’usage.  

Je mets des contrôles dans CI/CD pour **empêcher que des clés soient commit** dans le repo.

---

**13. Abstraction de fournisseur d’IA**

Je définis une interface commune, par exemple :

```ts
interface LlmProvider {
  generateText(prompt: string, options: GenerationOptions): Promise<GenerationResult>;
  chat(messages: ChatMessage[], options: ChatOptions): Promise<ChatResult>;
}
```

Ensuite :

- `OpenAiProvider` implémente cette interface ;  
- `AnthropicProvider` implémente la même interface ;  
- un `LlmRouter` sélectionne le provider selon la configuration (tenant, use case, coût).  

Ainsi, le reste du code ne dépend pas d’un provider spécifique, ce qui facilite les **tests, la migration, l’optimisation**.

---

**14. Gestion des timeouts et latence**

Pour une app interactive :

- Je configure des **timeouts raisonnables** (3–10s selon le use case) côté backend.  
- J’utilise le **streaming** quand c’est possible pour montrer la réponse au fur et à mesure.  
- J’ajuste les prompts et la **longueur de contexte** pour réduire la latence.  
- Si nécessaire, je déplace certaines tâches hors de la requête utilisateur en **jobs asynchrones** (queue + worker).  

Je logge la latence par endpoint et par modèle, afin de repérer les problèmes et de **choisir les modèles les plus efficaces**.

---

**15. Gestion des erreurs des APIs IA**

Je catégorise :

- **Errors fonctionnelles** : texte trop long, input invalide, etc. → réponse clair au client.  
- **Errors techniques** : réseau, timeout, service down → retry + fallback.  
- **Errors provider** (rate limit, quota dépassé) → mécanismes de **throttling** côté app, messages UX adaptés (“Veuillez réessayer plus tard”).  

Je mets en place :

- des **retry avec backoff** pour les erreurs transitoires ;  
- des **alertes** sur les taux d’erreur ;  
- un **mode dégradé** si l’IA est indisponible (fonctionnalité de base sans IA).

---

**16. Retry avec backoff**

J’utilise un pattern simple :

- Retry sur 2–3 tentatives max pour les erreurs réseau ou 5xx.  
- Backoff exponentiel (ex : 200ms, puis 1s, puis 3s).  
- Pas de retry sur les erreurs 4xx (input, quota).  

Je fais attention à ne pas bloquer l’utilisateur : si les retours sont trop longs, je renvoie une **réponse de fallback**, ou j’exécute la tâche en arrière‑plan.

---

**17. Instrumentation des appels IA**

Je logge systématiquement :

- `request_id` ;  
- type de modèle, paramètres ;  
- latence ;  
- taille input/output (tokens) ;  
- status (succès, erreur).  

Je mets ces infos dans des **dashboards** (Grafana, DataDog) pour voir :

- les spikes de latence ;  
- les taux de succès/erreur ;  
- la distribution des coûts.

Cela me permet de **débugger** et d’optimiser, par exemple en changeant de modèle ou en ajustant les prompts.

---

**18. Support de plusieurs modèles / versions**

Je introduis la notion de **“policy de modèle”** :

- Pour un use case donné (ex : résumé long), j’ai une configuration qui dit :
  - modèle primaire (GPT‑4.1) ;  
  - modèle fallback (GPT‑4 Turbo, Claude 3 Sonnet).  

Mes APIs prennent un paramètre `model` ou `policy` ; je peux :

- tester de nouveaux modèles sur une fraction du trafic (canary, A/B) ;  
- migrer petit à petit ;  
- garder des fallback en cas de problème.

---

**19. Limitation de tokens**

Côté backend :

- Je calcule la longueur du prompt et du contexte avant l’appel.  
- Je tronque ou résume quand le contexte est trop long.  
- Je fixe une **max_tokens** de sortie adaptée au use case.  

Côté UX :

- j’indique les limites (ex : “Textes jusqu’à ~5 pages”) ;  
- j’empêche de coller des textes gigantesques sans avertissement.  

Cela évite les erreurs `context_length_exceeded` et les coûts imprévisibles.

---

**20. API interne “LLM Gateway”**

Je crée un service **gateway** avec :

- endpoints de haut niveau (`/chat`, `/summarize`, `/classify`) ;  
- gestion des credentials, des providers, des quotas ;  
- logs, métriques, policies de modèle.  

Les équipes internes appellent cette gateway, pas directement OpenAI ou Anthropic.  
Le bénéfice est majeur : **centralisation de la sécurité, du monitoring et des coûts**.

---

### C. Dev d’apps IA / SDK / DevTools (Developer Automation / DevTools)

**21. Outils développeurs déjà construits**

J’ai déjà construit :

- des **CLI** pour lancer des jobs IA (indexation, génération de docs) ;  
- des **SDKs** JS/Python pour simplifier l’appel aux APIs IA ;  
- des **plugins d’IDE** pour intégration d’un assistant IA dans VS Code ;  
- des **scripts d’automatisation** pour l’ingestion de données, la génération de tests.  

Je fais attention à :

- la simplicité de l’API ;  
- les bonnes erreurs et messages pour les devs ;  
- une documentation claire et des exemples.

---

**22. Concevoir un SDK client pour une API LLM**

Je propose une API naturelle, par ex. en TypeScript :

```ts
const client = new AiClient({ apiKey: process.env.AI_KEY });

const result = await client.generate({
  prompt: "Write a summary",
  model: "gpt-4.1",
  temperature: 0.2,
});
```

Le SDK gère :

- des **defaults sensés** ;  
- le **streaming** via callbacks ou async iterators ;  
- la **gestion des erreurs** (exceptions typées) ;  
- la **configuration par environnement**.

Je fournis aussi :

- des **helpers** pour les patterns courants (chat, RAG, classification) ;  
- des exemples intégrés (sample code, boilerplate).

---

**23. Tests automatisés pour applis LLM non déterministes**

Je teste :

- le **contrat d’API** (structure des réponses, codes d’erreurs) ;  
- les **règles métier** autour de l’IA ;  
- des cas typiques avec des **assertions floues** (ex : la réponse doit contenir certains mots‑clés, ou respecter un format JSON).  

Pour les tests de prompts :

- j’utilise des **snapshots** sur des environnements stabilisés ;  
- je tolère une certaine variabilité ;  
- je peux fixer la **temperature** à 0 lors des tests pour réduire la non‑déterminisme.

---

**24. Génération de boilerplate via IA**

Je crée des scripts ou CLI qui :

- prennent des inputs (nom du service, entités, modèles) ;  
- appellent un LLM avec un prompt structuré ;  
- génèrent des fichiers (controller, service, tests, docs).  

Je coupl[...]sensible**,  
- valider les outputs ;  
- éviter d’exposer des données confidentielles dans les prompts.

---

**50. Projet concret IA / DevTools / intégration LLM**

Par exemple, j’ai réalisé :

- Un **assistant de support** et **DevTools** associés (SDK interne, CLI d’ingestion, plugin VS Code pour les devs support).  
- J’ai conçu :
  - l’architecture RAG ;  
  - les APIs internes ;  
  - le SDK pour que d’autres équipes puissent appeler les fonctions IA ;  
  - les outils d’ingestion des docs dans la base vectorielle.  
- J’ai géré :
  - l’intégration d’OpenAI et Claude via une abstraction commune ;  
  - la mise en place du monitoring (latence, coût, taux de succès) ;  
  - les questions de sécurité (multi‑tenant, prompt injection, logs).  

Les principales leçons techniques :

- **Ne jamais coller toute la base de données dans le prompt** : structurer le RAG.  
- **Toujours centraliser les appels aux LLM** via un gateway.  
- **Traiter l’IA comme une dépendance instable** : prévoir des fallbacks, du monitoring, et des outils internes pour ajuster prompts et modèles rapidement.

