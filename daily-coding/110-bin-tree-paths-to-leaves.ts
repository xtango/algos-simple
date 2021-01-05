/**
 *              #110 [Medium] BIN TREE PATHS FROM ROOT TO LEAVES
 * 
 *               !!!!!!!!! WORK IN PROGRESS !!!!!!
 * 
* This problem was asked by Facebook.
* 
* Given a binary tree, return all paths from the root to leaves.
* For example, given the tree:
*    1
*   / \
*  /   \
* 2     3
*      / \
*     4   5
* Return [[1, 2], [1, 3, 4], [1, 3, 5]].
*/

interface BinTreeNode {
    val: number;
    left?: BinTreeNode;
    right?: BinTreeNode;
}

const leafPaths = (root: BinTreeNode) => {
    const traverse = (node: BinTreeNode, leftPath: number[] = [], rightPath: number[] = []) => {
        console.log('traverse', node.val);

        if (!node.left && !node.right) { // leaf
            console.log('-> leaf, leftPath, rightPath', leftPath, rightPath);
        } else {
            if (node.left) {
                traverse(node.left, leftPath.concat(node.left.val), []);
            }
            if (node.right) {
                traverse(node.right, [], rightPath.concat(node.right.val));
            }
        }
    }

    traverse(root, [root.val], [root.val])
}
/**
 * ASSERTIONS
 */
const binTree1: BinTreeNode = {
    val: 1,
    left: { val: 2 },
    right: { val: 3, left: { val: 4 }, right: { val: 5 } }
};

leafPaths(binTree1);
