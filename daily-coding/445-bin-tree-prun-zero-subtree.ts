/** 
Problem #445 [Medium]

This question was asked by BufferBox.

Given a binary tree where all nodes are either 0 or 1, prune the tree so that subtrees containing all 0s are removed.

For example, given the following tree:

  0
 / \
1   0
   / \
  1   0
 / \
0   0
should be pruned to:

  0
 / \
1   0
   /
  1
We do not remove the tree at the root or its left child because it still has a 1 as a descendant.
*/

interface BTNode { id: string, val: number, left?: BTNode, right?: BTNode }

const pruneSubtreeZero = (bt: BTNode) => {
    // Depth first traversal

    const dft = (node: BTNode) => {
        console.log('visit node', node.id, node.val);
        if (node.left) {
            dft(node.left);
        }
        if (node.right) {
            dft(node.right);
        }
        if (node.left === undefined && node.right === undefined && node.val === 0) {
            console.log('remove', node.id);
        }
    }
    dft(bt);
}

/**
 *    a:0
 *   / \
 * b:1  c:0
 *      / \
 *   d:1   g:0
 *  /  \
 * e:0  f: 0
 */
const BT1 = {
    id: 'a',
    val: 0,
    left: { id: 'b', val: 1 },
    right: {
        id: 'c',
        val: 0,
        left: {
            id: 'd',
            val: 1,
            left: { id: 'e', val: 0 },
            right: { id: 'f', val: 0 }
        },
        right: { id: 'g', val: 0 }
    }
}

pruneSubtreeZero(BT1);
