/** 
 *          Problem #445 [Medium] - BINARY TREE PRUNE ALL-ZERO SUBTREES
 * 
 * This question was asked by BufferBox.
 * 
 * Given a binary tree where all nodes are either 0 or 1, prune the tree
 * so that subtrees containing all 0s are removed.
 * For example, given the following tree:
 *   0
 *  / \
 * 1   0
 *    / \
 *   1   0
 *  / \
 * 0   0
 * should be pruned to:
 *   0
 *  / \
 * 1   0
 *    /
 *   1
 * We do not remove the tree at the root or its left child because it still
 * has a 1 as a descendant.
 * 
 */
interface BTNode { id: string, val: number, left?: BTNode, right?: BTNode }

const pruneSubtreeZero = (bt: BTNode) => {
    /**
     * Helper function for recursion. Mutates node in-place.
     */
     const subTree = (node: BTNode) => {
        if (node === undefined) {
            return undefined;
        }
        console.log(`visit node ${node.id}:${node.val}`);
        node.left = subTree(node.left);
        node.right = subTree(node.right);
        if (node.left === undefined && node.right === undefined && node.val === 0) {
            console.log('\tremove');
            return undefined;
        }
        return node;
    }

    subTree(bt);
    return bt;
}

/**
 * Returns IDs using an in-order (left, root (append to out), right) traversal.
 * This function is used for the test cases only.
 * 
 * @example inOrder() returns ['a', 'b', 'c', 'd', 'e']
 *     d:4       
 *     /  \
 *   b:2   e:5
 *  /   \
 * a:1   c:3
 */
const inOrder = (binTree: BTNode): string[] => {
    const outIds: string[] = [];

    const helper = (node: BTNode) => {
        if (node === undefined) {
            return;
        }
        if (node.left) {
            helper(node.left);
        }
        outIds.push(node.id);
        if (node.right) {
            helper(node.right);
        }
    }
    helper(binTree);
    return outIds;
}


/**
 * ASSERTIONS
 */
/** 
 *     d:4
 *    /   \
 *   b:2   e:5
 *  /   \
 * a:1   c:3
 */
const BT1 = {
    id: 'd',
    val: 4,
    left: {
        id: 'b', val: 2,
        left: { id: 'a', val: 1 },
        right: { id: 'c', val: 3 }
    },
    right: { id: 'e', val: 5 }
};

/**
 *    a:0
 *   / \
 * b:1  c:0
 *      / \
 *   d:1   g:0
 *  /  \
 * e:0  f: 0
 */
const BT2 = {
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

// Test inOrder
console.log(inOrder(BT1).join('') ==='abcde');

// Test pruneSubtreeZero
console.log(inOrder(pruneSubtreeZero(BT2)).join('') === 'badc');
