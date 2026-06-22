# Roadmap MySQL avancée

1. Common Table Expressions (CTE)   - WITH   - CTE récursives   - Hiérarchies (arbres, catégories, organigrammes)
2. Window Functions   - ROW_NUMBER()   - RANK()   - DENSE_RANK()   - LEAD()   - LAG()   - FIRST_VALUE()   - LAST_VALUE()   - NTILE()   - SUM() OVER()   - AVG() OVER()
3. Transactions   - START TRANSACTION   - COMMIT   - ROLLBACK   - SAVEPOINT
4. Niveaux d'isolation   - READ UNCOMMITTED   - READ COMMITTED   - REPEATABLE READ   - SERIALIZABLE   - Dirty Read   - Non-repeatable Read   - Phantom Read
5. Index et optimisation   - INDEX   - INDEX UNIQUE   - INDEX COMPOSITE   - COVERING INDEX   - FULLTEXT INDEX   - INDEX INVISIBLE   - EXPLAIN   - EXPLAIN ANALYZE
6. Triggers   - BEFORE INSERT   - AFTER INSERT   - BEFORE UPDATE   - AFTER UPDATE   - BEFORE DELETE   - AFTER DELETE
7. Procédures stockées   - CREATE PROCEDURE   - Paramètres IN   - Paramètres OUT   - Paramètres INOUT   - Variables locales   - Boucles   - Conditions
8. Fonctions personnalisées   - CREATE FUNCTION   - Fonctions réutilisables
9. Vues   - CREATE VIEW   - Vues modifiables   - Vues complexes
10. Event Scheduler    - CREATE EVENT    - Tâches automatiques    - Nettoyage périodique    - Archivage
11. JSON    - Colonnes JSON    - JSON_EXTRACT()    - JSON_SET()    - JSON_ARRAY()    - JSON_OBJECT()    - Recherche dans un document JSON
12. Expressions régulières    - REGEXP    - Validation de données    - Recherche avancée
13. Partitionnement    - RANGE    - LIST    - HASH    - KEY    - Gestion de très grosses tables
14. Verrouillage (Locking)    - SELECT ... FOR UPDATE    - LOCK IN SHARE MODE    - Deadlocks    - Gestion de la concurrence
15. Moteurs de stockage    - InnoDB    - MyISAM    - MEMORY    - BLACKHOLE    - ARCHIVE    - CSV    - FEDERATED
16. Contraintes    - PRIMARY KEY    - FOREIGN KEY    - UNIQUE    - CHECK    - NOT NULL    - DEFAULT    - ON DELETE CASCADE    - ON UPDATE CASCADE
17. Optimisation SQL    - Lecture des plans d'exécution    - Optimisation des requêtes    - Réduction des scans complets    - Utilisation efficace des index
18. Fonctions analytiques    - PARTITION BY    - ORDER BY OVER()    - Calculs cumulés    - Moyennes mobiles    - Classements
19. Administration MySQL    - Sauvegardes (mysqldump)    - Restauration    - Import / Export    - Gestion des utilisateurs    - Privilèges (GRANT / REVOKE)
20. Réplication et haute disponibilité    - Réplication maître-réplique    - Group Replication    - Clustering    - Répartition de charge
21. Sécurité    - Gestion des rôles    - Chiffrement    - Audit    - Gestion des permissions
22. Bonnes pratiques    - Normalisation (1NF, 2NF, 3NF)    - Dénormalisation    - Choix des types de données    - Convention de nommage    - Conception de schémas performants

## Fonctions avancées

- les tables temporaires (CREATE TEMPORARY TABLE) ;
- les tables partitionnées (PARTITION BY) ;
- les tables système du schéma information_schema ;
- les Performance Schema pour analyser les performances ;
- le schéma sys, qui fournit des vues simplifiées pour diagnostiquer les requêtes lentes et l'utilisation des ressources.

## Projet global :

-  Relations complexes
-  des transactions
-  des triggers
-  des procédures stockées
-  des vues
-  des événements
-  du JSON
-  des index optimisés
-  des fonctions analytiques
-  du partitionnement
-  l'optimisation des performances avec EXPLAIN ANALYZE.
