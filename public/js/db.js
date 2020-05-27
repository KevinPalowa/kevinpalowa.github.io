const dbPromise = idb.open('favorites', 1, function(upgradeDb) {
  if (!upgradeDb.objectStoreNames.contains('club')) {
    const peopleOS = upgradeDb.createObjectStore('club', {
      keyPath: 'id',
    });
  }
});

const dbInsert = (club) => {
  return new Promise((resolve, reject) => {
    dbPromise.then((db) => {
      const transaction = db.transaction('club', `readwrite`);
      transaction.objectStore('club').add(club);
      return transaction;
    }).then((transaction) => {
      if (transaction.complete) {
        resolve(true);
      } else {
        reject(new Error(transaction.onerror));
      }
    });
  });
};

const dbGetall = () => {
  return new Promise((resolve, reject) => {
    dbPromise.then((db) => {
      const transaction = db.transaction('club', `readonly`);
      return transaction.objectStore('club').getAll();
    }).then((data) => {
      if (data.length > 0) {
        resolve(data);
      } else {
        reject('No favorites found! to add favorites tap star icon');
      }
    });
  });
};

const dbGetId = (id) => {
  return new Promise((resolve, reject) => {
    dbPromise.then((db) => {
      const transaction = db.transaction('club', `readonly`);
      return transaction.objectStore('club').get(id);
    }).then((data) => {
      if (data !== undefined) {
        resolve(data);
      } else {
        reject('No club');
      }
    });
  });
};

const dbDelete = (id) => {
  return new Promise((resolve, reject) => {
    dbPromise.then((db) => {
      const transaction = db.transaction('club', `readwrite`);
      transaction.objectStore('club').delete(id);
      return transaction;
    }).then((transaction) => {
      if (transaction.complete) {
        resolve(true);
      } else {
        reject(new Error(transaction.onerror));
      }
    });
  });
};
