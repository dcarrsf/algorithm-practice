// const _ = require('lodash');
const assert = require('assert');

/**
Problem 5
This problem was asked by Jane Street.

cons(a, b) constructs a pair, and car(pair) and cdr(pair) returns the first 
and last element of that pair. For example, car(cons(3, 4)) returns 3, and 
cdr(cons(3, 4)) returns 4.

Given this implementation of cons:

function cons(a, b) {
  function pair(cb) {
    return cb(a, b);
  }
  return pair;
}

Implement car and cdr.
*/

function cons(a, b) {
  // higher order function called by car and cdr
  function pair(cb) {
    return cb(a, b);
  }
  return pair;
}

function car(pair) {
  // higher order function called by pair
  function first(a, b) {
    return a;
  }
  return pair(first);
}

function cdr(pair) {
  // higher order function called by pair
  function last(a, b) {
    return b;
  }
  return pair(last);
}

function runSolution(result) {
  console.log(result);
  return result;
}

assert( runSolution(car(cons(3, 4))) === 3 );
assert( runSolution(cdr(cons(3, 4))) === 4 );
