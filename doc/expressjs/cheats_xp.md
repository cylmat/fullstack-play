```js
/**
 * EXPRESS.JS 5.x — CHEATSHEET COMPLET
 * Fichier unique copiables/collable
 *
 * Installation :
 *   npm i express
 *
 * Lancement :
 *   node app.js
 *
 * Documentation :
 *   https://expressjs.com/en/5x/api.html
 */

const express = require('express');
const path = require('node:path');

const app = express();
const router = express.Router({
  caseSensitive: false, // /Users et /users sont identiques
  mergeParams: true,    // récupère les params du routeur parent
  strict: false         // /users et /users/ sont identiques
});

/* ==========================================================================
   1. CONFIGURATION APPLICATION
   ========================================================================== */

// app.set(nom, valeur) : définir une configuration
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');          // Nécessite un moteur installé, ex: npm i ejs
app.set('views', path.join(__dirname, 'views'));
app.set('trust proxy', true);           // Important derrière Nginx / proxy / hébergeur

// app.get(nom) : lire une configuration (sans callback)
const port = app.get('port');

// app.enable(nom) / app.disable(nom)
app.disable('x-powered-by');
app.enable('case sensitive routing');

// app.enabled(nom) / app.disabled(nom)
console.log('x-powered-by désactivé ?', app.disabled('x-powered-by'));

/*
Principaux réglages Express :

app.set('env', 'production');
app.set('etag', true);
app.set('json escape', true);
app.set('json replacer', null);
app.set('json spaces', 2);
app.set('query parser', 'simple'); // ou false
app.set('strict routing', false);
app.set('subdomain offset', 2);
app.set('trust proxy', true);
app.set('view cache', true);
app.set('view engine', 'ejs');
app.set('views', './views');
app.set('x-powered-by', false);
*/

/* ==========================================================================
   2. MIDDLEWARES EXPRESS INTEGRES
   ========================================================================== */

// express.json(options) : Parse application/json vers req.body
app.use(express.json({
  limit: '1mb',
  strict: true,
  type: 'application/json'
}));

// express.urlencoded(options) : Parse les formulaires HTML
app.use(express.urlencoded({
  extended: true,
  limit: '1mb'
}));

// express.text(options) : Corps brut sous forme de texte
// app.use(express.text({ type: 'text/*', limit: '100kb' }));

// express.raw(options) : Corps brut sous forme de Buffer
// app.use(express.raw({ type: 'application/octet-stream', limit: '10mb' }));

// express.static(root, options) : Fichiers statiques
app.use('/public', express.static(path.join(__dirname, 'public'), {
  dotfiles: 'ignore',
  etag: true,
  extensions: ['html'],
  index: 'index.html',
  maxAge: '1d',
  redirect: true
}));

/* ==========================================================================
   3. MIDDLEWARES PERSONNALISES
   ========================================================================== */

// middleware classique : (req, res, next)
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next(); // Passe au middleware / handler suivant
});

// Middleware sur un préfixe précis
app.use('/api', (req, res, next) => {
  res.set('X-API-Version', '1');
  next();
});

// Exemple de middleware d'authentification
function requireAuth(req, res, next) {
  const authorization = req.get('Authorization');

  if (!authorization) {
    return res.status(401).json({
      error: 'Non authentifié'
    });
  }

  // Vérification de token à effectuer ici
  req.user = { id: 1, role: 'admin' };
  next();
}

/* ==========================================================================
   4. OBJET REQUEST : req
   ========================================================================== */

/*
Propriétés Express utiles de req :

req.app           -> Application Express courante
req.baseUrl       -> Chemin de montage du routeur
req.body          -> Corps parsé (express.json, urlencoded...)
req.cookies       -> Cookies (nécessite cookie-parser)
req.signedCookies -> Cookies signés (nécessite cookie-parser)
req.fresh         -> true si le cache client est toujours valide
req.hostname      -> Nom d'hôte sans le port
req.host          -> Hôte, avec port éventuel
req.ip            -> IP du client
req.ips           -> Liste des IP avec trust proxy activé
req.method        -> Méthode HTTP : GET, POST...
req.originalUrl   -> URL initiale complète avant le montage d'un routeur
req.params        -> Paramètres de route : /users/:id
req.path          -> URL sans query string
req.protocol      -> "http" ou "https"
req.query         -> Paramètres URL : ?page=2
req.res           -> Objet réponse associé
req.route         -> Route courante
req.secure        -> true si HTTPS
req.signedCookies -> Cookies signés
req.stale         -> Inverse de req.fresh
req.subdomains    -> Sous-domaines
req.xhr           -> true si X-Requested-With: XMLHttpRequest
*/

/*
Méthodes Express utiles de req :

req.accepts(types)
req.acceptsCharsets(charsets)
req.acceptsEncodings(encodings)
req.acceptsLanguages(languages)
req.get(header)
req.header(header)             -> Alias de req.get()
req.is(type)
req.range(size, options)
*/

app.get('/req-demo/:id', (req, res) => {
  const accept = req.accepts(['json', 'html']); // "json", "html" ou false
  const charset = req.acceptsCharsets(['utf-8', 'iso-8859-1']);
  const encoding = req.acceptsEncodings(['br', 'gzip', 'identity']);
  const language = req.acceptsLanguages(['fr', 'en']);

  const authorization = req.get('Authorization');
  const userAgent = req.header('User-Agent'); // Alias de req.get

  const isJson = req.is('application/json');
  const isJsonShort = req.is('json');

  // req.range(tailleDuFichier)
  // Retour : tableau, -1 (non satisfaisable), -2 (invalide)
  const range = req.range(10_000, { combine: true });

  res.json({
    params: req.params,
    query: req.query,
    body: req.body,
    method: req.method,
    url: req.url,
    originalUrl: req.originalUrl,
    baseUrl: req.baseUrl,
    path: req.path,
    protocol: req.protocol,
    secure: req.secure,
    hostname: req.hostname,
    host: req.host,
    ip: req.ip,
    ips: req.ips,
    subdomains: req.subdomains,
    xhr: req.xhr,
    fresh: req.fresh,
    stale: req.stale,
    accept,
    charset,
    encoding,
    language,
    authorization,
    userAgent,
    isJson,
    isJsonShort,
    range
  });
});

/* ==========================================================================
   5. OBJET RESPONSE : res
   ========================================================================== */

/*
Propriétés Express utiles de res :

res.app          -> Application Express
res.headersSent  -> true si les headers ont déjà été envoyés
res.locals       -> Données locales pour les templates
res.req          -> Objet req associé
*/

/*
Méthodes Express de res :

res.append(field, value)
res.attachment(filename)
res.clearCookie(name, options)
res.contentType(type)
res.cookie(name, value, options)
res.download(path, filename, options, callback)
res.end(data, encoding, callback)
res.format(object)
res.get(field)
res.json(body)
res.jsonp(body)
res.links(links)
res.location(path)
res.redirect(status, path)
res.render(view, locals, callback)
res.send(body)
res.sendFile(path, options, callback)
res.sendStatus(statusCode)
res.set(field, value)
res.header(field, value)       -> Alias de res.set()
res.status(code)
res.type(type)
res.vary(field)
*/

app.get('/res-demo', (req, res) => {
  // res.status(code)
  res.status(200);

  // res.set / res.header : définir headers
  res.set('X-Custom-Header', 'Bonjour');
  res.header('X-Another-Header', 'Valeur');

  // res.append : ajoute une valeur à un header existant
  res.append('Link', '</api?page=2>; rel="next"');

  // res.get : lire un header de réponse
  const contentType = res.get('Content-Type');

  // res.type / res.contentType : type MIME
  res.type('application/json');
  // res.contentType('json'); // Alias

  // res.vary : indique les headers qui influencent la réponse
  res.vary('Accept-Encoding');

  // res.links : crée le header Link
  res.links({
    next: '/api?page=2',
    prev: '/api?page=0'
  });

  // res.locals : valeurs disponibles dans les templates
  res.locals.title = 'Page de démonstration';
  res.locals.user = { id: 1, name: 'Ada' };

  return res.json({
    message: 'Démonstration de res',
    previousContentType: contentType
  });
});

// res.send() : texte, HTML, Buffer, objet
app.get('/send', (req, res) => {
  res.send('Bonjour depuis res.send()');
});

// res.json() : JSON explicite
app.get('/json', (req, res) => {
  res.status(200).json({
    success: true,
    data: { id: 1, name: 'Ada' }
  });
});

// res.jsonp() : JSONP (ancien usage)
app.get('/jsonp', (req, res) => {
  res.jsonp({ message: 'Réponse JSONP' });
});

// res.sendStatus() : statut + message HTTP texte
app.get('/no-content', (req, res) => {
  res.sendStatus(204);
});

// res.end() : termine sans traitement Express additionnel
app.get('/end', (req, res) => {
  res.status(204).end();
});

// res.redirect() : redirection HTTP
app.get('/redirect', (req, res) => {
  res.redirect('/json'); // 302 par défaut
});

app.get('/permanent-redirect', (req, res) => {
  res.redirect(301, '/json');
});

// res.location() : définit uniquement le header Location
app.get('/location', (req, res) => {
  res.location('/json').status(201).end();
});

// res.format() : réponse selon Accept
app.get('/format', (req, res) => {
  res.format({
    html: () => res.send('<h1>Bonjour HTML</h1>'),
    json: () => res.json({ message: 'Bonjour JSON' }),
    text: () => res.type('txt').send('Bonjour texte'),
    default: () => res.status(406).send('Format non accepté')
  });
});

/* ==========================================================================
   6. COOKIES
   ========================================================================== */

app.get('/set-cookie', (req, res) => {
  // res.cookie(name, value, options)
  res.cookie('session', 'token-exemple', {
    httpOnly: true,     // Non accessible depuis JavaScript navigateur
    secure: false,      // true obligatoirement en HTTPS / production
    sameSite: 'lax',    // 'strict', 'lax', 'none'
    maxAge: 3_600_000,  // Durée en millisecondes : 1 heure
    path: '/'
  });

  res.json({ message: 'Cookie créé' });
});

app.get('/clear-cookie', (req, res) => {
  // Les options devraient correspondre à celles utilisées à la création
  res.clearCookie('session', {
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
    path: '/'
  });

  res.json({ message: 'Cookie supprimé' });
});

/* ==========================================================================
   7. FICHIERS : sendFile, download, attachment
   ========================================================================== */

app.get('/file', (req, res, next) => {
  // res.sendFile(cheminAbsolu, options, callback)
  res.sendFile('example.pdf', {
    root: path.join(__dirname, 'files'),
    dotfiles: 'deny',
    headers: {
      'X-Document-Type': 'example'
    }
  }, (err) => {
    if (err) next(err);
  });
});

app.get('/download', (req, res, next) => {
  // res.download(path, nomTéléchargé, options, callback)
  res.download(
    path.join(__dirname, 'files', 'example.pdf'),
    'mon-document.pdf',
    (err) => {
      if (err) next(err);
    }
  );
});

app.get('/attachment', (req, res) => {
  // res.attachment() définit Content-Disposition: attachment
  res.attachment('document.txt');
  res.type('text/plain').send('Contenu du document');
});

/* ==========================================================================
   8. ROUTAGE : app.METHOD()
   ========================================================================== */

/*
Méthodes de routage Express courantes :

app.all(path, ...handlers)
app.get(path, ...handlers)
app.post(path, ...handlers)
app.put(path, ...handlers)
app.patch(path, ...handlers)
app.delete(path, ...handlers)
app.head(path, ...handlers)
app.options(path, ...handlers)

Express expose également les méthodes HTTP reconnues par Node / le package methods.
Exemples moins courants :
app.connect(), app.trace(), app.copy(), app.lock(), app.unlock(),
app.propfind(), app.proppatch(), app.mkcol(), app.move(), app.purge(), etc.
*/

// app.all() : toutes les méthodes HTTP
app.all('/all-methods', (req, res) => {
  res.json({
    method: req.method,
    message: 'Cette route accepte toutes les méthodes HTTP.'
  });
});

// GET
app.get('/users', (req, res) => {
  res.json([{ id: 1, name: 'Ada' }]);
});

// POST
app.post('/users', (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({
      error: 'Le champ "name" est obligatoire.'
    });
  }

  return res
    .location('/users/2')
    .status(201)
    .json({ id: 2, name });
});

// PUT
app.put('/users/:id', (req, res) => {
  res.json({
    message: 'Utilisateur remplacé',
    id: req.params.id,
    data: req.body
  });
});

// PATCH
app.patch('/users/:id', (req, res) => {
  res.json({
    message: 'Utilisateur modifié partiellement',
    id: req.params.id,
    data: req.body
  });
});

// DELETE
app.delete('/users/:id', (req, res) => {
  res.status(204).end();
});

// HEAD
app.head('/health', (req, res) => {
  res.status(200).end();
});

// OPTIONS
app.options('/users', (req, res) => {
  res.set('Allow', 'GET, POST, OPTIONS').sendStatus(204);
});

/* ==========================================================================
   9. app.route() : GROUPER LES VERBES D'UNE MEME ROUTE
   ========================================================================== */

app.route('/articles/:id')
  .get((req, res) => {
    res.json({ id: req.params.id, title: 'Mon article' });
  })
  .put((req, res) => {
    res.json({ id: req.params.id, replaced: true, data: req.body });
  })
  .patch((req, res) => {
    res.json({ id: req.params.id, updated: true, data: req.body });
  })
  .delete((req, res) => {
    res.status(204).end();
  });

/* ==========================================================================
   10. app.param() : TRAITER UN PARAMETRE DE ROUTE
   ========================================================================== */

// app.param(nom, callback)
app.param('userId', (req, res, next, value, name) => {
  console.log(`Paramètre ${name} reçu : ${value}`);

  // Exemple : chercher l'utilisateur en base de données
  req.userFromParam = {
    id: Number(value),
    name: 'Ada Lovelace'
  };

  next();
});

app.get('/users/:userId/profile', (req, res) => {
  res.json(req.userFromParam);
});

/* ==========================================================================
   11. ROUTERS : express.Router()
   ========================================================================== */

// router.use([path], ...handlers)
router.use((req, res, next) => {
  console.log('Middleware du router API');
  next();
});

// router.param(nom, callback)
router.param('productId', (req, res, next, productId) => {
  req.product = { id: Number(productId), name: 'Produit exemple' };
  next();
});

// router.get / post / put / patch / delete / all / etc.
router.get('/products', (req, res) => {
  res.json([{ id: 1, name: 'Produit exemple' }]);
});

router.get('/products/:productId', (req, res) => {
  res.json(req.product);
});

router.post('/products', requireAuth, (req, res) => {
  res.status(201).json({
    id: 2,
    ...req.body,
    createdBy: req.user
  });
});

// router.route()
router.route('/products/:productId')
  .put(requireAuth, (req, res) => {
    res.json({
      message: 'Produit remplacé',
      id: req.params.productId,
      data: req.body
    });
  })
  .delete(requireAuth, (req, res) => {
    res.status(204).end();
  });

// Monter le routeur
app.use('/api', router);

/*
Dans les handlers :

next()           -> passe au middleware suivant
next(err)        -> passe au middleware d'erreur
next('route')    -> saute les handlers restants de la route actuelle
next('router')   -> quitte le router actuel
*/

app.get(
  '/next-route',
  (req, res, next) => next('route'),
  (req, res) => res.send('Ce handler ne sera jamais appelé.')
);

app.get('/next-route', (req, res) => {
  res.send('Deuxième route appelée grâce à next("route").');
});

/* ==========================================================================
   12. TEMPLATES : app.engine(), app.render(), res.render()
   ========================================================================== */

/*
Exemple avec EJS :

npm i ejs

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

res.render('index', { title: 'Accueil', user: { name: 'Ada' } });

app.render('email', { user }, (err, html) => {
  if (err) return console.error(err);
  // Envoyer html dans un e-mail
});
*/

/*
// app.engine(extension, callback)
app.engine('html', (filePath, options, callback) => {
  // Implémentation d'un moteur de template personnalisé
  callback(null, '<h1>Template</h1>');
});
*/

/*
app.get('/page', (req, res) => {
  // res.render(vue, locals, callback)
  res.render('index', {
    title: 'Accueil',
    user: req.user
  });
});
*/

/* ==========================================================================
   13. GESTION DES ROUTES INTROUVABLES ET ERREURS
   ========================================================================== */

// 404 : après toutes les routes valides
app.use((req, res) => {
  res.status(404).json({
    error: 'Route introuvable',
    method: req.method,
    path: req.originalUrl
  });
});

// Middleware d'erreur : TOUJOURS 4 arguments
app.use((err, req, res, next) => {
  console.error(err);

  if (res.headersSent) {
    return next(err);
  }

  res.status(err.status || 500).json({
    error: 'Erreur interne du serveur',
    message: process.env.NODE_ENV === 'production'
      ? undefined
      : err.message
  });
});

/* ==========================================================================
   14. METHODES APP SUPPLEMENTAIRES
   ========================================================================== */

/*
app.use([path], ...handlers)          -> Ajouter middleware / router
app.all(path, ...handlers)            -> Toutes les méthodes HTTP
app.METHOD(path, ...handlers)         -> Route d'une méthode HTTP
app.route(path)                       -> Grouper plusieurs méthodes HTTP
app.param(name, callback)             -> Middleware sur paramètre
app.engine(ext, callback)             -> Enregistrer moteur de template
app.render(view, [locals], callback)  -> Générer une vue sans l'envoyer
app.listen(port, host, callback)      -> Démarrer serveur
app.on(event, listener)               -> Événements, notamment "mount"
*/

// Événement quand une sous-application est montée
app.on('mount', (parent) => {
  console.log('Application montée dans une application parent.');
});

/* ==========================================================================
   15. DEMARRAGE DU SERVEUR
   ========================================================================== */

// app.listen(port, [host], [callback])
const server = app.listen(port, () => {
  console.log(`Serveur démarré : http://localhost:${port}`);
});

// server est un serveur HTTP Node.js classique
// server.close(() => console.log('Serveur arrêté'));

/* ==========================================================================
   RAPPEL SECURITE

   - Valider systématiquement req.body, req.query et req.params.
   - Ne jamais faire confiance aux données fournies par le client.
   - Utiliser HTTPS en production.
   - Utiliser secure: true pour les cookies HTTPS.
   - Configurer trust proxy uniquement selon votre infrastructure.
   - Employer un système de validation (Zod, Joi, express-validator...).
   - Ajouter helmet, rate limiting et gestion CORS selon vos besoins.

   Exemple installations utiles :
   npm i helmet cors express-rate-limit cookie-parser zod
   ========================================================================== */
```