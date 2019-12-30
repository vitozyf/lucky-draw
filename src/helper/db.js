const DB_STORE_NAME = 'luckydraw.GuaranteeTransaction';
let objectStore;
const createObjectStore = db => {
  objectStore = db.createObjectStore(DB_STORE_NAME, {
    keyPath: 'id',
    autoIncrement: true
  });
  objectStore.createIndex('id', 'id', {
    unique: true
  });
  objectStore.createIndex('name', 'name');
};

const createObjectStoreOrder = db => {
  if (!db.objectStoreNames.contains(DB_STORE_NAME)) {
    createObjectStore(db);
  } else {
    db.deleteObjectStore(DB_STORE_NAME);
    createObjectStore(db);
  }
};

const DBVERSION = 1;
const DBNAME = 'luckydraw';
// 数据库：IDBDatabase 对象
// 对象仓库：IDBObjectStore 对象
// 索引： IDBIndex 对象
// 事务： IDBTransaction 对象
// 操作请求：IDBRequest 对象
// 指针： IDBCursor 对象
// 主键集合：IDBKeyRange 对象
let db;
class LuckydrawIndecDB {
  constructor() {
    this.InitIndexedDB();
  }
  add = (TableName, newItem) => {
    const addInfo = {
      createdTime: Date.now(),
      updateTime: Date.now()
    };
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([TableName], 'readwrite');
      const objectStore = transaction.objectStore(TableName);
      const objectStoreRequest = objectStore.add(
        Object.assign({}, addInfo, newItem)
      );
      objectStoreRequest.onsuccess = () => {
        resolve(true);
      };
      objectStoreRequest.onerror = error => {
        reject(error.target.error);
      };
    });
  };
  edit = (TableName, id, data) => {
    const editInfo = {
      updateTime: Date.now()
    };
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([TableName], 'readwrite');
      const objectStore = transaction.objectStore(TableName);
      const objectStoreRequest = objectStore.get(id);
      objectStoreRequest.onsuccess = () => {
        const myRecord = objectStoreRequest.result;
        for (const key in data) {
          if (typeof myRecord[key] !== 'undefined') {
            myRecord[key] = data[key];
          }
        }
        const objectStoreRequestGetRes = objectStore.put(
          Object.assign({}, myRecord, editInfo)
        );
        objectStoreRequestGetRes.onsuccess = () => {
          resolve(true);
        };
        objectStoreRequestGetRes.onerror = error => {
          reject(error);
        };
      };
    });
  };
  del = (TableName, id) => {
    return new Promise((resolve, reject) => {
      const objectStore = db
        .transaction([TableName], 'readwrite')
        .objectStore(TableName);
      const objectStoreRequest = objectStore.delete(id);
      objectStoreRequest.onsuccess = () => {
        resolve(true);
      };
      objectStoreRequest.onerror = error => {
        reject(error);
      };
    });
  };

  clear = TableName => {
    return new Promise((resolve, reject) => {
      const objectStore = db
        .transaction([TableName], 'readwrite')
        .objectStore(TableName);
      const objectStoreRequest = objectStore.clear();
      objectStoreRequest.onsuccess = () => {
        resolve(true);
      };
      objectStoreRequest.onerror = error => {
        reject(error);
      };
    });
  };

  count = TableName => {
    return new Promise((resolve, reject) => {
      const objectStore = db
        .transaction([TableName], 'readwrite')
        .objectStore(TableName);
      const objectStoreRequest = objectStore.count();
      objectStoreRequest.onsuccess = () => {
        resolve(objectStoreRequest.result);
      };
      objectStoreRequest.onerror = error => {
        reject(error);
      };
    });
  };

  get = (TableName, id) => {
    return new Promise((resolve, reject) => {
      const objectStore = db.transaction(TableName).objectStore(TableName);
      const objectStoreRequest = objectStore.get(id);
      objectStoreRequest.onsuccess = () => {
        resolve(objectStoreRequest.result);
      };
      objectStoreRequest.onerror = error => {
        reject(error);
      };
    });
  };

  getKey = (TableName, key) => {
    return new Promise((resolve, reject) => {
      const objectStore = db.transaction(TableName).objectStore(TableName);
      const objectStoreRequest = objectStore.getKey(key);
      objectStoreRequest.onsuccess = () => {
        resolve(objectStoreRequest.result);
      };
      objectStoreRequest.onerror = error => {
        reject(error);
      };
    });
  };

  getAll = TableName => {
    return new Promise((resolve, reject) => {
      const objectStore = db.transaction(TableName).objectStore(TableName);
      const objectStoreRequest = objectStore.getAll();
      objectStoreRequest.onsuccess = () => {
        resolve(objectStoreRequest.result);
      };
      objectStoreRequest.onerror = error => {
        reject(error);
      };
    });
  };

  onerror = event => {
    console.log('db-connection-fail', event);
  };
  InitIndexedDB = () => {
    const DBOpenRequest = window.indexedDB.open(DBNAME, DBVERSION);
    // 数据库打开失败
    DBOpenRequest.onerror = event => {
      this.onerror(event);
    };

    DBOpenRequest.onsuccess = () => {
      // 存储数据结果
      db = DBOpenRequest.result;
      console.log('db-connection-success');
    };

    DBOpenRequest.onupgradeneeded = () => {
      db = event.target.result;
      createObjectStoreOrder(db);
    };
  };
}

const database = new LuckydrawIndecDB();

export { LuckydrawIndecDB, database, DB_STORE_NAME };
