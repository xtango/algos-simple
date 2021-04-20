/**
 *                          #215 [Medium] - BOTTOM VIEW OF TREE
 * 
 * This problem was asked by Yelp.
 * 
 * The horizontal distance of a binary tree node describes how far left or right the node will be when the tree is printed out.
 * More rigorously, we can define it as follows:
 * The horizontal distance of the root is 0.
 * The horizontal distance of a left child is hd(parent) - 1.
 * The horizontal distance of a right child is hd(parent) + 1.
 * For example, for the following tree, hd(1) = -2, and hd(6) = 0.
 *              5
 *           /     \
 *         3         7
 *       /  \      /   \
 *     1     4    6     9
 *    /                /
 *   0                8
 * The bottom view of a tree, then, consists of the lowest node at each horizontal distance.
 * If there are two nodes at the same depth and horizontal distance, either is acceptable.
 * For this tree, for example, the bottom view could be [0, 1, 3, 6, 8, 9].
 * Given the root to a binary tree, return its bottom view.
 */

interface BinTreeNode { val: number, left?: BinTreeNode, right?: BinTreeNode }

/**
 * Recursively computes the bottom view
 */
const bottomView = (root: BinTreeNode): number[] => {
    // hd to node val hashmap
    const hdMap: { [hd: number]: number } = {}

    const traverse = (
        node: BinTreeNode | undefined,
        parentHd: number,
        offset: -1 | 0 | 1 // left, root, right
    ): void => {
        if (node === undefined) {
            return;
        }
        const hd = parentHd + offset;
        console.log({ val: node.val, parentHd, offset, hd });
        hdMap[hd] = node.val;
        traverse(node.left, hd, -1);
        traverse(node.right, hd, 1);
    }

    traverse(root, 0, 0);
    return Object.values(hdMap).sort();
}

/**
 * ASSERTIONS
 */
const TREE_1: BinTreeNode = {
    val: 5,
    left: {
        val: 3,
        left: {
            val: 1,
            left: { val: 0 },
        },
        right: { val: 4 }
    },
    right: {
        val: 7,
        left: {
            val: 6
        },
        right: {
            val: 9,
            left: { val: 8 }
        }
    }
}

/**
 * ASSERTIONS
 */
console.log(bottomView(TREE_1).join(', ') === '0, 1, 3, 6, 8, 9');
