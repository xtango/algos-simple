/**
 *                   #204 [Easy] - NUM NODES IN COMPLETE BINARY TREE (under construction - returns last level only)
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
 * 
 *                                  Max nodes at h = 2^h
 *                   2       h=0            1
 *                  / \
 *                 7   5     h=1            2
 *                / \
 *               2   6       h=2            4
 *                  
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

const countNodes = (root: BinTreeNode): number {
    if (!root) {
        return 0;
    }
    const [heightLeft, heightRight] = [height(root, Side.Left), height(root, Side.Right)];
    console.log({ rootVal: root.val, heightLeft, heightRight });
    return heightLeft === heightRight
        ? Math.pow(2, heightLeft) - 1
        // Recurse
        : countNodes(root.left) + countNodes(root.right) + 1;
}

/**
 * ASSERTIONS
 */
const tree0 = {
    val: 1,
    left: { val: 1 },
    right: { val: 1 }
}
console.log(countNodes(tree0));

const tree1 = {
    val: 2,
    left: {
        val: 7,
        left: { val: 2 },
        right: { val: 6 }
    },
    right: {
        val: 5
    }
}
console.log(height(tree1, Side.Left) === 2);
console.log(height(tree1, Side.Right) === 1);
console.log(countNodes(tree1));
