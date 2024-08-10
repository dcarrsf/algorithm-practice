const assert = require('assert');

/**
Problem 1
This problem was recently asked by Google.

Given a list of numbers and a number k, return whether any two numbers from the list add up to k.

For example, given [10, 15, 3, 7] and k of 17, return true since 10 + 7 is 17.

Bonus: Can you do this in one pass?
 */

function runSolution(numbers, target) {
    const numberMap = {};
    for (const i of numbers) {
        if (numberMap[i]) return true;
        if (i < target) {
            const diff = target - i;
            numberMap[diff] = true;
        }
    }
    return false;
}


assert( runSolution([10, 15, 3, 7], 17) === true );
assert( runSolution([10, 15, 3, 7], 25) === true );
assert( runSolution([10, 15, 3, 7], 19) === false );
assert( runSolution([10, 15, 3, 7], 8) === false );


assert( runSolution([5, 20, 17, 3], 8) === true );
assert( runSolution([5, 20, 17, 3], 23) === true );
assert( runSolution([5, 20, 17, 3], 19) === false );
assert( runSolution([5, 20, 17, 3], 7) === false );