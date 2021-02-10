/**
 *                          #146 [Medium] BIN TREE - PRUNE ZERO SUBTREES   **** WIP ****
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
 * Remove subrees contain all 0s
 * DFS
 */
const prune =  (head: BinTreeNode) => {
    const dfs = (
        node: BinTreeNode,
        accumSum: number = 0,
        depth: number = 0): number => {
        console.log(`[depth ${depth}] val: ${node.val}, left: ${node.left?.val}, right: ${node.right?.val} -> sum: ${accumSum}`);
        if (!node || depth > 10) {
            return accumSum;
        }

        if (node.left) {
            const leftSum = dfs(node.left, accumSum + node.val, depth + 1);
            if (leftSum === 0) {
                console.log(`\tnode ${node.val} pruning left`;
                node.left = undefined; // prune
            }
        }

        if (node.right) {
            const rightSum = dfs(node.right, accumSum + node.val, depth + 1);
            if (rightSum === 0) {
                console.log(`\tnode ${node.val} pruning right`);
                node.right = undefined; // prune
            }
        }

        return node.val;
    }

    dfs(head);

    console.log(head);
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

prune(bt);
