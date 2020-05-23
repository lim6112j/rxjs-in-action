import util from 'util';
const log = (function() {
  return function(msg) {
    return function(v) {
      console.log(msg, " => ",v);
    };
  }
})();
const logl = (function() {
  return function(msg) {
    return function(v) {
      console.log(msg, " => ", util.inspect(v, true, 10, true));
    };
  }
})();
const proLog = (function() {
  return function(msg) { 
    return function(v) {
      v.then(log(msg));
    }
  }
}
)();
const subscriber = (f) => function(end) {
  let i = 0;
  const obj =   {
    next: function(v) {
      log('subs value')(v);
      if(f) f();
      i++ === end ? this.unsubscribe() : null;
    },
    error: log('error'),
    complete: function(){if(f) f();log('completed')(this)}
  }
  return obj;
} 
export {log, proLog, logl, subscriber};