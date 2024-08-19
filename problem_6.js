// const _ = require('lodash');
const assert = require('assert');

/**
Problem 6
This problem was asked by Google.

An XOR linked list is a more memory efficient doubly linked list. Instead of each node holding 
next and prev fields, it holds a field named both, which is an XOR of the next node and the previous 
node. Implement an XOR linked list; it has an add(element) which adds the element to the end, and a 
get(index) which returns the node at index.

If using a language that has no pointers (such as Javascript), you can assume you have access to 
getPointer and dereferencePointer functions that converts between nodes and memory addresses.
*/

function getPointer(node, key) {
    return node.both ^ key;
}

function dereferencePointer(prevKey, currentNode) {
    return prevKey !== null ? getPointer(currentNode, prevKey) : currentNode.both;
}

// JavaScript doesn't have direct memory management, so we'll create a hashmap to store the nodes
// and use XOR operations to route between keys in the map.

class Node {
    constructor(value) {
        this.both = 0;
        this.value = value;
    }
}

class XORLinkedList {
    constructor() {
        this.currentKey = 0;
        this.nodes = new Map();
        this.headKey = null;
        this.tailKey = null;
    }

    getKey() {
        return this.currentKey += 1;
    }

    add(element) {
        const newNode = new Node(element);
        const newKey = this.getKey();

        if (this.headKey === null) {
            this.headKey = newKey;
            this.tailKey = newKey;
        } else {
            // new (tail) node's both is newKey
            newNode.both = this.tailKey;
            // old (tail) node's both is old tailKey XOR newKey
            const tailNode = this.nodes.get(this.tailKey);
            tailNode.both = getPointer(tailNode, newKey);

            this.tailKey = newKey;
        }
        this.nodes.set(newKey, newNode);
    }

    get(index) {
        let prevKey = null;
        let currentKey = this.headKey;
        let currentIndex = 0;

        while (currentKey) {
            const currentNode = this.nodes.get(currentKey);
            // XOR prevKey and currentNode.both to get the next key
            const nextKey = dereferencePointer(prevKey, currentNode);

            prevKey = currentKey;
            currentKey = nextKey;

            if (currentIndex === index) return currentNode.value;
            currentIndex += 1;
        }
        return null;
    }
}

function runSolution(elements, index) {
    const list = new XORLinkedList();
    elements.forEach(n => list.add(n));
    return list.get(index);
}

assert( runSolution([10,20,30,40], 0) === 10 );
assert( runSolution([10,20,30,40], 1) === 20 );
assert( runSolution([10,20,30,40], 2) === 30 );
assert( runSolution([10,20,30,40], 3) === 40 );
