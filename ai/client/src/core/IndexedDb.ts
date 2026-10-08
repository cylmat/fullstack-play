
// SAMPLE //

// const DB_NAME = "mon-app";
// const STORE_NAME = "utilisateurs";

// function ouvrirBase() {
//   return new Promise((resolve, reject) => {
//     const request = indexedDB.open(DB_NAME, 1);

//     // Appelé à la création de la base ou lors d'un changement de version.
//     request.onupgradeneeded = () => {
//       const db = request.result;

//       if (!db.objectStoreNames.contains(STORE_NAME)) {
//         db.createObjectStore(STORE_NAME, {
//           keyPath: "id",
//           autoIncrement: true,
//         });
//       }
//     };

//     request.onsuccess = () => resolve(request.result);
//     request.onerror = () => reject(request.error);
//   });
// }

// async function ajouterUtilisateur(nom) {
//   const db = await ouvrirBase();

//   return new Promise((resolve, reject) => {
//     const transaction = db.transaction(STORE_NAME, "readwrite");
//     const request = transaction.objectStore(STORE_NAME).add({ nom });

//     request.onsuccess = () => resolve(request.result); // ID généré
//     request.onerror = () => reject(request.error);
//     transaction.oncomplete = () => db.close();
//   });
// }

// async function lireUtilisateur(id) {
//   const db = await ouvrirBase();

//   return new Promise((resolve, reject) => {
//     const transaction = db.transaction(STORE_NAME, "readonly");
//     const request = transaction.objectStore(STORE_NAME).get(id);

//     request.onsuccess = () => resolve(request.result);
//     request.onerror = () => reject(request.error);
//     transaction.oncomplete = () => db.close();
//   });
// }

// // Exemple d'utilisation
// const id = await ajouterUtilisateur("Camille");