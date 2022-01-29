/**
*       Problem #497 [Medium] - CONVERT TO FULL BINARY TREE
* 
* This problem was asked by Yahoo.
* 
* Recall that a full binary tree is one in which each node is either a leaf node,
* or has two children. Given a binary tree, convert it to a full one by removing
* nodes with only one child.
* 
* For example, given the following tree:
* 
*          0
*       /     \
*     1         2
*   /            \
* 3                 4
*   \             /   \
*     5          6     7
* You should convert it to:
* 
*      0
*   /     \
* 5         4
*         /   \
*        6     7
*/
interface BinTreeNode { val: number, left?: BinTreeNode, right?: BinTreeNode }

const isLeaf = (node: BinTreeNode): boolean => !node.left && !node.right;

const has2Children = (node: BinTreeNode): boolean => node.left !== undefined && node.right !== undefined;

/**
 * Approach: From the left leaf node(s) and traverse back up. 
 *           Remove node if it has a single child.
 */
const convertToFullBinTree = (bt: BinTreeNode): BinTreeNode => {
    /**
     * Recursively trim left and right subtree
     */
    const trim = (node: BinTreeNode | undefined): BinTreeNode | undefined => {
        if (node === undefined) {
            return undefined;
        }
        node.left = trim(node.left);
        node.right = trim(node.right);

        return isLeaf(node) || has2Children(node)
            ? node
            :  // The node has exactly 1 child. 
            // Return the child, thus deleting the parent.
            node.left ? node.left : node.right;
    }

    return trim(bt);
}

/**
 * left, root, right
 */
const prettyInOrder = (root: BinTreeNode): string => {
    let path: number[] = [];
    const helper = (node: BinTreeNode | undefined): void => {
        if (node === undefined) {
            return;
        }
        helper(node.left);
        path.push(node.val);
        helper(node.right)
    }

    helper(root);
    return path.join('->');
}

/**
 * ASSERTIONS
 */
const BIN_TREE_1 = {
    val: 0,
    left: {
        val: 1,
        left: {
            val: 3,
            right: {
                val: 5
            }
        }
    },
    right: {
        val: 2,
        right: {
            val: 4,
            left: { val: 6 },
            right: { val: 7 }
        }
    }
};
console.log(prettyInOrder(BIN_TREE_1) === '3->5->1->0->2->6->4->7');
console.log(prettyInOrder(convertToFullBinTree(BIN_TREE_1)) === '5->0->6->4->7');
