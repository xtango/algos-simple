/**
 *                   #204 [Easy] - NUM NODES IN COMPLETE BINARY TREE
 * 
 * This problem was asked by Amazon.
 * 
 * Given a complete binary tree, count the number of nodes in faster than O(n) time.
 * Recall that a complete binary tree has every level filled except the last, and
 * the nodes in the last level are filled starting from the left.
 */

/** 
 * From wikipedia: In a complete binary tree every level, except possibly the last,
 * is completely filled, and all nodes in the last level are as far left as possible.
 * 
 *                        Nodes at h = 2^h       Total nodes when full = 2^(h+1)-1
 *         2       h=0           1                               1
 *        / \
 *       7   5     h=1           2                               3
 *      / \
 *     2   6       h=2           2                            Not applicable
 */
interface BinTreeNode { val: number, left?: BinTreeNode, right?: BinTreeNode }
enum Side { Left, Right }

/**
 * Returns the height h (index from 0 as in the diagram above).
 */
const height = (root: BinTreeNode, side: Side): number => {
    const child = (node: BinTreeNode) => side === Side.Left ? node.left : node.right
    let [h, node] = [0, root];
    while (child(node)) {
        node = child(node);
        h++;
    }
    return h;
}

const countCompleteBinTreeNodes = (root: BinTreeNode): number => {
    if (!root) {
        return 0;
    }
    const [heightLeft, heightRight] = [height(root, Side.Left), height(root, Side.Right)];
    //console.log({ rootVal: root.val, heightLeft, heightRight });

    return heightLeft === heightRight
        // Total num nodes of full bin subtree = 2^(h+1) -1 
        ? Math.pow(2, heightLeft + 1) - 1 
        // Not a full subtree, so recurse
        : countCompleteBinTreeNodes(root.left) + countCompleteBinTreeNodes(root.right) + 1;
}

/**
 * ASSERTIONS
 */
const tree0 = {
    val: 1,
    left: { val: 2 },
    right: { val: 3 }
}
console.log(countCompleteBinTreeNodes(tree0));

const tree1 = {
    val: 2,
    left: {a
        val: 7,
        left: { val: 2 },ac
        right: { val: 6 }
    },
    right: {
        val: 5
    }
}
console.log(height(tree1, Side.Left) === 2);
console.log(height(tree1, Side.Right) === 1);
console.log(countCompleteBinTreeNodes(tree1) === 5);
