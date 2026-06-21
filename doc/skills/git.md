# Roadmap Git avancée

## Les 10 commandes qui distinguent souvent un développeur confirmé

- git rebase -i
- git reflog
- git cherry-pick
- git bisect
- git worktree
- git stash (et ses variantes)
- git reset vs git restore vs git revert
- git blame
- git log --graph --oneline --all
- git range-diff

## Roadmap advanced

1. Les bases avancées
   - HEAD
   - Detached HEAD
   - Refs
   - SHA-1 / SHA-256
   - Objets Git
   - Blob
   - Tree
   - Commit
   - Tag

2. Gestion des branches
   - Branches locales
   - Branches distantes
   - Tracking Branches
   - Upstream Branches
   - Branch Protection

3. Historique
   - git log
   - git show
   - git diff
   - git blame
   - git shortlog
   - git whatchanged

4. Rebase
   - git rebase
   - Interactive Rebase
   - Squash
   - Fixup
   - Autosquash
   - Reword
   - Edit
   - Rebase onto

5. Fusion
   - Merge Fast-Forward
   - Three-Way Merge
   - Merge Commit
   - Résolution de conflits
   - Merge Strategies

6. Cherry-Pick
   - git cherry-pick
   - Cherry-pick multiple commits
   - Résolution de conflits

7. Stash
   - git stash
   - stash push
   - stash pop
   - stash apply
   - stash branch
   - stash list

8. Reset / Restore / Revert
   - git reset --soft
   - git reset --mixed
   - git reset --hard
   - git restore
   - git revert

9. Réécriture d'historique
   - amend
   - interactive rebase
   - filter-repo
   - suppression de fichiers sensibles
   - réécriture des commits

10. Reflog
    - git reflog
    - récupération de commits perdus
    - restauration après reset

11. Bisect
    - git bisect
    - recherche binaire d'un bug

12. Tags
    - Lightweight Tags
    - Annotated Tags
    - Semantic Versioning

13. Sous-modules
    - git submodule
    - update
    - init
    - sync

14. Worktrees
    - git worktree
    - plusieurs branches simultanément
    - développement parallèle

15. Hooks Git
    - pre-commit
    - commit-msg
    - pre-push
    - post-merge
    - hooks personnalisés

16. Signature des commits
    - GPG
    - SSH Signing
    - Vérification des signatures

17. Collaboration
    - Pull Requests
    - Code Review
    - Resolve Conflicts
    - Protected Branches

18. Stratégies de branches
    - Git Flow
    - GitHub Flow
    - GitLab Flow
    - Trunk-Based Development

19. Dépôts distants
    - remote
    - fetch
    - pull
    - push
    - prune
    - mirror

20. Optimisation
    - gc
    - fsck
    - repack
    - maintenance

21. Configuration
    - .gitconfig
    - Alias
    - Includes
    - Ignore
    - Attributes

22. Git LFS
    - Gestion des gros fichiers
    - Locking
    - Migration

23. Recherche
    - git grep
    - pickaxe (-S)
    - log --grep
    - log --author
    - log --since

24. Debugging
    - show
    - diff
    - range-diff
    - patch
    - apply

25. Concepts internes
    - Index (Staging Area)
    - Object Database
    - Packfiles
    - Refspec
    - Detached HEAD
    - Plumbing vs Porcelain

## Les concepts souvent méconnus mais très utiles

- Le fonctionnement interne de Git : comprendre les objets (blob, tree, commit, tag) et le rôle du HEAD aide énormément à démystifier Git.
- git worktree : permet de travailler sur plusieurs branches simultanément sans cloner le dépôt plusieurs fois.
- git bisect : extrêmement efficace pour trouver le commit qui a introduit un bug dans un long historique.
- git reflog : le "filet de sécurité" de Git, qui permet de récupérer des commits ou des branches que l'on croyait perdus.
- Les hooks Git : automatiser des vérifications (lint, tests, formatage) avant les commits ou les pushes.
- La différence entre merge et rebase : savoir quand préserver l'historique et quand le rendre plus linéaire.
