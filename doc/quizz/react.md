React
=====

- Composants et Hooks React
- Gestion d’état et Props
- Performance et Optimisation
- React avancé et fonctionnalités
- JavaScript/Typescript fondamentaux
- DOM et Web
- Architecture et Concepts Web
- Sécurité et Meilleures Pratiques

Quizz
-----

1. Quelle est la différence entre un composant fonctionnel et un composant de classe en React ?
Les composants fonctionnels utilisent des hooks, les composants de classe utilisent this et les méthodes du cycle de vie.

2. À quoi sert le hook useState ? Donnez un exemple.
Il permet de gérer un état local dans un composant fonctionnel.

3. Quelle est la différence entre useEffect avec et sans tableau de dépendances ?
Avec [], il s’exécute une fois au montage ; sans tableau, à chaque rendu.

4. Pourquoi utilise-t-on key dans une boucle .map() qui rend une liste de composants ?
Pour aider React à identifier chaque élément et optimiser le rendu.

5. Qu’est-ce que le Virtual DOM et pourquoi est-il utile ?
C’est une copie virtuelle du DOM en mémoire utilisée pour des mises à jour rapides.

6. Expliquez la notion de lifting state up en React.
Remonter l’état dans un composant parent pour le partager entre plusieurs enfants.

7. À quoi sert le hook useContext ? Donnez un exemple d’usage.
Il permet de partager un état global sans passer les props manuellement.

8. Quelle est la différence entre props et state ?
props sont des données reçues par un composant, state est son état interne.

9. Quand utiliser useMemo ou useCallback ?
Pour mémoriser une valeur ou une fonction et éviter des recalculs/rendus inutiles.

10. Qu’est-ce qu’un controlled component dans un formulaire React ?
Un composant dont la valeur est contrôlée via le state React.

11. Quelle est la différence entre Redux, Context API et useState pour gérer l’état ?
useState est local, Context API gère un état global simple, Redux un état global complexe.

12. Expliquez comment fonctionne la propagation d'événements (event bubbling) dans React.
L’événement remonte du composant enfant vers les parents dans la hiérarchie DOM.

13. Quelle est la différence entre React.memo et useMemo ?
React.memo évite le rerendu d’un composant ; useMemo mémorise une valeur.

14. Qu’est-ce que le code splitting et comment l’implémenter avec React ?
Diviser le code en morceaux chargés à la demande avec React.lazy() et Suspense.

15. Comment éviter les rendus inutiles d’un composant ?
Utiliser React.memo, useMemo et useCallback pour optimiser.

16. Comment fonctionne le routing avec react-router-dom ?
Il utilise des composants <Route> et <BrowserRouter> pour gérer la navigation.

17. Quelle est la différence entre useEffect(() => {}, []) et useEffect(() => {}) ?
Le premier s’exécute une fois au montage, le second à chaque rendu.

18. Quelle est la différence entre useRef et useState ?
useRef ne déclenche pas de rendu quand sa valeur change, useState oui.

19. Comment faire un appel API dans React de manière propre et gérer les erreurs ?
Utiliser useEffect avec async/await et gérer les états de chargement et d’erreur.

20. Quels sont les risques de sécurité courants dans React (ex : XSS) et comment les prévenir ?
XSS via contenu non échappé, éviter dangerouslySetInnerHTML ou bien nettoyer les données.

21. Quelle est la différence entre le DOM et le Virtual DOM ?
Le Virtual DOM est une représentation en mémoire du vrai DOM utilisée par React.

22. Pourquoi utilise-t-on useEffect dans React ?
Pour gérer les effets secondaires comme appels API, timers, ou listeners.

23. Quelle est la différence entre localStorage, sessionStorage et les cookies ?
localStorage est persistant, sessionStorage dure une session, cookies peuvent être lus par le serveur.

24. Expliquez le concept de Single Page Application (SPA).
Application web chargée en une seule page qui met à jour dynamiquement le contenu sans recharger.

25. Quelle est la différence entre var, let et const en JavaScript ?
var a une portée fonction, let et const ont une portée bloc ; const est une constante.

26. Qu’est-ce qu’une closure en JavaScript ? Donnez un exemple simple.
Une fonction qui garde accès à son contexte lexical même après son exécution.

27. Quelle est la différence entre == et === ?
== compare après conversion de type, === compare type et valeur strictement.

28. Qu’est-ce que l’immutabilité et pourquoi est-elle importante en React ?
Ne pas modifier directement l’état mais créer une copie pour que React détecte les changements.

29. Quelle est la différence entre le rendu côté client (CSR) et le rendu côté serveur (SSR) ?
CSR exécute le JS dans le navigateur, SSR génère HTML côté serveur.

30. Qu’est-ce que le hook useReducer et quand l’utiliser ?
Alternative à useState pour gérer des états complexes ou avec logique métier.

31. Qu’est-ce qu’un custom hook et pourquoi en créer ?
Une fonction qui combine des hooks pour réutiliser une logique.

32. Quelle est la différence entre les hooks useLayoutEffect et useEffect ?
useLayoutEffect s’exécute synchroniquement avant le rendu visuel, useEffect après.

33. Qu’est-ce que React.StrictMode et à quoi sert-il ?
Mode de développement qui détecte des erreurs et comportements dépréciés.

34. Comment fonctionne la réconciliation (reconciliation) dans React ?
React compare l’ancien et le nouveau Virtual DOM pour mettre à jour uniquement ce qui change.

35. Quelle est la différence entre composant pur et composant classique ?
Un composant pur ne se rerend que si ses props changent (via React.memo).

36. Qu’est-ce que la déstructuration (destructuring) en JavaScript ?
Extraire les valeurs d’un objet ou tableau dans des variables.

37. Quelle est la différence entre map(), forEach() et filter() ?
map() retourne un nouveau tableau, forEach() itère sans retour, filter() filtre un tableau.

38. Qu’est-ce que le typage strict en TypeScript ?
Empêche d’utiliser des types incompatibles à la compilation.

39. Quelle est la différence entre interface et type en TypeScript ?
Interface est extensible, type est plus flexible (union, intersection).

40. Qu’est-ce qu’un Generic en TypeScript ?
Type paramétrable qui s’adapte à différents types (ex: Array<T>).

41. Quelle est la différence entre any, unknown, et never en TypeScript ?
any accepte tout, unknown est un type sûr inconnu, never signifie code inatteignable.

42. Comment déclarer un type pour les props d’un composant React en TypeScript ?
Avec interface Props {} ou type Props = {} et l’annotation <Component props={...} />.

43. Qu’est-ce que JSX et comment est-il transformé ?
Syntaxe qui mélange JS et HTML, transformée en appels React.createElement().

44. Quelle est la différence entre les composants contrôlés et non contrôlés dans un formulaire React ?
Contrôlé : valeur liée au state React, non contrôlé : valeur gérée par le DOM.

45. Qu’est-ce que le hook useImperativeHandle et dans quel cas l’utiliser ?
Permet à un parent d’exposer des méthodes personnalisées via ref à un enfant.

46. Quelle est la différence entre useRef et la référence créée avec React.createRef() ?
useRef persiste entre rendus, createRef() crée une nouvelle ref à chaque rendu.

47. Qu’est-ce que le suspense en React et à quoi sert-il ?
Gère le chargement asynchrone de composants avec React.lazy().

48. Qu’est-ce qu’un portail (portal) en React ?
Rend un composant dans un DOM en dehors de la hiérarchie parente.

49. Quelle est la différence entre un composant "presentational" et un composant "container" ?
Presentational affiche, container gère la logique et les données.

50. Quelle est la différence entre le rendu côté serveur (Next.js) et le rendu statique (Static Generation) ?
SSR génère la page à chaque requête, Static Generation génère au build-time.
