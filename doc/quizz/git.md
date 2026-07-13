Git
===

- Branching strategies (Git Flow, Trunk Based Development)
- Rebasing vs merging
- History manipulation (rebase, cherry-pick, filter-branch, filter-repo)

Quizz
-----

1. Expliquez la différence entre git merge et git rebase. Quand préférez-vous l'un à l'autre ?
→ git merge crée un commit de merge et préserve l'historique véritable des branches ; git rebase réécrit l'historique en appliquant les commits sur un nouveau parent. Utilisez rebase pour un historique linéaire propre (feature branches avant merge vers main), et merge pour préserver le contexte des merges (ex: release branches, travail collaboratif où l'on veut voir les points de convergence).

2. Qu'est-ce qu'un "fast-forward" merge ? Comment forcer la création d'un commit de merge même si un fast-forward est possible ?
→ Fast-forward déplace le pointeur de la branche vers le commit cible sans créer de merge commit. Pour forcer un commit de merge : git merge --no-ff <branch>.

3. Décrivez git cherry-pick et donnez un cas où vous l'utiliseriez.
→ Applique un commit spécifique d'une branche sur une autre. Utile pour backporter un correctif isolé vers une branche de maintenance.

4. Que fait git reflog et quand est-il utile ?
→ Enregistre les mouvements des pointeurs (HEAD, branches) localement. Utile pour récupérer des commits perdus après un reset ou un rebase.

5. Comment récupérer un commit supprimé par erreur (par exemple après git reset --hard) ?
→ Utiliser git reflog pour retrouver l'ID du commit puis git checkout -b recover <commit> ou git reset --hard <commit>.

6. Expliquez git bisect et donnez un exemple de flux pour trouver un commit fautif.
→ Binaire recherche entre un commit bon et un commit mauvais : git bisect start; git bisect bad <bad>; git bisect good <good>; tester et marquer good/bad jusqu'à trouver le commit fautif.

7. Qu'est-ce que --interactive rebase (git rebase -i) et que permet-il de faire ?
→ Permet de réordonner, fusionner (squash/fixup), éditer, supprimer ou diviser des commits avant de réécrire l'historique.

8. Quand ne faut-il jamais réécrire l'historique (rebase, filter-branch) ? Pourquoi ?
→ Ne jamais réécrire l'historique partagé (commits déjà poussés et utilisés par d'autres) car cela nécessite des pushes forcés et crée des divergences pour les collaborateurs.

9. Expliquez git subtree vs git submodule. Quand préférez-vous l'un ou l'autre ?
→ Submodule lie un dépôt externe en tant que référence (séparé, commit pointer) ; subtree intègre l'historique du sous-dépôt dans le dépôt parent. Submodules conviennent quand on veut garder les dépôts séparés ; subtree quand on veut empaqueter le code et simplifier le workflow sans dépendre des étapes d'initialisation de submodule.

10. Comment configurer git pour signer les commits et tags et pourquoi le faire ?
→ Configurer GPG or SSH keys (git config --global user.signingkey <key>; git config --global commit.gpgSign true) et signer tags (git tag -s). Cela prouve l'authenticité des commits et améliore la sécurité.

11. Décrivez comment gérer les secrets dans un dépôt Git. Quelles sont les bonnes pratiques ?
→ Ne pas committer de secrets ; utiliser des variables d'environnement, Vault, git-crypt, git-secret, ou stocker dans des systèmes secrets. Utiliser des scanners (truffleHog, git-secrets) en CI pour détecter les fuites.

12. Qu'est-ce que Git LFS et quand l'utiliser ?
→ Git Large File Storage stocke des fichiers volumineux en dehors du dépôt (référencés par des pointeurs). Utiliser pour binaires/ médias lourds que l'on ne veut pas versionner bruts.

13. Expliquez comment configurer une branche protégée dans GitHub/GitLab et quelle politique appliquer pour la CI et les approbations.
→ Protéger la branche empêche les pushes directs, exige des PR/MR, active les checks de CI obligatoires, requiert approbations, et peut exiger des commits signés. Politique : tests verts, revue obligatoire, pas de force-push, pas d'auto-merge sans approbation.

14. Comment éviter les conflits fréquents sur un fichier binaire partagé (ex: fichier de design) ?
→ Éviter versionner fréquemment ces fichiers, utiliser un stockage externe, verrouillage de fichier (Git LFS file locks), ou workflow centralisé qui sérialise les modifications.

15. Décrivez un flux Git Flow vs Trunk Based Development. Avantages et inconvénients.
→ Git Flow : branches feature/release/hotfix, releases planifiées, bon pour équipes avec cycles de release ; plus complexe. Trunk Based : petites features intégrées rapidement sur main, moins de branches, favorise CI/CD et déploiements fréquents ; nécessite des feature toggles pour code incomplet.

16. Quelle est la commande pour supprimer une branche locale et une branche distante ?
→ Locale : git branch -d <branch> (ou -D pour forcer). Distante : git push origin --delete <branch>.

17. Expliquez git stash et comment retrouver un stash perdu.
→ Sauvegarde temporaire des modifications non commit. git stash list, git stash apply, git stash pop. Retrouver un stash perdu via git fsck --unreachable ou reflog des refs/stash.

18. Qu'est-ce que git blame et comment l'utiliser prudemment ?
→ Montre l'auteur et le commit pour chaque ligne d'un fichier. Utile pour traquer l'origine d'un changement, mais attention à l'usage accusatoire ; préférer contexte et revue.

19. Comment faire un push forcé sécurisé pour corriger un historique (et informer l'équipe) ?
→ Préférer git push --force-with-lease pour éviter d'écraser les commits nouveaux sur le serveur ; communiquer ensuite (Slack/PR) et demander aux collègues de rebase/mettre à jour.

20. Décrivez le rôle de .gitignore et .gitattributes. Donnez des exemples d'usage avancé.
→ .gitignore exclut fichiers du suivi ; .gitattributes règle la gestion de fichiers (e.g. text=auto, eol normalization, diff drivers, merge=ours, export-ignore) et configure LFS et attributs de fusion.

21. Comment configurez-vous des stratégies de merge automatiques pour certains fichiers (ex: générés) ?
→ Utiliser .gitattributes pour définir merge=ours et configurer un driver de merge personnalisé pour ignorer les conflits sur les fichiers générés.

22. Expliquez la différence entre origin/main et upstream/main quand on travaille avec un fork.
→ origin = votre fork's remote ; upstream = dépôt source d'origine. On fetch/pull depuis upstream puis push vers origin.

23. Quelles commandes utilisez-vous pour optimiser un dépôt avec beaucoup d'objets inutiles (compaction) ?
→ git gc --prune=now --aggressive; git repack; et pour nettoyage historique: git filter-repo pour remplacer/supprimer gros fichiers.

24. Décrivez git filter-repo (ou filter-branch) et quand l'utiliser.
→ Outil moderne (filter-repo) pour réécrire l'historique (supprimer fichiers, réécrire auteurs). Utile pour purge de secrets ou réduction du dépôt. Toujours communiquer et forcer push sur branches affectées.

25. Comment gérer les hooks Git côté serveur et côté client ? Donnez des exemples pratiques.
→ Côté client : .git/hooks (pre-commit, commit-msg) ou utiliser pre-commit framework. Côté serveur : GitLab/GitHub offre webhooks, server-side hooks sur le repo (pre-receive, update) pour valider politiques (no secrets, tests, conventions). Exemple : pre-commit lint, commit-msg vérifier le format des messages.

26. Expliquer la notion de "detached HEAD" et comment y revenir à un état normal.
→ HEAD pointant sur un commit plutôt que sur une branche. Pour revenir : git checkout -b <branch> ou git checkout <branch>. Pour conserver le travail fait, créer une branche depuis le detached HEAD.

27. Quelle est la meilleure façon d'écrire des messages de commit professionnels ? Donnez un template.
→ Titre court (<=50 chars), ligne vide, description détaillée si nécessaire, expliquer pourquoi (not just what), référencer ticket/issue. Ex: "Fix auth token expiry causing 401s\n\nEnsure tokens are refreshed before expiry to avoid intermittent failures. Closes #123".

28. Comment gérer les merges volumineux et complexes avant une release ?
→ Rebase/merge fréquemment, tester intégralement en CI, résoudre petits conflits tôt, utiliser feature flags, effectuer un merge-candidate branch et tests d'intégration avant release.

29. Décrivez une procédure sécurisée pour renommer la branche principale de master à main dans un repo actif avec CI.
→ Créer nouvelle branche main à partir de master; mettre à jour protections, CI configs, docs; demander aux mainteneurs de changer remote; rediriger et supprimer master après validation; communiquer et fournir commandes de migration pour collègues.

30. Donnez un exemple de pipeline CI qui utilise Git metadata (commit message, tag, author) pour déterminer la version ou le déploiement.
→ CI lit Git tag/semver (git describe --tags --abbrev=0) ou commit message feat!: -> bump major; puis build artifacts and push tag; déployer si tag match release pattern.



Practical exercises (senior level)
----------------------------------

a) Vous avez accidentellement poussé un fichier contenant une clé privée dans history. Décrivez les étapes pour
	- le supprimer de l'historique
	- invalider la clé compromis
	- informer l'équipe et sécuriser le dépôt

	Réponse courte : Utiliser git filter-repo --invert-paths --path <file> pour supprimer du history local, forcer push vers remote (git push --force-with-lease), invalider la clé (rotating via provider), ajouter scan en CI et notifier l'équipe. Regarder backups/CI caches et rotate autres credentials potentiellement exposés.

b) Vous devez fusionner une longue-lived feature branch de 6 mois dans main. Il y a beaucoup de conflits. Décrivez votre stratégie.

	Réponse courte : Créer une integration branch (merge candidate), rebase/merge main régulièrement sur la feature pour réduire la surface des conflits, prioriser tests et TDD, résoudre conflits locaux petit-à-petit, exécuter tests d'intégration, faire revue approfondie et CI verte avant merge final; envisager découper la feature en plusieurs PR.

c) Un développeur a accidentellement force-push une réécriture d'historique qui a cassé la pipeline de plusieurs collaborateurs. Comment récupérer et coordonner la réparation ?

	Réponse courte : Identifier l'état précédent via reflog et le remote reflog (si disponible), restaurer la branche main à l'état correct (git push --force-with-lease), communiquer et donner instructions pour que les autres fassent git fetch && git reset --hard origin/main ou rebase de leurs work in progress; renforcer protections (disable force-push on protected branches).



Scoring & expected skill level
------------------------------

- 0-15 : Junior — Connaissances basiques (commit, branch, merge)
- 16-30 : Mid — Confort avec rebase, merge strategies, conflits et CI basics
- 31-45 : Senior — Maîtrise historique, réécritures safe, security, performance, submodules/subtrees
- 46+ : Expert — Capable d'admin repo à l'échelle (filter-repo, gc, hooks server-side, migration de branches, large scale workflows)
