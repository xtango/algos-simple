/**
 *                         #258 [Easy] - BOUSTROPHEDON ORDER
 *
 * This problem was asked by Morgan Stanley.
 * 
 * In Ancient Greece, it was common to write text with the first line going left to right,
 * the second line going right to left, and continuing to go back and forth. This style
 * was called "boustrophedon".
 * Given a binary tree, write an algorithm to print the nodes in boustrophedon order.
 * For example, given the following tree:
 *        1
 *     /     \
 *   2         3
 *  / \       / \
 * 4   5     6   7
 * You should return [1, 3, 2, 4, 5, 6, 7].
 */

interface BinTreeNode { val: number; left?: BinTreeNode; right?: BinTreeNode }

const boustrophedonOrder = (root: BinTreeNode): number[] => {
    const path = [];
    const q = [root];
    let level = 0;
    while (q.length) {
        let i = q.length;
        while (i > 0) {
            let node = level % 2 === 0
                ? q.pop()  // Even level  -> pop last
                : q.shift(); // Odd level -> pop head
            path.push(node.val);
            if (node.right) {
                q.push(node.right);
            }
            if (node.left) {
                q.push(node.left);
            }
            i--;
        }
        level++;
    }
    return path;
}

/**
 * ASSERTIONS
 */
const BIN_TREE_1: BinTreeNode = {
    val: 1,
    left: {
        val: 2,
        left: { val: 4 },
        right: { val: 5 }
    },
    right: {
        val: 3,
        left: { val: 6 },
        right: { val: 7 }
    }
};
console.log(JSON.stringify(boustrophedonOrder(BIN_TREE_1)) === '[1,3,2,4,5,6,7]');
