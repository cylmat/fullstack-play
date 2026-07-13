Linux
=====

- Process management, signals and init systems (systemd)
- Networking (iptables/nft, routing, network namespaces)
- Filesystems, LVM, RAID and performance tuning
- Security (SELinux/AppArmor, sudo, users, permissions)
- Troubleshooting (logs, journalctl, strace, lsof, sar)
- Containers and namespaces (Docker, containerd, cgroups)
- Kernel tuning and module management
- Automation, shell scripting and tooling (awk, sed, systemd units)

Quizz
-----

1. Expliquez la différence entre runlevels et systemd targets. Comment migrer un service SysV vers systemd ?
→ Runlevels (SysV init) sont des états prédéfinis ; systemd utilise des targets plus flexibles et basées sur unités. Migrer : créer un unit file .service (Description, ExecStart, WantedBy=multi-user.target), tester avec systemctl daemon-reload, enable et start.

2. Comment diagnostiquer un service qui ne démarre pas sous systemd ? Donnez les commandes clés.
→ journalctl -u <service> -e, systemctl status <service>, systemctl show -p ExecStart <service>, systemctl start --no-block pour debug, vérifier permissions et PATH dans le unit file.

3. Expliquez cgroups v1 vs v2 et pourquoi cgroups v2 est préféré pour les conteneurs.
→ cgroups v2 unifie le contrôle des groupes, offre un seul arbre hiérarchique et un meilleur contrôle des ressources, simplifie l'interface et corrige des incohérences présentes en v1.

4. Comment trouver quel processus tient un port réseau (e.g., 8080) ?
→ sudo ss -ltnp '( sport = :8080 )' ou sudo lsof -i :8080 ou netstat -tulpn.

5. Quelle est la différence entre iptables et nftables ? Pourquoi migrer vers nftables ?
→ nftables remplace iptables avec une API centralisée, meilleure performance, moins de duplication et tables unifiées ; il simplifie la maintenance et réduit la complexité.

6. Comment diagnostiquer un problème de latence disque sur un serveur Linux ?
→ iostat -x, iotop, sar -d, ioping, dstat, vmstat, vérifier queue depth, utilisation CPU, fsync patterns, SMART (smartctl), et analyser mount options (noatime, barriers).

7. Expliquez la différence entre soft and hard links. Quand utiliser l'un ou l'autre ?
→ Hard link = autre nom pour le même inode (même contenu, pas possible entre filesystem). Soft link = pointeur (symlink) vers chemin ; utiliser hard link pour redondance locale, symlink pour références跨-ファイルシステム ou pointer vers répertoires.

8. Comment forcer la suppression d'un fichier ouvert par un processus ? Quels sont les risques ?
→ kill le processus proprement ou utiliser lsof pour trouver le PID puis kill. Supprimer le fichier sur disque laissera l'espace disque libéré seulement après que le descriptor soit fermé; risque de perte de données si processus en écrit encore.

9. Décrivez LVM snapshots et un cas d'utilisation courant.
→ Snapshots copy-on-write d'un volume logique permettant sauvegardes cohérentes à chaud ; utilisés avant backup pour obtenir un état stable sans arrêter services.

10. Comment augmenter la limite de descripteurs de fichiers pour un service systemd ?
→ Dans unit file: [Service] LimitNOFILE=65536 ; puis systemctl daemon-reload && systemctl restart <service>.

11. Quelles sont les étapes pour ajouter un disque à un volume LVM existant et étendre un logical volume ?
→ pvcreate /dev/sdX; vgextend <vg> /dev/sdX; lvextend -l +100%FREE /dev/<vg>/<lv> ; resize2fs/xfs_growfs selon filesystem.

12. Expliquez le fonctionnement de journald et la différence avec syslog traditionnel.
→ journald centralise logs binaires avec métadonnées, permet journalctl pour requêtes structurées ; syslog écrit en texte dans /var/log, peut coexister (systemd-journald forwarder).

13. Comment limiter la bande passante réseau pour un service sur Linux ?
→ Utiliser tc (traffic control) avec qdisc (htb, fq_codel) et filtres, ou utiliser cgroups/net_cls en cgroups v2, ou outils comme wondershaper pour cas simples.

14. Comment investiguer une fuite mémoire dans un processus natif (non-managed) sur Linux ?
→ Utiliser tools: valgrind (local/dev), pmap, smem, /proc/<pid>/status, gdb heap inspection, massif/heaptrack, et vérifier logs d'OOM killer.

15. Que fait selinux et comment diagnostiquer un denial ?
→ SELinux impose des politiques de contrôle d'accès mandatory. Utiliser audit2why / ausearch -m avc -ts today et journalctl pour trouver AVC denials ; setenforce 0 pour debug temporaire.

16. Expliquez le rôle d'un namespace réseau et donnez un exemple d'utilisation.
→ Network namespace isole les interfaces et tables de routage. Utilisé pour containers, sandboxing d'apps, ou pour tests réseau multi-tenant. Commandes : ip netns add, ip netns exec <ns> ip addr.

17. Comment inspecter l'usage CPU par thread dans un processus ?
→ top -H -p <pid> ou ps -Lm -p <pid> ; perf top --pid=<pid> pour profilage.

18. Décrivez comment configurer et sécuriser SSH pour un serveur de production.
→ Désactiver root login, utiliser clés publiques, limiter protocoles, utiliser AllowUsers/AllowGroups, fail2ban, changer port (optionnel), utiliser UFW/firewall, désactiver password auth, configurer idle timeouts et use strong ciphers.

19. Comment configurer un système pour envoyer des logs à une stack centralisée (ELK/EFK) ?
→ Installer et configurer Filebeat/Fluentd/rsyslog to forward logs to Logstash/Fluentd or directly to Elasticsearch; enrich logs with metadata (host, env), ensure buffering and TLS.

20. Quelles sont les commandes pour déboguer un problème de DNS sur un serveur Linux ?
→ host/dig/nslookup, systemd-resolve --status, resolvectl, check /etc/resolv.conf, nsswitch.conf, and firewall rules.

21. Expliquez la différence entre soft/hard mount options for NFS and how to handle stale NFS mounts.
→ soft mount returns error on failure (can cause data corruption), hard retries indefinitely and recovers; stale mounts require umount -f or reboot; use autofs to mitigate.

22. Comment trouver le processus qui cause le plus d'I/O et quelles actions entreprendre ?
→ iotop -oPa, pidstat -d -p ALL, lsof +D /path, vérifier processus, optimiser code, ajouter caches, déplacer données, affiner IO scheduler.

23. Quelle est la différence entre cron, anacron, et systemd timers ? Quand choisir lequel ?
→ cron exécute jobs à intervalle régulier si système up; anacron s'assure d'exécution périodique même si machine était éteinte; systemd timers offrent intégration systemd, plus de flexibilité et meilleure gestion d'unités.

24. Comment gérer et auditer les permissions SUID/SGID sur un serveur critique ?
→ Trouver avec find / -perm /6000 -type f -exec ls -ld {} \;; revoir propriétaire et nécessité, remplacer binaire par alternatives sécurisées, monitorer changements via tripwire/aide.

25. Comment configurer le noyau pour haute performance réseau (TCP tuning) ?
→ Ajuster sysctl: net.core.somaxconn, net.ipv4.tcp_max_syn_backlog, tcp_tw_reuse, tcp_fin_timeout, net.ipv4.tcp_rmem/tcp_wmem, et utiliser ethtool pour offloading.

26. Expliquez la procédure pour récupérer un serveur qui ne boot plus (initramfs / filesystem corruption).
→ Boot sur rescue/live media, monter partitions, vérifier dmesg/journal, fsck sur filesystem, chroot si nécessaire, réinstaller kernel/initramfs (update-initramfs/dracut), vérifier fstab et UUIDs.

27. Qu'est-ce que namespaces PID et pourquoi sont-ils importants pour les conteneurs ?
→ PID namespaces isolent les PID spaces ; permet d'avoir PID 1 dans un container sans interférer avec host, essentiel pour supervision et signal handling dans containers.

28. Comment sécuriser un service exposé (web server) au niveau OS ? Listez les étapes basiques.
→ Harden kernel (disable unnecessary modules), firewall strict, run service as unprivileged user, chroot/jail if possible, limit capabilities with capsh, enable AppArmor/SELinux, manage TLS, keep packages patched, enable rate limiting.

29. Comment inspecter et analyser un core dump pour une application C/C++ ?
→ Activer core_pattern to store dumps, use gdb <binary> <core>, bt, info threads, inspect variables, use addr2line for mapping addresses to source.

30. Quels outils utilisez-vous pour monitorer performance et capacity planning d'une flotte de serveurs ?
→ Prometheus+Grafana, Netdata, Datadog, Zabbix, collectd, and centralized logging; use sar and historical metrics for capacity planning.



Practical exercises (senior level)
----------------------------------

a) Un processus monopolise la CPU sur une machine de production. Décrivez les étapes pour diagnostiquer et atténuer rapidement le problème, puis proposer une solution durable.

   Réponse courte : Utiliser top/htop pour identifier PID, strace -p <pid> to see syscalls, perf top or pstack to profile, vérifier logs; atténuer en renice/kill -USR1/TERM, isoler CPU with cgroups or cpuset, deploy long-term fix (optimize code, add autoscaling, limit resources via systemd/cgroups).

b) Une application web ne répond plus, mais le serveur est accessible. Comment enquêter réseau, socket et processus ?

   Réponse courte : Vérifier systemctl status app, journalctl -u app, ss -ltnp to confirm listening sockets, curl -v localhost:port, strace on process, lsof -p <pid> to check file/socket usage, check firewall and iptables/nft rules.

c) Vous devez mettre en place la rotation et l'archivage des logs système vers une destination centralisée et garantir durabilité. Donnez une solution pratique.

   Réponse courte : Configurer Filebeat/Fluentd with TLS and backpressure, implement index lifecycle policies on Elasticsearch (or tiered storage), rotate logs locally with logrotate or journald rate limit, and encrypt transport.



Scoring & expected skill level
------------------------------

- 0-12 : Junior — Connaissances basiques (fs, permissions, process)
- 13-24 : Mid — Confort avec network, systemd, debugging, LVM
- 25-36 : Senior — Maîtrise troubleshooting, kernel tuning, security hardening, containers
- 37+ : Expert — OS internals, kernel debugging, large scale ops and capacity planning
