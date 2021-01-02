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

/**
 * Returns node values level-wise, i.e. in sorted order
 */
const levelOrder = (root: BinTreeNode): number[] => {
    
    
    const helper = (node: BinTreeNode) => {
        console.log('[helper]->', root.val);
        const q: BinTreeNode[] = [];
        if (node.left) {
            q.push(node.left);
        }
        console.log('[helper] q: ', q);
        if (node.right) {
            q.push(node.right);
        }
        console.log('[helper] q: ', q);
        while (q.length > 0) {
            const head = q.shift();
            helper(head as BinTreeNode);
        }
    }

    helper(root);
    return [];

}

/**
 * ASSERTIONS
 */
levelOrder({
    val: 1,
    left: { val: 2 },
    right: {
        val: 3,
        left: { val: 4 },
        right: { val: 5 },
    }
})
