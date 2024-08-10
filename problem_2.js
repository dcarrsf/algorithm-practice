const _ = require('lodash');
const assert = require('assert');

/**
Problem 2
This problem was asked by Uber.

Given an array of integers, return a new array such that each element at index i 
of the new array is the product of all the numbers in the original array except the one at i.

For example, if our input was [1, 2, 3, 4, 5], the expected output would be [120, 60, 40, 30, 24]. 
If our input was [3, 2, 1], the expected output would be [2, 3, 6].

Follow-up: what if you can't use division?
 */

// 1ST ATTEMPT O(N2)

// function runSolution(numbers) {
//     return numbers.map((num, i) => 
//         numbers.filter((n, j) => 
//             (j !==i)).reduce((a, n) => (a * n), 1));
// }

// 2ND ATTEMPT O(N) WITHOUT DIVISION

// function runSolution(numbers = []) {
//     if (!numbers.length) return [];
//     const length = numbers.length;
//     // product of previous number
//     const results =[1];
//     for (let i=1; i < length; i+=1) {
//         results[i] = results[i-1] * numbers[i - 1];
//     }
//     // get product right of self
//     let product = 1;
//     for (let j = length - 1; j >= 0; j -= 1) {
//         results[j] *= product;
//         product *= numbers[j];
//     }
//     return results;
// }

// 3RD ATTEMPT O(N)

function runSolution(numbers = []) {
    if (!numbers.length) return [];
    const finalProduct = numbers.reduce((a, n) => (a * n), 1);
    return numbers.map(n => (finalProduct / n));
}

assert( _.isEqual(runSolution([1, 2, 3, 4, 5]), [120, 60, 40, 30, 24]) );
assert( _.isEqual(runSolution([3, 2, 1]), [2, 3, 6]) );
