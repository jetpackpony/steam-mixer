import * as R from 'ramda';

/*
 * Takes an object where every property is a promise
 * Returns a promise which resolves to an object with same keys
 * and values corresponding to results of promises
 */
const PromiseAllObj = (obj) => {
  return Promise.all(R.values(obj)).then(R.zipObj(R.keys(obj)));
};

export { PromiseAllObj };
