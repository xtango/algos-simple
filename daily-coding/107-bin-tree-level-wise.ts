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

interface BinTreeNode {
    val: number;
    left?: BinTreeNode;
    right?: BinTreeNode;
}

const levelOrder = (root: BinTreeNode): number[] => {
    return [];
}

levelOrder({
    val: 1,
    left: { val: 2 },
    right: {
        val: 3,
        left: { val: 4 },
        right: { val: 5 },
    }
})
