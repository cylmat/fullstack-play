# Roadmap Redis avancée

### 1. Structures de données

- Strings
- Lists
- Sets
- Sorted Sets (ZSET)
- Hashes
- Bitmaps
- HyperLogLog
- Streams
- Geospatial Indexes
- Bloom Filters (Redis Stack)
- Cuckoo Filters (Redis Stack)

### 2. Gestion de l'expiration

- EXPIRE
- PEXPIRE
- TTL
- PTTL
- EXPIREAT
- Suppression automatique des clés


### 3. Transactions

- MULTI
- EXEC
- DISCARD
- WATCH
- Optimistic Locking


### 4. Scripts Lua

- EVAL
- EVALSHA
- Scripts atomiques
- Variables Lua
- Manipulation de plusieurs clés


### 5. Pipelines

- Pipeline
- Réduction des allers-retours réseau
- Optimisation des performances


### 6. Pub/Sub

- PUBLISH
- SUBSCRIBE
- PSUBSCRIBE
- Canaux
- Messagerie temps réel


### 7. Streams

- XADD
- XREAD
- Consumer Groups
- XACK
- XPENDING
- XCLAIM
- File de messages


### 8. Persistance

- RDB Snapshot
- AOF (Append Only File)
- Hybrid Persistence
- SAVE
- BGSAVE
- BGREWRITEAOF


### 9. Réplication

- Master / Replica
- Replica Read Only
- Synchronisation


### 10. Redis Sentinel

- Haute disponibilité
- Failover automatique
- Élection d'un nouveau maître
- Monitoring


### 11. Redis Cluster

- Sharding
- Hash Slots
- Répartition des données
- Scalabilité horizontale


### 12. Politiques d'éviction (Eviction Policies)

- noeviction
- allkeys-lru
- volatile-lru
- allkeys-lfu
- volatile-lfu
- random
- ttl


### 13. Optimisation mémoire

- Encodage interne
- Fragmentation
- Compression
- MEMORY USAGE
- MEMORY DOCTOR


### 14. Monitoring

- INFO
- MONITOR
- SLOWLOG
- LATENCY
- MEMORY STATS


### 15. Sécurité

- AUTH
- ACL
- TLS
- Protected Mode
- Gestion des utilisateurs


### 16. Modules Redis Stack

- RedisJSON
- RediSearch
- RedisBloom
- RedisTimeSeries
- RedisGraph (historique)


### 17. Verrouillage distribué

- SET NX EX
- Redlock
- Mutex distribué


### 18. Scan des données

- SCAN
- SSCAN
- HSCAN
- ZSCAN
- Itération non bloquante


### 19. Optimisation des performances

- Big Keys
- Hot Keys
- Pipeline
- Batch Operations
- Network Latency


### 20. Cas d'utilisation avancés

- Cache distribué
- Session Store
- Leaderboard (Sorted Sets)
- Rate Limiting
- Job Queue
- Distributed Lock
- Time Series
- Event Streaming
- Géolocalisation


## Au-delà de l'utilisation basique de Redis

Les fonctionnalités suivantes sont essentielles pour maîtriser Redis dans des architectures modernes :

- Streams : Construire des files de messages et des systèmes de traitement d'événements.
- Pub/Sub : Mettre en place des communications temps réel (chat, notifications, WebSockets).
- Lua Scripting : Exécuter plusieurs opérations de manière atomique directement côté serveur.
- Transactions (MULTI / EXEC / WATCH) : Garantir la cohérence de certaines opérations grâce au verrouillage optimiste.
- Redis Cluster et Sentinel : Comprendre la haute disponibilité, le sharding et la montée en charge.
- Verrouillage distribué : SET NX EX,  Redlock
- RedisJSON et RediSearch (Redis Stack) : Transformer Redis en une base de données de documents avec des capacités de recherche avancées.
- Optimisation mémoire : détecter les Big Keys, choisir une politique d'éviction, analyser l'utilisation
