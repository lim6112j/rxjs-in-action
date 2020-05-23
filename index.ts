import {log, logl, subscriber} from './util';
import moment from 'moment';
const root = document.getElementById("root");
const h1 = document.createElement('h1');
h1.innerHTML = "hello world"
root.appendChild(h1);
import { range, using, interval, combineLatest, from, fromEvent, forkJoin, of } from 'rxjs';
import { startWith, take, scan, map, pluck, filter, tap, flatMap, switchMap } from 'rxjs/operators';


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
