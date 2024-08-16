// const _ = require('lodash');
const assert = require('assert');

/**
Problem 4
This problem was asked by Stripe.

Given an array of integers, find the first missing positive integer
in linear time and constant space. In other words, find the lowest positive 
integer that does not exist in the array. The array can contain duplicates and 
negative numbers as well.

For example, the input [3, 4, -1, 1] should give 2. The input [1, 2, 0] should give 3.

You can modify the input array in-place.
 */

function runSolution(numbers) {
    const numMap = { start: null };
    numbers.forEach((n, i) => {
        if (n >= 0) {
            if (n < numMap.start || numMap.start === null) numMap.start = n;
            numMap[n] = i;
        }
    });
    let nxt = numMap.start;
    while (nxt < numMap.start + numbers.length + 1) {
        nxt += 1;
        if (numMap[nxt] === undefined) return nxt;
    }
}

assert( runSolution([3, 3, 5, 4, -1, 1]) === 2 );
assert( runSolution([1, 2, 0]) === 3 );
