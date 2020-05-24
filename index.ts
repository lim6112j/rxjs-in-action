import {log, logl, subscriber} from './util';
import moment from 'moment';
const root = document.getElementById("root");
const h1 = document.createElement('h1');
h1.innerHTML = "hello world"
root.appendChild(h1);
import { range, using, interval, combineLatest, from, fromEvent, forkJoin, of } from 'rxjs';
import { startWith, take, scan, map, pluck, filter, tap, flatMap, switchMap, timestamp, mergeMap, concatMap } from 'rxjs/operators';


/**
 * rxjs : using
 */
// class DisposableResource {
//   disposed: boolean;
//   constructor(public value: number){
//     this.disposed = false;
//   }
//   getValue() {
//     if(this.disposed) {
//       throw new Error('Object is disposed');
//     }
//     return this.value;
//   }
//   unsubscribe() {
//     if(!this.disposed) {
//       this.disposed = true;
//       this.value = null;
//     }
//     console.log('Disposed');
//   }
// }

// const source$ = using(
//   () => new DisposableResource(42),
//   resource => interval(1000)
// );

// const subscription = source$.subscribe(subscriber(2));

/**
 * session with using operator
 */
// class SessionDisposable {
//   token: any;
//   disposed: any;
//   constructor(sessionToken) {
//     this.token = sessionToken;
//     this.disposed = false;
//     let expiration = moment().add(1, 'days').toDate();
//     document.cookie = `session_token=${sessionToken}
//       expires=${expiration.toUTCString()}`;
//     console.log('Session created : ', this.token);
//   }
//   getToken() {
//     return this.token;
//   }
//   unsubscribe() {
//     if(!this.disposed) {
//       this.disposed = true;
//       this.token = null;
//       document.cookie = `session_token=; expires=Thu, 01 Jan 1970
//       00:00:00 GMT`;
//       console.log('Ended session! This object has been disposed');
//     }
//   }
// }

// function generateSessionToken() {
//   const val = Math.floor(Math.random() * 10);
//   return 'xyxyxy'.replace(/[xy]/g, val.toString())
// }
// const countDownSession$ = using(
//   () => new SessionDisposable(generateSessionToken()),
//   () => interval(1000).pipe(
//     startWith(10),
//     scan(val => val - 1),
//     take(10)
//   )
// )
// countDownSession$.subscribe(subscriber(() => console.log(document.cookie))(100));
// // console.log(document.cookie)
// setTimeout(() => {
//   console.log(document.cookie)
// }, 11000);

/**
 * combinelatest
 */
// async data source
//  const letters$ = interval(1000).pipe(
//    map(num => String.fromCharCode(num+65)),
//    map(letter => `Source 1 => ${letter}`)
//  );
//  const numbers$ = interval(1000).pipe(
//    map(num => `Source 2 => ${num}`)
//  );

//  const combined$ = combineLatest(letters$, numbers$).pipe(take(5)).subscribe(subscriber()(10));

// synchronous data source
//  const letters2$ = from(['a', 'b', 'c']);
//  const numbers2$ = from ([1, 2, 3]);
//  const combined2$ = combineLatest(letters2$, numbers2$).pipe(take(4)).subscribe(subscriber()(10))

/**
 * forkJoin vs combinelatest
 */

//  forkJoin(
//    of(42),
//    interval(1000).pipe(take(5))
//  ).subscribe(subscriber(()=>console.log("forkJoin"))(10))

//  combineLatest(
//    of(42),
//    interval(1000).pipe(take(5))
//  ).subscribe(subscriber(() => console.log('combineLatest'))(10))

import PouchDB, { emit } from 'pouchdb';
// interface docType {
//   name: string;
//   type: string;
//   amount: number;
//   from: string;
//   to: string;
//   date?: string;
// }
const txDb = new PouchDB('transactions');
// fromEvent(txDb, 'created') .subscribe(log('db created'));
class Transaction {
  constructor(public name: string, public type: string, public amount: number, public from: string, public to: string = null){
  }
}
const write$ = db => tx => of(tx).pipe(
  timestamp(),
  map(obj => ({...obj.value, date: obj.timestamp})),
  tap(log('Processing transaction of')),
  mergeMap(datedTx => from(db.post(datedTx)))
)
txDb.on('error', function (err) { console.log(err); });
// function getTransactionsArray() {
//   return [
//     new Transaction('lim', 'withdraw', 500, 'checking'),
//     new Transaction('joo', 'deposit', 800, 'savings'),
//     new Transaction('kim', 'transfer', 2000, 'checking', 'savings'),
//     new Transaction('seo', 'transfer', 1000, 'savings', 'CD'),
//   ]
// }
// const count = {
//   map: (doc: docType) => {
//     emit(doc.date);
//   },
//   reduce: '_count'
// };

// from(getTransactionsArray()).pipe(
//   switchMap(write$(txDb)),
//   flatMap(() => from(txDb.query(count, {reduce: true})))
// ).subscribe(
//   recs => console.log('result: ' + recs.rows[0]),
//   error => console.log('Error: ' + error),
//   () => console.log('Query completed!')
// );

// txDb.info().then(console.log);

// destroy pouchDB
// new PouchDB('http://localhost:5984/transactions').destroy().then(function () {
//   // database destroyed
//   console.log('db destroyed');
//   // this.info().then(console.log);
// }).catch(function (err) {
//   // error occurred
// })
// interface AccountType {
//   _id: string;
//   name: string;
//   type: string;
//   balance: number;
// }
// class Account {
//   constructor(private _id: string, private name: string, private type: string, private balance: number) {}
//   get id() {
//     return this._id;
//   }
// }

// const accounts = [
//   new Account('1', 'Emmet Brown', 'savings', 1000),
//   new Account('2', 'Emmet Brown', 'checking', 2000),
//   new Account('3', 'Emmet Brown', 'CD', 20000),
// ];

// const accountsDb = new PouchDB('accounts');
// // from(accounts).pipe(
// //   switchMap(write$(accountsDb)),
// // ).subscribe(subscriber()(10))
// function withdraw$({name, accountId, type, amount}) {
//   return from(accountsDb.get(accountId)).pipe(
//     tap((doc: any) => console.log(doc.balance < amount ? `Warn this Operation will cause overdraft` : `Sufficient funds`)),
//     flatMap((doc:any) => from(accountsDb.put({
//       _id: doc._id,
//       _rev: doc._rev,
//       balance: doc.balance - amount
//     }))),
//     filter(res => res.ok),
//     tap(() => console.log('Withdraw succeeded. Creating transaction document')),
//     concatMap(() => write$(accountsDb)(new Transaction(name, 'withdraw', amount, type)))
//   )
// }
// withdraw$({
//   name: 'lim', accountId: '3', type: 'checking', amount: 1000
// }).subscribe(subscriber()(10))


/**
 * Error handling in rxjs
 */

 