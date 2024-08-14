const _ = require('lodash');
const assert = require('assert');

/**
Problem 3
This problem was asked by Google.

Given the root to a binary tree, implement serialize(root), which serializes the tree 
into a string, and deserialize(s), which deserializes the string back into the tree.

For example, given the following Node class:
---------
class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}
---------

The following test should pass:
---------
const node = new TreeNode(
  'root',
  new TreeNode('left', new TreeNode('left.left'), new TreeNode('right'))
);
expect(deserialize(serialize(node)).left.left.val).toEqual('left.left'); // Jest Testing
---------
 */

class TreeNode {
    constructor(val, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

let cnt = 0;
function getId() {
    return (cnt += 1);
};

function printNode(id, node, strArray = []) {
    if (!node) return strArray;
    let left = -1, right = -1;
    if (node.left) left = getId();
    if (node.right) right = getId();
    strArray.push(`${id},${node.val},${left},${right}`);
    printNode(left, node.left, strArray);
    printNode(right, node.right, strArray);
    return strArray;
}

function serialize(root) {
    const result = printNode(0, root, []);
    console.log(result.join('\n'));
    return result.join('\n');
}

function deserialize(str) {
    const nodeMap = {};
    const strArray = str.split('\n');
    const len = strArray.length;
    for (let i = len - 1; i >= 0; i -= 1) {
        const [id, val, left, right] = strArray[i]?.split(',');
        const node = new TreeNode(val, nodeMap[left], nodeMap[right]);
        if (i === 0) return node;
        nodeMap[id] = node;
    }
}

function runSolution(node) {
    return deserialize(serialize(node));
}

// csv
// 0,root,1,3\n1,left,3,-1\n2,left.left,-1,-1\n3,right,-1,-1

// json
// { val: 'root', left: { val: 'left', left: { val: 'left.left' } }, right: { val: 'right' } }

const node1 = new TreeNode(
    'root',
    new TreeNode('left', new TreeNode('left.left')),
    new TreeNode('right')
);

assert( _.isEqual(runSolution(node1), node1) );
