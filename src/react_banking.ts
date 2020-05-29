import ReactDOM from 'react-dom';
import React from 'react';
import { range, using, interval, combineLatest, from, fromEvent, forkJoin, of } from 'rxjs';
import { startWith, take, scan, map, pluck, filter, tap, flatMap, switchMap, timestamp, mergeMap, concatMap } from 'rxjs/operators';

const element = ReactDOM.render(
  React.createElement('div', {} ,'Hello Rxjs'),
  document.getElementById("root")
);
const AccountBalance = (props: any) => 
  React.createElement('div', {}, `Checking: ${props.checking} USD, Savings: ${props.savings} `);

interval(1000).pipe(
  map(value => ({checking: value, savings: value})),
).subscribe(props => ReactDOM.render(
  React.createElement(AccountBalance, props),
  document.getElementById("root")
))