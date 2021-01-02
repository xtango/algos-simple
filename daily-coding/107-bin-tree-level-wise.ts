/**
 *              #107 [Easy] - BINARY TREE LEVEL-WISE
 * 
 * This problem was asked by Microsoft.
 * 
 * Print the nodes in a binary tree level-wise. 
 * For example, the following should print 1, 2, 3, 4, 5.
 * 
 *     1
 *    / \
 *   2   3
 *      / \
 *     4   5
 */

interface BinTreeNode { val: number; left?: BinTreeNode; right?: BinTreeNode; }

/**
 * Recursive function to return values level-wise, i.e. in sorted order.
 * 
 * @param node Root of the binary tree
 * @param orderedAccum Accumulator of the values of the nodes visited.
 * @returns The node values in sorted order.
 */
const levelOrder = (node: BinTreeNode, orderedAccum: number[] = []): number[] => {
    orderedAccum.push(node.val);
    const q = [node.left, node.right].filter(x => x !== undefined);
    while (q.length > 0) {
        const head = q.shift();
        orderedAccum = levelOrder(head as BinTreeNode, orderedAccum);
    }

    return orderedAccum;
}

/**
 * ASSERTION
 */
const tree1 = {
    val: 1,
    left: { val: 2 },
    right: {
        val: 3,
        left: { val: 4 },
        right: { val: 5 },
    }
};
console.log(levelOrder(tree1).join(' ') === "1 2 3 4 5");
