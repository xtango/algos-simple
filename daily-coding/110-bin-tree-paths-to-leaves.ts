/**
 *              #110 [Medium] BIN TREE PATHS FROM ROOT TO LEAVES
 * 
 * This problem was asked by Facebook.
 * 
 * Given a binary tree, return all paths from the root to leaves.
 * For example, given the tree:
 *      1
 *     / \
 *    /   \
 *   2     3
 *        / \
 *       4   5
 * Return [[1, 2], [1, 3, 4], [1, 3, 5]].
 */

interface BinTreeNode {
    val: number;
    left?: BinTreeNode;
    right?: BinTreeNode;
}

type Paths = number[][];

const rootToLeavesPaths = (root: BinTreeNode): Paths => {
    const allPaths: Paths = [];

    /**
     * Depth first recursive traversal
     */
    const traverse = (node: BinTreeNode, path: number[] = [], depth: number = 0) => {
        console.log(`[depth ${depth}] Node ${node.val}`);

        if (!node.left && !node.right) { // Reached leaf
            console.log('----Leaf,path-->', node.val, path);
            allPaths.push(path);
        } else {
            if (node.left) {
                traverse(node.left, path.concat(node.left.val), depth + 1);
            }
            if (node.right) {
                traverse(node.right, path.concat(node.right.val), depth + 1);
            }
        }
    }

    console.log(':'.repeat(30));
    traverse(root, [root.val]);
    return allPaths;
}

/**
 * ASSERTIONS
 */
console.log(JSON.stringify(rootToLeavesPaths(
    {
        val: 1,
        left: { val: 2 },
        right: { val: 3 }
    })) === '[[1,2],[1,3]]');

console.log(JSON.stringify(rootToLeavesPaths(
    {
        val: 1,
        left: { val: 2 },
        right: {
            val: 3,
            left: { val: 4 },
            right: { val: 5 }
        }
    })) === '[[1,2],[1,3,4],[1,3,5]]');

console.log(JSON.stringify(rootToLeavesPaths(
    {
        val: 1,
        left: { val: 2 },
        right: {
            val: 3,
            left: {
                val: 4,
                right: { val: 6 }
            },
            right: { val: 5 }
        }
    })) === '[[1,2],[1,3,4,6],[1,3,5]]');
