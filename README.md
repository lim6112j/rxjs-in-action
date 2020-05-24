# How to run
1. DB run
* local DB

```
const db = new PouchDB('transaction');
```

* remote DB


```
pouchdb-server --port 5984

const db = new PouchDB('http://localhost:5934/transaction');
```
2. start app
```
parcel index.html
```