/**
 *                          #146 [Medium] PRUNE BIN TREE   **** WIP ****
 * 
 * This question was asked by BufferBox.
 * 
 * Given a binary tree where all nodes are either 0 or 1, prune the tree so that subtrees containing all 0s are removed.
 * For example, given the following tree:
 * 
 *    0
 *   / \
 *  1   0
 *     / \
 *    1   0
 *   / \
 *  0   0
 * should be pruned to:
 * 
 *    0
 *   / \
 *  1   0
 *     /
 *    1
 * We do not remove the tree at the root or its left child because it still has a 1 as a descendant.
 */

interface BinTreeNode { val: number; left?: BinTreeNode; right?: BinTreeNode }

/**
 * Returns a binary tree with subtrees containing all 0s removed.
 */
const prune = (head: BinTreeNode): BinTreeNode => {
    MAX_DEPTH = 10;

    /**
     * Return the sum of descentants using a recursive Depth First Traversal.
     */
    const dft = (node: BinTreeNode, depth: number = 0): number => {
        // console.log(`[depth ${depth}] val: ${node.val}, left: ${node.left?.val}, right: ${node.right?.val}`);
        if (!node || depth > MAX_DEPTH) {
            return 0;
        }

        let [leftSubtreeSum, rightSubtreeSum] = [0, 0];
        if (node.left) {
            leftSubtreeSum = dft(node.left, depth + 1);
            if (leftSubtreeSum === 0) {
                // console.log(`\tnode ${node.val} pruning left`);
                node.left = undefined;
            }
        }

        if (node.right) {
            rightSubtreeSum = dft(node.right, depth + 1);
            if (rightSubtreeSum === 0) {
                // console.log(`\tnode ${node.val} pruning right`);
                node.right = undefined;
            }
        }

        return node.val + leftSubtreeSum + rightSubtreeSum;
    }

    dft(head);
    return head;
}

/**
 * ASSERTIONS
 */
const bt: BinTreeNode = {
    val: 0,
    left: { val: 1 },
    right: {
        val: 0,
        left: {
            val: 1,
            left: { val: 0 },
            right: { val: 0 },
        },
        right: { val: 0 }
    }
};

console.log(
    JSON.stringify(prune(bt)) === `{"val":0,"left":{"val":1},"right":{"val":0,"left":{"val":1}}}`
);
